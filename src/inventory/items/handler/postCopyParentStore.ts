import { NextRequest, NextResponse } from "next/server";
import { postCopyParentStore } from "../postCopyParentStore";

export async function POST(request: NextRequest) {
  try {
    const { itemIds } = await request.json();
    if (!itemIds || !Array.isArray(itemIds)) {
      return NextResponse.json({ error: "itemIds array is required" }, { status: 400 });
    }

    const result = await postCopyParentStore(itemIds);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to copy parent items";
    console.error("postCopyParentStore error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

