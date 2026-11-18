/*
  Closed-out jobs -> /past-projects pages (2026-11-18). Part of the Wednesday Kewl run (skill step 6c).

    npm run projects -- --plan [--max 4]      pick new candidates, pull their photos, write facts + a contact sheet
    npm run projects -- --build <job#>        turn operations/hcp-data/projects/<job#>/draft.json into a DRAFT page
    npm run projects -- --board               dashboard records (db pages/*) for every page that changed since the last send
    npm run projects -- --board-sent          mark the last --board file as sent (after the 4:10am send commits it)
    npm run projects -- --approvals <dir>     read Brittany's dashboard decisions (an export of db pageok/*): publish the
                                              drafts she approved, file her change requests in feedback.json
    npm run projects -- --publish <slug|all>  draft -> published by hand (only with Brittany's OK)

  Candidates are close-outs (operations/hcp-data/closeouts/<job#>.json, written by fr-close-out) that are complete and
  paid, in Oregon (Brittany, 2026-11-18: Oregon only), not a $0 follow-up visit, with at least 3 photos in Housecall
  Pro. Ledger: operations/hcp-data/projects/handled.json (local, gitignored: it maps job numbers to pages).

  Privacy: pages carry city + state only. No street, customer name, house number or job number (checked by --build).
  Photos are re-encoded (EXIF and GPS stripped). The run (Claude) looks at every photo and leaves out house numbers,
  faces, readable plates, home fronts that identify the house, paperwork, and anything it can't identify.

  Pages are written as status "draft": hidden on frenchroofing.com, visible on the preview branch the wrapper pushes
  (projects-preview). Drafts land on the dashboard's SEO/AEO tab (db pages/*). Brittany approves there (db pageok/*,
  tied to the draft's rev so an approval never covers a later edit); the 4:10am daily job publishes what she approved and
  deploys (scripts/publish-approved-projects.sh; Brittany, 2026-11-18: "Once preview is approved, go ahead & push to live
  site"). A "needs changes" note goes to operations/hcp-data/projects/feedback.json for the next Wednesday run.
*/
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const CLOSEOUTS = join(ROOT, "operations/hcp-data/closeouts");
const WORK = join(ROOT, "operations/hcp-data/projects");
const LEDGER = join(WORK, "handled.json");
const DATA = join(ROOT, "src/data/projects");
const IMAGES = join(ROOT, "public/images/projects");
const BOARD_OUT = join(ROOT, "../../tools/unbound-hq/sync/out/project-pages-french-roofing.json");
const BOARD_SENT = join(WORK, "board-sent.json");
const FEEDBACK = join(WORK, "feedback.json");
const LIVE_URL = "https://frenchroofing.com";
export const PREVIEW_URL = "https://french-roofing-git-projects-preview-bb290s-projects.vercel.app";
const SERVICES = ["roof-replacement", "roof-repair", "roof-cleaning", "maintenance", "roof-inspections"] as const;
const args = process.argv.slice(2);
const arg = (f: string) => (args.indexOf(f) >= 0 ? args[args.indexOf(f) + 1] : undefined);

type Ledger = Record<string, { at: string; slug?: string; status?: string; skipped?: string }>;
const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));
const writeJson = (p: string, d: unknown) => writeFileSync(p, JSON.stringify(d, null, 2) + "\n");
const today = () => new Date().toISOString().slice(0, 10);
const ledger = (): Ledger => (existsSync(LEDGER) ? readJson(LEDGER) : {});
const titleCase = (s: string) => s.trim().toLowerCase().replace(/\b[a-z]/g, (c) => c.toUpperCase());
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Fresh close-out data (photo links expire after an hour). Read-only: close-out.ts --job never writes to HCP. */
function refresh(job: string) {
  execFileSync("npx", ["tsx", "scripts/close-out.ts", "--job", job], { cwd: ROOT, stdio: ["ignore", "ignore", "pipe"] });
  return readJson(join(CLOSEOUTS, `${job}.json`));
}

function why(d: any): string | null {
  if (!d.paid || !String(d.workStatus || "").startsWith("complete")) return "not complete and paid";
  if (d.address?.state !== "OR") return `outside Oregon (${d.address?.state || "no state"})`;
  if (/visit\s*#\s*\d/i.test(d.mainItem || "") || !(d.total > 0)) return "follow-up visit or $0 job";
  if ((d.photos?.length || 0) < 3) return `${d.photos?.length || 0} photos in Housecall Pro (needs 3+)`;
  return null;
}

async function plan() {
  const max = Number(arg("--max") || 4);
  const led = ledger();
  const jobs = readdirSync(CLOSEOUTS).filter((f) => /^\d+\.json$/.test(f)).map((f) => f.replace(".json", ""));
  const fresh = jobs
    .filter((j) => !led[j])
    .map((j) => ({ j, d: readJson(join(CLOSEOUTS, `${j}.json`)) }))
    .sort((a, b) => String(b.d.completedDate).localeCompare(String(a.d.completedDate)));
  let planned = 0;
  mkdirSync(WORK, { recursive: true });
  for (const { j, d: stale } of fresh) {
    if (planned >= max) break;
    // Skip on the saved data first (no API call), then refresh to get live photo links. A skipped job can be retried
    // by deleting its ledger entry (e.g. once its photos are in Housecall Pro).
    const pre = why(stale);
    if (pre) { led[j] = { at: today(), skipped: pre }; console.log(`  skip #${j}: ${pre}`); continue; }
    let d;
    try { d = refresh(j); } catch (e: any) { console.log(`  #${j}: Housecall Pro refresh failed (${e.message.split("\n")[0]}); try next week`); continue; }
    const w = why(d);
    if (w) { led[j] = { at: today(), skipped: w }; console.log(`  skip #${j}: ${w}`); continue; }
    const dir = join(WORK, j);
    rmSync(join(dir, "raw"), { recursive: true, force: true });
    mkdirSync(join(dir, "raw"), { recursive: true });
    const files: string[] = [];
    for (const [i, p] of d.photos.entries()) {
      try {
        const res = await fetch(p.url);
        if (!res.ok) throw new Error(String(res.status));
        const name = `${String(i + 1).padStart(2, "0")}.jpg`;
        await sharp(Buffer.from(await res.arrayBuffer())).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(join(dir, "raw", name));
        files.push(name);
      } catch (e: any) { console.log(`    photo ${i + 1} failed (${e.message})`); }
    }
    if (files.length < 3) { console.log(`  #${j}: only ${files.length} photos downloaded; try next week`); continue; }
    // Numbered contact sheet, 4 across, for triage. Open the full image before writing anything about it.
    const tile = 400, cols = 4, rows = Math.ceil(files.length / cols);
    const tiles = await Promise.all(files.map(async (f, i) => {
      const img = await sharp(join(dir, "raw", f)).resize(tile, tile, { fit: "cover" }).toBuffer();
      const label = Buffer.from(`<svg width="${tile}" height="${tile}"><rect width="70" height="48" fill="#000" opacity=".7"/><text x="10" y="36" font-size="32" font-family="Arial" fill="#fff">${i + 1}</text></svg>`);
      return { input: await sharp(img).composite([{ input: label }]).toBuffer(), left: (i % cols) * (tile + 6), top: Math.floor(i / cols) * (tile + 6) };
    }));
    await sharp({ create: { width: cols * (tile + 6), height: rows * (tile + 6), channels: 3, background: "#fff" } }).composite(tiles).jpeg({ quality: 80 }).toFile(join(dir, "sheet.jpg"));
    const city = titleCase(d.address.city || "");
    // Facts for the writer: job record only, no customer details.
    writeJson(join(dir, "facts.json"), {
      job: j, city, state: "OR", completed: String(d.completedDate || "").slice(0, 7),
      jobType: d.jobType, suggestedService: d.jobType === "Replacement" ? "roof-replacement" : d.jobType === "Maintenance" ? "maintenance" : "roof-repair",
      product: d.approvedOption || null, mainItem: d.mainItem, lineItems: d.lineItems, crewSize: (d.crew || []).length || null,
      photos: files, note: "Facts come from this job record and what is visible in the photos. Nothing else: no causes, history, prices, timelines or stats that aren't here.",
    });
    led[j] = { at: today(), status: "planned" };
    planned++;
    console.log(`  #${j}: ${d.jobType} in ${city}, ${String(d.completedDate).slice(0, 7)}, ${files.length} photos -> operations/hcp-data/projects/${j}/ (sheet.jpg, raw/, facts.json)`);
  }
  writeJson(LEDGER, led);
  const waiting = fresh.length - Object.keys(led).filter((k) => fresh.some((f) => f.j === k)).length;
  console.log(`projects: ${planned} planned this run${waiting > 0 ? `, ${waiting} close-outs still waiting (max ${max} a run)` : ""}`);
}

const BANNED = /premier|industry-leading|rockstar|synergy|amazing team|cutting-edge|world-class|best-in-class|portland metro|greater portland|family[- ]owned/i;
const STREET = /\b\d{2,6}\s+(?:[NSEW]{1,2}\s+)?[A-Z0-9][\w.]*(?:\s+[A-Z][\w.]*)*\s+(?:St|Street|Ave|Avenue|Rd|Road|Ln|Lane|Dr|Drive|Way|Ct|Court|Blvd|Pl|Place|Cir|Circle|Ter|Terrace|Pkwy|Hwy|Loop)\b/;

async function build(job: string) {
  const dir = join(WORK, job);
  const facts = readJson(join(dir, "facts.json"));
  const draft = readJson(join(dir, "draft.json"));
  const close = readJson(join(CLOSEOUTS, `${job}.json`));
  const problems: string[] = [];
  const service = draft.service || facts.suggestedService;
  if (!SERVICES.includes(service)) problems.push(`unknown service "${service}"`);
  const city = facts.city;
  if (!String(draft.title || "").includes(`${city}, OR`)) problems.push(`title must include "${city}, OR"`);
  const words = String(draft.summary || "").split(/\s+/).filter(Boolean).length;
  if (words < 30 || words > 80) problems.push(`summary is ${words} words (30-80)`);
  if (!Array.isArray(draft.scope) || draft.scope.length < 2) problems.push("scope needs 2+ bullets");
  if (!Array.isArray(draft.photos) || draft.photos.length < 3) problems.push("pick 3+ photos");
  const all = JSON.stringify(draft);
  const names = [close.customer?.firstName, ...(String(close.customer?.fullName || "").split(/\s+/))].filter((n) => n && n.length > 2);
  if (/[—–]/.test(all)) problems.push("em/en dash");
  if (BANNED.test(all)) problems.push(`banned word or phrase: ${all.match(BANNED)![0]}`);
  if (STREET.test(all) || all.includes(String(close.address?.street || "§§"))) problems.push("looks like a street address");
  if (/#\s?\d{2,}/.test(all) || all.includes(job)) problems.push("job number in the copy");
  for (const n of names) if (new RegExp(`\\b${n}\\b`, "i").test(all)) problems.push(`customer name "${n}" in the copy`);
  for (const p of draft.photos || []) {
    if (!facts.photos.includes(p.file)) problems.push(`photo ${p.file} isn't in raw/`);
    if (!p.alt || p.alt.length < 20) problems.push(`photo ${p.file}: alt text too short`);
  }
  if (problems.length) {
    console.log(`projects build #${job}: ${problems.length} problem(s)`);
    for (const p of problems) console.log("  FAIL " + p);
    process.exit(1);
  }
  const led = ledger();
  let slug = led[job]?.slug;
  if (!slug) {
    const base = `${service}-${slugify(city)}-${facts.completed}`;
    slug = base;
    for (let i = 2; existsSync(join(DATA, `${slug}.json`)); i++) slug = `${base}-${i}`;
  }
  const out = join(IMAGES, slug);
  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });
  const photos = [];
  for (const [i, p] of draft.photos.entries()) {
    const name = `${String(i + 1).padStart(2, "0")}.webp`;
    await sharp(join(dir, "raw", p.file)).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(out, name));
    photos.push({ src: `/images/projects/${slug}/${name}`, alt: p.alt, ...(p.caption ? { caption: p.caption } : {}), ...(p.stage ? { stage: p.stage } : {}) });
  }
  const project = {
    slug, status: "draft", service, title: draft.title, city, state: "OR", completed: facts.completed,
    ...(draft.material ? { material: draft.material } : {}), ...(draft.roofType ? { roofType: draft.roofType } : {}),
    summary: draft.summary, scope: draft.scope, ...(draft.body?.length ? { body: draft.body } : {}), photos,
    ...(draft.faqs?.length ? { faqs: draft.faqs } : {}), addedAt: today(),
  };
  mkdirSync(DATA, { recursive: true });
  writeJson(join(DATA, `${slug}.json`), project);
  led[job] = { ...led[job], at: today(), slug, status: "draft" };
  writeJson(LEDGER, led);
  if (existsSync(FEEDBACK)) {
    const fb = readJson(FEEDBACK);
    if (fb[slug]) { delete fb[slug]; writeJson(FEEDBACK, fb); console.log(`  cleared Brittany's change request for ${slug} (rebuilt)`); }
  }
  console.log(`projects build #${job}: draft src/data/projects/${slug}.json, ${photos.length} photos. Preview: ${PREVIEW_URL}/past-projects/${slug}`);
}

function drafts() {
  if (!existsSync(DATA)) return [];
  return readdirSync(DATA).filter((f) => f.endsWith(".json")).map((f) => readJson(join(DATA, f))).filter((p) => p.status === "draft");
}

function projects() {
  if (!existsSync(DATA)) return [];
  return readdirSync(DATA).filter((f) => f.endsWith(".json")).map((f) => readJson(join(DATA, f)));
}

// A draft's fingerprint: an approval counts only for the exact copy and photos Brittany saw.
export const rev = (p: any) => {
  const { status, ...rest } = p;
  const h = createHash("sha1").update(JSON.stringify(rest));
  for (const ph of p.photos || []) {
    const f = join(ROOT, "public", ph.src);
    if (existsSync(f)) h.update(readFileSync(f));
  }
  return h.digest("hex").slice(0, 12);
};

async function board() {
  const sent = existsSync(BOARD_SENT) ? readJson(BOARD_SENT) : {};
  const fb = existsSync(FEEDBACK) ? readJson(FEEDBACK) : {};
  const writes = [];
  const next: Record<string, string> = {};
  for (const p of projects()) {
    const r = rev(p);
    const key = `${p.status}:${r}:${fb[p.slug]?.at || ""}`;
    next[p.slug] = key;
    if (sent[p.slug] === key) continue;
    const first = join(ROOT, "public", p.photos[0].src);
    const thumb = existsSync(first)
      ? "data:image/webp;base64," + (await sharp(first).resize({ width: 360, height: 240, fit: "cover" }).webp({ quality: 60 }).toBuffer()).toString("base64")
      : "";
    writes.push({
      op: "set", collection: "pages", doc_id: `french-roofing~${p.slug}`,
      data: {
        client: "french-roofing", kind: "past-project", slug: p.slug, title: p.title, city: p.city, service: p.service,
        summary: p.summary, photos: p.photos.length, status: p.status, rev: r, thumb,
        preview: `${PREVIEW_URL}/past-projects/${p.slug}`, live: `${LIVE_URL}/past-projects/${p.slug}`,
        addedAt: p.addedAt, changes: fb[p.slug] ? { note: fb[p.slug].note, at: fb[p.slug].at } : null, at: new Date().toISOString(),
      },
    });
  }
  mkdirSync(join(BOARD_OUT, ".."), { recursive: true });
  if (!writes.length) {
    rmSync(BOARD_OUT, { force: true });
    return console.log("projects: dashboard pages up to date; nothing to send");
  }
  writeJson(BOARD_OUT, writes);
  writeJson(join(WORK, "board-pending.json"), next);
  console.log(`projects: ${writes.length} dashboard page record(s) prepared (${writes.filter((w) => w.data.status === "draft").length} draft) -> ${BOARD_OUT}`);
}

function boardSent() {
  const pend = join(WORK, "board-pending.json");
  if (!existsSync(pend)) return console.log("projects: nothing pending");
  writeJson(BOARD_SENT, readJson(pend));
  rmSync(pend);
  rmSync(BOARD_OUT, { force: true });
  console.log("projects: dashboard page records marked sent");
}

// Brittany's decisions from the dashboard (an `ArtifactData list` export of db pageok/*). Prints one line per
// published slug as "PUBLISHED <slug>" so the deploy script knows what to commit.
function approvals(dir: string) {
  const d = existsSync(join(dir, "pageok")) ? join(dir, "pageok") : dir;
  if (!existsSync(d)) return console.log("projects: no decisions exported");
  const byslug = Object.fromEntries(projects().map((p) => [p.slug, p]));
  const fb = existsSync(FEEDBACK) ? readJson(FEEDBACK) : {};
  for (const f of readdirSync(d).filter((x) => x.endsWith(".json"))) {
    const a = readJson(join(d, f));
    if (a.client !== "french-roofing" || !a.slug) continue;
    const p = byslug[a.slug];
    if (!p) { console.log(`  skip ${a.slug}: no such page`); continue; }
    if (p.status !== "draft") continue;
    const r = rev(p);
    if (a.rev !== r) { console.log(`  skip ${a.slug}: decision was for an older version of the draft`); continue; }
    if (a.decision === "approve") {
      publish(a.slug);
      console.log(`PUBLISHED ${a.slug}`);
    } else if (a.decision === "changes" && fb[a.slug]?.at !== a.at) {
      fb[a.slug] = { note: String(a.note || "").slice(0, 2000), at: a.at, rev: r };
      console.log(`  change request filed for ${a.slug}`);
    }
  }
  writeJson(FEEDBACK, fb);
}

function publish(which: string) {
  const list = drafts().filter((p) => which === "all" || p.slug === which);
  if (!list.length) return console.log(`projects: no draft matches "${which}"`);
  const led = ledger();
  for (const p of list) {
    p.status = "published";
    writeJson(join(DATA, `${p.slug}.json`), p);
    for (const k of Object.keys(led)) if (led[k].slug === p.slug) led[k].status = "published";
    console.log(`  published ${p.slug}`);
  }
  writeJson(LEDGER, led);
}

async function main() {
  if (args.includes("--plan")) return plan();
  if (arg("--build")) return build(arg("--build")!);
  if (args.includes("--board")) return board();
  if (args.includes("--board-sent")) return boardSent();
  if (arg("--approvals")) return approvals(arg("--approvals")!);
  if (arg("--publish")) return publish(arg("--publish")!);
  console.log("usage: --plan [--max 4] | --build <job#> | --board | --board-sent | --approvals <dir> | --publish <slug|all>");
}
main().catch((e) => {
  console.error("projects failed:", e.message);
  process.exit(1);
});
