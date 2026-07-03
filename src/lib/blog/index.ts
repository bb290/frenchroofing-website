import type { BlogPost } from "./types";
import postsJson from "./posts.json";

// posts.json is the article store: migrated vendor posts + weekly fr-blog
// output, assembled and validated before commit. Newest first.
export const POSTS: BlogPost[] = (postsJson as BlogPost[])
  .slice()
  .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}
