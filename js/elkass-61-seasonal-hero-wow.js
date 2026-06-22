/* ELKASS 6.1 — Seasonal Hero WOW + Header Fix */
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

  function getTheme(){
    return document.documentElement.getAttribute('data-elkass-theme60') || document.documentElement.getAttribute('data-elkass-season') || 'standard';
  }

  function normalizeHeader(){
    const logoCandidates=document.querySelectorAll('.logo h1,.header-logo h1,.site-logo h1,.brand-logo h1,.nav-logo h1,.brand-name,.brand-title');
    logoCandidates.forEach(el=>{
      let txt=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/ELKASS/i.test(txt) && /OLESNO/i.test(txt)){
        el.textContent='ELKASS OLESNO';
      }
    });
    const smalls=document.querySelectorAll('.logo small,.header-logo small,.site-logo small,.brand-subtitle,.tagline');
    smalls.forEach(el=>{
      if(/RTV|AGD|MULTIMEDIA|SERWIS/i.test(el.textContent||'')){
        el.textContent='RTV / AGD / MULTIMEDIA / SERWIS';
      }
    });
    document.querySelectorAll('a[href^="tel"],.phone-btn,.header-phone,.call-btn,.nav-phone').forEach(el=>{
      const t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(/34/.test(t) && /358/.test(t)){
        el.textContent='☎ 34 358 24 42';
      }
    });
  }

  function findHero(){
    return document.querySelector('.hero-section,.hero-premium,section.hero,.hero');
  }

  function ensureHero(){
    let hero=document.querySelector('.e61-seasonal-hero');
    if(hero) return hero;
    hero=document.createElement('section');
    hero.className='e61-seasonal-hero';
    hero.innerHTML=`<div class="e61-seasonal-copy"><span class="e61-seasonal-kicker"></span><h1 class="e61-seasonal-title"></h1><p class="e61-seasonal-subtitle"></p><div class="e61-seasonal-actions"><a class="e61-seasonal-primary" href="#promocje">Sprawdź promocje</a><a class="e61-seasonal-secondary" href="#kontakt">Zapytaj o dostępność</a></div></div><div class="e61-seasonal-visual"><div class="e61-seasonal-decor"></div></div>`;
    const original=findHero();
    if(original){
      original.parentNode.insertBefore(hero, original);
      original.classList.add('e61-original-hero-muted');
    }else{
      document.body.insertBefore(hero, document.body.firstChild);
    }
    return hero;
  }

  function applyHero(){
    normalizeHeader();
    const theme=getTheme();
    const data=themes[theme];
    const hero=ensureHero();
    if(!data){
      hero.style.display='none';
      document.querySelectorAll('.e61-original-hero-muted').forEach(el=>el.classList.remove('e61-original-hero-muted'));
      return;
    }
    hero.style.display='';
    const original=findHero();
    if(original && !original.classList.contains('e61-seasonal-hero')) original.classList.add('e61-original-hero-muted');
    hero.querySelector('.e61-seasonal-kicker').textContent=data.kicker;
    hero.querySelector('.e61-seasonal-title').textContent=data.title;
    hero.querySelector('.e61-seasonal-subtitle').textContent=data.subtitle;
    hero.querySelector('.e61-seasonal-decor').textContent=data.decor;
  }

  document.addEventListener('DOMContentLoaded',()=>{applyHero();setTimeout(applyHero,300);setTimeout(applyHero,900)});
  document.addEventListener('elkass:theme60-change',()=>setTimeout(applyHero,50));
  window.addEventListener('storage',()=>setTimeout(applyHero,100));
})();
