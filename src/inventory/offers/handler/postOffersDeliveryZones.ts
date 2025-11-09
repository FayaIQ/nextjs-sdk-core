import { NextRequest } from "next/server";
import { postOffersDeliveryZones } from "../postOffersDeliveryZones";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const data = await request.json();
    const result = await postOffersDeliveryZones((await params).id, data);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
