"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = getProducts;
const fetcher_1 = require("./fetcher");
const token_1 = __importDefault(require("./token"));
const api_1 = require("./app/api/api");
async function getProducts({ filterParams, }) {
    const params = filterParams.toURLSearchParams();
    params.set("havePicture", "true");
    // Map categoryId -> menuId and remove categoryId
    if (typeof window === "undefined") {
        const token = await (0, token_1.default)();
        return (0, fetcher_1.apiFetch)(`${api_1.Api.getProducts}${params.toString()}`, {
            token,
        });
    }
    else {
        return fetch(`/api/getProducts?${params.toString()}`).then((res) => {
            if (!res.ok)
                throw new Error("Failed to fetch from src products");
            return res.json();
        });
    }
}
