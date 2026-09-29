# FR RECOVERY ACTION PLAN — 2026-09-28 (planning only, zero changes)

Context: root cause = crawl-priority starvation (FR-INDEXING-FINAL-DIAGNOSIS.md). A 3-URL forced-fetch
test is in flight (results T+24h 29/09, T+48h 30/09). This plan compares every available lever and
picks the fastest safe path. No code, no deploy, no extra quota spent while writing it.

## OPTION COMPARISON

### O1 — Remaining RI quota (7 units today, 10/day after) on a prioritized FR list
- Expected impact: HIGH and PROVEN per-URL — 7/7 chrome/tool flips within 24h; the running 3-URL
  article test measures whether article-class behaves the same. Covers top-30 demand-ranked FR
  pages in 3 days; full 224-URL tree in 23 days (not worth it).
- Risk: LOW-MEDIUM — if the article test fails (crawled-but-refused), 30 units of quota would have
  bought 30 quality verdicts instead of 30 indexes. Unrecoverable once spent.
- Time to result: index status ≤24-48h/URL; first impressions 7-14 days.
- Requires deploy: NO.
- GATE: do not fire before the 30/09 T+48h read. Spending 7 units tonight violates our own decision
  rule and destroys the control group.

### O2 — Dedicated FR sitemap (separate sitemap-fr.xml)
- Expected impact: ≈ ZERO. Measured fact: all 224 FR URLs already sit in sitemap-0.xml and Google
  has known that since ~04/09 — discovery is NOT the missing thing ("Détectée" bucket = "we know,
  we're not coming"). A second sitemap changes nothing in the fetch scheduler.
- Risk: none technically; costs maintenance + a false sense of action.
- Time to result: n/a.
- Requires deploy: YES (new file + robots.txt + GSC submit).
- Verdict: REJECTED as recovery lever.

### O3 — Strengthen FR internal linking
- Evidence nuance (B2 of diagnostic): raw link count does not drive indexing — /fr/30-days-discipline/
  has 236 links and was never fetched; those links live inside the FR subtree Google isn't crawling.
  The version that CAN work: FR links placed on surfaces Google crawls DAILY (EN templates: footer,
  homepage pillar strip, topic span→Link) — a bridge from the hot zone to the cold zone.
- Expected impact: MEDIUM-HIGH structurally, and it's also fix #1 of INTERNAL-LINKING-AUDIT (highest
  leverage change for the whole site, FR included). Topic span→Link alone rewrites 338 pages' graph.
- Risk: LOW (2 lines × 2 templates), but changes anchor inventory site-wide.
- Time to result: after deploy, days-to-2-weeks (template recrawl propagation).
- Requires deploy: YES → blocked until Oct 5 by the freeze.
- Verdict: FIRST structural move after Oct 5; not the fastest path today.

### O4 — Other crawl-demand signals
- O4a Pinterest FR boards → new pins route to /fr/ twins (matches existing bilingual routing rule):
  real off-site demand, ZERO deploy, reversible, only affects future pins. Impact MEDIUM, slow to
  materialize (Pinterest crawl → referral crawl), no quota cost. Do-able now.
- O4b IndexNow: irrelevant for Google (Bing-only). REJECTED.
- O4c Sitemap lastmod refresh / resubmission: measured null effect over 4 weeks. WEAK.
- O4d Newsletter FR segment links to /fr/ pages: genuine click demand on exact URLs; needs list
  segmentation (FR subscribers) — medium effort, post-Oct-5 synergy with welcome sequence.
- O4e Backlinks/outreach: too slow, out of direct control. NOT a recovery lever.

## FASTEST SAFE PATH (chosen)

Phase 0 — NOW → 30/09 (0 units, 0 deploys):
  - Let the 3-URL test run untouched (control group integrity).
  - Priority queue pre-computed from Search Analytics (28d): 77 of 169 FR twins have EN-twin demand >0.
    Top-30 RI queue (t2,t3,t10 already in test → skip on re-fire):
    1 cant-hurt-me-review · 2 regle-40-pourcent* · 3 sprint-90-jours · 4 process-vs-outcome ·
    5 standard-non-negociable (pos 6!) · 6 histoire-concierge-millionnaire · 7 lire-divertissement ·
    8 atomic-habits-review* · 9 regle-2-min-productivite · 10 regles-goggins-mental* ·
    11 focus-on-yourself-stay-silent · 12 discipline-personnelle-guide (pos 4!) · 13 missed-day-protocol ·
    14 how-to-read-30-books-a-year · 15 echec-meilleur-professeur · 16 comment-devenir-mentalement-inebranlable ·
    17 two-minute-rule-guide · 18 habit-stacking-routine · 19 i-tested-12-morning-routines ·
    20 regle-deux-minutes · 21 batching-productivite · (+9 slots reserved for FR service pages:
    /fr/quotes/, /fr/podcast/, /fr/tracker/, /fr/objectives/, /fr/psychology/, /fr/memento-mori/,
    /fr/bio/, /fr/30-days-discipline/, /fr/pdf/30-days-discipline/ — all already failing discovery or
    rejection, each = 1 unit)
  - O4a approved-in-principle only: routing decision for NEW FR pins (no historical pin edits).

Phase 1 — 01/10 → 04/10 (quota only, IF and ONLY IF test = 3/3 indexed):
  - Day 1: 10 units → queue items 1-10. Day 2: items 11-20. Day 3: items 21-30.
  - Monitor each batch T+24h via URL Inspection API. Expect indexed-count FR tree: 6 → 36+.
  - If test = mixed/0: no batch; the blocked URL becomes the next probe (1 unit), plan re-opens.

Phase 2 — 05/10 Decision Report:
  - Real numbers: 30 FR pages' index status + 4-7 days impression data + control group untouched.
  - Deploy O3 (topic span→Link + FR entry points on hot templates) as the structural fix.
  - Continue RI queue beyond top-30 ONLY if impressions justify (demand-proven expansion).

## WHY THIS IS THE FASTEST SAFE PATH
- Only lever with same-day proof is O1 — so it leads; but its evidence base (article-class flips)
  is exactly 72 hours old and incomplete, so it's gated 48h by the test instead of fired blind.
- O2/O4c attack discovery, which measurement shows is NOT the bottleneck (fast wrong direction).
- O3 is the right structural answer but physically blocked by the freeze — it becomes Phase 2, which
  is also when its results can be attributed cleanly against the already-split test/control groups.
- Net: zero waste (0 units before verdict, full top-30 ready to fire), one reversible no-quota move
  (O4a), and the structural fix preserved for post-Oct-5 where it compounds with everything else.
