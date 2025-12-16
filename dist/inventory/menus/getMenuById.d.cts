import { Category } from '../../types.cjs';

/**
 * Fetch a single menu by ID (v1)
 */
declare function getMenuById(id: string | number): Promise<Category>;

export { getMenuById };
