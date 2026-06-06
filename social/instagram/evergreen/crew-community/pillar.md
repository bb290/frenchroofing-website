---
client: french-roofing
platform: instagram
cadence: evergreen
pillar: crew-community
status: active
mix-share: 0.30
last-updated: 2026-05-06
spec-version: 2.1
---

# Pillar: Crew & Community

> **Brand source of truth:** `clients/French_Roofing/.claude/BRAND.md`. Voice, primary CTA, NAP, hashtags, banned words, and colors live there.
>
> **System-wide rules** (90-day photo reuse, dry-pillar 7-day fallback, mix percentages): `social/instagram/pillars.md`.

## Purpose

Live out the **Community** value defined in BRAND.md ("Community is both our neighborhood and our responsibility"). This pillar is about people being humans, the crew working at French Roofing, the customers who hire them, the neighborhoods they serve. Damascus, Happy Valley, Clackamas. Real people, real homes, real moments. No corporate gloss. No "satisfied customer" clichés.

This pillar is what makes a stranger in Damascus think "I know those guys" before they've ever called.

## What this pillar IS

- The crew on a roof, mid-job, in branded gear
- Trucks parked on residential streets in priority service cities (Damascus, Happy Valley, Clackamas)
- Customers in front of their finished homes
- Team moments, bowling night, morning safety check, end-of-day cleanup
- Sean himself, the founder who started on a ladder at 16
- Long-tenured crew members and their stories
- Repeat customers, multi-generational customers, referrals from neighbors
- Local moments, Pacific Northwest weather, Damascus streets, Clackamas neighborhoods
- Community involvement, sponsorships, neighborhood help, post-storm response
- The "doing it for your own grandma" ethic in visible form

## What this pillar IS NOT

- Stock photos of "a roofer" or "a happy family"
- AI-generated images of crews or customers
- Close-up shingle shots (that's Educational)
- Pure before/after comparisons (that's Before/After)
- Logo-only graphics with no people
- Generic "team appreciation" posts with no specific story

## Voice for this pillar

Use the brand voice from `.claude/BRAND.md` §4: down to earth, neighborly, light hearted, never overly salesy or pushy. Emphasize quality and accountability over price.

**Sentence rhythm:** Conversational. Real sentences, not fragments. Carries through complete thoughts the way Sean would actually talk to someone over the fence, not chopped up for effect.

### Person / perspective rule

The voice changes person depending on who's in the photo.

- **Sean-only posts** → routing to the **`personal-brand`** pillar when that pillar goes active. See `social/instagram/evergreen/personal-brand/pillar.md`. While the personal-brand pillar is `setup` (not yet active), Sean-only posts may temporarily route here in 1st-person Sean voice. Open with "Hey, I'm Sean." or drop into Sean's voice without preamble.
- **Crew member other than Sean** → 3rd person about that crew member ("Mike's been on the crew for six years") OR 1st person plural from the company ("We've had Mike on the crew for six years"). Never 1st-person-as-Sean talking about another crew member, that reads weird.
- **Mixed crew or group shots** → 1st person plural ("We").
- **Community moments / job sites / location shots** without specific named subjects → 1st person plural ("We were over in Clackamas after the windstorm last weekend").
- **Customer features** → 1st person plural about the relationship ("We did the Hendersons' first roof in 2018. This is their third house with us.").

### Hook patterns that work

- **Sean-only, 1st person:** "Hey, I'm Sean. I started this on a ladder in 2014, and twelve years later I'm still up there most days."
- **A name + a fact (3rd person about crew):** "Mike's been on the crew for six years and he's a better climber than I am at this point."
- **A relationship (1st person plural):** "We did the Hendersons' first roof in 2018. This is their third house with us."
- **A community moment (1st person plural):** "Storm cleanup in Clackamas last weekend."
- **A team moment (1st person plural):** "The crew picked bowling for team night and I'm not going to tell you how I did."

### Avoid in this pillar

- Adjective-heavy praise ("amazing," "incredible," "the best")
- Generic gratitude ("So thankful for our team!")
- Treating customers as content ("Look at this happy customer!")
- Anything that could come from any roofer's account
- Corporate phrasing ("Our team is committed to delivering excellence")

## Photo expectations

### What makes a good crew & community photo

- **Branded gear visible** when possible (logo, shirts, truck)
- **A face or human element**, even partial (hands, back of head, silhouette) beats none
- **Local context**, Pacific Northwest roof, Damascus/Happy Valley/Clackamas street, recognizable neighborhood feel
- **Candid over posed**, mid-action, real moments
- **Natural light, real conditions**, Oregon weather is what it is

### What disqualifies a photo

- Visible house numbers, license plates, full addresses (privacy is still a baseline even though we don't ask for individual sign-off)
- Crew not in branded gear (unless intentionally off-duty content like team night)
- Blurry, dark, or visually cluttered

### Posting policy

First names of crew and customers may appear in posts without separate sign-off (current brand policy, set 2026-05-06). Privacy basics still apply — no street numbers, license plates, or full addresses in photos.

## Caption approach

Lead with a person, a moment, or a number. Specificity is the whole game in this pillar.

The body adds one specific detail, a year, a neighborhood, a story, a number. Not adjectives.

**Social CTA** from `.claude/BRAND.md` §10 goes at the end, verbatim:

```
Visit website for Instant Roof Quote
Link in Bio
```

**No hashtags on Instagram captions** per `.claude/BRAND.md` §13. Plain captions only.

**No em dashes** per `.claude/BRAND.md` §4 punctuation rules. Use commas, periods, parentheses, or semicolons instead.

## Overlay text approach

Pull a name, a number, a place, or a moment. Eight words max.

**Good overlay examples:**

- "Six years on the crew"
- "Their third roof with us"
- "Damascus, 2014"
- "Started at sixteen"
- "Built on a ladder"

**Tagline use:** "Got You Covered!" only sparingly, at most 1 in 6 posts in this pillar, save it for moments that earn it.

## Frequency

30% of evergreen volume. At 1 evergreen post per week, this pillar fires every 3–4 weeks under normal photo flow.

## Common failure modes to watch for

- Posts that describe the photo instead of telling the story
- Captions that any roofer could have written
- Featuring the same one or two crew members repeatedly because they're the only photogenic ones, find ways to feature different people, or rotate angles/jobs
- Treating customers as trophies instead of as people
- Forgetting this pillar lives under the Community value, not just "people on roofs"

## Photo flow

Photos arrive from three sources:

1. **JobNimbus**, existing task captures before/after pairs (mostly relevant for Before/After pillar, but crew shots from job sites land here)
2. **Sean directly**, emails or texts photos when he has them
3. **Quarterly video shoots**, still extracts of crew, team moments

Brittany triages all three sources into `clients/french-roofing/social/instagram/evergreen/crew-community/photos/`. No filename convention required, Claude reads photos with vision to understand content. Optional `notes.txt` if a specific person/job/moment has context worth preserving (customer name, crew member tenure, story behind the moment).

## Routing

Generated posts land in `./posts/<YYYY-MM-DD-slug>/` with frontmatter:

```yaml
pillar: crew-community
platform: instagram
status: draft
photo: <relative path into ./photos/ or assets/images/>
```

Each post folder contains: `caption.md`, `overlay.txt`, `schedule.json`, plus a copy or symlink of the published photo. The 90-day reuse rule is enforced against `./posts/` history by `/evergreen-generate`.

## Run log

| Date | Posts generated | Photos used | Notes |
|---|---|---|---|
| 2026-05-06 | 1 (`posts/2026-05-06-brian-tear-off`) | `brian-tear-off-thumbs-up.jpg` | Pilot. Approved by bb@sagareus.com. Set as canonical exemplar (see `POST-EXEMPLAR.md`). Hook pattern: name+fact. |
