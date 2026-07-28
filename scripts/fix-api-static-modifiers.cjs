"use strict";

const fs = require("node:fs");

const path = "src/api/api.ts";
const source = fs.readFileSync(path, "utf8");
const pattern = /\b(?:public|private|protected)\s+static\s+/g;
const occurrences = source.match(pattern)?.length ?? 0;

if (occurrences === 0) {
  console.log("API static fields are already declaration-bundler compatible.");
  process.exit(0);
}

fs.writeFileSync(path, source.replace(pattern, "static "), "utf8");
console.log(`Removed ${occurrences} static access modifier(s).`);
