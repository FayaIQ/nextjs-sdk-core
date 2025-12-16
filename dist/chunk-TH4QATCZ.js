import {
  getClients
} from "./chunk-KOKNZ5OA.js";
import {
  toNextResponseFromError
} from "./chunk-W22MSDJZ.js";

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
