import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Free Roof Inspections | Greater Portland Metro | ${COMPANY.name}`,
  description:
    "Free, honest, thorough roof inspections in the greater Portland metro area. Get a clear picture of your roof's condition - whether you're buying a home, filing a claim, or just want to know where things stand. Licensed (CCB #203933), CertainTeed Certified.",
};

const steps = [
  {
    title: "Schedule Your Inspection",
    description:
      "Book online and we'll find a time that works for you - inspections typically take about an hour depending on the size of your roof.",
  },
  {
    title: "Exterior Roof Inspection",
    description:
      "We inspect shingles, flashing, vents, ridge caps, valleys, gutters, and drip edge. We check for moss, algae, storm damage, and signs of wear. Everything gets documented with photos.",
  },
  {
    title: "Attic & Interior Check",
    description:
      "When accessible, we look at the underside of the roof deck for signs of leaks, moisture, daylight, ventilation issues, and insulation problems. This is where hidden damage shows up.",
  },
  {
    title: "Detailed Report & Recommendations",
    description:
      "You get a clear, photo-documented report of our findings - what's in good shape, what needs attention now, and what to keep an eye on. No jargon, no scare tactics, just the facts.",
  },
];

const faqs = [
  {
    question: "How much does a roof inspection cost in the Portland metro area?",
    answer:
      "Our roof inspections are always free - no strings attached. We believe every homeowner deserves to know the condition of their roof without worrying about a bill. Book online and we'll get you on the schedule.",
  },
  {
    question: "When should I get a roof inspection?",
    answer:
      "We recommend an inspection if your roof is 10+ years old, after a major storm, before buying or selling a home, or if you notice any signs of damage inside (water stains, daylight in the attic). Annual inspections are a smart move in Oregon's climate.",
  },
  {
    question: "What do you look for during a roof inspection?",
    answer:
      "We check the full system - shingles, flashing, vents, ridge caps, valleys, gutters, drip edge, and the attic space. We look for wear, damage, moss growth, moisture intrusion, ventilation issues, and anything that could become a problem. Everything is documented with photos.",
  },
  {
    question: "Can you do a roof inspection for a home I'm buying?",
    answer:
      "Absolutely. Pre-purchase roof inspections are one of our most common requests across Clackamas County and the Portland metro. We give you an honest assessment of the roof's condition and remaining life so you can negotiate with confidence.",
  },
  {
    question: "Will you find problems even if there's no visible leak?",
    answer:
      "Yes - that's the whole point. Many roof issues are invisible from the ground. Cracked flashing, lifted shingles, clogged valleys, and attic moisture don't always cause an obvious leak right away, but they will eventually. An inspection catches these early.",
  },
];

export default function RoofInspectionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Roof Inspections", href: "/services/roof-inspections" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#092e5e] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/team-plywood-install.webp"
            alt="French Roofing team inspecting a roof deck during a thorough roof inspection"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
              Always Free
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Free Roof Inspections - Portland Metro
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Not sure what shape your roof is in? We&apos;ll tell you - honestly
              and for free. Whether you&apos;re buying a home, dealing with storm
              damage, or just want peace of mind, our inspections give you the
              full picture with no pressure attached.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                Schedule an Inspection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── When You Need an Inspection ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              When to Get a Roof Inspection
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              A quick inspection now can save you thousands later. Here are the
              most common reasons homeowners across the Portland metro
              reach out.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Buying a Home",
                desc: "Know exactly what you're getting before you sign. A roof inspection gives you negotiating power and peace of mind.",
              },
              {
                title: "After a Storm",
                desc: "Wind, hail, and fallen branches can cause damage you can't see from the ground. We document everything for insurance claims.",
              },
              {
                title: "Aging Roof",
                desc: "If your roof is 10-15+ years old, an inspection helps you plan ahead - repair now or budget for replacement down the road.",
              },
              {
                title: "Selling Your Home",
                desc: "A clean inspection report builds buyer confidence and can speed up your sale in the Portland metro market.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold text-[#092e5e] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              What Our Inspection Covers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Thorough, documented, and explained in plain English.
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
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/team-plywood-install.webp"
              alt="French Roofing crew examining roof decking during a roof inspection in the Portland metro area"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              Why French Roofing for Your Inspection
            </h2>
            <p className="text-gray-600 mb-6">
              Some inspectors just glance at your roof and hand you a generic
              report. We actually get up there, document what we find, and
              explain it to you like a neighbor - because that&apos;s what we
              are. We&apos;ve been inspecting roofs across Clackamas County
              since 2014.
            </p>
            <ul className="space-y-4">
              {[
                "CertainTeed Certified - we know what a properly installed roof looks like",
                "Photo-documented reports - see exactly what we see",
                "Honest recommendations - we won't create problems to sell you a fix",
                "Licensed, insured & bonded (CCB #203933)",
                "Serving 18+ communities across the Portland metro since 2014",
                "Free assessments available for homeowners considering repair or replacement",
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
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Roof Inspection FAQs"
        faqs={faqs}
      />

      {/* ── CTA ── */}
      <CTABanner
        headline="Book Your Free Roof Inspection"
        description="Always free, always honest. We'll give you the full picture so you can make the right call - no pressure, no obligation."
      />
    </>
  );
}
