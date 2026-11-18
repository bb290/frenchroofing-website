import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTABanner from "@/components/CTABanner";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { COMPANY } from "@/lib/constants";
import { listHref, pageCount, pageSlice, projectsFor, SERVICE_LABELS, servicesWithProjects, type ProjectService } from "@/lib/projects";

// /past-projects/service/<service>: page 1 of one service's projects. Only services that have projects get a route.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesWithProjects().map((service) => ({ service }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const service = (await params).service as ProjectService;
  const label = SERVICE_LABELS[service];
  if (!label) return {};
  return {
    title: `${label} Projects`,
    description: `${label} jobs French Roofing has finished around Damascus, OR, newest first. Photos, materials, and what we did on each one.`,
    alternates: { canonical: `${COMPANY.url}${listHref(1, service)}` },
  };
}

export default async function ServiceProjectsPage({ params }: { params: Promise<{ service: string }> }) {
  const service = (await params).service as ProjectService;
  const list = projectsFor(service);
  if (!SERVICE_LABELS[service] || !list.length) notFound();
  return (
    <>
      <ProjectsIndex projects={pageSlice(list, 1)} page={1} total={pageCount(list)} count={list.length} service={service} />
      <CTABanner headline="Want Your Roof on This Page Next?" description="Get a free roof assessment and an honest answer about what your roof needs." />
    </>
  );
}
