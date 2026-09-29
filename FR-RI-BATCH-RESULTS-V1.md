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
