import fs from 'fs';
import path from 'path';
import https from 'https';

const args = process.argv.slice(2);
const APPLY = args.includes('--apply');

const STAGING_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/.pilot-staging';
const RESPONSES_DIR = path.join(STAGING_DIR, 'candidates', 'raw-api-responses');
const REVIEWS_DIR = path.join(STAGING_DIR, 'reviews');
const EXPORTS_DIR = path.join(STAGING_DIR, 'exports');
const MANIFEST_PATH = path.join(EXPORTS_DIR, 'integration-manifest.json');
const PROD_IMAGES_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/public/images/blog';
const ARTICLES_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/src/content/blog';
const PHOTO_CREDITS_PATH = '/Users/youssefraihane/Documents/the-motivahub.com/PHOTO-CREDITS.md';

const REQUIRED_CANDIDATE_FIELDS = [
  'id', 'url', 'source_page', 'photographer', 'photographer_url',
  'license', 'width', 'height', 'download_url', 'api_provider'
];

function error(msg) {
  console.error('ERROR: ' + msg);
  process.exit(1);
}

function info(msg) {
  console.log(msg);
}

function section(title) {
  console.log('');
  console.log('='.repeat(60));
  console.log(title);
  console.log('='.repeat(60));
}

if (!fs.existsSync(MANIFEST_PATH)) {
  error(
    'Integration manifest not found at: ' + MANIFEST_PATH + '\n' +
    'Create it with the approved candidates. Expected format:\n' +
    JSON.stringify({
      approved: [
        { article_slug: 'deep-work-ritual', candidate_id: '12345', target_filename: 'deep-work-ritual-1.jpg' }
      ]
    }, null, 2)
  );
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));

if (!manifest.approved || !Array.isArray(manifest.approved) || manifest.approved.length === 0) {
  error('Manifest must contain a non-empty "approved" array.');
}

section(APPLY ? 'INTEGRATION' : 'DRY-RUN: Integration Proposal');

info('Manifest source: ' + MANIFEST_PATH);
info('Approved candidates: ' + manifest.approved.length);
info('Mode: ' + (APPLY ? 'APPLY' : 'DRY-RUN'));
info('');

const plans = [];
const errors = [];

for (const entry of manifest.approved) {
  const { article_slug, candidate_id, target_filename } = entry;

  if (!article_slug || !candidate_id || !target_filename) {
    errors.push('Missing required field in manifest entry: ' + JSON.stringify(entry));
    continue;
  }

  const responsePath = path.join(RESPONSES_DIR, article_slug + '.json');
  if (!fs.existsSync(responsePath)) {
    errors.push('Raw API response not found for article: ' + article_slug + ' (' + responsePath + ')');
    continue;
  }

  const articleData = JSON.parse(fs.readFileSync(responsePath, 'utf8'));
  const candidate = articleData.candidates.find(c => c.id === candidate_id);

  if (!candidate) {
    errors.push('Candidate ID ' + candidate_id + ' not found in article: ' + article_slug);
    continue;
  }

  for (const field of REQUIRED_CANDIDATE_FIELDS) {
    if (!candidate[field]) {
      errors.push('Candidate ' + candidate_id + ' missing required field: ' + field);
    }
  }

  const articleFilePath = path.join(ARTICLES_DIR, article_slug + '.md');
  if (!fs.existsSync(articleFilePath)) {
    errors.push('Article file not found: ' + articleFilePath);
  }

  const stagingImagePath = path.join(STAGING_DIR, 'candidates', 'images', target_filename);
  const prodImagePath = path.join(PROD_IMAGES_DIR, target_filename);

  plans.push({
    article_slug,
    candidate_id,
    article_title: articleData.title,
    article_url: articleData.url,
    article_file: articleFilePath,
    candidate,
    target_filename,
    staging_image: stagingImagePath,
    prod_image: prodImagePath
  });
}

if (errors.length > 0) {
  section('VALIDATION ERRORS');
  for (const err of errors) {
    console.error('  - ' + err);
  }
  error('Fix ' + errors.length + ' error(s) before running integration.');
}

section('DOWNLOAD ACTIONS');

if (APPLY) {
  fs.mkdirSync(path.join(STAGING_DIR, 'candidates', 'images'), { recursive: true });
}

async function downloadImage(url, filepath) {
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

for (const plan of plans) {
  info('[DOWNLOAD] ' + plan.target_filename);
  info('  Source:  ' + plan.candidate.download_url);
  info('  Staging: ' + plan.staging_image);
  if (APPLY) {
    try {
      await downloadImage(plan.candidate.download_url, plan.staging_image);
      info('  Status:  downloaded');
    } catch (e) {
      error('Download failed for ' + plan.target_filename + ': ' + e.message);
    }
  }
  info('  ');
}

section('PRODUCTION FILE COPIES');

for (const plan of plans) {
  info('[COPY] ' + plan.target_filename);
  info('  From:    ' + plan.staging_image);
  info('  To:      ' + plan.prod_image);
  if (APPLY) {
    try {
      if (!fs.existsSync(plan.staging_image)) {
        error('Staging file not found for copy: ' + plan.staging_image);
      }
      fs.copyFileSync(plan.staging_image, plan.prod_image);
      info('  Status:  copied');
    } catch (e) {
      error('Copy failed for ' + plan.target_filename + ': ' + e.message);
    }
  }
  info('  ');
}

section('FRONTMATTER UPDATES');

for (const plan of plans) {
  info('[UPDATE] ' + plan.article_file);
  info('  Article: ' + plan.article_title);
  info('  Field:   image:');
  info('  Old:     ' + (plan.candidate.current_image || '(existing value)'));
  info('  New:     /images/blog/' + plan.target_filename);
  if (APPLY) {
    try {
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
      info('  Status:  updated');
    } catch (e) {
      error('Frontmatter update failed for ' + plan.article_file + ': ' + e.message);
    }
  }
  info('  ');
}

section('PHOTO-CREDITS.md ADDITIONS');

const creditLines = [];
for (const plan of plans) {
  const creditLine = '- **' + plan.article_slug + '** — [' + plan.candidate.photographer + '](' + plan.candidate.photographer_url + ') via [' + plan.candidate.api_provider.charAt(0).toUpperCase() + plan.candidate.api_provider.slice(1) + '](https://www.' + plan.candidate.api_provider + '.com/photo/' + plan.candidate.id + '/)';
  creditLines.push(creditLine);
  info('[ADD] ' + creditLine);
  info('  ');
}

if (APPLY) {
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
      info('  Status:  added ' + newLines.length + ' credit line(s) to ' + PHOTO_CREDITS_PATH);
    } else {
      info('  Status:  all credit lines already present');
    }
  } catch (e) {
    error('PHOTO-CREDITS.md update failed: ' + e.message);
  }
}

section('SUMMARY');

info('Total operations: ' + plans.length);
info('  - Downloads:  ' + plans.length);
info('  - Copies:     ' + plans.length);
info('  - Frontmatter updates: ' + plans.length);
info('  - Credit lines: ' + plans.length);
info('');
info('Production files to be modified:');
for (const plan of plans) {
  info('  - ' + plan.article_file);
}
info('  - ' + PHOTO_CREDITS_PATH);
info('');
info(APPLY ? 'Integration complete.' : 'Dry-run complete. No files were modified, downloaded, or overwritten.');
info(APPLY ? 'Run with --apply to execute changes.' : 'Pass --apply to execute these changes.');
