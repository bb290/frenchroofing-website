import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Sandy, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC is a trusted roofing contractor serving Sandy, OR with roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, and about 25 minutes from our Damascus home base. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/sandy-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Sandy, OR?",
    answer:
      "Roof replacement costs in Sandy typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Heavy snow loads and mountain weather exposure can also factor into material choices and pricing. French Roofing provides free, no-obligation assessments so you get an accurate estimate — not a ballpark guess. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Sandy, OR?",
    answer:
      "French Roofing LLC serves Sandy from our home base in Damascus, OR — just about 25 minutes down the road on Highway 26. We've been in business since 2014, we're licensed (CCB #203933), insured, and CertainTeed Certified. We know mountain weather and build roofs that hold up to it.",
  },
  {
    question: "Can my roof handle Sandy's heavy snow and wind?",
    answer:
      "Sandy sits at the gateway to Mt. Hood, so roofs here deal with heavier snow loads, ice, and stronger winds than most of the Portland metro. We recommend materials and installation techniques designed for these conditions — proper underlayment, ice and water shield in vulnerable areas, and architectural shingles rated for high wind. We'll assess your specific situation and make sure your roof is ready for whatever the mountain sends your way.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Sandy?",
    answer:
      "Yes! We offer free roof assessments for Sandy homeowners. Our team will inspect your roof, give you an honest evaluation, and recommend the best course of action — whether that's a repair, maintenance, or a full replacement. No pressure, no gimmicks.",
  },
  {
    question: "How quickly can French Roofing respond to storm damage in Sandy?",
    answer:
      "Sandy sees its share of storms rolling off Mt. Hood, and we understand that roof damage can't wait. We prioritize emergency repairs and do our best to get out to Sandy homeowners quickly. We're only about 25 minutes away in Damascus, so we can respond faster than contractors coming from Portland or further out.",
  },
];

export default function SandyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Sandy, OR", href: "/service-areas/sandy-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Sandy
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Sandy, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing serves Sandy homeowners from our Damascus home base —
            about 25 minutes down Highway 26. We build roofs tough enough for
            mountain weather with the honest, neighborly service you deserve.
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
            Mountain-Tough Roofing From Your Neighbors in Damascus
          </h2>
          <p className="text-gray-600 mb-4">
            Sandy is the gateway to Mt. Hood, and that means your roof has to
            work a little harder than most. French Roofing LLC has been serving
            Sandy and the surrounding foothills since 2014, and we understand
            what mountain-adjacent weather does to a roof. Heavy snow, ice dams,
            wind-driven rain — we&apos;ve seen it all and know how to build
            against it.
          </p>
          <p className="text-gray-600">
            Our Damascus office is just a quick drive east on 26, so we&apos;re
            close enough to respond fast when something goes wrong and familiar
            enough with the area to get it right the first time. When you call
            French Roofing, you get a local crew who actually picks up the phone.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Sandy, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/sandy-or`}
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
            Roofing Challenges in Sandy, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Sandy&apos;s location at the base of Mt. Hood means roofs here take
            a beating that most Portland-area homes never see. Heavier snowfall,
            freeze-thaw cycles, and winds funneling down from the Cascades put
            serious stress on shingles, flashing, and underlayment. Ice dams can
            form along eaves during cold snaps, forcing water up under shingles
            where it has no business being.
          </p>
          <p className="text-gray-600">
            The rural and suburban character of Sandy also means many homes are
            surrounded by tall conifers that shed needles, branches, and sap
            year-round. That debris holds moisture against your roof and
            accelerates wear. We always recommend regular inspections and
            cleanings for Sandy homes — staying ahead of problems here saves you
            real money when the next big storm rolls in off the mountain.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Sandy Roofing FAQs" faqs={faqs} />

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
