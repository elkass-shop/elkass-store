/* ELKASS 5.1 — HARD ADMIN MENU CLEANUP */
(function(){
  const ITEMS=[
    {key:'premium', label:'⭐ Kreator Premium Produktu', href:'premium-product-wizard.html', match:['kreator premium','dodaj produkt krok po kroku'], cls:'elkass-final-premium', bg:'linear-gradient(135deg,#7c3aed,#e30613)'},
    {key:'categories', label:'🧩 Kategorie Premium', href:'category-manager.html', match:['kategorie premium'], cls:'elkass-final-categories', bg:'linear-gradient(135deg,#0ea5e9,#7c3aed)'},
    {key:'themes', label:'🎨 Motywy sezonowe', href:'seasonal-themes.html', match:['motywy sezonowe'], cls:'elkass-final-themes', bg:'linear-gradient(135deg,#f97316,#e30613)'}
  ];
  function norm(t){return String(t||'').toLowerCase().replace(/\s+/g,' ').trim();}
  function side(){return document.querySelector('.sidebar, aside, nav, .admin-sidebar');}
  function make(item){
    const a=document.createElement('a');
    a.href=item.href;
    a.textContent=item.label;
    a.className='tab elkass-final-menu '+item.cls;
    a.style.cssText='display:block;margin:10px 0;padding:14px 18px;border-radius:16px;background:'+item.bg+';color:#fff;font-weight:900;text-decoration:none;box-shadow:0 14px 32px rgba(15,23,42,.22);line-height:1.2;';
    return a;
  }
  function cleanupMenu(){
    const s=side(); if(!s) return;
    ITEMS.forEach(item=>{
      const matches=[...s.querySelectorAll('a,button,.tab,[role="button"]')].filter(el=>{
        const t=norm(el.textContent);
        return item.match.some(m=>t.includes(m));
      });
      matches.forEach(el=>el.remove());
    });
    const insertAfter = [...s.children].find(el=>norm(el.textContent).includes('control center')) || s.children[1] || s.firstChild;
    let ref=insertAfter ? insertAfter.nextSibling : s.firstChild;
    ITEMS.slice().reverse().forEach(item=>{
      const a=make(item);
      if(ref) s.insertBefore(a, ref); else s.appendChild(a);
      ref=a;
    });
  }
  function cleanupShortcuts(){
    const cards=[...document.querySelectorAll('a,button,.admin-shortcut,.shortcut,.elkass-shortcut-clean-card,[class*="shortcut"]')];
    cards.forEach(el=>{
      const t=norm(el.textContent);
      if(t.includes('kreator premium')||t.includes('kategorie premium')||t.includes('motywy sezonowe')){
        if(!el.classList.contains('elkass-final-shortcut')) el.remove();
      }
    });
    const containers=[...document.querySelectorAll('.shortcuts,.quick-actions,.quick-admin-grid,.dashboard-shortcuts,.card,section,div')];
    const target=containers.find(c=>norm(c.textContent).includes('skróty'));
    if(target && !target.querySelector('.elkass-final-shortcuts')){
      const grid=document.createElement('div');
      grid.className='elkass-final-shortcuts';
      grid.innerHTML=`
        <a href="premium-product-wizard.html"><b>⭐ Kreator Premium Produktu</b><span>Dodaj produkt krok po kroku</span></a>
        <a href="category-manager.html"><b>🧩 Kategorie Premium</b><span>Edytuj kafle kategorii</span></a>
        <a href="seasonal-themes.html"><b>🎨 Motywy sezonowe</b><span>Black Week, Cyber, Święta</span></a>
        <a href="product-link-import.html"><b>🌐 Import ze strony BETA</b><span>Pomocniczy import danych</span></a>`;
      const heading=[...target.querySelectorAll('h1,h2,h3,strong')].find(x=>norm(x.textContent).includes('skróty'));
      if(heading) heading.insertAdjacentElement('afterend',grid); else target.prepend(grid);
    }
  }
  function run(){cleanupMenu();cleanupShortcuts();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  setTimeout(run,300);
  setTimeout(run,1200);
})();