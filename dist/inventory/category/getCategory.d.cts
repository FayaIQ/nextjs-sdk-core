import { Category } from './types.cjs';

/**
 * Fetches a list of categories from the server
 * Works in both server and client components
 *
 * @returns Promise with category data
 *
 * @example
 * // Server component
 * const categories = await getCatigories();
 *
 * @example
 * // Client component
 * const categories = await getCatigories();
 */
declare function getCatigories(): Promise<Category[]>;

export { getCatigories };
