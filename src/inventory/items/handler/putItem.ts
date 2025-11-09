import { NextRequest, NextResponse } from "next/server";
import { putItem } from "../putItem";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await request.json();
    const {id} = await params;
    const result = await putItem(id, data);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
