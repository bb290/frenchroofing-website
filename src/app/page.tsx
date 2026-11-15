import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTABanner from "@/components/CTABanner";
import RelatedGuides from "@/components/RelatedGuides";
import FAQSection from "@/components/FAQSection";
import RoofEstimator from "@/components/RoofEstimator";
import { COMPANY, SERVICES, SERVICE_AREAS } from "@/lib/constants";

export const metadata: Metadata = {
  other: {
    "plasma-nexus-hub": "pn-HqoQmBennPbblsQa",
  },
};

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
      "Yes. French Roofing is fully licensed (CCB #203933), insured, and bonded in the state of Oregon. We're also CertainTeed Certified, which means our installations meet the highest manufacturer standards.",
  },
  {
    question: "How long does a roof replacement take?",
    answer:
      "Most residential roof replacements are completed in 1 to 3 days, depending on the size and complexity of the roof. We tear off and dry in section by section, so your home is never left open to the weather, even in winter. We'll give you a clear timeline before we start.",
  },
];

const outAndAbout = [
  {
    src: "/images/community-festival-booth.webp",
    alt: "French Roofing team at their booth at the Oak Grove Community Festival, June 2026",
    caption: "Our booth at the Oak Grove Community Festival",
  },
  {
    src: "/images/community-festival-kids-crafts.webp",
    alt: "Kids doing crafts at the French Roofing booth at a community festival",
    caption: "The kids ran the show at the craft table",
  },
  {
    src: "/images/community-festival-card.webp",
    alt: "French Roofing peace, love, and roofs card held up at an outdoor festival",
    caption: "Peace, love, and roofs",
  },
  {
    src: "/images/community-festival-family.webp",
    alt: "Sean French and family at the Oak Grove Community Festival",
    caption: "Family day at the festival",
  },
  {
    src: "/images/community-festival-rain.webp",
    alt: "Sean French with his kids under a rain umbrella at a festival",
    caption: "A little Oregon rain never stopped us",
  },
  {
    src: "/images/community-tree-farm.webp",
    alt: "French Roofing crew member and his daughter on a wagon at a Christmas tree farm",
    caption: "Christmas tree farm with the family",
  },
];

// One drawn icon per service (Heroicons outline paths; the droplet is custom).
const SERVICE_ICONS: Record<string, string> = {
  "roof-replacement": "m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
  "roof-repair": "M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z",
  "roof-cleaning": "M12 3.75c3 3.9 6 7.2 6 10.5a6 6 0 1 1-12 0c0-3.3 3-6.6 6-10.5Z",
  "roof-inspections": "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
};

export default function Home() {
  return (
    <>
      {/* ── Hero ── (2026-11-15: text on solid navy, photo shown in full beside it instead of at 30% under the text) */}
      <section className="bg-[#092e5e]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-4">
              Damascus, OR &middot; Family-Owned &middot; Since 2014
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05]">
              Your Local Roofing Experts.{" "}
              <span className="text-[#ffbd59]">{COMPANY.tagline}</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed">
              Roof replacement, repair, cleaning &amp; inspections from a team
              that treats every home like family. Licensed, CertainTeed
              Certified, and financing available.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={COMPANY.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#ffbd59] px-8 py-4 text-lg font-bold text-[#092e5e] hover:bg-[#f0ad40] transition-colors"
              >
                Schedule FREE Assessment
              </a>
              <Link
                href="/estimate"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/60 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 hover:border-white transition-colors"
              >
                Instant Estimate
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/85">
              <li>CCB #{COMPANY.ccb}</li>
              <li>CertainTeed Certified</li>
              <li>0% Financing Available</li>
            </ul>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/images/team-plywood-install.webp"
              alt="French Roofing crew installing plywood on a residential roof in Damascus, Oregon"
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover scale-[1.1]"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-x-6 gap-y-3 sm:gap-8 text-sm font-medium text-[#3e3d3b]">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Licensed &amp; Bonded
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              10+ Years Experience
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              CertainTeed Certified
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              0% Financing
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Family-Owned
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 px-4 bg-[#f5f1ea]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Our Roofing Services
            </h2>
            <p className="mt-4 text-lg text-[#3e3d3b] max-w-2xl mx-auto">
              From full replacements to routine maintenance, we handle every
              roofing need with quality materials and honest communication.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col rounded-xl border border-[#e5e0d6] bg-white p-6 hover:border-[#d85024] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-7 w-7 flex-shrink-0 text-[#092e5e]" fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d={SERVICE_ICONS[service.slug] ?? SERVICE_ICONS["roof-replacement"]} /></svg>
                  <h3 className="text-lg font-semibold text-[#092e5e] transition-colors">
                    {service.name}
                  </h3>
                </div>
                <p className="mt-2 text-base text-gray-600">
                  {service.description}
                </p>
                <span className="mt-auto pt-4 inline-flex text-sm font-semibold text-[#c04520] group-hover:underline">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
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
                  alt="Worn roof with patched areas and blue tarp on Cora St, Damascus OR - before French Roofing replacement"
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
                  alt="Brand new shingle roof with clean flashing and vents on Cora St, Damascus OR - after French Roofing replacement"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm font-medium text-[#c04520] uppercase tracking-wider">After</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-flex items-center text-[#c04520] font-semibold hover:underline"
            >
              View more projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Instant Estimate ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Get a Ballpark Price in 60 Seconds
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Compare materials, see the trade-offs, and understand what a new
              roof might cost - no contact info required.
            </p>
          </div>
          <RoofEstimator compact />
        </div>
      </section>

      {/* ── Service Areas ── */}
      <section id="service-areas" className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-4">
            Proudly Serving Damascus, Clackamas & Happy Valley
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Based in Damascus, OR - we serve homeowners within a 20-mile radius.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {SERVICE_AREAS.all.map((area) => (
              <Link
                key={area.slug}
                href={`/services/roof-replacement/${area.slug}`}
                className="rounded-full bg-[#092e5e] px-5 py-2 text-sm font-medium text-white hover:bg-[#c04520] transition-colors"
              >
                {area.name}, {area.state}
              </Link>
            ))}
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
                <svg className="h-7 w-7 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
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
                <svg className="h-7 w-7 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18.916-5.986L2.42 8.14l6.005-.762L11.42 2l2.995 5.378 6.005.762-4.532 4.224.916 5.986z" /></svg>
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
                <svg className="h-7 w-7 text-[#c04520]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
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

      {/* ── About / Brand Story teaser ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
            <Image
              src="/images/sean-first-job.webp"
              alt="Sean French on his first roofing job - founder of French Roofing"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#c04520] uppercase tracking-wider mb-2">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] mb-6">
              Built on a Ladder, a Toolbelt, and a Dream
            </h2>
            <p className="text-gray-600 mb-4">
              Sean French grew up on roofs. He started as a subcontractor at
              sixteen, learning the trade the way most real craftspeople do - by
              showing up early, listening more than talking, and doing the
              unglamorous work with pride.
            </p>
            <p className="text-gray-600 mb-4">
              In 2014, he started French Roofing on a simple idea:{" "}
              <strong className="text-[#092e5e]">
                Do the work like you&apos;re doing it for your own grandma.
              </strong>
            </p>
            <blockquote className="border-l-4 border-[#ffbd59] pl-4 italic text-gray-500 my-6">
              &ldquo;Every customer&apos;s roof should be built the same way
              you&apos;d build it for your own grandma.&rdquo;
              <span className="block not-italic text-sm mt-1 text-[#092e5e] font-medium">
                - Sean French, Founder
              </span>
            </blockquote>
            <Link
              href="/about"
              className="inline-flex items-center text-[#c04520] font-semibold hover:underline"
            >
              Read our full story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Out & About (community photos) ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-[#c04520] uppercase tracking-wider mb-2">
              Out &amp; About
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e]">
              Neighbors First
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              When we&apos;re not on a roof, you&apos;ll find the French Roofing
              crew at festivals, tree farms, and community events around
              Damascus, Clackamas, and Happy Valley.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {outAndAbout.map((photo) => (
              <figure key={photo.src}>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-gray-600">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/about"
              className="inline-flex items-center text-[#c04520] font-semibold hover:underline"
            >
              Meet the team &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related guides ── */}
      <RelatedGuides slugs={["roofing-101", "roof-replacement-guide", "roof-leak-guide", "moss-on-roof-oregon"]} />

      {/* ── CTA ── */}
      <CTABanner />
    </>
  );
}
