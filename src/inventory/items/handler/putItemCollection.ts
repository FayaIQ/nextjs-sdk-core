import { NextRequest, NextResponse } from "next/server";
import { putItemCollection } from "../putItemCollection";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; collectionId: string }> }
) {
  try {
    const data = await request.json();
    const { id, collectionId } = await params;
    const result = await putItemCollection(id, collectionId, data);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(err instanceof Error ? { message: err.message } : err, { status: 500 });
  }
}
