"use server";

import { cookies } from "next/headers";

export async function logoutUser(): Promise<{ success: boolean }> {
  const cookieStore = await cookies();
  
  // Delete all authentication-related cookies
  cookieStore.delete("access_token");
  cookieStore.delete("employee_store_id");
  cookieStore.delete("roles");
  
  return { success: true };
}
