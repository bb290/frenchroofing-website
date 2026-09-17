#!/usr/bin/env -S npx tsx
/**
 * hcp-check.ts
 *
 * Connection smoke test for the Housecall Pro API. Confirms the key works, reports which
 * auth scheme it accepts, and prints record COUNTS per resource. It never prints customer
 * data, so the output is safe to paste into a chat or an issue.
 *
 * Usage:
 *   npm run hcp:check
 *
 * Env (loaded from .env.local if not already set):
 *   HOUSECALL_PRO_API_KEY (required)
 */

import { hcpGet, HcpError, loadEnvLocal, type AuthScheme } from "./lib/hcp";

const RESOURCES: [label: string, path: string, itemsKey: string][] = [
  ["employees", "/employees", "employees"],
  ["customers", "/customers", "customers"],
  ["jobs", "/jobs", "jobs"],
  ["estimates", "/estimates", "estimates"],
  ["invoices", "/invoices", "invoices"],
  ["leads", "/leads", "leads"],
];

async function detectScheme(): Promise<AuthScheme> {
  for (const scheme of ["Token", "Bearer"] as const) {
    try {
      await hcpGet("/company", {}, scheme);
      return scheme;
    } catch (err) {
      if (err instanceof HcpError && err.status === 401) continue;
      throw err;
    }
  }
  throw new Error(
    "Key rejected (401) with both Token and Bearer auth. Check that the key was copied whole, " +
      "is not deleted in API Key Management, and that the account is on the MAX plan.",
  );
}

async function main() {
  loadEnvLocal();
  const scheme = await detectScheme();
  console.log(`Connected. Auth scheme: ${scheme}`);
  if (scheme !== "Token") console.log(`  → add HOUSECALL_PRO_AUTH=${scheme} to .env.local`);

  for (const [label, path, itemsKey] of RESOURCES) {
    try {
      const res = await hcpGet<Record<string, unknown>>(path, { page_size: 1 }, scheme);
      const total = res.total_items ?? `${(res[itemsKey] as unknown[] | undefined)?.length ?? "?"}+`;
      console.log(`  ${label.padEnd(10)} ${total}`);
    } catch (err) {
      const why = err instanceof HcpError ? `HTTP ${err.status}` : String(err);
      console.log(`  ${label.padEnd(10)} unavailable (${why})`);
    }
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
