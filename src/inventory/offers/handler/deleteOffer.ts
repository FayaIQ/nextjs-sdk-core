import { NextRequest } from "next/server";
import { deleteOffer } from "../deleteOffer";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const result = await deleteOffer((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
