/* ELKASS 6.4.2 — Unified Section Order + Seasonal WOW Atmosphere */
(function(){
  const ORDERED_SELECTORS = [
    '.shop-search-section',
    '.e622-seasonal-hero,.e621-seasonal-hero,.e62-seasonal-hero,.hero-premium,.hero-section,section.hero,.hero',
    '.trust-strip,.hero-stats,.stats-bar,.trust-stats',
    '.deal-banner-section',
    '#promocje,.promotions-section',
    '#oferta,.categories-section',
    '.cta-section',
    '.bestsellers-section',
    '.local-advantages',
    '.reviews-section,#opinie',
    '.gallery-teaser,#galeria',
    '.quick-info,.quick-actions,.service-pills,.benefit-pills,.elkass-service-buttons'
  ];

  const SEASON_DECOR = {
    autumn: ['🍂','🍁','🍂','🍁'],
    winter: ['❄️','❅','❄️','✨'],
    christmas: ['🎄','✨','🎁','⭐'],
    mikolajki: ['🎅','🎁','✨','⭐'],
    easter: ['🐣','🥚','🌿','🌼'],
    spring: ['🌸','🌿','🦋','🌼'],
    summer: ['☀️','🌴','🌊','✨'],
    blackweek: ['⚫','%','⚡','🛍️'],
    cyberweek: ['💻','⚡','🔷','🟣']
  };

  function currentTheme(){
    return document.documentElement.getAttribute('data-elkass-theme60') ||
           document.documentElement.getAttribute('data-elkass-season') ||
           'standard';
  }

  function isVisible(el){
    if(!el) return false;
    if(el.classList && (
      el.classList.contains('e61-seasonal-hero') ||
      el.classList.contains('e62-seasonal-hero') ||
      el.classList.contains('e621-seasonal-hero')
    )) return false;
    const style = getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  function firstVisible(selector){
    const list = Array.from(document.querySelectorAll(selector));
    return list.find(isVisible) || list[0] || null;
  }

  function getMainContainer(){
    const hero = firstVisible('.hero-premium,.e622-seasonal-hero,.hero-section,section.hero,.hero');
    if(hero && hero.parentElement) return hero.parentElement;
    return document.querySelector('main') || document.body;
  }

  function dedupeSeasonalHeroes(){
    document.querySelectorAll('.e61-seasonal-hero,.e62-seasonal-hero,.e621-seasonal-hero').forEach(el=>el.remove());
    const seasonal = document.querySelector('.e622-seasonal-hero');
    const theme = currentTheme();
    if(theme !== 'standard' && seasonal){
      document.querySelectorAll('.hero-premium,.hero-section,section.hero,.hero').forEach(el=>{
        if(!el.classList.contains('e622-seasonal-hero')) el.classList.add('e622-muted');
      });
    } else {
      document.querySelectorAll('.e622-muted,.e621-muted,.e62-muted,.e61-original-hero-muted').forEach(el=>{
        el.classList.remove('e622-muted','e621-muted','e62-muted','e61-original-hero-muted');
      });
    }
  }

  function reorderSections(){
    const container = getMainContainer();
    if(!container) return;

    dedupeSeasonalHeroes();

    const sections = [];
    ORDERED_SELECTORS.forEach(selector=>{
      const el = firstVisible(selector);
      if(el && !sections.includes(el)) sections.push(el);
    });

    if(!sections.length) return;

    // Wstawiamy kolejność na początku głównego kontenera, ale bez niszczenia reszty strony.
    let anchor = sections[0];
    if(anchor.parentElement !== container){
      container.insertBefore(anchor, container.firstElementChild || null);
    } else if(container.firstElementChild !== anchor){
      container.insertBefore(anchor, container.firstElementChild);
    }

    for(let i=1;i<sections.length;i++){
      const prev = sections[i-1];
      const current = sections[i];
      if(!current || !prev || current === prev) continue;
      if(current.parentElement !== container){
        container.insertBefore(current, prev.nextSibling);
      } else if(prev.nextSibling !== current){
        container.insertBefore(current, prev.nextSibling);
      }
    }
  }

  function buildAtmosphere(){
    const theme = currentTheme();
    const items = SEASON_DECOR[theme];
    let box = document.querySelector('.elkass-seasonal-atmosphere');

    if(!items){
      if(box) box.remove();
      return;
    }

    if(!box){
      box = document.createElement('div');
      box.className = 'elkass-seasonal-atmosphere';
      box.setAttribute('aria-hidden','true');
      document.body.appendChild(box);
    }

    const stamp = theme + '-v642';
    if(box.dataset.theme === stamp) return;
    box.dataset.theme = stamp;
    box.innerHTML = '';

    const count = window.innerWidth < 760 ? 16 : 30;
    for(let i=0;i<count;i++){
      const span = document.createElement('span');
      span.textContent = items[i % items.length];
      const x = Math.round((i * 37) % 104) - 2;
      const y = -8 - ((i * 11) % 70);
      const size = 20 + ((i * 7) % 30);
      const duration = 12 + ((i * 5) % 18);
      const delay = -((i * 1.7) % 16);
      const dx = ((i % 2 ? 1 : -1) * (18 + ((i * 13) % 64)));
      const opacity = 0.26 + ((i * 3) % 42) / 100;
      const rotate = ((i * 29) % 180) - 90;

      span.style.setProperty('--x', x + 'vw');
      span.style.setProperty('--y', y + 'vh');
      span.style.setProperty('--s', size + 'px');
      span.style.setProperty('--d', duration + 's');
      span.style.setProperty('--delay', delay + 's');
      span.style.setProperty('--dx', dx + 'px');
      span.style.setProperty('--o', opacity.toFixed(2));
      span.style.setProperty('--r', rotate + 'deg');
      box.appendChild(span);
    }
  }

  function run(){
    reorderSections();
    buildAtmosphere();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    run();
    setTimeout(run, 250);
    setTimeout(run, 800);
    setTimeout(run, 1600);
  });

  document.addEventListener('elkass:theme60-change', ()=>setTimeout(run, 80));
  window.addEventListener('storage', ()=>setTimeout(run, 120));
  window.addEventListener('resize', ()=>setTimeout(buildAtmosphere, 150));

  document.addEventListener('DOMContentLoaded', ()=>{
    const mo = new MutationObserver(()=>{
      clearTimeout(window.__elkass642);
      window.__elkass642 = setTimeout(run, 120);
    });
    mo.observe(document.body, { childList:true, subtree:true });
  });
})();
