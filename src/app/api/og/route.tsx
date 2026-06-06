import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { BRAND } from "@/lib/brand-tokens";

export const runtime = "edge";

const DEFAULT_WIDTH = 1080;
const DEFAULT_HEIGHT = 1350;
const SUPPORTED_TEMPLATES = ["photo-headline"] as const;
type Template = (typeof SUPPORTED_TEMPLATES)[number];
type GradientStrength = "light" | "medium" | "heavy" | "none";

const GRADIENT_COLOR_KEYS = ["yellow", "orange", "blue", "grey"] as const;
type GradientColorKey = (typeof GRADIENT_COLOR_KEYS)[number];
const GRADIENT_COLOR_MAP: Record<GradientColorKey, string> = {
  yellow: BRAND.color.primary,
  orange: BRAND.color.secondary,
  blue: BRAND.color.tertiary,
  grey: BRAND.color.neutral,
};

// Logo source dimensions: 350x200 (aspect 1.75). Rendered at 240x137 in OG.
const LOGO_PATH = "/images/logo.png";
const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 137;

export async function GET(request: NextRequest) {
  const startedAt = Date.now();
  // Synchronous URLSearchParams from NextRequest.nextUrl. The async-await rule
  // in Next 16 applies to page/layout searchParams props and dynamic route
  // context.params, not to URL query strings on a route-handler request.
  const qs = request.nextUrl.searchParams;
  const templateParam = qs.get("template") ?? "photo-headline";
  // Note: Satori (the renderer behind ImageResponse) does not support WebP
  // source images. Use PNG, JPEG, or AVIF for `?photo=`.
  // Note 2: Satori does not honor EXIF orientation on JPEGs. Pre-rotate
  // photos in the asset file before referencing here.
  const photoParam = qs.get("photo") ?? "/images/logo.png";
  // Optional headline rendered above the logo (used for page share cards).
  const headline = (qs.get("headline") ?? "").slice(0, 90);
  const gradient = (qs.get("gradient") ?? "medium") as GradientStrength;
  const gradientColorKey = (qs.get("gradientColor") ?? "grey") as GradientColorKey;
  const gradientBaseColor =
    GRADIENT_COLOR_MAP[gradientColorKey] ?? BRAND.color.neutral;
  const width = clampInt(qs.get("width"), DEFAULT_WIDTH, 320, 2048);
  const height = clampInt(qs.get("height"), DEFAULT_HEIGHT, 320, 2560);

  try {
    if (!SUPPORTED_TEMPLATES.includes(templateParam as Template)) {
      return new Response(
        `Template "${templateParam}" not implemented. Available: ${SUPPORTED_TEMPLATES.join(", ")}`,
        { status: 400 },
      );
    }

    const photoUrl = photoParam.startsWith("http")
      ? photoParam
      : new URL(photoParam, request.nextUrl.origin).toString();
    const logoUrl = new URL(LOGO_PATH, request.nextUrl.origin).toString();

    const gradientCss = buildGradientCss(gradient, gradientBaseColor);

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            position: "relative",
            backgroundColor: BRAND.color.tertiary,
          }}
        >
          {/* Photo, full bleed. Satori needs explicit pixel width/height. */}
          <img
            src={photoUrl}
            alt=""
            width={width}
            height={height}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
            }}
          />

          {gradientCss && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: gradient === "heavy" ? "65%" : gradient === "light" ? "35%" : "50%",
                display: "flex",
                backgroundImage: gradientCss,
              }}
            />
          )}

          {/* Headline, above the logo */}
          {headline && (
            <div
              style={{
                position: "absolute",
                left: 60,
                right: 60,
                bottom: 60 + LOGO_HEIGHT + 28,
                display: "flex",
                color: "#ffffff",
                fontSize: Math.round(width * 0.048),
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              {headline}
            </div>
          )}

          {/* Logo, lower left */}
          <img
            src={logoUrl}
            alt=""
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            style={{
              position: "absolute",
              bottom: 60,
              left: 60,
            }}
          />
        </div>
      ),
      {
        width,
        height,
        headers: {
          "cache-control": "public, max-age=3600, s-maxage=86400",
        },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    console.error("[og] generation failed", {
      message,
      stack: err instanceof Error ? err.stack : undefined,
      template: templateParam,
      photo: photoParam,
      width,
      height,
      durationMs: Date.now() - startedAt,
      url: request.nextUrl.pathname + request.nextUrl.search,
    });
    return new Response(`OG generation failed: ${message}`, { status: 500 });
  }
}

function clampInt(raw: string | null, fallback: number, min: number, max: number): number {
  if (!raw) return fallback;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function buildGradientCss(strength: GradientStrength, base: string): string | null {
  switch (strength) {
    case "none":
      return null;
    case "light":
      return `linear-gradient(to top, ${base}b3 0%, ${base}66 35%, ${base}00 100%)`;
    case "heavy":
      return `linear-gradient(to top, ${base}f5 0%, ${base}cc 30%, ${base}66 60%, ${base}00 100%)`;
    case "medium":
    default:
      return `linear-gradient(to top, ${base}d9 0%, ${base}99 30%, ${base}33 65%, ${base}00 100%)`;
  }
}
