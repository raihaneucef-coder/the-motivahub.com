import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'src/content/blog';

const translations = {
  'syndrome-imposteur.md': {
    titleFr: 'Le syndrome de l\'imposteur : pourquoi vous vous sentez comme un fraudeur et comment y remédier',
    descriptionFr: '70% des personnes souffrent du syndrome de l\'imposteur. Ce n\'est pas un signe d\'incompétence — c\'est un signe de croissance. Apprenez à le reconnaître et à le surmonter.'
  },
  'systemes-battent-motivation.md': {
    titleFr: 'Quand la motivation échoue, les systèmes prennent le relais',
    descriptionFr: 'La motivation est imprévisible. Les systèmes sont fiables. Découvrez pourquoi construire des systèmes vaut mieux que de fixer des objectifs — et comment créer des systèmes qui fonctionnent.'
  },
  'technique-pomodoro.md': {
    titleFr: 'La technique Pomodoro : travaillez plus intelligemment, pas plus dur',
    descriptionFr: 'La technique Pomodoro est le système de productivité le plus simple au monde. Travaillez 25 minutes, faites une pause de 5, répétez. Voici pourquoi ça marche.'
  },
  'the-comeback-is-stronger.md': {
    titleFr: 'Le retour est toujours plus fort que l\'échec',
    descriptionFr: 'Chaque échec est une préparation pour un retour plus fort. Votre plus grande croissance ne réside pas dans le fait de ne jamais tomber — mais de se relever avec plus de feu.'
  },
  'the-cost-of-success.md': {
    titleFr: 'Le coût du succès dont personne ne parle',
    descriptionFr: 'Tout succès a un prix payé d\'avance — dans l\'ennui, dans les refus, et dans le fait de rester quand il serait plus facile de partir.'
  },
  'the-detour-is-the-destination.md': {
    titleFr: 'Le détour est la destination',
    descriptionFr: 'Les meilleures histoires de voyage ne se sont jamais produites sur l\'itinéraire prévu. Elles se sont produites sur le détour que vous avez failli éviter.'
  },
  'the-goal-behind-the-goal.md': {
    titleFr: 'L\'objectif derrière l\'objectif : la question cachée qui vous fait avancer quand le plan ne marche plus',
    descriptionFr: 'Chaque objectif cache un objectif plus profond — un pourquoi derrière le pourquoi. La plupart des gens courent après la surface. Ceux qui arrivent sont ceux qui ont creusé au-delà de la première couche.'
  },
  'the-letter-he-never-sent.md': {
    titleFr: 'La lettre qu\'il n\'a jamais envoyée — et le jour où ça a changé sa vie',
    descriptionFr: 'Il l\'a écrite dans la colère. Il ne l\'a jamais postée. Mais chaque matin, pendant quarante ans, il l\'a relue — et a fait le même choix silencieux. Parfois, les lettres non envoyées écrivent nos vies.'
  },
  'the-morning-athlete.md': {
    titleFr: 'L\'athlète du matin : pourquoi 5h gagne toujours (et comment y arriver vraiment)',
    descriptionFr: 'J\'ai testé l\'entraînement matinal pendant 5 ans — en tant qu\'athlète amateur, coach et personne ordinaire essayant de caser les séances dans une vie chargée. Voici ce qui marche, ce qui échoue, et pourquoi 5h gagne toujours.'
  },
  'the-movie-that-changed-your-week.md': {
    titleFr: 'Le film qui a changé votre semaine',
    descriptionFr: 'Un bon film ne divertit pas seulement — il vous transforme. Choisissez des histoires qui font fructifier votre vie.'
  },
  'the-plate-that-keeps-you-steady.md': {
    titleFr: 'L\'assiette qui vous garde stable',
    descriptionFr: 'Une assiette stable fait une journée stable. Apprenez le ratio simple qui garde l\'énergie constante et les envies calmes.'
  },
  'the-shop-that-stayed-open.md': {
    titleFr: 'Le commerce qui est resté ouvert : pourquoi l\'endurance bat le pivot',
    descriptionFr: 'Tout le monde a pivoté. Lui est resté. Pendant 32 ans, les portes ont ouvert à 7h du matin — et les leçons qu\'il a apprises à l\'intérieur sont celles que la plupart des professionnels ne trouvent jamais. Une histoire d\'endurance tranquille.'
  },
  'time-blocking-journee.md': {
    titleFr: 'Le time blocking : comment posséder votre journée au lieu de la subir',
    descriptionFr: 'Le time blocking consiste à assigner chaque heure de votre journée à une tâche spécifique. Apprenez à prendre le contrôle de votre calendrier et de votre vie.'
  },
  'trouver-voix.md': {
    titleFr: 'Prendre la parole : comment trouver votre voix et l\'utiliser',
    descriptionFr: 'Votre voix compte. Mais si vous ne l\'utilisez jamais, personne ne l\'entendra. Apprenez à prendre la parole avec clarté, conviction et confiance.'
  },
  'two-friends-one-promise.md': {
    titleFr: 'Deux amis, une promesse : pourquoi la communauté se construit, ne se trouve pas',
    descriptionFr: 'Ils avaient promis de marcher ensemble chaque jour pendant un an. La promesse, pas la marche, est ce qui les a changés. Une histoire de responsabilité, de communauté et de la différence entre une habitude et un engagement.'
  },
  'two-minute-breath-reset.md': {
    titleFr: 'La réinitialisation respiratoire de 2 minutes',
    descriptionFr: 'Vous ne pouvez pas vous calmer par la pensée — vous y arrivez par la respiration. Deux minutes suffisent pour changer votre état.'
  },
  'two-minute-rule-guide.md': {
    titleFr: 'La règle des 2 minutes : protocole de 7 jours + guide complet',
    descriptionFr: 'L\'idée la plus sous-estimée de James Clear. Commencez si petit que ça semble stupide. Puis regardez la porte rester ouverte. La base complète, le protocole, et quoi faire quand vous avez grandi.'
  },
  'two-minute-threshold.md': {
    titleFr: 'Le seuil des deux minutes',
    descriptionFr: 'Une habitude n\'est pas une ligne d\'arrivée mais une porte. Réduisez-la jusqu\'à ce qu\'il devienne impossible de la sauter, et la porte reste ouverte pour toujours.'
  },
  'tyranny-of-the-visible-timeline.md': {
    titleFr: 'La tyrannie de la timeline visible',
    descriptionFr: 'La plupart des abandons n\'ont rien à voir avec le fait que l\'objectif est mauvais. Ils ont à voir avec le fait que l\'horloge est visible.'
  },
  'vaincre-procrastination.md': {
    titleFr: 'Comment arrêter de procrastiner — la vraie science derrière la procrastination',
    descriptionFr: 'Comprenez pourquoi vous procrastinez et apprenez des techniques éprouvées pour y remédier pour toujours. Des stratégies pratiques pour agir maintenant.'
  },
  'viral-mindset-shift.md': {
    titleFr: 'Le changement de mindset viral — comment une idée change tout',
    descriptionFr: 'Une courte vidéo de mindset, 27 secondes : l\'identité précède le résultat. Voici l\'histoire complète derrière une idée transformative sur la motivation.'
  },
  'voyage-budget.md': {
    titleFr: 'Voyager avec un petit budget : comment voir le monde sans se ruiner',
    descriptionFr: 'Voyager ne doit pas être cher. Avec les bonnes stratégies, vous pouvez voir le monde avec un budget serré. Voici comment.'
  },
  'voyage-lent.md': {
    titleFr: 'Voyager lentement : pourquoi moins de destinations signifie plus d\'expérience',
    descriptionFr: 'Foncer dans 10 villes en 10 jours n\'est pas du voyage — c\'est du tourisme. Le voyage lent, c\'est la profondeur, pas la largeur. Découvrez pourquoi moins c\'est plus.'
  },
  'voyage-sante-mentale.md': {
    titleFr: 'Voyage et santé mentale : comment les nouveaux lieux soignent votre esprit',
    descriptionFr: 'Voyager n\'est pas un luxe — c\'est une thérapie. Les nouveaux environnements réduisent le stress, boostent la créativité et améliorent la santé mentale. Voici la science.'
  },
  'voyage-solo.md': {
    titleFr: 'Voyager seul : pourquoi tout le monde devrait voyager seul au moins une fois',
    descriptionFr: 'Voyager seul n\'est pas être seul — c\'est être libre. Découvrez pourquoi voyager seul est l\'expérience la plus transformative que vous puissiez avoir.'
  },
  'water-before-willpower.md': {
    titleFr: 'L\'eau avant la volonté',
    descriptionFr: 'Avant de faire appel à la volonté, buvez de l\'eau. L\'hydratation est le dopant le moins cher que vous possédiez.'
  },
  'when-motivation-leaves.md': {
    titleFr: 'Quand la motivation s\'en va',
    descriptionFr: 'La motivation est comme le temps. La discipline est le bâtiment que vous construisez pour que le temps ne décide plus de votre journée.'
  },
  'zone-confort-croissance.md': {
    titleFr: 'Zone de confort vs zone de croissance : pourquoi l\'inconfort est votre ami',
    descriptionFr: 'Votre zone de confort est un endroit magnifique, mais rien n\'y pousse. Découvrez pourquoi entrer dans l\'inconfort est le seul chemin vers la croissance.'
  }
};

for (const [file, fr] of Object.entries(translations)) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/^titleFr: ".*"$/m, `titleFr: "${fr.titleFr}"`);
  content = content.replace(/^descriptionFr: ".*"$/m, `descriptionFr: "${fr.descriptionFr}"`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`OK ${file}`);
}

console.log('Done');
