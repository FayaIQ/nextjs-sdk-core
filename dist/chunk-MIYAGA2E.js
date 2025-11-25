// src/inventory/menus/getMenus.ts
async function getMenus({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api-XKV6O6PD.js");
    return getWithAuth(`${Api.getMenus}?${params.toString()}`, {});
  } else {
    return fetch(`/api/menus?${params.toString()}`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

export {
  getMenus
};
