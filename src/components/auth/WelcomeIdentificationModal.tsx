"use client";

import React, { useState, useEffect } from "react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { useAuth } from "@/features/account/AuthContext";
import { Sparkles, Phone, User, CheckCircle2, X } from "lucide-react";

export const WelcomeIdentificationModal: React.FC = () => {
  const { user, login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already identified or dismissed in localStorage
    const identified = localStorage.getItem("nexora_user_identified");
    if (!identified && (!user || !user.fullName)) {
      // Show modal after 1.2s delay for seamless entrance
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("+998")) {
      val = "+998 ";
    }
    setPhone(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (cleanName.length < 2) {
      setError("Iltimos, to'liq ism va familiyangizni kiriting");
      return;
    }

    const digitsOnly = cleanPhone.replace(/\D/g, "");
    if (digitsOnly.length < 9) {
      setError("Telefon raqamingizni to'liq kiriting (masalan: +998 90 123 45 67)");
      return;
    }

    setError("");
    setSubmitted(true);

    // Save profile to context and localStorage
    login(`${digitsOnly}@nexora.uz`, cleanPhone, cleanName, "customer");

    localStorage.setItem("nexora_user_identified", "true");

    setTimeout(() => {
      setIsOpen(false);
    }, 1200);
  };

  const handleDismiss = () => {
    localStorage.setItem("nexora_user_identified", "dismissed");
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#121212] border border-[#2D2D2D] rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(118,185,0,0.15)] text-white overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#76B900]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close / Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          title="Keyinroq"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-[#76B900]/20 border border-[#76B900] flex items-center justify-center mx-auto text-[#76B900]">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl font-black text-white">Xush kelibsiz, {name}!</h3>
            <p className="text-xs text-zinc-400">
              Profil muvaffaqiyatli saqlandi. NEXORA olamiga marhamat!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header branding */}
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center justify-center">
                <NexoraLogo variant="full" size="md" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#76B900]/40 text-[#76B900] text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Xush kelibsiz!</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                NEXORA'ga Xush Kelibsiz!
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                Shaxsiy chegirmalar, tezkor buyurtma rasmiylashtirish va kafolatli xizmatlardan foydalanish uchun ismingiz va telefoningizni kiriting:
              </p>
            </div>

            {/* Identification form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#76B900]" />
                  <span>Ism va familiyangiz:</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masalan: Sardor Aliyev"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#333] text-white text-sm focus:outline-none focus:border-[#76B900] transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#76B900]" />
                  <span>Telefon raqamingiz:</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A] border border-[#333] text-white text-sm font-mono focus:outline-none focus:border-[#76B900] transition-colors"
                />
              </div>

              {error && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-neon-md hover:scale-[1.02]"
              >
                Kirish va Davom Etish
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  Keyinroq kiritish
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default WelcomeIdentificationModal;
