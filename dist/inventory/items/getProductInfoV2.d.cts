import { Product } from './types.cjs';

/**
 * Fetches detailed information for a specific product (v2) by ID
 * Works in both server and client components
 */
declare function getProductInfoV2(id: string): Promise<Product>;

export { getProductInfoV2 };
