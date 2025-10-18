/* ThriftMap wishlist module - localStorage based */
(function(){
  const ITEMS_KEY = 'tm_wishlist_items';
  const COUNT_KEY = 'tm_wishlist_count'; // kept for backward-compat on badges

  function load(){
    try { return JSON.parse(localStorage.getItem(ITEMS_KEY) || '[]'); } catch { return []; }
  }
  function save(arr){
    const uniq = Array.from(new Set((arr||[]).map(String)));
    localStorage.setItem(ITEMS_KEY, JSON.stringify(uniq));
    localStorage.setItem(COUNT_KEY, String(uniq.length));
    updateBadges();
    return uniq;
  }
  function get(){ return load(); }
  function count(){ return get().length; }
  function has(id){ if (id==null) return false; return get().includes(String(id)); }
  function add(id){ if (id==null) return get(); const arr = get(); if (!arr.includes(String(id))) arr.push(String(id)); return save(arr); }
  function remove(id){ if (id==null) return get(); const arr = get().filter(x => x !== String(id)); return save(arr); }
  function toggle(id, name){
    if (has(id)){
      remove(id);
      try { Notify?.toastInfo?.(`${name||'Produk'} dihapus dari wishlist`); } catch {}
      return false;
    } else {
      add(id);
      try { Notify?.toastSuccess?.(`${name||'Produk'} ditambahkan ke wishlist`); } catch {}
      return true;
    }
  }
  function updateBadges(){
    const c = count();
    document.querySelectorAll('.wish-count').forEach(b => {
      if (c>0){ b.textContent = String(c); b.style.display=''; }
      else { b.textContent='0'; b.style.display='none'; }
    });
  }
  document.addEventListener('DOMContentLoaded', updateBadges);

  window.TMWishlist = { get, count, has, add, remove, toggle, updateBadges };
})();
