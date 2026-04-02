import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `10 Essential Questions to Ask Your Roofing Contractor | ${COMPANY.name}`,
  description:
    "Know exactly what to ask before hiring a roofer. Sean French walks you through the 10 questions that separate the pros from the pretenders. Watch the videos or read the guide.",
  alternates: { canonical: `${COMPANY.url}/essentials` },
};

const questions = [
  {
    number: 1,
    question: "Are you licensed and insured?",
    answer:
      "This is the first thing you should ask — no exceptions. A valid license means the contractor has met the requirements set by the state and is authorized to perform roofing work in your area. Insurance protects you from liability if something goes wrong during the project. In Oregon, you can verify any contractor's license at the Construction Contractors Board (CCB) website. If someone can't give you a CCB number on the spot, that's a major red flag. French Roofing's CCB number is #203933 — look us up anytime.",
  },
  {
    number: 2,
    question: "Do you have experience with this type of roofing project?",
    answer:
      "Not all roofing contractors specialize in the same types of projects. Whether you need a roof repair or a full roof replacement, it's important to choose a contractor with experience relevant to your specific needs. Ask about their experience with similar projects and request references or examples of past work. French Roofing has been handling everything from small repairs to full tear-offs across the Portland metro since 2014.",
  },
  {
    number: 3,
    question: "What materials will you use, and why?",
    answer:
      "The quality of roofing materials can significantly impact how long your roof lasts and how well it holds up. Ask the contractor what materials they plan to use and why they recommend those specific products. A good contractor should be able to explain the benefits and help you make an informed decision based on your budget. French Roofing is CertainTeed Certified — we use their roofing system because it's proven in the Pacific Northwest and comes with strong warranty coverage.",
  },
  {
    number: 4,
    question: "What is the project timeline, and how will you communicate updates?",
    answer:
      "Understanding the timeline is essential for planning. Ask about expected start and completion dates, as well as anything that could cause delays. Just as important: how will they keep you in the loop? Phone? Text? Email? You shouldn't have to chase your contractor for updates. At French Roofing, we're upfront about timelines and proactive with communication — especially when Oregon weather has other plans.",
  },
  {
    number: 5,
    question: "What warranties or guarantees do you offer?",
    answer:
      "A reputable contractor should stand behind their work with warranties — both for materials and for labor. The manufacturer warranty covers defective materials, but the workmanship warranty covers installation errors. That's the one the roofer controls. Ask for written documentation outlining exactly what's covered and for how long. Be cautious of contractors who are vague about warranty terms. Because French Roofing is CertainTeed Certified, our installations may qualify for enhanced manufacturer warranty coverage on top of our standard workmanship warranty.",
  },
  {
    number: 6,
    question: "Do you have any certifications or accreditations?",
    answer:
      "Certifications from industry organizations and manufacturers demonstrate a commitment to professionalism and quality. Ask if the contractor holds any certifications or memberships in roofing associations. Certifications from manufacturers like CertainTeed indicate specialized training in installing specific roofing products — which directly affects the quality of your install and the warranty coverage you receive.",
  },
  {
    number: 7,
    question: "How will you protect my property during the project?",
    answer:
      "Roofing projects can get messy — debris, nails, old shingles everywhere. Ask the contractor how they plan to protect your landscaping, siding, windows, and other areas of your property. Will they use tarps or plywood to safeguard your yard? Will they do a thorough cleanup and magnet sweep afterward? At French Roofing, every job ends with a site that's cleaner than when we showed up.",
  },
  {
    number: 8,
    question: "Who will be supervising the project, and how can I reach them?",
    answer:
      "You should know exactly who's overseeing the work on your roof and who to contact if you have questions. Ask who the primary point of contact will be and how to reach them. Having a designated supervisor ensures clear communication and accountability throughout the project — not a game of phone tag with a random office number.",
  },
  {
    number: 9,
    question: "Can you provide references or customer reviews?",
    answer:
      "References and reviews give you real insight into a contractor's reputation and the quality of their work. Ask for references from past customers and actually contact them. Check Google reviews, Facebook, and the BBB. A contractor who's confident in their work will be happy to share their track record. French Roofing's reviews speak for themselves — check us out on Google.",
  },
  {
    number: 10,
    question: "What is your payment schedule, and do you require a deposit?",
    answer:
      "Understanding payment terms upfront avoids misunderstandings later. Ask about the payment schedule and whether a deposit is required before work begins. Be cautious of contractors who demand a large upfront payment or request cash-only transactions — that's a red flag. A fair, transparent payment structure is a sign of a professional operation.",
  },
];

const bonusTip = {
  question: "Will you provide a detailed written estimate?",
  answer:
    "It almost goes without saying, but just to be sure — always get a detailed written estimate before agreeing to any work. It should include a breakdown of costs for labor, materials, any additional fees, and standard terms for the project. Review it carefully, and don't hesitate to ask for clarification on anything you don't understand. A detailed, transparent estimate is the foundation of a trustworthy working relationship.",
};

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
      "A manufacturer warranty covers defects in the roofing materials themselves — for example, shingles that fail prematurely due to a manufacturing issue. A workmanship warranty covers the installation — if the contractor made an error that causes a leak or other problem, they'll come back and fix it at no cost to you. You want both.",
  },
  {
    question:
      "How many estimates should I get before choosing a roofing contractor?",
    answer:
      "Getting two to three written estimates is a good practice. It helps you compare scope, materials, and pricing. But don't just go with the cheapest number — compare what's included, what warranties are offered, and whether the contractor is licensed and certified. The lowest bid often leaves out important details.",
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
            from the pretenders — and the answers you should expect from anyone
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
                Questions 1–5 — quick version (2 min)
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
                Questions 6–10 — quick version (2 min)
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
            key to a successful roofing experience — the ones who answer openly
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
              All 10 Questions — In Depth
            </h2>
            <p className="mt-2 text-gray-600">
              Sean breaks down every question and what the right answers sound like (19 min).
            </p>
          </div>
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/rOXXRPQUJog"
              title="10 Essential Questions to Ask Your Roofing Contractor — Full Podcast"
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

      {/* ── CTA ── */}
      <CTABanner
        headline="Ready to Talk to a Contractor Who Welcomes Your Questions?"
        description="Schedule a free roof assessment with French Roofing. We'll answer every question on this list — and any others you've got."
      />
    </>
  );
}
