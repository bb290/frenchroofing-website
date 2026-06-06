---
client: french-roofing
status: approved
last-updated: 2026-05-07
spec-version: 2.1
---

# French Roofing Brand Bible

> The single source of truth for French Roofing's brand. Every agent that writes copy, designs visuals, or ships work for this client reads this file first.
>
> **Status:** `approved` (as of 2026-05-06). Tier 1 only counts this file when status is `approved`.
>
> **Source-of-truth scope.** Social media commands (`/campaign-brief`, `/campaign-generate`, `/evergreen-setup`, `/evergreen-generate`) read **this file** for voice, CTA, NAP, hashtags, banned words, and color/font tokens, not the legacy root `CLAUDE.md`. The strategy doc that originally said "social commands read CLAUDE.md" is superseded by this resolution.
>
> **Quick reference card:** `BRAND-quick-reference.md` (same folder), pinnable cheat sheet of colors, type, components, voice.
> **Design tokens:** `assets/tokens.css` (CSS variables) and `assets/tokens.json` (machine-readable).

---

## 0. Identity

- **Brand / DBA:** French Roofing
- **Legal entity:** French Construction LLC dba French Roofing
- **Founded:** 2014 by Sean French
- **Address:** 16235 SE Van Zyl Dr, Damascus, OR 97089
- **Phone:** 971-376-8722
- **Email:** hello@frenchroofing.com
- **CCB Number:** 203933
- **Manufacturer Certification:** CertainTeed Certified
- **Financing:** Enhancify (0% offers available)

---

## 1. One-liner

A residential and commercial roofing company in Damascus, Oregon, family-owned since 2014, serving the greater Portland metro area with the kind of work you'd put on your grandma's house.

## 2. Mission and promise

**Mission.** Keep Pacific Northwest families warm, dry, and safe with roofs built the right way, no shortcuts, no fine print.

**Promise to customers.** "Got You Covered!" Honest communication, clean job sites, manufacturer-spec workmanship, and a team that treats every property like it's owned by family.

## 3. Audience

**Primary audience.** Homeowners in the 20-mile Damascus radius getting a roof replacement, repair, or maintenance. Especially those who care about workmanship and clear communication over chasing the lowest bid.

**Secondary audiences.** Property managers (residential and commercial portfolios) and general contractors who need a reliable subcontractor for new construction or remodels.

**Who we are *not* for.** Bargain hunters who only want the cheapest number. Out-of-area work outside the 20-mile radius (unless explicitly expanded).

## 4. Voice and tone

**Voice (always true).** Down to earth, neighborly, light hearted. Conversational. Sean talking. A roofer in Birkenstocks who's been on roofs for twenty years and knows his trade cold.

**Tone (varies by context).** Warm and patient when explaining technical things. Dry humor when the moment fits. Direct and unflinching when delivering bad news (hidden damage, weather delays).

**Sounds like.** A neighbor explaining something over the fence. A friend who happens to be a roofer.

**Doesn't sound like.** A corporate roofing brand. A high-pressure salesman. Someone trying too hard to sound casual.

**Sentence rhythm.** Real sentences, complete thoughts. Conversational pacing the way Sean would actually talk to someone. Not chopped up for effect. Less is more, tighter is better.

**Words and phrases we use.** *we, your roof, neighbor, the crew, free assessment, Got You Covered! (sparingly, max 1 in 6 posts).*

**Words and phrases we avoid.** *premier, industry-leading, rockstar, synergy, amazing team, cutting-edge, world-class, best-in-class, high-pressure CTAs.*

### Punctuation rules (non-negotiable)

- **No em dashes, ever.** Use commas, periods, parentheses, or semicolons instead. Applies to captions, web copy, emails, and anything outbound. The em dash character (the long dash, Unicode U+2014) must not appear in any generated content. Do not use it for parenthetical asides, sentence joins, or emphasis.
- **No hashtags on Instagram captions.** Plain captions only. See §13 for the full hashtag rule.
- **Ampersands (&) are fine** in casual contexts (Sean uses them).
- **Contractions over formal verbs.** "I'm" not "I am". "Don't" not "do not". Closer to how Sean talks.

**Sample sentence in voice.** "If we find something unexpected up there, you'll hear from us first, with a plan and honest options."

## 5. Visual identity

> Light mode only for the foreseeable future. See `assets/tokens.css` for machine-readable values; `BRAND-quick-reference.md` for the pinnable cheat sheet.

**Aesthetic direction.** Californian surfer vibe meets PNW contractor, laid back, warm, neighborly. Generous whitespace, photo-forward layouts, real crews on real Pacific Northwest homes (not stock photos). Avoid corporate polish, high-pressure-sales energy, gradients-on-gradients, generic contractor templates. Confident without flexing.

**Logo.** Yellow + blue mark. See `assets/logo.png`.

**Color palette.**

| Role | Hex | Use |
|---|---|---|
| Primary (Yellow) | `#ffbd59` | Primary CTAs, highlights, accents |
| Secondary (Orange) | `#d85024` | Secondary CTAs, hover states, emphasis, focus rings |
| Tertiary (Blue) | `#092e5e` | Headings, deep backgrounds, button text on yellow, trust elements |
| Neutral (Grey) | `#3e3d3b` | Body text |
| Background | `#fdfcfa` | Warm off-white page background |
| Surface (Cream) | `#f5f1ea` | Cards, raised sections |
| Text Primary | `#3e3d3b` | Body |
| Text Secondary | `#6b6a67` | Subheads, secondary copy |
| Text Muted | `#9a9895` | Captions, metadata |
| Border | `#e5e0d6` | Card / input / divider borders |
| Success | `#4a7c4e` | Confirmations |
| Warning | `#d85024` | Same as secondary |
| Error | `#b8341c` | Form errors |

**Typography, Inter (Google Fonts).** Weights: 400 body, 500 UI, 600 subheads, 700 headlines.

| Style | Size | Line | Tracking | Weight |
|---|---|---|---|---|
| Display | 56px | 1.05 | -0.02em | 700 |
| H1 | 40px | 1.15 | -0.01em | 700 |
| H2 | 32px | 1.2 | normal | 600 |
| H3 | 24px | 1.3 | normal | 600 |
| H4 | 20px | 1.4 | normal | 500 |
| Body | 17px | 1.6 | normal | 400 |
| Small | 15px | 1.5 | normal | 400 |
| Caption | 13px | 1.4 | +0.05em (UPPERCASE) | 500 |

**Spacing.** 4px base. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Default to the larger end, this brand is spacious, not dense. Section padding 96px+ on desktop, 48px+ on mobile.

**Border radius.** Medium-rounded. Buttons & inputs `8px`, cards `12px`, images `4–8px`. Never sharp corners. Never pill shapes (except small badges/tags).

**Component defaults.**

- **Primary button:** Solid yellow `#ffbd59` with deep blue `#092e5e` text. 8px radius, 12px vertical / 20px horizontal padding, no drop shadow, subtle hover lift.
- **Secondary button:** Outlined blue, transparent fill, 8px radius.
- **Cards:** Cream surface `#f5f1ea` on off-white background, 12px radius, 1px `#e5e0d6` border, no shadow by default. 24–32px internal padding.
- **Inputs:** White fill, 1px `#e5e0d6` border, 8px radius, focus state uses orange `#d85024` border.
- **Tables:** Minimal, no zebra stripes, 1px bottom borders only, 56px+ row height.
- **Images:** Photo-forward, large, generous bleed. Real crews, real homes, natural Pacific Northwest light. 4–8px rounded corners. No filters, no duotones.

**Layout.** Generous whitespace. Single-column or two-column max for marketing pages. Let content breathe.

**Photography style.** Real French Roofing crews on real Pacific Northwest homes in natural light. Birkenstocks-and-tie-dye honest. No stock. No filters, no duotones. Slight rounded corners (4–8px).

**Illustration / iconography.** Minimal. Lean on photography first.

## 6. Messaging pillars

The themes every piece of French Roofing content should ladder back to.

1. **Crew & Community**, the family behind the work, neighborhood relationships, how we treat properties
2. **Workmanship**, manufacturer specs, clean job sites, the details you can see and the ones you can't
3. **Integrity**, clear honest communication even when it's inconvenient (hidden damage, weather delays)
4. **Education**, roofing materials, storm prep, maintenance tips, warranties (manufacturer + workmanship)
5. **Local Authority**, Damascus / Clackamas / Happy Valley first, PNW climate-specific knowledge

## 7. Proof points

- 10+ years operating in the Pacific Northwest (founded 2014)
- CCB #203933, licensed, insured, and bonded
- CertainTeed Certified manufacturer
- Family-owned and operated
- Financing via Enhancify (0% offers available)
- Standard workmanship warranty backed by the company

## 8. Competitive positioning

**Direct competitors.** Other licensed roofing contractors in the 20-mile Damascus radius, Clackamas / Happy Valley / Portland metro residential roofers.

**How we differ.** Small local family business that prioritizes craftsmanship and clear communication over price. CertainTeed certified. Honest delivery of bad news with honest options. Site cleaner than when we arrived.

**What we will *never* claim.**
- "Cheapest in the area"
- "Premier" / "industry-leading" / "world-class" anything
- Vague guarantees we can't back with a written warranty
- High-pressure scarcity tactics ("today only", "don't wait")

## 9. Service area

- **Home base:** Damascus, OR
- **Target radius:** ~20 miles
- **Priority cities (SEO/content focus):** Damascus, Clackamas, Happy Valley
- **Full coverage:** Gresham, Oregon City, Milwaukie, Lake Oswego, Tualatin, West Linn, Sandy, Estacada, Boring, Troutdale, Fairview, Wood Village, Gladstone, Johnson City, Canby (edge), SE Portland neighborhoods (Lents, Powellhurst-Gilbert, Foster-Powell, Woodstock).

Local content references only cities in this list unless explicitly expanded.

## 10. Services and CTAs

### Services
- Full roof replacement
- Roof repairs
- Roof cleaning + maintenance (one-time or recurring)
- Roof inspections

### CTAs by surface

The CTA changes based on where the message lives. Match the surface.

**Primary CTA (website, email, formal proposals, vehicle wraps, print).**
*"Schedule a FREE Roof Assessment with French Roofing."*

**Social CTA (Instagram captions, Facebook posts, social-feed contexts).**
```
Visit website for Instant Roof Quote
Link in Bio
```
Use the social CTA verbatim on Instagram. Two short lines. Points the reader at the bio link, which lives on the website's Instant Roof Quote tool. No "Schedule a FREE Roof Assessment" on social. No hashtags after the CTA on Instagram (see §13).

**Phone CTA (when speaking, or in voice-search-optimized copy).**
*"Call 971-376-8722."*

## 11. Tagline

**Got You Covered!** Use sparingly, max 1 in 6 posts.

## 12. NAP (must be identical across all web properties)

```
French Roofing
16235 SE Van Zyl Dr, Damascus, OR 97089
971-376-8722
```

## 13. Social

### Accounts

| Platform | URL |
|---|---|
| Facebook | https://www.facebook.com/FrenchRoofingLLC |
| Instagram | https://www.instagram.com/frenchroofing/ |
| LinkedIn | https://www.linkedin.com/company/french-roofing/ |
| YouTube | https://www.youtube.com/@Frenchroofing |
| Google My Business | https://share.google/JYDD8GxCgR1YwXii2 |

### Hashtag rule (Brittany, 2026-05-06)

**No hashtags on Instagram captions.** Plain captions read better, the audience isn't reached via hashtag discovery, and the brand voice doesn't carry hashtags well. Generated Instagram posts must not include hashtags.

For other platforms (LinkedIn, Facebook), hashtags are optional. Default to none unless there's a deliberate reason. If used, sparingly: 2-3 tags max, always relevant.

Legacy hashtag set previously documented (`#roofingcontractor #roofing #construction #realestate #localbusiness`) is **deprecated** for Instagram. Don't include it on new posts.

## 14. Legal and trademark notes

- Operating entity is **French Construction LLC dba French Roofing**. Use the dba in marketing; reserve the legal entity for contracts and formal documents.
- The Facebook URL slug `FrenchRoofingLLC` is the live handle and cannot be changed without breaking inbound links, leave the slug alone.
- CCB #203933 must appear on legal-required surfaces (contracts, vehicle wraps where required, formal estimates).

## 15. Source material

Original brand docs, voice samples, and references that informed this file live in `clients/French_Roofing/.claude/source-material/`. Add new material there, then re-run `brand-strategist` to refresh.

The legacy brand-content file at `clients/French_Roofing/CLAUDE.md` (root) predates the spec. This `.claude/BRAND.md` is the new source of truth, keep them in sync until the legacy file is retired.

---

**Approval log.**

| Date | Reviewer | Status change | Notes |
|---|---|---|---|
| 2026-05-06 | _pending_ | created → draft | Generated from spec template + ported content from legacy root `CLAUDE.md` + design system from chat |
| 2026-05-06 | bb@sagareus.com | draft → approved | Reviewed and approved in `/client-work` follow-up; counts toward Tier 1 ✓ |
