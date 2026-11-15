#!/usr/bin/env -S npx tsx
/**
 * close-out.ts
 *
 * The Housecall Pro half of the fr-close-out skill (.claude/skills/fr-close-out). Reads one
 * job, decides what kind of close-out it gets, and writes everything the skill needs to a
 * single JSON file. It never writes to Housecall Pro, Google, or Gmail; the skill does that.
 *
 *   npm run closeout -- --list [--since 30]   jobs that are complete AND paid, newest first
 *   npm run closeout -- --job 223             one job by its HCP job/invoice number
 *
 * "Ready to close out" mirrors the HCP pipeline's Invoice Paid stage, which the public API
 * does not expose: work_status is complete, every non-voided invoice is paid, and the job
 * has no outstanding balance.
 *
 *   npm run closeout -- --backfill 2026       every job completed in 2026, for the tracker tab
 *   npm run closeout -- --archive 223         move job #223 to the "Archived" pipeline stage
 *                                             (the one write; needs HOUSECALL_PRO_WRITE_KEY)
 *
 * Job type and warranty come from the invoice line items (HCP job types are unused here):
 *   - "Roof Replacement..." line item         → Replacement → 5 Year workmanship warranty
 *   - ...and the estimate option is Presidential → Replacement → 10 Year workmanship warranty
 *   - "...Maintenance..." / "...Cleaning..."  → Maintenance → no workmanship warranty
 *   - anything else                           → Repair      → no workmanship warranty
 *   - no line items                           → Unknown (the skill asks)
 * Anything that says "replacement" without "roof replacement" (e.g. "Shake replacement")
 * is flagged for a human to confirm.
 *
 * Lead source: job → original estimate → "Unknown". Most jobs leave it blank in HCP.
 *
 * Output: operations/hcp-data/closeouts/<job number>.json (gitignored, customer PII).
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { hcp, hcpGet, hcpList, jobPipelineStatusId, loadEnvLocal, setJobPipelineStatus } from "./lib/hcp";

const CLIENT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(CLIENT_ROOT, "operations", "hcp-data", "closeouts");
const MEDIA = /\.(jpe?g|png|heic|webp|mov|mp4)$/i;
const MAX_PAGES = 10;

type Rec = Record<string, any>;

const str = (v: unknown): string => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");
const nameOf = (v: unknown): string => (v && typeof v === "object" ? str((v as Rec).name) : str(v));
const dollars = (cents: unknown) => (typeof cents === "number" ? Math.round(cents) / 100 : null);

function parseArgs(argv: string[]) {
  const value = (name: string) => {
    const i = argv.indexOf(name);
    return i !== -1 ? argv[i + 1] : undefined;
  };
  const since = Number(value("--since") ?? 30);
  if (!Number.isFinite(since) || since <= 0) throw new Error("--since must be a positive number of days");
  const job = value("--job");
  const archive = value("--archive");
  const backfill = value("--backfill");
  if (!job && !archive && !backfill && !argv.includes("--list")) throw new Error("Use --list, --job <number>, --archive <number>, or --backfill <year>.");
  return { job, archive, backfill, list: argv.includes("--list"), since };
}

/**
 * Classify off the line item names: Replacement > Maintenance > Repair. The skill always
 * confirms this with a human. Seen in HCP: "Roof Replacement[ - GOOD/BETTER - ...]",
 * "On the Spot - Roof Repairs", "Roof Repairs - General Roof Repair", "General Repair",
 * "Roof & Gutter Maintenance + Cleaning", "On the Spot - Roof Maintenance".
 */
function classify(itemNames: string[]) {
  const replacement = itemNames.find((n) => /roof replacement|re-?roof|tear[ -]?off/i.test(n));
  if (replacement) {
    const presidential = itemNames.some((n) => /presidential/i.test(n));
    return { jobType: "Replacement", mainItem: replacement, warrantyYears: presidential ? 10 : 5, check: "" };
  }
  if (itemNames.length === 0) {
    return { jobType: "Unknown", mainItem: "", warrantyYears: 0, check: "No line items on the invoice. Ask whether this was a Replacement, Repair, or Maintenance job." };
  }
  const maintenance = itemNames.find((n) => /maintenance|cleaning/i.test(n));
  const odd = itemNames.find((n) => /replacement/i.test(n));
  return {
    jobType: maintenance ? "Maintenance" : "Repair",
    mainItem: maintenance ?? itemNames[0],
    warrantyYears: 0,
    check: odd ? `Line item "${odd}" says replacement but not roof replacement. Confirm the job type.` : "",
  };
}

function paidStatus(job: Rec, invoices: Rec[]) {
  const live = invoices.filter((i) => str(i.status) !== "voided");
  const paidDates = live.map((i) => str(i.paid_at) || str((i.payments ?? []).at(-1)?.created_at)).filter(Boolean).sort();
  return {
    paid: live.length > 0 && live.every((i) => str(i.status) === "paid") && (job.outstanding_balance ?? 0) === 0,
    paidAt: paidDates.at(-1)?.slice(0, 10) ?? "",
    statuses: live.map((i) => str(i.status)),
  };
}

/**
 * Lead source (job, else its original estimate) and the estimate option the job came from.
 * Invoice line items often just say "Roof Replacement"; the option is where the product
 * lives (e.g. "Better - CertainTeed Presidential shingles").
 *
 * job.original_estimate_uuids holds estimate OPTION ids, not estimate ids (/estimates/<it>
 * 404s), so match them against the options on this customer's estimates. A customer can
 * have several estimates with different approved products, so never just take "approved".
 */
async function fromEstimate(job: Rec) {
  const optionIds = new Set([str(job.original_estimate_id), ...((job.original_estimate_uuids ?? []) as string[])].filter(Boolean));
  let estimate: Rec = {};
  let options: Rec[] = [];
  if (optionIds.size > 0 && job.customer?.id) {
    for await (const e of hcpList<Rec>("/estimates", "estimates", { customer_id: str(job.customer.id) }, 3)) {
      const hits = ((e.options ?? []) as Rec[]).filter((o) => optionIds.has(str(o.id)));
      if (hits.length > 0) {
        estimate = e;
        options = hits;
        break;
      }
    }
  }
  const approved = options.map((o) => str(o.name).trim()).filter(Boolean);
  const leadSource = nameOf(job.lead_source) || (nameOf(estimate.lead_source) && `${nameOf(estimate.lead_source)} (from estimate)`) || "Unknown";
  return { leadSource, approved, estimateNumber: str(estimate.estimate_number) };
}

async function details(job: Rec) {
  const { invoices = [] } = (await hcp.jobInvoices(str(job.id))) as { invoices?: Rec[] };
  const items = invoices
    .filter((i) => str(i.status) !== "voided")
    .flatMap((i) => (i.items ?? []) as Rec[])
    .map((it) => str(it.name))
    .filter(Boolean);
  return { invoices, items, ...classify(items), ...paidStatus(job, invoices) };
}

async function findJob(number: string): Promise<Rec | null> {
  for await (const j of hcpList<Rec>("/jobs", "jobs", { sort_by: "created_at", sort_direction: "desc" }, MAX_PAGES)) {
    if (str(j.invoice_number) === number) return j;
  }
  return null;
}

async function list(since: number) {
  const cutoff = new Date(Date.now() - since * 86_400_000).toISOString();
  console.log(`Complete + paid jobs finished in the last ${since} days (newest first):\n`);
  let shown = 0;
  // The API's work_status filter returns nothing for these values, so filter here.
  for await (const j of hcpList<Rec>("/jobs", "jobs", { sort_by: "created_at", sort_direction: "desc" }, MAX_PAGES)) {
    const done = str(j.work_timestamps?.completed_at);
    if (!str(j.work_status).startsWith("complete") || !done || done < cutoff) continue;
    const d = await details(j);
    if (!d.paid) continue;
    const who = `${str(j.customer?.first_name)} ${str(j.customer?.last_name)}`.trim();
    console.log(`#${str(j.invoice_number).padEnd(6)} ${done.slice(0, 10)}  ${d.jobType.padEnd(18)} ${who} (${str(j.address?.city)})  ${d.mainItem}`);
    shown++;
  }
  if (shown === 0) console.log("None found. Widen the window with --since 60.");
}

/** Everything a close-out (or a tracker backfill) needs about one job. */
async function record(full: Rec) {
  const d = await details(full);
  const est = await fromEstimate(full);
  let productCheck = "";
  if (d.jobType === "Replacement") {
    if (est.approved.some((n) => /presidential/i.test(n))) d.warrantyYears = 10;
    else if (est.approved.length === 0 && !d.items.some((n) => /presidential|landmark|tpo/i.test(n))) {
      productCheck = "Product isn't on the invoice and the job isn't linked to an estimate option. Confirm whether this was a Presidential roof (10 Year) or not (5 Year).";
    }
  }
  const c = full.customer ?? {};
  const a = full.address ?? {};
  const street = [str(a.street), str(a.street_line_2)].filter(Boolean).join(" ");
  const completed = str(full.work_timestamps?.completed_at).slice(0, 10);
  const expires = d.warrantyYears && completed
    ? `${Number(completed.slice(0, 4)) + d.warrantyYears}${completed.slice(4)}`
    : "";

  const out = {
    pulledAt: new Date().toISOString(),
    jobId: str(full.id),
    jobNumber: str(full.invoice_number),
    hcpLink: `https://pro.housecallpro.com/app/jobs/${str(full.id)}`,
    workStatus: str(full.work_status),
    completedDate: completed,
    customer: {
      fullName: `${str(c.first_name)} ${str(c.last_name)}`.trim(),
      firstName: str(c.first_name).split(/\s*(?:&|and)\s*/i)[0],
      email: str(c.email),
      phone: str(c.mobile_number) || str(c.home_number) || str(c.work_number),
    },
    address: {
      street,
      city: str(a.city),
      state: str(a.state),
      zip: str(a.zip),
      full: `${street}, ${str(a.city)}, ${str(a.state)} ${str(a.zip)}`,
    },
    jobType: d.jobType,
    mainItem: d.mainItem,
    estimateNumber: est.estimateNumber,
    approvedOption: est.approved.join("; "),
    lineItems: d.items,
    warrantyYears: d.warrantyYears,
    warrantyExpires: expires,
    total: dollars(full.total_amount),
    outstanding: dollars(full.outstanding_balance),
    paid: d.paid,
    paidDate: d.paidAt,
    invoiceStatuses: d.statuses,
    leadSource: est.leadSource,
    crew: ((full.assigned_employees ?? []) as Rec[]).map((e) => `${str(e.first_name)} ${str(e.last_name)}`.trim()),
    photos: ((full.attachments ?? []) as Rec[])
      .filter((p) => MEDIA.test(str(p.file_name)) || /^(image|video)\//.test(str(p.file_type)))
      .map((p) => ({ id: str(p.id), fileName: str(p.file_name), url: str(p.url), type: str(p.file_type) })),
    checks: [
      !d.paid && `Not paid yet (invoices: ${d.statuses.join(", ") || "none"}; outstanding $${dollars(full.outstanding_balance)}). Close-outs wait for Invoice Paid.`,
      !str(full.work_status).startsWith("complete") && `Job status is "${str(full.work_status)}", not complete.`,
      !str(c.email) && "No customer email in HCP. The email draft step needs one.",
      d.check,
      productCheck,
    ].filter(Boolean),
  };
  return out;
}

async function one(number: string) {
  const job = await findJob(number);
  if (!job) throw new Error(`No job #${number} in the newest ${MAX_PAGES * 100} jobs.`);
  const full = (await hcpGet(`/jobs/${str(job.id)}`, { expand: ["attachments"] })) as Rec;
  const out = await record(full);
  await mkdir(OUT_DIR, { recursive: true });
  const path = join(OUT_DIR, `${out.jobNumber}.json`);
  await writeFile(path, JSON.stringify(out, null, 2) + "\n");
  console.log(JSON.stringify(out, null, 2));
  console.log(`\nSaved ${path}`);
}

/**
 * Every job completed in <year> (any payment state; canceled jobs never complete), for
 * backfilling that year's Job Tracker tab. Writes closeouts/backfill-<year>.json.
 */
async function backfill(year: string) {
  const rows = [];
  for await (const j of hcpList<Rec>("/jobs", "jobs", { sort_by: "created_at", sort_direction: "desc" }, MAX_PAGES)) {
    if (!str(j.work_status).startsWith("complete")) continue;
    if (!str(j.work_timestamps?.completed_at).startsWith(year)) continue;
    const r = await record(j);
    rows.push({ ...r, photos: r.photos.length });
    process.stderr.write(".");
  }
  rows.sort((x, y) => x.completedDate.localeCompare(y.completedDate));
  await mkdir(OUT_DIR, { recursive: true });
  const path = join(OUT_DIR, `backfill-${year}.json`);
  await writeFile(path, JSON.stringify(rows, null, 2) + "\n");
  console.log(`\n${rows.length} jobs completed in ${year}. Saved ${path}`);
}

/** Last step of a close-out. Refuses unless the job is still complete and paid. */
async function archive(number: string) {
  const job = await findJob(number);
  if (!job) throw new Error(`No job #${number} in the newest ${MAX_PAGES * 100} jobs.`);
  const d = await details(job);
  if (!str(job.work_status).startsWith("complete") || !d.paid) {
    throw new Error(`Job #${number} is not complete and paid (status "${str(job.work_status)}", invoices ${d.statuses.join(", ")}). Not archived.`);
  }
  await setJobPipelineStatus(str(job.id), await jobPipelineStatusId("Archived"));
  console.log(`Job #${number} moved to the Archived pipeline stage in Housecall Pro.`);
}

async function main() {
  loadEnvLocal();
  const args = parseArgs(process.argv.slice(2));
  if (args.backfill) await backfill(args.backfill);
  else if (args.archive) await archive(args.archive);
  else if (args.job) await one(args.job);
  else await list(args.since);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
