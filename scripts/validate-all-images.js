const fs = require('fs');
const https = require('https');

const content = fs.readFileSync('src/data/products.ts', 'utf8');
const urls = [...new Set([...content.matchAll(/"primaryImage":\s*"([^"]+)"/g)].map(m => m[1]))];

console.log(`Checking ${urls.length} unique primaryImage URLs...`);

async function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
    });
    req.on('error', (err) => resolve({ url, status: 0, ok: false, error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 408, ok: false }); });
    req.end();
  });
}

async function run() {
  const results = [];
  // check in batches of 10
  for (let i = 0; i < urls.length; i += 10) {
    const batch = urls.slice(i, i + 10);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);
    process.stdout.write(`\rChecked ${results.length}/${urls.length} URLs...`);
  }

  const failed = results.filter(r => !r.ok);
  console.log(`\n\nTotal URLs: ${results.length}`);
  console.log(`Successful: ${results.length - failed.length}`);
  console.log(`Failed/Slow: ${failed.length}`);

  if (failed.length > 0) {
    console.log("\nFAILED URLS:");
    failed.forEach(f => console.log(`[${f.status}] ${f.url} (${f.error || 'bad status'})`));
  }
}

run().catch(console.error);
