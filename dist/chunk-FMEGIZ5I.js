import {
  putUserInfo
} from "./chunk-6C23BGWK.js";

// src/identity/users/handler/put-user-info.ts
import { NextResponse } from "next/server";
async function PUT(request) {
  try {
    const userInfo = await request.json();
    if (!userInfo.FullName || !userInfo.Email || !userInfo.Phone || userInfo.Gender === void 0) {
      return NextResponse.json(
        { error: "FullName, Email, Phone, and Gender are required fields" },
        { status: 400 }
      );
    }
    if (!userInfo.Address || !userInfo.Address.DistrictId) {
      return NextResponse.json(
        { error: "Address with DistrictId is required" },
        { status: 400 }
      );
    }
    const result = await putUserInfo(userInfo);
    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update user info";
    console.error("User info update error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export {
  PUT
};
