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

// Check where images come from
const domains = {};
let unsplashCount = 0;
let picsumCount = 0;
let localCount = 0;
let wikimediaCount = 0;
let otherCount = 0;

for (const p of products) {
  const url = p.primaryImage;
  try {
    const u = new URL(url);
    domains[u.hostname] = (domains[u.hostname] || 0) + 1;
    if (u.hostname.includes('unsplash')) unsplashCount++;
    else if (u.hostname.includes('picsum')) picsumCount++;
    else if (u.hostname.includes('wikimedia')) wikimediaCount++;
    else otherCount++;
  } catch (e) {
    localCount++;
  }
}

console.log('Domains:', domains);
console.log('Unsplash count:', unsplashCount);
console.log('Picsum count:', picsumCount);
console.log('Local/relative count:', localCount);
console.log('Wikimedia count:', wikimediaCount);
console.log('Other count:', otherCount);
