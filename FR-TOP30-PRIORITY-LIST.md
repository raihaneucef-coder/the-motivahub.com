# FR TOP-30 PRIORITY LIST + BATCH EXECUTION PLAN — 2026-09-28 (preparation only)

Status: approved plan Phase 0. NOTHING fired here — execution waits for the 3-URL test verdict (T+48h,
30/09). Data sources: Search Analytics 28d (EN-twin demand), dist-wide link graph (measured incoming
links + source types), pillars.ts mapping, frontmatter topics. Test URLs (regles-goggins-mental,
regle-40-pourcent, atomic-habits-review) are marked ★ — if the test indexes them, they leave the
queue and their demand slot is retired automatically.

Legend: Pillars per site mapping — Discipline/Habits/Goals/Productivity → P1 (behavioral
engineering); Mindset/Stoic → P2; Brain-Body → P3. "Links" = measured internal pages linking the FR
URL; sources are almost all cold-zone (fr-sibling/fr-hub inside the never-crawled FR subtree) —
which is exactly why the linking-opportunity column points at hot-zone templates.

## A) THE LIST

### Articles (21 slots)

| # | FR URL (/fr/journal/…) | Pillar | Why priority | Current signals (EN twin, 28d) | Related EN page | Internal linking opportunity | Business value |
|---|---|---|---|---|---|---|---|
| 1 | cant-hurt-me-review | P1 | Highest-demand twin + holds the P2 hub book card | 1c/49i pos 30 | /journal/cant-hurt-me-review/ ✅ | hub card exists EN → FR twin linked from /fr/topics/ hub once crawled; add footer spot | Book slot → Amazon affiliate (FR) |
| 2 | ★ regle-40-pourcent | P1 | 2nd demand + already in test | 1c/28i pos 19 | ✅ | in-fr test resolves it | Proof-story → newsletter credibility |
| 3 | sprint-90-jours | P1 Goals | 3rd demand; goals→quiz intent | 0c/33i pos 92 | ✅ | pos 92 = twin barely ranking → FR page can overtake its own topic | Quiz funnel entry (goals) |
| 4 | process-vs-outcome | P1 Goals | 4th demand | 0c/30i pos 83 | ✅ | sibling links 9/10 only → needs hub link | Newsletter theme (systems) |
| 5 | standard-non-negociable | P1 | 29i at **pos 6** = nearest-win topic | 0c/29i pos 6 | ✅ | only 6 links (low) → add EN-twin contextual + hub | Discipline pillar proof piece |
| 6 | histoire-concierge-millionnaire | P1 Stories | 1c/15i + known E3 email story | 1c/15i pos 24 | ✅ | fr-hub 1 only → featured-story slot candidate | E3 welcome-sequence landing |
| 7 | lire-divertissement | P1/Cross | 25i pos 12 (reading topic) | 0c/25i pos 12 | ✅ | 7 links, cold | Books page → affiliate adjacency |
| 8 | ★ atomic-habits-review | P1 | In test + hub card + book slot | 0c/24i pos 52 | ✅ | test resolves | Biggest FR affiliate chain (Atomic guide+books) |
| 9 | regle-2-min-productivite | P1 | 1c/13i; 2-min rule = tool family | 1c/13i pos 81 | ✅ | link from /fr/tools/ (already indexed!) ← hot-zone bridge | Tool companion traffic |
| 10 | ★ regles-goggins-mental | P1 | In test; best-position twin (pos 11.2) | 1c/13i pos 11 | ✅ | test resolves | P1 flagship |
| 11 | focus-on-yourself-stay-silent-shi-heng-yi | P2 Mindset | 20i pos 10 = near-win | 0c/20i pos 10 | ✅ | 6 links only → /fr/topics/ mindset hub | Mindset pillar balance (P2 slot) |
| 12 | discipline-personnelle-guide | P1 | 18i at **pos 4** — highest-position demand in list | 0c/18i pos 4 | ✅ | 6 links, cold-only | Guide → quiz + newsletter funnel |
| 13 | missed-day-protocol | P1 | 18i; best-linked FR article (home+index+hub) | 0c/18i pos 12 | ✅ | already hot-linked (fr-home+fr-index) → cleanest organic test case | Habit-restart pillar content |
| 14 | how-to-read-30-books-a-year | P1 | 1c/7i + books monetization | 1c/7i pos 44 | ✅ | hub cross | Books page → affiliate |
| 15 | echec-meilleur-professeur | P2 | 16i | 0c/16i pos 24 | ✅ | 6 links → needs hub + EN-twin bridge | Mindset pillar |
| 16 | comment-devenir-mentalement-inebranlable | P1/P2 | 15i pos 13 | 0c/15i pos 13 | ✅ | fr-hub×2 already | P2 flagship cross |
| 17 | two-minute-rule-guide | P1 | 13i + MOST FR links of entire tree (36) | 0c/13i pos 16 | ✅ | link-rich but never fetched = pure starvation case | Tool companion (2-min rule) |
| 18 | habit-stacking-routine | P1 | 12i; habit-stacker tool family | 0c/12i pos 82 | ✅ | bridge from /fr/tools/habit-stacker (indexed) | Tool companion traffic |
| 19 | i-tested-12-morning-routines | P1 | 12i; experiment format (differentiator) | 0c/12i pos 35 | ✅ | 7 links cold | Morning-routine quiz intent |
| 20 | regle-deux-minutes | P1 | 12i; NOTE: sibling overlap with #17/#9 — same topic cluster | 0c/12i pos 29 | ✅ | cluster internal cross-links | Tool companion |
| 21 | batching-productivite | P1 | 11i | 0c/11i pos 31 | ✅ | cold siblings | Productivity pillar |

★ = consumed by the running test — exclude from Batch firing if test succeeds (their slots roll to
the next ranked twins: #22 calm-is-a-superpower 9i pos 29, #23 regle-1-pourcent 8i pos 9).

### FR service pages (9 slots) — from the diagnostic's failure matrix

| # | FR URL | Pillar/family | Why priority | Current signals | Related EN page | Internal linking opportunity | Business value |
|---|---|---|---|---|---|---|---|
| 24 | /fr/quotes/ | chrome | Crawled-and-refused group; 236 links | 0i (FR) | /quotes/ 1c/8i | hot already — refusal pattern to watch | Quote pages = social/re-pin targets |
| 25 | /fr/podcast/ | P-curation | Crawled-and-refused; 236 links | 0i | /podcast/ 2c/32i | journal↔podcast links missing (gap map) | Authority layer |
| 26 | /fr/pdf/30-days-discipline/ | lead magnet | Crawled-refused + 0 links | 0i | /pdf/ 1i | needs 1+ real link (currently orphan) | **Newsletter capture = #1 funnel asset** |
| 27 | /fr/tracker/ | tools P1 | 151 links, never crawled | EN /tracker/ 1c/5i | ✅ | from indexed /fr/tools/ (hot bridge) | Tool ecosystem |
| 28 | /fr/objectives/ | tools P1 Goals | **0 internal links** | 0i | ✅ | fix blocked until linking deploy | Goal funnel |
| 29 | /fr/psychology/ | P2 content | 1 internal link only | 0i | ✅ | nearly orphaned | Pillar depth |
| 30 | /fr/memento-mori/ | P2 stoic | 80 links, never crawled | 0i | ✅ | hot-linked, starvation case | Stoic authority |
| 31 | /fr/bio/ | author E-E-A-T | **0 links** | EN /bio/ 2c/21i | ✅ | author bridge missing | Trust/entity signal |
| 32 | /fr/30-days-discipline/ | P1 program | 236 links, never crawled | EN 1i | ✅ | program landing | Challenge → email + quiz |

(That's 32 numbered — items #22/#23 are floating substitutes; the firing list stays exactly 30.)

## B) BATCH EXECUTION PLAN

### BATCH 1 — "Proven demand + money path" (10 fresh URLs, test-★ excluded)
`cant-hurt-me-review · sprint-90-jours · process-vs-outcome · standard-non-negociable ·
histoire-concierge-millionnaire · lire-divertissement · discipline-personnelle-guide ·
regle-2-min-productivite · missed-day-protocol · focus-on-yourself-stay-silent-shi-heng-yi`
- Why first: the four highest raw impressions outside the test (30-49i), the two nearest-rank wins
  (pos 6 and pos 4 twins), the affiliate-highest (cant-hurt-me), the E3 story asset, and the P2
  balance pick (pos 10 twin). Every unit bought with demonstrated demand.
- Expected impact: +10 FR article index entries ≤48h each; FR tree 6→16+; these twins already own
  topic-level positions the FR pages can inherit.
- Measurement: T+24h API coverageState per URL; flag any "Explorée, non indexée" (= quality signal,
  halt Batch 2 pending review); canonical check = must stay self (FR) — EN canonical = consolidation
  revival, halt everything.

### BATCH 2 — "Deep demand + tool bridges" (10)
`how-to-read-30-books-a-year · comment-devenir-mentalement-inebranlable · two-minute-rule-guide ·
habit-stacking-routine · i-tested-12-morning-routines · regle-deux-minutes · batching-productivite ·
echec-meilleur-professeur · /fr/pdf/30-days-discipline/ · /fr/30-days-discipline/`
- Why these: remaining article demand (7-16i band), then the two highest-business-value service
  pages (PDF = newsletter capture asset; 30-days = program landing with 236 links wasted on
  starvation). Tool-family articles (two-minute, habit-stacking) bridge to already-indexed
  /fr/tools/ pages — the hot-to-cold zone shortcut identified in the diagnostic.
- Expected impact: +8 articles, +2 funnel assets; tests whether link-rich-but-starved URLs flip
  under forced fetch (two-minute-rule-guide = 36 links and zero fetches is the cleanest H3 probe
  the whole plan contains).
- Measurement: same per-URL T+24h check + first impressions at T+7d on the funnel pages (email
  conversions attributable via existing UTM discipline).

### BATCH 3 — "Service-page sweep + control hygiene" (10)
`/fr/quotes/ · /fr/podcast/ · /fr/tracker/ · /fr/objectives/ · /fr/psychology/ · /fr/memento-mori/ ·
/fr/bio/ · (+ up to 3 roll-ins from #22/#23 or Batch 1 blocked URLs)`
- Why last: two of these (quotes/podcast) are already crawled-and-refused — RI will most likely
  return "Discovered/Crawled, not indexed" for them; firing them first would have wasted 2 units
  before Batches 1-2 proved the mechanism on fresh URLs. Firing them LAST turns Batch 3 into the
  refusal-pattern confirmation group instead of a gamble.
- Expected impact: uncertain by design — this batch separates "starvation" (tracker/objectives/
  memento-mori/bio: never crawled → expected flips) from "judgement" (quotes/podcast: crawled+
  refused → expected to stay out). That split is decision input for Oct 5, not a win/loss batch.
- Measurement: outcome per subgroup — flips on never-crawled pages + stays on crawled-refused =
  H3 confirmed wholesale and quality-judgement confined to 2 known pages (their fix becomes a
  content task after Oct 5).

## C) GLOBAL RULES
- Fire a batch ONLY after the previous batch's T+24h check passes; halt on: any EN-canonical flip,
  ≥2 "Explorée, non indexée" in one batch, or quota warnings.
- 3/3 test failure ⇒ the whole queue stays holstered (decision rule in FR-INDEXING-RECOVERY-TEST-V1).
- Control group (remaining ~150 FR articles) stays untouched until Oct 5 for measurement integrity.
- Each firing day: log timestamp + initial status + confirmation per URL (as in test record format).

## D) ONE-CLICK CONTINGENCY LIST (7 URLs — first half of Batch 1, fire-ready order)
Prepared 28/09 evening per user request; NOTHING fired. Quota reality note: daily quota resets —
the 7 unused units of 28/09 expire before the T+24h checkpoint (29/09 ~23:11); at firing time we
consume 29/09's fresh 10-unit day, so these 7 are simply the first 7 of Batch 1, not a banked asset.
If checkpoint = 3/3, open GSC inspection combobox and run in this exact order (full URLs):
1. https://the-motivahub.com/fr/journal/cant-hurt-me-review/
2. https://the-motivahub.com/fr/journal/standard-non-negociable/
3. https://the-motivahub.com/fr/journal/discipline-personnelle-guide/
4. https://the-motivahub.com/fr/journal/histoire-concierge-millionnaire/
5. https://the-motivahub.com/fr/journal/sprint-90-jours/
6. https://the-motivahub.com/fr/journal/process-vs-outcome/
7. https://the-motivahub.com/fr/journal/lire-divertissement/
Order logic: money path first (#1 book/affiliate, #2-3 nearest-rank wins pos 6/4), then proven
volume (#4-6), then the P2 balance pick moves to slot 8-10 with the remaining Batch 1 trio
(med: regle-2-min-productivite, missed-day-protocol, focus-on-yourself-stay-silent-shi-heng-yi).
Halt rules from section C apply between URLs 1→7 (any EN-canonical or crawled-refused signal =
stop and report, don't finish the list).
