# Motiva Hub — Quiz Funnel Strategy (Complete Plan)
**Task:** Preparation #2 · **Status:** STRATEGY ONLY — no code, no ESP, no deploy
**Prepared:** 2026-09-26 · **Execution gate:** after Oct 5 Decision Report
**Grounding:** archetype definitions copied VERBATIM from `src/pages/tools/discipline-quiz/index.astro` (lines 114-163) — this plan maps the site's real content, nothing invented. All destination URLs verified against `dist/`.

---

## 0) The Core Problem (fact)

The quiz result shows: *"Your archetype comes with a custom 30-day protocol based on your type."*
Today: nothing is delivered automatically. The quiz is the site's highest-intent asset (**97% engagement, 31 sessions/mo**) attached to an unkept promise. Fixing the loop = simultaneously (a) an honesty repair, (b) the segmentation engine for the whole monetization strategy.

---

## 1) User Journey — current vs target

### CURRENT (as built)
```
Hub/article/header → /tools/discipline-quiz/ (5 questions, instant result, no email needed)
→ result card: name + tagline + strengths + blind spot + 1-line protocol
→ page-bottom NewsletterSection: "Get your archetype's 30-day protocol by email"
→ FormSubmit forwards email to inbox → [DEAD END: no protocol, no tag, no sequence]
```
**Drop points:** ① result→form scroll gap (form is below FAQ) · ② form doesn't carry the archetype (ESP can't know who is who) · ③ no autoresponder = promise broken immediately.

### TARGET (Phase 1-c, 3 minimal changes — documented here, executed post-gate)
```
Quiz completion (client-side, unchanged UX)
→ winner archetype stored in JS var (already exists: `archetype: winner`)
→ result page's newsletter form submits WITH hidden field: archetype + src:quiz
→ /api/subscribe → Brevo: contact with attribute quiz_archetype + tag quiz:taken
→ Automation trigger per archetype: Protocol email (Day 0) + Check-in (Day 3)
                                            + re-engage (Day 30) → product path §4
```
**Stopgap available day 1 of ESP (zero quiz code change):** Email 1 of the welcome sequence includes the "4 Archetype Protocols" section (all four protocols in one document — the subscriber finds their section). Promise becomes keepable BEFORE the branching exists. The branching only refines delivery.

### Journey stage metrics (what we'll watch)
| Stage | Event | Today | KPI after launch |
|---|---|---|---|
| Start quiz | page view /tools/discipline-quiz/ | ~31/mo sessions | baseline +50% via Email 4 loop |
| Complete | result rendered (GA4 `click` or dedicated event) | unknown — no event today | instrument at Phase 1-c `[gap: no completion event exists]` |
| Capture | form_start/form_submit with src:quiz | 0 | ≥ 20% of completions `[assumption, industry form-avg]` |
| Follow-up | protocol email opens | n/a | > 55% (welcome-class) |
| Retention | Day-30 re-engage click | n/a | > 15% |

---

## 2) Archetype Playbook

> Definitions/challenges/protocols below are QUOTED from the live quiz (EN). FR names: Le Bâtisseur, (Sprinter/Marathoner/Strategist adapted at ESP copy time).

### 🧱 BUILDER — "You compound small wins into unrecognisable lives."
- **Definition:** daily consistency as superpower; trusts the process; identity-level change comes naturally.
- **Main challenge (blind spot, verbatim):** *"You over-build and rarely launch. Your strength (foundation) can become your trap (never shipping)."*
- **Site protocol:** "Add ONE shipping day per week. Pick something small. Put it in the world. Refine later."
- **Recommended content:** `/topics/habits/` (P1 hub) · `/guides/atomic-habits-ultimate-guide/` · `/journal/identity-based-habits-90-day-test/` · `/journal/2-minute-rule-system/` · `/best/habit-books/`
- **Recommended tools:** **Habit Stacker** (primary) · Reading Calculator (secondary — builders read)
- **Email angle:** "You're already doing the hard part. Here's the missing 10%: shipping." → weekly ship-it micro-challenge; protocol = 30-day stack + 4 Sundays of one public small deliverable.
- **Product affinity:** habit protocol pack · template library

### ⚡ SPRINTER — "You do impossible things in 30 days. Then you reset."
- **Definition:** executes under deadlines; thrives on intensity and novelty; ships fast, iterates.
- **Main challenge (verbatim):** *"The crash after the sprint. You lose momentum between cycles."*
- **Site protocol:** "Stack a Sprinter with a Builder ritual. After each 30-day sprint, lock in ONE daily habit for 90 days."
- **Recommended content:** `/journal/regle-40-pourcent/` (Goggins — exists EN+FR paths) · `/topics/mindset/` (P2) · `/journal/discipline-beat-motivation/` · `/journal/i-tested-12-morning-routines/` · `/best/stoicism-books/`
- **Recommended tools:** **Cold Shower Tracker** (intensity ritual fits) · Habit Stacker (the anti-crash anchor)
- **Email angle:** "Your next sprint starts Monday — with one rule you didn't have last time: what survives the crash." → cycle-based sequences (30 on / 7 recovery), never "consistency" preaching.
- **Product affinity:** 30-day challenge upsell (natural fit — sprints ARE their language)

### 🏃 MARATHONER — "You win by never quitting. Consistency is your religion."
- **Definition:** compounds for the long game; doesn't need motivation; identity shifts happen deep and last.
- **Main challenge (verbatim):** *"You can become so patient you forget to push intensity. Slow becomes stuck."*
- **Site protocol:** "Add a 'sharpening' phase every quarter. One month of higher intensity, focus, and stretch."
- **Recommended content:** `/journal/sleep-is-unfair-advantage/` (recovery = their lane) · `/topics/sport/` (P3) · `/journal/5-minute-morning-habit/` · `/journal/morning-vs-night/` · `/books/` (long-form readers)
- **Recommended tools:** **Meditation Timer** (recovery practice) · Reading Calculator (the annual book-goal frame)
- **Email angle:** "Quarterly sharpening: this month, one thing at higher intensity." → seasonal/quarterly rhythm emails; they open them because it's the only advice they lack.
- **Product affinity:** long-program product (90-day system), recovery/sleep pack

### 🎯 STRATEGIST — "You build systems that compound while you sleep."
- **Definition:** sees leverage others miss; tools and automation are their edge; thinks in decades, not days.
- **Main challenge (verbatim):** *"You optimize the system instead of doing the work. Strategy becomes procrastination."*
- **Site protocol:** "Block one 'no-strategy' day per week. Just do the thing. Logic is for the back office — execution is for the floor."
- **Recommended content:** `/journal/process-vs-outcome/` · `/journal/slow-productivity-30-day-test/` · `/journal/deep-work-focus/` · `/best/focus-books/` · `/topics/habits/` (systems lane)
- **Recommended tools:** ALL tools as a stack (they collect tools) — lead with Habit Stacker + Meditation Timer (execution aids)
- **Email angle:** "Stop planning the plan. This week's protocol is one no-strategy day." → leverage-framed content but always closed with a 2-minute execution CTA; they buy systems, sell them the execution scaffold.
- **Product affinity:** Notion-style template/operating-system product

---

## 3) Segmentation Plan (ESP mechanics — for Phase 1 setup)

### Structure
```
Lists (2):   Motiva-EN / Motiva-FR        ← language = sending language, decided by page path at capture
Attributes:  quiz_archetype   (builder|sprinter|marathoner|strategist | empty)
             quiz_date        (timestamp)
             src_page         (slug of capture page)
Tags:        quiz:taken        (completed quiz, any archetype)
             quiz:retest       (second+ completion — keep latest archetype, tag history)
             newsletter:confirmed (DOI passed — filters bots, Sep-18 lesson applied)
             engaged:90d       (automation-set: opened/clicked last 90d — product gate audience)
             product:prospect_{archetype}  (set when protocol email clicked — §4 entry trigger)
Flow:        form(src:quiz) → list + quiz:taken + archetype attribute
             → automation archetype-branch (4 mini-sequences, see below)
             → every branch feeds engaged:90d scoring
```

### Re-test rule
Archetype "can shift based on context, season of life" (quiz FAQ, verbatim) → on retest, UPDATE attribute (latest wins), never remove tag history. Segments always read latest archetype.

### Mini-sequences per archetype (post-protocol, before weekly editorial)
| Day | Email | Content |
|---|---|---|
| 0 | Protocol | the archetype's full 30-day protocol (from §2) + one tool CTA |
| 3 | Friction fix | their blind-spot article (Sprinter→crash article, Strategist→elimination article…) |
| 30 | Re-engage | "How did the 30 go?" reply-prompt + next-cycle offer (re-sprint / extend program / template) |

### Guards (hard rules)
- Unconfirmed (no DOI) → no automation, no bulk sends — bot wall.
- `src:quiz` subscribers get the archetype track INSTEAD of generic E4-E5? No — they still get welcome E1-E3 (PDF/thesis/evidence); archetype track replaces E4 (quiz already done) and delays E5 (books) to day 14. Sequences merge, never double-send; frequency cap: max 1 email/day, 4/week per contact.
- Suppression: any click on unsubscribe → remove from ALL automations same second (Brevo native).

---

## 4) Future Monetization Path (per archetype — all gated behind Phase-2 rules: ≥1,000 confirmed subs, engagement bar, payout rails verified)

```
        ARCHETYPE (§2)                NEWSLETTER (§3)                 PRODUCT                  PRICE
Builder   → habits hub + guide    → protocol seq + ship-it weekly → "Habit Systems Pack"      $9 entry / $14 reg
Sprinter  → mindset + 40% rule    → cycle sequences               → "The 30-Day Challenge+"   $9 (flagship funnel)
Marathoner→ sport/sleep lane      → quarterly sharpening          → "90-Day Program"          $14 (longest = premium)
Strategist→ focus/elimination     → leverage+execution emails     → "Operating Templates"     $9 recurring-friendly
```
**Shared spine:** Quiz → archetype email → protocol delivered FREE (trust deposit) → day-30 re-engage = first honest ask → product offered only to `product:prospect_{archetype}` (clicked protocol) — never to cold segments.
**The one-line economic thesis:** the quiz converts 13-minute-dwell trust into a named segment; segments are what make a $9 product feel custom instead of marketed. `[All conversion % here are assumptions until measured — no invented baselines.]`

**Sequencing with existing strategy:**
1. Phase 1-c = capture + branching (Monetization Strategy v1, already ordered P1-a→b→c)
2. Phase 2-a = first product = **"Discipline Protocols" combined edition** (all 4 tracks — serves every segment without picking a winner) — this doc's §4 mini-packs only AFTER first sales data.
3. Pinterest Batch-3 pins → quiz (not articles) as landing for discipline-intent pins `[test at Batch 3, measure vs article landings]`

---

## 5) Open items (to close during execution, NOT now)
- [ ] No quiz **completion** event in GA4 today — instrument at Phase 1-c (single `gtag('event','quiz_complete',{archetype})`).
- [ ] Result-page form position: test moving capture inline under result card (currently page bottom) — UI change, needs its own preview/diff approval like everything else.
- [ ] FR archetype names: quiz FR uses "Le Bâtisseur" etc. — email copy must use the FR names as displayed, not EN ones (checked at ESP copy build).
- [ ] Protocol content per archetype (30-day version of §2 one-liners) = a writing task; source material exists across the recommended articles listed — build during Phase 1-b, zero new research needed.

---
*Documentation only. No code, no ESP config, no site change. Production frozen at `cefad00` until Oct 5. Companion docs: HANDOVER-2026-09-26.md · MONETIZATION-STRATEGY-V1.md · NEWSLETTER-WELCOME-SEQUENCE.md.*
