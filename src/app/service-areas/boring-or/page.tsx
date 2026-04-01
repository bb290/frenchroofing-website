import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Boring, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC serves Boring, OR with expert roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, and just 10 minutes from our Damascus home base. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/boring-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Boring, OR?",
    answer:
      "Roof replacement costs in Boring typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Many Boring properties have larger rooflines due to bigger lots and farm-style homes, which can affect the total. French Roofing provides free, no-obligation assessments so you get an accurate estimate — not a ballpark guess. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Boring, OR?",
    answer:
      "French Roofing LLC serves Boring from our home base in Damascus, OR — practically right next door, about 10 minutes away. We've been in business since 2014, we're licensed (CCB #203933), insured, and CertainTeed Certified. Boring is one of our closest service areas, and many of our crew members drive through here every day.",
  },
  {
    question: "How long does a roof replacement take in Boring?",
    answer:
      "Most residential roof replacements in Boring are completed in 1 to 3 days, depending on the size and complexity of your roof. Larger properties with outbuildings or detached garages may require additional time. Oregon weather can sometimes shift the timeline, but we keep you updated every step of the way.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Boring?",
    answer:
      "Yes! We offer free roof assessments for Boring homeowners. Our team will inspect your roof, give you an honest evaluation, and recommend the best course of action — whether that's a repair, maintenance, or a full replacement. No pressure, no gimmicks.",
  },
  {
    question: "Can French Roofing work on farm buildings and large properties in Boring?",
    answer:
      "Absolutely. Boring has a great mix of residential homes, hobby farms, and larger rural properties. We handle roofing for standard homes as well as shops, barns, and outbuildings. If it's got a roof and it needs work, we've got you covered. Just give us a call and we'll come take a look.",
  },
];

export default function BoringPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Boring, OR", href: "/service-areas/boring-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Boring
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Boring, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            The name might be Boring, but our roofing work is anything but.
            French Roofing serves Boring from right next door in Damascus — just
            about 10 minutes away. Quality craftsmanship for your home, shop, or
            property.
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
            Your Next-Door Roofers
          </h2>
          <p className="text-gray-600 mb-4">
            Boring and Damascus are practically neighbors — our office on SE Van
            Zyl Dr is only about 10 minutes from the heart of Boring. French
            Roofing LLC was founded in 2014 by Sean French, and this stretch of
            unincorporated Clackamas County is our home turf. We know the roads,
            the properties, and the weather that keeps roofers busy out here.
          </p>
          <p className="text-gray-600">
            Whether you&apos;ve got a three-bedroom ranch or a property with a
            house, shop, and barn that all need attention, we treat every project
            the same — with honest communication, quality materials, and
            workmanship we stand behind. Boring homeowners deserve a roofing
            contractor who shows up when they say they will, and that&apos;s us.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Boring, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/boring-or`}
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
            Roofing Challenges in Boring, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Boring has a rural, spread-out feel with larger lots, mature trees,
            and a good mix of farm properties and residential homes. That means
            more roof surface area exposed to Oregon&apos;s rain, wind, and
            debris. Properties with multiple structures — houses, detached
            garages, shops, barns — often need a roofing partner who can handle
            the whole picture, not just one building at a time.
          </p>
          <p className="text-gray-600">
            The unincorporated nature of Boring means there&apos;s a wide range
            of housing ages out here. Some homes have been around for decades,
            and their roofs are well past due for replacement. Others are newer
            builds that just need regular maintenance to stay in top condition.
            Either way, French Roofing gives you a straight answer about what
            your roof actually needs. We don&apos;t upsell, we don&apos;t cut
            corners, and we always clean up after ourselves — even on the big
            rural properties where it would be easy to leave a mess.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Boring Roofing FAQs" faqs={faqs} />

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
