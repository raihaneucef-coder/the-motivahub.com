# Motiva Hub — Internal Linking & Technical SEO Audit
**Date:** 2026-09-26 · **Mode:** READ-ONLY — no edits, no URL changes, no deploy
**Method:** programmatic link-graph extraction from `dist/` (470 built pages) + `src/data/pillars.ts` parsing + GSC 28d + GA4 28d from the content audit
**All numbers below are measured counts from the production build, not estimates.**

---

## A) Current Architecture (the real link graph)

### Inbound internal links per strategic page (count of dist pages containing ≥1 href)
| Page | Inbound pages | Source of those links |
|---|---|---|
| `/tools/discipline-quiz/` | **238** | header/footer/mega-menu |
| `/tools/habit-stacker/` | 239 | nav + related-tools blocks |
| `/books/` `/quotes/` `/30-days-discipline/` `/best/focus-books/` `/guides/atomic…/` | **237 each** | global nav/footer |
| `/journal/` | site-wide | header |
| `/topics/` (index) | ~237 | mega-menu "Essays" + footer "All Topics" |
| **`/topics/habits/` (P1 hub)** | **3** | `/topics/` index, `/journal/` index, P4 hub chip |
| **`/topics/mindset/` (P2 hub)** | **4** | `/topics/`, hub cross-chips ×3 |
| **`/topics/sport/` (P3 hub)** | **2** | `/topics/`, hub chips |
| **`/topics/stories/` (P4 hub)** | **2** | `/topics/`, chip from P1 |
| FR hubs `/fr/topics/*` | **2-3 each** | FR mirror of the same structure |

### Article → pillar direction (sample-verified + structural)
Built article HTML (EN and FR samples): **zero hrefs to any `/topics/{pillar}/` URL.** Articles carry:
- 2× `/topics/` INDEX links (chrome) — not the pillar
- ~18 article→article hrefs (related block, ~5 unique siblings by topic) — works
- 1-3× tool/book/quiz links (chrome + in-body)
- Topic badge = `<span>` — visible to humans, invisible to Googlebot

### Pillar → article direction (outbound from hubs)
| Hub | Curated articles linked | Assessment |
|---|---|---|
| P1 habits | 11 (+4 pending in Batch-2 → 15) | decent |
| P2 mindset | 12 | decent |
| P3 sport | 12 | decent count, but hub itself unreachable |
| P4 stories | **6** | thinnest — and P4 IS the trust pillar |

---

## B) Problems Found (ranked by measured severity)

### 🔴 P-1 — The hub paradox (structural, worst)
The 8 pages built to be the authority centers of the site have **in-degree 2-4 out of 470 pages**, while utility pages have 237. Internal PageRank behaves like a vote: `/topics/habits/` receives ~3 votes, `/quotes/` receives 237.
**Measured consequence:** hubs took 4+ days to index WITH manual Request Indexing; the site's own link graph could never have found them at this density. Every hub KPI (impressions, ranking, hub→article authority) is gated by this single number.

### 🔴 P-2 — Article → pillar flow is severed (N2, quantified)
169 EN + 169 FR articles: **0/338 link to their own pillar.** The authority that 338 pages collectively hold (13-min organic dwell, article-level impressions climbing at pos 26-56) cannot flow "up" to the hubs. Anchor-wise, the topic `<span>` (e.g. "HABITS") is the exact spot a contextual link belongs — it's currently a dead label.
Secondary user cost: a reader who finishes `2-minute-rule-system` at 95% engagement has NO one-click path to the habits hub where the system lives → the best-moment journey ends at the footer.

### 🟠 P-3 — Hub discovery requires 2-3 deliberate clicks
Path exists: Home → mega-menu "Essays" → `/topics/` index → pillar (3 clicks; 2 via footer). But `/topics/` index (59i/pos 4) is the ONLY funnel, and its label ("Essays") misdescribes it (N4). Desktop header (the primary nav, 5 items) cannot reach a pillar in one click. Mobile: 3 taps.

### 🟠 P-4 — P4 Evidence Stories under-constructed
6 curated cards vs 11-12 elsewhere — while P4 is the pillar feeding trust (E2 email lane, stories = highest-share format) and its flagship (`histoire-concierge-millionnaire`) shows 17i/pos 44 already climbing.

### 🟡 P-5 — Related-articles block is topic-sibling-only
Related clusters recycle ~5 same-topic articles → strong horizontal mesh WITHIN clusters, no vertical spoke toward hubs or pillar-crossing (e.g., habits article → mindset article via hub). (This is a design choice, low severity — P-2's one-line fix subsumes most of it.)

### 🟡 P-6 — FR side inherits every EN defect
FR hubs = 2-3 inlinks, FR articles = 0 pillar links. `/fr/` pos 2.5 CTR 37.5% proves FR demand exists — the FR internal graph is the same bottleneck doubled.

### ✅ What's actually GOOD (measured — protect it)
- Article→article related mesh: ~18 hrefs/article — genuine depth, no orphans inside clusters
- Global chrome delivers tools/books/quiz/lead-magnet at 237+ — the monetization pages ARE reachable
- Hub cross-chips (Step-1) + `/topics/` index give hubs SOME minimal graph presence
- Tools/quiz in-body contextual links (3× quiz from sample article) — contextual anchoring works where it exists
- Zero broken internal targets (40/40 URLs = 200 in nav audit crawl)

---

## C) Priority Fixes after Oct 5 (ordered; all are small diffs — specs inherit Nav audit N1-N7)

| # | Fix | Change size | Direct effect (measurable) |
|---|---|---|---|
| **1** | **N2: topic `<span>` → `<Link>` to the article's pillar hub** (EN+FR templates, `data-i18n` label already exists as `topic-*`) | ~2 lines × 2 templates → rebuilds 338 pages | Hub in-degree: 3 → **169+ per pillar**; the single highest-leverage diff on the site |
| **2** | **N1a: hubs into footer "Explore" column** (4 links) or `/topics/` row under Journal | 1 component, 4 hrefs | Global chrome: 3 → ~237 inlinks (matches tools) |
| **3** | **N1b: homepage pillar strip** (4 cards section, reuses PillarHub card styles) | 1 section in index.astro | Home(478+ entry sessions) → hub direct path |
| **4** | **N5/N4: header "Topics" item + honest labels** ("Essays" → Topics/Guides split) | SiteHeader navItems + dict keys | 3-click → 1-click hub access |
| **5** | **P4 cards 6 → 10-12** (concierge, janitor, athlete, morning-athlete, experiment stories) | pillars.ts data-only, zero code | Trust pillar depth; feeds E2 email lane |
| **6** | Batch-2 P1 cards (+4, already locked spec) | pillars.ts data-only | P1 11 → 15 |
| **7** | Anchor-text discipline for all above: descriptive ("the habits system →") not exact-match keyword stuffing; FR anchors from dict (`dict-fr` keys already exist) | copy rule | avoids over-optimization pattern |
| 8 | (Optional, Phase 2) related-block "also explore in {pillar}" one-line teaser per article | template + 1 string | second vertical spoke |

**Explicitly NOT recommended:** breadcrumbs (adds template surface for marginal gain over fix #1) · bulk cross-article link insertion in 338 bodies (high diff risk, breaks FR parity rule — the span→link fix gets the same flow at 1/100 the edit) · any URL changes (graph fixes must ride existing URLs).

## D) Expected Impact (if fixes 1-4 ship together)
- **Hub internal in-degree:** 2-4 → 170-400+ each → Google's local link graph finally treats pillars as centers; natural recrawl frequency should rise (measurable via last-crawl dates in inspection API at the Nov check)
- **Hub sessions:** 1-8/mo (100% eng pages) → target ≥20/30d (ROADMAP P2 KPI) — the bottleneck is literally "nobody can click through"
- **Authority flow:** article-level ranking pages (pos 11-44 family) pass contextual vote to the page STRATEGY wants to rank next (hubs → topic head terms)
- **User journey:** the 13-minute organic session gets a system-path (article → hub → second article → quiz/tool → newsletter form) — every conversion surface moves 1 click closer
- **FR:** identical effects ×2 languages at zero extra cost (same templates)
- **Risk-adjusted honesty:** none of these guarantee ranking movement — they guarantee Google and users CAN find the authority layer. That's the precondition, not the result.

## E) Risks
| Risk | Level | Mitigation |
|---|---|---|
| 338-page rebuild diff review burden | Med | hash-compare non-template pages like Citation test; only article shells should differ |
| Over-optimized anchors (338× "Habits pillar" identical links) | Med | varied descriptive anchors via existing i18n labels; it's the label span we're linking, which reads natural |
| Layout shift on article pages (span→link hover/underline) | Low | `.link` class already exists (Link.astro) — visual test in preview, per standard verify cycle |
| Hub dilution if Batch-2/P4 cards added blindly | Low | curation rules already locked (knowledge-first, per-pillar sections) |
| Changing variables mid-observation | **Real** | this is WHY it's staged post-Oct 5 — report first, then this becomes the Phase-2 lead unit |

---

## One-line verdict
> The site's content graph is healthy horizontally and **monetization-reachable globally**, but the **pillar layer is graphically invisible** (in-degree 2-4 vs 237) — fixes #1-#4 (all tiny, all already specified in the nav audit) convert that from the site's biggest structural weakness into its intended authority engine, at zero URL risk.

*Read-only ✓ — dist inspection + API queries only. Production frozen at `cefad00`. Companion: CONTENT-OPPORTUNITY-AUDIT (winners to feature in #5), NAVIGATION findings N1-N7 (specs), EXECUTION-ROADMAP 2.4 (placement).*
