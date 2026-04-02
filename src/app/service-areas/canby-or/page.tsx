import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Canby, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC provides professional roofing services in Canby, OR — roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, serving from Damascus. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/canby-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Canby, OR?",
    answer:
      "Roof replacement costs in Canby typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Canby has a nice mix of newer developments and older farmhouse-style homes, so costs can vary. French Roofing provides free assessments so you get a real number, not a guess. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Canby, OR?",
    answer:
      "French Roofing LLC serves Canby from our home base in Damascus — about 20 miles and a 30-minute drive. We've been in business since 2014, we're licensed (CCB #203933), insured, and CertainTeed Certified. Canby is at the edge of our service area, but we give every Canby job the same quality and attention as a job down the street.",
  },
  {
    question: "Does French Roofing travel to Canby for roofing jobs?",
    answer:
      "Yes! Canby is at the edge of our 20-mile service radius from Damascus, and we're happy to serve the community. The drive is about 30 minutes, and we regularly work in Canby and the surrounding area. No extra travel charges — just the same honest pricing we offer everywhere.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Canby?",
    answer:
      "Absolutely. We offer free roof assessments for Canby homeowners. Our team will inspect your roof, give you a straightforward evaluation, and lay out your options — repair, maintenance, or replacement. No sales pressure, just honest advice from a local team.",
  },
  {
    question: "What roofing materials work best for Canby, OR homes?",
    answer:
      "Canby's mix of agricultural open land and suburban neighborhoods means roofs face everything from direct sun exposure to heavy rain and wind. Architectural asphalt shingles and composite roofing are popular and durable choices. As a CertainTeed Certified contractor, we use premium materials built to handle whatever Oregon throws at them.",
  },
];

export default function CanbyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Canby, OR", href: "/service-areas/canby-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Edge of Our Service Area
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Canby, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing brings quality roof replacement, repair, cleaning,
            and inspection services to Canby — because great roofing
            shouldn&apos;t stop at the city limits. Your Damascus-based roofer,
            about 30 minutes away.
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
            Quality Roofing, Worth the Drive
          </h2>
          <p className="text-gray-600 mb-4">
            Canby sits at the edge of our service area — about 20 miles and a
            30-minute drive from our Damascus home base — but that doesn&apos;t
            mean we cut any corners getting there. French Roofing LLC has been
            serving the greater Clackamas County area since 2014, and Canby
            homeowners get the same quality craftsmanship, honest communication,
            and fair pricing as our neighbors right down the street.
          </p>
          <p className="text-gray-600">
            Canby is a community that&apos;s growing — more and more families
            are putting down roots here, drawn by the small-town feel and room
            to breathe. Whether you&apos;re in one of the newer developments on
            the outskirts or an established home closer to downtown, we&apos;re
            here to make sure your roof is solid.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Canby, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/canby-or`}
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
            Roofing in Canby, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Canby has been making the shift from agricultural community to
            suburban destination for a while now, and that means the roofing
            landscape is pretty diverse. You&apos;ve got newer subdivisions with
            relatively fresh roofs on the outskirts, and older homes closer to
            the center of town that have been standing for decades. Both need
            attention — newer roofs for maintenance and warranty compliance,
            older roofs for potential replacement before small problems become
            expensive ones.
          </p>
          <p className="text-gray-600">
            Out in Canby, homes tend to get a bit more sun exposure than the
            neighborhoods tucked under Portland&apos;s tree canopy, but
            they&apos;re still hit with the same heavy Oregon rains and
            occasional windstorms. That combination of UV and moisture can age
            shingles faster than you might expect. A regular roof inspection —
            even just once a year — can catch issues early and save you
            thousands down the road. And when it is time for a replacement,
            French Roofing brings the same quality materials and workmanship to
            Canby that we&apos;re known for across Clackamas County.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Canby Roofing FAQs" faqs={faqs} />

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
