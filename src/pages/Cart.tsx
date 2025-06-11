// src/pages/Cart.tsx
import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, MapPin } from 'lucide-react';

import { useCartStore } from '../store/cartStore';
import { useOrderStore } from '../store/orderStore';
import { useAuthStore } from '../store/authStore';

export const Cart: React.FC = () => {
  /** ---------- STORES ---------- */
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
  } = useCartStore();
  const { placeOrder, loading } = useOrderStore();
  const { user } = useAuthStore();

  /** ---------- ROUTING & STATE ---------- */
  const navigate = useNavigate();
  const [deliveryAddress, setDeliveryAddress] = useState(user?.address ?? '');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(
    null,
  );

  /** ---------- DERIVED DATA ---------- */
  // Skip any corrupted items that somehow made it into persistence
  const validItems = useMemo(
    () => items.filter((it) => it.product && typeof it.product.price === 'number'),
    [items],
  );

  const total = useMemo(() => getCartTotal(), [getCartTotal]);

  /** ---------- HELPERS ---------- */
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setUseCurrentLocation(true);
      },
      (err) => {
        console.error('Error getting location', err);
        alert('Unable to get your location. Please enter address manually.');
      },
    );
  };

  const handleCheckout = async () => {
    if (!deliveryAddress.trim()) {
      alert('Please provide a delivery address');
      return;
    }

    try {
      await placeOrder(
        validItems,
        deliveryAddress,
        useCurrentLocation ? location ?? undefined : undefined,
      );
      clearCart();
      navigate('/orders');
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  /** ---------- EMPTY CART ---------- */
  if (validItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some fresh vegetables to get started!</p>
          <Link
            to="/products"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  /** ---------- RENDER ---------- */
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
            <h1 className="text-2xl font-bold flex items-center">
              <ShoppingCart className="h-8 w-8 mr-3" />
              Shopping Cart ({validItems.length} items)
            </h1>
          </div>

          {/* Cart Items */}
          <div className="p-6">
            <div className="space-y-4 mb-8">
              {validItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.product.image ?? '/placeholder.png'}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">
                      ₹{item.product.price} / {item.product.unit}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>

                    <span className="w-8 text-center font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.quantity}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-600 hover:text-red-700 p-2 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Delivery Address */}
            <div className="border-t pt-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your delivery address..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleGetLocation}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Use Current Location</span>
                  </button>

                  {useCurrentLocation && location && (
                    <span className="text-green-600 font-medium">✓ Location captured</span>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-green-600">₹{total.toFixed(2)}</span>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleCheckout}
                  disabled={loading || !deliveryAddress.trim()}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Placing Order…' : 'Place Order'}
                </button>
                <Link
                  to="/products"
                  className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
