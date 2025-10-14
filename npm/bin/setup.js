#!/usr/bin/env node

import fs from "fs";
import path from "path";


const routes = [
  "storeInfo",
];

const appApiDir = path.join(process.cwd(), "app", "api");

for (const route of routes) {
  const routeDir = path.join(appApiDir, route);
  const routeFile = path.join(routeDir, "route.ts");

  fs.mkdirSync(routeDir, { recursive: true });

const importPath = `my-nextjs-api-client/dist/app/api/${route}/route`.replace(/\\/g, "/");
  const content = `export { GET } from "${importPath}";\n`;

  fs.writeFileSync(routeFile, content);
  console.log(`✅ Created proxy: /api/${route}`);
}

console.log("All routes registered successfully!");
