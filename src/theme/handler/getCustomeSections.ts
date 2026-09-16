import { NextRequest, NextResponse } from "next/server";
import { getCustomSections } from "../getCustomeSections";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const customSections = await getCustomSections();
    return NextResponse.json(customSections);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
