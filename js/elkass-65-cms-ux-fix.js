/* ELKASS 6.5 CMS UX Fix */
(function(){
  function adminMobile(){
    if(!/\/admin\/?/.test(location.pathname)) return;
    if(!document.querySelector('.admin-mobile-topbar')){
      const bar=document.createElement('div');
      bar.className='admin-mobile-topbar';
      bar.innerHTML='<button type="button" class="admin-mobile-menu-btn">☰ Menu</button><strong>ELKASS CMS</strong><button type="button" class="admin-mobile-close-btn">×</button>';
      document.body.prepend(bar);
      const backdrop=document.createElement('div');
      backdrop.className='admin-mobile-backdrop';
      document.body.appendChild(backdrop);
      bar.querySelector('.admin-mobile-menu-btn').onclick=()=>document.body.classList.add('elkass-admin-menu-open');
      bar.querySelector('.admin-mobile-close-btn').onclick=()=>document.body.classList.remove('elkass-admin-menu-open');
      backdrop.onclick=()=>document.body.classList.remove('elkass-admin-menu-open');
    }
  }

  function quickStart(){
    if(!/\/admin\/?/.test(location.pathname)) return;
    if(document.querySelector('.elkass-65-quickstart')) return;
    const target = document.querySelector('.dashboard-content,.admin-main,.main-content,main,.content') || document.body;
    const box = document.createElement('section');
    box.className = 'elkass-65-quickstart';
    box.innerHTML = '<h2>🚀 Szybki start</h2><div class="elkass-65-grid"><a class="elkass-65-tile" href="product-wizard-65.html">📦 Dodaj produkt krok po kroku<span>Nazwa, zdjęcie, cena, opis, promocja</span></a><a class="elkass-65-tile" href="category-tree-manager-631.html">📂 Kategorie i podkategorie<span>Aktywne, ukryte, grafiki, opisy</span></a><a class="elkass-65-tile" href="media-manager-65.html">🖼️ Grafiki i media<span>Hero, kategorie, galeria, social</span></a><a class="elkass-65-tile" href="glossary-manager-65.html">📚 Biblioteka terminów<span>Hasło + definicja na stronę</span></a></div>';
    target.prepend(box);
  }

  document.addEventListener('DOMContentLoaded',()=>{adminMobile();quickStart();setTimeout(quickStart,500);});
})();
