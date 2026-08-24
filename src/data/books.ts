export interface Book {
  id: string;
  title: string;
  cover: string;
  description: string;
  reason: string;
  affiliateUrl: string;
  category: string;
  author: string;
}

// NOTE: affiliateUrl is intentionally empty.
// When you join Amazon Associates, paste your real links here,
// e.g. "https://www.amazon.fr/dp/0735211299?tag=yourtag-20"
export const books: Book[] = [
  {
    id: "meditations",
    title: "Meditations",
    cover: "https://covers.openlibrary.org/b/isbn/9780140449334-L.jpg",
    description: "The private notebook of an emperor writing to himself.",
    reason: "The closest thing we have to a manual for the inner life.",
    affiliateUrl: "https://www.amazon.fr/dp/0140449337?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "STOICISM",
    author: "Marcus Aurelius · c. 180 AD",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    description: "A systems thinker's case for identity-based change.",
    reason: "The clearest modern argument that you do not rise to your goals — you fall to your systems.",
    affiliateUrl: "https://www.amazon.fr/dp/0735211299?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "HABITS",
    author: "James Clear · 2018",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    description: "The case for treating concentration as a craft.",
    reason: "Focus without distraction is the superpower of the century.",
    affiliateUrl: "https://www.amazon.fr/dp/1455586692?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "FOCUS",
    author: "Cal Newport · 2016",
  },
  {
    id: "daily-stoic",
    title: "The Daily Stoic",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211735-L.jpg",
    description: "Three hundred and sixty-six meditations, one for each day.",
    reason: "A practical doorway into a tradition that has guided disciplined minds for two thousand years.",
    affiliateUrl: "https://www.amazon.fr/dp/0735211736?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "PHILOSOPHY",
    author: "Ryan Holiday · 2016",
  },
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    cover: "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg",
    description: "An unflinching account of self-mastery forged in suffering.",
    reason: "Not a comfortable read, and not meant to be — it is fuel for the days you want to quit.",
    affiliateUrl: "https://www.amazon.fr/dp/1544512287?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "DISCIPLINE",
    author: "David Goggins · 2018",
  },
  {
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    cover: "https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg",
    description: "A psychiatrist's testament from the camps.",
    reason: "The last of the human freedoms — to choose one's attitude — cannot be taken away.",
    affiliateUrl: "https://www.amazon.fr/dp/080701429X?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "PHILOSOPHY",
    author: "Viktor Frankl · 1946",
  },
  // --- Trending 2024-2026 ---
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    cover: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    description: "Timeless lessons on wealth, greed, and happiness.",
    reason: "A practical guide to understanding your relationship with money — why money is first a story about behavior, not numbers.",
    affiliateUrl: "https://www.amazon.fr/dp/0857197681?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "MONEY",
    author: "Morgan Housel · 2020",
  },
  {
    id: "mountain-is-you",
    title: "The Mountain Is You",
    cover: "https://covers.openlibrary.org/b/isbn/9781949759224-L.jpg",
    description: "A practical guide to turning self-sabotage into self-mastery.",
    reason: "A popular personal-growth recommendation — how to turn self-sabotage into strength.",
    affiliateUrl: "https://www.amazon.fr/dp/1949759229?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "GROWTH",
    author: "Brianna Wiest · 2020",
  },
  {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a F*ck",
    cover: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg",
    description: "A counterintuitive approach to living a good life.",
    reason: "A widely read personal-growth book — learn to choose what deserves your attention.",
    affiliateUrl: "https://www.amazon.fr/dp/0062457713?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "MINDSET",
    author: "Mark Manson · 2016",
  },
  {
    id: "let-them-theory",
    title: "The Let Them Theory",
    cover: "https://covers.openlibrary.org/b/isbn/9781401991360-L.jpg",
    description: "Mel Robbins' 2024 phenomenon — let them, let me.",
    reason: "A personal-growth recommendation — the phrase that helps readers set boundaries.",
    affiliateUrl: "https://www.amazon.fr/dp/1401991360?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "MINDSET",
    author: "Mel Robbins · 2024",
  },
  {
    id: "courage-to-be-disliked",
    title: "The Courage to Be Disliked",
    cover: "https://covers.openlibrary.org/b/isbn/9781501197277-L.jpg",
    description: "The Japanese phenomenon that shows you how to be free.",
    reason: "A thoughtful dialogue — the courage to displease and finally live free.",
    affiliateUrl: "https://www.amazon.fr/dp/1501197274?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "PHILOSOPHY",
    author: "Ichiro Kishimi · 2013",
  },
  {
    id: "48-laws-of-power",
    title: "The 48 Laws of Power",
    cover: "https://covers.openlibrary.org/b/isbn/9780140280197-L.jpg",
    description: "The ruthless and brilliant playbook for power.",
    reason: "A widely discussed book — 48 lessons on power and strategy.",
    affiliateUrl: "https://www.amazon.fr/dp/0140280197?tag=motivahub-21&utm_source=motivahub&utm_medium=bookstand&utm_campaign=books",
    category: "POWER",
    author: "Robert Greene · 1998",
  },
];