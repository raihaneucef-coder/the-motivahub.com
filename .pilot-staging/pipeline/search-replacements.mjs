import fs from 'fs';
import path from 'path';
import https from 'https';
import { createInterface } from 'readline';

const MANIFEST_PATH = '/Users/youssefraihane/Documents/the-motivahub.com/.pilot-staging/exports/replacement-manifest.json';
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

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

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

function httpsGet(url, apiProvider = 'pexels') {
  return new Promise((resolve, reject) => {
    const pexelsKey = process.env.PEXELS_API_KEY;
    const unsplashKey = process.env.UNSPLASH_API_KEY;
    const authHeader = apiProvider === 'unsplash' && unsplashKey
      ? 'Client-ID ' + unsplashKey
      : 'Bearer ' + pexelsKey;
    const options = { headers: { 'Authorization': authHeader } };
    https.get(url, options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error('HTTP ' + res.statusCode + ' from ' + url));
        res.resume();
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse response from ' + url + ': ' + data.slice(0, 200)));
        }
      });
    }).on('error', reject);
  });
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
      } else {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(filepath); });
      }
    }).on('error', reject);
  });
}

async function searchPexels(query, perPage = 10) {
  const url = 'https://api.pexels.com/v1/search?query=' + encodeURIComponent(query) + '&per_page=' + perPage;
  try {
    const data = await httpsGet(url, 'pexels');
    return data.photos || [];
  } catch (e) {
    info('  Pexels search failed: ' + e.message);
    return [];
  }
}

async function searchUnsplash(query, perPage = 10) {
  const url = 'https://api.unsplash.com/search/photos?query=' + encodeURIComponent(query) + '&per_page=' + perPage + '&orientation=landscape';
  try {
    const data = await httpsGet(url, 'unsplash');
    return data.results || [];
  } catch (e) {
    info('  Unsplash search failed: ' + e.message);
    return [];
  }
}

function validateCandidate(candidate, articleConfig) {
  const checks = {
    dimensions_ok: candidate.width >= articleConfig.metadata_checks.min_width,
    aspect_ratio_ok: (candidate.width / candidate.height) >= articleConfig.metadata_checks.aspect_ratio_min &&
                     (candidate.width / candidate.height) <= articleConfig.metadata_checks.aspect_ratio_max,
    license_ok: candidate.license && (
      candidate.license.toLowerCase().includes('free') || 
      candidate.license.toLowerCase().includes('pexels') || 
      candidate.license.toLowerCase().includes('unsplash') ||
      candidate.license.toLowerCase().includes('license')
    ),
    source_url_ok: !!(candidate.url && candidate.source_page),
    download_url_ok: !!(candidate.download_url),
    flagged: false
  };
  checks.flagged = !(checks.dimensions_ok && checks.aspect_ratio_ok && checks.license_ok && checks.source_url_ok && checks.download_url_ok);
  return checks;
}

function checkDuplicate(candidate, existingUrls, photographerCounts) {
  const urlDuplicate = existingUrls.has(candidate.url);
  const photographerCount = photographerCounts.get(candidate.photographer) || 0;
  const photographerSaturated = photographerCount >= 3;
  
  return {
    flagged: urlDuplicate || photographerSaturated,
    url_duplicate: urlDuplicate,
    photographer_saturated: photographerSaturated,
    photographer_count: photographerCount
  };
}

async function main() {
  section('REPLACEMENT IMAGE SEARCH & INTEGRATION');

  if (!process.env.PEXELS_API_KEY && !process.env.UNSPLASH_API_KEY) {
    error('Neither PEXELS_API_KEY nor UNSPLASH_API_KEY is set in the environment.');
  }

  info('Pexels API: ' + (process.env.PEXELS_API_KEY ? 'available' : 'not available'));
  info('Unsplash API: ' + (process.env.UNSPLASH_API_KEY ? 'available' : 'not available'));
  info('');

  if (!fs.existsSync(MANIFEST_PATH)) {
    error('Replacement manifest not found at: ' + MANIFEST_PATH);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

  if (!manifest.replacements || !Array.isArray(manifest.replacements) || manifest.replacements.length === 0) {
    error('Manifest must contain a non-empty "replacements" array.');
  }

  info('Loaded ' + manifest.replacements.length + ' replacement candidates from manifest');
  info('');

  const allCandidates = {};
  const existingUrls = new Set();
  const photographerCounts = new Map();
  const approvedPhotoIds = new Set();

  for (const entry of manifest.replacements) {
    if (PROTECTED_ARTICLES.has(entry.article_slug)) {
      error('Article ' + entry.article_slug + ' is protected and cannot be replaced.');
    }

    info('Searching for: ' + entry.article_title);
    info('Query: ' + entry.search_query);

    let candidates = [];
    let pexelsCount = 0;
    let unsplashCount = 0;

    if (process.env.PEXELS_API_KEY) {
      try {
        const pexelsResults = await searchPexels(entry.search_query, 10);
        pexelsCount = pexelsResults.length;
        candidates = pexelsResults.map(photo => ({
          id: String(photo.id),
          url: photo.url,
          source_page: photo.url,
          photographer: photo.photographer,
          photographer_url: 'https://www.pexels.com/@' + photo.photographer_url.split('@')[1]?.split('/')[0] || photo.photographer_url,
          license: 'Pexels License',
          width: photo.width,
          height: photo.height,
          download_url: photo.src.large,
          api_provider: 'pexels',
          avg_color: photo.avg_color
        }));
      } catch (e) {
        info('  Pexels search error: ' + e.message);
      }
    }

    if (candidates.length === 0 && process.env.UNSPLASH_API_KEY) {
      try {
        const unsplashResults = await searchUnsplash(entry.search_query, 10);
        unsplashCount = unsplashResults.length;
        candidates = unsplashResults.map(photo => ({
          id: String(photo.id),
          url: photo.urls.small,
          source_page: photo.links.html,
          photographer: photo.user.name,
          photographer_url: photo.user.links.html,
          license: 'Unsplash License',
          width: photo.width,
          height: photo.height,
          download_url: photo.urls.large,
          api_provider: 'unsplash',
          avg_color: photo.color || '#000000'
        }));
      } catch (e) {
        info('  Unsplash search error: ' + e.message);
      }
    }

    info('  Results: Pexels=' + pexelsCount + ', Unsplash=' + unsplashCount + ', Total candidates after filters=' + candidates.length);

    if (candidates.length === 0) {
      error('No candidates found for ' + entry.article_slug + ' from any available API.');
    }

    const validatedCandidates = candidates
      .filter(c => !FORBIDDEN_PHOTO_IDS.has(c.id))
      .map(c => ({
        ...c,
        validation: validateCandidate(c, { metadata_checks: { min_width: 1200, aspect_ratio_min: 1.2, aspect_ratio_max: 2.0 } }),
        duplicate_check: checkDuplicate(c, existingUrls, photographerCounts),
        unavailable: approvedPhotoIds.has(c.id) ? 'Already selected for another article' : null
      }));

    const uniqueCandidates = validatedCandidates.filter((c, i, arr) => 
      arr.findIndex(x => x.id === c.id) === i
    );

    uniqueCandidates.forEach(c => {
      existingUrls.add(c.url);
      photographerCounts.set(c.photographer, (photographerCounts.get(c.photographer) || 0) + 1);
    });

    allCandidates[entry.article_slug] = {
      article: entry,
      candidates: uniqueCandidates
    };

    info('  Found ' + uniqueCandidates.length + ' unique candidates');
    info('');
  }

  section('CANDIDATE REVIEW');

  const approvals = {};

  for (const [slug, data] of Object.entries(allCandidates)) {
    const article = data.article;
    const candidates = data.candidates;

    info('');
    info('Article: ' + article.article_title);
    info('Slug: ' + slug);
    info('Current image: ' + article.current_image);
    info('');
    info('Candidates:');

    candidates.forEach((c, i) => {
      const statusIcon = c.validation.flagged ? '❌' : '✅';
      const dupIcon = c.duplicate_check.flagged ? '⚠️' : '';
      const unavailableTag = c.unavailable ? ' [UNAVAILABLE: ' + c.unavailable + ']' : '';
      info('  [' + (i + 1) + '] ' + statusIcon + ' ' + dupIcon + unavailableTag + ' ID: ' + c.id);
      info('      Photographer: ' + c.photographer);
      info('      Source: ' + c.api_provider.charAt(0).toUpperCase() + c.api_provider.slice(1) + ' - ' + c.source_page);
      info('      Image: ' + c.download_url);
      info('      Dimensions: ' + c.width + '×' + c.height);
      info('      Validation: ' + (c.validation.flagged ? 'FAILED' : 'PASSED'));
      if (c.validation.flagged) {
        if (!c.validation.dimensions_ok) info('        - Width too small');
        if (!c.validation.aspect_ratio_ok) info('        - Aspect ratio out of range');
        if (!c.validation.license_ok) info('        - License issue');
        if (!c.validation.source_url_ok) info('        - Missing source URL');
        if (!c.validation.download_url_ok) info('        - Missing download URL');
      }
      if (c.duplicate_check.flagged) {
        if (c.duplicate_check.url_duplicate) info('        - Duplicate URL');
        if (c.duplicate_check.photographer_saturated) info('        - Photographer saturation (' + c.duplicate_check.photographer_count + ' images)');
      }
      info('');
    });

    let approved = null;
    while (!approved) {
      const answer = await question('Enter candidate number to approve for "' + article.article_title + '" (or "skip" to skip): ');
      
      if (answer.toLowerCase() === 'skip') {
        info('Skipping ' + slug);
        approved = 'skipped';
        break;
      }

      const num = parseInt(answer, 10);
      if (isNaN(num) || num < 1 || num > candidates.length) {
        info('Invalid selection. Please enter a number between 1 and ' + candidates.length + ' or "skip".');
        continue;
      }

      const selected = candidates[num - 1];
      
      if (selected.unavailable) {
        info('This candidate is unavailable: ' + selected.unavailable);
        continue;
      }

      if (approvedPhotoIds.has(selected.id)) {
        info('This photo ID has already been selected for another article. Choose a different candidate.');
        continue;
      }

      if (selected.validation.flagged) {
        const confirm = await question('This candidate failed validation. Approve anyway? (y/N): ');
        if (confirm.toLowerCase() !== 'y') {
          info('Not approved.');
          continue;
        }
      }

      approved = selected;
      approvedPhotoIds.add(selected.id);
      info('Approved candidate ' + num + ' for ' + slug + ' (photo ID: ' + selected.id + ')');
    }

    approvals[slug] = approved === 'skipped' ? null : approved;
    info('');
  }

  section('DOWNLOAD & INTEGRATION');

  fs.mkdirSync(STAGING_IMAGES_DIR, { recursive: true });

  const integrationPlan = [];

  for (const [slug, candidate] of Object.entries(approvals)) {
    if (!candidate) {
      info('Skipping ' + slug + ' (no approval)');
      continue;
    }

    const manifestEntry = manifest.replacements.find(r => r.article_slug === slug);
    const targetFilename = manifestEntry.target_filename;
    const stagingPath = path.join(STAGING_IMAGES_DIR, targetFilename);
    const prodPath = path.join(PROD_IMAGES_DIR, targetFilename);

    info('[DOWNLOAD] ' + targetFilename);
    info('  Source: ' + candidate.download_url);
    info('  Staging: ' + stagingPath);

    try {
      await downloadImage(candidate.download_url, stagingPath);
      info('  Status: downloaded');
    } catch (e) {
      error('Download failed for ' + targetFilename + ': ' + e.message);
    }

    integrationPlan.push({
      slug,
      candidate,
      targetFilename,
      stagingPath,
      prodPath,
      article_file: path.join(ARTICLES_DIR, slug + '.md')
    });
  }

  if (integrationPlan.length === 0) {
    info('No images approved for integration. Exiting.');
    rl.close();
    return;
  }

  section('PRODUCTION COPIES');

  for (const plan of integrationPlan) {
    info('[COPY] ' + plan.targetFilename);
    info('  From: ' + plan.stagingPath);
    info('  To: ' + plan.prodPath);

    if (!fs.existsSync(plan.stagingPath)) {
      error('Staging file not found: ' + plan.stagingPath);
    }

    fs.copyFileSync(plan.stagingPath, plan.prodPath);
    info('  Status: copied');
  }

  section('FRONTMATTER UPDATES');

  for (const plan of integrationPlan) {
    info('[UPDATE] ' + path.basename(plan.article_file));
    info('  Article: ' + plan.candidate.source_page);
    info('  New image: /images/blog/' + plan.targetFilename);

    let content = fs.readFileSync(plan.article_file, 'utf8');
    const newImagePath = '/images/blog/' + plan.targetFilename;

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
  }

  section('PHOTO-CREDITS.md UPDATES');

  const creditLines = [];
  for (const plan of integrationPlan) {
    const creditLine = '- **' + plan.slug + '** — [' + plan.candidate.photographer + '](' + plan.candidate.photographer_url + ') via [' + plan.candidate.api_provider.charAt(0).toUpperCase() + plan.candidate.api_provider.slice(1) + '](https://www.' + plan.candidate.api_provider + '.com/photo/' + plan.candidate.id + '/)';
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

  info('Running production build...');
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
    info('Verifying ' + plan.targetFilename + '...');

    if (!fs.existsSync(plan.prodPath)) {
      verificationErrors.push('Missing production file: ' + plan.prodPath);
      info('  ❌ Missing production file');
      continue;
    }

    const stats = fs.statSync(plan.prodPath);
    if (stats.size === 0) {
      verificationErrors.push('Empty production file: ' + plan.prodPath);
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

      const expectedPath = '/images/blog/' + plan.targetFilename;
      const actualPath = imageMatch[1].trim();
      if (actualPath !== expectedPath) {
        verificationErrors.push('Image path mismatch in ' + plan.article_file + ': expected ' + expectedPath + ', got ' + actualPath);
        info('  ❌ Image path mismatch');
        continue;
      }

      info('  ✅ Verified');
    } catch (e) {
      verificationErrors.push('Verification error for ' + plan.slug + ': ' + e.message);
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
    info('  - ' + plan.slug + ' → ' + plan.targetFilename + ' (' + plan.candidate.id + ')');
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
  info('');
  info('Files ready for commit:');
  integrationPlan.forEach(plan => {
    info('  - ' + plan.article_file);
    info('  - ' + plan.prodPath);
  });
  info('  - ' + PHOTO_CREDITS_PATH);

  rl.close();
}

main().catch(e => {
  error(e.message);
});
