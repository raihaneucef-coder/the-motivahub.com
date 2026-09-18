import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'src/content/blog';
const API_URL = 'https://api.mymemory.translated.net/get';

async function translate(text, langpair = 'en|fr') {
  const url = `${API_URL}?q=${encodeURIComponent(text)}&langpair=${langpair}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.responseStatus !== 200) throw new Error(data.responseDetails || 'Translation failed');
  return data.responseData.translatedText;
}

async function translateWithRetry(text, langpair = 'en|fr', maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await translate(text, langpair);
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
let translated = 0;
let skipped = 0;
let failed = 0;

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const titleMatch = content.match(/^title: "(.+)"$/m);
  const descMatch = content.match(/^description: "(.+)"$/m);
  const titleFrMatch = content.match(/^titleFr: "(.+)"$/m);
  const descFrMatch = content.match(/^descriptionFr: "(.+)"$/m);
  
  if (!titleMatch || !descMatch) {
    console.log(`SKIP ${file}: missing title or description`);
    skipped++;
    continue;
  }
  
  const title = titleMatch[1];
  const description = descMatch[1];
  
  if (titleFrMatch && titleFrMatch[1] !== '' && descFrMatch && descFrMatch[1] !== '') {
    console.log(`SKIP ${file}: already translated`);
    skipped++;
    continue;
  }
  
  try {
    const titleFr = titleFrMatch && titleFrMatch[1] !== '' ? titleFrMatch[1] : await translateWithRetry(title);
    const descriptionFr = descFrMatch && descFrMatch[1] !== '' ? descFrMatch[1] : await translateWithRetry(description);
    
    if (titleFrMatch) {
      content = content.replace(/^titleFr: ".+"$/m, `titleFr: "${titleFr.replace(/"/g, '\\"')}"`);
    } else {
      content = content.replace(/^description: ".+"$/m, `description: "${description}"\ntitleFr: "${titleFr.replace(/"/g, '\\"')}"`);
    }
    
    if (descFrMatch) {
      content = content.replace(/^descriptionFr: ".+"$/m, `descriptionFr: "${descriptionFr.replace(/"/g, '\\"')}"`);
    } else {
      content = content.replace(/^titleFr: ".+"$/m, `titleFr: "${titleFr.replace(/"/g, '\\"')}"\ndescriptionFr: "${descriptionFr.replace(/"/g, '\\"')}"`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`OK ${file}: ${titleFr}`);
    translated++;
    
    await new Promise(r => setTimeout(r, 10000));
  } catch (e) {
    console.error(`FAIL ${file}: ${e.message}`);
    failed++;
  }
}

console.log(`\nDone: ${translated} translated, ${skipped} skipped, ${failed} failed`);
