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
    id: "school-of-greatness-motivation",
    title: "Your Subconscious Mind Is Sabotaging You (Here's How To Rewire It) | Peter Crone",
    description: "Peter Crone — subconscious coaching for PGA Tour golfers and MLB athletes — on why willpower can override a habit but never an identity.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/b2/17/b5/b217b58d-a605-8828-2cfe-3694a55a6284/mza_2870672035194873125.jpg/600x600bb.jpg",
    date: "Aug 19, 2026",
    duration: "2:01:00",
    podcastUrl: "https://www.youtube.com/watch?v=kAzR5Vu9TA0",
  },
  {
    id: "shi-heng-yi-focus-silent",
    title: "Motiversity — Shi Heng Yi: Focus on Yourself & Stay Silent",
    description: "Motiversity — Shaolin wisdom on silence and discipline. A timeless lesson on self-mastery.",
    cover: "https://i.ytimg.com/vi/teJ_rMsFJn0/hqdefault.jpg",
    date: "Mar 30, 2026",
    duration: "17 min",
    podcastUrl: "https://www.youtube.com/watch?v=teJ_rMsFJn0",
  },
  {
    id: "mel-robbins-5am",
    title: "The Science of Self Control: Find Motivation, Increase Your Focus, and Hack Dopamine",
    description: "Mel Robbins and Dr. Anna Lembke, professor of psychiatry and addiction medicine, on dopamine, compulsive habits and getting motivated when you're exhausted.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/ab/66/a5/ab66a5f5-b52b-c70a-227b-0721bd9dc660/mza_13546984924981879479.jpg/600x600bb.jpg",
    date: "Jan 22, 2026",
    duration: "1:19:23",
    podcastUrl: "https://www.youtube.com/watch?v=E4rTyhYfZhE",
  },
  {
    id: "jocko-discipline",
    title: "Jocko Podcast 521: Obey Your Own Orders. Discipline vs. the War in Your Head",
    description: "Jocko Willink and Echo Charles on the quiet war in your head — how tiny daily choices, from donuts to debt to doom-scrolling, add up to victory or defeat.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/e8/d9/54/e8d95480-c500-9306-89c1-9503a8eca007/mza_17025325643591784610.jpg/600x600bb.jpg",
    date: "Dec 31, 2025",
    duration: "1:21:47",
    podcastUrl: "https://www.youtube.com/watch?v=8KvPT3gT1tE",
  },
  {
    id: "discipline-over-motivation",
    title: "The Man Who Wrote Atomic Habits: Your Goals Are Quietly Restricting Your Happiness | James Clear",
    description: "Atomic Habits author James Clear on the science of building lasting habits, breaking bad ones, and why 1% improvements matter more than goals.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/69/af/0d/69af0ddd-1e0f-7ae3-c84b-88f18e31ad0c/mza_14445920128472365296.png/600x600bb.png",
    date: "Dec 11, 2025",
    duration: "2:11:19",
    podcastUrl: "https://www.youtube.com/watch?v=rtufWBLOXgw",
  },
  {
    id: "deep-work-in-practice",
    title: "If you’re ambitious but lazy, please watch this…",
    description: "Jay Shetty on overcoming laziness, distraction and burnout by lowering the bar, building rituals and choosing consistency over motivation.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/6a/c0/90/6ac090d3-9793-462e-e148-b4510afde8dc/mza_11738637425061101004.jpg/600x600bb.jpg",
    date: "Nov 7, 2025",
    duration: "23 min",
    podcastUrl: "https://www.youtube.com/watch?v=rNmOfqWGkjs",
  },
  {
    id: "morning-drive-01",
    title: "How to Increase Motivation & Drive | Huberman Lab Essentials",
    description: "Andrew Huberman on the biology of motivation and drive — the role of dopamine, the pleasure-pain balance, and tools for overcoming procrastination.",
    cover: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/9a/d3/19/9ad31912-0b5a-a16e-2d7c-9fd074698b9c/mza_8994222203629500925.jpg/600x600bb.jpg",
    date: "Jan 30, 2025",
    duration: "34 min",
    podcastUrl: "https://www.youtube.com/watch?v=OLQRAMZi--c",
  },
  {
    id: "the-futur-ikigai-niche",
    title: "The Futur — Find Your Niche & Turn Passion Into Profit",
    description: "Chris Do — a full Ikigai workshop on turning what you love into work the world will pay for.",
    cover: "https://i.ytimg.com/vi/BAzs3amtEFA/hqdefault.jpg",
    date: "Full workshop",
    duration: "1:43:43",
    podcastUrl: "https://www.youtube.com/watch?v=BAzs3amtEFA",
  },
  {
    id: "caleb-ralston-personal-brand",
    title: "Caleb Ralston — How to Build a Personal Brand (Full Course)",
    description: "Caleb Ralston — a long-form masterclass on building a personal brand that attracts clients.",
    cover: "https://i.ytimg.com/vi/Ch4Sl0POBhU/hqdefault.jpg",
    date: "Full course",
    duration: "6:22:28",
    podcastUrl: "https://www.youtube.com/watch?v=Ch4Sl0POBhU",
  },
];
