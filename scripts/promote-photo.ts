#!/usr/bin/env -S npx tsx
/**
 * promote-photo.ts
 *
 * The consolidated Kewl "recreation" step: turn a sorted queue photo into a FINISHED,
 * ready-to-publish post in one run, then archive the original.
 *
 * Per file it:
 *   1. pulls the file from assets/images/2.sorted/<pillar>/
 *   2. makes it post-ready (heic→jpg, EXIF-normalize)
 *   3. bakes the logo + grey gradient onto it (via sharp, matching /api/og's look)
 *   4. writes the four per-platform captions (Anthropic, using the sort-time context note)
 *   5. assembles a complete post folder under social/.../<pillar>/posts/<slug>/
 *   6. moves the original to assets/images/3.moved-to-social/  (LAST action)
 *
 * Pipeline position:
 *   1.intake/                  ← weekly Claude Cowork sort (manual): rename, route, add context note
 *   2.sorted/<pillar>/         ← the "not yet posted" queue  ◀── this script reads here
 *        │  promote-photo.ts (this script) does steps 2-5 above
 *        ▼
 *   social/.../<pillar>/posts/<slug>/   ← finished post: og.png + captions + schedule.json
 *   3.moved-to-social/                  ← archive of every processed original
 *
 * The post folder is self-contained. This script does NOT write to social/.../photos/ or
 * public/images/ (those fed the older two-stage generator + /api/og flow). The caption
 * generator (evergreen-generate.ts) and the weekly cron still exist for the unattended path;
 * the caption logic is duplicated here on purpose to keep this script self-contained.
 *
 * Naming: the 2.sorted convention stem ([pillar]_[YYYY-MM-DD]_[desc]_[seq]) is preserved into
 * the post slug and the archived original, so queue → post → archive links by filename.
 *
 * Reliability:
 *   - The archive move is the LAST action; any earlier failure leaves the original in the queue.
 *   - Captions are generated and the image baked into temp files first; the post folder is only
 *     written once both succeed, and is removed if a later write fails.
 *   - An existing post folder for the same slug is refused, never overwritten.
 *   - Archive collisions are hash-compared (identical → idempotent; different → loud error).
 *   - A source already gone is skipped cleanly.
 *
 * Not promotable: misc (no publishable pillar) is refused; .mov (video → v3) is skipped.
 *
 * Usage:
 *   npx tsx scripts/promote-photo.ts <file> [<file> ...] [--dry-run]
 *
 * Env (loaded from .env.local if not already set):
 *   ANTHROPIC_API_KEY (required unless --dry-run)
 *   ANTHROPIC_MODEL   (optional, default claude-sonnet-4-6)
 *
 * Requires macOS `sips` (bundled) and the `sharp` dependency (already in package.json).
 */

import { mkdir, rename, copyFile, unlink, readFile, writeFile, rm } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import { basename, dirname, extname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { put } from "@vercel/blob";

const execFileAsync = promisify(execFile);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const CLIENT_ROOT = join(__dirname, "..");

const SORTED_DIR = join(CLIENT_ROOT, "assets", "images", "2.sorted");
const ARCHIVE_DIR = join(CLIENT_ROOT, "assets", "images", "3.moved-to-social");
const SOCIAL_EVERGREEN = join(CLIENT_ROOT, "social", "instagram", "evergreen");
const LOGO_PATH = join(CLIENT_ROOT, "public", "images", "logo.png");

const PUBLISHABLE_PILLARS = new Set([
  "personal-brand",
  "crew-community",
  "educational",
  "before-after",
]);
const ALL_SORTED_PILLARS = new Set([...PUBLISHABLE_PILLARS, "misc"]);
const SUPPORTED_INPUT = new Set([".jpg", ".jpeg", ".png", ".avif", ".heic", ".mov"]);

const PLATFORMS = ["instagram", "facebook", "linkedin", "gmb"] as const;
type Platform = (typeof PLATFORMS)[number];

// Baked image geometry, matching src/app/api/og/route.tsx (grey, medium gradient).
const IMG_W = 1080;
const IMG_H = 1350;
const GREY = "#3e3d3b"; // BRAND.color.neutral
const LOGO_W = 240;
const LOGO_H = 137;
const LOGO_MARGIN = 60;

type Outcome =
  | { kind: "promoted"; src: string; postDir: string; archive: string; imageUrl?: string | null }
  | { kind: "skipped"; src: string; reason: string }
  | { kind: "refused"; src: string; reason: string }
  | { kind: "error"; src: string; reason: string };

interface Args {
  files: string[];
  dryRun: boolean;
}

function parseArgs(): Args {
  const out: Args = { files: [], dryRun: false };
  for (const arg of process.argv.slice(2)) {
    if (arg === "--dry-run") out.dryRun = true;
    else if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    } else if (arg.startsWith("--")) {
      console.error(`Unknown flag: ${arg}`);
      printUsage();
      process.exit(1);
    } else out.files.push(arg);
  }
  return out;
}

function printUsage() {
  console.log(
    [
      "Promote sorted queue photos into finished posts, then archive the originals.",
      "",
      "Usage:",
      "  npx tsx scripts/promote-photo.ts <file> [<file> ...] [--dry-run]",
      "",
      "Each <file> must live under assets/images/2.sorted/<pillar>/ where <pillar> is one of:",
      "  personal-brand, crew-community, educational, before-after",
      "(misc is refused; .mov is deferred to v3 and skipped.)",
      "",
      "Optional per-photo context: a sidecar <stem>.txt next to the source is read into the caption prompt.",
    ].join("\n"),
  );
}

function rel(p: string): string {
  return p.startsWith(CLIENT_ROOT + sep) ? p.slice(CLIENT_ROOT.length + 1) : p;
}

function msg(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}

/** Load KEY=VALUE pairs from .env.local into process.env if not already set. */
function loadEnvLocal() {
  const envPath = join(CLIENT_ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

async function readSafe(path: string): Promise<string> {
  try {
    return await readFile(path, "utf-8");
  } catch {
    return "";
  }
}

async function sha256(path: string): Promise<string> {
  return createHash("sha256").update(await readFile(path)).digest("hex");
}

async function sameContent(a: string, b: string): Promise<boolean> {
  const [ha, hb] = await Promise.all([sha256(a), sha256(b)]);
  return ha === hb;
}

function slugify(s: string): string {
  return s
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Next Tuesday 17:00 UTC (10am PT during PDT), matching evergreen-generate.ts. */
function nextScheduledTime(): string {
  const now = new Date();
  const target = new Date(now);
  const daysUntilTuesday = (2 - now.getUTCDay() + 7) % 7 || 7;
  target.setUTCDate(now.getUTCDate() + daysUntilTuesday);
  target.setUTCHours(17, 0, 0, 0);
  return target.toISOString();
}

/**
 * Bake EXIF orientation into pixel data using macOS sips (mirrors normalize-photos.sh).
 * Satori/sharp do not auto-rotate from EXIF, so portrait phone photos render sideways otherwise.
 */
async function normalizeOrientation(path: string): Promise<void> {
  let orient = "";
  try {
    const { stdout } = await execFileAsync("file", [path]);
    const m = stdout.match(/orientation=([a-z-]+)/);
    orient = m ? m[1] : "";
  } catch {
    return;
  }
  const rotation: Record<string, string> = {
    "upper-right": "90",
    "lower-right": "180",
    "lower-left": "270",
  };
  const deg = rotation[orient];
  if (!deg) return;
  await execFileAsync("sips", ["-r", deg, path]);
}

/** Make a post-ready (upright, Satori/sharp-safe) copy of `src` in a temp file. */
async function makePostReadyTemp(src: string, ext: string): Promise<string> {
  const tmp = join(tmpdir(), `promote-src-${process.pid}-${Date.now()}-${basename(src, ext)}.jpg`);
  if (ext === ".heic") {
    await execFileAsync("sips", ["-s", "format", "jpeg", src, "--out", tmp]);
  } else {
    const passthrough = join(
      tmpdir(),
      `promote-src-${process.pid}-${Date.now()}-${basename(src, ext)}${ext}`,
    );
    await copyFile(src, passthrough);
    if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
      await normalizeOrientation(passthrough);
    }
    return passthrough;
  }
  return tmp;
}

/** Bake photo (cover) + grey medium gradient + logo bottom-left into a PNG buffer. */
async function bakePostImage(postReadyPhoto: string): Promise<Buffer> {
  const photo = await sharp(postReadyPhoto)
    .resize(IMG_W, IMG_H, { fit: "cover", position: "centre" })
    .toBuffer();

  // Vertical gradient: strong grey at the bottom fading to transparent at the top.
  // Stops match /api/og "medium": d9(.85) @0, 99(.6) @30%, 33(.2) @65%, 00(0) @100% (bottom→top).
  const gradientSvg = `<svg width="${IMG_W}" height="${IMG_H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="${GREY}" stop-opacity="0.851"/>
      <stop offset="0.30" stop-color="${GREY}" stop-opacity="0.6"/>
      <stop offset="0.65" stop-color="${GREY}" stop-opacity="0.2"/>
      <stop offset="1" stop-color="${GREY}" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${IMG_W}" height="${IMG_H}" fill="url(#g)"/>
</svg>`;

  const logo = await sharp(LOGO_PATH).resize(LOGO_W, LOGO_H, { fit: "fill" }).png().toBuffer();

  return sharp(photo)
    .composite([
      { input: Buffer.from(gradientSvg), top: 0, left: 0 },
      { input: logo, top: IMG_H - LOGO_H - LOGO_MARGIN, left: LOGO_MARGIN },
    ])
    .png()
    .toBuffer();
}

/**
 * Upload the baked image to Vercel Blob and return its public URL. Metricool ingests media
 * by URL, so this is what makes the og.png reachable for scheduling. Best-effort: if the
 * BLOB_READ_WRITE_TOKEN is not set or the upload fails, returns null and the post is still
 * written (image_url just stays null). put() reads BLOB_READ_WRITE_TOKEN from the env.
 */
async function uploadBakedImage(
  image: Buffer,
  pillar: string,
  slug: string,
): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn("  note: BLOB_READ_WRITE_TOKEN not set; skipping Blob upload (image_url = null)");
    return null;
  }
  try {
    const { url } = await put(`social/${pillar}/${slug}.png`, image, {
      access: "public",
      contentType: "image/png",
      allowOverwrite: true,
    });
    return url;
  } catch (err) {
    console.warn(`  note: Blob upload failed (${msg(err)}); image_url = null`);
    return null;
  }
}

interface PerPlatformCaptions {
  instagram: string;
  facebook: string;
  linkedin: string;
  gmb: string;
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
  contextNote: string,
): Promise<PerPlatformCaptions> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set (export it or put it in .env.local).");
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

  const pDir = join(SOCIAL_EVERGREEN, pillarSlug);
  const [brand, platforms, pillarMd, exemplar, crewBios] = await Promise.all([
    readSafe(join(CLIENT_ROOT, ".claude", "BRAND.md")),
    readSafe(join(CLIENT_ROOT, "social", "platforms.md")),
    readSafe(join(pDir, "pillar.md")),
    readSafe(join(pDir, "POST-EXEMPLAR.md")),
    readSafe(join(CLIENT_ROOT, "social", "crew-bios.md")),
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
${contextNote ? `Context from the person who sorted this photo:\n${contextNote}` : "No context note was provided. Infer the subject from the filename."}

Submit all four platform variants via the publish_post tool. Do not return prose. The Instagram caption follows the pillar's word-count target. The other three follow platforms.md.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 4000,
      system: systemPrompt,
      tools: [PUBLISH_POST_TOOL],
      tool_choice: { type: "tool", name: "publish_post" },
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API ${response.status}: ${await response.text()}`);
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; name?: string; input?: PerPlatformCaptions }>;
  };
  const toolUse = data.content.find((b) => b.type === "tool_use" && b.name === "publish_post");
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
      throw new Error(`publish_post returned an em dash in ${platform} caption (banned by BRAND.md §4).`);
    }
  }

  return {
    instagram: captions.instagram.trim(),
    facebook: captions.facebook.trim(),
    linkedin: captions.linkedin.trim(),
    gmb: captions.gmb.trim(),
  };
}

function captionFrontmatter(args: {
  pillarSlug: string;
  platform: Platform;
  archivedPhoto: string;
  slug: string;
  today: string;
}): string {
  return `---
client: french-roofing
platform: ${args.platform}
pillar: ${args.pillarSlug}
status: draft
source: ../../../../assets/images/3.moved-to-social/${args.archivedPhoto}
image: og.png
slug: ${args.slug}
created: ${args.today}
generated_by: scripts/promote-photo.ts
revision: 1
---
`;
}

async function writePostFolder(args: {
  postDir: string;
  pillarSlug: string;
  slug: string;
  archivedPhoto: string;
  bakedImage: Buffer;
  captions: PerPlatformCaptions;
  imageUrl: string | null;
}): Promise<void> {
  const today = new Date().toISOString().slice(0, 10);
  await mkdir(args.postDir, { recursive: true });

  const writes: Array<Promise<void>> = [];
  writes.push(writeFile(join(args.postDir, "og.png"), args.bakedImage));

  for (const platform of PLATFORMS) {
    const fm = captionFrontmatter({
      pillarSlug: args.pillarSlug,
      platform,
      archivedPhoto: args.archivedPhoto,
      slug: args.slug,
      today,
    });
    const body = `${fm}
# Caption (${platform})

${args.captions[platform]}
`;
    writes.push(writeFile(join(args.postDir, `caption-${platform}.md`), body, "utf-8"));
  }

  // caption.md mirrors Instagram (backwards-compat with existing post-folder shape).
  const igFm = captionFrontmatter({
    pillarSlug: args.pillarSlug,
    platform: "instagram",
    archivedPhoto: args.archivedPhoto,
    slug: args.slug,
    today,
  });
  writes.push(
    writeFile(join(args.postDir, "caption.md"), `${igFm}
# Caption

${args.captions.instagram}
`, "utf-8"),
  );

  const scheduledFor = nextScheduledTime();
  const schedule = {
    post_id: args.slug,
    client: "french-roofing",
    pillar: args.pillarSlug,
    image: "og.png",
    image_url: args.imageUrl,
    source: `../../../../assets/images/3.moved-to-social/${args.archivedPhoto}`,
    rendered: true,
    notes: "Auto-generated by scripts/promote-photo.ts. Each platform reviewed independently in Metricool.",
    platforms: Object.fromEntries(
      PLATFORMS.map((p) => [
        p,
        { status: "draft", scheduled_for: scheduledFor, timezone: "America/Los_Angeles", published_id: null },
      ]),
    ),
  };
  writes.push(
    writeFile(join(args.postDir, "schedule.json"), JSON.stringify(schedule, null, 2) + "\n", "utf-8"),
  );
  writes.push(writeFile(join(args.postDir, "overlay.txt"), "\n", "utf-8"));

  await Promise.all(writes);
}

async function archiveOriginal(src: string, archiveTarget: string): Promise<string> {
  await mkdir(ARCHIVE_DIR, { recursive: true });
  if (!existsSync(src)) return "source already gone, archive skipped";
  if (existsSync(archiveTarget)) {
    if (await sameContent(src, archiveTarget)) {
      await unlink(src);
      return "already archived (duplicate source removed from queue)";
    }
    throw new Error(
      `archive name collision: ${basename(archiveTarget)} already exists with different content. ` +
        `Left original in the queue; resolve the name clash manually.`,
    );
  }
  try {
    await rename(src, archiveTarget);
  } catch (err) {
    if (err instanceof Error && (err as NodeJS.ErrnoException).code === "EXDEV") {
      await copyFile(src, archiveTarget);
      await unlink(src);
    } else {
      throw err;
    }
  }
  return "archived";
}

async function promote(rawPath: string, dryRun: boolean): Promise<Outcome> {
  const src = resolve(rawPath);
  if (!existsSync(src)) return { kind: "skipped", src: rel(src), reason: "source not found" };

  const parent = dirname(src);
  const pillar = basename(parent);
  if (!src.startsWith(SORTED_DIR + sep) || parent !== join(SORTED_DIR, pillar)) {
    return { kind: "error", src: rel(src), reason: "not directly inside an assets/images/2.sorted/<pillar>/ folder" };
  }
  if (!ALL_SORTED_PILLARS.has(pillar)) {
    return { kind: "error", src: rel(src), reason: `unknown pillar folder: ${pillar}` };
  }
  if (pillar === "misc") {
    return { kind: "refused", src: rel(src), reason: "misc is not a publishable pillar; re-sort into a real pillar first" };
  }
  if (!PUBLISHABLE_PILLARS.has(pillar)) {
    return { kind: "refused", src: rel(src), reason: `pillar ${pillar} is not publishable` };
  }

  const ext = extname(src).toLowerCase();
  if (ext === ".mov") {
    return { kind: "skipped", src: rel(src), reason: "video (.mov) deferred to Kewl v3; left in queue" };
  }
  if (!SUPPORTED_INPUT.has(ext)) {
    return { kind: "skipped", src: rel(src), reason: `unsupported extension: ${ext || "(none)"}` };
  }

  const stem = basename(src, extname(src));
  const today = new Date().toISOString().slice(0, 10);
  const slug = `${today}-${slugify(stem)}`;
  const postDir = join(SOCIAL_EVERGREEN, pillar, "posts", slug);
  const archiveTarget = join(ARCHIVE_DIR, basename(src));

  if (existsSync(postDir)) {
    return { kind: "refused", src: rel(src), reason: `post folder already exists, refusing to overwrite: ${rel(postDir)}` };
  }

  if (dryRun) {
    return { kind: "promoted", src: rel(src), postDir: rel(postDir), archive: rel(archiveTarget) };
  }

  // Context note: optional sidecar <stem>.txt next to the source.
  const contextNote = await readSafe(join(parent, `${stem}.txt`));

  // 1. Post-ready temp photo.
  let postReady: string;
  try {
    postReady = await makePostReadyTemp(src, ext);
  } catch (err) {
    return { kind: "error", src: rel(src), reason: `make post-ready failed: ${msg(err)}` };
  }

  // 2. Bake the image, then 3. generate captions. Both into memory/temp, nothing persisted yet.
  let bakedImage: Buffer;
  let captions: PerPlatformCaptions;
  try {
    bakedImage = await bakePostImage(postReady);
    captions = await generateCaptions(pillar, stem, contextNote.trim());
  } catch (err) {
    await unlink(postReady).catch(() => {});
    return { kind: "error", src: rel(src), reason: msg(err) };
  }
  await unlink(postReady).catch(() => {});

  // 3b. Upload the baked image to Vercel Blob for a public URL (best-effort).
  const imageUrl = await uploadBakedImage(bakedImage, pillar, slug);

  // 4. Write the post folder. Remove it on partial-write failure.
  try {
    await writePostFolder({ postDir, pillarSlug: pillar, slug, archivedPhoto: basename(src), bakedImage, captions, imageUrl });
  } catch (err) {
    await rm(postDir, { recursive: true, force: true }).catch(() => {});
    return { kind: "error", src: rel(src), reason: `writing post folder failed: ${msg(err)}` };
  }

  // 5. Archive the original (LAST). Post is already complete; surface clashes for manual fixup.
  let archiveStatus: string;
  try {
    archiveStatus = await archiveOriginal(src, archiveTarget);
  } catch (err) {
    return { kind: "error", src: rel(src), reason: `post written, but archive step failed: ${msg(err)}` };
  }

  return { kind: "promoted", src: `${rel(src)}  (${archiveStatus})`, postDir: rel(postDir), archive: rel(archiveTarget), imageUrl };
}

async function main() {
  const args = parseArgs();
  if (args.files.length === 0) {
    printUsage();
    process.exit(1);
  }

  if (process.platform !== "darwin") {
    console.error("This script uses macOS `sips` for image conversion and EXIF normalization.");
    process.exit(1);
  }
  try {
    await execFileAsync("sips", ["--help"]);
  } catch {
    console.error("ERROR: `sips` not found. This script requires macOS.");
    process.exit(1);
  }

  if (!args.dryRun) loadEnvLocal();
  if (args.dryRun) console.log("DRY RUN — no API calls, no files changed.\n");

  const outcomes: Outcome[] = [];
  for (const f of args.files) outcomes.push(await promote(f, args.dryRun));

  let promoted = 0, skipped = 0, refused = 0, errored = 0;
  for (const o of outcomes) {
    switch (o.kind) {
      case "promoted":
        promoted++;
        console.log(`${args.dryRun ? "would promote" : "promoted"}: ${o.src}`);
        console.log(`    post:    ${o.postDir}`);
        console.log(`    archive: ${o.archive}`);
        if (o.imageUrl) console.log(`    image:   ${o.imageUrl}`);
        break;
      case "skipped":
        skipped++;
        console.log(`skipped:  ${o.src}  (${o.reason})`);
        break;
      case "refused":
        refused++;
        console.log(`refused:  ${o.src}  (${o.reason})`);
        break;
      case "error":
        errored++;
        console.error(`ERROR:    ${o.src}  (${o.reason})`);
        break;
    }
  }
  console.log(
    `\n${args.dryRun ? "[dry-run] " : ""}promoted ${promoted}, skipped ${skipped}, refused ${refused}, errored ${errored}`,
  );
  if (errored > 0) process.exit(1);
}

main().catch((err) => {
  console.error(msg(err));
  process.exit(1);
});
