import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated");
  const pathname = request.nextUrl.pathname;

  // Jika mengakses dashboard tapi belum login, redirect ke login
  if (pathname.startsWith("/dashboard-seller") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika sudah login tapi akses login page, redirect ke dashboard
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard-seller", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard-seller/:path*", "/login"],
};
