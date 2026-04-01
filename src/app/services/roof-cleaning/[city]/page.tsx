import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY, SERVICE_AREAS } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICE_AREAS.all.map((area) => ({ city: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const area = SERVICE_AREAS.all.find((a) => a.slug === city);
  if (!area) return {};

  return {
    title: `Roof Cleaning in ${area.name}, OR | ${COMPANY.name}`,
    description: `Professional roof cleaning and maintenance in ${area.name}, OR. Remove moss, algae, and debris to extend your roof's life. One-time or recurring service. Licensed (CCB #${COMPANY.ccb}). Schedule your cleaning today.`,
    alternates: {
      canonical: `${COMPANY.url}/services/roof-cleaning/${area.slug}`,
    },
  };
}

const steps = [
  {
    title: "Roof Assessment",
    description:
      "Before we touch anything, we inspect your roof to understand the type of growth, buildup, and any underlying issues. We note areas that need extra attention and flag anything that might need repair.",
  },
  {
    title: "Debris Removal",
    description:
      "We clear leaves, branches, pine needles, and anything else that's been collecting up there. Clogged valleys and gutters are one of the biggest causes of premature roof wear in Oregon.",
  },
  {
    title: "Moss & Algae Treatment",
    description:
      "Oregon's damp climate is a moss factory. We treat moss and algae growth with methods that are effective but won't damage your shingles or harm your landscaping.",
  },
  {
    title: "Gutter Cleanout",
    description:
      "While we're up there, we make sure your gutters and downspouts are clear and flowing properly. It's all connected — a clean roof with clogged gutters still causes problems.",
  },
  {
    title: "Maintenance Report",
    description:
      "You get a summary of what we did, what we found, and any recommendations for future care. No surprise bills — just honest info to help you plan ahead.",
  },
];

function getRoofCleaningFaqs(cityName: string) {
  return [
    {
      question: `How much does roof cleaning cost in ${cityName}, OR?`,
      answer: `Roof cleaning in ${cityName} typically runs between $300 and $800 depending on roof size, pitch, and the amount of buildup. We provide a clear quote before we start — no surprises. For homes that need both cleaning and minor repairs, we can bundle the work and save you a trip.`,
    },
    {
      question: `How often should I clean my roof in ${cityName}?`,
      answer: `In ${cityName}, we recommend a roof cleaning at least once a year — ideally in late spring or early fall. If your home is surrounded by trees or sits on the north side of a hill, twice a year is even better. Moss and debris build up fast in Oregon's wet climate, and staying ahead of it saves you money in the long run.`,
    },
    {
      question: `Does moss damage roofs in ${cityName}, Oregon?`,
      answer: `It sure does. Moss holds moisture against your shingles, which accelerates wear and can lift shingle edges over time. In ${cityName}'s damp climate, moss growth is especially aggressive. Left unchecked, it shortens your roof's lifespan and can lead to leaks. Regular cleaning is one of the most cost-effective ways to protect your investment.`,
    },
    {
      question: `Does French Roofing offer recurring roof maintenance in ${cityName}?`,
      answer: `We do! We offer both one-time cleanings and recurring maintenance schedules for homeowners in ${cityName}. A lot of our customers set up annual or semi-annual visits so they never have to think about it. It's the easiest way to keep your roof in great shape. Just give us a call and we'll set it up.`,
    },
    {
      question: `Can roof cleaning extend my roof's lifespan in ${cityName}?`,
      answer: `Absolutely. Regular cleaning removes the moisture-trapping moss and debris that cause premature aging. A clean, well-maintained roof in ${cityName} can last years longer than a neglected one. Think of it like changing the oil in your car — a little maintenance goes a long way. We're CertainTeed Certified (CCB #${COMPANY.ccb}) and know exactly what your roof needs.`,
    },
  ];
}

export default async function RoofCleaningCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const area = SERVICE_AREAS.all.find((a) => a.slug === city);
  if (!area) notFound();

  const faqs = getRoofCleaningFaqs(area.name);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          {
            name: "Roof Cleaning & Maintenance",
            href: "/services/roof-cleaning",
          },
          {
            name: `${area.name}, OR`,
            href: `/services/roof-cleaning/${area.slug}`,
          },
        ]}
      />

      {/* ── Hero ── */}
      <section className="relative bg-[#092e5e] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/worker-ridge.webp"
            alt={`French Roofing worker on a roof ridge performing cleaning and maintenance in ${area.name}, Oregon`}
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-2xl">
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
              Roof Cleaning &amp; Maintenance
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Roof Cleaning in {area.name}, OR
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Moss, algae, and debris don&apos;t just look bad — they shorten
              your roof&apos;s life. For {area.name} homeowners, a little
              maintenance goes a long way in Oregon&apos;s wet climate. We keep
              your roof clean, clear, and lasting longer.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#d85024] px-8 py-4 text-lg font-semibold text-white hover:bg-[#c04520] transition-colors"
              >
                Schedule a Cleaning
              </a>
              <a
                href={COMPANY.phoneTel}
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Call {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Maintenance Matters ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Extend Your Roof's Life",
              desc: `Regular cleaning removes the moisture-trapping moss and debris that cause premature aging. A clean roof in ${area.name} lasts years longer than a neglected one.`,
            },
            {
              title: "Prevent Costly Repairs",
              desc: "Catching small issues during routine maintenance — a cracked vent boot, a lifted shingle — saves you from expensive repairs down the road.",
            },
            {
              title: "Protect Your Home's Value",
              desc: `Curb appeal matters in ${area.name}. A clean roof signals a well-maintained home and protects your property value.`,
            },
          ].map((item, i) => (
            <div key={i} className="text-center p-8 rounded-xl bg-gray-50">
              <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
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
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Our Cleaning &amp; Maintenance Process
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Thorough, careful, and respectful of your property.
            </p>
          </div>
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#092e5e] flex items-center justify-center text-white font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#092e5e] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why French Roofing ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              Why {area.name} Homeowners Choose French Roofing for Maintenance
            </h2>
            <p className="text-gray-600 mb-6">
              Anyone can blow leaves off a roof. We go further — because
              we&apos;re roofers first. When we clean your roof, we&apos;re also
              looking at its health. That means you get maintenance and a
              mini-inspection in one visit.
            </p>
            <ul className="space-y-4">
              {[
                "Trained roofing crew — not a general handyman with a leaf blower",
                "Low-pressure cleaning methods that protect your shingles",
                "We spot problems early — saving you from expensive surprises",
                `Licensed, insured & bonded (CCB #${COMPANY.ccb})`,
                "One-time or recurring service options",
                `Serving ${area.name} and the surrounding area from our home base in Damascus`,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <svg
                    className="h-6 w-6 flex-shrink-0 text-[#d85024] mt-0.5"
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
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/worker-ridge.webp"
              alt={`French Roofing worker performing roof maintenance in ${area.name}, OR`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title={`Roof Cleaning in ${area.name} FAQs`}
        faqs={faqs}
      />

      {/* ── CTA ── */}
      <CTABanner
        headline="Keep Your Roof in Great Shape"
        description={`Schedule a roof cleaning for your ${area.name} home or set up a recurring maintenance plan. Your roof will thank you.`}
      />
    </>
  );
}
