/* ELKASS 6.6 Cloud Foundation — one data layer for phone/desktop + local fallback */
(function(){
  const cfg = window.ELKASS_CLOUD_CONFIG || {};
  const P = "elkass_cloud_";
  const defaults = {products:[], categories:[], promotions:[], media:[], settings:{layoutMode:"classic",seasonalTheme:"standard"}, glossary:[]};

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function localGet(c){try{return JSON.parse(localStorage.getItem(P+c)) || clone(defaults[c]||[])}catch(e){return clone(defaults[c]||[])}}
  function localSet(c,v){localStorage.setItem(P+c, JSON.stringify(v)); window.dispatchEvent(new CustomEvent("elkass:cloud-change",{detail:{collection:c,mode:"local"}})); return {ok:true,mode:"local"};}
  async function client(){
    if(!cfg.enabled || !cfg.supabaseUrl || !cfg.supabaseAnonKey) return null;
    if(window.supabase && window.supabase.createClient) return window.supabase.createClient(cfg.supabaseUrl,cfg.supabaseAnonKey);
    return null;
  }
  async function list(c){
    const s = await client();
    if(!s) return localGet(c);
    const {data,error}=await s.from(c).select("*").order("updated_at",{ascending:false});
    if(error){console.warn("[ELKASS 6.6] cloud fallback",c,error.message);return localGet(c);}
    return data||[];
  }
  async function save(c,item){
    const s = await client();
    const id = item.id || item.slug || ("item_"+Date.now());
    const payload = {...item,id,updated_at:new Date().toISOString()};
    if(!s){
      const arr=localGet(c); const i=arr.findIndex(x=>x.id===id); if(i>=0)arr[i]=payload; else arr.push(payload);
      return localSet(c,arr);
    }
    const {data,error}=await s.from(c).upsert(payload).select().single();
    if(error)return {ok:false,mode:"cloud",error:error.message};
    return {ok:true,mode:"cloud",data};
  }
  async function remove(c,id){
    const s=await client();
    if(!s)return localSet(c, localGet(c).filter(x=>x.id!==id));
    const {error}=await s.from(c).delete().eq("id",id);
    if(error)return {ok:false,mode:"cloud",error:error.message};
    return {ok:true,mode:"cloud"};
  }
  async function uploadMedia(path,file,meta={}){
    const s=await client();
    if(!s)return {ok:false,mode:"local",error:"Chmura nie jest aktywna. Włącz Supabase w cloud-config.js."};
    const bucket=cfg.storageBucket||"elkass-media";
    const {data,error}=await s.storage.from(bucket).upload(path,file,{upsert:true});
    if(error)return {ok:false,mode:"cloud",error:error.message};
    const pub=s.storage.from(bucket).getPublicUrl(path);
    const url=pub && pub.data && pub.data.publicUrl;
    await save("media",{id:path.replace(/[^a-z0-9]+/gi,"-").toLowerCase(),path,url,...meta});
    return {ok:true,mode:"cloud",data,url};
  }
  function status(){return cfg.enabled ? "cloud-ready" : "local-fallback";}
  window.ELKASSCloud={config:cfg,list,save,remove,uploadMedia,localGet,localSet,status};
})();
