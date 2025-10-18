import { apiFetch } from "./fetcher";
import getToken from "./token";
import { Api } from "./app/api/api";
export async function getProducts({ filterParams, }) {
    const params = filterParams.toURLSearchParams();
    params.set("havePicture", "true");
    // Map categoryId -> menuId and remove categoryId
    if (typeof window === "undefined") {
        const token = await getToken();
        return apiFetch(`${Api.getProducts}${params.toString()}`, {
            token,
        });
    }
    else {
        return fetch(`/api/getProducts?${params.toString()}`).then((res) => {
            if (!res.ok)
                throw new Error("Failed to fetch from src products");
            return res.json();
        });
    }
}
