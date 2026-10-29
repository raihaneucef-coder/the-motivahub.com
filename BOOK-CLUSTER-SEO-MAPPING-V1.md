# Motiva Hub — Book Recommendations Cluster: Discovery → Mapping (Phases 0–4)

**Task:** SEO roadmap — next cluster after C1 · **Status:** DOCUMENTATION ONLY — no content, metadata, schema, config or code changes
**Prepared:** 2026-10-29 · **Execution gate:** Phase 5 (prioritisation) NOT started
**Evidence sources:** GSC Search Analytics API v3, URL-prefix property `https://the-motivahub.com/`, `dataState=final`; **Window A** `2026-09-30 → 2026-10-27`, **Window B** `2026-09-02 → 2026-09-29`; Phase 2 SERP captures (typology/format only, never ranking evidence); Phase 3 live-page inspection.
**Companion docs:** `CONTENT-GAP-MAP-V1.md`, `BOOKS-MONETIZATION-MAP.md`, `INTERNAL-LINKING-AUDIT.md` — this doc does not repeat them.
**Grounding:** every figure below is transcribed from the local git-ignored artifact `tests/sitewide-discovery-audit/sitewide.json` (Window A) and a read-only API pull for Window B. No search volume, keyword difficulty, backlink counts or expected-gain figures appear anywhere in this document.

---

## 0) Scope guardrails

- **C1 (40% Rule / David Goggins) is frozen.** Phases 1–5 complete, Phase 5 decision = Option 3 (no changes). Review date **2027-01-25**. Phase 6 not authorized. Nothing in C1 was modified.
- Read-only throughout. No edits, indexing requests, IndexNow submissions, deployments or configuration changes were made during Phases 0–4.
- The cluster baseline is **provisional**: two 28-day windows for `/best/focus-books/`, one window for the other seven pages.
- Evidence labels used throughout: **OBS** = observed GSC query row for the URL; **OBS-1** = observed but single impression (weak, never treated as validated); **INF** = inferred target, not observed; **EXP** = exploratory, from Phase 2 captures; **GAP** = no assignable evidence.

---

## 1) Phase 0 — sitewide discovery baseline

| Window | Pages | Impressions | Clicks | Queries with data | Identifiable impressions |
|---|---|---|---|---|---|
| A `2026-09-30 → 2026-10-27` | 170 | 2,662 | 20 | 124 | 510 (19.2%) |
| B `2026-09-02 → 2026-09-29` | 121 | 1,083 | 28 | 98 | 213 (19.7%) |

First day with data `2026-08-23`; last finalised day `2026-10-27`. Symmetric 28-day windows, same property, `dataState=final`.

**Section split, Window A**

| Section | Impressions | Clicks |
|---|---|---|
| Tools | 809 | 1 |
| EN journal | 667 | 11 |
| FR journal | 529 | 2 |
| FR best | 145 | 2 |
| EN guides | 126 | 0 |
| EN best | 56 | 0 |
| FR guides | 53 | 2 |
| EN topics | 32 | 0 |
| FR topics | 20 | 0 |
| Static | 225 | 2 |
| **Total** | **2,662** | **20** |

**Data-integrity findings** *(delivered as F1–F4 in the Phase 0 session; renamed D1–D4 here to avoid collision with the Phase 3 findings — content unchanged)*

- **D1 — the largest single "opportunity" is a trap.** The #1 sitewide query is a school maths word problem: 198 impressions at position 9.6, 0 clicks, landing on `/tools/reading-calculator/` (571 imp at pos 9.0, 1 click), plus a 5-impression French twin and 4 impressions on `/fr/tools/reading-calculator/` — a 203-impression single query family, 7.4% of all sitewide impressions. This disqualifies the tools section as a demand cluster.
- **D2 — click decline is unattributable.** Sitewide clicks fell 28 → 20, concentrated on the homepage (63 imp at pos 2.5 → 42 imp at pos 6.1), where ~95% of impressions are anonymised. Cause cannot be established from search analytics.
- **D3 — FR journal grew 19 → 529 impressions.** Cause not proven; treated as context, not as an effect of anything.
- **D4 — C1 page, frozen context only.** 136 imp at pos 5.9 (previous 16 imp at 23.1) plus 36 imp at 11.1 in French = 172 imp, 4 clicks. Recorded for context; no action.

**Cluster ranking (Phase 0 conclusion):** the book-recommendation cluster was selected over the Atomic Habits cluster because the latter was already improving without intervention (73 → 120 imp, pos 53 → 25) and splits across five intents including unwinnable navigational queries, while `/fr/best/stoicism-books/` was the only page with a clean, repeated, single-intent query family (7 variants, uniform 46.9–50.0 band, 79% identifiable).

---

## 2) Phase 3 — read-only page audit (corrected findings)

**Measured inventory**

| URL | Cards | FAQ blocks | FAQPage schema | Main-content words | Title chars |
|---|---|---|---|---|---|
| `/best/books/` | 17 | 3 | yes | 1,024 | 38 |
| `/fr/best/books/` | 17 | 3 | yes | 1,168 | 65 |
| `/best/stoicism-books/` | 6 | 0 | no | 443 | 37 |
| `/fr/best/stoicism-books/` | 6 | 3 | yes | 633 | 51 |
| `/best/focus-books/` | 5 | 3 | yes | 653 | 46 |
| `/fr/best/focus-books/` | 5 | 3 | yes | 740 | 58 |
| `/best/habit-books/` | 2 | 0 | no | 281 | 47 |
| `/fr/best/habit-books/` | 2 | 3 | yes | 464 | 52 |

Technical state, all eight: HTTP 200, self-referencing canonical, reciprocal `hreflang` en/fr/x-default, `robots: index, follow`, breadcrumb targets 200.

**Findings**

| ID | URL | Observation | Label | Confidence |
|---|---|---|---|---|
| **F1** | `/fr/best/stoicism-books/` | FAQ answer 1 names "Le Manuel d'Épictète" as the best starter; Épictète is not among the six rendered titles | **Defect** (self-contradiction) | High |
| **F2** | `/best/stoicism-books/` | Intro recommends *The Daily Stoic* or *The Obstacle Is the Way*; the second title is not in the list | **Defect** (self-contradiction) | High |
| **F3** | `/best/books/`, `/fr/best/books/` | Meta description promises "The 12 best" / "Les 12 meilleurs"; the page renders 17 titles | **Defect** (snippet accuracy) | High |
| **F4** | all category pages | Lists are generated by `category === "STOICISM" \|\| "PHILOSOPHY"` and a hardcoded `focusIds` array. **Corrected:** focus list = 1 directly relevant (*Deep Work*), 3 adjacent (*Atomic Habits*, *Meditations*, *The Daily Stoic*), 1 off-topic (*Can't Hurt Me*); stoicism list = 2 of 6 genuinely Stoic | **Defect** (selection logic) | High (fact) / Low (effect) |
| **F5** | `/best/books/` vs 3 category pages | Every category list is a strict subset of the 17-book page with identical descriptions and reasons; *Meditations*, *The Daily Stoic*, *Atomic Habits*, *Can't Hurt Me* each appear on 3 URLs | Defect (structural) + hypothesis (effect) | High (fact) / Low (effect) |
| **F6** | all 8 | Zero inbound links from journal articles; the Stoicism pair has no supporting article at all. **Corrected framing: observed linking gap only** — not a proven SEO defect, and no assumption that every category page needs an article | Observation | High |
| **F7** | all 8 | No visible publish/update date; `datePublished` is code-commented as approximate; `dateModified` identical (2026-10-17) on all 8 | Observation | High |
| **F8** | `/fr/best/*` | English book titles and "par" in `ItemList` names inside French prose | Defect (consistency) | High |
| **F9** | `/fr/best/stoicism-books/` | Visible typo "**emperateur**" in the first card description | **Defect** (minor) | High |
| **F10** | all FR pages | Cover `alt` reads "Meditations cover" etc., untranslated | Defect (minor, a11y/localisation) | High |
| **F11** | `/best/stoicism-books/`, `/best/habit-books/` | No FAQ block or FAQPage schema, while their FR twins have both | Defect (feature parity) | High |
| **F12** | `/fr/best/stoicism-books/` | 633 main-content words vs ≈5,300 extracted on `resilientstoique.com`; no categories, no reading order, no edition data. Comparison is qualified: their count includes their own chrome, ours excludes site chrome | Observation | High (counts) / Low (effect) |
| **F13** | `/fr/best/focus-books/` | H1 "Travail Profond" vs title "Deep Work". **Reclassified: not a defect — valid localization**, unless confusion is demonstrated. No evidence of confusion exists | Observation | High |
| **F14** | `/fr/best/focus-books/` | Only one of eight titles lacking "— Motiva Hub". **Reclassified: style inconsistency only.** At 58 chars it is the shortest FR title; adding the suffix would take it to ~71 chars, beyond typical display width | Style inconsistency | High |
| **F15** | all 8 | `ItemList.itemListElement.url` points to external Amazon affiliate URLs, not on-site pages | Hypothesis | High (fact) |
| **F16** | `/fr/best/stoicism-books/` | Title carries "2026" but no captured stoicism query contains a year token | Observation — do **not** read as a defect | High |

**Retraction recorded in the Phase 3 audit:** a substring scan reported untranslated English ("Why we recommend it:", "View Book") on the French pages. Both sit inside `data-en-text` attributes; visible text is "Pourquoi nous le recommandons :" / "Voir le Livre". The claim was withdrawn in the audit and is not repeated here.

**Ranking effects are unproven for every finding above.** F1–F3 are demonstrated self-contradictions and snippet inaccuracies; nothing in the evidence shows that correcting them would move position, clicks or impressions.

---

## 3) Phase 4 — Keyword-to-Page Mapping

**Evidence base:** Window A per-page and per-page-query rows; Window B retrieval described in §4. No new SERP research, no re-audit.

| URL | Proposed primary target | Label | Observed secondary (Window A) | Intent | Page role | Confidence |
|---|---|---|---|---|---|---|
| `/best/books/` | **none assignable** | GAP | none — 0 visible rows, 1 impression | "best self-development books" (INF only) | 17-book hub; only page built to compare everything | **None** |
| `/fr/best/books/` | **meilleur livre développement personnel 2026** | OBS (5i, 0 clk, pos 7.0) | meilleurs livres développement personnel 2026 (1i, **1 clk**, pos 16) · quel est le meilleur livre de développement personnel pour commencer 2026 ? (1i, pos 8) · livre sur la motivation (1i, pos 74) | Choosing a self-development book (FR), year-qualified | 17-book FR hub | **Moderate** |
| `/best/stoicism-books/` | **best books on stoicism** | OBS-1 (1i, pos 90) | stoicism book (1i, pos 35) | Choosing a Stoicism book (EN) | 6-title list, no FAQ | **Very low** |
| `/fr/best/stoicism-books/` | **livres sur le stoicisme** | OBS (52i, 0 clk, pos 47.7) | livre sur le stoïcisme (18i, pos 46.9) · livre stoicisme (3i) · livre stoïcisme (2i) · le stoïcisme livre, stoicisme livre, stoïcisme livre (1i each, pos 48–50) | Choosing a Stoicism book (FR) | 6-title list + FAQ; carries F1 | **High as a family / Low as an opportunity** |
| `/best/focus-books/` | **books on how to focus** | OBS (5i, 0 clk, pos 75.4) | focus books (4i, pos 36.8) · in focus books (2i, pos 23.0) · best books on focus (1i, pos 30) · 7 further single-impression variants, pos 32–87 | Protecting attention (EN) | 5-title list (see corrected F4) | **Moderate as a family / Low as an opportunity** |
| `/fr/best/focus-books/` | **livre sur la concentration** | INF | none visible — 0 rows across 13 impressions and 1 click | Protecting attention (FR) | 5-title FR list | **Very low** |
| `/best/habit-books/` | **none assignable** | GAP | none — 0 rows, 4 impressions | "best habit books" (INF only) | 2-title list, no FAQ | **None** |
| `/fr/best/habit-books/` | **livre sur les habitudes** | OBS-1 (1i, pos 44) | none | Choosing a habit book (FR) | 2-title FR list | **Very low** |

**Distinct page roles.** Two general hubs (17 titles each, comparative intent) plus three topic lists per language (6 / 5 / 2 titles). Language separation is required, not stylistic: no observed query crosses languages in either window.

**Overlap.** Within the eight-page cluster, **no query is attributed to two different URLs in either window** (Window A: 0 of 25 cluster query rows; Window B: 0 of 12). Sitewide, five queries are shared between other URLs in each window — Window A: `site:the-motivahub.com`, `routines matinales`, the reading-calculator word problem, `can't hurt me`, `motiva`; Window B: four `atomic habits …` variants and `tim ferriss morning routine`. **None of them involves one of the eight book URLs.** The accurate claim is "no shared query involves a book-cluster page", not "the site has no shared query". Content/intent overlap from F5 remains a **risk hypothesis**, not confirmed cannibalization; at positions 35–50 a suppressed page also produces no query rows.

**Anonymous-query residuals.** Figures such as `/fr/best/stoicism-books/` 21 imp ≈ 12.52 or `/best/focus-books/` 19 imp ≈ 13.16 are **conditional calculations**, obtained by solving a weighted-average identity across two rounded aggregates (page total vs visible query rows). They are not measured query data, not exact, and hold only if both aggregates cover the same impression set. Where visible = 0 the "residual" is simply the page total.

---

## 4) Previous-window retrieval (Window B, 2026-09-02 → 09-29)

Read-only API pull, `dataState=final`. Retrieved totals match the stored Phase 0 figures exactly (121 pages / 1,083 imp / 28 clicks; 98 queries / 213 visible imp; 103 page+query rows). Sitewide, 0 of 28 clicks carried a query string.

| URL | Window B (imp / clk / pos) | Query rows | Identifiable | Window A (imp / clk / pos) | Verdict |
|---|---|---|---|---|---|
| `/best/books/` | 15 / 0 / 8.20 | 0 | 0% | 1 / 0 / 11.00 | Insufficient |
| `/fr/best/books/` | no row — 0 imp | 0 | — | 26 / 1 / 14.08 | Insufficient |
| `/best/stoicism-books/` | 3 / 0 / 33.00 | 0 | 0% | 13 / 0 / 35.69 | Insufficient |
| `/fr/best/stoicism-books/` | no row — 0 imp | 0 | — | 99 / 0 / 40.16 | Insufficient |
| `/best/focus-books/` | 30 / 0 / 63.63 | **12** | **80%** | 38 / 0 / 35.13 | **Supports** |
| `/fr/best/focus-books/` | no row — 0 imp | 0 | — | 13 / 1 / 10.92 | Insufficient |
| `/best/habit-books/` | 12 / 0 / 10.33 | 0 | 0% | 4 / 0 / 31.00 | Insufficient |
| `/fr/best/habit-books/` | no row — 0 imp | 0 | — | 7 / 0 / 11.71 | Insufficient |

**No mapping is contradicted. One is supported. Seven are insufficient.**

The supporting case: `/best/focus-books/` is the only page with query rows in Window B (12 rows, 24 impressions, 80% identifiable). Eleven distinct focus phrasings appear in Window A and twelve in Window B, with **7 of 11 current variants recurring** in the earlier window — 16 distinct focus phrasings across two windows, all single-intent. This supports the *target identity* of the family, not an opportunity claim: the family sat at positions 56–87 in Window B and 23–87 in Window A, with 0 clicks in both.

On `/best/focus-books/`, page-level average position changed from 63.63 to 35.13. The visible-query weighted average moved from 71.08 to 57.11, but the query set and impression weights differ between the two windows — 12 variants across 24 impressions previously, 11 variants across 19 impressions now — so the two figures are not a like-for-like comparison. The one identical core query, `books on how to focus`, recorded five impressions in each window and moved from position 76.6 to 75.4. The anonymous-query residual figures are conditional estimates derived from aggregate arithmetic, not direct measurements. The available aggregate evidence does not justify attributing the page-level change exclusively to visible queries, nor exclusively to anonymous ones.

**Effect on mapping decisions: none.** All three assigned rows keep their targets; both no-target rows stay unassigned; all three provisional rows stay provisional. No page is promoted or demoted on the basis of a single-impression query. Two framing corrections follow: `/best/focus-books/` now holds the cluster's only cross-window repetition, and `/best/books/` + `/best/habit-books/` are gaps **because their performance is invisible** (15 imp at avg pos 8.20 and 12 imp at 10.33, both fully anonymous), not because demand is absent.

---

## 5) Corrections applied in this document

1. **Overlap scoping.** "Zero observed overlap" refers only to the eight-page Book Recommendations cluster; sitewide shared queries exist and are listed in §3.
2. **Residual positions.** Reported as conditional calculations from aggregate metrics, not as measured or unconditional values.
3. **Visible vs anonymous attribution.** No causal split is claimed for the page-level position change on `/best/focus-books/`; the corrected wording is quoted in §4.
4. **Finding labels.** F4 composition restated (1 direct / 3 adjacent / 1 off-topic); F6 downgraded to observed linking gap; F13 and F14 reclassified out of "defect".

---

## 6) Open items

- **Phase 5 (prioritisation) is not started.** No priority page is selected and no implementation is recommended. `/fr/best/stoicism-books/` is explicitly **not** nominated merely because it carries the most identifiable queries.
- Unresolved evidence gaps: the query families behind `/best/books/` (15 imp at avg pos 8.20, 100% anonymous) and `/best/habit-books/` (12 imp at 10.33, 100% anonymous); and any recurrence test for the four French pages, which recorded zero impressions in Window B.
- Pre-existing untracked files `public/img/brand-mark-fixed.svg` and `scripts/audit-site.mjs` are outside this work and untouched.
