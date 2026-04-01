import type { MetadataRoute } from "next";
import { SERVICES, SERVICE_AREAS, COMPANY } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/service-areas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/estimate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/financing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const areaPages: MetadataRoute.Sitemap = SERVICE_AREAS.all.map((a) => ({
    url: `${base}/service-areas/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: SERVICE_AREAS.priority.includes(a.slug) ? 0.9 : 0.7,
  }));

  return [...staticPages, ...servicePages, ...areaPages];
}
