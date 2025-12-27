import { NextRequest, NextResponse } from "next/server";
import { toNextResponseFromError } from "../../../core/errorResponse";
import { getDeliveryZones } from "../../../gps";

export async function GET() {
  try {
    const result = await getDeliveryZones();
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
