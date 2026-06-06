// Share-card (Open Graph) image helpers.
//
// Builds /api/og URLs for page metadata. Photos must be JPEG/PNG/AVIF -
// Satori (the OG renderer) does not support WebP sources.

export const OG_SERVICE_PHOTOS: Record<string, string> = {
  "roof-replacement": "/images/crew-tearing-off-roof.jpeg",
  "roof-repair": "/images/roof-patch-can-solve-an-immediate-issue-but-its-not-a-long-t.jpg",
  "roof-cleaning": "/images/skylights-need-extra-attention-debris-can-build-up-causing-f.jpg",
  "roof-inspections": "/images/standing-water-in-valley.jpg",
  maintenance: "/images/worker-placing-board.jpeg",
};

export function ogImage(headline: string, photo: string) {
  // headline is used for alt text only - the card itself stays clean:
  // photo, gradient, and logo.
  const params = new URLSearchParams({
    photo,
    width: "1200",
    height: "630",
    gradient: "heavy",
    gradientColor: "blue",
  });
  // Relative URL - resolved against metadataBase from the root layout.
  return [
    {
      url: `/api/og?${params.toString()}`,
      width: 1200,
      height: 630,
      alt: headline,
    },
  ];
}
