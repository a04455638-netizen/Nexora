"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Heart,
  Scale,
  ShoppingCart,
  Check,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Bell,
  Send,
  Zap,
  ArrowLeft,
  Share2,
} from "lucide-react";
import { NexoraImage } from "@/components/ui/NexoraImage";
import { ProductCard } from "@/components/products/ProductCard";
import { useCart } from "@/features/cart/CartContext";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { useCompare } from "@/features/compare/CompareContext";
import { useRecentlyViewed } from "@/features/recently-viewed/RecentlyViewedContext";
import { Product, Review } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idOrSlug = params.id as string;

  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, addToCompare } = useCompare();
  const { addRecentlyViewed } = useRecentlyViewed();

  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Gallery active image
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedAnim, setAddedAnim] = useState(false);

  // Back in stock modal (Feature 6)
  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [stockContact, setStockContact] = useState("");
  const [stockSubscribed, setStockSubscribed] = useState(false);

  // Review Form (Feature 4)
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${idOrSlug}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
          setSimilar(data.similar || []);
          setReviews(data.reviews || []);
          setActiveImage(data.product.primaryImage);
          addRecentlyViewed(data.product);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    if (idOrSlug) fetchDetail();
  }, [idOrSlug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-2 border-[#76B900] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-zinc-400">Mahsulot ma'lumotlari yuklanmoqda...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Mahsulot topilmadi</h2>
        <Link
          href="/products"
          className="px-6 py-2.5 rounded-xl bg-[#76B900] text-black font-bold text-xs uppercase"
        >
          Katalogga qaytish
        </Link>
      </div>
    );
  }

  const effectivePrice = product.discountPrice || product.price;
  const savings = product.discountPrice ? product.price - product.discountPrice : 0;
  const favorited = isFavorite(product.id);
  const compared = isInCompare(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  const handleStockSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (stockContact) {
      setStockSubscribed(true);
      setTimeout(() => {
        setStockSubscribed(false);
        setStockModalOpen(false);
      }, 3000);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;
    setReviewSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          authorName: reviewAuthor,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      if (res.ok) {
        const newRev = await res.json();
        setReviews([newRev, ...reviews]);
        setReviewSuccess(true);
        setReviewAuthor("");
        setReviewComment("");
        setTimeout(() => setReviewSuccess(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="text-xs text-zinc-500 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-white">Bosh sahifa</Link>
        <span>/</span>
        <Link href={`/category/${product.category}`} className="hover:text-white">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-[#76B900] truncate max-w-sm">{product.name}</span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl bg-[#141414] dark:bg-[#141414] bg-white border border-[#262626] dark:border-[#262626] border-zinc-200 p-8 flex items-center justify-center overflow-hidden">
            <NexoraImage
              src={activeImage || product.primaryImage}
              alt={product.name}
              fill
              className="object-contain p-6"
            />
          </div>

          {/* Thumbnails */}
          {product.galleryImages && product.galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl bg-[#141414] border p-2 flex-shrink-0 relative overflow-hidden transition-all ${
                    activeImage === img ? "border-[#76B900] shadow-neon-sm" : "border-[#282828] opacity-60 hover:opacity-100"
                  }`}
                >
                  <NexoraImage src={img} alt={`Ko'rinish ${idx + 1}`} fill className="object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Product Controls & Pricing (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span className="font-extrabold text-[#76B900] uppercase tracking-wider">{product.brand}</span>
              <span className="font-mono">ID: {product.id}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white dark:text-white text-zinc-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 mt-2.5 text-xs text-zinc-400">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold text-white dark:text-white text-zinc-800">{product.rating}</span>
                <span className="text-zinc-500">({product.reviewsCount} sharh)</span>
              </div>
              <span>•</span>
              <span className="text-emerald-400 font-medium">
                {product.stock > 0 ? `Omborda mavjud: ${product.stock} ta` : "Qayta buyurtma asosida"}
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-5 rounded-2xl bg-[#141414] dark:bg-[#141414] bg-white border border-[#262626] dark:border-[#262626] border-zinc-200 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-black text-white dark:text-white text-zinc-900 font-mono">
                {effectivePrice.toLocaleString("uz-UZ")}
              </span>
              <span className="text-sm font-bold text-[#76B900]">so'm</span>

              {product.discountPrice && (
                <span className="text-xs text-zinc-500 line-through font-mono">
                  {product.price.toLocaleString("uz-UZ")} so'm
                </span>
              )}
            </div>

            {savings > 0 && (
              <p className="text-xs text-[#76B900] font-semibold">
                Siz {savings.toLocaleString("uz-UZ")} so'm tejaysiz!
              </p>
            )}
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-zinc-400 uppercase">Miqdor:</span>
              <div className="flex items-center border border-[#303030] rounded-xl bg-[#181818]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm hover:text-[#76B900]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                  className="px-3 py-1.5 text-sm hover:text-[#76B900]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  product.stock <= 0
                    ? "bg-[#252525] text-zinc-500 cursor-not-allowed"
                    : addedAnim
                    ? "bg-emerald-500 text-white shadow-neon-sm"
                    : "bg-[#76B900] hover:bg-[#86D000] text-black shadow-neon-sm"
                }`}
              >
                {addedAnim ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                <span>{addedAnim ? "Qo'shildi!" : "Savatga qo'shish"}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="py-3.5 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center transition-colors"
              >
                1-Klikda sotib olish
              </button>
            </div>

            {/* Secondary actions: Wishlist, Compare, Back in Stock */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`flex items-center gap-1.5 text-xs font-semibold ${
                    favorited ? "text-red-500" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
                  <span>{favorited ? "Sevimlilarda" : "Sevimlilarga"}</span>
                </button>

                <button
                  onClick={() => addToCompare(product)}
                  className={`flex items-center gap-1.5 text-xs font-semibold ${
                    compared ? "text-[#76B900]" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Scale className="w-4 h-4" />
                  <span>{compared ? "Taqqoslanmoqda" : "Taqqoslash"}</span>
                </button>
              </div>

              {/* Back in stock notification trigger */}
              <button
                onClick={() => setStockModalOpen(true)}
                className="text-xs text-zinc-400 hover:text-[#76B900] flex items-center gap-1"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Qayta kelsa xabar bering</span>
              </button>
            </div>
          </div>

          {/* Guarantees Box */}
          <div className="p-4 rounded-2xl bg-[#141414] dark:bg-[#141414] bg-zinc-50 border border-[#242424] space-y-2.5 text-xs text-zinc-300">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#76B900] flex-shrink-0" />
              <span>{product.warrantyMonths} oylik rasmiy kafolat va xizmat ko'rsatish</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#76B900] flex-shrink-0" />
              <span>Toshkentda 2 soat ichida, viloyatlarga 24 soatda yetkazish</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-[#76B900] flex-shrink-0" />
              <span>14 kun ichida nosozlik aniqlansa zudlik bilan almashtirish</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* TECHNICAL SPECIFICATIONS TABLE */}
      {/* ==================================================================== */}
      <div className="mt-16 pt-10 border-t border-[#222222]">
        <h2 className="text-xl font-extrabold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#76B900]" />
          Texnik Xususiyatlari
        </h2>

        <div className="rounded-2xl border border-[#262626] overflow-hidden bg-[#121212]">
          <table className="w-full text-xs text-left">
            <tbody className="divide-y divide-[#202020]">
              <tr className="bg-[#161616]">
                <td className="p-4 font-bold text-zinc-400 w-1/3">Brend & Model</td>
                <td className="p-4 font-semibold text-white">{product.brand} {product.model}</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-zinc-400">Kategoriya</td>
                <td className="p-4 text-zinc-200">{product.categoryName}</td>
              </tr>
              <tr className="bg-[#161616]">
                <td className="p-4 font-bold text-zinc-400">Kafolat muddati</td>
                <td className="p-4 text-[#76B900] font-bold">{product.warrantyMonths} oy rasmiy servis</td>
              </tr>

              {Object.entries(product.specs || {}).map(([key, val], idx) => (
                <tr key={key} className={idx % 2 === 0 ? "bg-[#101010]" : "bg-[#141414]"}>
                  <td className="p-4 font-bold text-zinc-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                  <td className="p-4 font-semibold text-zinc-200">{String(val)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* REVIEWS & RATINGS SECTION (Feature 4) */}
      {/* ==================================================================== */}
      <div className="mt-16 pt-10 border-t border-[#222222]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-wider">
              Xaridorlar Fikrlari ({reviews.length})
            </h2>
            <p className="text-xs text-zinc-400 mt-1">Ushbu mahsulotni sotib olgan mijozlarning xolis sharhlari</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Write a review form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-[#141414] border border-[#262626] h-fit">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Fikr bildirish
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Ismingiz</label>
                <input
                  type="text"
                  required
                  placeholder="Ismingiz"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Baho</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className={`p-1.5 rounded-lg ${
                        reviewRating >= star ? "text-amber-400" : "text-zinc-600"
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Sharhingiz</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Mahsulot haqidagi fikringiz va foydalanish tajribangiz..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl p-3 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitting}
                className="w-full py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#86D000] transition-colors"
              >
                {reviewSubmitting ? "Yuborilmoqda..." : "Sharhni chop etish"}
              </button>

              {reviewSuccess && (
                <p className="text-xs text-[#76B900] text-center">Rahmat! Sharhingiz muvaffaqiyatli qo'shildi.</p>
              )}
            </form>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            {reviews.length === 0 ? (
              <p className="text-xs text-zinc-500 italic p-6 rounded-2xl bg-[#121212] border border-[#222]">
                Hozircha sharhlar yo'q. Birinchi bo'lib o'z fikringizni bildiring!
              </p>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl bg-[#141414] border border-[#262626] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{rev.authorName}</span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {new Date(rev.createdAt).toLocaleDateString("uz-UZ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SIMILAR RECOMMENDED PRODUCTS (Feature 10) */}
      {/* ==================================================================== */}
      {similar.length > 0 && (
        <div className="mt-20 pt-10 border-t border-[#222222]">
          <h2 className="text-xl font-extrabold text-white mb-6 uppercase tracking-wider">
            O'xshash Mahsulotlar Tavsiyasi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similar.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* BACK IN STOCK MODAL (Feature 6) */}
      {/* ==================================================================== */}
      {stockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161616] border border-[#2D2D2D] rounded-3xl p-6 space-y-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#76B900]" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Omborga tushganda bildirish</h3>
              </div>
              <button onClick={() => setStockModalOpen(false)} className="text-zinc-500 hover:text-white">
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              "{product.name}" mahsuloti omborga qayta kelishi bilan sizga Telegram yoki SMS orqali darhol xabar beramiz.
            </p>

            <form onSubmit={handleStockSubscribe} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Telefon raqamingiz yoki Telegram username"
                value={stockContact}
                onChange={(e) => setStockContact(e.target.value)}
                className="w-full bg-[#121212] border border-[#2A2A2A] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider shadow-neon-sm"
              >
                Obuna bo'lish
              </button>

              {stockSubscribed && (
                <p className="text-xs text-[#76B900] text-center font-bold">
                  Qabul qilindi! Mahsulot kelishi bilanoq sizga xabar beramiz.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
