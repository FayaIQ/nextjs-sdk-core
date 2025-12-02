import {
  getCities,
  getCountries,
  getDistricts,
  getLocationChildren
} from "../chunk-PCVEAJT7.js";
import {
  getAddressById
} from "../chunk-NLMRZXH6.js";
import {
  toNextResponseFromError
} from "../chunk-EIYCKOBU.js";
import "../chunk-DOLHUWI7.js";
import "../chunk-T5VVQRC2.js";
import "../chunk-3RG5ZIWI.js";

// src/gps/getDeliveryZones.ts
async function getDeliveryZones() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../fetcher-P6REHORR.js");
    const { Api } = await import("../api-RO5SLBPK.js");
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
