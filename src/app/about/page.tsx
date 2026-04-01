import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About French Roofing | Our Story",
  description:
    "French Roofing LLC was founded in 2014 by Sean French in Damascus, OR. Learn about our values — Integrity, Workmanship, and Community — and why local homeowners trust our family-owned, CertainTeed Certified roofing team.",
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#092e5e] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/team-plywood-install.webp"
            alt="French Roofing crew installing plywood on a residential roof in Damascus, Oregon"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
              Family-Owned &middot; Damascus, OR &middot; Since 2014
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Built on a Ladder,
              <br />
              a Toolbelt, and a{" "}
              <span className="text-[#ffbd59]">Dream</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              The story behind French Roofing — and why we treat every
              customer&apos;s home like our own.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Started ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
            <Image
              src="/images/sean-first-job.webp"
              alt="Sean French on his first roofing job — founder of French Roofing LLC"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
              How It Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              From Subcontractor at Sixteen to Business Owner
            </h2>
            <p className="text-gray-600 mb-4">
              Sean French grew up on roofs. He started as a subcontractor at
              sixteen, learning the trade the way most real craftspeople do — by
              showing up early, listening more than talking, and doing the
              unglamorous work with pride.
            </p>
            <p className="text-gray-600 mb-4">
              In 2014, he started French Roofing on a simple idea:{" "}
              <strong className="text-[#092e5e]">
                Do the work like you&apos;re doing it for your own family.
              </strong>
            </p>
            <blockquote className="border-l-4 border-[#ffbd59] pl-4 italic text-gray-500 my-6">
              &ldquo;I&apos;ve always believed every customer&apos;s roof should
              be built the same way you&apos;d build it for your own
              family.&rdquo;
              <span className="block not-italic text-sm mt-1 text-[#092e5e] font-medium">
                — Sean French, Founder
              </span>
            </blockquote>
            <p className="text-gray-600">
              From then to now: Sean on a ladder, equipped with a toolbelt and a
              dream has become a fully trained, safety-focused team committed to
              high-quality roofing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-4">
              Values You Can See on the Roof
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              At French Roofing, values aren&apos;t posters on the wall. They
              are core beliefs built into the habits practiced on every job, from
              small roof repair projects to full roof replacement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Integrity */}
            <div className="p-8 rounded-xl bg-white border border-gray-200">
              <div className="h-14 w-14 rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-5">
                <svg
                  className="h-7 w-7 text-[#d85024]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Integrity
              </h3>
              <p className="text-gray-600">
                We communicate clearly and honestly, even when something
                unexpected comes up. If weather delays a step or we find hidden
                damage, you hear from us first, with a plan and honest options.
                We stand behind our word and do what&apos;s right for the
                customer as our guiding principle.
              </p>
            </div>

            {/* Workmanship */}
            <div className="p-8 rounded-xl bg-white border border-gray-200">
              <div className="h-14 w-14 rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-5">
                <svg
                  className="h-7 w-7 text-[#d85024]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17l-5.384 3.18.916-5.986L2.42 8.14l6.005-.762L11.42 2l2.995 5.378 6.005.762-4.532 4.224.916 5.986z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Workmanship
              </h3>
              <p className="text-gray-600">
                Shows up in the details you can see and the ones you can&apos;t.
                We maintain clean, safe job sites, follow manufacturer specs,
                document every stage, and back it with a standard workmanship
                warranty.
              </p>
            </div>

            {/* Community */}
            <div className="p-8 rounded-xl bg-white border border-gray-200">
              <div className="h-14 w-14 rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-5">
                <svg
                  className="h-7 w-7 text-[#d85024]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Community
              </h3>
              <p className="text-gray-600">
                Both our neighborhood and our responsibility. We take care around
                gardens, siding, and shared spaces. We protect homes during
                storms, help neighbors navigate insurance, and treat every
                property like it&apos;s owned by our grandma.
              </p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-10 max-w-2xl mx-auto">
            We&apos;ve grown since that first job, but our approach is still
            hands-on, skilled craftsmanship, and rooted in community.
          </p>
        </div>
      </section>

      {/* ── Team Photo — Bowling ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
              A Local Team Focused on Homeowners
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              More Than a Crew — A Team
            </h2>
            <p className="text-gray-600 mb-4">
              French Roofing has grown steadily in Clackamas and the surrounding
              area by staying rooted in the same simple purpose: keep our
              families warm, dry, and safe.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, Sean has built a team that takes pride in doing
              things the right way. The company invests in certifications, crew
              training, material education, inspections, and quality checks that
              meet code without drama or excuses.
            </p>
            <p className="text-gray-600">
              Warranties are honored without fine-print games. Communication
              stays honest, even when the news is inconvenient. And every job
              ends with a site that&apos;s cleaner than when we arrived.
            </p>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden max-w-lg mx-auto lg:mx-0 lg:ml-auto">
            <Image
              src="/images/team-bowling.webp"
              alt="French Roofing team bowling together — company culture and community"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Quiet Credibility + CertainTeed ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden max-w-lg mx-auto lg:mx-0">
            <Image
              src="/images/team-plywood-install.webp"
              alt="French Roofing team installing plywood sheathing on a residential roof"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
              Quiet Credibility
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              The Work Speaks for Itself
            </h2>
            <p className="text-gray-600 mb-4">
              Today, French Roofing is known for roofs that hold up, jobs that
              stay on schedule, and a team that treats homeowners with respect.
              The work is straightforward, the promises are kept, and the
              craftsmanship speaks for itself.
            </p>

            {/* Certifications / Credentials */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-200">
                <div className="h-10 w-10 shrink-0 rounded-full bg-[#092e5e] flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-[#ffbd59]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#092e5e]">
                    CertainTeed Certified
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our installations meet the highest manufacturer standards,
                    ensuring your roof is built to last with premium materials
                    and proven techniques.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-200">
                <div className="h-10 w-10 shrink-0 rounded-full bg-[#092e5e] flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-[#ffbd59]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#092e5e]">
                    Licensed, Insured &amp; Bonded
                  </h3>
                  <p className="text-sm text-gray-600">
                    Oregon CCB #{COMPANY.ccb} — fully compliant and
                    accountable. We carry the coverage homeowners deserve.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-200">
                <div className="h-10 w-10 shrink-0 rounded-full bg-[#092e5e] flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-[#ffbd59]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#092e5e]">
                    Family-Owned Since 2014
                  </h3>
                  <p className="text-sm text-gray-600">
                    Over 10 years serving Damascus, Clackamas, Happy Valley, and
                    the greater Portland metro area.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner dark />
    </>
  );
}
