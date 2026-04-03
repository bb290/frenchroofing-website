import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Johnson City, OR | ${COMPANY.name}`,
  description:
    "French Roofing serves Johnson City, OR with professional roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, based nearby in Damascus. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/johnson-city-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Johnson City, OR?",
    answer:
      "Roof replacement costs in Johnson City typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Many homes in Johnson City are older, so there may be additional considerations during tear-off. French Roofing provides free assessments so you know the full picture upfront. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor serving Johnson City, OR?",
    answer:
      "French Roofing is a trusted roofing contractor serving Johnson City from our home base in Damascus - just about 10 minutes away along I-205. We've been taking care of local roofs since 2014, and we're licensed (CCB #203933), insured, and CertainTeed Certified.",
  },
  {
    question: "How quickly can French Roofing get to Johnson City?",
    answer:
      "Johnson City is one of the closest communities to our Damascus headquarters - just a short hop down I-205. We can typically schedule a free assessment within a few days and often get there even sooner. For urgent situations like storm damage, we do our best to get out to you right away.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Johnson City?",
    answer:
      "Yes! We offer free roof assessments for Johnson City homeowners. We'll give your roof a thorough look and tell you exactly what we find - no fluff, no pressure. Just an honest evaluation and clear options from a local team that cares.",
  },
  {
    question: "Can French Roofing handle older roofs in Johnson City?",
    answer:
      "Absolutely. Johnson City has mostly older homes, and we're well experienced with the kinds of roofing challenges that come with them - from aging decking to outdated ventilation. Whether you need a repair to buy some time or a full replacement to start fresh, we've got you covered.",
  },
];

export default function JohnsonCityPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          {
            name: "Johnson City, OR",
            href: "/service-areas/johnson-city-or",
          },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Clackamas County
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Johnson City, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing proudly serves Johnson City with dependable roof
            replacement, repair, cleaning, and inspections. Big quality roofing
            for a small community - from your close neighbors in Damascus.
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
            Your Closest Roofing Contractor
          </h2>
          <p className="text-gray-600 mb-4">
            Johnson City is one of the tiniest cities in Oregon, but every home
            still needs a solid roof overhead. French Roofing is based in
            Damascus - practically next door, just about 10 minutes down I-205.
            We&apos;ve been serving this corner of Clackamas County since 2014,
            and we&apos;re proud to be the local roofing crew Johnson City
            homeowners can count on.
          </p>
          <p className="text-gray-600">
            Small community or not, you deserve a roofing contractor who shows
            up on time, communicates honestly, and does the job right the first
            time. That&apos;s the French Roofing way - no shortcuts, no
            surprises, just quality work from a family-owned team.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Johnson City, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/johnson-city-or`}
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
            Roofing in Johnson City, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Johnson City is a tiny community along I-205, and most of the homes
            here have been around for a while. Older roofs in this area have
            been through decades of Oregon rain, wind, and the occasional ice
            storm. If your roof is original or hasn&apos;t been replaced in 20+
            years, it&apos;s probably time for a professional inspection at the
            very least. We see a lot of aging shingles, worn flashing, and moss
            buildup on Johnson City roofs - all things we can take care of.
          </p>
          <p className="text-gray-600">
            Because Johnson City is so close to our Damascus headquarters,
            we can respond quickly when you need us. Whether it&apos;s storm
            damage that needs immediate attention or a scheduled roof
            replacement, we&apos;re practically around the corner. And since
            we&apos;re a small, local operation ourselves, we understand the
            value of taking care of your neighbors. Every Johnson City roof we
            work on gets the same attention to detail as if it were our own
            home.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Johnson City Roofing FAQs" faqs={faqs} />

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
