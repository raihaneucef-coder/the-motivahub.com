// Batch 4: add the missing concise SERP titles caught by the recursive audit.
// FR: 14 slugs whose title-tag is >=73 (no seoTitleFr yet). EN: 4 long twins.
import fs from 'node:fs';
import path from 'node:path';
const BASE = 'src/content/blog';

const FR = {
  'investir-debutant': 'Investir pour les débutants : le guide simple',
  'growth-mindset-rewire': "État d'esprit de croissance : le guide",
  'zone-confort-croissance': 'Zone de confort vs zone de croissance',
  'voyage-sante-mentale': 'Voyage et santé mentale : les lieux qui soignent',
  'growth-feels-like-breaking': 'La croissance commence par une rupture',
  'deep-work-ritual': 'Le rituel Deep Work pour la concentration',
  'trouver-voix': 'Prendre la parole : trouver sa voix',
  'routine-matin-change-tout': 'La routine matinale qui change tout',
  'regle-2-min-productivite': 'La règle des 2 minutes pour produire plus',
  'productivite-efficace': 'Productivité efficace : moins pour mieux',
  'histoire-professeur': 'Le professeur qui a changé 1000 vies',
  'guide-debutant-fitness': 'Habitude fitness : le guide du débutant',
  'discipline-depass-motivation': 'Discipline vs motivation : construire des systèmes',
  'comparison-trap': 'Le piège de la comparaison',
  'batching-productivite': 'Le batching pour la productivité',
};

const EN = {
  'histoire-professeur': 'The Teacher Who Changed 1000 Lives',
  'batching-productivite': 'Batching: The Productivity Secret Weapon',
  'regle-1-pourcent': 'The 1% Rule: Improve a Little Every Day',
  'atomic-habits-revue-complete': 'Atomic Habits: The Complete Breakdown',
};

function setField(content, anchorRe, field, value) {
  content = content.replace(new RegExp(`^${field}:.*\\n`, 'm'), '');
  const m = content.match(anchorRe);
  if (!m) throw new Error(`anchor for ${field} not found`);
  const idx = m.index + m[0].length;
  return content.slice(0, idx) + `${field}: "${value}"\n` + content.slice(idx);
}

for (const [slug, v] of Object.entries(FR)) {
  const file = path.join(BASE, `${slug}.md`);
  if (!fs.existsSync(file)) { console.log('MISSING-FR', slug); continue; }
  let c = fs.readFileSync(file, 'utf8');
  if (!/^titleFr:/m.test(c)) { console.log('NO-titleFr', slug); continue; }
  c = setField(c, /^titleFr:.*\n/m, 'seoTitleFr', v);
  fs.writeFileSync(file, c); console.log('FR ok', slug, v.length);
}
for (const [slug, v] of Object.entries(EN)) {
  const file = path.join(BASE, `${slug}.md`);
  if (!fs.existsSync(file)) { console.log('MISSING-EN', slug); continue; }
  let c = fs.readFileSync(file, 'utf8');
  c = setField(c, /^title:.*\n/m, 'seoTitle', v);
  fs.writeFileSync(file, c); console.log('EN ok', slug, v.length);
}
