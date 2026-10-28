"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowLeft,
  Clock,
  CheckCircle2,
  Truck,
  Package,
  XCircle,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";
import { Order, OrderStatus } from "@/types";
import { useAuth } from "@/features/account/AuthContext";
import { NexoraImage } from "@/components/ui/NexoraImage";

const STATUS_STEPS: { key: OrderStatus; label: string; desc: string }[] = [
  { key: "accepted", label: "Qabul qilindi", desc: "Buyurtma operatorga yetkazildi" },
  { key: "preparing", label: "Tayyorlanmoqda", desc: "Ombordan tekshirib qadoqlanmoqda" },
  { key: "shipped", label: "Kuryer yo'lda", desc: "Tezkor yetkazish amalga oshirilmoqda" },
  { key: "delivered", label: "Yetkazib berildi", desc: "Mijoz buyurtmani qabul qilib oldi" },
];

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Cancellation Modal State (Requirement 10)
  const [cancellingOrder, setCancellingOrder] = useState<Order | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const q = user?.phone ? `?phone=${encodeURIComponent(user.phone)}` : "";
      const res = await fetch(`/api/orders${q}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  const handleConfirmCancel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cancellingOrder || !cancelReason.trim()) return;

    setCancelLoading(true);
    setCancelError(null);

    try {
      const res = await fetch(`/api/orders/${cancellingOrder.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel", reason: cancelReason }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Bekor qilishda xatolik");
      }

      // Refresh orders
      setCancellingOrder(null);
      setCancelReason("");
      fetchOrders();
    } catch (err: any) {
      setCancelError(err.message);
    } finally {
      setCancelLoading(false);
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    if (status === "cancelled") return -1;
    return STATUS_STEPS.findIndex((s) => s.key === status);
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
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Buyurtmalarim va Kuzatuv
          </h1>
        </div>

        <Link
          href="/products"
          className="px-4 py-2.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider shadow-neon-sm hover:scale-105 transition-all"
        >
          Yangi buyurtma
        </Link>
      </div>

      {loading ? (
        <div className="p-12 text-center text-zinc-500 text-xs">Buyurtmalar yuklanmoqda...</div>
      ) : orders.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#141414] border border-[#242424] text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1F1F1F] flex items-center justify-center text-zinc-600 mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white">Sizda hali buyurtmalar mavjud emas</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Katalogimizdan kerakli mahsulotlarni tanlab birinchi buyurtmangizni bering.
          </p>
          <Link
            href="/products"
            className="inline-flex px-6 py-2.5 rounded-xl bg-[#76B900] text-black font-bold text-xs uppercase"
          >
            Katalogga o'tish
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStep = getStepIndex(order.status);
            const isCancelled = order.status === "cancelled";
            const canCancel = order.status === "accepted" || order.status === "preparing";

            return (
              <div
                key={order.id}
                className="rounded-3xl bg-[#141414] border border-[#262626] p-6 space-y-6 overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202020]">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-base font-mono font-black text-white">#{order.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                          isCancelled
                            ? "bg-red-500/20 text-red-400 border border-red-500/30"
                            : order.status === "delivered"
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-[#76B900]/20 text-[#76B900] border border-[#76B900]/30"
                        }`}
                      >
                        {isCancelled ? "Bekor qilingan" : order.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-500 font-mono mt-0.5 block">
                      {new Date(order.createdAt).toLocaleString("uz-UZ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-xs text-zinc-500">Jami to'lov:</div>
                      <div className="text-base font-mono font-bold text-[#76B900]">
                        {order.totalAmount.toLocaleString("uz-UZ")} so'm
                      </div>
                    </div>

                    {canCancel && (
                      <button
                        onClick={() => {
                          setCancellingOrder(order);
                          setCancelReason("");
                        }}
                        className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-xs transition-colors"
                      >
                        Bekor qilish
                      </button>
                    )}
                  </div>
                </div>

                {/* Tracking Timeline Status Stepper (Feature 8) */}
                {!isCancelled ? (
                  <div className="py-2">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {STATUS_STEPS.map((step, idx) => {
                        const isDone = idx <= currentStep;
                        const isCurrent = idx === currentStep;

                        return (
                          <div
                            key={step.key}
                            className={`p-3.5 rounded-2xl border transition-all ${
                              isCurrent
                                ? "bg-[#76B900]/10 border-[#76B900] text-white shadow-neon-sm"
                                : isDone
                                ? "bg-[#181818] border-[#303030] text-zinc-300"
                                : "bg-[#101010] border-[#202020] text-zinc-600"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                                  isDone ? "bg-[#76B900] text-black" : "bg-[#252525] text-zinc-500"
                                }`}
                              >
                                {isDone ? "✓" : idx + 1}
                              </span>
                              {isCurrent && (
                                <span className="text-[10px] font-bold text-[#76B900] uppercase animate-pulse">
                                  Hozirgi holat
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-bold text-white">{step.label}</div>
                            <div className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{step.desc}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 space-y-1">
                    <div className="font-bold flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      Buyurtma bekor qilingan
                    </div>
                    {order.cancellationReason && (
                      <p className="text-[11px] text-zinc-400">
                        Sabab: "{order.cancellationReason}"
                      </p>
                    )}
                  </div>
                )}

                {/* Items in this order */}
                <div className="space-y-2 pt-2 border-t border-[#202020]">
                  <span className="text-[11px] font-bold text-zinc-500 uppercase">Buyurtma tarkibi:</span>
                  <div className="divide-y divide-[#1C1C1C]">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-[#1B1B1B] border border-[#2D2D2D] p-1 relative overflow-hidden flex-shrink-0">
                            <NexoraImage src={item.productImage || "/products/placeholder-default.svg"} alt={item.productName} fill className="object-contain" />
                          </div>
                          <span className="font-medium text-white">{item.productName}</span>
                          <span className="text-zinc-500 font-mono">× {item.quantity}</span>
                        </div>
                        <span className="font-mono text-zinc-300">
                          {(item.unitPrice * item.quantity).toLocaleString("uz-UZ")} so'm
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery destination */}
                <div className="text-[11px] text-zinc-400 pt-2 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-2">
                  <span>
                    Yetkazish: <b className="text-white">{order.deliveryCity}, {order.deliveryAddress}</b>
                  </span>
                  <span>To'lov usuli: <b className="text-[#76B900]">{order.paymentMethod}</b></span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ==================================================================== */}
      {/* ORDER CANCELLATION MODAL (Requirement 10) */}
      {/* ==================================================================== */}
      {cancellingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161616] border border-[#2D2D2D] rounded-3xl p-6 space-y-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-wider">Buyurtmani bekor qilish</h3>
              </div>
              <button
                onClick={() => setCancellingOrder(null)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-400">
              #{cancellingOrder.id} raqamli buyurtmani bekor qilishni tasdiqlaysizmi? Ombor zaxiralari avtomatik qaytariladi va administratorga xabar qilinadi.
            </p>

            {cancelError && <p className="text-xs text-red-400">{cancelError}</p>}

            <form onSubmit={handleConfirmCancel} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-300 block mb-1">Bekor qilish sababi *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Nima sababdan buyurtmani bekor qilmoqchisiz? (Masalan: boshqa model tanlandi, reja o'zgardi...)"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full bg-[#111111] border border-[#2E2E2E] rounded-xl p-3 text-xs text-white outline-none focus:border-red-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCancellingOrder(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#222] text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Yo'q, qolsin
                </button>
                <button
                  type="submit"
                  disabled={cancelLoading || !cancelReason.trim()}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider disabled:opacity-50"
                >
                  {cancelLoading ? "Bekor qilinmoqda..." : "Bekor qilishni tasdiqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
