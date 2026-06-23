/* ELKASS 6.6 Unified Public — categories, products, media stability */
(function(){
  const ROOTS=[
    {id:"rtv",name:"RTV",img:"assets/categories/rtv.jpg",fallback:"assets/categories/rtv.svg",desc:"Telewizory, audio i sprzęt RTV do nowoczesnego domu.",children:["Telewizory","Soundbary","Audio"]},
    {id:"agd",name:"AGD",img:"assets/categories/agd.jpg",fallback:"assets/categories/agd.svg",desc:"Duże AGD do codziennego komfortu domu.",children:["Lodówki","Pralki","Zmywarki"]},
    {id:"agd-zabudowa",name:"AGD do zabudowy",img:"assets/categories/agd-zabudowa.jpg",fallback:"assets/categories/agd-zabudowa.svg",desc:"Sprzęt do eleganckiej i funkcjonalnej kuchni.",children:["Piekarniki","Płyty","Okapy"]},
    {id:"male-agd",name:"Małe AGD",img:"assets/categories/male-agd.jpg",fallback:"assets/categories/male-agd.svg",desc:"Małe urządzenia, które ułatwiają codzienność.",children:["Ekspresy","Odkurzacze","Żelazka"]},
    {id:"komputery-telefony",name:"Komputery i telefony",img:"assets/categories/komputery-telefony.jpg",fallback:"assets/categories/komputery-telefony.svg",desc:"Laptopy, smartfony i akcesoria do pracy i domu.",children:["Laptopy","Smartfony","Akcesoria"]},
    {id:"serwis",name:"Serwis i doradztwo",img:"assets/categories/serwis.jpg",fallback:"assets/categories/serwis.svg",desc:"Lokalne wsparcie, konfiguracja i fachowe doradztwo.",children:["Doradztwo","Konfiguracja","Transport"]}
  ];
  function slug(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  async function cats(){
    try{
      const r=await fetch("categories/category-tree.json?v=66",{cache:"no-store"});
      if(r.ok){const j=await r.json(); if(j.items&&j.items.length)return j.items;}
    }catch(e){}
    return ROOTS.map(c=>({id:c.id,name:c.name,image:c.img,fallback:c.fallback,premiumDescription:c.desc,active:true,showOnHome:true,children:c.children.map(x=>({id:slug(x),name:x,image:c.img,fallback:c.fallback,premiumDescription:"Sprawdź ofertę i dostępność produktów w ELKASS Olesno.",active:true,children:[]}))}));
  }
  function renderHomeCategories(items){
    const grid=document.getElementById("categories-grid")||document.querySelector(".elkass57-category-grid,.elkass-final-category-grid,.category-grid,[data-category-grid]");
    if(!grid)return;
    const roots=items.filter(x=>x.active!==false && x.showOnHome!==false).slice(0,6);
    grid.className="elkass57-category-grid";
    grid.innerHTML=roots.map(c=>{
      const chips=(c.children||[]).filter(x=>x.active!==false).slice(0,3).map(x=>`<span>${x.name}</span>`).join("");
      return `<article class="elkass57-category-card elkass-category-route-card" data-category-id="${c.id}">
        <img src="${c.image||c.img}" alt="${c.name}" loading="lazy" onerror="this.src='${c.fallback||"assets/categories/default.svg"}'">
        <div class="elkass57-category-content"><h3>${c.name}</h3><p>${chips}</p><a href="category.html?cat=${encodeURIComponent(c.id)}">Zobacz więcej →</a></div>
      </article>`;
    }).join("");
  }
  function find(items,id,path=[]){
    for(const it of items||[]){const p=[...path,it]; if(it.id===id||slug(it.name)===id)return {node:it,path:p}; const f=find(it.children||[],id,p); if(f)return f;}
    return null;
  }
  function renderCategory(items){
    if(!/category\.html/i.test(location.pathname))return;
    const id=new URLSearchParams(location.search).get("cat")||"rtv";
    const f=find(items,id)||{node:items[0],path:[items[0]]};
    if(!f.node)return;
    const n=f.node, children=(n.children||[]).filter(x=>x.active!==false);
    const main=document.querySelector("main")||document.body;
    document.querySelector(".elkass-category-page")?.remove();
    const cards=children.length?children.map(ch=>{
      const href=(ch.children||[]).length?`category.html?cat=${encodeURIComponent(ch.id)}`:`category.html?cat=${encodeURIComponent(ch.id)}#produkty`;
      return `<article class="elkass-subcategory-card"><img src="${ch.image||n.image}" alt="${ch.name}" onerror="this.src='${ch.fallback||n.fallback||"assets/categories/default.svg"}'"><div class="elkass-subcategory-content"><h3>${ch.name}</h3><p>${ch.premiumDescription||"Sprawdź produkty i aktualną dostępność."}</p><a href="${href}">Zobacz więcej →</a></div></article>`;
    }).join(""):`<section id="produkty" class="elkass-product-description-box"><h2>Produkty: ${n.name}</h2><p>Produkty z tej kategorii dodasz w panelu przez „Dodaj produkt krok po kroku”. Po włączeniu chmury będą widoczne na każdym urządzeniu.</p></section>`;
    main.insertAdjacentHTML("afterbegin",`<section class="elkass-category-page"><nav class="elkass-category-breadcrumb"><a href="index.html">Strona główna</a> / ${f.path.map((p,i)=>i===f.path.length-1?p.name:`<a href="category.html?cat=${p.id}">${p.name}</a>`).join(" / ")}</nav><header class="elkass-category-hero"><small>Oferta sklepu</small><h1>${n.name}</h1><p>${n.premiumDescription||"Wybierz podkategorię i sprawdź ofertę ELKASS Olesno."}</p></header><section class="elkass-subcategory-grid">${cards}</section></section>`);
  }
  function stopFlicker(){document.querySelectorAll(".categories-section,#oferta,.elkass57-category-grid,.category-grid,#categories-grid").forEach(el=>{el.style.opacity="1";el.style.visibility="visible";el.style.animation="none";});}
  async function run(){const items=await cats(); renderHomeCategories(items); renderCategory(items); stopFlicker();}
  document.addEventListener("DOMContentLoaded",()=>{run();setTimeout(run,400);setTimeout(run,1200);});
  document.addEventListener("elkass:theme60-change",()=>setTimeout(run,120));
})();
