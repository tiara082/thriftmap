import { NextRequest, NextResponse } from "next/server";
import { registerUser, validateEmail, validatePassword, logAuthAttempt } from "@/lib/auth";

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RegisterRequest = await req.json();
    const { email, password, name } = body;
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Validate required fields
    if (!email || !password || !name) {
      logAuthAttempt(email || "unknown", "REGISTER", "failed", "Missing required fields", ip);
      return NextResponse.json(
        { error: "Email, password, dan nama harus diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      logAuthAttempt(email, "REGISTER", "failed", "Invalid email format", ip);
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      logAuthAttempt(email, "REGISTER", "failed", `Password validation failed: ${passwordValidation.errors.join(", ")}`, ip);
      return NextResponse.json(
        { error: "Password tidak memenuhi kriteria keamanan", errors: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Validate name format
    if (name.length < 2 || name.length > 100) {
      logAuthAttempt(email, "REGISTER", "failed", "Name length invalid", ip);
      return NextResponse.json(
        { error: "Nama harus 2-100 karakter" },
        { status: 400 }
      );
    }

    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(name)) {
      logAuthAttempt(email, "REGISTER", "failed", "Name contains invalid characters", ip);
      return NextResponse.json(
        { error: "Nama hanya boleh berisi huruf, spasi, tanda hubung, dan apostrof" },
        { status: 400 }
      );
    }

    // Register user
    const result = await registerUser(email, password, name, "user");

    if (!result.success) {
      logAuthAttempt(email, "REGISTER", "failed", result.message, ip);
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Log successful registration
    logAuthAttempt(email, "REGISTER", "success", "User registered successfully", ip);

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi berhasil. Silakan login.",
        user: {
          id: result.user?.id,
          email: result.user?.email,
          name: result.user?.name,
          role: "user",
        },
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
          "Pragma": "no-cache",
        },
      }
    );
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
