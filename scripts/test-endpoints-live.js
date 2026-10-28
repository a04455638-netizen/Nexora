const http = require('http');

async function testEndpoint(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: data.length
        });
      });
    }).on('error', err => {
      resolve({ path, error: err.message });
    });
  });
}

async function run() {
  const paths = [
    '/',
    '/products',
    '/category/smartphones',
    '/category/gpus',
    '/cart',
    '/checkout',
    '/account',
    '/account/orders',
    '/marketplace',
    '/api/products?limit=5',
    '/products/nx-sp-01.svg',
    '/products/nx-gp-53.svg',
    '/products/nx-ga-154.svg',
    '/products/placeholder-smartphones.svg',
    '/products/placeholder-default.svg'
  ];

  console.log('Testing live dev server endpoints:\n');
  for (const p of paths) {
    const res = await testEndpoint(p);
    console.log(`[${res.statusCode || 'ERR'}] ${res.path} -> ${res.contentType || res.error} (${res.contentLength || 0} bytes)`);
  }
}

run();
