import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Community Discounts | ${COMPANY.name}`,
  description:
    "French Roofing offers special roofing discounts for active military, veterans, first responders, nurses, and teachers. Serving Damascus, OR and the Portland metro. Book online today.",
  alternates: { canonical: `${COMPANY.url}/discounts` },
};

const discounts = [
  {
    id: "salute-savings",
    name: "Salute Savings",
    emoji: "🎖️",
    who: "Active Military & Veterans",
    tagline: "You protected us. Now we protect your home.",
    description:
      "To every service member and veteran who stood on the line so the rest of us could sleep under a safe roof - thank you. This one's for you.",
    eligible: [
      "Active duty military (all branches)",
      "Military reserves & National Guard",
      "Honorably discharged veterans",
      "Military spouses (with valid dependent ID)",
    ],
  },
  {
    id: "heros-roof",
    name: "Hero's Roof",
    emoji: "🚒",
    who: "First Responders",
    tagline: "You run toward danger. We keep your family covered.",
    description:
      "Police officers, firefighters, paramedics, and EMTs put themselves on the line every single day. The least we can do is make sure their families come home to a solid roof.",
    eligible: [
      "Law enforcement officers",
      "Firefighters (career & volunteer)",
      "Paramedics & EMTs",
      "911 dispatchers",
    ],
  },
  {
    id: "community-shield",
    name: "Community Shield",
    emoji: "🛡️",
    who: "Nurses & Teachers",
    tagline: "You build our community. We shield your home.",
    description:
      "Nurses keep us healthy. Teachers shape our kids. These are the people who hold communities together - and we think they deserve a little something back.",
    eligible: [
      "Registered nurses (RN) & licensed practical nurses (LPN)",
      "Nurse practitioners & physician assistants",
      "K-12 teachers & administrators",
      "College & university educators",
    ],
  },
];

export default function DiscountsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Community Discounts", href: "/discounts" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Giving Back
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Community{" "}
            <span className="text-[#ffbd59]">Discounts</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Some people spend their lives taking care of others. We think their
            roofs should be taken care of too. French Roofing is proud to offer
            special pricing for the folks who make our community stronger.
          </p>
        </div>
      </section>

      {/* ── Discount Cards ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-5xl space-y-10">
          {discounts.map((d) => (
            <div
              key={d.id}
              className="rounded-2xl border border-gray-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-[#092e5e] to-[#092e5e]/90 px-8 py-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{d.emoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-[#ffbd59]">
                      {d.name}
                    </h2>
                    <p className="text-sm text-gray-300">{d.who}</p>
                  </div>
                </div>
                <p className="mt-3 text-lg text-white italic">
                  &ldquo;{d.tagline}&rdquo;
                </p>
              </div>
              <div className="px-8 py-6">
                <p className="text-gray-600 mb-5">{d.description}</p>
                <div className="rounded-xl bg-gray-50 p-5">
                  <h3 className="text-sm font-semibold text-[#092e5e] mb-3">
                    Who qualifies:
                  </h3>
                  <ul className="space-y-2">
                    {d.eligible.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <svg
                          className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#d85024]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <a
                    href={COMPANY.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-6 py-3 text-sm font-semibold text-white hover:bg-[#c04520] transition-colors"
                  >
                    Claim Your Discount
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#092e5e] mb-8">
            How to Claim Your Discount
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6">
              <div className="h-12 w-12 mx-auto rounded-full bg-[#d85024] text-white flex items-center justify-center text-xl font-bold mb-3">
                1
              </div>
              <h3 className="font-semibold text-[#092e5e] mb-1">
                Schedule Your Assessment
              </h3>
              <p className="text-sm text-gray-600">
                Book your free roof assessment online.
              </p>
            </div>
            <div className="p-6">
              <div className="h-12 w-12 mx-auto rounded-full bg-[#d85024] text-white flex items-center justify-center text-xl font-bold mb-3">
                2
              </div>
              <h3 className="font-semibold text-[#092e5e] mb-1">
                Mention Your Discount
              </h3>
              <p className="text-sm text-gray-600">
                Let us know which discount applies when you schedule or when we
                arrive for the assessment.
              </p>
            </div>
            <div className="p-6">
              <div className="h-12 w-12 mx-auto rounded-full bg-[#d85024] text-white flex items-center justify-center text-xl font-bold mb-3">
                3
              </div>
              <h3 className="font-semibold text-[#092e5e] mb-1">
                Send Proof of Service
              </h3>
              <p className="text-sm text-gray-600">
                Just send us any proof of service - a photo of your badge, a pay
                stub, a school ID, whatever&apos;s easy. That&apos;s it - no hoops, no fine print.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Fine Print ── */}
      <section className="py-12 px-4 bg-white">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl bg-[#ffbd59]/10 border border-[#ffbd59]/30 p-6 text-sm text-[#3e3d3b]">
            <h3 className="font-semibold text-[#092e5e] mb-2">
              A few details:
            </h3>
            <ul className="space-y-1.5 text-gray-600">
              <li>
                &bull; Discounts apply to roof replacement and major repair
                projects.
              </li>
              <li>
                &bull; Cannot be combined with other offers or promotions.
              </li>
              <li>
                &bull; Proof of service or employment required (badge, pay stub,
                school ID, etc.).
              </li>
              <li>
                &bull; Financing through Enhancify can be used alongside
                community discounts.
              </li>
              <li>
                &bull; Discount amount discussed during your free assessment -
                we keep it straightforward.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Community Discount FAQs"
        faqs={[
          {
            question: "Who qualifies for French Roofing's community discounts?",
            answer:
              "We offer discounts to folks who give back to our community every day - active military, veterans, first responders (police, fire, EMS, 911 dispatchers), registered nurses, nurse practitioners, and K-12 and college educators. If you serve others for a living, there's a good chance we have a discount for you.",
          },
          {
            question: "Can I combine a community discount with financing?",
            answer:
              "Yes! You can absolutely use your community discount alongside financing through Enhancify. That means you get the discount on your project total and still break payments into manageable monthly amounts - including 0% interest options for qualifying customers.",
          },
          {
            question: "How do I prove my eligibility for a discount?",
            answer:
              "We keep it simple - just send us any proof of service. A photo of your badge, a pay stub, a school ID, a DD-214, or anything similar works. No hoops, no fine print. We trust the people who serve our community.",
          },
          {
            question: "What services do the discounts apply to?",
            answer:
              "Community discounts apply to roof replacement and major repair projects. During your free assessment, we'll walk you through the discount amount and how it applies to your specific project. Straightforward and transparent - that's how we do things at French Roofing (CCB #203933).",
          },
        ]}
      />

      {/* ── CTA ── */}
      <CTABanner
        headline="Ready to Save on Your New Roof?"
        description="Schedule your free assessment and mention your community discount. No pressure, no gimmicks - just honest roofing from your neighbors."
        dark
      />
    </>
  );
}
