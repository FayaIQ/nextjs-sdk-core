import { NextRequest, NextResponse } from "next/server";
import { putPayment } from "../putPayment";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await putPayment(id, body);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
