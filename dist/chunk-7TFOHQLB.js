// src/inventory/menus/getMenuById.ts
async function getMenuById(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(Api.getMenuById(id));
  }
  const res = await fetch(`/api/menus/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch menu ${id}: ${res.statusText}`);
  return res.json();
}

export {
  getMenuById
};
