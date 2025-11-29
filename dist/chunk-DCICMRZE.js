import {
  getPaymentsReport
} from "./chunk-Q6BENRT6.js";
import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";

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
