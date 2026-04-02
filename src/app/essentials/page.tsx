import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `10 Essential Questions to Ask Your Roofing Contractor | ${COMPANY.name}`,
  description:
    "Know exactly what to ask before hiring a roofer. These 10 questions help you spot red flags, verify credentials, and hire with confidence. From French Roofing LLC in Damascus, OR.",
  alternates: { canonical: `${COMPANY.url}/essentials` },
};

const questions = [
  {
    number: 1,
    question: "Are you licensed and insured?",
    answer:
      "In Oregon, every roofing contractor is required to hold an active license with the Construction Contractors Board (CCB). This isn\u2019t just a formality \u2014 it means the contractor has met bonding, insurance, and education requirements set by the state. You can verify any contractor\u2019s license at the CCB website (oregon.gov/ccb). If someone can\u2019t give you a CCB number on the spot, that\u2019s a major red flag. For reference, French Roofing\u2019s CCB number is #203933 \u2014 feel free to look us up.",
  },
  {
    number: 2,
    question: "How long have you been in business?",
    answer:
      "Experience matters, especially in the Pacific Northwest. Oregon throws everything at a roof \u2014 heavy rain, wind, moss, freeze-thaw cycles \u2014 and a contractor who\u2019s been through it all knows what works and what doesn\u2019t. Ask how long they\u2019ve been operating under their current business name, not just how long the owner has been in the trade. French Roofing has been serving the Portland metro area since 2014, and our founder Sean French started roofing at sixteen.",
  },
  {
    number: 3,
    question: "Are you manufacturer certified?",
    answer:
      "Manufacturer certifications aren\u2019t just marketing badges. When a contractor is certified by a shingle manufacturer like CertainTeed, it means they\u2019ve completed specialized training on that product line and met quality standards. More importantly for you, certification can unlock enhanced warranty coverage that uncertified contractors simply can\u2019t offer. French Roofing is CertainTeed Certified, which means our installations may qualify for longer, more comprehensive warranties.",
  },
  {
    number: 4,
    question: "Can I see proof of insurance?",
    answer:
      "A good contractor should carry both general liability insurance and workers\u2019 compensation coverage, and they should be happy to show you proof. General liability protects your property if something goes wrong during the job. Workers\u2019 comp protects you from being liable if a crew member gets injured on your property. If a contractor doesn\u2019t have workers\u2019 comp and someone gets hurt on your roof, you could be on the hook. Don\u2019t just take their word for it \u2014 ask for a certificate of insurance.",
  },
  {
    number: 5,
    question: "Do you offer a workmanship warranty?",
    answer:
      "Most people know their shingles come with a manufacturer warranty, but that only covers defective materials. What about the installation itself? A workmanship warranty covers labor and installation errors \u2014 the things the roofer controls. A contractor who stands behind their work with a written workmanship warranty is telling you they\u2019re confident in their crew. At French Roofing, every job comes with a standard workmanship warranty because we believe if we installed it, we should stand behind it.",
  },
  {
    number: 6,
    question: "Will you provide a written estimate?",
    answer:
      "If a contractor gives you a number over the phone or a vague verbal quote, that\u2019s a red flag. A written estimate should include the scope of work, materials to be used, project timeline, payment terms, and total cost. It protects both you and the contractor by making sure everyone\u2019s on the same page. Be wary of estimates that seem unusually low \u2014 they often leave out details that show up later as surprise charges. A detailed, transparent estimate is the foundation of a trustworthy working relationship.",
  },
  {
    number: 7,
    question: "How do you handle unexpected damage?",
    answer:
      "Here\u2019s the reality: sometimes when we pull off old shingles, we find rotted decking, damaged flashing, or other issues that weren\u2019t visible during the initial assessment. A good contractor will explain upfront how they handle these situations. You want to hear something like: \u201CWe\u2019ll stop, document it, call you with photos, explain the options, and get your approval before proceeding.\u201D The key is communication. No one likes surprises on a roofing bill, and a trustworthy contractor makes sure you\u2019re informed every step of the way.",
  },
  {
    number: 8,
    question: "Do you use subcontractors or your own crew?",
    answer:
      "This matters more than most people realize. When a company uses their own crew, they have direct control over training, quality standards, and accountability. When they sub out the work, there\u2019s an extra layer between you and the people on your roof. That doesn\u2019t mean subcontractors are always bad, but you should know who\u2019s actually doing the work. Ask whether the crew has been trained on the specific materials being used and whether the contractor will have a supervisor on-site.",
  },
  {
    number: 9,
    question: "What happens if there\u2019s a problem after the job?",
    answer:
      "The real test of a roofing company isn\u2019t the install day \u2014 it\u2019s what happens six months later if you notice something off. Ask how their warranty process works. Is there a phone number you can call? How quickly do they respond? Will they send someone out to inspect? A contractor who\u2019s vague about post-job support probably won\u2019t be easy to reach when you need them. French Roofing\u2019s approach is simple: reach out, we come look, and if it\u2019s on us, we fix it.",
  },
  {
    number: 10,
    question: "Do you offer financing?",
    answer:
      "A new roof is a significant investment, and timing doesn\u2019t always line up with your savings plan. A contractor who offers financing options shows they understand real-life budgets. It also means you don\u2019t have to delay critical repairs or settle for a cheaper solution that won\u2019t last. French Roofing partners with Enhancify to offer flexible financing, including 0% interest options for qualified homeowners. That way you can get the roof you need now and pay over time.",
  },
];

const essentialsFAQs = [
  {
    question: "Why should I ask these questions before hiring a roofer?",
    answer:
      "Roofing is one of the biggest investments you\u2019ll make in your home, and not all contractors operate at the same standard. Asking the right questions upfront helps you avoid unlicensed operators, hidden costs, and poor workmanship. It only takes a few minutes and can save you thousands of dollars and a lot of headaches.",
  },
  {
    question: "How do I verify a contractor\u2019s license in Oregon?",
    answer:
      "Visit the Oregon Construction Contractors Board (CCB) website at oregon.gov/ccb and search by business name or CCB number. You\u2019ll see their license status, bond information, insurance status, and any complaints filed against them. It\u2019s free and takes about two minutes.",
  },
  {
    question: "What\u2019s the difference between a manufacturer warranty and a workmanship warranty?",
    answer:
      "A manufacturer warranty covers defects in the roofing materials themselves \u2014 for example, shingles that fail prematurely due to a manufacturing issue. A workmanship warranty covers the installation \u2014 if the contractor made an error that causes a leak or other problem, they\u2019ll come back and fix it at no cost to you. You want both.",
  },
  {
    question: "How many estimates should I get before choosing a roofing contractor?",
    answer:
      "Getting two to three written estimates is a good practice. It helps you compare scope, materials, and pricing. But don\u2019t just go with the cheapest number \u2014 compare what\u2019s included, what warranties are offered, and whether the contractor is licensed and certified. The lowest bid often leaves out important details.",
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
            <span className="text-[#ffbd59]">to Ask Every Roofing Contractor</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Hiring a roofer is a big decision. These are the questions that
            separate the pros from the pretenders &mdash; and the answers you
            should expect from anyone earning your trust.
          </p>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-gray-600 text-lg leading-relaxed">
            We put this guide together because we believe informed homeowners
            make better decisions. Whether you hire French Roofing or someone
            else, these questions will help you hire with confidence and avoid
            common pitfalls.
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
            is telling you something. The ones who answer openly and honestly are
            the ones worth hiring.
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

      {/* ── FAQ ── */}
      <FAQSection title="Common Questions About Hiring a Roofer" faqs={essentialsFAQs} />

      {/* ── CTA ── */}
      <CTABanner
        headline="Ready to Talk to a Contractor Who Welcomes Your Questions?"
        description="Schedule a free roof assessment with French Roofing. We\u2019ll answer every question on this list \u2014 and any others you\u2019ve got."
      />
    </>
  );
}
