"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = localStorage.getItem("isAuthenticated");
      const user = localStorage.getItem("user");
      
      if (isAuth !== "true" || !user) {
        // Redirect ke login yang sesuai berdasarkan path
        if (pathname?.startsWith("/dashboard-seller")) {
          router.push("/login-seller");
        } else if (pathname?.startsWith("/dashboard-user")) {
          router.push("/login-user");
        } else {
          router.push("/login-user"); // Default ke login-user
        }
      } else {
        setIsAuthorized(true);
      }
      
      setIsLoading(false);
    };

    // Small delay untuk memastikan localStorage ready
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Mempersiapkan dashboard..." />
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
