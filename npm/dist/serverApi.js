"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverApi = void 0;
const fetcher_1 = require("./fetcher");
const token_1 = __importDefault(require("./token"));
async function request(endpoint, method, options = {}) {
    const { data, query, headers: customHeaders = {} } = options;
    const token = await (0, token_1.default)();
    const fetchOptions = { method, headers: customHeaders, data, query, token };
    return (0, fetcher_1.apiFetch)(endpoint, fetchOptions);
}
// Exported methods
exports.serverApi = {
    get: (endpoint, options) => request(endpoint, "GET", options),
    post: (endpoint, data, options) => request(endpoint, "POST", { ...options, data }),
    put: (endpoint, data, options) => request(endpoint, "PUT", { ...options, data }),
    delete: (endpoint, options) => request(endpoint, "DELETE", options),
};
