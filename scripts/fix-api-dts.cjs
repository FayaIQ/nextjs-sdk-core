"use strict";

const fs = require("node:fs");

const path = "src/api/api.ts";
const source = fs.readFileSync(path, "utf8");
const occurrences = source.match(/\bprivate\s+static\s+/g)?.length ?? 0;

if (occurrences === 0) {
  console.log("API declaration source is already compatible.");
  process.exit(0);
}

const patched = source.replace(/\bprivate\s+static\s+/g, "static ");
fs.writeFileSync(path, patched, "utf8");
console.log(`Removed private modifiers from ${occurrences} static API base fields.`);
