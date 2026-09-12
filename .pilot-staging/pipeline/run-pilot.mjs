import fs from 'fs';
import path from 'path';
import https from 'https';

const STAGING_DIR = '/Users/youssefraihane/Documents/the-motivahub.com/.pilot-staging';
const CANDIDATES_DIR = path.join(STAGING_DIR, 'candidates', 'images');
const RESPONSES_DIR = path.join(STAGING_DIR, 'candidates', 'raw-api-responses');
const REVIEWS_DIR = path.join(STAGING_DIR, 'reviews');

fs.mkdirSync(CANDIDATES_DIR, { recursive: true });

const config = JSON.parse(fs.readFileSync(path.join(STAGING_DIR, 'pipeline', 'pipeline-config.json'), 'utf8'));

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;

if (!PEXELS_API_KEY) {
  console.error('ERROR: PEXELS_API_KEY environment variable not set');
  process.exit(1);
}

function httpsRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function queryPexels(query) {
  const options = {
    hostname: 'api.pexels.com',
    path: '/v1/search?query=' + encodeURIComponent(query) + '&per_page=5&orientation=landscape',
    method: 'GET',
    headers: {
      'Authorization': PEXELS_API_KEY,
      'User-Agent': 'MotivaHub-Image-Pipeline/1.0'
    }
  };

  try {
    const result = await httpsRequest(options);
    if (result.status === 200 && result.data.photos) {
      return result.data.photos.map(photo => ({
        id: String(photo.id),
        url: photo.src.large,
        source_page: 'https://www.pexels.com/photo/' + photo.id + '/',
        photographer: photo.photographer,
        photographer_url: photo.photographer_url,
        license: photo.license || 'Pexels License',
        width: photo.width,
        height: photo.height,
        avg_color: photo.avg_color || '#000000',
        alt: photo.alt || query,
        download_url: photo.src.large,
        api_provider: 'pexels'
      }));
    }
    return [];
  } catch (error) {
    console.error('Pexels query failed for "' + query + '":', error.message);
    return [];
  }
}

async function queryUnsplash(query) {
  if (!UNSPLASH_API_KEY) return [];
  
  const options = {
    hostname: 'api.unsplash.com',
    path: '/v1/search/photos?query=' + encodeURIComponent(query) + '&per_page=5&orientation=landscape&content_filter=high',
    method: 'GET',
    headers: {
      'Authorization': 'Client-ID ' + UNSPLASH_API_KEY,
      'User-Agent': 'MotivaHub-Image-Pipeline/1.0'
    }
  };

  try {
    const result = await httpsRequest(options);
    if (result.status === 200 && result.data.results) {
      return result.data.results.map(photo => ({
        id: String(photo.id),
        url: photo.urls.regular,
        source_page: photo.links.html,
        photographer: photo.user.name,
        photographer_url: photo.user.links.html,
        license: photo.license || 'Unsplash License',
        width: photo.width,
        height: photo.height,
        avg_color: photo.color || '#000000',
        alt: photo.description || query,
        download_url: photo.urls.full || photo.urls.regular,
        api_provider: 'unsplash'
      }));
    }
    return [];
  } catch (error) {
    console.error('Unsplash query failed for "' + query + '":', error.message);
    return [];
  }
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        https.get(res.headers.location, (res2) => {
          const file = fs.createWriteStream(filepath);
          res2.pipe(file);
          file.on('finish', () => { file.close(); resolve(filepath); });
        }).on('error', reject);
      } else {
        const file = fs.createWriteStream(filepath);
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(filepath); });
      }
    }).on('error', reject);
  });
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
  const exactMatch = existingUrls.has(candidate.url);
  const photographerCount = photographerCounts[candidate.photographer] || 0;
  const flagged = exactMatch || photographerCount >= 3;
  
  return {
    exact_match: exactMatch,
    photographer_count: photographerCount + 1,
    flagged,
    flag_reason: exactMatch ? 'URL already in use' : 
                 photographerCount >= 3 ? 'Photographer saturation (3+ images)' : 
                 photographerCount >= 2 ? 'Photographer has 2+ images in candidate set' : null
  };
}

async function runPilot() {
  console.log('=== MOTIVAHUB IMAGE PIPELINE — REAL 5-ARTICLE PILOT ===\n');
  console.log('API keys loaded from environment variables');
  console.log('Pexels API: ' + (PEXELS_API_KEY ? 'Available' : 'MISSING'));
  console.log('Unsplash API: ' + (UNSPLASH_API_KEY ? 'Available' : 'MISSING'));
  console.log('');

  const articles = config.pilot_articles;
  const allResults = {};
  const existingUrls = new Set();
  const photographerCounts = {};

  const productionImagesDir = '/Users/youssefraihane/Documents/the-motivahub.com/public/images/blog';
  for (const file of fs.readdirSync(productionImagesDir)) {
    if (file.endsWith('.jpg')) {
      existingUrls.add('https://images.pexels.com/photos/' + file.replace('.jpg', ''));
    }
  }

  for (const article of articles) {
    console.log('');
    console.log('='.repeat(60));
    console.log('Processing: ' + article.slug);
    console.log('Title: ' + article.title);
    console.log('='.repeat(60));

    const candidates = [];
    const queries = [
      ...article.search_queries.pexels.map(q => ({ query: q, provider: 'pexels' })),
      ...article.search_queries.unsplash.map(q => ({ query: q, provider: 'unsplash' }))
    ];

    for (const { query, provider } of queries) {
      console.log('');
      console.log('  Querying ' + provider + ': "' + query + '"');
      
      let results = [];
      if (provider === 'pexels') {
        results = await queryPexels(query);
      } else if (provider === 'unsplash' && UNSPLASH_API_KEY) {
        results = await queryUnsplash(query);
      }

      console.log('    Found ' + results.length + ' candidates');

      for (const candidate of results.slice(0, 3)) {
        const validation = validateCandidate(candidate, article);
        const duplicateCheck = checkDuplicate(candidate, existingUrls, photographerCounts);
        
        const candidateEntry = {
          ...candidate,
          query_used: query,
          api_provider: provider,
          validation,
          duplicate_check: duplicateCheck,
          status: 'pending_review'
        };

        candidates.push(candidateEntry);
        photographerCounts[candidate.photographer] = (photographerCounts[candidate.photographer] || 0) + 1;
        
        const status = validation.flagged || duplicateCheck.flagged ? 'FLAGGED' : 'OK';
        console.log('    Candidate ' + candidates.length + ': ' + candidate.id + ' (' + candidate.width + 'x' + candidate.height + ') - ' + status);
      }
    }

    const seenUrls = new Set();
    const uniqueCandidates = candidates.filter(c => {
      if (seenUrls.has(c.url)) return false;
      seenUrls.add(c.url);
      return true;
    });

    allResults[article.slug] = {
      article: article.slug,
      url: article.url,
      title: article.title,
      topic: article.topic,
      current_image: article.current_image,
      visual_brief: article.visual_brief,
      candidates: uniqueCandidates,
      summary: {
        total_candidates: uniqueCandidates.length,
        passed_technical_validation: uniqueCandidates.filter(c => !c.validation.flagged).length,
        flagged_duplicates: uniqueCandidates.filter(c => c.duplicate_check.flagged).length,
        available_for_human_review: uniqueCandidates.filter(c => !c.validation.flagged).length
      }
    };

    fs.writeFileSync(
      path.join(RESPONSES_DIR, article.slug + '.json'),
      JSON.stringify(allResults[article.slug], null, 2)
    );
  }

  generateReviewHTML(allResults, articles);
  generateValidationReport(allResults);
  generateDuplicateReport(allResults);

  console.log('');
  console.log('=== PILOT COMPLETE ===');
  console.log('All candidates saved to .pilot-staging/candidates/');
  console.log('Review HTML generated: .pilot-staging/reviews/pilot-review.html');
  console.log('');
  console.log('STOPPING — No production files modified. Awaiting human review.');
}

function generateReviewHTML(results, articles) {
  const totalCandidates = Object.values(results).reduce((sum, r) => sum + r.summary.total_candidates, 0);
  
  let html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>MotivaHub Image Review — Real Pilot Batch</title><style>';
  html += '* { margin: 0; padding: 0; box-sizing: border-box; }';
  html += 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f5f5f5; padding: 20px; line-height: 1.6; }';
  html += '.header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }';
  html += 'h1 { color: #333; margin-bottom: 10px; }';
  html += '.pilot-info { background: #e3f2fd; padding: 15px; border-radius: 4px; margin-bottom: 20px; }';
  html += '.article-section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }';
  html += '.article-header { border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 15px; }';
  html += '.article-title { font-size: 20px; color: #333; margin-bottom: 5px; }';
  html += '.article-meta { font-size: 14px; color: #666; }';
  html += '.visual-brief { background: #fff3e0; padding: 10px; border-radius: 4px; margin: 10px 0; font-style: italic; }';
  html += '.candidate-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 20px; margin-top: 15px; }';
  html += '.candidate-card { border: 2px solid #ddd; border-radius: 8px; padding: 15px; background: #fafafa; }';
  html += '.candidate-card.flagged { border-color: #ff9800; background: #fff8e1; }';
  html += '.candidate-card.approved { border-color: #4caf50; background: #f1f8f4; }';
  html += '.candidate-card.rejected { border-color: #f44336; background: #fef5f5; opacity: 0.6; }';
  html += '.candidate-image { width: 100%; height: 250px; object-fit: cover; border-radius: 4px; margin-bottom: 10px; background: #eee; }';
  html += '.candidate-meta { font-size: 13px; color: #666; margin-bottom: 10px; }';
  html += '.candidate-meta strong { color: #333; }';
  html += '.validation-flags { padding: 8px; border-radius: 4px; margin: 10px 0; font-size: 12px; }';
  html += '.validation-flags.warning { background: #fff8e1; }';
  html += '.validation-flags.error { background: #fef5f5; }';
  html += '.actions { margin-top: 10px; display: flex; gap: 10px; }';
  html += 'button { padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500; }';
  html += '.approve-btn { background: #4caf50; color: white; }';
  html += '.approve-btn:hover { background: #45a049; }';
  html += '.reject-btn { background: #f44336; color: white; }';
  html += '.reject-btn:hover { background: #d32f2f; }';
  html += '.notes-field { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin-top: 10px; font-family: inherit; }';
  html += '.status-badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; margin-left: 10px; }';
  html += '.status-pending { background: #ff9800; color: white; }';
  html += '.status-approved { background: #4caf50; color: white; }';
  html += '.status-rejected { background: #f44336; color: white; }';
  html += '.summary { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }';
  html += '.disclaimer { background: #ffebee; padding: 15px; border-radius: 4px; margin-top: 20px; font-size: 14px; color: #c62828; }';
  html += '</style></head><body>';

  html += '<div class="header"><h1>MotivaHub Image Review — Real Pilot Batch</h1>';
  html += '<p><strong>Pilot Date:</strong> 2026-09-10</p>';
  html += '<p><strong>Articles:</strong> ' + articles.length + '</p>';
  html += '<p><strong>Candidates:</strong> ' + totalCandidates + ' total</p>';
  html += '<p><strong>Mode:</strong> REAL API — STAGING ONLY — No production changes</p></div>';

  html += '<div class="pilot-info"><strong>INSTRUCTIONS:</strong> Review each candidate image below. Click "Approve" for images that genuinely match the article\'s visual brief. Click "Reject" for images that are weak, generic, or off-concept. Add notes to explain your decision.<br><br><strong>Remember:</strong> Metadata validation has filtered obviously bad candidates. Your job is to judge VISUAL RELEVANCE and EDITORIAL QUALITY.</div>';

  for (const article of articles) {
    const result = results[article.slug];
    if (!result) continue;

    html += '<div class="article-section" data-article="' + article.slug + '">';
    html += '<div class="article-header">';
    html += '<div class="article-title">' + article.slug + ' <span class="status-badge status-pending">PENDING</span></div>';
    html += '<div class="article-meta"><strong>Title:</strong> ' + article.title + '<br>';
    html += '<strong>Topic:</strong> ' + article.topic + '<br>';
    html += '<strong>Current Image:</strong> ' + article.current_image + ' (' + (article.is_picsum ? 'Picsum placeholder' : 'Real photo') + ')</div>';
    html += '<div class="visual-brief"><strong>Visual Brief:</strong> ' + article.visual_brief + '</div>';
    html += '</div><div class="candidate-grid">';

    for (const candidate of result.candidates) {
      if (candidate.validation.flagged) continue;
      
      const statusClass = candidate.duplicate_check.flagged ? 'flagged' : '';
      html += '<div class="candidate-card ' + statusClass + '" data-candidate-id="' + candidate.id + '">';
      html += '<img class="candidate-image" src="' + candidate.url + '" alt="' + candidate.alt + '" loading="lazy">';
      html += '<div class="candidate-meta"><strong>Photographer:</strong> ' + candidate.photographer + '<br>';
      html += '<strong>Source:</strong> <a href="' + candidate.source_page + '" target="_blank">' + candidate.api_provider + ' #' + candidate.id + '</a><br>';
      html += '<strong>Dimensions:</strong> ' + candidate.width + '×' + candidate.height + '<br>';
      html += '<strong>License:</strong> ' + candidate.license + '<br>';
      if (candidate.alt) {
        html += '<strong>Alt text:</strong> ' + candidate.alt + '</div>';
      }
      
      const flagClass = candidate.validation.flagged ? 'error' : '';
      html += '<div class="validation-flags ' + flagClass + '">';
      html += (candidate.validation.dimensions_ok ? '✅' : '❌') + ' Dimensions | ';
      html += (candidate.validation.aspect_ratio_ok ? '✅' : '❌') + ' Aspect Ratio | ';
      html += (candidate.validation.license_ok ? '✅' : '❌') + ' License | ';
      html += (candidate.validation.source_url_ok ? '✅' : '❌') + ' Source URL | ';
      html += (candidate.validation.download_url_ok ? '✅' : '❌') + ' Download URL';
      html += '</div>';
      
      if (candidate.duplicate_check.flagged) {
        html += '<div class="validation-flags warning">⚠️ <strong>Duplicate flag:</strong> ' + candidate.duplicate_check.flag_reason + '</div>';
      }
      
      html += '<div class="actions">';
      html += '<button class="approve-btn" onclick="approve(\'' + article.slug + '\', \'' + candidate.id + '\')">Approve</button>';
      html += '<button class="reject-btn" onclick="reject(\'' + article.slug + '\', \'' + candidate.id + '\')">Reject</button>';
      html += '</div>';
      html += '<textarea class="notes-field" rows="2" placeholder="Add review notes..."></textarea>';
      html += '</div>';
    }

    html += '</div></div>';
  }

  html += '<div class="summary"><h2>Review Summary</h2>';
  html += '<p><strong>Total Articles:</strong> ' + articles.length + '</p>';
  html += '<p><strong>Total Candidates:</strong> ' + totalCandidates + '</p>';
  html += '<p><strong>Status:</strong> Awaiting human review decisions</p></div>';

  html += '<div class="disclaimer"><strong>IMPORTANT:</strong> This is a STAGING REVIEW PAGE only. No production files have been modified. No images have been downloaded to the production image directory. Integration will only occur after explicit human approval.</div>';

  html += '<script>';
  html += 'function approve(article, candidateId) {';
  html += '  const card = document.querySelector("[data-article=\'" + article + "\'] [data-candidate-id=\'" + candidateId + "\']");';
  html += '  card.classList.remove("flagged");';
  html += '  card.classList.add("approved");';
  html += '  const badge = document.querySelector("[data-article=\'" + article + "\'] .status-badge");';
  html += '  badge.textContent = "APPROVED";';
  html += '  badge.className = "status-badge status-approved";';
  html += '  card.querySelectorAll("button").forEach(b => b.disabled = true);';
  html += '}';
  html += 'function reject(article, candidateId) {';
  html += '  const card = document.querySelector("[data-article=\'" + article + "\'] [data-candidate-id=\'" + candidateId + "\']");';
  html += '  card.classList.remove("flagged");';
  html += '  card.classList.add("rejected");';
  html += '  card.querySelectorAll("button").forEach(b => b.disabled = true);';
  html += '}';
  html += '</script></body></html>';

  fs.writeFileSync(path.join(REVIEWS_DIR, 'pilot-review.html'), html);
}

function generateValidationReport(results) {
  const report = {
    pilot_run_date: new Date().toISOString(),
    total_articles: Object.keys(results).length,
    total_candidates: Object.values(results).reduce((sum, r) => sum + r.summary.total_candidates, 0),
    validation_summary: {
      passed_technical_validation: 0,
      flagged_dimensions: 0,
      flagged_aspect_ratio: 0,
      flagged_license: 0,
      flagged_source_url: 0,
      flagged_download_url: 0,
      auto_rejected: 0
    },
    articles: []
  };

  for (const [slug, result] of Object.entries(results)) {
    const articleReport = {
      slug,
      candidates_total: result.summary.total_candidates,
      passed_technical_validation: result.summary.passed_technical_validation,
      flagged_duplicates: result.summary.flagged_duplicates,
      available_for_human_review: result.summary.available_for_human_review,
      candidates: result.candidates.map(c => ({
        id: c.id,
        url: c.url,
        validation: c.validation,
        duplicate_check: c.duplicate_check
      }))
    };
    report.articles.push(articleReport);
    report.validation_summary.passed_technical_validation += result.summary.passed_technical_validation;
    
    for (const c of result.candidates) {
      if (!c.validation.dimensions_ok) report.validation_summary.flagged_dimensions++;
      if (!c.validation.aspect_ratio_ok) report.validation_summary.flagged_aspect_ratio++;
      if (!c.validation.license_ok) report.validation_summary.flagged_license++;
      if (!c.validation.source_url_ok) report.validation_summary.flagged_source_url++;
      if (!c.validation.download_url_ok) report.validation_summary.flagged_download_url++;
      if (c.validation.flagged) report.validation_summary.auto_rejected++;
    }
  }

  fs.writeFileSync(path.join(REVIEWS_DIR, 'validation-report.json'), JSON.stringify(report, null, 2));
}

function generateDuplicateReport(results) {
  const report = {
    pilot_run_date: new Date().toISOString(),
    total_images_checked: Object.values(results).reduce((sum, r) => sum + r.summary.total_candidates, 0),
    duplicate_summary: {
      exact_url_matches: 0,
      photographer_saturation_flags: 0,
      color_similarity_flags: 0,
      near_duplicates: 0
    },
    flagged_duplicates: []
  };

  const photographerCounts = {};
  const urlSet = new Set();

  for (const result of Object.values(results)) {
    for (const candidate of result.candidates) {
      if (urlSet.has(candidate.url)) {
        report.duplicate_summary.exact_url_matches++;
      }
      urlSet.add(candidate.url);

      photographerCounts[candidate.photographer] = (photographerCounts[candidate.photographer] || 0) + 1;
    }
  }

  for (const [photographer, count] of Object.entries(photographerCounts)) {
    if (count >= 2) {
      report.duplicate_summary.photographer_saturation_flags++;
      report.flagged_duplicates.push({
        type: 'photographer_saturation',
        photographer,
        count,
        recommendation: count >= 3 ? 'Select only 1 image from this photographer' : 'Consider variety'
      });
    }
  }

  fs.writeFileSync(path.join(REVIEWS_DIR, 'duplicate-report.json'), JSON.stringify(report, null, 2));
}

runPilot().catch(error => {
  console.error('Pilot failed:', error);
  process.exit(1);
});
