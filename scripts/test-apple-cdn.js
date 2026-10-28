const https = require('https');

const appleUrls = [
  // iPhone 16 Pro Max
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-9inch-blacktitanium?wid=1000&hei=1000&fmt=png-alpha',
  // iPhone 16 Pro Desert Titanium
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-finish-select-202409-6-3inch-deserttitanium?wid=1000&hei=1000&fmt=png-alpha',
  // iPhone 16 Plus
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-finish-select-202409-6-7inch-ultramarine?wid=1000&hei=1000&fmt=png-alpha',
  // MacBook Pro 16 Space Black
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=1000&hei=1000&fmt=png-alpha',
  // MacBook Air 15 Midnight
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202402?wid=1000&hei=1000&fmt=png-alpha',
  // Mac Studio
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-studio-select-202306?wid=1000&hei=1000&fmt=png-alpha',
  // Mac Pro
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-pro-tower-select-202306?wid=1000&hei=1000&fmt=png-alpha',
  // Mac mini M2 Pro
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-mini-m2-pro-select-202301?wid=1000&hei=1000&fmt=png-alpha',
  // iPad Pro 13 M4 Space Black
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202405-13inch-spaceblack-wifi?wid=1000&hei=1000&fmt=png-alpha',
  // iPad Air 13 M2 Blue
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-finish-select-202405-13inch-blue-wifi?wid=1000&hei=1000&fmt=png-alpha',
  // Watch Ultra 2
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/s10-case-unselect-gallery-1-202409?wid=1000&hei=1000&fmt=png-alpha',
  // AirPods Max
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-202409-midnight?wid=1000&hei=1000&fmt=png-alpha',
  // AirPods Pro 2
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-pro-2-hero-select-202409?wid=1000&hei=1000&fmt=png-alpha',
  // Vision Pro
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-vision-pro-select-202401?wid=1000&hei=1000&fmt=png-alpha'
];

async function check() {
  for (const url of appleUrls) {
    const res = await new Promise(r => https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => r({ status: res.statusCode, type: res.headers['content-type'], len: res.headers['content-length'] })).on('error', e => r({ err: e.message })));
    console.log(res.status, res.type, res.len, url.split('?')[0].split('/').pop());
  }
}
check();
