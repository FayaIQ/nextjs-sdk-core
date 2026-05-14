import { NextRequest } from "next/server";
import { getOfferGroupsCoupons } from "../getOfferGroupsCoupons";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const result = await getOfferGroupsCoupons((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
