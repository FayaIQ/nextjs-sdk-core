import { NextRequest, NextResponse } from "next/server";
import { putCollectionsDeactivateByFilter } from "../putCollectionsDeactivateByFilter";
import { toNextResponseFromError } from "../../../core/errorResponse";
import type { ItemsCollectionsFilterRequest } from "../types";

export async function PUT(request: NextRequest) {
  try {
    const payload = (await request.json()) as ItemsCollectionsFilterRequest;
    const result = await putCollectionsDeactivateByFilter(payload);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
