import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-E7YOSCVC.js";
import {
  getAddressById
} from "../chunk-A33MUWUT.js";
import {
  toNextResponseFromError
} from "../chunk-PW6V7FVY.js";
import "../chunk-27NLU7D3.js";
import "../chunk-J3WCJNVW.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-AUVXNMTA.js");
    const { Api } = await import("../api-IWME5TPE.js");
    return getWithAuth(Api.getDeliveryZones);
  }
  const res = await fetch(`/api/gps/delivery-zones`);
  if (!res.ok) throw new Error(`Failed to fetch delivery zones: ${res.statusText}`);
  return res.json();
}

// src/gps/handler/getDeliveryZones.ts
async function GET(request) {
  try {
    const result = await getDeliveryZones();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (err) {
    return toNextResponseFromError(err);
  }
}
export {
  GET as GetDeliveryZonesGET,
  getAddressById,
  getCities,
  getCountries,
  getDeliveryZones,
  getDistricts,
  getLocationChildren
};
