export * from "./getClientsPaging";
export * from "./getClients";
export * from "./postClient";
export * from "./getDelegateTypes";

// Re-export handlers for easy Next.js API route wiring
export { GET as GETClients } from "./handler/getClients";
export { GET as GETClientsPaging } from "./handler/getClientsPaging";
export { POST as POSTClient } from "./handler/postClient";
export { GET as GETDelegateTypes } from "./handler/getDelegateTypes";
