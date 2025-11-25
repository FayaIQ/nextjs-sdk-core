export * from "./clients/getClientsPaging";
export * from "./clients/getClients";
export * from "./clients/postClient";

// Re-export handlers for easy Next.js API route wiring
export { GET as GETClients } from "./clients/handler/getClients";
export { GET as GETClientsPaging } from "./clients/handler/getClientsPaging";
export { POST as POSTClient } from "./clients/handler/postClient";
