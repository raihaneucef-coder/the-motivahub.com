# MOTIVA — EXECUTION ROADMAP v1
**The single integration point for all preparation work.**
**Prepared:** 2026-09-26 · **Status:** DOCUMENTATION ONLY — execution starts only after the Oct 5 Decision Report, Phase 1 first, unit-by-unit with approval gates.
**Sources integrated:** HANDOVER-2026-09-26.md · MONETIZATION-STRATEGY-V1.md · NEWSLETTER-WELCOME-SEQUENCE.md · QUIZ-FUNNEL-STRATEGY.md · BOOKS-MONETIZATION-MAP.md
**Production state at writing:** `main = cefad00`, observation mode, zero pending site changes. All 6 docs untracked, no commits.

---

## 1) Current State (one-page truth)

### The site
- Astro v5.18.2 static bilingual EN/FR · 460 sitemap URLs · 169 articles × 2 languages · 4 pillar hubs EN/FR (all 8 indexed) · 5 tools + quiz (Builder/Sprinter/Marathoner/Strategist) · 12 books, 3 reviews · FormSubmit email capture revived at `cefad00` (358 forms live) · Pinterest: 5 live + 23 scheduled pins.

### The measured picture (baselines — HANDOVER §3)
| Signal | Value | Read |
|---|---|---|
| Organic search | 7 clicks / 104 impr / pos 20.5 (7d) — ×5.2 impressions growth | discovery unlocked, ranking pending |
| Google organic quality | 143 sessions · 71% eng · **13m19s dwell** | trust engine works |
| Quiz | 31 sessions · **97% eng** | highest intent asset, promise unkept |
| Books page | 70 sessions · 73% eng · pos **4.2 · 0 clicks** | qualified traffic, title failure |
| Homepage | 448 landings · 46% eng | friction point #1 |
| Pillar hubs | 1-8 sessions · 100% eng | starved, not weak (N1/N2) |
| Conversions 28d | form_start ≈1 · affiliate_click 2 · returning users 28/mo | no owned loop, no retention |
| Traffic reality | ~860 sessions/mo, bot spike (Sep 18) excluded | pre-revenue scale — audience first |

### The strategic diagnosis (all 5 docs converge)
> Every subsystem is plumbed and flowing at ~zero because the **capture → activation loop doesn't exist**: emails go to an inbox (no ESP, no sequences), quiz promises go undelivered, book positions convert nobody, hubs get no nav traffic. The hard part — trust from strangers (13-minute dwell) — is already built. **Execution = building the loops, not earning trust from scratch.**

### Goal stack
```
GOAL 1  Audience:   0 → 1,000 confirmed subscribers          (Phase 1)
GOAL 2  Activation: every promise on the site delivered       (Phase 1-2)
GOAL 3  Revenue:    first honest affiliate sale → first product (Phase 2-3)
ANTI-GOAL: no revenue action before its audience gate. Ever.
```

---

## 2) Strategic Goals & Phase Architecture

Phase order is dependency-locked, not preference-locked:
```
Phase 1 (weeks 1-3 after Oct 5):  THE LOOP       — ESP, welcome sequence, capture, measurement
Phase 2 (weeks 3-8):              THE SEGMENTS   — quiz branching, books optimization, navigation
Phase 3 (gated by numbers):       THE REVENUE    — product, scaling, Pinterest/SEO compounding
```

---

## 3) PHASE 1 — Build the Loop (first actions after Oct 5)

**Entry condition:** Oct 5 Decision Report shows (a) `form_start` > 0 in post-fix window (fix proven alive), (b) no indexing regression. If (a) fails → forms/UX diagnosis precedes ESP (don't pipe an empty well).

| # | Action | Spec source | Depends on | Expected impact | Risk if skipped |
|---|---|---|---|---|---|
| **1.0** | RI for `/tools/meditation-timer/` + `/tools/cold-shower-tracker/` | campaign state (approved, quota-pending) | quota reset | 2 tools into index queue | strategic tools stay undiscovered |
| **1.1** | Brevo account + lists EN/FR + tags/attributes schema | STRATEGY §1.1-1.2, QUIZ §3 | Oct 5 pass | infrastructure for everything | none — first domino |
| **1.2** | `/api/subscribe` serverless fn + NewsletterSection swap + FormSubmit dual-run 2wk | STRATEGY §1.2 (site change = 1 fn + 1 component) | 1.1 | real capture, consent ts, bot wall via DOI | site change — needs full preview/diff/verify cycle |
| **1.3** | Welcome sequence E1-E5 EN+FR configured, DOI email = PDF delivery | WELCOME-SEQUENCE.md (copy DONE, slugs verified) | 1.1, 1.2 | promise kept from day 0; retention loop starts | the whole point of P1 |
| **1.4** | Combined **"4 Archetype Protocols" PDF** (stopgap, no quiz code) | QUIZ §1 stopgap | writing task, P4-gated | quiz promise becomes true immediately | trust leak stays open |
| **1.5** | Measurement pass: `form_submit` event, `quiz_complete` event, `trackAffiliateClick` on ALL surfaces + per-page content UTM | BOOKS §3.5, QUIZ §5 open items | 1.2 | EPC/segment data exists for Phase-3 decisions | all later decisions go blind |
| **1.6** | `/books/` + `/about/` CTR round 2 (title/meta, Step-2 recipe) | BOOKS §5 #1 — already staged task #7 | independent | pos 4.2/4.9 pages start earning impressions | page-1 visibility wasted |

**Phase 1 KPIs (review at week 3):** subscribers/week ≥ 10 · open rate E1 > 60% · E5 `/books/` CTR ≥ 3% · quiz→capture ≥ 15% (stopgap counts) · zero unkept promises on site.
**Phase 1 risks:** forms migration pollutes baseline → mitigated by strict post-Oct-5 start + dual-run; FR PDF missing → honest interim line in E1-FR (already in copy doc); ESP free-tier caps → irrelevant at our size.

---

## 4) PHASE 2 — Segments & Surfaces (weeks 3-8)

| # | Action | Spec | Depends on | Impact |
|---|---|---|---|---|
| **2.1** | **Quiz personalization:** hidden archetype field → Brevo attribute → 4 automation branches (Protocol D0 / friction-fix D3 / re-engage D30), merge rules (E1-E3 shared, E4 replaced, E5→D14), cap 1/day 4/wk | QUIZ §1-target, §3 full schema | 1.2-1.5 live, 1.4 delivered as stopgap first | the 97%-eng asset becomes the segmentation engine |
| **2.2** | **Newsletter automation:** weekly editorial rotation (story/science/protocol/tool/book lanes), engaged:90d scoring, reactivation D60 | STRATEGY §1.3 cadence + QUIZ §3 tags | loop stable 2+ weeks | relationship compounds instead of decays |
| **2.3** | **Books optimization:** review series (Meditations → Daily Stoic → Man's Search → Psychology of Money · 1/2wk) · **Walker *Why We Sleep* review** (priority: unlocks P3 + pairs citation seed) · mid-content BookCTA on atomic guide (AFTER engagement fix) · `/best/` internal links · Reading-Calc crosslink | BOOKS §2 maps, §5 #2,#5-8 | 1.6 done, content gate | affiliate surface grows ONLY where claims exist; P3 gets its first credible money lane |
| **2.4** | **Navigation v2 (N1/N2):** pillar hubs into header/footer/homepage + article→own-hub links (topic span → Link) — 348 pages, staged spec | HANDOVER §5, nav audit | independent of ESP; sequenced here because hub traffic is the books/quiz amplifier | hub sessions 1-8 → 20+/30d (KPI) |
| **2.5** | Citation Phase 0 (spec locked: sources.ts + ArticleSources + 3-field frontmatter; hash-equality test on 338 pages) | staged unit | Oct 5 gate pass | authority layer — feeds E3-class content, reviews (2.3), and the platform thesis |
| **2.6** | P1 Batch-2 hub cards + N8 www-redirect + Pinterest Batch-3 (8 bilingual boards, language-matched URLs, FR quote-pin moves, quiz-as-landing test) | staged units | their own previews | distribution + discovery hygiene |

**Phase 2 KPIs:** hub sessions ≥ 20/30d each · segmented subs ≥ 40% of list tagged with archetype · organic ≥ 15 clicks/wk · first affiliate sale tracked to page (via 1.5) · Step-2 titles confirmed picked up.
**Phase 2 risks:** shipping 6 units simultaneously → each keeps its own diff/preview/verify cycle (existing workflow, non-negotiable); review series pace collapse → one honest review beats four rushed ones (BOOKS rule).

---

## 5) PHASE 3 — Revenue & Scaling (NUMBER-GATED, not date-gated)

**Entry gates (ALL required, checked against ESP+GA4 data):**
```
GATE-A  ≥ 1,000 confirmed subscribers (or ≥200/mo growth with opens >40%)
GATE-B  payout rails verified for Morocco: Gumroad payout OR LemonSqueezy/
        Paddle merchant-of-record onboarding  [verify tasks, never assumed]
GATE-C  engaged:90d audience ≥ 30% of list (product only ships to warm)
```

| # | Action | Spec | Notes |
|---|---|---|---|
| **3.1** | First product: **"The Discipline Protocols"** combined edition (4 archetype tracks × 30 days — packaging of existing articles, zero new research) | STRATEGY §4 + QUIZ §4 | launch $9 / regular $14 · free 30-day PDF stays free forever (never paywall a made promise) |
| **3.2** | Product funnel: protocol click → `product:prospect_{archetype}` → day-30 re-engage is the ONLY natural ask · `/protocols/` page same editorial tone, no popup/scarcity theater | QUIZ §3-4 | sell to segments, not lists |
| **3.3** | Scale loop: content priorities from Oct 5 + later GSC data (winnable keywords) · review series continues · Pinterest engine (pins → quiz/hubs) · archetype mini-packs ($5) after first sales data | BOOKS §5, QUIZ §4 | every new piece inherits citation + books map |
| **3.4** | Later options (each its own decision): ESP-tier upgrade · sponsorships at >5k subs · `/sources/` library page · Kit creator-network revisit | strategy docs | no commitments now |

**Phase 3 anti-patterns (locked "NOT doing"):** forced P4 book CTAs · selling to cold segments · AdSense before scale (>20k/mo, revisit with data) · paywalling existing promises · Amazon ToS shortcuts.

---

## 6) Execution Rules (inherited, binding for every unit above)

1. **Small diffs only** — one unit = one branch = one reviewable diff; no mega-deploys.
2. **Verify before deploy** — local build → preview → user visual approval → merge `--no-ff` → push main → deploy poll → production HTTP+browser verification. (The proven 10-unit workflow.)
3. **Measure before decide** — no phase-advance on vibes; each phase KPI read against HANDOVER §3 baselines; Sep-18-style bot contamination always checked first.
4. **Promise = delivery invariant** — any copy CTA must be backed by working infrastructure the same day it ships (newsletter-audit lesson, formalized).
5. **3-place sync** — user-facing strings: component fallbacks + dicts + coreDict (Layout.astro rule).
6. **FR parity** — every EN addition needs its FR mechanism (articles-fr.json key / SSR labels / build-time variant like BookCTA).
7. **Reversibility** — tags/lists/UTM additive; never rewrite indexed URLs or existing canonicals for monetization reasons.
8. **The Oct 5 constitution** — nothing executes before the Decision Report; Phase 1 is chosen explicitly, then executed unit-by-unit.

---

## 7) Success Metrics (the scorecard, by stream)

### Newsletter (Phase 1 ownership)
| Metric | Baseline today | P1 target | P2 target |
|---|---|---|---|
| Confirmed subscribers | 0 owned (inbox forwarding) | 100-250 | 500-1,000 |
| Net adds / week | ~0 | ≥10 | ≥30 |
| E1 open rate | n/a | >60% | — |
| Weekly editorial CTR | n/a | — | >3% |
| Unsub rate | n/a | <0.5%/send | <0.3% |
| form_submit events (site) | 0 tracked | wired + counted | 25%+ of form_starts |

### Activation & segments (Phase 2 ownership)
| Metric | Target |
|---|---|
| quiz → capture rate | ≥15% (stopgap) → ≥20% (branch) |
| archetype-tagged share of list | ≥40% by P2 end |
| DOI bot-filter catches | tracked (Sep-18 lesson operationalized) |

### Content / SEO (continuous)
| Metric | Baseline | Target |
|---|---|---|
| Weekly GSC clicks | 7 | 15 (P2) → 30 (P3) |
| Impressions/week | 104 | +50% per 4 weeks (no drops) |
| Hub sessions (each) | 1-8 | ≥20 after Nav-v2 |
| Indexed strategic URLs | 41/66 + waves | +10 net by Oct 20 check |
| /books/ CTR at pos ~4 | 0% | ≥3-5% after round 2 |

### Monetization (last, on purpose)
| Metric | Gate | Target |
|---|---|---|
| affiliate_click/week | post-1.5 measurement | baseline unknown → first real number IS the deliverable |
| First affiliate sale | Amazon dashboard | before Phase 3 claim (also = account 3-sale clock) |
| EPC per page | post-1.5 | informs 2.3 priorities with data |
| Product revenue | GATE-A/B/C | first month: subs×1%×$9 is a CEILING estimate `[assumption]`, not a plan |
| Revenue diversification | P3+ | no channel >60% |

---

## The One-Paragraph Summary
Oct 5 reads the data. Phase 1 wires the loop (Brevo + 5 emails + archetype stopgap + measurement) so every existing promise gets delivered and strangers become subscribers. Phase 2 segments and amplifies (quiz branching, nav-v2 hub traffic, books reviews including Walker, citations) so the audience is knowable and the surfaces earn their positions. Phase 3 sells — only if gates A-C pass — one packaged product to warm archetype segments. Ads, paywalls, and forced affiliate never lead; trust leads and revenue follows, measured small-diff by small-diff.

---
*End of roadmap. Integration doc — if it conflicts with a source spec doc, the source spec doc wins detail-wise; this doc wins order/gates-wise. No implementation. Production frozen at `cefad00` until Oct 5.*
