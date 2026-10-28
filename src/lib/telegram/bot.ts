/**
 * Telegram Bot API Service for NEXORA
 * Sends instant notifications for new orders, cancellations, and marketplace ads.
 */

export interface TelegramOrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface TelegramOrderNotification {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryAddress: string;
  items: TelegramOrderItem[];
  subtotalAmount: number;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
}

export interface TelegramListingNotification {
  listingId: string;
  sellerName: string;
  sellerPhone: string;
  sellerTelegram?: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  condition: string;
  category: string;
}

export interface TelegramCancellationNotification {
  orderId: string;
  customerName: string;
  customerPhone: string;
  reason: string;
  totalAmount: number;
  cancelledAt: string;
}

export interface TelegramSupportNotification {
  ticketId: string;
  name: string;
  phone: string;
  subject: string;
  type: string;
  message: string;
}

function escapeHtml(val: any): string {
  if (val === undefined || val === null) return "";
  return String(val)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

class TelegramBotService {
  private defaultToken = "9199911314:AAGRmswky5WGvvr6U_LTcJd715RkwYX8k8I";
  private defaultChatId = "8031226954";

  public getToken(): string {
    return process.env.TELEGRAM_BOT_TOKEN || this.defaultToken;
  }

  public getChatId(): string {
    return process.env.TELEGRAM_CHAT_ID || this.defaultChatId;
  }

  public isConfigured(): boolean {
    const token = this.getToken();
    const chatId = this.getChatId();
    return Boolean(token && chatId && token.length > 10);
  }

  /**
   * Send a message to Telegram administrator chat with robust HTML escaping & plain text fallback
   */
  public async sendMessage(
    text: string,
    parseMode: "HTML" | "Markdown" | null = "HTML"
  ): Promise<{
    success: boolean;
    error?: string;
    messageId?: number;
  }> {
    const token = this.getToken();
    const chatId = this.getChatId();

    if (!token || !chatId) {
      console.warn("[TELEGRAM WARNING]: Telegram bot token or Chat ID is missing.");
      return { success: false, error: "Credentials missing" };
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      const payload: any = {
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      };
      if (parseMode) {
        payload.parse_mode = parseMode;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        // If HTML parsing failed, retry as pure plain text without HTML parse mode
        if (parseMode === "HTML") {
          console.warn("[TELEGRAM HTML RETRY]: Retrying as plain text without HTML...");
          const plainText = text.replace(/<[^>]+>/g, "");
          const retryRes = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              text: plainText,
              disable_web_page_preview: true,
            }),
          });
          const retryData = await retryRes.json();
          if (retryData.ok) {
            return { success: true, messageId: retryData.result?.message_id };
          }
        }

        console.error("[TELEGRAM API ERROR]:", data);
        return { success: false, error: data.description || "Telegram API error" };
      }

      console.log(`[TELEGRAM SUCCESS]: Message delivered! ID: ${data.result?.message_id}`);
      return { success: true, messageId: data.result?.message_id };
    } catch (err: any) {
      console.error("[TELEGRAM EXCEPTION]:", err);
      return { success: false, error: err.message };
    }
  }

  /**
   * Send new customer order notification
   */
  public async notifyNewOrder(order: TelegramOrderNotification) {
    const formattedDate = new Date(order.createdAt).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });

    const itemsText = order.items
      .map(
        (it) =>
          `• <b>${escapeHtml(it.productName)}</b> × ${it.quantity} (${(
            it.unitPrice * it.quantity
          ).toLocaleString("uz-UZ")} so'm)`
      )
      .join("\n");

    const message = `
⚡ <b>NEXORA — YANGI BUYURTMA!</b> ⚡
━━━━━━━━━━━━━━━━━━━━━
<b>Buyurtma raqami:</b> #${escapeHtml(order.orderId)}
<b>Mijoz:</b> ${escapeHtml(order.customerName)}
<b>Telefon:</b> ${escapeHtml(order.customerPhone)}
<b>Shahar:</b> ${escapeHtml(order.deliveryCity)}
<b>Manzil:</b> ${escapeHtml(order.deliveryAddress)}
<b>To'lov usuli:</b> ${escapeHtml(order.paymentMethod)}

<b>Mahsulotlar:</b>
${itemsText}

━━━━━━━━━━━━━━━━━━━━━
<b>Mahsulotlar summasi:</b> ${order.subtotalAmount.toLocaleString("uz-UZ")} so'm
<b>Yetkazib berish:</b> ${
      order.deliveryFee > 0
        ? `${order.deliveryFee.toLocaleString("uz-UZ")} so'm`
        : "Bepul"
    }
<b>Jami to'lov:</b> <b>${order.totalAmount.toLocaleString("uz-UZ")} so'm</b>
<b>Holati:</b> Qabul qilindi
<b>Vaqt:</b> ${formattedDate}
━━━━━━━━━━━━━━━━━━━━━
<i>NEXORA Premium Store Server Notification</i>
    `.trim();

    return this.sendMessage(message, "HTML");
  }

  /**
   * Send order cancellation notification
   */
  public async notifyOrderCancelled(cancellation: TelegramCancellationNotification) {
    const formattedDate = new Date(cancellation.cancelledAt).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });

    const message = `
⚠️ <b>NEXORA — BUYURTMA BEKOR QILINDI</b> ⚠️
━━━━━━━━━━━━━━━━━━━━━
<b>Buyurtma raqami:</b> #${escapeHtml(cancellation.orderId)}
<b>Mijoz:</b> ${escapeHtml(cancellation.customerName)}
<b>Telefon:</b> ${escapeHtml(cancellation.customerPhone)}
<b>Bekor qilish sababi:</b> ${escapeHtml(cancellation.reason)}
<b>Summa:</b> ${cancellation.totalAmount.toLocaleString("uz-UZ")} so'm
<b>Bekor qilingan vaqt:</b> ${formattedDate}
━━━━━━━━━━━━━━━━━━━━━
<i>Ombordagi mahsulot qoldiqlari avtomatik qaytarildi.</i>
    `.trim();

    return this.sendMessage(message, "HTML");
  }

  /**
   * Send new marketplace listing notification
   */
  public async notifyNewMarketplaceListing(listing: TelegramListingNotification) {
    const formattedDate = new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
    });

    const conditionMap: Record<string, string> = {
      brand_new: "Yangi (Qutida ochilmagan)",
      like_new: "Juda yaxshi (Ideal holatda)",
      good: "Yaxshi (Ishlatilgan)",
      needs_repair: "Ta'mir talab",
    };

    const conditionLabel = conditionMap[listing.condition] || listing.condition;

    const message = `
📢 <b>NEXORA MARKETPLACE — YANGI E'LON!</b>
━━━━━━━━━━━━━━━━━━━━━
<b>E'lon ID:</b> #${escapeHtml(listing.listingId)}
<b>Sotuvchi:</b> ${escapeHtml(listing.sellerName)}
<b>Telefon:</b> ${escapeHtml(listing.sellerPhone)}
<b>Telegram:</b> ${
      listing.sellerTelegram
        ? `@${escapeHtml(listing.sellerTelegram.replace("@", ""))}`
        : "Ko'rsatilmagan"
    }
<b>Mahsulot:</b> ${escapeHtml(listing.title)}
<b>Brend va Model:</b> ${escapeHtml(listing.brand)} ${escapeHtml(listing.model)}
<b>Kategoriya:</b> ${escapeHtml(listing.category)}
<b>Sotish narxi:</b> ${listing.price.toLocaleString("uz-UZ")} so'm
<b>Holati:</b> ${escapeHtml(conditionLabel)}
<b>Vaqt:</b> ${formattedDate}
━━━━━━━━━━━━━━━━━━━━━
<i>E'lonni tasdiqlash yoki rad etish uchun Admin paneliga o'ting.</i>
    `.trim();

    return this.sendMessage(message, "HTML");
  }

  /**
   * Send customer support ticket notification
   */
  public async notifySupportTicket(ticket: TelegramSupportNotification) {
    const message = `
📩 <b>NEXORA — YANGI MIJOZ MUROJAATI</b>
━━━━━━━━━━━━━━━━━━━━━
<b>Mijoz:</b> ${escapeHtml(ticket.name)} (${escapeHtml(ticket.phone)})
<b>Mavzu:</b> ${escapeHtml(ticket.subject)}
<b>Bo'lim:</b> ${escapeHtml(ticket.type)}
<b>Xabar matni:</b>
${escapeHtml(ticket.message)}
━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    return this.sendMessage(message, "HTML");
  }
}

export const telegramBot = new TelegramBotService();
export default telegramBot;
