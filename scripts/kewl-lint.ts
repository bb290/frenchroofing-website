#!/usr/bin/env -S npx tsx
/**
 * kewl-lint.ts
 *
 * Checks generated captions against the rules that are mechanical enough to check by machine.
 * FAIL = must be fixed before anything goes to Metricool. WARN = a human-style read is needed:
 * the pattern is often fine, but it is where invented facts have shown up before.
 *
 * It does NOT replace reading the captions. It cannot tell whether a caption is true to the photo.
 *
 * Usage: npm run kewl:lint -- <post-dir> [<post-dir> ...]      (exit 1 on any FAIL)
 */

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { basename, join, resolve } from "node:path";

const PLATFORMS = ["instagram", "facebook", "linkedin", "gmb"] as const;

type Rule = { level: "FAIL" | "WARN"; label: string; rx: RegExp; only?: readonly string[] };

const RULES: Rule[] = [
  { level: "FAIL", label: "em dash", rx: /—/ },
  { level: "FAIL", label: "phone number on social", rx: /\b\d{3}[-. ]\d{3}[-. ]\d{4}\b/ },
  { level: "FAIL", label: "family-owned line", rx: /family[- ](owned|operated|business)/i },
  { level: "FAIL", label: "banned word", rx: /\b(premier|industry-leading|rockstar|synergy|amazing team|cutting-edge|world-class|best-in-class)\b/i },
  { level: "FAIL", label: "names Portland (BRAND.md sec.9)", rx: /portland/i },
  { level: "FAIL", label: "street address", rx: /van zyl|16235/i },
  { level: "FAIL", label: "hashtag on Instagram", rx: /(^|\s)#[A-Za-z]/, only: ["instagram"] },
  { level: "FAIL", label: "GBP over 1500 chars", rx: /^[\s\S]{1500,}$/, only: ["gmb"] },
  { level: "WARN", label: "hashtag (BRAND.md sec.13 default is none)", rx: /(^|\s)#[A-Za-z]/, only: ["facebook", "linkedin"] },
  { level: "WARN", label: "timing claim, is it in the note?", rx: /\b(this|last) (week|month|morning)\b|\btoday\b|\byesterday\b/i },
  { level: "WARN", label: "price", rx: /\$\s?\d/ },
  { level: "WARN", label: "statistic or odds", rx: /\b\d+ ?(%|percent)|\b(nine|eight|seven) times out of ten|\b\d+ out of \d+/i },
  { level: "WARN", label: "lifespan or age figure, confirm with Sean", rx: /\b\d+ (to|-) ?\d+[- ]years?\b|\byear \d+|\b\d+-plus years|\b\d+\+? years? old/i },
  { level: "WARN", label: "anecdote, is it in the note?", rx: /\b(homeowner|customer|owner|tenant) (had|didn't|did not|was|told|called|said)\b/i },
  { level: "WARN", label: "business claim, is it in the note?", rx: /brought in as a sub|every (job|repair|roof) we|on every (job|site|inspection)/i },
  { level: "WARN", label: "tagline (max 1 in 6 posts)", rx: /got you covered/i },
];

async function main() {
  const dirs = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (dirs.length === 0) throw new Error("usage: npm run kewl:lint -- <post-dir> [<post-dir> ...]");
  let fails = 0;
  let warns = 0;

  for (const dir of dirs.map((d) => resolve(d))) {
    const workClaimBlocked = await estimateSourced(dir);
    for (const platform of PLATFORMS) {
      const file = join(dir, `caption-${platform}.md`);
      if (!existsSync(file)) continue;
      const text = (await readFile(file, "utf-8")).split(/^# Caption \(.*\)\s*$/m)[1]?.trim() ?? "";
      const rules = workClaimBlocked
        ? [...RULES, { level: "FAIL", label: "claims work on an inspection/estimate photo", rx: /\bwe (installed|replaced|repaired|fixed|rebuilt|patched|completed)\b|\b(job|roof|repair) we (did|completed|finished)\b/i } as Rule]
        : RULES;
      for (const rule of rules) {
        if (rule.only && !rule.only.includes(platform)) continue;
        const m = rule.rx.exec(text);
        if (!m) continue;
        if (rule.level === "FAIL") fails++;
        else warns++;
        const at = rule.label.startsWith("GBP") ? `${text.length} chars` : `…${text.slice(Math.max(0, m.index - 50), m.index + m[0].length + 40).replace(/\n/g, " ")}…`;
        console.log(`${rule.level}  ${basename(dir).slice(-42).padEnd(42)} ${platform.padEnd(9)} ${rule.label}: ${at}`);
      }
    }
  }
  console.log(`\n${dirs.length} posts: ${fails} FAIL, ${warns} WARN`);
  if (fails > 0) process.exit(1);
}

/** True when the post's context note says the photo came from an inspection / estimate visit. */
async function estimateSourced(postDir: string): Promise<boolean> {
  const inPost = join(postDir, "context-note.txt");
  if (existsSync(inPost)) return /inspection \/ estimate visit/.test(await readFile(inPost, "utf-8"));
  const caption = join(postDir, "caption-instagram.md");
  if (!existsSync(caption)) return false;
  const source = /^source:\s*(.+)$/m.exec(await readFile(caption, "utf-8"))?.[1];
  if (!source) return false;
  const note = resolve(postDir, source).replace(/\.[A-Za-z0-9]+$/, ".txt");
  return existsSync(note) && /inspection \/ estimate visit/.test(await readFile(note, "utf-8"));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
