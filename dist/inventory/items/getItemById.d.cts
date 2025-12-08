import { Product } from './types.cjs';

/**
 * Fetches item by ID using v3 API endpoint
 * Works in both server and client components
 *
 * @param id - The item ID to fetch
 * @returns Promise with item details
 *
 * @example
 * // Server component
 * const item = await getItemById(123);
 *
 * @example
 * // Client component
 * const item = await getItemById("123");
 */
declare function getItemById(id: string | number): Promise<Product>;

export { getItemById };
