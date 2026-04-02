import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Financing Options | ${COMPANY.name}`,
  description:
    "French Roofing partners with Enhancify to offer flexible roof financing with 0% interest options, multiple plans, and no-impact credit checks. Damascus, OR.",
  alternates: { canonical: `${COMPANY.url}/financing` },
};

const steps = [
  {
    number: "1",
    title: "Apply in Minutes",
    description:
      "Fill out a quick application at enhancify.com/french-roofing. It takes just a few minutes and can be done from your phone.",
  },
  {
    number: "2",
    title: "Get Approved",
    description:
      "See your options fast. Pre-qualification uses a soft credit pull, so checking your rate won't affect your credit score.",
  },
  {
    number: "3",
    title: "Schedule Your Work",
    description:
      "Once approved, we'll get your roof project on the calendar. You pick the plan that fits your budget, and we handle the rest.",
  },
];

const financingFAQs = [
  {
    question: "Does applying for financing affect my credit score?",
    answer:
      "No. Pre-qualification through Enhancify uses a soft credit pull, which has no impact on your credit score. A hard inquiry only happens if you choose to move forward with a specific plan.",
  },
  {
    question: "What financing plans are available?",
    answer:
      "Enhancify offers multiple plans including 0% interest options, low monthly payment plans, and extended terms. The exact offers depend on your credit profile, but most homeowners find a plan that fits their budget.",
  },
  {
    question: "How much can I finance?",
    answer:
      "Financing amounts vary based on your credit profile and the scope of your project. Most residential roof replacements fall between $8,000 and $25,000. We'll help you understand your options during your free assessment.",
  },
  {
    question: "Can I pay off my financing early?",
    answer:
      "Yes. Enhancify plans typically have no prepayment penalties, so you can pay off your balance early without extra fees. Check your specific plan terms for details.",
  },
  {
    question: "Do I need to apply before scheduling my roof assessment?",
    answer:
      "Nope! You can schedule your free roof assessment first and apply for financing after you've received your estimate. Many homeowners prefer to know the cost before exploring payment options.",
  },
  {
    question: "What if I'm not approved?",
    answer:
      "If you're not approved through Enhancify, we're happy to discuss other options. We believe every homeowner deserves a solid roof, and we'll work with you to find a path forward.",
  },
  {
    question: "How do I apply for financing?",
    answer:
      "You can apply directly through our Enhancify partner page at enhancify.com/french-roofing. The application takes just a few minutes and starts with a soft credit pull that won't affect your score. Once you see your options, pick the plan that works for you and we'll get your project scheduled.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Financing", href: "/financing" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            A New Roof <span className="text-[#ffbd59]">That Fits Your Budget</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            We&apos;ve partnered with Enhancify so you can get the roof you need
            now and pay over time - with plans that actually make sense.
          </p>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-xl bg-gray-50">
            <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#092e5e] mb-2">0% Interest Options</h3>
            <p className="text-sm text-gray-600">
              Qualified borrowers can enjoy 0% interest plans, making your new
              roof more affordable than you might think.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-50">
            <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#092e5e] mb-2">No-Impact Credit Check</h3>
            <p className="text-sm text-gray-600">
              See if you qualify without affecting your credit score. The
              pre-qualification process uses a soft pull only.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-gray-50">
            <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
              <svg className="h-7 w-7 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#092e5e] mb-2">Multiple Plans</h3>
            <p className="text-sm text-gray-600">
              Choose from a variety of repayment terms and monthly payment
              options. Pick the plan that works best for your household.
            </p>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] text-center mb-14">
            How It Works
          </h2>
          <div className="space-y-10">
            {steps.map((step) => (
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
          <div className="text-center mt-14">
            <a
              href={COMPANY.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
            >
              Get Your Free Estimate First
            </a>
            <p className="mt-3 text-sm text-gray-500">
              No commitment required - see what your roof needs before exploring
              financing.
            </p>
          </div>
        </div>
      </section>

      {/* ── Enhancify partnership note ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
            Our Financing Partner
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e] mb-4">
            Powered by Enhancify
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Enhancify specializes in home improvement financing and works with
            top lenders to offer competitive rates. French Roofing chose
            Enhancify because they make the process simple and transparent - just
            like we do with roofing.
          </p>
          <a
            href="https://www.enhancify.com/french-roofing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#ffbd59] px-8 py-4 text-lg font-semibold text-[#092e5e] hover:bg-[#f0ad40] transition-colors"
          >
            Apply for Financing
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection title="Financing FAQs" faqs={financingFAQs} />

      {/* ── CTA ── */}
      <CTABanner
        headline="Your New Roof Is More Affordable Than You Think"
        description="Schedule a free assessment to get an accurate estimate, then explore financing options that fit your budget."
      />
    </>
  );
}
