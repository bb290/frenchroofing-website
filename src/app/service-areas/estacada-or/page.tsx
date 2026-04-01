import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Estacada, OR | ${COMPANY.name}`,
  description:
    "French Roofing LLC serves Estacada, OR with expert roof replacement, repair, cleaning, and inspections. Family-owned, CertainTeed Certified, and about 20 minutes from our Damascus home base. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/estacada-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Estacada, OR?",
    answer:
      "Roof replacement costs in Estacada typically range from $8,000 to $24,000+ depending on roof size, pitch, materials, and complexity. Many Estacada homes are older with simpler rooflines, which can help keep costs manageable. French Roofing provides free, no-obligation assessments so you get an accurate estimate — not a ballpark guess. We also offer financing through Enhancify with 0% interest options.",
  },
  {
    question: "Who is the best roofing contractor in Estacada, OR?",
    answer:
      "French Roofing LLC serves Estacada from our home base in Damascus, OR — about 20 minutes up the road on Highway 224. We've been in business since 2014, we're licensed (CCB #203933), insured, and CertainTeed Certified. We're close by and we know the conditions that Estacada roofs deal with.",
  },
  {
    question: "Why do Estacada roofs get so much moss?",
    answer:
      "Estacada is surrounded by forest, gets heavy rainfall, and stays damp for long stretches of the year — that's a perfect recipe for moss and algae growth. Moss holds moisture against your shingles and can work its way under them over time, causing real damage. Regular roof cleaning and maintenance keeps it under control and extends the life of your roof significantly.",
  },
  {
    question: "Does French Roofing offer free roof inspections in Estacada?",
    answer:
      "Yes! We offer free roof assessments for Estacada homeowners. Our team will inspect your roof, give you an honest evaluation, and recommend the best course of action — whether that's a repair, maintenance, or a full replacement. No pressure, no gimmicks.",
  },
  {
    question: "How often should I have my roof inspected in Estacada?",
    answer:
      "Given Estacada's heavy rain, dense tree cover, and moss-friendly climate, we recommend a professional roof inspection at least once a year — ideally in late spring after winter storms have passed. Catching small issues early, like cracked flashing or moss buildup, prevents expensive problems down the road. We offer free assessments, so there's no reason to put it off.",
  },
];

export default function EstacadaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Estacada, OR", href: "/service-areas/estacada-or" },
        ]}
      />

      {/* -- Hero -- */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Serving Estacada
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Estacada, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing is proud to serve Estacada from our Damascus home
            base — just about 20 minutes up the road. Honest roofing services
            for a tight-knit community that deserves the best.
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
            Small Town Roots, Big-Time Craftsmanship
          </h2>
          <p className="text-gray-600 mb-4">
            Estacada is the kind of community where people look out for each
            other — and that&apos;s exactly how French Roofing operates. Founded
            in 2014 by Sean French, we&apos;re headquartered in Damascus, just a
            quick 20-minute drive from Estacada on Highway 224. We&apos;ve been
            taking care of roofs in this area for years and understand what the
            local climate demands.
          </p>
          <p className="text-gray-600">
            When you hire French Roofing, you&apos;re getting a neighbor — not a
            faceless corporation. We show up on time, communicate honestly, and
            leave your property cleaner than we found it. That&apos;s the
            standard for every job, whether it&apos;s a quick repair or a
            complete roof replacement.
          </p>
        </div>
      </section>

      {/* -- Services -- */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Estacada, OR
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}/estacada-or`}
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
            Roofing Challenges in Estacada, Oregon
          </h2>
          <p className="text-gray-600 mb-4">
            Estacada sits at the edge of the Clackamas River valley, surrounded
            by dense forest and some of the wettest conditions in the metro
            area. All that moisture and tree cover mean moss and algae growth is
            practically a guarantee if your roof isn&apos;t maintained. We see
            plenty of Estacada roofs with thick moss buildup that&apos;s been
            quietly causing damage for years — lifting shingles, trapping water,
            and shortening the life of the roof.
          </p>
          <p className="text-gray-600">
            A lot of Estacada&apos;s housing stock is older, which means many
            homes are overdue for a replacement rather than another patch job.
            The good news? A new roof with modern materials actually handles this
            climate far better than what was available 25 or 30 years ago.
            French Roofing will give you an honest assessment of where your roof
            stands and help you make the smartest decision for your home and
            budget — including financing options through Enhancify if you need
            them.
          </p>
        </div>
      </section>

      {/* -- FAQ -- */}
      <FAQSection title="Estacada Roofing FAQs" faqs={faqs} />

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
