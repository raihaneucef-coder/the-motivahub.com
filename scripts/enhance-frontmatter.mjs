// Auto-enhance frontmatter: adds wordCount, keywords, tags to every blog post.
// Safe, idempotent — preserves existing values.
// Usage: node scripts/enhance-frontmatter.mjs

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

const STOPWORDS = new Set([
  "the","a","an","and","or","but","if","of","at","by","for","with","about","against","between","into",
  "through","during","before","after","above","below","to","from","up","down","in","out","on","off",
  "over","under","again","further","then","once","here","there","when","where","why","how","all","any",
  "both","each","few","more","most","other","some","such","no","nor","not","only","own","same","so",
  "than","too","very","can","will","just","don","should","now","this","that","these","those","is","are",
  "was","were","be","been","being","have","has","had","having","do","does","did","doing","i","you","he",
  "she","it","we","they","them","their","your","my","our","his","her","its","me","us","him","what",
  "which","who","whom","as","like","also","one","two","three","four","five","six","seven","eight","nine",
  "ten","—","–","-","\"","'","``","''","…"," ","","s","t","d","ll","re","ve","m"
]);

function countWords(md) {
  const stripped = md
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`\[\](){}|]/g, " ");
  const tokens = stripped.toLowerCase().split(/[^a-zà-ÿœ]+/i).filter(Boolean);
  return tokens.length;
}

function extractKeywords(title, description, md) {
  const text = (title + " " + description + " " + md.replace(/^---[\s\S]*?---/, "").replace(/<[^>]+>/g, " ")).toLowerCase();
  const tokens = text.split(/[^a-zà-ÿœ]+/i).filter((t) => t.length > 3 && !STOPWORDS.has(t));
  const freq = new Map();
  for (const t of tokens) freq.set(t, (freq.get(t) || 0) + 1);
  return [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);
}

function extractTopicTags(topic, title) {
  const tags = [topic.toLowerCase()];
  const titleLower = title.toLowerCase();
  const t = topic.toLowerCase();
  if (t === "habits" || titleLower.includes("habit")) tags.push("habits");
  if (t === "discipline" || titleLower.includes("discipline")) tags.push("discipline");
  if (t === "mindset" || titleLower.includes("mindset")) tags.push("mindset");
  if (titleLower.includes("review") || titleLower.includes("revue") || titleLower.includes("test")) tags.push("review");
  if (titleLower.includes("guide") || titleLower.includes("complete") || titleLower.includes("complet")) tags.push("guide");
  if (titleLower.includes("how to") || titleLower.includes("comment")) tags.push("how-to");
  if (titleLower.includes("story") || titleLower.includes("histoire")) tags.push("story");
  if (titleLower.includes("morning") || titleLower.includes("matin")) tags.push("morning-routine");
  if (titleLower.includes("travel") || titleLower.includes("voyage")) tags.push("travel");
  return [...new Set(tags)].slice(0, 6);
}

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  return { front: m[1], body: m[2], full: md };
}

function getYamlValue(front, key) {
  const re = new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m");
  const m = front.match(re);
  if (!m) return null;
  return m[1].replace(/^['"]|['"]$/g, "");
}

function getTitleAndDesc(front) {
  const title = getYamlValue(front, "title") || "";
  const desc = getYamlValue(front, "description") || "";
  return { title, desc };
}

function arrayField(front, key) {
  const re = new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.+\\n?)+)`, "m");
  const m = front.match(re);
  if (!m) return null;
  const items = [...m[1].matchAll(/^\s+-\s+(.+?)\s*$/gm)].map((x) => x[1].replace(/^['"]|['"]$/g, ""));
  return items;
}

function setArrayField(front, key, items) {
  const re = new RegExp(`^${key}:\\s*\\n((?:\\s+-\\s+.+\\n?)+)`, "m");
  const block = `\n${items.map((i) => `  - "${i.replace(/"/g, '\\"')}"`).join("\n")}\n`;
  if (re.test(front)) {
    return front.replace(re, `${key}:${block}`);
  }
  return front.replace(/\s*$/, "") + `\n${key}:${block}`;
}

function setScalarField(front, key, value) {
  const re = new RegExp(`^${key}:\\s*.*$`, "m");
  if (re.test(front)) {
    return front.replace(re, `${key}: ${value}`);
  }
  return front.replace(/\s*$/, "") + `\n${key}: ${value}\n`;
}

async function main() {
  const files = (await readdir(BLOG_DIR, { withFileTypes: true })).filter((e) => e.isFile() && e.name.endsWith(".md")).map((e) => e.name);
  console.log(`Found ${files.length} posts`);

  let updated = 0, skipped = 0, errors = 0;

  for (const file of files) {
    const path = join(BLOG_DIR, file);
    try {
      const md = await readFile(path, "utf8");
      const parsed = parseFrontmatter(md);
      if (!parsed) { skipped++; continue; }

      const { front, body } = parsed;
      const { title, desc } = getTitleAndDesc(front);
      const topic = getYamlValue(front, "topic") || "";

      const hasKeywords = !!arrayField(front, "keywords");
      const hasTags = !!arrayField(front, "tags");
      const hasWordCount = !!getYamlValue(front, "wordCount");

      const wordCount = countWords(parsed.full);
      const keywords = extractKeywords(title, desc, parsed.full);
      const tags = extractTopicTags(topic, title);

      let newFront = front;

      if (!hasKeywords && keywords.length) {
        newFront = setArrayField(newFront, "keywords", keywords);
      }
      if (!hasTags && tags.length) {
        newFront = setArrayField(newFront, "tags", tags);
      }
      if (!hasWordCount) {
        newFront = setScalarField(newFront, "wordCount", wordCount);
      }

      if (newFront !== front) {
        const newMd = `---\n${newFront}\n---\n${body}`;
        await writeFile(path, newMd,);
        updated++;
      } else {
        skipped++;
      }
    } catch (e) {
      errors++;
      console.error(`✗ ${file}: ${e.message}`);
    }
  }

  console.log(`✓ Updated: ${updated}, skipped: ${skipped}, errors: ${errors}`);
}

main().catch((e) => { console.error(e); process.exit(1); });