import { NextRequest, NextResponse } from "next/server";
import { logAuthAttempt } from "@/lib/auth";

interface LogoutRequest {
  email?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LogoutRequest = await req.json().catch(() => ({}));
    const email = body.email || "unknown";
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Log logout attempt
    logAuthAttempt(email, "LOGOUT", "success", "User logged out", ip);

    return NextResponse.json(
      {
        success: true,
        message: "Logout berhasil",
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
    console.error("[LOGOUT ERROR]", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
