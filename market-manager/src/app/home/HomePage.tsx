'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import Link from 'next/link';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fruit API response', data);
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error calling fruit API:', error);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <section className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🍓 Welcome to <span className="text-blue-600">Market Manager</span>
        </h1>

        <Link href="/customerCart">
          <button className="mb-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            Go to Customer Cart
          </button>
        </Link>

        {products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-300">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                      {product.quantity}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-gray-800">
                      ${product.price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No products available.</p>
        )}
      </section>
    </main>
  );
}
