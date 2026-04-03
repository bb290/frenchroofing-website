import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Gladstone, OR | ${COMPANY.name}`,
  description:
    "French Roofing is a trusted roofing contractor serving Gladstone, OR. Roof replacement, repair, cleaning, and inspections for older and established homes. CertainTeed Certified. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/gladstone-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Gladstone, OR?",
    answer:
      "Roof replacement costs in Gladstone typically range from $8,000 to $25,000+ depending on roof size, pitch, materials, and complexity. Many Gladstone homes were built in the 1950s-70s, so tear-off and replacement can sometimes uncover additional work. French Roofing provides free assessments so you know exactly what you're dealing with. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Gladstone, OR?",
    answer:
      "French Roofing proudly serves Gladstone from our home base in Damascus - just about 15 minutes away. We've been taking care of roofs in the area since 2014. We're licensed (CCB #203933), insured, and CertainTeed Certified, and we specialize in the kind of honest, quality work Gladstone homeowners deserve.",
  },
  {
    question: "Does French Roofing work on older homes in Gladstone?",
    answer:
      "Absolutely. A big portion of Gladstone's housing stock dates back to the 1950s through 1970s, and we have plenty of experience working with older roof structures. Whether it's addressing decades of wear, updating materials, or doing a full tear-off and replacement, we know how to handle what's underneath those old shingles.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Gladstone?",
    answer:
      "Yes! We provide free roof assessments for Gladstone homeowners. We'll climb up, take a thorough look, and give you a straight answer about what your roof needs - no sugarcoating, no unnecessary upsells. Just honest advice from a local team.",
  },
  {
    question: "What types of roofs does French Roofing install in Gladstone, OR?",
    answer:
      "We install a variety of roofing materials that work great in the Pacific Northwest, including architectural asphalt shingles and composite roofing. As a CertainTeed Certified contractor, we use premium materials backed by strong manufacturer warranties - a smart upgrade for Gladstone's older homes.",
  },
];

export default function GladstonePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Gladstone, OR", href: "/service-areas/gladstone-or" },
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
            <span className="text-[#ffbd59]">Gladstone, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing serves Gladstone homeowners with reliable roof
            replacement, repair, cleaning, and inspection services. Quality
            roofing for an established community - from your neighbors in
            Damascus.
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
            Trusted Roofing for Gladstone&apos;s Established Neighborhoods
          </h2>
          <p className="text-gray-600 mb-4">
            Gladstone has that classic, settled-in neighborhood feel - tree-lined
            streets, well-kept yards, and homes with real character. French
            Roofing LLC is based just about 15 minutes away in Damascus, and
            we&apos;ve been serving Gladstone and the surrounding Clackamas
            County area since 2014. We know what older homes need, and we know
            how to take care of them right.
          </p>
          <p className="text-gray-600">
            When you hire French Roofing, you&apos;re getting a family-owned
            crew that takes pride in the details. We&apos;re not a big box
            operation - we&apos;re the folks who answer the phone, show up when
            we say we will, and leave your property cleaner than we found it.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Gladstone, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/gladstone-or`}
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
            Roofing Challenges in Gladstone, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            A lot of Gladstone&apos;s homes were built between the 1950s and
            1970s, which means many roofs in the area have seen multiple
            replacement cycles. The good news is that these homes were built
            solid. The challenge? Older roof structures sometimes reveal
            surprises during tear-off - things like outdated flashing, worn
            decking, or ventilation that doesn&apos;t meet modern standards. At
            French Roofing, we handle all of that without cutting corners.
          </p>
          <p className="text-gray-600">
            Gladstone sits right between Milwaukie and Oregon City, nestled
            along the Clackamas River. That means plenty of mature trees, shade,
            and moisture - the perfect cocktail for moss and algae growth on your
            shingles. Regular roof cleaning and maintenance is one of the best
            investments a Gladstone homeowner can make. And when it&apos;s time
            for a full replacement, we&apos;ll make sure your new roof is built
            to handle decades of Pacific Northwest weather.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Gladstone Roofing FAQs" faqs={faqs} />

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
