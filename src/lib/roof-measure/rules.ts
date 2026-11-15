import type { ComplexityId, ProviderResult, RoofMeasurement, SlopeId } from "./types";

// Damascus, OR. Quotes outside SERVICE_RADIUS_MILES are refused so the paid
// measurement APIs only run for homes we actually serve.
export const HOME_BASE = { lat: 45.4176, lng: -122.459 };
export const SERVICE_RADIUS_MILES = 30;

export function milesFromHomeBase(lat: number, lng: number) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat - HOME_BASE.lat);
  const dLng = toRad(lng - HOME_BASE.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(HOME_BASE.lat)) * Math.cos(toRad(lat)) * Math.sin(dLng / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.sqrt(a));
}

export function slopeFromPitch(pitch: number | null): SlopeId {
  if (pitch === null) return "medium";
  if (pitch < 2) return "flat";
  if (pitch < 5) return "shallow";
  if (pitch < 9) return "medium";
  return "steep";
}

// Pitch drives most of the labor difference; lots of facets (valleys, dormers,
// hips) bumps it one tier. Thresholds are a starting point for Sean to tune.
export function complexityFor(slope: SlopeId, pitch: number | null, facetCount: number | null): ComplexityId {
  const tiers: ComplexityId[] = ["standard", "moderate", "complex"];
  let tier = slope === "steep" ? (pitch !== null && pitch >= 10 ? 2 : 1) : 0;
  if (facetCount !== null && facetCount >= 15) tier += 1;
  return tiers[Math.min(tier, 2)];
}

export const WASTE_BY_COMPLEXITY: Record<ComplexityId, number> = {
  standard: 0.1,
  moderate: 0.12,
  complex: 0.15,
};

export function finishMeasurement(raw: ProviderResult): RoofMeasurement {
  const slope = slopeFromPitch(raw.pitch);
  const complexity = complexityFor(slope, raw.pitch, raw.facetCount);
  return {
    ...raw,
    roofAreaSqft: Math.round(raw.roofAreaSqft),
    squares: Math.round(raw.roofAreaSqft / 10) / 10,
    slope,
    complexity,
    waste: WASTE_BY_COMPLEXITY[complexity],
  };
}
