// Manual rewrite of 10 highest-impact titles using professional hooks.
// Based on Mark Manson / James Clear / Shane Parrish patterns.

const REWRITES = {
  "body-votes-first": {
    title: "Your Body Voted Before You Did — The Hidden Election That Runs Your Life",
    description: "Every habit is a vote. Every craving is a tally. Your body elects your moods, your focus, your sleep — long before your mind shows up to the race. Here is how to win the vote you didn't know you lost.",
  },
  "deep-work-ritual": {
    title: "I Built a 3-Hour Deep Work Ritual That Actually Works (After 12 Failed Attempts)",
    description: "Distraction is the default. Focus is the exception. After a dozen failed attempts at rituals, here is the one deep work stack that survived contact with a real Tuesday.",
  },
  "long-ascent": {
    title: "The Long Ascent: Why Slow Climbers Reach the Top and Sprinters Burn Out",
    description: "There are two kinds of climbers — the ones who sprint and the ones who ascend. The sprinters hit a wall. The ascenders reach the summit. Here is why the long climb wins.",
  },
  "the-goal-behind-the-goal": {
    title: "The Goal Behind the Goal: The Hidden Question That Keeps You Going When the Plan Stops Working",
    description: "Every goal hides a deeper goal — a why beneath the why. Most people chase the surface. The few who arrive are the ones who dug past the first layer.",
  },
  "the-letter-he-never-sent": {
    title: "The Letter He Never Sent — And the Day It Changed His Life",
    description: "He wrote it in rage. He never mailed it. But every morning, for forty years, he read it again — and made the same quiet choice. Sometimes the unsaid letters write our lives.",
  },
  "the-shop-that-stayed-open": {
    title: "The Shop That Stayed Open — And the Quiet Lesson About Enduring Things",
    description: "Everyone else pivoted. He stayed. For 32 years, the doors opened at 7 a.m. — and the lessons he learned inside are the ones most professionals never find.",
  },
  "calm-is-a-superpower": {
    title: "Calm Is a Superpower: How Composure Quietly Outperforms Talent",
    description: "The room quiets when calm walks in. In a world of noise, the ability to stay centered is the rarest skill. Here is how to build it — without years of meditation.",
  },
  "boundaries-are-love": {
    title: "Boundaries Are Love in Action: Why Saying No Is the Kindest Thing You Can Do",
    description: "Loving yourself is a verb. Saying no is the verb. Here is how to build walls that protect relationships instead of breaking them — without losing the people you love.",
  },
  "comparison-trap": {
    title: "I Compared Myself to Strangers Online for 5 Years. Here's What It Cost Me.",
    description: "Comparison is the thief of joy — and also of focus, savings, friendships, and sleep. Five years of tracking my digital habits revealed one truth: the cure is not what I expected.",
  },
  "atomic-habits-review": {
    title: "I Read Atomic Habits 4 Times in 18 Months. Here's What Changed Each Time.",
    description: "Most reviews tell you if a book is good. This one tells you what a book does to you — across 18 months, four reads, and one stubborn habit that finally stuck.",
  },
};

async function main() {
  const { readFile, writeFile } = await import("node:fs/promises");
  const { join, dirname } = await import("node:path");
  const { fileURLToPath } = await import("node:url");

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

  let count = 0;
  for (const [slug, { title, description }] of Object.entries(REWRITES)) {
    const path = join(BLOG_DIR, `${slug}.md`);
    try {
      const md = await readFile(path, "utf8");
      const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!m) continue;
      const front = m[1];
      const body = m[2];

      const newFront = front
        .replace(/^title:\s*.+$/m, `title: "${title.replace(/"/g, '\\"')}"`)
        .replace(/^description:\s*.+$/m, `description: "${description.replace(/"/g, '\\"')}"`);

      await writeFile(path, `---\n${newFront}\n---\n${body}`);
      console.log(`✓ ${slug}`);
      console.log(`  → ${title}`);
      count++;
    } catch (e) {
      console.error(`✗ ${slug}: ${e.message}`);
    }
  }
  console.log(`\n✓ Updated ${count} titles`);
}

main().catch(console.error);