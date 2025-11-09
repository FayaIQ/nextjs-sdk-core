import { NextRequest } from "next/server";
import { deleteItem } from "../deleteItem";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const result = await deleteItem((await params).id);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
