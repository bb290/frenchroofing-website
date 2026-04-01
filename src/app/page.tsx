import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY, SERVICES, SERVICE_AREAS } from "@/lib/constants";

const homeFAQs = [
  {
    question: "How much does a roof replacement cost in Damascus, OR?",
    answer:
      "Roof replacement costs in Damascus typically range from $8,000 to $25,000+ depending on roof size, materials, and complexity. French Roofing offers free assessments and financing through Enhancify with 0% interest options. Contact us for an accurate, no-obligation estimate.",
  },
  {
    question: "How do I know if I need a roof repair or full replacement?",
    answer:
      "If your roof is under 15 years old with isolated damage (a few missing shingles, a small leak), repair is usually the right call. If it's 20+ years old, has widespread wear, or you're seeing granules in your gutters, a full replacement is more cost-effective long-term. We'll give you an honest recommendation during your free assessment.",
  },
  {
    question: "Does French Roofing offer financing?",
    answer:
      "Yes. We partner with Enhancify to offer flexible financing with 0% interest options and multiple plans available. You can get pre-qualified without affecting your credit score.",
  },
  {
    question: "What areas does French Roofing serve?",
    answer:
      "We're based in Damascus, OR and serve a 20-mile radius including Clackamas, Happy Valley, Gresham, Oregon City, Milwaukie, Lake Oswego, West Linn, Sandy, Boring, and SE Portland neighborhoods.",
  },
  {
    question: "Is French Roofing licensed and insured?",
    answer:
      "Yes. French Roofing LLC is fully licensed (CCB #203933), insured, and bonded in the state of Oregon. We're also CertainTeed Certified, which means our installations meet the highest manufacturer standards.",
  },
  {
    question: "How long does a roof replacement take?",
    answer:
      "Most residential roof replacements are completed in 1-3 days, depending on the size and complexity of the roof. We'll give you a clear timeline before we start, and we keep you updated if weather or unexpected issues affect the schedule.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#092e5e] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/team-plywood-install.webp"
            alt="French Roofing crew installing plywood on a residential roof in Damascus, Oregon"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
              Damascus, OR &middot; Family-Owned &middot; Since 2014
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Your Local Roofing
              <br />
              <span className="text-[#ffbd59]">Experts.</span>{" "}
              <span className="text-[#d85024]">{COMPANY.tagline}</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              Roof replacement, repair, cleaning &amp; inspections from a team
              that treats every home like family. Licensed, CertainTeed
              Certified, and financing available.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
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
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-400">
              <span>CCB #{COMPANY.ccb}</span>
              <span>CertainTeed Certified</span>
              <span>0% Financing Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center text-sm font-medium text-[#3e3d3b]">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Licensed &amp; Bonded
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              10+ Years Experience
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              CertainTeed Certified
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              0% Financing
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Family-Owned
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Our Roofing Services
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              From full replacements to routine maintenance, we handle every
              roofing need with quality materials and honest communication.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-xl border border-gray-200 p-6 hover:border-[#d85024] hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-[#092e5e]/5 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008V7.5z" /></svg>
                </div>
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

      {/* ── About / Brand Story teaser ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
            <Image
              src="/images/sean-first-job.webp"
              alt="Sean French on his first roofing job — founder of French Roofing LLC"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#d85024] uppercase tracking-wider mb-2">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              Built on a Ladder, a Toolbelt, and a Dream
            </h2>
            <p className="text-gray-600 mb-4">
              Sean French grew up on roofs. He started as a subcontractor at
              sixteen, learning the trade the way most real craftspeople do — by
              showing up early, listening more than talking, and doing the
              unglamorous work with pride.
            </p>
            <p className="text-gray-600 mb-4">
              In 2014, he started French Roofing on a simple idea:{" "}
              <strong className="text-[#092e5e]">
                Do the work like you&apos;re doing it for your own family.
              </strong>
            </p>
            <blockquote className="border-l-4 border-[#ffbd59] pl-4 italic text-gray-500 my-6">
              &ldquo;Every customer&apos;s roof should be built the same way
              you&apos;d build it for your own family.&rdquo;
              <span className="block not-italic text-sm mt-1 text-[#092e5e] font-medium">
                — Sean French, Founder
              </span>
            </blockquote>
            <Link
              href="/about"
              className="inline-flex items-center text-[#d85024] font-semibold hover:underline"
            >
              Read our full story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Before / After ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              See the Difference
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real results from real jobs in your neighborhood.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/cora-st-before.webp"
                  alt="Worn roof with patched areas and blue tarp on Cora St, Damascus OR — before French Roofing replacement"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Before</p>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src="/images/cora-st-after.webp"
                  alt="Brand new shingle roof with clean flashing and vents on Cora St, Damascus OR — after French Roofing replacement"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm font-medium text-[#d85024] uppercase tracking-wider">After</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center text-[#d85024] font-semibold hover:underline"
            >
              View more projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-4">
            Proudly Serving the Greater Portland Metro
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Based in Damascus, OR — we serve homeowners within a 20-mile radius.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {SERVICE_AREAS.full.map((city) => {
              const priorityArea = SERVICE_AREAS.priority.find(
                (a) => a.name === city
              );
              return priorityArea ? (
                <Link
                  key={city}
                  href={`/service-areas/${priorityArea.slug}`}
                  className="rounded-full bg-[#092e5e] px-5 py-2 text-sm font-medium text-white hover:bg-[#d85024] transition-colors"
                >
                  {city}, OR
                </Link>
              ) : (
                <span
                  key={city}
                  className="rounded-full bg-white border border-gray-200 px-5 py-2 text-sm font-medium text-[#3e3d3b]"
                >
                  {city}, OR
                </span>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Including SE Portland neighborhoods: Lents, Powellhurst-Gilbert,
            Foster-Powell, Woodstock
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Values You Can See on the Roof
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-gray-50">
              <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Integrity
              </h3>
              <p className="text-sm text-gray-600">
                We communicate clearly and honestly, even when something
                unexpected comes up. You hear from us first, with a plan and
                honest options.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gray-50">
              <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18.916-5.986L2.42 8.14l6.005-.762L11.42 2l2.995 5.378 6.005.762-4.532 4.224.916 5.986z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Workmanship
              </h3>
              <p className="text-sm text-gray-600">
                Clean, safe job sites. Manufacturer specs followed. Every stage
                documented. Backed with a standard workmanship warranty.
              </p>
            </div>
            <div className="text-center p-8 rounded-xl bg-gray-50">
              <div className="h-14 w-14 mx-auto rounded-full bg-[#ffbd59]/20 flex items-center justify-center mb-4">
                <svg className="h-7 w-7 text-[#d85024]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-[#092e5e] mb-3">
                Community
              </h3>
              <p className="text-sm text-gray-600">
                We take care around gardens, siding, and shared spaces. We treat
                every property like it&apos;s owned by our grandma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ (AEO optimized) ── */}
      <FAQSection faqs={homeFAQs} />

      {/* ── CTA ── */}
      <CTABanner />
    </>
  );
}
