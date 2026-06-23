/* ELKASS 6.7 PRIORITY A+B — categories, products, media/cloud ready */
(function(){
  const demoProducts=[
    {id:"lodowka-tcl-rp318bxe2",slug:"lodowka-tcl-rp318bxe2",name:"Lodówka TCL RP318BXE2",category_id:"lodowki",category:"AGD / Lodówki",price:"1699,00 zł",old_price:"1931,00 zł",oldPrice:"1931,00 zł",image:"assets/products/lodowka-tcl.png",badge:"Dostępny w sklepie",lead:"Nowoczesna chłodziarko-zamrażarka do codziennego użytku.",features:["No Frost","Pojemna chłodziarka","Cicha praca","Dobry wybór do domu"],description:"Ten model sprawdzi się w mieszkaniu i domu rodzinnym. Oferuje wygodną organizację żywności, prostą obsługę i nowoczesny wygląd. W ELKASS Olesno pomożemy dobrać sprzęt do miejsca w kuchni, sposobu użytkowania oraz budżetu."},
    {id:"pralka-beko-wue7636xoa",slug:"pralka-beko-wue7636xoa",name:"Pralka BEKO WUE7636XOA",category_id:"pralki",category:"AGD / Pralki",price:"1349,00 zł",old_price:"1606,00 zł",oldPrice:"1606,00 zł",image:"assets/products/pralka-beko.png",badge:"Promocja",lead:"Pralka do codziennego prania z programami dopasowanymi do różnych tkanin.",features:["7 kg załadunku","1200 obr./min","Program szybki","Dobra cena"],description:"Dobry wybór do mieszkania i domu. Pralka oferuje wygodne programy, rozsądną pojemność i funkcje przydatne w codziennym użytkowaniu. Doradzimy, czy ten model pasuje do Twoich potrzeb."},
    {id:"piekarnik-samsung-nv7b44305ak",slug:"piekarnik-samsung-nv7b44305ak",name:"Piekarnik Samsung NV7B44305AK",category_id:"piekarniki",category:"AGD do zabudowy / Piekarniki",price:"1799,00 zł",old_price:"2367,00 zł",image:"assets/products/piekarnik-samsung.png",badge:"Hit dnia",lead:"Piekarnik do nowoczesnej kuchni z funkcjami wygodnego pieczenia.",features:["Dual Cook","Air Fry","Prowadnice","Nowoczesny design"],description:"Piekarnik do zabudowy sprawdzi się w kuchni, w której liczy się wygoda, wygląd i powtarzalne efekty pieczenia."}
  ];
  function slug(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  async function loadCategories(){
    if(window.ELKASSCloud){try{const c=await window.ELKASSCloud.list("categories"); if(Array.isArray(c)&&c.length){return buildTree(c);}}catch(e){}}
    try{const r=await fetch("categories/category-tree.json?v=67",{cache:"no-store"}); if(r.ok){const j=await r.json(); if(j.items)return j.items;}}catch(e){}
    return [];
  }
  function buildTree(rows){
    const map=new Map(); rows.forEach(r=>map.set(r.id,{...r,children:[]}));
    const roots=[]; map.forEach(n=>{if(n.parent_id&&map.has(n.parent_id))map.get(n.parent_id).children.push(n);else roots.push(n);});
    return roots.sort((a,b)=>(a.sort_order||0)-(b.sort_order||0));
  }
  function find(items,id,path=[]){
    for(const it of items||[]){const p=[...path,it]; if(it.id===id||it.slug===id||slug(it.name)===id)return {node:it,path:p}; const f=find(it.children||[],id,p); if(f)return f;}
    return null;
  }
  async function loadProducts(){
    if(window.ELKASSCloud){try{const p=await window.ELKASSCloud.list("products"); if(Array.isArray(p)&&p.length)return p;}catch(e){}}
    return demoProducts;
  }
  function renderHomeCategories(items){
    const grid=document.getElementById("categories-grid")||document.querySelector(".elkass57-category-grid,.elkass-final-category-grid,.category-grid,[data-category-grid]");
    if(!grid || /category\.html/i.test(location.pathname))return;
    const roots=(items||[]).filter(x=>x.active!==false && x.showOnHome!==false).slice(0,6);
    if(!roots.length)return;
    grid.classList.add("elkass57-category-grid");
    grid.innerHTML=roots.map(c=>{
      const chips=(c.children||[]).filter(x=>x.active!==false).slice(0,3).map(x=>`<span>${x.name}</span>`).join("");
      return `<article class="elkass57-category-card elkass-category-route-card" data-category-id="${c.id}">
        <img src="${c.image||"assets/categories/default.svg"}" alt="${c.name}" loading="lazy" onerror="this.src='${c.fallback||"assets/categories/default.svg"}'">
        <div class="elkass57-category-content"><h3>${c.name}</h3><p>${chips}</p><a href="category.html?cat=${encodeURIComponent(c.id)}">Zobacz więcej →</a></div>
        <a class="elkass-category-link-overlay" href="category.html?cat=${encodeURIComponent(c.id)}">Zobacz kategorię ${c.name}</a>
      </article>`;
    }).join("");
  }
  function renderCategory(items,products){
    if(!/category\.html/i.test(location.pathname))return;
    const id=new URLSearchParams(location.search).get("cat")||"rtv";
    const f=find(items,id)||{node:items[0],path:[items[0]]};
    if(!f.node)return;
    const n=f.node, children=(n.children||[]).filter(x=>x.active!==false);
    const main=document.querySelector("main")||document.body;
    document.querySelector(".elkass-category-page")?.remove();
    let body="";
    if(children.length){
      body=`<section class="elkass-subcategory-grid">${children.map(ch=>{
        const href=(ch.children||[]).length?`category.html?cat=${encodeURIComponent(ch.id)}`:`category.html?cat=${encodeURIComponent(ch.id)}#produkty`;
        return `<article class="elkass-subcategory-card"><img src="${ch.image||n.image}" alt="${ch.name}" onerror="this.src='${ch.fallback||n.fallback||"assets/categories/default.svg"}'"><div class="elkass-subcategory-content"><h3>${ch.name}</h3><p>${ch.premiumDescription||ch.description||"Sprawdź produkty i aktualną dostępność."}</p><a href="${href}">Zobacz więcej →</a></div></article>`;
      }).join("")}</section>`;
    } else {
      const list=(products||[]).filter(p=>p.category_id===n.id || p.category===n.name || slug(p.category||"").includes(slug(n.name)));
      body=`<section id="produkty" class="elkass-product-description-box"><h2>Produkty: ${n.name}</h2>${list.length?`<div class="elkass-product-list">${list.map(p=>`<article class="elkass-product-mini"><img src="${p.image||"assets/categories/agd.jpg"}" alt="${p.name}" onerror="this.src='assets/categories/agd.svg'"><h3>${p.name}</h3><strong>${p.price||"Zapytaj o cenę"}</strong><br><a href="product.html?id=${encodeURIComponent(p.id||p.slug||slug(p.name))}">Zobacz produkt →</a></article>`).join("")}</div>`:"<p>Produkty z tej kategorii dodasz w panelu przez „Dodaj produkt krok po kroku”. Po włączeniu chmury będą widoczne na każdym urządzeniu.</p>"}</section>`;
    }
    main.insertAdjacentHTML("afterbegin",`<section class="elkass-category-page"><nav class="elkass-category-breadcrumb"><a href="index.html">Strona główna</a> / ${f.path.map((p,i)=>i===f.path.length-1?p.name:`<a href="category.html?cat=${p.id}">${p.name}</a>`).join(" / ")}</nav><header class="elkass-category-hero"><small>Oferta sklepu</small><h1>${n.name}</h1><p>${n.premiumDescription||n.description||"Wybierz podkategorię i sprawdź ofertę ELKASS Olesno."}</p></header>${body}</section>`);
  }
  async function renderProduct(){
    if(!/product\.html/i.test(location.pathname))return;
    const id=new URLSearchParams(location.search).get("id")||"lodowka-tcl-rp318bxe2";
    const products=await loadProducts();
    const p=products.find(x=>x.id===id||x.slug===id||slug(x.name)===id)||products[0]||demoProducts[0];
    const main=document.querySelector("main")||document.body;
    document.querySelector(".elkass-product-premium-shell")?.remove();
    document.querySelector(".elkass-product-description-box")?.remove();
    const old=p.oldPrice||p.old_price||"";
    const features=Array.isArray(p.features)?p.features:[];
    main.insertAdjacentHTML("afterbegin",`<section class="elkass-product-premium-shell"><article class="elkass-product-premium-card"><div class="elkass-product-premium-media"><div class="elkass-product-badge">${p.badge||"Dostępny w sklepie"}</div><img src="${p.image||"assets/categories/agd.jpg"}" alt="${p.name||"Produkt ELKASS"}" onerror="this.src='assets/categories/agd.svg'"></div><div class="elkass-product-premium-info"><small>${p.category||"Produkt ELKASS"}</small><h1>${p.name||"Produkt ELKASS"}</h1><p class="elkass-product-premium-lead">${p.lead||"Sprawdź dostępność, aktualną cenę i szczegóły produktu w ELKASS Olesno."}</p><div class="elkass-product-premium-price"><strong>${p.price||"Zapytaj o cenę"}</strong>${old?`<span>${old}</span>`:""}</div><ul class="elkass-product-features">${features.map(f=>`<li>✓ ${f}</li>`).join("")}</ul><div class="elkass-product-service-grid"><div>🚚 Szybki transport</div><div>💳 Raty 0%</div><div>🧠 Fachowe doradztwo</div></div><div class="elkass-product-cta-row"><a class="elkass-product-cta-primary" href="tel:343582442">☎ Zapytaj o produkt</a><a class="elkass-product-cta-secondary" href="index.html#promocje">Zobacz promocje</a></div></div></article></section><section class="elkass-product-description-box"><h2>Opis produktu</h2><p>${p.description||"Opis produktu możesz uzupełnić w panelu. Najważniejsze informacje powinny wyjaśniać, do czego sprzęt jest najlepszy, jakie ma cechy i dlaczego warto kupić go lokalnie w ELKASS."}</p></section>`);
  }
  function stopFlicker(){document.querySelectorAll(".categories-section,#oferta,.elkass57-category-grid,.category-grid,#categories-grid").forEach(el=>{el.style.opacity="1";el.style.visibility="visible";el.style.animation="none";});}
  async function run(){const c=await loadCategories(); const p=await loadProducts(); renderHomeCategories(c); renderCategory(c,p); renderProduct(); stopFlicker();}
  document.addEventListener("DOMContentLoaded",()=>{run();setTimeout(run,400);setTimeout(run,1200);});
  document.addEventListener("elkass:theme60-change",()=>setTimeout(run,120));
})();
