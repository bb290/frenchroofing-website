import type { MetadataRoute } from "next";
import { SERVICES, SERVICE_AREAS, COMPANY } from "@/lib/constants";
import { GUIDES } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = COMPANY.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/estimate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/financing`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${base}/guides/${g.slug}`,
    lastModified: new Date(g.datePublished),
    changeFrequency: "monthly" as const,
    priority: g.isPillar ? 0.8 : 0.6,
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

  return [...staticPages, ...servicePages, ...serviceCityPages, ...guidePages];
}
