import {
  getStoreInfo
} from "../chunk-OBFNZSCV.mjs";
import "../chunk-IDMFOTSS.mjs";

// src/handlers/storeInfo.ts
import { NextResponse } from "next/server";
async function GET() {
  try {
    const storeInfo = await getStoreInfo();
    return NextResponse.json(storeInfo);
  } catch (error) {
    console.error("Failed to fetch store info:", error);
    return NextResponse.json(
      { error: "Failed to fetch store info" },
      { status: 500 }
    );
  }
}
export {
  GET
};
