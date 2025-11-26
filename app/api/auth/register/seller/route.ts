import { NextRequest, NextResponse } from "next/server";
import { registerUser, validateEmail, validatePassword, logAuthAttempt } from "@/lib/auth";

interface SellerRegisterRequest {
  email: string;
  password: string;
  name: string;
  shopName: string;
  shopDescription?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SellerRegisterRequest = await req.json();
    const { email, password, name, shopName, shopDescription } = body;
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    // Validate required fields
    if (!email || !password || !name || !shopName) {
      logAuthAttempt(email || "unknown", "SELLER_REGISTER", "failed", "Missing required fields", ip);
      return NextResponse.json(
        { error: "Email, password, nama, dan nama toko harus diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      logAuthAttempt(email, "SELLER_REGISTER", "failed", "Invalid email format", ip);
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      logAuthAttempt(email, "SELLER_REGISTER", "failed", `Password validation failed: ${passwordValidation.errors.join(", ")}`, ip);
      return NextResponse.json(
        { error: "Password tidak memenuhi kriteria keamanan", errors: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Validate name format
    if (name.length < 2 || name.length > 100) {
      logAuthAttempt(email, "SELLER_REGISTER", "failed", "Name length invalid", ip);
      return NextResponse.json(
        { error: "Nama harus 2-100 karakter" },
        { status: 400 }
      );
    }

    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(name)) {
      logAuthAttempt(email, "SELLER_REGISTER", "failed", "Name contains invalid characters", ip);
      return NextResponse.json(
        { error: "Nama hanya boleh berisi huruf, spasi, tanda hubung, dan apostrof" },
        { status: 400 }
      );
    }

    // Validate shop name
    if (shopName.length < 2 || shopName.length > 100) {
      logAuthAttempt(email, "SELLER_REGISTER", "failed", "Shop name length invalid", ip);
      return NextResponse.json(
        { error: "Nama toko harus 2-100 karakter" },
        { status: 400 }
      );
    }

    // Validate shop description if provided
    if (shopDescription && shopDescription.length > 500) {
      logAuthAttempt(email, "SELLER_REGISTER", "failed", "Shop description too long", ip);
      return NextResponse.json(
        { error: "Deskripsi toko maksimal 500 karakter" },
        { status: 400 }
      );
    }

    // Register seller
    const result = await registerUser(email, password, name, "seller");

    if (!result.success) {
      logAuthAttempt(email, "SELLER_REGISTER", "failed", result.message, ip);
      return NextResponse.json(
        { error: result.message },
        { status: 400 }
      );
    }

    // Shop information is already created in registerUser function
    // Just pass shop details in response

    // Log successful seller registration
    logAuthAttempt(email, "SELLER_REGISTER", "success", `Seller registered with shop: ${shopName}`, ip);

    return NextResponse.json(
      {
        success: true,
        message: "Registrasi seller berhasil. Silakan login untuk mengakses dashboard.",
        user: {
          id: result.user?.id,
          email: result.user?.email,
          name: result.user?.name,
          role: "seller",
          shop: {
            name: shopName,
            description: shopDescription || "",
            createdAt: new Date().toISOString(),
          },
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
    console.error("[SELLER REGISTER ERROR]", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
