"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Flame,
  Award,
  Layers,
  Star,
  CheckCircle2,
  ChevronRight,
  Clock,
} from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { NexoraImage } from "@/components/ui/NexoraImage";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORIES } from "@/data/categories";
import { Product } from "@/types";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [discountProducts, setDiscountProducts] = useState<Product[]>([]);
  const [categoriesWithCount, setCategoriesWithCount] = useState<any[]>([]);

  // Flash deal countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products?limit=50"),
          fetch("/api/categories"),
        ]);
        if (prodRes.ok) {
          const pData = await prodRes.json();
          const prods: Product[] = pData.products || [];
          setFeaturedProducts(prods.filter((p) => p.isFeatured).slice(0, 8));
          setBestsellers(prods.filter((p) => p.isBestseller).slice(0, 8));
          setDiscountProducts(
            prods.filter((p) => p.discountPrice && p.discountPrice < p.price).slice(0, 4)
          );
        }
        if (catRes.ok) {
          const cData = await catRes.json();
          setCategoriesWithCount(cData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] dark:bg-[#0A0A0A] bg-zinc-50 text-zinc-100 transition-colors">
      {/* ==================================================================== */}
      {/* 1. HERO SECTION — NVIDIA-INSPIRED PREMIUM FUTURISTIC TECH BANNER */}
      {/* ==================================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#202020] dark:border-[#202020] border-zinc-200">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-[#76B900]/15 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-[#76B900]/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Tech subtle geometric grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#151515_1px,transparent_1px),linear-gradient(to_bottom,#151515_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181818] border border-[#76B900]/40 text-[#76B900] text-xs font-extrabold uppercase tracking-widest shadow-neon-sm">
                <Zap className="w-3.5 h-3.5 animate-pulse" />
                <span>NVIDIA Blackwell & Flagman Avlodi 2026</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white dark:text-white text-zinc-900 leading-[1.08]">
                NEXORA — ZAMONAVIY TEXNIKA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#76B900]">
                  VA ELEKTRONIKA DO'KONI.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-zinc-400 dark:text-zinc-400 text-zinc-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Nexora — smartfonlar, noutbuklar, maishiy texnika va gadjetlar hamyonbop narxlarda. NVIDIA GeForce RTX 5090 videokartalari, Apple flagmanlari va 200 dan ortiq premium texnika mahsulotlarining O'zbekistondagi rasmiy markazi.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/products"
                  className="px-8 py-4 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-neon-md hover:scale-105 transition-all duration-300"
                >
                  <span>Katalogni Ko'rish</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/marketplace"
                  className="px-6 py-4 rounded-xl bg-[#161616] dark:bg-[#161616] bg-zinc-200 hover:bg-[#202020] text-zinc-200 dark:text-zinc-200 text-zinc-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 border border-[#2D2D2D] dark:border-[#2D2D2D] border-zinc-300 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#76B900]" />
                  <span>Marketplace: Ishlatilgan Texnika</span>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-[#202020] dark:border-[#202020] border-zinc-200 grid grid-cols-3 gap-4 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white dark:text-white text-zinc-900 font-mono">200+</div>
                  <div className="text-[11px] text-zinc-400">Noyob Mahsulotlar</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#76B900] font-mono">100%</div>
                  <div className="text-[11px] text-zinc-400">Rasmiy Kafolat</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white dark:text-white text-zinc-900 font-mono">2 Soat</div>
                  <div className="text-[11px] text-zinc-400">Toshkentda Yetkazish</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual — Flagship 3D Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-gradient-to-b from-[#181818] to-[#101010] border border-[#282828] p-6 shadow-2xl overflow-hidden group">
                {/* Neon green corner edge glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#76B900]/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#76B900] animate-ping" />
                    <span className="text-xs font-mono font-bold text-[#76B900] uppercase tracking-wider">
                      Flagman Namoyishi
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-zinc-400">#NVIDIA-RTX-5090</span>
                </div>

                {/* Showcase image */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#0D0D0D] p-4 flex items-center justify-center">
                  <NexoraImage
                    src="/products/nx-gp-53.svg"
                    alt="NVIDIA GeForce RTX 5090 Founders Edition"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                    fallbackCategory="videokartalar"
                    fallbackText="GeForce RTX 5090 FE"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#303030] text-[11px] font-mono text-zinc-300">
                    32GB GDDR7 • 512-bit • DLSS 4
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-white">GeForce RTX 5090 FE</h3>
                      <p className="text-xs text-zinc-400">Blackwell Flagship 2026</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-bold text-[#76B900] font-mono">36 000 000 so'm</div>
                      <div className="text-[10px] text-zinc-500 line-through">38 500 000 so'm</div>
                    </div>
                  </div>

                  <Link
                    href="/products/nvidia-geforce-rtx-5090-32gb-gddr7-founders-edition"
                    className="w-full py-3 rounded-xl bg-[#1F1F1F] hover:bg-[#76B900] text-zinc-200 hover:text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border border-[#2D2D2D] hover:border-[#76B900]"
                  >
                    <span>Mahsulotni Ko'rish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. CATEGORIES GRID — 15 ESSENTIAL TECH CATEGORIES */}
      {/* ==================================================================== */}
      <section className="py-16 border-b border-[#202020] dark:border-[#202020] border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-[#76B900] uppercase tracking-widest mb-1">
                Katalog Bo'limlari
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white dark:text-white text-zinc-900 tracking-tight">
                Texnologik Kategoriyalar
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-zinc-400 hover:text-[#76B900] flex items-center gap-1 group"
            >
              <span>Barchasi (200+)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
            {categoriesWithCount.slice(0, 15).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group p-4 rounded-2xl bg-[#141414] dark:bg-[#141414] bg-white border border-[#262626] dark:border-[#262626] border-zinc-200 hover:border-[#76B900]/70 hover:shadow-neon-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-bold text-zinc-400 group-hover:text-[#76B900]">
                    {cat.productCount || 14} ta model
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[#76B900] group-hover:translate-x-0.5 transition-all" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white dark:text-white text-zinc-900 group-hover:text-[#76B900] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. FLASH DEALS WITH COUNTDOWN TIMER */}
      {/* ==================================================================== */}
      <section className="py-16 bg-[#0E0E0E] dark:bg-[#0E0E0E] bg-zinc-100 border-b border-[#202020] dark:border-[#202020] border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 uppercase tracking-widest mb-1">
                <Flame className="w-4 h-4 fill-current animate-pulse" />
                <span>Kun Taklifi • Cheklangan Muddat</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white dark:text-white text-zinc-900 tracking-tight">
                Katta Chegirmalar
              </h2>
            </div>

            {/* Countdown Clock Box */}
            <div className="flex items-center gap-2 bg-[#181818] border border-[#2A2A2A] px-4 py-2 rounded-xl text-xs font-mono text-zinc-300">
              <Clock className="w-4 h-4 text-[#76B900]" />
              <span>Tugashiga:</span>
              <span className="font-bold text-[#76B900] bg-black px-2 py-1 rounded">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="font-bold text-[#76B900] bg-black px-2 py-1 rounded">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span>:</span>
              <span className="font-bold text-[#76B900] bg-black px-2 py-1 rounded">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. FEATURED PRODUCTS & FLAGSHIPS */}
      {/* ==================================================================== */}
      <section className="py-16 border-b border-[#202020] dark:border-[#202020] border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-[#76B900] uppercase tracking-widest mb-1">
                Tanlangan Flagmanlar
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white dark:text-white text-zinc-900 tracking-tight">
                Eng Ommabop Qurilmalar
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-zinc-400 hover:text-[#76B900] flex items-center gap-1 group"
            >
              <span>Barchasini ko'rish</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 5. MARKETPLACE PROMO BANNER (Texnikangni Sot) */}
      {/* ==================================================================== */}
      <section className="py-16 bg-gradient-to-r from-[#141414] via-[#0E0E0E] to-[#141414] border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-[#121212] border border-[#282828] p-8 sm:p-12 overflow-hidden">
            <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#76B900]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76B900]/10 border border-[#76B900]/30 text-[#76B900] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  NEXORA Marketplace Platformasi
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  Eski Texnikangizni Soting yoki Yangisiga Almashtiring!
                </h3>
                <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
                  Ishlatilgan videokarta, smartfon yoki noutbukingiz bormi? NEXORA Marketplace orqali e'lon bering. Har bir e'lon moderatorlarimiz tomonidan tekshiriladi va xavfsiz sotiladi.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/marketplace/new"
                    className="px-6 py-3.5 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider shadow-neon-sm hover:scale-105 transition-all"
                  >
                    E'lon Qo'shish (Bepul)
                  </Link>

                  <Link
                    href="/marketplace"
                    className="px-6 py-3.5 rounded-xl bg-[#1F1F1F] hover:bg-[#282828] text-white font-bold text-xs uppercase tracking-wider border border-[#333333] transition-colors"
                  >
                    Ishlatilgan Texnika Katalogi
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#181818] border border-[#2D2D2D] p-6 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Qanday Ishlaydi?
                </div>
                <div className="space-y-2.5 text-xs text-zinc-400">
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#76B900] text-black font-extrabold text-[10px] flex items-center justify-center flex-shrink-0">
                      1
                    </span>
                    <span>Mahsulot ma'lumotlari va rasmlarini yuklang</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#76B900] text-black font-extrabold text-[10px] flex items-center justify-center flex-shrink-0">
                      2
                    </span>
                    <span>Admin 15 daqiqa ichida tekshirib tasdiqlaydi</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#76B900] text-black font-extrabold text-[10px] flex items-center justify-center flex-shrink-0">
                      3
                    </span>
                    <span>Xaridorlar siz bilan bevosita bog'lanadi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. BESTSELLERS SECTION */}
      {/* ==================================================================== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Mijozlar Tanlovi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white dark:text-white text-zinc-900 tracking-tight">
                Eng Ko'p Sotilganlar
              </h2>
            </div>
            <Link
              href="/products?sort=bestseller"
              className="text-xs font-bold text-zinc-400 hover:text-[#76B900] flex items-center gap-1 group"
            >
              <span>Barcha bestsellerlar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
