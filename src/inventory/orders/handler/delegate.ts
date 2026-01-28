import { NextRequest, NextResponse } from "next/server";
import { postOrderDelegate } from "../postOrderDelegate";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  try {
    const resolvedParams = await params;
    const orderId = parseInt(resolvedParams.id);
    if (isNaN(orderId)) {
      return NextResponse.json({ error: "Invalid order ID" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));
    await postOrderDelegate(orderId, body);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to assign delegate";
    console.error("post order delegate error:", message);
    const status = (err as any)?.status ?? 500;
    return NextResponse.json({ error: message }, { status });
  }
}