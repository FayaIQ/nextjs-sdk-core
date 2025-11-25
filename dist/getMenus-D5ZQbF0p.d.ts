import { C as Category } from './types-D0Xbpetb.js';
import { I as ItemsFilterParameters } from './filter-models-B4kRw7Xr.js';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus as g };
