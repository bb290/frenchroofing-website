import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { COMPANY } from "@/lib/constants";
import { POSTS, getPost } from "@/lib/blog";
import { getGuide } from "@/lib/guides";
import { ogImage } from "@/lib/og";

// Default OG photo for posts without their own (JPEG/PNG only).
const DEFAULT_OG_PHOTO = "/images/crew-putting-on-harnesses-safety-first.jpeg";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.metaTitle ?? post.title} | ${COMPANY.name}`,
    description: post.metaDescription,
    alternates: { canonical: `${COMPANY.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      type: "article",
      images: ogImage(post.title, post.ogPhoto ?? DEFAULT_OG_PHOTO),
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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relatedGuide = post.relatedGuide ? getGuide(post.relatedGuide) : undefined;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.metaDescription}
        href={`/blog/${post.slug}`}
        datePublished={post.datePublished}
      />

      {/* ── Header ── */}
      <section className="bg-[#fdfcfa] pt-16 pb-12 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-[#d85024] font-semibold text-sm uppercase tracking-wider mb-3">
            The French Roofing Blog
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#092e5e] leading-tight mb-6">
            {post.title}
          </h1>
          <div className="space-y-4">
            {post.intro.map((p, i) => (
              <p key={i} className="text-lg text-[#3e3d3b] leading-relaxed">
                {renderInline(p)}
              </p>
            ))}
          </div>
        </div>
      </section>

      {post.heroImage && (
        <section className="px-4 pb-4 bg-[#fdfcfa]">
          <div className="mx-auto max-w-4xl">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <Image
                src={post.heroImage.src}
                alt={post.heroImage.alt}
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
          {post.sections.map((section, i) => (
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

      {/* ── Related guide ── */}
      {relatedGuide && (
        <section className="px-4 pb-4 bg-[#fdfcfa]">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl border-2 border-[#ffbd59] bg-[#f5f1ea] p-6">
              <p className="font-semibold text-[#092e5e] mb-1">
                Want the full picture?
              </p>
              <p className="text-sm text-[#6b6a67]">
                This topic gets the deep-dive treatment in{" "}
                <Link
                  href={`/guides/${relatedGuide.slug}`}
                  className="font-medium text-[#d85024] hover:underline"
                >
                  {relatedGuide.shortTitle}
                </Link>
                , part of our roof care guide series.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      {post.faqs && post.faqs.length > 0 && (
        <FAQSection title="Quick Answers" faqs={post.faqs} />
      )}

      {/* ── CTA ── */}
      <CTABanner headline={post.cta.headline} description={post.cta.description} />
    </>
  );
}
