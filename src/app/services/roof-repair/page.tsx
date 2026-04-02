import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roof Repair | Greater Portland Metro | ${COMPANY.name}`,
  description:
    "Fast, reliable roof repair in the greater Portland metro area. Fix leaks, storm damage, cracked flashing, and missing shingles before they become bigger problems. Licensed (CCB #203933), CertainTeed Certified. Financing available.",
};

const steps = [
  {
    title: "Inspection & Diagnosis",
    description:
      "We climb up, take photos, and figure out exactly what's going on. No guesswork — we show you what we find and explain your options in plain English.",
  },
  {
    title: "Honest Recommendation",
    description:
      "Sometimes a repair is all you need. Sometimes a replacement makes more sense long-term. We'll tell you the truth either way. You'll get a clear estimate with no hidden costs.",
  },
  {
    title: "Targeted Repair",
    description:
      "Our crew addresses the specific issue — whether it's replacing damaged shingles, sealing cracked flashing, fixing a leak, or repairing storm damage. We use quality materials that match your existing roof.",
  },
  {
    title: "Quality Check & Cleanup",
    description:
      "We verify the repair is solid, clean up any debris, and make sure you're happy with the work before we call it done.",
  },
];

const faqs = [
  {
    question: "How do I know if my roof needs repair or full replacement?",
    answer:
      "If your roof is under 15 years old with isolated damage — a few missing shingles, a small leak, cracked flashing — repair is usually the smart move. If it's 20+ years old with widespread issues, a replacement is often more cost-effective. We'll give you an honest recommendation during your free assessment.",
  },
  {
    question: "How quickly can you fix a roof leak in the Portland metro area?",
    answer:
      "For active leaks and emergency situations, we prioritize getting to you as fast as possible — often within a day or two. For non-emergency repairs, we typically schedule within the week. Oregon weather can be unpredictable, so if your roof is leaking, don't wait — book online and we'll get to you fast.",
  },
  {
    question: "Do you repair storm damage and work with insurance?",
    answer:
      "Yes. We handle storm damage repairs regularly for homeowners across Clackamas County and the Portland metro. We document the damage thoroughly with photos, which helps if you need to file an insurance claim. We're happy to work with your adjuster.",
  },
  {
    question: "How much does a roof repair cost?",
    answer:
      "Roof repairs can range from a few hundred dollars for minor fixes to several thousand for more extensive damage. It depends on the type and scope of the issue. We provide a clear, written estimate before any work begins — and financing through Enhancify is available for larger repairs.",
  },
  {
    question: "Is it worth repairing an old roof?",
    answer:
      "It depends. If the repair addresses an isolated problem and buys you several more years, it's usually worth it. If you're patching the same roof every season, replacement might save you money in the long run. We'll be straight with you about which option makes sense for your situation.",
  },
];

export default function RoofRepairPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Roof Repair", href: "/services/roof-repair" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#092e5e] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cracked-flashing.webp"
            alt="Cracked roof flashing needing repair on a residential home in Clackamas County"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
              Roof Repair
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Roof Repair — Portland Metro
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Leaks, storm damage, missing shingles, cracked flashing — small
              problems turn into big ones fast in Oregon&apos;s climate. We get
              it fixed right so you can stop worrying about what&apos;s
              happening overhead.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                Schedule a Repair
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              Financing available through Enhancify for larger repairs
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Repair ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Common Roof Repairs We Handle
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Oregon weather does a number on roofs. Here are the most common
              issues we see across the Portland metro.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Leak Repair", desc: "Tracking down and sealing leaks before they cause interior damage, mold, or rot." },
              { title: "Storm Damage", desc: "Wind-lifted shingles, fallen branches, hail damage — we handle it all and help with insurance documentation." },
              { title: "Cracked or Missing Flashing", desc: "Flashing around chimneys, vents, and valleys is a common failure point. We replace it with quality materials." },
              { title: "Missing or Damaged Shingles", desc: "Whether it's a handful or a larger section, we match and replace shingles to restore protection." },
              { title: "Gutter & Edge Repair", desc: "Damaged drip edge, sagging gutters, and fascia issues that let water get where it shouldn't." },
              { title: "Emergency Tarping", desc: "When you need immediate protection from an active leak or sudden damage, we can get a tarp in place fast." },
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
              What to Expect
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Simple, straightforward, and no surprises along the way.
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
              src="/images/cracked-flashing.webp"
              alt="Close-up of roof flashing being repaired by French Roofing in the Portland metro area"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              Why Trust French Roofing With Your Repair
            </h2>
            <p className="text-gray-600 mb-6">
              A lot of contractors will patch a problem just to collect a check.
              That&apos;s not how we operate. We diagnose the real issue, fix it
              properly, and tell you the truth about what your roof needs — even
              if the answer is &quot;you&apos;re fine for now.&quot;
            </p>
            <ul className="space-y-4">
              {[
                "Honest diagnosis — we won't upsell you on a replacement if a repair will do",
                "Licensed, insured & bonded (CCB #203933)",
                "CertainTeed Certified — quality materials and proper technique",
                "Serving 18+ communities across the Portland metro since 2014",
                "Financing through Enhancify for larger repair projects",
                "Clean, documented work — photos before, during, and after",
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
        title="Roof Repair FAQs"
        faqs={faqs}
      />

      {/* ── CTA ── */}
      <CTABanner
        headline="Got a Roof Problem?"
        description="Don't wait for a small issue to become a big one. Schedule a free assessment and we'll give you an honest recommendation."
      />
    </>
  );
}
