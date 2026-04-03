import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Fairview, OR | ${COMPANY.name}`,
  description:
    "French Roofing serves Fairview, OR with expert roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, just a short drive from our Damascus home base. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/fairview-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Fairview, OR?",
    answer:
      "Roof replacement costs in Fairview typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Many Fairview homes feature newer construction, which can simplify the process. French Roofing provides free, no-obligation assessments so you get an accurate estimate. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Fairview, OR?",
    answer:
      "French Roofing is a trusted roofing contractor serving Fairview, OR from our home base in Damascus - just about 20 minutes away. We've been serving the East County community since 2014, and we're licensed (CCB #203933), insured, and CertainTeed Certified.",
  },
  {
    question: "How long does a roof replacement take in Fairview?",
    answer:
      "Most residential roof replacements in Fairview are completed in 1 to 3 days, depending on size and complexity. Oregon weather can sometimes shift the timeline, but we keep you in the loop every step of the way.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Fairview?",
    answer:
      "Absolutely! We offer free roof assessments for Fairview homeowners. Our team will inspect your roof, give you an honest evaluation, and recommend the best course of action - whether that's a repair, some maintenance, or a full replacement. No pressure, no gimmicks.",
  },
  {
    question: "What roofing materials work best for homes in Fairview, OR?",
    answer:
      "Fairview's newer developments often feature architectural asphalt shingles and composite roofing - both excellent choices for the Pacific Northwest climate. As a CertainTeed Certified contractor, we use premium materials backed by strong manufacturer warranties that stand up to Oregon's rain and wind.",
  },
];

export default function FairviewPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Fairview, OR", href: "/service-areas/fairview-or" },
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
            <span className="text-[#ffbd59]">Fairview, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing is proud to serve Fairview homeowners with honest,
            high-quality roof replacement, repair, cleaning, and inspection
            services - just a quick drive from our Damascus home base.
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
            Your East County Roofing Neighbors
          </h2>
          <p className="text-gray-600 mb-4">
            Fairview is one of those small East County communities where folks
            still wave at each other from the driveway - and that&apos;s our kind
            of neighborhood. French Roofing is based in Damascus, just about
            20 minutes south down the road, and we&apos;ve been taking care of
            roofs in the Fairview area since 2014.
          </p>
          <p className="text-gray-600">
            Whether you&apos;re in one of Fairview&apos;s newer developments or
            an established home near I-84, we bring the same local knowledge and
            quality craftsmanship to every job. When you reach out, you get a
            real person who knows the area - not a call center three states away.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Fairview, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/fairview-or`}
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
            Roofing in Fairview, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Fairview has seen a nice mix of newer developments and affordable
            housing pop up over the past couple decades, which means a lot of
            roofs in the area are still relatively young. That&apos;s great
            news - but it doesn&apos;t mean they&apos;re maintenance-free.
            Oregon&apos;s relentless rain, moss growth, and the occasional
            windstorm off the Gorge can take a toll on even newer roofing
            systems. Regular inspections and timely repairs go a long way toward
            protecting your investment.
          </p>
          <p className="text-gray-600">
            Fairview&apos;s proximity to I-84 and the Columbia River means homes
            here can catch some serious wind, especially during fall and winter
            storms. Loose shingles, lifted flashing, and clogged gutters are
            common issues we see when we roll into town. The good news? A quick
            call to French Roofing and we can usually get out to you within a day
            or two - no long waits, no runaround.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Fairview Roofing FAQs" faqs={faqs} />

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
