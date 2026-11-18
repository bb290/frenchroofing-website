import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CTABanner from "@/components/CTABanner";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { COMPANY } from "@/lib/constants";
import { listHref, pageCount, pageSlice, PROJECTS } from "@/lib/projects";

// Pages 2+ of /past-projects. Page 1 lives at /past-projects (/past-projects/page/1 redirects there in next.config.ts).
export const dynamicParams = false;

export function generateStaticParams() {
  const total = pageCount(PROJECTS);
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({ n: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const n = Number((await params).n);
  return {
    title: `Past Roofing Projects (Page ${n})`,
    description: `Page ${n} of the roof replacements and repairs French Roofing has finished around Damascus, OR. Photos, materials, and what we did on each job.`,
    alternates: { canonical: `${COMPANY.url}${listHref(n)}` },
  };
}

export default async function PastProjectsPageN({ params }: { params: Promise<{ n: string }> }) {
  const n = Number((await params).n);
  const total = pageCount(PROJECTS);
  if (!Number.isInteger(n) || n < 2 || n > total) notFound();
  return (
    <>
      <ProjectsIndex projects={pageSlice(PROJECTS, n)} page={n} total={total} count={PROJECTS.length} />
      <CTABanner headline="Want Your Roof on This Page Next?" description="Get a free roof assessment and an honest answer about what your roof needs." />
    </>
  );
}
