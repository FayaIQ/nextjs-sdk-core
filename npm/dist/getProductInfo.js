"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductInfo = getProductInfo;
const fetcher_1 = require("./fetcher");
const token_1 = __importDefault(require("./token"));
const api_1 = require("./app/api/api");
async function getProductInfo(id) {
    if (typeof window === "undefined") {
        const token = await (0, token_1.default)();
        return (0, fetcher_1.apiFetch)(`${api_1.Api.getProductInfo(id)}/`, {
            token,
        });
    }
    else {
        return fetch(`/api/productInfo/${id}`).then((res) => {
            console.log("🔹 Client fetch status:", res.status);
            if (!res.ok)
                throw new Error("Failed to fetch from src products");
            return res.json();
        });
    }
}
