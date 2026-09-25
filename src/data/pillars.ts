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
  solvesDefault: string;
  forDefault: string;
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
};
