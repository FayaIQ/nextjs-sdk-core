import { NextRequest, NextResponse } from "next/server";
import { putDeactivateItem } from "../putDeactivate";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await putDeactivateItem(id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to deactivate item";
    console.error("putDeactivate handler error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
