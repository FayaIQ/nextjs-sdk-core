import { NextRequest, NextResponse } from "next/server";
import { getOfferById } from "../getOfferById";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await getOfferById((await params).id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
