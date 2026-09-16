import { NextRequest, NextResponse } from "next/server";
import { getDelegateTypes } from "../getDelegateTypes";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const delegateTypes = await getDelegateTypes();
    return NextResponse.json(delegateTypes);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}