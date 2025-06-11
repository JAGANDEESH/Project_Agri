import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      // ✅ Safeguard: Add product only if valid
      addToCart: (product: Product, quantity: number) => {
        if (!product || typeof product.id !== 'string' || typeof product.price !== 'number') return;

        set(state => {
          const existingItem = state.items.find(item => item.product?.id === product.id);

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product?.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          } else {
            return {
              items: [
                ...state.items,
                {
                  id: Date.now().toString(),
                  product,
                  quantity
                }
              ]
            };
          }
        });
      },

      removeFromCart: (productId: string) => {
        set(state => ({
          items: state.items.filter(item => item.product?.id !== productId)
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.product?.id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      // ✅ Prevent crash: Skip invalid items
      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          if (!item.product || typeof item.product.price !== 'number') return total;
          return total + item.product.price * item.quantity;
        }, 0);
      },

      // ✅ Prevent crash: Skip invalid items
      getItemCount: () => {
        const { items } = get();
        return items.reduce((count, item) => {
          if (!item.product) return count;
          return count + item.quantity;
        }, 0);
      }
    }),
    {
      name: 'cart-storage', // LocalStorage key
    }
  )
);
