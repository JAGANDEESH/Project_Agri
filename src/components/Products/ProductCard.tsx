import React from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, items, updateQuantity } = useCartStore();
 const cartItem = items.find(item => item.product && item.product.id === product.id);

  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
            <span className="text-gray-500 text-sm">/ {product.unit}</span>
          </div>
          <div className="text-sm text-gray-500">
            Stock: {product.quantity}
          </div>
        </div>

        {/* Add to Cart Controls */}
        <div className="flex items-center justify-between">
          {cartQuantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center space-x-3 w-full">
              <button
                onClick={() => handleUpdateQuantity(cartQuantity - 1)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-semibold text-lg">
                {cartQuantity}
              </span>
              <button
                onClick={() => handleUpdateQuantity(cartQuantity + 1)}
                disabled={cartQuantity >= product.quantity}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};