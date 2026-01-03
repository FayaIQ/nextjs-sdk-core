import { NextRequest, NextResponse } from "next/server";
import { putItemCollection } from "../putItemCollection";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string; id: string }> }
) {
  try {
    const data = await request.json();
    const { itemId, id } = await params;
    const result = await putItemCollection(itemId, id, data);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err instanceof Error ? { message: err.message } : err, { status: 500 });
  }
}
