import {
  getClients
} from "../../../chunk-HQXL3RNJ.js";
import {
  toNextResponseFromError
} from "../../../chunk-W22MSDJZ.js";
import "../../../chunk-ITFNSMMK.js";
import "../../../chunk-MCE7RKB4.js";

// src/crm/clients/handler/getClients.ts
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
