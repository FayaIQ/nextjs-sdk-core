// Export wrapper function
export * from "./getWishes";

// Export types
export type { Wish, WishesResponse } from "./types";

// Re-export handler for Next.js API route wiring
export { GET as GetWishesGET } from "./handler/getWishes";
