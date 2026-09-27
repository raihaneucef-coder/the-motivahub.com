# Motiva Hub — Books Monetization Map
**Task:** Preparation #3 · **Status:** DOCUMENTATION ONLY — no code, no deploy, no content changes
**Prepared:** 2026-09-26 · **Execution gate:** after Oct 5 Decision Report
**Grounding:** every number/claim below verified this session against `src/data/books.ts`, `src/data/pillars.ts`, `dist/`, and the GA4/GSC baselines (HANDOVER §3). `[Assumption]` marks anything not measured.

---

## 1) Current Books Ecosystem (facts)

### Inventory
| Asset | Real state |
|---|---|
| `/books/` | **12 titles** in `books.ts`, all with tagged Amazon.fr links (`motivahub-21`) + geo-rewrite to .com for US visitors; categories: STOICISM, HABITS, FOCUS, PHILOSOPHY×3, DISCIPLINE, MONEY, GROWTH, MINDSET×2, POWER |
| `/best/` | 4 roundup pages (books, focus-books, habit-books, stoicism-books) with disclosure blocks + AffiliateBanner callout/footer variants |
| Review articles | **Only 3 exist**: `atomic-habits-review` (+ FR `atomic-habits-revue-complete`), `cant-hurt-me-review`, and `deep-work-focus` doubling as the deep-work review |
| Pillar hubs | P1: 2 books (atomic-habits, deep-work) · P2: 1 book (cant-hurt-me) · **P3: `books: []` — "No reviewed brain-body books yet (knowledge-first rule)"** · **P4: `books: []` — "No book gets a slot before we publish its real review"** |
| In-article links | ~370 pages carry tagged links; dense usage in tested-articles (`i-tested-12-morning-routines`, `how-to-read-30-books-a-year`, `slow-productivity-30-day-test`, `identity-based-habits-90-day-test`) |
| Components | BookCTA (book-anchored, FR build-time SSR), AffiliateBanner (3 variants), hub book strips with `trackAffiliateClick` |
| Measured signals | `/books/` **pos 4.2 · 10 impressions · 0 clicks** (GSC 7d) · GA4 books page 70 sessions / **73% engagement** · affiliate_click = **2 / 28 days** |

### Strengths
1. **Editorial discipline already enforced in data** — the empty `books: []` on P3/P4 with comments is exactly the trust-first rule most affiliate sites never adopt. It's already code, not just policy.
2. Position 4.2 on `/books/` = Google already ranks the shelf; the failure is the click, not the placement (CTR round 2 is the staged fix).
3. 73% engagement on a page with purchase-adjacent intent — the traffic that exists is QUALIFIED.
4. Infrastructure complete: geo-routing (FR/US tags), GA4 click tracking, disclosures EN+FR, `rel="nofollow sponsored"` everywhere — compliance-ready.

### Gaps
1. **9 of 12 books have no review article** → the shelf is a catalog, not an authority. Reviews are what justify commissions.
2. **P3 (sleep/recovery/performance) has zero books in inventory** — the whole brain-body pillar monetizes at $0 by design. (Notably: Walker's *Why We Sleep* is already in our Citation Phase-0 seed list — the pieces connect.)
3. `/books/` titles: high impressions/zero clicks pattern = title/meta not answering the search intent `[Assumption until Step-2-style data]` — the CTR round-2 candidate.
4. Affiliate loop is fire-and-forget: no email promotes the shelf until Welcome E5 exists (ESP pending), no re-engagement for book-clickers.
5. `utm_campaign=books` mix: links carry both tag and utm — fine for Amazon (tag is what counts); our own analytics can't see which PAGE drove the click `[gap: trackAffiliateClick only wired on hub strips, not BookCTA/article links]`.

### Monetization opportunities (raw material for §5 ranking)
- Convert position 4.2 into clicks (title/meta rewrite — already staged as task #7)
- Review-series engine: 1 real review/2 weeks → each review is a ranked, disclosed, affiliate-bearing page that ALSO unlocks its book's hub slot (P3/P4 unlock path)
- The tested-article format is already the best affiliate native: "I did the thing → I used this object/book → here's the link"
- Newsletter E5 books lane once ESP live; `book-club` engagement tag for readers
- Reading Calculator ↔ books crosslink (tool users = reader-intent users)

---

## 2) The Map: Article/Pillar → Book → Why → Intent → CTA style

> CTA styles defined once, reused everywhere:
> **A = Inline-text** (sentence-embedded link, in-body) · **B = BookCTA card** (end-of-article aside) · **C = Hub strip** (cover + "View on Amazon") · **D = Email block** (post-ESP) · **E = Roundup list row** (/best/)
> Rule of the site (existing, keep): one recommendation tied to a claim the article actually made. Never a second card for revenue's sake.

### P1 — Behavioral Engineering (habits · discipline · behavior change)
| Article / spot | Book | Why it fits | User intent | CTA |
|---|---|---|---|---|
| `atomic-habits-ultimate-guide` | Atomic Habits | guide literally dissects the book | "should I read/buy this system?" | B (already) + A inline at method claim |
| `identity-based-habits-90-day-test` | Atomic Habits / Tiny Habits | test article named both in body already | "which habit book actually works" | A (already live) |
| `2-minute-rule-system` / `make-good-habits-obvious` | Atomic Habits | the 2-min rule IS Clear's method | learning a tactic → wants manual | B |
| `deep-work-focus` / `deep-work-ritual` | Deep Work | existing review-pair | focus crisis, wants the source | B + C |
| `casser-mauvaise-habitude` / behavior-change articles | The Mountain Is You | self-sabotage is the article's subject | "why do I keep doing this" | B (single, careful — Wiest is pop, our E-E-A-T bar wants the science framing) |
| P1 hub `/topics/habits/` | atomic-habits + deep-work (live) | hub strip | browsing/comparison | C (already) |

### P2 — Mental Resilience (mindset · confidence · stoicism · self-mastery)
| Article / spot | Book | Why it fits | User intent | CTA |
|---|---|---|---|---|
| `regle-40-pourcent` (Goggins) | Can't Hurt Me | the article's core story IS the book | intensity fuel | B |
| `regles-goggins-mental` | Can't Hurt Me | rules extracted from it | wants full system | B |
| stoicism articles / `memento-mori` lane | Meditations + Daily Stoic | the source (180 AD) + the doorway (2016) — pair, don't split | philosophical + practical at once | B for articles, C pair on `/best/stoicism-books/` |
| confidence/fear articles (`pouvoir-elimination` lane) | The Courage to Be Disliked | adlerian "likeability vs freedom" = the article thesis | social-pressure intent | B (test on 1 page first) |
| suffering/meaning articles | Man's Search for Meaning | the meaning-under-suffering source | deepest-intent reader on site | A inline (quote the book → link) — NEVER a card here; the tone forbids it |
| P2 hub `/topics/mindset/` | cant-hurt-me (live) | — | comparison | C |

### P3 — Brain-Body Performance (sleep · recovery · nutrition · performance)
**FACT: zero inventory.** Honest mapping = the build plan, not fake links:
| Needed for | Candidate book | Precondition (knowledge-first rule) |
|---|---|---|
| sleep lane (`sleep-is-unfair-advantage` — RI'd, indexed) | **Why We Sleep — Walker** | write real review first (Walker-2017 already a citation seed — pair review + citation) → unlocks BOTH `/books/` entry AND P3 hub `books:[]` |
| habits-of-athletes lane (`athlete-discipline`) | The Power of Full Engagement (Loehr) `[verify inventory fit before deciding]` | same: review → slot |
| recovery/practice | none yet | leave hub empty until reviewed — the comment in pillars.ts is policy, protect it |
| **Rule for P3** | | *No sleep/performance affiliate money until the review exists. One credible Walker review > five unreviewed sleep books.* |

### P4 — Evidence Stories (biographies · documented examples · real stories)
**FACT: `books: []` by design ("no slot before a real review").** Mapping:
| Article / spot | Book | Why | Intent | CTA |
|---|---|---|---|---|
| `histoire-concierge-millionnaire` | (no book tie-in — story is the article) | — | entertainment/proof | NO CTA — forcing one pollutes the pillar |
| meaning-in-suffering story lane | Man's Search for Meaning | Frankl's testimony = the documented-story archetype | evidence hunger | A inline (quote → link; no card) |
| Goggins stories | Can't Hurt Me | memoir = pillar | story → system | B |
| **P4 unlock path** | review-worthy biographies we already write about | the pillar's books strip fills only as reviews ship | | |

---

## 3) Affiliate Rules (formalizing what the data already does)

1. **Where recommendations appear:** only on pages where the book does argumentative work (article makes a claim traceable to it) or an existing tested format names it. `/best/` roundups and `/books/` remain the only pure-catalog surfaces.
2. **How many:** **1 primary per article** (BookCTA or inline — never both for the same title), max 2 in tested-articles when the test genuinely compared two. No list-of-5 inside an article — that's what `/best/` is for.
3. **Disclosure placement (current compliant pattern, keep):** blockquote at article top when body contains affiliate links (already in 4+ articles) · AffiliateBanner `callout` + `footer` on `/best/` pages · "As an Amazon Associate…" line on BookCTA and `/books/` · footer `/affiliate-disclosure/` link. Any NEW format inherits this, no exceptions.
4. **How NOT to reduce trust:**
   - never recommend a book the site hasn't made a claim from (no filler for commission)
   - never paywall or gate content behind affiliate clicks
   - never claim "I read this" that the author bio can't support (books.ts `reason` lines ARE the standard — write reasons that survived re-reading)
   - one Amazon link per title per page (multiple links don't multiply commission, they multiply noise)
   - **measurement honesty:** wire `trackAffiliateClick` on ALL affiliate surfaces at execution time (currently hubs only) — `[gap]` — so decisions use real EPC per page, not guesses.
5. **Account hygiene `[verify at Phase 2]`:** Amazon ToS — no self-purchases, no link cloaking that hides destination, disclose-before-click (satisfied), monitor 180-day/3-sale rule during the low-traffic months.

---

## 4) The Future Books Funnel

```
                    ARTICLE (organic, 13-min dwell audience)
                         │ claim needs a source → ONE book, disclosed
                         ▼
              BOOK RECOMMENDATION (inline / BookCTA card)
                 │                                    │
     affiliate click → Amazon                    wants the SYSTEM
                 │                                    │
                 ▼                                    ▼
        (measurement:                    NEWSLETTER capture on book-adjacent form
         affiliate_click event)           e.g. under reviews + /books/ (form live ✓)
                                              │
                                              ▼
                                    READER RELATIONSHIP
                                    weekly editorial "book lane" (Welcome E5 exit)
                                    tag: reader / interested:{category}
                                              │
                              ┌───────────────┴───────────────┐
                              ▼                               ▼
                    AFFINITY PATH (Phase 2)          PRODUCT PATH (Phase 2 gate)
                    second book sold via            "The Reading Systems Pack" /
                    sequence recommendation         archetype protocol books-bundle
                    (Builder→habits shelf)          at ≥1,000 confirmed subs
```
**The key mechanic:** books turn one-time organic readers into *named* subscribers ("this person reads about discipline"), and named readers are the only audience any future product should be sold to. The funnel's mid-step (form under every review) is already built since `cefad00` — it only needs the ESP behind it.

---

## 5) Priority List (ranked by traffic potential × user intent × monetization potential)

| # | Opportunity | Traffic | Intent | Monetization | Effort | Depends on |
|---|---|---|---|---|---|---|
| 1 | **`/books/` CTR round 2** (title/meta at pos 4.2, 10i/0c) | med | **high** (page-1 shelf seeker) | med | tiny (4 fields) | Oct 5 gate — ALREADY staged (task #7) |
| 2 | **Walker review → unlock P3** (`why-we-sleep` review EN+FR, pairs with Citation seed walker-2017) | high (sleep = our indexed RI'd article lane) | high | med-high (only credible P3 money path) | article-level | Citation Phase-0 recommended order |
| 3 | **`trackAffiliateClick` on all surfaces + `?content=` UTM per page** | — | — | unlocks EPC-per-page data | small JS/links pass | Phase 1 measurement task |
| 4 | **Welcome E5 books lane** (copy DONE — NEWSLETTER-WELCOME-SEQUENCE.md) | n/a pre-ESP | very high (owned) | med | ESP config | Brevo Phase 1-b |
| 5 | **Review series: 1 honest review / 2 weeks** (Meditations, Daily Stoic, Man's Search, Psychology of Money first — inventory already there, slots empty on hubs) | growing (long-tail) | high | compound (each review unlocks a hub slot) | writing cadence | Batch-2/content phase |
| 6 | **Mid-content BookCTA on atomic guide** (93s, highest traffic, 28% eng — fix engagement FIRST) | high | med | med | small | guide content review (Oct 5 roadmap) |
| 7 | `/best/` refresh + internal links from matching articles (best-for-intent pages exist, unlinked mostly) | low now | high | low-med | small | Nav v2 adjacent |
| 8 | Reading Calculator ↔ habit-books crosslink (tool intent = reader intent) | low | med | low | tiny | tools follow-ups phase |
| — | **P4 forced book CTAs** | — | — | — | — | **explicitly NOT doing — pillar integrity > affiliate surface** |

**Order logic:** take the free win (#1, already staged) → build the one missing credible money lane with evidence (#2, dual-purpose with citations) → SEE the data (#3) → then let the owned audience compound it (#4-8).

---
*Documentation only. No production change. Production frozen at `cefad00` until Oct 5. Companion docs: HANDOVER · MONETIZATION-STRATEGY-V1 · NEWSLETTER-WELCOME-SEQUENCE · QUIZ-FUNNEL-STRATEGY.*
