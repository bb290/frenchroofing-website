# Sean's claude.ai setup checklist

For Brittany, at Sean's computer, logged into his accounts. Est. 45-60 min including calibration.

## Files in this kit

| File | Where it goes |
|---|---|
| `project-instructions.md` | Paste into the Project's instructions field |
| `knowledge-business-profile.md` | Upload to Project knowledge |
| `../../skills/fr-email-triage/SKILL.md` | Upload as a claude.ai Skill |
| `../../skills/fr-email-response/SKILL.md` | Upload as a claude.ai Skill (calibrate first, step 4) |
| `sean-cheat-sheet.md` | Print or email to Sean |

## Steps

### 1. Team workspace prerequisites (decision 2026-07-11: Team account, not individual Pro)

- [ ] Create the Claude **Team** workspace for French Roofing (check current seat minimum and per-seat pricing at checkout). Sean's account (sean@frenchexteriors.com) is the primary owner; decide whether Brittany gets an admin seat for ongoing maintenance.
- [ ] Invite the staff who'll use it. Note their emails for the roster.
- [ ] Admin settings: confirm **Skills** and **Connectors** (Gmail, Google Drive) are enabled for the workspace.
- [ ] On Sean's login, connect **Gmail** and **Google Drive** for **sean@frenchexteriors.com** and verify (run "search my email for roof" in a throwaway chat). Connectors are per-user: every other team member must connect their own Gmail on first use, they do NOT get Sean's mailbox.

### 2. Create the project

- [ ] New Project, name it **French Roofing**, created in the Team workspace and shared with the whole team (not private).
- [ ] Paste the contents of `project-instructions.md` (below the marker comment) into "Set project instructions."
- [ ] Upload `knowledge-business-profile.md` to project knowledge.

### 3. Harvest Sean's real voice (do this BEFORE uploading fr-email-response)

In a chat inside the new project, run:

> Search my sent mail from the last 90 days. Find my outgoing emails to customers and leads (skip suppliers and automated mail). Group them by type: new lead replies, estimate follow-ups, scheduling, weather/delays, warranty, payment. For each type show me 2-3 examples verbatim, then summarize: my typical greeting, my typical sign-off, and phrases I use over and over.

### 4. Calibrate fr-email-response

- [ ] Compare the harvest output against the template library in `skills/fr-email-response/SKILL.md`.
- [ ] Fix the sign-off (templates assume "Thanks, / Sean", marked with a CALIBRATE comment).
- [ ] Adjust greetings and any phrasing that doesn't match how Sean actually writes. Keep the guardrails (no em dashes, no invented prices) exactly as written.
- [ ] Fill in real payment methods in template 6 and the Google review link in template 8 (GBP link is in the business profile / BRAND.md §13).
- [ ] Remove the CALIBRATE comments. Commit the changes to this repo so the skill's source of truth stays current.

### 5. Upload the skills

- [ ] Upload/create **fr-email-triage** and **fr-email-response** from the two SKILL.md files. On a Team workspace, add them at the workspace level (admin → Skills) if available so the whole team gets them; otherwise install on Sean's account and repeat per seat as staff onboard.
- [ ] Note: skills aren't project-scoped, they'll trigger in any chat. Fine here since the workspace is all French Roofing.
- [ ] The response skill signs as Sean by default but is told to sign as the actual sender on other seats. If staff start using it heavily, consider per-person template tweaks later.

### 6. Test end to end (in the project)

- [ ] "Triage my inbox" → priorities look right, leads first, junk collapsed to one line, nothing sent/archived/labeled.
- [ ] "Draft a reply to [a real recent lead or customer thread]" → draft lands in Gmail Drafts (verify in Gmail), sounds like Sean, no em dashes, no invented numbers, placeholders listed.
- [ ] Ask something off-template ("write an email telling a customer we found rotten decking") → bad-news tone is straight + plan + options.

### 7. Hand off to Sean

- [ ] Walk him through the cheat sheet (`sean-cheat-sheet.md`). Core message: open the French Roofing project for all work emails, everything Claude writes is a draft, he always hits send himself.
- [ ] The same cheat sheet works for every team member; remind them each person connects their own Gmail the first time.

## Loose ends to close while you have access

- [ ] **Email domain:** his work email is sean@frenchexteriors.com but the public brand email is hello@frenchroofing.com. Confirm where hello@ lives and whether it forwards into this inbox (if it doesn't, triage misses lead mail). Update `BUS-FACTOR.md` (email provider is a listed TODO) and note frenchexteriors.com as a live domain.
- [ ] **BUS-FACTOR.md** also has a TODO for Sean's direct contact details; fill it in.

## Maintenance

- The source of truth for everything Sean's claude.ai uses is this repo (`operations/claude-ai-setup/` + `skills/fr-*`). Edit here first, then re-paste/re-upload on his account. Re-upload the knowledge file whenever `.claude/BRAND.md` changes.
