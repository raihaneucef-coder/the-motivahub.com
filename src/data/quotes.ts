export interface Quote {
  id: string;
  quote: string;
  quoteFr?: string;
  author: string;
  source: string;
  sourceFr?: string;
}

export const quotes: Quote[] = [
  {
    id: "seneca-imagination",
    quote: "We suffer more often in imagination than in reality.",
    quoteFr: "Nous souffrons plus souvent en imagination qu'en réalité.",
    author: "Seneca",
    source: "Letters from a Stoic",
    sourceFr: "Lettres à Lucilius",
  },
  {
    id: "aurelius-mind",
    quote: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    quoteFr: "Tu as du pouvoir sur ton esprit — pas sur les événements extérieurs. Comprends-le, et tu trouveras la force.",
    author: "Marcus Aurelius",
    source: "Meditations",
    sourceFr: "Pensées",
  },
  {
    id: "willink-freedom",
    quote: "Discipline equals freedom.",
    quoteFr: "La discipline, c'est la liberté.",
    author: "Jocko Willink",
    source: "Discipline Equals Freedom",
  },
  {
    id: "durant-excellence",
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    quoteFr: "Nous sommes ce que nous faisons de façon répétée. L'excellence n'est donc pas un acte, mais une habitude.",
    author: "Will Durant",
    source: "Paraphrasing Aristotle",
    sourceFr: "D'après Aristote",
  },
  {
    id: "nietzsche-why",
    quote: "He who has a why to live for can bear almost any how.",
    quoteFr: "Qui a un pourquoi pour vivre peut supporter presque n'importe comment.",
    author: "Friedrich Nietzsche",
    source: "Twilight of the Idols",
    sourceFr: "Le Crépuscule des idoles",
  },
  {
    id: "aurelius-impediment",
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    quoteFr: "L'empêchement à l'action fait avancer l'action. Ce qui se dresse sur le chemin devient le chemin.",
    author: "Marcus Aurelius",
    source: "Meditations",
    sourceFr: "Pensées",
  },
  {
    id: "lao-tzu-difficult",
    quote: "Do the difficult things while they are easy; do the great things while they are small.",
    quoteFr: "Fais les choses difficiles quand elles sont faciles ; fais les grandes choses quand elles sont petites.",
    author: "Lao Tzu",
    source: "Tao Te Ching",
  },
  {
    id: "frankl-space",
    quote: "Between stimulus and response there is a space. In that space is our power to choose.",
    quoteFr: "Entre stimulus et réponse il y a un espace. Dans cet espace se trouve notre pouvoir de choisir.",
    author: "Viktor E. Frankl",
    source: "Man's Search for Meaning",
    sourceFr: "Découvrir un sens à sa vie",
  },
];

export function getDailyQuote(): Quote {
  const day = Math.floor(Date.now() / 86400000);
  return quotes[day % quotes.length];
}