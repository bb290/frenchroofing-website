import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roof Replacement in Damascus, OR | ${COMPANY.name}`,
  description:
    "Full roof replacement by a CertainTeed Certified team in Damascus, OR. Premium materials, honest pricing, and 0% financing through Enhancify. Serving Clackamas, Happy Valley, and the Portland metro. CCB #203933.",
};

const steps = [
  {
    title: "Free Roof Assessment",
    description:
      "We start with a thorough inspection of your existing roof. We document everything with photos, walk you through our findings, and give you an honest recommendation — no pressure, no upsell.",
  },
  {
    title: "Detailed Estimate & Material Selection",
    description:
      "You get a clear, written estimate with no hidden fees. We help you choose the right shingles and materials for Oregon's climate and your budget. Financing through Enhancify is available with 0% options.",
  },
  {
    title: "Tear-Off & Deck Inspection",
    description:
      "Our crew strips the old roof down to the deck and inspects the plywood for any rot or damage. If we find anything, you hear about it right away with options — no surprises on the invoice.",
  },
  {
    title: "Installation to Manufacturer Specs",
    description:
      "As a CertainTeed Certified contractor, we follow manufacturer specifications to the letter. That means proper underlayment, flashing, ventilation, and shingle installation — the details that make a roof last.",
  },
  {
    title: "Final Walkthrough & Cleanup",
    description:
      "We do a final quality check, clean up your property (magnet sweep included), and walk you through the finished work. Your yard will look better than when we showed up.",
  },
];

const faqs = [
  {
    question: "How much does a roof replacement cost in Damascus, OR?",
    answer:
      "Most residential roof replacements in the Damascus and Clackamas County area range from $8,000 to $25,000+, depending on roof size, pitch, material choice, and complexity. We provide free, detailed estimates so you know exactly what to expect — and we offer 0% financing through Enhancify to make it manageable.",
  },
  {
    question: "How long does a full roof replacement take?",
    answer:
      "Most homes take 1 to 3 days from tear-off to final cleanup, depending on the size and complexity of the roof. Oregon weather can occasionally cause short delays, but we communicate proactively so you always know the plan.",
  },
  {
    question: "What roofing materials do you use?",
    answer:
      "We primarily install CertainTeed shingles — we're a CertainTeed Certified contractor, which means our installations meet the highest manufacturer standards. We also work with other premium brands based on your needs and budget.",
  },
  {
    question: "Do you handle permits and inspections?",
    answer:
      "Yes. We pull all required permits for Clackamas County and schedule inspections as part of every replacement project. It's all included — you don't have to worry about the paperwork.",
  },
  {
    question: "Does French Roofing offer a warranty on roof replacements?",
    answer:
      "Absolutely. Every replacement comes with our standard workmanship warranty, plus the manufacturer's material warranty. Because we're CertainTeed Certified, your installation may qualify for enhanced warranty coverage. We'll explain your options during the estimate.",
  },
];

export default function RoofReplacementPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Roof Replacement", href: "/services/roof-replacement" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#092e5e] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/install-shingles.webp"
            alt="French Roofing crew installing new shingles during a full roof replacement in Damascus, Oregon"
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
              Full Roof Replacement
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Roof Replacement in Damascus, OR
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              When repairs won&apos;t cut it anymore, our team delivers a full
              tear-off and replacement built to handle Oregon&apos;s rain, wind,
              and everything in between. Premium materials, honest pricing, and
              a crew that treats your home like family.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                Get a Free Estimate
              </a>
              <a
                href={COMPANY.phoneTel}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Call {COMPANY.phone}
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              0% financing available through Enhancify
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Our Roof Replacement Process
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              No mysteries, no runaround. Here&apos;s exactly what happens from
              first call to final walkthrough.
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              Why Homeowners in Clackamas County Choose Us
            </h2>
            <p className="text-gray-600 mb-6">
              A roof replacement is one of the biggest investments you&apos;ll
              make in your home. You deserve a contractor who does the job right
              and communicates honestly along the way. That&apos;s been our
              approach since Sean French started this company in 2014.
            </p>
            <ul className="space-y-4">
              {[
                "CertainTeed Certified — installations that meet the highest manufacturer standards",
                "Licensed, insured & bonded (CCB #203933) — fully compliant in Oregon",
                "Family-owned and operated — we're accountable because our name is on the truck",
                "0% financing through Enhancify — multiple plans to fit your budget",
                "Clean job sites and a final magnet sweep — your yard looks better when we leave",
                "Serving Damascus, Happy Valley, Clackamas, and the Portland metro since 2014",
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
              src="/images/install-shingles.webp"
              alt="Close-up of new shingles being installed by French Roofing in Damascus, OR"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Roof Replacement FAQs"
        faqs={faqs}
      />

      {/* ── CTA ── */}
      <CTABanner
        headline="Ready for a New Roof?"
        description="Schedule a free assessment and get a clear, no-pressure estimate. Financing available through Enhancify."
      />
    </>
  );
}
