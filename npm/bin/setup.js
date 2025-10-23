#!/usr/bin/env node
import fs from "fs";
import path from "path";

const args = process.argv.slice(2);

if (args[0] === "init") {
  const routePath = path.join(process.cwd(), "app", "api", "storeInfo");
  const routeFile = path.join(routePath, "route.ts");

  // Check if folder exists, if not create it
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
    console.log(`📁 Created folder: ${routePath}`);
  } else {
    console.log(`📁 Folder already exists: ${routePath}`);
  }

  // Check if file already exists
  if (fs.existsSync(routeFile)) {
    console.log(`⚠️ Route file already exists: ${routeFile}`);
  } else {
    // Write the 1-liner export
    const content = `export { GET } from "@zahraa/api-client/serverHandlers/storeInfoRoute";\n`;
    fs.writeFileSync(routeFile, content, "utf8");
    console.log(`✅ Created API route file at ${routeFile}`);
  }
} else {
  console.log("Usage: npx zahraa-api init");
}
