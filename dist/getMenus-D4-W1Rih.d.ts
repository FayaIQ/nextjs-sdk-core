import { C as Category } from './types-BlK7R_r9.js';
import { I as ItemsFilterParameters } from './filter-models-DrN9K3P8.js';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus as g };
