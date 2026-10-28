"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function FavoritesPage() {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-4 border-b border-[#222] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/" className="text-xs text-zinc-500 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Bosh sahifa
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Heart className="w-7 h-7 text-red-500 fill-current" />
            <span>Sevimlilar Ro'yxati</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Siz saqlagan {favoritesCount} ta mahsulot</p>
        </div>

        <Link
          href="/products"
          className="px-4 py-2 rounded-xl bg-[#181818] border border-[#2D2D2D] text-xs font-bold text-zinc-300 hover:text-white transition-colors"
        >
          Katalogga qaytish
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#141414] border border-[#242424] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1F1F1F] flex items-center justify-center text-zinc-600 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">Sevimlilar ro'yxatingiz bo'sh</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Mahsulot kartochkalaridagi yurakcha belgisini bosib o'zingizga yoqqan gadjetlarni saqlab qo'ying.
          </p>
          <Link
            href="/products"
            className="inline-flex px-6 py-2.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider"
          >
            Mahsulotlarni ko'rish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
