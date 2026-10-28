import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();

    if (!code) {
      return NextResponse.json({ valid: false, discount: 0, message: "Promo-kod kiritilmadi" }, { status: 400 });
    }

    const result = db.validatePromo(code, Number(subtotal) || 0);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ valid: false, discount: 0, message: error.message }, { status: 500 });
  }
}
