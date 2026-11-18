import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import RelatedGuides from "@/components/RelatedGuides";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { COMPANY } from "@/lib/constants";
import { pageCount, pageSlice, PROJECTS } from "@/lib/projects";

/*
  /past-projects (2026-11-18): replaced /gallery (308 redirect in next.config.ts). Page 1 of the project list, plus the
  crew photos and FAQs that used to live on the gallery. Later pages: /past-projects/page/[n].
*/
export const metadata: Metadata = {
  title: "Past Roofing Projects",
  description:
    "Roof replacements and repairs French Roofing has finished in Damascus, Gresham, Boring, Estacada, and nearby Oregon towns. Photos, materials, and what we did on each job.",
  alternates: { canonical: `${COMPANY.url}/past-projects` },
  openGraph: { title: "Past Roofing Projects", images: PROJECTS[0] ? [{ url: PROJECTS[0].photos[0].src }] : undefined },
};

const actionShots = [
  { src: "/images/gallery/tear-off-day-1.webp", alt: "Tarps spread across the lawn beside the house before a tear-off", caption: "Tarps down on the lawn before tear-off" },
  { src: "/images/gallery/tear-off-day-3.webp", alt: "Crew member carrying old shingles across the tarps", caption: "Old shingles land on the tarps, not the yard" },
  { src: "/images/gallery/tear-off-day-2.webp", alt: "French Roofing crew member in a safety harness on the roof beside new CertainTeed Landmark bundles", caption: "Harnessed up on the roof" },
  { src: "/images/workers-tearoff.webp", alt: "French Roofing crew performing tear-off on a residential roof", caption: "Tear-off in progress, clean and safe" },
  { src: "/images/install-shingles.webp", alt: "French Roofing installer laying new shingles on a roof", caption: "Shingles going on, one course at a time" },
  { src: "/images/valley-install.webp", alt: "Valley flashing installation by French Roofing crew", caption: "Valley flashing done right" },
  { src: "/images/worker-ridge.webp", alt: "French Roofing worker installing ridge cap on a finished roof", caption: "Ridge cap, the finishing touch" },
];

const PROJECT_FAQS = [
  {
    question: "Can I see examples of French Roofing's work?",
    answer:
      "You sure can, you're looking at them! These past projects are real jobs from right here in Damascus and the surrounding communities, with photos from before, during, and after the work. We're proud of what our crew does, and we add new projects as we finish them.",
  },
  {
    question: "Does French Roofing take before and after photos?",
    answer:
      "Yes, we document every project with photos before, during, and after the work. It keeps us accountable, helps you see exactly what was done, and comes in handy if you ever need records for insurance or resale. Transparency is a big deal to us.",
  },
  {
    question: "What types of roofing projects does French Roofing handle?",
    answer:
      "We handle full roof replacements, repairs, cleaning, maintenance, and free inspections for homeowners across Damascus, Clackamas, Happy Valley, and the surrounding area. Whether it's a complete tear-off with new CertainTeed shingles or a targeted repair on storm damage, our CertainTeed Certified team (CCB #203933) has been doing this since 2014 out of Damascus, OR.",
  },
];

export default function PastProjectsPage() {
  return (
    <>
      <ProjectsIndex projects={pageSlice(PROJECTS, 1)} page={1} total={pageCount(PROJECTS)} count={PROJECTS.length} />

      <section className="bg-[#f5f1ea] px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-[#092e5e] sm:text-4xl">The Crew in Action</h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-gray-600">
            Before anything comes off the roof, the crew tarps the lawn and shrubs, and the crew on the roof is
            harnessed. Here&apos;s what the work looks like up close.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {actionShots.map((shot) => (
              <figure key={shot.src} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3 text-center text-base font-medium text-[#3e3d3b]">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title="Past Projects FAQs" faqs={PROJECT_FAQS} />
      <RelatedGuides slugs={["roof-replacement-day-by-day", "roof-replacement-guide"]} />
      <CTABanner
        headline="Ready to See Your Roof Transformed?"
        description="Get a free assessment and find out what a new roof could look like on your home."
      />
    </>
  );
}
