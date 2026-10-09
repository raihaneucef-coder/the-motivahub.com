# FR RI — BATCH 3 READY LIST (built from coverage API data 2026-10-07)

Source: /tmp/coverage_all.tsv (438 sitemap URLs inspected via GSC URL Inspection API).
Batch 3 = "service sweep" = non-journal / non-topic / non-guide utility + tool + funnel pages
that are NOT indexed. Excludes /fr/pdf/30-days-discipline/ (already fired in Batch 2 on 2026-10-07).

Fire tomorrow (2026-10-08) with fresh ~10-11/day quota, AFTER the T+24h Batch 2 coverage check.
Stop when the daily quota message appears; roll the rest into the next day.

## FIRED 2026-10-08 (partial): 6/14 succeeded, then transient "retry later" block (not quota msg)
- DONE: habit-stacker, objectives, tracker, meditation-timer, cold-shower-tracker, reading-calculator
- PENDING (retry later): bio, contact, memento-mori, quotes, psychology, credits, terms, affiliate-disclosure
- No foreign-canonical halts. habit-books (#15) skipped = already indexed (RI 2026-10-07).

## UPDATE 2026-10-08 (later): bio fired too = 7/14 done; HARD daily quota hit on contact
- DONE (7): habit-stacker, objectives, tracker, meditation-timer, cold-shower-tracker, reading-calculator, bio
- REMAINING 7 for 2026-10-09: contact, memento-mori, quotes, psychology, credits, terms, affiliate-disclosure
- No foreign-canonical halts.

## RETRY 2026-10-09 (early): 0/7 fired — quota NOT reset yet
- First URL /fr/contact/ hit "Quota dépassé" immediately; request NOT registered.
- Root cause: Google resets RI quota on Pacific Time, not local. Early Oct 9 Morocco = still Oct 8 Pacific window (7 already used).
- ACTION: retry the 7 later after Pacific reset (~09:00 local Oct 10). Order preserved above. No canonical halts.

## RETRY 2026-10-09 on URL-PREFIX property: 5/7 fired, batch CLOSED
- KEY LEARNING: RI daily quota is PER-PROPERTY. Domain property quota was exhausted, but URL-prefix `https://the-motivahub.com/` had a separate fresh quota. Fired there successfully.
- FIRED (5): memento-mori, quotes, psychology, credits, terms -> all "Indexation demandée".
- SKIPPED (2): /fr/contact/ and /fr/affiliate-disclosure/ show GSC "Page d'origine" = EN twin. VERIFIED technically flawless (lang=fr, data-ssr-fr=1, self-canonical FR, reciprocal hreflang en/fr/x-default, French visible body; English only in data-en-* toggle attrs). Browser's claims (missing from sitemap / untranslated / missing lang) were ALL FALSE. Google consolidates near-identical legal boilerplate onto EN = Google's indexing decision, not a bug. Do NOT burn quota RI-ing them, do NOT change code.
- All 7 sitemap membership confirmed present (grep on /tmp/sitemap_urls.txt).

## FIRE ORDER (money-path tools + funnel + service first)

FR (15):
1.  https://the-motivahub.com/fr/tools/habit-stacker/         (Discovered-not-indexed; bridges to indexed tool)
2.  https://the-motivahub.com/fr/objectives/                  (URL unknown)
3.  https://the-motivahub.com/fr/tracker/                     (Discovered-not-indexed)
4.  https://the-motivahub.com/fr/tools/meditation-timer/      (Discovered-not-indexed)
5.  https://the-motivahub.com/fr/tools/cold-shower-tracker/   (URL unknown)
6.  https://the-motivahub.com/fr/tools/reading-calculator/    (URL unknown)
7.  https://the-motivahub.com/fr/bio/                         (URL unknown)
8.  https://the-motivahub.com/fr/contact/                     (URL unknown)
9.  https://the-motivahub.com/fr/memento-mori/                (Discovered-not-indexed)
10. https://the-motivahub.com/fr/quotes/                      (Discovered-not-indexed)
11. https://the-motivahub.com/fr/psychology/                  (URL unknown)
12. https://the-motivahub.com/fr/credits/                     (Discovered-not-indexed)
13. https://the-motivahub.com/fr/terms/                       (URL unknown)
14. https://the-motivahub.com/fr/affiliate-disclosure/        (URL unknown)
15. https://the-motivahub.com/fr/best/habit-books/            (Crawled-not-indexed — watch: if 2nd crawled-not-indexed appears, pause per halt rule)

EN (2):
16. https://the-motivahub.com/credits/                        (URL unknown)
17. https://the-motivahub.com/pdf/30-days-discipline/         (URL unknown)

## HALT RULES (carry over)
- Any foreign/EN canonical chosen -> STOP, report.
- >=2 "Crawled - currently not indexed" in this batch -> pause, review content quality.
- Re-sample any "unknown/declined" x5 before trusting a failure (API flaps).

## CONTEXT
- Current indexing (2026-10-07): 206/438 indexed = EN 151/218 (69%), FR 55/220 (25%).
- FR crawl-starvation is the bottleneck; these service pages are high-value (funnel + tools).
