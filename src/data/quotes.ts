export interface Quote {
  id: string;
  quote: string;
  author: string;
  source: string;
}

export const quotes: Quote[] = [
  {
    id: "seneca-imagination",
    quote: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    source: "Letters from a Stoic",
  },
  {
    id: "aurelius-mind",
    quote: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "Meditations",
  },
  {
    id: "willink-freedom",
    quote: "Discipline equals freedom.",
    author: "Jocko Willink",
    source: "Discipline Equals Freedom",
  },
  {
    id: "durant-excellence",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
    source: "Paraphrasing Aristotle",
  },
  {
    id: "nietzsche-why",
    quote: "He who has a why to live for can bear almost any how.",
    author: "Friedrich Nietzsche",
    source: "Twilight of the Idols",
  },
  {
    id: "aurelius-impediment",
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    author: "Marcus Aurelius",
    source: "Meditations",
  },
  {
    id: "lao-tzu-difficult",
    quote: "Do the difficult things while they are easy; do the great things while they are small.",
    author: "Lao Tzu",
    source: "Tao Te Ching",
  },
  {
    id: "frankl-space",
    quote: "Between stimulus and response there is a space. In that space is our power to choose.",
    author: "Viktor E. Frankl",
    source: "Man's Search for Meaning",
  },
];

export function getDailyQuote(): Quote {
  const day = Math.floor(Date.now() / 86400000);
  return quotes[day % quotes.length];
}