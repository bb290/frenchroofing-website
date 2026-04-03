import type { Metadata } from "next";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import RoofEstimator from "@/components/RoofEstimator";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Instant Roof Estimate | Free Online Calculator",
  description:
    "Get a ballpark roof replacement cost in 60 seconds. Compare materials, see pros and cons, and understand pricing - no contact info required. French Roofing, Damascus, OR.",
};

const estimateFAQs = [
  {
    question: "How accurate is the online roof estimate?",
    answer:
      "Our online estimator gives you a ballpark range based on home size, material choice, and roof complexity. Actual pricing depends on tear-off layers, decking condition, flashing, vents, and other on-site factors. Think of it as a starting point - your free in-person assessment will give you an exact number.",
  },
  {
    question: "Why does roofing material matter for price?",
    answer:
      "Different materials have very different costs, lifespans, and warranties. 3-tab shingles are the most affordable but last 20-25 years. Architectural shingles are the most popular, lasting 30-50 years with better wind resistance. Premium designer shingles and standing seam metal cost more upfront but can last 50-70+ years with minimal maintenance.",
  },
  {
    question: "What makes a roof 'complex' vs 'standard'?",
    answer:
      "A standard roof is a simple layout with a walkable pitch and few penetrations. Complexity increases with steeper pitches, multiple roof levels, dormers, valleys, skylights, chimneys, and tight access areas. More complex roofs require more labor time, safety equipment, and careful flashing work.",
  },
  {
    question: "Does French Roofing offer financing for roof replacement?",
    answer:
      "Yes. We partner with Enhancify to offer flexible financing with 0% interest options. You can pre-qualify with a no-impact credit check. Monthly payments can make a full roof replacement very manageable.",
  },
];

export default function EstimatePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Instant Roof Estimate", href: "/estimate" },
        ]}
      />
      <FAQJsonLd faqs={estimateFAQs} />

      {/* Hero */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Free Online Tool
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Get a Roof Estimate in 60 Seconds
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
            Compare materials, understand the trade-offs, and see a ballpark
            price - no contact info required, no strings attached.
          </p>
        </div>
      </section>

      {/* Estimator */}
      <section className="py-12 px-4 bg-gray-50">
        <RoofEstimator />
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-[#092e5e] text-center mb-8">
            Common Questions About Roof Pricing
          </h2>
          <div className="space-y-6">
            {estimateFAQs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-base font-semibold text-[#092e5e] mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Want an Exact Number?"
        description="Our free on-site assessment covers everything the calculator can't - decking, flashing, vents, tear-off layers, and more. No obligation."
        dark
      />
    </>
  );
}
