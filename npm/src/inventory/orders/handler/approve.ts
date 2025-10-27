import { NextRequest, NextResponse } from "next/server";
import { putOrderApprove } from "../putOrderApprove";


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } =       await   params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      );
    }

    const result = await putOrderApprove(id , body?.note);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to approve order";
    console.error("Order approve error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}