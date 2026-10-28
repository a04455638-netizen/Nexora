"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Phone,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { useCart } from "@/features/cart/CartContext";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { useCompare } from "@/features/compare/CompareContext";
import { useAuth } from "@/features/account/AuthContext";
import { Product } from "@/types";

export const Header: React.FC = () => {
  const router = useRouter();
  const { itemCount, setIsCartOpen } = useCart();
  const { favoritesCount } = useFavorites();
  const { compareCount } = useCompare();
  const { user, isAuthenticated } = useAuth();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smart Search State (Feature 1: Aqlli qidiruv va takliflar)
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced search suggestions
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}&limit=5`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.products || []);
        }
      } catch (err) {
        console.error(err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside search container to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#101010]/95 dark:bg-[#101010]/95 bg-white/95 backdrop-blur-md border-b border-[#242424] dark:border-[#242424] border-zinc-200 transition-colors">
      {/* Top micro bar for brand assurance & contacts */}
      <div className="hidden md:flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1.5 bg-[#0A0A0A] dark:bg-[#0A0A0A] bg-zinc-100 text-[11px] text-zinc-400 dark:text-zinc-400 border-b border-[#1E1E1E] dark:border-[#1E1E1E] border-zinc-200">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#76B900] font-semibold">
            <Shield className="w-3.5 h-3.5" />
            Rasmiy Kafolatli Texnika Do'koni va Marketplace
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 dark:text-zinc-300">Toshkent bo'yicha 2 soat ichida tezkor yetkazish</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/help" className="hover:text-white transition-colors">
            Yordam markazi & FAQ
          </Link>
          <span className="text-zinc-600">|</span>
          <Link href="/marketplace" className="hover:text-[#76B900] transition-colors font-medium">
            Texnikangizni soting
          </Link>
          <span className="text-zinc-600">|</span>
          <a href="tel:+998712000000" className="flex items-center gap-1 hover:text-white transition-colors font-mono font-medium">
            <Phone className="w-3 h-3 text-[#76B900]" />
            +998 (71) 200-00-00
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & MegaMenu trigger */}
          <div className="flex items-center gap-6">
            <NexoraLogo variant="full" size="md" />

            {/* MegaMenu Dropdown Button */}
            <div className="relative hidden lg:block">
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 border ${
                  isMegaMenuOpen
                    ? "bg-[#76B900] text-black border-[#76B900] shadow-neon-sm"
                    : "bg-[#181818] dark:bg-[#181818] bg-zinc-100 hover:bg-[#202020] dark:hover:bg-[#202020] text-zinc-100 dark:text-zinc-100 text-zinc-800 border-[#2D2D2D] dark:border-[#2D2D2D] border-zinc-300"
                }`}
              >
                <Layers className="w-4 h-4 text-[#76B900] group-hover:text-black" />
                <span>Katalog</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {/* Smart Search Bar (Feature 1) */}
          <div ref={searchContainerRef} className="flex-1 max-w-xl mx-2 relative hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="RTX 5090, iPhone 16, MacBook M3, OLED TV qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full bg-[#161616] dark:bg-[#161616] bg-zinc-100 border border-[#2D2D2D] dark:border-[#2D2D2D] border-zinc-300 focus:border-[#76B900] dark:focus:border-[#76B900] rounded-xl px-4 py-2.5 pl-10 text-xs text-white dark:text-white text-zinc-900 placeholder-zinc-500 outline-none transition-all shadow-inner focus:ring-1 focus:ring-[#76B900]"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSuggestions([]);
                  }}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Live Autocomplete Suggestions Dropdown */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-[#141414] dark:bg-[#141414] bg-white border border-[#2A2A2A] dark:border-[#2A2A2A] border-zinc-200 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="p-2 border-b border-[#202020] dark:border-[#202020] border-zinc-200 text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Qidiruv natijalari</span>
                  <span className="text-[#76B900]">{suggestions.length} ta topildi</span>
                </div>
                <div className="divide-y divide-[#202020] dark:divide-[#202020] divide-zinc-100">
                  {suggestions.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.slug}`}
                      onClick={() => {
                        setIsSearchFocused(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-3 hover:bg-[#1C1C1C] dark:hover:bg-[#1C1C1C] hover:bg-zinc-100 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#202020] overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <img src={item.primaryImage} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-zinc-100 dark:text-zinc-100 text-zinc-800 truncate group-hover:text-[#76B900]">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#76B900] font-mono font-bold mt-0.5">
                          {(item.discountPrice || item.price).toLocaleString("uz-UZ")} so'm
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
                <div className="p-2 bg-[#0E0E0E] dark:bg-[#0E0E0E] bg-zinc-50 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-xs font-semibold text-[#76B900] hover:underline"
                  >
                    Barcha natijalarni ko'rish &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Action Icons: Compare, Favorites, Cart, Account, Theme */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Marketplace quick link */}
            <Link
              href="/marketplace"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:text-[#76B900] hover:bg-[#181818] dark:hover:bg-[#181818] hover:bg-zinc-100 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#76B900]" />
              Marketplace
            </Link>

            {/* Compare (Feature 2) */}
            <Link
              href="/compare"
              className="relative p-2.5 rounded-xl bg-[#161616] dark:bg-[#161616] bg-zinc-100 text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:text-[#76B900] border border-[#262626] dark:border-[#262626] border-zinc-200 transition-colors"
              title="Mahsulotlarni taqqoslash"
              aria-label="Taqqoslash"
            >
              <Scale className="w-4 h-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#76B900] text-black font-extrabold text-[10px] flex items-center justify-center shadow-neon-sm">
                  {compareCount}
                </span>
              )}
            </Link>

            {/* Favorites (Feature 3) */}
            <Link
              href="/favorites"
              className="relative p-2.5 rounded-xl bg-[#161616] dark:bg-[#161616] bg-zinc-100 text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:text-[#76B900] border border-[#262626] dark:border-[#262626] border-zinc-200 transition-colors"
              title="Sevimlilar ro'yxati"
              aria-label="Sevimlilar"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#76B900] text-black font-extrabold text-[10px] flex items-center justify-center shadow-neon-sm">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#161616] dark:bg-[#161616] bg-zinc-100 text-zinc-300 dark:text-zinc-300 text-zinc-700 hover:text-[#76B900] border border-[#262626] dark:border-[#262626] border-zinc-200 transition-colors"
              title="Savatcha"
              aria-label="Savatcha"
            >
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#76B900] text-black font-extrabold text-[10px] flex items-center justify-center shadow-neon-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Account / Profile */}
            <Link
              href={isAuthenticated ? "/account" : "/auth/login"}
              className="hidden sm:inline-flex items-center gap-2 p-2 px-3 rounded-xl bg-[#161616] dark:bg-[#161616] bg-zinc-100 hover:bg-[#202020] dark:hover:bg-[#202020] text-zinc-200 dark:text-zinc-200 text-zinc-800 border border-[#262626] dark:border-[#262626] border-zinc-200 text-xs font-semibold transition-colors"
            >
              <User className="w-4 h-4 text-[#76B900]" />
              <span className="max-w-[90px] truncate">
                {isAuthenticated ? user?.fullName.split(" ")[0] : "Kirish"}
              </span>
            </Link>

            {/* Theme Toggle (Dark / Light Mode) */}
            <ThemeToggle />

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#181818] border border-[#282828] text-zinc-300"
              aria-label="Menyu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input when screen is small */}
        <div className="pb-3 sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Mahsulot qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161616] border border-[#2D2D2D] rounded-xl px-4 py-2 pl-9 text-xs text-white placeholder-zinc-500 outline-none"
            />
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* MegaMenu Dropdown component */}
      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />

      {/* Mobile drawer menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#101010] border-b border-[#282828] px-4 py-6 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-[#181818] text-center font-bold text-xs text-white"
            >
              Barcha mahsulotlar
            </Link>
            <Link
              href="/marketplace"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-[#181818] text-center font-bold text-xs text-[#76B900]"
            >
              ✨ Marketplace
            </Link>
            <Link
              href="/compare"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-[#181818] text-center font-bold text-xs text-zinc-300"
            >
              ⚖️ Taqqoslash ({compareCount})
            </Link>
            <Link
              href="/favorites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-[#181818] text-center font-bold text-xs text-zinc-300"
            >
              ❤️ Sevimlilar ({favoritesCount})
            </Link>
          </div>

          <div className="pt-4 border-t border-[#222] space-y-2">
            <Link
              href="/category/smartphones"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-zinc-300 hover:text-white"
            >
              Smartfonlar
            </Link>
            <Link
              href="/category/laptops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-zinc-300 hover:text-white"
            >
              Noutbuklar
            </Link>
            <Link
              href="/category/desktops"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-zinc-300 hover:text-white"
            >
              Stol kompyuterlari & Gaming
            </Link>
            <Link
              href="/category/gpus"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-zinc-300 hover:text-white"
            >
              Videokartalar (RTX 5090 / 4090)
            </Link>
            <Link
              href="/account"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-zinc-300 hover:text-white font-semibold"
            >
              👤 Shaxsiy kabinet
            </Link>
            <Link
              href="/account/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-zinc-300 hover:text-white"
            >
              📦 Buyurtmalarim & Kuzatuv
            </Link>
            <Link
              href="/help"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-zinc-300 hover:text-white"
            >
              📞 Yordam & Aloqa
            </Link>
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block p-2 text-sm text-[#76B900] font-bold"
            >
              ⚙️ Admin Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
