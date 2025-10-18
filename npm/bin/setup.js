import fs from "fs";
import path from "path";

// List of routes you want to create proxies for
const routes = ["storeInfo", "getProducts", "productInfo/[id]"];

// 1️⃣ Determine whether to use "src/app" or "app"
const projectRoot = process.cwd();
const srcAppDir = path.join(projectRoot, "src", "app");
const appDir = path.join(projectRoot, "app");

const appApiDir = fs.existsSync(srcAppDir)
  ? path.join(srcAppDir, "api")
  : path.join(appDir, "api");

// 2️⃣ Create each route directory and file
for (const route of routes) {
  const routeDir = path.join(appApiDir, route);
  const routeFile = path.join(routeDir, "route.ts");

  fs.mkdirSync(routeDir, { recursive: true });

  // 3️⃣ Normalize import path (for dist output)
  const importPath = `my-nextjs-api-client/dist/app/api/${route}/route`.replace(
    /\\/g,
    "/"
  );

  const content = `export { GET } from "${importPath}";\n`;

  fs.writeFileSync(routeFile, content);

  console.log(`✅ Created proxy route: /api/${route}`);
}

console.log("✨ All routes registered successfully!");
