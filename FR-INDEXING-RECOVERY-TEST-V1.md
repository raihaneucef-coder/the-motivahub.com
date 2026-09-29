# FR INDEXING RECOVERY TEST V1 — started 2026-09-28

Controlled experiment against the confirmed root cause (crawl-priority starvation, see
FR-INDEXING-FINAL-DIAGNOSIS.md). 3 FR URLs forced into the priority crawl queue. Nothing else touched.

## A) HYPOTHESIS

H: If FR article URLs are pushed through the forced-fetch channel (Request Indexing), they will be
crawled and indexed within ~24h — same behavior as the 7/7 RI flips of 09-27/09-28 — proving the
wall is scheduling, not rejection. If instead a test URL comes back "Explorée, actuellement non
indexée" (crawled but refused), a quality/duplication judgement IS in play and the diagnosis must
reopen.

Two honest corrections to the original test design, made during selection (data, not assumption):
1. "EN twin receives French queries" — verified FALSE at query level: 28d Search Analytics shows
   virtually zero French-query impressions site-wide (only 2 French-looking queries, 1i each; US
   English queries dominate at 289i). Selection criterion #1 was therefore re-based to:
   "EN twin has proven search demand (any language)" — French demand remains to be EARNED by the
   FR pages themselves; that is part of what the test measures.
2. "Connected to P1/P2/P3" — all 3 selected land on P1-adjacent topics (Discipline ×2, Habits ×1)
   because only P1-adjacent twins have real demand data. No P2/P3 twin currently earns enough
   impressions to justify spending 1 of 3 test slots. Deviation logged, not hidden.

## B) TEST URLS (selection table)

| # | FR URL | EN equivalent | Pillar | Why selected | Status at request (28/09) | Expected signal |
|---|---|---|---|---|---|---|
| T1 | /fr/journal/regles-goggins-mental/ | /journal/regles-goggins-mental/ | P1 Discipline | Best-positioned twin: 13i pos 11.2 + 1c; 10 internal links; 2 442-word FR body | Détectée, non indexée (UI showed "ne reconnaît pas" — known flakiness) | indexed ≤24h; then can win its own FR queries at pos ~11 topic |
| T2 | /fr/journal/regle-40-pourcent/ | /journal/regle-40-pourcent/ | P1 Discipline | Highest-demand twin: 28i pos 19.3 + 1c; 11 links; 3 345 words; tested-protocol format = FR-differentiating | Détectée, non indexée (sitemap-0.xml detected in panel) | indexed ≤24h; impressions jump because twin already serves 40%-rule queries |
| T3 | /fr/journal/atomic-habits-review/ | /journal/atomic-habits-review/ | P1 Habits + books | Business value: FR twin of the book review holding hub card + book slot → monetization path once indexed; 24i twin; 15 links (highest); 3 298 words | Détectée, non indexée | indexed ≤24h; unlocks FR book-CTA affiliate chain |

Control group (untouched, same bucket, for comparison): the other ~181 /fr/journal/* URLs sitting
"Détectée, non indexée" — including near-neighbors of the same topics (regle-2-min-productivite,
systemes-battent-motivation, habitude-5-min-relations).

## C) EXECUTION RECORD (Step 2)

All three performed in the GSC UI, property https://the-motivahub.com/, account session ucef raihane,
local time GMT+01:00, Monday 2026-09-28. Each: inspection → live-test modal → "Indexation demandée —
ajoutée à une file d'attente d'exploration prioritaire" confirmed. Quota used: 3/10. No other action
taken (no validation clicks, no sitemap/content/setting changes).

| URL | Status before | Request time | Status after request |
|---|---|---|---|
| regles-goggins-mental (FR) | Not indexed, never crawled | 23:11:12 → 23:11:52 | Queued (priority crawl) |
| regle-40-pourcent (FR) | Détectée, non indexée | 23:12:33 → 23:12:54 | Queued |
| atomic-habits-review (FR) | Détectée, non indexée | 23:13:53 → 23:14:45 | Queued |

Evidence: tests/gsc-r1-01..04-*.png (screenshots for T1/T2; T3 confirmation captured via a11y text —
browser view went hidden mid-run, no visual shot; outcome verified in-panel).

## RESULTS — PENDING (monitoring protocol)

M1. **T+24h (29/09) and T+48h (30/09)**: URL Inspection API v1 on the 3 URLs (read-only script
    /tmp/gsc-inspect.cjs pattern). Record: coverageState, first crawl time, Google-selected canonical.
    Also re-check 5 control URLs for accidental crawls (comparison purity).
M2. **T+7d (05/10 = Oct 5 report)**: Search Analytics on the 3 FR URLs: first impressions, queries
    language (do they win FRENCH queries?), position vs their EN twin. Delta indexed-count FR tree.
M3. **Interpret guardrails**: canonical flipped to EN twin = consolidation evidence (H1 revives);
    "Explorée, non indexée" = quality judgement (reopen diagnosis); indexed + zero impressions after
    7d = demand problem, not index problem (feeds O2 external-demand decision).

## D) DECISION RULE (locked before results — no post-hoc moves)

- **3/3 indexed** → hypothesis proven at scale-ready confidence → prepare prioritized FR list
  (top-30 FR twins ranked by EN-twin demand from Search Analytics) for Oct 5 approval; RI batches
  become a standing mechanism, quota plan 10/day × 3 days.
- **2/3 or 1/3 indexed** → mixed result → mechanism works but something URL-specific blocks the
  rest; investigate the blocked one(s) individually (that URL becomes the new probe) before any
  list-building.
- **0/3 indexed** → forced fetch also fails on article-class URLs → diagnosis reopens entirely;
  the difference vs the 7/7 tool/guide/chrome flips (article template, hreflang pair count, or
  batch-quality perception) becomes the next question. No mass RI, no Pinterest routing, no list.

Either way: do NOT expand the experiment before the T+48h read, and do NOT touch hreflang, sitemap,
content, or the other 181 FR URLs while the control group stays meaningful.
