# IndexNow Setup for the-motivahub.com

## What is IndexNow?
IndexNow is a free protocol that instantly notifies Bing + Yandex (and others) when pages are added/updated. Google joined IndexNow in 2024 indirectly via Yandex's network.

## Setup Steps

### 1. Generate a key (any random 32-char hex)
```bash
openssl rand -hex 16
```

Example: `a1b2c3d4e5f6...` (32 chars)

### 2. Create the key file
- Place a file at the root of your site (e.g. `/a1b2c3d4...txt`)
- File contents: just the key string

### 3. Add to Vercel env
- `INDEXNOW_KEY` = your key
- `ADMIN_TOKEN` = another secret

### 4. Submit URLs

#### Manual via URL:
```
GET https://the-motivahub.com/api/admin-indexnow?token=YOUR_ADMIN_TOKEN&urls=/best/books/,/best/focus-books/,/best/habit-books/,/best/stoicism-books/
```

#### Programmatic (after deploy):
```bash
curl -X POST https://the-motivahub.com/api/indexnow.js \
  -H "Content-Type: application/json" \
  -d '{"urls":["https://the-motivahub.com/best/books/","https://the-motivahub.com/best/focus-books/"]}'
```

#### Bulk submit all 4 Best of pages:
```bash
curl "https://the-motivahub.com/api/admin-indexnow?token=YOUR_TOKEN&urls=/best/books/,/best/focus-books/,/best/habit-books/,/best/stoicism-books/"
```

## Free Backlinks Sources
1. Reddit: r/selfimprovement, r/books, r/productivity
2. Quora: Answer questions about habits/atomic habits
3. Medium: Republish articles with canonical
4. Substack: Cross-post to newsletters
5. Pinterest: Pin book covers with links

## Bing Webmaster
- https://www.bing.com/webmasters
- Submit sitemap-index.xml manually