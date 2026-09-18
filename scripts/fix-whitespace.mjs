import fs from 'fs';
import path from 'path';

const BLOG_DIR = 'src/content/blog';
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

const whitespaceClean = [];

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Files without titleFr/descriptionFr need whitespace cleanup
  const titleFrMatch = content.match(/^titleFr: "(.+)"$/m);
  const descFrMatch = content.match(/^descriptionFr: "(.+)"$/m);
  
  if (!titleFrMatch || !descFrMatch) {
    whitespaceClean.push(file);
  }
}

console.log(`Whitespace clean files: ${whitespaceClean.length}`);

let cleaned = 0;
for (const file of whitespaceClean) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove ALL blank lines between description: and pubDate:
  const lines = content.split('\n');
  const newLines = [];
  let foundDescription = false;
  let blankBuffer = [];
  
  for (const line of lines) {
    if (line.startsWith('description: ')) {
      foundDescription = true;
      newLines.push(line);
    } else if (foundDescription && line.trim() === '') {
      blankBuffer.push(line);
    } else {
      if (foundDescription && blankBuffer.length > 0) {
        // Skip all blank lines - don't add any
        blankBuffer = [];
        foundDescription = false;
      }
      newLines.push(line);
      if (line.trim() !== '' && foundDescription === false && blankBuffer.length > 0) {
        // We've moved past the description section
      }
    }
  }
  
  const newContent = newLines.join('\n');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    cleaned++;
  }
}

console.log(`Cleaned ${cleaned} files`);
