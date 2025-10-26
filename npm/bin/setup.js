#!/usr/bin/env node
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
const command = args[0];

// API routes configuration
const routes = [
  {
    name: "storeInfo",
    path: ["app", "api", "storeInfo"],
    handler: "my-next-core/handlers/storeInfo",
    description: "Store information endpoint",
  },
  {
    name: "getProducts",
    path: ["app", "api", "getProducts"],
    handler: "my-next-core/handlers/getProducts",
    description: "Products listing endpoint",
  },
  {
    name: "productInfo",
    path: ["app", "api", "productInfo", "[id]"],
    handler: "my-next-core/handlers/productInfo",
    description: "Product details endpoint (dynamic route)",
  },
  {
    name: "orders",
    path: [ "src" , "app", "api", "orders"],
    handler: "my-next-core/inventory/orders/handler/orders",
    description: "Orders listing endpoint",
  },
  {
    name: "login",
    path: ["app", "api", "auth", "login"],
    handler: "my-next-core/handlers/login",
    description: "User login endpoint",
  },
  {
    name: "logout",
    path: ["app", "api", "auth", "logout"],
    handler: "my-next-core/handlers/logout",
    description: "User logout endpoint",
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
    // Write the 1-liner export
    const content = `// Auto-generated API route - ${route.description}\nexport { GET } from "${route.handler}";\n`;
    fs.writeFileSync(routeFile, content, "utf8");
    console.log(`✅ Created: ${route.path.join("/")}/route.ts`);
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
    console.log(`  - ${route.path.join("/")} (${route.description})`);
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
