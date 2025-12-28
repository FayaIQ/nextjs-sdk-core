import { NextRequest, NextResponse } from "next/server";
import { putOrderCancel } from "../putOrderCancel";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const result = await putOrderCancel(id, body?.note);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to cancel order";
    console.error("Order cancel error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
