/* ELKASS 6.4.1 — Premium Nav + Product Links + Seasonal Order Fix */
(function(){
  function slugify(text){return String(text||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,80);}
  function normalizeLogo(){
    var brand=document.querySelector('.site-header .brand,.header .brand,.brand');
    if(brand){var href=brand.getAttribute('href')||'#home';brand.setAttribute('href',href);brand.innerHTML='<span class="brand-main"><span>ELKASS</span> <em>OLESNO</em></span><span class="brand-sub">RTV / AGD / MULTIMEDIA / SERWIS</span>';}
    document.querySelectorAll('.header-phone,.phone-btn,.call-btn,.nav-phone,a[href^="tel"]').forEach(function(el){var t=(el.textContent||'').replace(/\s+/g,' ').trim();if(/34/.test(t)&&/358/.test(t))el.textContent='☎ 34 358 24 42';});
  }
  function addInquiryButton(){
    var header=document.querySelector('.header-inner,.site-header .container,.navbar,.nav-wrap'); if(!header||document.querySelector('.elkass-premium-inquiry-btn'))return;
    var phone=header.querySelector('.header-phone,.phone-btn,.call-btn,.nav-phone,a[href^="tel"]');
    var a=document.createElement('a'); a.className='elkass-premium-inquiry-btn'; a.href='#kontakt'; a.textContent='📩 Zapytaj o produkt';
    if(phone&&phone.parentNode)phone.parentNode.insertBefore(a,phone); else header.appendChild(a);
  }
  function getCardTitle(card){
    var selectors=['[data-product-name]','.product-title','.promo-title','.deal-title','.offer-title','h2','h3','h4','strong','b'];
    for(var i=0;i<selectors.length;i++){var el=card.querySelector(selectors[i]); if(el){var t=(el.getAttribute('data-product-name')||el.textContent||'').replace(/\s+/g,' ').trim(); if(t&&t.length>2&&!/hit|promocja|nowość|super|cena|popularne/i.test(t))return t;}}
    var txt=(card.textContent||'').replace(/\s+/g,' ').trim();
    var m=txt.match(/(Lodówka|Pralka|Piekarnik|Ekspres|Smartfon|Telewizor|Soundbar|Laptop|Chłodziarka|Zmywarka)[^•]{3,70}/i);
    return m?m[0].trim():'';
  }
  function productUrl(title,card){var id=card.getAttribute('data-product-id')||card.dataset.productId||slugify(title);return 'product.html?id='+encodeURIComponent(id);}
  function linkifyCard(card){
    if(!card||card.dataset.elkass641Linked||card.closest('a'))return;
    var title=getCardTitle(card); if(!title)return;
    card.dataset.elkass641Linked='1'; card.classList.add('elkass-linkified','elkass-product-link-card');
    var overlay=document.createElement('a'); overlay.href=productUrl(title,card); overlay.className='elkass-card-link-overlay'; overlay.setAttribute('aria-label','Zobacz produkt: '+title); overlay.textContent='Zobacz produkt: '+title; card.appendChild(overlay);
  }
  function linkifyProducts(){
    var selectors=['.product-card','.promo-card','.deal-card','.hit-card','.offer-card','.popular-card','.promo-strip > *','.deal-strip > *','.top-offers-strip > *','[class*="product-card"]','[class*="promo-card"]','[class*="deal-card"]'];
    var seen=new Set();
    selectors.forEach(function(sel){document.querySelectorAll(sel).forEach(function(card){if(seen.has(card))return;seen.add(card);var txt=(card.textContent||'').trim();if(txt.length<4)return;if(/(Lodówka|Pralka|Piekarnik|Ekspres|Smartfon|Telewizor|Soundbar|Laptop|Chłodziarka|Zmywarka|Samsung|Beko|TCL|Philips|LG|Bosch|Lenovo)/i.test(txt))linkifyCard(card);});});
  }
  function ensureServiceButtons(){
    if(document.querySelector('.elkass-service-buttons,.quick-actions,.service-pills,.benefit-pills'))return;
    var hero=document.querySelector('.e622-seasonal-hero,.hero-premium,.hero-section,section.hero,.hero'); if(!hero||!hero.parentNode)return;
    var box=document.createElement('section'); box.className='elkass-service-buttons'; box.innerHTML='<a href="#raty">💳 Zakupy na raty</a><a href="#platnosci">⚡ Płatność BLIK</a><a href="#dostawa">🚚 Dostawa sprzętu</a><a href="#serwis">🛠 Pomoc serwisowa</a>'; hero.parentNode.insertBefore(box,hero.nextSibling);
  }
  function fixSeasonalOrder(){
    var hero=document.querySelector('.e622-seasonal-hero,.e621-seasonal-hero,.e62-seasonal-hero,.hero-premium,.hero-section,section.hero,.hero');
    var stats=document.querySelector('.hero-stats,.stats-bar,.trust-stats');
    var strip=document.querySelector('.promo-strip,.deal-strip,.top-offers-strip');
    var services=document.querySelector('.elkass-service-buttons,.quick-actions,.service-pills,.benefit-pills');
    if(hero&&hero.parentNode){if(stats&&stats.parentNode&&(stats.compareDocumentPosition(hero)&Node.DOCUMENT_POSITION_PRECEDING)){hero.parentNode.insertBefore(stats,hero.nextSibling);}if(strip&&stats&&stats.parentNode){stats.parentNode.insertBefore(strip,stats.nextSibling);}if(services&&strip&&strip.parentNode){strip.parentNode.insertBefore(services,strip.nextSibling);}}
  }
  function run(){normalizeLogo();addInquiryButton();ensureServiceButtons();linkifyProducts();fixSeasonalOrder();}
  document.addEventListener('DOMContentLoaded',function(){run();setTimeout(run,300);setTimeout(run,900);setTimeout(run,1800);});
  document.addEventListener('elkass:theme60-change',function(){setTimeout(run,80);});
  window.addEventListener('storage',function(){setTimeout(run,120);});
  document.addEventListener('DOMContentLoaded',function(){var mo=new MutationObserver(function(){clearTimeout(window.__elkass641);window.__elkass641=setTimeout(run,120);});mo.observe(document.body,{childList:true,subtree:true});});
})();
