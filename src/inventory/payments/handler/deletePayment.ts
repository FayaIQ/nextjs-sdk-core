import { NextRequest, NextResponse } from "next/server";
import { deletePayment } from "../deletePayment";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await deletePayment(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
