import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  label: string;
  isDefault: boolean;
  createdAt: string;
}

interface AddressStore {
  addresses: Address[];
  
  // CRUD Operations
  addAddress: (address: Omit<Address, 'id' | 'createdAt'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  
  // Query Operations
  getAddress: (id: string) => Address | undefined;
  getDefaultAddress: () => Address | undefined;
  getAllAddresses: () => Address[];
}

export const useAddress = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      
      addAddress: (address) =>
        set((state) => {
          const newAddress: Address = {
            ...address,
            id: `addr_${Date.now()}`,
            createdAt: new Date().toISOString(),
            isDefault: state.addresses.length === 0 ? true : address.isDefault
          };
          
          // If new address is default, unset others
          const updatedAddresses = address.isDefault
            ? state.addresses.map(a => ({ ...a, isDefault: false }))
            : state.addresses;
          
          return { addresses: [...updatedAddresses, newAddress] };
        }),
      
      updateAddress: (id, updates) =>
        set((state) => {
          const addresses = state.addresses.map(a =>
            a.id === id ? { ...a, ...updates } : a
          );
          
          // If updating default status, unset others
          if (updates.isDefault) {
            return {
              addresses: addresses.map(a =>
                a.id === id ? a : { ...a, isDefault: false }
              )
            };
          }
          
          return { addresses };
        }),
      
      removeAddress: (id) =>
        set((state) => {
          const addresses = state.addresses.filter(a => a.id !== id);
          const wasDefault = state.addresses.find(a => a.id === id)?.isDefault;
          
          // If removed address was default, set first address as default
          if (wasDefault && addresses.length > 0) {
            addresses[0].isDefault = true;
          }
          
          return { addresses };
        }),
      
      setDefaultAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.map(a => ({
            ...a,
            isDefault: a.id === id
          }))
        })),
      
      getAddress: (id) => get().addresses.find(a => a.id === id),
      
      getDefaultAddress: () => get().addresses.find(a => a.isDefault),
      
      getAllAddresses: () => get().addresses,
    }),
    {
      name: 'thriftmap-addresses',
      version: 1,
    }
  )
);
