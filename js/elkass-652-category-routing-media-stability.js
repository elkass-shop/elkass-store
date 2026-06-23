/* ELKASS 6.5.2 — Category Routing + Media Stability */
(function(){
  const FALLBACK_TREE = {
    items:[
      {id:"rtv",name:"RTV",image:"assets/categories/rtv.jpg",fallback:"assets/categories/rtv.svg",premiumDescription:"Telewizory, audio i sprzęt RTV do nowoczesnego domu.",children:[{id:"telewizory",name:"Telewizory",image:"assets/categories/rtv.jpg",premiumDescription:"Smart TV, LED, OLED i QLED.",children:[]},{id:"soundbary",name:"Soundbary",image:"assets/categories/rtv.jpg",premiumDescription:"Lepszy dźwięk do telewizora.",children:[]},{id:"audio",name:"Audio",image:"assets/categories/rtv.jpg",premiumDescription:"Głośniki, wieże i akcesoria audio.",children:[]}]},
      {id:"agd",name:"AGD",image:"assets/categories/agd.jpg",fallback:"assets/categories/agd.svg",premiumDescription:"Duże AGD do codziennego komfortu.",children:[{id:"lodowki",name:"Lodówki",image:"assets/categories/agd.jpg",premiumDescription:"Lodówki wolnostojące, No Frost i pojemne modele.",children:[]},{id:"pralki",name:"Pralki",image:"assets/categories/agd.jpg",premiumDescription:"Pralki slim, ładowane od frontu i od góry.",children:[]},{id:"zmywarki",name:"Zmywarki",image:"assets/categories/agd.jpg",premiumDescription:"Zmywarki 45 cm, 60 cm i do zabudowy.",children:[]}]},
      {id:"agd-zabudowa",name:"AGD do zabudowy",image:"assets/categories/agd-zabudowa.jpg",fallback:"assets/categories/agd-zabudowa.svg",premiumDescription:"Sprzęt do nowoczesnej kuchni w zabudowie.",children:[{id:"piekarniki",name:"Piekarniki",image:"assets/categories/agd-zabudowa.jpg",premiumDescription:"Piekarniki z funkcjami premium.",children:[]},{id:"plyty-indukcyjne",name:"Płyty",image:"assets/categories/agd-zabudowa.jpg",premiumDescription:"Płyty indukcyjne i gazowe.",children:[]},{id:"okapy",name:"Okapy",image:"assets/categories/agd-zabudowa.jpg",premiumDescription:"Okapy do skutecznej wentylacji kuchni.",children:[]}]},
      {id:"male-agd",name:"Małe AGD",image:"assets/categories/male-agd.jpg",fallback:"assets/categories/male-agd.svg",premiumDescription:"Małe urządzenia, które ułatwiają codzienność.",children:[{id:"ekspresy",name:"Ekspresy",image:"assets/categories/male-agd.jpg",premiumDescription:"Ekspresy do kawy w domu.",children:[]},{id:"odkurzacze",name:"Odkurzacze",image:"assets/categories/male-agd.jpg",premiumDescription:"Odkurzacze pionowe i tradycyjne.",children:[]},{id:"zelazka",name:"Żelazka",image:"assets/categories/male-agd.jpg",premiumDescription:"Żelazka i stacje pary.",children:[]}]},
      {id:"komputery-telefony",name:"Komputery i telefony",image:"assets/categories/komputery-telefony.jpg",fallback:"assets/categories/komputery-telefony.svg",premiumDescription:"Laptopy, smartfony i akcesoria.",children:[{id:"laptopy",name:"Laptopy",image:"assets/categories/komputery-telefony.jpg",premiumDescription:"Laptopy do pracy, szkoły i domu.",children:[]},{id:"smartfony",name:"Smartfony",image:"assets/categories/komputery-telefony.jpg",premiumDescription:"Telefony z dobrym aparatem i baterią.",children:[]},{id:"akcesoria-it",name:"Akcesoria",image:"assets/categories/komputery-telefony.jpg",premiumDescription:"Ładowarki, kable i dodatki.",children:[]}]},
      {id:"serwis",name:"Serwis i doradztwo",image:"assets/categories/serwis.jpg",fallback:"assets/categories/serwis.svg",premiumDescription:"Lokalne wsparcie, doradztwo i konfiguracja.",children:[{id:"doradztwo",name:"Doradztwo",image:"assets/categories/serwis.jpg",premiumDescription:"Pomoc w wyborze sprzętu.",children:[]},{id:"konfiguracja",name:"Konfiguracja",image:"assets/categories/serwis.jpg",premiumDescription:"Pomoc przy ustawieniach.",children:[]},{id:"transport",name:"Transport",image:"assets/categories/serwis.jpg",premiumDescription:"Dostawa lokalna.",children:[]}]}
    ]
  };

  function norm(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}

  async function loadTree(){
    if(window.ELKASSCloud){
      try{
        const cloudCats = await window.ELKASSCloud.list("categories");
        if(Array.isArray(cloudCats) && cloudCats.length){
          return {items:cloudCats.filter(x=>x.showOnHome || !x.parent_id)};
        }
      }catch(e){}
    }
    try{
      const res = await fetch("categories/category-tree.json?v=652", {cache:"no-store"});
      if(res.ok) return await res.json();
    }catch(e){}
    return FALLBACK_TREE;
  }

  function findNode(items, id, path=[]){
    for(const item of items || []){
      const nextPath = [...path, item];
      if(item.id === id || norm(item.name) === id) return {node:item, path:nextPath};
      const found = findNode(item.children || [], id, nextPath);
      if(found) return found;
    }
    return null;
  }

  function fixHomeCategoryLinks(tree){
    const roots = (tree.items || []).filter(x => x.active !== false && x.showOnHome !== false).slice(0,6);
    const byName = new Map();
    roots.forEach(c=>{
      byName.set(norm(c.id), c);
      byName.set(norm(c.name), c);
    });

    const cards = document.querySelectorAll('.elkass57-category-card,.elkass-final-category-card,.category-card,#categories-grid > *,[data-category-card]');
    cards.forEach((card, index)=>{
      const text = (card.textContent || "").trim();
      const heading = card.querySelector("h2,h3,h4,strong,b");
      const key = norm(card.dataset.cat || card.dataset.category || (heading && heading.textContent) || text);
      let cat = byName.get(key) || roots.find(c => key.includes(norm(c.name)) || key.includes(norm(c.id))) || roots[index];
      if(!cat) return;

      card.classList.add("elkass-category-route-card");
      card.dataset.categoryId = cat.id;

      // usuń stare overlaye linkujące do promocji
      card.querySelectorAll('.elkass-card-link-overlay,.elkass-category-link-overlay').forEach(a=>a.remove());

      const target = "category.html?cat=" + encodeURIComponent(cat.id);
      card.querySelectorAll('a').forEach(a=>{
        if((a.getAttribute("href") || "").includes("#promocje") || (a.textContent || "").match(/zobacz|więcej/i)){
          a.setAttribute("href", target);
        }
      });

      if(!card.querySelector('a[href^="category.html"]')){
        const a = document.createElement("a");
        a.className = "elkass-card-link-overlay elkass-category-link-overlay";
        a.href = target;
        a.setAttribute("aria-label", "Zobacz kategorię: " + cat.name);
        a.textContent = "Zobacz kategorię: " + cat.name;
        card.appendChild(a);
      }
    });
  }

  function renderCategoryPage(tree){
    if(!/category\.html/i.test(location.pathname)) return;
    const params = new URLSearchParams(location.search);
    const id = params.get("cat") || params.get("id") || "rtv";
    const found = findNode(tree.items || [], id);
    const node = found ? found.node : (tree.items || [])[0];
    if(!node) return;

    const children = (node.children || []).filter(x => x.active !== false);
    const main = document.querySelector("main") || document.body;

    const breadcrumb = found ? found.path.map((p,i)=>{
      const href = i === found.path.length - 1 ? "#" : "category.html?cat=" + encodeURIComponent(p.id);
      return `<a href="${href}">${p.name}</a>`;
    }).join(" / ") : `<a href="index.html">Strona główna</a> / <a href="#">${node.name}</a>`;

    const cards = children.length ? children.map(ch=>{
      const next = (ch.children || []).filter(x=>x.active!==false).length ? `category.html?cat=${encodeURIComponent(ch.id)}` : `category.html?cat=${encodeURIComponent(ch.id)}#produkty`;
      const img = ch.image || node.image || "assets/categories/default.svg";
      const fallback = ch.fallback || node.fallback || "assets/categories/default.svg";
      return `<article class="elkass-subcategory-card">
        <img src="${img}" alt="${ch.name}" onerror="this.src='${fallback}'">
        <div class="elkass-subcategory-content">
          <h3>${ch.name}</h3>
          <p>${ch.premiumDescription || "Sprawdź dostępność produktów i aktualne promocje w ELKASS Olesno."}</p>
          <a href="${next}">Zobacz więcej →</a>
        </div>
      </article>`;
    }).join("") : `<section id="produkty" class="elkass-product-description-box"><h2>Produkty w kategorii ${node.name}</h2><p>Produkty z tej kategorii pojawią się tutaj po dodaniu ich w panelu. Możesz już korzystać z chmury i kreatora produktu krok po kroku.</p></section>`;

    const html = `<section class="elkass-category-page">
      <nav class="elkass-category-breadcrumb"><a href="index.html">Strona główna</a> / ${breadcrumb}</nav>
      <header class="elkass-category-hero">
        <small>Oferta sklepu</small>
        <h1>${node.name}</h1>
        <p>${node.premiumDescription || "Wybierz podkategorię i sprawdź dostępność produktów oraz aktualne promocje."}</p>
      </header>
      <section class="elkass-subcategory-grid">${cards}</section>
    </section>`;

    const old = document.querySelector(".elkass-category-page");
    if(old) old.remove();
    main.insertAdjacentHTML("afterbegin", html);
  }

  function stopCategoryFlicker(){
    document.querySelectorAll('.categories-section,#oferta,.elkass57-category-grid,.category-grid,#categories-grid').forEach(el=>{
      el.style.opacity = "1";
      el.style.visibility = "visible";
      el.style.animation = "none";
    });
  }

  async function run(){
    const tree = await loadTree();
    fixHomeCategoryLinks(tree);
    renderCategoryPage(tree);
    stopCategoryFlicker();
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    run();
    setTimeout(run, 300);
    setTimeout(run, 900);
  });
  document.addEventListener("elkass:theme60-change", ()=>setTimeout(run, 120));
})();
