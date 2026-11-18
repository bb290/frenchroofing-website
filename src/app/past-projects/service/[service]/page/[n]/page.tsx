import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTABanner from "@/components/CTABanner";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { COMPANY } from "@/lib/constants";
import { listHref, pageCount, pageSlice, projectsFor, SERVICE_LABELS, servicesWithProjects, type ProjectService } from "@/lib/projects";

// Pages 2+ of one service's projects. Page 1 is /past-projects/service/<service> (page/1 redirects there).
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesWithProjects().flatMap((service) => {
    const total = pageCount(projectsFor(service));
    return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ service, n: String(i + 2) }));
  });
}

export async function generateMetadata({ params }: { params: Promise<{ service: string; n: string }> }): Promise<Metadata> {
  const { service, n } = await params;
  const label = SERVICE_LABELS[service as ProjectService];
  if (!label) return {};
  return {
    title: `${label} Projects (Page ${n})`,
    description: `Page ${n} of the ${label.toLowerCase()} jobs French Roofing has finished around Damascus, OR.`,
    alternates: { canonical: `${COMPANY.url}${listHref(Number(n), service as ProjectService)}` },
  };
}

export default async function ServiceProjectsPageN({ params }: { params: Promise<{ service: string; n: string }> }) {
  const p = await params;
  const service = p.service as ProjectService;
  const n = Number(p.n);
  const list = projectsFor(service);
  const total = pageCount(list);
  if (!SERVICE_LABELS[service] || !Number.isInteger(n) || n < 2 || n > total) notFound();
  return (
    <>
      <ProjectsIndex projects={pageSlice(list, n)} page={n} total={total} count={list.length} service={service} />
      <CTABanner headline="Want Your Roof on This Page Next?" description="Get a free roof assessment and an honest answer about what your roof needs." />
    </>
  );
}
