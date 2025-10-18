import { apiFetch } from "./fetcher";
import getToken from "./token";
import { Api } from "./app/api/api";
export async function getProductInfo(id) {
    if (typeof window === "undefined") {
        const token = await getToken();
        return apiFetch(`${Api.getProductInfo(id)}/`, {
            token,
        });
    }
    else {
        return fetch(`/api/productInfo/${id}`).then((res) => {
            console.log("🔹 Client fetch status:", res.status);
            if (!res.ok)
                throw new Error("Failed to fetch from src products");
            return res.json();
        });
    }
}
