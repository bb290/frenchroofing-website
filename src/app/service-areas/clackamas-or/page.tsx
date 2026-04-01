import Link from "next/link";
import { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import FAQSection from "@/components/FAQSection";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Contractor in Clackamas, OR | ${COMPANY.name}`,
  description:
    "Looking for a reliable roofing contractor in Clackamas, OR? French Roofing LLC offers roof replacement, repair, cleaning, and inspections. Based in nearby Damascus — just minutes away. Call 971-376-8722.",
  alternates: { canonical: `${COMPANY.url}/service-areas/clackamas-or` },
};

const faqs = [
  {
    question: "How much does roof replacement cost in Clackamas, OR?",
    answer:
      "Roof replacement in Clackamas typically costs between $8,000 and $25,000+ depending on your roof's size, pitch, and material choice. French Roofing offers free assessments so you get a real number — not a rough guess. We also have financing through Enhancify with 0% interest options to make it easier on your budget.",
  },
  {
    question: "What roofing company serves Clackamas, OR?",
    answer:
      "French Roofing LLC is based in Damascus, OR — just minutes from Clackamas. We've been serving Clackamas homeowners since 2014 with professional roof replacement, repair, cleaning, and inspection services. Licensed (CCB #203933), insured, and CertainTeed Certified.",
  },
  {
    question: "How do I know if my roof in Clackamas needs to be replaced?",
    answer:
      "Common signs include shingles that are curling, cracking, or missing, granules collecting in your gutters, visible sagging, and age (most asphalt roofs last 20-30 years in Oregon). If you're noticing any of these, schedule a free assessment with us and we'll give you an honest recommendation.",
  },
  {
    question: "Does French Roofing handle storm damage repairs in Clackamas?",
    answer:
      "Absolutely. Wind, rain, and falling debris can do real damage to Clackamas roofs — especially during fall and winter storms. We respond quickly to storm damage calls, document everything for insurance purposes, and get your roof secured as fast as possible.",
  },
  {
    question: "Is French Roofing licensed to work in Clackamas, OR?",
    answer:
      "Yes. French Roofing LLC is fully licensed (CCB #203933), insured, and bonded in the state of Oregon. We're also CertainTeed Certified, meaning our installations meet the highest manufacturer quality standards. Clackamas is one of our primary service areas.",
  },
];

export default function ClackamasPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Service Areas", href: "/service-areas" },
          { name: "Clackamas, OR", href: "/service-areas/clackamas-or" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Just Minutes from Our Home Base
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Roofing Contractor in{" "}
            <span className="text-[#ffbd59]">Clackamas, OR</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            French Roofing proudly serves Clackamas with dependable roof
            replacement, repair, cleaning, and inspection services. We&apos;re
            based in Damascus — right next door — so getting to your home is
            never a problem.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
            >
              Schedule FREE Assessment
            </Link>
            <a
              href={COMPANY.phoneTel}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            Clackamas Roofing Done Right
          </h2>
          <p className="text-gray-600 mb-4">
            Clackamas is one of our closest service areas — we&apos;re based in
            Damascus, just a short drive away. That means when you call French
            Roofing for a roof repair in Clackamas, we can be there quickly and
            get to work without delay. We&apos;ve been taking care of roofs in
            this area since 2014, and plenty of your neighbors already trust us
            with theirs.
          </p>
          <p className="text-gray-600">
            Whether you live near Clackamas Town Center or out toward the quieter
            residential streets, our team delivers the same quality workmanship
            and straight-up honest communication on every job. No surprises, no
            runaround — just a solid roof over your head.
          </p>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] text-center mb-10">
            Roofing Services in Clackamas, OR
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

      {/* ── City-Specific Content ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-6">
            What Clackamas Roofs Deal With
          </h2>
          <p className="text-gray-600 mb-4">
            Clackamas homes face the same Pacific Northwest weather challenges as
            the rest of the Portland metro — heavy rain from fall through spring,
            occasional ice, and enough moisture to keep moss happy year-round.
            Many homes in the area were built in the 1980s through 2000s, which
            means a lot of roofs are approaching or past their expected lifespan.
            If your shingles are 20+ years old, it&apos;s worth getting a
            professional inspection before problems start showing up inside.
          </p>
          <p className="text-gray-600">
            Common roof types in Clackamas include three-tab and architectural
            asphalt shingles, with some newer builds featuring composite or metal
            roofing. Regardless of material, regular roof cleaning and maintenance
            makes a big difference out here. Removing moss, clearing debris from
            valleys, and keeping gutters flowing are the best ways to extend the
            life of any Clackamas roof.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Clackamas Roofing FAQs"
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
