import { NextRequest } from "next/server";
import { getOffersGroups } from "../getOffersGroups";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const result = await getOffersGroups((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
