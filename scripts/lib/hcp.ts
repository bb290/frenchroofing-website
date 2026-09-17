/**
 * hcp.ts
 *
 * Read-only client for the Housecall Pro public API (https://docs.housecallpro.com).
 * Housecall Pro is the system of record for jobs, customers, estimates, and job photos;
 * this is the one place scripts and workflows read that data from.
 *
 * Read-only on purpose: only GET is implemented. Writes (create job, update schedule, ...)
 * get added deliberately, per workflow, once there is a reviewed need. Pair this with a
 * read-only API key (HCP App Store → API Key Management → Generate → "Read-only").
 *
 * Customer data is PII. Never commit API responses; write dumps under operations/hcp-data/
 * (gitignored) and keep customer names, addresses, and phones out of published content.
 *
 * Env (loaded from .env.local if not already set):
 *   HOUSECALL_PRO_API_KEY   (required)
 *   HOUSECALL_PRO_AUTH      (optional: "Token" | "Bearer"; default Token, which is what the
 *                            official docs specify for API keys. Bearer is for OAuth tokens.)
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const CLIENT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const BASE_URL = "https://api.housecallpro.com";
const MAX_RETRIES = 3;

export type AuthScheme = "Token" | "Bearer";
/** Array values are sent as repeated `key[]=` params (e.g. expand: ["attachments"] → expand[]=attachments). */
export type Query = Record<string, string | number | boolean | string[] | undefined>;

export class HcpError extends Error {
  constructor(
    public status: number,
    public path: string,
    public body: string,
  ) {
    super(`Housecall Pro ${status} on GET ${path}: ${body.slice(0, 300)}`);
  }
}

/** Load KEY=VALUE pairs from .env.local into process.env if not already set. */
export function loadEnvLocal() {
  const envPath = join(CLIENT_ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

function apiKey(): string {
  loadEnvLocal();
  const key = process.env.HOUSECALL_PRO_API_KEY;
  if (!key) {
    throw new Error("HOUSECALL_PRO_API_KEY is not set (export it or put it in .env.local).");
  }
  return key;
}

function defaultScheme(): AuthScheme {
  return process.env.HOUSECALL_PRO_AUTH === "Bearer" ? "Bearer" : "Token";
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** GET a path. Retries 429 and 5xx with backoff; throws HcpError on any other non-2xx. */
export async function hcpGet<T = unknown>(
  path: string,
  query: Query = {},
  scheme: AuthScheme = defaultScheme(),
): Promise<T> {
  const key = apiKey();
  const url = new URL(path, BASE_URL);
  for (const [k, v] of Object.entries(query)) {
    if (Array.isArray(v)) for (const item of v) url.searchParams.append(`${k}[]`, item);
    else if (v !== undefined) url.searchParams.set(k, String(v));
  }

  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, {
      headers: { Authorization: `${scheme} ${key}`, Accept: "application/json" },
    });
    if (res.ok) return (await res.json()) as T;

    const retryable = res.status === 429 || res.status >= 500;
    if (!retryable || attempt >= MAX_RETRIES) {
      throw new HcpError(res.status, path, await res.text());
    }
    const retryAfter = Number(res.headers.get("retry-after"));
    await sleep(retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** attempt);
  }
}

type Page = { page?: number; total_pages?: number; total_items?: number };

/**
 * Walk every page of a list endpoint. `itemsKey` is the array field in the response
 * (e.g. "jobs" for /jobs). `maxPages` is a safety cap, not a target.
 */
export async function* hcpList<T = Record<string, unknown>>(
  path: string,
  itemsKey: string,
  query: Query = {},
  maxPages = 200,
): AsyncGenerator<T> {
  for (let page = 1; page <= maxPages; page++) {
    const res = await hcpGet<Page & Record<string, unknown>>(path, {
      page_size: 100,
      ...query,
      page,
    });
    const items = (res[itemsKey] as T[] | undefined) ?? [];
    yield* items;
    if (items.length === 0 || page >= (res.total_pages ?? page)) return;
  }
}

export const hcp = {
  company: () => hcpGet("/company"),
  employees: (q?: Query) => hcpList("/employees", "employees", q),
  customers: (q?: Query) => hcpList("/customers", "customers", q),
  customer: (id: string) => hcpGet(`/customers/${id}`),
  jobs: (q?: Query) => hcpList("/jobs", "jobs", q),
  job: (id: string) => hcpGet(`/jobs/${id}`),
  jobInvoices: (jobId: string) => hcpGet(`/jobs/${jobId}/invoices`),
  estimates: (q?: Query) => hcpList("/estimates", "estimates", q),
  estimate: (id: string) => hcpGet(`/estimates/${id}`),
  invoices: (q?: Query) => hcpList("/invoices", "invoices", q),
  leads: (q?: Query) => hcpList("/leads", "leads", q),
  lead: (id: string) => hcpGet(`/leads/${id}`),
};
