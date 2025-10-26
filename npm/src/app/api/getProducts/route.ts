// npm/src/app/api/storeInfo/route.ts

import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "../../../fetcher";
import getToken from "../../../token";
import { Api } from "../api";
import { Product } from "../../../types";

const BASE_URL = Api.getProducts;


export async function GET(req: NextRequest) {
<<<<<<< HEAD
  const token = req.cookies.get("access_token")?.value || (await getToken());
  const filters = req.nextUrl.searchParams.toString();
  console.log("filter:", filters);

  const data = await apiFetch(`${BASE_URL}`, {
    token,
  });
  return NextResponse.json(data);
=======
  try {
    const token = req.cookies.get("access_token")?.value || (await getToken());
    const filters = req.nextUrl.searchParams.toString();

    const data: Product = await apiFetch(`${BASE_URL}${filters}`, {
      token: token,
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch getProducts" },
      { status: 500 }
    );
  }
>>>>>>> 0fef2320e5af8b91ccaf3d1daab482378f4d43c7
}
