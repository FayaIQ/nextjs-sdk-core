export async function deleteItem(id: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return deleteWithAuth<any>(Api.deleteItem(id));
  }

  const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Failed to delete item: ${res.statusText}`);
  return res.json();
}
