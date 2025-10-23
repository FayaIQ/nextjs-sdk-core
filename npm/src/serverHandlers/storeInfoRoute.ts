import { NextRequest, NextResponse } from "next/server";
import { apiFetch } from "../fetcher";
import getToken from "../token";

const BASE_URL = "https://storeak-stores-service.azurewebsites.net/api/v1/Stores";

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get("access_token")?.value || (await getToken());

    const data = await apiFetch(`${BASE_URL}/Info`, { token });
    return NextResponse.json(data);
  } catch {
    console.error("storeInfoRoute Error:");
    return NextResponse.json(
      { error: "Failed to fetch store info" },
      { status: 500 }
    );
  }
}
