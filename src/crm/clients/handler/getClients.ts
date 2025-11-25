import { NextRequest, NextResponse } from "next/server";
import { getClients } from "../getClients";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    // Forward query params from the incoming request to the backend
    const url = new URL(request.url);
    const qs = url.search ? url.search : "";
    const clients = await getClients(qs);
    return NextResponse.json(clients);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
