import { NextRequest, NextResponse } from "next/server";
import { putParentStoreSync } from "../putParentStoreSync";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await params;
    const maybeBody = await (async () => {
      try {
        return await request.json();
      } catch (_) {
        return undefined;
      }
    })();

    const result = await putParentStoreSync(itemId, maybeBody);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
