// src/inventory/brands/getBrands.ts
async function getBrands() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api-QG2WVXL6.js");
    return getWithAuth(Api.getBrands, void 0, void 0, {
      revalidate: 3600,
      tags: ["brands"]
    });
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
