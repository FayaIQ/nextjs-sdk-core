// src/inventory/brands/getBrands.ts
async function getBrands() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api-YF4GAK4X.js");
    return getWithAuth(Api.getBrands);
  } else {
    const response = await fetch("/api/brands");
    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }
    return response.json();
  }
}

export {
  getBrands
};
