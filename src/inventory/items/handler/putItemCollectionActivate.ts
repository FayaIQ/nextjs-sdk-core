import { NextRequest, NextResponse } from "next/server";
import { putItemCollectionActivate } from "../putItemCollectionActivate";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string; id: string }> }
) {
  try {
    const { itemId, id } = await params;
    const result = await putItemCollectionActivate(itemId, id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
