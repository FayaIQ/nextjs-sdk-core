import { NextRequest, NextResponse } from "next/server";
import { getOrderItem } from "../getOrderItem";

export async function GET(request: NextRequest, { params }: { params: {  id: string , itemId: string } }) {
  try {
    const { id, itemId } = params;
    const result = await getOrderItem(id, itemId);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to get order item";
    console.error("getOrderItem error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
