import { StoreInfo } from './types.js';
import '../../types.js';

/**
 * Fetches store information
 * Works in both server and client components
 *
 * @returns Promise with store information
 *
 * @example
 * // Server component
 * const storeInfo = await getStoreInfo();
 *
 * @example
 * // Client component
 * const storeInfo = await getStoreInfo();
 */
declare function getStoreInfo(): Promise<StoreInfo>;

export { getStoreInfo };
