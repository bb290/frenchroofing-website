import { NextResponse } from "next/server";
import { measureRoof, MeasureError } from "@/lib/roof-measure";

// Basic per-instance limit so a bot can't run up the measurement API bill.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const STATUS: Record<MeasureError["code"], number> = {
  not_found: 404,
  out_of_area: 422,
  not_configured: 503,
  upstream: 502,
};

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "too_many", message: "Too many lookups. Try again in a bit." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const address = typeof body?.address === "string" ? body.address.trim() : "";
  if (address.length < 6 || address.length > 200) {
    return NextResponse.json({ error: "bad_address", message: "Enter your full street address." }, { status: 400 });
  }

  try {
    const measurement = await measureRoof(address);
    return NextResponse.json({ measurement });
  } catch (err) {
    if (err instanceof MeasureError) {
      if (err.code === "upstream" || err.code === "not_configured") console.error("roof-measure:", err.message);
      return NextResponse.json({ error: err.code, message: err.message }, { status: STATUS[err.code] });
    }
    console.error("roof-measure:", err);
    return NextResponse.json({ error: "upstream", message: "Measurement failed" }, { status: 502 });
  }
}
