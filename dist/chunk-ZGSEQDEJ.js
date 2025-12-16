import {
  logoutUser
} from "./chunk-A2RRN7SG.js";

// src/identity/handler/logout.ts
import { NextResponse } from "next/server";
async function POST() {
  try {
    await logoutUser();
    return NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Logout failed";
    console.error("Logout error:", message);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export {
  POST
};
