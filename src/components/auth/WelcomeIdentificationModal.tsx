"use client";

import React, { useState, useEffect } from "react";
import { NexoraLogo } from "@/components/brand/NexoraLogo";
import { useAuth } from "@/features/account/AuthContext";
import { Sparkles, Phone, User, CheckCircle2, X, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

export const WelcomeIdentificationModal: React.FC = () => {
  const { user, saveIdentifiedUser, isLoaded } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    // Check if user has already visited/completed this welcome modal
    try {
      const alreadySeen = localStorage.getItem("nexora_welcome_seen");
      const savedUser = localStorage.getItem("nexora_user");
      
      // If modal has not been completed/dismissed, and user does not already have an identified profile
      if (!alreadySeen && (!savedUser || !user?.fullName)) {
        // Show modal smoothly after 1 second for first-time visitors
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 900);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isLoaded, user]);

  if (!isOpen) return null;

  // Format Uzbekistan phone number mask: +998 (90) 123-45-67
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    
    // Always preserve +998
    if (!input.startsWith("+998")) {
      input = "+998" + input.replace(/^\+?998?/, "");
    }

    // Extract digits only
    const digits = input.replace(/\D/g, "");
    // digits start with 998
    const localDigits = digits.slice(3, 12); // up to 9 digits

    let formatted = "+998";
    if (localDigits.length > 0) {
      formatted += " (" + localDigits.slice(0, 2);
    }
    if (localDigits.length >= 2) {
      formatted += ") " + localDigits.slice(2, 5);
    }
    if (localDigits.length >= 5) {
      formatted += "-" + localDigits.slice(5, 7);
    }
    if (localDigits.length >= 7) {
      formatted += "-" + localDigits.slice(7, 9);
    }

    setPhone(formatted);
    if (error) setError(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const digitsOnly = phone.replace(/\D/g, ""); // 998 + 9 digits = 12 digits

    // Name Validation
    if (cleanName.length < 3) {
      setError("Iltimos, to'liq ism va familiyangizni kiriting (kamida 3 ta harf)");
      return;
    }

    // Phone Validation: Uzbekistan numbers have exactly 12 digits (998 + 9 digits)
    if (digitsOnly.length !== 12) {
      setError("Telefon raqamingizni to'liq kiriting (masalan: +998 (90) 123-45-67)");
      return;
    }

    // Validate carrier prefix
    const operatorCode = digitsOnly.slice(3, 5);
    const validOperators = ["90", "91", "93", "94", "95", "97", "98", "99", "88", "77", "33", "50", "55", "71", "78"];
    if (!validOperators.includes(operatorCode)) {
      setError("Iltimos, amaldagi O'zbekiston mobil aloqa raqamini kiriting");
      return;
    }

    setError(null);
    setLoading(true);

    // Simulate smooth processing and save
    setTimeout(() => {
      saveIdentifiedUser(cleanName, phone);
      localStorage.setItem("nexora_welcome_seen", "true");
      setLoading(false);
      setSubmitted(true);

      // Close modal gracefully after success feedback
      setTimeout(() => {
        setIsOpen(false);
      }, 1400);
    }, 600);
  };

  // Allow guest continuation without blocking user
  const handleContinueAsGuest = () => {
    try {
      localStorage.setItem("nexora_welcome_seen", "dismissed_guest");
    } catch {}
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#101014] border border-[#2B2B36] rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(118,185,0,0.20)] text-white overflow-hidden transition-all duration-300">
        {/* NVIDIA Neon Ambient Light Glow */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#76B900]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-[#76B900]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleContinueAsGuest}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          title="Yopish va mehmon sifatida davom etish"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4 animate-scale-in">
            <div className="w-16 h-16 rounded-2xl bg-[#76B900]/20 border border-[#76B900] flex items-center justify-center mx-auto text-[#76B900] shadow-neon-md">
              <CheckCircle2 className="w-8 h-8 animate-bounce" />
            </div>
            <h3 className="text-xl font-black text-white">Xush kelibsiz, {name}!</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Ma'lumotlaringiz muvaffaqiyatli saqlandi. Buyurtma rasmiylashtirishda ushbu ma'lumotlar avtomatik to'ldiriladi.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header Branding */}
            <div className="space-y-3 text-center">
              <div className="inline-flex items-center justify-center">
                <NexoraLogo variant="full" size="md" />
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181822] border border-[#76B900]/40 text-[#76B900] text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Birinchi kirish</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                NEXORA’ga xush kelibsiz!
              </h2>
              
              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                Sizga qulay xarid qilish va buyurtmalaringizni boshqarish uchun ma’lumotlaringizni kiriting.
              </p>
            </div>

            {/* Identification Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#76B900]" />
                  <span>Ism va familiyangiz:</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Masalan: Abdurahmon Dadayev"
                  className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-[#333342] text-white text-sm focus:outline-none focus:border-[#76B900] transition-colors placeholder:text-zinc-600"
                />
              </div>

              {/* Phone Field */}
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
                  placeholder="+998 (90) 123-45-67"
                  className="w-full px-4 py-3 rounded-xl bg-[#16161D] border border-[#333342] text-white text-sm font-mono focus:outline-none focus:border-[#76B900] transition-colors"
                />
              </div>

              {/* Privacy Note */}
              <div className="p-3 rounded-xl bg-[#15151D] border border-[#272733] flex items-start gap-2.5 text-[11px] text-zinc-400 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#76B900] flex-shrink-0 mt-0.5" />
                <span>
                  Telefon raqamingiz faqat buyurtma holatini kuzatish va tezkor yetkazib berish bo'yicha bog'lanish uchun xavfsiz saqlanadi. Maxfiylik qat'iy kafolatlanadi.
                </span>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs animate-shake">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#76B900] hover:bg-[#86D000] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-neon-md hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saqlanmoqda...</span>
                  </>
                ) : (
                  <>
                    <span>Davom etish</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Continue as Guest */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleContinueAsGuest}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors underline-offset-4 hover:underline"
                >
                  Mehmon sifatida davom etish &rarr;
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
