import { NextRequest, NextResponse } from "next/server";
import { getWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";
import { toNextResponseFromError } from "../../core/errorResponse";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });

    const queryString = params.toString();
    const url = queryString ? `${Api.getStoreUsersPaging}?${queryString}` : Api.getStoreUsersPaging;

    const data = await getWithAuth(url);
    return NextResponse.json(data);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
