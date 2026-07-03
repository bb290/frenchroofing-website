// Blog content model. Mirrors the guides system (see ../guides/types.ts) but
// for the recurring article stream: standalone posts, no cluster membership.
// Migrated from blog.frenchroofing.com (third-party vendor) 2026-07;
// new posts are written weekly by the fr-blog skill.

import type { GuideSection } from "../guides/types";

export type BlogPost = {
  slug: string;
  /** Page H1. */
  title: string;
  /** <title> override; defaults to title. */
  metaTitle?: string;
  metaDescription: string;
  intro: string[];
  sections: GuideSection[];
  /** Optional; renders "Quick Answers" + feeds FAQPage schema when present. */
  faqs?: { question: string; answer: string }[];
  heroImage?: { src: string; alt: string };
  /** JPEG/PNG only (OG renderer cannot read WebP). Falls back to a default. */
  ogPhoto?: string;
  /** Slug of the deeper evergreen guide this post links up to, if one exists. */
  relatedGuide?: string;
  cta: { headline: string; description: string };
  datePublished: string;
};
