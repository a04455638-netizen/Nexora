import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { CATEGORIES } from "@/data/categories";
import { db } from "@/lib/db";
import { Metadata } from "next";

// Aliases for category routes requested in prompt
const SLUG_ALIASES: Record<string, string> = {
  gaming: "desktops",
  accessories: "gaming-accessories",
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const actualSlug = SLUG_ALIASES[params.slug] || params.slug;
  const category = CATEGORIES.find((c) => c.slug === actualSlug);

  if (!category) return { title: "Kategoriya topilmadi" };

  return {
    title: `${category.name} — Premium Modellar va Narxlar`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const actualSlug = SLUG_ALIASES[params.slug] || params.slug;
  const category = CATEGORIES.find((c) => c.slug === actualSlug);

  if (!category) {
    notFound();
  }

  const { products, totalCount } = db.getProducts({
    category: actualSlug,
    limit: 100,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#161616] via-[#111111] to-[#161616] border border-[#262626] p-8 sm:p-10 mb-10 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#76B900]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#76B900] transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Barcha mahsulotlar
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#76B900]/10 border border-[#76B900]/30 text-[#76B900] text-[11px] font-bold uppercase tracking-wider">
            <Zap className="w-3 h-3" />
            NEXORA Rasmiy Bo'limi
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {category.name}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            {category.description}
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-zinc-400">
            <span className="font-mono font-bold text-white">
              {totalCount} ta original model
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#76B900]">
              <ShieldCheck className="w-4 h-4" /> 100% Rasmiy kafolat
            </span>
          </div>
        </div>
      </div>

      {/* Category Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
