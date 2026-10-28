const fs = require('fs');
const path = require('path');

const products = require('./products_full.json');

// Update all products
for (const p of products) {
  p.primaryImage = `/products/${p.id}.svg`;
  p.galleryImages = [`/products/${p.id}.svg`, `/products/${p.id}-detail.svg`];
}

// 1. Write to src/data/products.ts
const tsContent = `import { Product } from "@/types";

export const INITIAL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'products.ts'), tsContent, 'utf8');
console.log('Successfully updated src/data/products.ts with', products.length, 'products');

// 2. Write to .data/nexora_store.json
const dbPath = path.join(__dirname, '..', '.data', 'nexora_store.json');
if (fs.existsSync(dbPath)) {
  const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  dbData.products = products;
  
  // Also check marketplace items
  if (dbData.marketplace) {
    dbData.marketplace.forEach(mp => {
      if (mp.primaryImage && mp.primaryImage.includes('unsplash')) {
        mp.primaryImage = `/products/placeholder-${mp.category || 'default'}.svg`;
        mp.galleryImages = [mp.primaryImage];
      }
    });
  }

  fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
  console.log('Successfully updated .data/nexora_store.json with clean products and marketplace items');
}
