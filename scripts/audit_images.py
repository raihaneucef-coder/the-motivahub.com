#!/usr/bin/env python3
import os, re, glob, urllib.request, urllib.error, ssl

EXCLUDED = {'deep-work-ritual', 'vaincre-procrastination', 'meal-prep-dimanche', 'langage-corps-confiance', 'community-discipline'}
BASE = '/Users/youssefraihane/Documents/the-motivahub.com/src/content/blog'
URL_BASE = 'https://the-motivahub.com/journal'

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

articles = []
for f in sorted(glob.glob(os.path.join(BASE, '*.md'))):
    slug = os.path.basename(f).replace('.md', '')
    if slug in EXCLUDED:
        continue
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read(3000)
    title_m = re.search(r'^title:\s*["\'](.+?)["\']', content, re.MULTILINE)
    image_m = re.search(r'^image:\s*["\'](.+?)["\']', content, re.MULTILINE)
    title = title_m.group(1) if title_m else 'NO TITLE'
    image = image_m.group(1) if image_m else 'NO IMAGE'
    articles.append((slug, title, image))

# fetch live pages and extract first blog image
results = []
for slug, title, image in articles:
    url = f'{URL_BASE}/{slug}/'
    live_img = None
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
        # look for og:image first
        m = re.search(r'<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if not m:
            m = re.search(r'<meta[^>]*content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']', html, re.IGNORECASE)
        if m:
            live_img = m.group(1)
        else:
            # fallback: first img in article content
            m = re.search(r'<article[^>]*>.*?<img[^>]+src=["\']([^"\']+)["\']', html, re.DOTALL | re.IGNORECASE)
            if not m:
                m = re.search(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*>', html)
            if m:
                live_img = m.group(1)
    except Exception as e:
        live_img = f'ERROR: {e}'
    results.append((slug, title, image, live_img))

for r in results:
    print('|'.join(str(x) for x in r))
