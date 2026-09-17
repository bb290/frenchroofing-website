#!/usr/bin/env -S npx tsx
/**
 * hcp-photos.ts
 *
 * Pulls job and estimate photos out of Housecall Pro and drops them into
 * assets/images/1.intake, the same drop zone anyone else uses. It is one more way photos
 * ARRIVE; it does not sort, pick pillars, or publish. The weekly Cowork sort and
 * promote-photo.ts stay exactly as they are (see KEWL.md).
 *
 * Per new photo it writes:
 *   assets/images/1.intake/<city>_<YYYY-MM-DD>_<context>_<job|est><number>-<seq>.<ext>
 *   assets/images/1.intake/<same stem>.txt    ← context note for the sort + captioner
 *
 * <context> is a short label of what is IN the photo, written by Claude vision as the photo
 * arrives (scripts/lib/label-photo.ts), and the note gets a one-sentence description for the
 * caption writer. Any part that can't be determined is the literal word UNKNOWN, which is the
 * cue to label that photo by hand. Documents (delivery tickets, invoices) are labeled
 * PAPERWORK-... so they are easy to discard at the sort.
 *
 * Privacy: the context note carries job date, city, work description, and tags ONLY.
 * Customer name, street address, phone, and email are never written anywhere by this script.
 * Whether a given home is OK to feature is still a human call at the sort.
 *
 * Idempotent: every downloaded attachment id is recorded in
 * operations/hcp-data/photos-manifest.json (gitignored), so photos are not re-downloaded
 * after the sort empties 1.intake. Delete an id from the manifest to re-pull it.
 *
 * Usage:
 *   npm run hcp:photos -- [--since 90] [--source jobs|estimates|all] [--dry-run] [--inspect] [--no-label]
 *
 *   --since N   look at records created in the last N days (default 90)
 *   --dry-run   report what would download; write nothing
 *   --no-label  skip the vision labels (context = UNKNOWN); no Anthropic API use
 *   --inspect   print the SHAPE (keys + value types, no values) of the first record that has
 *               attachments, to verify field names against the live API; write nothing
 *
 * Env (loaded from .env.local if not already set):
 *   HOUSECALL_PRO_API_KEY (required)
 *   ANTHROPIC_API_KEY     (for labels; without it context = UNKNOWN)
 *   ANTHROPIC_MODEL       (optional, default claude-opus-5)
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hcpList, loadEnvLocal } from "./lib/hcp";
import { labelPhoto, UNKNOWN, type PhotoLabel } from "./lib/label-photo";

const CLIENT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INTAKE_DIR = join(CLIENT_ROOT, "assets", "images", "1.intake");
const MANIFEST_PATH = join(CLIENT_ROOT, "operations", "hcp-data", "photos-manifest.json");

/** What the intake accepts (KEWL.md): photos and video. PDFs, docs, signatures are skipped. */
const MEDIA_EXTS = new Set([".jpg", ".jpeg", ".png", ".heic", ".webp", ".mov", ".mp4"]);
const MIME_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/heic": ".heic",
  "image/webp": ".webp",
  "video/quicktime": ".mov",
  "video/mp4": ".mp4",
};

/** Formats the vision labeler can read. Video and HEIC come through as UNKNOWN. */
const LABELABLE_EXTS = new Set([".jpg", ".png", ".webp"]);
const CONCURRENCY = 4;

type Rec = Record<string, unknown>;
type Manifest = Record<string, { source: string; number: string; file: string; downloadedAt: string }>;
type Source = { kind: "job" | "est"; path: string; itemsKey: string };

const SOURCES: Record<string, Source> = {
  jobs: { kind: "job", path: "/jobs", itemsKey: "jobs" },
  estimates: { kind: "est", path: "/estimates", itemsKey: "estimates" },
};

const str = (v: unknown): string => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");
const rec = (v: unknown): Rec => (v && typeof v === "object" && !Array.isArray(v) ? (v as Rec) : {});
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

function parseArgs(argv: string[]) {
  const flag = (name: string) => argv.includes(name);
  const value = (name: string) => {
    const i = argv.indexOf(name);
    return i !== -1 ? argv[i + 1] : undefined;
  };
  const since = Number(value("--since") ?? 90);
  const source = value("--source") ?? "all";
  if (!Number.isFinite(since) || since <= 0) throw new Error("--since must be a positive number of days");
  if (!["jobs", "estimates", "all"].includes(source)) throw new Error("--source must be jobs, estimates, or all");
  return { since, source, dryRun: flag("--dry-run"), inspect: flag("--inspect"), label: !flag("--no-label") };
}

/** Attachments on the record itself, plus any nested under estimate options. */
function attachmentsOf(record: Rec): Rec[] {
  const nested = arr(record.options).flatMap((o) => arr(rec(o).attachments));
  return [...arr(record.attachments), ...nested].map(rec);
}

function mediaExt(att: Rec): string | null {
  const url = str(att.url);
  const fromName = extname(str(att.file_name) || str(att.name)).toLowerCase();
  const fromUrl = url ? extname(new URL(url).pathname).toLowerCase() : "";
  const fromMime = MIME_EXT[(str(att.file_type) || str(att.content_type)).toLowerCase()] ?? "";
  const ext = [fromName, fromUrl, fromMime].find((e) => MEDIA_EXTS.has(e));
  return ext ? (ext === ".jpeg" ? ".jpg" : ext) : null;
}

/** Best date for the photo: completion, else scheduled start, else record creation. */
function recordDate(record: Rec): string {
  const iso =
    str(rec(record.work_timestamps).completed_at) ||
    str(rec(record.schedule).scheduled_start) ||
    str(record.created_at);
  return iso.slice(0, 10) || UNKNOWN;
}

function citySlug(record: Rec): string {
  const city = str(rec(record.address).city).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return city || UNKNOWN;
}

/** Context for the sort + captioner. Deliberately excludes customer name, street, phone, email. */
function contextNote(kind: Source["kind"], record: Rec, photo: PhotoLabel): string {
  const address = rec(record.address);
  const city = [str(address.city), str(address.state)].filter(Boolean).join(", ");
  const tags = arr(record.tags).map((t) => str(t) || str(rec(t).name)).filter(Boolean);
  // Jobs carry a description; estimates don't, so fall back to their option names.
  const optionNames = arr(record.options)
    .map((o) => str(rec(o).name))
    .filter((name) => name && !/^Option #\d+$/.test(name));
  const work = str(record.description) || optionNames.join("; ");
  const lines = [
    photo.paperwork && "PAPERWORK: this is a document, not a marketing photo. Discard at the sort; supplier tickets can show the business street address, which is never published.",
    photo.description ? `Photo: ${photo.description}` : `Photo: ${UNKNOWN}. Look at the photo and describe it here before promoting.`,
    `Source: Housecall Pro ${kind === "job" ? "job" : "estimate"} #${str(record.invoice_number) || str(record.estimate_number) || str(record.id)}, ${recordDate(record)}.`,
    city && `City: ${city}. Check it against the locked service-area list in BRAND.md sec.9 before naming it in a caption.`,
    work && `Work: ${work}`,
    str(record.work_status) && `Status: ${str(record.work_status)}`,
    tags.length > 0 && `Tags: ${tags.join(", ")}`,
    "Customer details intentionally omitted. Do not name the customer or show a house number.",
  ];
  return lines.filter(Boolean).join("\n") + "\n";
}

/** Keys and value types only, so the output is safe to share. */
function shape(v: unknown, depth = 0): unknown {
  if (Array.isArray(v)) return v.length > 0 ? [shape(v[0], depth + 1)] : [];
  if (v && typeof v === "object") {
    if (depth >= 3) return "object";
    return Object.fromEntries(Object.entries(v).map(([k, val]) => [k, shape(val, depth + 1)]));
  }
  return v === null ? "null" : typeof v;
}

async function download(url: string): Promise<Buffer> {
  // Attachment URLs are file-storage links; the API key is never sent to them.
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function loadManifest(): Promise<Manifest> {
  if (!existsSync(MANIFEST_PATH)) return {};
  return JSON.parse(await readFile(MANIFEST_PATH, "utf-8")) as Manifest;
}

async function main() {
  loadEnvLocal();
  const args = parseArgs(process.argv.slice(2));
  const cutoff = new Date(Date.now() - args.since * 86_400_000).toISOString();
  const sources = args.source === "all" ? Object.values(SOURCES) : [SOURCES[args.source]];
  const manifest = await loadManifest();
  const stats = { records: 0, withPhotos: 0, downloaded: 0, alreadyHave: 0, skippedNonMedia: 0, failed: 0, unknown: 0, paperwork: 0 };

  for (const source of sources) {
    const records = hcpList<Rec>(source.path, source.itemsKey, {
      expand: ["attachments"],
      sort_by: "created_at",
      sort_direction: "desc",
    });

    for await (const record of records) {
      // Newest first, so the first record older than the window ends this source.
      if (str(record.created_at) && str(record.created_at) < cutoff) break;
      stats.records++;
      const attachments = attachmentsOf(record);
      if (attachments.length === 0) continue;
      stats.withPhotos++;

      if (args.inspect) {
        console.log(`Shape of first ${source.kind} with attachments (types only, no values):`);
        console.log(JSON.stringify(shape(record), null, 2));
        return;
      }

      const number = str(record.invoice_number) || str(record.estimate_number) || str(record.id);
      const tail = `${source.kind}${number.replace(/[^\w-]/g, "")}`;
      let seq = Object.values(manifest).filter((m) => m.source === source.kind && m.number === number).length;

      const pending: { id: string; url: string; ext: string; seq: number }[] = [];
      for (const att of attachments) {
        const id = str(att.id) || str(att.url);
        const ext = mediaExt(att);
        if (!id || !str(att.url) || !ext) stats.skippedNonMedia++;
        else if (manifest[id]) stats.alreadyHave++;
        else pending.push({ id, url: str(att.url), ext, seq: ++seq });
      }

      if (args.dryRun) {
        if (pending.length > 0) console.log(`would download  ${pending.length} from ${tail} (${citySlug(record)}, ${recordDate(record)})`);
        stats.downloaded += pending.length;
        continue;
      }

      // A few at a time: each photo is a download plus a vision call.
      for (let i = 0; i < pending.length; i += CONCURRENCY) {
        await Promise.all(
          pending.slice(i, i + CONCURRENCY).map(async (att) => {
            const seqTag = String(att.seq).padStart(3, "0");
            try {
              const bytes = await download(att.url);
              const photo = args.label && LABELABLE_EXTS.has(att.ext) ? await labelPhoto(bytes) : { label: UNKNOWN, description: "", paperwork: false };
              const stem = `${citySlug(record)}_${recordDate(record)}_${photo.label}_${tail}-${seqTag}`;
              await mkdir(INTAKE_DIR, { recursive: true });
              await writeFile(join(INTAKE_DIR, `${stem}${att.ext}`), bytes, { flag: "wx" });
              await writeFile(join(INTAKE_DIR, `${stem}.txt`), contextNote(source.kind, record, photo));
              manifest[att.id] = { source: source.kind, number, file: `${stem}${att.ext}`, downloadedAt: new Date().toISOString() };
              stats.downloaded++;
              if (photo.label === UNKNOWN) stats.unknown++;
              if (photo.paperwork) stats.paperwork++;
              console.log(`downloaded      ${stem}${att.ext}`);
            } catch (err) {
              stats.failed++;
              console.error(`FAILED          ${tail}-${seqTag}: ${err instanceof Error ? err.message : err}`);
            }
          }),
        );
        // Saved per batch so a crash mid-run never leaves files the manifest doesn't know about.
        await mkdir(dirname(MANIFEST_PATH), { recursive: true });
        await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n");
      }
    }
  }

  if (args.inspect) console.log(`No records with attachments in the last ${args.since} days.`);

  const verb = args.dryRun ? "would download" : "downloaded";
  console.log(
    `\nLast ${args.since} days: ${stats.records} records, ${stats.withPhotos} with attachments. ` +
      `${stats.downloaded} ${verb}, ${stats.alreadyHave} already pulled, ` +
      `${stats.skippedNonMedia} non-media skipped, ${stats.failed} failed.`,
  );
  if (!args.dryRun && stats.downloaded > 0) {
    console.log(`Labels: ${stats.unknown} ${UNKNOWN} (label these by hand at the sort), ${stats.paperwork} flagged PAPERWORK (discard at the sort).`);
  }
  if (stats.failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
