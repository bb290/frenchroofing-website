---
client: french-roofing
platform: instagram
cadence: evergreen
pillar: personal-brand
status: active
mix-share: 0.20
activated_at: 2026-05-06
last-updated: 2026-11-11
spec-version: 2.1
---

# Pillar: Personal Brand (Sean)

> **Status:** `active` (Brittany, 2026-11-11). Photos of Sean, labeled by a human at intake (Drive `1. Intake / Sean` subfolder or "sean" in the file name), sort here. Never identify Sean from his face; he and the crew look alike.
>
> Brand source of truth: `clients/French_Roofing/.claude/BRAND.md`. Voice in §4 with the new punctuation rules (no em dashes, no hashtags on IG, less formal).
>
> System-wide rules: `social/instagram/pillars.md`.

## Purpose

Sean as a person, not the company. Business owner, girl dad, jokester, twenty-year roofing veteran who'd rather be doing physical work but ends up on the computer half the day. The personal-brand pillar leans into Sean's actual personality: the jokes he'd actually make, the things he'd actually complain about, the moments that make him human, not corporate.

This pillar runs **alongside** the French Roofing brand pillars (Educational, Crew & Community, Before/After). It uses a different voice register, more casual, more comedic, more first-person.

## How this pillar differs from Crew & Community

| Aspect | Crew & Community | Personal Brand |
|---|---|---|
| Subject | Crew, customers, neighborhood | Sean himself, alone |
| Voice | 3rd person about crew, or 1st-person plural ("we") | 1st-person Sean ("I", "my") |
| Tone | Down to earth, neighborly, light hearted | Same brand voice + more jokes, more personal admission |
| Frequency of jokes | Light, dry humor when the moment fits | More frequent, sharper, self-deprecating |
| Photo | Anyone in the crew, customers, sites | Sean alone, sometimes Sean with his daughters or off the clock |

## What this pillar IS

- Sean's actual takes on running a small business
- Self-deprecating jokes about the gap between expectations and reality
- Girl-dad moments
- Admin frustrations (bookkeeping, CRMs, emails, scheduling)
- The 20-year-roofer-who's-now-a-business-owner identity tension
- Sean's voice unfiltered, the way he'd actually talk

## What this pillar IS NOT

- The French Roofing brand voice (which is also down-to-earth but stays company-level)
- Customer features (those go to Crew & Community)
- Educational content (Educational pillar)
- Before/After (Before/After pillar)
- Anyone other than Sean as the focal subject
- A sales pitch. Posts don't have to tie back to French Roofing: no credentials, no "same care on your roof". The standard CTA block at the end is enough (Brittany, 2026-11-11)

## Voice sample (from Brittany, 2026-05-06)

This was Brittany's drafted example caption when defining the personal-brand voice. Use it as the canonical voice reference for this pillar.

```
Circa 2014 - I was so excited to start my own roofing business, I couldn't stand the idea of working a 9 to 5 for someone else & wanted to continue working outside, doing physical work; I'm not a big computer guy.

I soon found out, Running a roofing business and being a roofer aren't the same thing, at all!

About half of each day are spent quoting jobs (on a computer), scheduling the crew (on a computer), and ordering materials (on a computer).  Of course, I still get on a roof when the job calls.

Turns out, I am a computer guy, who happens to have 20 years experience installing roofs.

-
Visit website for Instant Roof Quote
Link in Bio
-
```

**Notes on this sample:**
- Opens with a time anchor ("Circa 2014") and an honest emotion ("I was so excited").
- Uses ampersands (`&`) for casual rhythm.
- Has a punchline structure: setup, complication, resolution. "I soon found out..." then "About half of each day..." then "Turns out, I am a computer guy."
- Self-deprecating without being whiny.
- Conversational pacing, reads like Sean monologuing.
- Word count ~119. Tighter than the brand-voice 80-150 target. The personal-brand pillar should aim 60-120.

## Joke patterns to lean into

- **The 9-5 swap:** "Never wanted a 9-5, so I traded it for a 5-9."
- **Admin reality:** Bookkeeping, CRMs, emails, the gap between "I'll just install roofs" and what actually fills the day.
- **Identity tension:** "Turns out, I am a computer guy, who happens to have 20 years experience installing roofs."
- **The thing Sean wouldn't admit at a job site but would say on social.**

## Photo expectations

- Sean alone or as the focal subject
- Sean off the clock counts (with daughters, at a project site after hours, holding a coffee, in his Birkenstocks)
- Sean's hands or back-of-head if face is unavailable, but face beats partial
- No staged business-owner glamour shots

## Routing

When this pillar goes active, generated posts will land in `./posts/<YYYY-MM-DD-slug>/` with frontmatter:

```yaml
pillar: personal-brand
platform: instagram
status: draft
voice_person: 1st-singular-sean
photo: <relative path>
```

## Activation (done 2026-11-11)

- [x] Mix share: 20% long-term, 35% while Before/After is parked (`pillars.md`)
- [x] `pillars.md` lists it active
- [x] Routing: labeled Sean photos sort to `assets/images/2.sorted/personal-brand/` (fr-weekly-kewl)
- [x] Sean posts drafted under crew-community move here when found (Nov 27 tree farm moved 2026-11-11)
- [x] Sean's OK not needed (Brittany, 2026-11-11: he doesn't mind). Daughters can appear; don't name them
- [x] Cadence: about two a month (Sean's brief), as labeled photos allow

## Related

- `pillars.md`: index of all pillars
- `crew-community/pillar.md`: sister pillar (crew, company voice)
