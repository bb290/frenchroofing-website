#!/usr/bin/env -S npx tsx
/**
 * evergreen-generate.ts
 *
 * Generates one draft evergreen post for French Roofing across all 4 platforms
 * (Instagram, Facebook, LinkedIn, Google My Business) in a single Anthropic call.
 *
 * Reads BRAND.md, platforms.md, the pillar's pillar.md + POST-EXEMPLAR.md, crew-bios.md,
 * picks an eligible photo (90-day rule against the pillar's posts/ history),
 * calls Claude with tool-use to produce structured per-platform captions,
 * and writes a draft post folder under social/instagram/evergreen/<pillar>/posts/.
 *
 * Output post folder shape:
 *   <YYYY-MM-DD-slug>/
 *     caption.md              ← Instagram caption (canonical, kept for backwards compat)
 *     caption-instagram.md    ← Same as caption.md (explicit per-platform file)
 *     caption-facebook.md
 *     caption-linkedin.md
 *     caption-gmb.md
 *     overlay.txt
 *     schedule.json           ← Per-platform status + scheduling
 *
 * Usage:
 *   npx tsx scripts/evergreen-generate.ts --pillar=<slug> [--photo=<file>] [--dry-run]
 *
 * Env:
 *   ANTHROPIC_API_KEY (required)
 *   ANTHROPIC_MODEL   (optional, default claude-sonnet-4-6)
 */

import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLIENT_ROOT = join(__dirname, "..");

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
if (!ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY is not set. Export it or put it in .env.local.");
  process.exit(1);
}
const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

const PLATFORMS = ["instagram", "facebook", "linkedin", "gmb"] as const;
type Platform = (typeof PLATFORMS)[number];

interface Args {
  pillar: string;
  photo?: string;
  dryRun: boolean;
}

function parseArgs(): Args {
  const out: Args = { pillar: "crew-community", dryRun: false };
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("--pillar=")) out.pillar = arg.slice("--pillar=".length);
    else if (arg.startsWith("--photo=")) out.photo = arg.slice("--photo=".length);
    else if (arg === "--dry-run") out.dryRun = true;
  }
  return out;
}

async function readSafe(path: string): Promise<string> {
  try {
    return await readFile(path, "utf-8");
  } catch {
    return "";
  }
}

function pillarDir(pillarSlug: string): string {
  return join(CLIENT_ROOT, "social", "instagram", "evergreen", pillarSlug);
}

async function pickPhoto(pillarSlug: string): Promise<string | null> {
  const photoDir = join(pillarDir(pillarSlug), "photos");
  const postsDir = join(pillarDir(pillarSlug), "posts");
  if (!existsSync(photoDir)) return null;

  const photos = (await readdir(photoDir)).filter((f) =>
    /\.(jpe?g|png|avif)$/i.test(f),
  );
  if (photos.length === 0) return null;

  const ninetyDays = 90 * 24 * 60 * 60 * 1000;
  const cutoff = Date.now() - ninetyDays;
  const used = new Set<string>();

  if (existsSync(postsDir)) {
    const entries = await readdir(postsDir, { withFileTypes: true });
    for (const ent of entries) {
      if (!ent.isDirectory()) continue;
      const dateMatch = ent.name.match(/^(\d{4}-\d{2}-\d{2})/);
      if (!dateMatch) continue;
      const postDate = new Date(dateMatch[1]).getTime();
      if (postDate < cutoff) continue;

      const captionPath = join(postsDir, ent.name, "caption.md");
      if (!existsSync(captionPath)) continue;
      const captionContent = await readFile(captionPath, "utf-8");
      const photoMatch = captionContent.match(/^photo:\s*(.+)$/m);
      if (photoMatch) {
        const photoFile = photoMatch[1].trim().split("/").pop();
        if (photoFile) used.add(photoFile);
      }
    }
  }

  const eligible = photos.filter((p) => !used.has(p));
  if (eligible.length === 0) return null;
  return eligible[0];
}

interface PerPlatformCaptions {
  instagram: string;
  facebook: string;
  linkedin: string;
  gmb: string;
}

interface CaptionResult {
  captions: PerPlatformCaptions;
  overlay: string;
}

const PUBLISH_POST_TOOL = {
  name: "publish_post",
  description:
    "Submit the four per-platform captions for this French Roofing post. Each platform follows its own rules from platforms.md. The Instagram caption is the canonical source; the other variants are re-cast for their surface, not re-invented.",
  input_schema: {
    type: "object",
    properties: {
      instagram: {
        type: "string",
        description:
          "Instagram caption. Voice and length per the active pillar's pillar.md. CTA: social CTA wrapped in dashes (verbatim). No hashtags. No em dashes. No URLs in the body.",
      },
      facebook: {
        type: "string",
        description:
          "Facebook caption. Same hook and story as Instagram, slightly longer if natural. Direct URL CTA (frenchroofing.com or 971-376-8722). No dashes block. Hashtags optional, max 2-3.",
      },
      linkedin: {
        type: "string",
        description:
          "LinkedIn caption. 100-180 words. Same voice, with a touch more business-owner register for property managers and GCs. Lean into proof points (10+ years, CCB #203933, CertainTeed) when natural. Action-oriented CTA with URL. Hashtags optional, max 2-3.",
      },
      gmb: {
        type: "string",
        description:
          "Google My Business post. 100-250 words, short. Front-load city + service for local search. Phone-forward CTA (Call 971-376-8722). No hashtags.",
      },
    },
    required: ["instagram", "facebook", "linkedin", "gmb"],
  },
} as const;

async function generateCaptions(
  pillarSlug: string,
  photo: string,
): Promise<CaptionResult> {
  const brandPath = join(CLIENT_ROOT, ".claude", "BRAND.md");
  const platformsPath = join(CLIENT_ROOT, "social", "platforms.md");
  const pillarPath = join(pillarDir(pillarSlug), "pillar.md");
  const exemplarPath = join(pillarDir(pillarSlug), "POST-EXEMPLAR.md");
  const crewBiosPath = join(CLIENT_ROOT, "social", "crew-bios.md");
  const photoNotePath = join(
    pillarDir(pillarSlug),
    "photos",
    photo.replace(/\.[^.]+$/, ".txt"),
  );

  const [brand, platforms, pillarMd, exemplar, crewBios, photoNote] = await Promise.all([
    readSafe(brandPath),
    readSafe(platformsPath),
    readSafe(pillarPath),
    readSafe(exemplarPath),
    readSafe(crewBiosPath),
    readSafe(photoNotePath),
  ]);

  const systemPrompt = `You are the social media post generator for French Roofing, a roofing company in Damascus, OR.

Your job: produce four platform-specific caption variants (Instagram, Facebook, LinkedIn, Google My Business) for one photo. Submit them via the publish_post tool. Do not write any prose response.

Hard rules from BRAND.md (apply to every platform, non-negotiable):
- No em dashes, ever. The em dash character (Unicode U+2014) must not appear in any output. Use commas, periods, parentheses, or semicolons.
- Banned words and phrases: premier, industry-leading, rockstar, synergy, amazing team, cutting-edge, world-class, best-in-class.
- Voice: down to earth, neighborly, light hearted. Sean talking, a roofer in Birkenstocks who's been on roofs for twenty years. Never salesy, never corporate, never high-pressure.
- Tagline "Got You Covered!" is rationed across the WHOLE POST (not per platform). If you use it once on Instagram, do not use it on Facebook, LinkedIn, or GMB. Count once. Default off unless the moment earns it.
- Voice person depends on the photo subject. The pillar's pillar.md has the rule. Follow it exactly across all four platforms (the voice person doesn't change between platforms, only the register and CTA shape change).

Per-platform rules: see platforms.md (provided below). The Instagram caption is the canonical source. The other three variants are re-cast for their surface, not re-invented. Same hook, same story, same specifics. Different length, register, and CTA.`;

  const userPrompt = `## Brand bible

${brand}

## Per-platform rules

${platforms}

## Pillar (${pillarSlug})

${pillarMd}

## Pillar canonical example

${exemplar || "_no exemplar locked yet for this pillar; use pillar.md hook patterns and BRAND.md voice as reference._"}

## Crew bios reference

${crewBios}

## This post

Photo file: ${photo}
${photoNote ? `Photo notes:\n${photoNote}` : "No photo notes available. Infer subject from filename."}

Submit all four platform variants via the publish_post tool. Do not return prose. The Instagram caption follows the pillar's word-count target. The other three follow platforms.md.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY!,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4000,
      system: systemPrompt,
      tools: [PUBLISH_POST_TOOL],
      tool_choice: { type: "tool", name: "publish_post" },
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic API ${response.status}: ${errorText}`);
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; name?: string; input?: PerPlatformCaptions }>;
  };
  const toolUse = data.content.find(
    (b) => b.type === "tool_use" && b.name === "publish_post",
  );
  if (!toolUse?.input) {
    throw new Error(`No publish_post tool_use in API response: ${JSON.stringify(data)}`);
  }

  const captions = toolUse.input;
  for (const platform of PLATFORMS) {
    const text = captions[platform];
    if (!text || typeof text !== "string" || text.trim().length === 0) {
      throw new Error(`publish_post returned empty caption for platform: ${platform}`);
    }
    if (text.includes("—")) {
      throw new Error(
        `publish_post returned an em dash in ${platform} caption (banned by BRAND.md §4). Caption: ${text}`,
      );
    }
  }

  return {
    captions: {
      instagram: captions.instagram.trim(),
      facebook: captions.facebook.trim(),
      linkedin: captions.linkedin.trim(),
      gmb: captions.gmb.trim(),
    },
    overlay: "",
  };
}

function slugify(s: string): string {
  return s
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function nextScheduledTime(): string {
  const now = new Date();
  const target = new Date(now);
  const daysUntilTuesday = (2 - now.getUTCDay() + 7) % 7 || 7;
  target.setUTCDate(now.getUTCDate() + daysUntilTuesday);
  target.setUTCHours(17, 0, 0, 0);
  return target.toISOString();
}

function captionFrontmatter(args: {
  pillarSlug: string;
  platform: Platform;
  photo: string;
  slug: string;
  today: string;
}): string {
  return `---
client: french-roofing
platform: ${args.platform}
pillar: ${args.pillarSlug}
status: draft
photo: ../../photos/${args.photo}
public_photo: /images/${args.photo}
slug: ${args.slug}
created: ${args.today}
generated_by: scripts/evergreen-generate.ts
revision: 1
---
`;
}

async function writePostFolder(args: {
  pillarSlug: string;
  photo: string;
  captions: PerPlatformCaptions;
  overlay: string;
}): Promise<{ postDir: string; files: string[] }> {
  const today = new Date().toISOString().slice(0, 10);
  const slug = `${today}-${slugify(args.photo)}`;
  const postDir = join(pillarDir(args.pillarSlug), "posts", slug);
  await mkdir(postDir, { recursive: true });

  const scheduledFor = nextScheduledTime();

  const files: string[] = [];
  const writes: Array<Promise<void>> = [];

  for (const platform of PLATFORMS) {
    const fm = captionFrontmatter({
      pillarSlug: args.pillarSlug,
      platform,
      photo: args.photo,
      slug,
      today,
    });
    const body = `${fm}
# Caption (${platform})

${args.captions[platform].trim()}
`;
    const filename = `caption-${platform}.md`;
    files.push(filename);
    writes.push(writeFile(join(postDir, filename), body, "utf-8"));
  }

  // Backwards-compat: caption.md mirrors the Instagram caption so existing
  // tooling (OG renderer, photo-reuse scanner) keeps working.
  const igFm = captionFrontmatter({
    pillarSlug: args.pillarSlug,
    platform: "instagram",
    photo: args.photo,
    slug,
    today,
  });
  const captionMd = `${igFm}
# Caption

${args.captions.instagram.trim()}
`;
  files.push("caption.md");
  writes.push(writeFile(join(postDir, "caption.md"), captionMd, "utf-8"));

  const schedule = {
    post_id: slug,
    client: "french-roofing",
    pillar: args.pillarSlug,
    photo: `../../photos/${args.photo}`,
    rendered: false,
    notes:
      "Auto-generated by scripts/evergreen-generate.ts. Each platform reviewed independently in Metricool.",
    platforms: Object.fromEntries(
      PLATFORMS.map((p) => [
        p,
        {
          status: "draft",
          scheduled_for: scheduledFor,
          timezone: "America/Los_Angeles",
          published_id: null,
        },
      ]),
    ),
  };
  files.push("schedule.json");
  writes.push(
    writeFile(
      join(postDir, "schedule.json"),
      JSON.stringify(schedule, null, 2) + "\n",
      "utf-8",
    ),
  );

  files.push("overlay.txt");
  writes.push(writeFile(join(postDir, "overlay.txt"), `${args.overlay}\n`, "utf-8"));

  await Promise.all(writes);
  return { postDir, files };
}

async function main() {
  const args = parseArgs();

  let photo = args.photo ?? null;
  if (!photo) {
    photo = await pickPhoto(args.pillar);
    if (!photo) {
      console.error(
        `No eligible photo in social/instagram/evergreen/${args.pillar}/photos/.`,
      );
      console.error(
        `Either add a photo to that folder, or pass --photo=<filename> explicitly.`,
      );
      console.error(
        `If all photos are within the 90-day cooldown, this pillar should be paused 7 days then rebalanced.`,
      );
      process.exit(2);
    }
  }

  console.log(`pillar:    ${args.pillar}`);
  console.log(`photo:     ${photo}`);
  console.log(`model:     ${MODEL}`);
  console.log(`platforms: ${PLATFORMS.join(", ")}`);
  console.log(`generating per-platform captions...`);

  const result = await generateCaptions(args.pillar, photo);

  if (args.dryRun) {
    for (const platform of PLATFORMS) {
      console.log(`\n=== ${platform} (dry-run, not written) ===\n`);
      console.log(result.captions[platform]);
    }
    return;
  }

  const { postDir, files } = await writePostFolder({
    pillarSlug: args.pillar,
    photo,
    captions: result.captions,
    overlay: result.overlay,
  });

  const relPostDir = postDir.replace(CLIENT_ROOT + "/", "");
  console.log(`\nwrote draft post: ${relPostDir}`);
  for (const f of files.sort()) console.log(`  - ${f}`);
  console.log(
    `\nstatus: draft on all 4 platforms. Review each caption-<platform>.md and flip status in schedule.json when ready.`,
  );
  console.log(
    `og.png is not rendered yet. Run: npm run dev, then hit /api/og?photo=/images/${photo}&gradientColor=grey`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
