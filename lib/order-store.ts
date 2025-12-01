import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from './cart-store';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  protectionFee: number;
  total: number;
  deliveryMethod: 'pickup' | 'courier';
  shippingOption?: string;
  pickupLocation?: string;
  paymentMethod: string;
  customerInfo: {
    name: string;
    phone: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  notes?: string;
  status: 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
  
  // CRUD Operations
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  cancelOrder: (id: string) => void;
  
  // Query Operations
  getOrder: (id: string) => Order | undefined;
  getOrdersByUser: (userId: string) => Order[];
  getOrdersByStatus: (status: Order['status']) => Order[];
  getTotalOrders: () => number;
  getTotalSpent: () => number;
  
  // Utility
  setCurrentOrder: (order: Order | null) => void;
  clearOrders: () => void;
  setError: (error: string | null) => void;
}

export const useOrder = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      isLoading: false,
      error: null,
      
      createOrder: (orderData) => {
        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const now = new Date().toISOString();
        
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          status: 'pending',
          createdAt: now,
          updatedAt: now,
        };
        
        set((state) => ({
          orders: [...state.orders, newOrder],
          currentOrder: newOrder,
          error: null
        }));
        
        return orderId;
      },
      
      updateOrder: (id, updates) =>
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === id
              ? { ...order, ...updates, updatedAt: new Date().toISOString() }
              : order
          ),
          error: null
        })),
      
      cancelOrder: (id) =>
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === id
              ? { ...order, status: 'cancelled' as const, updatedAt: new Date().toISOString() }
              : order
          ),
          error: null
        })),
      
      getOrder: (id) => get().orders.find(order => order.id === id),
      
      getOrdersByUser: (userId) =>
        get().orders.filter(order => order.userId === userId),
      
      getOrdersByStatus: (status) =>
        get().orders.filter(order => order.status === status),
      
      getTotalOrders: () => get().orders.length,
      
      getTotalSpent: () =>
        get().orders
          .filter(order => order.status !== 'cancelled')
          .reduce((sum, order) => sum + order.total, 0),
      
      setCurrentOrder: (order) => set({ currentOrder: order }),
      
      clearOrders: () => set({ orders: [], currentOrder: null, error: null }),
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'thriftmap-orders',
      version: 1,
    }
  )
);
