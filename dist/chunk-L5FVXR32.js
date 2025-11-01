import {
  getToken
} from "./chunk-OREK46JA.js";

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
    let errorMessage = `Request failed with status ${response.status} ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (typeof errorData === "string") {
        errorMessage = errorData;
      } else if (errorData?.message) {
        errorMessage = String(errorData.message);
      } else if (errorData?.Message) {
        errorMessage = String(errorData.Message);
      } else if (errorData?.error) {
        if (typeof errorData.error === "string") {
          errorMessage = errorData.error;
        } else if (errorData.error?.message) {
          errorMessage = String(errorData.error.message);
        }
      } else if (Array.isArray(errorData) && errorData.length > 0 && errorData[0]?.message) {
        errorMessage = String(errorData[0].message);
      } else if (errorData?.code && errorData?.message) {
        errorMessage = String(errorData.message);
      }
    } catch {
    }
    throw new Error(errorMessage);
  }
  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0" || !contentType && response.status === 204) {
    return {};
  }
  const text = await response.text();
  if (!text || text.trim() === "") {
    return {};
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error(`Failed to parse response as JSON: ${text.substring(0, 100)}`);
  }
  if (parsed && typeof parsed === "object" && "code" in parsed && "message" in parsed) {
    const keys = Object.keys(parsed);
    const hasOnlyErrorFields = keys.length <= 3 && keys.includes("code") && keys.includes("message");
    if (hasOnlyErrorFields) {
      throw new Error(parsed.message || parsed.code || "Unknown error");
    }
    return {
      success: true,
      ...parsed
    };
  }
  return parsed;
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
async function postWithoutAuth(url, data, headers) {
  return apiFetch(url, {
    method: "POST",
    data,
    headers
  });
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
