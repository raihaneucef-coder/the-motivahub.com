import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'src/content/blog';
const ARTICLES_FR_PATH = 'public/i18n/articles-fr.json';

const blogFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

const entries = {};

for (const file of blogFiles) {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const slug = file.replace(/\.md$/, '');

  const titleFrMatch = content.match(/^titleFr: "(.+)"$/m);
  const descFrMatch = content.match(/^descriptionFr: "(.+)"$/m);

  if (titleFrMatch && titleFrMatch[1]) {
    entries[`article_${slug}_title`] = titleFrMatch[1];
  }
  if (descFrMatch && descFrMatch[1]) {
    entries[`article_${slug}_description`] = descFrMatch[1];
  }
}

const articlesFr = JSON.parse(fs.readFileSync(ARTICLES_FR_PATH, 'utf8'));
const updated = { ...articlesFr, ...entries };

fs.writeFileSync(ARTICLES_FR_PATH, JSON.stringify(updated, null, 2), 'utf8');
console.log(`Added ${Object.keys(entries).length} entries to articles-fr.json`);
