import { NextResponse } from "next/server";
import { ApiError } from "./fetcher";

export function toNextResponseFromError(err: unknown) {
  // If it's our ApiError (thrown by fetcher), forward its status and body/message
  if (err instanceof ApiError) {
    const body = err.body ?? { message: err.message };
    const status = err.status && typeof err.status === "number" ? err.status : 500;
    return NextResponse.json(body, { status });
  }

  // Native Error
  if (err instanceof Error) {
    return NextResponse.json({ message: err.message || "Internal server error" }, { status: 500 });
  }

  // Fallback for unknown shapes
  try {
    return NextResponse.json(err as any, { status: 500 });
  } catch {
    return NextResponse.json({ message: String(err) }, { status: 500 });
  }
}
