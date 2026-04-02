import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Happy Valley, OR | ${COMPANY.name}`,
  description:
    "Need a roofing contractor in Happy Valley, OR? French Roofing LLC provides roof replacement, repair, cleaning, and inspections. Based in nearby Damascus — your local, CertainTeed Certified roofing team. Book online today.",
  alternates: { canonical: `${COMPANY.url}/service-areas/happy-valley-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Happy Valley, OR?",
    answer:
      "Roof replacement in Happy Valley generally ranges from $8,000 to $25,000+ depending on the size, pitch, and materials for your roof. Many Happy Valley homes are larger or multi-level, which can affect pricing. French Roofing provides free assessments so you get an accurate quote. Financing is available through Enhancify with 0% interest options.",
  },
  {
    question: "What roofing company serves Happy Valley, OR?",
    answer:
      "French Roofing LLC is based in Damascus, OR — right next to Happy Valley. We've been serving Happy Valley homeowners since 2014 with roof replacement, repair, cleaning, and inspection services. We're licensed (CCB #203933), insured, and CertainTeed Certified.",
  },
  {
    question: "How often should I have my roof inspected in Happy Valley?",
    answer:
      "We recommend a professional roof inspection at least once a year, ideally in late spring after winter storms have passed. Happy Valley gets plenty of rain and wind, so catching small issues early — like cracked flashing or moss buildup — saves you from expensive surprises down the line.",
  },
  {
    question: "Does French Roofing offer roof cleaning in Happy Valley?",
    answer:
      "Yes! Roof cleaning is especially important in Happy Valley, where tree cover and moisture promote moss and algae growth. Regular cleaning extends the life of your shingles and keeps your home looking great. We offer one-time cleanings as well as maintenance plans.",
  },
  {
    question: "Can French Roofing help with insurance claims in Happy Valley?",
    answer:
      "We sure can. If your Happy Valley home has storm damage, we'll do a thorough inspection, document everything with photos, and provide the detailed information your insurance company needs. We've helped plenty of homeowners navigate the claims process — we'll walk you through it step by step.",
  },
];

export default function HappyValleyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          {
            name: "Happy Valley, OR",
            href: "/service-areas/happy-valley-or",
          },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Your Neighborhood Roofer
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Happy Valley, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing serves Happy Valley homeowners with reliable roof
            replacement, repair, cleaning, and inspections. We&apos;re based in
            Damascus — literally right next door — so we know this area inside
            and out.
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

      {/* ── Intro ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Happy Valley&apos;s Go-To Roofing Team
          </h2>
          <p className="text-gray-600 mb-4">
            Happy Valley is one of the fastest-growing communities in the Portland
            metro, and French Roofing has been keeping roofs over its
            residents&apos; heads since 2014. Our home base in Damascus is just
            down the road, which means we&apos;re never far when you need a
            roofing contractor in Happy Valley. Quick response, familiar faces,
            and work you can count on.
          </p>
          <p className="text-gray-600">
            From the newer developments near Pleasant Valley to the established
            neighborhoods closer to Sunnyside Road, we&apos;ve worked on roofs
            across Happy Valley. Every job gets the same treatment: honest
            communication, quality materials, and a crew that cleans up like your
            grandma is watching.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Happy Valley, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/happy-valley-or`}
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

      {/* ── City-Specific Content ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Roof Care in Happy Valley&apos;s Climate
          </h2>
          <p className="text-gray-600 mb-4">
            Happy Valley&apos;s rolling hills and tree-lined streets are
            beautiful — but they also create some unique challenges for roofs.
            Overhanging trees drop needles, leaves, and branches that accumulate
            in valleys and gutters, trapping moisture against your shingles. Add
            in Oregon&apos;s 40+ inches of annual rainfall, and you&apos;ve got
            the perfect conditions for moss growth, algae staining, and premature
            shingle wear.
          </p>
          <p className="text-gray-600">
            Many Happy Valley homes are relatively newer construction with
            architectural asphalt shingles — a great choice for the area, but one
            that still requires attention. Wind storms can lift shingle edges,
            and heavy rain finds every weak spot in aging flashing. Regular roof
            maintenance and timely repairs keep small issues from becoming big
            headaches. And when it is time for a full roof replacement in Happy
            Valley, French Roofing uses premium CertainTeed materials designed to
            handle everything the Pacific Northwest throws at them.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Happy Valley Roofing FAQs"
        faqs={faqs}
      />

      {/* ── NAP ── */}
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

      {/* ── CTA ── */}
      <CTABanner dark />
    </>
  );
}
