export interface Topic {
  id: string;
  title: string;
  titleFr?: string;
  description: string;
  descriptionFr?: string;
  lede?: string;
  ledeFr?: string;
}

export const topics: Topic[] = [
  {
    id: "mindset",
    title: "Mindset",
    titleFr: "État d'esprit",
    description: "Before any habit or discipline can take root, the mind must be reshaped. We examine the inner scaffolding that holds a life together.",
    descriptionFr:
      "Avant qu'une habitude ou une discipline ne prenne racine, l'esprit doit être remodelé. Nous examinons l'échafaudage intérieur qui tient une vie debout.",
  },
  {
    id: "habits",
    title: "Habits",
    titleFr: "Habitudes",
    description: "Greatness is not a single act but a thousand small ones, repeated until they disappear into who you are.",
    descriptionFr: "La grandeur n'est pas un acte unique mais mille petits gestes, répétés jusqu'à s'effacer dans la personne que vous devenez.",
  },
  {
    id: "discipline",
    title: "Discipline",
    titleFr: "Discipline",
    description: "Motivation is a visitor; discipline is a resident. This is the practice of doing what you said you would, especially when you do not feel like it.",
    descriptionFr: "La motivation est une visiteuse ; la discipline est une résidente. Faire ce que vous avez dit que vous feriez — surtout quand vous n'en avez plus envie.",
  },
  {
    id: "productivity",
    title: "Productivity",
    titleFr: "Productivité",
    description: "Busyness is the enemy of meaning. We rebuild the day around deep, uninterrupted work.",
    descriptionFr: "L'agitation est l'ennemie du sens. Nous rebâtissons la journée autour d'un travail profond et ininterrompu.",
    lede: "The largest hub on the site, so choose by problem: if you can't start, read the two procrastination essays; if you can't stop, the stop-doing list and the case for doing less; if you're scattered, deep work, time blocking and batching rebuild the day. The 30-day slow-productivity field report is the honest entry point — what changed, what didn't.",
    ledeFr: "Le plus fourni des thèmes du site ; choisissez donc selon votre problème : vous n'arrivez pas à démarrer — lisez les deux essais sur la procrastination ; vous n'arrivez pas à vous arrêter — la liste stop-doing et le plaidoyer pour faire moins ; vous êtes dispersé — le travail profond, le time blocking et le batching rebâtissent la journée. Le carnet de bord des 30 jours de slow productivity est la porte d'entrée honnête : ce qui a changé, ce qui n'a pas changé.",
  },
  {
    id: "goals",
    title: "Goals",
    titleFr: "Objectifs",
    description: "The day is the unit of a life well lived. We design the morning, protect the deep hours, and let the evening fall quietly.",
    descriptionFr: "Le jour est l'unité d'une vie bien vécue. Nous dessinons le matin, protégeons les heures profondes, et laissons le soir tomber en silence.",
    lede: "Twelve essays arranged around one idea: a goal is a compass, not a cage. You'll find the frameworks — SMART, measurable, written down — the horizons, like the 90-day sprint over the annual resolution, and the survival kit: accountability, reverse engineering, and what to lean on when motivation runs out. Start with why your plans die after week one, not with another list.",
    ledeFr: "Douze essais organisés autour d'une idée : un objectif est une boussole, pas une cage. Vous y trouverez les cadres — SMART, mesurable, écrit — les horizons, comme le sprint de 90 jours plutôt que la résolution annuelle, et le kit de survie : le compte rendu à quelqu'un, le raisonnement à rebours, et à quoi s'appuyer quand la motivation s'épuise. Commencez par pourquoi vos plans meurent après la première semaine, pas par une nouvelle liste.",
  },
  {
    id: "success",
    title: "Success",
    titleFr: "Réussite",
    description: "The summit was never the point. The climb was the point — and the person the climb makes of you.",
    descriptionFr: "Le sommet n'a jamais été le but. L'ascension est le but — et la personne que l'ascension fait de vous.",
    lede: "This hub argues with the myth: no overnight wins, no copied definitions. Success appears here as a direction you choose, traces you leave, feedback you mine from failure — and a cost someone should have mentioned. Start by defining success for yourself; the rest of the essays then have something to aim at.",
    ledeFr: "Ce thème discute avec le mythe : pas de réussite du jour au lendemain, pas de définition copiée. La réussite y apparaît comme une direction qu'on choisit, des traces qu'on laisse, une matière qu'on tire de l'échec — et un coût que quelqu'un aurait dû mentionner. Commencez par définir la réussite pour vous-même ; les autres essais auront alors quelque chose à viser.",
  },
  {
    id: "personal-growth",
    title: "Personal Growth",
    titleFr: "Développement personnel",
    description: "Growth is rarely linear and never finished. We trace the slow climb — the plateaus, the setbacks, the quiet breakthroughs.",
    descriptionFr: "La croissance est rarement linéaire et jamais achevée. Nous suivons la lente ascension — les paliers, les revers, les percées silencieuses.",
    lede: "Growth without the highlight reel: the long ascent that outruns the sprinter, the comeback that follows the setback, the discomfort that marks the edge of the growth zone. Around those sit the daily practices — journaling, the 1% rule, focusing on yourself without apology. Read the first essay if growth currently feels like breaking.",
    ledeFr: "La croissance, sans la vitrine des moments forts : la longue ascension qui dépasse le sprinteur, le retour après l'échec, l'inconfort qui marque le bord de la zone de croissance. Autour s'organisent les pratiques quotidiennes — le journal, la règle du 1 %, le fait de se concentrer sur soi sans s'excuser. Lisez le premier essai si, en ce moment, grandir ressemble à se briser.",
  },
  {
    id: "confidence",
    title: "Confidence",
    titleFr: "Confiance",
    description: "Confidence is not born — it is built from evidence. Every kept promise to yourself is a brick in the wall of self-trust.",
    descriptionFr: "La confiance ne naît pas — elle se construit preuve après preuve. Chaque promesse tenue à soi-même est une brique dans le mur de l'estime de soi.",
    lede: "Eight essays that treat confidence as a record you build, not a mood you wait for: the imposter feeling, the fear of judgment, saying no without guilt, body language, finding your voice — and a 30-day protocol for turning all of it into self-trust. The pieces stand alone; read together, they become a sequence.",
    ledeFr: "Huit essais qui traitent la confiance comme un dossier qu'on constitue, pas une humeur qu'on attend : le sentiment d'être un imposteur, la peur du jugement, dire non sans culpabilité, le langage du corps, trouver sa voix — et un protocole de 30 jours pour transformer tout cela en estime de soi solide. Chaque texte tient debout seul ; lus ensemble, ils forment une séquence.",
  },
  {
    id: "sport",
    title: "Sport",
    titleFr: "Sport",
    description: "The body votes first. Before the mind can carry a dream, the body must be able to carry the mind.",
    descriptionFr:
      "Votre corps n'est pas l'équipage de votre esprit — c'est son infrastructure. Sommeil, alimentation, mouvement, souffle.",
  },
  {
    id: "nutrition",
    title: "Nutrition",
    titleFr: "Nutrition",
    description: "You cannot out-discipline a bad plate. Fuel is the quiet foundation under every strong day — eat so the hard things become cheaper.",
    descriptionFr: "On ne compense pas une mauvaise assiette avec de la discipline. Le carburant est le socle silencieux de chaque journée forte.",
    lede: "No diet dogma — this hub trains the decisions that make eating well cheap: protein at every meal, water before caffeine, fixed eating times instead of emotional ones, and a plate that keeps your energy steady. Meal prep makes it realistic in two hours a week, and the fasting essay shows how we test popular claims before repeating them.",
    ledeFr: "Aucun dogme alimentaire — ce thème entraîne les décisions qui rendent bien manger peu coûteux : des protéines à chaque repas, l'eau avant la caféine, des heures de repas fixes plutôt qu'émotionnelles, et une assiette qui garde l'énergie stable. Le batch du dimanche rend tout cela réaliste en deux heures par semaine, et l'essai sur le jeûne intermittent montre comment on teste une affirmation populaire avant de la répéter.",
  },
  {
    id: "travel",
    title: "Travel",
    titleFr: "Voyage",
    description: "Go where you are a beginner again. New roads reset the ego and return you hungrier than you left.",
    descriptionFr: "Allez là où vous redevenez débutant. Les routes neuves recalibrent l'ego et vous rendent plus affamé qu'à l'aller.",
    lede: "Travel with a training logic: go where you're a beginner again, pack light, stay long, detour on purpose. The practical essays cover budget and slow travel; the rest cover what the road does to your head — mental health, independence, the self you bring home. Two solo-travel essays, one conclusion: do it once.",
    ledeFr: "Le voyage comme entraînement : allez là où vous redevenez débutant, voyagez léger, restez longtemps, détournez de route à dessein. Les essais pratiques couvrent le budget et le slow travel ; les autres couvrent ce que la route fait à la tête — santé mentale, autonomie, la version de soi qu'on ramène. Deux essais sur le voyage en solo, une conclusion : faites-le une fois.",
  },
  {
    id: "entertainment",
    title: "Entertainment",
    titleFr: "Divertissement",
    description: "Rest is a skill, not a reward. Choose your leisure the way champions choose training — deliberately, and always leaving energy behind.",
    descriptionFr: "Le repos est une compétence, pas une récompense. Choisissez vos loisirs délibérément, en gardant toujours de l’énergie en réserve.",
    lede: "The shared argument across these essays: leisure is chosen, not defaulted into. Each piece takes one medium — books, podcasts, films, social media — and asks what it does to your attention and energy, then how to use it deliberately. The two essays on play explain why rest is practice, not escape.",
    ledeFr: "L'argument commun à ces essais : le loisir se choisit, il ne se subit pas. Chaque texte prend un support — livres, podcasts, films, réseaux sociaux — et examine ce qu'il fait à votre attention et à votre énergie, puis comment l'utiliser délibérément. Les deux essais sur le jeu expliquent pourquoi le repos est un entraînement, pas une fuite.",
  },
  {
    id: "stories",
    title: "Stories",
    titleFr: "Histoires",
    description: "Proof over noise. Real people, real rises — curated news and human stories that raise the ceiling of what you believe is possible.",
    descriptionFr:
      "La preuve plutôt que le bruit. Des vies documentées et des expériences menées sur soi qui testent chaque affirmation.",
  },
  {
    id: "finance",
    title: "Finance",
    titleFr: "Finance",
    description: "Money is a skill, not a secret. We learn how to earn, keep and grow it — so freedom stops being a wish and becomes a plan.",
    descriptionFr: "L’argent est une compétence, pas un secret. Apprenons à le gagner, le garder et le faire croître — pour que la liberté devienne un plan.",
    lede: "Money gets three jobs here — earn, keep, grow — and the essays train each in turn: a budget that survives real life, the emergency fund that keeps the plan unbreakable, investing from zero, and the honest ones on debt, the paycheck trap and the daily price of freedom. No get-rich shortcuts; the tone is boring on purpose.",
    ledeFr: "L'argent a ici trois métiers — gagner, garder, faire croître — et les essais entraînent chacun à tour de rôle : un budget qui survit à la vraie vie, le fonds d'urgence qui rend le plan incassable, investir en partant de zéro, et les textes sans complaisance sur la dette, le piège du salaire et le prix quotidien de la liberté. Aucune recette miracle ; le ton est volontairement ennuyeux.",
  },
  {
    id: "relationships",
    title: "Relationships",
    titleFr: "Relations",
    description: "No one climbs alone. We practice the art of connection — family, friendship and love as daily disciplines.",
    descriptionFr: "Personne ne grimpe seul. Nous pratiquons l'art du lien — la famille, l'amitié et l'amour comme disciplines quotidiennes.",
    lede: "Connection as a daily discipline: the five-minute habits that keep friendships alive, the fights that don't break things, the boundaries that are love in action, and the attachment styles behind your defaults. Start with the argument of the hub — love is a practice, not a feeling — then pick the piece that matches your friction.",
    ledeFr: "Le lien comme discipline quotidienne : les habitudes de cinq minutes qui maintiennent les amitiés vivantes, les disputes qui ne cassent rien, les limites qui sont de l'amour en action, et les styles d'attachement derrière vos réflexes. Commencez par l'argument du thème — l'amour est une pratique, pas une sensation — puis choisissez le texte qui correspond à votre friction.",
  },
  {
    id: "wellness",
    title: "Wellness",
    titleFr: "Bien-être",
    description: "Calm is a superpower. Breath, sleep and stillness — the quiet practices that keep the mind clear and the heart steady.",
    descriptionFr: "Le calme est un superpouvoir. Souffle, sommeil et silence — les pratiques discrètes qui gardent l'esprit clair et le cœur stable.",
    lede: "Four levers, eight essays: sleep — the 60-day tracking experiment — breath, with the two-minute reset, movement, daily over perfect, and screens, the detox case. The nervous-system essays explain why calm outperforms talent; the rest essay reframes recovery as a decision. Start with the sleep experiment — it is the most data-dense of the bunch.",
    ledeFr: "Quatre leviers, huit essais : le sommeil — l'expérience de suivi sur 60 jours — le souffle, avec la réinitialisation en deux minutes, le mouvement, quotidien plutôt que parfait, et les écrans, le plaidoyer du detox. Les essais sur le système nerveux expliquent pourquoi le calme surpasse le talent ; l'essai sur le repos reformule la récupération comme une décision. Commencez par l'expérience sommeil — le plus riche en données de la série.",
  },
];