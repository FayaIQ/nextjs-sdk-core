import { NextRequest, NextResponse } from "next/server";
import { getClients } from "../getClients";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const clients = await getClients();
    return NextResponse.json(clients);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
