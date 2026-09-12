import fs from 'fs';
import path from 'path';
import https from 'https';

const APPROVED_MANIFEST = '/Users/youssefraihane/Documents/the-motivahub.com/.pilot-staging/exports/replacement-manifest-approved.json';
const STAGING_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/.pilot-staging';
const STAGING_IMAGES_DIR = path.join(STAGING_DIR, 'candidates', 'images');
const PROD_IMAGES_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/public/images/blog';
const ARTICLES_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/src/content/blog';
const PHOTO_CREDITS_PATH = '/Users/youssefraihane/Documents/the-motivahub.com/PHOTO-CREDITS.md';

const PROTECTED_ARTICLES = new Set([
  'deep-work-ritual',
  'vaincre-procrastination',
  'meal-prep-dimanche',
  'langage-corps-confiance',
  'community-discipline'
]);

const FORBIDDEN_PHOTO_IDS = new Set([
  '5918186',
  '8386566',
  '30635719',
  '18500605',
  '7337618'
]);

function error(msg) {
  console.error('ERROR: ' + msg);
  process.exit(1);
}

function info(msg) {
  console.log(msg);
}

function section(title) {
  console.log('');
  console.log('='.repeat(70));
  console.log(title);
  console.log('='.repeat(70));
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (res2) => {
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(filepath); });
        }).on('error', reject);
      } else if (res.statusCode >= 300) {
        reject(new Error('HTTP ' + res.statusCode + ' from ' + url));
        res.resume();
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(filepath); });
      }
    }).on('error', reject);
  });
}

async function main() {
  section('REPLACEMENT IMAGE INTEGRATION');

  if (!fs.existsSync(APPROVED_MANIFEST)) {
    error('Approved manifest not found at: ' + APPROVED_MANIFEST);
  }

  const manifest = JSON.parse(fs.readFileSync(APPROVED_MANIFEST, 'utf8'));

  if (!manifest.approved || !Array.isArray(manifest.approved) || manifest.approved.length === 0) {
    error('Manifest must contain a non-empty "approved" array.');
  }

  info('Loaded ' + manifest.approved.length + ' approved replacements from manifest');
  info('');

  const approvedPhotoIds = new Set();
  const integrationPlan = [];
  const errors = [];

  for (const entry of manifest.approved) {
    const { article_slug, photo_id, target_filename, photographer, photographer_url, image_url, api_provider } = entry;

    if (!article_slug || !photo_id || !target_filename || !photographer || !photographer_url || !image_url) {
      errors.push('Missing required field in manifest entry: ' + JSON.stringify(entry));
      continue;
    }

    if (PROTECTED_ARTICLES.has(article_slug)) {
      errors.push('Article ' + article_slug + ' is protected and cannot be replaced.');
      continue;
    }

    if (FORBIDDEN_PHOTO_IDS.has(photo_id)) {
      errors.push('Photo ID ' + photo_id + ' is blocked. It belongs to one of the 5 already-integrated images.');
      continue;
    }

    if (approvedPhotoIds.has(photo_id)) {
      errors.push('Photo ID ' + photo_id + ' has already been selected for another article. Zero reuse enforced.');
      continue;
    }

    const articleFilePath = path.join(ARTICLES_DIR, article_slug + '.md');
    if (!fs.existsSync(articleFilePath)) {
      errors.push('Article file not found: ' + articleFilePath);
      continue;
    }

    approvedPhotoIds.add(photo_id);

    integrationPlan.push({
      article_slug,
      photo_id,
      target_filename,
      photographer,
      photographer_url,
      image_url,
      api_provider: api_provider || 'pexels',
      article_file: articleFilePath,
      staging_image: path.join(STAGING_IMAGES_DIR, target_filename),
      prod_image: path.join(PROD_IMAGES_DIR, target_filename)
    });
  }

  if (errors.length > 0) {
    section('VALIDATION ERRORS');
    errors.forEach(e => console.error('  - ' + e));
    error('Fix ' + errors.length + ' error(s) before running integration.');
  }

  section('DOWNLOAD TO STAGING');

  fs.mkdirSync(STAGING_IMAGES_DIR, { recursive: true });

  for (const plan of integrationPlan) {
    info('[DOWNLOAD] ' + plan.target_filename);
    info('  Source:  ' + plan.image_url);
    info('  Staging: ' + plan.staging_image);

    try {
      await downloadImage(plan.image_url, plan.staging_image);
      info('  Status:  downloaded');
    } catch (e) {
      error('Download failed for ' + plan.target_filename + ': ' + e.message);
    }
    info('');
  }

  section('COPY TO PRODUCTION');

  for (const plan of integrationPlan) {
    info('[COPY] ' + plan.target_filename);
    info('  From:    ' + plan.staging_image);
    info('  To:      ' + plan.prod_image);

    if (!fs.existsSync(plan.staging_image)) {
      error('Staging file not found: ' + plan.staging_image);
    }

    fs.copyFileSync(plan.staging_image, plan.prod_image);
    info('  Status:  copied');
    info('');
  }

  section('FRONTMATTER UPDATES');

  for (const plan of integrationPlan) {
    info('[UPDATE] ' + path.basename(plan.article_file));
    info('  Article: ' + plan.article_slug);
    info('  New image: /images/blog/' + plan.target_filename);

    let content = fs.readFileSync(plan.article_file, 'utf8');
    const newImagePath = '/images/blog/' + plan.target_filename;

    const imageMatch = content.match(/^image:\s*.+$/m);
    if (imageMatch) {
      content = content.replace(/^image:\s*.+$/m, 'image: ' + newImagePath);
    } else {
      const frontmatterEnd = content.indexOf('---', 3);
      if (frontmatterEnd === -1) {
        error('Could not find frontmatter end in ' + plan.article_file);
      }
      const before = content.slice(0, frontmatterEnd);
      const after = content.slice(frontmatterEnd);
      content = before + 'image: ' + newImagePath + '\n' + after;
    }

    fs.writeFileSync(plan.article_file, content);
    info('  Status: updated');
    info('');
  }

  section('PHOTO-CREDITS.md UPDATES');

  const creditLines = [];
  for (const plan of integrationPlan) {
    const provider = plan.api_provider.charAt(0).toUpperCase() + plan.api_provider.slice(1);
    const photoUrl = plan.api_provider === 'pexels'
      ? 'https://www.pexels.com/photo/' + plan.photo_id + '/'
      : plan.image_url;
    const creditLine = '- **' + plan.article_slug + '** — [' + plan.photographer + '](' + plan.photographer_url + ') via [' + provider + '](' + photoUrl + ')';
    creditLines.push(creditLine);
    info('[ADD] ' + creditLine);
  }

  try {
    let creditsContent = '';
    if (fs.existsSync(PHOTO_CREDITS_PATH)) {
      creditsContent = fs.readFileSync(PHOTO_CREDITS_PATH, 'utf8');
    }
    const existingLines = new Set(creditsContent.split('\n').filter(l => l.trim()));
    const newLines = creditLines.filter(line => !existingLines.has(line));

    if (newLines.length > 0) {
      const suffix = creditsContent.endsWith('\n') ? '' : '\n';
      fs.writeFileSync(PHOTO_CREDITS_PATH, creditsContent + suffix + newLines.join('\n') + '\n');
      info('  Status: added ' + newLines.length + ' credit line(s)');
    } else {
      info('  Status: all credit lines already present');
    }
  } catch (e) {
    error('PHOTO-CREDITS.md update failed: ' + e.message);
  }

  section('BUILD');

  info('Running npm run build...');
  try {
    const { execSync } = await import('child_process');
    const buildOutput = execSync('npm run build', { cwd: '/Users/youssefraihane/Documents/the-motivahub.com', encoding: 'utf8' });
    info('Build completed successfully');
    info(buildOutput.split('\n').slice(-5).join('\n'));
  } catch (e) {
    error('Build failed: ' + e.message);
  }

  section('VERIFICATION');

  const verificationErrors = [];

  for (const plan of integrationPlan) {
    info('Verifying ' + plan.target_filename + '...');

    if (!fs.existsSync(plan.prod_image)) {
      verificationErrors.push('Missing production file: ' + plan.prod_image);
      info('  ❌ Missing production file');
      continue;
    }

    const stats = fs.statSync(plan.prod_image);
    if (stats.size === 0) {
      verificationErrors.push('Empty production file: ' + plan.prod_image);
      info('  ❌ Empty file');
      continue;
    }

    try {
      const content = fs.readFileSync(plan.article_file, 'utf8');
      const imageMatch = content.match(/^image:\s*(.+)$/m);
      if (!imageMatch) {
        verificationErrors.push('Missing image field in ' + plan.article_file);
        info('  ❌ Missing image field');
        continue;
      }

      const expectedPath = '/images/blog/' + plan.target_filename;
      const actualPath = imageMatch[1].trim();
      if (actualPath !== expectedPath) {
        verificationErrors.push('Image path mismatch in ' + plan.article_file + ': expected ' + expectedPath + ', got ' + actualPath);
        info('  ❌ Image path mismatch');
        continue;
      }

      info('  ✅ Verified');
    } catch (e) {
      verificationErrors.push('Verification error for ' + plan.article_slug + ': ' + e.message);
      info('  ❌ Error: ' + e.message);
    }
  }

  if (verificationErrors.length > 0) {
    section('VERIFICATION ERRORS');
    verificationErrors.forEach(e => info('  - ' + e));
    error('Verification failed with ' + verificationErrors.length + ' error(s).');
  }

  section('SUMMARY');

  info('Integrated replacements: ' + integrationPlan.length);
  integrationPlan.forEach(plan => {
    info('  - ' + plan.article_slug + ' → ' + plan.target_filename + ' (photo ID: ' + plan.photo_id + ')');
  });

  info('');
  info('Production files modified:');
  integrationPlan.forEach(plan => info('  - ' + plan.article_file));
  info('  - ' + PHOTO_CREDITS_PATH);
  info('');
  info('Build: PASSED');
  info('Verification: PASSED');
  info('');
  info('Integration complete. No commit or push performed.');
}

main().catch(e => {
  error(e.message);
});
