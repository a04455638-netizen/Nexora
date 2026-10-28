const https = require('https');
const http = require('http');
const fs = require('fs');

async function testUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      resolve({ url, status: res.statusCode, contentType: res.headers['content-type'], location: res.headers['location'] });
    });
    req.on('error', e => resolve({ url, error: e.message }));
    req.setTimeout(5000, () => { req.destroy(); resolve({ url, error: 'timeout' }); });
  });
}

async function run() {
  const tests = [
    // Apple
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16-pro-model-unselect-gallery-2-202409?wid=5120&hei=2880&fmt=p-jpg',
    // Wikimedia Commons direct
    'https://commons.wikimedia.org/wiki/Special:FilePath/IPhone_16_Pro_Max.png',
    // Samsung
    'https://images.samsung.com/is/image/samsung/p6pim/uz_ru/sm-s928bzkcskz/gallery/uz-ru-galaxy-s24-ultra-s928-sm-s928bzkcskz-thumb-539299446?$172_172_PNG$',
    // Amazon media
    'https://m.media-amazon.com/images/I/71657TiFeHL._AC_SL1500_.jpg'
  ];

  for (const t of tests) {
    const res = await testUrl(t);
    console.log(res);
  }
}

run();
