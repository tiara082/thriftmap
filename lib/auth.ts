import { hash, compare } from "bcryptjs";

// User types
type UserRole = "user" | "seller";

interface UserData {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: string;
  shop?: {
    name: string;
    city: string;
    rating: number;
    totalSales: number;
  };
}

// In-memory user store with logging (production: use database)
export const users: UserData[] = [
  {
    id: "seller-001",
    email: "seller@thriftmap.com",
    name: "Toko Thrift Anda",
    password: "$2a$10$WXrKO2tZiZ2Z2Z2Z2Z2Z2.3RXoqjVhY.42nd/8rHpTWrI/QCp7Bzq",
    role: "seller",
    createdAt: new Date().toISOString(),
    shop: {
      name: "Toko Thrift Anda",
      city: "Jakarta Selatan",
      rating: 4.8,
      totalSales: 156,
    },
  },
  {
    id: "user-001",
    email: "user@thriftmap.com",
    name: "Pembeli Thrift",
    password: "$2a$10$WXrKO2tZiZ2Z2Z2Z2Z2Z2.3RXoqjVhY.42nd/8rHpTWrI/QCp7Bzq",
    role: "user",
    createdAt: new Date().toISOString(),
  },
];

// Auth logs for tracking
export const authLogs: Array<{
  timestamp: string;
  email: string;
  action: string;
  status: "success" | "failed";
  ip?: string;
  reason?: string;
}> = [];

// Input validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) errors.push("Password minimal 8 karakter");
  if (password.length > 128) errors.push("Password maksimal 128 karakter");
  if (!/[A-Z]/.test(password)) errors.push("Password harus mengandung huruf besar");
  if (!/[a-z]/.test(password)) errors.push("Password harus mengandung huruf kecil");
  if (!/[0-9]/.test(password)) errors.push("Password harus mengandung angka");
  if (!/[!@#$%^&*]/.test(password)) errors.push("Password harus mengandung karakter spesial (!@#$%^&*)");

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateName(name: string): boolean {
  return name.length >= 2 && name.length <= 100 && /^[a-zA-Z\s\-'.]+$/i.test(name);
}

// Logging function
export function logAuthAttempt(
  email: string,
  action: string,
  status: "success" | "failed",
  reason?: string,
  ip?: string
) {
  authLogs.push({
    timestamp: new Date().toISOString(),
    email,
    action,
    status,
    ip,
    reason,
  });
  console.log(`[AUTH LOG] ${action} - ${email} - ${status} ${reason ? `(${reason})` : ""}`);
}

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

export async function findUserByEmail(email: string): Promise<UserData | undefined> {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export async function findUserByRole(email: string, role: UserRole): Promise<UserData | undefined> {
  const user = await findUserByEmail(email);
  return user && user.role === role ? user : undefined;
}

export async function authenticateUser(
  email: string,
  password: string,
  role?: UserRole
): Promise<Omit<UserData, "password"> | null> {
  const user = role ? await findUserByRole(email, role) : await findUserByEmail(email);

  if (!user) {
    logAuthAttempt(email, "LOGIN", "failed", "User tidak ditemukan");
    return null;
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    logAuthAttempt(email, "LOGIN", "failed", `Invalid password untuk ${user.role}`);
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  logAuthAttempt(email, "LOGIN", "success", `Role: ${user.role}`);
  return userWithoutPassword;
}

export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: UserRole
): Promise<{ success: boolean; message: string; user?: Omit<UserData, "password"> }> {
  // Validate inputs
  if (!validateEmail(email)) {
    logAuthAttempt(email, "REGISTER", "failed", "Invalid email format");
    return { success: false, message: "Email tidak valid" };
  }

  if (!validateName(name)) {
    logAuthAttempt(email, "REGISTER", "failed", "Invalid name format");
    return { success: false, message: "Nama tidak valid (2-100 karakter, hanya huruf/spasi)" };
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.valid) {
    logAuthAttempt(email, "REGISTER", "failed", passwordValidation.errors.join("; "));
    return { success: false, message: passwordValidation.errors.join(", ") };
  }

  // Check if email already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    logAuthAttempt(email, "REGISTER", "failed", `Email sudah terdaftar sebagai ${existingUser.role}`);
    return { success: false, message: "Email sudah terdaftar" };
  }

  // Hash password and create user
  const hashedPassword = await hashPassword(password);
  const newUser: UserData = {
    id: `${role}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email: email.toLowerCase(),
    name,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString(),
    ...(role === "seller" && {
      shop: {
        name: name,
        city: "",
        rating: 0,
        totalSales: 0,
      },
    }),
  };

  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  logAuthAttempt(email, "REGISTER", "success", `Role: ${role}`);

  return {
    success: true,
    message: `Registrasi ${role === "seller" ? "seller" : "pembeli"} berhasil`,
    user: userWithoutPassword,
  };
}
