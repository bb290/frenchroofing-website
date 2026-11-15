import { milesFromHomeBase, SERVICE_RADIUS_MILES } from "@/lib/roof-measure/rules";

// Proxies a Google satellite tile so the Maps key never reaches the browser.
export async function GET(req: Request) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const { searchParams } = new URL(req.url);
  const lat = Number(searchParams.get("lat"));
  const lng = Number(searchParams.get("lng"));
  if (!key || !Number.isFinite(lat) || !Number.isFinite(lng) || milesFromHomeBase(lat, lng) > SERVICE_RADIUS_MILES) {
    return new Response(null, { status: 404 });
  }

  const url = new URL("https://maps.googleapis.com/maps/api/staticmap");
  url.searchParams.set("center", `${lat},${lng}`);
  url.searchParams.set("zoom", "20");
  url.searchParams.set("size", "640x360");
  url.searchParams.set("scale", "2");
  url.searchParams.set("maptype", "satellite");
  url.searchParams.set("key", key);
  const res = await fetch(url);
  if (!res.ok) return new Response(null, { status: 502 });

  return new Response(res.body, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") ?? "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
