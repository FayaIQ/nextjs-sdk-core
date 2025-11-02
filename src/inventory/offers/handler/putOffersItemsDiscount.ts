import { NextRequest, NextResponse } from "next/server";
import { putOffersItemsDiscount } from "../putOffersItemsDiscount";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }>    }) {
  try {
    const data = await request.json();
    const result = await putOffersItemsDiscount((await params).id, data);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to put items discount";
    console.error("putOffersItemsDiscount error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
