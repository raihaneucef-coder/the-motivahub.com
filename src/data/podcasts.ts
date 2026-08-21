export interface Podcast {
  id: string;
  title: string;
  description: string;
  cover: string;
  date: string;
  duration: string;
  podcastUrl: string;
}

// NOTE: podcastUrl is intentionally empty.
// When you have a real podcast host (Spotify, Apple, etc.),
// paste your real episode links here,
// e.g. "https://open.spotify.com/episode/xxxx"
export const podcasts: Podcast[] = [
  {
    id: "morning-drive-01",
    title: "The Morning Drive — Clarity Before Noise",
    description: "How the first 30 minutes shape the next 10 hours. A ritual, not a routine.",
    cover: "https://covers.openlibrary.org/b/isbn/9780140449334-L.jpg",
    date: "Aug 20, 2026",
    duration: "22 min",
    podcastUrl: "",
  },
  {
    id: "discipline-over-motivation",
    title: "Discipline Over Motivation",
    description: "Motivation leaves. Discipline stays. How to build the system that works on your worst days.",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    date: "Aug 12, 2026",
    duration: "18 min",
    podcastUrl: "",
  },
  {
    id: "deep-work-in-practice",
    title: "Deep Work in Practice",
    description: "A practical guide to protecting attention in a world designed to steal it.",
    cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    date: "Aug 04, 2026",
    duration: "26 min",
    podcastUrl: "",
  },
];
