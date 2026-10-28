"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { useAuth } from "@/features/account/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [password, setPassword] = useState("");

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, phone, fullName, "customer");
    router.push("/account");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#141414] border border-[#262626] shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <NexoraLogo variant="icon" size="lg" className="mx-auto mb-2" />
          <h1 className="text-2xl font-black text-white tracking-tight">Ro'yxatdan O'tish</h1>
          <p className="text-xs text-zinc-400">NEXORA oilasiga a'zo bo'ling</p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-zinc-400 block mb-1">Ism va familiyangiz</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Jasur Rahimov"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white outline-none focus:border-[#76B900]"
              />
              <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Telefon raqam</label>
            <div className="relative">
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white outline-none focus:border-[#76B900]"
              />
              <Phone className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Elektron pochta</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="jasur@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white outline-none focus:border-[#76B900]"
              />
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 block mb-1">Parol yarating</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
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
            <span>Ro'yxatdan o'tish</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-[#202020]">
          Akkauntingiz bormi?{" "}
          <Link href="/auth/login" className="text-[#76B900] font-bold hover:underline">
            Tizimga kirish
          </Link>
        </div>
      </div>
    </div>
  );
}
