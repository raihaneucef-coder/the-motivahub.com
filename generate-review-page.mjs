import fs from 'fs';
import path from 'path';

const BLOG_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/src/content/blog';
const IMAGES_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/public/images/blog';
const OUTPUT_PATH = '/Users/youssefraihane/Documents/the-motivahub.com/public/review-photos.html';

const REPLACED_SLUGS = new Set([
  'art-dire-non',
  'community-discipline',
  'deep-work-ritual',
  'detox-numerique',
  'discipline-vs-punishment',
  'identity-challenge-7-days',
  'langage-corps-confiance',
  'meal-prep-dimanche',
  'missed-day-protocol',
  'morning-routines-12-tested',
  'morning-vs-night',
  'slow-productivity-30-day-test',
  'two-minute-rule-guide',
  'vaincre-procrastination'
]);

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) return null;
  const fm = fmMatch[1];
  const get = (key) => {
    const m = fm.match(new RegExp('^' + key + ':\\s*(.+)$', 'm'));
    if (!m) return null;
    let val = m[1].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    return val;
  };
  return { title: get('title'), topic: get('topic'), image: get('image') };
}

function readArticles() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  const articles = [];
  for (const file of files) {
    const fm = parseFrontmatter(path.join(BLOG_DIR, file));
    if (!fm || !fm.title) continue;
    const slug = file.replace(/\.md$/, '');
    if (REPLACED_SLUGS.has(slug)) continue;
    articles.push({
      slug,
      title: fm.title,
      topic: fm.topic || 'General',
      currentImage: fm.image || '/images/hero.jpg'
    });
  }
  articles.sort((a, b) => a.slug.localeCompare(b.slug));
  return articles;
}

function getLocalImageOptions(slug, currentImage) {
  const files = fs.readdirSync(IMAGES_DIR).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));
  const options = [];
  for (const file of files) {
    const src = '/images/blog/' + file;
    if (src === currentImage) continue;
    options.push({
      id: 'local-' + file,
      url: src,
      src: src,
      photographer: 'Local',
      photographer_url: src,
      isLocal: true
    });
  }
  return options.slice(0, 6);
}

const articles = readArticles();
const articlesJson = JSON.stringify(articles);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photo Review - ${articles.length} Articles</title>
  <style>
    :root {
      --bg: #f5f1e8;
      --ink: #0a0a0a;
      --muted: #6b665e;
      --line: #d8d1c0;
      --gold: #b8965a;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--ink);
      line-height: 1.6;
      padding: 40px 20px;
    }
    .container { max-width: 1400px; margin: 0 auto; }
    h1 { font-size: 2rem; margin-bottom: 8px; }
    .subtitle { color: var(--muted); margin-bottom: 32px; }
    .article-block {
      background: #fff;
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .article-info h3 { font-size: 1.25rem; margin-bottom: 6px; }
    .article-slug { font-family: monospace; color: var(--muted); font-size: 0.9rem; }
    .article-topic { color: var(--gold); font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 4px; }
    .article-current { margin-top: 8px; font-size: 0.85rem; color: var(--muted); }
    .article-current code { background: #f0ece3; padding: 2px 6px; border-radius: 4px; }
    .selection-status { margin-top: 8px; font-weight: 600; color: var(--muted); }
    .selection-status.selected { color: #2e7d32; }
    .photos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .photo-option {
      border: 2px solid transparent;
      border-radius: 8px;
      overflow: hidden;
      background: #faf7f0;
      transition: border-color 0.2s;
    }
    .photo-option:hover { border-color: var(--gold); }
    .photo-option.selected { border-color: #2e7d32; }
    .photo-option img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      display: block;
    }
    .photo-meta {
      padding: 8px 10px;
      font-size: 0.75rem;
      color: var(--muted);
      display: flex;
      justify-content: space-between;
    }
    .photo-id { font-family: monospace; font-weight: 600; }
    .select-btn {
      width: 100%;
      padding: 8px;
      border: none;
      background: var(--ink);
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.85rem;
    }
    .select-btn:hover { background: var(--gold); }
    .no-photos { color: var(--muted); padding: 16px; }
    .load-btn {
      margin-top: 12px;
      padding: 8px 16px;
      background: var(--gold);
      color: var(--ink);
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
    }
    .load-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .summary { margin-top: 40px; padding: 16px; background: #fff; border-radius: 8px; border: 1px solid var(--line); }
    .source-tag {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 4px;
    }
    .source-tag.pexels { background: #e8f5e9; color: #2e7d32; }
    .source-tag.local { background: #fff3e0; color: #e65100; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Photo Review</h1>
    <p class="subtitle">${articles.length} remaining articles — choose a photo for each</p>
    <div id="articles"></div>
    <div class="summary" id="summary"></div>
  </div>

  <script>
    const ARTICLES = ${articlesJson};
    const PEXELS_PROXY = '/api/pexels/search.json';
    const selections = {};

    function renderArticles() {
      const container = document.getElementById('articles');
      container.innerHTML = ARTICLES.map(a => {
        const localOptions = getLocalImageOptions('${a.slug}', '${a.currentImage.replace(/'/g, "\\'")}');
        const localHtml = localOptions.map(p => \`
          <div class="photo-option" data-slug="\${a.slug}" data-photo-id="\${p.id}" data-photo-url="\${p.url}" data-photo-src="\${p.src}">
            <img src="\${p.src}" alt="\${a.title}" loading="lazy" />
            <div class="photo-meta">
              <span class="photo-id">\${p.id}</span>
              <span class="source-tag local">Local</span>
            </div>
            <button class="select-btn" onclick="selectPhoto('\${a.slug}', '\${p.id}', '\${(p.src || '').replace(/'/g, "\\\\'")}')">Select</button>
          </div>
        \`).join('');
        return \`
          <div class="article-block" id="article-\${a.slug}">
            <div class="article-info">
              <h3>\${a.title}</h3>
              <p class="article-slug">\${a.slug}</p>
              <p class="article-topic">\${a.topic}</p>
              <p class="article-current">Current: <code>\${a.currentImage}</code></p>
              <div class="selection-status" id="status-\${a.slug}">Not selected</div>
            </div>
            <div class="photos-grid" id="grid-\${a.slug}">
              <button class="load-btn" id="btn-\${a.slug}" onclick="loadPhotos('\${a.slug}')">Load photo options</button>
              <div id="local-\${a.slug}" style="margin-top:12px;">
                <p style="font-size:0.8rem;color:var(--muted);margin-bottom:8px;">Local images:</p>
                <div class="photos-grid">\${localHtml}</div>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    function getLocalImageOptions(slug, currentImage) {
      const images = [
        '/images/blog/2-minute-rule-system.jpg',
        '/images/blog/5-minute-morning-habit.jpg',
        '/images/blog/arreter-auto-sabotage.jpg',
        '/images/blog/arreter-couper-avis.jpg',
        '/images/blog/athlete-discipline.jpg',
        '/images/blog/atomic-habits-review.jpg',
        '/images/blog/atomic-habits-revue.jpg',
        '/images/blog/attention-as-asset.jpg',
        '/images/blog/batching-productivite.jpg',
        '/images/blog/beginner-again.jpg',
        '/images/blog/body-votes-first.jpg',
        '/images/blog/boundaries-are-love.jpg',
        '/images/blog/calm-is-a-superpower.jpg',
        '/images/blog/cant-hurt-me-review.jpg',
        '/images/blog/casser-mauvaise-habitude.jpg'
      ];
      return images.filter(src => src !== currentImage).map(src => ({
        id: 'local-' + src.replace(/^\\/images\\/blog\\//, '').replace(/\\.jpg$/, ''),
        url: src,
        src: src,
        photographer: 'Local',
        photographer_url: src,
        isLocal: true
      })).slice(0, 6);
    }

    async function loadPhotos(slug) {
      const btn = document.getElementById('btn-' + slug);
      const grid = document.getElementById('grid-' + slug);
      btn.disabled = true;
      btn.textContent = 'Loading...';
      const article = ARTICLES.find(a => a.slug === slug);
      const query = article.title + ' ' + article.topic;
      try {
        const res = await fetch(PEXELS_PROXY + '?query=' + encodeURIComponent(query) + '&per_page=6');
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error('HTTP ' + res.status + ': ' + (err.error || res.statusText));
        }
        const data = await res.json();
        const photos = (data.photos || []).map(p => ({
          id: String(p.id),
          url: p.url,
          src: p.src && (p.src.medium || p.src.large || p.src.original || p.src.small),
          photographer: p.photographer,
          photographer_url: p.photographer_url
        }));
        if (photos.length === 0) {
          grid.innerHTML = '<p class="no-photos">No photos found</p>';
          return;
        }
        grid.innerHTML = photos.map(p => \`
          <div class="photo-option" data-slug="\${slug}" data-photo-id="\${p.id}" data-photo-url="\${p.url}" data-photo-src="\${p.src}">
            <img src="\${p.src}" alt="\${article.title}" loading="lazy" />
            <div class="photo-meta">
              <span class="photo-id">ID: \${p.id}</span>
              <span class="source-tag pexels">Pexels</span>
            </div>
            <button class="select-btn" onclick="selectPhoto('\${slug}', '\${p.id}', '\${(p.src || '').replace(/'/g, "\\\\'")}')">Select</button>
          </div>
        \`).join('');
      } catch (e) {
        grid.innerHTML = '<p class="no-photos">Failed to load photos from Pexels: ' + e.message + '</p>';
      }
    }

    function selectPhoto(slug, photoId, photoSrc) {
      selections[slug] = { photoId, photoSrc };
      document.querySelectorAll('.photo-option').forEach(el => el.classList.remove('selected'));
      document.querySelectorAll('.photo-option[data-slug="' + slug + '"][data-photo-id="' + photoId + '"]').forEach(el => el.classList.add('selected'));
      const status = document.getElementById('status-' + slug);
      status.textContent = 'Selected: ' + photoId;
      status.classList.add('selected');
      updateSummary();
    }

    function updateSummary() {
      const count = Object.keys(selections).length;
      document.getElementById('summary').innerHTML = '<strong>Summary:</strong> ' + count + ' / ' + ARTICLES.length + ' articles selected';
    }

    renderArticles();
  </script>
</body>
</html>`;

fs.writeFileSync(OUTPUT_PATH, html, 'utf8');
console.log('Done! Written to: ' + OUTPUT_PATH);
console.log('Total articles: ' + articles.length);
