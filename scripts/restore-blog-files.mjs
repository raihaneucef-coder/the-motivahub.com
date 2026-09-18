import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const BLOG_DIR = 'src/content/blog';
const RESTORE_COMMIT = '70f28cc';
const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

const enRestore = [];
const whitespaceClean = [];

for (const file of files) {
  const filePath = path.join(BLOG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  const titleFrMatch = content.match(/^titleFr: "(.+)"$/m);
  const descFrMatch = content.match(/^descriptionFr: "(.+)"$/m);
  
  if (titleFrMatch && descFrMatch) {
    enRestore.push(file);
  } else {
    whitespaceClean.push(file);
  }
}

console.log(`EN restore files: ${enRestore.length}`);
console.log(`Whitespace clean files: ${whitespaceClean.length}`);
console.log(`Total: ${enRestore.length + whitespaceClean.length}`);

// Verify counts
if (enRestore.length + whitespaceClean.length !== files.length) {
  console.error('ERROR: Count mismatch!');
  process.exit(1);
}

// Step 1: Restore EN title/description for 106 files
console.log('\n=== Restoring EN title/description for 106 files ===');
let restored = 0;
for (const file of enRestore) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Get original title and description from 70f28cc
  const originalContent = execSync(`git show ${RESTORE_COMMIT}:${filePath}`, { encoding: 'utf8' });
  const originalTitle = originalContent.match(/^title: "(.+)"$/m)?.[1];
  const originalDesc = originalContent.match(/^description: "(.+)"$/m)?.[1];
  
  if (!originalTitle || !originalDesc) {
    console.error(`ERROR: Could not find title/description in ${file}`);
    continue;
  }
  
  // Replace title and description, keep titleFr and descriptionFr
  const lines = content.split('\n');
  const newLines = [];
  let titleFound = false;
  let descFound = false;
  
  for (const line of lines) {
    if (line.startsWith('title: ') && !titleFound) {
      newLines.push(`title: "${originalTitle}"`);
      titleFound = true;
    } else if (line.startsWith('description: ') && !descFound) {
      newLines.push(`description: "${originalDesc}"`);
      descFound = true;
    } else {
      newLines.push(line);
    }
  }
  
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
  restored++;
}

console.log(`Restored ${restored} files`);

// Step 2: Clean whitespace for 63 files
console.log('\n=== Cleaning whitespace for 63 files ===');
let cleaned = 0;
for (const file of whitespaceClean) {
  const filePath = path.join(BLOG_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove blank lines between description: and pubDate:
  const lines = content.split('\n');
  const newLines = [];
  let foundDescription = false;
  let blankCount = 0;
  
  for (const line of lines) {
    if (line.startsWith('description: ')) {
      foundDescription = true;
      newLines.push(line);
    } else if (foundDescription && line.trim() === '') {
      blankCount++;
      if (blankCount <= 1) {
        newLines.push(line);
      }
      // Skip extra blank lines
    } else {
      if (foundDescription && blankCount > 1 && line.trim() !== '') {
        // We've moved past the blank lines
      }
      newLines.push(line);
      if (foundDescription && line.trim() !== '') {
        foundDescription = false;
        blankCount = 0;
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

console.log('\n=== Restoration Complete ===');
console.log(`Total files modified: ${restored + cleaned}`);
