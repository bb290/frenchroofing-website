---
name: fr-close-out
description: End-to-end French Roofing job close-out from Housecall Pro for Replacement, Repair, and Maintenance jobs. Pulls a paid, completed job from the HCP API (customer, address, completion and paid dates, job type, product, lead source, crew, photos), builds the workmanship warranty from the Google Doc template (Replacement only; 10 Year for Presidential roofs), files everything in a Job Archive folder in Drive, sends the job photos to Kewl intake, creates a Gmail DRAFT from team@frenchexteriors.com (warranty attached for replacements; close-out confirmation plus review request for repairs and maintenance), logs the job in the Job Tracker sheet, and moves the job to Archived in the HCP pipeline. Use on "/fr-close-out", "close out job 223", "close out a job", "run a close-out", or "which jobs need closing out".
---

# FR Close-Out: Housecall Pro → warranty, archive, Kewl, email draft, tracker, HCP Archived

Run from `clients/French_Roofing/` in Claude Code on Brittany's Mac. Everything comes from
Housecall Pro; nobody uploads an invoice or photos.

**Human gates.** Confirm the pulled job with the operator before creating anything (step 1).
The email is a DRAFT only; a person reviews and sends it. Never send, never touch payments.
The only Housecall Pro write is the final move to the Archived pipeline stage (step 8).

## Fixed IDs and accounts

Every Google call names the French Roofing account explicitly. Several Google accounts are
connected to Composio (French Roofing, Sagareus, Unbound24) and Composio does not pick
consistently, so a call without `--account` can land in another company's Drive or Gmail.

| What | Value |
|---|---|
| Drive account | `--account googledrive_herein-flet` (brittany@frenchexteriors.com) |
| Gmail account | `gmail_bend-tucket` (brittany@frenchexteriors.com), sends as **team@frenchexteriors.com**. Built into `scripts/gmail_draft.py` |
| Docs account | `--account googledocs_manse-ascend` (brittany@frenchexteriors.com) |
| Sheets account | `googlesheets_ramon-kui` (the only Sheets connection; brittany@frenchexteriors.com) |
| Warranty template (Google Doc) | `1ivCwMUKa-h6mS8F64fiQk7G8qvyFXZg2maLx1dgrCiY` ("French Roofing Workmanship Warranty \| [Job Address]"; carries the logo and Sean's signature image) |
| Job Archive folder | `1forVgO4wwCNdxoCy6bnYtSUuCitWBYw6` |
| Job Tracker sheet | `1FD8f0dEmq3oCWjZrRj83nVAYxD9RROH9UNekhdyU5Q4`, one tab per year (`2026`, `2025`, `2024`) |

If a Composio call returns an account other than frenchexteriors.com, stop.

**Job Archive is on a shared drive.** Raw Drive API calls through `composio proxy` need
`supportsAllDrives=true` or they answer "File not found" for folders that exist. The
`GOOGLEDRIVE_*` tools handle it with `"supports_all_drives": true`.

**Shell:** type `--account <id>` out in full on every command. In zsh an unquoted variable
like `$A="--account x"` stays one argument and Composio just prints its help.

## Rules that decide the close-out

- **Ready = HCP pipeline "Invoice Paid".** The API doesn't expose pipeline stages, so the
  script checks the equivalent: job complete, every non-voided invoice paid, $0 outstanding.
  Not paid means no close-out. Say so and stop.
- **Three job types: Replacement, Repair, Maintenance.** The script classifies from the invoice
  line items ("Roof Replacement...", "...Maintenance..."/"...Cleaning...", everything else is
  Repair). No line items comes back `Unknown`: ask.
- **Warranty only for Replacement jobs.** Repair and Maintenance get no workmanship warranty:
  no warranty doc, and an email that confirms the job is closed out and asks for a review.
- **Presidential roofs get 10 Year; every other replacement gets 5 Year.** The script reads the
  product from the estimate option the job came from (invoice line items usually just say
  "Roof Replacement").
- **Lead source:** job, else its estimate, else "Unknown". Most HCP jobs leave it blank, so
  "Unknown" is normal, not an error.

---

## Step 0: Pick the job

If the operator gave a job number, use it. Otherwise list candidates:

```
npm run closeout -- --list --since 30
```

Then read columns A and B of the current year's tracker tab. A job is closed out only if its
row has a Close-out Date in column A; backfill rows (Notes "Backfilled from HCP") have a Job #
but no Close-out Date and still need closing out. Fill that row in step 7 instead of appending.
Show only the jobs not closed out, and let the operator pick.

The list only shows jobs Housecall Pro marks complete. A job paid but never marked complete
(e.g. #1157, created and paid the same day, "needs scheduling") won't appear; if the operator
names one, pull it with `--job` and ask for the completion date.

## Step 1: Pull and confirm

```
npm run closeout -- --job <N>
```

This writes `operations/hcp-data/closeouts/<N>.json` (gitignored, customer PII). Read that file.
If `checks` is non-empty, show every check. A "not paid" or "not complete" check ends the
run. A product or job-type check gets a direct question.

Check the tracker tab for the completion year: if job `<N>` is already in column B, stop and ask
whether this is a re-run.

Confirm in one short message and wait for a yes:

> **Job #213: ready to close out?**
> Customer: Jane Smith · jane@example.com
> Address: 123 Main St, Portland, OR 97203
> Completed Sep 25, 2026 · Paid Oct 1, 2026 · $18,800
> **Replacement** · Good - CertainTeed Landmark Roof System → **5 Year warranty** (expires Sep 25, 2031)
> Lead source: Online Booking · Crew: Shelby Jones, Jacob Cude · 8 photos in HCP

For Repair or Maintenance the job-type line reads, e.g., `**Repair** · On the Spot - Roof Repairs → no warranty`.
The confirmation also covers the last step: "When it's done I'll move the job to Archived in HCP."

Any correction the operator makes (job type, name spelling, Presidential yes/no) overrides the
JSON for the rest of the run.

## Step 2: Drive folder

Name: `YYYY.MM_<full address>` from the completion date, e.g. `2026.09_123 Main St, Portland, OR 97203`.

Look for it first, so a re-run doesn't make a duplicate:
```
composio execute GOOGLEDRIVE_FIND_FILE --account googledrive_herein-flet -d '{"q":"name = \"<folder name>\" and \"1forVgO4wwCNdxoCy6bnYtSUuCitWBYw6\" in parents and trashed = false","fields":"files(id,name)"}'
```
If not found, create it, then a `Photos` subfolder inside it:
```
composio execute GOOGLEDRIVE_CREATE_FOLDER --account googledrive_herein-flet -d '{"name":"<folder name>","parent_id":"1forVgO4wwCNdxoCy6bnYtSUuCitWBYw6"}'
composio execute GOOGLEDRIVE_CREATE_FOLDER --account googledrive_herein-flet -d '{"name":"Photos","parent_id":"<folder id>"}'
```
Keep both ids and the folder's `display_url`.

## Step 3: Warranty (Replacement jobs only)

Skip this step entirely for Repair and Maintenance.

**3a. Copy the template into the job folder** (Drive API through the proxy, because the copy
tool can't set a parent folder):
```
composio proxy "https://www.googleapis.com/drive/v3/files/1ivCwMUKa-h6mS8F64fiQk7G8qvyFXZg2maLx1dgrCiY/copy?supportsAllDrives=true&fields=id,name" \
  --toolkit googledrive --account googledrive_herein-flet --method POST \
  --header 'Content-Type: application/json' \
  --data '{"name":"French Roofing Workmanship Warranty | <full address>","parents":["<folder id>"]}'
```

**3b. Fill it in one batchUpdate.** Write the request to a temp JSON file (values contain commas
and quotes) and post it:
```
composio proxy "https://docs.googleapis.com/v1/documents/<doc id>:batchUpdate" \
  --toolkit googledocs --account googledocs_manse-ascend --method POST \
  --header 'Content-Type: application/json' --data @<request.json>
```
Requests, each `{"replaceAllText":{"containsText":{"text":"<find>","matchCase":true},"replaceText":"<value>"}}`:

| Find | Replace with |
|---|---|
| `[Customer Name]` | full customer name as confirmed, e.g. `John & Jane Smith` |
| `[Complete Date]` | spelled-out completion date, e.g. `September 25, 2026` |
| `[Job Address]` | full address |
| `5 Year Workmanship` | `10 Year Workmanship` (**10 Year jobs only**) |
| `a period 5 years` | `a period 10 years` (**10 Year jobs only**) |

Every reply's `occurrencesChanged` must be exactly 1. If any is 0, the template text changed:
stop and report which phrase didn't match. Don't hand-edit around it.

**3c. Export the PDF and file it.**
```
composio execute GOOGLEDRIVE_EXPORT_GOOGLE_WORKSPACE_FILE --account googledrive_herein-flet -d '{"fileId":"<doc id>","mimeType":"application/pdf"}'
```
The result's `data.file.s3url` is a temporary link to the PDF (valid one hour). Use it twice:
- Upload into the job folder:
  `composio execute GOOGLEDRIVE_UPLOAD_FROM_URL --account googledrive_herein-flet -d '{"source_url":"<s3url>","name":"French Roofing Workmanship Warranty - <street>.pdf","mime_type":"application/pdf","parent_folder_id":"<folder id>","supports_all_drives":true}'`
- Download a local copy for the email attachment:
  `curl -s -o "operations/hcp-data/closeouts/<N>/French Roofing Workmanship Warranty - <street>.pdf" "<s3url>"`

Open the local PDF and check the name, date, address, the warranty term in the title and body,
and that Sean's signature image is there. The filled Google Doc stays in the folder as the
editable original.

## Step 4: Photos to Drive

For each entry in `photos` from the JSON, upload straight from Housecall Pro into `Photos`:
```
composio execute GOOGLEDRIVE_UPLOAD_FROM_URL --account googledrive_herein-flet -d '{"source_url":"<photo url>","name":"<fileName>","parent_folder_id":"<Photos folder id>","supports_all_drives":true}'
```
Run these in the background: 8 photos took about 2 minutes on the first run. Retry each
failure once (on the first run 1 of 8 failed and went through on retry). Track successes and
failures. A failed photo never blocks the close-out; list it in the summary
so someone can add it from HCP. Never say photos are archived if they aren't.

## Step 5: Photos to Kewl

Skip if the job has no photos.
```
npm run hcp:photos -- --job <N>
```
This drops the photos into `assets/images/1.intake` with vision labels and PII-free context
notes. The Wednesday Kewl run sorts and promotes them. It's needed because the weekly run only
pulls jobs *created* in the last 10 days, and close-outs are usually older. The manifest skips
anything already pulled.

## Step 6: Customer email (Gmail DRAFT)

Write the body to `operations/hcp-data/closeouts/<N>/email.txt` and create the draft:
```
python3 .claude/skills/fr-close-out/scripts/gmail_draft.py \
  --to "<customer email>" --subject "<subject>" \
  --body-file operations/hcp-data/closeouts/<N>/email.txt \
  --attach "operations/hcp-data/closeouts/<N>/French Roofing Workmanship Warranty - <street>.pdf"
```
Leave out `--attach` for Repair and Maintenance. The script sends from team@frenchexteriors.com
and exits non-zero if Gmail didn't keep that alias. To change a draft already made, pass
`--update <draft id>` with the same arguments; it replaces that draft instead of adding one. team@ has no Gmail signature.

`[FIRST_NAME]` is the first name only ("John" from "John & Jane Smith"), capitalized. No em dashes.
No sign-off line; use the wording below exactly (operator wording, 2026-10-21).

Write the survey line exactly as `Click here for 1 Question Survey: https://www.giveratings.com/french-roofing`.
The helper turns it into a link reading "Click here for 1 Question Survey" in the HTML version
and keeps the full URL in the plain-text version.

**Replacement.** Subject: `Thank you for trusting French Roofing | Workmanship Warranty`
```
Hi [FIRST_NAME],

Your [5 or 10] Year Workmanship Warranty is attached. Keep it with your home records. It transfers one time to a new owner if you ever sell.

Would you mind taking 15 seconds to answer 1 quick question about how we did? Your feedback helps us grow and helps other homeowners feel confident choosing us.

Click here for 1 Question Survey: https://www.giveratings.com/french-roofing

Thank you again for trusting French Roofing with your roof! We truly appreciate the opportunity to serve you.
```

**Repair or Maintenance (no warranty).** Subject: `Your French Roofing repair is complete`, or
`Your French Roofing maintenance visit is complete`
```
Hi [FIRST_NAME],

Thank you again for trusting French Roofing with your roof! We truly appreciate the opportunity to serve you.

Would you mind taking 15 seconds to answer 1 quick question about how we did? Your feedback helps us grow and helps other homeowners feel confident choosing us.

Click here for 1 Question Survey: https://www.giveratings.com/french-roofing
```

**Two jobs for the same customer closed out together:** one email. If either job is a
Replacement, use the Replacement email with every warranty attached; otherwise use the
no-warranty email with subject `Your French Roofing repairs are complete`. Each job still gets
its own folder, tracker row, and archive.

## Step 7: Job Tracker row

Append to the tab for the **completion year** (`2026`, ...). If that tab doesn't exist yet,
ask before creating it. Write the values to a temp JSON file and append with
`GOOGLESHEETS_SPREADSHEETS_VALUES_APPEND` (`spreadsheetId` `1FD8f0dEmq3oCWjZrRj83nVAYxD9RROH9UNekhdyU5Q4`,
`range` `'<year>'!A:V`, `valueInputOption` `USER_ENTERED`, `insertDataOption` `INSERT_ROWS`).

Columns, in order (A to V):

| Column | Value |
|---|---|
| Close-out Date | today, `YYYY-MM-DD` |
| Job # | `jobNumber` |
| Completed Date | `completedDate` |
| Paid Date | `paidDate` |
| Customer Name | confirmed full name |
| Street Address / City / ZIP | from `address` |
| Customer Email / Customer Phone | from `customer` |
| Job Type | `Replacement`, `Repair`, or `Maintenance` |
| Main Line Item | `approvedOption` if set, else `mainItem` |
| Job Total | `total` |
| Lead Source | `leadSource` |
| Crew | `crew` joined with ", " |
| Warranty | `5 Year`, `10 Year (Presidential)`, or `None` |
| Warranty Expires | `warrantyExpires` or blank |
| Drive Folder | `=HYPERLINK("<folder url>","Folder")` |
| Warranty PDF | `=HYPERLINK("<pdf url>","PDF")` or blank |
| Email Draft | `Drafted YYYY-MM-DD (team@)` |
| HCP Job | `=HYPERLINK("<hcpLink>","Open")` |
| Notes | any checks, failed photo uploads, operator corrections, and `HCP not archived` if step 8 failed |

## Step 8: Archive the job in Housecall Pro

Only after steps 2 to 7 succeeded (the draft exists and the tracker row is in):
```
npm run closeout -- --archive <N>
```
This moves the job to the **Archived** pipeline stage (`PUT /pipeline/statuses`), the one
reviewed write in `scripts/lib/hcp.ts`. It re-checks that the job is complete and paid first.
It needs the HCP key in `.env.local` to have write permission (a read-only key gets a 401).
If the call fails for any reason, nothing in HCP changes:
say so in the hand-back (step 9), put `HCP not archived` in the tracker row's Notes, and leave the job
for someone to archive by hand.

## Step 9: Hand back

Keep it short, with counts that match what actually happened:

> **Job #213 closed out**
> - Warranty: 5 Year, PDF in Drive and attached to the draft
> - Drive: [2026.09_123 Main St, Portland, OR 97203](folder link). Warranty doc + PDF, 8 of 8 photos
> - Kewl: 8 photos in `assets/images/1.intake` for Wednesday's run
> - Email: draft from team@ to jane@example.com, ready in Drafts
> - Tracker: row added to 2026
> - Housecall Pro: job moved to Archived
>
> **Next:** read and send the Gmail draft.

---

## Gotchas

- **Accounts.** Always pass `--account` for Drive and Docs. The Gmail helper pins its own
  account. One call without it can file a customer's warranty in the Sagareus Drive.
- **Date formats.** Warranty: `September 25, 2026`. Folder: `2026.09`. Tracker: `2026-09-25`.
- **Address.** Folder, warranty, and tracker use the full address; the PDF filename uses the
  street only.
- **HCP estimate links.** `original_estimate_uuids` on a job are estimate *option* ids. The
  script already handles this; don't "fix" it by fetching `/estimates/<uuid>` (404).
- **Photo links expire after one hour.** The `photos[].url` values in `<N>.json` are signed
  S3 links. If the JSON was pulled more than an hour before step 4, re-run
  `npm run closeout -- --job <N>` first (2026-11-17: all 15 uploads failed "Request has expired"
  on a JSON pulled the night before).
- **"Visit #2" jobs can't be archived.** Follow-up visits ($0, line item "Visit #2") have no
  pipeline card, so step 8 returns `Kanban Card not found`. Expected: note `HCP not archived`
  in the tracker row and move on (2026-11-17, #1164 and #1160).
- **Re-runs.** The folder lookup and tracker check exist so a second run doesn't make
  duplicates. If either already exists, ask whether to reuse it or stop.
- **The template.** The three placeholders and the two 5-year phrases must stay exactly as
  written in the Google Doc, or step 3b stops. It uses the legal name "French Construction LLC
  dba French Roofing" (updated 2026-10-21); don't edit the template during a run.
