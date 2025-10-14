"use server";
export default async function getToken() {
    const response = await fetch(`https://storeak-identity-service.azurewebsites.net/api/v1/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            clientId: "610262c3-b8ff-40b5-8a8e-951eadbe7a31",
            clientSecret: "UxiTJPZguIXBxVLjxGltrHvOdEqsjndG",
            username: "athathak",
            password: "123456",
            Language: 0,
            GMT: 3,
            IsFromNotification: false,
        }),
    });
    if (!response.ok) {
        throw new Error(`getToken failed: ${response.statusText}`);
    }
    const json = (await response.json());
    if (!json.access_token)
        throw new Error("Token missing in response");
    return json.access_token;
}
