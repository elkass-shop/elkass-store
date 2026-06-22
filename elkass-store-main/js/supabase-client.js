// ELKASS ENTERPRISE 2.0 — Supabase helper
// Ładuje dane z Supabase, a jeśli Supabase nie jest jeszcze skonfigurowane,
// strona działa dalej na danych lokalnych/statycznych.

(function(){
  async function loadSupabaseLib(){
    if(window.supabase) return window.supabase;
    await new Promise((resolve, reject)=>{
      const s=document.createElement('script');
      s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      s.onload=resolve;
      s.onerror=reject;
      document.head.appendChild(s);
    });
    return window.supabase;
  }

  async function getClient(){
    const cfg = window.ELKASS_SUPABASE || {};
    if(!cfg.enabled || !cfg.url || !cfg.anonKey || cfg.url.includes('TWOJ-')) return null;
    const supabaseLib = await loadSupabaseLib();
    return supabaseLib.createClient(cfg.url, cfg.anonKey);
  }

  async function fetchTable(table, fallback){
    try{
      const client = await getClient();
      if(!client) return fallback || [];
      const { data, error } = await client.from(table).select('*').order('created_at', { ascending:false });
      if(error) throw error;
      return data || [];
    }catch(e){
      console.warn('ELKASS Supabase fallback:', table, e.message);
      return fallback || [];
    }
  }

  async function upsertRow(table, payload){
    const client = await getClient();
    if(!client) throw new Error('Supabase nie jest jeszcze skonfigurowany.');
    const { data, error } = await client.from(table).upsert(payload).select().single();
    if(error) throw error;
    return data;
  }

  async function deleteRow(table, id){
    const client = await getClient();
    if(!client) throw new Error('Supabase nie jest jeszcze skonfigurowany.');
    const { error } = await client.from(table).delete().eq('id', id);
    if(error) throw error;
    return true;
  }

  async function uploadFile(bucket, path, file){
    const client = await getClient();
    if(!client) throw new Error('Supabase nie jest jeszcze skonfigurowany.');
    const { error } = await client.storage.from(bucket).upload(path, file, { upsert:true, cacheControl:'3600' });
    if(error) throw error;
    const { data } = client.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  window.ELKASS_CLOUD = {
    getClient,
    fetchTable,
    upsertRow,
    deleteRow,
    uploadFile
  };
})();
