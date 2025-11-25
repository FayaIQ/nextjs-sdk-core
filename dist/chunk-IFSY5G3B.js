// src/gps/locations/getAddressById.ts
async function getAddressById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api-HI3ED3LJ.js");
    return getWithAuth(Api.getAddress(id));
  }
  const res = await fetch(`/api/addresses/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch address ${id}: ${res.statusText}`);
  }
  return res.json();
}

export {
  getAddressById
};
