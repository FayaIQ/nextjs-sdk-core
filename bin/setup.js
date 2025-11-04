#!/usr/bin/env node
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const command = args[0];

// API routes configuration
const routes = [

  {
    name: "login",
    path: [ "src" , "app", "api", "auth", "login"],
    handler: "erp-core/identity",
    methods: ["POST"],
    exportName: "LoginPOST",
    description: "User login endpoint",
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
    methods: ["GET"],
    exportName: "GETOrders",
    description: "Orders listing endpoint",
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
    path: ["src", "app", "api", "locations" , "countries"],
    handler: "erp-core/gps/locations",
    methods: ["GET"],
    exportName: "getCountriesHandler",
    description: "Locations listing endpoint",
  },
  {
    name: "location",
    path: ["src", "app", "api", "locations", "[parentId]" , "children"],
    handler: "erp-core/gps/locations",
    methods: ["GET"],
    exportName: "getLocationChildrenHandler",
    description: "Location details endpoint",
  },
  {
    name: "stores",
    path: ["src", "app", "api", "stores"],
    handler: "erp-core/identity/application",
    methods: ["GET"],
    exportName: "GETStores",
    description: "Stores listing endpoint",
  },
  {
    name: "customersDropdown",
    path: ["src", "app", "api", "customers", "dropdown"],
    handler: "erp-core/identity",
    methods: ["GET"],
    exportName: "CustomersDropdownGET",
    description: "Customers dropdown (username, FullName) endpoint",
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
    name : "menusDropdown",
    path: ["src", "app", "api", "menus", "dropdown"],
    handler: "erp-core/inventory/menus",
    methods: ["GET"],
    exportName: "GetMenusDropdownGET",
    description: "Menus dropdown listing endpoint",
  },
  {
    name : "itemsParent",
    path: ["src", "app", "api", "items", "parent"],
    handler: "erp-core/inventory/items",
    methods: ["GET"],
    exportName: "GetParentProductsGET",
    description: "Parent products listing endpoint",
  },
  {
    name : "itemsPaging",
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
    path: ["src", "app", "api", "offers", "[id]", "items-discount", "customers"],
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
    path: ["src", "app", "api", "offers", "[id]", "add-items-by-filter", "[forceUpdate]"],
    handler: "erp-core/inventory/offers",
    methods: ["POST"],
    exportName: "PostOffersAddItemsByFilterPOST",
    description: "Add items to offer by filter with force update flag",
  },
  {
    name: "offersCustomers",
    path: ["src", "app", "api", "offers", "customers"],
    handler: "erp-core/inventory/offers",
    methods: ["GET"],
    exportName: "GetOffersCustomersGET",
    description: "Offers customers endpoint",
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
    path: ["src", "app", "api", "orders", "[id]", "orderItems", "[itemId]", "cancel"],
    handler: "erp-core/inventory/orderItem",
    methods: ["PUT"],
    exportName: "PutOrderItemCancelPUT",
    description: "Cancel an order item",
  },
  {
    name: "orderItemUndoCancel",
    path: ["src", "app", "api", "orders", "[id]", "orderItems", "[itemId]", "undo-cancel"],
    handler: "erp-core/inventory/orderItem",
    methods: ["PUT"],
    exportName: "PutOrderItemUndoCancelPUT",
    description: "Undo cancel on an order item",
  },
  {
    name: "orderItemUpdate",
    path: ["src", "app", "api", "orders", "[id]", "orderItems", "[itemId]", "update"],
    handler: "erp-core/inventory/orderItem",
    methods: ["PUT"],
    exportName: "PutOrderItemUpdatePUT",
    description: "Update an order item",
  },
{
    name: "slides",
    path: ["src", "app", "api", "slides"],
    handler: "erp-core/inventory/slides/getSlides",
    methods: ["GET"],
    description: "Slides listing endpoint",
  },
];

/**
 * Create a single API route
 */
function createRoute(route) {
  const routePath = path.join(process.cwd(), ...route.path);
  const routeFile = path.join(routePath, "route.ts");

  // Check if folder exists, if not create it
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
    console.log(`📁 Created folder: ${routePath}`);
  }

  // Check if file already exists
  if (fs.existsSync(routeFile)) {
    console.log(`⚠️  Route file already exists: ${routeFile}`);
    return false;
  } else {
    // Generate export statement for methods
    const methodExports = route.methods.map(method => {
      const exportName = route.exportName || method;
      return `export { ${exportName} as ${method} } from "${route.handler}";`;
    }).join('\n');
    
    const content = `// Auto-generated API route - ${route.description}\n${methodExports}\n`;
    fs.writeFileSync(routeFile, content, "utf8");
    console.log(
      `✅ Created: ${route.path.join("/")}/route.ts (${route.methods.join(
        ", "
      )})`
    );
    // Also create a route file without the leading 'src' if present so apps
    // using the top-level `app/` directory receive the same generated route.
    if (route.path[0] === "src") {
      const altPath = path.join(process.cwd(), ...route.path.slice(1));
      const altFile = path.join(altPath, "route.ts");
      if (!fs.existsSync(altPath)) {
        fs.mkdirSync(altPath, { recursive: true });
        console.log(`📁 Created folder: ${altPath}`);
      }
      if (!fs.existsSync(altFile)) {
        fs.writeFileSync(altFile, content, "utf8");
        console.log(
          `✅ Created (alt): ${route.path.slice(1).join("/")}/route.ts (${route.methods.join(
            ", "
          )})`
        );
      } else {
        console.log(`⚠️  Route file already exists: ${altFile}`);
      }
    }
    return true;
  }
}

/**
 * Setup all API routes
 */
function setupRoutes() {
  console.log("\n🚀 Setting up API routes for erp-core...\n");

  let created = 0;
  let skipped = 0;

  routes.forEach((route) => {
    if (createRoute(route)) {
      created++;
    } else {
      skipped++;
    }
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✨ Setup complete!`);
  console.log(`   Created: ${created} route(s)`);
  if (skipped > 0) {
    console.log(`   Skipped: ${skipped} (already exists)`);
  }
  console.log("=".repeat(50) + "\n");
  console.log("📖 Next steps:");
  console.log("   1. Configure your environment variables in .env.local");
  console.log("   2. Import functions in your components:");
  console.log("   3. Start your development server: npm run dev\n");
}

/**
 * Show help
 */
function showHelp() {
  console.log("\n📦 erp-core CLI\n");
  console.log("Usage:");
  console.log("  npx erp-core setup    Create all API route files\n");
  console.log("Available routes:");
  routes.forEach((route) => {
    const methods = route.methods.join(", ");
    console.log(
      `  - ${route.path.join("/")} [${methods}] (${route.description})`
    );
  });
  console.log();
}

// Command handler
if (command === "setup" || command === "init") {
  setupRoutes();
} else if (command === "help" || command === "--help" || command === "-h") {
  showHelp();
} else {
  console.log(
    '⚠️  Unknown command. Use "npx erp-core setup" or "npx erp-core help"'
  );
}
