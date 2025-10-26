import { getStoreInfo } from "my-next-core";
import ClientProducts from "./components/ClientProducts";

// Server Component - fetches data on the server
export default async function Home() {
  // Simply call the function name - it automatically handles server-side fetching
  const storeInfo = await getStoreInfo();

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900 p-8">
      <main className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-zinc-50">
          my-next-core Package Demo
        </h1>

        {/* Server Component Example */}
        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            🖥️ Server Component - Store Info
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            This data is fetched on the server using: <code className="bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded">await getStoreInfo()</code>
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(storeInfo, null, 2)}
            </pre>
          </div>
        </section>

        {/* Client Component Example */}
        <section className="mb-12 p-6 bg-white dark:bg-zinc-800 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
            💻 Client Component - Products
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            This data is fetched on the client using: <code className="bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded">getProducts()</code>
          </p>
          <ClientProducts />
        </section>

        {/* Usage Instructions */}
        <section className="p-6 bg-linear-to-br from-purple-50 to-blue-50 dark:from-zinc-800 dark:to-zinc-700 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
            📦 How to Use - Ultra Simple!
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">1. API Routes (ONE LINE!):</h3>
              <code className="block bg-white dark:bg-zinc-900 p-3 rounded text-xs">
                {`// app/api/storeInfo/route.ts
export { GET } from "my-next-core/handlers/storeInfo";

// app/api/getProducts/route.ts
export { GET } from "my-next-core/handlers/getProducts";`}
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">2. Server Component:</h3>
              <code className="block bg-white dark:bg-zinc-900 p-3 rounded text-xs">
                {`import { getStoreInfo } from 'my-next-core';

export default async function Page() {
  const store = await getStoreInfo(); // That's it!
  return <div>{store.name}</div>;
}`}
              </code>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">3. Client Component:</h3>
              <code className="block bg-white dark:bg-zinc-900 p-3 rounded text-xs">
                {`'use client';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

// In useEffect or event handler
const products = await getProducts({ 
  filterParams: new ItemsFilterParameters() 
});`}
              </code>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
