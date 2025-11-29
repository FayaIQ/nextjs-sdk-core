import { Category } from '../../types.js';
import { ItemsFilterParameters } from '../items/filter-models.js';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus };
