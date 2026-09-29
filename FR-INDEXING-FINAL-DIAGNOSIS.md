# FR INDEXING — FINAL DIAGNOSIS (2026-09-28)

Sources: GSC Pages report UI read directly (session active, read-only, screenshots in tests/) +
URL Inspection API full pass (169 FR articles) + Search Analytics 28d + local build measurements.
No fixes applied. No indexing requests made. No changes to the site.

## 1. CONFIRMED FACTS

F1. GSC Pages report (updated 21/09/2026): **139 pages in index / 319 not indexed.**
F2. Of the 139 indexed: only **2 are FR paths** (/fr/ home, /fr/privacy/). The French article tree
    contributes ZERO indexed pages in that snapshot.
F3. The exclusion table is tiny and decisive — 4 reasons only:
    - Détectée, actuellement non indexée: **316** (= 224 FR + 92 non-FR)
    - Explorée, actuellement non indexée: **1** (/i18n/slugs-fr.json — a data file, not a page)
    - Autre page avec balise canonique correcte: **1** (/tools/discipline-quiz, missing trailing slash)
    - Introuvable (404): **1** (/i18n/dict- malformed fetch)
F4. **The FR duplicate-rejection buckets do not exist on this property**: no "Doublon sans
    canonical", no "Contenu quasi dupliqué", no noindex bucket, no redirect bucket. Every FR row
    shows "Dernière exploration: Sans objet" — Google has literally NEVER fetched a FR article.
F5. The API (same day) agrees at scale: 0/169 FR articles indexed; its finer split (99 unknown /
    71 discovered) is the usual inspection-API fuzziness — UI grouping ("Détectée" 224 FR) is the
    authoritative version of the same story.
F6. The 3 UI spot-checks (regles-goggins-mental, atomic-habits-review FR, /fr/quotes/) all return
    "La page n'est pas indexée" with crawl fields "Sans objet" — consistent with F4. Google's
    selected-canonical field only appears post-indexing, so "Google chose EN via canonical" is
    NOT what the UI shows.
F7. Everything we actively asked Google to index flipped to indexed within 24h — including 4 FR
    pages (/fr/tools/, /fr/tools/discipline-quiz/, /fr/guides/…/, /fr/books/) verified today via
    API. Those flips post-date the 21/09 report update, which is why they're absent from F1–F2.
F8. Technical markup on FR pages is perfect (re-verified earlier today): 169/169 self-canonical,
    complete bidirectional hreflang, index/follow, all in sitemap, FR bodies 23–35% longer than EN.

## 2. EXACT GSC NUMBERS (21/09 snapshot + 28/09 API overlay)

| Bucket | FR | EN/other | Total |
|---|---|---|---|
| Dans l'index (21/09) | 2 | 137 | 139 |
| Détectée, non indexée | 224 | 92 | 316 |
| Explorée, non indexée | 0 | 1 | 1 |
| Doublon/canonical buckets | 0 | 2 | 2 |
| RI'd 26–28/09, API-verified indexed | 4 | 3 | 7 |
| FR journal pages with 28d impressions | 0 | — | — |

FR tree total ≈ 226 known URLs, 6 indexed (2 old + 4 by RI), ~220 discovered-never-crawled.

## 3. ROOT CAUSE ASSESSMENT

**Primary cause (UI-proven): crawl starvation of the FR URL tree — discovery without fetch.**
Google learns the 224 FR URLs exist (from sitemap + internal links) and repeatedly decides not to
spend a fetch on them ("Sans objet" crawl on every row). It is not a quality verdict (quality
verdicts require crawling → "Explorée, non indexée" — that bucket is empty for FR). It is not a
canonical/duplicate verdict (buckets empty). The decision happens BEFORE any content judgement.

Why Google's fetch scheduler skips FR while happily crawling EN on the same domain:
- Demand signal: FR URLs have zero search history, zero external links (Pinterest FR pins route to
  a handful of pages, no backlinks), and arrived as a 169-URL batch → nothing pulls them forward
- Substitute signal: the EN twins already rank for these topics (pos 11–26 measured). CORRECTION
  (28/09 query-level check): the twins' impressions come mostly from ENGLISH queries — true
  French-query demand site-wide is ≈ zero (2 queries, 1i each in 28d). Google still sees the topic
  need as satisfied; FR demand is unproven, not yet earned
- Trust age: 67-day domain; fetch budget concentrated on the proven EN subtree
The RI mechanism (which forces a fetch) flips exactly this bottleneck — hence F7's 4/4 same-day
success on FR pages. That is the proof-by-action that the wall is scheduling, not rejection.

Corrected from FR-INDEXING-DIAGNOSTIC-V1: H1 "duplicate consolidation" DOWNGRADED (no duplicate
buckets in UI); H3 "crawl starvation" UPGRADED to primary; H5 "API artifact" resolved (API and UI
now agree on the headline: FR ≈ 0 indexed pre-RI).

## 4. WHAT IS NOT THE PROBLEM (all disproven with measurement)

- ❌ noindex / robots / meta blockers (0 found; `index, follow` on all)
- ❌ canonical misconfiguration (169/169 self-canonical)
- ❌ hreflang errors (169/169 complete, bidirectional, cross-slug pair correct)
- ❌ sitemap absence (all FR URLs in live sitemap-0.xml, lastmod fresh)
- ❌ thin/translated-junk content (FR longer than EN; never crawled, so never judged)
- ❌ Google "selected EN canonical" (canonical selection field empty — no crawl happened at all)
- ❌ penalty/manual action (EN tree indexes and ranks normally on same domain/sitemap)

## 5. FIX OPTIONS RANKED BY EVIDENCE (for Oct 5 — none executed)

O1. **Targeted RI in prioritized batches** (evidence: STRONGEST — 7/7 same-day flips incl. 4/4 FR).
    Math: 10/day → 30 FR pages in 3 days. Selection rule available: RI the FR twins of topics that
    ALREADY earn FR queries on EN (demand proven). Risk: treats symptoms daily, not the cause.
O2. **Create genuine crawl demand for FR** (evidence: MEDIUM — mechanism consistent with F7):
    external surfaces pointing at /fr/ URLs (Pinterest FR-board pins → FR twins per existing
    routing rule, new backlinks), so FR URLs enter the fetch queue by demand not by favor.
O3. **Sitemap-pressure refresh** (evidence: WEAK-MEDIUM): FR sitemap resubmission / lastmod bump
    — we already know sitemap presence alone produced ~4 weeks of zero fetches (discovered 04/09,
    still uncrawled). Standalone, this is not it.
O4. **Structural demand shift** (evidence: LOW for indexing, real for users): make FR toggle/menu
    entry points route first-time visitors and share-links to /fr/, building click signal.
O5. **Accept EN-first for FR queries** (evidence: REAL baseline): EN twins rank 11–26 for French
    now; if O1+O2 stall, the loss is cosmetic (URL locale) not practical. Decision-grade fallback.

Not on the list: touching hreflang/canonical (F8 — nothing to fix), mass-RI all 224 (quota 22 days,
and 92 non-FR URLs are stuck in the same bucket — the queue should be global-priority, not FR-priority).

## 6. DECISION NEEDED FOR OCT 5

D-1. **Approve or decline the 3-URL RI probe** (FR twins of the top FR-query topics: e.g. regles-
     goggins-mental, regle-40-pourcent, histoire-concierge-millionnaire — each EN twin already has
     measured FR impressions). Expected outcome per F7: indexed in 24h. If true → O1 becomes the
     standing mechanism and we design the 3-day batch list. If a probed URL flips to "Explorée, non
     indexée" instead → quality judgement enters the picture and O4/O5 gain weight.
D-2. **Choose the batch policy**: which 30 FR URLs get first-week RI priority (proposal: ranked by
     EN-twin FR-query volume from Search Analytics — data ready).
D-3. **Decide Pinterest FR-routing change** (O2): route FR-board pins to /fr/ twins — needs user
     approval as it touches live channel behavior; zero code, pure pin-edit.
D-4. Nothing else about FR should enter the Oct 5 discussion — the cause is named, the remaining
     uncertainty is only "how fast does forced fetch scale", which D-1 answers for the cost of
     3 quota units.
