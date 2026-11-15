import data from "@/data/google-reviews.json";

/*
  Google reviews for the site (2026-11-15). Data: src/data/google-reviews.json, refreshed by `npm run reviews:sync`.
  /reviews shows every review (FTC Consumer Review Rule: a page presented as all reviews can't leave out the low
  ones). Review cards elsewhere on the site show 5-star reviews only, which the rule allows.
*/

export type Review = {
  id: string;
  name: string;
  stars: number | null;
  date: string | null;
  text: string;
  reply: { text: string; date: string | null } | null;
  url: string | null;
};

export type ReviewTopic = "replacement" | "repair" | "cleaning" | "inspection" | "financing" | "general";

// Our replies on Google sometimes end with a direct phone number. On the website only the main NAP number may appear
// (CLAUDE.md "NAP consistency"), so other numbers are dropped from reply text here. Review text is never changed.
const MAIN_PHONE_DIGITS = "9713768722";
function cleanReply(text: string): string {
  return text
    .replace(/\(?\b\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/g, (m) => (m.replace(/\D/g, "") === MAIN_PHONE_DIGITS ? m : ""))
    .replace(/[ \t]+$/gm, "")
    .trim();
}

export const REVIEWS: Review[] = (data.reviews as Review[]).map((r) =>
  r.reply ? { ...r, reply: { ...r.reply, text: cleanReply(r.reply.text) } } : r,
);
export const REVIEW_META = {
  rating: data.rating as number,
  count: data.count as number,
  googleUrl: data.googleUrl as string,
  fetchedAt: data.fetchedAt as string,
};

const TOPIC_PATTERNS: Record<ReviewTopic, RegExp | null> = {
  replacement: /replac|new roof|re-?roof|whole roof|full roof|tear/i,
  repair: /repair|leak|fix|patch|storm/i,
  cleaning: /clean|moss|gutter/i,
  inspection: /inspect|realtor|home (sale|purchase)|escrow|buyer/i,
  financing: /financ|budget|afford|price|cost|bid/i,
  general: null,
};

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** 5-star reviews with text, good length for a card; topic matches first; rotated by `seed` so pages differ. */
export function pickReviews({ topic = "general", seed, count = 1, skip = 0, exclude = [] }: { topic?: ReviewTopic; seed: string; count?: number; skip?: number; exclude?: string[] }): Review[] {
  const pool = REVIEWS.filter((r) => r.stars === 5 && r.text.length >= 60 && !exclude.includes(r.id));
  const re = TOPIC_PATTERNS[topic];
  const matched = re ? pool.filter((r) => re.test(r.text)) : [];
  const rest = pool.filter((r) => !matched.includes(r));
  const rotate = <T,>(arr: T[]) => {
    if (!arr.length) return arr;
    const k = hash(seed) % arr.length;
    return arr.slice(k).concat(arr.slice(0, k));
  };
  return rotate(matched).concat(rotate(rest)).slice(skip, skip + count);
}

/** Cut to about `max` characters at a word boundary. */
export function excerpt(text: string, max = 170): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  // Prefer ending on a full sentence when one ends in the last 40% of the space.
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (sentenceEnd >= max * 0.6) return cut.slice(0, sentenceEnd + 1) + " …";
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:!-]+$/, "") + "…";
}

export function formatMonthYear(iso: string | null): string {
  if (!iso) return "";
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** The home page hero review, chosen by Brittany (2026-11-15): Eric K., January 2026 (a reroof). */
export const HOME_HERO_REVIEW_ID = "95fa31a6cd36";
