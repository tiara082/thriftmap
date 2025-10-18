/* ThriftMap cart module - localStorage based */
(function(){
  const CART_KEY = 'tm_cart_v1';

  function getCart(){
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch { return []; }
  }
  function saveCart(items){
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateBadges();
  }
  function clearCart(){ saveCart([]); }
  function formatRupiah(num){
    try { return 'Rp ' + Number(num||0).toLocaleString('id-ID'); } catch { return 'Rp ' + (num||0); }
  }
  function getCount(){
    return getCart().reduce((sum, it) => sum + (it.qty||0), 0);
  }
  function getTotal(){
    return getCart().reduce((sum, it) => sum + (it.price||0) * (it.qty||0), 0);
  }
  function normalizeId(item){
    // Prefer id; fallback to name slug
    if (item && item.id != null) return String(item.id);
    return (item && item.name) ? String(item.name).toLowerCase().trim() : undefined;
  }
  function addItem(item, qty=1){
    if (!item || !item.name) return;
    const items = getCart();
    const id = normalizeId(item);
    const idx = items.findIndex(x => normalizeId(x) === id);
    if (idx > -1){
      items[idx].qty = Math.min(99, (items[idx].qty||0) + qty);
    } else {
      items.push({ id, name: item.name, price: Number(item.price)||0, image: item.image||'', qty: Math.max(1, qty) });
    }
    saveCart(items);
  }
  function updateQty(idOrName, qty){
    const items = getCart();
    const key = String(idOrName).toLowerCase();
    const idx = items.findIndex(x => normalizeId(x) === key);
    if (idx > -1){
      items[idx].qty = Math.max(1, Math.min(99, Number(qty)||1));
      saveCart(items);
    }
  }
  function removeItem(idOrName){
    const items = getCart();
    const key = String(idOrName).toLowerCase();
    const filtered = items.filter(x => normalizeId(x) !== key);
    saveCart(filtered);
  }

  function updateBadges(){
    const count = getCount();
    document.querySelectorAll('.cart-count').forEach(b => {
      if (count > 0){ b.textContent = String(count); b.style.display = ''; }
      else { b.textContent = '0'; b.style.display = 'none'; }
    });
  }

  function closestPriceFrom(el){
    // Try common price selectors near button
    const root = el.closest('.card-hover') || el.closest('.showcase') || el.closest('div');
    if (!root) return 0;
    // Prefer element with class starting with text-green and font-bold
    const priceEl = root.querySelector('.text-green-600, .price') || root.querySelector('[data-price]');
    const text = priceEl ? priceEl.textContent || '' : '';
    const digits = text.replace(/[^0-9]/g,'');
    return digits ? Number(digits) : 0;
  }
  function closestImageFrom(el){
    const root = el.closest('.card-hover') || el.closest('.showcase') || el.closest('div');
    const img = root ? root.querySelector('img') : null;
    return img ? img.getAttribute('src') : '';
  }

  function handleAddClick(e, btn){
    e.preventDefault();
    e.stopPropagation();
    const ds = btn.dataset || {};
    const payload = {
      id: ds.id || (ds.name ? ds.name.toLowerCase() : undefined),
      name: ds.name || btn.getAttribute('data-name') || btn.getAttribute('aria-label') || 'Produk',
      price: Number(ds.price)||closestPriceFrom(btn)||0,
      image: ds.image || closestImageFrom(btn) || ''
    };
    addItem(payload, Number(ds.qty)||1);
    // toast feedback
    try {
      if (window.Notify && Notify.toastSuccess){
        Notify.toastSuccess(`${payload.name} ditambahkan ke keranjang`);
      }
    } catch {}
  }

  // Global delegation: support [data-add-cart] and legacy .add-cart
  document.addEventListener('click', (e) => {
    const t = e.target;
    const btn = t.closest('[data-add-cart], .add-cart');
    if (btn) handleAddClick(e, btn);
  });

  // Init badges on load
  document.addEventListener('DOMContentLoaded', updateBadges);

  // Expose API
  window.TMCart = {
    getCart, saveCart, clearCart, getCount, getTotal, addItem, updateQty, removeItem, formatRupiah
  };
})();
