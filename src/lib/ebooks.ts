// Downloadable ebook (PDF) configuration, one per guide cluster.
// PDFs are generated locally via `npm run ebooks` (scripts/generate-ebooks.mjs)
// and committed as static files under public/downloads/.

export type Ebook = {
  clusterId: string;
  /** Output filename under /downloads/. */
  file: string;
  /** Cover title (can differ from cluster name). */
  title: string;
  subtitle: string;
  coverImage: string;
  /** Append the 10 Essential Questions chapter (from /essentials). */
  includeEssentials?: boolean;
};

export const EBOOKS: Ebook[] = [
  {
    clusterId: "roofing-101",
    file: "french-roofing-roofing-101.pdf",
    title: "Roofing 101",
    subtitle:
      "How a roof actually works: every component explained, from the deck to the ridge cap.",
    coverImage: "/images/workers-tearoff.webp",
  },
  {
    clusterId: "replacement-decision",
    file: "french-roofing-roof-replacement-guide.pdf",
    title: "The Roof Replacement Guide",
    subtitle:
      "Lifespans, costs, materials, timing, financing, warranties, and the 10 questions to ask any contractor.",
    coverImage: "/images/house-after.webp",
    includeEssentials: true,
  },
  {
    clusterId: "leaks-repair",
    file: "french-roofing-leaky-roof-guide.pdf",
    title: "The Leaky Roof Guide",
    subtitle:
      "Find it, stop it, fix it: a calm handbook for ceiling stains, storm damage, and everything that drips.",
    coverImage: "/images/cracked-flashing.webp",
  },
  {
    clusterId: "moss-care",
    file: "french-roofing-roof-maintenance-guide.pdf",
    title: "The Roof Maintenance Guide",
    subtitle:
      "Moss, gutters, valleys, and the seasonal habits that add years to an Oregon roof.",
    coverImage: "/images/worker-ridge.webp",
  },
];

export function getEbook(clusterId: string): Ebook | undefined {
  return EBOOKS.find((e) => e.clusterId === clusterId);
}
