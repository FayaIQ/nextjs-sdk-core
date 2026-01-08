import { NextRequest, NextResponse } from "next/server";
import { putItemCollectionActivate } from "../putItemCollectionActivate";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; collectionId: string }> }
) {
  try {
    const { id, collectionId } = await params;
    const result = await putItemCollectionActivate(id, collectionId);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
