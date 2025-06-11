import React, { useEffect } from 'react';
import { ProductList } from '../components/Products/ProductList';
import { useProductStore } from '../store/productStore';

export const Products: React.FC = () => {
  const { fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Fresh Vegetables Market
          </h1>
          <p className="text-green-100 text-lg">
            Discover our wide selection of farm-fresh vegetables, delivered straight to your door.
          </p>
        </div>
      </div>
      <ProductList />
    </div>
  );
};