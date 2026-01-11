// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "core/index": "src/core/index.ts",
    "api/index": "src/api/api.ts",
    "identity/index": "src/identity/index.ts",
    "identity/application/index": "src/identity/application/index.ts",
    "identity/users/index": "src/identity/users/index.ts",
    "gps/index": "src/gps/index.ts",
    "gps/locations/index": "src/gps/locations/index.ts",
    "inventory/index": "src/inventory/index.ts",
    "inventory/items/index": "src/inventory/items/index.ts",
    "inventory/orders/index": "src/inventory/orders/index.ts",
    "inventory/payments/index": "src/inventory/payments/index.ts",
    "inventory/reports/index": "src/inventory/reports/index.ts",
    "inventory/slides/index": "src/inventory/slides/index.ts",
    "inventory/orderItem/index": "src/inventory/orderItem/index.ts",
    "inventory/menus/index": "src/inventory/menus/index.ts",
    "inventory/offers/index": "src/inventory/offers/index.ts",
    "inventory/category/index": "src/inventory/category/index.ts",
    "inventory/itemSource/index": "src/inventory/itemSource/index.ts",
    "inventory/brands/index": "src/inventory/brands/index.ts",
    "inventory/wishes/index": "src/inventory/wishes/index.ts",
    "crm/index": "src/crm/index.ts",
    "stores/index": "src/stores/index.ts",
    "firebase/index": "src/firebase/index.ts",
    "utils/index": "src/utils/index.ts",

    // Individual slide utility exported directly
    "inventory/slides/getSlides": "src/inventory/slides/getSlides.ts",
  },

  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  outDir: "dist",
  // remove console.* and debugger from production bundles
  esbuildOptions: (options) => {
    // esbuild supports `drop` to remove console/debugger
    // ensure we merge with any existing drop settings
    // @ts-ignore - tsup's typing for esbuildOptions expects a function
    options.drop = Array.isArray(options.drop) ? Array.from(new Set([...options.drop, 'console', 'debugger'])) : ['console', 'debugger'];
  },
});
