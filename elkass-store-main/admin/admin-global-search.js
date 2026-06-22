(function(){
  const DATA_KEY = 'elkassAdminData';
  const DEFAULT_HINT = 'Wpisz np. telewizor, AGD, Samsung, hero, telefon, opinia, baner...';

  function $(id){ return document.getElementById(id); }
  function getData(){
    try{
      const saved = JSON.parse(localStorage.getItem(DATA_KEY) || 'null');
      if(saved) return saved;
    }catch(e){}
    if(window.data) return window.data;
    return {products:[], categories:[], gallery:[], partners:[], reviews:[], settings:{}, promoSettings:{}};
  }
  function norm(v){ return String(v || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
  function joinText(obj){
    if(!obj) return '';
    if(Array.isArray(obj)) return obj.map(joinText).join(' ');
    if(typeof obj === 'object') return Object.values(obj).map(joinText).join(' ');
    return String(obj);
  }
  function safe(text){
    return String(text ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[c]));
  }
  function activate(tab){
    if(typeof window.activateTab === 'function') window.activateTab(tab);
    else document.querySelector(`.tab[data-tab="${tab}"]`)?.click();
  }
  function scrollFocus(id){
    const el = $(id);
    if(el){ setTimeout(()=>{ el.scrollIntoView({behavior:'smooth', block:'center'}); try{el.focus();}catch(e){} },120); }
  }
  function setValue(id, value){ const el=$(id); if(el) el.value = value || ''; }

  function editGallery(item){
    activate('gallery');
    setValue('gallery-id', item.id); setValue('gallery-title', item.title); setValue('gallery-category', item.category); setValue('gallery-img', item.img);
    if(typeof window.updateGalleryPreview === 'function') window.updateGalleryPreview();
    scrollFocus('gallery-title');
  }
  function editPartner(item){
    activate('partners');
    setValue('partner-id', item.id); setValue('partner-name', item.name); setValue('partner-logo', item.logo);
    scrollFocus('partner-name');
  }
  function editReview(item){
    activate('reviews');
    setValue('review-id', item.id); setValue('review-name', item.name); setValue('review-city', item.city); setValue('review-text', item.text);
    scrollFocus('review-name');
  }
  function editSetting(key){
    const map = {
      heroTitle:['homepage','home-hero-title'], heroSubtitle:['homepage','home-hero-subtitle'], heroImg:['homepage','home-hero-img'],
      localTitle:['homepage','home-local-title'], localText:['homepage','home-local-text'], localImg:['homepage','home-local-img'],
      contactName:['contact','contact-name'], address:['contact','contact-address'], phone:['contact','contact-phone'], email:['contact','contact-email'], hours:['contact','contact-hours'], map:['contact','contact-map']
    };
    const target = map[key] || ['homepage', null];
    activate(target[0]); if(target[1]) scrollFocus(target[1]);
  }
  function editPromoSetting(){ activate('promotions'); scrollFocus('promo-section-title'); }
  function editPageSection(section){ activate('builder'); setTimeout(()=>{ const el = document.querySelector(`[data-section="${section}"]`); if(el) el.scrollIntoView({behavior:'smooth',block:'center'}); },120); }

  function collectResults(query){
    const data = getData();
    const q = norm(query).trim();
    if(q.length < 2) return [];
    const results = [];
    const push = (type, title, subtitle, text, action, score=1) => {
      const hay = norm([title, subtitle, text].join(' '));
      if(hay.includes(q)) results.push({type,title,subtitle,text,action,score: hay.indexOf(q)===0 ? score+5 : score});
    };

    (data.products||[]).forEach(p=>push('Produkt', p.name, `${p.category||''} • ${p.subcategory||''} • ${p.price||''} zł`, joinText(p), ()=>{
      if(typeof window.editProduct === 'function') window.editProduct(p.id); else activate('products');
    },10));

    (data.categories||[]).forEach(c=>{
      push('Kategoria', c.name, c.description||'', joinText(c), ()=>{ if(typeof window.editCategory==='function') window.editCategory(c.id); else activate('categories'); },8);
      (c.subcategories||[]).forEach(s=>push('Podkategoria', s.name, `w kategorii: ${c.name}`, joinText(s), ()=>{
        if(typeof window.editSubcategory==='function') window.editSubcategory(c.id,s.id); else activate('categories');
      },8));
    });

    (data.gallery||[]).forEach(g=>push('Galeria', g.title, g.category||'', joinText(g), ()=>editGallery(g),7));
    (data.partners||[]).forEach(b=>push('Partner', b.name, b.logo||'', joinText(b), ()=>editPartner(b),6));
    (data.reviews||[]).forEach(r=>push('Opinia', r.name, r.city||'', r.text||'', ()=>editReview(r),6));

    const settings = data.settings || {};
    Object.entries(settings).forEach(([key,val])=>{
      if(typeof val === 'object') return;
      const label = ({heroTitle:'Tytuł hero', heroSubtitle:'Podtytuł hero', heroImg:'Zdjęcie hero', localTitle:'Sekcja lokalna - tytuł', localText:'Sekcja lokalna - tekst', localImg:'Sekcja lokalna - zdjęcie', contactName:'Nazwa kontaktowa', address:'Adres', phone:'Telefon', email:'E-mail', hours:'Godziny', map:'Mapa'})[key] || key;
      push('Treść strony', label, String(val||''), key, ()=>editSetting(key),5);
    });
    Object.entries(settings.sections||{}).forEach(([key,val])=>push('Sekcja strony', key, val?'Włączona':'Wyłączona', key, ()=>editPageSection(key),4));

    if(data.promoSettings){
      Object.entries(data.promoSettings).forEach(([key,val])=>push('Ustawienia promocji', key, String(val), joinText(data.promoSettings), ()=>editPromoSetting(),5));
    }

    const direct = [
      ['Media Manager','Dodaj lub znajdź zdjęcia, WEBP, PNG, JPG, SVG','media'],
      ['Superadmin','Ustawienia konta, sekcje i mapa panelu','superadmin'],
      ['Kreator strony','Włączanie sekcji, treści i kolejność','builder'],
      ['SEO','Tytuły, opisy i ustawienia Google','seo'],
      ['Wygląd','Kolory, styl, wygląd strony','appearance'],
      ['Banery','Hero, bannery i grafiki promocyjne','banners'],
      ['Promocje','Hit dnia, hit tygodnia, Black Friday, rabaty','promotions'],
      ['Kontakt','Adres, telefon, e-mail, godziny, mapa','contact'],
      ['Kopia / eksport','Import JSON, eksport danych, backup','backup']
    ];
    direct.forEach(([title, text, tab])=>push('Moduł panelu', title, text, text, ()=>activate(tab),3));

    return results.sort((a,b)=>b.score-a.score).slice(0,30);
  }

  function createUI(){
    const topbar = document.querySelector('.topbar');
    if(!topbar || $('admin-global-search')) return;
    const wrap = document.createElement('section');
    wrap.className = 'admin-global-search';
    wrap.innerHTML = `
      <div class="admin-global-search-head">
        <div>
          <strong>🔍 Szybka wyszukiwarka panelu</strong>
          <span>Znajdź produkt, kategorię, podkategorię, opinię, partnera, zdjęcie, tekst strony lub ustawienie.</span>
        </div>
        <button type="button" id="admin-search-clear">Wyczyść</button>
      </div>
      <div class="admin-search-input-wrap">
        <input id="admin-global-search" type="search" placeholder="${DEFAULT_HINT}">
        <span>Ctrl + K</span>
      </div>
      <div id="admin-search-results" class="admin-search-results hidden"></div>
    `;
    topbar.insertAdjacentElement('afterend', wrap);

    const input = $('admin-global-search');
    const box = $('admin-search-results');
    function render(){
      const items = collectResults(input.value);
      if(!input.value.trim()){ box.classList.add('hidden'); box.innerHTML=''; return; }
      if(!items.length){ box.classList.remove('hidden'); box.innerHTML = `<div class="admin-search-empty">Brak wyników. Spróbuj innego słowa albo sprawdź, czy element istnieje w CMS.</div>`; return; }
      box.classList.remove('hidden');
      box.innerHTML = items.map((r,i)=>`<button type="button" class="admin-search-result" data-i="${i}"><span>${safe(r.type)}</span><strong>${safe(r.title)}</strong><small>${safe(r.subtitle||r.text||'')}</small></button>`).join('');
      box.querySelectorAll('.admin-search-result').forEach(btn=>btn.onclick=()=>{ const item=items[Number(btn.dataset.i)]; box.classList.add('hidden'); input.value=''; item.action(); });
    }
    input.addEventListener('input', render);
    $('admin-search-clear').onclick = ()=>{ input.value=''; box.classList.add('hidden'); box.innerHTML=''; input.focus(); };
    document.addEventListener('keydown', e=>{ if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); input.focus(); input.select(); }});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createUI); else createUI();
})();
