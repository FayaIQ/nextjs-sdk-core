import {
  getPaymentsReport
} from "./chunk-W5RBZDVT.js";
import {
  toNextResponseFromError
} from "./chunk-MKZOJXDY.js";

// src/inventory/payments/handler/getPaymentsReport.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getPaymentsReport(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
