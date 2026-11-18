import Image from "next/image";
import Link from "next/link";
import HeroReview from "@/components/reviews/HeroReview";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import {
  formatCompleted,
  listHref,
  projectHref,
  SERVICE_LABELS,
  servicesWithProjects,
  type Project,
  type ProjectService,
} from "@/lib/projects";

/*
  Past projects list (2026-11-18): hero, service tabs, a 12-card grid, numbered pagination. Shared by
  /past-projects, /past-projects/page/[n], and the /past-projects/service/[service] filters, so hundreds of jobs
  stay one click apart instead of one endless scroll.
*/

export function ProjectCard({ p }: { p: Project }) {
  const photo = p.photos[0];
  const when = formatCompleted(p.completed);
  return (
    <article className="group relative overflow-hidden rounded-2xl border-2 border-[#e5e0d6] bg-white shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-gray-100">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-[#092e5e] px-3 py-1 text-sm font-semibold text-white">
          {SERVICE_LABELS[p.service]}
        </span>
        {p.status === "draft" && (
          <span className="absolute right-3 top-3 rounded-md bg-[#d85024] px-3 py-1 text-sm font-bold text-white">DRAFT</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold leading-snug text-[#092e5e]">
          <Link href={projectHref(p)} className="after:absolute after:inset-0">
            {p.title}
          </Link>
        </h3>
        <p className="mt-2 text-base text-gray-600">
          {p.city}, {p.state}
          {when ? ` · ${when}` : ""}
        </p>
      </div>
    </article>
  );
}

function ServiceTabs({ active }: { active?: ProjectService }) {
  const services = servicesWithProjects();
  if (services.length < 2) return null;
  const tab = (href: string, label: string, on: boolean) => (
    <Link
      key={href}
      href={href}
      aria-current={on ? "page" : undefined}
      className={`rounded-full border-2 px-4 py-2 text-base font-semibold transition-colors ${
        on ? "border-[#092e5e] bg-[#092e5e] text-white" : "border-[#e5e0d6] bg-white text-[#092e5e] hover:border-[#092e5e]"
      }`}
    >
      {label}
    </Link>
  );
  return (
    <nav aria-label="Filter projects by service" className="mb-10 flex flex-wrap justify-center gap-3">
      {tab("/past-projects", "All projects", !active)}
      {services.map((s) => tab(listHref(1, s), SERVICE_LABELS[s], active === s))}
    </nav>
  );
}

function Pagination({ page, total, service }: { page: number; total: number; service?: ProjectService }) {
  if (total <= 1) return null;
  const nums = Array.from({ length: total }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === total || Math.abs(n - page) <= 2,
  );
  const cell = "inline-flex min-w-11 h-11 items-center justify-center rounded-lg border-2 px-3 text-base font-semibold";
  return (
    <nav aria-label="Project pages" className="mt-14 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={listHref(page - 1, service)} rel="prev" className={`${cell} border-[#e5e0d6] bg-white text-[#092e5e] hover:border-[#092e5e]`}>
          &larr; Newer
        </Link>
      ) : null}
      {nums.map((n, i) => (
        <span key={n} className="flex items-center gap-2">
          {i > 0 && n - nums[i - 1] > 1 ? <span className="px-1 text-gray-500">…</span> : null}
          {n === page ? (
            <span aria-current="page" className={`${cell} border-[#092e5e] bg-[#092e5e] text-white`}>
              {n}
            </span>
          ) : (
            <Link href={listHref(n, service)} className={`${cell} border-[#e5e0d6] bg-white text-[#092e5e] hover:border-[#092e5e]`}>
              {n}
            </Link>
          )}
        </span>
      ))}
      {page < total ? (
        <Link href={listHref(page + 1, service)} rel="next" className={`${cell} border-[#e5e0d6] bg-white text-[#092e5e] hover:border-[#092e5e]`}>
          Older &rarr;
        </Link>
      ) : null}
    </nav>
  );
}

export default function ProjectsIndex({
  projects,
  page,
  total,
  count,
  service,
}: {
  projects: Project[];
  page: number;
  total: number;
  count: number;
  service?: ProjectService;
}) {
  const label = service ? `${SERVICE_LABELS[service]} Projects` : "Past Projects";
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Past Projects", href: "/past-projects" },
    ...(service ? [{ name: SERVICE_LABELS[service], href: listHref(1, service) }] : []),
    ...(page > 1 ? [{ name: `Page ${page}`, href: listHref(page, service) }] : []),
  ];
  return (
    <>
      <BreadcrumbJsonLd items={crumbs} />

      <section className="bg-[#092e5e] px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            {service ? (
              <>
                {SERVICE_LABELS[service]} <span className="text-[#ffbd59]">Projects</span>
              </>
            ) : (
              <>
                Our <span className="text-[#ffbd59]">Past Projects</span>
              </>
            )}
            {page > 1 ? <span className="mt-2 block text-2xl font-semibold text-white/80">Page {page}</span> : null}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Real jobs from real roofs. Each project shows where we worked, what we did, and photos from the job, from
            Damascus and the towns around it.
          </p>
        </div>
        {page === 1 ? <HeroReview topic={service === "roof-repair" ? "repair" : "replacement"} seed={`past-projects-${service ?? "all"}`} layout="below" /> : null}
      </section>

      <section className="bg-[#fdfcfa] px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <ServiceTabs active={service} />
          <p className="mb-8 text-center text-lg text-gray-600">
            {count} {count === 1 ? "project" : "projects"}
            {total > 1 ? `, page ${page} of ${total}` : ""}. Newest first.
          </p>
          <h2 className="sr-only">{label}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
          <Pagination page={page} total={total} service={service} />
        </div>
      </section>
    </>
  );
}
