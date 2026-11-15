/*
  Pull every French Roofing Google review into src/data/google-reviews.json (2026-11-15).

    npm run reviews:sync              fetch, save, report new reviews
    npm run reviews:sync -- --dry-run fetch and report, save nothing

  Source: DataForSEO Google Reviews through the Composio CLI (connection dataforseo_aver-brooky; about half a cent a
  run). Not the Google Places API: that API returns only 5 reviews and doesn't allow storing them.

  The site reads the JSON at build time, so the review text is in the page HTML for search engines. Saving new
  reviews here does NOT publish them: the site only changes when this file is committed and deployed (human review
  before publish). When there are new reviews it also writes a dashboard to-do for Brittany
  (../../tools/unbound-hq/sync/out/review-todos-french-roofing.json, sent by the daily indexing job).

  Names are shortened to first name + last initial, as on the review posts. Review and reply text is kept exactly
  as written on Google.
*/
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const CID = "17427260764302123367"; // French Roofing's Google Maps listing
const ROOT = process.cwd(); // run from the repo root (npm run reviews:sync)
const OUT = join(ROOT, "src/data/google-reviews.json");
const TODO_OUT = join(ROOT, "../../tools/unbound-hq/sync/out/review-todos-french-roofing.json");
const DRY = process.argv.includes("--dry-run");

type Raw = Record<string, any>;

function composio(slug: string, data: object): any {
  const out = execFileSync("composio", ["execute", slug, "-d", JSON.stringify(data)], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 50 * 1024 * 1024,
  });
  let res = JSON.parse(out);
  if (res.storedInFile && res.outputFilePath) res = JSON.parse(readFileSync(res.outputFilePath, "utf8"));
  if (res.successful === false) throw new Error(`${slug} failed: ${JSON.stringify(res.error)}`);
  return res.data ?? res;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function shortName(full: string): string {
  const parts = (full || "").trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "Google user";
  const first = parts[0][0].toUpperCase() + parts[0].slice(1);
  if (parts.length === 1) return first;
  return `${first} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

const isoDate = (ts?: string) => (ts ? ts.slice(0, 10) : null);

// Only the main NAP number may appear on the site, and this file sits in a public repo: drop any other phone number
// from our replies (one reply ended with a direct cell number). Review text is never changed.
function cleanReply(text: string): string {
  return text
    .replace(/\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g, (m) => (m.replace(/\D/g, "") === "9713768722" ? m : ""))
    .replace(/[ \t]+$/gm, "")
    .trim();
}

async function main() {
  const created = composio("DATAFORSEO_CREATE_BUSINESS_DATA_GOOGLE_REVIEWS_TASK", {
    cid: CID,
    depth: 200,
    sort_by: "newest",
    language_code: "en",
    location_name: "Portland,Oregon,United States",
    tag: "fr-reviews-sync",
  });
  const id = created.tasks?.[0]?.id;
  if (!id) throw new Error("no task id: " + JSON.stringify(created).slice(0, 300));

  let result: Raw | null = null;
  for (let i = 0; i < 40 && !result; i++) {
    await sleep(i === 0 ? 8000 : 6000);
    const got = composio("DATAFORSEO_GET_BUSINESS_DATA_GOOGLE_REVIEWS_TASK", { id });
    const t = got.tasks?.[0];
    if (t?.status_code === 20000 && t.result?.[0]?.items) result = t.result[0];
  }
  if (!result) throw new Error("reviews task did not finish in time");

  const reviews = (result.items as Raw[])
    .filter((it) => it.type === "google_reviews_search" || it.rating)
    .map((it) => ({
      id: createHash("sha1").update(it.review_id || it.review_url || it.timestamp).digest("hex").slice(0, 12),
      name: shortName(it.profile_name),
      stars: it.rating?.value ?? null,
      date: isoDate(it.timestamp),
      text: (it.review_text || "").trim(),
      reply: it.owner_answer ? { text: cleanReply(String(it.owner_answer)), date: isoDate(it.owner_timestamp) } : null,
      url: it.review_url || null,
    }))
    .sort((a, b) => (a.date! < b.date! ? 1 : -1));

  const data = {
    source: "Google reviews via DataForSEO",
    fetchedAt: new Date().toISOString(),
    rating: result.rating?.value ?? null,
    count: result.reviews_count ?? reviews.length,
    googleUrl: `https://www.google.com/maps?cid=${CID}`,
    reviews,
  };

  const before = existsSync(OUT) ? JSON.parse(readFileSync(OUT, "utf8")) : { reviews: [] };
  const known = new Set((before.reviews as { id: string }[]).map((r) => r.id));
  const fresh = reviews.filter((r) => !known.has(r.id));

  console.log(`reviews-sync: ${reviews.length} reviews, ${data.rating} average, ${fresh.length} new since last save`);
  for (const r of fresh) console.log(`  new: ${r.stars} stars, ${r.date}, ${r.name}: ${r.text.slice(0, 80)}`);
  if (DRY) return;

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(data, null, 2) + "\n");

  // Dashboard to-do for Brittany when there's something new (first run seeds the file, no to-do).
  if (fresh.length && before.reviews.length) {
    const tid = "fr-new-reviews-" + createHash("sha1").update(fresh.map((r) => r.id).join()).digest("hex").slice(0, 8);
    const low = fresh.filter((r) => (r.stars ?? 5) < 5);
    const todo = {
      client: "french-roofing",
      kind: "decide",
      title: `${fresh.length} new Google review${fresh.length > 1 ? "s" : ""} ready for frenchroofing.com`,
      detail:
        fresh.map((r) => `${r.stars} stars, ${r.name} (${r.date})`).join("; ") +
        (low.length ? `. Includes ${low.length} under 5 stars: reply on Google first.` : ".") +
        " The weekly sync saved them in the site's review file; the website only changes after you say go.",
      steps: [
        "Open the review(s) on Google and reply if you haven't (every review on the site shows your reply).",
        'Tell Claude "publish the new French Roofing reviews". Claude commits the review file and deploys.',
        "Kewl makes a post for every review: drop the review into the next Kewl run as usual.",
      ],
      link: { label: "French Roofing on Google", url: data.googleUrl },
      at: new Date().toISOString().slice(0, 10),
      source: "reviews-sync (weekly)",
      status: "open",
    };
    mkdirSync(dirname(TODO_OUT), { recursive: true });
    writeFileSync(TODO_OUT, JSON.stringify([{ op: "set", collection: "todos", doc_id: tid, data: todo }], null, 2));
    console.log(`reviews-sync: dashboard to-do prepared (${tid})`);
  }
}

main().catch((e) => {
  console.error("reviews-sync failed:", e.message);
  process.exit(1);
});
