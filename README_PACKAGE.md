# erp-core — CRM usage

This package exposes a `crm` entry so consumers can import CRM helpers and handlers directly from the package root.

Example (replace `my-next-core` with your published package name if different):

```ts
// Server or Node usage
import { getClients } from 'my-next-core/crm'; // or 'erp-core/crm' depending on package name

async function demo() {
  const res = await getClients();
  console.log(res);
}

// In Next.js app routes you can re-export handlers from the package:
// export { GETClients as GET } from 'my-next-core/crm';
```

Notes
- The build outputs types in `dist/*.d.ts`. We check those files on build to make sure we don't leak framework-specific types (for example, `NextRequest`) from the public API.
- If your published package name differs from `erp-core`, replace the import path accordingly.
