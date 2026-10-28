const http = require('http');

http.get('http://localhost:3000', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log("=== SEO TAGS VERIFICATION ===");
    
    // Check title
    const titleMatch = body.match(/<title>([^<]+)<\/title>/);
    console.log("TITLE:", titleMatch ? titleMatch[1] : "NOT FOUND");
    
    // Check description
    const descMatch = body.match(/<meta name="description" content="([^"]+)"/);
    console.log("DESCRIPTION:", descMatch ? descMatch[1] : "NOT FOUND");
    
    // Check keywords
    const kwMatch = body.match(/<meta name="keywords" content="([^"]+)"/);
    console.log("KEYWORDS:", kwMatch ? kwMatch[1] : "NOT FOUND");
    
    // Check canonical
    const canonicalMatch = body.match(/<link rel="canonical" href="([^"]+)"/);
    console.log("CANONICAL:", canonicalMatch ? canonicalMatch[1] : "NOT FOUND");

    // Check google verification
    const googleVerMatch = body.match(/<meta name="google-site-verification" content="([^"]+)"/);
    console.log("GOOGLE VERIFICATION:", googleVerMatch ? googleVerMatch[1] : "NOT FOUND");

    // Check JSON-LD
    const jsonLdMatch = body.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    console.log("JSON-LD STRUCTURED DATA:", jsonLdMatch ? "FOUND & EMBEDDED VALIDLY ✓" : "NOT FOUND");

    if (jsonLdMatch) {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        console.log("JSON-LD SCHEMA TYPES:", parsed.map(s => s['@type']));
      } catch (e) {
        console.error("JSON-LD parse error:", e.message);
      }
    }
  });
}).on('error', (err) => {
  console.error("Error connecting to server:", err.message);
});
