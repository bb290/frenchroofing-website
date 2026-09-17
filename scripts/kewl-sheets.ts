#!/usr/bin/env -S npx tsx
/**
 * kewl-sheets.ts
 *
 * Builds numbered contact sheets of everything in assets/images/1.intake so the weekly sort can
 * look at every photo quickly. Writes operations/kewl-runs/sheets/sheet-N.jpg (9 photos each) and
 * index.tsv (number → filename). Output is gitignored; sheets can show customer homes.
 *
 * Usage: npm run kewl:sheets
 */

import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INTAKE = join(ROOT, "assets", "images", "1.intake");
const OUT = join(ROOT, "operations", "kewl-runs", "sheets");
const TILE = 520;
const COLS = 3;
const PER_SHEET = 9;

async function main() {
  const files = (await readdir(INTAKE)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort();
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  const index: string[] = [];
  for (let s = 0; s * PER_SHEET < files.length; s++) {
    const batch = files.slice(s * PER_SHEET, (s + 1) * PER_SHEET);
    const layers: sharp.OverlayOptions[] = [];
    for (const [i, file] of batch.entries()) {
      const n = s * PER_SHEET + i + 1;
      index.push(`${n}\t${file}`);
      const tile = await sharp(join(INTAKE, file)).rotate().resize(TILE, TILE, { fit: "contain", background: "#222" }).toBuffer();
      const tag = Buffer.from(
        `<svg width="70" height="44"><rect width="70" height="44" fill="black"/><text x="35" y="33" font-size="30" font-family="Helvetica" font-weight="bold" fill="yellow" text-anchor="middle">${n}</text></svg>`,
      );
      const left = (i % COLS) * TILE;
      const top = Math.floor(i / COLS) * TILE;
      layers.push({ input: tile, left, top }, { input: tag, left, top });
    }
    await sharp({ create: { width: TILE * COLS, height: TILE * Math.ceil(batch.length / COLS), channels: 3, background: "#222" } })
      .composite(layers)
      .jpeg({ quality: 72 })
      .toFile(join(OUT, `sheet-${s + 1}.jpg`));
  }
  await writeFile(join(OUT, "index.tsv"), index.join("\n") + "\n");

  const skipped = (await readdir(INTAKE)).filter((f) => /\.(mov|mp4|heic)$/i.test(f));
  console.log(`${files.length} photos on ${Math.ceil(files.length / PER_SHEET)} sheets in operations/kewl-runs/sheets/`);
  if (skipped.length > 0) console.log(`not on sheets (video/HEIC, sort by hand): ${skipped.join(", ")}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
