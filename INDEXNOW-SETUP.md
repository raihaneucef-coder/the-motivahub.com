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
- `INDEXNOW_KEY` = your key (optional — the postbuild script falls back to the deployed key file)

### 4. Submit URLs

#### Automatic (after every build):
`npm run build` runs `scripts/postbuild-indexnow.mjs`, which reads `dist/sitemap-0.xml` and submits all URLs directly to `api.indexnow.org` using the key file at `public/<KEY>.txt`.

#### Manual bulk run:
```bash
node scripts/indexnow-bulk.mjs
```

> Note: the old serverless endpoints `api/indexnow.js` and `api/admin-indexnow.js` were removed pre-launch (unused, and the admin one relied on an `ADMIN_TOKEN` env that was never configured). No endpoint replacement is needed — submissions go straight from the build script to IndexNow.

## Free Backlinks Sources
1. Reddit: r/selfimprovement, r/books, r/productivity
2. Quora: Answer questions about habits/atomic habits
3. Medium: Republish articles with canonical
4. Substack: Cross-post to newsletters
5. Pinterest: Pin book covers with links

## Bing Webmaster
- https://www.bing.com/webmasters
- Submit sitemap-index.xml manually