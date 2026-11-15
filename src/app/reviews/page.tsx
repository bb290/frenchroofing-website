import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import HeroReview from "@/components/reviews/HeroReview";
import { GoogleMark, Stars } from "@/components/reviews/ReviewCard";
import { COMPANY } from "@/lib/constants";
import { formatMonthYear, REVIEW_META, REVIEWS } from "@/lib/reviews";

/*
  Every French Roofing Google review (2026-11-15). All of them, including the two 1-star reviews with our replies:
  the page says "all", and the FTC Consumer Review Rule (16 CFR 465.7) bars presenting a positive-only selection as
  all reviews. Newest first. No Review/AggregateRating schema: Google doesn't show stars for a business's reviews of
  itself on its own site (its "self-serving reviews" rule), so the markup would add nothing.
*/
export const metadata: Metadata = {
  title: "Google Reviews",
  description: `All ${REVIEW_META.count} of French Roofing's Google reviews, ${REVIEW_META.rating} stars on average, with our replies. Roof replacement, repair, and cleaning customers around Damascus, Clackamas, and Happy Valley.`,
  alternates: { canonical: `${COMPANY.url}/reviews` },
};

export default function ReviewsPage() {
  const withText = REVIEWS.filter((r) => r.text).length;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }]} />

      <section className="bg-[#092e5e] px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 sm:px-2 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-12 lg:px-4">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">Our Google Reviews</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-5xl font-extrabold text-white">{REVIEW_META.rating}</span>
              <span>
                <Stars count={5} className="h-7 w-7" onDark />
                <span className="mt-1 block text-lg text-white/90">from {REVIEW_META.count} reviews on Google</span>
              </span>
            </div>
            <p className="mt-6 max-w-xl text-lg text-white/90">
              Every review our customers have left on Google, newest first, with our reply to each one. Nothing
              hidden, nothing edited.
            </p>
            <a
              href={REVIEW_META.googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-lg bg-white px-6 py-4 text-lg font-bold text-[#092e5e] hover:bg-[#f5f1ea]"
            >
              <GoogleMark className="h-6 w-6" />
              See us on Google
            </a>
          </div>
          <HeroReview seed="reviews" layout="aside" />
        </div>
      </section>

      <section className="bg-[#fdfcfa] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-lg text-gray-600">
            {REVIEW_META.count} reviews ({withText} with a written review). Updated {formatMonthYear(REVIEW_META.fetchedAt.slice(0, 10))}.
          </p>
          <ol className="gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
            {REVIEWS.map((r) => (
              <li key={r.id} id={`r-${r.id}`} className="mb-6 break-inside-avoid scroll-mt-28 rounded-2xl border border-[#e5e0d6] bg-white p-6 shadow-[0_8px_24px_-14px_rgba(9,46,94,0.35)]">
                <div className="flex items-center justify-between gap-3">
                  <Stars count={r.stars ?? 0} />
                  <span className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                    <GoogleMark />
                    Google
                  </span>
                </div>
                {r.text ? (
                  <p className="mt-3 whitespace-pre-line text-lg leading-relaxed text-[#3e3d3b]">{r.text}</p>
                ) : (
                  <p className="mt-3 text-lg italic text-gray-600">Star rating only, no written review.</p>
                )}
                <p className="mt-4 flex flex-wrap items-center justify-between gap-x-3 text-base">
                  <span className="font-semibold text-[#092e5e]">{r.name}</span>
                  <span className="text-gray-600">{formatMonthYear(r.date)}</span>
                </p>
                {r.reply && (
                  <div className="mt-4 rounded-xl bg-[#f5f1ea] p-4">
                    <p className="text-base font-semibold text-[#092e5e]">Reply from French Roofing</p>
                    <p className="mt-1 whitespace-pre-line text-base leading-relaxed text-[#3e3d3b]">{r.reply.text}</p>
                  </div>
                )}
                {r.url && (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-base font-semibold text-[#c04520] underline-offset-4 hover:underline">
                    View on Google
                  </a>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
