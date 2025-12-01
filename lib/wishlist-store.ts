import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  condition?: string;
  shopName?: string;
  sellerId?: string;
  addedAt: string;
}

interface WishlistStore {
  items: WishlistItem[];
  isLoading: boolean;
  error: string | null;
  
  // CRUD Operations
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => boolean;
  
  // Query Operations
  hasItem: (id: string) => boolean;
  getItem: (id: string) => WishlistItem | undefined;
  getTotalItems: () => number;
  getTotalValue: () => number;
  
  // Utility
  setError: (error: string | null) => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      
      addItem: (item) =>
        set((state) => {
          const exists = state.items.some(i => i.id === item.id);
          if (exists) {
            return {
              ...state,
              error: 'Produk sudah ada di wishlist'
            };
          }
          return {
            items: [...state.items, { ...item, addedAt: new Date().toISOString() }],
            error: null
          };
        }),
      
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(i => i.id !== id),
          error: null
        })),
      
      clearWishlist: () => set({ items: [], error: null }),
      
      toggleItem: (item) => {
        const state = get();
        const exists = state.items.some(i => i.id === item.id);
        
        if (exists) {
          set((state) => ({
            items: state.items.filter(i => i.id !== item.id),
            error: null
          }));
          return false; // Removed
        } else {
          set((state) => ({
            items: [...state.items, { ...item, addedAt: new Date().toISOString() }],
            error: null
          }));
          return true; // Added
        }
      },
      
      hasItem: (id) => get().items.some(i => i.id === id),
      
      getItem: (id) => get().items.find(i => i.id === id),
      
      getTotalItems: () => get().items.length,
      
      getTotalValue: () =>
        get().items.reduce((sum, item) => sum + item.price, 0),
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'thriftmap-wishlist',
      version: 1,
    }
  )
);
