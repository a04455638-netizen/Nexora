const fs = require('fs');

const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Match id, name, category, primaryImage
const regex = /"id":\s*"([^"]+)",[\s\S]*?"name":\s*"([^"]+)",[\s\S]*?"category":\s*"([^"]+)",[\s\S]*?"primaryImage":\s*"([^"]+)"/g;

let match;
const products = [];
while ((match = regex.exec(content)) !== null) {
  products.push({
    id: match[1],
    name: match[2],
    category: match[3],
    image: match[4]
  });
}

console.log("Total extracted products:", products.length);

const imageMap = {};
for (const p of products) {
  if (!imageMap[p.image]) {
    imageMap[p.image] = [];
  }
  imageMap[p.image].push(p);
}

const duplicates = Object.entries(imageMap).filter(([img, prods]) => prods.length > 1);
console.log(`Duplicate image URLs count: ${duplicates.length}`);

console.log("\n--- DUPLICATES BREAKDOWN ---");
for (const [img, prods] of duplicates) {
  console.log(`\nURL (${prods.length} items): ${img.slice(0, 75)}...`);
  prods.forEach(p => console.log(`  - [${p.category}] ${p.name}`));
}

// Also check GPUs specifically
console.log("\n--- GPUS IMAGES ---");
products.filter(p => p.category === 'gpus').forEach(p => {
  console.log(`GPU: ${p.name} -> ${p.image.slice(0, 60)}...`);
});
