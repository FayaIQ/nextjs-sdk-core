import { NextRequest } from "next/server";
import { getReportsCustomerOrders } from "../getCustomerOrders";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const q: Record<string, any> = {};
    url.searchParams.forEach((v, k) => { q[k] = v; });
    const result = await getReportsCustomerOrders(q);
    return new Response(JSON.stringify(result), { status: 200, headers: { "content-type": "application/json" } });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
