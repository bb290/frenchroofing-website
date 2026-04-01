import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Lake Oswego, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC serves Lake Oswego, OR with premium roof replacement, repair, cleaning, and inspections. CertainTeed Certified, family-owned, about 25 minutes from Damascus. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/lake-oswego-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Lake Oswego, OR?",
    answer:
      "Roof replacement in Lake Oswego typically ranges from $10,000 to $30,000+ depending on roof size, complexity, and materials. Lake Oswego homes tend to be larger with more detailed rooflines, which can increase the scope of work. French Roofing provides free, detailed assessments so you know exactly what to expect. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Lake Oswego, OR?",
    answer:
      "French Roofing LLC has been serving Lake Oswego and the greater Portland metro since 2014. We're based in Damascus — about 25 minutes from Lake Oswego — and we bring CertainTeed Certified quality to every project. We're licensed (CCB #203933), insured, and known for clean job sites, clear communication, and craftsmanship that meets the high standards Lake Oswego homeowners expect.",
  },
  {
    question: "Does French Roofing work with HOAs in Lake Oswego?",
    answer:
      "Yes, and we understand how important that is in Lake Oswego. Many neighborhoods here have HOA guidelines that govern roofing materials, colors, and even contractor requirements. We're happy to work within your HOA's specifications, provide documentation they may need, and help you select materials that meet community standards while protecting your home.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Lake Oswego?",
    answer:
      "Absolutely. We offer free roof assessments for Lake Oswego homeowners. Whether you're concerned about aging shingles, storm damage, or just want a professional opinion before listing your home, we'll give you a thorough and honest evaluation with clear recommendations.",
  },
  {
    question: "What roofing materials does French Roofing recommend for Lake Oswego homes?",
    answer:
      "For Lake Oswego, we often recommend premium architectural shingles that combine durability with a refined appearance. As a CertainTeed Certified contractor, we install high-end shingle lines that offer superior weather resistance, moss and algae protection, and color options that complement Lake Oswego's upscale aesthetic. We'll help you choose a material that looks great and performs in the Pacific Northwest climate.",
  },
];

export default function LakeOswegoPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Lake Oswego, OR", href: "/service-areas/lake-oswego-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Lake Oswego &amp; Surrounding Communities
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Lake Oswego, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing delivers premium roof replacement, repair, cleaning,
            and inspections to Lake Oswego homeowners. Quality craftsmanship,
            honest communication, and materials that match the standard your
            home deserves.
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
            Quality Roofing for a Quality Community
          </h2>
          <p className="text-gray-600 mb-4">
            Lake Oswego is known for its beautiful homes, well-kept
            neighborhoods, and high standards — and your roof should live up to
            all of that. French Roofing is based in Damascus, about 25 minutes
            east, and we&apos;ve been providing honest, high-quality roofing
            services across the Portland metro since 2014.
          </p>
          <p className="text-gray-600">
            We understand that in Lake Oswego, appearance matters just as much as
            performance. That&apos;s why we take extra care with material
            selection, clean job sites, and attention to detail. Sean French
            built this company on the idea that every roof should be done like
            you&apos;re doing it for your own grandma — and in Lake Oswego, that
            means grandma&apos;s roof is going to look phenomenal.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Lake Oswego, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/lake-oswego-or`}
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
            Roofing Challenges in Lake Oswego, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Lake Oswego homes are often larger and more architecturally detailed
            than average — multi-level rooflines, steeper pitches, dormers, and
            premium materials are common. That means roofing projects here
            require a bit more planning and precision. Many homes in the First
            Addition, Lake Grove, and Lakewood neighborhoods were built between
            the 1950s and 1980s, and quite a few have been extensively remodeled
            since. If your roof wasn&apos;t part of that remodel, it might be
            overdue for attention.
          </p>
          <p className="text-gray-600">
            Lake Oswego&apos;s tree-lined streets are gorgeous, but all that
            canopy means constant leaf and needle debris on your roof. Moss is a
            year-round concern — especially on north-facing slopes and shaded
            sections where moisture lingers. Many Lake Oswego homeowners also
            need to consider HOA requirements when choosing roofing materials and
            colors. We work with homeowners and HOA boards to ensure every
            project meets community guidelines while providing top-tier
            protection against Oregon&apos;s relentless rain, wind, and seasonal
            storms. A clean, well-maintained roof isn&apos;t just practical in
            Lake Oswego — it&apos;s part of what makes the neighborhood look its
            best.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Lake Oswego Roofing FAQs" faqs={faqs} />

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
