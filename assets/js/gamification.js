(function(){
  // ThriftMap Gamification module
  const STORAGE_KEY_XP = 'tm_xp_total';
  const STORAGE_KEY_LAST_GAIN = 'tm_xp_last_gain';

  const LEVELS = [
    { id: 1, name: 'Pemula Hijau', xpMin: 0, xpMax: 99 },
    { id: 2, name: 'Sahabat Bumi', xpMin: 100, xpMax: 299 },
    { id: 3, name: 'Pahlawan Daur Ulang', xpMin: 300, xpMax: 699 },
    { id: 4, name: 'Guardian Keberlanjutan', xpMin: 700, xpMax: 1499 },
    { id: 5, name: 'Top 1% Penyelamat Lingkungan', xpMin: 1500, xpMax: Number.POSITIVE_INFINITY }
  ];

  const XP_MAP = {
    'cukup': 10,
    'baik': 20,
    'sangat baik': 30,
    'seperti baru': 40
  };

  function normalizeCondition(s){
    return String(s||'').toLowerCase().trim();
  }

  function getProductByIdOrName(idOrName){
    try {
      const list = Array.isArray(window.TM_PRODUCTS) ? window.TM_PRODUCTS : [];
      if (!idOrName) return undefined;
      const keyStr = String(idOrName).toLowerCase();
      // Try numeric id match first
      const byId = list.find(p => String(p.id) === String(idOrName));
      if (byId) return byId;
      // Fallback to name match (case-insensitive)
      return list.find(p => String(p.name).toLowerCase().trim() === keyStr);
    } catch { return undefined; }
  }

  function xpForItem(cartItem){
    try {
      const prod = getProductByIdOrName(cartItem?.id ?? cartItem?.name);
      const condRaw = prod?.condition || (Array.isArray(prod?.specs) ? prod.specs.find(s => s.label === 'Kondisi')?.value : undefined);
      const cond = normalizeCondition(condRaw);
      const per = XP_MAP[cond] ?? 15; // default fallback
      const qty = Math.max(1, Number(cartItem?.qty)||1);
      return per * qty;
    } catch { return 0; }
  }

  function computeXP(items){
    try { return (items||[]).reduce((sum, it) => sum + xpForItem(it), 0); } catch { return 0; }
  }

  function getXP(){
    try { return parseInt(localStorage.getItem(STORAGE_KEY_XP)||'0',10) || 0; } catch { return 0; }
  }

  function setXP(v){
    const val = Math.max(0, Math.floor(Number(v)||0));
    try { localStorage.setItem(STORAGE_KEY_XP, String(val)); } catch {}
    return val;
  }

  function addXP(delta){
    const cur = getXP();
    const inc = Math.max(0, Math.floor(Number(delta)||0));
    const next = cur + inc;
    try { 
      localStorage.setItem(STORAGE_KEY_XP, String(next));
      localStorage.setItem(STORAGE_KEY_LAST_GAIN, String(inc));
    } catch {}
    return next;
  }

  function getLastGain(){
    try { return parseInt(localStorage.getItem(STORAGE_KEY_LAST_GAIN)||'0',10) || 0; } catch { return 0; }
  }

  function getLevel(xp){
    const total = (typeof xp === 'number') ? xp : getXP();
    return LEVELS.find(l => total >= l.xpMin && total <= l.xpMax) || LEVELS[0];
  }

  function progressToNext(xp){
    const total = (typeof xp === 'number') ? xp : getXP();
    const level = getLevel(total);
    const idx = LEVELS.indexOf(level);
    const start = level.xpMin;
    const hasNext = idx < LEVELS.length - 1;
    const nextStart = hasNext ? LEVELS[idx+1].xpMin : start; // for last level, keep start
    const span = Math.max(1, (hasNext ? (nextStart - start) : 1));
    const progressed = Math.max(0, total - start);
    const percent = hasNext ? Math.max(0, Math.min(100, Math.round((progressed / span) * 100))) : 100;
    const remaining = hasNext ? Math.max(0, nextStart - total) : 0;
    return {
      level,
      levelIndex: idx,
      nextLevel: hasNext ? LEVELS[idx+1] : level,
      percent,
      start,
      nextStart,
      remaining,
      total
    };
  }

  window.TMGami = {
    LEVELS,
    XP_MAP,
    getXP,
    setXP,
    addXP,
    getLastGain,
    xpForItem,
    computeXP,
    getLevel,
    progressToNext
  };
})();
