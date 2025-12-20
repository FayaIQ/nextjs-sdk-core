import { NextRequest, NextResponse } from "next/server";
import { getBranches } from "../getBranches";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const data = await getBranches();
    return NextResponse.json(data);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
