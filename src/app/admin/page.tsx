"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Download,
  Send,
  Check,
  X,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { Order, Product, MarketplaceListing, OrderStatus } from "@/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [marketplace, setMarketplace] = useState<MarketplaceListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Active tab: 'dashboard' | 'orders' | 'products' | 'marketplace'
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "products" | "marketplace">("dashboard");

  // Product edit modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editStock, setEditStock] = useState("");

  // Add Product form state
  const [newProductName, setNewProductName] = useState("");
  const [newProductBrand, setNewProductBrand] = useState("");
  const [newProductModel, setNewProductModel] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("smartphones");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState("10");
  const [newProductImg, setNewProductImg] = useState("https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80");
  const [newProductDesc, setNewProductDesc] = useState("");

  // Telegram test status
  const [telegramStatus, setTelegramStatus] = useState<string | null>(null);
  const [telegramLoading, setTelegramLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, prodRes, ordRes, mpRes, tgRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/products?limit=50"),
        fetch("/api/orders"),
        fetch("/api/marketplace?status=all"),
        fetch("/api/telegram/test"),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (prodRes.ok) {
        const pd = await prodRes.json();
        setProducts(pd.products || []);
      }
      if (ordRes.ok) setOrders(await ordRes.json());
      if (mpRes.ok) setMarketplace(await mpRes.json());
      if (tgRes.ok) {
        const t = await tgRes.json();
        setTelegramStatus(t.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_status", status }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarketplaceAction = async (id: string, status: "approved" | "rejected") => {
    try {
      await fetch(`/api/marketplace/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveProductEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: Number(editPrice),
          stock: Number(editStock),
        }),
      });
      setEditingProduct(null);
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Haqiqatan ham bu mahsulotni o'chirmoqchimisiz?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newProductName,
          brand: newProductBrand,
          model: newProductModel,
          category: newProductCategory,
          categoryName: newProductCategory,
          price: Number(newProductPrice),
          stock: Number(newProductStock),
          primaryImage: newProductImg,
          galleryImages: [newProductImg],
          description: newProductDesc || `${newProductBrand} ${newProductModel} yuqori sifatli flagman model.`,
          specs: {},
          warrantyMonths: 12,
        }),
      });
      setNewProductName("");
      setNewProductBrand("");
      setNewProductModel("");
      setNewProductPrice("");
      setNewProductDesc("");
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleTestTelegram = async () => {
    setTelegramLoading(true);
    try {
      const res = await fetch("/api/telegram/test", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert("Telegramga test xabar muvaffaqiyatli yuborildi!");
      } else {
        alert("Telegram xabari yuborilmadi: " + (data.error || "Token sozlanmagan"));
      }
    } catch (e: any) {
      alert("Xatolik: " + e.message);
    } finally {
      setTelegramLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Admin Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#222] gap-4 mb-8">
        <div className="flex items-center gap-4">
          <NexoraLogo variant="icon" size="md" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-mono">NEXORA ADMIN PANEL</h1>
              <span className="px-2 py-0.5 rounded bg-[#76B900]/20 text-[#76B900] text-[10px] font-bold font-mono">
                SECURE ACCESS
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">Do'kon, buyurtmalar, ombor va marketplace boshqaruvi</p>
          </div>
        </div>

        {/* Action buttons: Refresh, CSV export, Telegram test */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={fetchData}
            className="p-2.5 rounded-xl bg-[#181818] border border-[#2D2D2D] text-zinc-300 hover:text-white"
            title="Yangilash"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#76B900]" : ""}`} />
          </button>

          <a
            href="/api/admin/export?type=products"
            className="px-3.5 py-2 rounded-xl bg-[#1C1C1C] border border-[#2C2C2C] hover:border-[#76B900] text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#76B900]" />
            Mahsulotlar CSV
          </a>

          <a
            href="/api/admin/export?type=orders"
            className="px-3.5 py-2 rounded-xl bg-[#1C1C1C] border border-[#2C2C2C] hover:border-[#76B900] text-zinc-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#76B900]" />
            Buyurtmalar CSV
          </a>

          <button
            onClick={handleTestTelegram}
            disabled={telegramLoading}
            className="px-3.5 py-2 rounded-xl bg-[#229ED9]/10 border border-[#229ED9]/30 text-[#229ED9] hover:bg-[#229ED9]/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            {telegramLoading ? "Tekshirilmoqda..." : "Telegram Test"}
          </button>
        </div>
      </div>

      {/* Telegram integration alert indicator (Requirement 9 & 18) */}
      {telegramStatus && (
        <div className="mb-6 p-4 rounded-2xl bg-[#141414] border border-[#262626] text-xs text-zinc-400 flex items-start gap-3">
          <Send className="w-4 h-4 text-[#76B900] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Telegram Bot API Integratsiya Holati:</span>
            <p className="text-[11px] leading-relaxed">{telegramStatus}</p>
          </div>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#242424]">
          <span className="text-[11px] font-bold text-zinc-500 uppercase">Jami Daromad</span>
          <div className="text-xl sm:text-2xl font-black text-[#76B900] font-mono mt-1">
            {stats?.totalSalesRevenue ? stats.totalSalesRevenue.toLocaleString("uz-UZ") : 0} UZS
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5 block">Yetkazilgan va faol buyurtmalar</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-[#242424]">
          <span className="text-[11px] font-bold text-zinc-500 uppercase">Faol Buyurtmalar</span>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            {stats?.pendingOrders || 0} ta
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5 block">Jami buyurtmalar: {stats?.totalOrders || 0} ta</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-[#242424]">
          <span className="text-[11px] font-bold text-zinc-500 uppercase">Ombor Nazorati</span>
          <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono mt-1">
            {stats?.lowStockCount || 0} ta kam
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5 block">Tugagan mahsulotlar: {stats?.outOfStockCount || 0}</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#141414] border border-[#242424]">
          <span className="text-[11px] font-bold text-zinc-500 uppercase">Marketplace E'lonlari</span>
          <div className="text-xl sm:text-2xl font-black text-[#229ED9] font-mono mt-1">
            {stats?.pendingMarketplace || 0} ta yangi
          </div>
          <span className="text-[10px] text-zinc-500 mt-0.5 block">Tasdiqlash kutilmoqda</span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-[#222] mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "dashboard" ? "bg-[#76B900] text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          Umumiy Ko'rinish
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "orders" ? "bg-[#76B900] text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          Buyurtmalar ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "products" ? "bg-[#76B900] text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          Mahsulotlar Boshqaruvi ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("marketplace")}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-colors ${
            activeTab === "marketplace" ? "bg-[#76B900] text-black" : "text-zinc-400 hover:text-white"
          }`}
        >
          Marketplace Moderatsiyasi ({marketplace.length})
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: ORDERS MANAGEMENT */}
      {/* ==================================================================== */}
      {(activeTab === "dashboard" || activeTab === "orders") && (
        <div className="space-y-4 mb-10">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Oxirgi Buyurtmalar
          </h2>

          <div className="rounded-2xl border border-[#242424] bg-[#121212] overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#202020] bg-[#161616] text-zinc-500 uppercase font-mono text-[10px]">
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Mijoz</th>
                  <th className="p-3.5">Telefon</th>
                  <th className="p-3.5">Shahar / Manzil</th>
                  <th className="p-3.5">Summa</th>
                  <th className="p-3.5">Holat</th>
                  <th className="p-3.5">O'zgartirish</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C1C]">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#161616] transition-colors">
                    <td className="p-3.5 font-mono font-bold text-white">#{o.id}</td>
                    <td className="p-3.5 font-semibold text-zinc-200">{o.customerName}</td>
                    <td className="p-3.5 font-mono text-zinc-400">{o.customerPhone}</td>
                    <td className="p-3.5 text-zinc-300 max-w-xs truncate">{o.deliveryCity}, {o.deliveryAddress}</td>
                    <td className="p-3.5 font-mono font-bold text-[#76B900]">
                      {o.totalAmount.toLocaleString("uz-UZ")} so'm
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                          o.status === "cancelled"
                            ? "bg-red-500/20 text-red-400"
                            : o.status === "delivered"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-[#76B900]/20 text-[#76B900]"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={o.status}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as OrderStatus)}
                        className="bg-[#1C1C1C] border border-[#303030] rounded-lg px-2 py-1 text-[11px] text-zinc-200 outline-none"
                      >
                        <option value="accepted">Qabul qilindi</option>
                        <option value="preparing">Tayyorlanmoqda</option>
                        <option value="shipped">Kuryer yo'lida</option>
                        <option value="delivered">Yetkazildi</option>
                        <option value="cancelled">Bekor qilindi</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: PRODUCTS MANAGEMENT & ADD PRODUCT */}
      {/* ==================================================================== */}
      {(activeTab === "products" || activeTab === "dashboard") && (
        <div className="space-y-6 mb-10">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
              Mahsulotlar Ro'yxati va Ombor Zaxiralari
            </h2>
          </div>

          {/* Quick Add Product Card */}
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#242424] space-y-4">
            <h3 className="text-xs font-bold text-[#76B900] uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Yangi Mahsulot Qo'shish
            </h3>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                required
                placeholder="Mahsulot to'liq nomi"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="bg-[#181818] border border-[#2D2D2D] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
              <input
                type="text"
                required
                placeholder="Brend (masalan: NVIDIA)"
                value={newProductBrand}
                onChange={(e) => setNewProductBrand(e.target.value)}
                className="bg-[#181818] border border-[#2D2D2D] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
              <input
                type="text"
                required
                placeholder="Model (masalan: RTX 5070)"
                value={newProductModel}
                onChange={(e) => setNewProductModel(e.target.value)}
                className="bg-[#181818] border border-[#2D2D2D] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
              <input
                type="number"
                required
                placeholder="Narxi (UZS)"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                className="bg-[#181818] border border-[#2D2D2D] rounded-xl px-3 py-2 text-xs text-white font-mono outline-none"
              />
              <input
                type="number"
                required
                placeholder="Ombor soni"
                value={newProductStock}
                onChange={(e) => setNewProductStock(e.target.value)}
                className="bg-[#181818] border border-[#2D2D2D] rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
              <button
                type="submit"
                className="py-2 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase hover:bg-[#86D000] transition-colors"
              >
                Bazaga Qo'shish
              </button>
            </form>
          </div>

          {/* Products Table */}
          <div className="rounded-2xl border border-[#242424] bg-[#121212] overflow-x-auto max-h-[500px]">
            <table className="w-full text-xs text-left">
              <thead className="sticky top-0 z-10 bg-[#161616]">
                <tr className="border-b border-[#202020] text-zinc-500 uppercase font-mono text-[10px]">
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Nomi</th>
                  <th className="p-3.5">Brend</th>
                  <th className="p-3.5">Narx (UZS)</th>
                  <th className="p-3.5">Ombor</th>
                  <th className="p-3.5">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C1C]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#161616] transition-colors">
                    <td className="p-3.5 font-mono text-zinc-400">{p.id}</td>
                    <td className="p-3.5 font-semibold text-white max-w-xs truncate">{p.name}</td>
                    <td className="p-3.5 text-[#76B900] font-bold">{p.brand}</td>
                    <td className="p-3.5 font-mono text-white">
                      {(p.discountPrice || p.price).toLocaleString("uz-UZ")}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                          p.stock <= 3
                            ? "bg-red-500/20 text-red-400"
                            : p.stock <= 7
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {p.stock} ta
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setEditPrice(String(p.price));
                            setEditStock(String(p.stock));
                          }}
                          className="p-1.5 rounded-lg bg-[#202020] hover:text-[#76B900]"
                          title="Tahrirlash"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="p-1.5 rounded-lg bg-[#202020] hover:text-red-400"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: MARKETPLACE MODERATION */}
      {/* ==================================================================== */}
      {(activeTab === "marketplace" || activeTab === "dashboard") && (
        <div className="space-y-4 mb-10">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Marketplace E'lonlarini Tekshirish va Moderatsiya
          </h2>

          <div className="rounded-2xl border border-[#242424] bg-[#121212] overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#202020] bg-[#161616] text-zinc-500 uppercase font-mono text-[10px]">
                  <th className="p-3.5">Sarlavha</th>
                  <th className="p-3.5">Sotuvchi</th>
                  <th className="p-3.5">Telefon</th>
                  <th className="p-3.5">Narx</th>
                  <th className="p-3.5">Holat</th>
                  <th className="p-3.5">Moderatsiya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1C1C]">
                {marketplace.map((m) => (
                  <tr key={m.id} className="hover:bg-[#161616] transition-colors">
                    <td className="p-3.5 font-bold text-white max-w-xs truncate">{m.title}</td>
                    <td className="p-3.5 text-zinc-300">{m.sellerName}</td>
                    <td className="p-3.5 font-mono text-zinc-400">{m.sellerPhone}</td>
                    <td className="p-3.5 font-mono font-bold text-[#76B900]">
                      {m.price.toLocaleString("uz-UZ")} so'm
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                          m.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : m.status === "pending"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        {m.status !== "approved" && (
                          <button
                            onClick={() => handleMarketplaceAction(m.id, "approved")}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 text-[11px] font-bold flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            Tasdiqlash
                          </button>
                        )}
                        {m.status !== "rejected" && (
                          <button
                            onClick={() => handleMarketplaceAction(m.id, "rejected")}
                            className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 text-[11px] font-bold flex items-center gap-1"
                          >
                            <X className="w-3 h-3" />
                            Rad etish
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Quick Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161616] border border-[#2D2D2D] rounded-3xl p-6 space-y-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider">Mahsulotni Tahrirlash</h3>
              <button onClick={() => setEditingProduct(null)} className="text-zinc-500 hover:text-white">
                ✕
              </button>
            </div>

            <div className="text-xs text-zinc-300 font-bold">{editingProduct.name}</div>

            <form onSubmit={handleSaveProductEdit} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Narxi (UZS)</label>
                <input
                  type="number"
                  required
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-[#111] border border-[#2C2C2C] rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none focus:border-[#76B900]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Ombor zaxirasi (dona)</label>
                <input
                  type="number"
                  required
                  value={editStock}
                  onChange={(e) => setEditStock(e.target.value)}
                  className="w-full bg-[#111] border border-[#2C2C2C] rounded-xl px-3.5 py-2 text-xs text-white font-mono outline-none focus:border-[#76B900]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-[#222] text-xs font-bold text-zinc-400"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
