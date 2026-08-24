const sharp = require('sharp');
const path = require('path');

const blogDir = path.join(__dirname, 'public/images/blog');

const articles = [
  { slug: 'routine-matin-change-tout', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] },
  { slug: 'routine-matin-sante', colors: ['#FF8E53', '#F7DC6F', '#82E0AA'] },
  { slug: 'pourquoi-profond-objectifs', colors: ['#3498DB', '#8E44AD', '#E74C3C'] },
  { slug: 'retroengineering-objectifs', colors: ['#1ABC9C', '#2ECC71', '#27AE60'] },
  { slug: 'ne-brise-jamais-chaine', colors: ['#E67E22', '#D35400', '#C0392B'] },
  { slug: 'regle-1-pourcent', colors: ['#9B59B6', '#8E44AD', '#7D3C98'] },
  { slug: 'mythe-reussite-instantanee', colors: ['#F39C12', '#F1C40F', '#D4AC0D'] },
  { slug: 'secret-reussite', colors: ['#2C3E50', '#34495E', '#1A252F'] },
  { slug: 'guide-debutant-fitness', colors: ['#E74C3C', '#C0392B', '#922B21'] },
  { slug: 'regle-40-pourcent', colors: ['#1ABC9C', '#16A085', '#0E6655'] },
  { slug: 'growth-mindset-rewire', colors: ['#2980B9', '#3498DB', '#5DADE2'] },
  { slug: 'mindset-etat-esprit', colors: ['#8E44AD', '#9B59B6', '#BB8FCE'] },
  { slug: 'echec-meilleur-professeur', colors: ['#D4AC0D', '#F4D03F', '#F9E79F'] },
  { slug: 'journal-croissance', colors: ['#27AE60', '#2ECC71', '#82E0AA'] },
  { slug: 'eat-the-frog', colors: ['#E74C3C', '#CB4335', '#B03A2E'] },
  { slug: 'jeune-intermittent', colors: ['#D68910', '#CA6F1E', '#BA4A00'] },
  { slug: 'detox-numerique', colors: ['#1F618D', '#2471A3', '#2E86C1'] },
  { slug: 'habitudes-mentales-performants', colors: ['#7D3C98', '#6C3483', '#5B2C6F'] },
  { slug: 'art-dire-non', colors: ['#D35400', '#E67E22', '#EB984E'] },
  { slug: 'pouvoir-du-non', colors: ['#922B21', '#B03A2E', '#CB4335'] },
  { slug: 'arreter-auto-sabotage', colors: ['#1A5276', '#1F618D', '#2471A3'] },
  { slug: 'syndrome-imposteur', colors: ['#6C3483', '#7D3C98', '#8E44AD'] },
  { slug: 'voyage-sante-mentale', colors: ['#48C9B0', '#76D7C4', '#A3E4D7'] },
  { slug: 'voyage-budget', colors: ['#F7DC6F', '#F9E79F', '#FDEBD0'] },
  { slug: 'trouver-voix', colors: ['#A569BD', '#BB8FCE', '#D2B4DE'] },
  { slug: 'regle-21-jours', colors: ['#F1948A', '#F1C40F', '#82E0AA'] },
  { slug: 'regarder-intentionnellement', colors: ['#5DADE2', '#85C1E9', '#AED6F1'] },
  { slug: 'pouvoir-elimination', colors: ['#45B39D', '#73C6B6', '#A2D9CE'] },
  { slug: 'podcasts-education', colors: ['#F0B27A', '#F5CBA7', '#FAE5D3'] },
  { slug: 'voyage-lent', colors: ['#82E0AA', '#ABEBC6', '#D5F5E3'] },
  { slug: 'standard-non-negociable', colors: ['#AEB6BF', '#D5D8DC', '#EAECEE'] },
  { slug: 'meal-prep-dimanche', colors: ['#F9E79F', '#FCF3CF', '#FEF9E7'] },
  { slug: 'pouvoir-ecrire-objectifs', colors: ['#5499C7', '#85C1E9', '#AED6F1'] },
  { slug: 'styles-attachement', colors: ['#EC7063', '#F1948A', '#F5B7B1'] },
  { slug: 'lire-divertissement', colors: ['#58D68D', '#82E0AA', '#ABEBC6'] },
  { slug: 'investir-debutant', colors: ['#5DADE2', '#48C9B0', '#45B7D1'] },
  { slug: 'identite-precde-resultat', colors: ['#AF7AC5', '#BB8FCE', '#D2B4DE'] },
  { slug: 'hydratation-performance', colors: ['#4FC3F7', '#81D4FA', '#B3E5FC'] },
  { slug: 'resolution-conflits', colors: ['#FF8A65', '#FFAB91', '#FFCCBC'] },
  { slug: 'histoire-professeur', colors: ['#7986CB', '#9FA8DA', '#C5CAE9'] },
  { slug: 'histoire-concierge-millionnaire', colors: ['#4DB6AC', '#80CBC4', '#B2DFDB'] },
  { slug: 'histoire-athlete-recommence', colors: ['#FF7043', '#FF8A65', '#FFAB91'] },
  { slug: 'habitude-5-min-relations', colors: ['#BA68C8', '#CE93D8', '#E1BEE7'] },
  { slug: 'environnement-beat-volonte', colors: ['#AED581', '#C5E1A5', '#DCEDC8'] },
  { slug: 'echec-retroaction', colors: ['#4DD0E1', '#80DEEA', '#B2EBF2'] },
  { slug: 'regle-50-30-20', colors: ['#FFD54F', '#FFE082', '#FFF176'] },
  { slug: 'fond-urgence', colors: ['#4DB6AC', '#66BB6A', '#81C784'] },
  { slug: 'confiance-inbranlable', colors: ['#AB47BC', '#BA68C8', '#CE93D8'] },
  { slug: 'reseaux-sociaux-divertissement', colors: ['#EF5350', '#E57373', '#EF9A9A'] },
  { slug: 'force-mentale-sport', colors: ['#5C6BC0', '#7986CB', '#9FA8DA'] },
  { slug: 'puissance-dialogue-interieur', colors: ['#26A69A', '#4DB6AC', '#80CBC4'] },
  { slug: 'voyage-solo', colors: ['#7E57C2', '#9575CD', '#B39DDB'] },
  { slug: 'atomic-habits-revue-complete', colors: ['#FFA726', '#FFB74D', '#FFCC80'] },
  { slug: 'consistance-bat-intensite', colors: ['#66BB6A', '#81C784', '#A5D6A7'] },
  { slug: 'arreter-couper-avis', colors: ['#78909C', '#90A4AE', '#B0BEC5'] },
];

async function generateImage(slug, colors, index) {
  const [c1, c2, c3] = colors;
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${c1};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${c2};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${c3};stop-opacity:1" />
      </linearGradient>
      <pattern id="dots" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.08)"/>
      </pattern>
      <pattern id="lines" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#dots)"/>
    <rect width="1200" height="630" fill="url(#lines)"/>
    <circle cx="200" cy="150" r="120" fill="rgba(255,255,255,0.06)"/>
    <circle cx="1000" cy="480" r="180" fill="rgba(255,255,255,0.05)"/>
    <circle cx="600" cy="315" r="250" fill="rgba(255,255,255,0.03)"/>
    <rect x="50" y="50" width="1100" height="530" rx="0" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    <text x="600" y="330" font-family="Arial, sans-serif" font-size="48" fill="rgba(255,255,255,0.9)" text-anchor="middle" font-weight="bold">Motiva Hub</text>
  </svg>`;
  const outputPath = path.join(blogDir, `${slug}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toFile(outputPath);
  console.log(`${index + 1}/55: ${slug}.jpg`);
}

async function main() {
  console.log('Generating 55 unique images...');
  for (let i = 0; i < articles.length; i++) {
    await generateImage(articles[i].slug, articles[i].colors, i);
  }
  console.log('Done!');
}

main().catch(console.error);
