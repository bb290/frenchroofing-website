import type { Cluster, Guide } from "./types";
import { leaksRepairCluster, leaksRepairGuides } from "./leaks-repair";
import { mossCareCluster, mossCareGuides } from "./moss-care";
import { replacementCluster, replacementGuides } from "./replacement-decision";
import { roofing101Cluster, roofing101Guides } from "./roofing-101";

// Add new clusters here as they're written.
// Strategy + build order: operations/seo/topic-cluster-map.md
export const CLUSTERS: Cluster[] = [
  roofing101Cluster,
  replacementCluster,
  leaksRepairCluster,
  mossCareCluster,
];

export const GUIDES: Guide[] = [
  ...roofing101Guides,
  ...replacementGuides,
  ...leaksRepairGuides,
  ...mossCareGuides,
];

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
