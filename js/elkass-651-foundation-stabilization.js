/* ELKASS 6.5.1 — Foundation Stabilization */
(function(){
  const ORDER = [
    '.shop-search-section,.quick-search-section,.search-section,#search,#szybkie-wyszukiwanie',
    '.e622-seasonal-hero,.hero-premium,.hero-section,section.hero,.hero',
    '.hero-stats,.stats-bar,.trust-stats',
    '.deal-banner-section',
    '#promocje,.promotions-section',
    '#oferta,.categories-section',
    '.cta-section',
    '.bestsellers-section',
    '.local-advantages',
    '.reviews-section,#opinie',
    '.gallery-teaser,#galeria'
  ];

  function visible(el){
    if(!el) return false;
    const s = getComputedStyle(el);
    return s.display !== 'none' && s.visibility !== 'hidden';
  }

  function first(sel){
    return Array.from(document.querySelectorAll(sel)).find(visible) || document.querySelector(sel);
  }

  function parentContainer(){
    const hero = first('.e622-seasonal-hero,.hero-premium,.hero-section,section.hero,.hero');
    return (hero && hero.parentElement) || document.querySelector('main') || document.body;
  }

  function reorder(){
    const container = parentContainer();
    const found = [];
    ORDER.forEach(sel=>{
      const el = first(sel);
      if(el && !found.includes(el)) found.push(el);
    });
    if(found.length < 2) return;
    found.forEach((el, i)=>{
      if(i === 0){
        if(el.parentElement !== container) container.insertBefore(el, container.firstElementChild || null);
        else if(container.firstElementChild !== el) container.insertBefore(el, container.firstElementChild);
      } else {
        const prev = found[i-1];
        if(el.parentElement !== container) container.insertBefore(el, prev.nextSibling);
        else if(prev.nextSibling !== el) container.insertBefore(el, prev.nextSibling);
      }
    });
  }

  function fixHeroWidth(){
    document.querySelectorAll('.hero-premium,.hero-section,section.hero,.hero,.e622-seasonal-hero').forEach(hero=>{
      hero.style.maxWidth = 'min(1500px, calc(100vw - 32px))';
      hero.style.width = 'min(1500px, calc(100vw - 32px))';
      hero.style.marginLeft = 'auto';
      hero.style.marginRight = 'auto';
      hero.style.overflow = 'hidden';
      hero.style.boxSizing = 'border-box';
    });
  }

  function fixAdminQuickStart(){
    if(!/\/admin\/?/.test(location.pathname)) return;
    if(!document.querySelector('.elkass-65-quickstart')){
      const target = document.querySelector('.dashboard-content,.admin-main,.main-content,main,.content') || document.body;
      const s = document.createElement('section');
      s.className = 'elkass-65-quickstart';
      s.innerHTML = '<h2>🚀 Szybki start</h2><div class="elkass-65-grid"><a class="elkass-65-tile" href="product-wizard-65.html">📦 Dodaj produkt krok po kroku<span>Nazwa, zdjęcie, cena, opis</span></a><a class="elkass-65-tile" href="category-tree-manager-631.html">📂 Kategorie i podkategorie<span>Aktywne, ukryte, grafiki</span></a><a class="elkass-65-tile" href="media-manager-65.html">🖼️ Grafiki i media<span>Hero, kategorie, produkty</span></a><a class="elkass-65-tile" href="glossary-manager-65.html">📚 Biblioteka terminów<span>Hasło + definicja</span></a></div>';
      target.prepend(s);
    }
  }

  function run(){
    reorder();
    fixHeroWidth();
    fixAdminQuickStart();
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    run();
    setTimeout(run, 300);
    setTimeout(run, 900);
    setTimeout(run, 1800);
  });
  window.addEventListener('resize', ()=>setTimeout(run, 120));
  document.addEventListener('elkass:theme60-change', ()=>setTimeout(run, 120));
})();
