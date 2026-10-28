"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowLeft,
  Upload,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
  Tag,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useAuth } from "@/features/account/AuthContext";

export default function NewMarketplaceListingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("smartphones");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<"brand_new" | "like_new" | "good" | "needs_repair">("like_new");
  const [description, setDescription] = useState("");
  const [defects, setDefects] = useState("");
  const [includedItems, setIncludedItems] = useState("");
  const [hasWarranty, setHasWarranty] = useState(false);
  const [warrantyDetails, setWarrantyDetails] = useState("");
  const [primaryImage, setPrimaryImage] = useState("/products/placeholder-smartphones.svg");
  const [sellerName, setSellerName] = useState(user?.fullName || "");
  const [sellerPhone, setSellerPhone] = useState(user?.phone || "+998 ");
  const [sellerTelegram, setSellerTelegram] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const payload = {
        title,
        category,
        brand,
        model,
        price: Number(price),
        condition,
        description,
        defects: defects || undefined,
        includedItems: includedItems || undefined,
        hasWarranty,
        warrantyDetails: hasWarranty ? warrantyDetails : undefined,
        primaryImage,
        galleryImages: [primaryImage],
        sellerName,
        sellerPhone,
        sellerTelegram: sellerTelegram || undefined,
      };

      const res = await fetch("/api/marketplace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "E'lon yuborishda xatolik");
      }

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#76B900]/20 border-2 border-[#76B900] flex items-center justify-center mx-auto text-[#76B900] shadow-neon-md">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-white">E'lon Tekshiruvga Yuborildi!</h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            E'loningiz qabul qilindi va Telegram orqali moderatorga xabar yuborildi. 15 daqiqa ichida tekshirilib umumiy katalogda faollashtiriladi.
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/account/listings"
            className="px-6 py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider shadow-neon-sm"
          >
            Mening e'lonlarim
          </Link>
          <Link
            href="/marketplace"
            className="px-6 py-3 rounded-xl bg-[#1A1A1A] text-zinc-300 font-bold text-xs uppercase tracking-wider"
          >
            Marketplace'ga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Marketplace'ga qaytish
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#76B900]" />
          <span>Texnikangizni Sotuvga Qo'ying</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Ishlatilgan texnikangiz ma'lumotlarini to'ldiring. E'lon berish 100% bepul.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Tech Details */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#262626] space-y-4">
          <h2 className="text-xs font-bold text-[#76B900] uppercase tracking-wider">
            1. Qurilma Ma'lumotlari
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Kategoriya *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug} className="bg-[#181818]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Brend *</label>
              <input
                type="text"
                required
                placeholder="Apple, NVIDIA, ASUS, Sony..."
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Model *</label>
              <input
                type="text"
                required
                placeholder="iPhone 15 Pro, RTX 4080 Super..."
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">E'lon sarlavhasi *</label>
              <input
                type="text"
                required
                placeholder="Masalan: iPhone 14 Pro Max 256GB Purple ideal holatda"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Sotish narxi (UZS) *</label>
              <input
                type="number"
                required
                min={10000}
                placeholder="8500000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono outline-none focus:border-[#76B900]"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Mahsulot holati *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              >
                <option value="brand_new">Yangi (Qutida ochilmagan)</option>
                <option value="like_new">Juda yaxshi (Ideal / Yangidek)</option>
                <option value="good">Yaxshi (Kichik foydalanish izlari bilan)</option>
                <option value="needs_repair">Ta'mir talab (Nosoz qismi bor)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Description & Inclusions */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#262626] space-y-4">
          <h2 className="text-xs font-bold text-[#76B900] uppercase tracking-wider">
            2. Batafsil Tavsif va Rasmlar
          </h2>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Mahsulot tavsifi *</label>
            <textarea
              required
              rows={4}
              placeholder="Qurilma qancha vaqt ishlatilgan, qanday sharoitda saqlangan, batareya holati va boshqalar..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl p-3 text-xs text-white outline-none focus:border-[#76B900]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Mavjud nuqsonlar (agar bo'lsa)</label>
              <input
                type="text"
                placeholder="Korpusda tirnalishlar, ekran almashgan..."
                value={defects}
                onChange={(e) => setDefects(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Komplektatsiyasi</label>
              <input
                type="text"
                placeholder="Karobka, hujjatlar, zaryadlovchi kabel..."
                value={includedItems}
                onChange={(e) => setIncludedItems(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Mahsulot rasmi URL manzili *</label>
            <input
              type="url"
              required
              placeholder="https://... yoki /products/placeholder-..."
              value={primaryImage}
              onChange={(e) => setPrimaryImage(e.target.value)}
              className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
            />
          </div>

          {/* Warranty checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasWarranty}
                onChange={(e) => setHasWarranty(e.target.checked)}
                className="accent-[#76B900] rounded"
              />
              <span>Mahsulotning rasmiy do'kon kafolati mavjud</span>
            </label>

            {hasWarranty && (
              <input
                type="text"
                placeholder="Kafolat muddati va do'kon nomi..."
                value={warrantyDetails}
                onChange={(e) => setWarrantyDetails(e.target.value)}
                className="w-full mt-2 bg-[#181818] border border-[#2D2D2D] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#76B900]"
              />
            )}
          </div>
        </div>

        {/* Step 3: Seller Contact Details */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#262626] space-y-4">
          <h2 className="text-xs font-bold text-[#76B900] uppercase tracking-wider">
            3. Bog'lanish Ma'lumotlaringiz
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1">Ismingiz *</label>
              <input
                type="text"
                required
                placeholder="Ismingiz"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Telefon raqamingiz *</label>
              <input
                type="text"
                required
                placeholder="+998 90 123 45 67"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Telegram username (ixtiyoriy)</label>
              <input
                type="text"
                placeholder="@username"
                value={sellerTelegram}
                onChange={(e) => setSellerTelegram(e.target.value)}
                className="w-full bg-[#181818] border border-[#2D2D2D] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider shadow-neon-md transition-all hover:scale-[1.01]"
        >
          {loading ? "E'lon yuborilmoqda..." : "E'lonni Tekshiruvga Yuborish (Telegram Alert)"}
        </button>
      </form>
    </div>
  );
}
