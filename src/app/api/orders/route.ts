import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const createOrderSchema = z.object({
  customerName: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  customerPhone: z.string().min(9, "Telefon raqamini to'g'ri kiriting"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  deliveryCity: z.string().min(2, "Shahar yoki viloyatni tanlang"),
  deliveryAddress: z.string().min(5, "Aniq yetkazib berish manzilini kiriting"),
  deliveryNote: z.string().optional(),
  paymentMethod: z.enum(["cash_on_delivery", "card_on_delivery", "click", "payme"]),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().positive(),
    })
  ).min(1, "Savatchada kamida bitta mahsulot bo'lishi shart"),
  promoCode: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone") || undefined;
    const orders = db.getOrders(phone);
    return NextResponse.json(orders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createOrderSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Ma'lumotlar noto'g'ri to'ldirildi", details: validated.error.format() },
        { status: 400 }
      );
    }

    const result = await db.createOrder(validated.data as any);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json(result.order, { status: 201 });
  } catch (error: any) {
    console.error("[ORDER CREATION ERROR]:", error);
    return NextResponse.json({ error: error.message || "Buyurtma yaratishda server xatoligi" }, { status: 500 });
  }
}
