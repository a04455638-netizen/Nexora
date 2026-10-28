"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Filter,
  X,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORIES } from "@/data/categories";
import { Product } from "@/types";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial params
  const initialCategory = searchParams.get("category") || "all";
  const initialBrand = searchParams.get("brand") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = searchParams.get("sort") || "featured";
  const initialInStock = searchParams.get("inStock") === "true";
  const initialOnSale = searchParams.get("onSale") === "true";
  const initialPage = Number(searchParams.get("page")) || 1;

  // Filters State
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState(initialBrand);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState(initialSort);
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [inStock, setInStock] = useState(initialInStock);
  const [onSale, setOnSale] = useState(initialOnSale);
  const [page, setPage] = useState(initialPage);

  // Products Data
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Brands list
  const availableBrands = [
    "Apple",
    "Samsung",
    "NVIDIA",
    "ASUS",
    "Lenovo",
    "Dell",
    "Razer",
    "MSI",
    "Sony",
    "Logitech",
    "Dyson",
    "AMD",
    "Intel",
    "Xiaomi",
    "Bose",
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (search) q.set("search", search);
      if (category && category !== "all") q.set("category", category);
      if (brand && brand !== "all") q.set("brand", brand);
      if (minPrice) q.set("minPrice", minPrice);
      if (maxPrice) q.set("maxPrice", maxPrice);
      if (inStock) q.set("inStock", "true");
      if (onSale) q.set("onSale", "true");
      if (sort) q.set("sort", sort);
      q.set("page", String(page));
      q.set("limit", "24");

      const res = await fetch(`/api/products?${q.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
        setTotalCount(data.totalCount || 0);
        setTotalPages(data.totalPages || 1);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, brand, sort, inStock, onSale, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleResetFilters = () => {
    setCategory("all");
    setBrand("all");
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(false);
    setOnSale(false);
    setSort("featured");
    setPage(1);
    router.push("/products");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <div className="text-xs text-zinc-500 mb-1">
          <span>Bosh sahifa</span> <span className="mx-1">/</span> <span className="text-[#76B900]">Katalog</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white dark:text-white text-zinc-900 tracking-tight">
              Barcha Texnika Mahsulotlari
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Jami <span className="text-[#76B900] font-bold font-mono">{totalCount}</span> ta mahsulot topildi
            </p>
          </div>

          {/* Sort & Mobile filter button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2 rounded-xl bg-[#181818] border border-[#282828] text-xs font-bold text-white flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#76B900]" />
              Filterlar
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 bg-[#141414] dark:bg-[#141414] bg-white border border-[#282828] dark:border-[#282828] border-zinc-200 rounded-xl px-3 py-2 text-xs">
              <span className="text-zinc-500 hidden sm:inline">Saralash:</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="bg-transparent text-white dark:text-white text-zinc-900 font-bold outline-none cursor-pointer"
              >
                <option value="featured" className="bg-[#181818] text-white">Tavsiya etilgan</option>
                <option value="bestseller" className="bg-[#181818] text-white">Eng ko'p sotilganlar</option>
                <option value="newest" className="bg-[#181818] text-white">Eng yangilar</option>
                <option value="price_asc" className="bg-[#181818] text-white">Narx: Arzondan qimmatga</option>
                <option value="price_desc" className="bg-[#181818] text-white">Narx: Qimmatdan arzonga</option>
                <option value="rating_desc" className="bg-[#181818] text-white">Yuqori reyting</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ================================================================= */}
        {/* FILTERS SIDEBAR */}
        {/* ================================================================= */}
        <div
          className={`lg:block ${
            mobileFilterOpen ? "block fixed inset-0 z-50 bg-[#121212] p-6 overflow-y-auto" : "hidden"
          }`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-[#242424] mb-6">
              <h3 className="font-extrabold text-white text-sm uppercase">Filterlar</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-2 text-zinc-400">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="space-y-6 bg-[#141414] dark:bg-[#141414] bg-white border border-[#242424] dark:border-[#242424] border-zinc-200 p-5 rounded-2xl">
            {/* Search Input inside sidebar */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                Nom bo'yicha qidirish
              </label>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Model yoki nom..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl px-3 py-2 pl-8 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#76B900]"
                />
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
              </form>
            </div>

            {/* Category Selector */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                Kategoriya
              </label>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                <button
                  onClick={() => {
                    setCategory("all");
                    setPage(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                    category === "all"
                      ? "bg-[#76B900] text-black font-extrabold"
                      : "text-zinc-400 hover:text-white hover:bg-[#1E1E1E]"
                  }`}
                >
                  <span>Barcha kategoriyalar</span>
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.slug);
                      setPage(1);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                      category === cat.slug
                        ? "bg-[#76B900] text-black font-extrabold"
                        : "text-zinc-400 hover:text-white hover:bg-[#1E1E1E]"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Pills */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                Brendlar
              </label>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => {
                    setBrand("all");
                    setPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                    brand === "all"
                      ? "bg-[#76B900] text-black"
                      : "bg-[#1C1C1C] text-zinc-400 hover:text-white"
                  }`}
                >
                  Hammasi
                </button>
                {availableBrands.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setBrand(b);
                      setPage(1);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                      brand === b
                        ? "bg-[#76B900] text-black"
                        : "bg-[#1C1C1C] text-zinc-400 hover:text-white"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-2">
                Narx oralig'i (UZS)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl px-2.5 py-2 text-xs text-white outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="bg-[#1A1A1A] border border-[#2D2D2D] rounded-xl px-2.5 py-2 text-xs text-white outline-none"
                />
              </div>
              <button
                onClick={() => {
                  setPage(1);
                  fetchProducts();
                }}
                className="w-full mt-2 py-1.5 rounded-lg bg-[#252525] hover:bg-[#303030] text-[11px] font-bold text-zinc-300"
              >
                Narxni qo'llash
              </button>
            </div>

            {/* Quick Checkbox Toggles */}
            <div className="space-y-2 pt-2 border-t border-[#222]">
              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => {
                    setInStock(e.target.checked);
                    setPage(1);
                  }}
                  className="accent-[#76B900] rounded"
                />
                <span>Faqat omborda mavjud</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-zinc-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onSale}
                  onChange={(e) => {
                    setOnSale(e.target.checked);
                    setPage(1);
                  }}
                  className="accent-[#76B900] rounded"
                />
                <span className="text-[#76B900] font-bold">Faqat chegirmadagi mahsulotlar</span>
              </label>
            </div>

            {/* Reset Filters button */}
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 rounded-xl bg-[#1C1C1C] hover:bg-[#252525] text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-[#2C2C2C]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Filterlarni tozalash
            </button>

            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider"
              >
                Natijalarni ko'rish ({totalCount})
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* PRODUCTS GRID & PAGINATION */}
        {/* ================================================================= */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 rounded-2xl bg-[#151515] animate-pulse border border-[#222]" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-3xl bg-[#141414] border border-[#242424] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#1F1F1F] text-zinc-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">Hech qanday mahsulot topilmadi</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Qidiruv so'rovi yoki tanlangan filterlar bo'yicha mahsulot topilmadi. Filterlarni tozalab qaytadan urinib ko'ring.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#76B900] text-black font-bold text-xs uppercase tracking-wider"
              >
                Barcha mahsulotlarni ko'rsatish
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2.5 rounded-xl bg-[#161616] border border-[#282828] text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#76B900]"
                    aria-label="Oldingi sahifa"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {[...Array(totalPages)].map((_, i) => {
                    const pNum = i + 1;
                    return (
                      <button
                        key={pNum}
                        onClick={() => setPage(pNum)}
                        className={`w-10 h-10 rounded-xl font-mono text-xs font-bold transition-all ${
                          page === pNum
                            ? "bg-[#76B900] text-black shadow-neon-sm"
                            : "bg-[#161616] border border-[#282828] text-zinc-300 hover:border-[#76B900]"
                        }`}
                      >
                        {pNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2.5 rounded-xl bg-[#161616] border border-[#282828] text-zinc-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#76B900]"
                    aria-label="Keyingi sahifa"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-500">Yuklanmoqda...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
