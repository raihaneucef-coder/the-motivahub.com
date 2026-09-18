import { execSync } from 'child_process';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const EXCLUDED_DIRS = ['.kilo', '.pilot-staging', 'raw-photos', 'tests/screenshots', 'dist'];
const MAX_HERO_WIDTH = 1600;
const MAX_ARTICLE_WIDTH = 800;
const JPEG_QUALITY = 82;
const PNG_COMPRESSION = 9;

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return output.split('\n').filter(Boolean);
  } catch (e) {
    console.error('Error getting staged files:', e.message);
    return [];
  }
}

function isExcluded(filePath) {
  const normalized = filePath.replace(/\\/g, '/');
  return EXCLUDED_DIRS.some(dir => normalized.includes(`/${dir}/`) || normalized.startsWith(`${dir}/`));
}

function getImageType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (['.jpg', '.jpeg'].includes(ext)) return 'jpeg';
  if (ext === '.png') return 'png';
  if (ext === '.webp') return 'webp';
  if (ext === '.avif') return 'avif';
  return null;
}

async function optimizeImage(filePath) {
  const stats = fs.statSync(filePath);
  const originalSize = stats.size;
  const imageType = getImageType(filePath);
  
  if (!imageType) {
    console.log(`  SKIP (not an image): ${filePath}`);
    return { changed: false, originalSize, newSize: originalSize };
  }

  try {
    const metadata = await sharp(filePath).metadata();
    const width = metadata.width || 0;
    
    // Determine max width based on path
    let maxWidth = MAX_HERO_WIDTH;
    if (filePath.includes('/blog/') || filePath.includes('/images/blog/')) {
      maxWidth = MAX_ARTICLE_WIDTH;
    }
    
    // Resize if needed
    let pipeline = sharp(filePath);
    if (width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      });
      console.log(`  RESIZE: ${width}px -> ${maxWidth}px`);
    }
    
    // Apply compression
    if (imageType === 'jpeg' || imageType === 'webp') {
      pipeline = pipeline.jpeg({ 
        quality: JPEG_QUALITY, 
        progressive: true,
        mozjpeg: true 
      });
    } else if (imageType === 'png') {
      pipeline = pipeline.png({ 
        quality: JPEG_QUALITY,
        compressionLevel: PNG_COMPRESSION,
        adaptiveFiltering: true
      });
    } else if (imageType === 'avif') {
      pipeline = pipeline.avif({ quality: JPEG_QUALITY });
    }
    
    const buffer = await pipeline.toBuffer();
    const newSize = buffer.length;
    
    // Only write if smaller
    if (newSize < originalSize) {
      fs.writeFileSync(filePath, buffer);
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log(`  ✓ ${filePath}: ${(originalSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (-${savings}%)`);
      return { changed: true, originalSize, newSize };
    } else {
      console.log(`  = ${filePath}: ${(originalSize/1024).toFixed(0)}KB (no improvement)`);
      return { changed: false, originalSize, newSize };
    }
  } catch (e) {
    console.error(`  ✗ Error processing ${filePath}:`, e.message);
    return { changed: false, originalSize, newSize: originalSize };
  }
}

async function main() {
  const stagedFiles = getStagedFiles();
  const imageFiles = stagedFiles.filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('No images to optimize in this commit.');
    process.exit(0);
  }

  console.log(`\n🔍 Found ${imageFiles.length} image(s) to optimize:\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let excludedCount = 0;

  for (const file of imageFiles) {
    if (isExcluded(file)) {
      console.log(`  ⚠️  EXCLUDED DIR: ${file} (should not be committed)`);
      excludedCount++;
      continue;
    }

    totalOriginal += fs.statSync(file).size;
    const result = await optimizeImage(file);
    totalOptimized += result.newSize;
  }

  console.log('\n--- Summary ---');
  console.log(`Total original: ${(totalOriginal/1024/1024).toFixed(2)} MB`);
  console.log(`Total optimized: ${(totalOptimized/1024/1024).toFixed(2)} MB`);
  
  if (totalOriginal > 0) {
    const savings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    console.log(`Savings: ${savings}%\n`);
  }

  if (excludedCount > 0) {
    console.log(`\n⚠️  WARNING: ${excludedCount} file(s) in excluded directories detected!`);
    console.log('These files should not be committed. Please review and remove them.');
    console.log('Excluded dirs: ' + EXCLUDED_DIRS.join(', '));
    process.exit(1);
  }

  process.exit(0);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
