import { Product } from "./types";
import { ItemsFilterParameters } from "./filter-models";
export declare function getProducts({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Product>;
