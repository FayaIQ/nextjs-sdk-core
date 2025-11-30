import { C as Category } from './types-BlK7R_r9.js';
import { I as ItemsFilterParameters } from './filter-models-B4kRw7Xr.js';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus as g };
