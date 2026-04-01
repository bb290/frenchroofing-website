import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Gresham, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC serves Gresham, OR with expert roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, just 15 minutes from our Damascus home base. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/gresham-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Gresham, OR?",
    answer:
      "Roof replacement in Gresham typically ranges from $8,000 to $25,000+ depending on your roof's size, pitch, and material choice. Many older Gresham homes have steeper pitches or multiple layers that can affect cost. French Roofing provides free, no-obligation assessments so you get an accurate number — not a guess. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Gresham, OR?",
    answer:
      "French Roofing LLC is a top-rated roofing contractor serving Gresham from our home base in Damascus — just a 15-minute drive away. We're licensed (CCB #203933), insured, CertainTeed Certified, and have been serving the East Portland metro since 2014. We treat every Gresham home like it's in our own neighborhood.",
  },
  {
    question: "Does French Roofing handle moss removal on Gresham roofs?",
    answer:
      "Absolutely. Gresham's mature tree canopy and wet climate make moss a constant issue. Our roof cleaning and maintenance service includes moss treatment, debris removal, and preventive applications to keep your roof healthy longer. Regular cleaning can add years to your roof's lifespan.",
  },
  {
    question: "How quickly can French Roofing get to a job in Gresham?",
    answer:
      "We're based in Damascus, which is just 15 minutes from most Gresham neighborhoods. For emergencies like storm damage or active leaks, we prioritize fast response. For scheduled work like replacements and inspections, we typically book within 1 to 2 weeks depending on the season.",
  },
  {
    question: "What roofing materials work best for homes in Gresham, OR?",
    answer:
      "For Gresham's Pacific Northwest climate, we most often recommend architectural asphalt shingles — they handle rain, wind, and temperature swings well and come with strong warranties. As a CertainTeed Certified contractor, we install premium shingles designed to resist moss and algae, which is a big deal in a tree-heavy area like Gresham.",
  },
];

export default function GreshamPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Gresham, OR", href: "/service-areas/gresham-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving East Multnomah County
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Gresham, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing is proud to serve Gresham homeowners with honest,
            high-quality roof replacement, repair, cleaning, and inspection
            services — just a short drive from our Damascus home base.
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
            Your Neighbors Just Down the Road
          </h2>
          <p className="text-gray-600 mb-4">
            Gresham is the largest city in East Multnomah County, and it&apos;s
            one of our favorite areas to work in. From our home base in Damascus,
            we&apos;re only about 15 minutes away — which means fast response
            times and no long-distance runaround. When you call French Roofing
            for a job in Gresham, you&apos;re getting a local crew that knows the
            area.
          </p>
          <p className="text-gray-600">
            Whether your home is near Powell Butte, along the Mt. Hood corridor,
            or tucked into one of Gresham&apos;s established neighborhoods,
            we&apos;ve got the experience to handle whatever your roof throws at
            us. Sean French founded this company in 2014 on a simple idea: treat
            every roof like it&apos;s your grandma&apos;s. That goes for Gresham
            just as much as our own backyard.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Gresham, OR
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
            Roofing Challenges in Gresham, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Gresham has a wonderful mix of older established homes and newer
            developments, and each comes with its own roofing story. Older
            neighborhoods — especially those built in the 1960s through 1980s —
            often have original or second-generation roofs that are past due for
            replacement. Newer subdivisions may still be on their first roof, but
            Oregon weather doesn&apos;t play favorites. Rain, wind, and debris
            take their toll regardless of age.
          </p>
          <p className="text-gray-600">
            One thing Gresham homeowners deal with more than most is tree cover.
            The mature Douglas firs, big-leaf maples, and oaks that make the
            area so beautiful also drop needles, leaves, and branches onto
            rooftops year-round. That debris traps moisture against your
            shingles, creating the perfect conditions for moss and algae to take
            hold. Combine that with Gresham&apos;s proximity to the Mt. Hood
            corridor — which funnels extra moisture and wind into the area — and
            you&apos;ve got roofs that need consistent attention. Regular
            cleaning and inspections are the simplest way to stay ahead of
            problems before they turn into expensive repairs.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Gresham Roofing FAQs" faqs={faqs} />

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
