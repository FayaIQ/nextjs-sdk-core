import {
  ApiError
} from "./chunk-DX5D3J7G.js";

// src/core/errorResponse.ts
import { NextResponse } from "next/server";
function toNextResponseFromError(err) {
  if (err instanceof ApiError) {
    const body = err.body ?? { message: err.message };
    const status = err.status && typeof err.status === "number" ? err.status : 500;
    return NextResponse.json(body, { status });
  }
  if (err instanceof Error) {
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }
  try {
    return NextResponse.json(err, { status: 500 });
  } catch {
    return NextResponse.json({ message: String(err) }, { status: 500 });
  }
}

export {
  toNextResponseFromError
};
