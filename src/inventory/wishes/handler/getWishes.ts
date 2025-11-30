import { NextRequest } from "next/server";
import { getWishes } from "../getWishes";
import { toNextResponseFromError } from "../../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params = {
      currentPage: searchParams.get("currentPage") 
        ? parseInt(searchParams.get("currentPage")!) 
        : undefined,
      pageSize: searchParams.get("pageSize") 
        ? parseInt(searchParams.get("pageSize")!) 
        : undefined,
    };

    const result = await getWishes(params);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
