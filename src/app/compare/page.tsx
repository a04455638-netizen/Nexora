"use client";

import React from "react";
import Link from "next/link";
import { Scale, ArrowLeft, Trash2, ShoppingCart, Plus, Check } from "lucide-react";
import { useCompare } from "@/features/compare/CompareContext";
import { useCart } from "@/features/cart/CartContext";
import { NexoraImage } from "@/components/ui/NexoraImage";

export default function ComparePage() {
  const { compareItems, removeFromCompare, clearCompare, compareCount } = useCompare();
  const { addItem } = useCart();

  if (compareItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-[#141414] border border-[#242424] flex items-center justify-center mx-auto text-zinc-600">
          <Scale className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-white">Taqqoslash ro'yxati bo'sh</h1>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Mahsulot kartochkalaridagi tarozi belgisini bosib 4 tagacha texnikani yonma-yon solishtiring.
        </p>
        <Link
          href="/products"
          className="inline-flex px-8 py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider"
        >
          Katalogga o'tish
        </Link>
      </div>
    );
  }

  // Common spec keys to compare
  const specKeys = ["processor", "ram", "storage", "display", "gpu", "battery", "camera", "os", "weight", "color"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-4 border-b border-[#222] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/products" className="text-xs text-zinc-500 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Katalog
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Scale className="w-7 h-7 text-[#76B900]" />
            <span>Texnik Xususiyatlar Taqqoslashi</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">{compareCount} ta mahsulot yonma-yon solishtirilmoqda</p>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Taqqoslashni tozalash</span>
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-3xl border border-[#262626] bg-[#121212]">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-[#222]">
              <th className="p-5 font-bold text-zinc-500 uppercase tracking-wider w-48 bg-[#0E0E0E]">
                Mahsulot
              </th>
              {compareItems.map((prod) => {
                const effPrice = prod.discountPrice || prod.price;
                return (
                  <th key={prod.id} className="p-5 w-64 min-w-[240px] align-top bg-[#141414] border-l border-[#202020]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-bold text-[#76B900] uppercase font-mono">{prod.brand}</span>
                      <button
                        onClick={() => removeFromCompare(prod.id)}
                        className="text-zinc-500 hover:text-red-400 p-1"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="w-24 h-24 mx-auto mb-3 bg-[#1C1C1C] rounded-xl p-2 relative">
                      <NexoraImage src={prod.primaryImage} alt={prod.name} fill className="object-contain" />
                    </div>

                    <Link
                      href={`/products/${prod.slug}`}
                      className="text-xs font-semibold text-white hover:text-[#76B900] line-clamp-2 block leading-snug mb-2"
                    >
                      {prod.name}
                    </Link>

                    <div className="text-sm font-black font-mono text-[#76B900] mb-3">
                      {effPrice.toLocaleString("uz-UZ")} so'm
                    </div>

                    <button
                      onClick={() => addItem(prod, 1)}
                      className="w-full py-2 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-bold text-[11px] uppercase flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      Savatga
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#1E1E1E]">
            {/* Category row */}
            <tr>
              <td className="p-4 font-bold text-zinc-400 bg-[#0E0E0E]">Kategoriya</td>
              {compareItems.map((prod) => (
                <td key={prod.id} className="p-4 text-zinc-200 border-l border-[#202020]">
                  {prod.categoryName}
                </td>
              ))}
            </tr>

            {/* Rating row */}
            <tr className="bg-[#101010]">
              <td className="p-4 font-bold text-zinc-400 bg-[#0E0E0E]">Mijozlar bahosi</td>
              {compareItems.map((prod) => (
                <td key={prod.id} className="p-4 text-amber-400 font-bold border-l border-[#202020]">
                  ★ {prod.rating} ({prod.reviewsCount} sharh)
                </td>
              ))}
            </tr>

            {/* Warranty row */}
            <tr>
              <td className="p-4 font-bold text-zinc-400 bg-[#0E0E0E]">Kafolat muddati</td>
              {compareItems.map((prod) => (
                <td key={prod.id} className="p-4 text-[#76B900] font-bold border-l border-[#202020]">
                  {prod.warrantyMonths} oy rasmiy
                </td>
              ))}
            </tr>

            {/* Stock row */}
            <tr className="bg-[#101010]">
              <td className="p-4 font-bold text-zinc-400 bg-[#0E0E0E]">Mavjudlik</td>
              {compareItems.map((prod) => (
                <td key={prod.id} className="p-4 border-l border-[#202020]">
                  {prod.stock > 0 ? (
                    <span className="text-emerald-400 font-semibold">Omborda bor ({prod.stock} ta)</span>
                  ) : (
                    <span className="text-zinc-500">Tugagan</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Tech Specs Rows */}
            {specKeys.map((key) => (
              <tr key={key}>
                <td className="p-4 font-bold text-zinc-400 capitalize bg-[#0E0E0E]">
                  {key}
                </td>
                {compareItems.map((prod) => (
                  <td key={prod.id} className="p-4 text-zinc-200 border-l border-[#202020] font-mono text-[11px]">
                    {prod.specs?.[key] || "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
