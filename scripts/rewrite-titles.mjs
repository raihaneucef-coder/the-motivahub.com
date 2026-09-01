// Auto-rewrite weak titles using proven hook patterns.
// Only rewrites titles scoring < threshold.
// Usage: node scripts/rewrite-titles.mjs [--apply]

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");
const APPLY = process.argv.includes("--apply");

const TOPIC_MAP = {
  habits: { verb: "Built", object: "habits", result: "stuck", time: "90 Days", authority: "Top Performers" },
  discipline: { verb: "Stayed", object: "disciplined", result: "stronger", time: "30 Days", authority: "Navy SEALs" },
  productivity: { verb: "Got", object: "more done", result: "energized", time: "5 Hours", authority: "CEOs" },
  focus: { verb: "Focused", object: "deeply", result: "unstoppable", time: "3 Hours", authority: "Writers" },
  mindset: { verb: "Shifted", object: "my mindset", result: "unrecognizable", time: "60 Days", authority: "Champions" },
  goals: { verb: "Hit", object: "my goal", result: "dead", time: "12 Weeks", authority: "Olympians" },
  fitness: { verb: "Got", object: "fit", result: "energized", time: "90 Days", authority: "Athletes" },
  nutrition: { verb: "Fixed", object: "my diet", result: "clear-headed", time: "30 Days", authority: "Trainers" },
  motivation: { verb: "Got", object: "unshakable", result: "unstoppable", time: "21 Days", authority: "Champions" },
  stoicism: { verb: "Practiced", object: "stoicism", result: "unbreakable", time: "30 Days", authority: "Marcus Aurelius" },
  confidence: { verb: "Built", object: "confidence", result: "unshakeable", time: "30 Days", authority: "Performers" },
  success: { verb: "Built", object: "a real career", result: "fulfilled", time: "5 Years", authority: "Founders" },
  travel: { verb: "Traveled", object: "solo", result: "transformed", time: "60 Days", authority: "Travelers" },
  relationships: { verb: "Repaired", object: "a relationship", result: "deeper", time: "30 Days", authority: "Therapists" },
  wellness: { verb: "Reset", object: "my health", result: "energized", time: "30 Days", authority: "Doctors" },
  psychology: { verb: "Understood", object: "my mind", result: "clear", time: "60 Days", authority: "Psychologists" },
  stories: { verb: "Lived", object: "a story", result: "unforgettable", time: "1 Year", authority: "Heroes" },
  finance: { verb: "Saved", object: "$10K", result: "free", time: "12 Months", authority: "Millionaires" },
  entertainment: { verb: "Found", object: "real joy", result: "unplugged", time: "30 Days", authority: "Artists" },
};

function detectTopicKey(topic, slug) {
  const t = (topic || "").toLowerCase();
  const s = (slug || "").toLowerCase();
  for (const k of Object.keys(TOPIC_MAP)) {
    if (t.includes(k) || s.includes(k)) return k;
  }
  return "productivity";
}

function scoreTitle(title) {
  let s = 0;
  const t = title.toLowerCase();
  const len = title.length;
  if (len >= 30 && len <= 60) s += 20;
  else if (len > 80) s -= 10;
  if (/\b\d+\b/.test(title)) s += 15;
  if (/[:—–-]/.test(title)) s += 8;
  if (/^(how|why|what|when|who)/i.test(title)) s += 10;
  if (/\b(i|my|me)\b/i.test(title)) s += 10;
  if (/\b(days?|weeks?|months?|years?|minutes?|hours?)\b/i.test(title)) s += 12;
  if (/^(the|a|an)\s/i.test(title)) s -= 3;
  if (/\b(tips|things|ways|ideas)\b/i.test(title)) s -= 5;
  return s;
}

function rewriteTitle(currentTitle, topic, slug) {
  const topicKey = detectTopicKey(topic, slug);
  const m = TOPIC_MAP[topicKey];

  const slugLower = slug.toLowerCase();
  const isReview = /review|revue|test/.test(slugLower);
  const isHowTo = /^how-to-/.test(slugLower) || /comment-/.test(slugLower);

  if (isReview) {
    const book = currentTitle.replace(/^(book review|test|review|revue):?\s*/i, "").split(/[—–-]/)[0].trim();
    const bookShort = book.length > 30 ? book.split(":")[0].trim() : book;
    return [
      `${bookShort} — The Truth Most Reviews Won't Tell You`,
      `Why ${bookShort} Changed My Mind (And Might Change Yours)`,
      `${bookShort}: What Changed After 30 Days of Practice`,
    ];
  }

  if (isHowTo) {
    return [
      `${currentTitle.replace(/^how to\s+/i, "How to Actually ")} (Without the BS)`,
      `I Tried This for 30 Days. Here's What Actually Happened.`,
    ];
  }

  if (/story|histoires|histoires-/.test(slugLower)) {
    return [
      `The ${currentTitle.replace(/^(the|a|an)\s+/i, "")} — And What It Taught Me About Life`,
      `${currentTitle} — The Lesson Nobody Talks About`,
    ];
  }

  return [
    `I ${m.verb} ${m.object} for ${m.time}. Here's the One Rule That Changed Everything.`,
    `What ${m.authority} Know About ${topic} That You Don't (Yet)`,
    `The ${topic} Rule I Wish I'd Known Sooner — And How to Start Today`,
  ];
}

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2], full: md };
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
  let rewritten = 0, skipped = 0;

  console.log(APPLY ? "APPLY MODE: rewriting weak titles\n" : "DRY RUN: showing suggested rewrites\n");

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const md = await readFile(join(BLOG_DIR, file), "utf8");
    const parsed = parseFrontmatter(md);
    if (!parsed) { skipped++; continue; }
    const title = getYamlValue(parsed.front, "title");
    const topic = getYamlValue(parsed.front, "topic") || "";
    if (!title) { skipped++; continue; }

    const score = scoreTitle(title);
    if (score >= THRESHOLD) { skipped++; continue; }

    const suggestions = rewriteTitle(title, topic, slug);
    const best = suggestions[0];
    const newScore = scoreTitle(best);

    if (newScore > score) {
      console.log(`[${score} → ${newScore}] ${title}`);
      console.log(`  → ${best}`);
      console.log(`  slug: ${slug}`);
      console.log("");

      if (APPLY) {
        const newFront = setScalarField(parsed.front, "title", best);
        const newMd = `---\n${newFront}\n---\n${parsed.body}`;
        await writeFile(join(BLOG_DIR, file), newMd);
        rewritten++;
      }
    }
  }

  console.log(APPLY ? `\✓ Rewritten: ${rewritten}, skipped: ${skipped}` : `\nDry run complete. Use --apply to commit changes.`);
}

main().catch((e) => { console.error(e); process.exit(1); });