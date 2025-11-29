export * from "./getStores";
export type { Store } from "./store-models";

// Re-export handler for Next.js API route wiring
export { GET as GETStores } from "./handler/getStores";
