// npm/src/app/api/storeInfo/route.ts

import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "../../../fetcher";
import getToken from "../../../token";
import { Api } from "../api";
import { Product } from "../../../types";

const BASE_URL = Api.getProducts;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value || (await getToken());
  const filters = req.nextUrl.searchParams.toString();
  console.log("filter:", filters);

  const data = await apiFetch(`${BASE_URL}`, {
    token,
  });
  return NextResponse.json(data);
}
