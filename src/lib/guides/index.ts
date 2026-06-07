import type { Cluster, Guide } from "./types";
import { mossCareCluster, mossCareGuides } from "./moss-care";

// Add new clusters here as they're written.
// Strategy + build order: operations/seo/topic-cluster-map.md
export const CLUSTERS: Cluster[] = [mossCareCluster];

export const GUIDES: Guide[] = [...mossCareGuides];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

export function getCluster(id: string): Cluster | undefined {
  return CLUSTERS.find((c) => c.id === id);
}

export function getClusterGuides(clusterId: string): Guide[] {
  return GUIDES.filter((g) => g.clusterId === clusterId);
}

export function getPillar(clusterId: string): Guide | undefined {
  return GUIDES.find((g) => g.clusterId === clusterId && g.isPillar);
}
