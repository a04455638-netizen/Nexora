"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import { NexoraImage } from "@/components/ui/NexoraImage";

export const CartDrawer: React.FC = () => {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    discountAmount,
    total,
    updateQuantity,
    removeItem,
    isCartOpen,
    setIsCartOpen,
    applyPromo,
    promoCode,
    removePromo,
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = await applyPromo(inputCode);
    setPromoMessage({ text: res.message, success: res.success });
    if (res.success) setInputCode("");
    setTimeout(() => setPromoMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-[#262626] text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#222222] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#76B900]" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Savatcha ({itemCount})</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg bg-[#1C1C1C] text-zinc-400 hover:text-white"
              aria-label="Yopish"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#202020]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-[#2D2D2D] flex items-center justify-center text-zinc-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-200">Savatchangiz bo'sh</h4>
                  <p className="text-xs text-zinc-500 mt-1">Katalogdan eng yangi texnikalarni tanlang</p>
                </div>
                <Link
                  href="/products"
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#76B900] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#86D000] transition-colors"
                >
                  Xarid qilishni boshlash
                </Link>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const effectivePrice = product.discountPrice || product.price;
                return (
                  <div key={product.id} className="py-4 flex gap-3.5 first:pt-0">
                    <div className="w-16 h-16 rounded-xl bg-[#181818] border border-[#282828] overflow-hidden relative flex-shrink-0 p-1">
                      <NexoraImage
                        src={product.primaryImage}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-semibold text-zinc-200 hover:text-[#76B900] line-clamp-2 leading-tight"
                        >
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-zinc-500 hover:text-red-400 p-1"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-[#303030] rounded-lg bg-[#181818]">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 hover:text-[#76B900] transition-colors"
                            aria-label="Kamaytirish"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 hover:text-[#76B900] transition-colors"
                            aria-label="Oshirish"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-xs font-mono font-bold text-white">
                          {(effectivePrice * quantity).toLocaleString("uz-UZ")} so'm
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#222222] bg-[#0E0E0E] space-y-4">
              {/* Promo code form */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo-kod (masalan, NEXORA10)"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="bg-[#181818] border border-[#2A2A2A] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 outline-none flex-1 uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#252525] hover:bg-[#303030] rounded-xl text-xs font-bold text-white transition-colors"
                >
                  Qo'llash
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.success ? "text-[#76B900]" : "text-red-400"}`}>
                  {promoMessage.text}
                </p>
              )}

              {promoCode && (
                <div className="flex items-center justify-between text-xs bg-[#76B900]/10 border border-[#76B900]/20 p-2 rounded-lg text-[#76B900]">
                  <span>Aktiv: {promoCode}</span>
                  <button onClick={removePromo} className="text-zinc-400 hover:text-white underline">
                    Bekor qilish
                  </button>
                </div>
              )}

              {/* Summary Totals */}
              <div className="space-y-1.5 text-xs text-zinc-400 pt-2 border-t border-[#1E1E1E]">
                <div className="flex justify-between">
                  <span>Mahsulotlar:</span>
                  <span className="text-white font-mono">{subtotal.toLocaleString("uz-UZ")} so'm</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#76B900]">
                    <span>Chegirma:</span>
                    <span className="font-mono">-{discountAmount.toLocaleString("uz-UZ")} so'm</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="text-white font-mono">
                    {deliveryFee > 0 ? `${deliveryFee.toLocaleString("uz-UZ")} so'm` : "Bepul"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#222222]">
                  <span>Jami to'lov:</span>
                  <span className="text-base text-[#76B900] font-mono">
                    {total.toLocaleString("uz-UZ")} so'm
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-sm"
                >
                  Buyurtmani rasmiylashtirish
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#1A1A1A] hover:bg-[#222222] text-zinc-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center transition-colors border border-[#2D2D2D]"
                >
                  To'liq savatchani ko'rish
                </Link>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#76B900]" />
                <span>Xavfsiz server orqali to'lov va tekshiruv</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
