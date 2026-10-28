import fs from "fs";
import path from "path";
import {
  Product,
  Category,
  Order,
  MarketplaceListing,
  Review,
  PromoCode,
  SupportTicket,
  AppNotification,
  FilterParams,
  OrderStatus,
  MarketplaceStatus,
} from "@/types";
import { INITIAL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { telegramBot } from "@/lib/telegram/bot";

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "nexora_store.json");

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: Order[];
  marketplace: MarketplaceListing[];
  reviews: Review[];
  promoCodes: PromoCode[];
  supportTickets: SupportTicket[];
  notifications: AppNotification[];
  backInStockAlerts: { productId: string; contact: string; createdAt: string }[];
  telegramLogs: any[];
}

// Initial Mock Promo Codes
const INITIAL_PROMO_CODES: PromoCode[] = [
  {
    code: "NEXORA10",
    discountType: "percentage",
    discountValue: 10,
    minOrderAmount: 2000000,
    maxDiscountAmount: 1500000,
    isActive: true,
  },
  {
    code: "TECH2026",
    discountType: "fixed",
    discountValue: 500000,
    minOrderAmount: 5000000,
    isActive: true,
  },
  {
    code: "WELCOME",
    discountType: "percentage",
    discountValue: 5,
    minOrderAmount: 500000,
    isActive: true,
  },
];

// Initial Initial Marketplace Listings
const INITIAL_MARKETPLACE: MarketplaceListing[] = [
  {
    id: "mp-list-01",
    sellerName: "Jasur Rahimov",
    sellerPhone: "+998 90 123 45 67",
    sellerTelegram: "@jasur_tech",
    title: "iPhone 14 Pro Max 256GB Deep Purple (Ideal holatda)",
    category: "smartphones",
    brand: "Apple",
    model: "iPhone 14 Pro Max",
    price: 10500000,
    condition: "like_new",
    description: "Aybi yo'q, hamma narsasi zavod. Karobka dokument bor. Batareya 89%. Faqat ehtiyotkorlik bilan chexolda ishlatilgan.",
    defects: "Kichik mikroskopik chiziqlar chetidagi yaltiroq po'latda bor",
    includedItems: "Karobka, original USB-C kabel, 2 ta sifatli chexol",
    hasWarranty: true,
    warrantyDetails: "6 oy rasmiy do'kon kafolati qolgan",
    primaryImage: "/products/placeholder-smartphones.svg",
    galleryImages: ["/products/placeholder-smartphones.svg"],
    status: "approved",
    createdAt: "2026-10-20T12:00:00Z",
    updatedAt: "2026-10-20T12:00:00Z",
  },
  {
    id: "mp-list-02",
    sellerName: "Bekzod Aliyev",
    sellerPhone: "+998 97 765 43 21",
    sellerTelegram: "@bek_games",
    title: "ASUS ROG Strix RTX 3080 10GB OC Gaming",
    category: "gpus",
    brand: "ASUS",
    model: "RTX 3080 OC",
    price: 6800000,
    condition: "like_new",
    description: "Faqat uyda o'yinlar uchun ishlatilgan. Mayning qilinmagan. FurMark testida 67 darajadan oshmaydi. Plombalari joyida.",
    defects: "Nuqsonsiz",
    includedItems: "Original qutisi, ushlagich stend",
    hasWarranty: false,
    primaryImage: "/products/placeholder-gpus.svg",
    galleryImages: ["/products/placeholder-gpus.svg"],
    status: "approved",
    createdAt: "2026-10-22T14:30:00Z",
    updatedAt: "2026-10-22T14:30:00Z",
  },
  {
    id: "mp-list-03",
    sellerName: "Sardor Umarov",
    sellerPhone: "+998 93 321 00 11",
    title: "Sony PlayStation 5 Disc Edition + 2 ta DualSense",
    category: "gaming-accessories",
    brand: "Sony",
    model: "PlayStation 5",
    price: 5900000,
    condition: "like_new",
    description: "Yevropa versiyasi. Qizib ketmaydi, shovqin yo'q. Ikkala geympadi ham original va stiklari drayflamaydi.",
    defects: "Yo'q",
    includedItems: "2 ta pult, HDMI kabel, quvvat kabeli, 3 ta diskli o'yin sovg'a",
    hasWarranty: true,
    warrantyDetails: "Nexora kafolati 3 oy",
    primaryImage: "/products/placeholder-gaming-accessories.svg",
    galleryImages: ["/products/placeholder-gaming-accessories.svg"],
    status: "approved",
    createdAt: "2026-10-24T09:15:00Z",
    updatedAt: "2026-10-24T09:15:00Z",
  },
];

class DatabaseService {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        const parsed = JSON.parse(raw);
        return {
          products: parsed.products?.length ? parsed.products : INITIAL_PRODUCTS,
          categories: CATEGORIES,
          orders: parsed.orders || [],
          marketplace: parsed.marketplace?.length ? parsed.marketplace : INITIAL_MARKETPLACE,
          reviews: parsed.reviews || [],
          promoCodes: parsed.promoCodes?.length ? parsed.promoCodes : INITIAL_PROMO_CODES,
          supportTickets: parsed.supportTickets || [],
          notifications: parsed.notifications || [],
          backInStockAlerts: parsed.backInStockAlerts || [],
          telegramLogs: parsed.telegramLogs || [],
        };
      }
    } catch (e) {
      console.error("[DB LOAD ERROR]:", e);
    }

    const initialData: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      categories: CATEGORIES,
      orders: [],
      marketplace: INITIAL_MARKETPLACE,
      reviews: [],
      promoCodes: INITIAL_PROMO_CODES,
      supportTickets: [],
      notifications: [],
      backInStockAlerts: [],
      telegramLogs: [],
    };

    this.saveDatabase(initialData);
    return initialData;
  }

  private saveDatabase(dataToSave?: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(dataToSave || this.data, null, 2), "utf-8");
    } catch (e) {
      console.error("[DB SAVE ERROR]:", e);
    }
  }

  // =========================================================================
  // PRODUCTS
  // =========================================================================

  public getProducts(params: FilterParams = {}) {
    let list = [...this.data.products];

    // Search query
    if (params.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (params.category && params.category !== "all") {
      list = list.filter((p) => p.category === params.category);
    }

    // Brand
    if (params.brand && params.brand !== "all") {
      list = list.filter((p) => p.brand.toLowerCase() === params.brand?.toLowerCase());
    }

    // Price range
    if (params.minPrice !== undefined && params.minPrice > 0) {
      list = list.filter((p) => (p.discountPrice || p.price) >= params.minPrice!);
    }
    if (params.maxPrice !== undefined && params.maxPrice > 0) {
      list = list.filter((p) => (p.discountPrice || p.price) <= params.maxPrice!);
    }

    // Rating
    if (params.rating !== undefined && params.rating > 0) {
      list = list.filter((p) => p.rating >= params.rating!);
    }

    // In Stock
    if (params.inStock) {
      list = list.filter((p) => p.stock > 0);
    }

    // On Sale
    if (params.onSale) {
      list = list.filter((p) => Boolean(p.discountPrice && p.discountPrice < p.price));
    }

    // Sorting
    switch (params.sort) {
      case "price_asc":
        list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case "price_desc":
        list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case "rating_desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
        break;
      case "newest":
        list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    const totalCount = list.length;
    const limit = params.limit || 24;
    const page = Math.max(1, params.page || 1);
    const totalPages = Math.ceil(totalCount / limit);
    const paginated = list.slice((page - 1) * limit, page * limit);

    return {
      products: paginated,
      totalCount,
      totalPages,
      currentPage: page,
      limit,
    };
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.data.products.find((p) => p.slug === slug);
  }

  public getSimilarProducts(productId: string, limit = 4): Product[] {
    const target = this.getProductById(productId);
    if (!target) return this.data.products.slice(0, limit);

    return this.data.products
      .filter((p) => p.id !== productId && (p.category === target.category || p.brand === target.brand))
      .slice(0, limit);
  }

  public addProduct(product: Omit<Product, "id" | "createdAt" | "slug">): Product {
    const id = `nx-${product.category.substring(0, 2)}-${Date.now()}`;
    const slug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProd: Product = {
      ...product,
      id,
      slug,
      isInStock: product.stock > 0,
      rating: 5.0,
      reviewsCount: 0,
      createdAt: new Date().toISOString(),
    };

    this.data.products.unshift(newProd);
    this.saveDatabase();
    return newProd;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;

    const existing = this.data.products[idx];
    const updated: Product = {
      ...existing,
      ...updates,
      isInStock: updates.stock !== undefined ? updates.stock > 0 : existing.isInStock,
    };

    this.data.products[idx] = updated;
    this.saveDatabase();
    return updated;
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter((p) => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // =========================================================================
  // CATEGORIES
  // =========================================================================

  public getCategories(): (Category & { productCount: number })[] {
    return this.data.categories.map((c) => {
      const count = this.data.products.filter((p) => p.category === c.slug).length;
      return {
        ...c,
        productCount: count,
      };
    });
  }

  // =========================================================================
  // ORDERS & CHECKOUT (Server-Side Price Protection & Telegram Notification)
  // =========================================================================

  public async createOrder(orderPayload: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryCity: string;
    deliveryAddress: string;
    deliveryNote?: string;
    paymentMethod: "cash_on_delivery" | "card_on_delivery" | "click" | "payme";
    items: { productId: string; quantity: number }[];
    promoCode?: string;
  }): Promise<{ success: boolean; order?: Order; error?: string }> {
    if (!orderPayload.items || orderPayload.items.length === 0) {
      return { success: false, error: "Savatcha bo'sh" };
    }

    // 1. Re-read true prices and check stock directly from database
    let subtotal = 0;
    const verifiedItems: any[] = [];

    for (const item of orderPayload.items) {
      const product = this.getProductById(item.productId);
      if (!product) {
        return { success: false, error: `Mahsulot topilmadi: ${item.productId}` };
      }

      if (product.stock < item.quantity) {
        return {
          success: false,
          error: `"${product.name}" omborda yetarli emas (Mavjud: ${product.stock} ta)`,
        };
      }

      // Use true server price
      const effectivePrice = product.discountPrice || product.price;
      const itemTotal = effectivePrice * item.quantity;
      subtotal += itemTotal;

      verifiedItems.push({
        productId: product.id,
        productName: product.name,
        productImage: product.primaryImage,
        unitPrice: effectivePrice,
        quantity: item.quantity,
        totalPrice: itemTotal,
      });
    }

    // 2. Validate and calculate promo code discount
    let discountAmount = 0;
    if (orderPayload.promoCode) {
      const promoResult = this.validatePromo(orderPayload.promoCode, subtotal);
      if (promoResult.valid) {
        discountAmount = promoResult.discount;
      }
    }

    // 3. Calculate delivery fee (Free for orders over 1,500,000 UZS or Tashkent; standard 35,000 UZS)
    const deliveryFee = subtotal >= 1500000 ? 0 : 35000;
    const totalAmount = Math.max(0, subtotal - discountAmount + deliveryFee);

    // 4. Generate unique sequential Order ID #NX-XXXXXX
    const orderNumber = 100000 + this.data.orders.length + 1;
    const orderId = `NX-${orderNumber}`;

    const newOrder: Order = {
      id: orderId,
      customerName: orderPayload.customerName,
      customerPhone: orderPayload.customerPhone,
      customerEmail: orderPayload.customerEmail,
      deliveryCity: orderPayload.deliveryCity,
      deliveryAddress: orderPayload.deliveryAddress,
      deliveryNote: orderPayload.deliveryNote,
      paymentMethod: orderPayload.paymentMethod,
      items: verifiedItems,
      subtotalAmount: subtotal,
      discountAmount,
      deliveryFee,
      totalAmount,
      appliedPromoCode: orderPayload.promoCode,
      status: "accepted",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 5. Deduct inventory stock
    for (const item of orderPayload.items) {
      const product = this.getProductById(item.productId);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
        product.isInStock = product.stock > 0;
      }
    }

    // 6. Save order to database
    this.data.orders.unshift(newOrder);
    this.saveDatabase();

    // 7. Dispatch Telegram bot notification to administrator
    try {
      await telegramBot.notifyNewOrder({
        orderId: newOrder.id,
        customerName: newOrder.customerName,
        customerPhone: newOrder.customerPhone,
        deliveryCity: newOrder.deliveryCity,
        deliveryAddress: newOrder.deliveryAddress,
        paymentMethod: newOrder.paymentMethod,
        items: newOrder.items.map((i) => ({
          productName: i.productName,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        subtotalAmount: newOrder.subtotalAmount,
        deliveryFee: newOrder.deliveryFee,
        totalAmount: newOrder.totalAmount,
        createdAt: newOrder.createdAt,
      });
    } catch (tgError) {
      console.error("[TELEGRAM SEND FAILED]:", tgError);
    }

    return { success: true, order: newOrder };
  }

  public getOrders(phone?: string): Order[] {
    if (phone) {
      const clean = phone.replace(/[^0-9]/g, "");
      return this.data.orders.filter((o) => o.customerPhone.replace(/[^0-9]/g, "").includes(clean));
    }
    return this.data.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id);
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): boolean {
    const order = this.getOrderById(orderId);
    if (!order) return false;
    order.status = status;
    order.updatedAt = new Date().toISOString();
    this.saveDatabase();
    return true;
  }

  /**
   * Cancel an order, restore stock, and notify admin
   */
  public async cancelOrder(orderId: string, reason: string): Promise<{ success: boolean; error?: string }> {
    const order = this.getOrderById(orderId);
    if (!order) {
      return { success: false, error: "Buyurtma topilmadi" };
    }

    if (order.status === "cancelled") {
      return { success: false, error: "Buyurtma allaqachon bekor qilingan" };
    }

    if (order.status === "delivered") {
      return { success: false, error: "Yetkazib berilgan buyurtmani bekor qilib bo'lmaydi. Qaytarish so'rovi yuboring." };
    }

    // Restore inventory stock
    for (const item of order.items) {
      const product = this.getProductById(item.productId);
      if (product) {
        product.stock += item.quantity;
        product.isInStock = product.stock > 0;
      }
    }

    order.status = "cancelled";
    order.cancellationReason = reason;
    order.cancelledAt = new Date().toISOString();
    order.updatedAt = new Date().toISOString();

    this.saveDatabase();

    // Send Telegram cancellation notice
    await telegramBot.notifyOrderCancelled({
      orderId: order.id,
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      reason,
      totalAmount: order.totalAmount,
      cancelledAt: order.cancelledAt,
    });

    return { success: true };
  }

  // =========================================================================
  // PROMO CODES
  // =========================================================================

  public validatePromo(code: string, subtotal: number): { valid: boolean; discount: number; message: string } {
    const clean = code.trim().toUpperCase();
    const promo = this.data.promoCodes.find((p) => p.code === clean && p.isActive);

    if (!promo) {
      return { valid: false, discount: 0, message: "Bunday promo-kod mavjud emas yoki muddati tugagan" };
    }

    if (subtotal < promo.minOrderAmount) {
      return {
        valid: false,
        discount: 0,
        message: `Ushbu promo-kod eng kamida ${promo.minOrderAmount.toLocaleString("uz-UZ")} so'mlik xarid uchun amal qiladi`,
      };
    }

    let discount = 0;
    if (promo.discountType === "percentage") {
      discount = Math.round((subtotal * promo.discountValue) / 100);
      if (promo.maxDiscountAmount && discount > promo.maxDiscountAmount) {
        discount = promo.maxDiscountAmount;
      }
    } else {
      discount = promo.discountValue;
    }

    return {
      valid: true,
      discount,
      message: `Promo-kod faollashtirildi! ${discount.toLocaleString("uz-UZ")} so'm chegirma`,
    };
  }

  // =========================================================================
  // MARKETPLACE (Texnikangni sot)
  // =========================================================================

  public getMarketplaceListings(options: { status?: MarketplaceStatus | "all"; category?: string; search?: string } = {}) {
    let list = [...this.data.marketplace];

    if (options.status && options.status !== "all") {
      list = list.filter((l) => l.status === options.status);
    } else if (!options.status) {
      list = list.filter((l) => l.status === "approved" || l.status === "active");
    }

    if (options.category && options.category !== "all") {
      list = list.filter((l) => l.category === options.category);
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.brand.toLowerCase().includes(q) ||
          l.model.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    return list;
  }

  public getMarketplaceListingById(id: string): MarketplaceListing | undefined {
    return this.data.marketplace.find((l) => l.id === id);
  }

  public async createMarketplaceListing(data: Omit<MarketplaceListing, "id" | "status" | "createdAt" | "updatedAt">): Promise<MarketplaceListing> {
    const id = `mp-list-${Date.now()}`;
    const newListing: MarketplaceListing = {
      ...data,
      id,
      status: "pending", // Requires Admin approval
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.marketplace.unshift(newListing);
    this.saveDatabase();

    // Notify admin on Telegram
    await telegramBot.notifyNewMarketplaceListing({
      listingId: newListing.id,
      sellerName: newListing.sellerName,
      sellerPhone: newListing.sellerPhone,
      sellerTelegram: newListing.sellerTelegram,
      title: newListing.title,
      brand: newListing.brand,
      model: newListing.model,
      price: newListing.price,
      condition: newListing.condition,
      category: newListing.category,
    });

    return newListing;
  }

  public updateMarketplaceStatus(id: string, status: MarketplaceStatus, adminNotes?: string): boolean {
    const listing = this.getMarketplaceListingById(id);
    if (!listing) return false;

    listing.status = status;
    if (adminNotes) listing.adminNotes = adminNotes;
    listing.updatedAt = new Date().toISOString();
    this.saveDatabase();
    return true;
  }

  // =========================================================================
  // REVIEWS
  // =========================================================================

  public getProductReviews(productId: string): Review[] {
    return this.data.reviews.filter((r) => r.productId === productId);
  }

  public addReview(reviewData: Omit<Review, "id" | "createdAt">): Review {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    this.data.reviews.unshift(newRev);

    // Recalculate product rating
    const product = this.getProductById(reviewData.productId);
    if (product) {
      const allProductReviews = this.data.reviews.filter((r) => r.productId === product.id);
      const totalScore = allProductReviews.reduce((sum, r) => sum + r.rating, 0);
      product.reviewsCount = allProductReviews.length;
      product.rating = parseFloat((totalScore / allProductReviews.length).toFixed(2));
    }

    this.saveDatabase();
    return newRev;
  }

  // =========================================================================
  // BACK IN STOCK ALERTS & SUPPORT
  // =========================================================================

  public subscribeBackInStock(productId: string, contact: string) {
    this.data.backInStockAlerts.push({
      productId,
      contact,
      createdAt: new Date().toISOString(),
    });
    this.saveDatabase();
    return { success: true };
  }

  public async createSupportTicket(ticket: Omit<SupportTicket, "id" | "status" | "createdAt">): Promise<SupportTicket> {
    const id = `ticket-${Date.now()}`;
    const newTicket: SupportTicket = {
      ...ticket,
      id,
      status: "open",
      createdAt: new Date().toISOString(),
    };

    this.data.supportTickets.unshift(newTicket);
    this.saveDatabase();

    await telegramBot.notifySupportTicket({
      ticketId: newTicket.id,
      name: newTicket.name,
      phone: newTicket.phone,
      subject: newTicket.subject,
      type: newTicket.type,
      message: newTicket.message,
    });

    return newTicket;
  }

  // =========================================================================
  // ADMIN METRICS & CSV EXPORT
  // =========================================================================

  public getAdminStats() {
    const totalSales = this.data.orders
      .filter((o) => o.status !== "cancelled")
      .reduce((acc, o) => acc + o.totalAmount, 0);

    const lowStockCount = this.data.products.filter((p) => p.stock > 0 && p.stock <= 5).length;
    const outOfStockCount = this.data.products.filter((p) => p.stock === 0).length;
    const pendingMarketplace = this.data.marketplace.filter((m) => m.status === "pending").length;

    return {
      totalProducts: this.data.products.length,
      totalOrders: this.data.orders.length,
      pendingOrders: this.data.orders.filter((o) => o.status === "accepted" || o.status === "preparing").length,
      totalSalesRevenue: totalSales,
      lowStockCount,
      outOfStockCount,
      pendingMarketplace,
      totalMarketplace: this.data.marketplace.length,
    };
  }

  public exportProductsCSV(): string {
    const headers = ["ID", "Nomi", "Brend", "Model", "Kategoriya", "Narxi (UZS)", "Chegirma", "Ombor", "Reyting"];
    const rows = this.data.products.map((p) => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      p.brand,
      p.model,
      p.category,
      p.price,
      p.discountPrice || "",
      p.stock,
      p.rating,
    ]);

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  }

  public exportOrdersCSV(): string {
    const headers = ["Buyurtma ID", "Mijoz", "Telefon", "Shahar", "Jami Summa (UZS)", "Holati", "Sana"];
    const rows = this.data.orders.map((o) => [
      o.id,
      `"${o.customerName.replace(/"/g, '""')}"`,
      o.customerPhone,
      o.deliveryCity,
      o.totalAmount,
      o.status,
      o.createdAt,
    ]);

    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  }
}

export const db = new DatabaseService();
