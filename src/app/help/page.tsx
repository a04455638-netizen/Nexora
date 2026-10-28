"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  Search,
} from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  cat: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    cat: "yetkazish",
    q: "Yetkazib berish muddati va narxi qancha?",
    a: "Toshkent shahri bo'ylab yetkazib berish 2 soat ichida kuryerlarimiz tomonidan bepul (1 500 000 so'mdan yuqori buyurtmalarda) amalga oshiriladi. O'zbekistonning barcha viloyatlariga esa 24 soat ichida yetkazib beriladi.",
  },
  {
    cat: "tolov",
    q: "Qanday to'lov usullari mavjud?",
    a: "Buyurtmani qabul qilib olganingizdan so'ng tekshirib naqd pulda yoki terminal (Uzcard/Humo/Visa) orqali to'lashingiz mumkin. Shuningdek, Click va Payme orqali onlayn to'lov ham mavjud.",
  },
  {
    cat: "kafolat",
    q: "Mahsulotlarga kafolat beriladimi?",
    a: "Barcha yangi texnikalarga 12 oydan 36 oygacha bo'lgan rasmiy ishlab chiqaruvchi va NEXORA servis markazi kafolati beriladi. Kafolat talonida imzo va muhr bo'ladi.",
  },
  {
    cat: "qaytarish",
    q: "Mahsulotni qaytarish yoki almashtirish tartibi qanday?",
    a: "Agar mahsulotda zavod nuqsoni aniqlansa, xariddan keyin 14 kun ichida to'liq pulingiz qaytariladi yoki yangisiga almashtirib beriladi.",
  },
  {
    cat: "marketplace",
    q: "Marketplace'da qanday qilib o'z texnikamni sotishim mumkin?",
    a: "'Texnikangizni soting' bo'limiga kirib mahsulot ma'lumotlari, narxi va rasmlarini yuklaysiz. Moderatorlarimiz e'lonni 15 daqiqada tekshirib umumiy katalogga chiqaradi.",
  },
];

export default function HelpPage() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState("");

  // Support ticket form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"general" | "return_request" | "warranty" | "complaint" | "tech_support">("general");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState("");

  const [loading, setLoading] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState(false);

  const filteredFaqs = FAQ_LIST.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          type,
          subject,
          message,
          orderId: orderId || undefined,
        }),
      });

      if (res.ok) {
        setTicketSuccess(true);
        setName("");
        setPhone("");
        setEmail("");
        setSubject("");
        setMessage("");
        setOrderId("");
        setTimeout(() => setTicketSuccess(false), 5000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#76B900]/10 border border-[#76B900]/30 text-[#76B900] text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          NEXORA Yordam Markazi
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Qanday Yordam Bera Olamiz?
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Ko'p beriladigan savollarga javob oling yoki mutaxassislarimizga murojaat yuboring.
        </p>
      </div>

      {/* 3 Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#242424] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] text-[#76B900] flex items-center justify-center mx-auto shadow-neon-sm">
            <Phone className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">Telefon Qo'ng'irog'i</h3>
          <p className="text-xs text-zinc-400">Har kuni 09:00 dan 22:00 gacha</p>
          <a href="tel:+998712000000" className="text-xs font-mono font-bold text-[#76B900] block hover:underline">
            +998 (71) 200-00-00
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-[#141414] border border-[#242424] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] text-[#229ED9] flex items-center justify-center mx-auto">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">Telegram Yordam Boti</h3>
          <p className="text-xs text-zinc-400">Tezkor savollarga 24/7 javob</p>
          <a href="https://t.me" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#229ED9] block hover:underline">
            @nexora_support_bot
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-[#141414] border border-[#242424] text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1C1C] text-[#76B900] flex items-center justify-center mx-auto">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white">Bosh Do'kon & Servis</h3>
          <p className="text-xs text-zinc-400">Toshkent, Amir Temur ko'chasi 12</p>
          <span className="text-[11px] text-zinc-500 block">Dushanba - Yakshanba</span>
        </div>
      </div>

      {/* 2-Columns: FAQ on Left, Support Ticket Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* FAQ Accordion (Feature 14) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight mb-2">
              Ko'p Beriladigan Savollar (FAQ)
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Savol bo'yicha qidirish..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-[#141414] border border-[#282828] rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder-zinc-500 outline-none focus:border-[#76B900]"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = activeAccordion === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#141414] border border-[#242424] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-white hover:text-[#76B900] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-500 transition-transform ${
                        isOpen ? "rotate-180 text-[#76B900]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-zinc-400 leading-relaxed border-t border-[#1C1C1C] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Support Ticket / Return Claim Form (Feature 15 & 12) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#242424] space-y-5">
          <div className="border-b border-[#202020] pb-4">
            <h2 className="text-base font-extrabold text-white uppercase tracking-wider">
              Mijoz Murojaati va Qaytarish So'rovi
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Savol, kafolat da'vosi yoki mahsulotni qaytarish bo'yicha so'rov yuboring.
            </p>
          </div>

          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Ismingiz *</label>
                <input
                  type="text"
                  required
                  placeholder="Ismingiz"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Telefon raqam *</label>
                <input
                  type="text"
                  required
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 block mb-1">Murojaat turi *</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                >
                  <option value="general">Umumiy savol</option>
                  <option value="return_request">Mahsulotni qaytarish (14 kun)</option>
                  <option value="warranty">Kafolat va servis xizmati</option>
                  <option value="complaint">Shikoyat va taklif</option>
                  <option value="tech_support">Texnik yordam</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-zinc-400 block mb-1">Buyurtma ID (agar mavjud bo'lsa)</label>
                <input
                  type="text"
                  placeholder="#NX-100023"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Mavzu *</label>
              <input
                type="text"
                required
                placeholder="Qisqacha mavzu..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1">Xabar matni *</label>
              <textarea
                required
                rows={4}
                placeholder="Vaziyatni batafsil yoritib bering..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[#181818] border border-[#2C2C2C] rounded-xl p-3 text-xs text-white outline-none focus:border-[#76B900]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#76B900] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#86D000] shadow-neon-sm transition-all"
            >
              {loading ? "Yuborilmoqda..." : "Murojaatni Yuborish (Telegram Alert)"}
            </button>

            {ticketSuccess && (
              <p className="text-xs text-[#76B900] text-center font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Murojaatingiz qabul qilindi va mutaxassisga yuborildi!
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
