"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  Scale,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Shield,
  LogOut,
  Save,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/features/account/AuthContext";
import { useCart } from "@/features/cart/CartContext";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { useCompare } from "@/features/compare/CompareContext";

export default function AccountPage() {
  const { user, updateProfile, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const { favoritesCount } = useFavorites();
  const { compareCount } = useCompare();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "+998 ");
  const [city, setCity] = useState(user?.city || "Toshkent shahri");
  const [address, setAddress] = useState(user?.address || "");

  const [savedSuccess, setSavedSuccess] = useState(false);

  React.useEffect(() => {
    if (user) {
      if (user.fullName) setFullName(user.fullName);
      if (user.phone) setPhone(user.phone);
      if (user.email) setEmail(user.email);
      if (user.city) setCity(user.city);
      if (user.address) setAddress(user.address);
    }
  }, [user]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, email, phone, city, address });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#222] gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#161616] border border-[#2A2A2A] flex items-center justify-center text-[#76B900] shadow-neon-sm">
            <User className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">{user?.fullName || fullName}</h1>
              <span className="px-2 py-0.5 rounded-md bg-[#76B900]/20 text-[#76B900] text-[10px] font-mono font-bold uppercase">
                {user?.role || "Mijoz"}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{user?.email || email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/account/orders"
            className="px-4 py-2.5 rounded-xl bg-[#181818] border border-[#2D2D2D] text-xs font-bold text-white hover:border-[#76B900] transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#76B900]" />
            Buyurtmalarim
          </Link>
          <button
            onClick={logout}
            className="px-3.5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Chiqish"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <Link
          href="/account/orders"
          className="p-5 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#76B900]/50 transition-colors"
        >
          <div className="text-xs font-bold text-zinc-400 uppercase">Buyurtmalar</div>
          <div className="text-2xl font-black text-white mt-1 font-mono">Faol</div>
          <p className="text-[11px] text-[#76B900] mt-1">Holatni kuzatish &rarr;</p>
        </Link>

        <Link
          href="/favorites"
          className="p-5 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#76B900]/50 transition-colors"
        >
          <div className="text-xs font-bold text-zinc-400 uppercase">Sevimlilar</div>
          <div className="text-2xl font-black text-white mt-1 font-mono">{favoritesCount} ta</div>
          <p className="text-[11px] text-[#76B900] mt-1">Ro'yxatni ko'rish &rarr;</p>
        </Link>

        <Link
          href="/compare"
          className="p-5 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#76B900]/50 transition-colors"
        >
          <div className="text-xs font-bold text-zinc-400 uppercase">Taqqoslanayotgan</div>
          <div className="text-2xl font-black text-white mt-1 font-mono">{compareCount} ta</div>
          <p className="text-[11px] text-[#76B900] mt-1">Matritsani ochish &rarr;</p>
        </Link>

        <Link
          href="/marketplace"
          className="p-5 rounded-2xl bg-[#141414] border border-[#242424] hover:border-[#76B900]/50 transition-colors"
        >
          <div className="text-xs font-bold text-zinc-400 uppercase">Marketplace</div>
          <div className="text-2xl font-black text-[#76B900] mt-1 font-mono">E'lon berish</div>
          <p className="text-[11px] text-zinc-400 mt-1">Texnikangizni soting &rarr;</p>
        </Link>
      </div>

      {/* Profile Edit Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#202020]">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Profil Ma'lumotlarini Tahrirlash
            </h2>
            <Shield className="w-4 h-4 text-[#76B900]" />
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">To'liq ism</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-zinc-400">Telefon raqam</label>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${user?.isPhoneVerified ? 'bg-[#76B900]/10 text-[#76B900] border border-[#76B900]/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                    {user?.isPhoneVerified ? 'Tasdiqlangan' : 'Tasdiqlanmagan (SMS tekshiruvisiz)'}
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Elektron pochta</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Shahar / Viloyat</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Doimiy yetkazish manzili</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#86D000] flex items-center gap-2 shadow-neon-sm transition-all"
              >
                <Save className="w-4 h-4" />
                O'zgarishlarni saqlash
              </button>

              {savedSuccess && (
                <span className="text-xs text-[#76B900] flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Saqlandi!
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Right Info Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#242424] space-y-4 text-xs text-zinc-300">
            <h3 className="font-extrabold text-white text-xs uppercase tracking-wider">
              Xavfsizlik & Kirish
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              Hisobingiz Supabase Auth va ikki bosqichli shifrlash bilan himoyalangan. Siz faqat o'zingizning buyurtmalaringiz va shaxsiy ma'lumotlaringizni ko'ra olasiz.
            </p>
            <div className="pt-2 border-t border-[#222]">
              <Link
                href="/admin"
                className="text-xs text-[#76B900] font-bold hover:underline block"
              >
                Admin boshqaruv paneliga o'tish &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
