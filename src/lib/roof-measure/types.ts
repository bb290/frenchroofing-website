export type SlopeId = "flat" | "shallow" | "medium" | "steep";
export type ComplexityId = "standard" | "moderate" | "complex";

export type RoofMeasurement = {
  provider: "google-solar" | "eagleview" | "demo";
  address: string;
  lat: number;
  lng: number;
  /** Sloped roof surface in square feet, before waste. */
  roofAreaSqft: number;
  /** roofAreaSqft / 100, rounded to one decimal. */
  squares: number;
  /** Predominant pitch as rise over 12, or null when the source has none. */
  pitch: number | null;
  slope: SlopeId;
  facetCount: number | null;
  complexity: ComplexityId;
  /** Suggested waste as a fraction, e.g. 0.12. */
  waste: number;
  imageryDate: string | null;
  /** Rough confidence label for the homeowner-facing note. */
  quality: "high" | "medium" | "low";
};

export type ProviderResult = Omit<RoofMeasurement, "slope" | "complexity" | "waste" | "squares">;
