import Link from "next/link";
import { pickReviews, REVIEW_META, type ReviewTopic } from "@/lib/reviews";
import ReviewCard from "./ReviewCard";

/*
  A band of floating review cards between sections. Three staggered cards on wide screens, two on tablets, one on
  phones (the others are hidden there, so nothing gets squeezed). `skip` keeps it from repeating the hero's review.
*/
export default function ReviewBand({
  topic = "general",
  seed,
  skip = 1,
  heading = "What neighbors say",
  exclude = [],
}: {
  topic?: ReviewTopic;
  seed: string;
  skip?: number;
  heading?: string;
  exclude?: string[];
}) {
  const reviews = pickReviews({ topic, seed, count: 3, skip, exclude });
  if (!reviews.length) return null;
  const tilts = [-1.5, 1, -0.75];
  const offsets = ["lg:translate-y-4", "lg:-translate-y-3", "lg:translate-y-6"];
  return (
    <section aria-label="Google reviews" className="overflow-hidden bg-[#f5f1ea] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-[#092e5e] sm:text-3xl">{heading}</h2>
          <Link href="/reviews" className="text-lg font-semibold text-[#c04520] underline-offset-4 hover:underline">
            All {REVIEW_META.count}{" "}Google reviews &rarr;
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <div key={r.id} className={`${i === 1 ? "hidden sm:block" : i === 2 ? "hidden lg:block" : ""} ${offsets[i]}`}>
              <ReviewCard review={r} tilt={tilts[i]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
