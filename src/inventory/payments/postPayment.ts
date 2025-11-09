export async function postPayment(payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<any>(Api.postPayments, payload);
  }

  const res = await fetch(`/api/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create payment: ${res.statusText}`);
  return res.json();
}
