import { NextRequest, NextResponse } from "next/server";
import { putActivateItem } from "../putActivate";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await putActivateItem(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
