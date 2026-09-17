#!/usr/bin/env -S npx tsx
/**
 * kewl-sort.ts
 *
 * Applies sort DECISIONS to assets/images/1.intake. The judgment (which pillar, what the photo
 * shows) is made by whoever writes the decisions file; this script only does the file work:
 * rename to the Kewl convention, move into 2.sorted/<pillar>, and rewrite the context note.
 *
 * Decisions file: JSON array, one entry per file in 1.intake (every file must be covered):
 *   { "file": "gresham_2026-09-14_open-hole_job212-007.jpg",
 *     "pillar": "educational" | "crew-community" | "personal-brand" | "before-after" | "misc" | "discard",
 *     "description": "square-hole-cut-through-roof-deck",   // kebab-case, for the filename
 *     "photo": "What is visibly in the photo and how it can be used. Facts only.",
 *     "reason": "required for misc and discard: why it is not promotable" }
 *
 * The captioner never sees the photo; "photo" is its only source of facts, so it must describe
 * only what is visible and flag anything uncertain ("cause not recorded", "ASK SEAN").
 *
 * What the script adds to every note on its own:
 *   - estimate photos: "inspection / estimate visit ... do not say or imply we did this work"
 *   - city rule from BRAND.md sec.9 (covered city = OK to name; Portland and unknown = do not name)
 *   - the Housecall Pro source line and the customer-privacy line
 *
 * "discard" deletes the intake copy (the original stays in Housecall Pro; the pull manifest keeps
 * it from coming back). Use it for PAPERWORK- files, which can show the business street address.
 *
 * Usage: npm run kewl:sort -- <decisions.json> [--dry-run]
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, rename, unlink, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const IMAGES = join(ROOT, "assets", "images");
const INTAKE = join(IMAGES, "1.intake");
const SORTED = join(IMAGES, "2.sorted");
const ARCHIVE = join(IMAGES, "3.moved-to-social");

const PILLARS = new Set(["educational", "crew-community", "personal-brand", "before-after", "misc"]);
/** BRAND.md sec.9 coverage list. Portland is deliberately absent: only named SE neighborhoods are covered. */
const COVERED = new Set([
  "damascus", "clackamas", "happy-valley", "gresham", "oregon-city", "milwaukie", "lake-oswego", "tualatin", "west-linn",
  "sandy", "estacada", "boring", "troutdale", "fairview", "wood-village", "gladstone", "johnson-city", "canby",
]);

type Decision = { file: string; pillar: string; description?: string; photo?: string; reason?: string };

const title = (slug: string) => slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");

function cityLine(citySlug: string): string {
  if (COVERED.has(citySlug)) return `City: ${title(citySlug)}, OR. On the BRAND.md sec.9 coverage list, OK to name.`;
  if (citySlug === "portland") {
    return "City: Portland, OR, neighborhood not confirmed. BRAND.md sec.9 only covers specific SE Portland neighborhoods and retires 'Portland' as a region, so do NOT name Portland. Name no city or say 'the Damascus area'.";
  }
  return `City: ${citySlug === "UNKNOWN" ? "unknown" : title(citySlug)}. Not on the BRAND.md sec.9 coverage list; do not name it. Say 'the Damascus area' or name no city.`;
}

async function nextSeq(pillar: string): Promise<number> {
  const names = [...(existsSync(join(SORTED, pillar)) ? await readdir(join(SORTED, pillar)) : []), ...(existsSync(ARCHIVE) ? await readdir(ARCHIVE) : [])];
  const seqs = names.filter((n) => n.startsWith(`${pillar}_`)).map((n) => Number(n.match(/_(\d{3})\.[A-Za-z0-9]+$/)?.[1] ?? 0));
  return Math.max(0, ...seqs) + 1;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const decisionsPath = args.find((a) => !a.startsWith("--"));
  if (!decisionsPath) throw new Error("usage: npm run kewl:sort -- <decisions.json> [--dry-run]");
  const decisions = JSON.parse(await readFile(resolve(decisionsPath), "utf-8")) as Decision[];

  // Validate everything before touching a single file.
  const media = (await readdir(INTAKE)).filter((f) => extname(f).toLowerCase() !== ".txt" && !f.startsWith("."));
  const errors: string[] = [];
  const decided = new Set(decisions.map((d) => d.file));
  for (const f of media) if (!decided.has(f)) errors.push(`no decision for ${f}`);
  for (const d of decisions) {
    if (!media.includes(d.file)) errors.push(`not in 1.intake: ${d.file}`);
    if (d.pillar !== "discard" && !PILLARS.has(d.pillar)) errors.push(`unknown pillar "${d.pillar}" for ${d.file}`);
    if ((d.pillar === "misc" || d.pillar === "discard") && !d.reason) errors.push(`misc/discard needs a reason: ${d.file}`);
    if (d.pillar !== "discard" && d.pillar !== "misc") {
      if (!d.description || !/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/.test(d.description)) errors.push(`description must be kebab-case: ${d.file}`);
      if (!d.photo || d.photo.length < 40) errors.push(`photo note too thin (the captioner's only facts): ${d.file}`);
    }
    if (d.file.includes("PAPERWORK-") && d.pillar !== "discard") errors.push(`PAPERWORK files must be discarded: ${d.file}`);
  }
  if (errors.length > 0) throw new Error(`decisions file rejected, nothing moved:\n  ${errors.join("\n  ")}`);

  const seq: Record<string, number> = {};
  const counts: Record<string, number> = {};
  for (const d of [...decisions].sort((a, b) => a.file.localeCompare(b.file))) {
    const ext = extname(d.file);
    const stem = d.file.slice(0, -ext.length);
    const src = join(INTAKE, d.file);
    const noteSrc = join(INTAKE, `${stem}.txt`);
    counts[d.pillar] = (counts[d.pillar] ?? 0) + 1;

    if (d.pillar === "discard") {
      console.log(`discard   ${d.file}  (${d.reason})`);
      if (!dryRun) {
        await unlink(src);
        if (existsSync(noteSrc)) await unlink(noteSrc);
      }
      continue;
    }

    const [citySlug, date, pulledLabel] = stem.split("_");
    const oldNote = existsSync(noteSrc) ? await readFile(noteSrc, "utf-8") : "";
    const sourceLine = oldNote.split("\n").find((l) => l.startsWith("Source:")) ?? "Source: not recorded.";
    const pulledPhoto = oldNote.split("\n").find((l) => l.startsWith("Photo:"))?.slice(7) ?? "";
    const fromEstimate = sourceLine.includes("estimate");

    seq[d.pillar] ??= await nextSeq(d.pillar);
    const description = d.description ?? (pulledLabel === "UNKNOWN" ? "unidentified" : pulledLabel);
    const newStem = `${d.pillar}_${date}_${description}_${String(seq[d.pillar]++).padStart(3, "0")}`;

    const lines = [
      d.pillar === "misc" && `Sorted to misc ${new Date().toISOString().slice(0, 10)}: ${d.reason}`,
      d.photo ?? (pulledPhoto && `Photo (vision label, unverified): ${pulledPhoto}`),
      fromEstimate && d.pillar !== "misc" && "This was an inspection / estimate visit, not a completed French Roofing job. Do not say or imply we did this work.",
      cityLine(citySlug),
      sourceLine,
      "Customer details intentionally omitted. Do not name the customer or show a house number.",
    ].filter(Boolean);

    console.log(`${d.pillar.padEnd(15)} ${newStem}${ext}`);
    if (dryRun) continue;
    const destDir = join(SORTED, d.pillar);
    await mkdir(destDir, { recursive: true });
    if (existsSync(join(destDir, `${newStem}${ext}`))) throw new Error(`refusing to overwrite ${newStem}${ext}`);
    await rename(src, join(destDir, `${newStem}${ext}`));
    await writeFile(join(destDir, `${newStem}.txt`), lines.join("\n") + "\n");
    if (existsSync(noteSrc)) await unlink(noteSrc);
  }
  console.log(`\n${dryRun ? "[dry-run] " : ""}${Object.entries(counts).map(([k, v]) => `${k}: ${v}`).join(", ")}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
