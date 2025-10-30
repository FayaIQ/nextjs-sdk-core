import { NextRequest, NextResponse } from "next/server";
import { putActivateItem } from "../putActivate";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await putActivateItem(id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to activate item";
    console.error("putActivate handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
