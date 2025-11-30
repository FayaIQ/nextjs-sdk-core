import { NextRequest, NextResponse } from "next/server";
import { postWish } from "../postWish";
import { toNextResponseFromError } from "../../../core/errorResponse";

/**
 * POST handler for adding an item to wishlist
 * Route: /api/wishes/[itemId]
 */
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ itemId: string }> }
): Promise<NextResponse> {
  try {
    const { itemId } = await context.params;

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    await postWish(itemId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return toNextResponseFromError(error);
  }
}
