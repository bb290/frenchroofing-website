import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";
import { getEbook } from "@/lib/ebooks";
import { GUIDES, getCluster, getClusterGuides, getGuide, getPillar } from "@/lib/guides";
import { ogImage } from "@/lib/og";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: `${guide.metaTitle ?? guide.title} | ${COMPANY.name}`,
    description: guide.description,
    alternates: { canonical: `${COMPANY.url}/guides/${guide.slug}` },
    openGraph: {
      title: guide.title,
      type: "article",
      images: ogImage(guide.title, guide.ogPhoto),
    },
  };
}

/** Render [text](href) inline links inside a paragraph string. */
function renderInline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    return (
      <Link
        key={i}
        href={match[2]}
        className="font-medium text-[#d85024] hover:underline"
      >
        {match[1]}
      </Link>
    );
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const cluster = getCluster(guide.clusterId);
  const pillar = getPillar(guide.clusterId);
  const ebook = getEbook(guide.clusterId);
  const siblings = getClusterGuides(guide.clusterId).filter(
    (g) => g.slug !== guide.slug,
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: guide.title, href: `/guides/${guide.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={guide.title}
        description={guide.description}
        href={`/guides/${guide.slug}`}
        datePublished={guide.datePublished}
      />

      {/* ── Header ── */}
      <section className="bg-[#fdfcfa] pt-16 pb-12 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-[#d85024] font-semibold text-sm uppercase tracking-wider mb-3">
            {cluster?.name ?? "Roof Care Guides"}
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#092e5e] leading-tight mb-6">
            {guide.title}
          </h1>
          {!guide.isPillar && pillar && (
            <p className="text-sm text-[#6b6a67] mb-6">
              Part of{" "}
              <Link
                href={`/guides/${pillar.slug}`}
                className="font-medium text-[#d85024] hover:underline"
              >
                {pillar.shortTitle}
              </Link>
            </p>
          )}
          <div className="space-y-4">
            {guide.intro.map((p, i) => (
              <p key={i} className="text-lg text-[#3e3d3b] leading-relaxed">
                {renderInline(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {guide.heroImage && (
        <section className="px-4 pb-4 bg-[#fdfcfa]">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src={guide.heroImage.src}
                alt={guide.heroImage.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Body ── */}
      <article className="py-12 px-4 bg-[#fdfcfa]">
        <div className="mx-auto max-w-3xl space-y-12">
          {guide.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#092e5e] mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-[17px] text-[#3e3d3b] leading-relaxed">
                    {renderInline(p)}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-4 space-y-3">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-[9px] h-2 w-2 flex-shrink-0 rounded-full bg-[#ffbd59]" />
                      <span className="text-[17px] text-[#3e3d3b] leading-relaxed">
                        {renderInline(b)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {section.image && (
                <div className="mt-6 relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </section>
          ))}
        </div>
      </article>

      {/* ── Ebook download ── */}
      {ebook && (
        <section className="px-4 pb-4 bg-[#fdfcfa]">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border-2 border-[#ffbd59] bg-[#f5f1ea] p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-semibold text-[#092e5e] mb-1">
                  Take this whole series with you
                </p>
                <p className="text-sm text-[#6b6a67]">
                  {ebook.title} is available as a free PDF: every article in
                  this series in one tidy, printable handbook.
                </p>
              </div>
              <a
                href={`/downloads/${ebook.file}`}
                download
                className="inline-flex items-center justify-center rounded-lg bg-[#ffbd59] px-6 py-3 text-sm font-semibold text-[#092e5e] hover:bg-[#f0ad40] transition-colors flex-shrink-0"
              >
                Download the PDF
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <FAQSection title="Quick Answers" faqs={guide.faqs} />

      {/* ── Cluster links ── */}
      {siblings.length > 0 && (
        <section className="py-16 px-4 bg-[#fdfcfa]">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-semibold text-[#092e5e] mb-6">
              More from this series
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {siblings.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="block h-full rounded-xl border border-[#e5e0d6] bg-[#f5f1ea] px-5 py-4 text-[#092e5e] font-medium hover:border-[#ffbd59] transition-colors"
                  >
                    {g.isPillar ? `Start here: ${g.shortTitle}` : g.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <CTABanner headline={guide.cta.headline} description={guide.cta.description} />
    </>
  );
}
