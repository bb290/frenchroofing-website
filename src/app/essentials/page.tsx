import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import RelatedGuides from "@/components/RelatedGuides";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";
import { BONUS_TIP, ESSENTIAL_QUESTIONS } from "@/lib/essentials";

export const metadata: Metadata = {
  title: `10 Essential Questions to Ask Your Roofing Contractor | ${COMPANY.name}`,
  description:
    "Know exactly what to ask before hiring a roofer. Sean French walks you through the 10 questions that separate the pros from the pretenders. Watch the videos or read the guide.",
  alternates: { canonical: `${COMPANY.url}/essentials` },
};

const questions = ESSENTIAL_QUESTIONS;
const bonusTip = BONUS_TIP;

const essentialsFAQs = [
  {
    question: "Why should I ask these questions before hiring a roofer?",
    answer:
      "Roofing is one of the biggest investments you'll make in your home, and not all contractors operate at the same standard. Asking the right questions upfront helps you avoid unlicensed operators, hidden costs, and poor workmanship. It only takes a few minutes and can save you thousands of dollars and a lot of headaches.",
  },
  {
    question: "How do I verify a contractor's license in Oregon?",
    answer:
      "Visit the Oregon Construction Contractors Board (CCB) website at oregon.gov/ccb and search by business name or CCB number. You'll see their license status, bond information, insurance status, and any complaints filed against them. It's free and takes about two minutes.",
  },
  {
    question:
      "What's the difference between a manufacturer warranty and a workmanship warranty?",
    answer:
      "A manufacturer warranty covers defects in the roofing materials themselves - for example, shingles that fail prematurely due to a manufacturing issue. A workmanship warranty covers the installation - if the contractor made an error that causes a leak or other problem, they'll come back and fix it at no cost to you. You want both.",
  },
  {
    question:
      "How many estimates should I get before choosing a roofing contractor?",
    answer:
      "Getting two to three written estimates is a good practice. It helps you compare scope, materials, and pricing. But don't just go with the cheapest number - compare what's included, what warranties are offered, and whether the contractor is licensed and certified. The lowest bid often leaves out important details.",
  },
];

export default function EssentialsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "10 Essential Questions", href: "/essentials" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            10 Essential Questions{" "}
            <span className="text-[#ffbd59]">
              to Ask Every Roofing Contractor
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Sean French walks you through the questions that separate the pros
            from the pretenders - and the answers you should expect from anyone
            earning your trust.
          </p>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section className="py-16 px-4 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
              Watch Sean Explain
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e]">
              Hear It Straight from the Roofer
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/xHCrXWKo6M4"
                  title="5 Essential Questions to Ask Your Roofing Contractor"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                Questions 1–5 - quick version (2 min)
              </p>
            </div>
            <div>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/5ooKdYTpBSM"
                  title="5 MORE Questions to Ask Your Roofing Contractor"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">
                Questions 6–10 - quick version (2 min)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            Choosing the right roofing contractor is crucial for the success of
            your project. We put this guide together because we believe informed
            homeowners make better decisions. Whether you hire French Roofing or
            someone else, these questions will help you hire with confidence.
          </p>
        </div>
      </section>

      {/* ── Questions ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl space-y-8">
          {questions.map((q) => (
            <div
              key={q.number}
              className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#d85024] text-white flex items-center justify-center text-xl font-bold">
                  {q.number}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#092e5e] mb-3">
                    &ldquo;{q.question}&rdquo;
                  </h2>
                  <p className="text-gray-600 leading-relaxed">{q.answer}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Bonus tip */}
          <div className="bg-[#ffbd59]/10 border-2 border-[#ffbd59]/30 rounded-xl p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#ffbd59] text-[#092e5e] flex items-center justify-center text-lg font-bold">
                +
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#092e5e] mb-1">
                  Bonus: &ldquo;{bonusTip.question}&rdquo;
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {bonusTip.answer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Closing note ── */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e] mb-4">
            The Right Contractor Won&apos;t Mind These Questions
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            In fact, they&apos;ll welcome them. A contractor who gets
            uncomfortable when you ask about licensing, insurance, or warranties
            is telling you something. Clear communication and transparency are
            key to a successful roofing experience - the ones who answer openly
            are the ones worth hiring.
          </p>
          <a
            href={COMPANY.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
          >
            Schedule a Free Roof Assessment
          </a>
        </div>
      </section>

      {/* ── Full Podcast ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
              Full Podcast
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e]">
              All 10 Questions - In Depth
            </h2>
            <p className="mt-2 text-gray-600">
              If you made it this far without reading and just scrolled straight
              to the video - no judgment. This AI-generated podcast covers all
              10 questions in a conversational format that&apos;s easy to absorb.
              Fair warning: the hosts aren&apos;t real, but the roofing advice
              definitely is. Throw it on while you&apos;re driving, doing
              dishes, or pretending to work (19 min).
            </p>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/rOXXRPQUJog"
              title="10 Essential Questions to Ask Your Roofing Contractor - Full Podcast"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Common Questions About Hiring a Roofer"
        faqs={essentialsFAQs}
      />

      {/* ── Related guides ── */}
      <RelatedGuides slugs={["roof-replacement-guide", "roofing-101", "roof-systems-roundup"]} />

      {/* ── CTA ── */}
      <CTABanner
        headline="Ready to Talk to a Contractor Who Welcomes Your Questions?"
        description="Schedule a free roof assessment with French Roofing. We'll answer every question on this list - and any others you've got."
      />
    </>
  );
}
