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
      // Blog lives on its own subdomain.
      {
        source: "/blog",
        destination: "https://blog.frenchroofing.com",
        permanent: true,
      },
      {
        source: "/blog/:path*",
        destination: "https://blog.frenchroofing.com",
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
