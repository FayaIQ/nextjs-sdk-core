
export interface ApplicationStoreDropdownItem {
  id: string;
  name: string;
  clientType: string;
}

export async function getApplicationsStoreDropdown(): Promise<ApplicationStoreDropdownItem[]> {
  // Server-side: call backend with auth
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core");
    const { Api } = await import("../../api/api");
    return getWithAuth(Api.getApplicationsStores) as Promise<ApplicationStoreDropdownItem[]>;
  }

  // Client-side: call the local API route
  const res = await fetch(`/api/applications/store/dropdown`);
  if (!res.ok) throw new Error(`Failed to get applications store dropdown: ${res.statusText}`);
  return res.json();
}
