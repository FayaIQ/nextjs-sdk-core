import {
  toNextResponseFromError
} from "./chunk-K5J4KWGQ.js";
import {
  getClients
} from "./chunk-ZNUELY43.js";

// src/crm/handler/getClients.ts
import { NextResponse } from "next/server";
async function GET(request) {
  try {
    const url = new URL(request.url);
    const clients = await getClients({ filterParams: url.searchParams });
    return NextResponse.json(clients);
  } catch (err) {
    return toNextResponseFromError(err);
  }
}

export {
  GET
};
