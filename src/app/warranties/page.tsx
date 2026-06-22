import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import RelatedGuides from "@/components/RelatedGuides";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Warranty Details | ${COMPANY.name}`,
  description:
    "Understand what your roof warranty covers and what it doesn\u2019t. French Roofing offers both manufacturer and workmanship warranties on every job. Damascus, OR.",
  alternates: { canonical: `${COMPANY.url}/warranties` },
};

const maintenanceTips = [
  {
    title: "Keep Your Gutters Clean",
    description:
      "Clogged gutters cause water to back up under your roofline, which can damage your decking and void warranty coverage. Clean them at least twice a year \u2014 once in spring and once after the leaves drop in fall.",
  },
  {
    title: "Trim Overhanging Branches",
    description:
      "Branches that hang over your roof drop debris, hold moisture, and can scrape shingles during wind storms. Keep trees trimmed back at least 6 feet from your roofline.",
  },
  {
    title: "Address Moss Promptly",
    description:
      "Moss is a fact of life in Oregon, but letting it grow unchecked can lift shingles and trap moisture underneath. If you notice moss starting to build up, schedule a roof cleaning before it becomes a bigger problem.",
  },
  {
    title: "Schedule Periodic Inspections",
    description:
      "A professional roof inspection every few years catches small issues before they become expensive repairs. It also documents the condition of your roof, which is helpful if you ever need to file a warranty claim.",
  },
  {
    title: "Don\u2019t Walk on Your Roof",
    description:
      "It\u2019s tempting to climb up and check things out yourself, but walking on your roof can crack shingles and void your warranty. Leave inspections to the professionals \u2014 that\u2019s what we\u2019re here for.",
  },
];

const warrantyFAQs = [
  {
    question: "How long is French Roofing\u2019s workmanship warranty?",
    answer:
      "Every French Roofing installation comes with a workmanship warranty at no extra cost: 5 years on our 30-year shingle systems and 10 years on our 50-year shingle systems. It covers any installation-related issue \u2014 if we made an error, we come back and fix it at no cost to you. Your exact term is written into your project contract.",
  },
  {
    question: "What does the CertainTeed manufacturer warranty cover?",
    answer:
      "CertainTeed\u2019s manufacturer warranty covers defects in the roofing materials themselves. Most of our roofs use CertainTeed Landmark shingles, which carry a 30-year manufacturer warranty against material defects; 50-year shingle systems run longer. Because French Roofing is CertainTeed Certified, you can also register for extended CertainTeed coverage that lengthens the term and can include labor costs for material defects.",
  },
  {
    question: "Will my warranty be voided if I don\u2019t maintain my roof?",
    answer:
      "Yes. Both manufacturer and workmanship warranties require that you maintain your roof in reasonable condition. That means keeping gutters clean, addressing moss, and not making unauthorized modifications. Check out the French Roofing Maintenance Program to ensure peace of mind.",
  },
  {
    question: "Does my warranty transfer if I sell my home?",
    answer:
      "Yes - let us know if there is a change of ownership, and we\u2019ll update both the workmanship and manufacturer warranty on your behalf. And be sure to transfer your maintenance records to the new owner!",
  },
  {
    question: "What should I do if I notice a problem with my roof?",
    answer:
      "Schedule a roof assessment ASAP via our website. Don\u2019t wait, don\u2019t try to fix it yourself, and don\u2019t hire someone else to patch it (that can actually void your warranty). We\u2019ll send someone out to inspect, determine whether it\u2019s a warranty issue, and make a recommendation from there.",
  },
];

export default function WarrantiesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Warranty Details", href: "/warranties" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            <span className="text-[#ffbd59]">Warranty Details</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Here&apos;s how we got you covered.
          </p>
        </div>
      </section>

      {/* ── Standard Coverage at a Glance ── */}
      <section className="bg-white py-12 px-4 border-b border-gray-100">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-[#d85024]">
            Standard Coverage
          </p>
          <p className="mt-2 text-center text-gray-600">
            Included on every French Roofing roof replacement installation.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-5xl font-bold text-[#092e5e]">5 Years</p>
              <p className="mt-2 text-lg font-semibold text-[#3e3d3b]">
                Workmanship Warranty
              </p>
              <p className="mt-1 text-sm text-gray-600">
                Standard on every roof.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-5xl font-bold text-[#092e5e]">30 Years</p>
              <p className="mt-2 text-lg font-semibold text-[#3e3d3b]">
                Manufacturer Warranty
              </p>
              <p className="mt-1 text-sm text-gray-600">
                On CertainTeed Landmark shingles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Two Types of Warranty ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-12 text-center">
            2 Layers of Protection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manufacturer Warranty */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8">
              <div className="h-14 w-14 rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
                <svg
                  className="h-7 w-7 text-[#d85024]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Manufacturer Warranty
              </h3>
              <p className="text-sm font-medium text-[#d85024] mb-3">
                From CertainTeed
              </p>
              <div className="mb-4 rounded-lg bg-[#ffbd59]/15 px-4 py-3">
                <p className="text-3xl font-bold text-[#092e5e] leading-none">
                  30 years
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Standard manufacturer warranty on CertainTeed Landmark
                  shingles, the shingle we install on most homes.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                This warranty covers defects in the roofing materials
                themselves. If a shingle fails prematurely because of a
                manufacturing defect, CertainTeed stands behind it. Most of our
                roofs are built with CertainTeed Landmark shingles, which carry
                a 30-year manufacturer warranty. Step up to a 50-year shingle
                system and the manufacturer coverage runs longer.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Because French Roofing is{" "}
                <strong className="text-[#092e5e]">CertainTeed Certified</strong>,
                you can also register for{" "}
                <strong className="text-[#092e5e]">extended CertainTeed coverage</strong>{" "}
                that lengthens the term and can add labor for material defects.
              </p>
            </div>

            {/* Workmanship Warranty */}
            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-8">
              <div className="h-14 w-14 rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
                <svg
                  className="h-7 w-7 text-[#d85024]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17l-5.384-3.19A2.625 2.625 0 013 9.679V5.5A2.5 2.5 0 015.5 3h13A2.5 2.5 0 0121 5.5v4.179a2.625 2.625 0 01-3.036 2.301L12.58 15.17a1.125 1.125 0 01-1.16 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Workmanship Warranty
              </h3>
              <p className="text-sm font-medium text-[#d85024] mb-3">
                From French Roofing
              </p>
              <div className="mb-4 rounded-lg bg-[#ffbd59]/15 px-4 py-3">
                <p className="text-3xl font-bold text-[#092e5e] leading-none">
                  5&ndash;10 years
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Included on every roof at no extra cost: 5 years on 30-year
                  shingle systems, 10 years on 50-year shingle systems.
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">
                This is our promise that the work was done right. If something
                goes wrong because of how the roof was installed, we come back
                and fix it at no cost to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Covered vs What's Not ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-4 text-center">
            What&apos;s Covered
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            The Fine Print.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Covered */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#092e5e] mb-4 flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-green-600 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Covered
              </h3>
              <ul className="space-y-3">
                {[
                  "Material defects \u2014 shingles that crack, curl, or fail prematurely due to manufacturing issues",
                  "Installation errors \u2014 leaks or problems caused by faulty workmanship",
                  "Premature wear from improper installation techniques",
                  "Enhanced coverage (with CertainTeed Certified installation) that may include labor for material defects",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Covered */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-[#092e5e] mb-4 flex items-center gap-2">
                <svg
                  className="h-6 w-6 text-[#d85024] flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
                Not Covered
              </h3>
              <ul className="space-y-3">
                {[
                  "Storm damage or acts of God \u2014 hail, fallen trees, extreme wind events (this is what your homeowner\u2019s insurance is for)",
                  "Damage from lack of maintenance \u2014 clogged gutters, unchecked moss growth, debris buildup",
                  "Unauthorized modifications \u2014 if someone other than French Roofing modifies or repairs the roof",
                  "Normal wear and tear beyond the warranty period",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 text-[#d85024] flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Maintenance Tips ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-4 text-center">
            Maintenance Tips to Protect Your Warranty
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            A little upkeep goes a long way. These simple habits help your roof
            last longer and keep your warranty intact.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {maintenanceTips.map((tip) => (
              <div
                key={tip.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <h3 className="text-lg font-bold text-[#092e5e] mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          {/* Maintenance program CTA */}
          <div className="mt-12 rounded-2xl bg-[#092e5e] px-6 py-10 sm:px-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#ffbd59]">
              Recurring Maintenance Program
            </p>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
              Rather Not Climb Up There Yourself?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-gray-300 leading-relaxed">
              Let us handle the upkeep that keeps your warranty intact. Our
              recurring maintenance program has you covered twice a year -
              debris and gutter clearing, moss prevention, and a full
              inspection - so the small stuff gets caught before it ever turns
              into a claim. One simple annual price, no contracts with hidden
              fees.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/services/maintenance"
                className="rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                See the Maintenance Program
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection title="Warranty FAQs" faqs={warrantyFAQs} />

      {/* ── Related guides ── */}
      <RelatedGuides slugs={["roofing-warranties-explained", "shingle-product-lines", "roofing-101"]} />

      {/* ── How to File a Claim ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-4 text-center">
            How to File a Warranty Claim
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            If something doesn&apos;t look right, don&apos;t stress. Here&apos;s
            how the process works.
          </p>
          <div className="space-y-8">
            {[
              {
                number: "1",
                title: "Contact Us",
                description: `Reach out through our website and let us know what you\u2019re seeing. A photo helps if you have one, but it\u2019s not required. We\u2019ll ask a few questions to understand the situation.`,
              },
              {
                number: "2",
                title: "We Inspect",
                description:
                  "We\u2019ll schedule a time to come out and look at your roof. Our team will assess the issue, take photos, and determine whether it falls under your manufacturer warranty, workmanship warranty, or something else entirely.",
              },
              {
                number: "3",
                title: "We Fix It",
                description:
                  "If it\u2019s a warranty issue, we take care of it. No runaround, no finger-pointing. If it turns out to be something outside warranty coverage (like storm damage), we\u2019ll explain your options honestly and help you figure out the best next step.",
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-6 items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#d85024] text-white flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#092e5e] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner
        headline="Questions About Your Warranty?"
        description="Schedule a free assessment. We\u2019re happy to walk you through your coverage and answer any questions."
      />
    </>
  );
}
