import {
  postPayment
} from "./chunk-P5BJWS7J.js";
import {
  toNextResponseFromError
} from "./chunk-KKPZYAYC.js";

// src/inventory/payments/handler/postPayment.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json();
    const result = await postPayment(body);
    return NextResponse.json(result);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
