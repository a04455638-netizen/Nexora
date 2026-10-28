"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Search,
  Plus,
  ShieldCheck,
  Phone,
  Send,
  Filter,
  CheckCircle2,
  AlertCircle,
  Tag,
} from "lucide-react";
import { MarketplaceListing, MarketplaceCondition } from "@/types";
import { NexoraImage } from "@/components/ui/NexoraImage";
import { CATEGORIES } from "@/data/categories";

const CONDITION_LABELS: Record<MarketplaceCondition, { label: string; color: string }> = {
  brand_new: { label: "Yangi (Qutida)", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  like_new: { label: "Juda yaxshi (Ideal)", color: "bg-[#76B900]/20 text-[#76B900] border-[#76B900]/30" },
  good: { label: "Yaxshi (Ishlatilgan)", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  needs_repair: { label: "Ta'mir talab", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
};

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [category, setCategory] = useState("all");
  const [condition, setCondition] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Contact Seller Modal
  const [activeSeller, setActiveSeller] = useState<MarketplaceListing | null>(null);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (category !== "all") q.set("category", category);
      if (search) q.set("search", search);
      q.set("status", "approved");

      const res = await fetch(`/api/marketplace?${q.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setListings(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [category]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings();
  };

  const filteredListings = listings.filter((l) => {
    if (condition !== "all" && l.condition !== condition) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Marketplace Header Hero */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#141414] via-[#101010] to-[#141414] border border-[#282828] p-8 sm:p-12 mb-10 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#76B900]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76B900]/10 border border-[#76B900]/30 text-[#76B900] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              NEXORA Ishlatilgan Texnika Savdosi
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ishonchli Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Foydalanuvchilar tomonidan sotuvga qo'yilgan tekshirilgan ikkilamchi texnika. Har bir e'lon moderatorlarimiz tomonidan xolis tekshiriladi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/marketplace/new"
              className="px-6 py-3.5 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-sm hover:scale-105 transition-all"
            >
              <Plus className="w-4 h-4" />
              Texnikangizni soting
            </Link>

            <Link
              href="/account/listings"
              className="px-5 py-3.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] border border-[#303030] text-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-colors"
            >
              Mening e'lonlarim
            </Link>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#141414] border border-[#242424] mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              type="text"
              placeholder="E'lonlar orasidan qidirish (model, brend)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#76B900]"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          </form>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
          >
            <option value="all">Barcha kategoriyalar</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.slug} className="bg-[#181818]">
                {cat.name}
              </option>
            ))}
          </select>

          {/* Condition Dropdown */}
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
          >
            <option value="all">Barcha holatlar</option>
            <option value="brand_new">Yangi (Qutida)</option>
            <option value="like_new">Juda yaxshi (Ideal)</option>
            <option value="good">Yaxshi (Ishlatilgan)</option>
            <option value="needs_repair">Ta'mir talab</option>
          </select>
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="p-12 text-center text-zinc-500 text-xs">E'lonlar yuklanmoqda...</div>
      ) : filteredListings.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#141414] border border-[#242424] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1F1F1F] text-zinc-600 flex items-center justify-center mx-auto">
            <Tag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">Hozircha mos e'lonlar topilmadi</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            O'zingizga tegishli ishlatilgan texnikani birinchi bo'lib sotuvga qo'ying!
          </p>
          <Link
            href="/marketplace/new"
            className="inline-flex px-6 py-2.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider"
          >
            E'lon qo'shish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => {
            const cond = CONDITION_LABELS[listing.condition] || { label: listing.condition, color: "" };
            return (
              <div
                key={listing.id}
                className="rounded-3xl bg-[#141414] border border-[#242424] hover:border-[#76B900]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Image area */}
                  <div className="relative aspect-[4/3] bg-[#181818] p-4 flex items-center justify-center overflow-hidden">
                    <NexoraImage
                      src={listing.primaryImage}
                      alt={listing.title}
                      fill
                      className="object-contain"
                    />

                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase font-mono border ${cond.color}`}
                    >
                      {cond.label}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500">
                      <span className="font-bold text-[#76B900] uppercase">{listing.brand}</span>
                      <span>{new Date(listing.createdAt).toLocaleDateString("uz-UZ")}</span>
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                      {listing.title}
                    </h3>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {listing.description}
                    </p>

                    {listing.defects && (
                      <div className="p-2.5 rounded-xl bg-[#1C1C1C] border border-[#2A2A2A] text-[11px] text-zinc-400">
                        <b className="text-zinc-300">Nuqsonlar:</b> {listing.defects}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer and Price */}
                <div className="p-5 pt-0">
                  <div className="flex items-center justify-between pb-3 border-b border-[#202020] mb-3">
                    <div>
                      <span className="text-[11px] text-zinc-500 block">Sotish narxi:</span>
                      <span className="text-lg font-black font-mono text-[#76B900]">
                        {listing.price.toLocaleString("uz-UZ")} so'm
                      </span>
                    </div>

                    <div className="text-right text-[11px] text-zinc-400">
                      <span>Sotuvchi:</span>
                      <div className="font-bold text-white">{listing.sellerName.split(" ")[0]}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveSeller(listing)}
                    className="w-full py-3 rounded-xl bg-[#1F1F1F] hover:bg-[#76B900] text-zinc-200 hover:text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-[#2D2D2D] hover:border-[#76B900] transition-all"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    Sotuvchi bilan bog'lanish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ==================================================================== */}
      {/* CONTACT SELLER MODAL */}
      {/* ==================================================================== */}
      {activeSeller && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161616] border border-[#2E2E2E] rounded-3xl p-6 space-y-5 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider">Sotuvchi Ma'lumotlari</h3>
              <button onClick={() => setActiveSeller(null)} className="text-zinc-500 hover:text-white">
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#111111] border border-[#242424] space-y-1">
              <div className="text-xs text-zinc-400">Mahsulot:</div>
              <div className="text-sm font-bold text-white">{activeSeller.title}</div>
              <div className="text-xs font-mono font-bold text-[#76B900]">
                {activeSeller.price.toLocaleString("uz-UZ")} so'm
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1A1A1A]">
                <span className="text-zinc-400">Sotuvchi:</span>
                <span className="font-bold text-white">{activeSeller.sellerName}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1A1A1A]">
                <span className="text-zinc-400">Telefon:</span>
                <a
                  href={`tel:${activeSeller.sellerPhone}`}
                  className="font-bold text-[#76B900] font-mono hover:underline"
                >
                  {activeSeller.sellerPhone}
                </a>
              </div>

              {activeSeller.sellerTelegram && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#1A1A1A]">
                  <span className="text-zinc-400">Telegram:</span>
                  <a
                    href={`https://t.me/${activeSeller.sellerTelegram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-[#229ED9] hover:underline"
                  >
                    {activeSeller.sellerTelegram}
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href={`tel:${activeSeller.sellerPhone}`}
                className="w-full py-3.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-sm"
              >
                <Phone className="w-4 h-4" />
                Qo'ng'iroq qilish
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
