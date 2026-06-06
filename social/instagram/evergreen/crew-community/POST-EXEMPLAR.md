---
client: french-roofing
platform: instagram
pillar: crew-community
type: exemplar
exemplar_post: posts/2026-05-06-brian-tear-off
last-updated: 2026-05-06
spec-version: 2.1
---

# Crew & Community, Pilot Exemplar

> The first approved post for this pillar. Future Crew & Community posts inherit this post's structure, voice rhythm, visual treatment, and folder shape unless `pillar.md` changes.
>
> When `/evergreen-generate` produces a post, treat **`posts/2026-05-06-brian-tear-off/`** as the canonical reference and match its shape.

## What this exemplar locks in

### Folder shape (per post)

```
posts/<YYYY-MM-DD-slug>/
├── caption.md      ← caption + frontmatter
├── overlay.txt     ← short text (currently unused in render, kept for future)
├── schedule.json   ← scheduling + status
└── og.png          ← rendered visual (1080x1350)
```

Plus the photo lives at `pillar/photos/<slug>.jpg` and a routing copy at `public/images/<slug>.jpg`.

### Caption shape

- **Word count:** 50, 80 (target tighter than before, less is more per BRAND.md §4)
- **Voice person:** depends on subject
  - Sean alone, 1st-person Sean (until personal-brand pillar activates, then those route there)
  - Crew member other than Sean, 3rd person about them OR 1st-person plural
  - Mixed crew or community, 1st-person plural
- **Hook patterns** (from `pillar.md`):
  - Name + a fact, "Mike's been on the crew for six years..."
  - A relationship, "We did the Hendersons' first roof in 2018..."
  - A community moment, "Storm cleanup in Clackamas last weekend..."
  - A team moment, "The crew picked bowling for team night..."
- **Voice rules** (from BRAND.md §4):
  - No em dashes
  - Contractions over formal verbs
  - No banned words (premier, industry-leading, amazing team, etc.)
  - Tagline "Got You Covered!" rationed to 1 in 6 posts max
- **Closer:** short. The exemplar's closer is "The crew's lucky to have him." One short sentence that summarizes the throughline without being a CTA.

### CTA shape (from BRAND.md §10 social CTA)

```
-
Visit website for Instant Roof Quote
Link in Bio
-
```

The dashes (`-`) bracket the CTA block. Verbatim, no rewording. No hashtags follow.

### Overlay text

`overlay.txt` exists but its content does **not** render in the current OG template (text overlay was removed per Brittany's directive). Keep the file for forward compatibility if text overlays return.

### Visual (rendered to og.png)

Per the current OG endpoint:
- **Canvas:** 1080x1350 (Instagram portrait)
- **Photo:** full-bleed, `object-fit: cover`. Pre-rotate in asset file (Satori ignores EXIF orientation).
- **Gradient:** medium strength, base color `grey` (`#3e3d3b`), bottom 50% of canvas, four-stop alpha ramp (`d9/99/33/00`).
- **Logo:** `/images/logo.png`, 240x137px, positioned `bottom: 60, left: 60`. Sits on the gradient.
- **No text overlay**, no wordmark plate, no accent bar, no subline.

### Posting policy

First names of crew and customers appear in posts without separate sign-off (current brand policy, set 2026-05-06). Privacy basics still apply — no street numbers, license plates, or full addresses in photos.

## Caption text (the actual exemplar)

```
Meet Brian. He loves tear-offs. The thumbs up isn't ironic. Show him a roof that needs to come off and he's grinning before he picks up the hammer.

Most folks see a tear-off as the worst part of the job. Brian doesn't. The crew's lucky to have him.

-
Visit website for Instant Roof Quote
Link in Bio
-
```

55 words. Tight. Each sentence does one job. Hook (line 1), photo tie-in (line 2), pillar's-thesis turn (line 3), payoff (line 4). The closing two lines compress the entire pillar's intent into 17 words.

## Approval

| Date | Reviewer | Action |
|---|---|---|
| 2026-05-06 | bb@sagareus.com | Approved as the canonical pilot exemplar for Crew & Community |

## Related

- `pillar.md` (this folder), pillar definition + person/perspective rule + photo flow
- `posts/2026-05-06-brian-tear-off/`, this exemplar's actual files
- `social/crew-bios.md`, named-crew reference doc
- `.claude/BRAND.md`, voice + CTA + punctuation rules (source of truth)
- `social/instagram/pillars.md`, mix percentages and system-wide brand voice rules
