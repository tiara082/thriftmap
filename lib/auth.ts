import { hash, compare } from "bcryptjs";

// Simple in-memory user store (dalam production gunakan database real)
export const users = [
  {
    id: "seller-001",
    email: "seller@thriftmap.com",
    name: "Toko Thrift Anda",
    password: "$2b$10$UXPleqwfsxdGuAS0pQJg6.3RXoqjVhY.42nd/8rHpTWrI/QCp7Bzq", // password: "123456" (newly generated)
    shop: {
      name: "Toko Thrift Anda",
      city: "Jakarta Selatan",
      rating: 4.8,
      totalSales: 156,
    },
  },
];

export async function hashPassword(password: string) {
  return hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword);
}

export async function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export async function authenticateUser(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
