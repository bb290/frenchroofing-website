---
client: french-roofing
type: reference
status: stub
last-updated: 2026-05-06
---

# French Roofing Crew Bios

> Reference document for any pillar that features a named crew member. Captions can pull facts (tenure, role, story details) from here so they read specific instead of generic.
>
> **Triage owner:** Brittany. Brittany adds rows when new crew members are featured.
>
> **Posting policy:** First names of crew and customers may appear in posts without separate sign-off (current brand policy, set 2026-05-06).

## How to use this file

When `/evergreen-generate` (or a manual draft) writes a post featuring a named crew member, it should:

1. Look up the crew member by first name in the table below.
2. Pull facts from the row (tenure, role, story details) into the caption.
3. If the crew member isn't in the table, fall back to a generic first-name + role mention OR pause and ask Brittany to add them.

## Crew

| First name | Tenure (yrs) | Role | Story details / quirks |
|---|---|---|---|
| Sean | _founder_ | Founder, business owner | Started as subcontractor at 16; founded French Roofing 2014; girl dad; jokester; "not a big computer guy" turned computer guy. **Personal-brand pillar voice candidate.** |
| Brian | _TODO_ | Crew member | "Loves tear-offs". Featured in pilot post `2026-05-06-brian-tear-off`, gives thumbs up mid-tear-off. |
| _TODO add others_ | | | |

## TODO before this is usable

- [ ] Brittany: fill in tenure for Brian and any other named crew members
- [ ] Brittany: add full crew roster (everyone who might appear in a post)
- [ ] Brittany: add story details / quirks for each (one or two specific things that make captions read real, not generic)
- [ ] When `/evergreen-generate` is wired up, have it read this file and fail gracefully if a featured crew member is missing

## Storage convention

Bios live here at `social/crew-bios.md` (platform-level, not per-pillar) so:
- Crew & Community pillar can pull crew member facts
- Before/After pillar can credit the crew that did the work
- Personal Brand pillar can lean on Sean's bio
- Educational pillar can reference Sean's experience when relevant

If a crew member has more story than fits a row, add a separate file at `social/crew-bios/<first-name>.md` and link from the table.
