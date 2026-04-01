import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Tualatin, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC serves Tualatin, OR with reliable roof replacement, repair, cleaning, and inspections. CertainTeed Certified, family-owned, about 30 minutes from our Damascus home base. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/tualatin-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Tualatin, OR?",
    answer:
      "Roof replacement in Tualatin generally ranges from $8,000 to $25,000+ depending on roof size, pitch, and materials. Many Tualatin homes were built in the 1990s and 2000s with moderate-pitch roofs that tend to be straightforward projects. French Roofing provides free assessments so you get an accurate estimate, not a ballpark. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Tualatin, OR?",
    answer:
      "French Roofing LLC has been serving the greater Portland metro — including Tualatin — since 2014. We're based in Damascus, about 30 minutes east, and we bring the same quality, honesty, and care to every Tualatin job. We're licensed (CCB #203933), insured, and CertainTeed Certified.",
  },
  {
    question: "Are 1990s and 2000s roofs in Tualatin due for replacement?",
    answer:
      "Many of them are getting close. Standard architectural shingles installed in the 1990s have a 25- to 30-year lifespan, which means homes built during Tualatin's big growth period are entering the replacement window now. If your roof is 20+ years old, a free inspection from French Roofing can tell you exactly where things stand — and whether you have a few more years or need to plan now.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Tualatin?",
    answer:
      "Yes! We offer free roof assessments for Tualatin homeowners. We'll inspect your roof top to bottom, give you an honest evaluation, and let you know your options. No pressure, no gimmicks — just straight talk about what your roof needs.",
  },
  {
    question: "How does Tualatin's flat terrain affect roofing?",
    answer:
      "Tualatin's relatively flat terrain actually makes roofing projects a bit more accessible than hilly areas, which can help with logistics and staging. However, flat terrain also means water drains more slowly off surrounding lots, and homes in low-lying areas near the Tualatin River can experience higher humidity. Proper ventilation, quality underlayment, and regular maintenance are key to keeping a Tualatin roof in great shape for the long haul.",
  },
];

export default function TualatinPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Tualatin, OR", href: "/service-areas/tualatin-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Tualatin &amp; SW Portland Metro
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Tualatin, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing provides dependable roof replacement, repair,
            cleaning, and inspections to Tualatin homeowners. Honest work,
            quality materials, and a crew that treats your home like family.
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
            Keeping Tualatin Families Covered
          </h2>
          <p className="text-gray-600 mb-4">
            Tualatin is one of those communities that just feels like home —
            family-friendly neighborhoods, good schools, and neighbors who
            actually wave at each other. French Roofing is based in Damascus,
            about 30 minutes east on a good traffic day, and we&apos;ve been
            taking care of roofs across the Portland metro since 2014.
          </p>
          <p className="text-gray-600">
            When you work with us, you&apos;re getting a small, family-owned
            crew that genuinely cares about doing the job right. Sean French
            started this company with one guiding rule: build every roof like
            you&apos;re building it for your own grandma. In Tualatin, where so
            many homes are family homes, that philosophy fits right in. We show
            up on time, communicate honestly, and leave your property cleaner
            than we found it.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Tualatin, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/tualatin-or`}
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
            Roofing Challenges in Tualatin, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Tualatin experienced a major building boom in the 1990s and 2000s,
            which means a large portion of homes in the area are now 20 to 30
            years old. That&apos;s right in the sweet spot where standard
            architectural shingles start reaching the end of their warranty
            period. If your Tualatin home was built during that era and still has
            its original roof, it&apos;s worth getting a professional
            inspection. You might have several good years left, or you might be
            closer to replacement than you think — either way, it&apos;s better
            to know now.
          </p>
          <p className="text-gray-600">
            Tualatin&apos;s relatively flat terrain and proximity to the
            Tualatin River create conditions that keep roofs damp longer than
            you&apos;d expect. Oregon&apos;s famous drizzle doesn&apos;t always
            come as dramatic storms — it&apos;s the months of slow, steady
            moisture that really wear on roofing materials. Moss tends to creep
            in on shaded sections, and even homes with good sun exposure deal
            with algae streaking over time. The good news is that Tualatin&apos;s
            family-oriented subdivisions tend to have accessible, moderately
            pitched roofs that are straightforward to maintain. Regular cleaning
            and a quick annual inspection are the easiest ways to protect your
            investment and keep your home looking sharp in the neighborhood.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Tualatin Roofing FAQs" faqs={faqs} />

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
