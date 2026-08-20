export interface Book {
  id: string;
  title: string;
  cover: string;
  description: string;
  reason: string;
  affiliateUrl: string;
}

// NOTE: affiliateUrl is intentionally empty.
// When you join Amazon Associates, paste your real links here,
// e.g. "https://www.amazon.com/dp/0735211299?tag=yourtag-20"
export const books: Book[] = [
  {
    id: "meditations",
    title: "Meditations",
    cover: "https://covers.openlibrary.org/b/isbn/9780140449334-L.jpg",
    description: "The private notebook of an emperor writing to himself.",
    reason: "The closest thing we have to a manual for the inner life.",
    affiliateUrl: "",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    description: "A systems thinker's case for identity-based change.",
    reason: "The clearest modern argument that you do not rise to your goals — you fall to your systems.",
    affiliateUrl: "",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    description: "The case for treating concentration as a craft.",
    reason: "Focus without distraction is the superpower of the century.",
    affiliateUrl: "",
  },
  {
    id: "daily-stoic",
    title: "The Daily Stoic",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211735-L.jpg",
    description: "Three hundred and sixty-six meditations, one for each day.",
    reason: "A practical doorway into a tradition that has guided disciplined minds for two thousand years.",
    affiliateUrl: "",
  },
  {
    id: "cant-hurt-me",
    title: "Can't Hurt Me",
    cover: "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg",
    description: "An unflinching account of self-mastery forged in suffering.",
    reason: "Not a comfortable read, and not meant to be — it is fuel for the days you want to quit.",
    affiliateUrl: "",
  },
  {
    id: "mans-search-for-meaning",
    title: "Man's Search for Meaning",
    cover: "https://covers.openlibrary.org/b/isbn/9780807014295-L.jpg",
    description: "A psychiatrist's testament from the camps.",
    reason: "The last of the human freedoms — to choose one's attitude — cannot be taken away.",
    affiliateUrl: "",
  },
];