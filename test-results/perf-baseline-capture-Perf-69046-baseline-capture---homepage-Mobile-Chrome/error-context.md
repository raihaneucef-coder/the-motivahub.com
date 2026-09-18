# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: perf-baseline-capture.spec.ts >> Performance baseline capture >> mobile baseline capture - homepage
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
  - generic [ref=e17]:
    - generic [ref=e18]:
      - link [ref=e19] [cursor=pointer]:
        - /url: /
        - generic [ref=e20]:
          - text: Motiva
          - emphasis [ref=e21]: Hub
      - button "Close menu" [ref=e22] [cursor=pointer]:
        - generic [ref=e23]: Close
    - navigation "Fullscreen menu" [ref=e27]:
      - generic [ref=e28]:
        - paragraph [ref=e29]: Read
        - link "01 The Journal" [ref=e30] [cursor=pointer]:
          - /url: /journal/
          - text: "01"
          - generic [ref=e31]: The Journal
        - link "02 Daily Quotes" [ref=e32] [cursor=pointer]:
          - /url: /quotes/
          - text: "02"
          - generic [ref=e33]: Daily Quotes
        - link "03 Topics" [ref=e34] [cursor=pointer]:
          - /url: /topics/
          - text: "03"
          - generic [ref=e35]: Topics
        - link "04 The Bookstand" [ref=e36] [cursor=pointer]:
          - /url: /books/
          - text: "04"
          - generic [ref=e37]: The Bookstand
      - generic [ref=e38]:
        - paragraph [ref=e39]: Guides
        - link "05 Atomic Habits" [ref=e40] [cursor=pointer]:
          - /url: /guides/atomic-habits-ultimate-guide/
          - text: "05"
          - generic [ref=e41]: Atomic Habits
        - link "06 Best Books 2026" [ref=e42] [cursor=pointer]:
          - /url: /best/books/
          - text: "06"
          - generic [ref=e43]: Best Books 2026
        - link "07 Best Focus Books" [ref=e44] [cursor=pointer]:
          - /url: /best/focus-books/
          - text: "07"
          - generic [ref=e45]: Best Focus Books
        - link "08 Best Habit Books" [ref=e46] [cursor=pointer]:
          - /url: /best/habit-books/
          - text: "08"
          - generic [ref=e47]: Best Habit Books
        - link "09 Best Stoicism Books" [ref=e48] [cursor=pointer]:
          - /url: /best/stoicism-books/
          - text: "09"
          - generic [ref=e49]: Best Stoicism Books
      - generic [ref=e50]:
        - paragraph [ref=e51]: Tools
        - link "10 Discipline Quiz" [ref=e52] [cursor=pointer]:
          - /url: /tools/discipline-quiz/
          - text: "10"
          - generic [ref=e53]: Discipline Quiz
        - link "11 Habit Stacker" [ref=e54] [cursor=pointer]:
          - /url: /tools/habit-stacker/
          - text: "11"
          - generic [ref=e55]: Habit Stacker
        - link "12 Meditation Timer" [ref=e56] [cursor=pointer]:
          - /url: /tools/meditation-timer/
          - text: "12"
          - generic [ref=e57]: Meditation Timer
        - link "13 Cold Shower Tracker" [ref=e58] [cursor=pointer]:
          - /url: /tools/cold-shower-tracker/
          - text: "13"
          - generic [ref=e59]: Cold Shower Tracker
        - link "14 Reading Calculator" [ref=e60] [cursor=pointer]:
          - /url: /tools/reading-calculator/
          - text: "14"
          - generic [ref=e61]: Reading Calculator
      - generic [ref=e62]:
        - paragraph [ref=e63]: Brand
        - link "15 The Author" [ref=e64] [cursor=pointer]:
          - /url: /author/youssef-raihane/
          - text: "15"
          - generic [ref=e65]: The Author
        - link "16 About" [ref=e66] [cursor=pointer]:
          - /url: /about/
          - text: "16"
          - generic [ref=e67]: About
        - link "17 30 Days of Discipline" [ref=e68] [cursor=pointer]:
          - /url: /pdf/30-days-discipline/
          - text: "17"
          - generic [ref=e69]: 30 Days of Discipline
        - link "18 Contact" [ref=e70] [cursor=pointer]:
          - /url: /contact/
          - text: "18"
          - generic [ref=e71]: Contact
    - generic [ref=e72]:
      - paragraph [ref=e73]: The Daily Drive. Mindset, habits, books and free tools — for the long ascent, one day at a time.
      - button "Subscribe" [ref=e74] [cursor=pointer]
  - main [ref=e75]:
    - generic [ref=e78]:
      - generic [ref=e79]: EST. 2025 · THE LONG ASCENT
      - heading [level=1] [ref=e81]:
        - text: Build the discipline.
        - emphasis [ref=e82]: One day at a time.
      - paragraph [ref=e83]: Mindset, habits, books, and free tools — for the person who would rather be patient and unstoppable than loud and brief.
      - generic [ref=e84]:
        - link "Start Reading →" [ref=e85] [cursor=pointer]:
          - /url: /journal/
          - generic [ref=e86]: Start Reading
          - generic [ref=e87]: →
        - link "Take the Quiz →" [ref=e88] [cursor=pointer]:
          - /url: /tools/discipline-quiz/
          - generic [ref=e89]: Take the Quiz
          - generic [ref=e90]: →
      - generic [ref=e91]:
        - generic [ref=e92]:
          - generic [ref=e93]: "169"
          - generic [ref=e94]: Editorial Pages
        - generic [ref=e95]:
          - generic [ref=e96]: "5"
          - generic [ref=e97]: Free Tools
        - generic [ref=e98]:
          - generic [ref=e99]: EN · FR
          - generic [ref=e100]: Bilingual
        - generic [ref=e101]:
          - generic [ref=e102]: "30"
          - generic [ref=e103]: Day Programs
    - generic [ref=e105]:
      - generic [ref=e106]: The books that built the work
      - generic [ref=e107]:
        - generic [ref=e108]: Atomic Habits
        - generic [ref=e109]: CAN'T HURT ME
        - generic [ref=e110]: Meditations
        - generic [ref=e111]: DEEP WORK
        - generic [ref=e112]: The Daily Stoic
        - generic [ref=e113]: 30 DAYS
    - generic [ref=e114]:
      - generic [aria-hidden]: discipline
      - generic [ref=e116]:
        - paragraph [ref=e117]: A Quiet Manifesto
        - paragraph [ref=e118]: We are not here to be inspired for an afternoon. We are here to be built, slowly, into the kind of person who does the work even when no one is watching.
        - generic [ref=e119]: — Motiva Hub · 2026
    - generic [ref=e125]:
      - generic [ref=e126]:
        - generic [ref=e127]: "227"
        - generic [ref=e128]: Pages Published
        - generic [ref=e129]: Every essay, hand-written. No AI filler.
      - generic [ref=e130]:
        - generic [ref=e131]: 30k+
        - generic [ref=e132]: Words Written
        - generic [ref=e133]: Read once. Re-read often. Returned to.
      - generic [ref=e134]:
        - generic [ref=e135]: "5"
        - generic [ref=e136]: Free Tools
        - generic [ref=e137]: Built for action, not scrolling.
      - generic [ref=e138]:
        - generic [ref=e139]: EN·FR
        - generic [ref=e140]: Bilingual
        - generic [ref=e141]: Two languages, one standard.
    - generic [ref=e144]:
      - img "Youssef Raihane — Founder of Motiva Hub" [ref=e147]
      - generic [ref=e148]:
        - generic [ref=e149]: The Founder
        - heading [level=2] [ref=e150]:
          - text: A long ascent,
          - emphasis [ref=e151]: taken slowly.
        - paragraph [ref=e152]: Motiva Hub is the editorial work of one person, building in public, choosing the slow road on purpose.
        - paragraph [ref=e153]: It began as a private notebook — the kind of writing you do for yourself at 5 AM, when the house is quiet and the work is honest. It became a site. Then a publication. Then a quiet community of readers who would rather be patient and unstoppable than loud and brief.
        - paragraph [ref=e154]: Every essay here is written to be read slowly. Every tool is built for the person who would rather act than scroll. The Daily Drive is a long game. We play it like one.
        - generic [ref=e155]: — Youssef Raihane, Est. 2025
        - link "Read the full bio →" [ref=e160] [cursor=pointer]:
          - /url: /author/youssef-raihane/
    - generic [ref=e162]:
      - generic [ref=e163]:
        - generic [ref=e164]: The Premise
        - generic [ref=e165]:
          - heading [level=2] [ref=e166]:
            - text: Three principles.
            - emphasis [ref=e167]: One quiet work.
          - paragraph [ref=e168]: The editorial backbone of every essay, every tool, every page on this site. Read once. Return often.
      - generic [ref=e169]:
        - article [ref=e170]:
          - generic [ref=e171]: "01"
          - heading "Clarity" [level=3] [ref=e172]
          - paragraph [ref=e173]: Strip away the noise to find the one thing that matters.
        - article [ref=e174]:
          - generic [ref=e175]: "02"
          - heading "Consistency" [level=3] [ref=e176]
          - paragraph [ref=e177]: Small acts, repeated daily, compound into an unrecognisable life.
        - article [ref=e178]:
          - generic [ref=e179]: "03"
          - heading "Composure" [level=3] [ref=e180]
          - paragraph [ref=e181]: The mind that can hold its centre decides the shape of the day.
    - generic [ref=e183]:
      - generic [ref=e184]:
        - generic [ref=e185]: The Journal
        - generic [ref=e186]:
          - heading [level=2] [ref=e187]:
            - text: Essays for the
            - emphasis [ref=e188]: long climb.
          - paragraph [ref=e189]: Mindset, habits, discipline, productivity, deep work — written to be read slowly and returned to.
      - generic [ref=e190]:
        - article [ref=e191]:
          - link [ref=e192] [cursor=pointer]:
            - /url: /journal/sleep-is-unfair-advantage/
            - img "Youssef Raihane - sleep is unfair advantage concept" [ref=e194]
          - generic [ref=e195]:
            - paragraph [ref=e196]:
              - generic [ref=e197]: WELLNESS
              - text: · 9 MIN
            - heading [level=3] [ref=e198]:
              - link "Sleep Is Your Unfair Advantage (What Happened When I Tracked It for 60 Days)" [ref=e199] [cursor=pointer]:
                - /url: /journal/sleep-is-unfair-advantage/
            - paragraph [ref=e200]: Sleep isn't a luxury — it's a performance tool. I tracked every night of sleep for 60 days while testing what actually improves sleep quality. Here's the data, the failures, and the cheapest Amazon tools that helped.
            - paragraph [ref=e201]: September 7, 2026
            - link "Read Article" [ref=e202] [cursor=pointer]:
              - /url: /journal/sleep-is-unfair-advantage/
        - article [ref=e203]:
          - link [ref=e204] [cursor=pointer]:
            - /url: /journal/the-morning-athlete/
            - img "Youssef Raihane - the morning athlete concept" [ref=e206]
          - generic [ref=e207]:
            - paragraph [ref=e208]:
              - generic [ref=e209]: SPORT
              - text: · 10 MIN
            - heading [level=3] [ref=e210]:
              - 'link "The Morning Athlete: Why 5 AM Still Wins (And How to Actually Do It)" [ref=e211] [cursor=pointer]':
                - /url: /journal/the-morning-athlete/
            - paragraph [ref=e212]: I've tested early-morning training for 5 years — as an amateur athlete, a coach, and a regular person trying to fit workouts into a full life. Here's what works, what fails, and why 5 AM still beats every other option.
            - paragraph [ref=e213]: September 6, 2026
            - link "Read Article" [ref=e214] [cursor=pointer]:
              - /url: /journal/the-morning-athlete/
        - article [ref=e215]:
          - link [ref=e216] [cursor=pointer]:
            - /url: /journal/2-minute-rule-system/
            - img "Youssef Raihane writing one sentence at his desk in Casablanca - 2 minute rule doorway" [ref=e218]
          - generic [ref=e219]:
            - paragraph [ref=e220]:
              - generic [ref=e221]: HABITS
              - text: · 18 MIN
            - heading [level=3] [ref=e222]:
              - 'link "The 2-Minute Rule: A Complete System, Not Just a Trick" [ref=e223] [cursor=pointer]':
                - /url: /journal/2-minute-rule-system/
            - paragraph [ref=e224]: James Clear's 2-minute rule is the most misunderstood idea in habit science. It is not a productivity hack. It is a complete system of identity, design, and recovery. Here is the full architecture — including what to do when it stops working.
            - paragraph [ref=e225]: September 5, 2026
            - link "Read Article" [ref=e226] [cursor=pointer]:
              - /url: /journal/2-minute-rule-system/
        - article [ref=e227]:
          - link [ref=e228] [cursor=pointer]:
            - /url: /journal/discipline-vs-punishment/
            - img "Youssef Raihane writing at his desk in Casablanca - discipline vs punishment concept" [ref=e230]
          - generic [ref=e231]:
            - paragraph [ref=e232]:
              - generic [ref=e233]: DISCIPLINE
              - text: · 8 MIN
            - heading [level=3] [ref=e234]:
              - 'link "Discipline vs Punishment: The Difference That Changes Everything" [ref=e235] [cursor=pointer]':
                - /url: /journal/discipline-vs-punishment/
            - paragraph [ref=e236]: Discipline builds the person. Punishment breaks them. The psychological difference — and the moment most people cross from one to the other without realizing. Three tests to tell them apart.
            - paragraph [ref=e237]: September 5, 2026
            - link "Read Article" [ref=e238] [cursor=pointer]:
              - /url: /journal/discipline-vs-punishment/
        - article [ref=e239]:
          - link [ref=e240] [cursor=pointer]:
            - /url: /journal/identity-based-habits-90-day-test/
            - img "Youssef Raihane - identity based habits 90 day test concept" [ref=e242]
          - generic [ref=e243]:
            - paragraph [ref=e244]:
              - generic [ref=e245]: HABITS
              - text: · 9 MIN
            - heading [level=3] [ref=e246]:
              - 'link "Identity-Based Goals: The One Change That Made My Habits Stick" [ref=e247] [cursor=pointer]':
                - /url: /journal/identity-based-habits-90-day-test/
            - paragraph [ref=e248]: Goal-based habits fail because the goal is external. Identity-based habits stick because you become someone. I tried this for 90 days. Here's the difference, the evidence, and how to apply it tonight.
            - paragraph [ref=e249]: September 5, 2026
            - link "Read Article" [ref=e250] [cursor=pointer]:
              - /url: /journal/identity-based-habits-90-day-test/
        - article [ref=e251]:
          - link [ref=e252] [cursor=pointer]:
            - /url: /journal/missed-day-protocol/
            - img "Youssef Raihane - missed day protocol concept" [ref=e254]
          - generic [ref=e255]:
            - paragraph [ref=e256]:
              - generic [ref=e257]: HABITS
              - text: · 7 MIN
            - heading [level=3] [ref=e258]:
              - link "What to Do When You Miss a Day (Without Quitting Everything)" [ref=e259] [cursor=pointer]:
                - /url: /journal/missed-day-protocol/
            - paragraph [ref=e260]: Missing a day is not the end of a habit. It is the test of the system. Here is the exact protocol for the day after a miss — and the three rules that prevent the miss from becoming a relapse.
            - paragraph [ref=e261]: September 5, 2026
            - link "Read Article" [ref=e262] [cursor=pointer]:
              - /url: /journal/missed-day-protocol/
      - link "Read all essays →" [ref=e264] [cursor=pointer]:
        - /url: /journal/
    - generic [ref=e266]:
      - generic [ref=e267]:
        - generic [ref=e268]: Free Tools
        - generic [ref=e269]:
          - heading [level=2] [ref=e270]:
            - text: Not just reading.
            - emphasis [ref=e271]: Doing.
          - paragraph [ref=e272]: Six tools, built for the people who would rather act than scroll. No accounts. No paywall. No noise.
      - generic [ref=e273]:
        - link "01 Discipline Type Quiz Five questions. One archetype. Find the kind of disciplined person you actually are — and what to do about it. Take the quiz →" [ref=e274] [cursor=pointer]:
          - /url: /tools/discipline-quiz/
          - paragraph [ref=e275]: "01"
          - heading "Discipline Type Quiz" [level=3] [ref=e276]
          - paragraph [ref=e277]: Five questions. One archetype. Find the kind of disciplined person you actually are — and what to do about it.
          - generic [ref=e278]: Take the quiz →
        - link "02 Habit Stack Generator James Clear's formula. One anchor. One new habit. One 30-day plan, generated in 60 seconds. Build the stack →" [ref=e279] [cursor=pointer]:
          - /url: /tools/habit-stacker/
          - paragraph [ref=e280]: "02"
          - heading "Habit Stack Generator" [level=3] [ref=e281]
          - paragraph [ref=e282]: James Clear's formula. One anchor. One new habit. One 30-day plan, generated in 60 seconds.
          - generic [ref=e283]: Build the stack →
        - link "03 Meditation Timer Web audio bells. Seven presets. A daily practice you can hear — no app, no account, no friction. Start the bell →" [ref=e284] [cursor=pointer]:
          - /url: /tools/meditation-timer/
          - paragraph [ref=e285]: "03"
          - heading "Meditation Timer" [level=3] [ref=e286]
          - paragraph [ref=e287]: Web audio bells. Seven presets. A daily practice you can hear — no app, no account, no friction.
          - generic [ref=e288]: Start the bell →
        - link "04 Cold Shower Tracker Build the streak. Track every cold shower. Export the data. Watch the daily discomfort compound. Begin the streak →" [ref=e289] [cursor=pointer]:
          - /url: /tools/cold-shower-tracker/
          - paragraph [ref=e290]: "04"
          - heading "Cold Shower Tracker" [level=3] [ref=e291]
          - paragraph [ref=e292]: Build the streak. Track every cold shower. Export the data. Watch the daily discomfort compound.
          - generic [ref=e293]: Begin the streak →
        - link "05 Reading Calculator How many books can you actually read this year? Set the daily page target. Make the math honest. Run the numbers →" [ref=e294] [cursor=pointer]:
          - /url: /tools/reading-calculator/
          - paragraph [ref=e295]: "05"
          - heading "Reading Calculator" [level=3] [ref=e296]
          - paragraph [ref=e297]: How many books can you actually read this year? Set the daily page target. Make the math honest.
          - generic [ref=e298]: Run the numbers →
        - link "06 30 Days of Discipline One page a day, for one month. A free PDF that turns these ideas into a daily practice you can hold. Get the PDF →" [ref=e299] [cursor=pointer]:
          - /url: /pdf/30-days-discipline/
          - paragraph [ref=e300]: "06"
          - heading "30 Days of Discipline" [level=3] [ref=e301]
          - paragraph [ref=e302]: One page a day, for one month. A free PDF that turns these ideas into a daily practice you can hold.
          - generic [ref=e303]: Get the PDF →
    - generic [ref=e306]:
      - generic [aria-hidden] [ref=e307]: "\""
      - paragraph [ref=e308]: Discipline equals freedom.
      - generic [ref=e311]:
        - generic [ref=e312]: Jocko Willink
        - generic [ref=e313]: Discipline Equals Freedom
    - generic [ref=e316]:
      - generic [ref=e317]:
        - generic [ref=e318]: The Wisdom Stack
        - generic [ref=e319]:
          - heading [level=2] [ref=e320]:
            - text: Books that
            - emphasis [ref=e321]: built the work.
          - paragraph [ref=e322]: The texts that shaped Motiva Hub. The texts that will outlast the noise. Read slowly. Re-read often.
      - generic [ref=e323]:
        - article [ref=e324]:
          - generic [ref=e325]:
            - img "Meditations cover" [ref=e326]
            - generic [ref=e327]: STOICISM
          - generic [ref=e328]:
            - heading "Meditations" [level=3] [ref=e329]
            - paragraph [ref=e330]: Marcus Aurelius · c. 180 AD
            - paragraph [ref=e331]: The private notebook of an emperor writing to himself.
            - paragraph [ref=e332]:
              - strong [ref=e333]: "Why we recommend it:"
              - text: The closest thing we have to a manual for the inner life.
            - paragraph [ref=e334]:
              - link "Read the Stoic morning routine test" [ref=e335] [cursor=pointer]:
                - /url: /journal/morning-routines-12-tested/
            - link "View Book" [ref=e336] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0140449337?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e337]:
          - generic [ref=e338]:
            - img "Atomic Habits cover" [ref=e339]
            - generic [ref=e340]: HABITS
          - generic [ref=e341]:
            - heading "Atomic Habits" [level=3] [ref=e342]
            - paragraph [ref=e343]: James Clear · 2018
            - paragraph [ref=e344]: A systems thinker's case for identity-based change.
            - paragraph [ref=e345]:
              - strong [ref=e346]: "Why we recommend it:"
              - text: The clearest modern argument that you do not rise to your goals — you fall to your systems.
            - paragraph [ref=e347]:
              - link "Read the Atomic Habits field report" [ref=e348] [cursor=pointer]:
                - /url: /journal/atomic-habits-review/
            - link "View Book" [ref=e349] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0735211299?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e350]:
          - generic [ref=e351]:
            - img "Deep Work cover" [ref=e352]
            - generic [ref=e353]: FOCUS
          - generic [ref=e354]:
            - heading "Deep Work" [level=3] [ref=e355]
            - paragraph [ref=e356]: Cal Newport · 2016
            - paragraph [ref=e357]: The case for treating concentration as a craft.
            - paragraph [ref=e358]:
              - strong [ref=e359]: "Why we recommend it:"
              - text: Focus without distraction is the superpower of the century.
            - paragraph [ref=e360]:
              - link "Read the Deep Work protocol" [ref=e361] [cursor=pointer]:
                - /url: /journal/deep-work-focus/
            - link "View Book" [ref=e362] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/1455586692?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e363]:
          - generic [ref=e364]:
            - img "The Daily Stoic cover" [ref=e365]
            - generic [ref=e366]: PHILOSOPHY
          - generic [ref=e367]:
            - heading "The Daily Stoic" [level=3] [ref=e368]
            - paragraph [ref=e369]: Ryan Holiday · 2016
            - paragraph [ref=e370]: Three hundred and sixty-six meditations, one for each day.
            - paragraph [ref=e371]:
              - strong [ref=e372]: "Why we recommend it:"
              - text: A practical doorway into a tradition that has guided disciplined minds for two thousand years.
            - link "View Book" [ref=e373] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0735211736?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e374]:
          - generic [ref=e375]:
            - img "Can't Hurt Me cover" [ref=e376]
            - generic [ref=e377]: DISCIPLINE
          - generic [ref=e378]:
            - heading "Can't Hurt Me" [level=3] [ref=e379]
            - paragraph [ref=e380]: David Goggins · 2018
            - paragraph [ref=e381]: An unflinching account of self-mastery forged in suffering.
            - paragraph [ref=e382]:
              - strong [ref=e383]: "Why we recommend it:"
              - text: Not a comfortable read, and not meant to be — it is fuel for the days you want to quit.
            - paragraph [ref=e384]:
              - link "Read the Can't Hurt Me review" [ref=e385] [cursor=pointer]:
                - /url: /journal/cant-hurt-me-review/
            - link "View Book" [ref=e386] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/1544512287?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e387]:
          - generic [ref=e388]:
            - img "Man's Search for Meaning cover" [ref=e389]
            - generic [ref=e390]: PHILOSOPHY
          - generic [ref=e391]:
            - heading "Man's Search for Meaning" [level=3] [ref=e392]
            - paragraph [ref=e393]: Viktor Frankl · 1946
            - paragraph [ref=e394]: A psychiatrist's testament from the camps.
            - paragraph [ref=e395]:
              - strong [ref=e396]: "Why we recommend it:"
              - text: The last of the human freedoms — to choose one's attitude — cannot be taken away.
            - link "View Book" [ref=e397] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/080701429X?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e398]:
          - generic [ref=e399]:
            - img "The Psychology of Money cover" [ref=e400]
            - generic [ref=e401]: MONEY
          - generic [ref=e402]:
            - heading "The Psychology of Money" [level=3] [ref=e403]
            - paragraph [ref=e404]: Morgan Housel · 2020
            - paragraph [ref=e405]: Timeless lessons on wealth, greed, and happiness.
            - paragraph [ref=e406]:
              - strong [ref=e407]: "Why we recommend it:"
              - text: A practical guide to understanding your relationship with money — why money is first a story about behavior, not numbers.
            - link "View Book" [ref=e408] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/0857197681?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
        - article [ref=e409]:
          - generic [ref=e410]:
            - img "The Mountain Is You cover" [ref=e411]
            - generic [ref=e412]: GROWTH
          - generic [ref=e413]:
            - heading "The Mountain Is You" [level=3] [ref=e414]
            - paragraph [ref=e415]: Brianna Wiest · 2020
            - paragraph [ref=e416]: A practical guide to turning self-sabotage into self-mastery.
            - paragraph [ref=e417]:
              - strong [ref=e418]: "Why we recommend it:"
              - text: A popular personal-growth recommendation — how to turn self-sabotage into strength.
            - link "View Book" [ref=e419] [cursor=pointer]:
              - /url: https://www.amazon.fr/dp/1949759229?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books
      - link "The full bookstand →" [ref=e421] [cursor=pointer]:
        - /url: /books/
    - generic [ref=e423]:
      - generic [ref=e424]:
        - generic [ref=e425]: Listen
        - generic [ref=e426]:
          - heading [level=2] [ref=e427]:
            - text: The Daily Drive ·
            - emphasis [ref=e428]: Podcast
          - paragraph [ref=e429]: Conversations with the people doing the quiet work — founders, athletes, monks, and the writers who shaped how we think.
      - generic [ref=e430]:
        - article [ref=e431]:
          - 'img "Motivation Daily — Shi Heng Yi: Focus on Yourself & Stay Silent cover" [ref=e432]'
          - generic [ref=e433]:
            - paragraph [ref=e434]: Aug 22, 2026 · 17 min
            - 'heading "Motivation Daily — Shi Heng Yi: Focus on Yourself & Stay Silent" [level=3] [ref=e435]'
            - paragraph [ref=e436]: Motiversity — Shaolin wisdom on silence and discipline. A timeless lesson on self-mastery.
            - link "Listen to Podcast" [ref=e437] [cursor=pointer]:
              - /url: https://www.youtube.com/watch?v=teJ_rMsFJn0
        - article [ref=e438]:
          - img "Huberman Lab — How to Increase Motivation cover" [ref=e439]
          - generic [ref=e440]:
            - paragraph [ref=e441]: Aug 20, 2026 · 58 min
            - heading "Huberman Lab — How to Increase Motivation" [level=3] [ref=e442]
            - paragraph [ref=e443]: Andrew Huberman — science of dopamine and drive. Evidence-based strategies for focus and sustained motivation.
            - link "Listen to Podcast" [ref=e444] [cursor=pointer]:
              - /url: https://www.youtube.com/@hubermanlab
        - article [ref=e445]:
          - img "The Diary Of A CEO — David Goggins on Discipline cover" [ref=e446]
          - generic [ref=e447]:
            - paragraph [ref=e448]: Aug 12, 2026 · 72 min
            - heading "The Diary Of A CEO — David Goggins on Discipline" [level=3] [ref=e449]
            - paragraph [ref=e450]: Steven Bartlett x David Goggins — discipline over motivation, no excuses.
            - link "Listen to Podcast" [ref=e451] [cursor=pointer]:
              - /url: https://www.youtube.com/@TheDiaryOfACEO
    - generic [ref=e453]:
      - paragraph [ref=e454]: The Motiva Letter · Newsletter
      - heading "One letter each Sunday. One idea worth a week." [level=2] [ref=e455]
      - paragraph [ref=e456]: Mindset, discipline, and the long ascent — distilled into 500 words. No noise, no algorithms.
      - generic [ref=e457]:
        - textbox "First name" [ref=e458]:
          - /placeholder: First name (optional)
        - textbox "Email address" [ref=e459]:
          - /placeholder: Your email address *
        - button "Subscribe Free" [ref=e460] [cursor=pointer]
      - paragraph
      - paragraph [ref=e461]: 📩 One email per week. Unsubscribe anytime.
  - contentinfo [ref=e462]:
    - generic [ref=e465]:
      - paragraph [ref=e466]: The Daily Drive · Newsletter
      - heading [level=2] [ref=e467]:
        - text: One letter.
        - emphasis [ref=e468]: Every Sunday.
      - paragraph [ref=e469]: The week's essays, one book worth reading, and a small practice to try — delivered to people building the long ascent.
      - generic [ref=e470]:
        - textbox "Email address" [ref=e471]:
          - /placeholder: your@email.com
        - button "Subscribe" [ref=e472] [cursor=pointer]
      - paragraph [ref=e473]: Free · No spam · Unsubscribe anytime
    - generic [ref=e474]:
      - generic [ref=e475]:
        - generic [ref=e476]:
          - link [ref=e477] [cursor=pointer]:
            - /url: /
            - generic [ref=e478]:
              - text: Motiva
              - emphasis [ref=e479]: Hub
            - paragraph [ref=e480]: The Daily Drive. Mindset, habits, books and free tools — for the long ascent, one day at a time.
          - generic [ref=e481]:
            - link [ref=e482] [cursor=pointer]:
              - /url: /
            - link "Instagram" [ref=e483] [cursor=pointer]:
              - /url: https://www.instagram.com/motivahub/
              - text: IG
            - link "Twitter / X" [ref=e484] [cursor=pointer]:
              - /url: https://x.com/themotivahub
              - text: X
            - link "YouTube" [ref=e485] [cursor=pointer]:
              - /url: https://www.youtube.com/@motivahub
              - text: YT
            - link "LinkedIn" [ref=e486] [cursor=pointer]:
              - /url: https://www.linkedin.com/company/motivahub
              - text: in
        - generic [ref=e487]:
          - heading "Read" [level=4] [ref=e488]
          - list [ref=e489]:
            - listitem [ref=e490]:
              - link "The Journal" [ref=e491] [cursor=pointer]:
                - /url: /journal/
            - listitem [ref=e492]:
              - link "Books" [ref=e493] [cursor=pointer]:
                - /url: /books/
            - listitem [ref=e494]:
              - link "Daily Quotes" [ref=e495] [cursor=pointer]:
                - /url: /quotes/
            - listitem [ref=e496]:
              - link "Podcast" [ref=e497] [cursor=pointer]:
                - /url: /podcast/
            - listitem [ref=e498]:
              - link "Topics" [ref=e499] [cursor=pointer]:
                - /url: /topics/
        - generic [ref=e500]:
          - heading "Guides" [level=4] [ref=e501]
          - list [ref=e502]:
            - listitem [ref=e503]:
              - link "Atomic Habits" [ref=e504] [cursor=pointer]:
                - /url: /guides/atomic-habits-ultimate-guide/
            - listitem [ref=e505]:
              - link "Best Books 2026" [ref=e506] [cursor=pointer]:
                - /url: /best/books/
            - listitem [ref=e507]:
              - link "Best Focus Books" [ref=e508] [cursor=pointer]:
                - /url: /best/focus-books/
            - listitem [ref=e509]:
              - link "Best Habit Books" [ref=e510] [cursor=pointer]:
                - /url: /best/habit-books/
            - listitem [ref=e511]:
              - link "Stoicism" [ref=e512] [cursor=pointer]:
                - /url: /best/stoicism-books/
        - generic [ref=e513]:
          - heading "Tools" [level=4] [ref=e514]
          - list [ref=e515]:
            - listitem [ref=e516]:
              - link "Discipline Quiz" [ref=e517] [cursor=pointer]:
                - /url: /tools/discipline-quiz/
            - listitem [ref=e518]:
              - link "Habit Stacker" [ref=e519] [cursor=pointer]:
                - /url: /tools/habit-stacker/
            - listitem [ref=e520]:
              - link "Meditation Timer" [ref=e521] [cursor=pointer]:
                - /url: /tools/meditation-timer/
            - listitem [ref=e522]:
              - link "Cold Shower Tracker" [ref=e523] [cursor=pointer]:
                - /url: /tools/cold-shower-tracker/
            - listitem [ref=e524]:
              - link "Reading Calculator" [ref=e525] [cursor=pointer]:
                - /url: /tools/reading-calculator/
            - listitem [ref=e526]:
              - link "30 Days PDF" [ref=e527] [cursor=pointer]:
                - /url: /pdf/30-days-discipline/
      - generic [ref=e528]:
        - paragraph [ref=e529]: © 2026 Motiva Hub · The Long Ascent
        - generic [ref=e530]:
          - link "About" [ref=e531] [cursor=pointer]:
            - /url: /about/
          - link "Contact" [ref=e532] [cursor=pointer]:
            - /url: /contact/
          - link "Privacy" [ref=e533] [cursor=pointer]:
            - /url: /privacy/
          - link "Terms" [ref=e534] [cursor=pointer]:
            - /url: /terms/
          - link "Disclosure" [ref=e535] [cursor=pointer]:
            - /url: /affiliate-disclosure/
  - generic [ref=e536]:
    - paragraph [ref=e537]:
      - text: We use cookies to improve your experience and for analytics. By continuing, you agree to our
      - link "Privacy Policy" [ref=e538] [cursor=pointer]:
        - /url: /privacy/
      - text: .
    - generic [ref=e539]:
      - button "Accept" [ref=e540] [cursor=pointer]
      - button "Decline" [ref=e541] [cursor=pointer]
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
> 88  |       await p.evaluate(async () => {
      |               ^ Error: page.evaluate: Test timeout of 30000ms exceeded.
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
  106 |       await p.evaluate(async () => {
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