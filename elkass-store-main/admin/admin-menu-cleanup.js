/* ELKASS 4.5 — Admin Menu Cleanup */
(function(){
  function norm(t){return String(t||'').toLowerCase().replace(/\s+/g,' ').trim();}
  function makeLink(text, href, className, gradient){
    const a=document.createElement('a');
    a.href=href;
    a.textContent=text;
    a.className='tab '+className;
    a.style.cssText='display:block;margin:10px 0;padding:14px 18px;border-radius:16px;background:'+gradient+';color:#fff;font-weight:900;text-decoration:none;box-shadow:0 14px 32px rgba(15,23,42,.22);line-height:1.2;';
    return a;
  }
  function cleanup(){
    const side=document.querySelector('.sidebar, aside, nav, .admin-sidebar');
    if(!side) return;

    // Remove duplicated Premium Wizard buttons/links
    const premium=[];
    side.querySelectorAll('a,button,.tab,[role="button"]').forEach(el=>{
      const t=norm(el.textContent);
      if(t.includes('kreator premium produktu') || t.includes('dodaj produkt krok po kroku')){
        premium.push(el);
      }
    });

    premium.forEach((el,i)=>{
      if(i===0){
        el.textContent='⭐ Kreator Premium Produktu';
        el.onclick=function(e){e.preventDefault(); window.location.href='premium-product-wizard.html';};
        if(el.tagName.toLowerCase()==='a') el.href='premium-product-wizard.html';
        el.classList.add('elkass-clean-premium-link');
      }else{
        el.remove();
      }
    });

    if(!side.querySelector('.elkass-clean-premium-link')){
      side.insertBefore(makeLink('⭐ Kreator Premium Produktu','premium-product-wizard.html','elkass-clean-premium-link','linear-gradient(135deg,#7c3aed,#e30613)'), side.children[2] || side.firstChild);
    }

    if(!side.querySelector('.elkass-clean-category-link')){
      side.insertBefore(makeLink('🧩 Kategorie Premium','category-manager.html','elkass-clean-category-link','linear-gradient(135deg,#0ea5e9,#7c3aed)'), side.children[3] || side.firstChild);
    }

    if(!side.querySelector('.elkass-clean-theme-link')){
      side.insertBefore(makeLink('🎨 Motywy sezonowe','seasonal-themes.html','elkass-clean-theme-link','linear-gradient(135deg,#f97316,#e30613)'), side.children[4] || side.firstChild);
    }

    // Fix shortcut area: convert broken emoji-only shortcuts into readable cards
    const shortcutText = ['⭐ Kreator Premium Produktu','🧩 Kategorie Premium','🎨 Motywy sezonowe','🤖 Dodaj ze strony'];
    const containers=[...document.querySelectorAll('.shortcuts,.quick-actions,.quick-admin-grid,.dashboard-shortcuts,.card')];
    const likely=containers.find(c=>norm(c.textContent).includes('skróty')) || containers.find(c=>c.querySelectorAll('button,a').length>=2);
    if(likely && !likely.querySelector('.elkass-shortcut-clean-card')){
      const wrap=document.createElement('div');
      wrap.className='elkass-shortcut-clean-grid';
      wrap.innerHTML=`
        <a class="elkass-shortcut-clean-card" href="premium-product-wizard.html">⭐ <strong>Kreator Premium Produktu</strong><span>Dodaj produkt krok po kroku</span></a>
        <a class="elkass-shortcut-clean-card" href="category-manager.html">🧩 <strong>Kategorie Premium</strong><span>Edytuj 6 kafli kategorii</span></a>
        <a class="elkass-shortcut-clean-card" href="seasonal-themes.html">🎨 <strong>Motywy sezonowe</strong><span>Black Week, Cyber, Święta</span></a>
        <a class="elkass-shortcut-clean-card" href="product-link-import.html">🤖 <strong>Import ze strony BETA</strong><span>Pomocniczy analizator</span></a>`;
      const heading=[...likely.querySelectorAll('h2,h3,strong')].find(x=>norm(x.textContent).includes('skróty'));
      if(heading) heading.insertAdjacentElement('afterend',wrap);
      else likely.prepend(wrap);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',cleanup); else cleanup();
})();
