# French Roofing Content Quality Gate

Every guide passes this gate BEFORE deploy. Adapted from the Sagareus gate; rules re-derived from `.claude/BRAND.md` + `.claude/CLAUDE.md`. Score ≥ 90 with zero auto-fails = PASS; otherwise fix and rescore (max 3 iterations), then hold and escalate.

## Auto-fails (any one blocks, regardless of score)

| # | Rule | Source |
|---|---|---|
| A1 | Banned words: premier, industry-leading, rockstar, synergy, amazing team, cutting-edge, world-class, best-in-class | Voice rules |
| A2 | "French Roofing LLC" anywhere (correct: French Roofing; legal entity French Construction LLC only in contracts) | Identity |
| A3 | Any city outside the 20-mile Damascus radius list in BRAND.md §9 referenced as service area | Service area lock |
| A4 | Street address published anywhere (public NAP is Damascus, OR 97089 + 971-376-8722 only) | Privacy rule 2026-06 |
| A5 | Invented statistics, made-up costs, or fabricated "studies show" claims; roofing/insurance/legal claims stated as advice rather than plain information | No-invented-stats rule |
| A6 | Internal link to a page that 404s on frenchroofing.com (curl every internal href) | Link integrity |
| A7 | High-pressure or scarcity tactics ("act now", "limited slots", fake urgency) | CTA rules |
| A8 | "Got You Covered!" used when it already appears in 5 of the last 5 social posts, or more than once per guide | Tagline ration |
| A9 | `npm run build` fails with the new guide in place | Guides are code; a bad module breaks the whole site |

## Scored rubric (100 pts)

1. **Content quality (30):** answers the searcher's question in the first sentences under each heading (AEO answer-first, per types.ts contract) (10); specific to Oregon/PNW conditions: rain, moss, Doug firs, our cities (8); no filler; every section earns its place (6); sounds like Sean: neighborly, plain, lightly funny, never salesy (6)
2. **Accuracy (25):** every claim verifiable; costs given as honest ranges with "every roof is different" framing, never precise invented numbers (10); Oregon specifics current (building codes, insurance norms as information) (8); first-hand operator voice: 20 years on roofs, real trade-offs (7)
3. **SEO mechanics (20):** metaTitle ≤ 60 chars w/ target query, description 120-158 (5); slug short, matches cluster map (3); ≥ 2 internal links (money page + sibling guide), all resolving (6); heroImage/ogPhoto set with real alt text (6)
4. **AEO (15):** question-form headings where natural (5); faqs[] filled with 3-5 self-contained Q&As (FAQPage schema emits from these) (5); entities consistent: "French Roofing", full city names, "Oregon" (5)
5. **Conversion (10):** CTA present, assessment-framed ("Schedule a FREE Roof Assessment"), zero pressure (5); cluster's money page linked in context (5)

## Scorecard format

```
PASS 93/100 | storm-damage-insurance-claim | no auto-fails
```

Plus a notes block for anything a human should see (insurance-adjacent claims, cost mentions, borderline tone). When in doubt on A4/A5, flag even on PASS.
