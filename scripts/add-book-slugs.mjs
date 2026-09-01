// Auto-add bookSlug to review posts based on slug heuristics.

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

const REVIEW_MAP = {
  "atomic-habits-review": "atomic-habits",
  "atomic-habits-revue-complete": "atomic-habits",
  "cant-hurt-me-review": "cant-hurt-me",
  "deep-work-ritual": "deep-work",
  "deep-work-focus": "deep-work",
  "regle-deux-minutes": "atomic-habits",
  "regle-2-min-productivite": "atomic-habits",
  "technique-pomodoro": "deep-work",
  "two-minute-threshold": "atomic-habits",
  "habitudes-mentales-performants": "atomic-habits",
  "histoires-reussite-product": null,
};

function getYamlValue(front, key) {
  const m = front.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, "m"));
  return m ? m[1].replace(/^['"]|['"]$/g, "") : null;
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
  let updated = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const bookSlug = REVIEW_MAP[slug];
    if (!bookSlug) continue;

    const path = join(BLOG_DIR, file);
    const md = await readFile(path, "utf8");
    const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) continue;

    const front = m[1];
    const body = m[2];
    const existing = getYamlValue(front, "bookSlug");
    if (existing) continue;

    const newFront = setScalarField(front, "bookSlug", bookSlug);
    const newMd = `---\n${newFront}\n---\n${body}`;
    await writeFile(path, newMd);
    updated++;
  }

  console.log(`✓ Updated ${updated} review posts with bookSlug`);
}

main().catch((e) => { console.error(e); process.exit(1); });