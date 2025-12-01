"use client";

import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";

interface DashboardUserLayoutProps {
  children: ReactNode;
}

export default function DashboardUserLayout({ children }: DashboardUserLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}