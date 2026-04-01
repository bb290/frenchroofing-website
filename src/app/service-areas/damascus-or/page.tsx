import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Damascus, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC is a trusted roofing contractor in Damascus, OR offering roof replacement, roof repair, cleaning, and inspections. Family-owned, CertainTeed Certified, and financing available. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/damascus-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Damascus, OR?",
    answer:
      "Roof replacement costs in Damascus typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. French Roofing provides free, no-obligation assessments so you get an accurate estimate — not a ballpark guess. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "What roofing company serves Damascus, OR?",
    answer:
      "French Roofing LLC is headquartered right here in Damascus, OR at 16235 SE Van Zyl Dr. We've been serving Damascus homeowners since 2014 with roof replacement, repair, cleaning, and inspection services. We're licensed (CCB #203933), insured, and CertainTeed Certified.",
  },
  {
    question: "How long does a roof replacement take in Damascus?",
    answer:
      "Most residential roof replacements in Damascus are completed in 1 to 3 days, depending on the size and complexity of your roof. Weather can sometimes shift the timeline — Oregon being Oregon — but we keep you updated every step of the way.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Damascus?",
    answer:
      "Yes! We offer free roof assessments for Damascus homeowners. Our team will inspect your roof, give you an honest evaluation, and recommend the best course of action — whether that's a repair, maintenance, or a full replacement. No pressure, no gimmicks.",
  },
  {
    question: "What types of roofs does French Roofing install in Damascus, OR?",
    answer:
      "We install a variety of roofing materials suited to the Pacific Northwest climate, including architectural asphalt shingles, composite roofing, and more. As a CertainTeed Certified contractor, we use premium materials backed by strong manufacturer warranties.",
  },
];

export default function DamascusPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Damascus, OR", href: "/service-areas/damascus-or" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Our Home Base
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Damascus, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing is proud to call Damascus home. As your local roofing
            contractor, we provide honest, high-quality roof replacement, repair,
            cleaning, and inspection services right here in our own neighborhood.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={COMPANY.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
            >
              Schedule FREE Assessment
            </a>
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Your Neighbors on the Roof
          </h2>
          <p className="text-gray-600 mb-4">
            Damascus isn&apos;t just where we work — it&apos;s where we live.
            French Roofing LLC was founded here in 2014 by Sean French, and our
            office is still right on SE Van Zyl Dr. When you hire us for a roof
            repair or a full roof replacement in Damascus, you&apos;re hiring the
            folks down the road who genuinely care about keeping this community
            looking great.
          </p>
          <p className="text-gray-600">
            We know the streets, the neighborhoods, and the weather patterns that
            put Damascus roofs to the test. That local knowledge means faster
            response times, better material recommendations, and a roofing
            contractor who actually picks up the phone.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Damascus, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/damascus-or`}
                className="group rounded-xl border border-gray-200 bg-white p-6 hover:border-[#d85024] hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-[#092e5e] group-hover:text-[#d85024] transition-colors">
                  {service.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex text-sm font-medium text-[#d85024]">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── City-Specific Content ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Roofing Challenges in Damascus, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Damascus sits right at the edge of the Cascade foothills, which means
            we get a little more rain, a little more wind, and a lot more moss
            than neighborhoods closer to downtown Portland. Homes here often
            feature architectural asphalt shingles and composite roofing — both
            solid choices for the Pacific Northwest, but both need regular
            attention to stay in top shape.
          </p>
          <p className="text-gray-600">
            Oregon&apos;s wet winters and mild summers create the perfect recipe
            for moss and algae growth. Debris from surrounding trees can clog
            gutters and trap moisture against your shingles. And when those big
            wind storms roll through in fall and winter, even small vulnerabilities
            can turn into costly leaks. That&apos;s why we always recommend
            regular roof inspections — catching a problem early in Damascus is a
            lot cheaper than catching it after it rains through your ceiling.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Damascus Roofing FAQs"
        faqs={faqs}
      />

      {/* ── NAP ── */}
      <section className="py-12 px-4 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-md text-center text-[#3e3d3b]">
          <p className="font-semibold text-[#092e5e]">{COMPANY.name}</p>
          <p>
            {COMPANY.address.street}, {COMPANY.address.city},{" "}
            {COMPANY.address.state} {COMPANY.address.zip}
          </p>
          <p>
            <a
              href={COMPANY.phoneTel}
              className="text-[#d85024] font-semibold hover:underline"
            >
              {COMPANY.phone}
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner dark />
    </>
  );
}
