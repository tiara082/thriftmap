import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  sellerId?: string;
  category?: string;
  condition?: string;
  shopName?: string;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
  
  // CRUD Operations
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  
  // Query Operations
  getItem: (id: string) => CartItem | undefined;
  hasItem: (id: string) => boolean;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  getItemsBySeller: (sellerId: string) => CartItem[];
  
  // Validation
  validateStock: (id: string, quantity: number) => boolean;
  setError: (error: string | null) => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      
      addItem: (item) => {
        const maxQuantity = 10;
        set((state) => {
          const existingItem = state.items.find(i => i.id === item.id);
          if (existingItem) {
            const newQuantity = existingItem.quantity + (item.quantity || 1);
            if (newQuantity > maxQuantity) {
              return {
                ...state,
                error: `Maksimal pembelian ${maxQuantity} item per produk`
              };
            }
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: newQuantity }
                  : i
              ),
              error: null
            };
          }
          
          if ((item.quantity || 1) > maxQuantity) {
            return {
              ...state,
              error: `Maksimal pembelian ${maxQuantity} item per produk`
            };
          }
          
          return { 
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
            error: null
          };
        });
      },
      
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(i => i.id !== id),
          error: null
        })),
      
      updateQuantity: (id, quantity) => {
        const maxQuantity = 10;
        if (quantity > maxQuantity) {
          set({ error: `Maksimal pembelian ${maxQuantity} item per produk` });
          return;
        }
        set((state) => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
          ).filter(i => i.quantity > 0),
          error: null
        }));
      },
      
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map(i =>
            i.id === id ? { ...i, ...updates } : i
          ),
          error: null
        })),
      
      clearCart: () => set({ items: [], error: null }),
      
      getItem: (id) => get().items.find(i => i.id === id),
      
      hasItem: (id) => get().items.some(i => i.id === id),
      
      getTotalPrice: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      
      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      
      getItemsBySeller: (sellerId) =>
        get().items.filter(i => i.sellerId === sellerId),
      
      validateStock: (id, quantity) => {
        const maxQuantity = 10;
        return quantity > 0 && quantity <= maxQuantity;
      },
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'thriftmap-cart',
      version: 1,
    }
  )
);
