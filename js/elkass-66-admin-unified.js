/* ELKASS 6.6 Admin Unified */
(function(){
  function mobile(){
    if(!/\/admin\/?/.test(location.pathname))return;
    if(!document.querySelector(".admin-mobile-topbar")){
      const bar=document.createElement("div");bar.className="admin-mobile-topbar";bar.innerHTML='<button type="button" class="admin-mobile-menu-btn">☰ Menu</button><strong>ELKASS CMS</strong><button type="button" class="admin-mobile-close-btn">×</button>';document.body.prepend(bar);
      const back=document.createElement("div");back.className="admin-mobile-backdrop";document.body.appendChild(back);
      bar.querySelector(".admin-mobile-menu-btn").onclick=()=>document.body.classList.add("elkass-admin-menu-open");
      bar.querySelector(".admin-mobile-close-btn").onclick=()=>document.body.classList.remove("elkass-admin-menu-open");
      back.onclick=()=>document.body.classList.remove("elkass-admin-menu-open");
    }
  }
  function quick(){
    if(!/\/admin\/?/.test(location.pathname) || document.querySelector(".elkass-66-quickstart"))return;
    const target=document.querySelector(".dashboard-content,.admin-main,.main-content,main,.content")||document.body;
    const box=document.createElement("section");box.className="elkass-66-quickstart";
    box.innerHTML='<h2>🚀 Szybki start ELKASS</h2><div class="elkass-66-grid"><a class="elkass-66-tile" href="product-wizard-65.html">📦 Dodaj produkt krok po kroku<span>nazwa, cena, zdjęcie, opis premium</span></a><a class="elkass-66-tile" href="category-tree-manager-631.html">📂 Kategorie i podkategorie<span>aktywne, ukryte, grafiki, opisy</span></a><a class="elkass-66-tile" href="media-manager-65.html">🖼️ Grafiki i media<span>Hero, kategorie, produkty, galeria</span></a><a class="elkass-66-tile" href="glossary-manager-65.html">📚 Biblioteka terminów<span>hasło + definicja dla opisów</span></a></div>';
    target.prepend(box);
  }
  document.addEventListener("DOMContentLoaded",()=>{mobile();quick();setTimeout(quick,600);});
})();
