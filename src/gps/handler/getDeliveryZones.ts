import { NextRequest } from "next/server";
import { getDeliveryZones } from "../getDeliveryZones";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const result = await getDeliveryZones();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
   return toNextResponseFromError(err);
  }
}
