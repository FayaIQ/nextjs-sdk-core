import { NextRequest, NextResponse } from "next/server";
import { postCopyParentToChildStores } from "../postCopyParentToChildStores";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    if (!payload || !Array.isArray(payload.itemIds) || payload.itemIds.length === 0) {
      return NextResponse.json({ error: "itemIds array is required" }, { status: 400 });
    }

    const result = await postCopyParentToChildStores(payload);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
