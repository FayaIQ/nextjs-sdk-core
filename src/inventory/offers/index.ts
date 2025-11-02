export * from "./getOffersPaging";
export * from "./getOfferById";
export * from "./deleteOffer";
export * from "./getInvoiceDiscount";
export * from "./getOffersItemsDropdown";
export * from "./getOffersCouponsDropdown";
export * from "./postOffersItemsDiscount";
export * from "./putOffersItemsDiscount";
export * from "./getOffersCustomers";

export { GET as GetOffersPagingGET } from "./handler/getOffersPaging";
export { GET as GetOfferByIdGET } from "./handler/getOfferById";
export { DELETE as DeleteOfferDELETE } from "./handler/deleteOffer";
export { GET as GetInvoiceDiscountGET } from "./handler/getInvoiceDiscount";
export { GET as GetOffersItemsDropdownGET } from "./handler/getOffersItemsDropdown";
export { GET as GetOffersCouponsDropdownGET } from "./handler/getOffersCouponsDropdown";
export { POST as PostOffersItemsDiscountPOST } from "./handler/postOffersItemsDiscount";
export { PUT as PutOffersItemsDiscountPUT } from "./handler/putOffersItemsDiscount";
export { GET as GetOffersCustomersGET } from "./handler/getOffersCustomers";