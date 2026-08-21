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
// e.g. "https://www.amazon.com/dp/0735211299?tag=yourtag-20"
export const books: Book[] = [
  {
    id: "meditations",
    title: "Meditations",
    cover: "/images/statue.jpg",
    description: "The private notebook of an emperor writing to himself.",
    reason: "The closest thing we have to a manual for the inner life.",
    affiliateUrl: "https://www.amazon.com/dp/0140449337",
    category: "STOICISM",
    author: "Marcus Aurelius · c. 180 AD",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    cover: "/images/journal.jpg",
    description: "A systems thinker's case for identity-based change.",
    reason: "The clearest modern argument that you do not rise to your goals — you fall to your systems.",
    affiliateUrl: "https://www.amazon.com/dp/0735211299",
    category: "HABITS",
    author: "James Clear · 2018",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    cover: "/images/mountain.jpg",
    description: "The case for treating concentration as a craft.",
    reason: "Focus without distraction is the superpower of the century.",
    affiliateUrl: "https://www.amazon.com/dp/1455586692",
    category: "FOCUS",
    author: "Cal Newport · 2016",
  },
  {
    id: "daily-stoic",
    title: "The Daily Stoic",
    cover: "/images/candle.jpg",
    description: "Three hundred and sixty-six meditations, one for each day.",
    reason: "A practical doorway into a tradition that has guided disciplined minds for two thousand years.",
    affiliateUrl: "https://www.amazon.com/dp/0735211736",
    category: "PHILOSOPHY",
    author: "Ryan Holiday · 2016",
  },
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    cover: "/images/sport.jpg",
    description: "An unflinching account of self-mastery forged in suffering.",
    reason: "Not a comfortable read, and not meant to be — it is fuel for the days you want to quit.",
    affiliateUrl: "https://www.amazon.com/dp/1544512287",
    category: "DISCIPLINE",
    author: "David Goggins · 2018",
  },
  {
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    cover: "/images/mountain.jpg",
    description: "A psychiatrist's testament from the camps.",
    reason: "The last of the human freedoms — to choose one's attitude — cannot be taken away.",
    affiliateUrl: "https://www.amazon.com/dp/080701429X",
    category: "PHILOSOPHY",
    author: "Viktor Frankl · 1946",
  },
  // --- Tendance 2024-2026 ---
  {
    id: "psychology-of-money",
    title: "The Psychology of Money",
    cover: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    description: "Timeless lessons on wealth, greed, and happiness.",
    reason: "Tendance mondiale — pourquoi l'argent est d'abord une histoire de comportement, pas de chiffres.",
    affiliateUrl: "https://www.amazon.com/dp/0857197681",
    category: "MONEY",
    author: "Morgan Housel · 2020",
  },
  {
    id: "mountain-is-you",
    title: "The Mountain Is You",
    cover: "https://covers.openlibrary.org/b/isbn/9781949759224-L.jpg",
    description: "The viral guide to turning self-sabotage into self-mastery.",
    reason: "Le plus tendance sur TikTok/BookTok — comment transformer l'auto-sabotage en force.",
    affiliateUrl: "https://www.amazon.com/dp/1949759229",
    category: "GROWTH",
    author: "Brianna Wiest · 2020",
  },
  {
    id: "subtle-art",
    title: "The Subtle Art of Not Giving a F*ck",
    cover: "https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg",
    description: "A counterintuitive approach to living a good life.",
    reason: "Bestseller mondial — apprendre à choisir ce qui mérite votre attention.",
    affiliateUrl: "https://www.amazon.com/dp/0062457713",
    category: "MINDSET",
    author: "Mark Manson · 2016",
  },
  {
    id: "let-them-theory",
    title: "The Let Them Theory",
    cover: "https://covers.openlibrary.org/b/isbn/9781401991360-L.jpg",
    description: "Mel Robbins' 2024 phenomenon — let them, let me.",
    reason: "Tendance 2024-2025 — la phrase qui libère des milliers de lecteurs.",
    affiliateUrl: "https://www.amazon.com/dp/1401991360",
    category: "MINDSET",
    author: "Mel Robbins · 2024",
  },
  {
    id: "courage-to-be-disliked",
    title: "The Courage to Be Disliked",
    cover: "https://covers.openlibrary.org/b/isbn/9781501197277-L.jpg",
    description: "The Japanese phenomenon that shows you how to be free.",
    reason: "Viral au Japon et en Europe — le courage de déplaire pour enfin vivre libre.",
    affiliateUrl: "https://www.amazon.com/dp/1501197274",
    category: "PHILOSOPHY",
    author: "Ichiro Kishimi · 2013",
  },
  {
    id: "48-laws-of-power",
    title: "The 48 Laws of Power",
    cover: "https://covers.openlibrary.org/b/isbn/9780140280197-L.jpg",
    description: "The ruthless and brilliant playbook for power.",
    reason: "Le plus tendance sur BookTok — 48 leçons qui ne laissent personne indifférent.",
    affiliateUrl: "https://www.amazon.com/dp/0140280197",
    category: "POWER",
    author: "Robert Greene · 1998",
  },
];