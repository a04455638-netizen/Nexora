"use client";

import React from "react";
import Link from "next/link";
import {
  Smartphone,
  Laptop,
  Cpu,
  Layers,
  Monitor,
  Tv,
  Tablet,
  Watch,
  Headphones,
  Gamepad2,
  Keyboard,
  Home,
  HardDrive,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

const iconMap: Record<string, any> = {
  Smartphone,
  Laptop,
  Cpu,
  Layers,
  Monitor,
  Tv,
  Tablet,
  Watch,
  Headphones,
  Gamepad2,
  Keyboard,
  Home,
  HardDrive,
  Sparkles,
};

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="absolute top-full left-0 w-full bg-[#101010]/95 dark:bg-[#0E0E0E]/95 bg-white/95 backdrop-blur-xl border-b border-[#282828] dark:border-[#282828] border-zinc-200 z-50 shadow-2xl transition-all duration-300"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Main Categories Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => {
              const IconComp = iconMap[cat.icon] || Cpu;
              return (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={onClose}
                  className="group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-[#333333] dark:hover:border-[#333333] hover:bg-[#181818] dark:hover:bg-[#181818] hover:bg-zinc-100 transition-all duration-200"
                >
                  <div className="p-2.5 rounded-lg bg-[#1D1D1D] dark:bg-[#1D1D1D] bg-zinc-200 text-[#76B900] group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 text-zinc-800 group-hover:text-[#76B900] transition-colors block">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-400 line-clamp-1 mt-0.5">
                      {cat.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Highlight Promo Card inside MegaMenu */}
          <div className="hidden lg:flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-br from-[#181818] to-[#121212] border border-[#282828] relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#76B900]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#76B900]/10 border border-[#76B900]/30 text-[#76B900] text-[11px] font-bold uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5" />
                NVIDIA Flagman
              </div>
              <h4 className="text-base font-extrabold text-white">GeForce RTX 5090</h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Yangi Blackwell arxitekturasi va 32GB GDDR7 xotirasi bilan dunyoning eng kuchli grafik kartasi.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#262626]">
              <Link
                href="/products/nvidia-geforce-rtx-5090-32gb-gddr7-founders-edition"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#76B900] hover:text-[#8AE000] group"
              >
                Tafsilotlar
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* MegaMenu Bottom quick bar */}
        <div className="mt-6 pt-5 border-t border-[#222222] dark:border-[#222222] border-zinc-200 flex flex-wrap items-center justify-between text-xs text-zinc-400 gap-4">
          <div className="flex items-center gap-6">
            <Link
              href="/marketplace"
              onClick={onClose}
              className="font-bold text-[#76B900] hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              NEXORA Marketplace — Ishlatilgan texnika savdosi
            </Link>
            <Link href="/products?onSale=true" onClick={onClose} className="hover:text-white transition-colors">
              🔥 Chegirmalar va Maxsus Takliflar
            </Link>
            <Link href="/compare" onClick={onClose} className="hover:text-white transition-colors">
              ⚖️ Mahsulotlarni Taqqoslash
            </Link>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-[#76B900]" />
            <span>100% Rasmiy Kafolat va Bepul Yetkazib Berish</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
