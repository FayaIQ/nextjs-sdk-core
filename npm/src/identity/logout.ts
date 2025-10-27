export async function logoutUser(): Promise<{ success: boolean }> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");

    const cookieStore = await cookies();

    // Delete all authentication-related cookies
    cookieStore.delete("access_token");
    cookieStore.delete("employee_store_id");
    cookieStore.delete("roles");

    return { success: true };
  }

  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) throw new Error(`Logout failed: ${res.statusText}`);

  return res.json();
}
