import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import { COMPANY } from "@/lib/constants";
import { CLUSTERS, getClusterGuides, getPillar } from "@/lib/guides";

export const metadata: Metadata = {
  title: `Roof Care Guides for Oregon Homeowners | ${COMPANY.name}`,
  description:
    "Straight answers about moss, maintenance, repairs, and roof care in the Pacific Northwest. Written by the French Roofing crew in Damascus, OR. No jargon, no scare tactics.",
  alternates: { canonical: `${COMPANY.url}/guides` },
};

export default function GuidesIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
        ]}
      />

      {/* ── Header ── */}
      <section className="bg-[#092e5e] py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[#ffbd59] font-semibold text-sm uppercase tracking-wider mb-3">
            Roof Care Guides
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
            Everything We Know About Oregon Roofs
          </h1>
          <p className="text-lg text-gray-300">
            Twenty years on Pacific Northwest roofs taught us a few things.
            These guides share them straight, the way we&apos;d explain it over
            the fence. No jargon, no scare tactics, no pressure.
          </p>
        </div>
      </section>

      {/* ── Clusters ── */}
      <section className="py-20 px-4 bg-[#fdfcfa]">
        <div className="mx-auto max-w-4xl space-y-16">
          {CLUSTERS.map((cluster) => {
            const pillar = getPillar(cluster.id);
            const supporting = getClusterGuides(cluster.id).filter(
              (g) => !g.isPillar,
            );
            return (
              <div key={cluster.id}>
                <h2 className="text-3xl font-semibold text-[#092e5e] mb-3">
                  {cluster.name}
                </h2>
                <p className="text-[#6b6a67] mb-8">{cluster.description}</p>

                {pillar && (
                  <Link
                    href={`/guides/${pillar.slug}`}
                    className="block rounded-xl border-2 border-[#ffbd59] bg-[#f5f1ea] p-6 mb-6 hover:bg-[#ffbd59]/20 transition-colors"
                  >
                    <p className="text-xs font-medium uppercase tracking-wider text-[#d85024] mb-2">
                      Start here
                    </p>
                    <p className="text-xl font-semibold text-[#092e5e] mb-1">
                      {pillar.title}
                    </p>
                    <p className="text-sm text-[#6b6a67]">{pillar.description}</p>
                  </Link>
                )}

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {supporting.map((g) => (
                    <li key={g.slug}>
                      <Link
                        href={`/guides/${g.slug}`}
                        className="block h-full rounded-xl border border-[#e5e0d6] bg-white px-5 py-4 hover:border-[#ffbd59] transition-colors"
                      >
                        <span className="font-medium text-[#092e5e]">
                          {g.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <CTABanner
        headline="Questions About Your Roof?"
        description="Schedule a FREE roof assessment and get answers about your actual roof, not a hypothetical one."
      />
    </>
  );
}
