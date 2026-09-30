// Batch 5: hand-authored concise FR SERP titles for the remaining long <title>-tags.
// Overwrites any existing seoTitleFr when the value is still too long.
// Rules: keyword-first, natural French, <=52 chars (brand tail " — Motiva Hub" adds 13).
import fs from 'node:fs';
import path from 'node:path';
const BASE = 'src/content/blog';

const FR = {
  'systemes-battent-motivation': 'Systèmes vs motivation : le guide qui tient',
  'styles-attachement': "Styles d'attachement : comprendre ses relations",
  'recovery-is-training': "Récupération : le repos est un entraînement",
  'psychology-of-money-business': "Psychologie de l'argent : changer son rapport",
  'ne-brise-jamais-chaine': "Ne brise jamais la chaîne : la règle simple",
  'morning-vs-night': "Matin ou soir : quelle discipline tient ?",
  'consistance-bat-intensite': "Consistance vs intensité : les petits pas gagnent",
  'comment-creer-des-habitudes': "Créer des habitudes durables : le guide",
  'time-blocking-journee': "Time blocking : reprendre sa journée en main",
  'small-wins-big-life': "Petites victoires, grande vie : les micro-gains",
  'regles-goggins-mental': "Règles de Goggins : 5 codes pour le mental",
  'mythe-reussite-instantanee': "Mythe du succès immédiat : pourquoi c'est long",
  'detox-numerique': "Détox numérique : reprendre le contrôle",
  'athlete-discipline': "Discipline d'athlète : les leçons à copier",
  'arreter-couper-avis': "Apprendre à dire non : poser des limites saines",
  'syndrome-imposteur': "Syndrome de l'imposteur : comprendre, en sortir",
  'strength-is-a-skill': "Force mentale : une compétence, pas un don",
  'routine-matin-sante': "Routine matinale santé : bien démarrer la journée",
  'real-reason-you-procrastinate': "Procrastination : la vraie raison, pas la paresse",
  'missed-day-protocol': "Jour manqué : le protocole pour ne pas tout lâcher",
  'identity-based-habits-90-day-test': "Habitudes identitaires : le test qui les fait tenir",
  'focus-on-yourself-stay-silent-shi-heng-yi': "Reste concentré, reste silencieux : leçon Shaolin",
  'discipline-personnelle-guide': "Discipline personnelle : 8 systèmes concrets",
  'boundaries-are-love': "Limites saines : dire non pour mieux aimer",
  'the-goal-behind-the-goal': "L'objectif derrière l'objectif : tenir bon",
  'quiet-power-of-doing-less': "Faire moins, mieux : le pouvoir silencieux",
  'paycheck-trap': "Piège du salaire : gagner plus ne suffit pas",
  'nervous-system-reset-focus': "Concentration : pourquoi ça bloque, le remède",
  'long-ascent': "La longue ascension : le lent atteint le sommet",
  'habitudes-mentales-performants': "5 habitudes mentales des très performants",
  'habit-stacking-routine': "Empilement d'habitudes : bâtir des routines",
  'environnement-beat-volonte': "Environnement vs volonté : l'environnement gagne",
  'definition-reussite': "Redéfinir la réussite : au-delà de l'argent",
  'success-leaves-traces': "La réussite laisse des traces : lire les patterns",
  'reseaux-sociaux-divertissement': "Réseaux sociaux et écran : trouver l'équilibre",
  'invest-like-beginner': "Investir débutant, penser comme propriétaire",
  'identity-challenge-7-days': "Défi identitaire 7 jours : ce que ça change",
  'technique-pomodoro': "Technique Pomodoro : travailler plus malin",
  'sprint-90-jours': "Sprint de 90 jours : atteindre ses objectifs",
  'sommeil-avantage-indefendable': "Sommeil : votre avantage injuste (test 60 jours)",
  'social-muscle': "Muscle social : renforcer ses relations",
  'smart-goals': "Objectifs SMART : les fixer pour les atteindre",
  'regle-50-30-20': "Règle 50/30/20 : gérer son budget simplement",
  'process-vs-outcome': "Processus vs résultat : le voyage compte",
  'lire-divertissement': "Lire pour se détendre : la meilleure évasion",
  'discipline-choix-quotidien': "La discipline est un choix quotidien",
  'discipline-beat-motivation': "Discipline bat motivation : les systèmes gagnent",
  'comment-devenir-mentalement-inebranlable': "Devenir mentalement inébranlable : le guide",
  'attention-as-asset': "Attention : un actif à protéger",
  'atomic-habits-review': "Atomic Habits : rapport de terrain en 4 lectures",
  'voyage-lent': "Voyager lentement : moins de lieux, plus de sens",
  'secure-self': "Soi sécurisé : construire un attachement sain",
  'pourquoi-profond-objectifs': "Trouver son pourquoi profond",
  'force-mentale-sport': "Force mentale : performer sous pression",
  'echec-meilleur-professeur': "L'échec comme meilleur professeur",
  'earn-keep-grow': "Gagner, garder, faire grandir : 3 piliers",
  'casser-mauvaise-habitude': "Casser une mauvaise habitude : le guide pratique",
  'cant-hurt-me-review': "Can't Hurt Me : critique et 5 leçons clés",
};

function setField(content, anchorRe, field, value) {
  content = content.replace(new RegExp(`^${field}:.*\\n`, 'm'), '');
  const m = content.match(anchorRe);
  if (!m) throw new Error(`anchor for ${field} not found`);
  const idx = m.index + m[0].length;
  return content.slice(0, idx) + `${field}: "${value.replace(/"/g, '\\"')}"\n` + content.slice(idx);
}

let ok = 0, missing = 0, noTitleFr = 0;
for (const [slug, v] of Object.entries(FR)) {
  const file = path.join(BASE, `${slug}.md`);
  if (!fs.existsSync(file)) { console.log('MISSING', slug); missing++; continue; }
  let c = fs.readFileSync(file, 'utf8');
  if (!/^titleFr:/m.test(c)) { console.log('NO-titleFr', slug); noTitleFr++; continue; }
  c = setField(c, /^titleFr:.*\n/m, 'seoTitleFr', v);
  fs.writeFileSync(file, c);
  ok++;
  console.log('ok', slug, v.length);
}
console.log(`done ok=${ok} missing=${missing} noTitleFr=${noTitleFr}`);
