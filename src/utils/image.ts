import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGE_DIR = path.join(process.cwd(), 'public');
const DIMENSIONS_CACHE = new Map<string, { width: number; height: number }>();

export async function getImageDimensions(imagePath: string): Promise<{ width: number; height: number }> {
  if (DIMENSIONS_CACHE.has(imagePath)) {
    return DIMENSIONS_CACHE.get(imagePath)!;
  }

  const fullPath = path.join(IMAGE_DIR, imagePath);

  if (!fs.existsSync(fullPath)) {
    return { width: 1200, height: 630 };
  }

  try {
    const metadata = await sharp(fullPath).metadata();
    const dimensions = {
      width: metadata.width || 1200,
      height: metadata.height || 630,
    };
    DIMENSIONS_CACHE.set(imagePath, dimensions);
    return dimensions;
  } catch {
    return { width: 1200, height: 630 };
  }
}
