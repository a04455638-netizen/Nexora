# NEXORA — Premium Technology Store & Marketplace

> **NEXORA** — O'zbekistondagi eng ilg'or, yuqori darajali texnika internet-do'koni va ikkilamchi texnika marketplace platformasi. NVIDIA estetikasi va arxitekturasidan ilhomlangan holda yaratilgan.

---

## ⚡ Asosiy Imkoniyatlar va Funksiyalar

1. **Brend va Custom Logotip:**
   - Geometrik "N" neon-yashil (`#76B900`) va qora obsidian (`#101010`) uslubidagi original SVG logotip.
   - 3 xil variant: To'liq (`NexoraLogo variant="full"`), Ixcham (`variant="icon"`), va Favicon (`variant="favicon"`).
2. **Katalog (225+ noyob mahsulot):**
   - 15 ta to'liq kategoriya (Smartfonlar, Noutbuklar, Stol kompyuterlari, Videokartalar, Protsessorlar, Monitorlar, Televizorlar, Planshetlar, Smart-soatlar, Quloqchinlar, Gaming aksessuarlari, Klaviaturalar va sichqonchalar, Maishiy texnika, Routerlar va saqlash, Boshqa elektronika).
   - Aniq modellar, to'liq texnik xususiyatlar, UZS narxlari va rasmiy kafolatlar.
   - Xavfsiz `NexoraImage` rasm komponenti (buzilgan rasmlar hech qachon ko'rinmaydi).
3. **Savatcha va Buyurtma Tizimi:**
   - Server-side narx tekshiruvi (mijoz brauzerdan narxni o'zgartira olmaydi).
   - Unikal `#NX-XXXXXX` buyurtma raqami yaratilishi.
   - Ombor soni (stock) avtomatik kamayishi.
4. **Haqiqiy Telegram Bot Integratsiyasi:**
   - Buyurtma tushishi bilanoq admin Telegram botiga buyurtma raqami, mijoz ismi, telefon, manzil, mahsulotlar va jami summa boradi.
   - Buyurtma bekor qilinganda sababi bilan Telegramga xabar boradi.
   - Marketplace'ga yangi e'lon qo'shilganda adminga tasdiqlash uchun xabar boradi.
5. **Buyurtmani Bekor Qilish Tizimi:**
   - Mijoz shaxsiy kabinetidan buyurtmani bekor qila oladi.
   - Bekor qilish sababi kiritiladi, ombordagi mahsulot qoldig'i avtomatik qaytariladi va tarix saqlanadi.
6. **Marketplace ("Texnikangni sot"):**
   - Foydalanuvchilar o'z ishlatilgan texnikasini sotuvga qo'ya oladi.
   - Holatlar: Yangi, Juda yaxshi, Yaxshi, Ta'mir talab.
   - Admin tekshiruvidan (moderatsiya) so'ng umumiy katalogda faollashadi.
7. **Qo'shimcha 20 ta Funksiya:**
   - Aqlli qidiruv va takliflar (Live autocomplete)
   - Texnik xususiyatlarni taqqoslash vositasi (Side-by-side compare)
   - Sevimlilar ro'yxati (Wishlist)
   - Sharhlar va yulduzli baholash
   - Promo-kodlar tizimi (`NEXORA10`, `TECH2026`, `WELCOME`)
   - Omborga qayta tushganda bildirishnoma obunasi (Back in stock modal)
   - Viloyatlar bo'yicha yetkazib berish kalkulyatori
   - Buyurtma holatini bosqichma-bosqich kuzatish (Stepper timeline)
   - Oxirgi ko'rilgan mahsulotlar
   - O'xshash mahsulotlar tavsiyasi
   - Bestsellerlar va Kun takliflari (Flash deals countdown)
   - Qaytarish va kafolat da'vosi so'rovi
   - FAQ qidiruvli yordam markazi
   - Mijoz murojaatlari (Support tickets)
   - Admin uchun Mahsulotlar va Buyurtmalar CSV eksporti
   - Kam qolgan mahsulotlar nazorati (Low-stock alert)
   - Sotuv va buyurtmalar statistikasi
   - SEO optimizatsiya (Metadata, robots.txt, sitemap.xml)
   - Dark Mode va Light Mode mavzulari
   - Responsive adaptiv dizayn (Mobile, Tablet, Desktop)
8. **Admin Panel:**
   - `/admin` — Mahsulotlar qo'shish/tahrirlash, buyurtmalar holatini o'zgartirish, marketplace moderatsiyasi, CSV yuklab olish va Telegram test.

---

## 🤖 Telegram Botni Sozlash Bo'yicha Qo'llanma

Telegram bot integratsiyasini faollashtirish uchun 2 ta o'zgaruvchi kerak:

1. **Bot yaratish:**
   - Telegramda [@BotFather](https://t.me/BotFather) ga kiring va `/newbot` buyrug'ini yuboring.
   - Bot nomi va username'ini belgilab `TELEGRAM_BOT_TOKEN` (masalan: `7123456789:AAH...`) ni oling.

2. **Chat ID yoki Kanal ID olish:**
   - Xabarlarni qabul qilmoqchi bo'lgan profilingiz yoki guruh/kanalingiz ID raqamini aniqlash uchun [@userinfobot](https://t.me/userinfobot) ga kiring va Chat ID ni oling (masalan: `123456789`).

3. **`.env.local` fayliga kiritish:**
   Loyihaning ildiz papkasidagi `.env.local` faylini oching:
   ```env
   TELEGRAM_BOT_TOKEN=7123456789:AAH...
   TELEGRAM_CHAT_ID=123456789
   ```

4. **Integratsiyani Sinab Ko'rish:**
   - Saytda `/admin` sahifasiga o'ting va **"Telegram Test"** tugmasini bosing.
   - Telegram botingiz orqali zudlik bilan test xabari keladi.
   *Eslatma: Token kiritilmagan taqdirda sayt xatosiz ishlaydi va Telegram xabarlari server konsoliga xavfsiz log qilinadi.*

---

## 🚀 Loyihani Ishga Tushirish

### 1. Bog'liqliklarni o'rnatish
```bash
npm install
```

### 2. Loyihani ishlab chiqish rejimida ishga tushirish
```bash
npm run dev
```
Brauzerda oching: [http://localhost:3000](http://localhost:3000)

### 3. Production build qilish va tekshirish
```bash
npm run build
npm run start
```

---

## 🗄️ Ma'lumotlar Bazasi va Migratsiyalar

Supabase yoki PostgreSQL bazasida to'liq jadvallarni yaratish uchun quyidagi faylni bajaring:
- `supabase/migrations/001_initial_schema.sql` (barcha 18 ta jadval, RLS xavfsizlik qoidalari va indekslar).
