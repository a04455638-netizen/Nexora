import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const createListingSchema = z.object({
  sellerName: z.string().min(2, "Ismingizni kiriting"),
  sellerPhone: z.string().min(9, "Telefon raqamingizni to'g'ri kiriting"),
  sellerTelegram: z.string().optional(),
  title: z.string().min(5, "E'lon sarlavhasi kamida 5 ta belgidan iborat bo'lsin"),
  category: z.any(),
  brand: z.string().min(1, "Brendni kiriting"),
  model: z.string().min(1, "Modelni kiriting"),
  price: z.number().positive("Narx noldan katta bo'lishi shart"),
  condition: z.enum(["brand_new", "like_new", "good", "needs_repair"]),
  description: z.string().min(15, "Mahsulot haqida batafsil ma'lumot bering (kamida 15 ta belgi)"),
  defects: z.string().optional(),
  includedItems: z.string().optional(),
  hasWarranty: z.boolean().default(false),
  warrantyDetails: z.string().optional(),
  primaryImage: z.string().url("Rasm URL manzili to'g'ri bo'lishi shart"),
  galleryImages: z.array(z.string()).default([]),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as any;
    const category = searchParams.get("category") || undefined;
    const search = searchParams.get("search") || undefined;

    const listings = db.getMarketplaceListings({ status, category, search });
    return NextResponse.json(listings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createListingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Ma'lumotlar to'liq emas", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const created = await db.createMarketplaceListing(parsed.data as any);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
