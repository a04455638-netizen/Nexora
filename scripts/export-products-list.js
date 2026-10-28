


const fs = require('fs');
const content = fs.readFileSync('src/data/products.ts', 'utf8');

let clean = content.replace(/import\s+.*?;/g, '');
clean = clean.replace(/export\s+const\s+INITIAL_PRODUCTS:\s*Product\[\]\s*=\s*/, 'const products = ');
clean += '\nmodule.exports = products;';

const vm = require('vm');
const script = new vm.Script(clean);
const context = { module: {}, console };
vm.createContext(context);
script.runInContext(context);

const products = context.module.exports;

const summary = products.map(p => ({
  id: p.id,
  category: p.category,
  categoryName: p.categoryName,
  brand: p.brand,
  model: p.model,
  name: p.name,
  currentImage: p.primaryImage,
  galleryCount: p.galleryImages ? p.galleryImages.length : 0
}));

fs.writeFileSync('scripts/products_list.json', JSON.stringify(summary, null, 2));
console.log('Saved', summary.length, 'products to scripts/products_list.json');
