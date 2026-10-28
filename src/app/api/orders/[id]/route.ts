import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const cancelSchema = z.object({
  action: z.literal("cancel"),
  reason: z.string().min(3, "Bekor qilish sababini kamida 3 ta belgi bilan tushuntiring"),
});

const statusSchema = z.object({
  action: z.literal("update_status"),
  status: z.enum(["accepted", "preparing", "shipped", "delivered", "cancelled"]),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = db.getOrderById(params.id);
    if (!order) {
      return NextResponse.json({ error: "Buyurtma topilmadi" }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    if (body.action === "cancel") {
      const parsed = cancelSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Bekor qilish sababini to'liq kiriting" }, { status: 400 });
      }

      const result = await db.cancelOrder(params.id, parsed.data.reason);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }

      return NextResponse.json({ success: true, message: "Buyurtma bekor qilindi va ombor zaxirasi qaytarildi" });
    }

    if (body.action === "update_status") {
      const parsed = statusSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json({ error: "Yaroqsiz holat" }, { status: 400 });
      }

      const updated = db.updateOrderStatus(params.id, parsed.data.status);
      if (!updated) {
        return NextResponse.json({ error: "Buyurtma topilmadi" }, { status: 404 });
      }

      return NextResponse.json({ success: true, message: "Buyurtma holati yangilandi" });
    }

    return NextResponse.json({ error: "Noto'g'ri buyruq" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
