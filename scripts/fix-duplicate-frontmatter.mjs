import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'src/content/blog';
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
let fixed = 0;

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const titleFrMatches = content.match(/^titleFr: ".*"$/gm);
  const descFrMatches = content.match(/^descriptionFr: ".*"$/gm);
  
  if (titleFrMatches && titleFrMatches.length > 1) {
    const lastTitleFr = titleFrMatches[titleFrMatches.length - 1];
    content = content.replace(/^titleFr: ".*"$/gm, '');
    content = content.replace(/^---$/, '---\n' + lastTitleFr);
    fixed++;
  }
  
  if (descFrMatches && descFrMatches.length > 1) {
    const lastDescFr = descFrMatches[descFrMatches.length - 1];
    content = content.replace(/^descriptionFr: ".*"$/gm, '');
    const titleFrLine = content.match(/^titleFr: ".*"$/m);
    if (titleFrLine) {
      content = content.replace(/^titleFr: ".*"$/, titleFrLine[0] + '\n' + lastDescFr);
    } else {
      content = content.replace(/^---$/, '---\n' + lastDescFr);
    }
    fixed++;
  }
  
  if (content.match(/^titleFr: ".*"$/gm)?.length > 1 || content.match(/^descriptionFr: ".*"$/gm)?.length > 1) {
    console.log(`STILL DUPLICATE ${file}`);
  } else if (fixed > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`FIXED ${file}`);
  }
}

console.log(`\nTotal fixed: ${fixed}`);
