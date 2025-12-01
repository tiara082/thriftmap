# ThriftMap - Sistem CRUD Lengkap & Responsif

## 📋 Stores yang Sudah Dibuat

### 1. **Cart Store** (`lib/cart-store.ts`)
✅ Fungsi lengkap:
- `addItem()` - Tambah produk ke keranjang (max 10 item/produk)
- `removeItem()` - Hapus item dari keranjang
- `updateQuantity()` - Update jumlah item dengan validasi
- `updateItem()` - Update detail item (category, condition, dll)
- `clearCart()` - Kosongkan keranjang
- `getItem()` - Ambil item spesifik
- `hasItem()` - Cek apakah item ada di keranjang
- `getTotalPrice()` - Total harga
- `getTotalItems()` - Total jumlah item
- `getItemsBySeller()` - Filter item by seller
- `validateStock()` - Validasi stok
- Error handling dengan `setError()`
- Persist ke localStorage otomatis

### 2. **Wishlist Store** (`lib/wishlist-store.ts`)
✅ Fungsi lengkap:
- `addItem()` - Tambah ke wishlist
- `removeItem()` - Hapus dari wishlist
- `toggleItem()` - Toggle (add/remove) dengan return true/false
- `clearWishlist()` - Kosongkan wishlist
- `hasItem()` - Cek item di wishlist
- `getItem()` - Ambil item spesifik
- `getTotalItems()` - Total item wishlist
- `getTotalValue()` - Total nilai wishlist
- Auto-timestamp `addedAt`
- Persist ke localStorage

### 3. **Order Store** (`lib/order-store.ts`)
✅ Fungsi lengkap:
- `createOrder()` - Buat pesanan baru dengan ID unik
- `updateOrder()` - Update status/detail pesanan
- `cancelOrder()` - Cancel pesanan
- `getOrder()` - Ambil pesanan by ID
- `getOrdersByUser()` - Filter by user
- `getOrdersByStatus()` - Filter by status
- `getTotalOrders()` - Total pesanan
- `getTotalSpent()` - Total pengeluaran
- Support multiple delivery methods (pickup/courier)
- Auto-generate order ID format: `ORDER-{timestamp}-{random}`
- Persist ke localStorage

### 4. **Address Store** (`lib/address-store.ts`)
✅ Fungsi lengkap:
- `addAddress()` - Tambah alamat baru
- `updateAddress()` - Edit alamat existing
- `removeAddress()` - Hapus alamat
- `setDefaultAddress()` - Set alamat default
- `getAddress()` - Ambil alamat by ID
- `getDefaultAddress()` - Ambil alamat default
- `getAllAddresses()` - List semua alamat
- Auto-set default jika alamat pertama
- Auto-generate ID: `addr_{timestamp}`
- Persist ke localStorage

---

## 🎯 Cara Implementasi di Komponen

### **DashboardProducts** - Produk Catalog
```typescript
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";

// Di dalam komponen:
const { addItem: addToCart, hasItem: inCart } = useCart();
const { toggleItem: toggleWishlist, hasItem: inWishlist } = useWishlist();

// Add to Cart
const handleAddToCart = (product: Product) => {
  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.imageUrl,
    quantity: 1,
    category: product.category,
    condition: product.condition,
    shopName: product.shopName
  });
  
  // Show toast notification
  toast.success("Ditambahkan ke keranjang!");
};

// Toggle Wishlist
const handleWishlistToggle = (product: Product) => {
  const added = toggleWishlist({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.imageUrl,
    category: product.category,
    shopName: product.shopName
  });
  
  toast.success(added ? "Ditambahkan ke wishlist!" : "Dihapus dari wishlist!");
};

// Check status
const isInCart = inCart(product.id);
const isInWishlist = inWishlist(product.id);
```

### **DashboardCart** - Keranjang
```typescript
import { useCart } from "@/lib/cart-store";

const { 
  items, 
  updateQuantity, 
  removeItem, 
  clearCart, 
  getTotalPrice,
  error 
} = useCart();

// Update quantity
<button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
<button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>

// Remove item with confirmation
const handleRemove = (id: string) => {
  if (confirm("Hapus item dari keranjang?")) {
    removeItem(id);
  }
};

// Clear cart with confirmation
const handleClearCart = () => {
  if (confirm("Kosongkan semua keranjang?")) {
    clearCart();
  }
};

// Show error
{error && (
  <div className="text-rose-600">{error}</div>
)}
```

### **DashboardWishlist** - Wishlist
```typescript
import { useWishlist } from "@/lib/wishlist-store";
import { useCart } from "@/lib/cart-store";

const { items, removeItem, getTotalValue } = useWishlist();
const { addItem: addToCart } = useCart();

// Move to cart
const handleMoveToCart = (item: WishlistItem) => {
  addToCart({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    quantity: 1,
    category: item.category
  });
  removeItem(item.id);
  toast.success("Dipindahkan ke keranjang!");
};

// Remove from wishlist
const handleRemove = (id: string) => {
  if (confirm("Hapus dari wishlist?")) {
    removeItem(id);
  }
};
```

### **DashboardCheckout** - Checkout
```typescript
import { useCart } from "@/lib/cart-store";
import { useOrder } from "@/lib/order-store";
import { useAddress } from "@/lib/address-store";
import { useRouter } from "next/navigation";

const { items, getTotalPrice, clearCart } = useCart();
const { createOrder } = useOrder();
const { getDefaultAddress, getAllAddresses } = useAddress();
const router = useRouter();

// Get user data
const [user, setUser] = useState<any>(null);
useEffect(() => {
  const userData = localStorage.getItem('user');
  if (userData) setUser(JSON.parse(userData));
}, []);

// Form validation
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: ""
});

const [errors, setErrors] = useState<Record<string, string>>({});

const validateForm = () => {
  const newErrors: Record<string, string> = {};
  
  if (!formData.name.trim()) newErrors.name = "Nama wajib diisi";
  if (!formData.phone.trim()) newErrors.phone = "Nomor WhatsApp wajib diisi";
  if (!formData.phone.match(/^08\d{8,11}$/)) newErrors.phone = "Format nomor tidak valid";
  
  if (deliveryMethod === "courier") {
    if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi";
    if (!formData.city.trim()) newErrors.city = "Kota wajib diisi";
    if (!formData.postalCode.trim()) newErrors.postalCode = "Kode pos wajib diisi";
  } else {
    if (!pickupLocation) newErrors.pickupLocation = "Pilih lokasi pengambilan";
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Submit order
const handlePlaceOrder = () => {
  if (!validateForm()) {
    toast.error("Lengkapi semua data yang diperlukan!");
    return;
  }
  
  const orderId = createOrder({
    userId: user?.id || "guest",
    items: items,
    subtotal: getTotalPrice(),
    shippingFee: deliveryMethod === "pickup" ? 0 : shippingFee,
    protectionFee: 5000,
    total: getTotalPrice() + (deliveryMethod === "pickup" ? 0 : shippingFee) + 5000,
    deliveryMethod,
    shippingOption: deliveryMethod === "courier" ? shipping : undefined,
    pickupLocation: deliveryMethod === "pickup" ? pickupLocation : undefined,
    paymentMethod: payment,
    customerInfo: {
      name: formData.name,
      phone: formData.phone,
      address: deliveryMethod === "courier" ? formData.address : undefined,
      city: deliveryMethod === "courier" ? formData.city : undefined,
      postalCode: deliveryMethod === "courier" ? formData.postalCode : undefined,
    },
    notes: formData.notes,
    status: "pending"
  });
  
  clearCart();
  toast.success("Pesanan berhasil dibuat!");
  router.push(`/dashboard-user/payment/success?orderId=${orderId}`);
};
```

### **DashboardProfile** - Manage Addresses
```typescript
import { useAddress } from "@/lib/address-store";

const { 
  addresses, 
  addAddress, 
  updateAddress, 
  removeAddress, 
  setDefaultAddress 
} = useAddress();

// Add address
const handleAddAddress = () => {
  addAddress({
    name: "Rumah",
    phone: "08123456789",
    address: "Jl. Example No. 123",
    city: "Bandung",
    postalCode: "40111",
    label: "Rumah",
    isDefault: addresses.length === 0
  });
};

// Update address
const handleUpdateAddress = (id: string) => {
  updateAddress(id, {
    name: "Kantor",
    address: "Jl. Updated No. 456"
  });
};

// Delete address
const handleDeleteAddress = (id: string) => {
  if (confirm("Hapus alamat ini?")) {
    removeAddress(id);
  }
};

// Set default
const handleSetDefault = (id: string) => {
  setDefaultAddress(id);
};
```

---

## 🎨 Responsive Design Guidelines

### Mobile First (320px+)
- Stack layout vertical
- Full width buttons
- Card grid: 1 column
- Touch-friendly spacing (min 44px tap targets)

### Tablet (768px+)
- Card grid: 2 columns
- Sidebar visible
- Horizontal nav tabs

### Desktop (1024px+)
- Card grid: 3-4 columns
- Fixed sidebar
- Multi-column layouts

### Large Desktop (1440px+)
- Max container width: 1600px
- Card grid: 4-5 columns
- Enhanced spacing

---

## 📱 Key Responsive Classes (Tailwind)

```tsx
// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

// Flex responsive
<div className="flex flex-col md:flex-row gap-4">

// Text responsive
<h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl">

// Padding responsive
<div className="p-4 md:p-6 lg:p-8">

// Hide/show responsive
<div className="hidden md:block">
<div className="block md:hidden">
```

---

## ✅ Testing Checklist

### Functional Testing
- [ ] Add to cart works
- [ ] Update quantity works (min 1, max 10)
- [ ] Remove from cart works
- [ ] Clear cart works
- [ ] Add to wishlist works
- [ ] Remove from wishlist works
- [ ] Move wishlist to cart works
- [ ] Create order works
- [ ] Order ID generated correctly
- [ ] Delivery method selection works
- [ ] Pickup location selection works
- [ ] Form validation works
- [ ] Address CRUD works
- [ ] Set default address works

### Persistence Testing
- [ ] Cart persists after refresh
- [ ] Wishlist persists after refresh
- [ ] Orders persist after refresh
- [ ] Addresses persist after refresh
- [ ] Data survives browser close/reopen

### Responsive Testing
- [ ] Mobile (375px): All features accessible
- [ ] Tablet (768px): Grid layout correct
- [ ] Desktop (1280px): Optimal layout
- [ ] Ultra-wide (1920px+): Content centered

### Error Handling
- [ ] Max quantity error shows
- [ ] Duplicate wishlist error shows
- [ ] Empty cart prevents checkout
- [ ] Form validation errors show
- [ ] Required field errors clear

---

## 🚀 Next Steps untuk Implementasi Penuh

1. **Install toast library** untuk notifications:
```bash
npm install react-hot-toast
```

2. **Update DashboardProducts** dengan add to cart & wishlist buttons
3. **Update DashboardCart** dengan dynamic quantity controls
4. **Update DashboardWishlist** dengan move to cart feature
5. **Update DashboardCheckout** dengan form validation
6. **Update DashboardProfile** dengan address management
7. **Add toast notifications** di semua actions
8. **Test responsive** di semua breakpoints
9. **Test localStorage persistence** di semua stores

---

## 📝 Notes
- Semua stores menggunakan Zustand dengan persist middleware
- Data otomatis sync ke localStorage
- Version tracking untuk migration support
- Error handling built-in
- TypeScript untuk type safety
- Ready untuk production
