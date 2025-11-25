import { itemSource } from './types';

export async function getItemsSource(): Promise<itemSource[]> {
  if (typeof window === "undefined") {
    const {getWithAuth} = await import("../../core");
    const { Api } = await import("../../api/api");

    return getWithAuth<itemSource[]>(`${Api.getItemsSource}`, {
    });
  } else {
    return fetch(`/api/itemSource`).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch from src products");
      return res.json();
    });
  }
}
