export async function logoutUser(): Promise<{ success: boolean }> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");

    const cookieStore = await cookies();

    // Delete all cookies found in the cookie store.
    // Use getAll() to enumerate cookie names then delete each one.
    // This ensures any auth-related cookie (or others) are removed on logout.
  const allCookies = cookieStore.getAll();
  for (const cookie of allCookies) {
    cookieStore.delete(cookie.name);
  }

    return { success: true };
  }

  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  if (!res.ok) throw new Error(`Logout failed: ${res.statusText}`);

  return res.json();
}
