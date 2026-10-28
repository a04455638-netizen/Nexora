const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');

const items = [];
const blocks = content.split(/\{\s*"id":/);

for (const b of blocks.slice(1)) {
  const id = b.match(/"id":\s*"([^"]+)"/)?.[1];
  const name = b.match(/"name":\s*"([^"]+)"/)?.[1];
  const category = b.match(/"category":\s*"([^"]+)"/)?.[1];
  const model = b.match(/"model":\s*"([^"]+)"/)?.[1];
  const brand = b.match(/"brand":\s*"([^"]+)"/)?.[1];

  if (id && name && category) {
    items.push({ id, name, category, brand, model });
  }
}

fs.writeFileSync('scripts/products_manifest.json', JSON.stringify(items, null, 2));
console.log(`Extracted ${items.length} products to scripts/products_manifest.json`);
