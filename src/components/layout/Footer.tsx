"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Send,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#0A0A0A] dark:bg-[#0A0A0A] bg-zinc-900 text-zinc-400 border-t border-[#222222] dark:border-[#222222] border-zinc-800 transition-colors">
      {/* 4 Guarantees Banner */}
      <div className="border-b border-[#1A1A1A] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#282828] flex items-center justify-center text-[#76B900]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Rasmiy Kafolat</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">36 oygacha servis markaz kafolati</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#282828] flex items-center justify-center text-[#76B900]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tezkor Yetkazib Berish</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Toshkentda 2 soat, viloyatlarga 24 soat</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#282828] flex items-center justify-center text-[#76B900]">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">14 Kunlik Qaytarish</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Nosozlik bo'lsa so'zsiz almashtirish</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#141414] border border-[#282828] flex items-center justify-center text-[#76B900]">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">24/7 Professional Yordam</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Mutaxassis texnik konsultatsiyasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <NexoraLogo variant="full" size="md" />
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              NEXORA — eng so'nggi flagman texnologiyalar, NVIDIA grafik tezlatgichlari, Apple qurilmalari va professional gaming tizimlarining O'zbekistondagi premium do'koni va marketplace platformasi.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block mb-2">
                Texnologik Yangiliklar va Chegirmalar
              </span>
              <form onSubmit={handleSubscribe} className="flex max-w-sm gap-2">
                <input
                  type="email"
                  required
                  placeholder="Elektron pochta manzilingiz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#151515] border border-[#282828] focus:border-[#76B900] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 outline-none flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#76B900] text-black font-bold text-xs hover:bg-[#86D000] transition-colors flex items-center gap-1 shadow-neon-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  Obuna
                </button>
              </form>
              {subscribed && (
                <p className="text-xs text-[#76B900] flex items-center gap-1 mt-2">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Muvaffaqiyatli obuna bo'ldingiz!
                </p>
              )}
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#76B900] pl-2.5">
              Ommabop Katalog
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/category/smartphones" className="hover:text-white transition-colors">
                  Smartfonlar (iPhone, Galaxy)
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="hover:text-white transition-colors">
                  Noutbuklar (MacBook, ROG)
                </Link>
              </li>
              <li>
                <Link href="/category/gpus" className="hover:text-white transition-colors">
                  Videokartalar (RTX 5090 / 4090)
                </Link>
              </li>
              <li>
                <Link href="/category/desktops" className="hover:text-white transition-colors">
                  Kompyuter & Gaming
                </Link>
              </li>
              <li>
                <Link href="/category/monitors" className="hover:text-white transition-colors">
                  Monitorlar (OLED 240Hz)
                </Link>
              </li>
              <li>
                <Link href="/category/appliances" className="hover:text-white transition-colors">
                  Maishiy texnika (Dyson, Roborock)
                </Link>
              </li>
            </ul>
          </div>

          {/* Marketplace & Services */}
          <div>
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#76B900] pl-2.5">
              Marketplace & Kabinet
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/marketplace" className="hover:text-[#76B900] transition-colors font-medium">
                  ✨ Ishlatilgan texnika savdosi
                </Link>
              </li>
              <li>
                <Link href="/marketplace/new" className="hover:text-white transition-colors">
                  Texnikangizni sotuvga qo'ying
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Shaxsiy kabinet
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Buyurtmalarim va kuzatuv
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Texnik taqqoslash vositasi
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition-colors">
                  Sevimlilar ro'yxati
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#76B900] transition-colors font-semibold">
                  Boshqaruv paneli (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Telegram Info */}
          <div>
            <h5 className="text-xs font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-[#76B900] pl-2.5">
              Aloqa & Manzil
            </h5>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#76B900] flex-shrink-0 mt-0.5" />
                <span>Toshkent shahri, Amir Temur shoh ko'chasi, 12-bino</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#76B900] flex-shrink-0" />
                <a href="tel:+998712000000" className="hover:text-white font-mono">
                  +998 (71) 200-00-00
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#76B900] flex-shrink-0" />
                <a href="mailto:info@nexora.uz" className="hover:text-white">
                  info@nexora.uz
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#229ED9]/10 border border-[#229ED9]/30 text-[#229ED9] text-xs font-bold hover:bg-[#229ED9]/20 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Telegram Bot & Kanal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment icons */}
        <div className="mt-12 pt-6 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 NEXORA Premium Technology Store & Marketplace. Barcha huquqlar himoyalangan.</p>

          <div className="flex items-center gap-4 text-[11px] font-mono text-zinc-400">
            <span className="px-2 py-1 rounded bg-[#161616] border border-[#282828]">Click</span>
            <span className="px-2 py-1 rounded bg-[#161616] border border-[#282828]">Payme</span>
            <span className="px-2 py-1 rounded bg-[#161616] border border-[#282828]">Uzcard / Humo</span>
            <span className="px-2 py-1 rounded bg-[#161616] border border-[#282828]">Visa / MC</span>
            <span className="px-2 py-1 rounded bg-[#161616] border border-[#282828] text-[#76B900]">Naqd to'lov</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
