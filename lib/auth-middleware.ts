import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail, logAuthAttempt } from "@/lib/auth";

export type UserRole = "user" | "seller";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  shop?: {
    name: string;
    description?: string;
    createdAt: string;
  };
}

/**
 * Middleware to protect routes and verify user role
 * Extracts user info from request headers/cookies
 * @param req - NextRequest object
 * @param allowedRoles - Array of allowed roles, empty array allows all authenticated users
 * @returns User object if authenticated and authorized, null otherwise
 */
export async function verifyAuth(
  req: NextRequest,
  allowedRoles: UserRole[] = []
): Promise<AuthenticatedUser | null> {
  try {
    // Get auth header (Bearer token or user email)
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return null;
    }

    // Extract email from header (simple approach - should be replaced with JWT in production)
    // Format: "Bearer user@example.com:seller" or "Bearer user@example.com"
    const parts = authHeader.replace("Bearer ", "").split(":");
    const email = parts[0];
    const role = parts[1] as UserRole;

    if (!email) {
      return null;
    }

    // Verify user exists and role matches
    const user = await findUserByEmail(email);
    if (!user) {
      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
      logAuthAttempt(email, "AUTH_VERIFY", "failed", "User not found", ip);
      return null;
    }

    // Check role authorization
    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
      logAuthAttempt(email, "AUTH_VERIFY", "failed", `Unauthorized role: ${user.role}`, ip);
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      shop: user.shop ? {
        name: user.shop.name,
        createdAt: new Date().toISOString(),
      } : undefined,
    };
  } catch (error) {
    console.error("[AUTH VERIFY ERROR]", error);
    return null;
  }
}

/**
 * Middleware wrapper for protecting API routes
 * Returns 401 if not authenticated or 403 if role not authorized
 */
export async function protectRoute(
  req: NextRequest,
  allowedRoles: UserRole[] = []
): Promise<{ user: AuthenticatedUser | null; response: NextResponse | null }> {
  const user = await verifyAuth(req, allowedRoles);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return {
      user: null,
      response: NextResponse.json(
        { error: "Forbidden - insufficient permissions" },
        { status: 403 }
      ),
    };
  }

  return { user, response: null };
}

/**
 * Example usage in route handlers:
 *
 * // User-only route
 * const { user, response } = await protectRoute(req, ["user"]);
 * if (response) return response;
 * // user is guaranteed to exist here
 *
 * // Seller-only route
 * const { user, response } = await protectRoute(req, ["seller"]);
 * if (response) return response;
 * // user is guaranteed to exist and have seller role
 *
 * // Any authenticated user
 * const { user, response } = await protectRoute(req);
 * if (response) return response;
 * // user is guaranteed to exist
 */
