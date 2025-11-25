import { putWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

/**
 * User address information
 */
export interface UserAddress {
  GPS?: string;
  DistrictId: number | string;
  Note?: string;
}

/**
 * Request payload for updating user information
 */
export interface PutUserInfoRequest {
  FullName: string;
  Email: string;
  Phone: number | string;
  Gender: number;
  Address: UserAddress;
  Birthdate?: string; // ISO date string
}

/**
 * Response from user info update
 */
export interface PutUserInfoResponse {
  success?: boolean;
  message?: string;
  [key: string]: any;
}

/**
 * Helper function to convert birthdate string to ISO format
 * Accepts "YYYY-MM-DD" and other valid date strings; returns undefined if invalid/empty.
 */
export const toIsoBirthdate = (value: string): string | undefined => {
  const v = (value || "").trim();
  if (!v) return undefined;

  // Prefer strict parsing of YYYY-MM-DD to avoid timezone inconsistencies
  const m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(v);
  if (m) {
    const [_, y, mo, d] = m;
    const date = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d)));
    if (!isNaN(date.getTime())) return date.toISOString();
    return undefined;
  }

  // Fallback to native Date parsing for other formats
  const date = new Date(v);
  if (!isNaN(date.getTime())) return date.toISOString();
  return undefined;
};

/**
 * Update user information (server-side only)
 * 
 * @param userInfo - The user data to update
 * @returns Promise with the updated user response
 * 
 * @example Server Component:
 * ```typescript
 * import { putUserInfo } from 'erp-core/identity/users';
 * 
 * const userData = {
 *   FullName: "John Doe",
 *   Email: "john@example.com",
 *   Phone: "1234567890",
 *   Gender: 1,
 *   Address: {
 *     GPS: "",
 *     DistrictId: 353,
 *     Note: "Apartment 4B"
 *   },
 *   Birthdate: "1990-01-15T00:00:00.000Z"
 * };
 * 
 * const result = await putUserInfo(userData);
 * ```
 * 
 * @example Client Component (using API route):
 * ```typescript
 * const response = await fetch('/api/users', {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(userData)
 * });
 * const result = await response.json();
 * ```
 */
export async function putUserInfo(
  userInfo: PutUserInfoRequest
): Promise<PutUserInfoResponse> {
  // Server-side execution using core fetcher with auth
  if (typeof window === "undefined") {
    return putWithAuth<PutUserInfoResponse>(Api.putUserInfo, userInfo);
  }

  // Client-side execution - route through Next.js API
  const res = await fetch(`/api/users`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userInfo),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      error.message || `Failed to update user info: ${res.statusText}`
    );
  }

  return res.json();
}
