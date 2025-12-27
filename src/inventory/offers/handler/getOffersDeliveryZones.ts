import { NextRequest, NextResponse } from "next/server";
import { toNextResponseFromError } from "../../../core/errorResponse";
import { getOffersDeliveryZones } from "../getOffersDeliveryZones";

export async function GET() {
  try {
    const result = await getOffersDeliveryZones();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
