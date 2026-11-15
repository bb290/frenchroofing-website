import Image from "next/image";

// Newest first. Swap in fresh job photos as they come through the Kewl sort.
// Name a city only when the photo's sort note clears it (BRAND.md sec. 9).
const recentWork = [
  {
    src: "/images/recent-certainteed-training.webp",
    alt: "French Roofing crew in the CertainTeed ShingleMaster Credential Course",
    caption: "Getting CertainTeed ShingleMaster certified",
  },
  {
    src: "/images/recent-new-shingles-vents.webp",
    alt: "New asphalt shingle roof with a flue cap, box vents, and pipe boot in Oregon City, OR",
    caption: "New shingles, vents, and flashing in Oregon City",
  },
  {
    src: "/images/recent-synthetic-underlayment.webp",
    alt: "Synthetic underlayment covering a full roof slope before new shingles go on",
    caption: "Synthetic underlayment down before the shingles",
  },
  {
    src: "/images/recent-tear-off-harness.webp",
    alt: "French Roofing crew member in a safety harness during a roof tear-off",
    caption: "Harnessed up for a tear-off",
  },
  {
    src: "/images/recent-ridge-cap.webp",
    alt: "Finished hip and ridge cap on a gray asphalt shingle roof replacement",
    caption: "Clean hip and ridge cap lines",
  },
  {
    src: "/images/recent-wall-flashing-addition.webp",
    alt: "Roof-to-wall flashing where a new roof meets a home addition in Gresham, OR",
    caption: "Wall flashing on a new addition in Gresham",
  },
  {
    src: "/images/recent-shingle-repair.webp",
    alt: "Shingle roof repair with new underlayment in Estacada, OR",
    caption: "Shingle repair with new underlayment in Estacada",
  },
  {
    src: "/images/recent-low-slope-roof.webp",
    alt: "Finished low-slope roof where it meets the siding and gutter in Fairview, OR",
    caption: "A new low-slope roof in Fairview",
  },
];

/** "Out in the Field": recent job photos plus the Google posts widget. Used on the home page and About. */
export default function RecentWork({
  background = "bg-white",
  showPosts = true,
}: {
  background?: string;
  /** The Google posts feed (Local Marketing Manager). Off on the home page (Brittany, 2026-11-15: looked weird there). */
  showPosts?: boolean;
}) {
  // Recent work photos + Google posts (Local Marketing Manager widget)
  return (
  <section className={`py-20 px-4 ${background}`}>
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold text-[#c04520] uppercase tracking-wider mb-2 text-center">
        Out in the Field
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-4 text-center">
        Recent Work and Updates
      </h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Roof replacements, repairs, flashing, and low-slope roofs from
        recent French Roofing jobs around the Damascus area, plus the
        CertainTeed training behind them.
      </p>
      <div className="space-y-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {recentWork.map((photo) => (
            <figure key={photo.src}>
              <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-sm text-gray-600">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        {showPosts && (
          <iframe
          src="https://www.localmarketingmanager.com/api/local-posts/french-roofing-local-posts-widget?objectFit=cover"
          style={{ width: "100%", minHeight: "480px", border: "none" }}
          title="Local Posts Widget"
        />
          )}
      </div>
    </div>
  </section>
  );
}
