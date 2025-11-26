# 🔐 ThriftMap Authentication System - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                              │
│                    (Next.js Frontend)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │  Login Page  │  │ Register     │  │ Dashboards   │           │
│  │   /login     │  │   /register  │  │ (Protected)  │           │
│  └────────┬─────┘  └──────┬───────┘  └──────┬───────┘           │
│           │                │                 │                   │
│           └────────────────┴─────────────────┘                   │
│                     │                                             │
│              ┌──────▼──────┐                                      │
│              │ localStorage │                                     │
│              │ - user info  │                                     │
│              │ - authToken  │                                     │
│              └──────────────┘                                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                         │ HTTPS
                         │ Fetch API
                         │
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND SIDE                                │
│                   (Next.js API Routes)                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           API Endpoints (Route Handlers)                  │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  POST /api/auth/login                                     │  │
│  │  ├─ Validate email format                                 │  │
│  │  ├─ Validate password length                              │  │
│  │  ├─ Validate role (user|seller)                           │  │
│  │  ├─ Check user exists                                     │  │
│  │  ├─ Verify password (bcryptjs)                            │  │
│  │  ├─ Log attempt (IP tracking)                             │  │
│  │  └─ Return user data (no password)                        │  │
│  │                                                             │  │
│  │  POST /api/auth/register/user                             │  │
│  │  ├─ Validate all inputs                                   │  │
│  │  ├─ Check email uniqueness                                │  │
│  │  ├─ Hash password (bcryptjs)                              │  │
│  │  ├─ Create user                                           │  │
│  │  ├─ Log registration (IP tracking)                        │  │
│  │  └─ Return new user data                                  │  │
│  │                                                             │  │
│  │  POST /api/auth/register/seller                           │  │
│  │  ├─ All user registration steps                           │  │
│  │  ├─ Validate shop info                                    │  │
│  │  ├─ Create shop profile                                   │  │
│  │  └─ Return seller + shop data                             │  │
│  │                                                             │  │
│  │  POST /api/auth/logout                                    │  │
│  │  ├─ Log logout event                                      │  │
│  │  └─ Return success                                        │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                        │
│                          ▼                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │         Authentication Module (lib/auth.ts)              │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  Validation Functions:                                    │  │
│  │  ├─ validateEmail()     → Regex + length check            │  │
│  │  ├─ validatePassword()  → Strength check (5 rules)        │  │
│  │  └─ validateName()      → Format + length check           │  │
│  │                                                             │  │
│  │  Core Auth Functions:                                     │  │
│  │  ├─ authenticateUser()  → Verify credentials              │  │
│  │  ├─ registerUser()      → Create new user                 │  │
│  │  ├─ findUserByEmail()   → Email lookup                    │  │
│  │  ├─ findUserByRole()    → Role-specific lookup            │  │
│  │  └─ hashPassword()      → bcryptjs hashing                │  │
│  │                                                             │  │
│  │  Logging:                                                 │  │
│  │  └─ logAuthAttempt()    → Audit trail                     │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                        │
│                          ▼                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │      Route Protection Middleware (lib/auth-middleware)   │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  protectRoute(req, allowedRoles)                          │  │
│  │  ├─ Extract auth from request headers                     │  │
│  │  ├─ Verify user exists                                    │  │
│  │  ├─ Check role authorization                              │  │
│  │  ├─ Log auth attempt                                      │  │
│  │  └─ Return user or error response                         │  │
│  │                                                             │  │
│  │  verifyAuth(req, allowedRoles)                            │  │
│  │  └─ Verify without returning response                     │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                          │                                        │
│                          ▼                                        │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │           In-Memory User Database                         │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  users: UserData[] = [                                    │  │
│  │    {                                                       │  │
│  │      id: "user_123",                                      │  │
│  │      email: "user@thriftmap.com",                         │  │
│  │      name: "John Doe",                                    │  │
│  │      password: "hashed_password_bcrypt",                  │  │
│  │      role: "user",                                        │  │
│  │      createdAt: "2024-01-15T10:00:00Z"                    │  │
│  │    },                                                      │  │
│  │    {                                                       │  │
│  │      id: "seller_50",                                     │  │
│  │      email: "seller@thriftmap.com",                       │  │
│  │      name: "Ahmed Store",                                 │  │
│  │      password: "hashed_password_bcrypt",                  │  │
│  │      role: "seller",                                      │  │
│  │      createdAt: "2024-01-15T10:00:00Z",                   │  │
│  │      shop: {                                              │  │
│  │        name: "Ahmed's Thrift",                            │  │
│  │        city: "Jakarta",                                   │  │
│  │        rating: 4.8,                                       │  │
│  │        totalSales: 150                                    │  │
│  │      }                                                     │  │
│  │    }                                                       │  │
│  │  ]                                                         │  │
│  │                                                             │  │
│  │  authLogs: AuthLog[] = [                                  │  │
│  │    Track all auth attempts with timestamp, IP, etc.       │  │
│  │  ]                                                         │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              Security Features                            │  │
│  ├───────────────────────────────────────────────────────────┤  │
│  │                                                             │  │
│  │  ✅ Password Hashing      → bcryptjs (10 salt rounds)     │  │
│  │  ✅ Input Validation       → Email, password, name        │  │
│  │  ✅ Audit Logging          → All attempts tracked         │  │
│  │  ✅ IP Tracking            → x-forwarded-for header       │  │
│  │  ✅ Secure Headers         → Cache-Control, Pragma        │  │
│  │  ✅ Role Separation        → User vs Seller isolated      │  │
│  │  ✅ Generic Errors         → No info leakage              │  │
│  │  ✅ Route Protection       → Middleware for dashboards    │  │
│  │                                                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Authentication Flow Diagram

```
                            START
                              │
                              ▼
                    ┌─────────────────┐
                    │  Visit /login   │
                    └────────┬────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │ Select Role          │
                  │ 👤 Pembeli / 🏪 Penjual │
                  └────────┬─────────────┘
                           │
                           ▼
                  ┌──────────────────────┐
                  │ Enter Email          │
                  │ & Password           │
                  └────────┬─────────────┘
                           │
                           ▼
                  ┌──────────────────────┐
         ┌────────│ Submit Form          │
         │        └──────────────────────┘
         │               │
         │               ▼
         │    ┌──────────────────────────┐
         │    │ POST /api/auth/login     │
         │    └────────┬─────────────────┘
         │             │
         │             ▼
         │    ┌──────────────────────────┐
         │    │ Validate Input:          │
         │    │ • Email format           │
         │    │ • Password length        │
         │    │ • Role valid             │
         │    └────────┬─────────────────┘
         │             │
         │    ┌────────┴─────────┐
         │    │                  │
         │    ▼                  ▼
         │  VALID            INVALID
         │    │                  │
         │    ▼                  ▼
         │  Check User      Return 400
         │  Exists          + Log Attempt
         │    │
         │    ├─ Not Found
         │    │    ├─ Log failure: "User not found"
         │    │    └─ Return 401
         │    │
         │    └─ Found
         │         ▼
         │     Verify Password
         │     (bcryptjs)
         │         │
         │    ┌────┴────┐
         │    │          │
         │    ▼          ▼
         │  CORRECT    WRONG
         │    │          │
         │    ▼          ▼
         │  Success  Log: "Invalid password"
         │    │      Return 401
         │    │
         │    ▼
         │  Log: "LOGIN success"
         │    │
         │    ▼
         │  Return 200 + User Data
         │    │ (no password included)
         │    │
         └────┤
              │
              ▼
    ┌──────────────────────────┐
    │ Store in localStorage:   │
    │ • user data              │
    │ • authToken              │
    └────────┬─────────────────┘
             │
             ▼
    ┌──────────────────────────┐
    │ Redirect to Dashboard:   │
    │ • user   → /dashboard-user    │
    │ • seller → /dashboard-seller  │
    └────────┬─────────────────┘
             │
             ▼
    ┌──────────────────────────┐
    │ Dashboard Middleware:    │
    │ • protectRoute()         │
    │ • Verify auth header     │
    │ • Check role             │
    │ • Allow access           │
    └────────┬─────────────────┘
             │
             ▼
          SUCCESS ✅
```

---

## Data Flow for Registration

```
┌─────────────────────────────────────────────────────┐
│               User Registration Form                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Email:        newuser@example.com                 │
│  Password:     SecurePass123!                       │
│  Name:         John Doe                            │
│  ShopName:     (optional for seller)               │
│                                                     │
│  [Submit]                                          │
│     │                                              │
│     ▼                                              │
│  POST /api/auth/register/{user|seller}             │
│     │                                              │
│     ▼                                              │
│  ┌─ Validate Email                                 │
│  │  • Format check                                 │
│  │  • Max 255 chars                                │
│  │  • Return 400 if invalid                        │
│  │                                                  │
│  ├─ Validate Password                              │
│  │  • 8-128 characters ✓                           │
│  │  • Uppercase letter ✓                           │
│  │  • Lowercase letter ✓                           │
│  │  • Digit ✓                                      │
│  │  • Special char ✓                               │
│  │  • Return 400 + detailed errors if invalid      │
│  │                                                  │
│  ├─ Validate Name                                  │
│  │  • 2-100 characters ✓                           │
│  │  • Letters/spaces/hyphens/apostrophes only ✓    │
│  │  • Return 400 if invalid                        │
│  │                                                  │
│  ├─ Check Email Uniqueness                         │
│  │  • Search in users array                        │
│  │  • Return 400 "Email sudah terdaftar" if exists │
│  │                                                  │
│  ├─ Hash Password                                  │
│  │  • bcryptjs.hash(password, 10 rounds)           │
│  │  • Store hashed version only                    │
│  │                                                  │
│  ├─ Create User Object                             │
│  │  • Generate unique ID                           │
│  │  • Set role ("user" or "seller")                │
│  │  • If seller: create shop object                │
│  │                                                  │
│  ├─ Save to Database                               │
│  │  • Add to users array                           │
│  │                                                  │
│  ├─ Log Registration                               │
│  │  • logAuthAttempt(email, "REGISTER", "success") │
│  │  • Include IP address                           │
│  │                                                  │
│  └─ Return 201 + User Data                         │
│     • Include id, email, name, role                │
│     • DON'T include password                       │
│     • For sellers: include shop info               │
│                                                     │
│     ▼                                              │
│  Client stores in localStorage                     │
│     │                                              │
│     └─ Redirect to /login with message            │
│        "Registrasi berhasil. Silakan login."      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│                   INPUT VALIDATION LAYER                    │
├─────────────────────────────────────────────────────────────┤
│ Email         │ Format (RFC 5322) + Max 255 chars          │
│ Password      │ 8-128 chars + Upper + Lower + Digit + Special│
│ Name          │ 2-100 chars + Letters/spaces/hyphens/quotes  │
│ Role          │ Exactly "user" or "seller"                  │
│ Shop Name     │ 2-100 chars                                 │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION LAYER                      │
├─────────────────────────────────────────────────────────────┤
│ Email Lookup  │ Case-insensitive search in users array      │
│ Password Verify│ bcryptjs.compare() for constant-time check │
│ Role Check    │ Verify role matches if role-specific flow  │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   HASHING & STORAGE LAYER                   │
├─────────────────────────────────────────────────────────────┤
│ Password      │ bcryptjs.hash(password, 10 rounds)          │
│ Storage       │ Hashed password stored, never plaintext      │
│ Comparison    │ Constant-time comparison to prevent timing  │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   RESPONSE SECURITY LAYER                   │
├─────────────────────────────────────────────────────────────┤
│ No Password   │ Never include password in response          │
│ Safe Headers  │ Cache-Control: no-store, Pragma: no-cache   │
│ Generic Errors│ "Email atau password salah" - no info leak  │
│ Status Codes  │ Proper HTTP status (400, 401, 403, 500)    │
└─────────────────────────────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   AUDIT & MONITORING LAYER                  │
├─────────────────────────────────────────────────────────────┤
│ Logging       │ All attempts logged with timestamp          │
│ IP Tracking   │ Capture client IP for brute force detection │
│ Status        │ Track success/failure + reason              │
│ Action Type   │ LOGIN, REGISTER, LOGOUT, AUTH_VERIFY        │
└─────────────────────────────────────────────────────────────┘
```

---

## Role Separation Architecture

```
                        LOGIN REQUEST
                              │
                              ▼
                ┌─────────────────────────┐
                │  Is role = "user"?      │
                └────┬───────────────┬────┘
                     │               │
                  YES│               │NO
                     │               │
                     ▼               ▼
            ┌────────────────┐   ┌────────────────┐
            │ User Path      │   │ Seller Path    │
            ├────────────────┤   ├────────────────┤
            │ • Find user    │   │ • Find seller  │
            │ • Verify pass  │   │ • Verify pass  │
            │ • Check role   │   │ • Check role   │
            │   = "user"     │   │   = "seller"   │
            │ • Log attempt  │   │ • Log attempt  │
            │ • Return user  │   │ • Return seller│
            │   (no shop)    │   │   (with shop)  │
            └────────┬───────┘   └────────┬───────┘
                     │                    │
                     ▼                    ▼
            ┌────────────────┐   ┌────────────────┐
            │   Dashboard    │   │   Dashboard    │
            │     /user      │   │    /seller     │
            ├────────────────┤   ├────────────────┤
            │ • Orders       │   │ • Products     │
            │ • Cart         │   │ • Analytics    │
            │ • Wishlist     │   │ • Orders       │
            │ • Tracking     │   │ • Payouts      │
            └────────────────┘   └────────────────┘
                     │                    │
                     └────────┬───────────┘
                              │
                        Protected Routes
                        (Role Verified)
```

---

**Diagram Version:** 1.0
**Created:** January 15, 2024
**Status:** ✅ Complete
