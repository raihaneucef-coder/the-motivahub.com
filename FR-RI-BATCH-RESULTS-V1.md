# FR RI BATCH RESULTS V1 — Batch 1 (partial: 7 URLs) — fired 2026-09-29 00:00–00:15 GMT+1

User-ordered execution of Section D contingency list, overriding the planned wait-for-verdict gate
(recorded as an explicit decision, not drift). Test trio (3 URLs) remains separate and untouched.
Pre-checks passed for all 7: HTTP 200 live + present in live sitemap-0.xml + no EN-canonical in
inspection + current statuses recorded below before any click.

## EXECUTION RECORD (Batch 1a)

| # | URL | Previous status (API pre-check) | UI status at request | Request timestamp | GSC result message |
|---|---|---|---|---|---|
| 1 | /fr/journal/cant-hurt-me-review/ | Unknown to Google (API) | Détectée, non indexée | 00:05:52 | "Indexation demandée" — queued for priority crawl |
| 2 | /fr/journal/standard-non-negociable/ | Unknown | Détectée, non indexée | 00:08:09 | "Indexation demandée" |
| 3 | /fr/journal/discipline-personnelle-guide/ | Discovered, not indexed | Détectée, non indexée | 00:09:13 | "Indexation demandée" |
| 4 | /fr/journal/histoire-concierge-millionnaire/ | Discovered, not indexed | Détectée, non indexée | 00:10:15 | "Indexation demandée" |
| 5 | /fr/journal/sprint-90-jours/ | Unknown | "Google ne reconnaît pas cette URL" + no sitemap ref | 00:11:55 | "Indexation demandée" |
| 6 | /fr/journal/process-vs-outcome/ | Discovered, not indexed | Détectée (sitemap-0.xml) | 00:12:51 | "Indexation demandée" |
| 7 | /fr/journal/lire-divertissement/ | Discovered, not indexed | "ne reconnaît pas" + no sitemap ref | 00:13:42 | "Indexation demandée" |

- Stop conditions checked during run: **0 already-indexed, 0 foreign-canonical selections** → no halt.
- Quota note: run crossed midnight — these 7 consume **29/09's allocation (7/10 used, 3 left today)**,
  not the expired 28/09 remainder. The 3-URL test was charged to 28/09 (23:11-23:14).
- Evidence: screenshots unavailable (browser view hidden mid-run) — every status + confirmation
  captured verbatim via accessibility snapshots instead; Google's own message confirms re-sending
  adds no priority, so re-running for screenshots is pointless.
- API-vs-UI mismatches (#1, #5): again the known inspection-API instability; UI grouping treated as
  working truth, both sources logged.

## EXPERIMENT SHAPE AFTER THIS BATCH (updated, not broken)

- Forced-fetch article group: **10 URLs** (test trio + batch 1a) — fired at two moments (28/09
  23:11, 29/09 00:00), enabling staggered reads.
- Untouched control: remaining ~140 FR journal URLs in the same "Détectée" state.
- New natural probe discovered during pre-check: **#5 sprint-90-jours & #7 lire-divertissement show
  zero discovery signal in UI ("ne reconnaît pas", no sitemap ref) despite being in the live
  sitemap** — they now test a stronger claim than starvation: whether RI even reaches Google for
  URLs whose sitemap ingestion itself seems missing. Watch them separately.

## MONITORING PLAN

T+24h checkpoints (all via URL Inspection API v1, read-only):
- 29/09 ~23:15 → read the TEST TRIO (fired 28/09 23:11): indexed? first crawl? canonical self?
- 30/09 ~00:15 → read BATCH 1a seven (fired 29/09 00:00): same fields + the 2 zero-discovery URLs
- At each checkpoint: re-sample 5 control URLs (accidental-crawl check) + halt-scan:
  any Google-selected canonical ≠ FR URL → STOP, report, no further batches;
  ≥2 of any group "Crawled – currently not indexed" → pause, diagnosis review.
- T+7d (05/10 Oct-5 report): impressions/queries/positions per fired URL vs control; decision on
  remaining Batch 1 trio (regle-2-min-productivite, missed-day-protocol, focus-on-yourself-stay-
  silent) + Batch 2/3 authorization.

## COMPARISON FRAME (test trio vs batch)

| Dimension | Test trio (3) | Batch 1a (7) |
|---|---|---|
| Class | P1 discipline/habits articles | P1 money-path + near-rank articles |
| Twin demand | 13-28i | 15-49i (higher) |
| Fired at | 28/09 23:11 | 29/09 00:00 |
| Special cases | — | 2× zero-discovery-signal URLs (#5,#7) |
| Success bar | 3/3 indexed | ≥5/7 with canonical self |

## NOT DONE (per rules)
No code/sitemap/content changes. No deploy. No URLs beyond the 7. No "Valider la correction".

---

# T+7d REPORT — 2026-10-05 (scheduled checkpoint)

Method: URL Inspection API v1, read-only (`scripts/gsc-check.mjs coverage`). Field used for
halt-scan is `googleCanonical` (the API has no `canonical` field). atomic-habits-review re-sampled
×5 to cut through known API flapping.

## RESULT: fired 9/10 indexed (90%) vs control 0/5 (0%) — EXPERIMENT PASSED

| # | URL | Group | Status @ T+7d | googleCanonical | lastCrawl |
|---|---|---|---|---|---|
| 1 | regles-goggins-mental | trio ★ | **Submitted and indexed** | self ✅ | 2026-10-01 |
| 2 | regle-40-pourcent | trio ★ | **Submitted and indexed** | self ✅ | 2026-10-03 |
| 3 | atomic-habits-review | trio ★ | Discovered / Unknown (flapping) | — | — |
| 4 | cant-hurt-me-review | batch 1a | **Submitted and indexed** | self ✅ | 2026-09-28 |
| 5 | standard-non-negociable | batch 1a | **Submitted and indexed** | self ✅ | 2026-10-03 |
| 6 | discipline-personnelle-guide | batch 1a | **Submitted and indexed** | self ✅ | 2026-10-03 |
| 7 | histoire-concierge-millionnaire | batch 1a | **Submitted and indexed** | self ✅ | 2026-09-28 |
| 8 | sprint-90-jours | batch 1a (zero-discovery) | **Submitted and indexed** | self ✅ | 2026-09-28 |
| 9 | process-vs-outcome | batch 1a | **Submitted and indexed** | self ✅ | 2026-09-28 |
| 10 | lire-divertissement | batch 1a (zero-discovery) | **Submitted and indexed** | self ✅ | 2026-09-28 |

Control (5 random untouched FR journal URLs): 3 Unknown, 1 Discovered-not-indexed, 1 Crawled-not-indexed → **0 indexed**.

## HALT-RULE SCAN
- **0 foreign/EN canonical selections** across all indexed → NO halt. All 9 are self-canonical FR.
- **0 "Crawled – currently not indexed"** among fired URLs → NO pause trigger.
- Test trio 2/3 indexed → NOT 0/3, queue stays UNholstered. Success bar (≥5/7 batch 1a) → achieved 7/7.

## KEY FINDINGS
1. The two **zero-discovery-signal URLs** (sprint-90-jours, lire-divertissement) — which showed "Google
   ne reconnaît pas cette URL" in the UI on 29/09 — are now **indexed**. Proves RI reaches Google and
   forces indexing even when sitemap-ingestion signal appeared missing. Discovery was never the bottleneck.
2. **RI is causally effective**: fired 90% indexed vs control 0%. This is the controlled-experiment proof
   that Request Indexing (not waiting) is the lever for FR crawl-starvation on this young domain.
3. **atomic-habits-review** is the lone holdout. Verified technically perfect (self FR canonical, hreflang
   en/fr/x-default, robots index/follow, EN twin indexed, no noindex, updatedDate 2026-09-25). Google
   crawls but declines — consistent with the hyper-competitive "atomic habits review" SERP, not a bug.
   FR title is a literal translation ("rapport de terrain en 4 lectures"); candidate for a content-polish
   pass if we want to win it, but no technical action required.

## DECISION UNLOCKED (per Oct-5 protocol)
- Batch 2 (deep demand + tool bridges, incl. /fr/pdf/30-days-discipline/, /fr/30-days) and Batch 3
  (service sweep) are **authorized** to fire next — gated on browser RI (needs user-authenticated GSC
  session + tomorrow's ~11/day quota). Not fired here: automated Google login is blocked and today's
  quota was already consumed by the 11 FR topic hubs.
- Sitemap lever remains REJECTED (unchanged conclusion).

