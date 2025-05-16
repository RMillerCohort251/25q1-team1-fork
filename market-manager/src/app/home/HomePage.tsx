'use client';

import { useEffect, useState } from 'react';
import { Product } from '@/src/types/product';
import Link from 'next/link';
import styles from './HomePage.module.css';

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
    <main className={styles.container}>
      <h1 className={styles.heading}>Welcome to Market Manager</h1>
      <Link href="/customerCart">
        <button className={styles.button}>
          Go to Customer Cart
        </button>
      </Link>

      {products.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Quantity</th>
              <th className={styles.th}>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className={styles.td}>{product.name}</td>
                <td className={styles.td}>{product.quantity}</td>
                <td className={styles.td}>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.message}>No products available.</p>
      )}
    </main>
  );
}
