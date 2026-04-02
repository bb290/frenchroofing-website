import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `CertainTeed Roofing Materials & Options | ${COMPANY.name}`,
  description:
    "Learn about the CertainTeed roofing system French Roofing installs \u2014 from Landmark architectural shingles to premium designer options. Built to handle Oregon weather.",
  alternates: { canonical: `${COMPANY.url}/materials` },
};

const shingleOptions = [
  {
    name: "Landmark",
    type: "Architectural Shingle",
    badge: "Most Popular",
    description:
      "CertainTeed\u2019s Landmark series is the most popular choice among our customers, and for good reason. These architectural shingles deliver a clean, dimensional look with a wide range of color options to complement any home style. They carry a limited lifetime warranty from CertainTeed and are engineered to handle wind speeds up to 110 mph. For most homeowners looking for a reliable, great-looking roof at a solid value, Landmark is the sweet spot.",
  },
  {
    name: "Landmark Pro",
    type: "Premium Architectural Shingle",
    badge: "Enhanced",
    description:
      "Landmark Pro takes everything that makes the standard Landmark great and adds extra thickness, a more dimensional profile, and enhanced warranty coverage. The Max Def colors give your roof more depth and curb appeal. If you want a step up in both looks and longevity without jumping to a designer price point, Landmark Pro is a smart choice \u2014 especially popular with homeowners planning to stay in their home long-term.",
  },
  {
    name: "Grand Manor & Carriage House",
    type: "Premium Designer Shingles",
    badge: "Luxury",
    description:
      "For homeowners who want their roof to make a statement, CertainTeed\u2019s designer lines deliver a luxury aesthetic that mimics the look of natural slate or cedar shake. Grand Manor and Carriage House shingles are thicker, heavier, and more textured than standard architectural shingles. They\u2019re a premium investment, but for the right home, the difference in curb appeal is dramatic. These are typically installed on higher-end homes where the roof is a defining architectural feature.",
  },
];

const materialsFAQs = [
  {
    question: "Can I choose my shingle color?",
    answer:
      "Absolutely. CertainTeed offers a wide range of colors across all their shingle lines. During your assessment, we can show you color samples and help you pick one that complements your home\u2019s siding, trim, and style. We\u2019ll also confirm availability for your chosen color and product.",
  },
  {
    question: "What\u2019s the difference between 3-tab and architectural shingles?",
    answer:
      "3-tab shingles are flat, uniform, and thinner \u2014 they were the standard for decades but are becoming less common. Architectural shingles (like CertainTeed Landmark) are thicker, multi-layered, and have a more dimensional look. They also last longer and handle wind better. French Roofing installs architectural shingles as our standard because they\u2019re a better long-term value.",
  },
  {
    question: "How long do CertainTeed shingles last in Oregon?",
    answer:
      "CertainTeed Landmark shingles carry a limited lifetime warranty, and with proper installation and maintenance, they typically perform well for 25 to 30+ years in the Pacific Northwest. Oregon\u2019s climate is demanding \u2014 rain, moss, and temperature swings all play a role \u2014 but CertainTeed\u2019s algae-resistant technology and robust construction are designed for exactly these conditions.",
  },
  {
    question: "Why does French Roofing use CertainTeed instead of other brands?",
    answer:
      "We chose CertainTeed because they offer a complete roofing system \u2014 not just shingles, but underlayment, starter strips, ridge caps, and ventilation all designed to work together. Their products perform exceptionally well in the Pacific Northwest, and their certification program lets us offer enhanced warranty coverage to our customers. We\u2019ve installed thousands of CertainTeed roofs and trust them completely.",
  },
  {
    question: "Do I have to use CertainTeed products?",
    answer:
      "CertainTeed is our recommended and primary product line, and it\u2019s what allows us to offer the best warranty coverage. That said, if you have a specific need or preference, we\u2019re happy to discuss it during your assessment. Our goal is to give you the best roof for your home and budget.",
  },
];

export default function MaterialsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Roofing Materials", href: "/materials" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Built with the Best &mdash;{" "}
            <span className="text-[#ffbd59]">CertainTeed Roofing Systems</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Your roof is only as good as the materials that go into it. Here&apos;s
            why we chose CertainTeed and what options are available for your home.
          </p>
        </div>
      </section>

      {/* ── Why CertainTeed ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6 text-center">
            Why CertainTeed?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            When Sean French started French Roofing in 2014, one of the first
            decisions was which materials to build the business around. After
            years of working with various brands, the choice was clear:
            CertainTeed delivers consistent quality, proven performance in the
            Pacific Northwest, and a warranty program that actually means
            something.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We&apos;re not just buying shingles off a shelf. As a CertainTeed
            Certified contractor, we&apos;ve invested in training and met their
            quality standards &mdash; which means better installations and
            better warranty coverage for you.
          </p>
        </div>
      </section>

      {/* ── The Full System ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6 text-center">
            It&apos;s Not Just Shingles &mdash; It&apos;s a System
          </h2>
          <p className="text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mb-12">
            A lot of people think a roof is just shingles, but the truth is your
            roof is a system of components that need to work together. CertainTeed
            designs each layer to complement the others, which is why we install
            the full system rather than mixing and matching brands.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Underlayment",
                desc: "The moisture barrier between your decking and shingles. CertainTeed\u2019s underlayment products are specifically designed for their shingle lines, creating a watertight foundation.",
              },
              {
                title: "Starter Strips",
                desc: "The first line of defense along your eaves and rakes. Factory-applied sealant bonds to the first course of shingles, helping prevent wind uplift and water infiltration.",
              },
              {
                title: "Shingles",
                desc: "The visible layer that defines your roof\u2019s look and provides primary weather protection. CertainTeed offers options from dependable architectural to premium designer styles.",
              },
              {
                title: "Ridge Caps",
                desc: "The finishing touch along the peaks of your roof. Purpose-built ridge caps provide a clean look and critical protection at the most vulnerable seams.",
              },
              {
                title: "Ventilation",
                desc: "Proper airflow extends the life of your entire roof system. CertainTeed ridge vents work with your attic ventilation to regulate temperature and moisture.",
              },
              {
                title: "Hip & Ridge",
                desc: "Contoured pieces designed for the hips and ridges of your roof. They provide both aesthetic appeal and an extra layer of protection at high-stress areas.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="text-lg font-bold text-[#092e5e] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shingle Options ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-4 text-center">
            Shingle Options
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            These are the most common CertainTeed shingle lines French Roofing
            installs. Actual availability is confirmed during your roof
            assessment.
          </p>
          <div className="space-y-8">
            {shingleOptions.map((shingle) => (
              <div
                key={shingle.name}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-[#092e5e]">
                    {shingle.name}
                  </h3>
                  <span className="text-sm font-medium text-[#d85024] bg-[#d85024]/10 px-3 py-1 rounded-full">
                    {shingle.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-[#3e3d3b] mb-3">
                  {shingle.type}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {shingle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Oregon Climate ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6 text-center">
            Why Material Matters in Oregon
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Oregon is beautiful, but it&apos;s tough on roofs. Our climate
            throws persistent rain, moss growth, seasonal wind storms, and
            freeze-thaw cycles at your home year after year. Cheap materials
            might look fine on day one, but they break down faster under these
            conditions.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            CertainTeed shingles are built with StreakFighter algae-resistance
            technology to fight the dark streaks that plague Pacific Northwest
            roofs. Their architectural shingles are rated for winds up to 110
            mph, and the layered construction handles thermal expansion and
            contraction better than thinner alternatives.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Bottom line: the materials you choose today determine how your roof
            performs for the next 25 to 30+ years. We recommend CertainTeed
            because we&apos;ve seen how they hold up in our climate, job after
            job.
          </p>
        </div>
      </section>

      {/* ── Certification Advantage ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
            CertainTeed Certified
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e] mb-4">
            What Our Certification Means for You
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Not every roofer who installs CertainTeed products is certified.
            Certification means French Roofing has completed manufacturer
            training, met quality benchmarks, and maintains an active
            relationship with CertainTeed.
          </p>
          <p className="text-gray-600 leading-relaxed">
            For homeowners, this translates to one major benefit: enhanced
            warranty options. When a certified contractor installs your roof, you
            may qualify for longer coverage periods and warranties that include
            labor for material defects &mdash; something standard manufacturer
            warranties typically don&apos;t cover. It&apos;s our way of making
            sure you get the most protection possible.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection title="Roofing Materials FAQs" faqs={materialsFAQs} />

      {/* ── CTA ── */}
      <CTABanner
        headline="See the Right Materials for Your Roof"
        description="Schedule a free assessment and we\u2019ll walk you through the best CertainTeed options for your home, your style, and your budget."
      />
    </>
  );
}
