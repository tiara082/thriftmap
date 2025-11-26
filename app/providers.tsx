"use client"

import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "sonner"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster 
        position="top-right"
        expand={true}
        richColors
        closeButton
        duration={4000}
      />
    </AuthProvider>
  )
}
