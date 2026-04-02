import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roof Cleaning & Maintenance | Greater Portland Metro | ${COMPANY.name}`,
  description:
    "Professional roof cleaning and maintenance in the greater Portland metro area. Remove moss, algae, and debris to extend your roof's life. One-time or recurring service. Licensed (CCB #203933). Serving Clackamas County and beyond.",
};

const steps = [
  {
    title: "Roof Assessment",
    description:
      "Before we touch anything, we inspect your roof to understand the type of growth, buildup, and any underlying issues. We note areas that need extra attention and flag anything that might need repair.",
  },
  {
    title: "Debris Removal",
    description:
      "We clear leaves, branches, pine needles, and anything else that's been collecting up there. Clogged valleys and gutters are one of the biggest causes of premature roof wear in Oregon.",
  },
  {
    title: "Moss & Algae Treatment",
    description:
      "Oregon's damp climate is a moss factory. We treat moss and algae growth with methods that are effective but won't damage your shingles or harm your landscaping.",
  },
  {
    title: "Gutter Cleanout",
    description:
      "While we're up there, we make sure your gutters and downspouts are clear and flowing properly. It's all connected — a clean roof with clogged gutters still causes problems.",
  },
  {
    title: "Maintenance Report",
    description:
      "You get a summary of what we did, what we found, and any recommendations for future care. No surprise bills — just honest info to help you plan ahead.",
  },
];

const faqs = [
  {
    question: "How often should I have my roof cleaned in Oregon?",
    answer:
      "In the greater Portland area, we recommend a roof cleaning at least once a year — ideally in late spring or early fall. If your home is surrounded by trees or sits on the north side of a hill, twice a year is even better. Moss and debris build up fast in our climate.",
  },
  {
    question: "Does moss actually damage my roof?",
    answer:
      "Yes. Moss holds moisture against your shingles, which accelerates wear and can lift shingle edges over time. Left unchecked, it shortens your roof's lifespan and can lead to leaks. Regular cleaning is one of the most cost-effective ways to protect your investment.",
  },
  {
    question: "Do you offer recurring roof maintenance plans?",
    answer:
      "We do. We offer both one-time cleanings and recurring maintenance schedules. A lot of our homeowners across the Portland metro set up annual or semi-annual visits so they never have to think about it.",
  },
  {
    question: "Will pressure washing damage my shingles?",
    answer:
      "It can — that's why we don't use high-pressure washing on asphalt shingles. We use low-pressure methods and treatments that are effective on moss and algae without stripping granules or voiding your warranty.",
  },
  {
    question: "How much does roof cleaning cost?",
    answer:
      "Roof cleaning typically runs between $300 and $800 depending on roof size, pitch, and the amount of buildup. We provide a clear quote before we start. For homes that need both cleaning and minor repairs, we can bundle the work and save you a trip.",
  },
];

export default function RoofCleaningPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          {
            name: "Roof Cleaning & Maintenance",
            href: "/services/roof-cleaning",
          },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#092e5e] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/worker-ridge.webp"
            alt="French Roofing worker on a roof ridge performing cleaning and maintenance work"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
              Roof Cleaning &amp; Maintenance
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Roof Cleaning — Portland Metro
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Moss, algae, and debris don&apos;t just look bad — they shorten
              your roof&apos;s life. A little maintenance goes a long way in
              Oregon&apos;s wet climate. We keep your roof clean, clear, and
              lasting longer.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                Schedule a Cleaning
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Maintenance Matters ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Extend Your Roof's Life",
              desc: "Regular cleaning removes the moisture-trapping moss and debris that cause premature aging. A clean roof lasts years longer than a neglected one.",
            },
            {
              title: "Prevent Costly Repairs",
              desc: "Catching small issues during routine maintenance — a cracked vent boot, a lifted shingle — saves you from expensive repairs down the road.",
            },
            {
              title: "Protect Your Home's Value",
              desc: "Curb appeal matters, especially in neighborhoods across the Portland metro. A clean roof signals a well-maintained home.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-xl bg-gray-50"
            >
              <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
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
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Our Cleaning &amp; Maintenance Process
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Thorough, careful, and respectful of your property.
            </p>
          </div>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#092e5e] flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#092e5e] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why French Roofing ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              Why Choose French Roofing for Maintenance
            </h2>
            <p className="text-gray-600 mb-6">
              Anyone can blow leaves off a roof. We go further — because
              we&apos;re roofers first. When we clean your roof, we&apos;re also
              looking at its health. That means you get maintenance and a
              mini-inspection in one visit.
            </p>
            <ul className="space-y-4">
              {[
                "Trained roofing crew — not a general handyman with a leaf blower",
                "Low-pressure cleaning methods that protect your shingles",
                "We spot problems early — saving you from expensive surprises",
                "Licensed, insured & bonded (CCB #203933)",
                "One-time or recurring service options",
                "Serving 18+ communities across the Portland metro since 2014",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-[#d85024] mt-0.5"
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
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/worker-ridge.webp"
              alt="French Roofing worker performing roof maintenance near the ridge line"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Maintenance Program Callout ── */}
      <section className="py-16 px-4 bg-[#ffbd59]/10 border-y border-[#ffbd59]/30">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
            Recurring Program
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e] mb-4">
            Want to Stay Ahead of It? Join Our Maintenance Program.
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            2 visits per year — debris removal, gutter clearing, moss prevention
            treatment, and a full inspection every time. Three tiers starting at
            $1,200/year.
          </p>
          <a
            href="/services/maintenance"
            className="inline-flex items-center justify-center rounded-lg bg-[#092e5e] px-8 py-4 text-lg font-semibold text-white hover:bg-[#d85024] transition-colors"
          >
            View Maintenance Program &rarr;
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Roof Cleaning & Maintenance FAQs"
        faqs={faqs}
      />

      {/* ── CTA ── */}
      <CTABanner
        headline="Keep Your Roof in Great Shape"
        description="Schedule a roof cleaning or set up a recurring maintenance plan. Your roof will thank you."
      />
    </>
  );
}
