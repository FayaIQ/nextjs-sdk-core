// src/inventory/menus/getMenusDropdown.ts
async function getMenusDropdown() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(`${Api.getMenusDropdown}`, {});
  } else {
    return fetch(`/api/menus/dropdown`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

export {
  getMenusDropdown
};
