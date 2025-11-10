import { NextRequest, NextResponse } from "next/server";
import { putOrderChangeStatus } from "../putOrderChangeStatus";
import { toNextResponseFromError } from "../../../core/errorResponse";

/**
 * PUT /api/orders/[id]/change-status
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
    
  try {
    const { id } = await params;
    const body = await request.json();
    const result = await putOrderChangeStatus(id, body);
    return NextResponse.json(result);

  } catch (error: any) {
    return toNextResponseFromError(error);
   
   
  }
}
