import { NextResponse } from "next/server";
import { telegramBot } from "@/lib/telegram/bot";

export async function GET() {
  const isConfigured = telegramBot.isConfigured();
  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured
      ? "Telegram bot integratsiyasi sozlangan va faol!"
      : "Telegram bot token yoki Chat ID kiritilmagan. .env.local faylida TELEGRAM_BOT_TOKEN va TELEGRAM_CHAT_ID parametrlarini belgilang. Tizim avtomatik mock rejimida ishlaydi.",
  });
}

export async function POST() {
  const testMessage = `
⚡ <b>NEXORA — INTEGRATSIYA TESTI</b> ⚡
━━━━━━━━━━━━━━━━━━━━━
NEXORA do'koni Telegram Bot integratsiyasi muvaffaqiyatli sinovdan o'tkazildi!
Vaqt: ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}
Holat: Tizim to'liq ishchi holatda.
━━━━━━━━━━━━━━━━━━━━━
  `.trim();

  const result = await telegramBot.sendMessage(testMessage, "HTML");
  return NextResponse.json(result);
}
