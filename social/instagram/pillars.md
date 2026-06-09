---
client: french-roofing
platform: instagram
last-updated: 2026-06-09
spec-version: 2.1
---

# French Roofing, Instagram Pillars

> Index of every evergreen and campaign pillar for French Roofing on Instagram.
>
> **Brand source of truth:** `clients/French_Roofing/.claude/BRAND.md`. All voice, CTA, NAP, hashtags, and colors come from there. Pillars only define their own scope, photos, and rules.
>
> **Intake and sort:** photos and videos are dropped into `assets/images/1.intake`, then a weekly human-run Claude Cowork session routes each into `assets/images/2.sorted/<pillar>` with a context note (see `KEWL.md`). `scripts/promote-photo.ts` then turns a sorted photo into a finished post folder under this pillar's `posts/` and archives the original to `assets/images/3.moved-to-social/`.

## Cadence

- 1 evergreen post / week baseline
- Campaigns run *on top of* evergreen during active 4–8 week pushes

## Evergreen pillars

### Steady-state mix (long-term target, all four pillars active)

| Pillar | Slug | Mix | Status | Last run | Posts shipped |
|---|---|---|---|---|---|
| Educational | `educational` | 30% | `active` | 2026-05-14 | 0 |
| Before / After | `before-after` | 30% | `deferred-to-v2` | _never_ | 0 |
| Crew & Community | `crew-community` | 20% | `active` | 2026-05-06 | 1 |
| Personal Brand (Sean) | `personal-brand` | 20% | `active` | _never_ | 0 |

### v1 mix (Before/After deferred to Kewl v2, see `KEWL.md`)

While Before/After is on hold, its 30% redistributes evenly to Crew & Community and Personal Brand. Educational stays at its long-term steady-state share so volume there builds at the right cadence from day one.

| Pillar | Slug | v1 Mix | Notes |
|---|---|---|---|
| Educational | `educational` | 30% | Activates once `educational/pillar.md` ships and Brittany approves the first post (which then locks `educational/POST-EXEMPLAR.md`). |
| Crew & Community | `crew-community` | 35% | Temporarily elevated. Returns to 20% when Before/After activates in v2. |
| Personal Brand (Sean) | `personal-brand` | 35% | Temporarily elevated. Returns to 20% when Before/After activates in v2. |
| Before / After | `before-after` | 0% | Folder + entry preserved; deferred to v2 alongside graphic design upgrade. |

## Brand voice rules (apply to all pillars)

- **No em dashes, ever** (per BRAND.md §4 punctuation rules). Use commas, periods, parentheses, semicolons.
- **No hashtags on Instagram captions** (per BRAND.md §13). Plain captions only.
- **Social CTA verbatim** (per BRAND.md §10): `Visit website for Instant Roof Quote\nLink in Bio`.
- **Voice less formal** (per Brittany, 2026-05-06): contractions, conversational pacing, less is more.

## Campaign pillars

_none active_

When a campaign runs, the folder shape is `social/instagram/campaigns/<campaign-slug>/` with `brief.md`, `photos/`, `outputs/post-NN.md` (flat sequential numbering), and a campaign-level `schedule.json`. Briefs are tiny (hook + photos + dates), everything else is inherited from BRAND.md.

**Note:** Campaigns use flat `outputs/post-NN.md` files; evergreen uses dated `posts/<YYYY-MM-DD-slug>/` folders. Different shapes intentionally, campaigns are a fixed batch, evergreen is ongoing.

## Conventions

### Folder shape (per pillar)

```
social/instagram/evergreen/<pillar-slug>/
├── pillar.md                 ← this pillar's brief + frontmatter status
├── POST-EXEMPLAR.md          ← canonical post structure for the pillar
├── photos/                   ← legacy input library for the older evergreen-generate path
└── posts/                    ← finished posts land here
    └── <YYYY-MM-DD-stem>/
        ├── og.png            ← baked image (photo + grey gradient + logo)
        ├── caption-instagram.md   ← + caption-facebook / -linkedin / -gmb
        ├── caption.md        ← mirrors Instagram (backwards-compat)
        ├── overlay.txt
        └── schedule.json
```

`promote` takes its input from the queue at `assets/images/2.sorted/<pillar-slug>/`, not this pillar's `photos/` folder. The `photos/` folder remains only for the older pool-based `evergreen-generate.ts` path.

### Before/After variant

The Before/After pillar uses a job-folder shape inside `photos/`:

```
before-after/photos/<job-slug>/
├── before-1.jpg
├── after-1.jpg
└── notes.txt          ← context for the captioning model (street, materials, story)
```

Each `<job-slug>` is one publishable pair. Posts still land under `before-after/posts/<YYYY-MM-DD-slug>/`.

### Photo reuse rule

In the `promote` path there is no reuse: each photo is promoted once, then its original is moved out of the queue to `assets/images/3.moved-to-social/`. The 90-day reuse rule still applies to the older `evergreen-generate.ts` pool path, which picks from each pillar's `photos/` folder and tracks reuse against `posts/` history.

### Dry pillar fallback

If a pillar has no eligible photos (all in 90-day cooldown or none exist):

1. `/evergreen-generate` notifies Brittany (issue / Slack / log, TBD)
2. Pauses that pillar for 7 days
3. After 7 days with no new photos, rebalances volume to the other pillars
