"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/core/errorResponse.ts
var errorResponse_exports = {};
__export(errorResponse_exports, {
  toNextResponseFromError: () => toNextResponseFromError
});
module.exports = __toCommonJS(errorResponse_exports);
var import_server = require("next/server");

// src/token.ts
var AUTH_MODE = process.env.AUTH_MODE || "auto";

// src/core/fetcher.ts
var ApiError = class _ApiError extends Error {
  constructor(status, body, message) {
    super(message || `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
    Object.setPrototypeOf(this, _ApiError.prototype);
  }
};

// src/core/errorResponse.ts
function toNextResponseFromError(err) {
  if (err instanceof ApiError) {
    const body = err.body ?? { message: err.message };
    const status = err.status && typeof err.status === "number" ? err.status : 500;
    return import_server.NextResponse.json(body, { status });
  }
  if (err instanceof Error) {
    return import_server.NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }
  try {
    return import_server.NextResponse.json(err, { status: 500 });
  } catch {
    return import_server.NextResponse.json({ message: String(err) }, { status: 500 });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  toNextResponseFromError
});
