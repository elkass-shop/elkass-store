/* ELKASS 6.2.1 TRUE VISUAL FIX */
(function(){
  const THEME_KEYS=['elkassTheme60','elkassSeasonalTheme56','elkassSeasonalTheme'];
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
  function readTheme(){
    for(const k of THEME_KEYS){
      try{
        const raw=localStorage.getItem(k);
        if(!raw)continue;
        const parsed=JSON.parse(raw);
        const t=norm(parsed.theme||parsed.value||raw);
        if(t)return t;
      }catch(e){
        const raw=localStorage.getItem(k);
        if(raw)return norm(raw);
      }
    }
    return norm(document.documentElement.getAttribute('data-elkass-theme60')||document.documentElement.getAttribute('data-elkass-season')||'standard');
  }
  function applyThemeAttr(){
    const t=readTheme();
    document.documentElement.setAttribute('data-elkass-theme60',t);
    document.documentElement.setAttribute('data-elkass-season',t);
    return t;
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
  function findOriginalHero(){
    return document.querySelector('.hero-premium,.hero-section,section.hero,.hero:not(.e621-seasonal-hero)');
  }
  function ensureHero(){
    let hero=document.querySelector('.e621-seasonal-hero');
    if(hero)return hero;
    hero=document.createElement('section');
    hero.className='e621-seasonal-hero';
    hero.innerHTML='<div class="e621-seasonal-copy"><h1 class="e621-seasonal-title"></h1><p class="e621-seasonal-subtitle"></p><div class="e621-seasonal-actions"><a class="e621-seasonal-primary" href="#promocje">Sprawdź promocje</a><a class="e621-seasonal-secondary" href="#kontakt">Zapytaj o dostępność</a></div></div>';
    const orig=findOriginalHero();
    if(orig){
      orig.parentNode.insertBefore(hero,orig);
      orig.classList.add('e621-muted');
    }else{
      document.body.insertBefore(hero,document.body.firstChild);
    }
    return hero;
  }
  function hero(){
    const theme=applyThemeAttr();
    document.querySelectorAll('.e61-seasonal-hero,.e62-seasonal-hero').forEach(el=>el.remove());
    const h=ensureHero();
    if(!themes[theme]){
      h.style.display='none';
      document.querySelectorAll('.e621-muted,.e62-muted,.e61-original-hero-muted').forEach(el=>el.classList.remove('e621-muted','e62-muted','e61-original-hero-muted'));
      return;
    }
    const orig=findOriginalHero();
    if(orig && !orig.classList.contains('e621-seasonal-hero')) orig.classList.add('e621-muted');
    h.style.display='';
    h.querySelector('.e621-seasonal-title').textContent=themes[theme].title;
    h.querySelector('.e621-seasonal-subtitle').textContent=themes[theme].subtitle;
  }
  function categories(){
    const grid=document.getElementById('categories-grid')||document.querySelector('[data-category-grid],.category-grid,.elkass57-category-grid,.elkass-final-category-grid');
    if(!grid)return;
    grid.className='elkass57-category-grid';
    grid.innerHTML=cats.map(c=>'<article class="elkass57-category-card"><img src="'+c.img+'" alt="'+c.name+'" loading="lazy"><div class="elkass57-category-content"><h3>'+c.name+'</h3><p>'+c.subs.map(s=>'<span>'+s+'</span>').join('')+'</p><a href="'+c.href+'">Zobacz więcej →</a></div></article>').join('');
  }
  function clean(){
    document.querySelectorAll('.e60-theme-ribbon,.elkass-seasonal-badge').forEach(el=>el.remove());
    document.querySelectorAll('.section-title,.section-heading').forEach(el=>el.removeAttribute('data-season-label'));
  }
  function run(){
    fixLogo();
    hero();
    categories();
    clean();
  }
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,250);setTimeout(run,800);setTimeout(run,1600)});
  document.addEventListener('elkass:theme60-change',()=>setTimeout(run,50));
  window.addEventListener('storage',()=>setTimeout(run,80));
})();
