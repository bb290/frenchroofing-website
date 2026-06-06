---
name: fr-close-out
description: "End-to-end job close-out for French Roofing, run in Claude Cowork. Use whenever the user wants to close a job, close out a job file, finish a job, wrap up a project, run a close-out, or says 'Fr-close-out'. The user uploads the Housecall Pro invoice and job photos; the skill reads customer name, full address, completion date, and email off the invoice, generates the filled workmanship warranty PDF, creates a private Google Drive folder under 'Job Archive', uploads the warranty and invoice there (photos best-effort with manual fallback), sorts and descriptively renames the photos into Kewl pillar folders (person to crew-community, no person to educational) as a downloadable folder tree, and creates a real Gmail draft to the customer with the thank-you and review-request email pre-filled. Hands back the PDF, Drive link, sorted photos, and draft."
---

# French Roofing — Fr-Close-Out

End-to-end job close-out, built for **Claude Cowork**. One upload (invoice + photos) drives the whole close-out: warranty, archive, social-photo prep, and customer email.

## Where each piece runs (read this first)

This skill runs in **Cowork** (a cloud sandbox). That sets two hard boundaries:

- **Cowork can reach connectors and its own filesystem**, so it handles the warranty pipeline, the Google Drive folder + uploads, and the Gmail draft directly.
- **Cowork CANNOT reach the user's local Mac or the Kewl git repo.** So the photo step does NOT write into the local `social/.../photos/` folders. Instead it produces a **clean, named, ready-to-drop folder tree** the user downloads and drags into Claude Code, where the photos get sorted into the repo and Kewl is triggered. That handoff is intentional, not a limitation to fight.

Do not try to git-push or write to the user's local disk from this skill. That is the Claude Code half of the workflow.

## What the user provides

At the start, the user uploads to the chat:

- **The Housecall Pro invoice** (PDF or image)
- **The job photos**

Uploaded files land in `/mnt/user-data/uploads/`.

## What to collect / confirm

Read these off the invoice, then confirm them back to the user in one short message before doing anything:

- **Customer name** (full, e.g. "John Smith")
- **Full property address** — street, city, state, zip
- **Job completion date**
- **Customer email** (for the Gmail draft)

If any of the four can't be read cleanly off the invoice, ask. Don't guess. Don't proceed until all four are confirmed.

---

## Step 1: Generate the warranty PDF

### Find the template

```bash
find /mnt -name "warranty_template.docx" 2>/dev/null
```

The template ships in this skill's own `assets/` folder (typically `/mnt/skills/user/fr-close-out/assets/warranty_template.docx`). If `find` returns nothing, stop and tell the user the template is missing from the skill's assets.

### Run the full pipeline in one bash call

Substitute the four real values where shown, then run as a single bash command:

```bash
rm -rf /home/claude/warranty_work
mkdir -p /home/claude/warranty_work
cd /home/claude/warranty_work
cp "<TEMPLATE_PATH>" warranty.docx
python /mnt/skills/public/docx/scripts/office/unpack.py warranty.docx unpacked/
sed -i "s|\[Customer Name\]|<CUSTOMER FULL NAME>|g; s|\[Complete Date\]|<MONTH D, YYYY>|g; s|\[Job Address\]|<FULL ADDRESS>|g" unpacked/word/document.xml
grep -q '\[Customer Name\]\|\[Complete Date\]\|\[Job Address\]' unpacked/word/document.xml && echo "ERROR: placeholders not all replaced" && exit 1
python /mnt/skills/public/docx/scripts/office/pack.py unpacked/ warranty_filled.docx
python /mnt/skills/public/docx/scripts/office/soffice.py --headless --convert-to pdf warranty_filled.docx
mv warranty_filled.pdf "/mnt/user-data/outputs/French Roofing Workmanship Warranty - <STREET ADDRESS>.pdf"
ls -la "/mnt/user-data/outputs/French Roofing Workmanship Warranty - <STREET ADDRESS>.pdf"
```

**Substitution values:**
- `<TEMPLATE_PATH>`: full path from the `find` command above
- `<CUSTOMER FULL NAME>`: e.g. `John Smith`
- `<MONTH D, YYYY>`: spelled-out month, e.g. `March 15, 2026` (NOT `3/15/26`)
- `<FULL ADDRESS>`: complete address with city/state/zip, e.g. `1234 Maple St, Houston, TX 77002`
- `<STREET ADDRESS>`: just street, used in the PDF filename for readability, e.g. `1234 Maple St`

**Why one bash call:** end-to-end in a single command keeps it fast (~10-15 seconds). Splitting adds round-trip overhead per step.

**Sed delimiter:** `|` is used instead of `/` because the address contains commas and may contain slashes.

**If the grep step finds remaining placeholders,** stop. Don't re-run sed — the issue is a typo in the substitution values or the template, not the command.

The PDF is saved to `/mnt/user-data/outputs/` so it's ready to present in Step 6. Keep its path; you'll also upload it to Drive in Step 3.

---

## Step 2: Create the Google Drive folder

**Folder name:** `YYYY.MM_Full Address`

- `YYYY.MM` from the completion date (March 15, 2026 → `2026.03`)
- Full address with street, city, state, zip
- Example: `2026.03_1234 Maple St, Houston, TX 77002`

**Parent:** inside the existing **"Job Archive"** folder. Folders stay private.

Load Drive tools if not already available:
```
tool_search(query="google drive search create file")
```

Then:

1. Find the Job Archive folder ID:
   - `Google Drive:search_files` with query: `title = 'Job Archive' and mimeType = 'application/vnd.google-apps.folder'`
   - If multiple match → ask the user which one.
   - If none match → stop and ask the user before creating one (they may have named it slightly differently).
2. Create the new subfolder:
   - `Google Drive:create_file` with:
     - `contentMimeType`: `"application/vnd.google-apps.folder"`
     - `title`: `"<YYYY.MM_Full Address>"`
     - `parentId`: `<Job Archive folder ID>`
   - No content needed — folders have no body.
3. Save the new folder's **id** (for Step 3 uploads) and its **webViewLink** (to show the user in Step 6).

---

## Step 3: Upload files into the Drive folder

Destination = the **Job Archive subfolder created in Step 2** (`parentId` = its id). The Drive archive is the permanent job record, so it gets the **originals**.

Upload via `Google Drive:create_file` using base64 content. In bash, encode with `base64 -w0 "<path>"` and pass the result as `base64Content`, with the right `contentMimeType`.

**Reliable — always upload these two:**
- The **warranty PDF** from Step 1 → `contentMimeType: "application/pdf"`
- The **invoice** the user uploaded → `application/pdf` or the image type it actually is

**Attempt — the photos (this is the fragile part):**
Photos are large and numerous; base64 through a tool call is exactly where "it was too much" happens. So:
- Upload the **original** photos (original filenames) to the Drive folder one at a time.
- If a photo fails or is very large, **don't silently drop it.** Track which succeeded and which didn't.
- After the attempt, if any photos didn't make it, tell the user plainly in Step 6 which ones to drag into the Drive folder manually. Better an honest partial + a clear list than a silent gap.

Do NOT block the rest of the close-out on photo uploads. Warranty + invoice are the must-haves here.

---

## Step 4: Sort and rename the photos for Kewl

This produces the **download-and-drop folder tree** for the Claude Code half. It is separate from the Drive archive: Drive gets originals; Kewl gets sorted, descriptively renamed copies.

### Sorting rule (simple, by sight)

Look at each uploaded photo and route it:

- **A person is visible** (crew, customer, Sean, anyone) → **`crew-community`**
- **No person** (roof, shingles, materials, finished work, details) → **`educational`**

Before/after is **on hold** — do not create a before-after bucket. (Crew capture isn't consistent enough yet; this is a deliberate scope decision.)

### Naming rule (descriptive, for Kewl captions)

Kewl writes captions from the filename, so the name must **describe what's happening in the photo** — not just `IMG_4821.jpg`. Use lowercase kebab-case, `.jpg`, concrete and specific:

- `crew-tearing-off-old-shingles.jpg`
- `customer-in-front-of-finished-home.jpg`
- `architectural-shingle-ridge-closeup.jpg`
- `new-pipe-flashing-detail.jpg`

If several photos show the same thing, suffix `-1`, `-2`, etc. Keep names within the same job consistent.

### Build the output tree

Write the renamed copies into this structure under outputs (mirrors the Kewl pillar paths so the drop into Claude Code is obvious):

```
/mnt/user-data/outputs/kewl-photos/
  crew-community/
    <descriptive-name>.jpg
  educational/
    <descriptive-name>.jpg
```

Only create a bucket folder if it has at least one photo. Every uploaded photo should land in exactly one bucket.

---

## Step 5: Create the customer email as a real Gmail draft

Create an **actual Gmail draft** addressed to the customer so it sits in their Drafts, ready to send. **No attachment** (the connector doesn't support draft attachments, and the user attaches the warranty themselves).

Load Gmail tools if needed:
```
tool_search(query="gmail create draft")
```

Call `Gmail:create_draft` with:
- `to`: `["<customer email>"]` (plain address only)
- `subject`: `Thank you for trusting French Roofing | Workmanship Warranty`
- `body`: the text below, with `[FIRST_NAME]` replaced

**Body:**

```
Hi [FIRST_NAME],

Thank you again for trusting French Roofing! We truly appreciate the opportunity to serve you.

Your workmanship warranty and a photo report from your project are attached.

Would you mind taking 15 seconds to answer 1 quick question about how we did? Your feedback helps us grow and helps other homeowners feel confident choosing us.

Click here for 1 Question Survey: https://www.giveratings.com/french-roofing

We read every response personally.

Thank you for supporting a local business.
```

Rules:
- Replace `[FIRST_NAME]` with the customer's **first name only** ("John" from "John Smith"; "John" from "John & Jane Smith").
- **No sign-off, name, or signature** — Gmail appends the user's signature automatically.
- Save the draft id / confirm creation for the summary.

---

## Step 6: Hand it all back

1. `present_files` with:
   - the warranty PDF
   - the `kewl-photos/` folder tree
2. Then a short summary (keep it tight). Example:

> ✅ Warranty PDF generated, download above.
> ✅ Drive folder created: [2026.03_1234 Maple St, Houston, TX 77002](folder_link)
> ✅ Uploaded to Drive: warranty + invoice + 6 of 6 photos.
> ✅ Photos sorted for Kewl: 4 crew-community, 2 educational, download above.
> ✅ Gmail draft created to john@example.com, ready in your Drafts.
>
> **Your next steps:**
> 1. Drag the `kewl-photos` folder into Claude Code, ask it to sort into the repo and trigger Kewl.
> 2. Open the Gmail draft, attach the warranty PDF, and send.

Adjust the counts to reality. If any photos failed to upload to Drive in Step 3, list them here with "drag these into the Drive folder manually."

---

## Edge cases & gotchas

- **Reading the invoice.** Pull name / address / completion date / email straight off the uploaded invoice, then confirm. If the invoice is an image and a field is unreadable, ask rather than guess.
- **Customer name parsing.** "John & Jane Smith" → full string in the warranty; first name only ("John") in the email greeting.
- **Address formatting.** Drive folder = full address (street + city + state + zip). Warranty inside the PDF = full address. PDF filename = street only (readability). Keep them consistent within a job.
- **Completion date formats.** Warranty: spelled-out month, `March 15, 2026`. Drive folder: `YYYY.MM`, `2026.03`. Same date, different formats — don't mix them up.
- **"Job Archive" parent missing.** Stop and confirm before creating one.
- **Photo upload to Drive is the fragile step.** Always get warranty + invoice up; attempt photos; report any that didn't make it. Never claim photos are archived if they aren't.
- **No local repo writes.** This skill stops at the downloadable photo tree. Sorting into `social/.../photos/`, committing, and triggering Kewl is the Claude Code half — don't attempt it here.
- **Before/after is on hold.** Two buckets only: `crew-community` and `educational`.
- **Sed placeholder failure.** If the grep check fails, stop and diagnose the values/template. Don't re-run sed.
