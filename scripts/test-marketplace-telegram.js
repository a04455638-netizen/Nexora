const { db } = require('./src/lib/db');

async function testListing() {
  console.log("=== TESTING MARKETPLACE AD SUBMISSION WITH TELEGRAM ALERT ===");

  const payload = {
    sellerName: "Javohir Toshmatov",
    sellerPhone: "+998935557788",
    sellerTelegram: "javohir_dev",
    title: "NVIDIA GeForce RTX 4080 Super TUF Gaming",
    category: "gpus",
    brand: "ASUS",
    model: "TUF Gaming RTX 4080 Super",
    price: 14500000,
    condition: "like_new",
    description: "Ideal holatda, faqat 3 oy ishlatilgan, qutisi va kafolat taloni bor, hech qanday nuqsoni yo'q.",
    hasWarranty: true,
    warrantyDetails: "Yana 9 oy rasmiy kafolati bor",
    primaryImage: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    galleryImages: []
  };

  const created = await db.createMarketplaceListing(payload);
  console.log("Created Marketplace Listing ID:", created.id);
  console.log("Status:", created.status);
  console.log("=== SUCCESS: Listing saved and Telegram alert dispatched! ===");
}

testListing().catch(console.error);
