const fs = require('fs');
const path = require('path');

const products = require('./products_full.json');
const outDir = path.join(__dirname, '..', 'public', 'products');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getBrandAccent(brand) {
  const b = (brand || '').toLowerCase();
  if (b.includes('nvidia')) return { primary: '#76B900', secondary: '#1A3300' };
  if (b.includes('apple')) return { primary: '#E2E8F0', secondary: '#475569' };
  if (b.includes('samsung')) return { primary: '#3B82F6', secondary: '#1E3A8A' };
  if (b.includes('asus') || b.includes('rog')) return { primary: '#EF4444', secondary: '#7F1D1D' };
  if (b.includes('msi')) return { primary: '#DC2626', secondary: '#7F1D1D' };
  if (b.includes('gigabyte') || b.includes('aorus')) return { primary: '#F97316', secondary: '#7C2D12' };
  if (b.includes('sony') || b.includes('playstation')) return { primary: '#3B82F6', secondary: '#1E3A8A' };
  if (b.includes('xbox') || b.includes('microsoft')) return { primary: '#10B981', secondary: '#064E3B' };
  if (b.includes('nintendo')) return { primary: '#EF4444', secondary: '#991B1B' };
  if (b.includes('intel')) return { primary: '#0284C7', secondary: '#0369A1' };
  if (b.includes('amd')) return { primary: '#EF4444', secondary: '#991B1B' };
  if (b.includes('razer')) return { primary: '#22C55E', secondary: '#14532D' };
  if (b.includes('logitech')) return { primary: '#06B6D4', secondary: '#164E63' };
  if (b.includes('dyson')) return { primary: '#EC4899', secondary: '#831843' };
  if (b.includes('dji')) return { primary: '#F59E0B', secondary: '#78350F' };
  return { primary: '#76B900', secondary: '#1A3300' };
}

function renderDeviceSilhouette(p, variant = 'primary') {
  const cat = p.category;
  const brand = (p.brand || '').toLowerCase();
  const model = (p.model || '').toLowerCase();
  const name = (p.name || '').toLowerCase();
  const accent = getBrandAccent(p.brand).primary;

  // 1. SMARTPHONES
  if (cat === 'smartphones') {
    const isFold = model.includes('fold');
    const isFlip = model.includes('flip');
    const isPixel = brand.includes('google');
    const isUltra = model.includes('ultra');

    if (isFold) {
      return `
        <!-- Foldable Phone Silhouette -->
        <g transform="translate(400, 245)">
          <!-- Left screen -->
          <rect x="-135" y="-120" width="125" height="230" rx="14" fill="#18181D" stroke="#33333F" stroke-width="2.5" />
          <rect x="-128" y="-112" width="111" height="214" rx="8" fill="#0F0F13" />
          <!-- Right screen -->
          <rect x="10" y="-120" width="125" height="230" rx="14" fill="#1E1E24" stroke="#33333F" stroke-width="2.5" />
          <rect x="17" y="-112" width="111" height="214" rx="8" fill="#121217" />
          <!-- Center Hinge -->
          <rect x="-8" y="-122" width="16" height="234" rx="4" fill="#2A2A33" stroke="${accent}" stroke-width="1.5" />
          <!-- Camera Module on Right -->
          <rect x="25" y="-95" width="30" height="75" rx="10" fill="#15151A" stroke="#333" stroke-width="1.5" />
          <circle cx="40" cy="-80" r="8" fill="#0A0A0C" stroke="${accent}" stroke-width="1.5"/>
          <circle cx="40" cy="-58" r="8" fill="#0A0A0C" stroke="${accent}" stroke-width="1.5"/>
          <circle cx="40" cy="-36" r="8" fill="#0A0A0C" stroke="${accent}" stroke-width="1.5"/>
        </g>
      `;
    }

    if (isPixel) {
      return `
        <!-- Pixel Visor Silhouette -->
        <g transform="translate(400, 245)">
          <rect x="-70" y="-130" width="140" height="250" rx="26" fill="#18181D" stroke="#33333F" stroke-width="3" />
          <rect x="-62" y="-122" width="124" height="234" rx="20" fill="#101014" />
          <!-- Camera Visor Bar -->
          <rect x="-72" y="-90" width="144" height="42" rx="14" fill="#24242C" stroke="${accent}" stroke-width="2" />
          <rect x="-45" y="-76" width="50" height="18" rx="9" fill="#08080A" stroke="#444" stroke-width="1.5" />
          <circle cx="-30" cy="-67" r="5" fill="#111" stroke="${accent}" stroke-width="1.5" />
          <circle cx="-10" cy="-67" r="5" fill="#111" stroke="${accent}" stroke-width="1.5" />
          <circle cx="28" cy="-67" r="4.5" fill="#111" stroke="${accent}" stroke-width="1" />
        </g>
      `;
    }

    // Standard / Pro iPhone / Galaxy
    const isProIPhone = brand.includes('apple') && (model.includes('pro') || model.includes('16'));
    return `
      <!-- Smartphone Precision Body -->
      <g transform="translate(400, 245)">
        <!-- Titanium Outer Frame -->
        <rect x="-72" y="-130" width="144" height="250" rx="${isUltra ? '10' : '26'}" fill="#19191E" stroke="#383842" stroke-width="3.5" />
        <!-- OLED Display -->
        <rect x="-64" y="-122" width="128" height="234" rx="${isUltra ? '6' : '20'}" fill="#0D0D11" />
        
        <!-- Dynamic Island / Punch Hole -->
        ${brand.includes('apple') 
          ? `<rect x="-18" y="-114" width="36" height="11" rx="5.5" fill="#000000" stroke="#222" stroke-width="1"/>
             <circle cx="-6" cy="-108.5" r="2.5" fill="#08080C"/>
             <circle cx="8" cy="-108.5" r="3" fill="#0F172A"/>`
          : `<circle cx="0" cy="-110" r="4" fill="#000" stroke="#333" stroke-width="1"/>`
        }

        <!-- Camera Island Reflection on Back Angle or Subtle Overlay -->
        ${isProIPhone ? `
          <g transform="translate(18, -100)">
            <rect x="0" y="0" width="38" height="42" rx="12" fill="#1F1F26" stroke="${accent}" stroke-width="1.5" />
            <circle cx="12" cy="12" r="7" fill="#09090C" stroke="#4B5563" stroke-width="2"/>
            <circle cx="12" cy="30" r="7" fill="#09090C" stroke="#4B5563" stroke-width="2"/>
            <circle cx="28" cy="21" r="7" fill="#09090C" stroke="#4B5563" stroke-width="2"/>
            <circle cx="28" cy="9" r="2.5" fill="#FDE047" opacity="0.8"/>
          </g>
        ` : `
          <g transform="translate(26, -105)">
            <circle cx="8" cy="8" r="6" fill="#09090C" stroke="${accent}" stroke-width="1.5"/>
            <circle cx="8" cy="24" r="6" fill="#09090C" stroke="${accent}" stroke-width="1.5"/>
            <circle cx="8" cy="40" r="6" fill="#09090C" stroke="${accent}" stroke-width="1.5"/>
          </g>
        `}
      </g>
    `;
  }

  // 2. LAPTOPS
  if (cat === 'laptops') {
    return `
      <!-- Laptop Precision Model -->
      <g transform="translate(400, 240)">
        <!-- Display Lid -->
        <rect x="-150" y="-115" width="300" height="190" rx="10" fill="#1B1B20" stroke="#373742" stroke-width="2.5" />
        <rect x="-140" y="-105" width="280" height="170" rx="6" fill="#0C0D12" />
        <!-- Screen Horizon Tech Glow -->
        <path d="M-135 45 L-60 -20 L30 15 L135 -40 L135 60 L-135 60 Z" fill="${accent}" opacity="0.18" />
        <!-- Screen Camera & Notch -->
        <rect x="-12" y="-105" width="24" height="6" rx="2" fill="#1C1C22" />
        <circle cx="0" cy="-102" r="2" fill="#3B82F6"/>
        <!-- Laptop Base / Keyboard Deck -->
        <path d="M-180 80 L180 80 L165 110 L-165 110 Z" fill="#24242C" stroke="#3D3D4A" stroke-width="2" />
        <!-- Trackpad outline -->
        <rect x="-35" y="94" width="70" height="12" rx="2" fill="#1A1A20" stroke="#333" stroke-width="1" />
        <!-- Keyboard row simulation -->
        <line x1="-140" y1="86" x2="140" y2="86" stroke="#17171C" stroke-width="4" stroke-dasharray="8,2" />
      </g>
    `;
  }

  // 3. DESKTOPS
  if (cat === 'desktops') {
    const isMacStudio = model.includes('mac studio') || model.includes('mac mini');
    if (isMacStudio) {
      return `
        <!-- Compact Desktop Mini/Studio -->
        <g transform="translate(400, 245)">
          <rect x="-110" y="-55" width="220" height="120" rx="22" fill="#202026" stroke="#444450" stroke-width="3" />
          <rect x="-105" y="-50" width="210" height="15" rx="8" fill="#282830" />
          <circle cx="-75" cy="15" r="3" fill="${accent}" />
          <rect x="-30" y="8" width="20" height="6" rx="2" fill="#101014" />
          <rect x="0" y="8" width="20" height="6" rx="2" fill="#101014" />
          <rect x="30" y="8" width="20" height="6" rx="2" fill="#101014" />
          <circle cx="80" cy="10" r="1.5" fill="#999" />
        </g>
      `;
    }
    return `
      <!-- Desktop Gaming Rig Case -->
      <g transform="translate(400, 240)">
        <rect x="-90" y="-125" width="180" height="250" rx="14" fill="#15151A" stroke="#353540" stroke-width="3" />
        <!-- Tempered Glass Window -->
        <rect x="-80" y="-115" width="150" height="205" rx="8" fill="#0C0D12" stroke="#252530" stroke-width="2" />
        <!-- Front RGB Fans -->
        <circle cx="50" cy="-60" r="28" fill="none" stroke="${accent}" stroke-width="3.5" opacity="0.8" />
        <circle cx="50" cy="10" r="28" fill="none" stroke="${accent}" stroke-width="3.5" opacity="0.8" />
        <circle cx="50" cy="65" r="20" fill="none" stroke="${accent}" stroke-width="2.5" opacity="0.6" />
        <!-- GPU Inside Glass -->
        <rect x="-70" y="0" width="95" height="30" rx="4" fill="#1E1E24" stroke="${accent}" stroke-width="1.5" />
        <!-- AIO Liquid Cooler block -->
        <circle cx="-35" cy="-55" r="16" fill="#18181F" stroke="${accent}" stroke-width="2" />
        <path d="M-35 -55 Q-10 -75 25 -65" fill="none" stroke="#555" stroke-width="3" />
        <!-- Power Button -->
        <circle cx="55" cy="-115" r="4" fill="${accent}" />
      </g>
    `;
  }

  // 4. GPUS (VIDEOCARDS)
  if (cat === 'gpus') {
    const isDual = model.includes('dual') || model.includes('twin');
    return `
      <!-- Graphics Card Precision Architecture -->
      <g transform="translate(400, 245)">
        <!-- GPU Metal Shroud -->
        <rect x="-165" y="-85" width="330" height="155" rx="16" fill="#18181E" stroke="#3B3B48" stroke-width="3.5" />
        <!-- Triple or Dual Axial Fans -->
        ${isDual ? `
          <circle cx="-70" cy="-5" r="52" fill="#101014" stroke="#2C2C36" stroke-width="4" />
          <circle cx="70" cy="-5" r="52" fill="#101014" stroke="#2C2C36" stroke-width="4" />
          <circle cx="-70" cy="-5" r="18" fill="#181820" stroke="${accent}" stroke-width="2" />
          <circle cx="70" cy="-5" r="18" fill="#181820" stroke="${accent}" stroke-width="2" />
        ` : `
          <circle cx="-95" cy="-5" r="44" fill="#101014" stroke="#2C2C36" stroke-width="3.5" />
          <circle cx="0" cy="-5" r="44" fill="#101014" stroke="#2C2C36" stroke-width="3.5" />
          <circle cx="95" cy="-5" r="44" fill="#101014" stroke="#2C2C36" stroke-width="3.5" />
          <circle cx="-95" cy="-5" r="15" fill="#181820" stroke="${accent}" stroke-width="2" />
          <circle cx="0" cy="-5" r="15" fill="#181820" stroke="${accent}" stroke-width="2" />
          <circle cx="95" cy="-5" r="15" fill="#181820" stroke="${accent}" stroke-width="2" />
        `}
        <!-- Golden PCIe Connector -->
        <rect x="-110" y="70" width="130" height="10" rx="1.5" fill="#D4AF37" stroke="#997A15" stroke-width="1" />
        <rect x="30" y="70" width="35" height="10" rx="1.5" fill="#D4AF37" stroke="#997A15" stroke-width="1" />
        <!-- Top Illuminated Brand Name -->
        <rect x="-150" y="-75" width="120" height="16" rx="4" fill="#0C0C10" />
        <text x="-90" y="-63" text-anchor="middle" fill="${accent}" font-family="monospace" font-weight="900" font-size="10" letter-spacing="1">
          ${brand.includes('nvidia') || model.includes('rtx') ? 'GEFORCE RTX' : 'RADEON RX'}
        </text>
      </g>
    `;
  }

  // 5. CPUS (PROCESSORS)
  if (cat === 'cpus') {
    const isRyzen = brand.includes('amd') || model.includes('ryzen');
    return `
      <!-- CPU Integrated Heat Spreader -->
      <g transform="translate(400, 245)">
        <!-- Golden/Green PCB Substrate -->
        <rect x="-95" y="-95" width="190" height="190" rx="12" fill="${isRyzen ? '#0A2E12' : '#0B2545'}" stroke="#333" stroke-width="3" />
        <!-- Gold Edge Alignment Triangle -->
        <polygon points="-85,-85 -70,-85 -85,-70" fill="#EAB308" />
        <!-- Nickel Plated Copper IHS -->
        <rect x="-70" y="-70" width="140" height="140" rx="${isRyzen ? '14' : '6'}" fill="#24242C" stroke="#484856" stroke-width="3" />
        <rect x="-58" y="-58" width="116" height="116" rx="4" fill="#1A1A22" stroke="#333" stroke-width="1.5" />
        <!-- Laser Etched Typography -->
        <text x="0" y="-20" text-anchor="middle" fill="${accent}" font-family="system-ui, sans-serif" font-weight="900" font-size="16" letter-spacing="2">
          ${isRyzen ? 'RYZEN' : 'intel.'}
        </text>
        <text x="0" y="5" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-weight="800" font-size="13">
          ${escapeXml(p.model.toUpperCase().slice(0, 16))}
        </text>
        <text x="0" y="25" text-anchor="middle" fill="#9CA3AF" font-family="monospace" font-weight="500" font-size="10">
          ${isRyzen ? 'AM5 LGA1718' : 'LGA1700 / LGA1851'}
        </text>
      </g>
    `;
  }

  // 6. MONITORS
  if (cat === 'monitors') {
    const isCurved = name.includes('curved') || model.includes('g9');
    return `
      <!-- Monitor Precision Panel -->
      <g transform="translate(400, 240)">
        <!-- Display Frame -->
        ${isCurved ? `
          <path d="M-175 -85 Q0 -75 175 -85 L165 65 Q0 75 -165 65 Z" fill="#141419" stroke="#383844" stroke-width="3" />
          <path d="M-165 -78 Q0 -68 165 -78 L157 58 Q0 68 -157 58 Z" fill="#0C0D12" />
        ` : `
          <rect x="-160" y="-85" width="320" height="160" rx="8" fill="#141419" stroke="#383844" stroke-width="3" />
          <rect x="-152" y="-77" width="304" height="144" rx="4" fill="#0C0D12" />
        `}
        <!-- Dynamic Screen Graphic -->
        <circle cx="0" cy="-5" r="45" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="8,6" opacity="0.6"/>
        <text x="0" y="0" text-anchor="middle" fill="${accent}" font-family="monospace" font-weight="bold" font-size="11">OLED / 4K</text>
        <!-- Heavy Stand & Base -->
        <rect x="-10" y="75" width="20" height="35" rx="2" fill="#202028" stroke="#333" stroke-width="1.5" />
        <path d="M-60 110 L60 110 L50 116 L-50 116 Z" fill="#262632" stroke="${accent}" stroke-width="2" />
      </g>
    `;
  }

  // 7. TVS
  if (cat === 'tvs') {
    return `
      <!-- Ultra-Slim Cinematic Television -->
      <g transform="translate(400, 240)">
        <rect x="-175" y="-100" width="350" height="190" rx="6" fill="#121216" stroke="#383846" stroke-width="3" />
        <rect x="-170" y="-95" width="340" height="180" rx="2" fill="#08080C" />
        <!-- Ambient Wall Glow -->
        <path d="M-150 70 L-60 -40 L50 20 L150 -60 L150 75 L-150 75 Z" fill="${accent}" opacity="0.22" />
        <text x="0" y="-10" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="900" font-size="18" letter-spacing="3">4K / 8K HDR</text>
        <!-- Sleek Stand Legs -->
        <line x1="-120" y1="90" x2="-140" y2="108" stroke="#444" stroke-width="4" stroke-linecap="round"/>
        <line x1="120" y1="90" x2="140" y2="108" stroke="#444" stroke-width="4" stroke-linecap="round"/>
      </g>
    `;
  }

  // 8. TABLETS
  if (cat === 'tablets') {
    return `
      <!-- Tablet Slate & Stylus -->
      <g transform="translate(400, 245)">
        <!-- Tablet Frame -->
        <rect x="-120" y="-90" width="240" height="175" rx="18" fill="#1C1C22" stroke="#3E3E4C" stroke-width="3" />
        <rect x="-110" y="-80" width="220" height="155" rx="10" fill="#0E0F14" />
        <!-- Magnetic Stylus Pen on Top -->
        <rect x="-65" y="-102" width="130" height="6" rx="3" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1" />
        <polygon points="65,-102 72,-99 65,-96" fill="#475569"/>
        <!-- Screen Content Icon -->
        <circle cx="0" cy="-2" r="30" fill="none" stroke="${accent}" stroke-width="2.5" />
        <path d="M-12 -2 L-2 8 L14 -8" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    `;
  }

  // 9. SMARTWATCHES
  if (cat === 'smartwatches') {
    const isUltra = model.includes('ultra');
    return `
      <!-- Smartwatch Model -->
      <g transform="translate(400, 245)">
        <!-- Watch Band (Top & Bottom) -->
        <path d="M-36 -125 L36 -125 L32 -60 L-32 -60 Z" fill="#202028" stroke="#3A3A46" stroke-width="2" />
        <path d="M-32 60 L32 60 L36 125 L-36 125 Z" fill="#202028" stroke="#3A3A46" stroke-width="2" />
        <!-- Case -->
        ${isUltra ? `
          <rect x="-56" y="-56" width="112" height="112" rx="30" fill="#25252E" stroke="${accent}" stroke-width="3.5" />
          <rect x="-46" y="-46" width="92" height="92" rx="24" fill="#0C0D12" />
          <!-- Orange Action Button -->
          <rect x="-62" y="-15" width="6" height="30" rx="3" fill="#F97316" />
          <rect x="56" y="-20" width="6" height="40" rx="3" fill="#444" />
        ` : `
          <circle cx="0" cy="0" r="54" fill="#25252E" stroke="#444452" stroke-width="3.5" />
          <circle cx="0" cy="0" r="46" fill="#0C0D12" stroke="${accent}" stroke-width="1.5" />
          <!-- Crown -->
          <rect x="52" y="-10" width="6" height="20" rx="2" fill="#555" />
        `}
        <!-- Watch Display Complications -->
        <text x="0" y="-8" text-anchor="middle" fill="#FFFFFF" font-family="monospace" font-weight="900" font-size="20">10:24</text>
        <circle cx="-16" cy="18" r="8" fill="none" stroke="#EF4444" stroke-width="2"/>
        <circle cx="16" cy="18" r="8" fill="none" stroke="${accent}" stroke-width="2"/>
      </g>
    `;
  }

  // 10. HEADPHONES
  if (cat === 'headphones') {
    const isTWS = model.includes('buds') || model.includes('pro 2') || model.includes('airpods 4') || model.includes('tw');
    if (isTWS) {
      return `
        <!-- True Wireless Earbuds & Case -->
        <g transform="translate(400, 245)">
          <!-- Charging Case -->
          <rect x="-60" y="-40" width="120" height="85" rx="30" fill="#1C1C24" stroke="#3A3A48" stroke-width="3" />
          <line x1="-58" y1="-5" x2="58" y2="-5" stroke="#2B2B36" stroke-width="2"/>
          <circle cx="0" cy="12" r="3" fill="${accent}"/>
          <!-- Left Earbud floating -->
          <g transform="translate(-85, -20) rotate(-20)">
            <ellipse cx="0" cy="0" rx="14" ry="18" fill="#282834" stroke="${accent}" stroke-width="2"/>
            <rect x="-4" y="10" width="8" height="26" rx="4" fill="#20202A"/>
          </g>
          <!-- Right Earbud floating -->
          <g transform="translate(85, -20) rotate(20)">
            <ellipse cx="0" cy="0" rx="14" ry="18" fill="#282834" stroke="${accent}" stroke-width="2"/>
            <rect x="-4" y="10" width="8" height="26" rx="4" fill="#20202A"/>
          </g>
        </g>
      `;
    }
    return `
      <!-- Over-Ear Studio Headphones -->
      <g transform="translate(400, 240)">
        <!-- Headband Arc -->
        <path d="M-85 10 A90 90 0 0 1 85 10" fill="none" stroke="#383846" stroke-width="8" stroke-linecap="round"/>
        <path d="M-75 10 A80 80 0 0 1 75 10" fill="none" stroke="${accent}" stroke-width="2" opacity="0.7"/>
        <!-- Left Earcup -->
        <rect x="-105" y="-10" width="34" height="65" rx="16" fill="#1A1A22" stroke="#3F3F4E" stroke-width="3"/>
        <rect x="-97" y="0" width="18" height="45" rx="8" fill="#111116"/>
        <!-- Right Earcup -->
        <rect x="71" y="-10" width="34" height="65" rx="16" fill="#1A1A22" stroke="#3F3F4E" stroke-width="3"/>
        <rect x="79" y="0" width="18" height="45" rx="8" fill="#111116"/>
      </g>
    `;
  }

  // 11. GAMING ACCESSORIES
  if (cat === 'gaming-accessories') {
    const isPS5 = model.includes('ps5') || model.includes('playstation');
    const isXbox = model.includes('xbox');
    const isHandheld = model.includes('deck') || model.includes('ally') || model.includes('switch') || model.includes('legion go');

    if (isPS5) {
      return `
        <!-- PlayStation 5 Silhouette -->
        <g transform="translate(400, 245)">
          <!-- Left Wing Curved Plate -->
          <path d="M-60 -125 Q-30 0 -45 115 L-30 115 Q-15 0 -40 -125 Z" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5" />
          <!-- Center Black Core -->
          <rect x="-35" y="-120" width="70" height="235" rx="6" fill="#0A0A0E" stroke="${accent}" stroke-width="1.5" />
          <!-- Blue LED Vent Glow -->
          <line x1="-33" y1="-115" x2="-33" y2="110" stroke="#3B82F6" stroke-width="2.5" />
          <!-- Right Wing Curved Plate -->
          <path d="M40 -125 Q15 0 30 115 L45 115 Q30 0 60 -125 Z" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5" />
          <!-- DualSense Controller next to it -->
          <rect x="-18" y="30" width="36" height="5" rx="2" fill="#1E293B"/>
        </g>
      `;
    }

    if (isXbox) {
      return `
        <!-- Xbox Series X Monolith Tower -->
        <g transform="translate(400, 245)">
          <rect x="-55" y="-115" width="110" height="230" rx="8" fill="#121217" stroke="#33333F" stroke-width="3" />
          <!-- Top Concave Green Vent -->
          <ellipse cx="0" cy="-115" rx="55" ry="10" fill="#064E3B" stroke="#10B981" stroke-width="2" />
          <circle cx="0" cy="-115" r="4" fill="#10B981" />
          <!-- Power Logo & Disc slot -->
          <circle cx="-32" cy="-90" r="5" fill="#FFFFFF" />
          <line x1="-32" y1="-60" x2="-32" y2="0" stroke="#262630" stroke-width="3" />
        </g>
      `;
    }

    if (isHandheld) {
      return `
        <!-- Handheld Gaming Device -->
        <g transform="translate(400, 245)">
          <rect x="-140" y="-70" width="280" height="140" rx="24" fill="#191920" stroke="#3D3D4C" stroke-width="3.5" />
          <!-- Center Screen -->
          <rect x="-75" y="-55" width="150" height="110" rx="8" fill="#0B0C10" stroke="#252530" stroke-width="2" />
          <circle cx="0" cy="0" r="24" fill="none" stroke="${accent}" stroke-width="2" opacity="0.6"/>
          <!-- Left Controls (D-pad & Analog) -->
          <circle cx="-105" cy="-25" r="14" fill="#111" stroke="${accent}" stroke-width="2"/>
          <line x1="-105" y1="5" x2="-105" y2="35" stroke="#555" stroke-width="6" stroke-linecap="round"/>
          <line x1="-120" y1="20" x2="-90" y2="20" stroke="#555" stroke-width="6" stroke-linecap="round"/>
          <!-- Right Controls (ABXY & Analog) -->
          <circle cx="105" cy="20" r="14" fill="#111" stroke="${accent}" stroke-width="2"/>
          <circle cx="105" cy="-35" r="4" fill="#EF4444"/>
          <circle cx="115" cy="-25" r="4" fill="#3B82F6"/>
          <circle cx="95" cy="-25" r="4" fill="#10B981"/>
          <circle cx="105" cy="-15" r="4" fill="#F59E0B"/>
        </g>
      `;
    }

    return `
      <!-- Pro Gamepad Controller -->
      <g transform="translate(400, 245)">
        <path d="M-85 -20 Q0 -40 85 -20 L95 65 Q80 90 55 60 L30 15 L-30 15 L-55 60 Q-80 90 -95 65 Z" fill="#1B1B22" stroke="#3D3D4C" stroke-width="3.5" />
        <circle cx="-45" cy="15" r="16" fill="#121216" stroke="${accent}" stroke-width="2"/>
        <circle cx="45" cy="15" r="16" fill="#121216" stroke="${accent}" stroke-width="2"/>
      </g>
    `;
  }

  // 12. KEYBOARDS & MICE
  if (cat === 'keyboards-mice') {
    const isMouse = model.includes('mouse') || model.includes('deathadder') || model.includes('viper') || model.includes('superlight') || model.includes('master');
    if (isMouse) {
      return `
        <!-- Ergonomic Gaming Mouse -->
        <g transform="translate(400, 245)">
          <path d="M-45 -55 Q-5 -80 0 -80 Q5 -80 45 -55 Q55 20 40 75 Q0 90 -40 75 Q-55 20 -45 -55 Z" fill="#1C1C24" stroke="#3A3A48" stroke-width="3" />
          <line x1="0" y1="-75" x2="0" y2="-20" stroke="#333" stroke-width="2"/>
          <!-- Scroll Wheel -->
          <rect x="-6" y="-60" width="12" height="24" rx="6" fill="#111" stroke="${accent}" stroke-width="2"/>
          <!-- RGB Logo Glow on Palm -->
          <circle cx="0" cy="35" r="12" fill="none" stroke="${accent}" stroke-width="2" opacity="0.8"/>
        </g>
      `;
    }
    return `
      <!-- Mechanical Custom Keyboard -->
      <g transform="translate(400, 245)">
        <rect x="-160" y="-65" width="320" height="130" rx="14" fill="#181820" stroke="#3D3D4E" stroke-width="3.5" />
        <rect x="-148" y="-53" width="296" height="106" rx="8" fill="#101016" />
        <!-- Key Rows Grid Representation -->
        <g fill="#242430" stroke="${accent}" stroke-width="0.8">
          <rect x="-140" y="-45" width="280" height="14" rx="2"/>
          <rect x="-140" y="-27" width="280" height="14" rx="2"/>
          <rect x="-140" y="-9" width="280" height="14" rx="2"/>
          <rect x="-140" y="9" width="280" height="14" rx="2"/>
          <!-- Spacebar Highlight -->
          <rect x="-50" y="27" width="100" height="14" rx="3" fill="#303040" stroke="${accent}" stroke-width="1.5"/>
        </g>
      </g>
    `;
  }

  // 13. APPLIANCES
  if (cat === 'appliances') {
    const isRobot = model.includes('roborock') || model.includes('dreame') || name.includes('robot');
    if (isRobot) {
      return `
        <!-- Robot Vacuum with LiDAR Turret -->
        <g transform="translate(400, 245)">
          <circle cx="0" cy="0" r="95" fill="#1C1C24" stroke="#3E3E4E" stroke-width="3.5" />
          <circle cx="0" cy="0" r="82" fill="#121217" />
          <!-- Laser LiDAR Turret -->
          <circle cx="0" cy="-25" r="26" fill="#242430" stroke="${accent}" stroke-width="2.5" />
          <circle cx="0" cy="-25" r="10" fill="#0E0E12" />
          <!-- Control Buttons -->
          <circle cx="0" cy="40" r="8" fill="${accent}" opacity="0.8"/>
        </g>
      `;
    }
    return `
      <!-- Cordless Cyclone Device -->
      <g transform="translate(400, 245) rotate(-35)">
        <rect x="-20" y="-120" width="40" height="90" rx="12" fill="#22222C" stroke="#444" stroke-width="2"/>
        <rect x="-28" y="-30" width="56" height="40" rx="6" fill="${accent}" opacity="0.8"/>
        <line x1="0" y1="10" x2="0" y2="160" stroke="#E2E8F0" stroke-width="10" stroke-linecap="round"/>
        <rect x="-45" y="160" width="90" height="24" rx="6" fill="#333" stroke="${accent}" stroke-width="2"/>
      </g>
    `;
  }

  // 14. STORAGE & ROUTERS
  if (cat === 'storage-routers') {
    const isRouter = model.includes('router') || model.includes('be98') || model.includes('ge800') || model.includes('be85');
    if (isRouter) {
      return `
        <!-- Wi-Fi 7 Gaming Spider Router -->
        <g transform="translate(400, 245)">
          <!-- Main Chassis -->
          <polygon points="0,-60 85,-20 85,45 0,85 -85,45 -85,-20" fill="#181820" stroke="#3B3B48" stroke-width="3.5" />
          <!-- Antennas Array -->
          <line x1="-70" y1="-25" x2="-130" y2="-90" stroke="#2B2B36" stroke-width="6" stroke-linecap="round"/>
          <line x1="70" y1="-25" x2="130" y2="-90" stroke="#2B2B36" stroke-width="6" stroke-linecap="round"/>
          <line x1="-80" y1="30" x2="-140" y2="70" stroke="#2B2B36" stroke-width="6" stroke-linecap="round"/>
          <line x1="80" y1="30" x2="140" y2="70" stroke="#2B2B36" stroke-width="6" stroke-linecap="round"/>
          <!-- Top Cyber RGB Eye -->
          <circle cx="0" cy="10" r="28" fill="#101016" stroke="${accent}" stroke-width="2.5" />
          <polygon points="0,-6 10,14 -10,14" fill="${accent}"/>
        </g>
      `;
    }
    return `
      <!-- PCIe 5.0 / 4.0 NVMe M.2 SSD with Heatsink -->
      <g transform="translate(400, 245)">
        <!-- Heatsink Fin Array -->
        <rect x="-140" y="-45" width="280" height="90" rx="8" fill="#1C1C24" stroke="#3D3D4E" stroke-width="3" />
        <g stroke="#121218" stroke-width="3">
          <line x1="-120" y1="-35" x2="-120" y2="35"/>
          <line x1="-90" y1="-35" x2="-90" y2="35"/>
          <line x1="-60" y1="-35" x2="-60" y2="35"/>
          <line x1="-30" y1="-35" x2="-30" y2="35"/>
          <line x1="0" y1="-35" x2="0" y2="35"/>
          <line x1="30" y1="-35" x2="30" y2="35"/>
          <line x1="60" y1="-35" x2="60" y2="35"/>
          <line x1="90" y1="-35" x2="90" y2="35"/>
          <line x1="120" y1="-35" x2="120" y2="35"/>
        </g>
        <!-- Gold M.2 Connector Edge Pins -->
        <rect x="-155" y="-18" width="15" height="36" rx="2" fill="#D4AF37" stroke="#A17C0C" stroke-width="1"/>
        <text x="0" y="5" text-anchor="middle" fill="${accent}" font-family="monospace" font-weight="900" font-size="12">NVMe PCIe 4.0 / 5.0 SSD</text>
      </g>
    `;
  }

  // 15. OTHER ELECTRONICS (Vision Pro, DJI Drones, Action Cameras)
  const isVisionPro = model.includes('vision pro');
  if (isVisionPro) {
    return `
      <!-- Apple Vision Pro Spatial Computer -->
      <g transform="translate(400, 245)">
        <!-- 3D Laminated Front Curved Glass -->
        <path d="M-115 -45 Q0 -65 115 -45 Q135 25 105 50 Q0 60 -105 50 Q-135 25 -115 -45 Z" fill="#151722" stroke="${accent}" stroke-width="3" />
        <ellipse cx="0" cy="2" rx="90" ry="38" fill="#0A0B10" stroke="#333" stroke-width="1.5"/>
        <!-- Solo Knit Band Back -->
        <path d="M-110 5 Q-160 -10 -150 -40 Q-135 -30 -105 -25" fill="#333" />
        <path d="M110 5 Q160 -10 150 -40 Q135 -30 105 -25" fill="#333" />
        <!-- Digital Crown on top -->
        <rect x="70" y="-55" width="14" height="6" rx="2" fill="#E2E8F0"/>
        <text x="0" y="8" text-anchor="middle" fill="${accent}" font-family="monospace" font-weight="bold" font-size="11">SPATIAL COMPUTING</text>
      </g>
    `;
  }

  // Camera / Drone
  return `
    <!-- Precision Gadget Silhouette -->
    <g transform="translate(400, 245)">
      <rect x="-80" y="-55" width="160" height="110" rx="16" fill="#1C1C24" stroke="#3E3E4E" stroke-width="3" />
      <circle cx="0" cy="0" r="38" fill="#121217" stroke="${accent}" stroke-width="3"/>
      <circle cx="0" cy="0" r="18" fill="#09090C" stroke="#555" stroke-width="2"/>
      <circle cx="-50" cy="-35" r="4" fill="#EF4444"/>
    </g>
  `;
}

function generateSvgForProduct(p, isDetail = false) {
  const brand = escapeXml(p.brand || 'NEXORA');
  const model = escapeXml(p.model || p.name);
  const fullName = escapeXml(p.name);
  const categoryName = escapeXml(p.categoryName || p.category);
  const accent = getBrandAccent(p.brand).primary;
  
  // Format top 2 primary specs
  const s = p.specs || {};
  let specSnippet = '';
  if (s.processor) specSnippet = s.processor;
  else if (s.gpu) specSnippet = s.gpu;
  else if (s.display) specSnippet = s.display;
  else if (s.ram && s.storage) specSnippet = `${s.ram} / ${s.storage}`;
  else if (s.battery) specSnippet = s.battery;
  else specSnippet = 'Original Flagman Kafolatli';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg_${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D0D11" />
      <stop offset="50%" stop-color="#141419" />
      <stop offset="100%" stop-color="#08080A" />
    </linearGradient>
    <radialGradient id="glow_${p.id}" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.20" />
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.03" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cardGrad_${p.id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#181822" />
      <stop offset="100%" stop-color="#13131A" />
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="800" height="600" fill="url(#bg_${p.id})" />
  <circle cx="400" cy="245" r="280" fill="url(#glow_${p.id})" />

  <!-- Outer Protective Frame -->
  <rect x="20" y="20" width="760" height="560" rx="26" fill="none" stroke="#24242E" stroke-width="2" />
  <rect x="18" y="18" width="764" height="564" rx="27" fill="none" stroke="${accent}" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="14,10" />

  <!-- Top Header Info -->
  <g transform="translate(50, 60)">
    <!-- Brand Emblem -->
    <rect x="0" y="-16" width="110" height="30" rx="8" fill="#1C1C26" stroke="#333342" stroke-width="1.5" />
    <text x="55" y="4" text-anchor="middle" fill="${accent}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="13" letter-spacing="2">
      ${brand.toUpperCase()}
    </text>

    <!-- Product ID Code -->
    <text x="125" y="4" fill="#666675" font-family="monospace" font-weight="bold" font-size="11">
      [${escapeXml(p.id.toUpperCase())}]
    </text>
  </g>

  <!-- Top Right Category Badge -->
  <g transform="translate(750, 60)">
    <rect x="-160" y="-16" width="160" height="30" rx="15" fill="#16161F" stroke="#2D2D3A" stroke-width="1.5" />
    <text x="-80" y="3" text-anchor="middle" fill="#9CA3AF" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="11" letter-spacing="1">
      ${categoryName.toUpperCase()}
    </text>
  </g>

  <!-- Center: Precise Device Silhouette -->
  ${renderDeviceSilhouette(p, isDetail ? 'detail' : 'primary')}

  <!-- Bottom: Authentic Model Info Box -->
  <g transform="translate(400, 475)">
    <rect x="-340" y="0" width="680" height="66" rx="16" fill="url(#cardGrad_${p.id})" stroke="#2B2B38" stroke-width="1.5" />
    <rect x="-338" y="2" width="6" height="62" rx="3" fill="${accent}" />

    <!-- Exact Model Title -->
    <text x="-315" y="27" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="16" letter-spacing="0.3">
      ${model}
    </text>

    <!-- Specs Highlight -->
    <text x="-315" y="49" fill="#9CA3AF" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="12">
      ${escapeXml(specSnippet)}
    </text>

    <!-- Verified Authentic Seal -->
    <g transform="translate(300, 33)">
      <circle cx="0" cy="0" r="16" fill="#101016" stroke="${accent}" stroke-width="2"/>
      <path d="M-6 0 L-2 4 L6 -4" fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>

  <!-- Verified NEXORA footer -->
  <text x="400" y="562" text-anchor="middle" fill="#555564" font-family="system-ui, sans-serif" font-weight="600" font-size="11" letter-spacing="1.5">
    NEXORA VERIFIED AUTHENTIC HARDWARE • 100% RASMIY KAFOLAT
  </text>
</svg>`;
}

let generatedCount = 0;
for (const p of products) {
  // 1. Primary image
  const svgPrimary = generateSvgForProduct(p, false);
  const primaryFile = `${p.id}.svg`;
  fs.writeFileSync(path.join(outDir, primaryFile), svgPrimary, 'utf8');

  // 2. Secondary gallery image
  const svgDetail = generateSvgForProduct(p, true);
  const detailFile = `${p.id}-detail.svg`;
  fs.writeFileSync(path.join(outDir, detailFile), svgDetail, 'utf8');

  generatedCount++;
}

console.log(`Successfully generated ${generatedCount * 2} verified SVGs for ${generatedCount} products in public/products/`);
