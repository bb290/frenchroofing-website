import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Troutdale, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC serves Troutdale, OR with expert roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, and about 20 minutes from our Damascus home base. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/troutdale-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Troutdale, OR?",
    answer:
      "Roof replacement costs in Troutdale typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Wind exposure from the Gorge can factor into material choices and installation methods. French Roofing provides free, no-obligation assessments so you get an accurate estimate — not a ballpark guess. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Troutdale, OR?",
    answer:
      "French Roofing LLC serves Troutdale from our home base in Damascus, OR — about 20 minutes south. We've been in business since 2014, we're licensed (CCB #203933), insured, and CertainTeed Certified. We understand the unique wind and weather conditions that Troutdale roofs face at the mouth of the Gorge.",
  },
  {
    question: "How does Gorge wind affect roofs in Troutdale?",
    answer:
      "Troutdale sits right at the western entrance to the Columbia River Gorge, which funnels strong east winds through the area — especially in fall and winter. These sustained winds can lift shingle edges, loosen flashing, and drive rain sideways under roofing materials. We use high-wind-rated shingles and proper installation techniques to help Troutdale roofs stand up to Gorge conditions.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Troutdale?",
    answer:
      "Yes! We offer free roof assessments for Troutdale homeowners. Our team will inspect your roof, give you an honest evaluation, and recommend the best course of action — whether that's a repair, maintenance, or a full replacement. No pressure, no gimmicks.",
  },
  {
    question: "How quickly can French Roofing respond to wind damage in Troutdale?",
    answer:
      "Troutdale's Gorge winds can cause sudden roof damage, and we understand the urgency. Our Damascus office is only about 20 minutes away, so we can get to you faster than many Portland-area contractors. We prioritize emergency repairs and will work with you to get your home protected as quickly as possible.",
  },
];

export default function TroutdalePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Troutdale, OR", href: "/service-areas/troutdale-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Troutdale
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Troutdale, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing serves Troutdale from our Damascus home base — about
            20 minutes south. We build roofs that stand up to Gorge winds with
            the honest, quality service your home deserves.
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
              href={COMPANY.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* -- Intro -- */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Gorge-Ready Roofing From Your Neighbors in Damascus
          </h2>
          <p className="text-gray-600 mb-4">
            Troutdale is the gateway to the Columbia River Gorge — and that
            means your roof faces conditions most Portland-area homes
            don&apos;t. French Roofing LLC has been serving Troutdale and East
            County since 2014, and we know firsthand what Gorge winds do to
            shingles, flashing, and ridge caps. Our Damascus office is about 20
            minutes south, so we&apos;re close enough to respond quickly when
            you need us.
          </p>
          <p className="text-gray-600">
            Sean French started this company on a simple principle: do the work
            like you&apos;re doing it for your own grandma. That means honest
            assessments, quality materials, and craftsmanship that holds up —
            even when those east winds come howling through the Gorge.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Troutdale, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/troutdale-or`}
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

      {/* -- City-Specific Content -- */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Roofing Challenges in Troutdale, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Troutdale&apos;s position at the mouth of the Columbia River Gorge
            makes it one of the windiest communities in the metro area. East
            winds accelerate through the Gorge and hit Troutdale with sustained
            gusts that can peel shingles, rattle ridge caps, and drive rain
            horizontally under roofing materials. It&apos;s not uncommon for
            Troutdale homeowners to discover wind damage they didn&apos;t even
            know about until a leak shows up inside.
          </p>
          <p className="text-gray-600">
            Beyond the wind, Troutdale gets the same Pacific Northwest rain that
            promotes moss and algae growth across the region. The mix of
            residential styles — from mid-century ranch homes near downtown to
            newer developments along the Sandy River — means there&apos;s no
            one-size-fits-all approach. French Roofing tailors our
            recommendations to your specific home, exposure, and budget. We use
            high-wind-rated materials where they matter most and back everything
            with warranties you can actually count on.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Troutdale Roofing FAQs" faqs={faqs} />

      {/* -- NAP -- */}
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

      {/* -- CTA -- */}
      <CTABanner dark />
    </>
  );
}
