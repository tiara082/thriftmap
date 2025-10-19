// Minimal Supabase client bootstrap and helper functions for ThriftMap
// Include this file after loading https://esm.sh/@supabase/supabase-js or via CDN below
// <script src="https://unpkg.com/@supabase/supabase-js@2.45.3/dist/umd/supabase.js"></script>
// Then include this file and call window.TMSupa.init({ url, anonKey })

(function(){
  let supa = null;

  function init({ url, anonKey }){
    if (!url || !anonKey){
      console.warn('Supabase: missing url or anonKey.');
      return null;
    }
    if (window.supabase){
      // UMD
      supa = window.supabase.createClient(url, anonKey);
    } else if (window.Supabase && window.Supabase.createClient){
      supa = window.Supabase.createClient(url, anonKey);
    } else {
      console.warn('Supabase: supabase-js not loaded.');
    }
    return supa;
  }

  async function listProducts({ limit = 24, search = '', categorySlug = null } = {}){
    if (!supa) throw new Error('Supabase not initialized');
    let q = supa.from('products')
      .select('id, title, description, price_cents, currency, condition, product_images(url, alt), category:category_id(id, name, slug)')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (search){ q = q.ilike('title', `%${search}%`); }
    if (categorySlug){
      const { data: cats } = await supa.from('categories').select('id, slug').eq('slug', categorySlug).limit(1);
      if (cats && cats[0]){ q = q.eq('category_id', cats[0].id); }
    }
    return q;
  }

  async function addToWishlist(productId){
    if (!supa) throw new Error('Supabase not initialized');
    const { data: user } = await supa.auth.getUser();
    if (!user || !user.user) throw new Error('Harus login');
    const user_id = user.user.id;
    return supa.from('wishlists').upsert({ user_id, product_id: productId });
  }

  async function toggleWishlist(productId){
    if (!supa) throw new Error('Supabase not initialized');
    const { data: user } = await supa.auth.getUser();
    if (!user || !user.user) throw new Error('Harus login');
    const user_id = user.user.id;
    // Try delete, if none deleted, insert
    const del = await supa.from('wishlists').delete().eq('user_id', user_id).eq('product_id', productId);
    if (del.error) return del;
    if (del.count && del.count > 0){ return del; }
    return supa.from('wishlists').insert({ user_id, product_id: productId });
  }

  async function createOrder(items, shipping){
    if (!supa) throw new Error('Supabase not initialized');
    const { data: user } = await supa.auth.getUser();
    if (!user || !user.user) throw new Error('Harus login');
    const user_id = user.user.id;
    const total_cents = (items||[]).reduce((sum, it) => sum + (it.price_cents||0) * (it.qty||1), 0);
    const { data: order, error } = await supa.from('orders')
      .insert({ user_id, status: 'pending', total_cents, currency: 'IDR', shipping_address: shipping||{} })
      .select('id').single();
    if (error) return { error };
    const rows = (items||[]).map(it => ({ order_id: order.id, product_id: it.id, title: it.title, qty: it.qty||1, price_cents: it.price_cents||0 }));
    const oi = await supa.from('order_items').insert(rows);
    if (oi.error) return { error: oi.error };
    return { data: { id: order.id } };
  }

  window.TMSupa = { init, listProducts, addToWishlist, toggleWishlist, createOrder };
})();
