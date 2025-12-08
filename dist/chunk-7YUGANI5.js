import {
  Api
} from "./chunk-OQSZKE7D.js";
import {
  putWithAuth
} from "./chunk-BGXESJA4.js";

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

export {
  toIsoBirthdate,
  putUserInfo
};
