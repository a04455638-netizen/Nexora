import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { MarketplaceStatus } from "@/types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const listing = db.getMarketplaceListingById(params.id);
    if (!listing) {
      return NextResponse.json({ error: "E'lon topilmadi" }, { status: 404 });
    }
    return NextResponse.json(listing);
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
    const { status, adminNotes } = body;

    if (!status) {
      return NextResponse.json({ error: "Status talab qilinadi" }, { status: 400 });
    }

    const updated = db.updateMarketplaceStatus(params.id, status as MarketplaceStatus, adminNotes);
    if (!updated) {
      return NextResponse.json({ error: "E'lon topilmadi" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "E'lon holati yangilandi" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
