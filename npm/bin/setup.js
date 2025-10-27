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
    handler: "my-next-core/identity",
    methods: ["POST"],
    exportName: "LoginPOST",
    description: "User login endpoint",
  },
  {
    name: "logout",
    path: ["src" , "app", "api", "auth", "logout"],
    handler: "my-next-core/identity",
    methods: ["POST"],
    exportName: "LogoutPOST",
    description: "User logout endpoint",
  },
    {
    name: "orders",
    path: ["src", "app", "api", "orders"],
    handler: "my-next-core/inventory/orders",
    methods: ["GET"],
    exportName: "GETOrders",
    description: "Orders listing endpoint",
  },
  {
    name: "orderFullInfo",
    path: ["src", "app", "api", "orders", "full-info"],
    handler: "my-next-core/inventory/orders",
    methods: ["POST"],
    exportName: "POSTOrderFullInfo",
    description: "Get full order information",
  },
  {
    name: "orderApprove",
    path: ["src", "app", "api", "orders", "[id]", "approve"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderApprove",
    description: "Approve a single order",
  },
  {
    name: "orderDisapprove",
    path: ["src", "app", "api", "orders", "[id]", "disapprove"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderDisapprove",
    description: "Disapprove a single order",
  },
  {
    name: "orderApproveList",
    path: ["src", "app", "api", "orders", "approve-list"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderApproveList",
    description: "Approve multiple orders at once",
  },
  {
    name: "orderDisapproveList",
    path: ["src", "app", "api", "orders", "disapprove-list"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderDisapproveList",
    description: "Disapprove multiple orders at once",
  },
  {
    name: "order",
    path: ["src", "app", "api", "orders", "[id]"],
    handler: "my-next-core/inventory/orders",
    methods: ["GET"],
    exportName: "GETOrder",
    description: "Get single order details",
  },
  {
    name: "orderChangeStatus",
    path: ["src", "app", "api", "orders", "[id]", "change-status"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderChangeStatus",
    description: "Change order delivery status",
  },
  {
    name: "orderDiscount",
    path: ["src", "app", "api", "orders", "[id]", "discount"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderDiscount",
    description: "Apply discount to order",
  },
  {
    name: "orderReferenceId",
    path: ["src", "app", "api", "orders", "[id]", "referenceId"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderReferenceId",
    description: "Update order reference ID",
  },
  {
    name: "orderReferenceDeliveryId",
    path: ["src", "app", "api", "orders", "[id]", "referenceDeliveryId"],
    handler: "my-next-core/inventory/orders",
    methods: ["PUT"],
    exportName: "PUTOrderReferenceDeliveryId",
    description: "Update order reference delivery ID",
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
    console.log(`✅ Created: ${route.path.join("/")}/route.ts (${route.methods.join(', ')})`);
    return true;
  }
}

/**
 * Setup all API routes
 */
function setupRoutes() {
  console.log("\n🚀 Setting up API routes for my-next-core...\n");

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
  console.log('      import { getStoreInfo, getProducts, getProductInfo } from "my-next-core";');
  console.log("   3. Start your development server: npm run dev\n");
}

/**
 * Show help
 */
function showHelp() {
  console.log("\n📦 my-next-core CLI\n");
  console.log("Usage:");
  console.log("  npx my-next-core setup    Create all API route files\n");
  console.log("Available routes:");
  routes.forEach((route) => {
    const methods = route.methods.join(", ");
    console.log(`  - ${route.path.join("/")} [${methods}] (${route.description})`);
  });
  console.log();
}

// Command handler
if (command === "setup" || command === "init") {
  setupRoutes();
} else if (command === "help" || command === "--help" || command === "-h") {
  showHelp();
} else {
  console.log('⚠️  Unknown command. Use "npx my-next-core setup" or "npx my-next-core help"');
}
