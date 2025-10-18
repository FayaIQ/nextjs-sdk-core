"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const fetcher_1 = require("../../../../fetcher");
const token_1 = __importDefault(require("../../../../token"));
const api_1 = require("../../api");
async function GET(req, { params }) {
    try {
        const token = req.cookies.get("access_token")?.value || (await (0, token_1.default)());
        const { id } = await params;
        if (!id) {
            return server_1.NextResponse.json({ error: "Missing id" }, { status: 400 });
        }
        const BASE_URL = api_1.Api.getProductInfo(id);
        const data = await (0, fetcher_1.apiFetch)(`${BASE_URL}/`, { token });
        return server_1.NextResponse.json(data);
    }
    catch (error) {
        console.error("getProductInfo error:", error);
        return server_1.NextResponse.json({ error: "Failed to fetch getProductInfo" }, { status: 500 });
    }
}
