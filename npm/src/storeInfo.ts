import { apiFetch } from "./fetcher"; 
import getToken from "./token";        
import { StoreInfo } from "./types";

const BASE_URL = 'https://storeak-stores-service.azurewebsites.net/api/v1/Stores';

export async function getStoreInfo(): Promise<StoreInfo> {
  if (typeof window === "undefined") {
    const token = await getToken();
    return apiFetch<StoreInfo>(`${BASE_URL}/Info`, { token });
  } else {
    return fetch("/api/storeInfo")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch store info");
        return res.json();
      });
  }
}
