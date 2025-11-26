import {
  getPayments
} from "./chunk-2NOSWNFC.js";
import {
  toNextResponseFromError
} from "./chunk-VVG47CF2.js";

// src/inventory/payments/handler/getPayments.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const params = Object.fromEntries(new URL(request.url).searchParams.entries());
    const result = await getPayments(params);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
