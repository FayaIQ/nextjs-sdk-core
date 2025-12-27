import { NextRequest, NextResponse } from "next/server";
import { toNextResponseFromError } from "../../../core/errorResponse";
import { getOffersDeliveryZones } from "../getOffersDeliveryZones";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const result = await getOffersDeliveryZones(id);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
