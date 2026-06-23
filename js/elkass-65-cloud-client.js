/* ELKASS 6.5 Cloud Client — Supabase ready + local fallback */
(function(){
  const cfg = window.ELKASS_CLOUD_CONFIG || {};
  const LOCAL_PREFIX = "elkass_cloud_";

  const defaults = {
    products: [],
    categories: [],
    media: [],
    promotions: [],
    settings: {
      layoutMode: "classic",
      seasonalTheme: "standard",
      cloudStatus: cfg.enabled ? "cloud-configured" : "local-fallback"
    },
    glossary: []
  };

  function clone(v){ return JSON.parse(JSON.stringify(v)); }

  function localGet(collection){
    try {
      const raw = localStorage.getItem(LOCAL_PREFIX + collection);
      if(raw) return JSON.parse(raw);
    } catch(e){}
    return clone(defaults[collection] || []);
  }

  function localSet(collection, value){
    try {
      localStorage.setItem(LOCAL_PREFIX + collection, JSON.stringify(value));
      window.dispatchEvent(new CustomEvent("elkass:cloud-local-change", {detail:{collection}}));
      return {ok:true, mode:"local"};
    } catch(e){
      return {ok:false, error:e.message, mode:"local"};
    }
  }

  async function ensureSupabase(){
    if(!cfg.enabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return null;
    if(window.supabase && window.supabase.createClient){
      return window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    }
    return null;
  }

  async function list(collection){
    const client = await ensureSupabase();
    if(!client) return localGet(collection);
    const {data, error} = await client.from(collection).select("*").order("updated_at", {ascending:false});
    if(error){
      console.warn("[ELKASS Cloud] fallback local", collection, error);
      return localGet(collection);
    }
    return data || [];
  }

  async function save(collection, item){
    const client = await ensureSupabase();
    if(!client){
      const list = localGet(collection);
      const id = item.id || item.slug || ("local_" + Date.now());
      const next = {...item, id, updated_at:new Date().toISOString()};
      const idx = list.findIndex(x => x.id === id);
      if(idx >= 0) list[idx] = next; else list.push(next);
      return localSet(collection, list);
    }
    const payload = {...item, updated_at:new Date().toISOString()};
    const {data, error} = await client.from(collection).upsert(payload).select().single();
    if(error) return {ok:false, error:error.message, mode:"cloud"};
    return {ok:true, data, mode:"cloud"};
  }

  async function remove(collection, id){
    const client = await ensureSupabase();
    if(!client){
      const next = localGet(collection).filter(x => x.id !== id);
      return localSet(collection, next);
    }
    const {error} = await client.from(collection).delete().eq("id", id);
    if(error) return {ok:false, error:error.message, mode:"cloud"};
    return {ok:true, mode:"cloud"};
  }

  async function uploadMedia(path, file){
    const client = await ensureSupabase();
    if(!client) return {ok:false, mode:"local", error:"Chmura nie jest jeszcze skonfigurowana. Użyj Media Managera do przygotowania pliku i wgraj go do repo."};
    const bucket = cfg.storageBucket || "elkass-media";
    const {data, error} = await client.storage.from(bucket).upload(path, file, {upsert:true});
    if(error) return {ok:false, error:error.message, mode:"cloud"};
    const {data:pub} = client.storage.from(bucket).getPublicUrl(path);
    return {ok:true, data, url:pub && pub.publicUrl, mode:"cloud"};
  }

  window.ELKASSCloud = {
    config: cfg,
    list, save, remove, uploadMedia,
    localGet, localSet,
    status(){ return cfg.enabled ? "cloud-ready" : "local-fallback"; }
  };
})();
