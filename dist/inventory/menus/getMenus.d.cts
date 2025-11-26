import { Category } from '../../types.cjs';
import { ItemsFilterParameters } from '../items/filter-models.cjs';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus };
