import {
  getPayments
} from "./chunk-UHUJYGHT.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
