import type { CustomersDropdownEnvelope } from "./types";

/**
 * Fetch customers dropdown from identity service
 * Accepts optional query params: username and FullName
 * Works both server and client side (client uses /api/customers-dropdown)
 */
export async function getCustomersDropdown(
  username?: string,
  FullName?: string
): Promise<CustomersDropdownEnvelope> {
  // Server-side: call identity service directly with token
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");

    const params = new URLSearchParams();
    const usernameTrimmed = username !== undefined ? String(username).trim() : "";
    const fullNameTrimmed = FullName !== undefined ? String(FullName).trim() : "";

    if (usernameTrimmed !== "") params.set("username", usernameTrimmed);
    if (fullNameTrimmed !== "") params.set("FullName", fullNameTrimmed);

    const url = params.toString() ? `${Api.getCustomersDropdown}?${params.toString()}` : Api.getCustomersDropdown;
    return getWithAuth<CustomersDropdownEnvelope>(url as any);
  }

  // Client-side: proxy through Next.js API route
  const params = new URLSearchParams();
  const usernameTrimmed = username !== undefined ? String(username).trim() : "";
  const fullNameTrimmed = FullName !== undefined ? String(FullName).trim() : "";

  if (usernameTrimmed !== "") params.set("username", usernameTrimmed);
  if (fullNameTrimmed !== "") params.set("FullName", fullNameTrimmed);

  const res = await fetch(`/api/customers/dropdown${params.toString() ? `?${params.toString()}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch customers dropdown: ${res.statusText}`);
  return res.json();
}
