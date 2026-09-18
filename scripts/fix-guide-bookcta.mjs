import fs from 'fs';

const filePath = 'src/pages/guides/atomic-habits-ultimate-guide.astro';
let content = fs.readFileSync(filePath, 'utf8');

// Find all BookCTA instances inside the Markdown template literal
const bookCtaTag = '<BookCTA bookSlug="atomic-habits" variant="primary" />';
const parts = content.split(bookCtaTag);

if (parts.length === 3) {
  const beforeFirst = parts[0];
  const between = parts[1];
  const afterSecond = parts[2];
  
  // beforeFirst ends with:     `} /></div>
  // We need to close the Markdown before the first BookCTA
  // The template literal is: content={`...<BookCTA...`
  // We want: content={`...`} /><BookCTA... /><Markdown content={`...`} /><BookCTA... /><Markdown content={`...`} /></div>
  
  // Find the last occurrence of the Markdown opening before the first split
  // The pattern is: <Markdown content={`...content...<BookCTA
  // We need to split at the BookCTA, closing the first Markdown and opening a new one
  
  const firstMarkdownEnd = beforeFirst.lastIndexOf('<Markdown content={`');
  const firstMarkdownStart = beforeFirst.substring(0, firstMarkdownEnd);
  const firstMarkdownContent = beforeFirst.substring(firstMarkdownEnd + '<Markdown content={`'.length);
  
  // firstMarkdownContent ends right before the BookCTA tag
  // We need to close it: `} />
  const part1 = firstMarkdownStart + '<Markdown content={`' + firstMarkdownContent + '`} />';
  
  // between starts right after first BookCTA and ends before second BookCTA
  // It starts with some content, we need to wrap it in a new Markdown
  // between ends right before the second BookCTA
  const part2 = '<Markdown content={`' + between + '`} />';
  
  // afterSecond starts right after second BookCTA and goes to the end
  // It contains the rest of the content including `} /></div>
  const part3 = '<Markdown content={`' + afterSecond;
  
  content = part1 + bookCtaTag + part2 + bookCtaTag + part3;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed BookCTA placement');
} else {
  console.log(`Expected 3 parts, got ${parts.length}`);
}
