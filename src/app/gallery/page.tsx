import type { Metadata } from "next";
import HeroReview from "@/components/reviews/HeroReview";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import RelatedGuides from "@/components/RelatedGuides";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Project Gallery`,
  description:
    "See before and after photos of roof replacements, repairs, and installations by French Roofing in Damascus, OR and surrounding areas.",
  alternates: { canonical: `${COMPANY.url}/gallery` },
};

const projects = [
  {
    title: "Roof Replacement in Damascus",
    description:
      "Full tear-off and replacement on a home with years of patching and tarp repairs. New architectural shingles, clean flashing, and proper ventilation.",
    before: {
      src: "/images/damascus-replacement-before.webp",
      alt: "Worn roof with patched areas and a blue tarp in Damascus, OR, before French Roofing replaced it",
    },
    after: {
      src: "/images/damascus-replacement-after.webp",
      alt: "The same roof after French Roofing's replacement: new shingles, clean flashing and vents",
    },
  },
];

// More projects (2026-11-15). Only jobs Housecall Pro shows as completed by French Roofing; city named only when on
// the BRAND.md coverage list; no house numbers, faces of customers, or street-facing fronts. Facts come from each
// photo's sort note and the job record, nothing added.
const g = (name: string, alt: string) => ({ src: `/images/gallery/${name}.webp`, alt });
const moreProjects = [
  {
    title: "Presidential Shingle Replacement in Gresham",
    tag: "Roof Replacement",
    description:
      "A full tear-off and new CertainTeed Presidential shingles, with a W-shaped metal valley where the two roof planes meet. Metal valleys carry water off faster and are easier to keep clear of debris.",
    photos: [
      g("gresham-presidential-2", "New CertainTeed Presidential shingles going on upper slopes of a home in Gresham, OR"),
      g("gresham-presidential-1", "Tear-off underway with new shingle bundles staged at the ridge"),
      g("gresham-presidential-3", "Brown W-valley metal between new shingles and underlayment"),
    ],
  },
  {
    title: "Standing Seam Metal Roof in Boring",
    tag: "Roof Replacement",
    description:
      "A complete tan standing seam metal roof with clean hip and valley lines and a brick chimney at the ridge.",
    photos: [
      g("boring-metal-1", "Finished tan standing seam metal roof in Boring, OR, with clean hip and valley lines"),
      g("boring-metal-2", "Close-up of the valley on a new standing seam metal roof"),
      g("boring-metal-3", "Hip seam where two slopes meet on a new standing seam metal roof"),
    ],
  },
  {
    title: "Low-Slope Roof Replacement in Fairview",
    tag: "Roof Replacement",
    description:
      "A new low-slope roof, finished where the roof meets the wall and around every pipe that comes through it.",
    photos: [
      g("fairview-low-slope-1", "New low-slope roof in Fairview, OR, with the chimney and trees beyond"),
      g("fairview-low-slope-2", "Where the new low-slope roof meets the bottom of a white wood-sided wall"),
      g("fairview-low-slope-3", "A pipe through the new low-slope roof with a metal flashing base"),
    ],
  },
  {
    title: "Roof Repair and Addition Tie-In in Gresham",
    tag: "Roof Repair",
    description:
      "A lifted ridge cap repaired, new wall flashing where the roof meets a home addition, and a temporary dry-in so the house stayed dry between work days.",
    photos: [
      g("gresham-repair-3", "New black wall flashing where a shingle roof meets the plywood wall of an addition in Gresham, OR"),
      g("gresham-repair-1", "Aged shingles with a section of ridge cap lifted, before the repair"),
      g("gresham-repair-2", "Temporary dry-in: underlayment held down over a roof opening between work days"),
    ],
  },
  {
    title: "Shingle Repair in Estacada",
    tag: "Roof Repair",
    description:
      "A few lifted shingles near the vents, visible from the driveway. Damaged shingles came out and new underlayment went down before the new shingles, so the repair covers every layer, not just the top one.",
    photos: [
      g("estacada-repair-2", "Shingle repair in Estacada, OR: damaged shingles cut out and new synthetic underlayment laid"),
      g("estacada-repair-1", "Lifted shingles near the vents, seen from the ground before the repair"),
      g("estacada-repair-3", "Close-up of the repair in progress with shingles removed down to the underlayment"),
    ],
  },
  {
    title: "Flat Roof Repair in Troutdale",
    tag: "Roof Repair",
    description:
      "A flat roof corner repaired with a new modified bitumen patch, plus the parapet wall joint resealed.",
    photos: [
      g("troutdale-flat-1", "Flat roof corner in Troutdale, OR, with a new modified bitumen patch"),
      g("troutdale-flat-2", "Close-up of the new patch sealed into the corner"),
    ],
  },
  {
    title: "Tear-Off Day: How We Protect Your Yard",
    tag: "On the Job",
    description:
      "Before anything comes off the roof, the crew tarps the lawn and shrubs. Old shingles land on the tarps, not in the yard, and the crew clears them as they go. The crew is harnessed on the roof.",
    photos: [
      g("tear-off-day-1", "Tarps spread across the lawn beside the house before a tear-off"),
      g("tear-off-day-2", "French Roofing crew member in a safety harness on the roof beside new CertainTeed Landmark bundles"),
      g("tear-off-day-3", "Crew member carrying old shingles across the tarps"),
    ],
  },
  {
    title: "Full Replacements, Start to Finish",
    tag: "Roof Replacement",
    description:
      "From the roof loaded with new shingles over fresh underlayment to finished, clean shingle lines.",
    photos: [
      g("2024-replacements-3", "Freshly installed shingles with clean, straight lines"),
      g("2024-replacements-1", "Roof loaded with new shingle bundles over fresh underlayment, ready for install"),
      g("2024-replacements-2", "Roof installation in progress, new shingles going on over underlayment"),
    ],
  },
];

const actionShots = [
  {
    src: "/images/workers-tearoff.webp",
    alt: "French Roofing crew performing tear-off on a residential roof",
    caption: "Tear-off in progress - clean and safe",
  },
  {
    src: "/images/install-shingles.webp",
    alt: "French Roofing installer laying new shingles on a roof",
    caption: "Precision shingle installation",
  },
  {
    src: "/images/valley-install.webp",
    alt: "Valley flashing installation by French Roofing crew",
    caption: "Valley flashing done right",
  },
  {
    src: "/images/worker-ridge.webp",
    alt: "French Roofing worker installing ridge cap on a finished roof",
    caption: "Ridge cap - the finishing touch",
  },
];

export default function GalleryPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Our <span className="text-[#ffbd59]">Work</span> Speaks for Itself
          </h1>
          <p className="mt-4 text-lg text-white/85 max-w-2xl mx-auto">
            Real projects, real results. Browse before-and-after photos from
            roofing jobs right here in Damascus and the surrounding communities.
          </p>
        </div>
        <HeroReview topic="replacement" seed={"gallery"} layout="below" />
      </section>

      {/* ── Before / After Projects ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] text-center mb-14">
            Before &amp; After
          </h2>
          <div className="space-y-20">
            {projects.map((project) => (
              <div key={project.title}>
                <h3 className="text-xl font-semibold text-[#092e5e] mb-2 text-center">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
                  {project.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={project.before.src}
                        alt={project.before.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Before
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={project.after.src}
                        alt={project.after.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-center text-sm font-medium text-[#c04520] uppercase tracking-wider">
                      After
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── More Projects (2026-11-15) ── */}
      <section className="py-20 px-4 bg-[#f5f1ea]">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] text-center mb-4">More Recent Projects</h2>
          <p className="text-lg text-gray-600 text-center mb-14 max-w-2xl mx-auto">
            Replacements, repairs, and metal and low-slope roofs from jobs around Damascus and nearby towns.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {moreProjects.map((p) => (
              <article key={p.title} className="overflow-hidden rounded-2xl border border-[#e5e0d6] bg-white">
                <div className="relative aspect-[4/3]">
                  <Image src={p.photos[0].src} alt={p.photos[0].alt} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
                  <span className="absolute left-3 top-3 rounded-md bg-[#092e5e] px-3 py-1 text-base font-semibold text-white">{p.tag}</span>
                </div>
                <div className={`grid gap-1 ${p.photos.length > 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {p.photos.slice(1).map((ph) => (
                    <div key={ph.src} className={`relative ${p.photos.length > 2 ? "aspect-[4/3]" : "aspect-[8/3]"}`}>
                      <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 768px) 300px, 50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#092e5e]">{p.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-[#3e3d3b]">{p.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Action Shots ── */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#092e5e] text-center mb-4">
            The Crew in Action
          </h2>
          <p className="text-lg text-gray-600 text-center mb-14 max-w-2xl mx-auto">
            From tear-off to ridge cap, here&apos;s what quality workmanship
            looks like up close.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {actionShots.map((shot) => (
              <div key={shot.src} className="group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="mt-3 text-sm font-medium text-[#3e3d3b] text-center">
                  {shot.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection
        title="Project Gallery FAQs"
        faqs={[
          {
            question: "Can I see examples of French Roofing's work?",
            answer:
              "You sure can - you're looking at them! This gallery shows real before-and-after photos from roofing projects right here in Damascus and the surrounding communities. We're proud of the work our crew does, and we think the results speak for themselves. We update this page as we complete new projects.",
          },
          {
            question: "Does French Roofing take before and after photos?",
            answer:
              "Yes - we document every project with photos before, during, and after the work. It keeps us accountable, helps you see exactly what was done, and comes in handy if you ever need records for insurance or resale. Transparency is a big deal to us.",
          },
          {
            question: "What types of roofing projects does French Roofing handle?",
            answer:
              "We handle full roof replacements, repairs, cleaning, maintenance, and free inspections for homeowners across Damascus, Clackamas, Happy Valley, and the surrounding area. Whether it's a complete tear-off with new CertainTeed shingles or a targeted repair on storm damage, our CertainTeed Certified team (CCB #203933) has been doing this since 2014 out of Damascus, OR.",
          },
        ]}
      />

      {/* ── Related guides ── */}
      <RelatedGuides slugs={["roof-replacement-day-by-day", "roof-replacement-guide"]} />

      {/* ── CTA ── */}
      <CTABanner
        headline="Ready to See Your Roof Transformed?"
        description="Get a free assessment and find out what a new roof could look like on your home."
      />
    </>
  );
}
