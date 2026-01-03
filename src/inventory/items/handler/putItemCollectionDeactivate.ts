import { NextRequest, NextResponse } from "next/server";
import { putItemCollectionDeactivate } from "../putItemCollectionDeactivate";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; collectionId : string }> }
) {
  try {
    const { id, collectionId } = await params;
    const result = await putItemCollectionDeactivate(id, collectionId);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
