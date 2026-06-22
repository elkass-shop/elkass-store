/* ELKASS 6.2 TRUE SEASONAL GRAPHICS */
(function(){
  const themes={
    christmas:{kicker:'SEZON ŚWIĄTECZNY',title:'Świąteczne okazje ELKASS',subtitle:'Prezenty, AGD i RTV dla domu w wyjątkowych cenach.'},
    mikolajki:{kicker:'MIKOŁAJKI',title:'Mikołajkowe niespodzianki',subtitle:'Prezenty, które cieszą — elektronika i AGD na każdą kieszeń.'},
    easter:{kicker:'WIELKANOC',title:'Wielkanocne okazje',subtitle:'Radość zakupów i świeże promocje RTV/AGD dla domu.'},
    spring:{kicker:'WIOSNA',title:'Wiosenne odświeżenie domu',subtitle:'Nowy sezon, nowe możliwości i świetne ceny na sprzęt do domu.'},
    summer:{kicker:'LATO',title:'Letnie okazje ELKASS',subtitle:'Słońce, rabaty i świetne ceny na RTV, AGD i multimedia.'},
    autumn:{kicker:'JESIEŃ',title:'Jesienne inspiracje',subtitle:'Ciepły dom, komfort i sprzęt w najlepszych cenach.'},
    winter:{kicker:'ZIMA',title:'Zimowe okazje ELKASS',subtitle:'Ciepło domu, wygoda i sprawdzone sprzęty w promocji.'},
    blackweek:{kicker:'BLACK WEEK',title:'BLACK WEEK',subtitle:'Największe rabaty roku na RTV, AGD i elektronikę premium.'},
    cyberweek:{kicker:'CYBER WEEK',title:'CYBER WEEK',subtitle:'Technologia przyszłości, mocne okazje i najlepsze ceny online.'}
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
    const logoBlocks=document.querySelectorAll('.logo,.header-logo,.site-logo,.brand-logo,.nav-logo');
    logoBlocks.forEach(block=>{
      const txt=(block.textContent||'').replace(/\s+/g,' ').trim();
      if(/ELKASS/i.test(txt)&&/OLESNO/i.test(txt)){
        const link=block.querySelector('a')||block;
        const href=block.querySelector('a') ? block.querySelector('a').getAttribute('href') : null;
        const html='<span class="elkass-logo-line"><span style="color:#e30613">ELKASS</span> <span style="color:#7abf2e">OLESNO</span></span><span class="elkass-logo-subline">RTV / AGD / MULTIMEDIA / SERWIS</span>';
        if(link===block){block.innerHTML=html}else{link.innerHTML=html;if(href)link.setAttribute('href',href)}
      }
    });
    document.querySelectorAll('.logo h1,.header-logo h1,.site-logo h1,.brand-logo h1,.nav-logo h1,.brand-name,.brand-title').forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/ELKASS/i.test(t)&&/OLESNO/i.test(t)) el.textContent='ELKASS OLESNO';
    });
    document.querySelectorAll('a[href^="tel"],.phone-btn,.header-phone,.call-btn,.nav-phone').forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/34/.test(t)&&/358/.test(t)) el.textContent='☎ 34 358 24 42';
    });
  }
  function findHero(){return document.querySelector('.hero-section,.hero-premium,section.hero,.hero')}
  function ensureHero(){
    let hero=document.querySelector('.e62-seasonal-hero');
    if(hero)return hero;
    hero=document.createElement('section');
    hero.className='e62-seasonal-hero';
    hero.innerHTML='<div class="e62-seasonal-copy"><span class="e62-seasonal-kicker"></span><h1 class="e62-seasonal-title"></h1><p class="e62-seasonal-subtitle"></p><div class="e62-seasonal-actions"><a class="e62-seasonal-primary" href="#promocje">Sprawdź promocje</a><a class="e62-seasonal-secondary" href="#kontakt">Zapytaj o dostępność</a></div></div>';
    const original=findHero();
    if(original){original.parentNode.insertBefore(hero,original);original.classList.add('e62-muted')}else{document.body.insertBefore(hero,document.body.firstChild)}
    return hero;
  }
  function applyHero(){
    const theme=getTheme();const data=themes[theme];const hero=ensureHero();
    document.querySelectorAll('.e61-seasonal-hero').forEach(el=>el.remove());
    if(!data){hero.style.display='none';document.querySelectorAll('.e62-muted,.e61-original-hero-muted').forEach(el=>el.classList.remove('e62-muted','e61-original-hero-muted'));return}
    hero.style.display='';
    const original=findHero();
    if(original && !original.classList.contains('e62-seasonal-hero')) original.classList.add('e62-muted');
    hero.querySelector('.e62-seasonal-kicker').textContent=data.kicker;
    hero.querySelector('.e62-seasonal-title').textContent=data.title;
    hero.querySelector('.e62-seasonal-subtitle').textContent=data.subtitle;
  }
  function renderCategories(){
    const grid=document.getElementById('categories-grid')||document.querySelector('[data-category-grid],.category-grid,.elkass57-category-grid,.elkass-final-category-grid');
    if(!grid)return;
    grid.className='elkass57-category-grid';
    grid.innerHTML=cats.map(c=>'<article class="elkass57-category-card"><img src="'+c.img+'" alt="'+c.name+'" loading="lazy"><div class="elkass57-category-content"><h3>'+c.name+'</h3><p>'+c.subs.map(s=>'<span>'+s+'</span>').join('')+'</p><a href="'+c.href+'">Zobacz więcej →</a></div></article>').join('');
  }
  function adminMobile(){
    if(!/\/admin\/?/.test(location.pathname))return;
    if(!document.querySelector('.admin-mobile-topbar')){
      const bar=document.createElement('div');bar.className='admin-mobile-topbar';bar.innerHTML='<button type="button" class="admin-mobile-menu-btn">☰ Menu</button><strong>ELKASS CMS</strong><button type="button" class="admin-mobile-close-btn">×</button>';document.body.prepend(bar);
      const backdrop=document.createElement('div');backdrop.className='admin-mobile-backdrop';document.body.appendChild(backdrop);
      bar.querySelector('.admin-mobile-menu-btn').onclick=()=>document.body.classList.add('elkass-admin-menu-open');
      bar.querySelector('.admin-mobile-close-btn').onclick=()=>document.body.classList.remove('elkass-admin-menu-open');
      backdrop.onclick=()=>document.body.classList.remove('elkass-admin-menu-open');
      document.addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('elkass-admin-menu-open')});
    }
  }
  function cleanOld(){
    document.querySelectorAll('.e60-theme-ribbon,.elkass-seasonal-badge').forEach(el=>el.remove());
    document.querySelectorAll('.section-title,.section-heading').forEach(el=>el.removeAttribute('data-season-label'));
  }
  function run(){normalizeHeader();applyHero();renderCategories();adminMobile();cleanOld()}
  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,300);setTimeout(run,900);setTimeout(run,1800)});
  document.addEventListener('elkass:theme60-change',()=>setTimeout(run,50));
  window.addEventListener('storage',()=>setTimeout(run,80));
})();
