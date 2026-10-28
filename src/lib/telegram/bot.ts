/**
 * NEXORA Telegram Bot Integration Service
 * Secure server-side Telegram Bot API client for instant order, marketplace, and support notifications.
 */

export interface TelegramOrderNotification {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryAddress: string;
  items: { productName: string; quantity: number; unitPrice: number }[];
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

class TelegramBotService {
  private token: string | undefined;
  private chatId: string | undefined;

  constructor() {
    this.token = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_CHAT_ID;
  }

  /**
   * Check if credentials are configured
   */
  public isConfigured(): boolean {
    return Boolean(this.token && this.chatId && this.token.length > 5);
  }

  /**
   * Send a raw formatted message to the administrator's Telegram chat
   */
  public async sendMessage(text: string, parseMode: "HTML" | "Markdown" = "HTML"): Promise<{
    success: boolean;
    mocked?: boolean;
    error?: string;
    messageId?: number;
  }> {
    if (!this.isConfigured()) {
      console.log("[TELEGRAM MOCK - Token not set]: Message would be sent:\n", text);
      return {
        success: true,
        mocked: true,
        error: "Telegram bot token or Chat ID is not configured in .env.local",
      };
    }

    try {
      const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: this.chatId,
          text,
          parse_mode: parseMode,
          disable_web_page_preview: true,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        console.error("[TELEGRAM API ERROR]:", data);
        return {
          success: false,
          error: data.description || "Telegram API error",
        };
      }

      return {
        success: true,
        messageId: data.result?.message_id,
      };
    } catch (err: any) {
      console.error("[TELEGRAM EXCEPTION]:", err);
      return {
        success: false,
        error: err.message || "Failed to communicate with Telegram API",
      };
    }
  }

  /**
   * Send new order notification according to exact specs
   */
  public async notifyNewOrder(order: TelegramOrderNotification) {
    const formattedDate = new Date(order.createdAt).toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const itemsText = order.items
      .map(
        (it) =>
          `• <b>${it.productName}</b> × ${it.quantity} (${(it.unitPrice * it.quantity).toLocaleString("uz-UZ")} so'm)`
      )
      .join("\n");

    const message = `
⚡ <b>NEXORA — YANGI BUYURTMA</b> ⚡
━━━━━━━━━━━━━━━━━━━━━
<b>Buyurtma raqami:</b> #${order.orderId}
<b>Mijoz:</b> ${order.customerName}
<b>Telefon:</b> ${order.customerPhone}
<b>Shahar:</b> ${order.deliveryCity}
<b>Manzil:</b> ${order.deliveryAddress}
<b>To'lov usuli:</b> ${order.paymentMethod}

<b>Mahsulotlar:</b>
${itemsText}

━━━━━━━━━━━━━━━━━━━━━
<b>Mahsulotlar summasi:</b> ${order.subtotalAmount.toLocaleString("uz-UZ")} so'm
<b>Yetkazib berish:</b> ${order.deliveryFee > 0 ? `${order.deliveryFee.toLocaleString("uz-UZ")} so'm` : "Bepul"}
<b>Jami:</b> <b>${order.totalAmount.toLocaleString("uz-UZ")} so'm</b>
<b>Holati:</b> Qabul qilindi
<b>Buyurtma vaqti:</b> ${formattedDate}
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
<b>Buyurtma raqami:</b> #${cancellation.orderId}
<b>Mijoz:</b> ${cancellation.customerName}
<b>Telefon:</b> ${cancellation.customerPhone}
<b>Bekor qilish sababi:</b> ${cancellation.reason}
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
    const message = `
🏷️ <b>NEXORA MARKETPLACE — YANGI E'LON</b>
━━━━━━━━━━━━━━━━━━━━━
<b>E'lon kodi:</b> ${listing.listingId}
<b>Sotuvchi:</b> ${listing.sellerName} (${listing.sellerPhone})
<b>Mahsulot:</b> ${listing.title}
<b>Brend va Model:</b> ${listing.brand} ${listing.model}
<b>Kategoriya:</b> ${listing.category}
<b>Sotish narxi:</b> ${listing.price.toLocaleString("uz-UZ")} so'm
<b>Holati:</b> ${listing.condition}
━━━━━━━━━━━━━━━━━━━━━
<i>E'lonni tasdiqlash uchun Admin paneliga o'ting.</i>
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
<b>Mijoz:</b> ${ticket.name} (${ticket.phone})
<b>Mavzu:</b> ${ticket.subject}
<b>Bo'lim:</b> ${ticket.type}
<b>Xabar matni:</b>
${ticket.message}
━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    return this.sendMessage(message, "HTML");
  }
}

export const telegramBot = new TelegramBotService();
