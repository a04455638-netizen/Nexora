const fs = require('fs');

const replacements = {
  "photo-1533228896884-6a8f9312804b": "photo-1565849904461-04a58ad377e0",
  "photo-1598327105741-9a7442750e32": "photo-1511707171634-5f897ff02aa9",
  "photo-1562975079-6a693d891941": "photo-1547394765-185e1e68f34e",
  "photo-1587202372132-7c6d66e746a5": "photo-1587202372634-32705e3bf49c",
  "photo-1585792180666-f75a7c4f4ef1": "photo-1527443224154-c4a3942d3acf",
  "photo-1612287233207-6f82c474d209": "photo-1550745165-9bc0b252726f",
  "photo-1622979135225-d2ba269bc1df": "photo-1593508512255-86ab42a8e620",
  "photo-1541140532154-b024d705b909": "photo-1618384887929-16ec33fab9ef",
  "photo-1629429470870-2a3b04c27a29": "photo-1615663245857-ac93bb7c39e7",
  "photo-1517668808822-9ebb02ae2a0e": "photo-1514432324607-a09d9b4aefdd"
};

let content = fs.readFileSync('src/data/products.ts', 'utf8');

for (const [badId, goodId] of Object.entries(replacements)) {
  content = content.replaceAll(badId, goodId);
}

// Ensure galleryImages match primaryImage
const productRegex = /("primaryImage":\s*"([^"]+)",[\s\S]*?"galleryImages":\s*\[)([\s\S]*?)(\])/g;
content = content.replace(productRegex, (match, prefix, primaryImg, oldGallery, suffix) => {
  return `${prefix}\n      "${primaryImg}"\n    ${suffix}`;
});

fs.writeFileSync('src/data/products.ts', content, 'utf8');
console.log("Successfully fixed all broken image URLs and synchronized galleryImages!");
