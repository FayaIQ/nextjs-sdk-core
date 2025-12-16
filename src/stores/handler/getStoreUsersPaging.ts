import { NextRequest, NextResponse } from "next/server";
import { getStoreUsersPaging } from "../getStoreUsersPaging";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    // Build a params object from searchParams
    const params: Record<string, any> = {};
    for (const [k, v] of searchParams.entries()) {
      // coerce numeric query keys for common paging params
      if (k === "CurrentPage" || k === "PageSize") {
        params[k] = parseInt(v, 10);
      } else if (k === "EmailConfirmed" || k === "PhoneNumberConfirmed") {
        params[k] = v === "true";
      } else if (k === "Roles") {
        // Roles can be repeated or comma-separated
        params[k] = searchParams.getAll(k);
      } else {
        params[k] = v;
      }
    }

    const result = await getStoreUsersPaging(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
