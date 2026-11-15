import type { ProviderResult } from "./types";

const SQFT_PER_M2 = 10.7639;

export class MeasureError extends Error {
  constructor(
    public code: "not_found" | "out_of_area" | "not_configured" | "upstream",
    message: string,
  ) {
    super(message);
  }
}

export type Geocoded = { address: string; lat: number; lng: number };

export async function geocode(address: string): Promise<Geocoded> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new MeasureError("not_configured", "GOOGLE_MAPS_API_KEY is not set");
  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("address", address);
  url.searchParams.set("components", "country:US");
  url.searchParams.set("key", key);
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  const hit = data.results?.[0];
  if (data.status !== "OK" || !hit || !hit.types?.some((t: string) => t === "street_address" || t === "premise" || t === "subpremise")) {
    throw new MeasureError("not_found", "We couldn't find that street address");
  }
  return {
    address: hit.formatted_address,
    lat: hit.geometry.location.lat,
    lng: hit.geometry.location.lng,
  };
}

// ── Google Solar API (buildingInsights): synchronous, one building per call ──

type SolarSegment = { pitchDegrees?: number; stats?: { areaMeters2?: number } };

export async function measureWithGoogleSolar(place: Geocoded): Promise<ProviderResult> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) throw new MeasureError("not_configured", "GOOGLE_MAPS_API_KEY is not set");
  const url = new URL("https://solar.googleapis.com/v1/buildingInsights:findClosest");
  url.searchParams.set("location.latitude", String(place.lat));
  url.searchParams.set("location.longitude", String(place.lng));
  url.searchParams.set("requiredQuality", "MEDIUM");
  url.searchParams.set("key", key);
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) throw new MeasureError("not_found", "No roof data for this address yet");
  if (!res.ok) throw new MeasureError("upstream", `Solar API ${res.status}`);
  const data = await res.json();

  const segments: SolarSegment[] = data.solarPotential?.roofSegmentStats ?? [];
  const areaM2: number =
    data.solarPotential?.wholeRoofStats?.areaMeters2 ??
    segments.reduce((sum, s) => sum + (s.stats?.areaMeters2 ?? 0), 0);
  if (!areaM2) throw new MeasureError("not_found", "No roof data for this address yet");

  // Area-weighted pitch across segments, converted from degrees to rise/12.
  let weighted = 0;
  let weight = 0;
  for (const s of segments) {
    const a = s.stats?.areaMeters2 ?? 0;
    if (s.pitchDegrees === undefined || !a) continue;
    weighted += Math.tan((s.pitchDegrees * Math.PI) / 180) * 12 * a;
    weight += a;
  }
  const d = data.imageryDate;
  return {
    provider: "google-solar",
    address: place.address,
    lat: place.lat,
    lng: place.lng,
    roofAreaSqft: areaM2 * SQFT_PER_M2,
    pitch: weight ? Math.round(weighted / weight) : null,
    facetCount: segments.length || null,
    imageryDate: d ? `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}` : null,
    quality: data.imageryQuality === "HIGH" ? "high" : data.imageryQuality === "MEDIUM" ? "medium" : "low",
  };
}

// ── EagleView Property Data API v2: async request, then poll for the result ──
// Needs a Property Data subscription with the Roof Area Estimate and Roof
// Pitch packs. Token URL and base come from env so sandbox and production can
// be switched without code changes.

let evToken: { value: string; expires: number } | null = null;

async function eagleViewToken() {
  if (evToken && evToken.expires > Date.now()) return evToken.value;
  const id = process.env.EAGLEVIEW_CLIENT_ID;
  const secret = process.env.EAGLEVIEW_CLIENT_SECRET;
  if (!id || !secret) throw new MeasureError("not_configured", "EAGLEVIEW_CLIENT_ID / EAGLEVIEW_CLIENT_SECRET are not set");
  const tokenUrl = process.env.EAGLEVIEW_TOKEN_URL ?? "https://apicenter.eagleview.com/oauth2/v1/token";
  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) throw new MeasureError("upstream", `EagleView token ${res.status}`);
  const data = await res.json();
  // Tokens last an hour; refresh at 55 minutes as EagleView recommends.
  evToken = { value: data.access_token, expires: Date.now() + 55 * 60 * 1000 };
  return evToken.value;
}

type EvValue<T> = { value: T } | undefined;
type EvStructure = {
  roof?: {
    structure_roof_area?: EvValue<number>;
    structure_roof_predominant_pitch?: EvValue<number>;
    structure_roof_facet_count?: EvValue<number>;
  };
};

export async function measureWithEagleView(place: Geocoded, timeoutMs = 25000): Promise<ProviderResult> {
  const base = process.env.EAGLEVIEW_API_BASE ?? "https://apis.eagleview.com";
  const token = await eagleViewToken();
  const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  const start = await fetch(`${base}/property/v2/request`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      address: { completeAddress: place.address },
      productIds: ["property_data_id_001", "property_data_id_002"],
    }),
    cache: "no-store",
  });
  if (!start.ok) throw new MeasureError("upstream", `EagleView request ${start.status}`);
  const { request } = await start.json();

  const deadline = Date.now() + timeoutMs;
  let data: { request?: { status?: string }; structures?: EvStructure[]; response_coordinates?: { lat: number; lon: number } } = {};
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 2000));
    const res = await fetch(`${base}/property/v2/result/${request.id}`, { headers, cache: "no-store" });
    if (!res.ok && res.status !== 202) throw new MeasureError("upstream", `EagleView result ${res.status}`);
    data = await res.json();
    if (data.request?.status === "Complete") break;
  }
  if (data.request?.status !== "Complete") throw new MeasureError("upstream", "EagleView timed out");

  // Price the main house: the largest structure. Detached garages and sheds
  // get quoted at the assessment.
  const main = (data.structures ?? [])
    .map((s) => s.roof)
    .filter((r) => r?.structure_roof_area?.value)
    .sort((a, b) => (b!.structure_roof_area!.value ?? 0) - (a!.structure_roof_area!.value ?? 0))[0];
  if (!main) throw new MeasureError("not_found", "No roof data for this address yet");

  return {
    provider: "eagleview",
    address: place.address,
    lat: data.response_coordinates?.lat ?? place.lat,
    lng: data.response_coordinates?.lon ?? place.lng,
    roofAreaSqft: main.structure_roof_area!.value,
    pitch: main.structure_roof_predominant_pitch?.value ?? null,
    facetCount: main.structure_roof_facet_count?.value ?? null,
    imageryDate: null,
    quality: "high",
  };
}

// ── Demo: fixed numbers so the widget can be previewed without API keys ──

export function measureDemo(address: string): ProviderResult {
  return {
    provider: "demo",
    address,
    lat: 45.4176,
    lng: -122.459,
    roofAreaSqft: 2240,
    pitch: 6,
    facetCount: 9,
    imageryDate: null,
    quality: "low",
  };
}
