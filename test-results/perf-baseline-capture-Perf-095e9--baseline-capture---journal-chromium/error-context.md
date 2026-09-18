# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: perf-baseline-capture.spec.ts >> Performance baseline capture >> mobile baseline capture - journal
- Location: tests/perf-baseline-capture.spec.ts:77:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.evaluate: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - generic "Language switcher" [ref=e5]:
          - button "Switch to English" [pressed] [ref=e6] [cursor=pointer]: EN
          - generic [ref=e7]: /
          - button "Passer en français" [ref=e8] [cursor=pointer]: FR
        - button "Open menu" [ref=e9] [cursor=pointer]:
          - generic [ref=e10]: Menu
      - link [ref=e14] [cursor=pointer]:
        - /url: /
        - generic [ref=e15]:
          - text: Motiva
          - emphasis [ref=e16]: Hub
      - navigation "Main navigation" [ref=e17]:
        - link "The Journal" [ref=e18] [cursor=pointer]:
          - /url: /journal/
        - link "Quotes" [ref=e19] [cursor=pointer]:
          - /url: /quotes/
        - link "Topics" [ref=e20] [cursor=pointer]:
          - /url: /topics/
        - link "Books" [ref=e21] [cursor=pointer]:
          - /url: /books/
        - link "Atomic Habits" [ref=e22] [cursor=pointer]:
          - /url: /guides/atomic-habits-ultimate-guide/
  - generic [ref=e23]:
    - generic [ref=e24]:
      - link [ref=e25] [cursor=pointer]:
        - /url: /
        - generic [ref=e26]:
          - text: Motiva
          - emphasis [ref=e27]: Hub
      - button "Close menu" [ref=e28] [cursor=pointer]:
        - generic [ref=e29]: Close
    - navigation "Fullscreen menu" [ref=e33]:
      - generic [ref=e34]:
        - paragraph [ref=e35]: Read
        - link "01 The Journal" [ref=e36] [cursor=pointer]:
          - /url: /journal/
          - text: "01"
          - generic [ref=e37]: The Journal
        - link "02 Daily Quotes" [ref=e38] [cursor=pointer]:
          - /url: /quotes/
          - text: "02"
          - generic [ref=e39]: Daily Quotes
        - link "03 Topics" [ref=e40] [cursor=pointer]:
          - /url: /topics/
          - text: "03"
          - generic [ref=e41]: Topics
        - link "04 The Bookstand" [ref=e42] [cursor=pointer]:
          - /url: /books/
          - text: "04"
          - generic [ref=e43]: The Bookstand
      - generic [ref=e44]:
        - paragraph [ref=e45]: Guides
        - link "05 Atomic Habits" [ref=e46] [cursor=pointer]:
          - /url: /guides/atomic-habits-ultimate-guide/
          - text: "05"
          - generic [ref=e47]: Atomic Habits
        - link "06 Best Books 2026" [ref=e48] [cursor=pointer]:
          - /url: /best/books/
          - text: "06"
          - generic [ref=e49]: Best Books 2026
        - link "07 Best Focus Books" [ref=e50] [cursor=pointer]:
          - /url: /best/focus-books/
          - text: "07"
          - generic [ref=e51]: Best Focus Books
        - link "08 Best Habit Books" [ref=e52] [cursor=pointer]:
          - /url: /best/habit-books/
          - text: "08"
          - generic [ref=e53]: Best Habit Books
        - link "09 Best Stoicism Books" [ref=e54] [cursor=pointer]:
          - /url: /best/stoicism-books/
          - text: "09"
          - generic [ref=e55]: Best Stoicism Books
      - generic [ref=e56]:
        - paragraph [ref=e57]: Tools
        - link "10 Discipline Quiz" [ref=e58] [cursor=pointer]:
          - /url: /tools/discipline-quiz/
          - text: "10"
          - generic [ref=e59]: Discipline Quiz
        - link "11 Habit Stacker" [ref=e60] [cursor=pointer]:
          - /url: /tools/habit-stacker/
          - text: "11"
          - generic [ref=e61]: Habit Stacker
        - link "12 Meditation Timer" [ref=e62] [cursor=pointer]:
          - /url: /tools/meditation-timer/
          - text: "12"
          - generic [ref=e63]: Meditation Timer
        - link "13 Cold Shower Tracker" [ref=e64] [cursor=pointer]:
          - /url: /tools/cold-shower-tracker/
          - text: "13"
          - generic [ref=e65]: Cold Shower Tracker
        - link "14 Reading Calculator" [ref=e66] [cursor=pointer]:
          - /url: /tools/reading-calculator/
          - text: "14"
          - generic [ref=e67]: Reading Calculator
      - generic [ref=e68]:
        - paragraph [ref=e69]: Brand
        - link "15 The Author" [ref=e70] [cursor=pointer]:
          - /url: /author/youssef-raihane/
          - text: "15"
          - generic [ref=e71]: The Author
        - link "16 About" [ref=e72] [cursor=pointer]:
          - /url: /about/
          - text: "16"
          - generic [ref=e73]: About
        - link "17 30 Days of Discipline" [ref=e74] [cursor=pointer]:
          - /url: /pdf/30-days-discipline/
          - text: "17"
          - generic [ref=e75]: 30 Days of Discipline
        - link "18 Contact" [ref=e76] [cursor=pointer]:
          - /url: /contact/
          - text: "18"
          - generic [ref=e77]: Contact
    - generic [ref=e78]:
      - paragraph [ref=e79]: The Daily Drive. Mindset, habits, books and free tools — for the long ascent, one day at a time.
      - button "Subscribe" [ref=e80] [cursor=pointer]
  - main [ref=e81]:
    - generic [ref=e83]:
      - paragraph [ref=e84]: The Journal
      - heading [level=1] [ref=e85]:
        - text: Essays for the
        - emphasis [ref=e86]: long climb.
      - paragraph [ref=e87]: Mindset, habits, discipline, productivity, deep work — written to be read slowly and returned to.
    - generic [ref=e89]:
      - article [ref=e90]:
        - link [ref=e91] [cursor=pointer]:
          - /url: /journal/sleep-is-unfair-advantage/
          - img "Sleep Is Your Unfair Advantage (What Happened When I Tracked It for 60 Days)" [ref=e92]
        - generic [ref=e93]:
          - paragraph [ref=e94]:
            - generic [ref=e95]: Featured
            - text: ·
            - generic [ref=e96]: WELLNESS
            - text: · 9 MIN
          - heading [level=2] [ref=e97]:
            - link "Sleep Is Your Unfair Advantage (What Happened When I Tracked It for 60 Days)" [ref=e98] [cursor=pointer]:
              - /url: /journal/sleep-is-unfair-advantage/
          - paragraph [ref=e99]: Sleep isn't a luxury — it's a performance tool. I tracked every night of sleep for 60 days while testing what actually improves sleep quality. Here's the data, the failures, and the cheapest Amazon tools that helped.
          - paragraph [ref=e100]: September 7, 2026
          - link "Read Essay" [ref=e101] [cursor=pointer]:
            - /url: /journal/sleep-is-unfair-advantage/
      - searchbox "Search articles" [ref=e103]
      - generic [ref=e104]:
        - link "All" [ref=e105] [cursor=pointer]:
          - /url: /journal/
        - link "Mindset" [ref=e106] [cursor=pointer]:
          - /url: /topics/mindset/
        - link "Habits" [ref=e107] [cursor=pointer]:
          - /url: /topics/habits/
        - link "Discipline" [ref=e108] [cursor=pointer]:
          - /url: /topics/discipline/
        - link "Productivity" [ref=e109] [cursor=pointer]:
          - /url: /topics/productivity/
        - link "Goals" [ref=e110] [cursor=pointer]:
          - /url: /topics/goals/
        - link "Success" [ref=e111] [cursor=pointer]:
          - /url: /topics/success/
        - link "Personal Growth" [ref=e112] [cursor=pointer]:
          - /url: /topics/personal-growth/
        - link "Confidence" [ref=e113] [cursor=pointer]:
          - /url: /topics/confidence/
        - link "Sport" [ref=e114] [cursor=pointer]:
          - /url: /topics/sport/
        - link "Nutrition" [ref=e115] [cursor=pointer]:
          - /url: /topics/nutrition/
        - link "Travel" [ref=e116] [cursor=pointer]:
          - /url: /topics/travel/
        - link "Entertainment" [ref=e117] [cursor=pointer]:
          - /url: /topics/entertainment/
        - link "Stories" [ref=e118] [cursor=pointer]:
          - /url: /topics/stories/
        - link "Finance" [ref=e119] [cursor=pointer]:
          - /url: /topics/finance/
        - link "Relationships" [ref=e120] [cursor=pointer]:
          - /url: /topics/relationships/
        - link "WELLNESS" [ref=e121] [cursor=pointer]:
          - /url: /topics/wellness/
      - generic [ref=e122]:
        - article [ref=e124]:
          - link [ref=e125] [cursor=pointer]:
            - /url: /journal/the-morning-athlete/
            - img "Youssef Raihane - the morning athlete concept" [ref=e127]
          - generic [ref=e128]:
            - paragraph [ref=e129]:
              - generic [ref=e130]: Sport
              - text: · 10 MIN
            - heading [level=3] [ref=e131]:
              - 'link "The Morning Athlete: Why 5 AM Still Wins (And How to Actually Do It)" [ref=e132] [cursor=pointer]':
                - /url: /journal/the-morning-athlete/
            - paragraph [ref=e133]: I've tested early-morning training for 5 years — as an amateur athlete, a coach, and a regular person trying to fit workouts into a full life. Here's what works, what fails, and why 5 AM still beats every other option.
            - paragraph [ref=e134]: September 6, 2026
            - link "Read Article" [ref=e135] [cursor=pointer]:
              - /url: /journal/the-morning-athlete/
        - article [ref=e137]:
          - link [ref=e138] [cursor=pointer]:
            - /url: /journal/2-minute-rule-system/
            - img "Youssef Raihane writing one sentence at his desk in Casablanca - 2 minute rule doorway" [ref=e140]
          - generic [ref=e141]:
            - paragraph [ref=e142]:
              - generic [ref=e143]: Habits
              - text: · 18 MIN
            - heading [level=3] [ref=e144]:
              - 'link "The 2-Minute Rule: A Complete System, Not Just a Trick" [ref=e145] [cursor=pointer]':
                - /url: /journal/2-minute-rule-system/
            - paragraph [ref=e146]: James Clear's 2-minute rule is the most misunderstood idea in habit science. It is not a productivity hack. It is a complete system of identity, design, and recovery. Here is the full architecture — including what to do when it stops working.
            - paragraph [ref=e147]: September 5, 2026
            - link "Read Article" [ref=e148] [cursor=pointer]:
              - /url: /journal/2-minute-rule-system/
        - article [ref=e150]:
          - link [ref=e151] [cursor=pointer]:
            - /url: /journal/discipline-vs-punishment/
            - img "Youssef Raihane writing at his desk in Casablanca - discipline vs punishment concept" [ref=e153]
          - generic [ref=e154]:
            - paragraph [ref=e155]:
              - generic [ref=e156]: Discipline
              - text: · 8 MIN
            - heading [level=3] [ref=e157]:
              - 'link "Discipline vs Punishment: The Difference That Changes Everything" [ref=e158] [cursor=pointer]':
                - /url: /journal/discipline-vs-punishment/
            - paragraph [ref=e159]: Discipline builds the person. Punishment breaks them. The psychological difference — and the moment most people cross from one to the other without realizing. Three tests to tell them apart.
            - paragraph [ref=e160]: September 5, 2026
            - link "Read Article" [ref=e161] [cursor=pointer]:
              - /url: /journal/discipline-vs-punishment/
        - article [ref=e163]:
          - link [ref=e164] [cursor=pointer]:
            - /url: /journal/identity-based-habits-90-day-test/
            - img "Youssef Raihane - identity based habits 90 day test concept" [ref=e166]
          - generic [ref=e167]:
            - paragraph [ref=e168]:
              - generic [ref=e169]: Habits
              - text: · 9 MIN
            - heading [level=3] [ref=e170]:
              - 'link "Identity-Based Goals: The One Change That Made My Habits Stick" [ref=e171] [cursor=pointer]':
                - /url: /journal/identity-based-habits-90-day-test/
            - paragraph [ref=e172]: Goal-based habits fail because the goal is external. Identity-based habits stick because you become someone. I tried this for 90 days. Here's the difference, the evidence, and how to apply it tonight.
            - paragraph [ref=e173]: September 5, 2026
            - link "Read Article" [ref=e174] [cursor=pointer]:
              - /url: /journal/identity-based-habits-90-day-test/
        - article [ref=e176]:
          - link [ref=e177] [cursor=pointer]:
            - /url: /journal/missed-day-protocol/
            - img "Youssef Raihane - missed day protocol concept" [ref=e179]
          - generic [ref=e180]:
            - paragraph [ref=e181]:
              - generic [ref=e182]: Habits
              - text: · 7 MIN
            - heading [level=3] [ref=e183]:
              - link "What to Do When You Miss a Day (Without Quitting Everything)" [ref=e184] [cursor=pointer]:
                - /url: /journal/missed-day-protocol/
            - paragraph [ref=e185]: Missing a day is not the end of a habit. It is the test of the system. Here is the exact protocol for the day after a miss — and the three rules that prevent the miss from becoming a relapse.
            - paragraph [ref=e186]: September 5, 2026
            - link "Read Article" [ref=e187] [cursor=pointer]:
              - /url: /journal/missed-day-protocol/
        - article [ref=e189]:
          - link [ref=e190] [cursor=pointer]:
            - /url: /journal/morning-vs-night/
            - img "Youssef Raihane - morning vs night concept" [ref=e192]
          - generic [ref=e193]:
            - paragraph [ref=e194]:
              - generic [ref=e195]: Habits
              - text: · 9 MIN
            - heading [level=3] [ref=e196]:
              - 'link "Morning vs Night: Which Discipline Actually Sticks?" [ref=e197] [cursor=pointer]':
                - /url: /journal/morning-vs-night/
            - paragraph [ref=e198]: Chronotype science, not willpower, decides which discipline routine will survive. The data on morning vs evening routines — and the 4-question test that tells you which one will work for you.
            - paragraph [ref=e199]: September 5, 2026
            - link "Read Article" [ref=e200] [cursor=pointer]:
              - /url: /journal/morning-vs-night/
        - article [ref=e202]:
          - link [ref=e203] [cursor=pointer]:
            - /url: /journal/nervous-system-reset-focus/
            - img "Youssef Raihane - nervous system reset focus concept" [ref=e205]
          - generic [ref=e206]:
            - paragraph [ref=e207]:
              - generic [ref=e208]: Habits
              - text: · 10 MIN
            - heading [level=3] [ref=e209]:
              - link "Why You Can't Focus (And the 5-Minute Exercise That Fixed It for Me)" [ref=e210] [cursor=pointer]:
                - /url: /journal/nervous-system-reset-focus/
            - paragraph [ref=e211]: The reason willpower-based productivity failed me — and what finally worked. A body-first approach to focus that neuroscience is increasingly supporting. With practical protocols you can try tonight.
            - paragraph [ref=e212]: September 4, 2026
            - link "Read Article" [ref=e213] [cursor=pointer]:
              - /url: /journal/nervous-system-reset-focus/
        - article [ref=e215]:
          - link [ref=e216] [cursor=pointer]:
            - /url: /journal/identity-challenge-7-days/
            - img "Youssef Raihane - identity challenge 7 days concept" [ref=e218]
          - generic [ref=e219]:
            - paragraph [ref=e220]:
              - generic [ref=e221]: Habits
              - text: · 14 MIN
            - heading [level=3] [ref=e222]:
              - link "I Ran a 7-Day Identity Challenge. Here's What 7 Days of Voting Actually Does." [ref=e223] [cursor=pointer]:
                - /url: /journal/identity-challenge-7-days/
            - paragraph [ref=e224]: A personal experiment. Seven days, one identity statement, one tiny daily action. The math, the science, and the surprising result by day 7 — and what happened when I stopped.
            - paragraph [ref=e225]: September 3, 2026
            - link "Read Article" [ref=e226] [cursor=pointer]:
              - /url: /journal/identity-challenge-7-days/
        - article [ref=e228]:
          - link [ref=e229] [cursor=pointer]:
            - /url: /journal/morning-routines-12-tested/
            - img "Youssef Raihane - morning routines 12 tested concept" [ref=e231]
          - generic [ref=e232]:
            - paragraph [ref=e233]:
              - generic [ref=e234]: Habits
              - text: · 16 MIN
            - heading [level=3] [ref=e235]:
              - link "I Tested 12 Morning Routines for 14 Days. Only 3 of Them Stuck." [ref=e236] [cursor=pointer]:
                - /url: /journal/morning-routines-12-tested/
            - paragraph [ref=e237]: Fourteen days, twelve routines, four archetypes. A field report on which morning routines actually work for which kind of disciplined person — and which ones are just expensive ways to feel productive.
            - paragraph [ref=e238]: September 3, 2026
            - link "Read Article" [ref=e239] [cursor=pointer]:
              - /url: /journal/morning-routines-12-tested/
        - article [ref=e241]:
          - link [ref=e242] [cursor=pointer]:
            - /url: /journal/slow-productivity-30-day-test/
            - img "Youssef Raihane - slow productivity 30 day test concept" [ref=e244]
          - generic [ref=e245]:
            - paragraph [ref=e246]:
              - generic [ref=e247]: Productivity
              - text: · 11 MIN
            - heading [level=3] [ref=e248]:
              - link "I Tried Slow Productivity for 30 Days. Here's What Actually Changed." [ref=e249] [cursor=pointer]:
                - /url: /journal/slow-productivity-30-day-test/
            - paragraph [ref=e250]: Cal Newport's slow productivity system in practice — fewer projects, natural pace, obsession with quality. I tested it for 30 days while building a business. Here's the data, the failures, and the one rule that worked.
            - paragraph [ref=e251]: September 3, 2026
            - link "Read Article" [ref=e252] [cursor=pointer]:
              - /url: /journal/slow-productivity-30-day-test/
        - article [ref=e254]:
          - link [ref=e255] [cursor=pointer]:
            - /url: /journal/two-minute-rule-guide/
            - img "Youssef Raihane - two minute rule guide concept" [ref=e257]
          - generic [ref=e258]:
            - paragraph [ref=e259]:
              - generic [ref=e260]: Habits
              - text: · 12 MIN
            - heading [level=3] [ref=e261]:
              - 'link "The 2-Minute Rule: 7-Day Protocol + Full Guide" [ref=e262] [cursor=pointer]':
                - /url: /journal/two-minute-rule-guide/
            - paragraph [ref=e263]: James Clear's most underrated idea. Start so small it feels stupid. Then watch the doorway stay open. The full evidence base, the protocol, and what to do when you outgrow it.
            - paragraph [ref=e264]: September 3, 2026
            - link "Read Article" [ref=e265] [cursor=pointer]:
              - /url: /journal/two-minute-rule-guide/
      - navigation "Pagination" [ref=e266]:
        - generic [ref=e267]: ← Newer
        - generic [ref=e268]: Page 1 of 15
        - link "Older →" [ref=e269] [cursor=pointer]:
          - /url: /journal/page/2/
  - contentinfo [ref=e270]:
    - generic [ref=e273]:
      - paragraph [ref=e274]: The Daily Drive · Newsletter
      - heading [level=2] [ref=e275]:
        - text: One letter.
        - emphasis [ref=e276]: Every Sunday.
      - paragraph [ref=e277]: The week's essays, one book worth reading, and a small practice to try — delivered to people building the long ascent.
      - generic [ref=e278]:
        - textbox "Email address" [ref=e279]:
          - /placeholder: your@email.com
        - button "Subscribe" [ref=e280] [cursor=pointer]
      - paragraph [ref=e281]: Free · No spam · Unsubscribe anytime
    - generic [ref=e282]:
      - generic [ref=e283]:
        - generic [ref=e284]:
          - link [ref=e285] [cursor=pointer]:
            - /url: /
            - generic [ref=e286]:
              - text: Motiva
              - emphasis [ref=e287]: Hub
            - paragraph [ref=e288]: The Daily Drive. Mindset, habits, books and free tools — for the long ascent, one day at a time.
          - generic [ref=e289]:
            - link [ref=e290] [cursor=pointer]:
              - /url: /
            - link "Instagram" [ref=e291] [cursor=pointer]:
              - /url: https://www.instagram.com/motivahub/
              - text: IG
            - link "Twitter / X" [ref=e292] [cursor=pointer]:
              - /url: https://x.com/themotivahub
              - text: X
            - link "YouTube" [ref=e293] [cursor=pointer]:
              - /url: https://www.youtube.com/@motivahub
              - text: YT
            - link "LinkedIn" [ref=e294] [cursor=pointer]:
              - /url: https://www.linkedin.com/company/motivahub
              - text: in
        - generic [ref=e295]:
          - heading "Read" [level=4] [ref=e296]
          - list [ref=e297]:
            - listitem [ref=e298]:
              - link "The Journal" [ref=e299] [cursor=pointer]:
                - /url: /journal/
            - listitem [ref=e300]:
              - link "Books" [ref=e301] [cursor=pointer]:
                - /url: /books/
            - listitem [ref=e302]:
              - link "Daily Quotes" [ref=e303] [cursor=pointer]:
                - /url: /quotes/
            - listitem [ref=e304]:
              - link "Podcast" [ref=e305] [cursor=pointer]:
                - /url: /podcast/
            - listitem [ref=e306]:
              - link "Topics" [ref=e307] [cursor=pointer]:
                - /url: /topics/
        - generic [ref=e308]:
          - heading "Guides" [level=4] [ref=e309]
          - list [ref=e310]:
            - listitem [ref=e311]:
              - link "Atomic Habits" [ref=e312] [cursor=pointer]:
                - /url: /guides/atomic-habits-ultimate-guide/
            - listitem [ref=e313]:
              - link "Best Books 2026" [ref=e314] [cursor=pointer]:
                - /url: /best/books/
            - listitem [ref=e315]:
              - link "Best Focus Books" [ref=e316] [cursor=pointer]:
                - /url: /best/focus-books/
            - listitem [ref=e317]:
              - link "Best Habit Books" [ref=e318] [cursor=pointer]:
                - /url: /best/habit-books/
            - listitem [ref=e319]:
              - link "Stoicism" [ref=e320] [cursor=pointer]:
                - /url: /best/stoicism-books/
        - generic [ref=e321]:
          - heading "Tools" [level=4] [ref=e322]
          - list [ref=e323]:
            - listitem [ref=e324]:
              - link "Discipline Quiz" [ref=e325] [cursor=pointer]:
                - /url: /tools/discipline-quiz/
            - listitem [ref=e326]:
              - link "Habit Stacker" [ref=e327] [cursor=pointer]:
                - /url: /tools/habit-stacker/
            - listitem [ref=e328]:
              - link "Meditation Timer" [ref=e329] [cursor=pointer]:
                - /url: /tools/meditation-timer/
            - listitem [ref=e330]:
              - link "Cold Shower Tracker" [ref=e331] [cursor=pointer]:
                - /url: /tools/cold-shower-tracker/
            - listitem [ref=e332]:
              - link "Reading Calculator" [ref=e333] [cursor=pointer]:
                - /url: /tools/reading-calculator/
            - listitem [ref=e334]:
              - link "30 Days PDF" [ref=e335] [cursor=pointer]:
                - /url: /pdf/30-days-discipline/
      - generic [ref=e336]:
        - paragraph [ref=e337]: © 2026 Motiva Hub · The Long Ascent
        - generic [ref=e338]:
          - link "About" [ref=e339] [cursor=pointer]:
            - /url: /about/
          - link "Contact" [ref=e340] [cursor=pointer]:
            - /url: /contact/
          - link "Privacy" [ref=e341] [cursor=pointer]:
            - /url: /privacy/
          - link "Terms" [ref=e342] [cursor=pointer]:
            - /url: /terms/
          - link "Disclosure" [ref=e343] [cursor=pointer]:
            - /url: /affiliate-disclosure/
  - generic [ref=e344]:
    - paragraph [ref=e345]:
      - text: We use cookies to improve your experience and for analytics. By continuing, you agree to our
      - link "Privacy Policy" [ref=e346] [cursor=pointer]:
        - /url: /privacy/
      - text: .
    - generic [ref=e347]:
      - button "Accept" [ref=e348] [cursor=pointer]
      - button "Decline" [ref=e349] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const PAGES = [
  4   |   { name: 'homepage', url: 'https://the-motivahub.com/' },
  5   |   { name: 'journal', url: 'https://the-motivahub.com/journal/' },
  6   |   { name: 'guide', url: 'https://the-motivahub.com/guides/atomic-habits-ultimate-guide/' },
  7   | ];
  8   | 
  9   | async function measureVitals(page: any): Promise<any> {
> 10  |   return page.evaluate(() => {
      |               ^ Error: page.evaluate: Test timeout of 30000ms exceeded.
  11  |     return new Promise((resolve) => {
  12  |       const data: any = { url: location.href };
  13  |       try {
  14  |         const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  15  |         data.TTFB = Math.round(nav.responseStart - nav.requestStart);
  16  |         data.loadEventEnd = Math.round(nav.loadEventEnd);
  17  |         data.domContentLoaded = Math.round(nav.domContentLoadedEventEnd);
  18  |       } catch (e) {
  19  |         data.navError = String(e);
  20  |       }
  21  | 
  22  |       const seen = new Set<string>();
  23  |       const longTasks: number[] = [];
  24  |       const obs = new PerformanceObserver((list) => {
  25  |         for (const entry of list.getEntries()) {
  26  |           if (entry.name === 'first-contentful-paint' && !seen.has('FCP')) {
  27  |             seen.add('FCP');
  28  |             data.FCP = Math.round(entry.startTime);
  29  |           }
  30  |           if (entry.entryType === 'largest-contentful-paint' && !seen.has('LCP')) {
  31  |             seen.add('LCP');
  32  |             data.LCP = Math.round(entry.startTime);
  33  |             try {
  34  |               const el = entry.element as Element | undefined;
  35  |               data.lcpTag = el?.tagName || null;
  36  |               data.lcpSelector = el ? (el.id ? `#${el.id}` : el.tagName.toLowerCase()) : null;
  37  |               if (el) {
  38  |                 const rect = el.getBoundingClientRect();
  39  |                 data.lcpRect = { x: Math.round(rect.x), y: Math.round(rect.y), width: Math.round(rect.width), height: Math.round(rect.height) };
  40  |               }
  41  |             } catch (e) {
  42  |               data.lcpSelectorError = String(e);
  43  |             }
  44  |           }
  45  |           if (entry.entryType === 'layout-shift' && !seen.has('CLS')) {
  46  |             seen.add('CLS');
  47  |             data.CLS = Math.round(entry.value * 10000) / 10000;
  48  |           }
  49  |           if (entry.entryType === 'longtask') {
  50  |             longTasks.push(Math.round(entry.duration));
  51  |             data.TBT = longTasks.reduce((a, b) => a + b, 0);
  52  |             data.longTaskCount = longTasks.length;
  53  |             data.longTaskMax = Math.max(...longTasks);
  54  |           }
  55  |         }
  56  |       });
  57  | 
  58  |       try {
  59  |         obs.observe({ type: 'paint', buffered: true });
  60  |         obs.observe({ type: 'layout-shift', buffered: true });
  61  |         obs.observe({ type: 'largest-contentful-paint', buffered: true });
  62  |         obs.observe({ type: 'longtask', buffered: true });
  63  |       } catch (e) {
  64  |         data.obsError = String(e);
  65  |       }
  66  | 
  67  |       setTimeout(() => {
  68  |         obs.disconnect();
  69  |         resolve(data);
  70  |       }, 4000);
  71  |     });
  72  |   });
  73  | }
  74  | 
  75  | test.describe('Performance baseline capture', () => {
  76  |   for (const page of PAGES) {
  77  |     test(`mobile baseline capture - ${page.name}`, async ({ page: p }) => {
  78  |       const client = await p.context().newCDPSession(p);
  79  |       await client.send('Network.emulateNetworkConditions', {
  80  |         offline: false,
  81  |         downloadThroughput: 750 * 1024 / 8,
  82  |         uploadThroughput: 250 * 1024 / 8,
  83  |         latency: 40,
  84  |       });
  85  | 
  86  |       await p.goto(page.url, { waitUntil: 'load' });
  87  |       await p.waitForTimeout(500);
  88  |       await p.evaluate(async () => {
  89  |         const imgs = Array.from(document.querySelectorAll('img'));
  90  |         await Promise.all(imgs.map(img => {
  91  |           if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
  92  |           return new Promise(resolve => {
  93  |             const timeout = setTimeout(resolve, 3000);
  94  |             img.addEventListener('load', () => clearTimeout(timeout) || resolve(), { once: true });
  95  |             img.addEventListener('error', () => clearTimeout(timeout) || resolve(), { once: true });
  96  |           });
  97  |         }));
  98  |       });
  99  | 
  100 |       const vitals = await measureVitals(p);
  101 |       console.log(`[baseline] mobile ${page.name}`, JSON.stringify(vitals, null, 2));
  102 |     });
  103 | 
  104 |     test(`desktop baseline capture - ${page.name}`, async ({ page: p }) => {
  105 |       await p.goto(page.url, { waitUntil: 'load' });
  106 |       await p.waitForTimeout(500);
  107 |       await p.evaluate(async () => {
  108 |         const imgs = Array.from(document.querySelectorAll('img'));
  109 |         await Promise.all(imgs.map(img => {
  110 |           if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
```