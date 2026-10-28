const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'public', 'products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const categories = [
  { slug: 'smartphones', name: 'Smartfonlar', iconType: 'phone' },
  { slug: 'laptops', name: 'Noutbuklar', iconType: 'laptop' },
  { slug: 'desktops', name: 'Stol kompyuterlari', iconType: 'pc' },
  { slug: 'gpus', name: 'Videokartalar', iconType: 'gpu' },
  { slug: 'cpus', name: 'Protsessorlar', iconType: 'cpu' },
  { slug: 'monitors', name: 'Monitorlar', iconType: 'monitor' },
  { slug: 'tvs', name: 'Televizorlar', iconType: 'tv' },
  { slug: 'tablets', name: 'Planshetlar', iconType: 'tablet' },
  { slug: 'smartwatches', name: 'Smart-soatlar', iconType: 'watch' },
  { slug: 'headphones', name: 'Quloqchinlar', iconType: 'audio' },
  { slug: 'gaming-accessories', name: 'Gaming aksessuarlari', iconType: 'game' },
  { slug: 'keyboards-mice', name: 'Klaviaturalar va sichqonchalar', iconType: 'keyboard' },
  { slug: 'appliances', name: 'Maishiy texnika', iconType: 'home' },
  { slug: 'storage-routers', name: 'Routerlar va saqlash', iconType: 'storage' },
  { slug: 'other', name: 'Boshqa elektronika', iconType: 'other' },
  { slug: 'default', name: 'Texnika mahsuloti', iconType: 'default' }
];

function getCategoryIcon(type) {
  switch (type) {
    case 'phone':
      return `
        <rect x="350" y="160" width="100" height="190" rx="20" fill="#1C1C20" stroke="#76B900" stroke-width="3"/>
        <rect x="360" y="175" width="80" height="160" rx="12" fill="#141416"/>
        <circle cx="400" cy="183" r="3.5" fill="#76B900"/>
        <line x1="388" y1="322" x2="412" y2="322" stroke="#444" stroke-width="3" stroke-linecap="round"/>
      `;
    case 'laptop':
      return `
        <rect x="310" y="180" width="180" height="120" rx="8" fill="#1C1C20" stroke="#76B900" stroke-width="3"/>
        <rect x="322" y="192" width="156" height="96" rx="4" fill="#141416"/>
        <path d="M280 300 L520 300 L505 320 L295 320 Z" fill="#242428" stroke="#76B900" stroke-width="2"/>
        <line x1="380" y1="306" x2="420" y2="306" stroke="#555" stroke-width="2" stroke-linecap="round"/>
      `;
    case 'gpu':
      return `
        <rect x="300" y="190" width="200" height="120" rx="10" fill="#1C1C20" stroke="#76B900" stroke-width="3"/>
        <circle cx="355" cy="250" r="38" fill="#141416" stroke="#333" stroke-width="3"/>
        <circle cx="445" cy="250" r="38" fill="#141416" stroke="#333" stroke-width="3"/>
        <circle cx="355" cy="250" r="14" fill="#76B900" opacity="0.3"/>
        <circle cx="445" cy="250" r="14" fill="#76B900" opacity="0.3"/>
        <rect x="310" y="310" width="70" height="8" rx="2" fill="#D4AF37"/>
        <text x="320" y="210" fill="#76B900" font-family="sans-serif" font-weight="900" font-size="10" letter-spacing="2">GEFORCE RTX</text>
      `;
    case 'cpu':
      return `
        <rect x="330" y="180" width="140" height="140" rx="10" fill="#222228" stroke="#76B900" stroke-width="3"/>
        <rect x="350" y="200" width="100" height="100" rx="6" fill="#1A1A1E" stroke="#555" stroke-width="1.5"/>
        <circle cx="340" cy="190" r="4" fill="#76B900"/>
        <line x1="330" y1="210" x2="320" y2="210" stroke="#76B900" stroke-width="2"/>
        <line x1="330" y1="230" x2="320" y2="230" stroke="#76B900" stroke-width="2"/>
        <line x1="330" y1="250" x2="320" y2="250" stroke="#76B900" stroke-width="2"/>
        <line x1="330" y1="270" x2="320" y2="270" stroke="#76B900" stroke-width="2"/>
        <line x1="470" y1="210" x2="480" y2="210" stroke="#76B900" stroke-width="2"/>
        <line x1="470" y1="230" x2="480" y2="230" stroke="#76B900" stroke-width="2"/>
        <line x1="470" y1="250" x2="480" y2="250" stroke="#76B900" stroke-width="2"/>
        <line x1="470" y1="270" x2="480" y2="270" stroke="#76B900" stroke-width="2"/>
        <text x="400" y="255" text-anchor="middle" fill="#76B900" font-family="monospace" font-weight="bold" font-size="14">CPU</text>
      `;
    case 'monitor':
    case 'tv':
      return `
        <rect x="300" y="170" width="200" height="130" rx="8" fill="#18181C" stroke="#76B900" stroke-width="3"/>
        <rect x="312" y="182" width="176" height="106" rx="4" fill="#121215"/>
        <rect x="392" y="300" width="16" height="24" fill="#222"/>
        <path d="M360 324 L440 324" stroke="#76B900" stroke-width="4" stroke-linecap="round"/>
        <polygon points="385,225 385,245 405,235" fill="#76B900" opacity="0.6"/>
      `;
    case 'audio':
      return `
        <path d="M330 250 A70 70 0 0 1 470 250" fill="none" stroke="#76B900" stroke-width="5" stroke-linecap="round"/>
        <rect x="320" y="235" width="24" height="46" rx="10" fill="#222" stroke="#76B900" stroke-width="2.5"/>
        <rect x="456" y="235" width="24" height="46" rx="10" fill="#222" stroke="#76B900" stroke-width="2.5"/>
      `;
    case 'game':
      return `
        <rect x="325" y="200" width="150" height="100" rx="30" fill="#1C1C22" stroke="#76B900" stroke-width="3"/>
        <circle cx="365" cy="245" r="14" fill="#141416"/>
        <line x1="365" y1="237" x2="365" y2="253" stroke="#76B900" stroke-width="3" stroke-linecap="round"/>
        <line x1="357" y1="245" x2="373" y2="245" stroke="#76B900" stroke-width="3" stroke-linecap="round"/>
        <circle cx="435" cy="240" r="5" fill="#76B900"/>
        <circle cx="445" cy="250" r="5" fill="#76B900" opacity="0.7"/>
        <circle cx="425" cy="250" r="5" fill="#76B900" opacity="0.7"/>
        <circle cx="435" cy="260" r="5" fill="#76B900" opacity="0.7"/>
      `;
    default:
      return `
        <rect x="340" y="180" width="120" height="120" rx="20" fill="#1C1C22" stroke="#76B900" stroke-width="3"/>
        <circle cx="400" cy="240" r="30" fill="none" stroke="#76B900" stroke-width="3" stroke-dasharray="6,4"/>
        <circle cx="400" cy="240" r="8" fill="#76B900"/>
      `;
  }
}

for (const cat of categories) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E0E11" />
      <stop offset="50%" stop-color="#141418" />
      <stop offset="100%" stop-color="#09090B" />
    </linearGradient>
    <radialGradient id="neonGlow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#76B900" stop-opacity="0.16" />
      <stop offset="70%" stop-color="#76B900" stop-opacity="0.02" />
      <stop offset="100%" stop-color="#76B900" stop-opacity="0" />
    </radialGradient>
    <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="600" fill="url(#bg)" />
  <circle cx="400" cy="250" r="280" fill="url(#neonGlow)" />

  <!-- Outer Tech Border -->
  <rect x="25" y="25" width="750" height="550" rx="24" fill="none" stroke="#25252A" stroke-width="2" />
  <rect x="23" y="23" width="754" height="554" rx="25" fill="none" stroke="#76B900" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="16,8" />

  <!-- Top Header / Branding -->
  <g transform="translate(60, 65)">
    <text x="0" y="0" fill="#76B900" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="20" letter-spacing="3">NEXORA</text>
    <text x="110" y="0" fill="#666672" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" letter-spacing="1">| PREMIUM TECH STORE</text>
  </g>

  <!-- Category Tag -->
  <g transform="translate(740, 65)">
    <rect x="-170" y="-18" width="170" height="30" rx="15" fill="#1B1B22" stroke="#33333E" stroke-width="1.5"/>
    <text x="-85" y="2" text-anchor="middle" fill="#A0A0B0" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="11" letter-spacing="1">${cat.name.toUpperCase()}</text>
  </g>

  <!-- Category Center Illustration -->
  <g id="illustration">
    ${getCategoryIcon(cat.iconType)}
  </g>

  <!-- Professional Placeholder Notice Box -->
  <g transform="translate(400, 395)">
    <rect x="-240" y="0" width="480" height="64" rx="16" fill="#16161C" stroke="#2E2E38" stroke-width="1.5"/>
    <!-- Neon Accent Pill -->
    <rect x="-238" y="2" width="6" height="60" rx="3" fill="#76B900"/>

    <text x="0" y="27" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="16" letter-spacing="0.5">
      Mahsulot rasmi mavjud emas
    </text>
    <text x="0" y="47" text-anchor="middle" fill="#888896" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="12">
      ${cat.name} bo'yicha rasmiy texnik xususiyatlar to'liq tasdiqlangan
    </text>
  </g>

  <!-- Bottom Specs & Guarantee Footnote -->
  <g transform="translate(400, 515)">
    <circle cx="-130" cy="-2" r="4" fill="#76B900" />
    <text x="-115" y="2" fill="#A0A0B2" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="12">
      100% Original Texnika
    </text>

    <circle cx="10" cy="-2" r="4" fill="#76B900" />
    <text x="25" y="2" fill="#A0A0B2" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="12">
      Rasmiy NEXORA Kafolati
    </text>
  </g>
</svg>`;

  const fileName = `placeholder-${cat.slug}.svg`;
  fs.writeFileSync(path.join(outDir, fileName), svg);
}

console.log('Successfully generated', categories.length, 'category placeholders in public/products/');
