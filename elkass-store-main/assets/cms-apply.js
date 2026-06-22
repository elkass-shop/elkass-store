(function(){
  const CMS_KEY='elkassFullCmsV42';
  function get(){try{return JSON.parse(localStorage.getItem(CMS_KEY)||'null')}catch(e){return null}}
  const cms=get(); if(!cms) return;
  const qs=s=>document.querySelector(s);
  const qsa=s=>Array.from(document.querySelectorAll(s));
  const setText=(sel,val)=>{const el=qs(sel); if(el&&val) el.textContent=val};
  const setHtml=(sel,val)=>{const el=qs(sel); if(el&&val) el.innerHTML=val};
  const setImg=(sel,val)=>{const el=qs(sel); if(el&&val) el.src=val};
  const setHref=(sel,val)=>{const el=qs(sel); if(el&&val) el.href=val};
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const app=cms.appearance||{};
  document.documentElement.style.setProperty('--red',app.accent||'#e30613');
  document.documentElement.style.setProperty('--green',app.green||'#8bc34a');
  document.documentElement.style.setProperty('--radius',((app.radius||24)+'px'));
  document.body.dataset.headerMode=app.headerMode||'light';
  const seo=cms.seo||{}; if(seo.title) document.title=seo.title; const md=qs('meta[name="description"]'); if(md&&seo.description) md.content=seo.description;
  const g=cms.general||{};
  if(g.logo){ const logo=qs('.logo-top,.logo strong,.header .logo'); if(logo) logo.innerHTML=esc(g.logo).replace('ELKASS','<span class="red">ELKASS</span>'); }
  setText('.logo-bottom',g.logoSub); qsa('a[href^="tel:"]').forEach(a=>{if(g.phone){a.href='tel:'+g.phone.replace(/\s/g,''); if(a.classList.contains('desktop-call')) a.textContent='📞 '+g.phone;}});
  const h=cms.hero||{}; setText('.hero-copy h1',h.title); setText('.hero-copy p',h.subtitle); setImg('.hero-visual-img',h.image); setHref('.hero-buttons a:first-child',h.btn1Link); setText('.hero-buttons a:first-child',h.btn1Text); setHref('.hero-buttons a:nth-child(2)',h.btn2Link); setText('.hero-buttons a:nth-child(2)',h.btn2Text);
  const badges=qs('.hero-badges'); if(badges&&h.badges) badges.innerHTML=h.badges.map(b=>`<span>${esc(b)}</span>`).join('');
  const qa=qs('.quick-actions'); if(qa&&Array.isArray(cms.quickActions)) qa.innerHTML=cms.quickActions.map(a=>`<a href="${esc(a[1]||'#')}">${esc(a[0]||'')}</a>`).join('');
  const l=cms.local||{}; setText('.local-advantages h2',l.title); setText('.local-advantages p',l.text); setImg('.local-advantages img',l.image);
  const lc=qs('.local-cards'); if(lc&&Array.isArray(l.cards)) lc.innerHTML=l.cards.map(c=>`<article>${esc(c[0])} <strong>${esc(c[1])}</strong><span>${esc(c[2])}</span></article>`).join('');
  const ga=cms.gallery||{}; setText('.gallery-teaser-copy .eyebrow',ga.eyebrow); setText('.gallery-teaser-copy h2',ga.title); setText('.gallery-teaser-copy p',ga.text); setText('.gallery-teaser-copy .btn',ga.button); setImg('.gallery-teaser-photo img',ga.image);
  const sections=cms.sections||{};
  const map={search:'.shop-search-section',hero:'#home',trust:'.trust-strip',deals:'.weekly-deal-section,.deal-section',products:'#promocje',categories:'#oferta',bestsellers:'.bestsellers-section',reviews:'#opinie,.reviews-section',local:'.local-advantages',gallery:'#galeria',about:'#onas',contact:'#kontakt',partners:'.brands'};
  Object.entries(map).forEach(([k,sel])=>{if(sections[k]===false) qsa(sel).forEach(el=>el.style.display='none')});
  const c=cms.custom||{}; if(c.visible && !qs('.cms-custom-section')){ const node=document.createElement('section'); node.className='section cms-custom-section reveal active'; node.innerHTML=`<div class="container cms-custom-grid"><div><span class="eyebrow">${esc(c.eyebrow)}</span><h2>${esc(c.title)}</h2><p>${esc(c.text)}</p><a class="btn btn-primary" href="${esc(c.link||'#')}">${esc(c.button||'Sprawdź →')}</a></div><img src="${esc(c.image||'assets/banners/weekend-sale.jpg')}" alt="${esc(c.title)}"></div>`; const before=qs('#kontakt')||qs('.footer'); (before?.parentNode||document.body).insertBefore(node,before||null); }
})();
