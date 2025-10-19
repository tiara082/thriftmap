(function(){
  const BTN_SELECTOR = '[data-open-wishlist]';
  let overlay, panel, listEl, countEl;
  const FALLBACK_IMAGE = './assets/images/logo/logo.svg';

  function ensurePanel(){
    if (panel) return;

    overlay = document.createElement('div');
    overlay.className = 'tm-wishlist-overlay fixed inset-0 bg-slate-900/40 z-[1298] opacity-0 pointer-events-none transition-opacity duration-300';
    overlay.addEventListener('click', closePanel);
    document.body.appendChild(overlay);

    panel = document.createElement('aside');
    panel.className = 'tm-wishlist-panel fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[1300] transform translate-x-full transition-transform duration-300';
    panel.innerHTML = `
      <div class="flex flex-col h-full">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 class="text-lg font-semibold text-gray-800">Wishlist</h2>
            <p class="text-sm text-gray-500" data-wl-count>Memuat wishlist…</p>
          </div>
          <button type="button" data-wl-close class="text-gray-400 hover:text-gray-600 transition-colors">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto" data-wl-list>
          <div class="px-6 py-12 text-center text-sm text-gray-500">
            <i class="fas fa-spinner fa-spin text-lg text-gray-400"></i>
            <p class="mt-2">Memuat daftar wishlist…</p>
          </div>
        </div>
        <div class="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <button type="button" data-wl-clear class="text-sm text-red-500 hover:text-red-600 font-medium">Hapus Semua</button>
          <button type="button" data-wl-close class="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">Tutup</button>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    listEl = panel.querySelector('[data-wl-list]');
    countEl = panel.querySelector('[data-wl-count]');

    panel.addEventListener('click', (event) => {
      const target = event.target;
      if (target.closest('[data-wl-close]')) {
        event.preventDefault();
        closePanel();
        return;
      }
      const removeBtn = target.closest('[data-wl-remove]');
      if (removeBtn){
        event.preventDefault();
        const id = removeBtn.getAttribute('data-wl-remove');
        window.TMWishlist?.remove?.(id);
        renderList();
        return;
      }
      const addCartBtn = target.closest('[data-wl-addcart]');
      if (addCartBtn){
        event.preventDefault();
        const id = addCartBtn.getAttribute('data-wl-addcart');
        const product = findProduct(id);
        if (product){
          window.TMCart?.addItem?.({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          }, 1);
          try {
            if (window.Notify?.toastSuccess){
              window.Notify.toastSuccess(`${product.name} ditambahkan ke keranjang`);
            }
          } catch {}
        }
        return;
      }
      const clearBtn = target.closest('[data-wl-clear]');
      if (clearBtn){
        event.preventDefault();
        window.TMWishlist?.clear?.();
        renderList();
      }
    });
  }

  function findProduct(id){
    const items = Array.isArray(window.TM_PRODUCTS) ? window.TM_PRODUCTS : [];
    const match = items.find(p => String(p.id) === String(id));
    if (match) return match;
    // fallback: maybe store minimal info from local storage in future
    return null;
  }

  function formatPrice(value){
    if (window.TMCart?.formatRupiah){
      return window.TMCart.formatRupiah(value);
    }
    try {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(Number(value) || 0);
    } catch {
      return `Rp ${(Number(value)||0).toLocaleString('id-ID')}`;
    }
  }

  function renderList(){
    if (!panel) return;
    const ids = window.TMWishlist?.get?.() || [];
    if (countEl){
      countEl.textContent = ids.length ? `${ids.length} produk di wishlist` : 'Wishlist kamu masih kosong';
    }
    if (!ids.length){
      listEl.innerHTML = `
        <div class="px-6 py-14 text-center text-sm text-gray-500">
          <i class="fas fa-heart-broken text-2xl text-gray-300"></i>
          <p class="mt-3 font-medium">Wishlist kamu kosong.</p>
          <p class="mt-1">Tambahkan produk favorit dan lihat di sini kapan saja.</p>
        </div>
      `;
      return;
    }

    const rows = ids.map(id => {
      const product = findProduct(id) || { id, name: `Produk #${id}`, price: 0, image: FALLBACK_IMAGE };
      const image = product.image || FALLBACK_IMAGE;
      const priceLabel = formatPrice(product.price);
      const conditionLabel = product.condition ? String(product.condition) : '';
      return `
        <article class="flex gap-4 px-6 py-4 border-b border-gray-100" data-wl-item="${id}">
          <div class="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <img src="${image}" alt="${product.name}" class="w-full h-full object-cover">
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-gray-800 truncate">${product.name}</h3>
            <p class="text-xs text-gray-500 mt-1">${conditionLabel ? conditionLabel : 'Kondisi tidak tersedia'}</p>
            <p class="text-sm text-green-600 font-semibold mt-1">${priceLabel}</p>
            <div class="flex flex-wrap gap-2 mt-3">
              <button type="button" data-wl-addcart="${id}" class="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                <i class="fas fa-shopping-bag mr-1"></i> Tambah ke Keranjang
              </button>
              <button type="button" data-wl-remove="${id}" class="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors">
                <i class="fas fa-trash mr-1"></i> Hapus
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    listEl.innerHTML = rows;
  }

  function openPanel(){
    ensurePanel();
    renderList();
    overlay.classList.remove('pointer-events-none');
    overlay.classList.remove('opacity-0');
    overlay.classList.add('opacity-100');
    requestAnimationFrame(() => {
      panel.classList.remove('translate-x-full');
    });
  }

  function closePanel(){
    if (!panel) return;
    panel.classList.add('translate-x-full');
    overlay.classList.add('opacity-0');
    overlay.classList.add('pointer-events-none');
    overlay.classList.remove('opacity-100');
  }

  function handleGlobalClick(event){
    const trigger = event.target.closest(BTN_SELECTOR);
    if (trigger){
      event.preventDefault();
      openPanel();
    }
  }

  function init(){
    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('tmWishlist:changed', () => {
      if (panel && !panel.classList.contains('translate-x-full')){
        renderList();
      }
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'tm_wishlist_items' && panel && !panel.classList.contains('translate-x-full')){
        renderList();
      }
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
