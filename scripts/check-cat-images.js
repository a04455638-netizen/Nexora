const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Match category and primaryImage
const productBlocks = content.split(/\{\s*"id":/);

const catData = {};

for (const b of productBlocks.slice(1)) {
  const catMatch = b.match(/"category":\s*"([^"]+)"/);
  const nameMatch = b.match(/"name":\s*"([^"]+)"/);
  const imgMatch = b.match(/"primaryImage":\s*"([^"]+)"/);

  if (catMatch && imgMatch && nameMatch) {
    const cat = catMatch[1];
    const name = nameMatch[1];
    const img = imgMatch[1];

    if (!catData[cat]) {
      catData[cat] = { total: 0, images: new Set(), items: [] };
    }
    catData[cat].total++;
    catData[cat].images.add(img);
    catData[cat].items.push({ name, img });
  }
}

console.log("=== CATEGORY IMAGE STATS ===");
for (const [cat, data] of Object.entries(catData)) {
  console.log(`${cat.padEnd(20)}: Total = ${data.total}, Unique Images = ${data.images.size}`);
}
