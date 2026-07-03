import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Anchor Turbopack to this project's root so Next doesn't pick up the
  // stray /Users/unbound24/package-lock.json as the workspace root.
  turbopack: {
    root: process.cwd(),
  },
  // 301s for retired routes. The old /service-areas/[city] pages were
  // replaced by the per-service city pages under /services/[service]/[city];
  // roof-replacement is the closest content match for the old city pages.
  async redirects() {
    return [
      {
        source: "/service-areas",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/service-areas/:city",
        destination: "/services/roof-replacement/:city",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/estimate",
        permanent: true,
      },
      // Blog moved in-house 2026-07 (was a third-party service on the
      // blog. subdomain). Once blog.frenchroofing.com is added as a domain
      // on this Vercel project, these host-based rules 301 every old
      // subdomain URL to the same path on www, preserving link equity.
      {
        source: "/",
        has: [{ type: "host", value: "blog.frenchroofing.com" }],
        destination: "https://www.frenchroofing.com/blog",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "blog.frenchroofing.com" }],
        destination: "https://www.frenchroofing.com/:path*",
        permanent: true,
      },
      {
        source: "/llm-info",
        destination: "/llms.txt",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
