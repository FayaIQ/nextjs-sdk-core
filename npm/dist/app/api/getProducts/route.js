// npm/src/app/api/storeInfo/route.ts
import { NextResponse } from "next/server";
import { apiFetch } from "../../../fetcher";
import getToken from "../../../token";
import { Api } from "../api";
const BASE_URL = Api.getProducts;
export async function GET(req) {
  try {
    const token = req.cookies.get("access_token")?.value || (await getToken());
    const filters = req.nextUrl.searchParams.toString();
    const data = await (0, fetcher_1.apiFetch)(`${BASE_URL}`, {
      token: token,
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch getProducts" },
      { status: 500 }
    );
  }
}
