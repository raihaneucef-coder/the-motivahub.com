# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: perf-baseline-capture.spec.ts >> Performance baseline capture >> desktop baseline capture - homepage
- Location: tests/perf-baseline-capture.spec.ts:103:5

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
    - generic [ref=e82]:
      - generic [aria-hidden] [ref=e83]:
        - generic [ref=e84]: EST · MMXXV
        - generic [ref=e85]: ·
        - generic [ref=e86]: THE LONG ASCENT
        - generic [ref=e87]: ·
        - generic [ref=e88]: NO SHORTCUTS
      - generic [ref=e90]:
        - generic [ref=e91]: EST. 2025 · THE LONG ASCENT
        - heading [level=1] [ref=e93]:
          - text: Build the discipline.
          - emphasis [ref=e94]: One day at a time.
        - paragraph [ref=e95]: Mindset, habits, books, and free tools — for the person who would rather be patient and unstoppable than loud and brief.
        - generic [ref=e96]:
          - link "Start Reading →" [ref=e97] [cursor=pointer]:
            - /url: /journal/
            - generic [ref=e98]: Start Reading
            - generic [ref=e99]: →
          - link "Take the Quiz →" [ref=e100] [cursor=pointer]:
            - /url: /tools/discipline-quiz/
            - generic [ref=e101]: Take the Quiz
            - generic [ref=e102]: →
        - generic [ref=e103]:
          - generic [ref=e104]:
            - generic [ref=e105]: "169"
            - generic [ref=e106]: Editorial Pages
          - generic [ref=e107]:
            - generic [ref=e108]: "5"
            - generic [ref=e109]: Free Tools
          - generic [ref=e110]:
            - generic [ref=e111]: EN · FR
            - generic [ref=e112]: Bilingual
          - generic [ref=e113]:
            - generic [ref=e114]: "30"
            - generic [ref=e115]: Day Programs
      - generic [ref=e116]: SCROLL
      - generic [ref=e119]: Frame 01 / 12
    - generic [ref=e121]:
      - generic [ref=e122]: The books that built the work
      - generic [ref=e123]:
        - generic [ref=e124]: Atomic Habits
        - generic [ref=e125]: CAN'T HURT ME
        - generic [ref=e126]: Meditations
        - generic [ref=e127]: DEEP WORK
        - generic [ref=e128]: The Daily Stoic
        - generic [ref=e129]: 30 DAYS
    - generic [ref=e130]:
      - generic [aria-hidden]: discipline
      - generic [ref=e132]:
        - paragraph [ref=e133]: A Quiet Manifesto
        - paragraph [ref=e134]: We are not here to be inspired for an afternoon. We are here to be built, slowly, into the kind of person who does the work even when no one is watching.
        - generic [ref=e135]: — Motiva Hub · 2026
    - generic [ref=e141]:
      - generic [ref=e142]:
        - generic [ref=e143]: "227"
        - generic [ref=e144]: Pages Published
        - generic [ref=e145]: Every essay, hand-written. No AI filler.
      - generic [ref=e146]:
        - generic [ref=e147]: 30k+
        - generic [ref=e148]: Words Written
        - generic [ref=e149]: Read once. Re-read often. Returned to.
      - generic [ref=e150]:
        - generic [ref=e151]: "5"
        - generic [ref=e152]: Free Tools
        - generic [ref=e153]: Built for action, not scrolling.
      - generic [ref=e154]:
        - generic [ref=e155]: EN·FR
        - generic [ref=e156]: Bilingual
        - generic [ref=e157]: Two languages, one standard.
    - generic [ref=e160]:
      - img "Youssef Raihane — Founder of Motiva Hub" [ref=e163]
      - generic [ref=e164]:
        - generic [ref=e165]: The Founder
        - heading [level=2] [ref=e166]:
          - text: A long ascent,
          - emphasis [ref=e167]: taken slowly.
        - paragraph [ref=e168]: Motiva Hub is the editorial work of one person, building in public, choosing the slow road on purpose.
        - paragraph [ref=e169]: It began as a private notebook — the kind of writing you do for yourself at 5 AM, when the house is quiet and the work is honest. It became a site. Then a publication. Then a quiet community of readers who would rather be patient and unstoppable than loud and brief.
        - paragraph [ref=e170]: Every essay here is written to be read slowly. Every tool is built for the person who would rather act than scroll. The Daily Drive is a long game. We play it like one.
        - generic [ref=e171]: — Youssef Raihane, Est. 2025
        - link "Read the full bio →" [ref=e176] [cursor=pointer]:
          - /url: /author/youssef-raihane/
    - generic [ref=e178]:
      - generic [ref=e179]:
        - generic [ref=e180]: The Premise
        - generic [ref=e181]:
          - heading [level=2] [ref=e182]:
            - text: Three principles.
            - emphasis [ref=e183]: One quiet work.
          - paragraph [ref=e184]: The editorial backbone of every essay, every tool, every page on this site. Read once. Return often.
      - generic [ref=e185]:
        - article [ref=e186]:
          - generic [ref=e187]: "01"
          - heading "Clarity" [level=3] [ref=e188]
          - paragraph [ref=e189]: Strip away the noise to find the one thing that matters.
        - article [ref=e190]:
          - generic [ref=e191]: "02"
          - heading "Consistency" [level=3] [ref=e192]
          - paragraph [ref=e193]: Small acts, repeated daily, compound into an unrecognisable life.
        - article [ref=e194]:
          - generic [ref=e195]: "03"
          - heading "Composure" [level=3] [ref=e196]
          - paragraph [ref=e197]: The mind that can hold its centre decides the shape of the day.
    - generic [ref=e199]:
      - generic [ref=e200]:
        - generic [ref=e201]: The Journal
        - generic [ref=e202]:
          - heading [level=2] [ref=e203]:
            - text: Essays for the
            - emphasis [ref=e204]: long climb.
          - paragraph [ref=e205]: Mindset, habits, discipline, productivity, deep work — written to be read slowly and returned to.
      - generic [ref=e206]:
        - article [ref=e207]:
          - link [ref=e208] [cursor=pointer]:
            - /url: /journal/sleep-is-unfair-advantage/
            - img "Youssef Raihane - sleep is unfair advantage concept" [ref=e210]
          - generic [ref=e211]:
            - paragraph [ref=e212]:
              - generic [ref=e213]: WELLNESS
              - text: · 9 MIN
            - heading [level=3] [ref=e214]:
              - link "Sleep Is Your Unfair Advantage (What Happened When I Tracked It for 60 Days)" [ref=e215] [cursor=pointer]:
                - /url: /journal/sleep-is-unfair-advantage/
            - paragraph [ref=e216]: Sleep isn't a luxury — it's a performance tool. I tracked every night of sleep for 60 days while testing what actually improves sleep quality. Here's the data, the failures, and the cheapest Amazon tools that helped.
            - paragraph [ref=e217]: September 7, 2026
            - link "Read Article" [ref=e218] [cursor=pointer]:
              - /url: /journal/sleep-is-unfair-advantage/
        - article [ref=e219]:
          - link [ref=e220] [cursor=pointer]:
            - /url: /journal/the-morning-athlete/
            - img "Youssef Raihane - the morning athlete concept" [ref=e222]
          - generic [ref=e223]:
            - paragraph [ref=e224]:
              - generic [ref=e225]: SPORT
              - text: · 10 MIN
            - heading [level=3] [ref=e226]:
              - 'link "The Morning Athlete: Why 5 AM Still Wins (And How to Actually Do It)" [ref=e227] [cursor=pointer]':
                - /url: /journal/the-morning-athlete/
            - paragraph [ref=e228]: I've tested early-morning training for 5 years — as an amateur athlete, a coach, and a regular person trying to fit workouts into a full life. Here's what works, what fails, and why 5 AM still beats every other option.
            - paragraph [ref=e229]: September 6, 2026
            - link "Read Article" [ref=e230] [cursor=pointer]:
              - /url: /journal/the-morning-athlete/
        - article [ref=e231]:
          - link [ref=e232] [cursor=pointer]:
            - /url: /journal/2-minute-rule-system/
            - img "Youssef Raihane writing one sentence at his desk in Casablanca - 2 minute rule doorway" [ref=e234]
          - generic [ref=e235]:
            - paragraph [ref=e236]:
              - generic [ref=e237]: HABITS
              - text: · 18 MIN
            - heading [level=3] [ref=e238]:
              - 'link "The 2-Minute Rule: A Complete System, Not Just a Trick" [ref=e239] [cursor=pointer]':
                - /url: /journal/2-minute-rule-system/
            - paragraph [ref=e240]: James Clear's 2-minute rule is the most misunderstood idea in habit science. It is not a productivity hack. It is a complete system of identity, design, and recovery. Here is the full architecture — including what to do when it stops working.
            - paragraph [ref=e241]: September 5, 2026
            - link "Read Article" [ref=e242] [cursor=pointer]:
              - /url: /journal/2-minute-rule-system/
        - article [ref=e243]:
          - link [ref=e244] [cursor=pointer]:
            - /url: /journal/discipline-vs-punishment/
            - img "Youssef Raihane writing at his desk in Casablanca - discipline vs punishment concept" [ref=e246]
          - generic [ref=e247]:
            - paragraph [ref=e248]:
              - generic [ref=e249]: DISCIPLINE
              - text: · 8 MIN
            - heading [level=3] [ref=e250]:
              - 'link "Discipline vs Punishment: The Difference That Changes Everything" [ref=e251] [cursor=pointer]':
                - /url: /journal/discipline-vs-punishment/
            - paragraph [ref=e252]: Discipline builds the person. Punishment breaks them. The psychological difference — and the moment most people cross from one to the other without realizing. Three tests to tell them apart.
            - paragraph [ref=e253]: September 5, 2026
            - link "Read Article" [ref=e254] [cursor=pointer]:
              - /url: /journal/discipline-vs-punishment/
        - article [ref=e255]:
          - link [ref=e256] [cursor=pointer]:
            - /url: /journal/identity-based-habits-90-day-test/
            - img "Youssef Raihane - identity based habits 90 day test concept" [ref=e258]
          - generic [ref=e259]:
            - paragraph [ref=e260]:
              - generic [ref=e261]: HABITS
              - text: · 9 MIN
            - heading [level=3] [ref=e262]:
              - 'link "Identity-Based Goals: The One Change That Made My Habits Stick" [ref=e263] [cursor=pointer]':
                - /url: /journal/identity-based-habits-90-day-test/
            - paragraph [ref=e264]: Goal-based habits fail because the goal is external. Identity-based habits stick because you become someone. I tried this for 90 days. Here's the difference, the evidence, and how to apply it tonight.
            - paragraph [ref=e265]: September 5, 2026
            - link "Read Article" [ref=e266] [cursor=pointer]:
              - /url: /journal/identity-based-habits-90-day-test/
        - article [ref=e267]:
          - link [ref=e268] [cursor=pointer]:
            - /url: /journal/missed-day-protocol/
            - img "Youssef Raihane - missed day protocol concept" [ref=e270]
          - generic [ref=e271]:
            - paragraph [ref=e272]:
              - generic [ref=e273]: HABITS
              - text: · 7 MIN
            - heading [level=3] [ref=e274]:
              - link "What to Do When You Miss a Day (Without Quitting Everything)" [ref=e275] [cursor=pointer]:
                - /url: /journal/missed-day-protocol/
            - paragraph [ref=e276]: Missing a day is not the end of a habit. It is the test of the system. Here is the exact protocol for the day after a miss — and the three rules that prevent the miss from becoming a relapse.
            - paragraph [ref=e277]: September 5, 2026
            - link "Read Article" [ref=e278] [cursor=pointer]:
              - /url: /journal/missed-day-protocol/
      - link "Read all essays →" [ref=e280] [cursor=pointer]:
        - /url: /journal/
    - generic [ref=e282]:
      - generic [ref=e283]:
        - generic [ref=e284]: Free Tools
        - generic [ref=e285]:
          - heading [level=2] [ref=e286]:
            - text: Not just reading.
            - emphasis [ref=e287]: Doing.
          - paragraph [ref=e288]: Six tools, built for the people who would rather act than scroll. No accounts. No paywall. No noise.
      - generic [ref=e289]:
        - link "01 Discipline Type Quiz Five questions. One archetype. Find the kind of disciplined person you actually are — and what to do about it. Take the quiz →" [ref=e290] [cursor=pointer]:
          - /url: /tools/discipline-quiz/
          - paragraph [ref=e291]: "01"
          - heading "Discipline Type Quiz" [level=3] [ref=e292]
          - paragraph [ref=e293]: Five questions. One archetype. Find the kind of disciplined person you actually are — and what to do about it.
          - generic [ref=e294]: Take the quiz →
        - link "02 Habit Stack Generator James Clear's formula. One anchor. One new habit. One 30-day plan, generated in 60 seconds. Build the stack →" [ref=e295] [cursor=pointer]:
          - /url: /tools/habit-stacker/
          - paragraph [ref=e296]: "02"
          - heading "Habit Stack Generator" [level=3] [ref=e297]
          - paragraph [ref=e298]: James Clear's formula. One anchor. One new habit. One 30-day plan, generated in 60 seconds.
          - generic [ref=e299]: Build the stack →
        - link "03 Meditation Timer Web audio bells. Seven presets. A daily practice you can hear — no app, no account, no friction. Start the bell →" [ref=e300] [cursor=pointer]:
          - /url: /tools/meditation-timer/
          - paragraph [ref=e301]: "03"
          - heading "Meditation Timer" [level=3] [ref=e302]
          - paragraph [ref=e303]: Web audio bells. Seven presets. A daily practice you can hear — no app, no account, no friction.
          - generic [ref=e304]: Start the bell →
        - link "04 Cold Shower Tracker Build the streak. Track every cold shower. Export the data. Watch the daily discomfort compound. Begin the streak →" [ref=e305] [cursor=pointer]:
          - /url: /tools/cold-shower-tracker/
          - paragraph [ref=e306]: "04"
          - heading "Cold Shower Tracker" [level=3] [ref=e307]
          - paragraph [ref=e308]: Build the streak. Track every cold shower. Export the data. Watch the daily discomfort compound.
          - generic [ref=e309]: Begin the streak →
        - link "05 Reading Calculator How many books can you actually read this year? Set the daily page target. Make the math honest. Run the numbers →" [ref=e310] [cursor=pointer]:
          - /url: /tools/reading-calculator/
          - paragraph [ref=e311]: "05"
          - heading "Reading Calculator" [level=3] [ref=e312]
          - paragraph [ref=e313]: How many books can you actually read this year? Set the daily page target. Make the math honest.
          - generic [ref=e314]: Run the numbers →
        - link "06 30 Days of Discipline One page a day, for one month. A free PDF that turns these ideas into a daily practice you can hold. Get the PDF →" [ref=e315] [cursor=pointer]:
          - /url: /pdf/30-days-discipline/
          - paragraph [ref=e316]: "06"
          - heading "30 Days of Discipline" [level=3] [ref=e317]
          - paragraph [ref=e318]: One page a day, for one month. A free PDF that turns these ideas into a daily practice you can hold.
          - generic [ref=e319]: Get the PDF →
    - generic [ref=e322]:
      - generic [aria-hidden] [ref=e323]: "\""
      - paragraph [ref=e324]: Discipline equals freedom.
      - generic [ref=e327]:
        - generic [ref=e328]: Jocko Willink
        - generic [ref=e329]: Discipline Equals Freedom
    - generic [ref=e332]:
      - generic [ref=e333]:
        - generic [ref=e334]: The Wisdom Stack
        - generic [ref=e335]:
          - heading [level=2] [ref=e336]:
            - text: Books that
            - emphasis [ref=e337]: built the work.
          - paragraph [ref=e338]: The texts that shaped Motiva Hub. The texts that will outlast the noise. Read slowly. Re-read often.
      - generic [ref=e339]:
        - article [ref=e340]:
          - generic [ref=e341]:
            - img "Meditations cover" [ref=e342]
            - generic [ref=e343]: STOICISM
          - generic [ref=e344]:
            - heading "Meditations" [level=3] [ref=e345]
            - paragraph [ref=e346]: Marcus Aurelius · c. 180 AD
            - paragraph [ref=e347]: The private notebook of an emperor writing to himself.
            - paragraph [ref=e348]:
              - strong [ref=e349]: "Why we recommend it:"
              - text: The closest thing we have to a manual for the inner life.
            - paragraph [ref=e350]:
              - link "Read the Stoic morning routine test" [ref=e351] [cursor=pointer]:
                - /url: /journal/morning-routines-12-tested/
            - link "View Book" [ref=e352] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0140449337?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e353]:
          - generic [ref=e354]:
            - img "Atomic Habits cover" [ref=e355]
            - generic [ref=e356]: HABITS
          - generic [ref=e357]:
            - heading "Atomic Habits" [level=3] [ref=e358]
            - paragraph [ref=e359]: James Clear · 2018
            - paragraph [ref=e360]: A systems thinker's case for identity-based change.
            - paragraph [ref=e361]:
              - strong [ref=e362]: "Why we recommend it:"
              - text: The clearest modern argument that you do not rise to your goals — you fall to your systems.
            - paragraph [ref=e363]:
              - link "Read the Atomic Habits field report" [ref=e364] [cursor=pointer]:
                - /url: /journal/atomic-habits-review/
            - link "View Book" [ref=e365] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0735211299?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e366]:
          - generic [ref=e367]:
            - img "Deep Work cover" [ref=e368]
            - generic [ref=e369]: FOCUS
          - generic [ref=e370]:
            - heading "Deep Work" [level=3] [ref=e371]
            - paragraph [ref=e372]: Cal Newport · 2016
            - paragraph [ref=e373]: The case for treating concentration as a craft.
            - paragraph [ref=e374]:
              - strong [ref=e375]: "Why we recommend it:"
              - text: Focus without distraction is the superpower of the century.
            - paragraph [ref=e376]:
              - link "Read the Deep Work protocol" [ref=e377] [cursor=pointer]:
                - /url: /journal/deep-work-focus/
            - link "View Book" [ref=e378] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/1455586692?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e379]:
          - generic [ref=e380]:
            - img "The Daily Stoic cover" [ref=e381]
            - generic [ref=e382]: PHILOSOPHY
          - generic [ref=e383]:
            - heading "The Daily Stoic" [level=3] [ref=e384]
            - paragraph [ref=e385]: Ryan Holiday · 2016
            - paragraph [ref=e386]: Three hundred and sixty-six meditations, one for each day.
            - paragraph [ref=e387]:
              - strong [ref=e388]: "Why we recommend it:"
              - text: A practical doorway into a tradition that has guided disciplined minds for two thousand years.
            - link "View Book" [ref=e389] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0735211736?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e390]:
          - generic [ref=e391]:
            - img "Can't Hurt Me cover" [ref=e392]
            - generic [ref=e393]: DISCIPLINE
          - generic [ref=e394]:
            - heading "Can't Hurt Me" [level=3] [ref=e395]
            - paragraph [ref=e396]: David Goggins · 2018
            - paragraph [ref=e397]: An unflinching account of self-mastery forged in suffering.
            - paragraph [ref=e398]:
              - strong [ref=e399]: "Why we recommend it:"
              - text: Not a comfortable read, and not meant to be — it is fuel for the days you want to quit.
            - paragraph [ref=e400]:
              - link "Read the Can't Hurt Me review" [ref=e401] [cursor=pointer]:
                - /url: /journal/cant-hurt-me-review/
            - link "View Book" [ref=e402] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/1544512287?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e403]:
          - generic [ref=e404]:
            - img "Man's Search for Meaning cover" [ref=e405]
            - generic [ref=e406]: PHILOSOPHY
          - generic [ref=e407]:
            - heading "Man's Search for Meaning" [level=3] [ref=e408]
            - paragraph [ref=e409]: Viktor Frankl · 1946
            - paragraph [ref=e410]: A psychiatrist's testament from the camps.
            - paragraph [ref=e411]:
              - strong [ref=e412]: "Why we recommend it:"
              - text: The last of the human freedoms — to choose one's attitude — cannot be taken away.
            - link "View Book" [ref=e413] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/080701429X?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e414]:
          - generic [ref=e415]:
            - img "The Psychology of Money cover" [ref=e416]
            - generic [ref=e417]: MONEY
          - generic [ref=e418]:
            - heading "The Psychology of Money" [level=3] [ref=e419]
            - paragraph [ref=e420]: Morgan Housel · 2020
            - paragraph [ref=e421]: Timeless lessons on wealth, greed, and happiness.
            - paragraph [ref=e422]:
              - strong [ref=e423]: "Why we recommend it:"
              - text: A practical guide to understanding your relationship with money — why money is first a story about behavior, not numbers.
            - link "View Book" [ref=e424] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0857197681?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e425]:
          - generic [ref=e426]:
            - img "The Mountain Is You cover" [ref=e427]
            - generic [ref=e428]: GROWTH
          - generic [ref=e429]:
            - heading "The Mountain Is You" [level=3] [ref=e430]
            - paragraph [ref=e431]: Brianna Wiest · 2020
            - paragraph [ref=e432]: A practical guide to turning self-sabotage into self-mastery.
            - paragraph [ref=e433]:
              - strong [ref=e434]: "Why we recommend it:"
              - text: A popular personal-growth recommendation — how to turn self-sabotage into strength.
            - link "View Book" [ref=e435] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/1949759229?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
      - link "The full bookstand →" [ref=e437] [cursor=pointer]:
        - /url: /books/
    - generic [ref=e439]:
      - generic [ref=e440]:
        - generic [ref=e441]: Listen
        - generic [ref=e442]:
          - heading [level=2] [ref=e443]:
            - text: The Daily Drive ·
            - emphasis [ref=e444]: Podcast
          - paragraph [ref=e445]: Conversations with the people doing the quiet work — founders, athletes, monks, and the writers who shaped how we think.
      - generic [ref=e446]:
        - article [ref=e447]:
          - 'img "Motivation Daily — Shi Heng Yi: Focus on Yourself & Stay Silent cover" [ref=e448]'
          - generic [ref=e449]:
            - paragraph [ref=e450]: Aug 22, 2026 · 17 min
            - 'heading "Motivation Daily — Shi Heng Yi: Focus on Yourself & Stay Silent" [level=3] [ref=e451]'
            - paragraph [ref=e452]: Motiversity — Shaolin wisdom on silence and discipline. A timeless lesson on self-mastery.
            - link "Listen to Podcast" [ref=e453] [cursor=pointer]:
              - /url: https://www.youtube.com/watch?v=teJ_rMsFJn0
        - article [ref=e454]:
          - img "Huberman Lab — How to Increase Motivation cover" [ref=e455]
          - generic [ref=e456]:
            - paragraph [ref=e457]: Aug 20, 2026 · 58 min
            - heading "Huberman Lab — How to Increase Motivation" [level=3] [ref=e458]
            - paragraph [ref=e459]: Andrew Huberman — science of dopamine and drive. Evidence-based strategies for focus and sustained motivation.
            - link "Listen to Podcast" [ref=e460] [cursor=pointer]:
              - /url: https://www.youtube.com/@hubermanlab
        - article [ref=e461]:
          - img "The Diary Of A CEO — David Goggins on Discipline cover" [ref=e462]
          - generic [ref=e463]:
            - paragraph [ref=e464]: Aug 12, 2026 · 72 min
            - heading "The Diary Of A CEO — David Goggins on Discipline" [level=3] [ref=e465]
            - paragraph [ref=e466]: Steven Bartlett x David Goggins — discipline over motivation, no excuses.
            - link "Listen to Podcast" [ref=e467] [cursor=pointer]:
              - /url: https://www.youtube.com/@TheDiaryOfACEO
    - generic [ref=e469]:
      - paragraph [ref=e470]: The Motiva Letter · Newsletter
      - heading "One letter each Sunday. One idea worth a week." [level=2] [ref=e471]
      - paragraph [ref=e472]: Mindset, discipline, and the long ascent — distilled into 500 words. No noise, no algorithms.
      - generic [ref=e473]:
        - textbox "First name" [ref=e474]:
          - /placeholder: First name (optional)
        - textbox "Email address" [ref=e475]:
          - /placeholder: Your email address *
        - button "Subscribe Free" [ref=e476] [cursor=pointer]
      - paragraph
      - paragraph [ref=e477]: 📩 One email per week. Unsubscribe anytime.
  - contentinfo [ref=e478]:
    - generic [ref=e481]:
      - paragraph [ref=e482]: The Daily Drive · Newsletter
      - heading [level=2] [ref=e483]:
        - text: One letter.
        - emphasis [ref=e484]: Every Sunday.
      - paragraph [ref=e485]: The week's essays, one book worth reading, and a small practice to try — delivered to people building the long ascent.
      - generic [ref=e486]:
        - textbox "Email address" [ref=e487]:
          - /placeholder: your@email.com
        - button "Subscribe" [ref=e488] [cursor=pointer]
      - paragraph [ref=e489]: Free · No spam · Unsubscribe anytime
    - generic [ref=e490]:
      - generic [ref=e491]:
        - generic [ref=e492]:
          - link [ref=e493] [cursor=pointer]:
            - /url: /
            - generic [ref=e494]:
              - text: Motiva
              - emphasis [ref=e495]: Hub
            - paragraph [ref=e496]: The Daily Drive. Mindset, habits, books and free tools — for the long ascent, one day at a time.
          - generic [ref=e497]:
            - link [ref=e498] [cursor=pointer]:
              - /url: /
            - link "Instagram" [ref=e499] [cursor=pointer]:
              - /url: https://www.instagram.com/motivahub/
              - text: IG
            - link "Twitter / X" [ref=e500] [cursor=pointer]:
              - /url: https://x.com/themotivahub
              - text: X
            - link "YouTube" [ref=e501] [cursor=pointer]:
              - /url: https://www.youtube.com/@motivahub
              - text: YT
            - link "LinkedIn" [ref=e502] [cursor=pointer]:
              - /url: https://www.linkedin.com/company/motivahub
              - text: in
        - generic [ref=e503]:
          - heading "Read" [level=4] [ref=e504]
          - list [ref=e505]:
            - listitem [ref=e506]:
              - link "The Journal" [ref=e507] [cursor=pointer]:
                - /url: /journal/
            - listitem [ref=e508]:
              - link "Books" [ref=e509] [cursor=pointer]:
                - /url: /books/
            - listitem [ref=e510]:
              - link "Daily Quotes" [ref=e511] [cursor=pointer]:
                - /url: /quotes/
            - listitem [ref=e512]:
              - link "Podcast" [ref=e513] [cursor=pointer]:
                - /url: /podcast/
            - listitem [ref=e514]:
              - link "Topics" [ref=e515] [cursor=pointer]:
                - /url: /topics/
        - generic [ref=e516]:
          - heading "Guides" [level=4] [ref=e517]
          - list [ref=e518]:
            - listitem [ref=e519]:
              - link "Atomic Habits" [ref=e520] [cursor=pointer]:
                - /url: /guides/atomic-habits-ultimate-guide/
            - listitem [ref=e521]:
              - link "Best Books 2026" [ref=e522] [cursor=pointer]:
                - /url: /best/books/
            - listitem [ref=e523]:
              - link "Best Focus Books" [ref=e524] [cursor=pointer]:
                - /url: /best/focus-books/
            - listitem [ref=e525]:
              - link "Best Habit Books" [ref=e526] [cursor=pointer]:
                - /url: /best/habit-books/
            - listitem [ref=e527]:
              - link "Stoicism" [ref=e528] [cursor=pointer]:
                - /url: /best/stoicism-books/
        - generic [ref=e529]:
          - heading "Tools" [level=4] [ref=e530]
          - list [ref=e531]:
            - listitem [ref=e532]:
              - link "Discipline Quiz" [ref=e533] [cursor=pointer]:
                - /url: /tools/discipline-quiz/
            - listitem [ref=e534]:
              - link "Habit Stacker" [ref=e535] [cursor=pointer]:
                - /url: /tools/habit-stacker/
            - listitem [ref=e536]:
              - link "Meditation Timer" [ref=e537] [cursor=pointer]:
                - /url: /tools/meditation-timer/
            - listitem [ref=e538]:
              - link "Cold Shower Tracker" [ref=e539] [cursor=pointer]:
                - /url: /tools/cold-shower-tracker/
            - listitem [ref=e540]:
              - link "Reading Calculator" [ref=e541] [cursor=pointer]:
                - /url: /tools/reading-calculator/
            - listitem [ref=e542]:
              - link "30 Days PDF" [ref=e543] [cursor=pointer]:
                - /url: /pdf/30-days-discipline/
      - generic [ref=e544]:
        - paragraph [ref=e545]: © 2026 Motiva Hub · The Long Ascent
        - generic [ref=e546]:
          - link "About" [ref=e547] [cursor=pointer]:
            - /url: /about/
          - link "Contact" [ref=e548] [cursor=pointer]:
            - /url: /contact/
          - link "Privacy" [ref=e549] [cursor=pointer]:
            - /url: /privacy/
          - link "Terms" [ref=e550] [cursor=pointer]:
            - /url: /terms/
          - link "Disclosure" [ref=e551] [cursor=pointer]:
            - /url: /affiliate-disclosure/
  - generic [ref=e552]:
    - paragraph [ref=e553]:
      - text: We use cookies to improve your experience and for analytics. By continuing, you agree to our
      - link "Privacy Policy" [ref=e554] [cursor=pointer]:
        - /url: /privacy/
      - text: .
    - generic [ref=e555]:
      - button "Accept" [ref=e556] [cursor=pointer]
      - button "Decline" [ref=e557] [cursor=pointer]
```

# Test source

```ts
  6   |   { name: 'guide', url: 'https://the-motivahub.com/guides/atomic-habits-ultimate-guide/' },
  7   | ];
  8   | 
  9   | async function measureVitals(page: any): Promise<any> {
  10  |   return page.evaluate(() => {
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
  93  |             img.addEventListener('load', resolve, { once: true });
  94  |             img.addEventListener('error', resolve, { once: true });
  95  |           });
  96  |         }));
  97  |       });
  98  | 
  99  |       const vitals = await measureVitals(p);
  100 |       console.log(`[baseline] mobile ${page.name}`, JSON.stringify(vitals, null, 2));
  101 |     });
  102 | 
  103 |     test(`desktop baseline capture - ${page.name}`, async ({ page: p }) => {
  104 |       await p.goto(page.url, { waitUntil: 'load' });
  105 |       await p.waitForTimeout(500);
> 106 |       await p.evaluate(async () => {
      |               ^ Error: page.evaluate: Test timeout of 30000ms exceeded.
  107 |         const imgs = Array.from(document.querySelectorAll('img'));
  108 |         await Promise.all(imgs.map(img => {
  109 |           if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
  110 |           return new Promise(resolve => {
  111 |             img.addEventListener('load', resolve, { once: true });
  112 |             img.addEventListener('error', resolve, { once: true });
  113 |           });
  114 |         }));
  115 |       });
  116 | 
  117 |       const vitals = await measureVitals(p);
  118 |       console.log(`[baseline] desktop ${page.name}`, JSON.stringify(vitals, null, 2));
  119 |     });
  120 |   }
  121 | });
  122 | 
```