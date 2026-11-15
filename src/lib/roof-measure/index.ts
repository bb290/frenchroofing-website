import { geocode, measureDemo, measureWithEagleView, measureWithGoogleSolar, MeasureError } from "./providers";
import { finishMeasurement, milesFromHomeBase, SERVICE_RADIUS_MILES } from "./rules";
import type { RoofMeasurement } from "./types";

export { MeasureError };
export type { RoofMeasurement };

/**
 * ROOF_MEASURE_PROVIDER picks the data source:
 *   google-solar (default when GOOGLE_MAPS_API_KEY is set), eagleview, or demo.
 * demo never runs in production builds.
 */
export function activeProvider() {
  const chosen = process.env.ROOF_MEASURE_PROVIDER;
  if (chosen === "demo") return process.env.NODE_ENV === "production" ? null : "demo";
  if (chosen === "eagleview") return "eagleview";
  if (chosen === "google-solar" || process.env.GOOGLE_MAPS_API_KEY) return "google-solar";
  return null;
}

export async function measureRoof(address: string): Promise<RoofMeasurement> {
  const provider = activeProvider();
  if (!provider) throw new MeasureError("not_configured", "No roof measurement provider configured");
  if (provider === "demo") return finishMeasurement(measureDemo(address));

  const place = await geocode(address);
  if (milesFromHomeBase(place.lat, place.lng) > SERVICE_RADIUS_MILES) {
    throw new MeasureError("out_of_area", "That address is outside our service area");
  }
  const raw = provider === "eagleview" ? await measureWithEagleView(place) : await measureWithGoogleSolar(place);
  return finishMeasurement(raw);
}
