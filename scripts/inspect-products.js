const fs = require('fs');

let content = fs.readFileSync('src/data/products.ts', 'utf8');
content = content.replace(/import\s+.*?;/, '');
content = content.replace(/export\s+const\s+INITIAL_PRODUCTS:\s*Product\[\]\s*=\s*/, 'const products = ');
content = content + '\nmodule.exports = products;';

const vm = require('vm');
const script = new vm.Script(content);
const context = { module: {}, console };
vm.createContext(context);
script.runInContext(context);

const products = context.module.exports;
console.log('Successfully loaded products count:', products.length);

const categories = {};
for (const p of products) {
  if (!categories[p.category]) categories[p.category] = [];
  categories[p.category].push(p);
}

for (const [cat, prods] of Object.entries(categories)) {
  console.log(`\n================== ${cat.toUpperCase()} (${prods.length}) ==================`);
  prods.forEach(p => console.log(`${p.id} | ${p.brand} | ${p.model} | ${p.name}`));
}
