import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import CTABanner from "@/components/CTABanner";
import FAQSection from "@/components/FAQSection";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ProjectCard } from "@/components/projects/ProjectsIndex";
import { COMPANY } from "@/lib/constants";
import {
  cityServiceHref,
  formatCompleted,
  getProject,
  listHref,
  PROJECTS,
  projectHref,
  relatedProjects,
  SERVICE_LABELS,
  type Project,
} from "@/lib/projects";

/*
  One past project (2026-11-18). Answer-first summary, a facts list, photos with captions, what we did, then links
  to the matching service and city pages. Drafts only exist off production (see src/lib/projects.ts).
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

const abs = (src: string) => (src.startsWith("http") ? src : `${COMPANY.url}${src}`);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary.length > 160 ? `${p.summary.slice(0, 157).replace(/\s+\S*$/, "")}…` : p.summary,
    alternates: { canonical: `${COMPANY.url}${projectHref(p)}` },
    openGraph: { title: p.title, type: "article", images: [{ url: p.photos[0].src, alt: p.photos[0].alt }] },
    ...(p.status === "draft" ? { robots: { index: false, follow: false } } : {}),
  };
}

function ProjectJsonLd({ p }: { p: Project }) {
  const url = `${COMPANY.url}${projectHref(p)}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.summary,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: p.photos.map((ph) => abs(ph.src)),
    datePublished: p.addedAt,
    dateModified: p.addedAt,
    about: { "@type": "Service", name: SERVICE_LABELS[p.service], provider: { "@id": `${COMPANY.url}/#organization` } },
    contentLocation: {
      "@type": "Place",
      name: `${p.city}, ${p.state}`,
      address: { "@type": "PostalAddress", addressLocality: p.city, addressRegion: p.state, addressCountry: "US" },
    },
    author: { "@id": `${COMPANY.url}/#organization` },
    publisher: { "@id": `${COMPANY.url}/#organization` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();

  const when = formatCompleted(p.completed);
  const before = p.photos.find((ph) => ph.stage === "before");
  const after = p.photos.find((ph) => ph.stage === "after");
  // Slider only for full replacements and major cleanings (Brittany, 2026-11-18): small jobs look alike before and after.
  const pair = before && after && (p.service === "roof-replacement" || p.service === "roof-cleaning") ? { before, after } : null;
  const grid = pair ? p.photos.filter((ph) => ph !== before && ph !== after) : p.photos;
  const cityHref = cityServiceHref(p);
  const related = relatedProjects(p);
  const facts: [string, string][] = [
    ["Service", SERVICE_LABELS[p.service]],
    ["Location", `${p.city}, ${p.state}`],
    ...(when ? ([["Completed", when]] as [string, string][]) : []),
    ...(p.material ? ([["Material", p.material]] as [string, string][]) : []),
    ...(p.roofType ? ([["Roof type", p.roofType]] as [string, string][]) : []),
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Past Projects", href: "/past-projects" },
          { name: p.title, href: projectHref(p) },
        ]}
      />
      <ProjectJsonLd p={p} />

      {p.status === "draft" && (
        <div className="bg-[#d85024] px-4 py-3 text-center text-base font-bold text-white">
          DRAFT: only visible on preview. Not live on frenchroofing.com until approved.
        </div>
      )}

      <article>
        <header className="bg-[#092e5e] px-4 py-14">
          <div className="mx-auto max-w-4xl">
            <nav aria-label="Breadcrumb" className="text-base text-white/80">
              <Link href="/past-projects" className="hover:underline">
                Past Projects
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href={listHref(1, p.service)} className="hover:underline">
                {SERVICE_LABELS[p.service]}
              </Link>
            </nav>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">{p.title}</h1>
            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-white/90">{p.summary}</p>
          </div>
        </header>

        <section className="bg-[#fdfcfa] px-4 py-14">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div>
              {pair ? (
                <figure className="mx-auto mb-10 max-w-xl">
                  <BeforeAfterSlider before={pair.before} after={pair.after} />
                  <figcaption className="mt-3 text-center text-base text-gray-600">
                    Drag to compare: before (left) and after (right).
                  </figcaption>
                </figure>
              ) : null}
              {grid.length ? (
                <div className="grid gap-6 sm:grid-cols-2">
                  {grid.map((ph, i) => (
                    <figure key={ph.src} className={i === 0 && grid.length % 2 === 1 ? "sm:col-span-2" : ""}>
                      <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${i === 0 && grid.length % 2 === 1 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                        <Image
                          src={ph.src}
                          alt={ph.alt}
                          fill
                          priority={i === 0 && !pair}
                          sizes={i === 0 && grid.length % 2 === 1 ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
                          className="object-cover"
                        />
                      </div>
                      <figcaption className="mt-2 text-base text-gray-600">{ph.caption ?? ph.alt}</figcaption>
                    </figure>
                  ))}
                </div>
              ) : null}

              <h2 className="mt-12 text-3xl font-bold text-[#092e5e]">What we did</h2>
              <ul className="mt-5 space-y-3">
                {p.scope.map((s) => (
                  <li key={s} className="flex gap-3 text-lg leading-relaxed text-[#3e3d3b]">
                    <span aria-hidden="true" className="mt-2.5 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-[#d85024]" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
              {p.body?.map((para) => (
                <p key={para.slice(0, 40)} className="mt-6 text-lg leading-relaxed text-[#3e3d3b]">
                  {para}
                </p>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border-2 border-[#e5e0d6] bg-white p-6">
                <h2 className="text-xl font-bold text-[#092e5e]">Project details</h2>
                <dl className="mt-4 space-y-3">
                  {facts.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-sm font-semibold uppercase tracking-wide text-gray-500">{k}</dt>
                      <dd className="text-lg text-[#3e3d3b]">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 space-y-2 border-t border-[#e5e0d6] pt-5 text-base">
                  <Link href={`/services/${p.service}`} className="block font-semibold text-[#c04520] hover:underline">
                    {`About our ${SERVICE_LABELS[p.service].toLowerCase()} service →`}
                  </Link>
                  {cityHref ? (
                    <Link href={cityHref} className="block font-semibold text-[#c04520] hover:underline">
                      {SERVICE_LABELS[p.service]} in {p.city} &rarr;
                    </Link>
                  ) : null}
                  <Link href="/estimate" className="block font-semibold text-[#c04520] hover:underline">
                    Schedule a FREE roof assessment &rarr;
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </article>

      {p.faqs?.length ? <FAQSection title={`${SERVICE_LABELS[p.service]} in ${p.city}: questions`} faqs={p.faqs} /> : null}

      {related.length ? (
        <section className="bg-[#f5f1ea] px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-[#092e5e]">More projects</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ProjectCard key={r.slug} p={r} />
              ))}
            </div>
            <p className="mt-10 text-center">
              <Link href="/past-projects" className="text-lg font-semibold text-[#c04520] hover:underline">
                See all past projects &rarr;
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      <CTABanner
        headline={`Need ${SERVICE_LABELS[p.service].toLowerCase()} work in ${p.city}?`}
        description="Get a free roof assessment and an honest answer about what your roof needs."
      />
    </>
  );
}
