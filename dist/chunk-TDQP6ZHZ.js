import {
  Api
} from "./chunk-536WXACQ.js";
import {
  putWithAuth
} from "./chunk-DX5D3J7G.js";

// src/identity/users/putUserInfo.ts
var toIsoBirthdate = (value) => {
  const v = (value || "").trim();
  if (!v) return void 0;
  const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(v);
  if (m) {
    const [_, y, mo, d] = m;
    const date2 = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
    if (!isNaN(date2.getTime())) return date2.toISOString();
    return void 0;
  }
  const date = new Date(v);
  if (!isNaN(date.getTime())) return date.toISOString();
  return void 0;
};
async function putUserInfo(userInfo) {
  if (typeof window === "undefined") {
    return putWithAuth(Api.putUserInfo, userInfo);
  }
  const res = await fetch(`/api/users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo)
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      error.message || `Failed to update user info: ${res.statusText}`
    );
  }
  return res.json();
}

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
  toIsoBirthdate,
  putUserInfo,
  PUT
};
