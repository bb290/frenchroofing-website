import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Recurring Roof Maintenance Program | ${COMPANY.name}`,
  description:
    "French Roofing's recurring maintenance program keeps your roof clean, clear, and lasting longer. 2 visits per year - debris removal, gutter clearing, moss prevention, and inspection. Serving the Portland metro.",
  alternates: { canonical: `${COMPANY.url}/services/maintenance` },
};

const scopeItems = [
  {
    title: "Roof Debris Removal",
    description:
      "We scrape and blow the roof to clear moss, leaves, pine needles, and any buildup that's been accumulating since the last visit.",
  },
  {
    title: "Gutter & Downspout Clearing",
    description:
      "All gutters and downspouts get cleaned out and checked for proper water flow. Clogged gutters cause more damage than most people realize.",
  },
  {
    title: "Moss & Mold Prevention Treatment",
    description:
      "We apply a preventative treatment to stop regrowth before it starts. This is Oregon - if you're not staying ahead of moss, it's already winning.",
  },
  {
    title: "Final Cleanup",
    description:
      "All fallen debris gets collected and disposed of. Your yard, driveway, and landscaping look the same (or better) than when we showed up.",
  },
  {
    title: "Roof & Gutter Inspection",
    description:
      "Every visit includes a visual inspection to catch developing issues early - cracked flashing, lifted shingles, worn seals - before they turn into expensive problems.",
  },
];

const packages = [
  {
    name: "Clean Care",
    tag: "Simple Roofs",
    description: "Low pitch and/or minimal surrounding trees",
    perVisit: 750,
    perYear: 1200,
    color: "border-[#092e5e]",
    tagColor: "bg-[#092e5e]/10 text-[#092e5e]",
  },
  {
    name: "Clean Guard",
    tag: "Most Popular",
    description: "Mixed pitch and/or moderate surrounding trees",
    perVisit: 1000,
    perYear: 1800,
    color: "border-[#d85024]",
    tagColor: "bg-[#d85024]/10 text-[#d85024]",
    popular: true,
  },
  {
    name: "Clean Preserve",
    tag: "Full Protection",
    description:
      "Complex rooflines, heavy tree cover, moss-prone, high-risk, and/or large roofs",
    perVisit: 1400,
    perYear: 2400,
    color: "border-[#ffbd59]",
    tagColor: "bg-[#ffbd59]/20 text-[#092e5e]",
  },
];

const faqs = [
  {
    question: "How often do you come out for the maintenance program?",
    answer:
      "Twice a year. We time visits around the seasons that matter most in Oregon - typically once in spring (after the wet season) and once in fall (before it starts again). This keeps your roof in top shape year-round.",
  },
  {
    question: "How do I know which package is right for my home?",
    answer:
      "It depends on your roof's pitch, complexity, and how many trees are nearby. A simple ranch with a clear yard is usually Clean Care. A home surrounded by Doug firs with valleys and dormers is more like Clean Preserve. Not sure? Book a free inspection and we'll recommend the right fit.",
  },
  {
    question: "Can I do a one-time cleaning instead of the annual program?",
    answer:
      "Absolutely. We offer one-time roof cleaning and maintenance too. But the annual program saves you money per visit and keeps your roof on a consistent schedule - which is how you get the longest life out of your shingles.",
  },
  {
    question: "Does regular maintenance really extend my roof's life?",
    answer:
      "Yes - significantly. Moss, debris buildup, and clogged gutters are the top causes of premature roof failure in Oregon. Staying ahead of them with regular maintenance can add years to your roof's lifespan and help you avoid costly repairs down the road.",
  },
  {
    question: "Is the maintenance program paid monthly or annually?",
    answer:
      "Annual pricing is paid once per year and includes both visits. This gives you the best per-visit rate. We keep it simple - no contracts with hidden fees, no surprise charges.",
  },
  {
    question: "What if you find a problem during the inspection?",
    answer:
      "We'll let you know right away with photos and an honest recommendation. If it's something small, we may be able to address it on the spot. If it needs more attention, we'll give you a clear estimate - no pressure, no upsell. That's the whole point of catching things early.",
  },
];

export default function MaintenancePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Maintenance Program", href: "/services/maintenance" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 sm:py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Recurring Program &middot; 2 Visits Per Year
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roof Maintenance{" "}
            <span className="text-[#ffbd59]">Program</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Your roof is your home&apos;s biggest shield from the elements. A
            well-kept roof doesn&apos;t just look better - it lasts
            significantly longer. Our recurring program keeps you ahead of moss,
            debris, and the small problems that turn into big ones.
          </p>
          <div className="mt-8">
            <a
              href={COMPANY.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* ── Why Maintenance Matters ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e] mb-6">
            Why Recurring Maintenance?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="h-12 w-12 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#092e5e] mb-1">Extends Roof Life</h3>
              <p className="text-sm text-gray-600">
                Consistent maintenance adds years to your roof&apos;s lifespan by preventing the buildup that causes premature failure.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="h-12 w-12 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#092e5e] mb-1">Prevents Big Repairs</h3>
              <p className="text-sm text-gray-600">
                Catching small issues early means you fix a $200 problem instead of a $5,000 one.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-gray-50">
              <div className="h-12 w-12 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-3">
                <svg className="h-6 w-6 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <h3 className="font-semibold text-[#092e5e] mb-1">Protects Your Investment</h3>
              <p className="text-sm text-gray-600">
                A clean, maintained roof looks better, performs better, and holds its value when it&apos;s time to sell.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Scope of Work ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              What&apos;s Included - Every Visit
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              2 visits per year, each covering the full scope below.
            </p>
          </div>
          <div className="space-y-6">
            {scopeItems.map((item, i) => (
              <div key={i} className="flex gap-5 p-5 rounded-xl bg-white border border-gray-200">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#d85024] text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#092e5e] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Packages ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Service Packages
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Pricing reflects roof age, complexity, and the amount of nearby
              trees and debris. Not sure which fits? Book a free inspection and
              we&apos;ll recommend the right plan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border-2 ${pkg.color} p-6 flex flex-col ${
                  pkg.popular ? "ring-2 ring-[#d85024] ring-offset-2" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#092e5e]">
                    {pkg.name}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${pkg.tagColor}`}
                  >
                    {pkg.tag}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{pkg.description}</p>
                <div className="mt-auto">
                  <div className="mb-4">
                    <p className="text-3xl font-bold text-[#092e5e]">
                      ${pkg.perYear.toLocaleString()}
                      <span className="text-base font-normal text-gray-500">
                        /year
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      ${pkg.perVisit.toLocaleString()} per visit &middot; 2
                      visits included
                    </p>
                  </div>
                  <a
                    href={COMPANY.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                      pkg.popular
                        ? "bg-[#d85024] text-white hover:bg-[#c04520]"
                        : "bg-[#092e5e] text-white hover:bg-[#d85024]"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            Annual pricing paid once per year. No hidden fees, no surprise
            charges.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection title="Maintenance Program FAQs" faqs={faqs} />

      {/* ── CTA ── */}
      <CTABanner
        headline="Keep Your Roof in Top Shape"
        description="Get on a maintenance schedule and stop worrying about what's happening up there. Book a free inspection and we'll recommend the right plan for your home."
        dark
      />
    </>
  );
}
