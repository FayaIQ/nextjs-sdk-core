// src/fetcher.ts
async function apiFetch(url, options = {}) {
  const { method = "GET", headers = {}, data, query, token } = options;
  let endpoint = url;
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== void 0 && v !== null) params.append(k, String(v));
    });
    endpoint += `?${params.toString()}`;
  }
  const allHeaders = { ...headers };
  allHeaders["Authorization"] = `Bearer ${token}`;
  if (data && !(data instanceof FormData))
    allHeaders["Content-Type"] = "application/json";
  const res = await fetch(endpoint, {
    method,
    headers: allHeaders,
    body: data && !(data instanceof FormData) ? JSON.stringify(data) : data
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `Request failed with status ${res.status}`);
  }
  return res.json();
}

// src/token.ts
async function getToken() {
  const response = await fetch(
    `https://storeak-identity-service.azurewebsites.net/api/v1/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: "610262c3-b8ff-40b5-8a8e-951eadbe7a31",
        clientSecret: "UxiTJPZguIXBxVLjxGltrHvOdEqsjndG",
        username: "athathak",
        password: "123456",
        Language: 0,
        GMT: 3,
        IsFromNotification: false
      })
    }
  );
  if (!response.ok) {
    throw new Error(`getToken failed: ${response.statusText}`);
  }
  const json = await response.json();
  if (!json.access_token) throw new Error("Token missing in response");
  return json.access_token;
}

export {
  apiFetch,
  getToken
};
