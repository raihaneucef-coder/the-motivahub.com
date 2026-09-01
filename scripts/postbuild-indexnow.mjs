// Post-build: notify IndexNow (Bing + Yandex) that pages are fresh.
// Verifies key file first, then submits sitemap URLs.
// Gracefully no-ops if INDEXNOW_KEY not set.

const KEY = process.env.INDEXNOW_KEY || "eb6a9565c4614708a8f55f09aefa0e67";
const HOST = "the-motivahub.com";
const KEY_URL = `https://${HOST}/${KEY}.txt`;

async function verifyKey() {
  try {
    const res = await fetch(KEY_URL);
    const text = (await res.text()).trim();
    return text === KEY;
  } catch {
    return false;
  }
}

async function submit(urls) {
  const batchSize = 10000;
  let submitted = 0;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    try {
      const res = await fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          host: HOST,
          key: KEY,
          keyLocation: KEY_URL,
          urlList: batch,
        }),
      });
      console.log(`  Batch ${Math.floor(i / batchSize) + 1}: HTTP ${res.status}`);
      if (res.ok || res.status === 200 || res.status === 202) {
        submitted += batch.length;
      }
    } catch (e) {
      console.error(`  Batch failed: ${e.message}`);
    }
  }
  return submitted;
}

const { readFile } = await import("node:fs/promises");
try {
  const sitemap = await readFile("dist/sitemap-0.xml", "utf8");
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`○ IndexNow: ${urls.length} URLs in sitemap`);

  console.log("○ Verifying key file...");
  const keyOk = await verifyKey();
  if (!keyOk) {
    console.log(`✗ Key file not yet live at ${KEY_URL}`);
    console.log("  → Will work after next deploy when key.txt is served");
    process.exit(0);
  }

  console.log("✓ Key verified, submitting URLs...");
  const submitted = await submit(urls);
  console.log(`✓ Submitted ${submitted} URLs`);
} catch (e) {
  console.log(`○ IndexNow skipped: ${e.message}`);
}