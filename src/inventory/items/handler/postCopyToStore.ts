import { NextRequest, NextResponse } from "next/server";
import { postCopyToStore } from "../postCopyToStore";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest, { params }: { params: Promise<{ childStoreId: string }> }) {
  try {
    const { childStoreId } = await params;
    const payload = await request.json();
    if (!payload || !Array.isArray(payload.itemIds) || payload.itemIds.length === 0) {
      return NextResponse.json({ error: "itemIds array is required" }, { status: 400 });
    }

    const result = await postCopyToStore(childStoreId, payload);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
