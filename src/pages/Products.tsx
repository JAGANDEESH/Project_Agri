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
 <div className="relative bg-green-700 text-white">
  {/* Background Image */}
 

  {/* Overlay */}
   <div
    className="absolute inset-0 bg-cover bg-center opacity-60"
    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1615485299964-3d0e436b3df1?auto=format&fit=crop&w=1950&q=80')` }}
  ></div>
  <div className="relative z-10 bg-gradient-to-r from-green-800/80 to-green-600/80 py-16">
  
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg">
        Fresh Vegetables Market
      </h1>
      <p className="text-xl text-green-100 drop-shadow-md">
        Discover our wide selection of farm-fresh vegetables, delivered straight to your door.
      </p>
    </div>
  </div>
</div>

      <ProductList />
    </div>
  );
};