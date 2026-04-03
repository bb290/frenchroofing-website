import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Wood Village, OR | ${COMPANY.name}`,
  description:
    "French Roofing provides expert roofing services in Wood Village, OR - roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, serving from nearby Damascus. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/wood-village-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Wood Village, OR?",
    answer:
      "Roof replacement costs in Wood Village typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Wood Village has a lot of newer construction, which can keep costs on the lower end. French Roofing provides free assessments so you get an accurate number - not a guess. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Wood Village, OR?",
    answer:
      "French Roofing is a trusted local roofing contractor serving Wood Village from our Damascus home base - roughly 20 minutes away. We've been in business since 2014, and we're licensed (CCB #203933), insured, and CertainTeed Certified. We treat every Wood Village home like it's our own.",
  },
  {
    question: "How long does a roof replacement take in Wood Village?",
    answer:
      "Most residential roof replacements in Wood Village wrap up in 1 to 3 days, depending on size and complexity. Weather can sometimes push things a day - this is Oregon, after all - but we keep you updated throughout the process.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Wood Village?",
    answer:
      "You bet! We offer free roof assessments for Wood Village homeowners. We'll take a thorough look at your roof, give you an honest evaluation, and walk you through your options - whether it's a small repair or a full replacement. Zero pressure.",
  },
  {
    question: "What roofing services does French Roofing provide in Wood Village?",
    answer:
      "We offer the full range of residential roofing services in Wood Village: roof replacement, roof repair, roof cleaning and maintenance, and roof inspections. As a CertainTeed Certified contractor, we use quality materials and stand behind our work with solid warranties.",
  },
];

export default function WoodVillagePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Wood Village, OR", href: "/service-areas/wood-village-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving East County
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Wood Village, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing brings honest, quality roofing services to Wood
            Village - from roof replacements and repairs to cleaning and
            inspections. Your local roofer, just down the road in Damascus.
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
            Small Town, Big Quality Roofing
          </h2>
          <p className="text-gray-600 mb-4">
            Wood Village may be one of the smallest cities in East County, but
            that doesn&apos;t mean your roof deserves anything less than the
            best. French Roofing is headquartered in Damascus - about a
            20-minute drive - and we&apos;ve been serving the greater East
            County area since 2014. We know these neighborhoods, and we treat
            every home like it belongs to family.
          </p>
          <p className="text-gray-600">
            From the compact residential streets near the outlet mall to the
            newer homes on the outskirts, Wood Village roofs face the same
            Pacific Northwest weather as the rest of us. When you need a roofer
            who actually shows up, answers the phone, and does the job right -
            that&apos;s us.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Wood Village, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/wood-village-or`}
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
            Roofing in Wood Village, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Wood Village is a tight-knit community tucked between Gresham and
            Troutdale, and a lot of the housing stock here is relatively newer
            construction. That&apos;s a good thing when it comes to roofing -
            but even newer roofs need attention in the Pacific Northwest. Moss,
            algae, and debris buildup can start causing problems within just a
            few years if left unchecked, especially under all those trees.
          </p>
          <p className="text-gray-600">
            We see a lot of architectural shingle roofs in Wood Village, and
            they hold up well when properly maintained. Regular cleaning, gutter
            checks, and the occasional inspection go a long way toward avoiding
            surprise repairs. And if your roof has taken a hit from one of those
            East County windstorms, French Roofing can get out to assess the
            damage quickly - we&apos;re close by and we don&apos;t believe in
            making folks wait around when their roof is on the line.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Wood Village Roofing FAQs" faqs={faqs} />

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
