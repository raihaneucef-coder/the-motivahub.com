// Title Analyzer + Suggestion Engine.
// Reads all blog posts, scores current titles, suggests improvements.
// Usage: node scripts/analyze-titles.mjs

import { readdir, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

const POWER_WORDS = ["secret","truth","proven","ultimate","essential","powerful","revealed","discover","master","transform","breakthrough","elite","foolproof","guaranteed","instantly","rapidly","effortless","definitive","complete","insider","expert"];
const EMOTION_WORDS = ["love","hate","fear","joy","pain","desire","dream","obsess","struggle","failure","success","win","lose","fight","crush","destroy","unleash","ignite"];
const NUMERIC_RE = /\b\d+\b/;
const QUESTION_RE = /^how|why|what|when|where|who|is|are|do|does|can|should/i;
const FIRST_PERSON = /\b(i|my|me|we|our)\b/i;
const SPECIFICITY_RE = /\b(days?|weeks?|months?|years?|minutes?|hours?|kg|lbs|miles|km|percent|%|\$)\b/i;
const COLON_RE = /[:—–-]/;

function score(title) {
  let s = 0;
  const t = title.toLowerCase();
  const len = title.length;

  // Length (sweet spot 30-60)
  if (len >= 30 && len <= 60) s += 20;
  else if (len < 30) s -= 5;
  else if (len > 80) s -= 10;

  // Number in title (CTR boost)
  if (NUMERIC_RE.test(title)) s += 15;

  // Power words
  for (const w of POWER_WORDS) if (t.includes(w)) s += 8;

  // Emotion words
  for (const w of EMOTION_WORDS) if (t.includes(w)) s += 5;

  // Questions
  if (QUESTION_RE.test(title)) s += 10;

  // First person (story)
  if (FIRST_PERSON.test(title)) s += 10;

  // Specificity (numbers, time, etc.)
  if (SPECIFICITY_RE.test(title)) s += 12;

  // Has colon (specific promise)
  if (COLON_RE.test(title)) s += 8;

  // Weak patterns
  if (/^(the|a|an)\s/i.test(title)) s -= 3;
  if (/\b(tips|things|ways|ideas)\b/i.test(title)) s -= 5; // overused

  return s;
}

function suggest(topic, slug, currentTitle) {
  const topicLower = topic.toLowerCase();
  const slugLower = slug.toLowerCase();
  const isReview = /review|revue|test/.test(slugLower);

  const suggestions = [];

  // Pattern: "How I [did X] in [Y]"
  if (slugLower.includes("habit")) suggestions.push("How I Built a Habit That Actually Stuck (And Why Most Fail)");
  if (slugLower.includes("discipline")) suggestions.push("I Tried to Be Disciplined for 30 Days — Here's What Changed");
  if (slugLower.includes("morning")) suggestions.push("The 5-Minute Morning Habit That Changed My Life");
  if (slugLower.includes("focus")) suggestions.push("How to Focus Like a Top Performer (When You Have Nothing Left)");
  if (slugLower.includes("atomic")) suggestions.push("Atomic Habits — What Most People Get Wrong");
  if (slugLower.includes("productiv")) suggestions.push("I Tested 10 Productivity Methods. Only 3 Worked.");
  if (slugLower.includes("pomodoro")) suggestions.push("Why Pomodoro Stopped Working for Me (And What I Do Instead)");
  if (slugLower.includes("procrastin")) suggestions.push("I Stopped Procrastinating for 90 Days. The First Week Was the Hardest.");

  // Review pattern
  if (isReview) {
    const bookMatch = currentTitle.match(/^([A-Z][^—–-]+)/);
    const book = bookMatch ? bookMatch[1].trim() : currentTitle;
    suggestions.push(`${book} — The Truth Most Reviews Won't Tell You`);
    suggestions.push(`Why ${book} Changed My Mind (And Might Change Yours)`);
    suggestions.push(`${book}: What Changed After 30 Days`);
  }

  // Default patterns
  if (suggestions.length === 0) {
    suggestions.push(`The One ${topic} Rule I Wish I'd Known Sooner`);
    suggestions.push(`${topic}: What Top Performers Do Differently`);
    suggestions.push(`Why ${topic} Isn't Working for You (And the Fix)`);
  }

  return suggestions.slice(0, 3);
}

async function main() {
  const files = (await readdir(BLOG_DIR, { withFileTypes: true }))
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name);

  const results = [];
  for (const file of files) {
    const md = await readFile(join(BLOG_DIR, file), "utf8");
    const fm = md.match(/^---\n([\s\S]*?)\n---/);
    if (!fm) continue;
    const title = fm[1].match(/^title:\s*(.+?)\s*$/m)?.[1].replace(/^['"]|['"]$/g, "") || "";
    const topic = fm[1].match(/^topic:\s*(.+?)\s*$/m)?.[1].replace(/^['"]|['"]$/g, "") || "";
    const slug = file.replace(/\.md$/, "");
    const s = score(title);
    results.push({ slug, topic, title, score: s, suggestions: suggest(topic, slug, title) });
  }

  results.sort((a, b) => a.score - b.score);

  console.log("\n=== TOP 20 NEEDS WORK (lowest scores) ===\n");
  for (const r of results.slice(0, 20)) {
    console.log(`[${r.score}] ${r.title}`);
    console.log(`  slug: ${r.slug}`);
    console.log(`  suggestions:`);
    r.suggestions.forEach((s) => console.log(`    - ${s}`));
    console.log("");
  }

  console.log("\n=== TOP 20 ALREADY STRONG (highest scores) ===\n");
  for (const r of results.slice(-20)) {
    console.log(`[${r.score}] ${r.title}`);
  }

  const avg = results.reduce((a, r) => a + r.score, 0) / results.length;
  console.log(`\n=== AVERAGE SCORE: ${avg.toFixed(1)} ===`);
  console.log(`=== Below 30: ${results.filter((r) => r.score < 30).length} titles need work ===`);
  console.log(`=== Above 50: ${results.filter((r) => r.score >= 50).length} titles are strong ===`);
}

main().catch(console.error);