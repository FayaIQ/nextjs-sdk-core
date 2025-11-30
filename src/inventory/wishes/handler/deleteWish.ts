import { NextRequest, NextResponse } from "next/server";
import { deleteWish } from "../deleteWish";
import { toNextResponseFromError } from "../../../core/errorResponse";

/**
 * DELETE handler for removing an item from wishlist
 * Route: /api/wishes/[itemId]
 */
export async function DELETE(
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

    await deleteWish(itemId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return toNextResponseFromError(error);
  }
}
