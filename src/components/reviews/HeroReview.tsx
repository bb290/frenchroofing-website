import Link from "next/link";
import { pickReviews, REVIEW_META, type ReviewTopic } from "@/lib/reviews";
import ReviewCard, { Stars } from "./ReviewCard";

/*
  One review card in the hero of every page (Brittany, 2026-11-15).
    layout="aside"  beside the hero text on large screens (heroes with an empty right side), below it on phones
    layout="below"  centered under the hero text (centered heroes, light article headers)
    layout="photo"  overlapping the corner of the home page hero photo
*/
export default function HeroReview({
  topic = "general",
  seed,
  layout = "below",
  dark = true,
}: {
  topic?: ReviewTopic;
  seed: string;
  layout?: "aside" | "below" | "photo";
  dark?: boolean;
}) {
  const [review] = pickReviews({ topic, seed });
  if (!review) return null;

  const summary = (
    <Link
      href="/reviews"
      className={`mt-3 inline-flex items-center gap-2 text-base font-semibold underline-offset-4 hover:underline ${dark ? "text-white" : "text-[#092e5e]"}`}
    >
      <Stars count={5} className="h-4 w-4" onDark={dark} />
      {REVIEW_META.rating} from {REVIEW_META.count} Google reviews
    </Link>
  );

  if (layout === "photo") {
    // Wide and low (Brittany, 2026-11-15): only the card's top edge overlaps the bottom of the photo.
    return (
      <div className="relative z-10 -mt-5 px-3 sm:px-6 lg:absolute lg:-left-10 lg:top-[calc(100%-3rem)] lg:mt-0 lg:w-[38rem] lg:px-0">
        <ReviewCard review={review} tilt={-1} max={125} />
      </div>
    );
  }

  if (layout === "aside") {
    return (
      <div className="mt-10 max-w-md lg:mt-0 lg:max-w-none">
        <ReviewCard review={review} tilt={2} max={150} />
        <div className="pl-1">{summary}</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-md">
      <ReviewCard review={review} tilt={-1.5} max={150} />
      <div className="text-center">{summary}</div>
    </div>
  );
}
