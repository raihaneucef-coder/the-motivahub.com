// Smart title rewriter using 5 proven patterns from top motivation sites.
// Generates FR + EN variants, preserves slug intent, avoids generic output.
// Usage:
//   node scripts/rewrite-titles-v2.mjs        # dry run
//   node scripts/rewrite-titles-v2.mjs --apply # commit

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");
const APPLY = process.argv.includes("--apply");

const SLUG_HINTS = {
  habit: { topic: "habits", en: "Habits", fr: "Habitudes", verb: { en: "built", fr: "bâti" } },
  discipline: { topic: "discipline", en: "Discipline", fr: "Discipline", verb: { en: "stayed disciplined", fr: "tenais ma discipline" } },
  morning: { topic: "morning routine", en: "Morning Routine", fr: "Routine matinale", verb: { en: "started", fr: "ai commencé" } },
  atomic: { topic: "atomic habits", en: "Atomic Habits", fr: "Atomic Habits", verb: { en: "read", fr: "lu" } },
  focus: { topic: "focus", en: "Focus", fr: "Focus", verb: { en: "focused", fr: "concentré" } },
  productivity: { topic: "productivity", en: "Productivity", fr: "Productivité", verb: { en: "shipped", fr: "livré" } },
  procrastin: { topic: "procrastination", en: "Procrastination", fr: "Procrastination", verb: { en: "stopped procrastinating", fr: "arréter" } },
  pomodoro: { topic: "pomodoro", en: "Pomodoro", fr: "Pomodoro", verb: { en: "tried", fr: "essayé" } },
  deep_work: { topic: "deep work", en: "Deep Work", fr: "Travail profond", verb: { en: "focused", fr: "concentré" } },
  mindset: { topic: "mindset", en: "Mindset", fr: "État d'esprit", verb: { en: "rewired", fr: "recâblé" } },
  goal: { topic: "goals", en: "Goals", fr: "Objectifs", verb: { en: "set", fr: "fixé" } },
  fitness: { topic: "fitness", en: "Fitness", fr: "Fitness", verb: { en: "trained", fr: "entraîné" } },
  nutrition: { topic: "nutrition", en: "Nutrition", fr: "Nutrition", verb: { en: "ate", fr: "mangé" } },
  sleep: { topic: "sleep", en: "Sleep", fr: "Sommeil", verb: { en: "slept", fr: "dormi" } },
  travel: { topic: "travel", en: "Travel", fr: "Voyage", verb: { en: "traveled", fr: "voyagé" } },
  money: { topic: "money", en: "Money", fr: "Argent", verb: { en: "saved", fr: "épargné" } },
  invest: { topic: "investing", en: "Investing", fr: "Investir", verb: { en: "invested", fr: "investi" } },
  conflict: { topic: "conflict", en: "Conflict", fr: "Conflit", verb: { en: "resolved", fr: "résolu" } },
  relation: { topic: "relationships", en: "Relationships", fr: "Relations", verb: { en: "built", fr: "construit" } },
  stoic: { topic: "stoicism", en: "Stoicism", fr: "Stoïcisme", verb: { en: "practiced", fr: "pratiqué" } },
  success: { topic: "success", en: "Success", fr: "Succès", verb: { en: "achieved", fr: "atteint" } },
  confidence: { topic: "confidence", en: "Confidence", fr: "Confiance", verb: { en: "built", fr: "bâti" } },
  fear: { topic: "fear", en: "Fear", fr: "Peur", verb: { en: "faced", fr: "affronté" } },
  failure: { topic: "failure", en: "Failure", fr: "Échec", verb: { en: "recovered", fr: "récupéré" } },
  story: { topic: "story", en: "Story", fr: "Histoire", verb: { en: "lived", fr: "vécu" } },
  system: { topic: "systems", en: "Systems", fr: "Systèmes", verb: { en: "built", fr: "construit" } },
  email: { topic: "communication", en: "Communication", fr: "Communication", verb: { en: "wrote", fr: "écrit" } },
  book: { topic: "books", en: "Books", fr: "Livres", verb: { en: "read", fr: "lu" } },
  sleep: { topic: "sleep", en: "Sleep", fr: "Sommeil", verb: { en: "slept", fr: "dormi" } },
  medit: { topic: "meditation", en: "Meditation", fr: "Méditation", verb: { en: "sat", fr: "médité" } },
  journal: { topic: "journaling", en: "Journaling", fr: "Journaling", verb: { en: "wrote", fr: "écrit" } },
  gratitude: { topic: "gratitude", en: "Gratitude", fr: "Gratitude", verb: { en: "practiced", fr: "pratiqué" } },
  emotion: { topic: "emotions", en: "Emotions", fr: "Émotions", verb: { en: "mastered", fr: "maîtrisé" } },
  social: { topic: "social skills", en: "Social Skills", fr: "Compétences sociales", verb: { en: "improved", fr: "amélioré" } },
};

const STOP_WORDS = new Set(["the", "a", "an", "and", "or", "but", "for", "to", "of", "in", "on", "with", "how", "why", "what", "le", "la", "les", "un", "une", "des", "de", "du", "au", "et", "à", "pour", "avec", "comment", "pourquoi"]);

function detectSlugHint(slug) {
  const s = slug.toLowerCase();
  for (const [k, v] of Object.entries(SLUG_HINTS)) {
    if (s.includes(k)) return v;
  }
  return null;
}

const FR_RE = /\b(le|la|les|des|d'|un|une|du|et|est|sont|pour|avec|dans|sur|sans|comment|pourquoi|etre|avoir|faire|aller|vaincre|casser|arreter|trouver|choisir|investir|vivre|vie|mort|temps|argent|travail|force|puissance|matin|soir|journee|etre|mental|mentale|discipline|habitude|regle|productivite|reussite|echec|objectif|objectifs|vaincre|gagner|perdre)\b/i;

function isFrench(text) {
  return FR_RE.test(text);
}

function isReview(slug) {
  return /review|revue|test/.test(slug.toLowerCase());
}

function isHowTo(slug, title) {
  return /^how[- ]to|comment[- ]/.test(slug) || /how to|comment/.test(title.toLowerCase());
}

function isStory(slug) {
  return /story|histoires|^the/.test(slug.toLowerCase());
}

function scoreTitle(title) {
  let s = 0;
  const len = title.length;
  if (len >= 30 && len <= 60) s += 20;
  else if (len > 80) s -= 10;
  if (/\b\d+\b/.test(title)) s += 15;
  if (/[:—–-]/.test(title)) s += 8;
  if (/^(how|why|what|when|who|comment|pourquoi)/i.test(title)) s += 10;
  if (/\b(i|my|me|je|mon|ma|mes)\b/i.test(title)) s += 12;
  if (/\b(days?|weeks?|months?|years?|minutes?|hours?|jours|semaines|mois|ans|minutes|heures)\b/i.test(title)) s += 12;
  if (/^(the|a|an)\s/i.test(title)) s -= 3;
  if (/\b(tips|things|ways|ideas|astuces|conseils)\b/i.test(title)) s -= 5;
  return s;
}

function rewriteTitle(currentTitle, topic, slug) {
  const hint = detectSlugHint(slug);
  const fr = isFrench(currentTitle) || isFrench(slug);
  const review = isReview(slug);
  const howto = isHowTo(slug, currentTitle);
  const story = isStory(slug);

  if (review) {
    const cleaned = currentTitle.replace(/^(book review|test|review|revue|complète|complete):?\s*/i, "").split(/[—–-]/)[0].trim();
    const book = cleaned.length > 30 ? cleaned.split(":")[0].trim() : cleaned;
    return fr ? [
      `${book} — La vérité que personne ne vous dit`,
      `Pourquoi ${book} a changé ma vision (et pourrait changer la vôtre)`,
      `${book}: Ce qui se passe après 30 jours de pratique`,
    ] : [
      `${book} — The Truth Most Reviews Won't Tell You`,
      `Why ${book} Changed My Mind (And Might Change Yours)`,
      `${book}: What Happens After 30 Days of Practice`,
    ];
  }

  if (howto) {
    const base = currentTitle.replace(/^(how to|comment)\s+/i, "");
    return fr ? [
      `J'ai essayé ${base.toLowerCase()} pendant 30 jours. Voici ce qui s'est passé.`,
      `${currentTitle} — Sans le bullshit habituel`,
      `Comment ${base.toLowerCase()} (la méthode qui marche vraiment)`,
    ] : [
      `I Tried ${base} for 30 Days. Here's What Actually Happened.`,
      `${currentTitle} — Without the Usual BS`,
      `How to Actually ${base} (The Method That Works)`,
    ];
  }

  if (story && hint) {
    return fr ? [
      `${currentTitle.replace(/^(the|le|la|les)\s+/i, "")} — La leçon que personne ne raconte`,
      `L'histoire que vous n'avez jamais entendue sur ${hint.fr.toLowerCase()}`,
      `${currentTitle} — Et ce qu'elle m'a appris sur la vie`,
    ] : [
      `${currentTitle.replace(/^(the|a|an)\s+/i, "")} — The Lesson Nobody Talks About`,
      `The Story You've Never Heard About ${hint.en}`,
      `${currentTitle} — And What It Taught Me About Life`,
    ];
  }

  const t = hint?.en || topic || "this";
  const tf = hint?.fr || topic || "ça";
  const verb = hint?.verb?.en || "built";
  const verbf = hint?.verb?.fr || "construire";

  return fr ? [
    `J'ai ${verbf} ${tf.toLowerCase()} pendant 30 jours. Voici la règle qui a tout changé.`,
    `Ce que les meilleurs savent sur ${tf.toLowerCase()} (et que vous ne savez pas encore)`,
    `La règle sur ${tf.toLowerCase()} que j'aurais aimé connaître plus tôt`,
  ] : [
    `I ${verb} ${t.toLowerCase()} for 30 days. Here's the one rule that changed everything.`,
    `What top performers know about ${t.toLowerCase()} that you do not know yet`,
    `The ${t.toLowerCase()} rule I wish I had known sooner — and how to start today`,
  ];
}

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return m ? { front: m[1], body: m[2] } : null;
}

function getYamlValue(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  return m ? m[1].replace(/^['"]|['"]$/g, "") : null;
}

function setScalarField(front, key, value) {
  const re = new RegExp(`^${key}:\\s*.*$`, "m");
  if (re.test(front)) return front.replace(re, `${key}: "${value.replace(/"/g, '\\"')}"`);
  return front.replace(/\s*$/, "") + `\n${key}: "${value.replace(/"/g, '\\"')}"\n`;
}

async function main() {
  const files = (await readdir(BLOG_DIR, { withFileTypes: true }))
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name);

  const THRESHOLD = 30;
  let rewritten = 0, skipped = 0, kept = 0;

  console.log(APPLY ? "\n✓ APPLY MODE\n" : "DRY RUN — use --apply to commit\n");

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const md = await readFile(join(BLOG_DIR, file), "utf8");
    const parsed = parseFrontmatter(md);
    if (!parsed) { skipped++; continue; }
    const title = getYamlValue(parsed.front, "title");
    const topic = getYamlValue(parsed.front, "topic") || "";
    if (!title) { skipped++; continue; }

    const score = scoreTitle(title);
    if (score >= THRESHOLD) { kept++; continue; }

    const candidates = rewriteTitle(title, topic, slug);
    const best = candidates[0];
    const newScore = scoreTitle(best);

    if (newScore > score) {
      console.log(`[${score}→${newScore}] ${title}`);
      console.log(`  → ${best}`);
      console.log("");
      if (APPLY) {
        const newFront = setScalarField(parsed.front, "title", best);
        const newMd = `---\n${newFront}\n---\n${parsed.body}`;
        await writeFile(join(BLOG_DIR, file), newMd);
        rewritten++;
      }
    } else {
      skipped++;
    }
  }

  console.log(APPLY
    ? `✓ Rewritten: ${rewritten}, skipped: ${skipped}, kept (already strong): ${kept}`
    : `Dry run done. Rewrites: ~${rewritten}, kept: ${kept}. Use --apply to commit.`);
}

main().catch((e) => { console.error(e); process.exit(1); });