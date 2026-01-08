// src/inventory/items/getProducts.ts
async function getProducts({
  filterParams
}) {
  const params = filterParams.toURLSearchParams();
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-AKKDVIEJ.js");
    const { Api } = await import("./api-RSV64Y2K.js");
    console.log("Server-side filter params:", `${Api.getProducts}?${params.toString()}`);
    return getWithAuth(
      `${Api.getProducts}?${params.toString()}`
    );
  }
  const response = await fetch(`/api/products?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/items/getProductInfo.ts
async function getProductInfo(id) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./fetcher-AKKDVIEJ.js");
    const { Api } = await import("./api-RSV64Y2K.js");
    return getWithAuth(`${Api.getProductInfo(id)}`);
  }
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }
  return response.json();
}

// src/inventory/items/putItemCollection.ts
async function putItemCollection(id, collectionId, data) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./fetcher-AKKDVIEJ.js");
    const { Api } = await import("./api-RSV64Y2K.js");
    return putWithAuth(Api.putItemCollection(id, collectionId), data);
  }
  const res = await fetch(`/api/items/${id}/collections/${collectionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json-patch+json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    let errorMessage = ` failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

// src/inventory/items/putItemCollectionActivate.ts
async function putItemCollectionActivate(id, collectionId) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./fetcher-AKKDVIEJ.js");
    const { Api } = await import("./api-RSV64Y2K.js");
    return putWithAuth(Api.putItemCollectionActivate(id, collectionId));
  }
  const res = await fetch(`/api/items/${id}/collections/${collectionId}/activate`, {
    method: "PUT"
  });
  if (!res.ok) {
    let err = `failed: ${res.status} ${res.statusText}`;
    try {
      const b = await res.json();
      err = b.error || b.message || err;
    } catch {
    }
    throw new Error(err);
  }
  return res.json();
}

// src/inventory/items/putItemCollectionDeactivate.ts
async function putItemCollectionDeactivate(id, collectionId) {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("./fetcher-AKKDVIEJ.js");
    const { Api } = await import("./api-RSV64Y2K.js");
    return putWithAuth(Api.putItemCollectionDeactivate(id, collectionId));
  }
  const res = await fetch(`/api/items/${id}/collections/${collectionId}/deactivate`, {
    method: "PUT"
  });
  if (!res.ok) {
    let err = `failed: ${res.status} ${res.statusText}`;
    try {
      const b = await res.json();
      err = b.error || b.message || err;
    } catch {
    }
    throw new Error(err);
  }
  return res.json();
}

export {
  getProducts,
  getProductInfo,
  putItemCollection,
  putItemCollectionActivate,
  putItemCollectionDeactivate
};
