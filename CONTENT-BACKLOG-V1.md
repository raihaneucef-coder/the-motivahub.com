# Motiva Hub — Content Execution Backlog V1
**Date:** 2026-09-28 · **Mode:** DOCUMENTATION ONLY — no content created, no edits, no deploy
**Source of truth:** CONTENT-GAP-MAP-V1.md (approved) — Priority-A gaps only. No new topics, no items outside A1-A5.
**Sizing formula (priority score):** `score = (measured evidence 1-5) + (funnel leverage 1-5) − (difficulty 1-5)` — every evidence number is a saved 28d measurement, not a feeling.

---

## BACKLOG-100 — A4 · Deep Work Real Review (EN)
| Field | Spec |
|---|---|
| **Content piece** | `/journal/deep-work-review/` — first-person tested review: what the ritual is, what we actually applied from it (the site's 2 existing concept articles give the evidence base), what failed, who should read it. FR twin `/fr/journal/deep-work-revue/` = BACKLOG-101 |
| **Strategic reason** | Closes the ONE active policy violation: book has hub card + BookCTA + 12 article mentions with no review behind it (gap map D). Restores the knowledge-first rule we enforce on P3/P4. Cheapest integrity fix in the backlog |
| **Pillar** | P1 Behavioral Engineering (primary) |
| **Connects to** | `/topics/habits/` (hub card already exists) · `/journal/deep-work-ritual/` · `/journal/deep-work-focus/` (the 2 concept articles → canonical self-loop) · `/guides/atomic-habits-ultimate-guide/` (focus adjacent) · `/best/focus-books/` roundup · `/books/` |
| **Internal linking plan** | Review links: hub P1 (anchor "the habits system"), both concept articles (descriptive anchors), /best/focus-books/. From review to book: ONE primary inline CTA (style A, BOOKS-MAP rule — replaces no card; hub card already carries style B). The 12 mentioning articles get link-pass later ONLY via Nav-v2 pass, no body farming |
| **Book/tool/podcast** | Book: deep-work (tag motivahub-21 ✓ live) · Tool: reading-calculator tie-in ("how deep work reads into your year") · Podcast: Jay Shetty focus episode (id `deep-work-in-practice` — first article↔episode link candidate, bundle with B3 later) |
| **Affiliate potential** | Direct: existing tagged URL, no new tags. Measures as first tracked deep-work click once F-3 measurement pass ships |
| **Difficulty** | **2/5** — evidence base already written (2 concept articles), standard template, known slug rules |
| **Priority score** | evidence 4 (12 mentions, card live) + leverage 4 (integrity + E5 email book #2 slot) − diff 2 = **6** |

## BACKLOG-200 — A1 · Why We Sleep Review EN+FR (Walker)
| Field | Spec |
|---|---|
| **Content piece** | `/journal/why-we-sleep-review/` + `/fr/journal/pourquoi-dormir-revue/`. Evidence-tier review (Motiva-5): what Walker claims, what's contested (known 2017-2022 criticism exists — review must state it honestly = authority builder), what protocol we extracted |
| **Strategic reason** | The **dual unlock** (gap map C/A1): (1) first reviewed P3 book → replaces `books: []` on the sport/sleep hub (policy comment in pillars.ts literally waits for this), (2) plants citation seed `walker-2017` for the Citation P0 unit. Unlocks the highest-affinity blocked monetization lane |
| **Pillar** | P3 Brain-Body Performance |
| **Connects to** | `/topics/sport/` hub (gets first book card) · `/journal/sleep-is-unfair-advantage/` · `/journal/rest-is-a-decision-not-a-collapse/` · `/journal/nervous-system-is-the-boss/` (hidden-winner cluster, 88-100% eng) · `/tools/meditation-timer/` · `/best/habit-books/` (sleep habit angle) |
| **Internal linking plan** | Review ↔ the 3 sleep articles (both directions, descriptive anchors, FR parity same-diff). Review → hub P3 + book inline CTA (style A, 1 primary). Sleep articles get the review as their "go deeper" link. **No CTA on the nervous-system story pieces** (concierge rule precedent). After ship: hub P3 book card = style B — first and only until book #2 reviewed |
| **Book/tool/podcast** | Book: NEW entry in books.ts (walker) with tagged URL — data-only change · Tool: meditation-timer (100% eng, needs entry paths — synergy with BACKLOG-300) · Podcast: Huberman episode has sleep content — link candidate, not required |
| **Affiliate potential** | **The blocked lane opener.** P3 = highest product affinity per reader (gap map F), currently $0 by policy. First sale path for sleep category |
| **Difficulty** | **3/5** — honest treatment of the criticism wave needs source work (Motiva-5 tier check), then standard bilingual build |
| **Priority score** | evidence 4 (sleep cluster measured) + leverage 5 (unblocks slot+citation+lane, feeds E-email lane) − diff 3 = **6** |

## BACKLOG-300 — A3 · Tool Companion Articles ×3
| Field | Spec |
|---|---|
| **Content piece** | Three how-to-with-evidence articles, one per orphan tool: (a) `/journal/how-to-use-a-meditation-timer/` · (b) `/journal/cold-shower-benefits-routine/` (FR: existing cold-shower article? — verify at build time; if exists, this becomes an upgrade unit not new) · (c) `/journal/habit-tracker-guide/` companion to habit-stacker. Each ≤1,500 words, protocol-first |
| **Strategic reason** | The distribution paradox (gap map B/C/A3): all 5 tools at 100% engagement with ≤26 sessions — the site's proven-best real estate with zero written roads. These 3 articles ARE the roads; pairs with Linking fix #1 (span→Link) exactly as specified |
| **Pillar** | P3 (a, b) · P1 (c) |
| **Connects to** | Each article → its tool page (primary, descriptive anchor) + its hub (a,b→/topics/sport/, c→/topics/habits/). Upstream: `/journal/two-minute-breath-reset/` → (a) · `/journal/discipline-vs-punishment/` discomfort angle → (b) · `/journal/habit-stacking-made-simple/` + `regle-1-pourcent` → (c). Downstream: each article ends at the newsletter form (single-section rule respected) |
| **Internal linking plan** | Tool page gets a "read the method" back-link (template change — bundle into same unit or Nav-v2 pass, per reversibility rule). NO reciprocal stuffing: one in, one out per pair. FR parity same diff |
| **Book/tool/podcast** | Tools: meditation-timer, cold-shower-tracker, habit-stacker (all 3 RI'd, indexing under Oct 5 check) · Books: (a) pairs with walker review if A1 shipped first — sequencing option, not dependency · Podcast: none required |
| **Affiliate potential** | Indirect but real: tools pages are the best-converting real estate on site (gap map F, Phase 2 note). Sleep/wellness affiliate surfaces stay BLOCKED until A1 review ships — respect the gate |
| **Difficulty** | **2/5 each** — short, protocol-driven, tool already tested by real users (100% eng = the usage patterns exist) |
| **Priority score** | evidence 5 (the single strongest GA4 signal in all audits) + leverage 4 (fixes orphans ×3) − diff 2×3≈ but per-unit so 2 = **7** → **highest-scored item in backlog** |

## BACKLOG-400 — A2 · Return After Failure (anchor article)
| Field | Spec |
|---|---|
| **Content piece** | `/journal/how-to-restart-after-breaking-a-habit/` + FR twin. THE restart-path anchor: missed-day research (Lally 2010 already cited in E3 email copy — reuse exact source), the "never miss twice" mechanics (source: existing atomic-habits guide content), own-story framing per Motiva-5 voice |
| **Strategic reason** | No page owns restart intent (gap map A2) while P1/P2 query gravity is measured at pos 11-26 family. **Double duty: it is the landing page E3 welcome email needs** — funnel + SEO in one piece. Post-Oct 5, if `form_start > 0`, the E3→article loop becomes the first measurable content→conversion path on the site |
| **Pillar** | P1 (owns) · P2 (adjacent, resilience angle) |
| **Connects to** | Upstream: E3 email (NEWSLETTER-WELCOME-SEQUENCE) · hub P1 · `/journal/2-minute-rule-system/` (restart = smallest version) · `/journal/regle-21-jours/` + `regle-1-pourcent` (FR cluster — cannibalization check before build) · `/tools/habit-stacker/` (relapse counter angle) · `/30-days-discipline/` (challenge restart = natural) |
| **Internal linking plan** | Anchor target for BOTH hubs ("what happens when you fall off") + E3 email + PDF challenge page. Gets link #1 treatment automatically as a hub member article (topic span→link). One primary inline CTA only if it passes the 1-book rule — likely atomic-habits inline, NEVER card (guide already owns the card lane for that book) |
| **Book/tool/podcast** | Tool: habit-stacker · Book: atomic-habits (inline, existing tag) — no new book slot needed · Podcast: none |
| **Affiliate potential** | Low direct / high funnel: converts cold organic reader → newsletter subscriber (the actual Phase-1 goal). Score it as funnel infrastructure, not revenue |
| **Difficulty** | **3/5** — must differentiate from the 4 existing "consistency" articles to avoid internal cannibalization (K3 lesson applied preemptively) |
| **Priority score** | evidence 3 (intent proven by family rankings, not owned yet) + leverage 5 (only piece serving funnel AND SEO) − diff 3 = **5** |

## BACKLOG-500 — A5 · Meditations Review + Stoic Practice Opener (×2 pieces)
| Field | Spec |
|---|---|
| **Content piece** | (a) `/journal/meditations-review/` + FR — a *tested-reading* review: which entries survive daily practice, translation comparison (credit public-domain editions honestly) · (b) `/journal/premeditatio-malorum-practice/` + FR — first "how not who" piece: the negative-visualization exercise, done as documented experiment (Motiva-5 evidence tier) |
| **Strategic reason** | P2 is the pillar with the site's best ranking page (pos 11.1) and the pillar's namesake books have **zero** reviews and zero in-body mentions (gap map B/A5). The stoic lane is the highest-affinity book lane on the site (hardcover/classic editions) and currently monetizes $0. Pinterest has a dedicated "Philosophie stoïcienne" board = distribution pre-built |
| **Pillar** | P2 Mental Resilience & Self-Mastery |
| **Connects to** | `/journal/regles-goggins-mental/` (pos 11.1 — sibling, NOT forced link; different evidence tiers) · `/journal/psychologie-du-non` / `pouvoir-du-non` cluster · `/quotes/` (96% eng — review quotes lane) · hub P2 · `/best/stoicism-books/` (the page ALREADY ranks at pos ~4 family and has nothing to recommend but the shelf) · `/books/` |
| **Internal linking plan** | (a) → hub P2 + /best/stoicism-books/ + daily-stoic as "next read" (NO card for daily-stoic until reviewed — rule). (b) → (a) as depth link + hub P2. /best/stoicism-books/ upgrade pass (add review links) = separate micro-unit 503 after both ship — currently the roundup points only at /books/ shelf |
| **Book/tool/podcast** | Books: meditations (tag ✓, inline style A as primary — the roundup carries style B) · Podcast: Shi Heng Yi episode (`shi-heng-yi-focus-silent`) = natural episode↔article pair — bundle into B3 podcast pass only · Tools: none forced (discipline-quiz Strategist/Marathoner angle email-only) |
| **Affiliate potential** | **The richest honest lane**: classic stoic editions, multiple ASIN variants, existing account+tags, proven roundup position. After review ships, /best/stoicism-books/ becomes the first page with legitimate ranking-to-purchase path |
| **Difficulty** | (a) 3/5 — translation-comparison sourcing · (b) 4/5 — documented experiment needs real run time (start the practice BEFORE writing; calendar dependency, K3/90-day lesson) |
| **Priority score** | evidence 4 (pos 11.1 + board + roundup position all measured) + leverage 4 (lane opener, E5 book #1 in email copy already written) − diff 3.5 ≈ **4.5 → rounded 5**, sequenced last of the five because (b) has a lead-time dependency |

---

## Execution order (post-Oct 5, one unit at a time, diff/preview/verify each)

```
Order by: score × dependency-freedom × Phase-1 alignment
  1. BACKLOG-300 (A3)   score 7 — pure distribution fix, zero dependencies, ships first proof content
  2. BACKLOG-100 (A4)   score 6 — integrity fix, smallest evidence work
  3. BACKLOG-200 (A1)   score 6 — dual unlock; schedule right after 100 to keep books work batched
  4. BACKLOG-400 (A2)   score 5 — needs E3 email live (Phase 1.3) to fulfill its double duty;
                          build may start earlier, SHIP gates on the loop existing
  5. BACKLOG-500 (A5)   score 5 — (b) experiment needs calendar time: START the practice on day 1
                          of execution phase, ship (a) review first, (b) after ≥2-week run
Deferred (do NOT pull forward): 101/2xx FR twins ship in the SAME diff as parent (FR parity rule),
503 roundup upgrade, all Priority-B items, everything in C.
```

## Alignment confirmations (no drift)
- **Monetization Strategy:** no email flows invented here; A2 exists *because* E3 needs a landing (MONETIZATION-STRATEGY-V1 P1-c). Books CTAs follow BOOKS-MONETIZATION-MAP styles A/B and the 1-primary rule everywhere.
- **Internal Linking Audit:** every "connects to" above is an existing URL; no unit adds a new structural page type; the span→Link fix (#1) is a prerequisite assumed shipped in Phase 2.4-lead — these articles then inherit hub links automatically.
- **Execution Roadmap:** all units land in Phase 2 (content lane), after Phase 1 THE LOOP gates pass. Phase 3 untouched.
- **Standing rules respected:** knowledge-first (A1/A4/A5 are literally its enforcement), no P4 CTAs, no off-identity topics, no new books, no new tools, no products, no affiliate URLs added.

---
*Backlog only — zero content written, zero files under `src/` touched. Production frozen at `cefad00`. Awaiting approval; next milestone remains the Oct 5 Decision Report.*
