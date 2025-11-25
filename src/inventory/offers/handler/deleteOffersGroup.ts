import { NextResponse } from "next/server";
import { deleteOffersGroup } from "../deleteOffersGroup";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string; offerGroupId: string }> }) {
  try {
    const { id, offerGroupId } = await params;
    const result = await deleteOffersGroup(id, offerGroupId);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
