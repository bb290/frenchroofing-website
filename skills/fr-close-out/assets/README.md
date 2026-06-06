# fr-close-out assets

This folder must contain:

- **`warranty_template.docx`** — the French Roofing workmanship warranty template, with these exact placeholders in the document text:
  - `[Customer Name]`
  - `[Complete Date]`
  - `[Job Address]`

The skill fills these via `sed` and converts the result to PDF. The placeholders must match character-for-character (including the square brackets) or the grep verification step will halt the run.

## Status

`warranty_template.docx` is present in this folder (added 2026-06-03 from the operator's copy). The skill finds it in Cowork via `find /mnt -name "warranty_template.docx"`.

When you install `fr-close-out` in Claude Cowork, make sure this `assets/` folder (with `warranty_template.docx`) goes with it. If you ever replace the template, keep the three placeholders above exact, or the skill's grep verification will halt the run.
