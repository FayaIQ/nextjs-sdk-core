import { NextResponse } from "next/server";
import { getStoreInfo } from "../storeInfo";

export async function GET() {
    try {
        const storeInfo = await getStoreInfo();
        return NextResponse.json(storeInfo);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch store info";
        console.error("Store info error:", message);
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}