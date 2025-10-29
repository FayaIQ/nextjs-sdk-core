import { NextRequest, NextResponse } from "next/server";
import { getProductInfo as fetchProductInfo } from "../getProductInfo";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await fetchProductInfo(id);
    return NextResponse.json(product);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch product info";
    console.error("Product info error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
