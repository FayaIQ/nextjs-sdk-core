// tsup.config.ts
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    core: "src/core/index.ts",
  api: "src/api/api.ts",
    identity: "src/identity/index.ts",
    "identity/application": "src/identity/application/index.ts",
    "users": "src/identity/users/index.ts",
    gps: "src/gps/index.ts",
    "gps/locations": "src/gps/locations/index.ts",
    inventory : "src/inventory/index.ts",
    "inventory/items": "src/inventory/items/index.ts",
    "inventory/orders": "src/inventory/orders/index.ts",
    "inventory/payments": "src/inventory/payments/index.ts",
    "inventory/reports": "src/inventory/reports/index.ts",
    "inventory/slides": "src/inventory/slides/index.ts",
    "inventory/orderItem": "src/inventory/orderItem/index.ts",
    "inventory/menus": "src/inventory/menus/index.ts",
    "inventory/offers": "src/inventory/offers/index.ts",
    "inventory/category": "src/inventory/category/index.ts",
    "inventory/itemSource": "src/inventory/itemSource/index.ts",
    "inventory/brands": "src/inventory/brands/index.ts",
    "inventory/wishes": "src/inventory/wishes/index.ts",

    crm: "src/crm/index.ts",
    stores: "src/stores/index.ts",
    firebase: "src/firebase/index.ts",

    // Individual slide utility exported directly
    "inventory/slides/getSlides": "src/inventory/slides/getSlides.ts",
  },

  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  outDir: "dist",
});
