import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

const HEALTH_DISCLAIMER = `
> **Medical Disclaimer**: I'm a writer sharing my own experience, not a doctor or certified health professional. The protocols described in this article are personal experiments, not medical advice. Consult your doctor before starting any new exercise, diet, or breathwork routine, especially if you have pre-existing conditions, injuries, or are pregnant. If something hurts, stop. What works for me may not work for you. Always work within your own capacity and adjust based on how your body responds.
`;

const AFFILIATE_DISCLOSURE = `
> **Affiliate Disclosure**: This article contains Amazon affiliate links. If you purchase through these links, I earn a small commission at no extra cost to you. I only recommend products I personally use or have tested. The price is always the same for you.
`;

const files = [
  "i-tested-12-morning-routines.md",
  "how-to-read-30-books-a-year.md",
  "slow-productivity-30-day-test.md",
  "nervous-system-reset-focus.md",
  "identity-based-habits-90-day-test.md",
  "the-morning-athlete.md",
];

for (const file of files) {
  const path = join(BLOG_DIR, file);
  try {
    let md = await readFile(path, "utf8");

    if (md.includes("Medical Disclaimer") || md.includes("Affiliate Disclosure")) {
      console.log(`OK ${file} already has disclaimers`);
      continue;
    }

    const isHealthRelated = /5 AM|workout|exercise|sleep|fitness|cardio|breathwork|nervous system|athlete/i.test(file);

    let insertBlock = AFFILIATE_DISCLOSURE;
    if (isHealthRelated) {
      insertBlock = HEALTH_DISCLAIMER + AFFILIATE_DISCLOSURE;
    }

    const fmEnd = md.indexOf("---", 3);
    if (fmEnd === -1) {
      console.log(`FAIL ${file} no frontmatter found`);
      continue;
    }

    md = md.slice(0, fmEnd + 3) + "\n" + insertBlock + md.slice(fmEnd + 3);

    await writeFile(path, md);
    console.log(`OK ${file} updated`);
  } catch (e) {
    console.error(`FAIL ${file}: ${e.message}`);
  }
}