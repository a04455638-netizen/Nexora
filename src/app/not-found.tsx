"use client";

import React from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { ArrowLeft, Home, Search, Cpu } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-[#76B900]/20 blur-3xl rounded-full" />
        <div className="relative w-24 h-24 rounded-3xl bg-[#141414] border border-[#2D2D2D] flex items-center justify-center mx-auto text-[#76B900] shadow-neon-md">
          <Cpu className="w-12 h-12 animate-pulse" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-mono font-bold text-[#76B900] uppercase tracking-widest">
          Xatolik 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Sahifa Topilmadi
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          Siz qidirayotgan sahifa ko'chirilgan, o'chirilgan yoki manzili noto'g'ri kiritilgan bo'lishi mumkin.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-neon-sm hover:scale-105 transition-all"
        >
          <Home className="w-4 h-4" />
          Bosh sahifa
        </Link>

        <Link
          href="/products"
          className="px-6 py-3 rounded-xl bg-[#181818] border border-[#2D2D2D] text-zinc-300 font-bold text-xs uppercase tracking-wider hover:bg-[#202020] transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Katalogga o'tish
        </Link>
      </div>
    </div>
  );
}
