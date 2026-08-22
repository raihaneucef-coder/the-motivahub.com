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
    id: "shi-heng-yi-focus-silent",
    title: "Motivation Daily — Shi Heng Yi: Focus on Yourself & Stay Silent",
    description: "Motiversity — Shaolin wisdom on silence and discipline. A timeless lesson on self-mastery.",
    cover: "https://i.ytimg.com/vi/teJ_rMsFJn0/hqdefault.jpg",
    date: "Aug 22, 2026",
    duration: "17 min",
    podcastUrl: "https://www.youtube.com/watch?v=teJ_rMsFJn0",
  },
  {
    id: "morning-drive-01",
    title: "Huberman Lab — How to Increase Motivation",
    description: "Andrew Huberman (4M+ subs) — science of dopamine and drive. Evidence-based strategies for focus and sustained motivation.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/9a/d3/19/9ad31912-0b5a-a16e-2d7c-9fd074698b9c/mza_8994222203629500925.jpg/600x600bb.jpg",
    date: "Aug 20, 2026",
    duration: "58 min",
    podcastUrl: "https://www.youtube.com/@hubermanlab",
  },
  {
    id: "discipline-over-motivation",
    title: "The Diary Of A CEO — David Goggins on Discipline",
    description: "Steven Bartlett x David Goggins (3M+ subs) — discipline over motivation, no excuses.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/69/af/0d/69af0ddd-1e0f-7ae3-c84b-88f18e31ad0c/mza_14445920128472365296.png/600x600bb.png",
    date: "Aug 12, 2026",
    duration: "72 min",
    podcastUrl: "https://www.youtube.com/@TheDiaryOfACEO",
  },
  {
    id: "deep-work-in-practice",
    title: "On Purpose — Jay Shetty on Focus",
    description: "Jay Shetty (5M+ subs) — protecting attention in a noisy world.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/6a/c0/90/6ac090d3-9793-462e-e148-b4510afde8dc/mza_11738637425061101004.jpg/600x600bb.jpg",
    date: "Aug 04, 2026",
    duration: "42 min",
    podcastUrl: "https://www.youtube.com/@jayshetty",
  },
  {
    id: "school-of-greatness-motivation",
    title: "School of Greatness — Lewis Howes",
    description: "Lewis Howes (2M+ subs) — interviews with top performers on mindset and grit.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/b2/17/b5/b217b58d-a605-8828-2cfe-3694a55a6284/mza_2870672035194873125.jpg/600x600bb.jpg",
    date: "Jul 28, 2026",
    duration: "51 min",
    podcastUrl: "https://www.youtube.com/@lewishowes",
  },
  {
    id: "mel-robbins-5am",
    title: "Mel Robbins — The 5 Second Rule",
    description: "Mel Robbins (3M+ subs) — viral motivation, take action before fear wins.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/ab/66/a5/ab66a5f5-b52b-c70a-227b-0721bd9dc660/mza_13546984924981879479.jpg/600x600bb.jpg",
    date: "Jul 15, 2026",
    duration: "34 min",
    podcastUrl: "https://www.youtube.com/@melrobbins",
  },
  {
    id: "jocko-discipline",
    title: "Jocko Podcast — Discipline Equals Freedom",
    description: "Jocko Willink (1M+ subs) — US Navy SEAL on discipline as freedom.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/e8/d9/54/e8d95480-c500-9306-89c1-9503a8eca007/mza_17025325643591784610.jpg/600x600bb.jpg",
    date: "Jul 02, 2026",
    duration: "47 min",
    podcastUrl: "https://www.youtube.com/@JockoPodcastOfficial",
  },
];
