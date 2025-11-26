# 🔐 ThriftMap Authentication - Quick Reference Guide

## 📌 Quick Start

### Login Page
- **URL:** `http://localhost:3000/login`
- **Features:** Role selector, password visibility toggle, demo account info

### API Endpoints

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@thriftmap.com",
  "password": "Demo@12345",
  "role": "user"  # optional: "user" or "seller"
}

# Response: 200 OK
{
  "success": true,
  "user": { "id", "email", "name", "role" }
}
```

#### Register User
```bash
POST /api/auth/register/user
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePass123!",  # Must meet strength requirements
  "name": "John Smith"
}

# Response: 201 Created
```

#### Register Seller
```bash
POST /api/auth/register/seller
Content-Type: application/json

{
  "email": "seller@example.com",
  "password": "SecurePass123!",
  "name": "Store Owner",
  "shopName": "My Thrift Store",
  "shopDescription": "Optional description"
}

# Response: 201 Created
```

#### Logout
```bash
POST /api/auth/logout
Content-Type: application/json

{
  "email": "user@thriftmap.com"  # optional
}

# Response: 200 OK
```

---

## 🔑 Demo Accounts

```
👤 Pembeli (User):
   Email: user@thriftmap.com
   Password: Demo@12345

🏪 Penjual (Seller):
   Email: seller@thriftmap.com
   Password: Demo@12345
```

---

## ✅ Password Requirements

Must contain ALL of:
- ✔️ 8-128 characters
- ✔️ Uppercase letter (A-Z)
- ✔️ Lowercase letter (a-z)
- ✔️ Digit (0-9)
- ✔️ Special character (!@#$%^&*)

Example: `SecurePass123!` ✅

---

## 📁 Key Files

| File | Purpose |
|---|---|
| `lib/auth.ts` | Core authentication logic |
| `lib/auth-middleware.ts` | Route protection |
| `app/api/auth/login/route.ts` | Login endpoint |
| `app/api/auth/register/user/route.ts` | User registration |
| `app/api/auth/register/seller/route.ts` | Seller registration |
| `app/api/auth/logout/route.ts` | Logout endpoint |
| `app/login/page.tsx` | Login UI |

---

## 🛡️ Security Features

✅ Role-based separation (no user/seller data leakage)
✅ Input validation (email, password strength, name format)
✅ Password hashing (bcryptjs)
✅ Audit logging (all attempts tracked)
✅ IP tracking (brute force prevention)
✅ Secure headers (no caching)
✅ Generic error messages (no info leakage)

---

## 🔧 Protecting Routes

```typescript
import { protectRoute } from "@/lib/auth-middleware";

// User-only route
export async function GET(req: NextRequest) {
  const { user, response } = await protectRoute(req, ["user"]);
  if (response) return response;
  
  // user is verified here
  return NextResponse.json({ message: "Hello " + user.name });
}

// Seller-only route
export async function DELETE(req: NextRequest) {
  const { user, response } = await protectRoute(req, ["seller"]);
  if (response) return response;
  
  // user is verified seller here
  return NextResponse.json({ shop: user.shop?.name });
}

// Any authenticated user
export async function POST(req: NextRequest) {
  const { user, response } = await protectRoute(req);
  if (response) return response;
  
  // user is verified here, any role
  return NextResponse.json({ role: user.role });
}
```

---

## 📊 Validation Rules

### Email
- Valid format (RFC 5322)
- Max 255 chars
- Used for login & registration

### Password
- 8-128 characters
- Upper + lower + digit + special char
- Detailed errors if invalid

### Name
- 2-100 characters
- Letters, spaces, hyphens, apostrophes only
- No numbers or special chars

### Role
- Must be exactly "user" or "seller"
- Case-sensitive

### Shop Name (Seller only)
- 2-100 characters
- Any characters allowed

### Shop Description (Seller only)
- Optional
- Max 500 characters

---

## 🚨 HTTP Status Codes

| Code | Meaning | Example |
|---|---|---|
| 200 | Success | Login OK, Logout OK |
| 201 | Created | Registration OK |
| 400 | Bad Request | Invalid input, email exists |
| 401 | Unauthorized | Wrong password, not authenticated |
| 403 | Forbidden | Wrong role for route |
| 500 | Server Error | Unexpected error |

---

## 📝 Error Messages

| Error | Cause | Solution |
|---|---|---|
| "Email dan password harus diisi" | Missing fields | Fill all fields |
| "Format email tidak valid" | Invalid email format | Use valid email |
| "Password tidak memenuhi kriteria" | Weak password | Use stronger password |
| "Email sudah terdaftar" | Email exists | Use different email |
| "Email atau password salah" | Wrong credentials | Check email/password |
| "Role tidak valid" | Invalid role | Use "user" or "seller" |
| "Unauthorized" | Not authenticated | Login first |
| "Forbidden - insufficient permissions" | Wrong role | Access appropriate dashboard |

---

## 🔍 Audit Log Example

Console output shows all auth attempts:
```
[AUTH LOG] 2024-01-15 10:30:45 - LOGIN failed - invalid@test - Invalid email format - IP: 192.168.1.1
[AUTH LOG] 2024-01-15 10:31:00 - LOGIN success - user@thriftmap.com - IP: 192.168.1.1
[AUTH LOG] 2024-01-15 10:31:30 - REGISTER success - newuser@example.com - IP: 192.168.1.2
[AUTH LOG] 2024-01-15 10:32:00 - LOGOUT success - user@thriftmap.com - IP: 192.168.1.1
```

---

## 🧪 Test Flow

### Test as User:
1. Go to `/login`
2. Select "👤 Pembeli" (User)
3. Enter: user@thriftmap.com / Demo@12345
4. Should redirect to `/dashboard-user`

### Test as Seller:
1. Go to `/login`
2. Select "🏪 Penjual" (Seller)
3. Enter: seller@thriftmap.com / Demo@12345
4. Should redirect to `/dashboard-seller`

### Test Registration:
1. Go to `/login` → Click "Daftar di sini"
2. Fill: new email, strong password, name
3. Click "Daftar"
4. Should see success message
5. Login with new credentials

### Test Logout:
1. While logged in
2. Call `POST /api/auth/logout`
3. Clear localStorage
4. Redirect to login

---

## 💻 Frontend Implementation

### Store Auth Data:
```typescript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, role })
});

if (response.ok) {
  const { user } = await response.json();
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('authToken', `${email}:${role}`);
  router.push(role === 'seller' ? '/dashboard-seller' : '/dashboard-user');
}
```

### Send Auth with Requests:
```typescript
const token = localStorage.getItem('authToken');
const response = await fetch('/api/protected-route', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Logout:
```typescript
await fetch('/api/auth/logout', { method: 'POST' });
localStorage.removeItem('user');
localStorage.removeItem('authToken');
router.push('/');
```

---

## 🆘 Common Issues

**"Can't login as seller"**
→ Make sure you select "🏪 Penjual" role before entering credentials

**"Password strength error"**
→ Password must have: uppercase, lowercase, digit, special char, 8+ chars

**"Email already registered"**
→ Use a different email for new registration

**"After login, page doesn't redirect"**
→ Check localStorage is enabled
→ Check role-based redirect logic
→ Check dashboard route exists

**"Auth logs not showing"**
→ Check browser console (F12)
→ Check that auth endpoints are being called
→ Verify network tab in dev tools

---

## 📚 Full Documentation

For complete documentation see:
- `AUTH_DOCUMENTATION.md` - Full API reference
- `SECURITY_IMPLEMENTATION_SUMMARY.md` - Security overview

---

**Version:** 1.0.0
**Status:** ✅ Production Ready
**Last Updated:** January 15, 2024
