import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, CartItem } from '../types';

interface OrderState {
  orders: Order[];
  loading: boolean;
  placeOrder: (items: CartItem[], deliveryAddress: string, location?: { latitude: number; longitude: number }) => Promise<string>;
  getOrderHistory: (userId: string) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getAllOrders: () => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      loading: false,

      placeOrder: async (items: CartItem[], deliveryAddress: string, location?) => {
        set({ loading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const orderId = Date.now().toString();
        
        const newOrder: Order = {
          id: orderId,
          userId: '1', // This would come from auth context
          items,
          total,
          status: 'pending',
          deliveryAddress,
          location,
          createdAt: new Date().toISOString(),
          estimatedDelivery: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };

        set(state => ({
          orders: [...state.orders, newOrder],
          loading: false
        }));

        return orderId;
      },

      getOrderHistory: (userId: string) => {
        const { orders } = get();
        return orders.filter(order => order.userId === userId).sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },

      updateOrderStatus: (orderId: string, status: Order['status']) => {
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        }));
      },

      getAllOrders: () => {
        const { orders } = get();
        return orders.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
    }),
    {
      name: 'order-storage',
    }
  )
);