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
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
