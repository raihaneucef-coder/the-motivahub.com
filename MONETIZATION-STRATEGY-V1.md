# Motiva Hub — Monetization Strategy v1
**Prepared:** 2026-09-26 · **Status:** STRATEGY ONLY — zero implementation until Oct 5 approval
**Grounding:** all numbers from GA4/GSC audits (HANDOVER-2026-09-26.md §3) or codebase inspection. Assumptions are flagged `[verify]`.

---

## 0) Current State (facts)

- Traffic: ~860 sessions/mo (bot-adjusted), 12-33/day true run-rate. Google organic: 143s / 71% eng / **13m19s dwell**.
- Audience: 80% Morocco · EN 534 / FR 287 sessions (35% French) · desktop 59% · returning ≈ 28 users/mo (retention problem → newsletter is the fix).
- Monetization plumbing live but flowing $0: Amazon tags `motivahub-21` (fr) / `motivahub21-20` (com, geo US/CA) on ~370 pages; AdSense verified, **0 ad units (correct choice at this scale)**; FormSubmit email forwarding (no ESP, no sequences); 1 free lead magnet (`30-days-discipline.pdf`); quiz with 4 archetypes (Builder/Sprinter/Marathoner/Strategist) at 97% engagement promising a "30-day protocol by email" that **is not automated today**.
- Conversion events 28d: form_start ≈ 1 pre-fix (fix live `cefad00`, judge Oct 5+), affiliate_click 2.

**Strategic read:** every monetization channel needs an audience loop first. The only compounding asset available at this stage = email list. Everything else (affiliate, products, sponsorships) converts off it.

---

## 1) Newsletter System Strategy

### 1.1 ESP comparison (current stage: 0 → 5k subs, bilingual, $0-10/mo budget)

| Criteria | **Brevo** (FR 🇫🇷) | MailerLite | Kit (ConvertKit) |
|---|---|---|---|
| Free tier | 300 emails/**day**, unlimited contacts `[verify]` | 1,000 subs, 12,000 emails/mo | 10,000 subs but limited automations |
| Paid entry (1k subs) | ~€9/mo unlimited sends `[verify]` | ~$10/mo | ~$39/mo — worst at our size |
| French language | Native (French company, FR UI/support/deliverability EU) | FR interface available | EN only |
| Automation on free | Yes (basic journeys) + **transactional API included** | Yes (basic) | Limited |
| API / form migration | v3 REST API, works from a Vercel serverless fn | API good | API good |
| Extras relevant later | SMS, transactional, landing pages | Landing pages, site builder | **Paid products + creator recommendations built-in** (Phase 3 relevant) |

**Decision: Brevo.**
1. Our audience is 35% French + Morocco (EU-adjacent sending reputation; Brevo is a French, RGPD-native sender).
2. Cheapest realistic path: free tier covers us to ~9k sends/mo without feature paywall on automations.
3. One account does marketing broadcasts **and** transactional (welcome-sequence delivery of the PDF), which MailerLite free throttles and Kit prices high.
4. Runner-up value note: Kit becomes interesting ONLY in Phase 3 if we sell products through its creator network — revisit then, not now.

### 1.2 Migration from FormSubmit (zero site redesign)
```
Today:  <form action="https://formsubmit.co/...">  → email forwarding only
Target: <form> JS submit → POST /api/subscribe (Vercel serverless fn)
            → Brevo v3 API: createContact(list by lang, attributes:
               archetype, source_page, consent ts, double opt-in)
            → returns {ok} → same GA4 events fire (form_start/form_submit)
```
- Site change = ONE new serverless fn + form action swap in `NewsletterSection.astro` (35+ template embeddings auto-update from the one component — architecture already supports this).
- Keep FormSubmit active during a 2-week dual-run fallback (same inbox receives both) → then retire.
- Double opt-in: Brevo confirmation email = **the lead magnet delivery email** (one send, honest).
- Lists: `Motiva-EN` / `Motiva-FR` (2 lists) + tags: `quiz:builder|sprinter|marathoner|strategist`, `src:article|tool|hub|footer`.
- **Sequencing constraint:** do this AFTER Oct 5 — the current fix needs its 7-14d `form_start` measurement before the pipe changes (don't move the goalpost mid-measurement).

### 1.3 Welcome sequence — 5 emails (EN copy; FR versions adapted, not translated `[copy rule: same tone, natural French]`)

**Email 1 — Day 0 · DELIVER (the promise)**
- Subject: `Your 30-Day Discipline Challenge is here`  · FR: `Votre Défi Discipline 30 jours est là`
- Preview: `One click. It starts tomorrow morning.`
- Body: PDF download button FIRST (no text wall) → 3-line "how to use it: print or keep open, day X every morning, 1 checkbox matters more than streaks" → what you'll get from us (short, honest: "ideas that survived testing — no hype").
- CTA: **[Download the PDF]** (deep link). Secondary: follow Pinterest/IG links (low).
- Purpose: keep the microcopy promise true ("check your inbox" becomes true).

**Email 2 — Day 2 · STORY (why we exist)**
- Subject: `I stopped trusting motivation. Here's what replaced it.`
- Body: founder-voice 150 words → the identity/process thesis → link to P4 Evidence Stories hub ("stories that prove it").
- CTA: `Read: Stories of people who changed →` /topics/stories/
- Purpose: brand anchoring; hub traffic from the only owned channel.

**Email 3 — Day 4 · EVIDENCE (the science hook)**
- Subject: `It takes 66 days, not 21 (the study nobody cites)`
- Body: Lally 2010 teaser → habit formation reality → point to P1 habits hub + atomic guide.
- CTA: `The Habits system →` /topics/habits/
- Purpose: this is the future citation-layer pilot — an email that cites a primary study before the site does.

**Email 4 — Day 7 · ACTIVATE (tool push)**
- Subject: `Day 1 of the 30. Do it in the next 5 minutes.`
- Body: micro-protocol (2-minute version) → CTA to quiz ("find your discipline archetype — 90 seconds") + habit-stacker.
- CTA: `Take the Discipline Quiz →` (segments the list automatically)
- Purpose: quiz completes segmentation; engaged-7-days-in = best reply rate window.

**Email 5 — Day 10 · RECOMMEND (affiliate loop, honest)**
- Subject: `3 books I actually re-read (not the usual list)`
- Body: 3 picks with one-line "why it's different" → /books/ page (Amazon links + disclosure already compliant).
- CTA: `See the full bookstand →` /books/
- Purpose: first affiliate monetization moment inside a sequence; measured via affiliate_click + Amazon dashboard.

Cadence after: 1 editorial email/week (rotate: story/science/protocol/tool/book — the 5 lanes above). No "weekly" promise publicly until ESP proves the sending rhythm (stay honest per newsletter audit).

### 1.4 Lead magnet delivery flow (fixed)
```
Submit → Brevo double opt-in email (= Email 1) → click confirms → PDF + sequence starts
Fallback (if we skip DOI): Email 1 fires immediately with direct PDF link + unsubscribe legal block.
Recommendation: use DOI — it filters bots (we have Sep-18 evidence), and Email 1 IS the delivery.
```

---

## 2) Quiz Funnel Strategy

**The gap (fact):** quiz promises "a custom 30-day protocol based on your type" — today nothing is delivered automatically. Two honest closes:
- **Quick close (no code):** deliver ONE combined "4 Archetype Protocols" PDF via the newsletter Email 1 when `src:quiz` tag present — all four protocols in one document; the email says "find your section". Cheap, truthful, ships in Phase 1.
- **Real close (post-approval, minimal code):** quiz result page keeps a client-side hidden field → form POST includes `archetype` → Brevo attribute → per-archetype automation branch (4 mini-sequences of 2 emails each: protocol steps day 1 + day 30 re-engagement).

**Segmentation model (matches existing 4 archetypes):**
| Segment | Positioning | Follow-up angle | Product affinity |
|---|---|---|---|
| Builder | systems/habits people | atomic-guide lane | habits protocol pack, reading tools |
| Sprinter | intensity cycles | Goggins/mindset lane | 30-day challenge upsell |
| Marathoner | endurance/consistency | sleep/recovery lane | long-program product |
| Strategist | planning/leverage | deep-work/productivity lane | Notion-style templates |

**Funnel map:** Hub/article → quiz (97% eng) → archetype result → inline email CTA (already present, copy synced per 3-place rule) → ESP tag → segmented sequence → (Phase 2) segmented product offer. Success metric: quiz completions → subscribers rate; then segment reply/click rates.

---

## 3) Affiliate + Books Strategy

**Assets (fact):** `/books/` (14 titles, pos 4.2, 10i/0c), 4 `/best/*` roundups, BookCTA component, 370 pages with tagged links, disclosure pages EN+FR, geo routing FR↔US tags, hub "View on Amazon" strips.

**Highest-potential pages (ranked by measured position/engagement):**
1. `/books/` — pos 4.2 is page-1; CTR round-2 (staged task #7) is the unlock. Every click here ≈ Amazon EPC 3-4% `[verify: Amazon books commission rate current]`.
2. `atomic-habits-ultimate-guide` — highest-traffic article but 28% eng (content review staged) — fix eng, add mid-content BookCTA (currently end-only).
3. In-body-tested articles (`identity-based-habits-90-day-test`, `how-to-read-30-books-a-year`, `i-tested-12-morning-routines`, `slow-productivity-30-day-test`) — these ALREADY convert-to-Amazon style content (products named: Moleskine, journals) — they're the affiliate-native format: **"test → tool/book named → buy link"**. More of this format = more affiliate surface without spamming links.
4. Pillar hubs — product strips exist (books+tools); rely on Nav-v2 traffic.

**Article → book flow (to standardize post-Oct 5):** every hub-visible article ends with exactly one BookCTA matched by `bookSlug` (data already in pillars.ts/books.ts) — one recommendation, tied to the article's claim, disclosed. Rule: recommend only what the article actually used (no link-farming — protects both Amazon account and E-E-A-T).

**Account health `[verify]`:** Amazon Associates requires 3 qualifying sales in first 180 days to keep the account — with 2 clicks/28d, the sequence Email 5 + /books/ CTR fix are the two honest levers. If the deadline risk is real, one $10 self-purchase through a link is NOT allowed (against ToS) — the lever is traffic quality, not tricks. Pinterest quote pins → /quotes/ + book pins fit this too.

---

## 4) Digital Product Roadmap

**Gate: start selling only after ≥1,000 confirmed subscribers OR ≥200 list growth/mo with engagement >40% open `[industry benchmark — verify against our data at phase gate]`.**

**First product (hypothesis, not commitment):**
- **Name:** `The Discipline Protocols — 4 archetypes, 30 real days`
- **What:** the quiz promise expanded into a paid 40-60 page workbook: 4 archetype tracks × 30 daily protocols + weekly checkpoint sheets + the free PDF embedded as starter module. Built ENTIRELY from existing site content (protocols already exist in articles — this is packaging, not new research).
- **Audience:** quiz-takers first (highest intent 97%), then Email 1 → 30-day starters at day 25 ("extend the win"), then hubs.
- **Structure:** Module 0 mindset-of-a-protocol → 4 archetype tracks → 30-day log → troubleshooting (missed days/relapse = existing articles).
- **Pricing hypothesis:** launch **$9 / regular $14** · FR market same price (not PPR — low volume justifies friction) `[verify at gate]`. Rationale: below impulse threshold, above junk tier; Moroccan purchasing power reality ⇒ also plan a **free-tier forever** (the current PDF remains free — never paywall the promise already made).
- **Checkout rails (fact-sensitive):** Morocco-based seller options: Gumroad (works, handles VAT, pays to bank/PayPal — verify Morocco payout support `[verify]`) vs LemonSqueezy/Paddle as merchant of record `[verify Morocco onboarding]`. Stripe = not available for MA residents — do not plan around it. **This verification is a Phase-2 gate task, not a now-task.**
- **Funnel:** Email 5-book → Email 8 protocol teaser → soft sell to warm segments only; product page on-site (`/protocols/`) with same editorial tone; no popup, no scarcity theater.

**Phase 2/3 extensions:** archetype-specific mini-packs ($5) · Notion/PDF template library · later sponsorships once list >5k (EN discipline niche CPM `[verify]` ~$20-30/email).

---

## 5) Final Document — Consolidated

### A) Current state
Fully plumbed, $0 flowing. Trust engine works (13m dwell organic); the loop that turns trust into an owned audience (email) exists in form but not in function (forwarding, no sequences, unkept quiz promise).

### B) Opportunities (ranked by measured evidence)
1. Newsletter/ESP loop — the compounding asset (fixes retention ≈ 0 fact)
2. Quiz → archetype segmentation — best-intent traffic, promise already made
3. `/books/` pos 4.2 + tested-article affiliate format — quasi-ready buyers
4. Hubs starved-but-100%-engaged — storefronts after Nav-v2
5. Paid protocols product — pure packaging of existing content

### C) Priorities / execution order (all post-Oct 5, each one approval-gated)
```
P1-a  ESP account + /api/subscribe fn + form swap + dual-run          (Week 1 after gate)
P1-b  Welcome sequence 5 emails EN+FR + lead-magnet DOI delivery      (Week 1-2)
P1-c  Quiz archetype capture → tags + 4 branch sequences              (Week 2-3)
P2-a  /books/ + /about/ CTR round 2 (already staged)                  (Week 3)
P2-b  Mid-content BookCTA on 5 hub-visible articles                   (Week 3-4)
P3    Product gate check (subs ≥1,000 or engagement bar) → payout rails
      verification → build → soft launch                              (Month 2-3)
```

### D) Risks
| Risk | Severity | Mitigation |
|---|---|---|
| Moving forms mid-measurement pollutes Oct 5 baseline | High | ESP work starts strictly AFTER Oct 5 report |
| Quiz promise stays unkept during transition = trust burn | High | The combined-4-protocols PDF stopgap in Email 1 (day 0 of ESP launch) |
| Morocco payout/checkout friction blocks Phase 2 | Med | `[verify]` tasks queued as Phase-2 gate, decision not assumption |
| Amazon 180-day/3-sale rule `[verify]` | Med | Email 5 + CTR fix are the honest levers; no ToS-violating workarounds |
| ESP free-tier send caps (300/day) | Low | Irrelevant below 9k subs |
| Selling too early to a cold 100-person list | High | Explicit subscriber/engagement gate above — no exceptions |
| Consent/GDPR surface grows (real ESP vs forwarding) | Med | DOI + consent timestamp + FR/RGPD-native provider (Brevo) |

### E) Recommended strategy (one line)
**Audience-first, affiliate-second, product-third, ads-never-until-scale** — Motiva Hub's 13-minute dwell times say the hard part (earning trust) already works; monetization = building the loop that captures it (Brevo + quiz segments), then converting it slowly and honestly (books → protocols → sponsorships).

---
*End of strategy doc. No implementation performed. No files other than this document and HANDOVER-2026-09-26.md touched; both untracked, no commit, production still frozen at `cefad00`.*
