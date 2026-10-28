"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  Clock,
  Send,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/features/cart/CartContext";
import { useAuth } from "@/features/account/AuthContext";
import { NexoraImage } from "@/components/ui/NexoraImage";
import { Order } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, promoCode, discountAmount, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();

  // Form Fields
  const [customerName, setCustomerName] = useState(user?.fullName || "");
  const [customerPhone, setCustomerPhone] = useState(user?.phone || "+998 ");
  const [customerEmail, setCustomerEmail] = useState(user?.email || "");
  const [deliveryCity, setDeliveryCity] = useState(user?.city || "Toshkent shahri");
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash_on_delivery" | "card_on_delivery" | "click" | "payme">(
    "cash_on_delivery"
  );

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Sync customer details from identified profile or localStorage guest data
  React.useEffect(() => {
    if (user) {
      if (user.fullName) setCustomerName(user.fullName);
      if (user.phone) setCustomerPhone(user.phone);
      if (user.email && !user.email.endsWith("@nexora.uz")) setCustomerEmail(user.email);
      if (user.city) setDeliveryCity(user.city);
      if (user.address) setDeliveryAddress(user.address);
    } else {
      try {
        const guest = localStorage.getItem("nexora_guest_info");
        if (guest) {
          const parsed = JSON.parse(guest);
          if (parsed.fullName) setCustomerName(parsed.fullName);
          if (parsed.phone) setCustomerPhone(parsed.phone);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [user]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const payload = {
        customerName,
        customerPhone,
        customerEmail,
        deliveryCity,
        deliveryAddress,
        deliveryNote,
        paymentMethod,
        items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        promoCode: promoCode || undefined,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Buyurtma yaratishda xatolik yuz berdi");
      }

      // Success
      setConfirmedOrder(data);
      clearCart();
    } catch (err: any) {
      setErrorMsg(err.message || "Server bilan bog'lanishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  // If order was confirmed, show the successful confirmation screen
  if (confirmedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#76B900]/20 border-2 border-[#76B900] flex items-center justify-center mx-auto text-[#76B900] shadow-neon-md">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-[#76B900] uppercase tracking-widest">
            Buyurtma Muvaffaqiyatli Qabul Qilindi
          </span>
          <h1 className="text-3xl font-black text-white font-mono">#{confirmedOrder.id}</h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
            Rahmat, {confirmedOrder.customerName}! Buyurtmangiz qabul qilindi va telegram bot orqali mutaxassislarimizga yuborildi. Operator tez orada siz bilan bog'lanadi.
          </p>
        </div>

        {/* Order Details Receipt Box */}
        <div className="rounded-3xl bg-[#141414] border border-[#282828] p-6 text-left space-y-4 text-xs text-zinc-300">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-[#222]">
            <div>
              <span className="text-zinc-500 block">Buyurtmachi:</span>
              <span className="font-bold text-white">{confirmedOrder.customerName}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Telefon:</span>
              <span className="font-bold text-white font-mono">{confirmedOrder.customerPhone}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">Yetkazish manzili:</span>
              <span className="font-bold text-white">{confirmedOrder.deliveryCity}, {confirmedOrder.deliveryAddress}</span>
            </div>
            <div>
              <span className="text-zinc-500 block">To'lov usuli:</span>
              <span className="font-bold text-[#76B900] capitalize">{confirmedOrder.paymentMethod.replace(/_/g, " ")}</span>
            </div>
          </div>

          <div>
            <span className="text-zinc-500 uppercase font-bold text-[11px] block mb-2">Buyurtma tarkibi:</span>
            <div className="space-y-2">
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-white font-medium">
                    {item.productName} <span className="text-zinc-400 font-mono">× {item.quantity}</span>
                  </span>
                  <span className="font-mono text-zinc-200">
                    {(item.unitPrice * item.quantity).toLocaleString("uz-UZ")} so'm
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#222] flex justify-between items-center text-sm font-bold">
            <span className="text-white">Jami to'lov:</span>
            <span className="text-base font-mono text-[#76B900]">
              {confirmedOrder.totalAmount.toLocaleString("uz-UZ")} so'm
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/account/orders"
            className="px-6 py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider shadow-neon-sm hover:scale-105 transition-all"
          >
            Buyurtmani kuzatish
          </Link>

          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#181818] border border-[#2C2C2C] text-zinc-300 font-bold text-xs uppercase tracking-wider hover:bg-[#202020] transition-colors"
          >
            Bosh sahifaga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Buyurtmani Rasmiylashtirish
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Ma'lumotlaringizni to'ldiring va buyurtmangizni tasdiqlang
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Delivery & Customer Info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Personal Details */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-4">
            <h2 className="text-xs font-bold text-[#76B900] uppercase tracking-wider">
              1. Mijoz Ma'lumotlari
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Ism va familiya *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor Aliyev"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Telefon raqami *</label>
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Elektron pochta (ixtiyoriy)</label>
              <input
                type="email"
                placeholder="sardor@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>
          </div>

          {/* Delivery Address Details */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-4">
            <h2 className="text-xs font-bold text-[#76B900] uppercase tracking-wider">
              2. Yetkazib Berish Manzili
            </h2>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Shahar / Viloyat *</label>
              <select
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              >
                <option value="Toshkent shahri">Toshkent shahri (2 soatda yetkazish)</option>
                <option value="Toshkent viloyati">Toshkent viloyati</option>
                <option value="Samarqand viloyati">Samarqand viloyati</option>
                <option value="Buxoro viloyati">Buxoro viloyati</option>
                <option value="Andijon viloyati">Andijon viloyati</option>
                <option value="Farg'ona viloyati">Farg'ona viloyati</option>
                <option value="Namangan viloyati">Namangan viloyati</option>
                <option value="Qashqadaryo viloyati">Qashqadaryo viloyati</option>
                <option value="Surxondaryo viloyati">Surxondaryo viloyati</option>
                <option value="Xorazm viloyati">Xorazm viloyati</option>
                <option value="Navoiy viloyati">Navoiy viloyati</option>
                <option value="Jizzax viloyati">Jizzax viloyati</option>
                <option value="Sirdaryo viloyati">Sirdaryo viloyati</option>
                <option value="Qoraqalpog'iston Respublikasi">Qoraqalpog'iston Respublikasi</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Aniq manzil (Ko'cha, uy, xonadon) *</label>
              <input
                type="text"
                required
                placeholder="Masalan: Chilonzor 9, 14-uy, 42-xonadon"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Yetkazib beruvchiga qo'shimcha izoh</label>
              <textarea
                rows={2}
                placeholder="Podyezd kodi, mo'ljal yoki yetkazish vaqti bo'yicha iltimosingiz..."
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl p-3 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-4">
            <h2 className="text-xs font-bold text-[#76B900] uppercase tracking-wider">
              3. To'lov Usuli
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "cash_on_delivery"
                    ? "bg-[#76B900]/10 border-[#76B900] text-white"
                    : "bg-[#181818] border-[#2C2C2C] text-zinc-400 hover:border-[#444]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cash_on_delivery"}
                  onChange={() => setPaymentMethod("cash_on_delivery")}
                  className="hidden"
                />
                <Banknote className="w-5 h-5 text-[#76B900]" />
                <div>
                  <div className="text-xs font-bold text-white">Yetkazilganda naqd to'lash</div>
                  <div className="text-[10px] text-zinc-400">Tekshirib ko'rib to'laysiz</div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "card_on_delivery"
                    ? "bg-[#76B900]/10 border-[#76B900] text-white"
                    : "bg-[#181818] border-[#2C2C2C] text-zinc-400 hover:border-[#444]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "card_on_delivery"}
                  onChange={() => setPaymentMethod("card_on_delivery")}
                  className="hidden"
                />
                <CreditCard className="w-5 h-5 text-[#76B900]" />
                <div>
                  <div className="text-xs font-bold text-white">Karta orqali yetkazilganda</div>
                  <div className="text-[10px] text-zinc-400">Kuryer terminal olib keladi</div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "click"
                    ? "bg-[#76B900]/10 border-[#76B900] text-white"
                    : "bg-[#181818] border-[#2C2C2C] text-zinc-400 hover:border-[#444]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "click"}
                  onChange={() => setPaymentMethod("click")}
                  className="hidden"
                />
                <span className="w-5 h-5 rounded bg-[#0088CC] text-white font-black text-[9px] flex items-center justify-center">
                  C
                </span>
                <div>
                  <div className="text-xs font-bold text-white">Click orqali to'lov</div>
                  <div className="text-[10px] text-zinc-400">Click ilovasi orqali</div>
                </div>
              </label>

              <label
                className={`p-4 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                  paymentMethod === "payme"
                    ? "bg-[#76B900]/10 border-[#76B900] text-white"
                    : "bg-[#181818] border-[#2C2C2C] text-zinc-400 hover:border-[#444]"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "payme"}
                  onChange={() => setPaymentMethod("payme")}
                  className="hidden"
                />
                <span className="w-5 h-5 rounded bg-[#00CCCC] text-white font-black text-[9px] flex items-center justify-center">
                  P
                </span>
                <div>
                  <div className="text-xs font-bold text-white">Payme orqali to'lov</div>
                  <div className="text-[10px] text-zinc-400">Payme ilovasi orqali</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary Box (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#282828] space-y-5 text-white">
            <h2 className="font-extrabold text-sm uppercase tracking-wider">Buyurtma Xulosasi</h2>

            {/* Items list */}
            <div className="max-h-64 overflow-y-auto divide-y divide-[#202020] pr-1">
              {items.map(({ product, quantity }) => {
                const effPrice = product.discountPrice || product.price;
                return (
                  <div key={product.id} className="py-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#181818] border border-[#282828] p-1 relative flex-shrink-0">
                      <NexoraImage src={product.primaryImage} alt={product.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{product.name}</p>
                      <p className="text-[11px] text-zinc-400 font-mono">
                        {quantity} × {effPrice.toLocaleString("uz-UZ")} so'm
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#76B900]">
                      {(effPrice * quantity).toLocaleString("uz-UZ")} so'm
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-zinc-400 pt-3 border-t border-[#222]">
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
              <div className="flex justify-between text-base font-black text-white pt-3 border-t border-[#242424]">
                <span>Jami to'lov:</span>
                <span className="text-lg font-mono text-[#76B900]">{total.toLocaleString("uz-UZ")} so'm</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || items.length === 0}
              className="w-full py-4 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-md hover:scale-[1.02] transition-all disabled:opacity-50"
            >
              {loading ? (
                <span>Serverda tekshirilmoqda...</span>
              ) : (
                <>
                  <span>Buyurtmani Tasdiqlash</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#76B900]" />
              <span>Buyurtma haqida administratorga Telegram orqali xabar boradi</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
