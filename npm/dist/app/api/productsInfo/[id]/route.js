import { NextResponse } from "next/server";
import { apiFetch } from "../../../../fetcher";
import getToken from "../../../../token";
import { Api } from "../../api";
export async function GET(req, { params }) {
    try {
        const token = req.cookies.get("access_token")?.value || (await getToken());
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: "Missing id" }, { status: 400 });
        }
        const BASE_URL = Api.getProductInfo(id);
        const data = await apiFetch(`${BASE_URL}/`, { token });
        return NextResponse.json(data);
    }
    catch (error) {
        console.error("getProductInfo error:", error);
        return NextResponse.json({ error: "Failed to fetch getProductInfo" }, { status: 500 });
    }
}
