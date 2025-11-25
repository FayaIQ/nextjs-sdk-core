import { NextRequest, NextResponse } from "next/server";
import { putOffersGroup } from "../putOffersGroup";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string; offerGroupId: string }> }) {
  try {
    const data = await request.json();
    const { id, offerGroupId } = await params;
    const result = await putOffersGroup(id, offerGroupId, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
