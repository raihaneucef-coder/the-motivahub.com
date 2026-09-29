# FR INDEXING DIAGNOSTIC V1 — 2026-09-28 (read-only)

Method: URL Inspection API v1 (full pass over 169 FR articles + 3× resampling of 5 URLs), Search
Analytics API (28d), local build inspection (canonical/hreflang/robots/word counts), dist-wide link
graph, live sitemap fetch. External probes (GSC Pages report UI, google.com site: search) were
BLOCKED today (expired session + SERP captcha) — flagged where their verdict is still needed.
No Request Indexing executed. No changes made.

## A) CONFIRMED FACTS

### A1. The technical markup is NOT the problem
Measured on all 169 FR article pages (dist/fr/journal/*):
- 169/169 self-canonical (canonical == own URL) — zero cross-domain canonicalization
- 169/169 complete hreflang sets (en / fr / x-default), bidirectional-correct — including the one
  cross-slug pair (EN sleep-is-unfair-advantage ↔ FR sommeil-avantage-indefendable) verified both ways
- 0 pages with noindex; all carry `index, follow`
- 169/169 present in live sitemap-0.xml (184 FR-journal <loc> entries = 169 articles + 15
  pagination pages page/2–page/15 — see B5), lastmod 2026-09-25
- FR content is NOT thin: measured 3 EN/FR pairs, FR is 23–35% longer than EN (real translation,
  not stub/duplicate text)

### A2. Zero FR journal pages have search presence (28 days)
Search Analytics API, 08-31 → 09-27, pages dimension: only 2 /fr/ paths appear at all —
/fr/ (3c/8i) and /fr/privacy/ (1i). **0 of 169 FR article pages have any impression.**
Note: EN-path pages with FR-origin slugs (/journal/regles-goggins-mental/ 13i pos 11.2,
/journal/regle-40-pourcent/ 28i, /journal/histoire-concierge-millionnaire/ 15i…) ARE indexed and
rank for French queries — they are the de-facto French results on this site.

### A3. URL Inspection API verdict on FR articles: 0/169 indexed
Single full pass: 99 × "URL is unknown to Google" + 71 × "Discovered – currently not indexed".
Resampling 5 URLs ×3 each: verdicts flip only between those two states, never "indexed".
CAUTION (known pitfall): this API mis-verdicted reading-calculator (claimed unknown/discovered,
UI showed it indexed within 24h). But API is consistent here at scale — so either the September
"FR wave indexed" belief was wrong, or something changed. The Pages report UI is the tie-breaker
(blocked today; see D1).

### A4. Active RI works on FR content — instantly
4 FR pages RI'd yesterday (/fr/tools/, /fr/tools/discipline-quiz/, /fr/guides/atomic-habits-ultimate-
guide/, /fr/books/): ALL "Submitted and indexed" today, lastCrawl 09-27. The index CAN hold FR URLs;
this is a crawl-priority/quality decision, not a technical or locale barrier.

### A5. The 9 FR service pages — full matrix
| URL | Sitemap | Internal links (dist-wide) | Inspection verdict |
|---|---|---|---|
| /fr/quotes/ | ✅ | 236 | Discovered, not indexed |
| /fr/podcast/ | ✅ | 236 | Discovered, not indexed |
| /fr/pdf/30-days-discipline/ | ✅ | 0 | Discovered, not indexed |
| /fr/tracker/ | ✅ | 151 | Unknown (never crawled) |
| /fr/objectives/ | ✅ | 0 | Unknown |
| /fr/psychology/ | ✅ | 1 | Unknown |
| /fr/memento-mori/ | ✅ | 80 | Unknown |
| /fr/bio/ | ✅ | 0 | Unknown |
| /fr/30-days-discipline/ | ✅ | 236 | Unknown |

Two distinct failure groups: (i) linked + crawled + rejected (quotes/podcast/pdf), (ii) effectively
never crawled (the other 6) — and 3 of those have ZERO internal links (objectives, bio, pdf-page).

### A6. The "5 FR article twins" framing is obsolete
The Sep-25 assumption ("only 5 FR twins missing") is contradicted by A2+A3: if the API is right,
the missing count is ~169, not 5. If the Pages report contradicts the API, the missing count is
whatever it lists. Either way the specific "suspected 5" cannot be identified from today's tools —
the two candidate sources disagree and the tie-breaker is UI-only. This document reports that honestly.

## B) PATTERNS FOUND

B1. **Language-version consolidation shape**: for every FR article, an EN twin exists at the same
slug with identical topic; EN twins are indexed and even rank for French queries; FR versions are
crawled (where crawled) and refused; hreflang tells Google both exist. This is the classic pattern
where Google keeps ONE version per topic for a small, young site.

B2. Discovery correlates with links, indexing does not: /fr/30-days-discipline/ has 236 links and was
never crawled; /fr/quotes/ has 236 links and was crawled but refused. Link presence controls group
membership (unknown vs discovered), NOT index outcome.

B3. Everything Google actively was asked about (7 RI'd URLs, 8 hubs earlier) got indexed within 24h —
including FR ones. Google's default-mode crawl budget for this domain is currently near zero
(99 "unknown" FR articles = never fetched despite being in a sitemap lastmodded 3 days ago).

B4. The FR article wave is 3 days old (sitemap lastmod 09-25, deploy ~09-25). A young domain
(67 days) adding 169 translated URLs at once is the highest-suspicion scenario for automated
quality evaluation ("batch-translated content" classifier territory).

B5. Sitemap noise: 15 pagination URLs (/fr/journal/page/2–15) submitted as <loc> — minor crawl-budget
and signal-dilution cost; they're also indexable URLs with near-duplicate content.

## C) POSSIBLE CAUSES — HYPOTHESES (clearly unproven)

H1. **Translation-duplicate consolidation** (confidence: MEDIUM-HIGH). Google treats EN+FR as one
content set and indexes only x-default/EN. Consistent with A1–A3 simultaneously. Would be *proven* if
Pages report shows "Doublon" reasons or "Explorée, actuellement non indexée" listing FR articles.

H2. **Batch-translation quality evaluation** (MEDIUM). The whole FR journal appeared at once from a
67-day-old domain → Google's systems may hold ALL of it in "evaluating" state regardless of markup
perfection. Consistent with B4 and with 99 never-crawled.

H3. **Crawl-budget starvation** (HIGH for the 6 never-crawled service pages + 99 unknowns, LOW for
the 71 discovered). Small new domain gets a tiny fetch allotment; English chrome consumes it.

H4. **hreflang not trusted yet across 169 pairs** (LOW-MEDIUM). Correct hreflang requires Google to
crawl BOTH sides to accept the pairing; with H3 starvation, pairs are unverifiable → default behavior
(index what you know = EN) persists.

H5. **API verdict inflation** (OPEN — the honest caveat). All of A3 could partially be inspection-API
artifact; only the Pages report UI (D1) can size the true gap. This hypothesis is testable in 5 minutes.

Rejected by evidence: noindex/canonical misconfiguration (A1), thin FR content (A1 word counts),
sitemap absence (A1), locale-level index ban (A4 — FR URLs index fine when asked).

## D) RECOMMENDATIONS FOR THE OCT 5 DECISION (no action before then)

D1. **First action Oct 5 (or now, 5-min manual, user-logged-in): read the Pages report** —
Indexation → Pages: counts per exclusion reason + the actual indexed list. This single screen
settles H5 and converts H1/H2 from shapes into named causes ("Doublon sans canonical…" vs
"Explorée, non indexée" vs absent). No other diagnostic beats it.

D2. **Controlled RI probe (3 URLs, not 10):** on Oct 5, RI exactly 3 representative FR articles —
one discovered-refused (regles-goggins-mental), one never-crawled (a low-traffic one), one already
ranking in EN (highest FR-query demand). If all 3 flip to indexed like A4 did → budget/evaluation
cause (H2/H3) and a path exists; if they flip back to refused/duplicate → consolidation (H1) is real
and the fix is content-side, not request-side. This costs 3/10 quota for decision-grade information.

D3. **If H1 confirmed → strategy options to weigh (not commit):** differentiate FR bodies beyond
translation (FR-specific examples/data — partially already true, +25% length), strengthen FR internal
discovery (fr/journal index → deep pagination re-links), or accept EN-first for FR queries short-term
(since EN twins already rank FR queries at pos 11-26 — the practical loss is smaller than it looks).
Last resort after Oct-5 data, not before.

D4. **Cheap hygiene regardless of cause:** drop the 15 pagination URLs from sitemap <loc> (B5) and
give /fr/objectives/, /fr/bio/, /fr/pdf/30-days-discipline/ at least one real internal link each
(A5 group ii) — currently they're sitemap-orphaned; no indexing fix is even possible while unfetched.

D5. **Do NOT:** mass-RI FR articles (quota math: 17 days of RI for 169 URLs, and D2 predicts most
would return "Discovered, not indexed" if H1), touch hreflang/canonical (proven correct A1), or
de-index/redirect FR pages before D1 settles the facts.

Expected Oct-5 answer shape: Pages report counts + D2 probe results → one named primary cause →
one decision (differentiate+link vs accept EN-first vs budget-priority fixes). Everything else waits.
