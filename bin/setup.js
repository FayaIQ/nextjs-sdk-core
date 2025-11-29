#!/usr/bin/env node
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const command = args[0];

// API routes configuration
const routes = [
  {
    name: "login",
    path: ["src", "app", "api", "auth", "login"],
    handler: "erp-core/identity",
    methods: ["POST"],
    exportName: "LoginPOST",
    description: "User login endpoint",
  },
  {
    name: "users",
    path: ["src", "app", "api", "users"],
    handler: "erp-core/identity/users",
    methods: ["PUT"],
    exportName: "PutUserInfoPUT",
    description: "Update user information",
  },
  {
    name: "offerByIdGet",
    path: ["src", "app", "api", "offers", "[id]"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetOfferByIdGET",
    description: "Get offer by id",
  },
  {
    name: "addressById",
    path: ["src", "app", "api", "addresses", "[id]"],
    handler: "erp-core/gps/locations",
    methods: ["GET"],
    exportName: "getAddressByIdHandler",
    description: "Get address by id (GPS service)",
  },
  {
    name: "offerByIdDelete",
    path: ["src", "app", "api", "offers", "[id]"],
    handler: "erp-core/inventory/offers",
    methods: ["DELETE"],
    exportName: "DeleteOfferDELETE",
    description: "Delete offer by id",
  },

  {
    name: "orders",
    path: ["src", "app", "api", "orders"],
    handler: "erp-core/inventory/orders",
    methods: ["GET", "POST"],
    exportName: ["GETOrders", "POSTOrder"],
    description: "Orders listing and creation endpoint",
  },
    {
      name: "createOrder",
      path: ["src", "app", "api", "orders"],
      handler: "erp-core/inventory/orders",
      methods: ["POST"],
      exportName: "POSTOrder",
      description: "Create an order (POST /api/orders)",
    },
  {
    name: "orderFullInfo",
    path: ["src", "app", "api", "orders", "full-info"],
    handler: "erp-core/inventory/orders",
    methods: ["POST"],
    exportName: "POSTOrderFullInfo",
    description: "Get full order information",
  },
  {
    name: "orderApprove",
    path: ["src", "app", "api", "orders", "[id]", "approve"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderApprove",
    description: "Approve a single order",
  },
  {
    name: "orderDisapprove",
    path: ["src", "app", "api", "orders", "[id]", "disapprove"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderDisapprove",
    description: "Disapprove a single order",
  },
  {
    name: "orderApproveList",
    path: ["src", "app", "api", "orders", "approve-list"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderApproveList",
    description: "Approve multiple orders at once",
  },
  {
    name: "orderDisapproveList",
    path: ["src", "app", "api", "orders", "disapprove-list"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderDisapproveList",
    description: "Disapprove multiple orders at once",
  },
  {
    name: "order",
    path: ["src", "app", "api", "orders", "[id]"],
    handler: "erp-core/inventory/orders",
    methods: ["GET"],
    exportName: "GETOrder",
    description: "Get single order details",
  },
  {
    name: "orderChangeStatus",
    path: ["src", "app", "api", "orders", "[id]", "change-status"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderChangeStatus",
    description: "Change order delivery status",
  },
  {
    name: "orderDiscount",
    path: ["src", "app", "api", "orders", "[id]", "discount"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderDiscount",
    description: "Apply discount to order",
  },
  {
    name: "orderReferenceId",
    path: ["src", "app", "api", "orders", "[id]", "referenceId"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderReferenceId",
    description: "Update order reference ID",
  },
  {
    name: "orderPayment",
    path: ["src", "app", "api", "orders", "[id]", "payment"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderPayment",
    description: "Update order payment",
  },
  {
    name: "orderPaymentStatus",
    path: ["src", "app", "api", "orders", "[id]", "payment", "status"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderPaymentStatus",
    description: "Update order payment status",
  },
  {
    name: "orderReferenceDeliveryId",
    path: ["src", "app", "api", "orders", "[id]", "referenceDeliveryId"],
    handler: "erp-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderReferenceDeliveryId",
    description: "Update order reference delivery ID",
  },
  {
    name: "menus",
    path: ["src", "app", "api", "menus"],
    handler: "erp-core/inventory/menus",
    methods: ["GET"],
    exportName: "GetMenusGET",
    description: "Menus listing endpoint",
  },
  {
    name: "menuById",
    path: ["src", "app", "api", "menus", "[id]"],
    handler: "erp-core/inventory/menus",
    methods: ["GET"],
    exportName: "GetMenuByIdGET",
    description: "Get menu by ID",
  },
  {
    name: "products",
    path: ["src", "app", "api", "products"],
    handler: "erp-core/inventory/items",
    methods: ["GET"],
    exportName: "GetProductsGET",
    description: "Products listing endpoint",
  },
  {
    name: "productInfo",
    path: ["src", "app", "api", "products", "[id]"],
    handler: "erp-core/inventory/items",
    methods: ["GET"],
    exportName: "ProductInfoGET",
    description: "Product details endpoint",
  },
  {
    name: "itemActivate",
    path: ["src", "app", "api", "items", "[id]", "activate"],
    handler: "erp-core/inventory/items",
    methods: ["PUT"],
    exportName: "PutItemActivatePUT",
    description: "Activate an item",
  },
  {
    name: "itemDeactivate",
    path: ["src", "app", "api", "items", "[id]", "deactivate"],
    handler: "erp-core/inventory/items",
    methods: ["PUT"],
    exportName: "PutItemDeactivatePUT",
    description: "Deactivate an item",
  },
  {
    name: "itemUpdate",
    path: ["src", "app", "api", "items", "[id]"],
    handler: "erp-core/inventory/items",
    methods: ["PUT"],
    exportName: "PutItemPUT",
    description: "Update an item",
  },
  {
    name: "itemDelete",
    path: ["src", "app", "api", "items", "[id]"],
    handler: "erp-core/inventory/items",
    methods: ["DELETE"],
    exportName: "DeleteItemDELETE",
    description: "Delete an item",
  },
  {
    name: "itemById",
    path: ["src", "app", "api", "items", "[id]", "info"],
    handler: "erp-core/inventory/items",
    methods: ["GET"],
    exportName: "GetItemByIdGET",
    description: "Get item by ID (v3 endpoint)",
  },
  {
    name: "categories",
    path: ["src", "app", "api", "categories"],
    handler: "erp-core/inventory/category",
    methods: ["GET"],
    exportName: "CategoriesGET",
    description: "Categories listing endpoint",
  },
  {
    name: "coupons",
    path: ["src", "app", "api", "offers", "coupons"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetCouponsGET",
    description: "Coupons/offers listing endpoint",
  },
  {
    name: "locations",
    path: ["src", "app", "api", "locations", "countries"],
    handler: "erp-core/gps/locations",
    methods: ["GET"],
    exportName: "getCountriesHandler",
    description: "Locations listing endpoint",
  },
  {
    name: "location",
    path: ["src", "app", "api", "locations", "[parentId]", "children"],
    handler: "erp-core/gps/locations",
    methods: ["GET"],
    exportName: "getLocationChildrenHandler",
    description: "Location details endpoint",
  },
  {
    name: "gpsDeliveryZones",
    path: ["src", "app", "api", "gps", "delivery-zones"],
    handler: "erp-core/gps",
    methods: ["GET"],
    exportName: "GetDeliveryZonesGET",
    description: "Delivery zones (from GPS service)",
  },
  {
    name: "stores",
    path: ["src", "app", "api", "stores"],
    handler: "erp-core/stores",
    methods: ["GET"],
    exportName: "GETStores",
    description: "Stores listing endpoint",
  },
  {
    name: "storeDeliveryZones",
    path: ["src", "app", "api", "stores", "[storeId]", "delivery-zones"],
    handler: "erp-core/stores",
    methods: ["GET"],
    exportName: "GetStoreDeliveryZonesGET",
    description: "Store-specific delivery zones endpoint",
  },
  {
    name: "applicationsStoreDropDown",
    path: ["src", "app", "api", "applications", "store", "dropdown"],
    handler: "erp-core/identity/application",
    methods: ["GET"],
    exportName: "GETApplicationsStoreDropDown",
    description: "Applications store drop-down (identity service)",
  },
  {
    name: "customersDropdown",
    path: ["src", "app", "api", "customers", "dropdown"],
    handler: "erp-core/identity",
    methods: ["GET"],
    exportName: "CustomersDropdownGET",
    description: "Customers dropdown (username, FullName) endpoint",
  },
  // CRM - clients endpoints
  {
    name: "clientsPaging",
    path: ["src", "app", "api", "crm" ,"clients", "paging"],
    handler: "erp-core/crm",
    methods: ["GET"],
    exportName: "GETClientsPaging",
    description: "CRM - Clients paging endpoint",
  },
  {
    name: "clients",
    path: ["src", "app", "api", "crm", "clients"],
    handler: "erp-core/crm",
    methods: ["GET"],
    exportName: "GETClients",
    description: "CRM - Clients listing endpoint",
  },
  {
    name: "clientsPost",
    path: ["src", "app", "api", "crm", "clients"],
    handler: "erp-core/crm",
    methods: ["POST"],
    exportName: "POSTClient",
    description: "CRM - Create client endpoint",
  },
  {
    name: "storeInfo",
    path: ["src", "app", "api", "storeInfo"],
    handler: "erp-core/identity/application",
    methods: ["GET"],
    exportName: "GETStoreInfo",
    description: "Store details endpoint",
  },
  {
    name: "itemSources",
    path: ["src", "app", "api", "itemSource"],
    handler: "erp-core/inventory/itemSource",
    methods: ["GET"],
    exportName: "ItemSourcesGET",
    description: "Item sources listing endpoint",
  },
  {
    name: "menusDropdown",
    path: ["src", "app", "api", "menus", "dropdown"],
    handler: "erp-core/inventory/menus",
    methods: ["GET"],
    exportName: "GetMenusDropdownGET",
    description: "Menus dropdown listing endpoint",
  },
  {
    name: "itemsParent",
    path: ["src", "app", "api", "items", "parent"],
    handler: "erp-core/inventory/items",
    methods: ["GET"],
    exportName: "GetParentProductsGET",
    description: "Parent products listing endpoint",
  },
  {
    name: "itemsPaging",
    path: ["src", "app", "api", "items", "paging"],
    handler: "erp-core/inventory/items",
    methods: ["GET"],
    exportName: "GetItemsPagingGET",
    description: "Items paging (v2) listing endpoint with GetMultipleMenu",
  },
  {
    name: "copyParentStore",
    path: ["src", "app", "api", "items", "copy-parent-store"],
    handler: "erp-core/inventory/items",
    methods: ["POST"],
    exportName: "CopyParentStorePOST",
    description: "Copy parent store items endpoint",
  },
  {
    name: "offersPaging",
    path: ["src", "app", "api", "offers", "paging"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetOffersPagingGET",
    description: "Offers paging endpoint",
  },
  {
    name: "offersInvoiceDiscount",
    path: ["src", "app", "api", "offers", "invoice-discount", "[coupon]"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetInvoiceDiscountGET",
    description: "Get invoice discount by coupon",
  },
  {
    name: "offersItemsDropdown",
    path: ["src", "app", "api", "offers", "items", "dropdown"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetOffersItemsDropdownGET",
    description: "Offers items dropdown",
  },
  {
    name: "offersCouponsDropdown",
    path: ["src", "app", "api", "offers", "coupons", "dropdown"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetOffersCouponsDropdownGET",
    description: "Offers coupons dropdown",
  },
  {
    name: "offersItemsDiscount",
    path: ["src", "app", "api", "offers", "items-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["POST"],
    exportName: "PostOffersItemsDiscountPOST",
    description: "Create items discount",
  },
  {
    name: "offersCustomerDiscount",
    path: ["src", "app", "api", "offers", "customer-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["POST"],
    exportName: "PostOffersCustomerDiscountPOST",
    description: "Create customer discount",
  },
  {
    name: "offersInvoiceDiscountPost",
    path: ["src", "app", "api", "offers", "invoice-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["POST"],
    exportName: "PostOffersInvoiceDiscountPOST",
    description: "Create invoice discount",
  },
  {
    name: "offersShippingDiscount",
    path: ["src", "app", "api", "offers", "shipping-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["POST"],
    exportName: "PostOffersShippingDiscountPOST",
    description: "Create shipping discount",
  },
  {
    name: "offersItemsDiscountPut",
    path: ["src", "app", "api", "offers", "[id]", "items-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["PUT"],
    exportName: "PutOffersItemsDiscountPUT",
    description: "Update items discount",
  },
  {
    name: "offersCustomerDiscountPut",
    path: ["src", "app", "api", "offers", "[id]", "customer-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["PUT"],
    exportName: "PutOffersCustomerDiscountPUT",
    description: "Update customer discount",
  },
  {
    name: "offersExtraItemDiscountPut",
    path: ["src", "app", "api", "offers", "[id]", "extra-item-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["PUT"],
    exportName: "PutOffersExtraItemDiscountPUT",
    description: "Update extra item discount",
  },
  {
    name: "offersInvoiceDiscountPut",
    path: ["src", "app", "api", "offers", "[id]", "invoice-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["PUT"],
    exportName: "PutOffersInvoiceDiscountPUT",
    description: "Update invoice discount",
  },
  {
    name: "offersItemsDiscountCustomersPut",
    path: [
      "src",
      "app",
      "api",
      "offers",
      "[id]",
      "items-discount",
      "customers",
    ],
    handler: "erp-core/inventory/offers",
    methods: ["PUT"],
    exportName: "PutOffersItemsDiscountCustomersPUT",
    description: "Update items discount customers",
  },
  {
    name: "offersShippingDiscountPut",
    path: ["src", "app", "api", "offers", "[id]", "shipping-discount"],
    handler: "erp-core/inventory/offers",
    methods: ["PUT"],
    exportName: "PutOffersShippingDiscountPUT",
    description: "Update shipping discount",
  },
  {
    name: "offersAddItemsByFilter",
    path: [
      "src",
      "app",
      "api",
      "offers",
      "[id]",
      "add-items-by-filter",
      "[forceUpdate]",
    ],
    handler: "erp-core/inventory/offers",
    methods: ["POST"],
    exportName: "PostOffersAddItemsByFilterPOST",
    description: "Add items to offer by filter with force update flag",
  },
  {
    name: "offersDeliveryZones",
    path: ["src", "app", "api", "offers", "[id]", "delivery-zones"],
    handler: "erp-core/inventory/offers",
    methods: ["POST"],
    exportName: "PostOffersDeliveryZonesPOST",
    description: "Add delivery zones to an offer (StoreAdmin)",
  },
  {
    name: "offersGroups",
    path: ["src", "app", "api", "offers", "[id]", "offer-groups"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetOffersGroupsGET",
    description: "Get offer groups for an offer",
  },
  {
    name: "offersGroupPut",
    path: [
      "src",
      "app",
      "api",
      "offers",
      "[id]",
      "offer-groups",
      "[offerGroupId]",
    ],
    handler: "erp-core/inventory/offers",
    methods: ["PUT"],
    exportName: "PutOffersGroupPUT",
    description: "Update an offer group (StoreAdmin)",
  },
  {
    name: "offersGroupDelete",
    path: [
      "src",
      "app",
      "api",
      "offers",
      "[id]",
      "offer-groups",
      "[offerGroupId]",
    ],
    handler: "erp-core/inventory/offers",
    methods: ["DELETE"],
    exportName: "DeleteOffersGroupDELETE",
    description: "Delete an offer group (StoreAdmin)",
  },
  {
    name: "reportsCustomerOrders",
    path: ["src", "app", "api", "reports", "customer-orders"],
    handler: "erp-core/inventory/reports",
    methods: ["GET"],
    exportName: "GetReportsCustomerOrdersGET",
    description:
      "Customer orders report (StoreAdmin, InventoryAdmin, DelagateAdmin)",
  },
  {
    name: "reportsOrderSales",
    path: ["src", "app", "api", "reports", "order-sales"],
    handler: "erp-core/inventory/reports",
    methods: ["GET"],
    exportName: "GetReportsOrderSalesGET",
    description: "Order sales report (StoreAdmin, InventoryAdmin)",
  },
  {
    name: "offersCustomers",
    path: ["src", "app", "api", "offers", "customers"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetOffersCustomersGET",
    description: "Offers customers endpoint",
  },
  {
    name: "payments",
    path: ["src", "app", "api", "payments"],
    handler: "erp-core/inventory/payments",
    methods: ["GET"],
    exportName: "GetPaymentsGET",
    description: "Payments listing endpoint",
  },
  {
    name: "paymentsPost",
    path: ["src", "app", "api", "payments"],
    handler: "erp-core/inventory/payments",
    methods: ["POST"],
    exportName: "PostPaymentPOST",
    description: "Create payment",
  },
  {
    name: "paymentsReport",
    path: ["src", "app", "api", "payments", "report"],
    handler: "erp-core/inventory/payments",
    methods: ["GET"],
    exportName: "GetPaymentsReportGET",
    description: "Payments report",
  },
  {
    name: "paymentByIdGet",
    path: ["src", "app", "api", "payments", "[id]"],
    handler: "erp-core/inventory/payments",
    methods: ["GET"],
    exportName: "GetPaymentByIdGET",
    description: "Get payment by id",
  },
  {
    name: "paymentByIdPut",
    path: ["src", "app", "api", "payments", "[id]"],
    handler: "erp-core/inventory/payments",
    methods: ["PUT"],
    exportName: "PutPaymentPUT",
    description: "Update payment by id",
  },
  {
    name: "paymentByIdDelete",
    path: ["src", "app", "api", "payments", "[id]"],
    handler: "erp-core/inventory/payments",
    methods: ["DELETE"],
    exportName: "DeletePaymentDELETE",
    description: "Delete payment by id",
  },
  {
    name: "storePayments",
    path: ["src", "app", "api", "stores", "[storeId]", "payments"],
    handler: "erp-core/inventory/payments",
    methods: ["GET"],
    exportName: "GetStorePaymentsGET",
    description: "Store-specific payments listing",
  },
  // Order item endpoints under orders
  {
    name: "orderItemGet",
    path: ["src", "app", "api", "orders", "[id]", "orderItems", "[itemId]"],
    handler: "erp-core/inventory/orderItem",
    methods: ["GET"],
    exportName: "GetOrderItemGET",
    description: "Get single order item",
  },
  {
    name: "orderItemPost",
    path: ["src", "app", "api", "orders", "[id]", "orderItems"],
    handler: "erp-core/inventory/orderItem",
    methods: ["POST"],
    exportName: "PostOrderItemPOST",
    description: "Create new order item",
  },
  {
    name: "orderItemCancel",
    path: [
      "src",
      "app",
      "api",
      "orders",
      "[id]",
      "orderItems",
      "[itemId]",
      "cancel",
    ],
    handler: "erp-core/inventory/orderItem",
    methods: ["PUT"],
    exportName: "PutOrderItemCancelPUT",
    description: "Cancel an order item",
  },
  {
    name: "orderItemUndoCancel",
    path: [
      "src",
      "app",
      "api",
      "orders",
      "[id]",
      "orderItems",
      "[itemId]",
      "undo-cancel",
    ],
    handler: "erp-core/inventory/orderItem",
    methods: ["PUT"],
    exportName: "PutOrderItemUndoCancelPUT",
    description: "Undo cancel on an order item",
  },
  {
    name: "orderItemUpdate",
    path: [
      "src",
      "app",
      "api",
      "orders",
      "[id]",
      "orderItems",
      "[itemId]",
      "update",
    ],
    handler: "erp-core/inventory/orderItem",
    methods: ["PUT"],
    exportName: "PutOrderItemUpdatePUT",
    description: "Update an order item",
  },
  {
    name: "slides",
    path: ["src", "app", "api", "slides"],
    handler: "erp-core/inventory/slides",
    methods: ["GET"],
    exportName: "getSlidesGET",
    description: "Slides listing endpoint",
  },
];

/**
 * Parse existing route file to extract methods and their export info
 */
function parseRouteFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return { methods: new Map(), comments: [] };
  }

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const methods = new Map(); // method -> { exportName, handler, line }
  const comments = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Capture comments
    if (line.startsWith("//")) {
      comments.push(line);
      continue;
    }

    // Match: export { SomeExport as METHOD } from "handler";
    const match = line.match(
      /export\s*{\s*(\w+)\s+as\s+(\w+)\s*}\s*from\s*["']([^"']+)["']/
    );
    if (match) {
      const [, exportName, method, handler] = match;
      methods.set(method, { exportName, handler, line: i });
    }
  }

  return { methods, comments };
}

/**
 * Merge new route methods with existing ones
 */
function mergeRouteContent(existingMethods, newRoute, description) {
  const merged = new Map(existingMethods);

  // Add or update methods from the new route
  newRoute.methods.forEach((method) => {
    const exportName = newRoute.exportName || method;
    merged.set(method, {
      exportName,
      handler: newRoute.handler,
      description: newRoute.description,
    });
  });

  // Generate content
  const lines = [`// Auto-generated API route - ${description}`];

  // Sort methods in standard order: GET, POST, PUT, PATCH, DELETE
  const methodOrder = ["GET", "POST", "PUT", "PATCH", "DELETE"];
  const sortedMethods = Array.from(merged.entries()).sort((a, b) => {
    const aIdx = methodOrder.indexOf(a[0]);
    const bIdx = methodOrder.indexOf(b[0]);
    return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
  });

  sortedMethods.forEach(([method, info]) => {
    lines.push(
      `export { ${info.exportName} as ${method} } from "${info.handler}";`
    );
  });

  return lines.join("\n") + "\n";
}

/**
 * Create or update a single API route
 */
function createRoute(route) {
  const routePath = path.join(process.cwd(), ...route.path);
  const routeFile = path.join(routePath, "route.ts");

  // Check if folder exists, if not create it
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
    console.log(`📁 Created folder: ${routePath}`);
  }

  let wasUpdated = false;
  let wasCreated = false;

  // Parse existing file if it exists
  const existing = parseRouteFile(routeFile);
  const needsUpdate = route.methods.some((method) => {
    const existingMethod = existing.methods.get(method);
    return (
      !existingMethod ||
      existingMethod.handler !== route.handler ||
      existingMethod.exportName !== (route.exportName || method)
    );
  });

  if (fs.existsSync(routeFile) && !needsUpdate) {
    // File exists and has all methods already - no changes needed
    return { created: false, updated: false };
  }

  // Generate merged content
  const content = mergeRouteContent(existing.methods, route, route.description);
  fs.writeFileSync(routeFile, content, "utf8");

  if (fs.existsSync(routeFile) && existing.methods.size > 0) {
    wasUpdated = true;
    console.log(
      `🔄 Updated: ${route.path.join("/")}/route.ts (${route.methods.join(
        ", "
      )})`
    );
  } else {
    wasCreated = true;
    console.log(
      `✅ Created: ${route.path.join("/")}/route.ts (${route.methods.join(
        ", "
      )})`
    );
  }

  // Also create/update route file without the leading 'src' if present
  if (route.path[0] === "src") {
    const altPath = path.join(process.cwd(), ...route.path.slice(1));
    const altFile = path.join(altPath, "route.ts");

    if (!fs.existsSync(altPath)) {
      fs.mkdirSync(altPath, { recursive: true });
      console.log(`📁 Created folder: ${altPath}`);
    }

    const altExisting = parseRouteFile(altFile);
    const altNeedsUpdate = route.methods.some((method) => {
      const existingMethod = altExisting.methods.get(method);
      return (
        !existingMethod ||
        existingMethod.handler !== route.handler ||
        existingMethod.exportName !== (route.exportName || method)
      );
    });

    if (!fs.existsSync(altFile) || altNeedsUpdate) {
      const altContent = mergeRouteContent(
        altExisting.methods,
        route,
        route.description
      );
      fs.writeFileSync(altFile, altContent, "utf8");

      if (fs.existsSync(altFile) && altExisting.methods.size > 0) {
        console.log(
          `🔄 Updated (alt): ${route.path
            .slice(1)
            .join("/")}/route.ts (${route.methods.join(", ")})`
        );
      } else {
        console.log(
          `✅ Created (alt): ${route.path
            .slice(1)
            .join("/")}/route.ts (${route.methods.join(", ")})`
        );
      }
    }
  }

  return { created: wasCreated, updated: wasUpdated };
}

/**
 * Setup all API routes
 */
function setupRoutes() {
  console.log("\n🚀 Setting up API routes for erp-core...\n");

  let created = 0;
  let updated = 0;
  let skipped = 0;

  routes.forEach((route) => {
    const result = createRoute(route);
    if (result.created) {
      created++;
    } else if (result.updated) {
      updated++;
    } else {
      skipped++;
    }
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✨ Setup complete!`);
  console.log(`   Created: ${created} route(s)`);
  if (updated > 0) {
    console.log(`   Updated: ${updated} route(s)`);
  }
  if (skipped > 0) {
    console.log(`   Skipped: ${skipped} (no changes needed)`);
  }
}

// Command handler
if (command === "setup" || command === "init") {
  setupRoutes();
} else {
  console.log("⚠️  Unknown command.");
}
