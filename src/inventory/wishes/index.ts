// Export wrapper functions
export * from "./getWishes";
export * from "./postWish";
export * from "./deleteWish";

// Export public models
export * from "./types";

// Re-export handlers for Next.js API route wiring
export { GET as GetWishesGET } from "./handler/getWishes";
export { POST as PostWishPOST } from "./handler/postWish";
export { DELETE as DeleteWishDELETE } from "./handler/deleteWish";
