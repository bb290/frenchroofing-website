/**
 * drive-intake.ts — pull new uploads from French Roofing's Google Drive intake into Kewl.
 *
 * Source: Unbound24 Drive, "Unbound24 - Kewl / French Roofing - Pic / Video Upload / 1. Intake"
 * (folder 1tQAXImp5teaNl3Z5bJbMEfYNP9jKhkpi), read through the Composio CLI with the Unbound24 Google
 * account (googledrive_love-saify). Read-only on Drive: it lists and downloads, never moves or deletes.
 *
 *   - Photos and clips in 1. Intake (and any subfolder except "Talking head") land in
 *     assets/images/1.intake as drive_<YYYY-MM-DD>_UNKNOWN_<original name>, each with a <stem>.txt note.
 *     UNKNOWN = label it at the sort, like any hand drop. The weekly sort decides everything else.
 *   - Clips in the "Talking head" subfolder go to assets/video/talking-head/ instead: they are reel
 *     material (Reel Kit, fr-reel), not photo posts, and never go through the photo sort.
 *   - operations/hcp-data/drive-manifest.json (gitignored) remembers every Drive id already pulled, so
 *     a file is downloaded once even after the sort empties 1.intake. Delete an id to re-pull it.
 *
 * Usage:  npm run drive:intake -- [--dry-run]
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync, createWriteStream } from "node:fs";
import { join, dirname, parse } from "node:path";
import { fileURLToPath } from "node:url";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const INTAKE_FOLDER = "1tQAXImp5teaNl3Z5bJbMEfYNP9jKhkpi";
const ACCOUNT = "googledrive_love-saify";
const INTAKE_DIR = join(ROOT, "assets", "images", "1.intake");
const TALKING_DIR = join(ROOT, "assets", "video", "talking-head");
const MANIFEST = join(ROOT, "operations", "hcp-data", "drive-manifest.json");
const MEDIA = /^(image|video)\//;

type DriveFile = { id: string; name: string; mimeType: string; createdTime?: string; size?: string };
type Manifest = Record<string, { name: string; savedAs: string; pulledAt: string }>;

function composio(slug: string, data: object): any {
  const out = execFileSync("composio", ["execute", slug, "--account", ACCOUNT, "-d", JSON.stringify(data)], {
    encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 32 * 1024 * 1024,
  });
  const res = JSON.parse(out.slice(out.indexOf("{")));
  if (!res.successful) throw new Error(`${slug} failed: ${JSON.stringify(res.error)}`);
  return res.data;
}

function list(folderId: string): DriveFile[] {
  const data = composio("GOOGLEDRIVE_FIND_FILE", {
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id,name,mimeType,createdTime,size)",
    supportsAllDrives: true, includeItemsFromAllDrives: true, pageSize: 500,
  });
  return data.files ?? [];
}

/** Every media file under 1. Intake, with the subfolder it sits in ("" for the top level). */
function walk(folderId: string, path = ""): { f: DriveFile; path: string }[] {
  const out: { f: DriveFile; path: string }[] = [];
  for (const f of list(folderId)) {
    if (f.mimeType === "application/vnd.google-apps.folder") out.push(...walk(f.id, path ? `${path}/${f.name}` : f.name));
    else if (MEDIA.test(f.mimeType)) out.push({ f, path });
  }
  return out;
}

async function download(id: string, dest: string) {
  const data = composio("GOOGLEDRIVE_DOWNLOAD_FILE", { fileId: id });
  const url = data?.downloaded_file_content?.s3url;
  if (!url) throw new Error(`no download link for ${id}`);
  const r = await fetch(url);
  if (!r.ok || !r.body) throw new Error(`download ${id}: HTTP ${r.status}`);
  await pipeline(Readable.fromWeb(r.body as any), createWriteStream(dest));
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  const manifest: Manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
  const files = walk(INTAKE_FOLDER);
  const fresh = files.filter(({ f }) => !manifest[f.id]);
  const stats = { found: files.length, already: files.length - fresh.length, intake: 0, talking: 0, failed: 0 };

  for (const { f, path } of fresh) {
    const talking = /talking[ -]?head/i.test(path);
    const day = (f.createdTime ?? new Date().toISOString()).slice(0, 10);
    const safe = f.name.replace(/[^\w.\-]+/g, "-");
    const dir = talking ? TALKING_DIR : INTAKE_DIR;
    const savedAs = talking ? `drive_${day}_${safe}` : `drive_${day}_UNKNOWN_${safe}`;
    const where = `Unbound24 - Kewl / French Roofing - Pic / Video Upload / 1. Intake${path ? " / " + path : ""}`;
    console.log(`${dryRun ? "would pull" : "pulling"}  ${talking ? "[talking head] " : ""}${savedAs}`);
    if (dryRun) { talking ? stats.talking++ : stats.intake++; continue; }
    try {
      mkdirSync(dir, { recursive: true });
      await download(f.id, join(dir, savedAs));
      const note = talking
        ? `Source: Google Drive (${where}), uploaded ${day}, Drive id ${f.id}, original name ${f.name}.\n` +
          `TALKING-HEAD CLIP for the weekly reel (Reel Kit via fr-reel; Brittany's storyboard first). Not for the photo sort.\n`
        : `Source: Google Drive (${where}), uploaded ${day}, Drive id ${f.id}, original name ${f.name}.\n` +
          `Not from Housecall Pro: no job number, city or work type recorded. Do not name a city or state a cause; ` +
          `describe only what is visible. ASK SEAN for the job if a post depends on it.\n`;
      writeFileSync(join(dir, `${parse(savedAs).name}.txt`), note);
      manifest[f.id] = { name: f.name, savedAs: join(talking ? "assets/video/talking-head" : "assets/images/1.intake", savedAs), pulledAt: new Date().toISOString() };
      writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
      talking ? stats.talking++ : stats.intake++;
    } catch (e) {
      stats.failed++;
      console.error(`FAILED ${f.name}: ${(e as Error).message}`);
    }
  }
  const verb = dryRun ? "would pull" : "pulled";
  console.log(`\nDrive intake: ${stats.found} media files, ${stats.already} already pulled. ` +
    `${verb} ${stats.intake} to 1.intake, ${stats.talking} talking-head clips, ${stats.failed} failed.`);
  if (stats.failed) process.exit(1);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
