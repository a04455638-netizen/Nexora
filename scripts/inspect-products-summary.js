const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');

// Parse products
let clean = content.replace(/import\s+.*?;/g, '');
clean = clean.replace(/export\s+const\s+INITIAL_PRODUCTS:\s*Product\[\]\s*=\s*/, 'const products = ');
clean += '\nmodule.exports = products;';

const vm = require('vm');
const script = new vm.Script(clean);
const context = { module: {}, console };
vm.createContext(context);
script.runInContext(context);

const products = context.module.exports;
console.log('Total Products:', products.length);

const cats = {};
let withGallery = 0;
let missingImage = 0;
for (const p of products) {
  cats[p.category] = (cats[p.category] || 0) + 1;
  if (p.galleryImages && p.galleryImages.length > 0) withGallery++;
  if (!p.primaryImage) missingImage++;
}

console.log('Categories breakdown:', cats);
console.log('With gallery:', withGallery);
console.log('Missing primary image:', missingImage);
