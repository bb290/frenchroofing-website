/*
  New Google reviews -> review posts (2026-11-18). Part of the Wednesday Kewl run.

    npm run review:posts -- --plan                 make a folder + skeleton posts.json for every review not handled yet
    npm run review:posts -- --render <slug>        render the 4 images, upload them to Vercel Blob, set image_url
    npm run review:posts -- --check <slug>         verify captions, quotes, images before the dashboard sync
    npm run review:posts -- --plan --dry-run       report only

  Source: src/data/google-reviews.json (refreshed by `npm run reviews:sync`). Ledger of what's been handled:
  social/reviews/handled.json ({ <review id>: { slug } | { skipped: <reason> } }). Delete an entry to redo a review.

  Each eligible review (4-5 stars, a written review of 40+ characters) gets 4 posts in the approved looks
  (social/reviews/design/direction-approved.md), rotating A note / B card / C poster / D kraft, on Monday and Wednesday
  (the review-post days; photo posts use Tue/Thu/Sat/Sun). Post 1 takes the first free Mon/Wed at least 7 days out,
  each next post about 13 weeks later on the next free Mon/Wed. Lower-star or star-only reviews are never turned into
  posts; they're recorded as skipped. Quotes on the images and in captions stay word for word (checked by --check).

  The run (Claude) fills in each post's `image.quote` (and `image.headline` for the C poster: a short phrase taken
  word for word from the review) plus the four captions, then runs --render and --check. Posts are `ready` for the
  Unbound Dashboard; Brittany's approval there schedules them. Nothing here touches Metricool.
*/
import { put } from "@vercel/blob";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const REVIEWS = join(ROOT, "src/data/google-reviews.json");
const POSTS = join(ROOT, "social/reviews/posts");
const LEDGER = join(ROOT, "social/reviews/handled.json");
const PHOTO_DIR = join(ROOT, "public/images/gallery"); // vetted photos of French Roofing's own finished work
const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");

loadEnvLocal();

type Review = { id: string; name: string; stars: number | null; date: string | null; text: string };
type Look = "A" | "B" | "C" | "D";
const LOOKS: Record<Look, { name: string; word: string; ig: string }> = {
  A: { name: "A. Jobsite note", word: "note", ig: "18:07" },
  B: { name: "B. Review card", word: "card", ig: "18:07" },
  C: { name: "C. Surf poster", word: "poster", ig: "12:17" },
  D: { name: "D. Torn kraft paper", word: "kraft", ig: "18:07" },
};
const ORDER: Look[] = ["A", "B", "C", "D"];
const PLATFORMS = ["gmb", "linkedin", "facebook", "instagram"] as const;

const readJson = (p: string) => JSON.parse(readFileSync(p, "utf8"));
const writeJson = (p: string, d: unknown) => writeFileSync(p, JSON.stringify(d, null, 2) + "\n");

function loadEnvLocal() {
  const p = join(ROOT, ".env.local");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

function folders(): string[] {
  return readdirSync(POSTS).filter((n) => existsSync(join(POSTS, n, "posts.json")));
}

// ---------- dates ----------
const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => {
  const d = new Date(s + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
};
const isReviewDay = (s: string) => [1, 3].includes(new Date(s + "T12:00:00Z").getUTCDay()); // Mon, Wed

function takenDays(): Set<string> {
  const t = new Set<string>();
  for (const n of folders()) for (const p of readJson(join(POSTS, n, "posts.json")).posts) t.add(p.date);
  return t;
}
function nextFree(from: string, taken: Set<string>): string {
  let d = from;
  while (!isReviewDay(d) || taken.has(d)) d = addDays(d, 1);
  taken.add(d);
  return d;
}

/** Look for post 1 continues the rotation from the review whose first post is latest. */
function nextStartLook(): Look {
  let latest = "", look: Look = "D";
  for (const n of folders()) {
    const p1 = readJson(join(POSTS, n, "posts.json")).posts.find((p: { n: number }) => p.n === 1);
    if (p1 && p1.date > latest) {
      latest = p1.date;
      look = (p1.look as string)[0] as Look;
    }
  }
  return ORDER[(ORDER.indexOf(look) + 1) % 4];
}

function slugFor(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "google-user";
  let s = base, i = 2;
  while (existsSync(join(POSTS, s))) s = `${base}-${i++}`;
  return s;
}

function photoPool(): string[] {
  return readdirSync(PHOTO_DIR).filter((f) => /\.(webp|jpe?g|png)$/i.test(f)).sort().map((f) => `public/images/gallery/${f}`);
}
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

// ---------- --plan ----------
function plan() {
  const data = readJson(REVIEWS) as { reviews: Review[] };
  const ledger: Record<string, { slug?: string; skipped?: string; at: string }> = existsSync(LEDGER) ? readJson(LEDGER) : {};
  const today = iso(new Date());
  const taken = takenDays();
  const pool = photoPool();
  const fresh = data.reviews.filter((r) => !ledger[r.id]).sort((a, b) => ((a.date || "") < (b.date || "") ? -1 : 1));
  if (!fresh.length) return console.log("review-posts: no new reviews");
  let start = nextStartLook();
  for (const r of fresh) {
    if ((r.stars ?? 0) < 4 || (r.text || "").length < 40) {
      const why = (r.stars ?? 0) < 4 ? `${r.stars} stars (never turned into posts; reply on Google)` : "no written review (stars only)";
      console.log(`  skip ${r.name} (${r.date}): ${why}`);
      if (!DRY) ledger[r.id] = { skipped: why, at: today };
      continue;
    }
    const slug = slugFor(r.name);
    const posts = [];
    let d = addDays(today, 7);
    for (let n = 1; n <= 4; n++) {
      const date = nextFree(d, taken);
      const look = ORDER[(ORDER.indexOf(start) + n - 1) % 4];
      posts.push({
        n,
        look: LOOKS[look].name,
        date,
        ig_time: LOOKS[look].ig,
        image: { quote: "", ...(look === "C" ? { headline: "" } : {}), photo: pool[hash(`${slug}-${n}`) % pool.length] },
        image_url: null,
        status: Object.fromEntries(PLATFORMS.map((p) => [p, "ready"])),
        instagram: "", facebook: "", linkedin: "", gmb: "",
      });
      d = addDays(date, 91);
    }
    start = ORDER[(ORDER.indexOf(start) + 1) % 4];
    console.log(`  new ${r.name} (${r.stars} stars, ${r.date}) -> social/reviews/posts/${slug}: ${posts.map((p) => `${p.date} ${p.look[0]}`).join(", ")}`);
    if (DRY) continue;
    mkdirSync(join(POSTS, slug), { recursive: true });
    writeJson(join(POSTS, slug, "posts.json"), {
      review: { id: r.id, source: `Google review via reviews-sync (${today})`, name_shown: r.name, stars: r.stars, date: r.date, text: r.text },
      rotation_start: posts[0].look[0],
      posts,
    });
    ledger[r.id] = { slug, at: today };
  }
  if (!DRY) writeJson(LEDGER, ledger);
}

// ---------- --render ----------
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const star = (size: number, fill: string) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="${fill}"/></svg>`;
const stars = (n: number, size: number, fill: string) => Array.from({ length: n }, () => star(size, fill)).join("");
const monthYear = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

function html(look: Look, o: { quote: string; headline?: string; name: string; stars: number; date: string; photo: string }) {
  const q = esc(o.quote), name = esc(o.name), img = `<img src="${o.photo}" alt="">`;
  const body: Record<Look, string> = {
    A: `<div class="bg">${img}</div>
      <div style="position:absolute;left:110px;top:470px;width:860px;height:760px;transform:rotate(-2.5deg);box-shadow:0 30px 60px rgba(0,0,0,.35),0 6px 14px rgba(0,0,0,.25)">
      <div style="width:860px;height:760px;box-sizing:border-box;padding:92px 72px 56px;background:#fbf7ec;background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 67px,#d9e3ef 67px,#d9e3ef 69px);background-position:0 40px;clip-path:polygon(0 0,100% 0,100% 96%,96% 99%,91% 96.5%,85% 99.5%,79% 97%,72% 99%,66% 96.5%,59% 99.5%,52% 97%,45% 99.5%,38% 96.8%,31% 99.3%,24% 97%,17% 99.5%,10% 96.8%,4% 99.2%,0 97%);display:flex;flex-direction:column;gap:22px;color:#092e5e">
        <div style="display:flex;gap:6px">${stars(o.stars, 54, "#d85024")}</div>
        <p class="fit" data-min="44" style="margin:0;font-family:Caveat,cursive;font-weight:700;font-size:62px;line-height:69px;flex:1 1 auto;min-height:0;overflow:hidden">${q}</p>
        <p style="margin:0;font-family:Caveat,cursive;font-weight:600;font-size:54px;line-height:69px;color:#d85024;align-self:flex-end">${name}</p>
      </div></div>
      <div style="position:absolute;left:440px;top:438px;width:230px;height:70px;background:rgba(216,80,36,.88);transform:rotate(3deg);box-shadow:0 2px 4px rgba(0,0,0,.15)"></div>`,
    B: `<div class="bg" style="--pos:42% center">${img}</div>
      <div style="position:absolute;left:72px;right:72px;bottom:96px;max-height:900px;box-sizing:border-box;padding:48px 52px 52px;background:#fff;border-radius:24px;box-shadow:0 40px 80px rgba(9,46,94,.35),0 8px 20px rgba(0,0,0,.18);display:flex;flex-direction:column;gap:28px;font-family:Inter,sans-serif;color:#3e3d3b">
        <div style="display:flex;align-items:center;gap:22px">
          <div style="width:88px;height:88px;border-radius:44px;background:#092e5e;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:44px;font-weight:700;color:#ffbd59">${esc(o.name[0] || "G")}</span></div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <span style="font-size:36px;font-weight:700;color:#092e5e">${name}</span>
            <div style="display:flex;align-items:center;gap:14px"><div style="display:flex;gap:4px">${stars(o.stars, 30, "#d85024")}</div>
            <span style="font-size:28px;font-weight:500;color:#6b6a67">Google review, ${monthYear(o.date)}</span></div>
          </div>
        </div>
        <p class="fit" data-min="28" style="margin:0;font-size:37px;line-height:1.38;color:#3e3d3b;max-height:640px;overflow:hidden">${q}</p>
      </div>`,
    C: `<div style="position:absolute;inset:0;background:#092e5e"></div>
      <div style="position:absolute;left:-460px;top:380px;width:2000px;height:2000px;border-radius:1000px;background:repeating-conic-gradient(from 0deg,#14417a 0deg 7deg,transparent 7deg 15deg)"></div>
      <div style="position:absolute;left:0;right:0;top:78px;height:460px;padding:0 72px;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:22px;text-align:center;font-family:Inter,sans-serif;color:#fdfcfa">
        <div style="display:flex;gap:8px">${stars(o.stars, 44, "#ffbd59")}</div>
        <p class="fit" data-min="64" style="margin:0;font-family:Shrikhand,serif;font-size:108px;line-height:1.02;color:#ffbd59;transform:rotate(-3deg);max-height:270px;padding-bottom:.25em;box-sizing:border-box;overflow:hidden;flex-shrink:0">${esc(o.headline || "")}</p>
        <p class="fit" data-min="28" style="margin:0;font-size:38px;line-height:1.3;font-weight:500;max-width:860px;max-height:110px;overflow:hidden;flex-shrink:0">&ldquo;${q}&rdquo;</p>
      </div>
      <div style="position:absolute;left:170px;top:560px;width:740px;height:640px;box-sizing:border-box;border:14px solid #d85024;border-bottom:none;border-radius:370px 370px 0 0;overflow:hidden;background:#3e3d3b">
        <img src="${o.photo}" alt="" style="width:712px;height:626px;object-fit:cover;object-position:center 55%;display:block"></div>
      <div style="position:absolute;left:0;right:0;top:1200px;height:150px;background:#d85024;display:flex;align-items:center;justify-content:center;font-family:Inter,sans-serif">
        <span style="font-size:34px;font-weight:700;color:#fff">${name}, on Google</span></div>`,
    D: `<div class="bg" style="--pos:60% center">${img}</div>
      <div style="position:absolute;left:120px;top:330px;width:840px;height:720px;transform:rotate(3deg);filter:drop-shadow(6px 26px 26px rgba(0,0,0,.42))">
      <div style="width:840px;height:720px;box-sizing:border-box;padding:96px 76px 88px;background-color:#c49a6c;background-image:repeating-linear-gradient(97deg,rgba(255,255,255,.05) 0 2px,transparent 2px 9px),repeating-linear-gradient(8deg,rgba(90,55,25,.07) 0 1px,transparent 1px 13px);clip-path:polygon(0 3%,5% .8%,11% 3.2%,17% .5%,24% 2.6%,31% .4%,38% 3%,45% 1%,52% 3.4%,59% .6%,66% 2.8%,73% .5%,80% 3%,87% .8%,94% 2.9%,100% 1%,99% 25%,100% 52%,99.2% 78%,100% 98%,94% 96.8%,87% 99.4%,80% 97%,73% 99.5%,66% 96.9%,59% 99.2%,52% 96.6%,45% 99.5%,38% 97.2%,31% 99.4%,24% 96.8%,17% 99.5%,11% 97%,5% 99.3%,0 97.4%,.8% 72%,0 48%,.6% 22%);display:flex;flex-direction:column;gap:34px;color:#092e5e">
        <div style="display:flex;gap:10px">${stars(o.stars, 58, "#d85024")}</div>
        <p class="fit" data-min="38" style="margin:0;font-family:'Permanent Marker',cursive;font-size:58px;line-height:1.25;flex:1 1 auto;min-height:0;overflow:hidden">${q}</p>
        <p style="margin:0;font-family:'Permanent Marker',cursive;font-size:46px;color:#092e5e;align-self:flex-end">${name}</p>
      </div></div>`,
  };
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Caveat:wght@600;700&family=Shrikhand&family=Permanent+Marker&display=block" rel="stylesheet">
<style>body{margin:0}#c{width:1080px;height:1350px;position:relative;overflow:hidden;background:#3e3d3b}
.bg img{position:absolute;inset:0;width:1080px;height:1350px;object-fit:cover;object-position:var(--pos,center 30%);display:block}</style>
</head><body><div id="c">${body[look]}</div></body></html>`;
}

async function render(slug: string) {
  const file = join(POSTS, slug, "posts.json");
  const d = readJson(file);
  if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error("BLOB_READ_WRITE_TOKEN not set (.env.local)");
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  try {
    for (const p of d.posts) {
      const look = (p.look as string)[0] as Look;
      if (!p.image?.quote) throw new Error(`post ${p.n}: image.quote is empty`);
      if (look === "C" && !p.image.headline) throw new Error(`post ${p.n}: C poster needs image.headline`);
      const photoPath = join(ROOT, p.image.photo);
      const mime = photoPath.endsWith(".webp") ? "image/webp" : photoPath.endsWith(".png") ? "image/png" : "image/jpeg";
      const photo = `data:${mime};base64,${readFileSync(photoPath).toString("base64")}`;
      await page.setContent(
        html(look, { quote: p.image.quote, headline: p.image.headline, name: d.review.name_shown, stars: d.review.stars, date: d.review.date, photo }),
        { waitUntil: "networkidle" },
      );
      await page.evaluate(() => document.fonts.ready);
      // Shrink each text block until it fits its box; fail if it can't reach its minimum size.
      const overflow = await page.evaluate(() => {
        const bad: string[] = [];
        for (const el of Array.from(document.querySelectorAll<HTMLElement>(".fit"))) {
          const min = Number(el.dataset.min || 20);
          let size = parseFloat(getComputedStyle(el).fontSize);
          const lh = getComputedStyle(el).lineHeight;
          const ratio = lh.endsWith("px") ? parseFloat(lh) / size : null;
          while (el.scrollHeight > el.clientHeight + 1 && size > min) {
            size -= 2;
            el.style.fontSize = size + "px";
            if (ratio && !el.style.fontFamily.includes("Caveat")) el.style.lineHeight = size * ratio + "px";
          }
          if (el.scrollHeight > el.clientHeight + 1) bad.push(el.textContent!.slice(0, 40));
        }
        return bad;
      });
      if (overflow.length) throw new Error(`post ${p.n} (${look}): text too long for this look even at the smallest size: "${overflow[0]}…". Use a shorter quote.`);
      const name = `${slug}-${p.n}-${LOOKS[look].word}.png`;
      const png = await page.locator("#c").screenshot({ type: "png" });
      writeFileSync(join(POSTS, slug, name), png);
      const { url } = await put(`social/reviews/${name}`, png, { access: "public", contentType: "image/png", allowOverwrite: true });
      p.image_url = url;
      console.log(`  ${name} -> ${url}`);
    }
  } finally {
    await browser.close();
  }
  writeJson(file, d);
}

// ---------- --check ----------
function check(slug: string): boolean {
  const d = readJson(join(POSTS, slug, "posts.json"));
  // Word for word, ignoring spacing and capitals (a headline may start a sentence fragment with a capital).
  const text = (d.review.text as string).replace(/\s+/g, " ").toLowerCase();
  const norm = (s: string) => s.replace(/\s+/g, " ").replace(/\.\.\.|…/g, "").trim().toLowerCase();
  const problems: string[] = [];
  const quoted = (s: string) => [...s.matchAll(/["“]([^"”]{12,})["”]/g)].map((m) => m[1]);
  const files = readdirSync(join(POSTS, slug));
  for (const p of d.posts) {
    const look = (p.look as string)[0] as Look;
    const where = `post ${p.n}`;
    for (const piece of [p.image?.quote, p.image?.headline].filter(Boolean))
      if (!text.includes(norm(String(piece)))) problems.push(`${where}: image text isn't word for word from the review: "${piece}"`);
    if (!p.image_url) problems.push(`${where}: no image_url (run --render)`);
    if (!files.includes(`${slug}-${p.n}-${LOOKS[look].word}.png`)) problems.push(`${where}: image file missing`);
    for (const pl of PLATFORMS) {
      const c: string = p[pl] || "";
      if (!c.trim()) problems.push(`${where} ${pl}: caption empty`);
      if (/—|–/.test(c)) problems.push(`${where} ${pl}: em/en dash`);
      if (/\b\d{3}[-.\s)]\s?\d{3}[-.\s]\d{4}\b/.test(c)) problems.push(`${where} ${pl}: phone number`);
      if (/family[- ]owned|portland metro|greater portland/i.test(c)) problems.push(`${where} ${pl}: banned phrase`);
      if (/premier|industry-leading|rockstar|synergy|amazing team|cutting-edge|world-class|best-in-class/i.test(c)) problems.push(`${where} ${pl}: banned word`);
      if (pl === "instagram" && /#\w/.test(c)) problems.push(`${where} instagram: hashtag`);
      for (const q of quoted(c)) if (!text.includes(norm(q))) problems.push(`${where} ${pl}: quote isn't word for word: "${q.slice(0, 50)}"`);
    }
  }
  if (problems.length) {
    console.log(`review-posts check ${slug}: ${problems.length} problem(s)`);
    for (const x of problems) console.log("  FAIL " + x);
    return false;
  }
  console.log(`review-posts check ${slug}: clean (4 posts, ${d.posts.map((p: { date: string }) => p.date).join(", ")})`);
  return true;
}

async function main() {
  const i = (f: string) => args.indexOf(f);
  if (args.includes("--plan")) return plan();
  if (i("--render") >= 0) return render(args[i("--render") + 1]);
  if (i("--check") >= 0) return process.exit(check(args[i("--check") + 1]) ? 0 : 1);
  console.log("usage: --plan [--dry-run] | --render <slug> | --check <slug>");
}
main().catch((e) => {
  console.error("review-posts failed:", e.message);
  process.exit(1);
});
