import sharp from 'sharp';
import fs from 'fs';

const input = 'public/images/hero-stoic-ascent.jpg';
const output = 'public/images/hero-stoic-ascent.webp';

async function convert() {
  const original = fs.statSync(input);
  const buffer = await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toBuffer();
  fs.writeFileSync(output, buffer);
  const converted = fs.statSync(output);
  console.log(`Original: ${(original.size / 1024).toFixed(1)}KB`);
  console.log(`WebP: ${(converted.size / 1024).toFixed(1)}KB`);
  console.log(`Saved: ${((1 - converted.size / original.size) * 100).toFixed(1)}%`);
}

convert().catch(e => {
  console.error(e);
  process.exit(1);
});
