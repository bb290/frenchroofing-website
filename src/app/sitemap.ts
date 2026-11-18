import type { MetadataRoute } from "next";
import { SERVICES, SERVICE_AREAS, COMPANY } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";
import { POSTS } from "@/lib/blog";
import { listHref, pageCount, PROJECTS, projectHref, projectsFor, servicesWithProjects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/estimate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/financing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(g.datePublished),
    changeFrequency: "monthly" as const,
    priority: g.isPillar ? 0.8 : 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.datePublished),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const serviceCityPages: MetadataRoute.Sitemap = SERVICES.flatMap((s) =>
    SERVICE_AREAS.all.map((a) => ({
      url: `${base}/services/${s.slug}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: SERVICE_AREAS.priority.includes(a.slug) ? 0.8 : 0.6,
    }))
  );

  // Past projects (2026-11-18): list pages, service filters, and one page per published project. Drafts never reach
  // production, so they are never listed here (src/lib/projects.ts).
  const listPages = [
    ...Array.from({ length: pageCount(PROJECTS) }, (_, i) => listHref(i + 1)),
    ...servicesWithProjects().flatMap((s) =>
      Array.from({ length: pageCount(projectsFor(s)) }, (_, i) => listHref(i + 1, s)),
    ),
  ];
  const projectListPages: MetadataRoute.Sitemap = listPages.map((href, i) => ({
    url: `${base}${href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: i === 0 ? 0.7 : 0.5,
  }));
  const projectPages: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${base}${projectHref(p)}`,
    lastModified: new Date(p.addedAt),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...serviceCityPages, ...guidePages, ...blogPages, ...projectListPages, ...projectPages];
}
