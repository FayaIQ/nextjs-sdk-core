import {
  Api
} from "./chunk-GAPUV7OU.mjs";
import {
  apiFetch,
  getToken
} from "./chunk-IDMFOTSS.mjs";

// src/getProductInfo.ts
async function getProductInfo(id) {
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch(`${Api.getProductInfo(id)}/`, {
      token
    });
  } else {
    return fetch(`/api/productInfo/${id}`).then((res) => {
      console.log("\u{1F539} Client fetch status:", res.status);
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

export {
  getProductInfo
};
