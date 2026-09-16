export async function getCustomSections(): Promise<[]> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");
    return getWithAuth<[]>(Api.getCustomSections);
  }

  const res = await fetch(`/api/customSections`);
  if (!res.ok)
    throw new Error(`Failed to fetch custom sections: ${res.statusText}`);
  return res.json();
}
