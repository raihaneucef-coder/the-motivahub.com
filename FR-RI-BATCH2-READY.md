# FR RI — BATCH 2 READY LIST (pre-flight verified 2026-10-05)

Fire tomorrow (2026-10-06) when the daily ~11 URL quota resets, via the browser GSC inspection
combobox (automated Google login is blocked; needs the user-authenticated session).

Pre-flight passed for ALL 8: HTTP 200 + present in live sitemap-0.xml + current status NOT indexed.

## Dropped from Batch 2 (cascade already indexed them — do NOT waste quota):
- ~~how-to-read-30-books-a-year~~ → Submitted and indexed (lastCrawl 2026-09-29)
- ~~/fr/30-days-discipline/~~ → Submitted and indexed (2026-09-30)
- ~~comment-devenir-mentalement-inebranlable~~ → Submitted and indexed (2026-10-03)

## FIRE ORDER (8 URLs, money-path + lead magnet first):

1. https://the-motivahub.com/fr/pdf/30-days-discipline/
   #1 funnel asset (newsletter capture PDF). Status: Discovered-not-indexed.
2. https://the-motivahub.com/fr/topics/travel/
   The one hub that missed yesterday's RI (quota dépassé). Status: Discovered-not-indexed.
3. https://the-motivahub.com/fr/journal/two-minute-rule-guide/
   H3 probe: 36 internal links, never fetched = purest starvation test. Status: URL unknown.
4. https://the-motivahub.com/fr/journal/habit-stacking-routine/
   Bridges to indexed /fr/tools/habit-stacker. Status: URL unknown.
5. https://the-motivahub.com/fr/journal/regle-deux-minutes/
   Status: URL unknown.
6. https://the-motivahub.com/fr/journal/i-tested-12-morning-routines/
   Status: Discovered-not-indexed.
7. https://the-motivahub.com/fr/journal/batching-productivite/
   Status: Discovered-not-indexed.
8. https://the-motivahub.com/fr/journal/echec-meilleur-professeur/
   Status: Discovered-not-indexed.

## HALT RULES (carry over from protocol)
- Any URL that returns a foreign/EN canonical → STOP everything, report.
- ≥2 "Crawled/Explorée – currently not indexed" appearing in this batch → pause next batch, review.
- Re-sample any "unknown/declined" answer x5 (API flaps) before trusting a failure.
- After firing: T+24h API check (scripts/gsc-check.mjs coverage) before authorizing Batch 3.

## NOTES
- /fr/pdf/30-days-discipline/ is flagged "needs 1+ real link (currently orphan)" in the top-30 list.
  RI may still push it to index, but a real internal link from an indexed FR hub is the structural
  fix (deploy-blocked until freeze fully lifts). Watch whether it holds in the index after RI.
- Quota: 8 URLs fit in one day's ~11 allowance, leaving room for Batch 3's never-crawled pages
  (tracker / objectives / memento-mori / bio) to roll into the same day if desired.
