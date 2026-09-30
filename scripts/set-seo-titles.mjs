// Inserts hand-authored, keyword-first SERP titles (seoTitle / seoTitleFr)
// into blog frontmatter. Authorship is deliberate per article; this only
// guarantees reliable, idempotent insertion. Visible H1 stays untouched.
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'src/content/blog';

// slug -> { en, fr } concise SERP titles (keyword-first, ~<=55 chars)
const MAP = {
  'the-goal-behind-the-goal': { en: 'The Goal Behind the Goal: Keep Going When Plans Fail', fr: "L'objectif derrière l'objectif : tenir quand tout bloque" },
  'sleep-is-unfair-advantage': { en: 'Sleep as an Unfair Advantage: 60 Days of Tracking', fr: 'Le sommeil : votre avantage injuste (test de 60 jours)' },
  'long-ascent': { en: 'The Long Ascent: Why Slow Wins Over Speed', fr: 'La longue ascension : pourquoi le lent atteint le sommet' },
  'syndrome-imposteur': { en: 'Imposter Syndrome: Why You Feel Like a Fraud', fr: "Le syndrome de l'imposteur : le comprendre et s'en sortir" },
  'hydratation-performance': { en: 'Hydration: The Underrated Performance Enhancer', fr: "Hydratation : l'eau, booster de performance oublié" },
  'identity-challenge-7-days': { en: 'The 7-Day Identity Challenge That Actually Works', fr: 'Défi identitaire de 7 jours : ce que ça change vraiment' },
  'habit-stacking-routine': { en: 'Habit Stacking: The Easiest Way to Build Routines', fr: "L'empilement d'habitudes : bâtir des routines facilement" },
  'eat-the-frog': { en: 'Eat the Frog: Why the Hard Thing Comes First', fr: 'Mange la grenouille : faire le plus dur en premier' },
  'i-tested-12-morning-routines': { en: 'I Tested 12 Morning Routines for 30 Days', fr: '12 routines matinales testées pendant 30 jours' },
  'podcasts-education': { en: 'Podcasts as Education: Learn While Doing Chores', fr: 'Les podcasts comme éducation : apprendre en faisant' },
  'identity-based-habits-90-day-test': { en: 'Identity-Based Habits: What Made Them Stick', fr: 'Habitudes identitaires : le changement qui les fait tenir' },
  'how-to-read-30-books-a-year': { en: 'How to Read 30 Books a Year (90-Day Test)', fr: 'Comment lire 30 livres par an (test de 90 jours)' },
  'nervous-system-reset-focus': { en: "Why You Can't Focus (and a 5-Minute Fix)", fr: "Pourquoi vous n'arrivez pas à vous concentrer (+ remède)" },
  'langage-corps-confiance': { en: 'Body Language: How to Project Confidence Silently', fr: 'Langage corporel : inspirer confiance sans parler' },
  'two-friends-one-promise': { en: 'Two Friends, One Promise: Community Is Built', fr: 'Deux amis, une promesse : la communauté se construit' },
  'the-morning-athlete': { en: 'The Morning Athlete: Why 5 AM Still Wins', fr: "L'athlète du matin : pourquoi 5 h du matin gagne" },
  'lire-divertissement': { en: 'Reading as Entertainment: Books as the Best Escape', fr: 'La lecture comme divertissement : la meilleure évasion' },
  'vaincre-procrastination': { en: 'How to Stop Procrastinating: The Real Science', fr: 'Comment arrêter de procrastiner : la vraie science' },
  'voyage-lent': { en: 'Slow Travel: Fewer Places, More Experience', fr: "Voyager lentement : moins de lieux, plus d'expérience" },
  'psychology-of-money-business': { en: 'The Psychology of Money: Business Is Behavior', fr: "Psychologie de l'argent : comprendre son rapport à l'argent" },
  'voyage-solo': { en: 'Solo Travel: Why You Should Go Alone Once', fr: 'Voyager seul : pourquoi le faire au moins une fois' },
  'run-your-own-race': { en: 'Run Your Own Race: The Discipline of Pacing', fr: 'Courir sa propre course : arrêter de se comparer' },
  'journal-croissance': { en: 'Journaling for Growth: Writing for Self-Awareness', fr: 'Tenir un journal : développer sa conscience de soi' },
  'identite-precde-resultat': { en: 'How to Change Your Identity: A 5-Step System', fr: "Changer d'identité : le système en 5 étapes" },
  'echec-meilleur-professeur': { en: 'Failure Is Your Best Teacher: Why Losing Wins', fr: "L'échec, ton meilleur professeur : perdre pour gagner" },
  'secret-reussite': { en: 'The Secret of People Who Always Succeed', fr: 'Le secret des gens qui réussissent toujours' },
  'pouvoir-du-non': { en: 'The Power of Saying No: Your Key Skill', fr: 'Le pouvoir de dire non : ta compétence clé' },
  'mindset-etat-esprit': { en: 'Mindset: How to Build a Winning Mindset', fr: "Mindset : adopter un état d'esprit gagnant" },
  'regles-goggins-mental': { en: 'David Goggins Rules: 5 Codes of an Unbreakable Mind', fr: "Règles de David Goggins : 5 codes d'un esprit inébranlable" },
  'mythe-reussite-instantanee': { en: 'The Overnight Success Myth: Why It Takes Years', fr: 'Le mythe du succès immédiat : pourquoi ça prend des années' },
  'habit-stacking-made-simple': { en: 'Habit Stacking: Link New Habits to Old Ones', fr: "L'empilement d'habitudes : lier le neuf à l'ancien" },
  'time-blocking-journee': { en: 'Time Blocking: Own Your Day Instead of Reacting', fr: 'Le time blocking : posséder sa journée au lieu de la subir' },
  'the-letter-he-never-sent': { en: 'The Letter He Never Sent — A Story of Change', fr: "La lettre qu'il n'a jamais envoyée" },
  'morning-routines-12-tested': { en: 'I Tested 12 Morning Routines for 14 Days', fr: '12 routines matinales testées pendant 14 jours' },
  'meal-prep-dimanche': { en: 'Meal Prep Sunday: Eat Healthy All Week in 2 Hours', fr: 'Meal prep du dimanche : manger sain 2 h par semaine' },
  'histoire-concierge-millionnaire': { en: 'The Janitor Who Became a Millionaire', fr: 'Le concierge devenu millionnaire : la discipline' },
  'the-shop-that-stayed-open': { en: 'The Shop That Stayed Open: Endurance Beats Pivoting', fr: "Le commerce qui est resté ouvert : l'endurance gagne" },
  'technique-pomodoro': { en: 'The Pomodoro Technique: Work Smarter, Not Harder', fr: 'La technique Pomodoro : travailler plus intelligemment' },
  'cant-hurt-me-review': { en: "Can't Hurt Me Book Review: 5 Honest Lessons", fr: "Can't Hurt Me : critique et 5 leçons après 3 lectures" },
  '5-minute-morning-habit': { en: 'The 5-Minute Morning Habit That Saves My Sanity', fr: "L'habitude matinale de 5 minutes" },
  'voyage-budget': { en: 'Budget Travel: See the World Without Going Broke', fr: 'Voyager avec un petit budget sans se ruiner' },
  'focus-on-yourself-stay-silent-shi-heng-yi': { en: 'Focus on Yourself and Stay Silent — Shi Heng Yi', fr: 'Concentre-toi sur toi et reste silencieux — leçon Shaolin' },
  'echec-retroaction': { en: 'Failure Is Feedback: Setbacks as Stepping Stones', fr: "L'échec est un retour : les revers comme tremplins" },
  'real-reason-you-procrastinate': { en: 'The Real Reason You Procrastinate (Not Laziness)', fr: 'La vraie raison de votre procrastination (pas la paresse)' },
  'proof-over-noise': { en: 'Proof Over Noise: Focus on What Works', fr: 'Preuves plutôt que bruit : faire ce qui marche' },
  'two-minute-rule-guide': { en: 'The 2-Minute Rule: 7-Day Protocol + Guide', fr: 'La règle des 2 minutes : protocole 7 jours + guide' },
  '2-minute-rule-system': { en: 'The 2-Minute Rule: A Complete System', fr: 'La règle des 2 minutes : un système complet' },
  'regle-deux-minutes': { en: 'The Two-Minute Rule: Build Better Habits', fr: 'La règle des 2 minutes : des habitudes en 120 s' },
  'discipline-beat-motivation': { en: 'Discipline Beats Motivation — Every Time', fr: 'La discipline bat la motivation : les systèmes gagnent' },
  'regle-40-pourcent': { en: 'The 40% Rule: I Tested It for 30 Days', fr: 'La règle des 40 % : testée 30 jours, résultats réels' },
  'regle-21-jours': { en: 'The 21-Day Myth: Real Time to Build a Habit', fr: "Le mythe des 21 jours : vrai délai d'une habitude" },
  'comment-devenir-mentalement-inebranlable': { en: 'How to Become Mentally Unbreakable', fr: 'Devenir mentalement inébranlable : guide de résilience' },
  'puissance-dialogue-interieur': { en: 'The Power of Inner Dialogue: Self-Talk That Works', fr: 'La puissance du dialogue intérieur : se parler mieux' },
  'debt-is-a-story': { en: 'Debt Is a Story You Can Rewrite', fr: "La dette est une histoire qu'on peut réécrire" },
  'habitude-5-min-relations': { en: 'The 5-Minute Habit That Strengthens Relationships', fr: "L'habitude de 5 minutes qui renforce vos relations" },
  'make-good-habits-obvious': { en: 'Make Good Habits Obvious, Bad Ones Invisible', fr: 'Rends les bonnes habitudes évidentes, les autres non' },
  'protein-is-not-just-for-athletes': { en: 'Protein Is Not Just for Athletes', fr: 'Les protéines ne sont pas que pour les athlètes' },
  'viral-mindset-shift': { en: 'The Viral Mindset Shift: One Idea Changes Everything', fr: 'Le changement de mindset : une idée qui change tout' },
  'solo-travel-stronger-self': { en: 'Solo Travel, Stronger Self', fr: 'Voyager seul pour devenir plus fort' },
  'regarder-intentionnellement': { en: 'How to Watch Movies That Improve Your Life', fr: 'Regarder des films et séries qui améliorent ta vie' },
  'pouvoir-elimination': { en: 'The Power of Elimination: The Stop-Doing List', fr: "Le pouvoir de l'élimination : faire moins pour mieux" },
  'pourquoi-profond-objectifs': { en: 'The Goal Behind the Goal: Finding Your Deep Why', fr: "L'objectif derrière l'objectif : trouver ton pourquoi" },
  'force-mentale-sport': { en: 'Mental Toughness in Sport: Perform Under Pressure', fr: 'Force mentale dans le sport : performer sous pression' },
  'focus-monde-distractions': { en: 'How to Focus in a World Designed to Distract You', fr: 'Rester concentré dans un monde de distractions' },
  'earn-keep-grow': { en: 'Earn, Keep, Grow: The Three Jobs of Money', fr: "Gagner, garder, faire grandir : 3 piliers de l'argent" },
};

function setField(content, anchorRe, field, value) {
  // idempotent: remove existing field line first
  content = content.replace(new RegExp(`^${field}:.*\\n`, 'm'), '');
  const m = content.match(anchorRe);
  if (!m) throw new Error(`anchor for ${field} not found`);
  const idx = m.index + m[0].length;
  return content.slice(0, idx) + `${field}: "${value}"\n` + content.slice(idx);
}

let changed = 0;
for (const [slug, { en, fr }] of Object.entries(MAP)) {
  const file = path.join(BASE, `${slug}.md`);
  if (!fs.existsSync(file)) { console.log('MISSING', slug); continue; }
  let c = fs.readFileSync(file, 'utf8');
  c = setField(c, /^title:.*\n/m, 'seoTitle', en);
  if (/^titleFr:/m.test(c)) c = setField(c, /^titleFr:.*\n/m, 'seoTitleFr', fr);
  fs.writeFileSync(file, c);
  changed++;
  console.log('OK', slug, '| EN', en.length, '| FR', fr.length);
}
console.log('--- changed:', changed);
