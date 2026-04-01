import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Milwaukie, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC serves Milwaukie, OR with roof replacement, repair, cleaning, and inspections. CertainTeed Certified, family-owned, about 20 minutes from our Damascus home base. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/milwaukie-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Milwaukie, OR?",
    answer:
      "Roof replacement in Milwaukie typically ranges from $8,000 to $25,000+ depending on roof size, pitch, layers, and materials. Many Milwaukie homes are mid-century builds with moderate pitches that keep costs reasonable. French Roofing offers free assessments so you know exactly what you're looking at — no surprises. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Milwaukie, OR?",
    answer:
      "French Roofing LLC has been serving Milwaukie and the surrounding Clackamas County area since 2014. We're based in Damascus — about 20 minutes from most Milwaukie neighborhoods. Licensed (CCB #203933), insured, and CertainTeed Certified, we bring the same quality and care to Milwaukie that we bring to our own neighborhood.",
  },
  {
    question: "Is river proximity a concern for Milwaukie roofs?",
    answer:
      "It can be. Homes near the Willamette and Kellogg Creek tend to experience higher humidity levels, which can accelerate moss and algae growth on roofing materials. The extra moisture in the air means shingles may not dry out as quickly after rain. Regular roof cleaning and inspections help catch moisture-related issues early before they become costly repairs.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Milwaukie?",
    answer:
      "Yes! We provide free roof assessments for Milwaukie homeowners. Many homes in Milwaukie were built in the 1950s through 1970s and may be on aging roofs that could use a professional look. We'll give you an honest evaluation and straightforward recommendations — no pressure, no sales pitch.",
  },
  {
    question: "How long does a roof replacement take in Milwaukie?",
    answer:
      "Most Milwaukie roof replacements are completed in 1 to 3 days. Mid-century ranch-style homes — which are common in the area — tend to be straightforward projects. Weather can shift the timeline (this is Oregon, after all), but we keep you in the loop every step of the way.",
  },
];

export default function MilwaukiePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Milwaukie, OR", href: "/service-areas/milwaukie-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Milwaukie &amp; Inner SE Portland Metro
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Milwaukie, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing serves Milwaukie homeowners with dependable roof
            replacement, repair, cleaning, and inspections. Local crew, honest
            communication, quality materials — just 20 minutes from our Damascus
            home base.
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
            Good Roofs for a Great Little City
          </h2>
          <p className="text-gray-600 mb-4">
            Milwaukie has that perfect inner-suburb feel — close enough to
            Portland to enjoy everything the city offers, but with its own
            character and community. French Roofing is based in Damascus, about
            20 minutes east, and we&apos;ve been serving Milwaukie homeowners
            since 2014. When you call us, you&apos;re getting a local team that
            actually picks up the phone.
          </p>
          <p className="text-gray-600">
            Whether you&apos;re in a charming mid-century ranch near downtown, a
            newer build out toward the edges, or somewhere along the Trolley
            Trail, we treat every roof in Milwaukie the way we&apos;d treat our
            own. Sean French started this company on one principle: do the work
            like you&apos;re doing it for your own grandma. That means honest
            assessments, quality materials, and no cutting corners.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Milwaukie, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/milwaukie-or`}
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
            Roofing Challenges in Milwaukie, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Milwaukie&apos;s housing stock tells a story. A lot of homes here
            were built during the post-war boom of the 1940s through 1960s —
            solid mid-century construction with low-to-moderate roof pitches and
            composition shingles. Many of those original roofs have been replaced
            once or twice already, and if yours is pushing 20 to 25 years, it
            might be time for another look. We also see plenty of newer
            construction mixed in, especially toward the south end of town, and
            even newer roofs benefit from regular inspections in this climate.
          </p>
          <p className="text-gray-600">
            Being close to the Willamette River and Kellogg Creek means Milwaukie
            tends to sit in a bit of a moisture pocket. Fog, dew, and rain keep
            things damp for much of the year, and that&apos;s exactly what moss
            and algae love. Add in the mature trees that line so many Milwaukie
            streets, and you&apos;ve got leaves, needles, and branches
            constantly settling onto rooftops. That organic debris holds moisture
            against your shingles and speeds up wear. A regular cleaning
            schedule — even once a year — can make a real difference in how long
            your roof lasts and how good it looks while it&apos;s doing its job.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Milwaukie Roofing FAQs" faqs={faqs} />

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
