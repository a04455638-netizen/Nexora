import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const reviewSchema = z.object({
  productId: z.string(),
  authorName: z.string().min(2, "Ismingizni kiriting"),
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, "Fikringizni kamida 5 ta belgi bilan yozing"),
  isVerifiedBuyer: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    if (!productId) {
      return NextResponse.json({ error: "productId talab qilinadi" }, { status: 400 });
    }
    const reviews = db.getProductReviews(productId);
    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Ma'lumotlar to'liq emas" }, { status: 400 });
    }

    const review = db.addReview(parsed.data);
    return NextResponse.json(review, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
