// Storage utility untuk manage products, orders, dan data lainnya
// Data disimpan di localStorage dengan fallback ke mock data

import { Product, SellerOrder, CurationHistory } from "./seller-state";

const STORAGE_KEYS = {
  PRODUCTS: "thriftmap_products",
  ORDERS: "thriftmap_orders",
  CURATION_HISTORY: "thriftmap_curation_history",
  USER_PREFERENCES: "thriftmap_preferences",
};

// Initialize localStorage dengan mock data jika kosong
export function initializeStorage() {
  if (typeof window === "undefined") return;

  // Check if data already exists
  const existingProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  if (!existingProducts) {
    // Import mock data
    const { mockProducts, mockOrders, mockCurationHistory } = require("./seller-state");
    
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(mockProducts));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(mockOrders));
    localStorage.setItem(STORAGE_KEYS.CURATION_HISTORY, JSON.stringify(mockCurationHistory));
  }
}

// PRODUCTS
export function getProducts(): Product[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading products:", error);
    return [];
  }
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products:", error);
  }
}

export function addProduct(product: Product): Product {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
  return product;
}

export function updateProduct(productId: string, updatedProduct: Partial<Product>): Product | null {
  const products = getProducts();
  const index = products.findIndex(p => p.id === productId);
  
  if (index === -1) return null;
  
  const updated = { ...products[index], ...updatedProduct };
  products[index] = updated;
  saveProducts(products);
  return updated;
}

export function deleteProduct(productId: string): boolean {
  const products = getProducts();
  const filtered = products.filter(p => p.id !== productId);
  
  if (filtered.length === products.length) return false;
  
  saveProducts(filtered);
  return true;
}

// ORDERS
export function getOrders(): SellerOrder[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading orders:", error);
    return [];
  }
}

export function saveOrders(orders: SellerOrder[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (error) {
    console.error("Error saving orders:", error);
  }
}

export function addOrder(order: SellerOrder): SellerOrder {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
  return order;
}

export function updateOrder(orderId: string, updatedOrder: Partial<SellerOrder>): SellerOrder | null {
  const orders = getOrders();
  const index = orders.findIndex(o => o.id === orderId);
  
  if (index === -1) return null;
  
  const updated = { ...orders[index], ...updatedOrder };
  orders[index] = updated;
  saveOrders(orders);
  return updated;
}

// CURATION HISTORY
export function getCurationHistory(): CurationHistory[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURATION_HISTORY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading curation history:", error);
    return [];
  }
}

export function saveCurationHistory(history: CurationHistory[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.CURATION_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error("Error saving curation history:", error);
  }
}

export function addCurationHistory(entry: CurationHistory): CurationHistory {
  const history = getCurationHistory();
  history.push(entry);
  saveCurationHistory(history);
  return entry;
}

// PREFERENCES
export function getPreferences() {
  if (typeof window === "undefined") return {};
  
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error reading preferences:", error);
    return {};
  }
}

export function savePreferences(preferences: Record<string, any>): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(preferences));
  } catch (error) {
    console.error("Error saving preferences:", error);
  }
}

// Clear all storage (untuk logout)
export function clearStorage(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.CURATION_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
}
