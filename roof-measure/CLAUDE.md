# CLAUDE.md — Roof Measure

## Project Purpose
Instant satellite roof measurement tool. Measure any roof in seconds — no ladder, no drone, no waiting. Designed to be embedded as a widget on roofing contractor websites (first deployment: frenchroofing.com) and potentially offered as a standalone SaaS product.

---

## Product Overview
- **Name:** Roof Measure (working title)
- **Type:** Web-based roof measurement widget / SaaS tool
- **Primary User:** Homeowners getting a roof estimate
- **Secondary User:** Roofing contractors embedding the tool on their site
- **First Customer:** French Roofing (frenchroofing.com)

### How It Works
1. Homeowner enters their address
2. Tool pulls satellite/aerial imagery for that location
3. AI/algorithm detects roof edges, calculates area
4. Returns measurement in **roofing squares** (1 square = 10' x 10' = 100 sq ft)
5. Result feeds into the contractor's estimate workflow

### Key Output
- Roof area in **squares** (the industry standard unit)
- Roof pitch estimate (if possible from imagery)
- Roof complexity indicator (simple, moderate, complex)
- Confidence score

---

## Technical Research Needed

### Aerial/Satellite Imagery APIs
- **Google Solar API** — provides roof geometry, pitch, and area for solar installations. May be repurposable for roofing measurements.
- **Google Maps Aerial View API** — high-res satellite imagery
- **Nearmap** — high-resolution aerial imagery with 3D/oblique views. Used by many roofing measurement companies. Paid API.
- **EagleView / Pictometry** — industry standard for roof reports. Very expensive. Competitor more than API.
- **Bing Maps** — birds-eye imagery available via API
- **Mapbox** — satellite tiles, potentially usable

### Roof Detection / Measurement Approaches
1. **Google Solar API** (easiest) — may already return roof segments with area calculations
2. **AI/ML roof segmentation** — use satellite imagery + computer vision to detect roof boundaries
3. **LiDAR data** — some areas have public LiDAR datasets (USGS 3DEP) that provide elevation data for pitch calculation
4. **Manual polygon tool** — fallback: let user draw roof outline on satellite image, calculate area from polygon

### Measurement Accuracy
- Satellite imagery gives 2D footprint area
- Need pitch factor to convert to actual roof surface area
- Pitch factor: flat = 1.0x, 4/12 = 1.054x, 6/12 = 1.118x, 8/12 = 1.202x, 10/12 = 1.302x, 12/12 = 1.414x
- Without pitch data, can estimate from shadow analysis or default to common pitch (6/12)

---

## MVP Scope
### Phase 1: Address-to-Measurement Widget
- Address input with Google Places autocomplete
- Pull satellite imagery for the property
- Calculate approximate roof area (using Google Solar API or polygon tool)
- Display result in roofing squares
- "Get Your Estimate" CTA that passes square count to the contractor's estimator

### Phase 2: Enhanced Accuracy
- Pitch detection from oblique imagery or LiDAR
- Multi-section roof detection (separate areas for different roof planes)
- Complexity scoring
- Historical imagery comparison (detect recent damage/changes)

### Phase 3: SaaS Platform
- White-label widget for any roofing contractor
- Dashboard for contractors to see measurements
- API access
- Subscription pricing

---

## Integration with French Roofing
The widget will be embedded on frenchroofing.com, replacing or enhancing the current "roof size" step in the Instant Roof Estimator. Flow:

1. Homeowner enters address on frenchroofing.com/estimate
2. Roof Measure widget calculates squares automatically
3. Result feeds into the existing estimator (material → complexity → add-ons → price)
4. Homeowner books assessment via Housecall Pro

---

## Tech Stack (Proposed)
| Tool | Purpose |
|------|---------|
| Next.js | Web app / widget |
| Google Solar API | Roof geometry data |
| Google Maps JS API | Map display + satellite imagery |
| Vercel | Hosting |
| Tailwind CSS | Styling |
| TypeScript | Type safety |

---

## Open Questions
- [ ] Google Solar API coverage — does it cover Damascus, OR and surrounding areas?
- [ ] Pricing for Google Solar API / Maps API at scale
- [ ] Accuracy requirements — how close is "good enough" for an estimate?
- [ ] Legal considerations for using satellite imagery
- [ ] Nearmap vs Google Solar API comparison
- [ ] Can we get pitch data without LiDAR?

---

**Last updated:** April 2026
**Parent project:** French Roofing (frenchroofing.com)
