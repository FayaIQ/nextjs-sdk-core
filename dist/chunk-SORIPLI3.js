import {
  getToken
} from "./chunk-IOJJZEIF.js";

// src/core/fetcher.ts
async function apiFetch(url, options = {}) {
  const { method = "GET", headers = {}, data, query, token } = options;
  let endpoint = url;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    if (queryString) {
      endpoint += `?${queryString}`;
    }
  }
  const requestHeaders = { ...headers };
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }
  if (data && !(data instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }
  let body;
  if (data) {
    body = data instanceof FormData ? data : JSON.stringify(data);
  }
  const response = await fetch(endpoint, {
    method,
    headers: requestHeaders,
    body
  });
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
    }
    throw new Error(errorMessage);
  }
  return response.json();
}
async function getWithAuth(url, query, headers) {
  const token = await getToken();
  return apiFetch(url, {
    method: "GET",
    token,
    query,
    headers
  });
}
async function getWithoutAuth(url, query, headers) {
  return apiFetch(url, {
    method: "GET",
    query,
    headers
  });
}
async function postWithAuth(url, data, headers) {
  const token = await getToken();
  return apiFetch(url, {
    method: "POST",
    token,
    data,
    headers
  });
}
async function postWithoutAuth(url, data, headers = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: data ? JSON.stringify(data) : void 0
  });
  if (!response.ok) {
    throw new Error(`POST request failed: ${response.status} ${response.statusText}`);
  }
  return await response.json();
}
async function putWithAuth(url, data, headers) {
  const token = await getToken();
  return apiFetch(url, {
    method: "PUT",
    token,
    data,
    headers
  });
}
async function putWithoutAuth(url, data, headers) {
  return apiFetch(url, {
    method: "PUT",
    data,
    headers
  });
}
async function deleteWithAuth(url, headers) {
  const token = await getToken();
  return apiFetch(url, {
    method: "DELETE",
    token,
    headers
  });
}
async function deleteWithoutAuth(url, headers) {
  return apiFetch(url, {
    method: "DELETE",
    headers
  });
}
async function patchWithAuth(url, data, headers) {
  const token = await getToken();
  return apiFetch(url, {
    method: "PATCH",
    token,
    data,
    headers
  });
}
async function patchWithoutAuth(url, data, headers) {
  return apiFetch(url, {
    method: "PATCH",
    data,
    headers
  });
}

export {
  apiFetch,
  getWithAuth,
  getWithoutAuth,
  postWithAuth,
  postWithoutAuth,
  putWithAuth,
  putWithoutAuth,
  deleteWithAuth,
  deleteWithoutAuth,
  patchWithAuth,
  patchWithoutAuth
};
