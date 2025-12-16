import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-EFYXOLZY.js";
import {
  getAddressById
} from "../chunk-FXYIHYXI.js";
import {
  toNextResponseFromError
} from "../chunk-3HIHSEGN.js";
import "../chunk-MSJYNDRW.js";
import "../chunk-XVXHFS43.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-MU3UGESH.js");
    const { Api } = await import("../api-C5LOEZ6C.js");
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
