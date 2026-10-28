import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = db.getProductById(params.id) || db.getProductBySlug(params.id);
    if (!product) {
      return NextResponse.json({ error: "Mahsulot topilmadi" }, { status: 404 });
    }

    const similar = db.getSimilarProducts(product.id, 6);
    const reviews = db.getProductReviews(product.id);

    return NextResponse.json({
      product,
      similar,
      reviews,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = db.updateProduct(params.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Mahsulot topilmadi" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = db.deleteProduct(params.id);
    if (!deleted) {
      return NextResponse.json({ error: "Mahsulot topilmadi" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
