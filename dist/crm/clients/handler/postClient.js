import {
  postClient
} from "../../../chunk-FLPAWBZ6.js";
import {
  toNextResponseFromError
} from "../../../chunk-3ZI5QZAW.js";
import "../../../chunk-TOM4IICH.js";
import "../../../chunk-SFHDV4E2.js";

// src/crm/clients/handler/postClient.ts
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
