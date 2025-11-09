import { NextRequest, NextResponse } from "next/server";
import { postCopyParentStore } from "../postCopyParentStore";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function POST(request: NextRequest) {
  try {
    const { itemIds } = await request.json();
    if (!itemIds) {
      return NextResponse.json({ error: "itemIds array is required" }, { status: 400 });
    }

    const result = await postCopyParentStore(itemIds);
    return NextResponse.json(result);
  } catch (err) {

    return toNextResponseFromError(err);
  }
}

