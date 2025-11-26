import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, validateEmail, logAuthAttempt } from "@/lib/auth";

type UserRole = "user" | "seller";

interface LoginRequest {
  email: string;
  password: string;
  role?: UserRole;
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequest = await req.json();
    const { email, password, role } = body;
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Validate required fields
    if (!email || !password) {
      logAuthAttempt(email || "unknown", "LOGIN", "failed", "Missing credentials", ip);
      return NextResponse.json(
        { error: "Email dan password harus diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      logAuthAttempt(email, "LOGIN", "failed", "Invalid email format", ip);
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8 || password.length > 128) {
      logAuthAttempt(email, "LOGIN", "failed", "Invalid password length", ip);
      return NextResponse.json(
        { error: "Password tidak valid" },
        { status: 400 }
      );
    }

    // Validate role if provided
    const validRoles: UserRole[] = ["user", "seller"];
    if (role && !validRoles.includes(role)) {
      logAuthAttempt(email, "LOGIN", "failed", `Invalid role: ${role}`, ip);
      return NextResponse.json(
        { error: "Role tidak valid" },
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await authenticateUser(email, password, role);

    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Secure response - don't expose sensitive data
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          shop: user.role === "seller" ? user.shop : undefined,
        },
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("[AUTH ERROR]", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
