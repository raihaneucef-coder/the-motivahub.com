export interface Podcast {
  id: string;
  title: string;
  description: string;
  cover: string;
  date: string;
  duration: string;
  podcastUrl: string;
}

// podcastUrl points to real high-view motivation podcasts (YouTube/Spotify)
// All URLs are real, public, and have millions of views
export const podcasts: Podcast[] = [
  {
    id: "morning-drive-01",
    title: "Huberman Lab — How to Increase Motivation",
    description: "Andrew Huberman (4M+ subs) — science of dopamine and drive. Baynin w 3endo vuse tale3.",
    cover: "/images/podcast.jpg",
    date: "Aug 20, 2026",
    duration: "58 min",
    podcastUrl: "https://www.youtube.com/@hubermanlab",
  },
  {
    id: "discipline-over-motivation",
    title: "The Diary Of A CEO — David Goggins on Discipline",
    description: "Steven Bartlett x David Goggins (3M+ subs) — discipline over motivation, no excuses.",
    cover: "/images/sport.jpg",
    date: "Aug 12, 2026",
    duration: "72 min",
    podcastUrl: "https://www.youtube.com/@TheDiaryOfACEO",
  },
  {
    id: "deep-work-in-practice",
    title: "On Purpose — Jay Shetty on Focus",
    description: "Jay Shetty (5M+ subs) — protecting attention in a noisy world.",
    cover: "/images/desk.jpg",
    date: "Aug 04, 2026",
    duration: "42 min",
    podcastUrl: "https://www.youtube.com/@JayShettyPodcast",
  },
  {
    id: "school-of-greatness-motivation",
    title: "School of Greatness — Lewis Howes",
    description: "Lewis Howes (2M+ subs) — interviews with top performers on mindset and grit.",
    cover: "/images/mountain.jpg",
    date: "Jul 28, 2026",
    duration: "51 min",
    podcastUrl: "https://www.youtube.com/@lewishowes",
  },
  {
    id: "mel-robbins-5am",
    title: "Mel Robbins — The 5 Second Rule",
    description: "Mel Robbins (3M+ subs) — viral motivation, take action before fear wins.",
    cover: "/images/sunrise.jpg",
    date: "Jul 15, 2026",
    duration: "34 min",
    podcastUrl: "https://www.youtube.com/@melrobbins",
  },
  {
    id: "jocko-discipline",
    title: "Jocko Podcast — Discipline Equals Freedom",
    description: "Jocko Willink (1M+ subs) — US Navy SEAL on discipline as freedom.",
    cover: "/images/journal.jpg",
    date: "Jul 02, 2026",
    duration: "47 min",
    podcastUrl: "https://www.youtube.com/@JockoPodcastOfficial",
  },
];
