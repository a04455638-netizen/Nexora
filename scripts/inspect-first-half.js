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

const targetCats = ['gpus', 'laptops', 'desktops', 'cpus', 'monitors', 'tvs', 'tablets'];
targetCats.forEach(cat => {
  const prods = products.filter(p => p.category === cat);
  console.log(`\n================== ${cat.toUpperCase()} (${prods.length}) ==================`);
  prods.forEach(p => console.log(`${p.id} | ${p.brand} | ${p.model} | ${p.name}`));
});
