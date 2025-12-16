declare function postOffersAddItemsByFilter(offerId: string | number, forceUpdate: boolean, payload: {
    menuId: number;
    brandId: number;
    itemAge: number;
    itemGender: number;
    minPriceRange: number;
    maxPriceRange: number;
    forceUpdate?: boolean;
}): Promise<any>;

export { postOffersAddItemsByFilter };
