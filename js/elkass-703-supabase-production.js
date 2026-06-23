/* ELKASS 7.0 Stage 3 — Supabase production bridge */
(function(){
  const cfg = window.ELKASS_CLOUD_CONFIG || {};
  const P = "elkass_cloud_";
  const defaults = {
    products: [],
    categories: [],
    promotions: [],
    media: [],
    glossary: [],
    settings: []
  };

  function clone(v){ return JSON.parse(JSON.stringify(v)); }
  function status(){
    if(cfg.enabled && cfg.supabaseUrl && cfg.supabaseAnonKey) return "cloud-active";
    return "local-fallback";
  }
  function localGet(c){
    try { return JSON.parse(localStorage.getItem(P+c)) || clone(defaults[c] || []); }
    catch(e){ return clone(defaults[c] || []); }
  }
  function localSet(c,v){
    localStorage.setItem(P+c, JSON.stringify(v));
    window.dispatchEvent(new CustomEvent("elkass:cloud-change",{detail:{collection:c,mode:"local"}}));
    return {ok:true, mode:"local", collection:c};
  }
  async function getClient(){
    if(!cfg.enabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return null;
    if(window.supabase && window.supabase.createClient){
      return window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    }
    return null;
  }
  function normalizeCollection(c){
    if(c === "setting") return "settings";
    if(c === "product") return "products";
    if(c === "category") return "categories";
    return c;
  }
  async function list(collection){
    const c = normalizeCollection(collection);
    const s = await getClient();
    if(!s) return localGet(c);
    let q = s.from(c).select("*");
    if(["products","categories","promotions","media","glossary"].includes(c)){
      q = q.order("created_at", {ascending:false});
    }
    const {data,error} = await q;
    if(error){
      console.warn("[ELKASS 7.0] cloud list fallback", c, error.message);
      return localGet(c);
    }
    return data || [];
  }
  async function save(collection,item){
    const c = normalizeCollection(collection);
    const id = item.id || item.slug || item.key || ("item_"+Date.now());
    const payload = {...item, id};
    if(c === "settings" && item.key && !payload.key) payload.key = item.key;
    const s = await getClient();
    if(!s){
      const arr = localGet(c);
      const idx = arr.findIndex(x => x.id === id || (payload.key && x.key === payload.key));
      if(idx >= 0) arr[idx] = payload; else arr.push(payload);
      return localSet(c, arr);
    }
    const {data,error} = await s.from(c).upsert(payload).select().single();
    if(error) return {ok:false, mode:"cloud", collection:c, error:error.message};
    return {ok:true, mode:"cloud", collection:c, data};
  }
  async function remove(collection,id){
    const c = normalizeCollection(collection);
    const s = await getClient();
    if(!s) return localSet(c, localGet(c).filter(x => x.id !== id));
    const {error} = await s.from(c).delete().eq("id", id);
    if(error) return {ok:false, mode:"cloud", collection:c, error:error.message};
    return {ok:true, mode:"cloud", collection:c};
  }
  async function uploadMedia(path,file,meta={}){
    const s = await getClient();
    if(!s){
      return {ok:false, mode:"local", error:"Chmura nie jest aktywna. Wpisz dane w cloud-config.js i ustaw enabled:true."};
    }
    const bucket = cfg.storageBucket || "elkass-media";
    const {data,error} = await s.storage.from(bucket).upload(path, file, {upsert:true, cacheControl:"3600"});
    if(error) return {ok:false, mode:"cloud", error:error.message};
    const pub = s.storage.from(bucket).getPublicUrl(path);
    const url = pub && pub.data && pub.data.publicUrl;
    await save("media", {id:path.replace(/[^a-z0-9]+/gi,"-").toLowerCase(), name:meta.label || file.name, label:meta.label || file.name, path, url, type:meta.type || "image", section:meta.section || meta.type || "", target:meta.target || "", active:true});
    return {ok:true, mode:"cloud", data, url};
  }
  async function exportLocal(){
    return {
      products: localGet("products"),
      categories: localGet("categories"),
      promotions: localGet("promotions"),
      media: localGet("media"),
      glossary: localGet("glossary"),
      settings: localGet("settings")
    };
  }
  async function pushLocalToCloud(){
    const s = await getClient();
    if(!s) return {ok:false, error:"Chmura nieaktywna"};
    const data = await exportLocal();
    const report = {};
    for(const [collection, rows] of Object.entries(data)){
      report[collection] = [];
      for(const row of rows || []){
        report[collection].push(await save(collection, row));
      }
    }
    return {ok:true, report};
  }

  window.ELKASSCloud = {
    config: cfg,
    status,
    list,
    save,
    remove,
    uploadMedia,
    localGet,
    localSet,
    exportLocal,
    pushLocalToCloud
  };
})();
