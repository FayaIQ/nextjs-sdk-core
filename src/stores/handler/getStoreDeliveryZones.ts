import { NextRequest } from "next/server";
import { getStoreDeliveryZones } from "../getStoreDeliveryZones";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest, { params }: { params: Promise<{ storeId: string }> }) {
  try {
    const result = await getStoreDeliveryZones((await params).storeId);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
