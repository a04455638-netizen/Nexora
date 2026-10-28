"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { useAuth } from "@/features/account/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("alisher@nexora.uz");
  const [password, setPassword] = useState("••••••••");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, "+998 90 999 88 77", "Alisher Navoiy", email.includes("admin") ? "admin" : "customer");
    router.push("/account");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#141414] border border-[#262626] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <NexoraLogo variant="icon" size="lg" className="mx-auto mb-2" />
          <h1 className="text-2xl font-black text-white tracking-tight">Tizimga Kirish</h1>
          <p className="text-xs text-zinc-400">NEXORA hisobingizga kiring</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Elektron pochta</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white outline-none focus:border-[#76B900]"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Maxfiy kalit (Parol)</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white outline-none focus:border-[#76B900]"
              />
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-neon-sm transition-all"
          >
            <span>Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-[#202020]">
          Hali hisobingiz yo'qmi?{" "}
          <Link href="/auth/register" className="text-[#76B900] font-bold hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </div>
      </div>
    </div>
  );
}
