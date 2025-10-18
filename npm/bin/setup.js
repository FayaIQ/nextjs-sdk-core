#!/usr/bin/env node
import fs from "fs";
import path from "path";

const routes = ["storeInfo", "getProducts", "productInfo/[id]"];

// Use INIT_CWD to get the target project root
const projectRoot = process.env.INIT_CWD || process.cwd();

const srcAppDir = path.join(projectRoot, "src", "app");
const appDir = path.join(projectRoot, "app");

const baseAppDir = fs.existsSync(srcAppDir) ? srcAppDir : appDir;
fs.mkdirSync(baseAppDir, { recursive: true });

const appApiDir = path.join(baseAppDir, "api");
fs.mkdirSync(appApiDir, { recursive: true });

for (const route of routes) {
  const routeDir = path.join(appApiDir, route);
  fs.mkdirSync(routeDir, { recursive: true });

  const importPath = `my-nextjs-api-client/dist/app/api/${route}/route`.replace(
    /\\/g,
    "/"
  );

  const content = `export { GET } from "${importPath}";\n`;
  fs.writeFileSync(path.join(routeDir, "route.ts"), content);

  console.log(`✅ Created proxy route: /api/${route}`);
}

console.log("✨ All routes registered successfully!");
