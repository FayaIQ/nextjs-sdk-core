import { C as Category } from './types-D0Xbpetb.cjs';
import { I as ItemsFilterParameters } from './filter-models-B4kRw7Xr.cjs';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus as g };
