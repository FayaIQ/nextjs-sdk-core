import { NextRequest, NextResponse } from "next/server";
import { putDeactivateItem } from "../putDeactivate";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await putDeactivateItem(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
