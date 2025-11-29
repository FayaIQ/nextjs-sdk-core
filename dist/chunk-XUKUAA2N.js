// src/identity/getCustomersDropdown.ts
async function getCustomersDropdown(username, FullName) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    const params2 = new URLSearchParams();
    const usernameTrimmed2 = username !== void 0 ? String(username).trim() : "";
    const fullNameTrimmed2 = FullName !== void 0 ? String(FullName).trim() : "";
    if (usernameTrimmed2 !== "") params2.set("username", usernameTrimmed2);
    if (fullNameTrimmed2 !== "") params2.set("FullName", fullNameTrimmed2);
    const url = params2.toString() ? `${Api.getCustomersDropdown}?${params2.toString()}` : Api.getCustomersDropdown;
    return getWithAuth(url);
  }
  const params = new URLSearchParams();
  const usernameTrimmed = username !== void 0 ? String(username).trim() : "";
  const fullNameTrimmed = FullName !== void 0 ? String(FullName).trim() : "";
  if (usernameTrimmed !== "") params.set("username", usernameTrimmed);
  if (fullNameTrimmed !== "") params.set("FullName", fullNameTrimmed);
  const res = await fetch(`/api/customers/dropdown${params.toString() ? `?${params.toString()}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch customers dropdown: ${res.statusText}`);
  return res.json();
}

export {
  getCustomersDropdown
};
