import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const isAuthenticated = request.cookies.get("isAuthenticated");
  const pathname = request.nextUrl.pathname;

  // Jika mengakses dashboard seller tapi belum login, redirect ke login-seller
  if (pathname.startsWith("/dashboard-seller") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login-seller", request.url));
  }

  // Jika mengakses dashboard user tapi belum login, redirect ke login-user
  if (pathname.startsWith("/dashboard-user") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login-user", request.url));
  }

  // Jika sudah login tapi akses login-seller page, redirect ke dashboard-seller
  if (pathname === "/login-seller" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard-seller", request.url));
  }

  // Jika sudah login tapi akses login-user page, redirect ke dashboard-user
  if (pathname === "/login-user" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard-user", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard-seller/:path*", "/dashboard-user/:path*", "/login-seller", "/login-user"],
};
