/**
 * label-photo.ts
 *
 * Looks at one photo and returns a short filename label plus a one-sentence description for
 * the caption writer. Used by hcp-photos.ts as photos arrive from Housecall Pro.
 *
 * Never throws: anything that goes wrong (no API key, unreadable format, API error, refusal,
 * unclear photo) comes back as UNKNOWN, which is the signal that a human labels it at the sort.
 *
 * Env:
 *   ANTHROPIC_API_KEY (required for labels; without it everything is UNKNOWN)
 *   ANTHROPIC_MODEL   (optional, default claude-opus-5)
 */

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import sharp from "sharp";
import { z } from "zod";

export const UNKNOWN = "UNKNOWN";

export type PhotoLabel = { label: string; description: string; paperwork: boolean };

const UNKNOWN_LABEL: PhotoLabel = { label: UNKNOWN, description: "", paperwork: false };

const LabelSchema = z.object({
  kind: z.enum(["roof-work", "damage", "finished-roof", "property-exterior", "crew", "materials", "paperwork", "other", "unclear"]),
  label: z.string(),
  description: z.string(),
});

const PROMPT = `This photo came from a roofing contractor's job file. Label it for a social media photo library.

Return:
- kind: what sort of photo this is. Use "paperwork" for any document, ticket, invoice, receipt, form, screenshot, or measurement report. Use "unclear" if you cannot tell what the photo shows.
- label: 2 to 5 lowercase words joined by hyphens saying what is visible, specific enough to tell this photo from others on the same job (e.g. "moss-on-north-slope", "new-ridge-vent-installed", "crew-tearing-off-shingles", "rotted-decking-exposed", "delivery-ticket"). No city names, no people's names.
- description: one plain sentence a caption writer could use, covering what is shown, the roof material or condition if visible, and the stage of work (before, during, after) if you can tell. Say only what you can see.

Never copy names, addresses, phone numbers, or account numbers from anything in the photo.`;

let client: Anthropic | null = null;

/** Filename-safe: lowercase words and hyphens only, capped so names stay readable. */
function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .slice(0, 6)
    .join("-");
}

export async function labelPhoto(bytes: Buffer): Promise<PhotoLabel> {
  if (!process.env.ANTHROPIC_API_KEY) return UNKNOWN_LABEL;
  try {
    // Housecall Pro originals run up to ~8 MB; the API wants images under 5 MB.
    const jpeg = await sharp(bytes).rotate().resize(1568, 1568, { fit: "inside", withoutEnlargement: true }).jpeg({ quality: 80 }).toBuffer();

    client ??= new Anthropic();
    const response = await client.messages.parse({
      model: process.env.ANTHROPIC_MODEL ?? "claude-opus-5",
      max_tokens: 1000,
      output_config: { effort: "low", format: zodOutputFormat(LabelSchema) },
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: "image/jpeg", data: jpeg.toString("base64") } },
            { type: "text", text: PROMPT },
          ],
        },
      ],
    });

    const parsed = response.parsed_output;
    if (response.stop_reason !== "end_turn" || !parsed || parsed.kind === "unclear") return UNKNOWN_LABEL;
    const slug = slugify(parsed.label);
    if (!slug) return UNKNOWN_LABEL;

    const paperwork = parsed.kind === "paperwork";
    return { label: paperwork ? `PAPERWORK-${slug}` : slug, description: parsed.description.trim(), paperwork };
  } catch (err) {
    const why = err instanceof Anthropic.APIError ? `API ${err.status}` : err instanceof Error ? err.message : String(err);
    console.error(`  (label failed, using ${UNKNOWN}: ${why})`);
    return UNKNOWN_LABEL;
  }
}
