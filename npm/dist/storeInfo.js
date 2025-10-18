"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoreInfo = getStoreInfo;
const fetcher_1 = require("./fetcher");
const token_1 = __importDefault(require("./token"));
const BASE_URL = "https://storeak-stores-service.azurewebsites.net/api/v1/Stores";
async function getStoreInfo() {
    if (typeof window === "undefined") {
        const token = await (0, token_1.default)();
        return (0, fetcher_1.apiFetch)(`${BASE_URL}/Info`, { token });
    }
    else {
        return fetch("/api/storeInfo").then((res) => {
            if (!res.ok)
                throw new Error("Failed to fetch store info");
            return res.json();
        });
    }
}
