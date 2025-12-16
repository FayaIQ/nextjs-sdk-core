// src/inventory/itemSource/getItemsSource.ts
async function getItemsSource() {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/index.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(`${Api.getItemsSource}`, {});
  } else {
    return fetch(`/api/itemSource`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}

export {
  getItemsSource
};
