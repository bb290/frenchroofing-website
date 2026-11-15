import Link from "next/link";
import { excerpt, formatMonthYear, type Review } from "@/lib/reviews";

export function Stars({ count = 5, className = "h-5 w-5", onDark = false }: { count?: number; className?: string; onDark?: boolean }) {
  return (
    <span className="flex items-center gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`${className} ${i < count ? (onDark ? "text-[#ffbd59]" : "text-[#d85024]") : onDark ? "text-white/30" : "text-[#e5e0d6]"}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleMark({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8.1z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.5-2.7c-1 .7-2.3 1.1-3.8 1.1-2.9 0-5.4-2-6.3-4.6H2.1v2.8A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.7 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.1a11 11 0 0 0 0 9.8z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.1 7.1l3.6 2.8C6.6 7.3 9.1 5.4 12 5.4z" />
    </svg>
  );
}

/*
  Floating review card (2026-11-15): horizontal, white, soft shadow, a slight tilt and a slow drift (off when the
  visitor prefers reduced motion). Placed in the page layout, never over content.
*/
export default function ReviewCard({
  review,
  tilt = 0,
  max = 170,
  float = true,
  className = "",
}: {
  review: Review;
  tilt?: number;
  max?: number;
  float?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={`review-float rounded-2xl border border-[#e5e0d6] bg-white p-5 text-left shadow-[0_14px_36px_-12px_rgba(9,46,94,0.35)] ${float ? "review-float--drift" : ""} ${className}`}
      style={{ ["--tilt" as string]: `${tilt}deg` }}
    >
      <div className="flex items-center justify-between gap-3">
        <Stars count={review.stars ?? 5} />
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <GoogleMark />
          Google review
        </span>
      </div>
      <blockquote className="mt-3 text-lg leading-snug text-[#3e3d3b]">&ldquo;{excerpt(review.text, max)}&rdquo;</blockquote>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-base">
        <span className="font-semibold text-[#092e5e]">{review.name}</span>
        <span className="text-gray-600">{formatMonthYear(review.date)}</span>
      </figcaption>
      {review.text.length > max && (
        <Link href={`/reviews#r-${review.id}`} className="mt-2 inline-block text-base font-semibold text-[#c04520] underline-offset-4 hover:underline">
          Read the full review
        </Link>
      )}
    </figure>
  );
}
