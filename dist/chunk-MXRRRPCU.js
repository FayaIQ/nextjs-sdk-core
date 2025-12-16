// src/inventory/category/getCategory.ts
async function getCatigories() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(`${Api.getCatigories}`, {});
  } else {
    return fetch(`/api/categories`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

export {
  getCatigories
};
