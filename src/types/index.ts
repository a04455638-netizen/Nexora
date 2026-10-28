export type ProductCategorySlug =
  | "smartphones"
  | "laptops"
  | "desktops"
  | "gpus"
  | "cpus"
  | "monitors"
  | "tvs"
  | "tablets"
  | "smartwatches"
  | "headphones"
  | "gaming-accessories"
  | "keyboards-mice"
  | "appliances"
  | "storage-routers"
  | "other";

export interface Category {
  id: string;
  name: string;
  slug: ProductCategorySlug;
  description: string;
  icon: string;
  imageUrl: string;
  sortOrder: number;
  productCount?: number;
}

export interface ProductSpecs {
  processor?: string;
  ram?: string;
  storage?: string;
  display?: string;
  gpu?: string;
  battery?: string;
  camera?: string;
  os?: string;
  connectivity?: string;
  weight?: string;
  ports?: string;
  color?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  category: ProductCategorySlug;
  categoryName: string;
  price: number; // in UZS
  discountPrice?: number; // in UZS
  primaryImage: string;
  galleryImages?: string[];
  description: string;
  specs: ProductSpecs;
  stock: number;
  rating: number;
  reviewsCount: number;
  warrantyMonths: number;
  isInStock: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "accepted"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export interface Order {
  id: string; // e.g. 'NX-000123'
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryNote?: string;
  paymentMethod: "cash_on_delivery" | "card_on_delivery" | "click" | "payme";
  items: OrderItem[];
  subtotalAmount: number;
  discountAmount: number;
  deliveryFee: number;
  totalAmount: number;
  appliedPromoCode?: string;
  status: OrderStatus;
  cancellationReason?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type MarketplaceCondition = "brand_new" | "like_new" | "good" | "needs_repair";

export type MarketplaceStatus =
  | "draft"
  | "pending"
  | "approved"
  | "active"
  | "rejected"
  | "sold"
  | "closed";

export interface MarketplaceListing {
  id: string;
  sellerName: string;
  sellerPhone: string;
  sellerTelegram?: string;
  title: string;
  category: ProductCategorySlug;
  brand: string;
  model: string;
  price: number;
  condition: MarketplaceCondition;
  description: string;
  defects?: string;
  includedItems?: string;
  hasWarranty: boolean;
  warrantyDetails?: string;
  primaryImage: string;
  galleryImages: string[];
  status: MarketplaceStatus;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number;
  comment: string;
  isVerifiedBuyer: boolean;
  createdAt: string;
}

export interface PromoCode {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  expiresAt?: string;
  isActive: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  role: "customer" | "seller" | "admin";
  avatarUrl?: string;
  isPhoneVerified?: boolean;
}

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  type: "general" | "return_request" | "warranty" | "complaint" | "tech_support";
  message: string;
  orderId?: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "order" | "promo" | "security" | "marketplace";
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface FilterParams {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  sort?: "featured" | "newest" | "bestseller" | "price_asc" | "price_desc" | "rating_desc";
  page?: number;
  limit?: number;
}
