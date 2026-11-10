---
name: French Roofing
description: Design system for French Roofing, a family-owned residential and commercial roofer in Damascus, Oregon (since 2014). California surfer vibe meets Pacific Northwest contractor. Laid back, warm, neighborly, photo-forward. Marketing surfaces are light mode only; dark tokens exist for internal tools and documentation.
version: 1.0
colors:
  light:
    yellow: "#ffbd59"
    orange: "#d85024"
    navy: "#092e5e"
    bg: "#fdfcfa"
    surface: "#f5f1ea"
    field: "#ffffff"
    text: "#3e3d3b"
    text-2: "#6b6a67"
    text-3: "#9a9895"
    border: "#e5e0d6"
    heading: "#092e5e"
    outline: "#092e5e"
    link: "#092e5e"
    on-yellow: "#092e5e"
    on-orange: "#ffffff"
    on-navy: "#fdfcfa"
    success: "#4a7c4e"
    error: "#b8341c"
    focus: "#d85024"
    side: "#092e5e"
    side-text: "#f5f1ea"
    side-text-2: "#b9c3d3"
  dark:
    yellow: "#ffbd59"
    orange: "#ef7a4c"
    navy: "#092e5e"
    bg: "#151412"
    surface: "#1e1c19"
    field: "#24221e"
    text: "#e6e1d8"
    text-2: "#b3ada2"
    text-3: "#857f75"
    border: "#36332d"
    heading: "#f5f1ea"
    outline: "#f5f1ea"
    link: "#ffbd59"
    on-yellow: "#092e5e"
    on-orange: "#151412"
    on-navy: "#fdfcfa"
    success: "#86b98a"
    error: "#ef7058"
    focus: "#ef7a4c"
    side: "#0e0d0b"
    side-text: "#f5f1ea"
    side-text-2: "#b9c3d3"
typography:
  family: "Inter, system-ui, sans-serif"
  review-only: ["Caveat", "Permanent Marker", "Shrikhand"]
  display: { size: 56px, mobile: 40px, line-height: 1.05, letter-spacing: -0.02em, weight: 700 }
  h1: { size: 40px, mobile: 32px, line-height: 1.15, letter-spacing: -0.01em, weight: 700 }
  h2: { size: 32px, mobile: 26px, line-height: 1.2, letter-spacing: normal, weight: 600 }
  h3: { size: 24px, mobile: 22px, line-height: 1.3, letter-spacing: normal, weight: 600 }
  h4: { size: 20px, line-height: 1.4, letter-spacing: normal, weight: 500 }
  body: { size: 17px, line-height: 1.6, letter-spacing: normal, weight: 400 }
  small: { size: 15px, line-height: 1.5, letter-spacing: normal, weight: 400 }
  caption: { size: 13px, line-height: 1.4, letter-spacing: 0.05em, weight: 500, transform: uppercase }
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  pill: 999px
spacing:
  base: 4px
  scale: [4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px]
  section-desktop: 96px
  section-mobile: 48px
  content-max: 1120px
  measure: 680px
motion:
  fast: 120ms
  base: 200ms
  slow: 320ms
  ease-standard: cubic-bezier(0.2, 0, 0, 1)
  ease-exit: cubic-bezier(0.4, 0, 1, 1)
  lift: translateY(-1px)
components:
  button-primary: { background: yellow, color: on-yellow, padding: 12px 20px, radius: md, weight: 600, shadow: none, hover: lift }
  button-secondary: { background: transparent, border: 1px solid outline, color: outline, padding: 12px 20px, radius: md, hover: lift }
  button-emphasis: { background: orange, color: on-orange, padding: 12px 20px, radius: md, hover: lift }
  button-text: { color: link, underline: on hover, hover-color: orange }
  input: { background: field, border: 1px solid border, radius: md, padding: 12px 16px, focus-border: orange, focus-ring: 2px focus offset 2px, error-border: error }
  card: { background: surface, border: 1px solid border, radius: lg, padding: 24px to 32px, shadow: none }
  badge: { radius: pill, padding: 4px 12px, type: caption }
  table: { row-min-height: 56px, borders: bottom only, zebra: none }
  focus-ring: { outline: 2px solid focus, offset: 2px }
---

# French Roofing Design System

## Overview

French Roofing (legal entity French Construction LLC dba French Roofing) is a residential and commercial roofing company in Damascus, Oregon, family-owned since 2014. It serves Damascus, Clackamas, Happy Valley and the surrounding communities within about 20 miles.

The visual direction is a California surfer vibe meets a Pacific Northwest contractor: laid back, warm and neighborly. Generous white space, photo-forward layouts, confident without flexing.

Avoid corporate polish, a high-pressure sales feel, layered gradients and generic contractor templates. No emoji, no gradients, no shadows.

Marketing surfaces (website, email, proposals, print) are light mode only. The dark palette is defined for internal tools and documentation and must never be used for public marketing.

Name, address and phone, identical everywhere:

```
French Roofing
Damascus, OR 97089
971-376-8722
```

The street address is never published. Never write "French Roofing LLC".

## Colors

Every token exists in light and dark. Values below are the single source of truth; the reference site and CSS use the same hex values.

| Token | Light | Dark | Use |
|---|---|---|---|
| yellow | #ffbd59 | #ffbd59 | Primary buttons, highlights, accents |
| orange | #d85024 | #ef7a4c | Emphasis buttons, hovers, focus rings, warnings |
| navy | #092e5e | #092e5e | Deep backgrounds, trust elements |
| heading | #092e5e | #f5f1ea | Headlines |
| bg | #fdfcfa | #151412 | Page background |
| surface | #f5f1ea | #1e1c19 | Cards, raised sections (cream) |
| field | #ffffff | #24221e | Input fill |
| text | #3e3d3b | #e6e1d8 | Body text |
| text-2 | #6b6a67 | #b3ada2 | Subheads, captions |
| text-3 | #9a9895 | #857f75 | Placeholders, disabled, decorative metadata |
| border | #e5e0d6 | #36332d | Cards, inputs, dividers |
| outline | #092e5e | #f5f1ea | Secondary button stroke and text |
| link | #092e5e | #ffbd59 | Inline links |
| on-yellow | #092e5e | #092e5e | Text on yellow |
| on-orange | #ffffff | #151412 | Text on orange |
| on-navy | #fdfcfa | #fdfcfa | Text on navy |
| success | #4a7c4e | #86b98a | Confirmations |
| error | #b8341c | #ef7058 | Form errors |
| focus | #d85024 | #ef7a4c | Focus ring |

Contrast notes:
- Navy on yellow, text on bg, heading on bg and text-2 on surface all pass WCAG AA for body text.
- Orange (#d85024) passes AA for text on the light background. In dark mode orange lifts to #ef7a4c so it stays readable.
- text-3 (#9a9895) is about 2.8:1 on the light background. Use it only for placeholders, disabled states and decorative metadata. Real captions use text-2.

## Typography

Inter for everything. Caveat, Permanent Marker and Shrikhand are allowed on customer review posts only (handwritten looks and the surf-poster headline).

| Style | Size (desktop / mobile) | Line height | Letter spacing | Weight |
|---|---|---|---|---|
| Display | 56px / 40px | 1.05 | -0.02em | 700 |
| H1 | 40px / 32px | 1.15 | -0.01em | 700 |
| H2 | 32px / 26px | 1.2 | normal | 600 |
| H3 | 24px / 22px | 1.3 | normal | 600 |
| H4 | 20px | 1.4 | normal | 500 |
| Body | 17px | 1.6 | normal | 400 |
| Small | 15px | 1.5 | normal | 400 |
| Caption | 13px | 1.4 | 0.05em, all caps | 500 |

Headlines use the heading color. Keep body copy to a 680px measure.

## Layout

- 4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Lean toward the larger steps.
- Section padding: at least 96px desktop, 48px mobile.
- Content max width 1120px. Text measure 680px.
- Marketing pages use one or two columns at most.
- Corners: buttons and inputs 8px, cards 12px, images 4 to 8px. Never sharp corners. Pills only on small badges.

## Elevation

There is no shadow elevation. Depth comes from surface color and a 1px border:

1. bg (page)
2. surface (cream cards and raised sections), 1px border
3. navy blocks for strong emphasis (CTA bands)

Hover feedback on buttons is a 1px lift (translateY(-1px)) over 120ms with ease-standard. No shadows, no glows.

## Components

- **Primary button**: yellow fill, navy text, 12px × 20px padding, 8px radius, weight 600, no shadow, lifts 1px on hover. One per view.
- **Secondary button**: transparent fill, 1px outline-color border and text.
- **Emphasis button**: orange fill with on-orange text. For a second action that needs weight.
- **Text button / link**: link color, underline offset 3px, orange on hover.
- **Badge**: pill, caption type, tinted fill (color at 14% over surface) with full-strength text.
- **Input**: field fill, 1px border, 8px radius, 12px × 16px padding. Border turns orange on focus with a 2px focus ring. Error state uses the error color on border and message.
- **Card**: cream surface, 1px border, 12px radius, 24 to 32px padding, no shadow.
- **Table**: bottom borders only, no zebra rows, rows at least 56px tall.
- **Navigation**: top nav with logo left, text links, one primary button. Tabs use a 2px yellow underline for the active item. Breadcrumbs in small type.
- **Focus**: every interactive element shows a 2px focus ring, 2px offset.

## Imagery

- Real French Roofing crews on real Pacific Northwest homes, in natural light.
- No stock photos, no filters, no duotones.
- Minimal illustration; photos come first.
- Image corners 4 to 8px.

No example images were supplied, so no locked image styles (Style 01, Style 02...) exist yet.

## Responsive Behavior

- Breakpoint at 960px: the docs sidebar collapses to a menu; marketing layouts drop from two columns to one.
- Display, H1, H2 and H3 step down to their mobile sizes below 640px.
- Section padding drops from 96px to 48px on mobile.
- Hit targets are at least 44px tall on touch.
- Motion respects prefers-reduced-motion (transitions off).

## Known Gaps

- Logo: only one version on file (yellow and blue on transparent). No version for dark backgrounds and no icon-only mark. On dark surfaces, place it on an off-white plate.
- Dark mode: the brand is light mode only. The dark palette here is a derived extension for tools and documentation.
- Workmanship warranty term (5 years, or 10 years on Presidential roofs) is not in BRAND.md yet.
- Facebook, LinkedIn and Google Business Profile CTA rule is not in BRAND.md yet.
- "No phone number on social posts or graphics" is not in BRAND.md yet.
- No icon set has been chosen.
- No example photography was supplied, so no locked image styles or prompts.
- text-3 (#9a9895) fails AA for text on light backgrounds; restricted to non-essential uses.
