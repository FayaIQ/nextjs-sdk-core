'use client';

import { useEffect, useState } from 'react';
import { getProducts, ItemsFilterParameters } from 'my-next-core';

export default function ClientProducts() {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Simply call the function name with filters
        const filterParams = new ItemsFilterParameters();
        
        const data = await getProducts({ filterParams });
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded animate-pulse">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-600 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded text-red-600 dark:text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-700 p-4 rounded">
      <pre className="text-sm overflow-auto max-h-96">
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}
