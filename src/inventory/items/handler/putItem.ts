import { NextRequest, NextResponse } from "next/server";
import { putItem } from "../putItem";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const {id} = await params;
    const result = await putItem(id, data);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update item";
    console.error("putItem error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
