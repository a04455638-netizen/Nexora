"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Scale, ShoppingCart, Check, Star, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { NexoraImage } from "@/components/ui/NexoraImage";
import { useCart } from "@/features/cart/CartContext";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { useCompare } from "@/features/compare/CompareContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInCompare, addToCompare } = useCompare();

  const [addedAnim, setAddedAnim] = useState(false);

  const favorited = isFavorite(product.id);
  const compared = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product);
  };

  const discountPercent =
    product.discountPrice && product.discountPrice < product.price
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0;

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl bg-[#141414] dark:bg-[#141414] bg-white border border-[#262626] dark:border-[#262626] border-zinc-200 hover:border-[#76B900]/60 dark:hover:border-[#76B900]/60 hover:shadow-neon-sm transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* Top badges container */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
        {discountPercent > 0 && (
          <span className="px-2 py-0.5 rounded-md bg-[#76B900] text-black font-extrabold text-[10px] uppercase tracking-wider shadow-neon-sm">
            -{discountPercent}%
          </span>
        )}
        {product.isNew && (
          <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider">
            Yangi
          </span>
        )}
        {product.isBestseller && (
          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-black font-bold text-[10px] uppercase tracking-wider">
            Top Sotuv
          </span>
        )}
      </div>

      {/* Floating Action Buttons: Favorite & Compare */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleFavoriteClick}
          aria-label="Sevimlilarga qo'shish"
          className={`p-2 rounded-xl backdrop-blur-md transition-all ${
            favorited
              ? "bg-red-500 text-white shadow-md"
              : "bg-[#1F1F1F]/80 text-zinc-300 hover:text-red-500 hover:bg-[#2A2A2A]"
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={handleCompareClick}
          aria-label="Taqqoslashga qo'shish"
          className={`p-2 rounded-xl backdrop-blur-md transition-all ${
            compared
              ? "bg-[#76B900] text-black shadow-md"
              : "bg-[#1F1F1F]/80 text-zinc-300 hover:text-[#76B900] hover:bg-[#2A2A2A]"
          }`}
        >
          <Scale className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image Area */}
      <Link href={`/products/${product.slug}`} className="block relative pt-6 px-4 pb-2">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#1B1B1B] dark:bg-[#1B1B1B] bg-zinc-100 flex items-center justify-center p-3">
          <NexoraImage
            src={product.primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            fallbackCategory={product.categoryName}
            fallbackText={product.brand}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Product Details Area */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-400 mb-1">
            <span className="font-bold text-[#76B900] uppercase tracking-wider">{product.brand}</span>
            <span className="truncate max-w-[120px]">{product.categoryName}</span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-xs sm:text-sm font-semibold text-zinc-100 dark:text-zinc-100 text-zinc-900 group-hover:text-[#76B900] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Rating & Warranty */}
          <div className="flex items-center gap-3 mt-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-zinc-200 dark:text-zinc-200 text-zinc-700">{product.rating}</span>
              <span className="text-zinc-500">({product.reviewsCount})</span>
            </div>
            <span className="text-zinc-600">•</span>
            <div className="flex items-center gap-1 text-zinc-400">
              <ShieldCheck className="w-3 h-3 text-[#76B900]" />
              <span>{product.warrantyMonths} oy</span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-4 pt-3 border-t border-[#222222] dark:border-[#222222] border-zinc-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-sm sm:text-base font-extrabold text-white dark:text-white text-zinc-900 font-mono">
              {(product.discountPrice || product.price).toLocaleString("uz-UZ")}{" "}
              <span className="text-xs text-[#76B900] font-sans font-semibold">so'm</span>
            </div>
            {product.discountPrice && (
              <div className="text-[11px] text-zinc-500 line-through font-mono">
                {product.price.toLocaleString("uz-UZ")} so'm
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`p-2.5 sm:px-3.5 sm:py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all duration-200 ${
              product.stock <= 0
                ? "bg-[#252525] text-zinc-500 cursor-not-allowed"
                : addedAnim
                ? "bg-emerald-500 text-white shadow-neon-sm"
                : "bg-[#76B900] hover:bg-[#86D000] text-black shadow-neon-sm hover:scale-105 active:scale-95"
            }`}
            title="Savatchaga qo'shish"
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Qo'shildi</span>
              </>
            ) : product.stock <= 0 ? (
              <span className="text-[10px]">Tugagan</span>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Savatga</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
