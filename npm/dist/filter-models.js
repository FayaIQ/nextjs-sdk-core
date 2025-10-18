/**
 * Sort types available for product filtering
 * Based on the API documentation
 */
export var SortType;
(function (SortType) {
    SortType["None"] = "None";
    SortType["Newest"] = "Newest";
    SortType["LowPrice"] = "LowPrice";
    SortType["HighPrice"] = "HighPrice";
    SortType["BestSelling"] = "BestSelling";
    SortType["MostViewed"] = "MostViewed";
    SortType["Name"] = "Name"; // A-Z alphabetical sorting
})(SortType || (SortType = {}));
/**
 * Gender filter options
 */
export var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 1] = "Male";
    Gender[Gender["Female"] = 2] = "Female";
    Gender[Gender["Unisex"] = 3] = "Unisex";
})(Gender || (Gender = {}));
/**
 * Age group filter options
 */
export var AgeGroup;
(function (AgeGroup) {
    AgeGroup[AgeGroup["Baby"] = 1] = "Baby";
    AgeGroup[AgeGroup["Kids"] = 2] = "Kids";
    AgeGroup[AgeGroup["Teens"] = 3] = "Teens";
    AgeGroup[AgeGroup["Adults"] = 4] = "Adults";
    AgeGroup[AgeGroup["Seniors"] = 5] = "Seniors";
})(AgeGroup || (AgeGroup = {}));
/**
 * New arrival time periods
 */
export var NewArrivalPeriod;
(function (NewArrivalPeriod) {
    NewArrivalPeriod["Last_7_Days"] = "Last_7_Days";
    NewArrivalPeriod["Last_30_Days"] = "Last_30_Days";
    NewArrivalPeriod["Last_90_Days"] = "Last_90_Days";
})(NewArrivalPeriod || (NewArrivalPeriod = {}));
/**
 * Paging and basic sorting configuration
 */
export class PagingParameters {
    constructor({ currentPage = 1, pageSize = 20, sortField = null, } = {}) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.sortField = sortField;
    }
    /**
     * Convert to URL parameters
     */
    toURLParams() {
        const params = {
            currentPage: this.currentPage.toString(),
            pageSize: this.pageSize.toString(),
        };
        if (this.sortField) {
            params.sortField = this.sortField;
        }
        return params;
    }
}
/**
 * Main filter class that handles all product filtering and sorting parameters
 */
export class ItemsFilterParameters {
    constructor({ pagingParameters = new PagingParameters(), sortType = SortType.None, menuId = null, categoryId = null, minPrice = null, maxPrice = null, name = null, gender = null, age = null, sourceId = null, offerId = null, newArrival = null, getBrand = false, getColors = false, getColorsDefaultPictures = null, getOffer = false, getSize = false, getCollections = false, branchId = null, availability = null, minRating = null, hasDiscount = null, minDiscountPercentage = null } = {}) {
        this.pagingParameters = pagingParameters;
        this.sortType = sortType;
        this.menuId = menuId;
        this.categoryId = categoryId;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.sourceId = sourceId;
        this.offerId = offerId;
        this.newArrival = newArrival;
        this.getBrand = getBrand;
        this.getColors = getColors;
        this.getColorsDefaultPictures = getColorsDefaultPictures;
        this.getOffer = getOffer;
        this.getSize = getSize;
        this.getCollections = getCollections;
        this.branchId = branchId;
        this.availability = availability;
        this.minRating = minRating;
        this.hasDiscount = hasDiscount;
        this.minDiscountPercentage = minDiscountPercentage;
    }
    /**
     * Create a copy of the filter with updated parameters
     */
    copyWith(updates) {
        return new ItemsFilterParameters({
            pagingParameters: updates.pagingParameters || this.pagingParameters,
            sortType: updates.sortType !== undefined ? updates.sortType : this.sortType,
            menuId: updates.menuId !== undefined ? updates.menuId : this.menuId,
            categoryId: updates.categoryId !== undefined ? updates.categoryId : this.categoryId,
            minPrice: updates.minPrice !== undefined ? updates.minPrice : this.minPrice,
            maxPrice: updates.maxPrice !== undefined ? updates.maxPrice : this.maxPrice,
            name: updates.name !== undefined ? updates.name : this.name,
            gender: updates.gender !== undefined ? updates.gender : this.gender,
            age: updates.age !== undefined ? updates.age : this.age,
            sourceId: updates.sourceId !== undefined ? updates.sourceId : this.sourceId,
            offerId: updates.offerId !== undefined ? updates.offerId : this.offerId,
            newArrival: updates.newArrival !== undefined ? updates.newArrival : this.newArrival,
            getBrand: updates.getBrand !== undefined ? updates.getBrand : this.getBrand,
            getColors: updates.getColors !== undefined ? updates.getColors : this.getColors,
            getColorsDefaultPictures: updates.getColorsDefaultPictures !== undefined ? updates.getColorsDefaultPictures : this.getColorsDefaultPictures,
            getOffer: updates.getOffer !== undefined ? updates.getOffer : this.getOffer,
            getSize: updates.getSize !== undefined ? updates.getSize : this.getSize,
            getCollections: updates.getCollections !== undefined ? updates.getCollections : this.getCollections,
            branchId: updates.branchId !== undefined ? updates.branchId : this.branchId,
            availability: updates.availability !== undefined ? updates.availability : this.availability,
            minRating: updates.minRating !== undefined ? updates.minRating : this.minRating,
            hasDiscount: updates.hasDiscount !== undefined ? updates.hasDiscount : this.hasDiscount,
            minDiscountPercentage: updates.minDiscountPercentage !== undefined ? updates.minDiscountPercentage : this.minDiscountPercentage,
        });
    }
    /**
     * Convert filter parameters to URL search parameters
     */
    toURLSearchParams() {
        const params = new URLSearchParams();
        // Add paging parameters
        const pagingParams = this.pagingParameters.toURLParams();
        Object.entries(pagingParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                params.set(key, value);
            }
        });
        // Add sort type
        if (this.sortType !== SortType.None) {
            params.set('sortType', this.sortType);
        }
        // Add category filters
        if (this.menuId !== null) {
            params.set('menuId', this.menuId.toString());
        }
        if (this.categoryId !== null) {
            params.set('categoryId', this.categoryId.toString());
        }
        // Add price filters
        if (this.minPrice !== null) {
            params.set('minPrice', this.minPrice.toString());
        }
        if (this.maxPrice !== null) {
            params.set('maxPrice', this.maxPrice.toString());
        }
        // Add search
        if (this.name !== null && this.name.trim() !== '') {
            params.set('name', this.name.trim());
        }
        // Add demographic filters
        if (this.gender !== null) {
            params.set('gender', this.gender.toString());
        }
        if (this.age !== null) {
            params.set('age', this.age.toString());
        }
        // Add brand/source filter
        if (this.sourceId !== null) {
            params.set('sourceId', this.sourceId.toString());
        }
        if (this.offerId !== null) {
            params.set('offerId', this.offerId.toString());
        }
        // Add time-based filter
        if (this.newArrival !== null) {
            params.set('newArrival', this.newArrival);
        }
        // Add additional data flags
        if (this.getBrand) {
            params.set('getBrand', 'true');
        }
        if (this.getColors) {
            params.set('getColors', 'true');
        }
        if (this.getColorsDefaultPictures) {
            params.set('getColorsDefaultPictures', 'true');
        }
        if (this.getOffer) {
            params.set('getOffer', 'true');
        }
        if (this.getSize) {
            params.set('getSize', 'true');
        }
        if (this.getCollections) {
            params.set('getCollections', 'true');
        }
        // Add location filter
        if (this.branchId !== null) {
            params.set('branchId', this.branchId.toString());
        }
        // Add availability filter
        if (this.availability !== null) {
            params.set('availability', this.availability.toString());
        }
        // Add rating filter
        if (this.minRating !== null) {
            params.set('minRating', this.minRating.toString());
        }
        // Add discount filters
        if (this.hasDiscount !== null) {
            params.set('hasDiscount', this.hasDiscount.toString());
        }
        if (this.minDiscountPercentage !== null) {
            params.set('minDiscountPercentage', this.minDiscountPercentage.toString());
        }
        return params;
    }
    /**
     * Convert to a plain object map
     */
    toMap() {
        const map = {};
        // Add paging parameters
        const pagingParams = this.pagingParameters.toURLParams();
        Object.assign(map, pagingParams);
        // Add all filter parameters
        if (this.sortType !== SortType.None)
            map.sortType = this.sortType;
        if (this.menuId !== null)
            map.menuId = this.menuId;
        if (this.categoryId !== null)
            map.categoryId = this.categoryId;
        if (this.minPrice !== null)
            map.minPrice = this.minPrice;
        if (this.maxPrice !== null)
            map.maxPrice = this.maxPrice;
        if (this.name !== null && this.name.trim() !== '')
            map.name = this.name.trim();
        if (this.gender !== null)
            map.gender = this.gender;
        if (this.age !== null)
            map.age = this.age;
        if (this.sourceId !== null)
            map.sourceId = this.sourceId;
        if (this.offerId !== null)
            map.offerId = this.offerId;
        if (this.newArrival !== null)
            map.newArrival = this.newArrival;
        if (this.getBrand)
            map.getBrand = true;
        if (this.getColors)
            map.getColors = true;
        if (this.getColorsDefaultPictures)
            map.getColorsDefaultPictures = true;
        if (this.getOffer)
            map.getOffer = true;
        if (this.getSize)
            map.getSize = true;
        if (this.getCollections)
            map.getCollections = true;
        if (this.branchId !== null)
            map.branchId = this.branchId;
        if (this.availability !== null)
            map.availability = this.availability;
        if (this.minRating !== null)
            map.minRating = this.minRating;
        if (this.hasDiscount !== null)
            map.hasDiscount = this.hasDiscount;
        if (this.minDiscountPercentage !== null)
            map.minDiscountPercentage = this.minDiscountPercentage;
        return map;
    }
    /**
     * Create filter from URL search parameters
     */
    static fromURLSearchParams(params) {
        const pagingParameters = new PagingParameters({
            currentPage: params.get('currentPage') ? parseInt(params.get('currentPage')) : 1,
            pageSize: params.get('pageSize') ? parseInt(params.get('pageSize')) : 20,
            sortField: params.get('sortField') || null,
        });
        return new ItemsFilterParameters({
            pagingParameters,
            sortType: params.get('sortType') || SortType.None,
            menuId: params.get('menuId') ? parseInt(params.get('menuId')) : null,
            categoryId: params.get('categoryId') ? parseInt(params.get('categoryId')) : null,
            minPrice: params.get('minPrice') ? parseFloat(params.get('minPrice')) : null,
            maxPrice: params.get('maxPrice') ? parseFloat(params.get('maxPrice')) : null,
            name: params.get('name') || null,
            gender: params.get('gender') ? parseInt(params.get('gender')) : null,
            age: params.get('age') ? parseInt(params.get('age')) : null,
            sourceId: params.get('sourceId') ? parseInt(params.get('sourceId')) : null,
            offerId: params.get('offerId') ? parseInt(params.get('offerId')) : null,
            newArrival: params.get('newArrival') || null,
            getBrand: params.get('getBrand') === 'true',
            getColors: params.get('getColors') === 'true',
            getColorsDefaultPictures: params.get('getColorsDefaultPictures') === 'true' || null,
            getOffer: params.get('getOffer') === 'true',
            getSize: params.get('getSize') === 'true',
            getCollections: params.get('getCollections') === 'true',
            branchId: params.get('branchId') ? parseInt(params.get('branchId')) : null,
            availability: params.get('availability') ? params.get('availability') === 'true' : null,
            minRating: params.get('minRating') ? parseFloat(params.get('minRating')) : null,
            hasDiscount: params.get('hasDiscount') ? params.get('hasDiscount') === 'true' : null,
            minDiscountPercentage: params.get('minDiscountPercentage') ? parseFloat(params.get('minDiscountPercentage')) : null,
        });
    }
}
