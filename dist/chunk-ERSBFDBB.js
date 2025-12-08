import {
  postClient
} from "./chunk-KRSOAZZQ.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

// src/crm/handler/postClient.ts
import { NextResponse } from "next/server";
async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const client = await postClient(body);
    return NextResponse.json(client, { status: 201 });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  POST
};
