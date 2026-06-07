// Guide content model for the topic-cluster system.
// See operations/seo/topic-cluster-map.md for the strategy this implements.

export type GuideSection = {
  /** H2, question-form where natural. The first sentences under each
   *  heading should be a complete, citable answer (AEO). */
  heading: string;
  /** Body paragraphs. Supports [text](href) inline links. */
  paragraphs: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
  image?: { src: string; alt: string };
};

export type Guide = {
  slug: string;
  clusterId: string;
  isPillar?: boolean;
  /** Page H1. */
  title: string;
  /** <title> override; defaults to title. */
  metaTitle?: string;
  /** Meta description. */
  description: string;
  /** Short label used when other guides link to this one. */
  shortTitle: string;
  intro: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
  heroImage?: { src: string; alt: string };
  /** JPEG/PNG only (OG renderer cannot read WebP). */
  ogPhoto: string;
  cta: { headline: string; description: string };
  datePublished: string;
};

export type Cluster = {
  id: string;
  name: string;
  /** One neighborly sentence for the /guides index. */
  description: string;
  pillarSlug: string;
};
