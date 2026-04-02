import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
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
      "Every French Roofing installation comes with a standard workmanship warranty. The specific duration is outlined in your project contract. This covers any installation-related issues \u2014 if we made an error, we come back and fix it at no cost to you.",
  },
  {
    question: "What does the CertainTeed manufacturer warranty cover?",
    answer:
      "CertainTeed\u2019s manufacturer warranty covers defects in the roofing materials themselves. Because French Roofing is CertainTeed Certified, your installation may qualify for enhanced coverage that\u2019s longer and more comprehensive than the standard manufacturer warranty, potentially including labor costs for material defects.",
  },
  {
    question: "Will my warranty be voided if I don\u2019t maintain my roof?",
    answer:
      "Both manufacturer and workmanship warranties typically require that you maintain your roof in reasonable condition. That means keeping gutters clean, addressing moss, and not making unauthorized modifications. Normal wear and tear won\u2019t void your warranty, but neglect can. When in doubt, reach out and we\u2019ll help you understand what\u2019s needed.",
  },
  {
    question: "Does my warranty transfer if I sell my home?",
    answer:
      "CertainTeed manufacturer warranties are generally transferable to a new homeowner, though coverage may be adjusted. Our workmanship warranty terms regarding transfer are outlined in your contract. If you\u2019re buying or selling a home with a French Roofing roof, contact us and we\u2019ll help sort out the details.",
  },
  {
    question: "What should I do if I notice a problem with my roof?",
    answer:
      "Contact us through our website. Don\u2019t wait, don\u2019t try to fix it yourself, and don\u2019t hire someone else to patch it (that can actually void your warranty). We\u2019ll send someone out to inspect, determine whether it\u2019s a warranty issue, and take care of it from there.",
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
            Your Roof, Protected &mdash;{" "}
            <span className="text-[#ffbd59]">Warranty Details</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            A new roof is a big investment, and you deserve to know exactly
            what&apos;s covered. Here&apos;s a straightforward look at the
            warranties that come with every French Roofing installation.
          </p>
        </div>
      </section>

      {/* ── Two Types of Warranty ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-4 text-center">
            Two Types of Warranty, Two Layers of Protection
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            When French Roofing installs your roof, you&apos;re covered by two
            separate warranties. Here&apos;s what each one does and why both
            matter.
          </p>
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
              <p className="text-gray-600 leading-relaxed mb-4">
                This warranty covers defects in the roofing materials
                themselves. If a shingle fails prematurely because of a
                manufacturing issue, CertainTeed stands behind it.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Because French Roofing is{" "}
                <strong className="text-[#092e5e]">CertainTeed Certified</strong>,
                your installation may qualify for{" "}
                <strong className="text-[#092e5e]">enhanced manufacturer warranties</strong>{" "}
                &mdash; longer coverage periods and protection that can include
                labor costs for material defects. This is a real, tangible
                benefit of hiring a certified contractor.
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
              <p className="text-gray-600 leading-relaxed mb-4">
                This is our promise that the work was done right. The
                workmanship warranty covers installation errors &mdash; if
                something goes wrong because of how the roof was installed, we
                come back and fix it at no cost to you.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Every French Roofing job includes a standard workmanship
                warranty. We stand behind our crew&apos;s work because we train
                them, we supervise them, and we hold ourselves to a high
                standard. Specific warranty terms are detailed in your project
                contract.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Covered vs What's Not ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-[#092e5e] mb-4 text-center">
            What&apos;s Covered &mdash; and What&apos;s Not
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We believe in being upfront. Here&apos;s an honest look at what
            falls under warranty coverage and what doesn&apos;t.
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
                Typically Covered
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
                Not Typically Covered
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
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection title="Warranty FAQs" faqs={warrantyFAQs} />

      {/* ── CTA ── */}
      <CTABanner
        headline="Questions About Your Warranty?"
        description="Schedule a free assessment. We\u2019re happy to walk you through your coverage and answer any questions."
      />
    </>
  );
}
