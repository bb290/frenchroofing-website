import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY, SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Roofing Services in Damascus, OR | ${COMPANY.name}`,
  description:
    "Roof replacement, repair, cleaning, and inspections from a family-owned team in Damascus, OR. Licensed (CCB #203933), CertainTeed Certified, and financing available.",
};

const serviceImages: Record<string, { src: string; alt: string }> = {
  "roof-replacement": {
    src: "/images/install-shingles.webp",
    alt: "French Roofing crew installing new shingles during a full roof replacement in Damascus, OR",
  },
  "roof-repair": {
    src: "/images/cracked-flashing.webp",
    alt: "Cracked flashing on a residential roof in Clackamas County needing repair",
  },
  "roof-cleaning": {
    src: "/images/worker-ridge.webp",
    alt: "French Roofing worker on a roof ridge performing cleaning and maintenance",
  },
  "roof-inspections": {
    src: "/images/team-plywood-install.webp",
    alt: "French Roofing team inspecting roof decking during a thorough roof inspection",
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      {/* ── Hero ── */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Roofing Services You Can Count On
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            From a full tear-off to a quick repair, we handle every roofing need
            with quality materials and honest communication. Based in Damascus, OR
            and serving the greater Portland metro area.
          </p>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="py-20 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service) => {
              const img = serviceImages[service.slug];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-gray-200 overflow-hidden hover:border-[#d85024] hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#092e5e] group-hover:text-[#d85024] transition-colors mb-2">
                      {service.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <span className="inline-flex text-sm font-semibold text-[#d85024]">
                      Learn more &rarr;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-lg font-semibold text-[#092e5e] mb-4">
            Why Homeowners Choose French Roofing
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-[#3e3d3b]">
            <span>Licensed &amp; Bonded (CCB #{COMPANY.ccb})</span>
            <span>&middot;</span>
            <span>CertainTeed Certified</span>
            <span>&middot;</span>
            <span>10+ Years Experience</span>
            <span>&middot;</span>
            <span>0% Financing Available</span>
            <span>&middot;</span>
            <span>Family-Owned</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTABanner />
    </>
  );
}
