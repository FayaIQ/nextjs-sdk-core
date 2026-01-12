import { NextRequest, NextResponse } from "next/server";
import { toNextResponseFromError } from "../../../core/errorResponse";
import { getItemFeatures } from "../getItemFeatures";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const features = await getItemFeatures({ id: id });

    return NextResponse.json(features);
  } catch (error) {
    return toNextResponseFromError(error);
  }
}
