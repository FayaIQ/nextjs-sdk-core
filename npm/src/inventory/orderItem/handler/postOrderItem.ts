import { NextRequest, NextResponse } from "next/server";
import { postOrderItem } from "../postOrderItem";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json().catch(() => ({}));
    const result = await postOrderItem(id, body);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order item";
    console.error("postOrderItem error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
