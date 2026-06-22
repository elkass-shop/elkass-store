/* ELKASS 6.2.2 HERO DEDUP + THEME SWITCH FIX */
(function(){
  const KEY_LIST=['elkassTheme60','elkassSeasonalTheme56','elkassSeasonalTheme'];
  const themes={
    christmas:{title:'Świąteczne okazje ELKASS',subtitle:'Prezenty, AGD i RTV dla domu w wyjątkowych cenach.'},
    mikolajki:{title:'Mikołajkowe niespodzianki',subtitle:'Prezenty, które cieszą — elektronika i AGD na każdą kieszeń.'},
    easter:{title:'Wielkanocne okazje',subtitle:'Radość zakupów i świeże promocje RTV/AGD dla domu.'},
    spring:{title:'Wiosenne odświeżenie domu',subtitle:'Nowy sezon, nowe możliwości i świetne ceny na sprzęt do domu.'},
    summer:{title:'Letnie okazje ELKASS',subtitle:'Słońce, rabaty i świetne ceny na RTV, AGD i multimedia.'},
    autumn:{title:'Jesienne inspiracje',subtitle:'Ciepły dom, komfort i sprzęt w najlepszych cenach.'},
    winter:{title:'Zimowe okazje ELKASS',subtitle:'Ciepło domu, wygoda i sprawdzone sprzęty w promocji.'},
    blackweek:{title:'BLACK WEEK',subtitle:'Największe rabaty roku na RTV, AGD i elektronikę premium.'},
    cyberweek:{title:'CYBER WEEK',subtitle:'Technologia przyszłości, mocne okazje i najlepsze ceny online.'}
  };
  const cats=[
    {name:'RTV',img:'assets/categories/rtv.svg',subs:['Telewizory','Soundbary','Audio'],href:'#promocje'},
    {name:'AGD',img:'assets/categories/agd.svg',subs:['Lodówki','Pralki','Zmywarki'],href:'#promocje'},
    {name:'AGD do zabudowy',img:'assets/categories/agd-zabudowa.svg',subs:['Piekarniki','Płyty','Okapy'],href:'#promocje'},
    {name:'Małe AGD',img:'assets/categories/male-agd.svg',subs:['Ekspresy','Odkurzacze','Żelazka'],href:'#promocje'},
    {name:'Komputery i telefony',img:'assets/categories/komputery-telefony.svg',subs:['Laptopy','Smartfony','Akcesoria'],href:'#promocje'},
    {name:'Serwis i doradztwo',img:'assets/categories/serwis.svg',subs:['Wsparcie','Konfiguracja','Pomoc'],href:'#kontakt'}
  ];
  function norm(t){
    if(!t)return 'standard';
    t=String(t).toLowerCase().trim();
    const map={default:'standard',black:'blackweek','black-week':'blackweek',cyber:'cyberweek'};
    return map[t]||t;
  }
  function parse(raw){
    if(!raw)return '';
    try{
      const p=JSON.parse(raw);
      return norm(p.theme||p.value||raw);
    }catch(e){return norm(raw)}
  }
  function readTheme(){
    for(const k of KEY_LIST){
      const t=parse(localStorage.getItem(k));
      if(t)return t;
    }
    return norm(document.documentElement.getAttribute('data-elkass-theme60')||document.documentElement.getAttribute('data-elkass-season')||'standard');
  }
  function writeTheme(t){
    t=norm(t);
    const payload=JSON.stringify({theme:t,updatedAt:new Date().toISOString(),version:'6.2.2'});
    KEY_LIST.forEach(k=>localStorage.setItem(k,payload));
    document.documentElement.setAttribute('data-elkass-theme60',t);
    document.documentElement.setAttribute('data-elkass-season',t);
  }
  function syncThemeButtons(){
    document.querySelectorAll('[data-theme]').forEach(btn=>{
      if(btn.dataset.e622Bound)return;
      btn.dataset.e622Bound='1';
      btn.addEventListener('click',()=>setTimeout(()=>{writeTheme(btn.dataset.theme);run()},20),true);
    });
  }
  function fixLogo(){
    const brand=document.querySelector('.site-header .brand,.header .brand,.brand');
    if(brand){
      const href=brand.getAttribute('href')||'#home';
      brand.setAttribute('href',href);
      brand.innerHTML='<span class="brand-main"><span>ELKASS</span> <em>OLESNO</em></span><span class="brand-sub">RTV / AGD / MULTIMEDIA / SERWIS</span>';
    }
    document.querySelectorAll('.header-phone,.phone-btn,.call-btn,.nav-phone,a[href^="tel"]').forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/34/.test(t)&&/358/.test(t)) el.textContent='☎ 34 358 24 42';
    });
  }
  function originalHero(){
    return document.querySelector('.hero-premium,.hero-section,section.hero,.hero:not(.e622-seasonal-hero):not(.e621-seasonal-hero):not(.e62-seasonal-hero):not(.e61-seasonal-hero)');
  }
  function cleanupHeroes(){
    document.querySelectorAll('.e61-seasonal-hero,.e62-seasonal-hero,.e621-seasonal-hero').forEach(el=>el.remove());
  }
  function ensureHero(){
    let h=document.querySelector('.e622-seasonal-hero');
    if(h)return h;
    h=document.createElement('section');
    h.className='e622-seasonal-hero';
    h.innerHTML='<div class="e622-seasonal-copy"><h1 class="e622-seasonal-title"></h1><p class="e622-seasonal-subtitle"></p><div class="e622-seasonal-actions"><a class="e622-seasonal-primary" href="#promocje">Sprawdź promocje</a><a class="e622-seasonal-secondary" href="#kontakt">Zapytaj o dostępność</a></div></div>';
    const orig=originalHero();
    if(orig){orig.parentNode.insertBefore(h,orig);orig.classList.add('e622-muted')}else{document.body.insertBefore(h,document.body.firstChild)}
    return h;
  }
  function applyHero(){
    cleanupHeroes();
    const theme=readTheme();
    document.documentElement.setAttribute('data-elkass-theme60',theme);
    document.documentElement.setAttribute('data-elkass-season',theme);
    const h=ensureHero();
    if(!themes[theme]){
      h.style.display='none';
      document.querySelectorAll('.e622-muted,.e621-muted,.e62-muted,.e61-original-hero-muted').forEach(el=>el.classList.remove('e622-muted','e621-muted','e62-muted','e61-original-hero-muted'));
      return;
    }
    const orig=originalHero();
    if(orig)orig.classList.add('e622-muted');
    h.style.display='';
    h.querySelector('.e622-seasonal-title').textContent=themes[theme].title;
    h.querySelector('.e622-seasonal-subtitle').textContent=themes[theme].subtitle;
  }
  function renderCategories(){
    const grid=document.getElementById('categories-grid')||document.querySelector('[data-category-grid],.category-grid,.elkass57-category-grid,.elkass-final-category-grid');
    if(!grid)return;
    grid.className='elkass57-category-grid';
    grid.innerHTML=cats.map(c=>'<article class="elkass57-category-card"><img src="'+c.img+'" alt="'+c.name+'" loading="lazy"><div class="elkass57-category-content"><h3>'+c.name+'</h3><p>'+c.subs.map(s=>'<span>'+s+'</span>').join('')+'</p><a href="'+c.href+'">Zobacz więcej →</a></div></article>').join('');
  }
  function cleanBadges(){
    document.querySelectorAll('.e60-theme-ribbon,.elkass-seasonal-badge').forEach(el=>el.remove());
    document.querySelectorAll('.section-title,.section-heading').forEach(el=>el.removeAttribute('data-season-label'));
  }
  function run(){fixLogo();syncThemeButtons();applyHero();renderCategories();cleanBadges()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,250);setTimeout(run,800);setTimeout(run,1600);setTimeout(run,3000)});
  document.addEventListener('elkass:theme60-change',e=>{if(e.detail&&e.detail.theme)writeTheme(e.detail.theme);setTimeout(run,30)});
  window.addEventListener('storage',()=>setTimeout(run,80));
  const mo=new MutationObserver(()=>{clearTimeout(window.__e622t);window.__e622t=setTimeout(run,80)});
  document.addEventListener('DOMContentLoaded',()=>mo.observe(document.body,{childList:true,subtree:true}));
})();
