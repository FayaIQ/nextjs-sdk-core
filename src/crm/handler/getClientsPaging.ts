import { NextRequest, NextResponse } from "next/server";
import { getClientsPaging } from "../getClientsPaging";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const params = new URL(request.url).searchParams;
    const obj: Record<string, string> = {};
    console.log("GET clients paging request url:", request.url);
    params.forEach((v, k) => (obj[k] = v));
    console.log("GET clients paging params:", obj);
    const result = await getClientsPaging(obj);
    console.log("GET clients paging result:", result);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
