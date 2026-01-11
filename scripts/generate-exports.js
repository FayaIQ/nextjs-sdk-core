#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';

const pkgPath = path.resolve(process.cwd(), 'package.json');
const srcPath = path.resolve(process.cwd(), 'src');

function makeMapping(name) {
  const base = `./${name}`;
  return {
    [base]: {
      types: `./dist/${name}/index.d.ts`,
      import: `./dist/${name}/index.js`,
      require: `./dist/${name}/index.cjs`
    },
    [`${base}/*`]: {
      types: `./dist/${name}/*.d.ts`,
      import: `./dist/${name}/*.js`,
      require: `./dist/${name}/*.cjs`
    }
  };
}

async function run() {
  try {
    const pkgRaw = await fs.readFile(pkgPath, 'utf8');
    const pkg = JSON.parse(pkgRaw);

    const items = await fs.readdir(srcPath, { withFileTypes: true });
    const folders = items.filter(i => i.isDirectory()).map(d => d.name);

    // Initialize exports if needed
    if (!pkg.exports) {
      pkg.exports = {
        ".": {
          types: "./dist/index.d.ts",
          import: "./dist/index.js",
          require: "./dist/index.cjs"
        }
      };
    }

    for (const name of folders) {
      const mapping = makeMapping(name);
      // only add if missing to avoid stomping custom exports
      if (!pkg.exports[`./${name}`]) {
        pkg.exports = { ...pkg.exports, ...mapping };
      }
    }

    // write back package.json
    await fs.writeFile(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
    console.log('Generated exports for:', folders.join(', '));
  } catch (err) {
    console.error('Failed to generate exports:', err);
    process.exitCode = 1;
  }
}

run();