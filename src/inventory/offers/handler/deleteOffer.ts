import { NextRequest, NextResponse } from "next/server";
import { deleteOffer } from "../deleteOffer";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await deleteOffer((await params).id);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to delete offer";
    console.error("deleteOffer error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
