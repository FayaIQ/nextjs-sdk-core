"use strict";
// npm/src/app/api/storeInfo/route.ts
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const fetcher_1 = require("../../../fetcher");
const token_1 = __importDefault(require("../../../token"));
const api_1 = require("../api");
const BASE_URL = api_1.Api.getProducts;
async function GET(req) {
  try {
    const token =
      req.cookies.get("access_token")?.value || (await (0, token_1.default)());
    const filters = req.nextUrl.searchParams.toString();
    const data = await (0, fetcher_1.apiFetch)(`${BASE_URL}?${filters}`, {
      token,
    });
    return server_1.NextResponse.json(data);
  } catch {
    return server_1.NextResponse.json(
      { error: "Failed to fetch getProducts" },
      { status: 500 }
    );
  }
}
