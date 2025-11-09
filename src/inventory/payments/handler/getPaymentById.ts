import { NextRequest, NextResponse } from "next/server";
import { getPaymentById } from "../getPaymentById";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await getPaymentById(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
