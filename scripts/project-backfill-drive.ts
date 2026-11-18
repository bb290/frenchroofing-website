/*
  One-off backfill for /past-projects from the Drive "Job Archive" (2026-11-18, Brittany: "Lets back fill to like 35
  past projects total"). Housecall Pro only has 2026 jobs; the 2023-2025 jobs (JobNimbus era) live in Drive as
  "<YYYY.MM>_<address>" folders with Photos/, Docs/ and Notes/.

    npx tsx scripts/project-backfill-drive.ts --list              candidates, newest first (nothing downloaded)
    npx tsx scripts/project-backfill-drive.ts --plan [--max 12]   download the next N into operations/hcp-data/projects/

  A folder counts only when its Docs/ holds an Invoice PDF (the job was billed, so the work happened) and Photos/ has
  5+ images. City and state come from the invoice; Washington jobs are skipped (Oregon only). Each planned job gets the
  same work folder as a Housecall Pro job (raw/, sheet.jpg, facts.json with the invoice's line items) plus private.json
  (customer names and street, for the --build privacy check only). Ledger key: drive-<folder id prefix>.
  Then the usual steps: draft.json -> npm run projects -- --build drive-<id>.
*/
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const WORK = join(ROOT, "operations/hcp-data/projects");
const LEDGER = join(WORK, "handled.json");
const ACCOUNT = "googledrive_herein-flet";
const args = process.argv.slice(2);
const arg = (f: string) => (args.indexOf(f) >= 0 ? args[args.indexOf(f) + 1] : undefined);
const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));
const writeJson = (p: string, d: unknown) => writeFileSync(p, JSON.stringify(d, null, 2) + "\n");
const titleCase = (s: string) => s.trim().toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());

type F = { id: string; name: string; mimeType: string; parents?: string[] };

function composio(slug: string, data: object): any {
  const out = execFileSync("composio", ["execute", slug, "--account", ACCOUNT, "-d", JSON.stringify(data)], { encoding: "utf8", maxBuffer: 1 << 28 });
  let res = JSON.parse(out.slice(out.indexOf("{")));
  if (res.storedInFile) res = JSON.parse(readFileSync(res.outputFilePath, "utf8"));
  if (!res.successful) throw new Error(`${slug} failed: ${JSON.stringify(res.error)}`);
  return res.data;
}
function find(q: string): F[] {
  let token: string | undefined, acc: F[] = [];
  do {
    const d = composio("GOOGLEDRIVE_FIND_FILE", { q, pageSize: 1000, fields: "nextPageToken,files(id,name,mimeType,parents)", ...(token ? { pageToken: token } : {}) });
    acc = acc.concat(d.files || []);
    token = d.nextPageToken;
  } while (token);
  return acc;
}
async function download(id: string): Promise<Buffer> {
  const d = composio("GOOGLEDRIVE_DOWNLOAD_FILE", { fileId: id });
  const url = d?.downloaded_file_content?.s3url;
  if (!url) throw new Error(`no download link for ${id}`);
  const r = await fetch(url);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
}

function candidates() {
  const folders = find("mimeType = 'application/vnd.google-apps.folder' and trashed = false");
  const byId = Object.fromEntries(folders.map((f) => [f.id, f]));
  const archive = folders.find((f) => f.name === "Job Archive");
  if (!archive) throw new Error("no Job Archive folder");
  const jobs = folders.filter((f) => f.parents?.[0] === archive.id && /^20(23|24|25)\.\d/.test(f.name));
  const jobOf = (id?: string) => { let f = id ? byId[id] : undefined; for (let i = 0; f && i < 4; i++) { if (f.parents?.[0] === archive.id) return f; f = byId[f.parents?.[0] || ""]; } return undefined; };
  const images = find("mimeType contains 'image/' and trashed = false");
  const pdfs = find("mimeType = 'application/pdf' and trashed = false and (name contains 'Invoice' or name contains 'Warranty')");
  const led = existsSync(LEDGER) ? readJson(LEDGER) : {};
  const out = [];
  const seenStreet = new Set<string>();
  for (const j of jobs.sort((a, b) => b.name.localeCompare(a.name))) {
    const photos = images.filter((im) => { const p = byId[im.parents?.[0] || ""]; return p && /photo/i.test(p.name) && jobOf(im.parents?.[0])?.id === j.id; });
    const invoices = pdfs.filter((p) => /invoice/i.test(p.name) && jobOf(p.parents?.[0])?.id === j.id);
    const warranty = pdfs.find((p) => /warranty/i.test(p.name) && jobOf(p.parents?.[0])?.id === j.id);
    const street = j.name.replace(/^[\d.]+[_ -]+/, "").replace(/^[A-Za-z]+[ -]+(?=\d)/, "").split(",")[0].trim().toLowerCase();
    const key = `drive-${j.id.slice(0, 8)}`;
    if (photos.length < 5 || !invoices.length || led[key] || seenStreet.has(street)) continue;
    seenStreet.add(street);
    const mm = j.name.match(/^(\d{4})\.(\d{1,2})/)!;
    out.push({ key, folder: j, month: `${mm[1]}-${mm[2].padStart(2, "0")}`, photos, invoices, warranty });
  }
  return out.sort((a, b) => b.month.localeCompare(a.month));
}

async function plan(max: number) {
  const led = existsSync(LEDGER) ? readJson(LEDGER) : {};
  let planned = 0;
  for (const c of candidates()) {
    if (planned >= max) break;
    const dir = join(WORK, c.key);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(join(dir, "raw"), { recursive: true });
    // The invoice is the job record: city, state, what was billed.
    let text = "";
    for (const inv of c.invoices.slice(0, 2)) {
      writeFileSync(join(dir, "invoice.pdf"), await download(inv.id));
      text += execFileSync("pdftotext", ["-layout", join(dir, "invoice.pdf"), "-"], { encoding: "utf8" }) + "\n";
    }
    rmSync(join(dir, "invoice.pdf"), { force: true });
    const place = text.match(/\b([A-Z][A-Za-z .]+?),?\s+(OR|WA|Oregon|Washington)\s+9\d{4}\b/g) || [];
    const ours = place.filter((p) => !/Damascus,?\s+OR\s+97089/.test(p) || place.length === 1);
    const m = (ours[ours.length - 1] || "").match(/([A-Z][A-Za-z .]+?),?\s+(OR|WA|Oregon|Washington)\s+9\d{4}/);
    const state = m ? (/^(OR|Oregon)$/.test(m[2]) ? "OR" : "WA") : "";
    const city = m ? titleCase(m[1].replace(/^.*\b(?:St|Ave|Rd|Dr|Ln|Way|Ct|Blvd|Pl|Loop|Cir|Ter|Pkwy|Hwy|Street|Road|Drive|Lane|Court|Avenue)\.?\s+/i, "")) : "";
    if (state !== "OR" || !city) {
      led[c.key] = { at: new Date().toISOString().slice(0, 10), skipped: state === "WA" ? "outside Oregon (WA)" : "no city/state on the invoice", folder: c.folder.name };
      rmSync(dir, { recursive: true, force: true });
      console.log(`  skip ${c.key} ${c.folder.name.slice(0, 7)}: ${led[c.key].skipped}`);
      continue;
    }
    const files: string[] = [];
    for (const p of c.photos.slice(0, 16)) {
      try {
        const name = `${String(files.length + 1).padStart(2, "0")}.jpg`;
        await sharp(await download(p.id)).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(join(dir, "raw", name));
        files.push(name);
      } catch (e: any) { console.log(`    photo ${p.name} failed (${e.message})`); }
    }
    if (files.length < 3) { console.log(`  ${c.key}: only ${files.length} photos downloaded; skipped for now`); continue; }
    const tile = 400, cols = 4, rows = Math.ceil(files.length / cols);
    const tiles = await Promise.all(files.map(async (f, i) => {
      const img = await sharp(join(dir, "raw", f)).resize(tile, tile, { fit: "cover" }).toBuffer();
      const label = Buffer.from(`<svg width="${tile}" height="${tile}"><rect width="70" height="48" fill="#000" opacity=".7"/><text x="10" y="36" font-size="32" font-family="Arial" fill="#fff">${i + 1}</text></svg>`);
      return { input: await sharp(img).composite([{ input: label }]).toBuffer(), left: (i % cols) * (tile + 6), top: Math.floor(i / cols) * (tile + 6) };
    }));
    await sharp({ create: { width: cols * (tile + 6), height: rows * (tile + 6), channels: 3, background: "#fff" } }).composite(tiles).jpeg({ quality: 80 }).toFile(join(dir, "sheet.jpg"));
    // Line items: the invoice text minus anything that names or locates the customer.
    const street = c.folder.name.replace(/^[\d.]+[_ -]+/, "").split(",")[0].trim();
    const names = [...new Set((c.folder.name + " " + c.invoices.map((i) => i.name).join(" ")).match(/\b[A-Z][a-z]{2,}\b/g) || [])]
      .filter((n) => !/^(Invoice|Document|French|Roofing|Repair|Repairs|Roof|Warranty|Estimate|Year|Workmanship|Northeast|Northwest|Southeast|Southwest|North|South|East|West|Street|Avenue|Road|Drive|Lane|Court|Place|Loop|Way|Circle|Terrace|Boulevard|Highway|Parkway|Unit|Suite|Apartments|Maintenance|List|Repairlist)$/.test(n));
    const lines = text.split("\n").map((l) => l.replace(/\s{2,}/g, "  ").trim()).filter(Boolean)
      .filter((l) => !/\b9\d{4}\b|@|\(\d{3}\)|\d{3}[-.]\d{3}[-.]\d{4}|bill to|ship to|phone|email/i.test(l))
      .filter((l) => !names.some((n) => new RegExp(`\\b${n}\\b`).test(l)) && !l.toLowerCase().includes(street.toLowerCase().split(" ").slice(0, 2).join(" ")));
    writeJson(join(dir, "facts.json"), {
      job: c.key, source: "Drive Job Archive (JobNimbus era)", city, state: "OR", completed: c.month,
      jobType: c.warranty ? "Replacement (has a 5-year workmanship warranty document)" : "See invoice lines",
      suggestedService: c.warranty ? "roof-replacement" : "roof-repair",
      invoiceLines: lines.slice(0, 80), photos: files,
      note: "Facts come from these invoice lines and what is visible in the photos. Nothing else: no causes, history, prices, timelines or stats that aren't here. Never mention prices.",
    });
    writeJson(join(dir, "private.json"), { names, street });
    led[c.key] = { at: new Date().toISOString().slice(0, 10), status: "planned", folder: c.folder.name.slice(0, 7) };
    planned++;
    console.log(`  ${c.key}: ${city}, ${c.month}, ${files.length} photos${c.warranty ? ", warranty doc" : ""} -> operations/hcp-data/projects/${c.key}/`);
  }
  writeJson(LEDGER, led);
  console.log(`drive backfill: ${planned} planned`);
}

if (args.includes("--list")) {
  const cs = candidates();
  console.log(`${cs.length} candidates`);
  for (const c of cs) console.log(`  ${c.key} ${c.month} photos ${c.photos.length} invoices ${c.invoices.length}${c.warranty ? " warranty" : ""}`);
} else if (args.includes("--plan")) {
  plan(Number(arg("--max") || 12)).catch((e) => { console.error(e.message); process.exit(1); });
} else console.log("usage: --list | --plan [--max 12]");
