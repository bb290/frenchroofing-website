// Generates the downloadable ebook PDFs from the /guides/print/[cluster]
// routes. Run after `next build`:
//
//   npm run ebooks
//
// Output: public/downloads/*.pdf (commit them; they deploy as static files).

import { execFileSync, spawn } from "node:child_process";
import { mkdirSync, readdirSync, statSync, unlinkSync } from "node:fs";
import { chromium } from "playwright";
import sharp from "sharp";

const PORT = 4378;
const BASE = `http://localhost:${PORT}`;

// Keep in sync with src/lib/ebooks.ts
const EBOOKS = [
  { cluster: "roofing-101", file: "french-roofing-roofing-101.pdf" },
  { cluster: "replacement-decision", file: "french-roofing-roof-replacement-guide.pdf" },
  { cluster: "leaks-repair", file: "french-roofing-leaky-roof-guide.pdf" },
  { cluster: "moss-care", file: "french-roofing-roof-maintenance-guide.pdf" },
];

const FOOTER = `
  <div style="width:100%; font-size:8px; color:#9a9895; padding:0 0.6in; display:flex; justify-content:space-between; font-family:Helvetica, Arial, sans-serif;">
    <span>French Roofing &middot; Damascus, OR &middot; 971-376-8722 &middot; CCB #203933 &middot; frenchroofing.com</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;

async function waitForServer(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`server at ${url} never became ready`);
}

// Pre-render print-resolution JPEGs (public/print-images is gitignored;
// it only needs to exist while this script runs).
mkdirSync("public/print-images", { recursive: true });
for (const f of readdirSync("public/images")) {
  if (!/\.(webp|jpe?g|png)$/i.test(f)) continue;
  const base = f.replace(/\.(webp|jpe?g|png)$/i, "");
  await sharp(`public/images/${f}`)
    .resize({ width: 1000, withoutEnlargement: true })
    .flatten({ background: "#ffffff" })
    .jpeg({ quality: 72, mozjpeg: true })
    .toFile(`public/print-images/${base}.jpg`);
}
console.log("print images rendered");

// Refuse to run against a server we didn't start (a stale server on this
// port would render an old build into the PDFs).
try {
  await fetch(BASE);
  console.error(`Something is already listening on :${PORT}. Kill it first:`);
  console.error(`  lsof -ti:${PORT} | xargs kill`);
  process.exit(1);
} catch {
  // port free, good
}

const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
  stdio: "ignore",
  detached: false,
});

try {
  await waitForServer(`${BASE}/guides`);
  mkdirSync("public/downloads", { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const failures = [];
  page.on("response", (r) => {
    if (r.status() >= 400) failures.push(`${r.status()} ${r.url()}`);
  });

  for (const { cluster, file } of EBOOKS) {
    failures.length = 0;
    await page.goto(`${BASE}/guides/print/${cluster}`, {
      waitUntil: "networkidle",
    });
    if (failures.length) {
      throw new Error(
        `asset failures on ${cluster} (stale .next? run next build first):\n` +
          failures.join("\n"),
      );
    }
    const raw = `public/downloads/.${file}.raw.pdf`;
    await page.pdf({
      path: raw,
      format: "Letter",
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: "<span></span>",
      footerTemplate: FOOTER,
      margin: { top: "0.55in", bottom: "0.65in", left: "0", right: "0" },
    });
    // Chromium embeds decoded bitmaps losslessly; Ghostscript recompresses
    // them to sane print quality.
    execFileSync("gs", [
      "-sDEVICE=pdfwrite",
      "-dCompatibilityLevel=1.5",
      "-dPDFSETTINGS=/ebook",
      "-dColorImageResolution=150",
      "-dNOPAUSE", "-dBATCH", "-dQUIET",
      `-sOutputFile=public/downloads/${file}`,
      raw,
    ]);
    unlinkSync(raw);
    const kb = Math.round(statSync(`public/downloads/${file}`).size / 1024);
    console.log(`generated public/downloads/${file} (${kb} KB)`);
  }

  await browser.close();
} finally {
  server.kill();
}
