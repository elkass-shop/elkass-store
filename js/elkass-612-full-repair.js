/* ELKASS 6.1.2 FULL REPAIR */
(function(){
  const themes={
    christmas:{kicker:'SEZON ŚWIĄTECZNY',title:'Świąteczne okazje ELKASS',subtitle:'Prezenty, AGD i RTV dla domu w wyjątkowych cenach.',decor:'🎄 🎁 ✨'},
    mikolajki:{kicker:'MIKOŁAJKI',title:'Mikołajkowe niespodzianki',subtitle:'Prezenty, które cieszą — elektronika i AGD na każdą kieszeń.',decor:'🎅 🎁'},
    easter:{kicker:'WIELKANOC',title:'Wielkanocne okazje',subtitle:'Radość zakupów i świeże promocje RTV/AGD dla domu.',decor:'🐣 🥚'},
    spring:{kicker:'WIOSNA',title:'Wiosenne odświeżenie domu',subtitle:'Nowy sezon, nowe możliwości i świetne ceny na sprzęt do domu.',decor:'🌸 🦋'},
    summer:{kicker:'LATO',title:'Letnie okazje ELKASS',subtitle:'Słońce, rabaty i świetne ceny na RTV, AGD i multimedia.',decor:'☀️ ✨'},
    autumn:{kicker:'JESIEŃ',title:'Jesienne inspiracje',subtitle:'Ciepły dom, komfort i sprzęt w najlepszych cenach.',decor:'🍂 🍁'},
    winter:{kicker:'ZIMA',title:'Zimowe okazje ELKASS',subtitle:'Ciepło domu, wygoda i sprawdzone sprzęty w promocji.',decor:'❄️ ✨'},
    blackweek:{kicker:'BLACK WEEK',title:'BLACK WEEK',subtitle:'Największe rabaty roku na RTV, AGD i elektronikę premium.',decor:'-50% ⚡'},
    cyberweek:{kicker:'CYBER WEEK',title:'CYBER WEEK',subtitle:'Technologia przyszłości, mocne okazje i najlepsze ceny online.',decor:'💻 ⚡'}
  };
  const cats=[
    {name:'RTV',img:'assets/categories/rtv.svg',subs:['Telewizory','Soundbary','Audio'],href:'#promocje'},
    {name:'AGD',img:'assets/categories/agd.svg',subs:['Lodówki','Pralki','Zmywarki'],href:'#promocje'},
    {name:'AGD do zabudowy',img:'assets/categories/agd-zabudowa.svg',subs:['Piekarniki','Płyty','Okapy'],href:'#promocje'},
    {name:'Małe AGD',img:'assets/categories/male-agd.svg',subs:['Ekspresy','Odkurzacze','Żelazka'],href:'#promocje'},
    {name:'Komputery i telefony',img:'assets/categories/komputery-telefony.svg',subs:['Laptopy','Smartfony','Akcesoria'],href:'#promocje'},
    {name:'Serwis i doradztwo',img:'assets/categories/serwis.svg',subs:['Wsparcie','Konfiguracja','Pomoc'],href:'#kontakt'}
  ];
  function getTheme(){return document.documentElement.getAttribute('data-elkass-theme60')||document.documentElement.getAttribute('data-elkass-season')||'standard'}
  function normalizeHeader(){
    document.querySelectorAll('.logo h1,.header-logo h1,.site-logo h1,.brand-logo h1,.nav-logo h1,.brand-name,.brand-title').forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/ELKASS/i.test(t)&&/OLESNO/i.test(t)) el.textContent='ELKASS OLESNO';
    });
    document.querySelectorAll('.logo small,.header-logo small,.site-logo small,.brand-subtitle,.tagline').forEach(el=>{
      if(/RTV|AGD|MULTIMEDIA|SERWIS/i.test(el.textContent||'')) el.textContent='RTV / AGD / MULTIMEDIA / SERWIS';
    });
    document.querySelectorAll('a[href^="tel"],.phone-btn,.header-phone,.call-btn,.nav-phone').forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/34/.test(t)&&/358/.test(t)) el.textContent='☎ 34 358 24 42';
    });
  }
  function findHero(){return document.querySelector('.hero-section,.hero-premium,section.hero,.hero')}
  function ensureHero(){
    let hero=document.querySelector('.e61-seasonal-hero');
    if(hero) return hero;
    hero=document.createElement('section');
    hero.className='e61-seasonal-hero';
    hero.innerHTML='<div class="e61-seasonal-copy"><span class="e61-seasonal-kicker"></span><h1 class="e61-seasonal-title"></h1><p class="e61-seasonal-subtitle"></p><div class="e61-seasonal-actions"><a class="e61-seasonal-primary" href="#promocje">Sprawdź promocje</a><a class="e61-seasonal-secondary" href="#kontakt">Zapytaj o dostępność</a></div></div><div class="e61-seasonal-visual"><div class="e61-seasonal-decor"></div></div>';
    const original=findHero();
    if(original){original.parentNode.insertBefore(hero,original);original.classList.add('e61-original-hero-muted')}else{document.body.insertBefore(hero,document.body.firstChild)}
    return hero;
  }
  function applyHero(){
    const theme=getTheme(); const data=themes[theme]; const hero=ensureHero();
    if(!data){hero.style.display='none';document.querySelectorAll('.e61-original-hero-muted').forEach(el=>el.classList.remove('e61-original-hero-muted'));return}
    hero.style.display='';
    const original=findHero(); if(original && !original.classList.contains('e61-seasonal-hero')) original.classList.add('e61-original-hero-muted');
    hero.querySelector('.e61-seasonal-kicker').textContent=data.kicker;
    hero.querySelector('.e61-seasonal-title').textContent=data.title;
    hero.querySelector('.e61-seasonal-subtitle').textContent=data.subtitle;
    hero.querySelector('.e61-seasonal-decor').textContent=data.decor;
  }
  function renderCategories(){
    const grid=document.getElementById('categories-grid')||document.querySelector('[data-category-grid],.category-grid,.elkass57-category-grid,.elkass-final-category-grid');
    if(!grid) return;
    grid.className='elkass57-category-grid';
    grid.innerHTML=cats.map(c=>'<article class="elkass57-category-card"><img src="'+c.img+'" alt="'+c.name+'" loading="lazy"><div class="elkass57-category-content"><h3>'+c.name+'</h3><p>'+c.subs.map(s=>'<span>'+s+'</span>').join('')+'</p><a href="'+c.href+'">Zobacz więcej →</a></div></article>').join('');
  }
  function adminMobile(){
    if(!/\/admin\/?/.test(location.pathname)) return;
    if(!document.querySelector('.admin-mobile-topbar')){
      const bar=document.createElement('div'); bar.className='admin-mobile-topbar'; bar.innerHTML='<button type="button" class="admin-mobile-menu-btn">☰ Menu</button><strong>ELKASS CMS</strong><button type="button" class="admin-mobile-close-btn">×</button>'; document.body.prepend(bar);
      const backdrop=document.createElement('div'); backdrop.className='admin-mobile-backdrop'; document.body.appendChild(backdrop);
      bar.querySelector('.admin-mobile-menu-btn').onclick=()=>document.body.classList.add('elkass-admin-menu-open');
      bar.querySelector('.admin-mobile-close-btn').onclick=()=>document.body.classList.remove('elkass-admin-menu-open');
      backdrop.onclick=()=>document.body.classList.remove('elkass-admin-menu-open');
      document.addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('elkass-admin-menu-open')});
    }
  }
  function removeBadges(){document.querySelectorAll('.e60-theme-ribbon,.elkass-seasonal-badge').forEach(el=>el.remove())}
  function run(){normalizeHeader();applyHero();renderCategories();adminMobile();removeBadges()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,300);setTimeout(run,900)});
  document.addEventListener('elkass:theme60-change',()=>setTimeout(run,50));
  window.addEventListener('resize',()=>setTimeout(adminMobile,50));
})();
