import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in West Linn, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC provides expert roof replacement, repair, cleaning, and inspections in West Linn, OR. Family-owned, CertainTeed Certified, and just a 20-minute drive from our Damascus home base. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/west-linn-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in West Linn, OR?",
    answer:
      "Roof replacement costs in West Linn typically range from $9,000 to $28,000+ depending on roof size, pitch, materials, and the complexity of your roofline. Many West Linn homes sit on hillsides or have steeper pitches, which can affect pricing. French Roofing provides free, no-obligation assessments so you get an accurate estimate — not a ballpark guess. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in West Linn, OR?",
    answer:
      "French Roofing LLC is a trusted roofing contractor serving West Linn from our home base in Damascus, OR — just about 20 minutes away. We've been serving the area since 2014, we're licensed (CCB #203933), insured, and CertainTeed Certified. Our reputation is built on honest communication, quality workmanship, and treating every home like it belongs to family.",
  },
  {
    question: "How long does a roof replacement take in West Linn?",
    answer:
      "Most residential roof replacements in West Linn are completed in 1 to 3 days, depending on the size and complexity of your roof. Steeper hillside homes may take a bit longer due to access and safety considerations. Oregon weather can sometimes shift the timeline, but we keep you updated every step of the way.",
  },
  {
    question: "Does French Roofing offer free roof inspections in West Linn?",
    answer:
      "Yes! We offer free roof assessments for West Linn homeowners. Our team will inspect your roof, give you an honest evaluation, and recommend the best course of action — whether that's a repair, maintenance, or a full replacement. No pressure, no gimmicks.",
  },
  {
    question: "What roofing materials work best for West Linn homes?",
    answer:
      "West Linn's hilly terrain and mature tree canopy mean your roof needs to handle heavy rain, debris, and moss growth. We typically recommend architectural asphalt shingles and composite roofing for the area. As a CertainTeed Certified contractor, we use premium materials backed by strong manufacturer warranties that stand up to Pacific Northwest conditions.",
  },
];

export default function WestLinnPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "West Linn, OR", href: "/service-areas/west-linn-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving West Linn
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">West Linn, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing brings honest, high-quality roofing services to West
            Linn from our home base in Damascus — just a short drive down the
            road. Roof replacement, repair, cleaning, and inspections done right.
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

      {/* -- Intro -- */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Your Damascus Neighbors, Working in West Linn
          </h2>
          <p className="text-gray-600 mb-4">
            West Linn is only about 20 minutes from our Damascus headquarters,
            and we&apos;ve been taking care of roofs in this beautiful community
            for years. French Roofing LLC was founded in 2014 by Sean French, and
            we treat every West Linn project with the same care we give our own
            neighbors back home.
          </p>
          <p className="text-gray-600">
            We know that West Linn homeowners take pride in their properties —
            and we take pride in protecting them. Whether you&apos;re in one of
            the established neighborhoods near the Willamette River or a newer
            development up in the hills, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in West Linn, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
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
            Roofing Challenges in West Linn, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            West Linn&apos;s hilly terrain and mature tree canopy make it one of
            the most picturesque communities in the Portland metro — but those
            same features create real challenges for your roof. Steep slopes mean
            water runs fast and heavy during Oregon&apos;s rainy season, and all
            those beautiful old-growth trees drop leaves, needles, and branches
            that pile up in valleys and gutters. If you don&apos;t stay on top of
            it, moisture gets trapped and moss takes over.
          </p>
          <p className="text-gray-600">
            Many West Linn homes are in established neighborhoods with roofs that
            are 20 or 30 years old — right at the point where a replacement
            makes more sense than patching things together. Newer developments in
            the area tend to have steeper, more complex rooflines that need
            experienced hands. Either way, French Roofing has the know-how to
            handle it. We&apos;ll give you a straight answer on what your roof
            actually needs, and we&apos;ll back the work with warranties you can
            count on.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="West Linn Roofing FAQs" faqs={faqs} />

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
