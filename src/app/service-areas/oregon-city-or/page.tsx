import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Oregon City, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC is a trusted roofing contractor serving Oregon City, OR. Roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, about 20 minutes from Damascus. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/oregon-city-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Oregon City, OR?",
    answer:
      "Roof replacement in Oregon City generally ranges from $8,000 to $28,000+ depending on roof size, pitch, accessibility, and materials. Many older homes in Oregon City — especially those in the bluff area — have steeper roofs and unique architectural details that can affect pricing. French Roofing provides free assessments so you get a real number, not a guess. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Oregon City, OR?",
    answer:
      "French Roofing LLC has been serving Oregon City homeowners from our Damascus home base since 2014 — we're about 20 minutes away. We're licensed (CCB #203933), insured, and CertainTeed Certified. We specialize in the kind of older, character-rich homes that make Oregon City special, and we treat every project with care and honest communication.",
  },
  {
    question: "Can French Roofing work on historic homes in Oregon City?",
    answer:
      "Yes! Oregon City has some of the most historic homes in the Portland metro area, and we understand the care they require. We work with homeowners to select materials and approaches that respect the character of older homes while providing modern protection. We'll walk you through your options so you can make the best choice for your property.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Oregon City?",
    answer:
      "Absolutely. We offer free roof assessments for Oregon City homeowners. Given the age of many homes in the area, regular inspections are especially important. We'll inspect your roof, give you an honest evaluation, and recommend the right path forward — no pressure, no upselling.",
  },
  {
    question: "How does Oregon City's terrain affect roofing work?",
    answer:
      "Oregon City's bluff area and steep hillsides can make roofing more complex than flat-terrain neighborhoods. Steep lots can affect access, staging, and material delivery. Our crew has experience working on challenging terrain throughout the Clackamas County area, and we plan every job carefully to ensure safety and quality results.",
  },
];

export default function OregonCityPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Oregon City, OR", href: "/service-areas/oregon-city-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Oregon City &amp; Clackamas County
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Oregon City, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing brings honest, high-quality roofing services to
            Oregon City — from the historic bluff to the newer neighborhoods
            south of town. Roof replacement, repair, cleaning, and inspections
            done right.
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
            End of the Trail, Start of a Great Roof
          </h2>
          <p className="text-gray-600 mb-4">
            Oregon City holds a special place in Oregon history — it&apos;s
            literally where the Oregon Trail ended. And while we can&apos;t fix
            your covered wagon, we can definitely fix your roof. French Roofing
            is based in Damascus, about 20 minutes east, which means we&apos;re
            close enough to treat Oregon City like our own neighborhood.
          </p>
          <p className="text-gray-600">
            Whether you&apos;re in one of the charming older homes near
            downtown, up on the bluff with those stunning Willamette views, or in
            a newer development toward Beavercreek, we&apos;ve been helping
            Clackamas County homeowners since 2014. Sean French started this
            company with one rule: do the work like you&apos;d do it for your
            own grandma. That applies whether your home was built in 1920 or
            2020.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Oregon City, OR
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
            Roofing Challenges in Oregon City, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Oregon City has one of the most diverse housing stocks in the
            Portland metro. You&apos;ve got pre-war Craftsman bungalows downtown,
            mid-century ranches along the hillside, and plenty of homes from the
            1950s through 1970s that are now on their second or third roof. Many
            of these older homes have original cedar shake or early composition
            shingles that are well past their expected lifespan. If your Oregon
            City home was built before 1980 and hasn&apos;t had a roof
            replacement, it&apos;s worth getting an inspection sooner rather than
            later.
          </p>
          <p className="text-gray-600">
            The terrain here adds another layer of complexity. Oregon City&apos;s
            famous bluff and the steep hillsides along the Willamette River mean
            many homes sit on slopes that affect drainage, wind exposure, and
            even how debris collects on the roof. Oregon&apos;s wet winters push
            water downhill fast, and if your roof isn&apos;t shedding it
            properly, you&apos;ll know about it. Moss thrives in the shaded,
            damp conditions that many Oregon City lots naturally provide. Regular
            roof cleaning and maintenance go a long way toward preventing the
            kind of damage that leads to an emergency call on a rainy January
            night.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Oregon City Roofing FAQs" faqs={faqs} />

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
