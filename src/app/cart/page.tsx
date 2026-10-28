"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Calculator,
} from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import { NexoraImage } from "@/components/ui/NexoraImage";

const UZ_REGIONS = [
  { name: "Toshkent shahri", fee: 0, days: "2 soat ichida" },
  { name: "Toshkent viloyati", fee: 30000, days: "Bugun" },
  { name: "Samarqand viloyati", fee: 40000, days: "1 kun" },
  { name: "Buxoro viloyati", fee: 40000, days: "1 kun" },
  { name: "Andijon viloyati", fee: 40000, days: "1 kun" },
  { name: "Farg'ona viloyati", fee: 40000, days: "1 kun" },
  { name: "Namangan viloyati", fee: 40000, days: "1 kun" },
  { name: "Qashqadaryo viloyati", fee: 45000, days: "1-2 kun" },
  { name: "Surxondaryo viloyati", fee: 45000, days: "1-2 kun" },
  { name: "Xorazm viloyati", fee: 45000, days: "1-2 kun" },
  { name: "Navoiy viloyati", fee: 40000, days: "1 kun" },
  { name: "Jizzax viloyati", fee: 35000, days: "1 kun" },
  { name: "Sirdaryo viloyati", fee: 35000, days: "1 kun" },
  { name: "Qoraqalpog'iston Respublikasi", fee: 50000, days: "2 kun" },
];

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromo,
    promoCode,
    removePromo,
  } = useCart();

  const [inputPromo, setInputPromo] = useState("");
  const [promoFeedback, setPromoFeedback] = useState<{ text: string; ok: boolean } | null>(null);

  // Delivery Calculator State (Feature 7)
  const [selectedRegion, setSelectedRegion] = useState(UZ_REGIONS[0]);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPromo.trim()) return;
    const res = await applyPromo(inputPromo);
    setPromoFeedback({ text: res.message, ok: res.success });
    if (res.success) setInputPromo("");
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 rounded-3xl bg-[#141414] border border-[#242424] flex items-center justify-center mx-auto text-zinc-600">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-white">Savatchangiz bo'sh</h1>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Katalogimizdan flagman smartfonlar, NVIDIA videokartalari yoki noutbuklarni tanlang.
        </p>
        <Link
          href="/products"
          className="inline-flex px-8 py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider shadow-neon-sm hover:scale-105 transition-all"
        >
          Katalogga o'tish
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#222]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Savatcha</h1>
          <p className="text-xs text-zinc-400 mt-1">{itemCount} ta tanlangan mahsulot</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Savatchani tozalash</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-[#242424] bg-[#121212] divide-y divide-[#1F1F1F] overflow-hidden">
            {items.map(({ product, quantity }) => {
              const effectivePrice = product.discountPrice || product.price;
              const lineTotal = effectivePrice * quantity;

              return (
                <div key={product.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-[#181818] border border-[#262626] p-2 relative overflow-hidden flex-shrink-0">
                    <NexoraImage src={product.primaryImage} alt={product.name} fill className="object-contain" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#76B900] font-bold uppercase">{product.brand}</div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="text-sm font-semibold text-white hover:text-[#76B900] line-clamp-2 leading-snug"
                    >
                      {product.name}
                    </Link>
                    <div className="text-xs text-zinc-400 mt-1 font-mono">
                      Donasi: {effectivePrice.toLocaleString("uz-UZ")} so'm
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#303030] rounded-xl bg-[#161616]">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-2.5 py-1 text-sm hover:text-[#76B900]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-mono font-bold text-white">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-2.5 py-1 text-sm hover:text-[#76B900]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-extrabold text-[#76B900] font-mono">
                        {lineTotal.toLocaleString("uz-UZ")} so'm
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-[11px] text-zinc-500 hover:text-red-400 mt-1"
                      >
                        O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Delivery Cost Calculator (Feature 7) */}
          <div className="p-6 rounded-2xl bg-[#121212] border border-[#242424] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <Calculator className="w-4 h-4 text-[#76B900]" />
              Yetkazib Berish Narxi Kalkulyatori
            </div>

            <p className="text-xs text-zinc-400">
              Yetkazish shahrini tanlang. 1 500 000 so'mdan yuqori buyurtmalarda yetkazib berish butun O'zbekiston bo'ylab <b>BEPUL</b>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <select
                value={selectedRegion.name}
                onChange={(e) => {
                  const reg = UZ_REGIONS.find((r) => r.name === e.target.value);
                  if (reg) setSelectedRegion(reg);
                }}
                className="bg-[#181818] border border-[#2D2D2D] rounded-xl p-2.5 text-xs text-white outline-none"
              >
                {UZ_REGIONS.map((r) => (
                  <option key={r.name} value={r.name} className="bg-[#181818]">
                    {r.name}
                  </option>
                ))}
              </select>

              <div className="p-2.5 rounded-xl bg-[#161616] border border-[#2D2D2D] flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Muddat: {selectedRegion.days}</span>
                <span className="font-bold text-[#76B900]">
                  {subtotal >= 1500000 ? "0 so'm (Bepul)" : `${selectedRegion.fee.toLocaleString("uz-UZ")} so'm`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#282828] space-y-5 text-white">
            <h3 className="font-extrabold text-sm uppercase tracking-wider">Buyurtma Xulosasi</h3>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo-kod (NEXORA10)"
                  value={inputPromo}
                  onChange={(e) => setInputPromo(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#303030] rounded-xl px-3 py-2 text-xs text-white outline-none flex-1 uppercase"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-[#252525] hover:bg-[#333] text-xs font-bold text-white transition-colors"
                >
                  Qo'llash
                </button>
              </div>

              {promoFeedback && (
                <p className={`text-[11px] ${promoFeedback.ok ? "text-[#76B900]" : "text-red-400"}`}>
                  {promoFeedback.text}
                </p>
              )}

              {promoCode && (
                <div className="flex items-center justify-between text-xs bg-[#76B900]/10 border border-[#76B900]/30 p-2 rounded-lg text-[#76B900]">
                  <span>Aktiv promo: {promoCode}</span>
                  <button onClick={removePromo} className="text-zinc-400 hover:text-white underline">
                    Bekor qilish
                  </button>
                </div>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-zinc-400 pt-3 border-t border-[#222]">
              <div className="flex justify-between">
                <span>Mahsulotlar summasi:</span>
                <span className="text-white font-mono">{subtotal.toLocaleString("uz-UZ")} so'm</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#76B900]">
                  <span>Promo chegirma:</span>
                  <span className="font-mono">-{discountAmount.toLocaleString("uz-UZ")} so'm</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Yetkazib berish ({selectedRegion.name.split(" ")[0]}):</span>
                <span className="text-white font-mono">
                  {subtotal >= 1500000 || selectedRegion.fee === 0
                    ? "0 so'm (Bepul)"
                    : `${selectedRegion.fee.toLocaleString("uz-UZ")} so'm`}
                </span>
              </div>

              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-[#262626]">
                <span>Jami to'lov:</span>
                <span className="text-lg text-[#76B900] font-mono">
                  {(subtotal - discountAmount + (subtotal >= 1500000 ? 0 : selectedRegion.fee)).toLocaleString(
                    "uz-UZ"
                  )}{" "}
                  so'm
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-md hover:scale-[1.02] transition-all"
            >
              <span>Buyurtmani rasmiylashtirish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-2">
              <ShieldCheck className="w-4 h-4 text-[#76B900]" />
              <span>Narxlar server tomonidan qayta tekshiriladi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
