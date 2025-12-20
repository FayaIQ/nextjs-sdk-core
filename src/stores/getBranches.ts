import type { BranchesResponse } from "./branches-models";

export async function getBranches(): Promise<BranchesResponse> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");
    return getWithAuth<BranchesResponse>(Api.getBranches);
  }

  const res = await fetch(`/api/stores/branches`);
  if (!res.ok) {
    let err = `Failed to fetch branches: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      err = body.error || body.message || err;
    } catch (e) {
      // ignore parse errors
    }
    throw new Error(err);
  }

  return res.json();
}

export default getBranches;
