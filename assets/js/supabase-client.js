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

  function getClient(){ return supa; }

  async function getCurrentUser(){
    if (!supa) throw new Error('Supabase not initialized');
    const { data, error } = await supa.auth.getUser();
    if (error) throw error;
    return data?.user || null;
  }

  function computeLevel(exp){
    const e = Math.max(0, Number(exp)||0);
    if (e >= 1500) return 5; // Top 1%
    if (e >= 700) return 4;  // Guardian Keberlanjutan
    if (e >= 300) return 3;  // Pahlawan Daur Ulang
    if (e >= 100) return 2;  // Sahabat Bumi
    return 1;               // Pemula Hijau
  }

  async function ensureProfile(userId){
    if (!supa) throw new Error('Supabase not initialized');
    if (!userId) throw new Error('Missing userId');
    // Upsert minimal profile row
    const { error } = await supa.from('profiles').upsert({ id: userId }, { onConflict: 'id' });
    if (error) throw error;
  }

  async function addExp(delta){
    if (!supa) throw new Error('Supabase not initialized');
    const user = await getCurrentUser();
    if (!user) throw new Error('Harus login');
    await ensureProfile(user.id);
    // Get current exp
    const cur = await supa.from('profiles').select('exp, level').eq('id', user.id).limit(1).maybeSingle();
    if (cur.error) throw cur.error;
    const prevExp = Math.max(0, cur.data?.exp || 0);
    const nextExp = prevExp + Math.max(0, Number(delta)||0);
    const nextLevel = computeLevel(nextExp);
    const { error } = await supa.from('profiles').update({ exp: nextExp, level: nextLevel }).eq('id', user.id);
    if (error) throw error;
    return { exp: nextExp, level: nextLevel };
  }

  async function getProfile(){
    if (!supa) throw new Error('Supabase not initialized');
    const user = await getCurrentUser();
    if (!user) throw new Error('Harus login');
    const res = await supa.from('profiles').select('id, username, full_name, avatar_url, phone, exp, level').eq('id', user.id).maybeSingle();
    if (res.error) throw res.error;
    return res.data || null;
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

  // Create order using local cart schema (id, name, qty, price) and attach XP earned into shipping_address JSON
  async function createOrderFromLocal(cartItems, { total, currency = 'IDR' } = {}, shippingAddress = {}, xpEarned = 0){
    if (!supa) throw new Error('Supabase not initialized');
    const user = await getCurrentUser();
    if (!user) throw new Error('Harus login');
    const user_id = user.id;
    const total_cents = Math.max(0, Number(total)||0); // treat IDR as cents=rupiah
    const shipping = Object.assign({}, shippingAddress, { xp_earned: xpEarned });
    const { data: order, error } = await supa.from('orders')
      .insert({ user_id, status: 'paid', total_cents, currency, shipping_address: shipping })
      .select('id').single();
    if (error) return { error };
    const rows = (cartItems||[]).map(it => ({
      order_id: order.id,
      product_id: null, // unknown in local sample
      title: it.name,
      qty: Math.max(1, Number(it.qty)||1),
      price_cents: Math.max(0, Number(it.price)||0)
    }));
    const oi = await supa.from('order_items').insert(rows);
    if (oi.error) return { error: oi.error };
    return { data: { id: order.id } };
  }

  window.TMSupa = { init, getClient, getCurrentUser, getProfile, addExp, listProducts, addToWishlist, toggleWishlist, createOrder, createOrderFromLocal, ensureProfile, computeLevel };
})();
