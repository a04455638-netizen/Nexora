import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const supportSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  subject: z.string().min(3),
  type: z.enum(["general", "return_request", "warranty", "complaint", "tech_support"]),
  message: z.string().min(10),
  orderId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = supportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Forma to'liq to'ldirilmadi" }, { status: 400 });
    }

    const ticket = await db.createSupportTicket(parsed.data as any);
    return NextResponse.json({ success: true, ticket });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
