"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Shop {
  name: string;
  city: string;
  rating: number;
  totalSales: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  shop: Shop;
  role?: 'buyer' | 'seller';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user dari localStorage saat mount
    const savedUser = localStorage.getItem("user");
    const isAuth = localStorage.getItem("isAuthenticated");

    if (savedUser && isAuth === "true") {
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    document.cookie = "isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
