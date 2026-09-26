// Pillar hubs — the editorial layer above topic archives.
// A topic page renders as a Hub only if it appears here; every other
// topic keeps its current archive layout untouched.

export interface PillarSection {
  labelKey: string;
  labelDefault: string;
  blurbKey: string;
  blurbDefault: string;
  articles: string[];
  articlesFr: string[];
}

export interface PillarTool {
  href: string;
  labelKey: string;
  labelDefault: string;
}

export interface PillarBook {
  id: string;
  review: string;
  reviewFr: string;
}

export interface PillarFeatured {
  href: string;
  hrefFr: string;
  solvesKey?: string;
  solvesDefault: string;
  forKey?: string;
  forDefault: string;
  nextKey?: string;
  nextHref?: string;
  nextLabelDefault: string;
  kickerKey: string;
  kickerDefault: string;
  titleKey: string;
  titleDefault: string;
  descKey: string;
  descDefault: string;
  ctaKey: string;
  ctaDefault: string;
}

export interface Pillar {
  id: string;
  brandingKey: string;
  brandingDefault: string;
  questionKey: string;
  questionDefault: string;
  ledeKey: string;
  ledeDefault: string;
  sections: PillarSection[];
  tools: PillarTool[];
  featured: PillarFeatured;
  books: PillarBook[];
}

export const pillars: Record<string, Pillar> = {
  habits: {
    id: "habits",
    brandingKey: "hubHabitsBranding",
    brandingDefault: "Pillar 01 · Behavioral Engineering",
    ledeKey: "hubHabitsLede",
    ledeDefault:
      "You don't change by willpower. You change by design — identity first, environment second, recovery third.",
    questionKey: "hubHabitsQuestion",
    questionDefault:
      "Why do good intentions die around day 12 — and what system replaces them?",
    sections: [
      {
        labelKey: "hubSectionQuestion",
        labelDefault: "The Question",
        blurbKey: "hubSectionQuestionBlurb",
        blurbDefault:
          "First, understand why willpower loses — before designing anything.",
        articles: ["make-good-habits-obvious", "small-wins-big-life", "morning-vs-night"],
        articlesFr: ["comment-creer-des-habitudes", "environnement-beat-volonte", "regle-21-jours"],
      },
      {
        labelKey: "hubSectionExplanation",
        labelDefault: "The Explanation",
        blurbKey: "hubSectionExplanationBlurb",
        blurbDefault:
          "The science: identity, stacking, and the smallest viable unit of change.",
        articles: [
          "2-minute-rule-system",
          "identity-based-habits-90-day-test",
          "habit-stacking-routine",
          "atomic-habits-review",
        ],
        articlesFr: [
          "regle-deux-minutes",
          "identite-precde-resultat",
          "habit-stacking-routine",
          "atomic-habits-revue-complete",
        ],
      },
      {
        labelKey: "hubSectionPractice",
        labelDefault: "The Practice",
        blurbKey: "hubSectionPracticeBlurb",
        blurbDefault:
          "Protocols you run this week — including what to do when you break the chain.",
        articles: [
          "missed-day-protocol",
          "5-minute-morning-habit",
          "morning-routines-12-tested",
          "identity-challenge-7-days",
        ],
        articlesFr: [
          "casser-mauvaise-habitude",
          "routine-matin-change-tout",
          "ne-brise-jamais-chaine",
          "5-minute-morning-habit",
        ],
      },
    ],
    tools: [
      { href: "/tools/habit-stacker/", labelKey: "hubToolStacker", labelDefault: "Habit Stacker" },
      { href: "/tracker/", labelKey: "hubToolTracker", labelDefault: "Habit Tracker" },
      { href: "/30-days-discipline/", labelKey: "hubToolPdf", labelDefault: "30 Days of Discipline (PDF)" },
    ],
    featured: {
      href: "/journal/2-minute-rule-system/",
      hrefFr: "/fr/journal/regle-deux-minutes/",
      solvesDefault:
        "What it fixes: the gap between knowing what to do and actually starting — and the crash after the first missed day.",
      forDefault:
        "Who it's for: anyone who has abandoned a habit around day 12 with their motivation still intact.",
      nextLabelDefault: "Open the Habit Stacker",
      kickerKey: "pillarKicker",
      kickerDefault: "The Pillar",
      titleKey: "pillarTitle",
      titleDefault: "The 2-Minute Rule: A Complete System",
      descKey: "pillarHabitsDesc",
      descDefault:
        "The most misunderstood idea in habit science — read the full 3,000-word architecture, including the recovery protocol for when it stops working.",
      ctaKey: "hubFeaturedCta",
      ctaDefault: "Explore the system →",
    },
    books: [
      { id: "atomic-habits", review: "/journal/atomic-habits-review/", reviewFr: "/fr/journal/atomic-habits-revue-complete/" },
      { id: "deep-work", review: "/journal/deep-work-focus/", reviewFr: "/fr/journal/deep-work-focus/" },
    ],
  },

  mindset: {
    id: "mindset",
    brandingKey: "hubMindsetBranding",
    brandingDefault: "Pillar 02 · Mental Resilience & Self-Mastery",
    questionKey: "hubMindsetQuestion",
    questionDefault:
      "Why do some people break under pressure — while others adapt and grow?",
    ledeKey: "hubMindsetLede",
    ledeDefault:
      "Confidence, focus and grit are not talents you are born with — they are responses you train, one uncomfortable rep at a time.",
    sections: [
      {
        labelKey: "hubSectionQuestion",
        labelDefault: "The Question",
        blurbKey: "hubSectionQuestionBlurb",
        blurbDefault: "Name the mechanism before you fight it.",
        articles: [
          "comparison-trap",
          "arreter-auto-sabotage",
          "syndrome-imposteur",
          "growth-mindset-rewire",
        ],
        articlesFr: [
          "arreter-auto-sabotage",
          "syndrome-imposteur",
          "comparison-trap",
          "mindset-etat-esprit",
        ],
      },
      {
        labelKey: "hubSectionExplanation",
        labelDefault: "The Explanation",
        blurbKey: "hubSectionExplanationBlurb",
        blurbDefault: "What the research actually says.",
        articles: [
          "identity-precedes-outcome",
          "long-ascent",
          "confidence-is-a-record-not-a-feeling",
          "motivation-fades-systems-dont",
        ],
        articlesFr: [
          "echec-meilleur-professeur",
          "puissance-dialogue-interieur",
          "identity-precedes-outcome",
          "confidence-is-a-record-not-a-feeling",
        ],
      },
      {
        labelKey: "hubSectionPractice",
        labelDefault: "The Practice",
        blurbKey: "hubSectionPracticeBlurb",
        blurbDefault: "Where it becomes real — protocols you run today.",
        articles: [
          "focus-on-yourself-stay-silent-shi-heng-yi",
          "confiance-inbranlable",
          "comment-devenir-mentalement-inebranlable",
          "regles-goggins-mental",
        ],
        articlesFr: [
          "confiance-inbranlable",
          "comment-devenir-mentalement-inebranlable",
          "regles-goggins-mental",
          "focus-on-yourself-stay-silent-shi-heng-yi",
        ],
      },
    ],
    tools: [
      {
        href: "/tools/discipline-quiz/",
        labelKey: "hubToolQuiz",
        labelDefault: "The Discipline Audit",
      },
      {
        href: "/memento-mori/",
        labelKey: "hubToolMemento",
        labelDefault: "Memento Mori",
      },
    ],
    featured: {
      href: "/psychology/",
      hrefFr: "/fr/psychology/",
      solvesKey: "hubFeaturedP2Solves",
      solvesDefault:
        "What it repairs: the missing inner layer — you have the system, and you still hesitate in front of the effort.",
      forKey: "hubFeaturedP2For",
      forDefault:
        "Who it is for: anyone who knows what to do — and wonders why their head keeps resisting.",
      nextKey: "hubFeaturedP2Next",
      nextHref: "/tools/discipline-quiz/",
      nextLabelDefault: "Take the discipline audit",
      kickerKey: "hubPsychKicker",
      kickerDefault: "The Foundation",
      titleKey: "hubPsychTitle",
      titleDefault: "The Psychology of Discipline",
      descKey: "hubPsychDesc",
      descDefault:
        "Six psychological mechanisms — from self-sabotage to resilience — that explain why willpower alone fails, and what actually replaces it.",
      ctaKey: "hubFeaturedP2Cta",
      ctaDefault: "Read the brief →",
    },
    books: [
      {
        id: "cant-hurt-me",
        review: "/journal/cant-hurt-me-review/",
        reviewFr: "/fr/journal/cant-hurt-me-review/",
      },
    ],
  },

  sport: {
    id: "sport",
    brandingKey: "hubSportBranding",
    brandingDefault: "Pillar 03 · Brain-Body Performance",
    questionKey: "hubSportQuestion",
    questionDefault:
      "How does the body shape the mind's performance before willpower even begins?",
    ledeKey: "hubSportLede",
    ledeDefault:
      "Sleep, food, movement and breath are not lifestyle content — they are the infrastructure under every decision, every habit and every hour of deep work.",
    sections: [
      {
        labelKey: "hubSectionQuestion",
        labelDefault: "The Question",
        blurbKey: "hubSectionQuestionBlurb",
        blurbDefault: "Name the mechanism before you fight it.",
        articles: [
          "body-votes-first",
          "nervous-system-is-the-boss",
          "strength-is-a-skill",
          "consistance-bat-intensite",
        ],
        articlesFr: [
          "body-votes-first",
          "nervous-system-is-the-boss",
          "strength-is-a-skill",
          "consistance-bat-intensite",
        ],
      },
      {
        labelKey: "hubSectionExplanation",
        labelDefault: "The Explanation",
        blurbKey: "hubSectionExplanationBlurb",
        blurbDefault: "What the research actually says.",
        articles: [
          "sleep-is-unfair-advantage",
          "nervous-system-reset-focus",
          "calm-is-a-superpower",
          "the-morning-athlete",
        ],
        articlesFr: [
          "sleep-is-unfair-advantage",
          "nervous-system-reset-focus",
          "calm-is-a-superpower",
          "the-morning-athlete",
        ],
      },
      {
        labelKey: "hubSectionPractice",
        labelDefault: "The Practice",
        blurbKey: "hubSectionPracticeBlurb",
        blurbDefault: "Where it becomes real — protocols you run today.",
        articles: [
          "guide-debutant-fitness",
          "routine-matin-sante",
          "force-mentale-sport",
          "two-minute-breath-reset",
        ],
        articlesFr: [
          "guide-debutant-fitness",
          "routine-matin-sante",
          "force-mentale-sport",
          "two-minute-breath-reset",
        ],
      },
    ],
    tools: [
      {
        href: "/tools/cold-shower-tracker/",
        labelKey: "hubToolCold",
        labelDefault: "The Cold Shower Tracker",
      },
      {
        href: "/tools/meditation-timer/",
        labelKey: "hubToolMeditation",
        labelDefault: "The Meditation Timer",
      },
    ],
    featured: {
      href: "/journal/sleep-is-unfair-advantage/",
      hrefFr: "/fr/journal/sommeil-avantage-indefendable/",
      solvesKey: "hubFeaturedP3Solves",
      solvesDefault:
        "What it repairs: the missing foundation — no mindset and no system survives a brain running on five hours.",
      forKey: "hubFeaturedP3For",
      forDefault:
        "Who it is for: anyone optimising routines while their recovery quietly decides the outcome.",
      nextKey: "hubFeaturedP3Next",
      nextHref: "/tools/cold-shower-tracker/",
      nextLabelDefault: "Open the Cold Shower Tracker",
      kickerKey: "hubSleepKicker",
      kickerDefault: "The Protocol",
      titleKey: "hubSleepTitle",
      titleDefault: "Sleep Is Your Unfair Advantage",
      descKey: "hubSleepDesc",
      descDefault:
        "A 60-night self-experiment turned into a performance system — what sleep science actually says, measured on one body, one tracker, one decision at a time.",
      ctaKey: "hubFeaturedP3Cta",
      ctaDefault: "Read the protocol →",
    },
    // No reviewed brain-body books yet — section stays hidden (knowledge-first rule).
    books: [],
  },

  stories: {
    id: "stories",
    brandingKey: "hubStoriesBranding",
    brandingDefault: "Pillar 04 · Evidence Stories",
    questionKey: "hubStoriesQuestion",
    questionDefault:
      "What do real lives prove about discipline and change — that a thousand lectures never will?",
    ledeKey: "hubStoriesLede",
    ledeDefault:
      "We don't preach — we show receipts. Documented lives and self-run experiments that put every claim this site makes to the test.",
    sections: [
      {
        labelKey: "hubSectionQuestion",
        labelDefault: "The Question",
        blurbKey: "hubSectionQuestionBlurb",
        blurbDefault: "Name the mechanism before you fight it.",
        articles: [
          "histoire-concierge-millionnaire",
          "proof-over-noise",
        ],
        articlesFr: [
          "histoire-concierge-millionnaire",
          "proof-over-noise",
        ],
      },
      {
        labelKey: "hubSectionExplanation",
        labelDefault: "The Explanation",
        blurbKey: "hubSectionExplanationBlurb",
        blurbDefault: "What the research actually says.",
        articles: [
          "psychology-of-money-business",
          "slow-productivity-30-day-test",
        ],
        articlesFr: [
          "psychology-of-money-business",
          "slow-productivity-30-day-test",
        ],
      },
      {
        labelKey: "hubSectionPractice",
        labelDefault: "The Practice",
        blurbKey: "hubSectionPracticeBlurb",
        blurbDefault: "Where it becomes real — protocols you run today.",
        articles: [
          "sprint-90-jours",
          "how-to-read-30-books-a-year",
        ],
        articlesFr: [
          "sprint-90-jours",
          "how-to-read-30-books-a-year",
        ],
      },
    ],
    tools: [
      {
        href: "/tools/reading-calculator/",
        labelKey: "hubToolReading",
        labelDefault: "The Reading Calculator",
      },
    ],
    featured: {
      href: "/journal/histoire-concierge-millionnaire/",
      hrefFr: "/fr/journal/histoire-concierge-millionnaire/",
      solvesKey: "hubFeaturedP4Solves",
      solvesDefault:
        "What it repairs: the credibility gap — why patience-as-advice never lands until you see the receipts.",
      forKey: "hubFeaturedP4For",
      forDefault:
        "Who it is for: anyone allergic to motivational stories who trusts named humans and audited numbers.",
      nextKey: "hubFeaturedP4Next",
      nextHref: "/tools/reading-calculator/",
      nextLabelDefault: "Open the Reading Calculator",
      kickerKey: "hubCaseKicker",
      kickerDefault: "The Case File",
      titleKey: "hubCaseTitle",
      titleDefault: "Ronald Read: The Janitor Who Died Worth $8 Million",
      descKey: "hubCaseDesc",
      descDefault:
        "A documented life, not a moral tale — twenty-five years pumping gas, a buy-and-hold portfolio, and the quiet arithmetic that out-performed Wall Street.",
      ctaKey: "hubFeaturedP4Cta",
      ctaDefault: "Open the case file →",
    },
    // Evidence-first: no book gets a slot before we publish its real review.
    books: [],
  },
};
