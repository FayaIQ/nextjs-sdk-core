/**
 * Brands module - Menu brand management
 */

export { getBrands } from "./getBrands";
export type { Brand, GetBrandsResponse } from "./types";

// Handler exports
export { GET as GetBrandsGET } from "./handler/get-brands";
