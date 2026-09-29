# Motiva Hub — Content Inventory & Gap Map V1
**Date:** 2026-09-28 · **Mode:** READ-ONLY — no content created, no changes, no deploy
**Evidence sources:** `src/content/blog/` (169 files), `src/data/{books,podcasts,pillars,topics}.ts`, `src/pages/` tree, live `dist/` build, GSC Search Analytics 28d snapshot (2026-09-25, saved in CONTENT-OPPORTUNITY-AUDIT), GA4 28d snapshot (same date). Numbers marked *(28d)* come from those saved API pulls — nothing invented.
**Companion docs:** CONTENT-OPPORTUNITY-AUDIT.md (traffic matrix), BOOKS-MONETIZATION-MAP.md (CTA styles), INTERNAL-LINKING-AUDIT.md (link graph). This doc does NOT repeat them — it inventories and gaps.

---

## A) Content Inventory — the complete shelf

### By type (counts measured from source + build)
| Type | EN | FR | Status summary |
|---|---|---|---|
| Journal articles | 169 | 169 (translated) | 460 total sitemap URLs; ~74% of articles have **zero impressions** *(28d)* — long tail asleep |
| Topic/pillar pages | 17 topics + 4 hubs | mirrored | All 8 hub pages indexed (RI); in-degree 2-4 (see Linking audit) |
| Guides | 1 (Atomic Habits Ultimate) + index | 1 + index | Guide: 65i / 0c / pos 55.9 *(28d)* — query misalignment |
| Books pages | `/books/` + 4 roundups (`/best/`) | mirrored | /books/ 53i / 0c / pos 3.9 *(28d)* — ranked, no click |
| Podcast page | 1 (`/podcast/`, 7 curated episodes) | 1 | 43i / pos 6.5 *(28d)* — impressions, weak CTR |
| Tools | 5 + index | 6 | ALL 5 tools 100% engagement *(28d GA4)* — distribution problem only |
| Lead magnets | `/30-days-discipline/`, `/pdf/30-days-discipline/` | mirrored | /pdf/ 12s / 100% eng *(28d)* |
| Authority pages | /about/ /author/ /bio/ /credits/ | mirrored | /about/ 50i / pos 4.6 *(28d)*; /author/ 39s / 95% *(28d)* |
| Utility/quotes | /quotes/ /tracker/ /objectives/ /psychology/ /memento-mori/ | mirrored | /quotes/ 26s / 96% eng *(28d)* |
| Legal/contact | privacy, terms, affiliate-disclosure, contact | mirrored | OK |
| **Dead pages (F1 security)** | login, register, forgot/reset-password | mirrored | 8 placeholder auth pages live — to delete |

### Topic distribution across the 169 articles (frontmatter, exact count)
```
P1-adjacent (66):  Habits 26 · Productivity 15 · Discipline 13 · Goals 12
P2-adjacent (47):  Mindset 15 · Confidence 8 · Success 8 · Personal Growth 8 · Relationships 8
P3-adjacent (24):  Sport 8 · Nutrition 8 · Wellness 8
P4-adjacent (8):   Stories 8
Off-identity (24): Travel 8 · Finance 8 · Entertainment 8
```

---

## B) Pillar Coverage Analysis

### P1 — Habits / Discipline (66 articles · hub indexed · 11 curated cards)
- **Strong:** 2-minute-rule cluster (EN/FR twins split one query family, ~37i combined *(28d)*), habit-stacking-routine, discipline-vs-punishment; guide (65i) is P1's flagship landing
- **Weak:** guide ranks pos 55.9 with zero clicks — H2s don't answer what queries ask; EN/FR twins cannibalize "2 minute rule" family
- **Missing subtopics:** habit *tracking* companion content (tool exists at 100% eng, zero written paths to it), morning/evening protocol series, "how to restart after a break" (relapse cluster — high-search intent family, nothing owns it)
- **Monetization:** strongest pillar for atomic-habits affiliate lane (12 articles already mention it) + planner/journal category affinity (Section F)

### P2 — Mental Strength / Stoicism (47 articles · hub indexed · 12 cards)
- **Strong:** regles-goggins-mental **pos 11.1** *(28d)* = the whole site's best ranking page; regle-40-pourcent 37i/pos 26.3; stoic quotes surface (/quotes/ 96% eng)
- **Weak:** Meditations/Daily Stoic have ZERO review content and 0 article mentions in bodies — pillar named "Stoicism" on Pinterest but philosophy depth = quotes level only
- **Missing subtopics:** Stoic *practice* series (premeditatio malorum, journaling rite — the "how", not the "who"), discomfort protocols (pairs cold-shower tool), attention-management cluster vs phone (deepest modern discipline fight, only scattered coverage)
- **Monetization:** book lane richest: meditations + daily-stoic + courage-to-be-disliked all slot-eligible **after reviews**; roundups /best/stoicism-books/ exists at pos ~4 family

### P3 — Sleep / Recovery / Performance (24 articles · hub indexed · 12 cards · ZERO book slots)
- **Strong:** sleep-is-unfair-advantage, recovery-is-training, nervous-system cluster (hidden-winner family 88-100% eng *(28d)*)
- **Weak:** the *thinnest* pillar by design — hub's own comment says "no reviewed brain-body books yet"; meditation-timer + cold-shower tools live here at 100% eng but no article teaches them (orphan pairing)
- **Missing subtopics:** **the Walker sleep-science spine** (already dual-unlock identified in CONTENT-AUDIT: review unlocks book slot + citation seed walker-2017), caffeine/nutrition timing (Nutrition 8 articles never connect to performance), screen light/dopamine evenings, FR-native sleep content
- **Monetization:** highest product affinity of all pillars (sleep tools = white-noise/masks/light — Amazon lane exists) BUT knowledge-first rule currently blocks all P3 book slots → **every P3 gap here is also the P3 monetization unlock**

### P4 — Evidence Stories / Heritage (8 articles · hub indexed · 6 cards — thinnest)
- **Strong:** concierge-millionnaire story (17i/pos 44 climbing *(28d)*, no CTA by design), she-started-at-60, janitor millionaire family
- **Weak:** 6 curated cards vs 11-12 elsewhere; "Heritage" half of the pillar mandate has **zero documented Moroccan heritage figures** yet (unique-angle gap flagged since CONTENT-AUDIT)
- **Missing subtopics:** experiment-with-evidence series (site's own tests = unreplicable content moat), documented heritage biographies (Marrakesh artisans, Atlantean athletes — verifiable sources required per Motiva-5), failure-recovery documented cases
- **Monetization:** trust engine, NOT affiliate surface (E2 email lane + Pinterest share format); product #1 "Discipline Protocols" will sell *because of* P4 proof, direct monetization stays zero here by policy

---

## C) Content Gap Detection (evidence-ranked, A→C)

### Priority A — high impact / high confidence (each one closes a *measured* leak)
| # | Gap | Evidence |
|---|---|---|
| A1 | **Walker / Why We Sleep review** (EN+FR) | Only 3 reviews for 12 books *(books.ts vs blog/)*; P3 hub `books: []` with policy comment; citation seed walker-2017 already planned — dual unlock |
| A2 | **Relapse/restart cluster** ("how to start again after breaking a habit") | pos 11-26 family pages prove P1/P2 query gravity; no page owns restart intent; E3 welcome email (Lally 66-day) already needs that landing page — one article serves funnel + SEO |
| A3 | **Tool-companion articles** (meditation-timer, cold-shower, habit-stacker how-to) | all 5 tools 100% eng / ≤26 sessions *(28d GA4)* = content-prone demand with zero written entry paths; fixes the orphan pairing at the same time as Linking fix #1 |
| A4 | **Deep Work real review** | 12 articles mention it, BookCTA live, hub card live — selling a book with NO review breaks the knowledge-first rule we enforce on P3/P4; inconsistency risk, cheap fix |
| A5 | **Stoic-practice series (3-4 articles)** + Meditations review | pillar carries the Pinterest board "Philosophie stoïcienne"; reviews=0, book mentions=0 in bodies; highest-affinity affiliate lane (meditations + daily-stoic) |

### Priority B — useful, not urgent
| # | Gap | Why B |
|---|---|---|
| B1 | FR-native sleep/recovery content (not just translation) | FR demand proven (pos 2.5, CTR 37.5%) but EN twins already cover; measure after Oct 5 |
| B2 | Screen/dopamine attention cluster | demand implied by productivity queries; no direct impression evidence yet |
| B3 | Podcast page: episode deep-links + category grouping + article cross-links | 43i/pos 6.5 = audience exists; 3 of 7 entries link channel-home not episode *(podcasts.ts)* = decayed links; cheap fix, moderate value |
| B4 | Moroccan documented heritage figures (P4) | unique angle, high share potential — needs verifiable sourcing work (Motiva-5), so heavier lift |
| B5 | FAQ/schema enrichment on pos 11-26 family pages | CTR lever (Step-2 done; measure Oct 5 before doubling) |

### Priority C — ideas only (no measured demand yet)
- Audio versions of top articles (podcast lane extension)
- Interactive quiz→tool bridges beyond archetype PDFs
- Seasonal challenge content (Jan discipline wave — biggest search season; plan now, ship Dec)
- Newsletter→public archive page (only after Brevo exists)
- Anything in the 24 off-identity topics (Travel/Finance/Entertainment) — do-not-touch list stands

---

## D) Books — the 12-slot audit (rule: no book slot before real review)

| Book | Real review? | Article connections | Affiliate tag? | Slot today | Verdict |
|---|---|---|---|---|---|
| Atomic Habits | ✅ EN+FR | 12 mentions | ✅ | P1 hub ✓ | Healthy — review needs CTR refresh only |
| Can't Hurt Me | ✅ EN | 6 mentions | ✅ | P2 hub ✓ | FR review missing (revue-complete pattern exists) — cheap add |
| Deep Work | ❌ (2 concept articles ≠ review) | 12 mentions | ✅ | P1 hub ✓ | **Policy violation in progress** — hub card sells un-reviewed book → A4 fixes it |
| Meditations | ❌ | 0 mentions | ✅ | /books/ + /best/stoicism-books/ | review = A5 centerpiece |
| The Daily Stoic | ❌ | 0 | ✅ | /books/ only | after Meditations review, natural pair |
| Man's Search for Meaning | ❌ | (Frankl theme in meaning articles — inline-CTA rule locked in BOOKS-MAP) | ✅ | /books/ only | review later; NEVER card on meaning articles (existing rule) |
| The Psychology of Money | ❌ | 1 article (psychology-of-money-business) | ✅ | /books/ | off-identity-adjacent → B/C priority |
| The Mountain Is You | ❌ | 0 | ✅ | /books/ | fine waiting |
| Subtle Art | ❌ | 0 | ✅ | /books/ | fine waiting |
| Let Them Theory | ❌ | 0 | ✅ | /books/ | trend-title; evidence check before ever reviewing (Motiva-5 tier risk) |
| Courage to Be Disliked | ❌ | 0 | ✅ | /books/ | good A5-adjacent candidate (philosophy lane) |
| 48 Laws of Power | ❌ | 0 | ✅ | /books/ | **watch:** brand-adjacent (power/manipulation framing) — decide curation stance before review |

**Measured:** 3/12 books have real reviews; hub book cards = 3 total (P1: atomic-habits + deep-work, P2: cant-hurt-me, P3: none, P4: none); the /books/ shelf displays all 12; every affiliate URL carries the tag. The `/books/` page itself ranks pos 3.9 with 0 clicks *(28d)* — inventory is not the bottleneck, proof-of-authorship (reviews) is.

## E) Podcast Analysis

**What exists:** 7 curated external episodes *(podcasts.ts, 78 lines, verified)* — Huberman, Goggins/CEO-Diary, Shetty, Howes, Robbins, Jocko, Shi Heng Yi. The page is an editorial *listening list*, not production content (Phase 7 decision).
**Measured performance:** 43i / pos 6.5 *(28d)* — real impressions, weak click-through.
**Missing categories:** Sleep/science-of-recovery episodes (P3 has ZERO podcast entries), Habits-specific episodes, FR-language podcasts (35% of audience, list is 100% EN).
**Broken connections (measured):** `journal/` hrefs inside podcast templates = **0** — zero article↔episode paths both directions. Article pages reach /podcast/ only via footer chrome (3× sample).
**Decay risk:** 3 of 7 `podcastUrl`s point at *channel homepages* not specific episodes *(file inspection)* — "latest episode" framing will silently go stale; needs a refresh cadence or deep links.
**Book connections:** none exist — yet Goggins episode ↔ Can't Hurt Me review ↔ P2 hub is a 3-way loop the site is one link pass away from having.

## F) Affiliate Opportunity Map (mapping only — nothing added)

Rule respected: every row = existing content surface + already-tagged Amazon account lanes. No new products proposed.
```
P1 articles (66) ─→ journals/planners + habit-tracking books   ← atomic-habits lane proven (12 mentions),
                                                                    E5 email + /books/ both warm already
P2 articles (47) ─→ stoic classics (hardcover/bilingual ed.)    ← meditations/daily-stoic/courage; pos-11
                                                                    goggins page proves intent; card rule = 1 primary
P3 articles (24) ─→ sleep aids (blackout masks, white-noise),   ← BLOCKED until A1 review ships —
                     recovery tools (cold-shower gear, timers)      highest affinity-per-reader of all pillars
P4 stories (8)   ─→ NO affiliate surface (policy)               ← trust engine converts via newsletter,
                                                                    not via links (BOOKS-MAP rule locked)
/podcast/        ─→ audiobook lane (Audible exists in Amazon    ← only where episode↔book pairs; not built yet
                     program) — idea only, Priority C
/tools/ pages    ─→ the tool's own subject (e.g. meditation     ← 100%-eng pages = best-converting real estate
                     timer → sleep/meditation books)               on site, currently monetizing $0 — Phase 2)
```

## G) Roadmap + Recommended First Phase

**Ordering principle (matches MOTIVA-EXECUTION-ROADMAP + freeze rules): nothing new ships until Phase 1 THE LOOP data lands (Oct 5). New content = Phase 2+ units, one at a time, diff/verify.**

```
RECOMMENDED FIRST CONTENT PHASE (after approval, ~4-6 units, all Priority A):
  1. A1 Walker review EN+FR          → unlocks P3 book slot + citation seed (dual, precedent exists)
  2. A4 Deep Work review EN (+FR)    → closes the one active policy inconsistency
  3. A2 relapse/restart article      → feeds E3 welcome email landing (funnel+SEO double duty)
  4. A3 tool-companion articles ×3   → distribution to hidden winners; reuses 100%-eng proof
  5. A5 Meditations review + 1st stoic-practice piece → opens P2's richest affiliate lane honestly
  (each unit: FR parity same-diff, 1 primary CTA rule, articles-fr.json key, MOTIVA-5 evidence tier)

DELIBERATELY NOT IN PHASE 1: B3 podcast fixes (bundle with Nav v2 template pass), B4 heritage series
(research-heavy, needs source pack first), anything in C, any of the 24 off-identity topics.
```

### One-line verdict
> **The shelf is full, the gaps are specific:** the site lacks *proof pieces* (reviews, restart paths, tool companions) — not article volume. 169 articles already exist and 74% of them never surface; the 5 Priority-A gaps each connect an already-proven asset (pos-11 page, 100%-eng tool, dual-unlock book) instead of opening new fronts.

---
*Read-only ✓ — no file under `src/content/` or `src/pages/` touched; production frozen at `cefad00`. Waiting for approval before any implementation.*
