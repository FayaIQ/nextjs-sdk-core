"use strict";
// npm/src/app/api/storeInfo/route.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const fetcher_1 = require("../../../fetcher");
const token_1 = __importDefault(require("../../../token"));
const BASE_URL = "https://storeak-stores-service.azurewebsites.net/api/v1/Stores";
async function GET(req) {
    try {
        const token = req.cookies.get("access_token")?.value || (await (0, token_1.default)());
        const data = await (0, fetcher_1.apiFetch)(`${BASE_URL}/Info`, { token });
        return server_1.NextResponse.json(data);
    }
    catch {
        return server_1.NextResponse.json({ error: "Failed to fetch store info" }, { status: 500 });
    }
}
