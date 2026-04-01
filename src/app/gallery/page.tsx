import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Project Gallery | ${COMPANY.name}`,
  description:
    "See before and after photos of roof replacements, repairs, and installations by French Roofing LLC in Damascus, OR and surrounding areas.",
  alternates: { canonical: `${COMPANY.url}/gallery` },
};

const projects = [
  {
    title: "Cora St, Damascus",
    description:
      "Full tear-off and replacement on a home with years of patching and tarp repairs. New architectural shingles, clean flashing, and proper ventilation.",
    before: {
      src: "/images/cora-st-before.webp",
      alt: "Worn roof with patched areas and blue tarp on Cora St, Damascus OR — before French Roofing replacement",
    },
    after: {
      src: "/images/cora-st-after.webp",
      alt: "Brand new shingle roof with clean flashing and vents on Cora St, Damascus OR — after French Roofing replacement",
    },
  },
  {
    title: "Residential Roof Replacement",
    description:
      "Aging three-tab shingles swapped for durable architectural shingles. New ridge cap, clean valleys, and a roof built to handle Oregon weather.",
    before: {
      src: "/images/house-before.webp",
      alt: "Aging residential roof with worn shingles — before French Roofing replacement",
    },
    after: {
      src: "/images/house-after.webp",
      alt: "Freshly installed residential roof with new architectural shingles — after French Roofing replacement",
    },
  },
];

const actionShots = [
  {
    src: "/images/workers-tearoff.webp",
    alt: "French Roofing crew performing tear-off on a residential roof",
    caption: "Tear-off in progress — clean and safe",
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
    caption: "Ridge cap — the finishing touch",
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
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Real projects, real results. Browse before-and-after photos from
            roofing jobs right here in Damascus and the surrounding communities.
          </p>
        </div>
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
                    <p className="text-center text-sm font-medium text-[#d85024] uppercase tracking-wider">
                      After
                    </p>
                  </div>
                </div>
              </div>
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

      {/* ── CTA ── */}
      <CTABanner
        headline="Ready to See Your Roof Transformed?"
        description="Get a free assessment and find out what a new roof could look like on your home."
      />
    </>
  );
}
