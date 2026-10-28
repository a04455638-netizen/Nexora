"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Plus, Tag, CheckCircle2, Clock, XCircle, Check } from "lucide-react";
import { MarketplaceListing } from "@/types";
import { NexoraImage } from "@/components/ui/NexoraImage";
import { useAuth } from "@/features/account/AuthContext";

export default function MyListingsPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyListings = async () => {
    try {
      const res = await fetch("/api/marketplace?status=all");
      if (res.ok) {
        const data = await res.json();
        // Filter by user phone or show all active
        setListings(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, [user]);

  const handleMarkSold = async (id: string) => {
    try {
      await fetch(`/api/marketplace/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "sold" }),
      });
      fetchMyListings();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between pb-4 border-b border-[#222] mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/account" className="text-xs text-zinc-500 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Shaxsiy kabinet
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-[#76B900]" />
            <span>Mening E'lonlarim</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Siz sotuvga qo'ygan ishlatilgan texnikalar</p>
        </div>

        <Link
          href="/marketplace/new"
          className="px-5 py-2.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-neon-sm hover:scale-105 transition-all"
        >
          <Plus className="w-4 h-4" />
          Yangi e'lon
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-zinc-500 text-xs">Yuklanmoqda...</div>
      ) : listings.length === 0 ? (
        <div className="p-16 rounded-3xl bg-[#141414] border border-[#242424] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1F1F1F] flex items-center justify-center text-zinc-600 mx-auto">
            <Tag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">Sizda hali e'lonlar yo'q</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            O'zingizga kerak bo'lmagan texnikani pullang! NEXORA orqali tez va xavfsiz soting.
          </p>
          <Link
            href="/marketplace/new"
            className="inline-flex px-6 py-2.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider"
          >
            E'lon berish
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-[#181818] border border-[#2A2A2A] relative overflow-hidden flex-shrink-0 p-1">
                  <NexoraImage src={item.primaryImage} alt={item.title} fill className="object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        item.status === "approved" || item.status === "active"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : item.status === "pending"
                          ? "bg-amber-500/20 text-amber-400"
                          : item.status === "sold"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.status === "approved" ? "Sotuvda faol" : item.status}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-mono">
                      {new Date(item.createdAt).toLocaleDateString("uz-UZ")}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-1">{item.title}</h3>
                  <div className="text-xs font-mono font-bold text-[#76B900] mt-0.5">
                    {item.price.toLocaleString("uz-UZ")} so'm
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.status !== "sold" && (
                  <button
                    onClick={() => handleMarkSold(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#1F1F1F] hover:bg-[#2A2A2A] text-zinc-300 font-semibold text-xs border border-[#333] transition-colors flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Sotildi deb belgilash
                  </button>
                )}
                <Link
                  href="/marketplace"
                  className="px-3 py-1.5 rounded-xl bg-[#181818] text-zinc-400 hover:text-white text-xs border border-[#262626]"
                >
                  Katalogda ko'rish
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
