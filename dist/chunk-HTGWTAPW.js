import {
  postClient
} from "./chunk-6LJ6WKBI.js";
import {
  toNextResponseFromError
} from "./chunk-SQFDIFW2.js";

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
