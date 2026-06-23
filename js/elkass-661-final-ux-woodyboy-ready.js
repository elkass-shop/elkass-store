/* ELKASS 6.6.1 FINAL UX + WOODYBOY READY */
(function(){
  const ROOTS=[
    {id:"rtv",name:"RTV",img:"assets/categories/rtv.jpg",fallback:"assets/categories/rtv.svg",desc:"Telewizory, audio i sprzęt RTV do nowoczesnego domu.",children:[
      {id:"telewizory",name:"Telewizory",desc:"Smart TV, LED, OLED i QLED.",children:["32–43″","50–55″","65″+","Smart TV"]},
      {id:"soundbary",name:"Soundbary",desc:"Lepszy dźwięk do telewizora.",children:[]},
      {id:"audio",name:"Audio",desc:"Głośniki, wieże i akcesoria audio.",children:[]}
    ]},
    {id:"agd",name:"AGD",img:"assets/categories/agd.jpg",fallback:"assets/categories/agd.svg",desc:"Duże AGD do codziennego komfortu domu.",children:[
      {id:"lodowki",name:"Lodówki",desc:"Lodówki wolnostojące, No Frost i pojemne modele.",children:["Wolnostojące","Side by Side","No Frost"]},
      {id:"pralki",name:"Pralki",desc:"Pralki slim, ładowane od frontu i od góry.",children:["Slim","Ładowane od frontu","Ładowane od góry"]},
      {id:"zmywarki",name:"Zmywarki",desc:"Zmywarki 45 cm, 60 cm i do zabudowy.",children:["45 cm","60 cm","Do zabudowy"]}
    ]},
    {id:"agd-zabudowa",name:"AGD do zabudowy",img:"assets/categories/agd-zabudowa.jpg",fallback:"assets/categories/agd-zabudowa.svg",desc:"Sprzęt do eleganckiej i funkcjonalnej kuchni.",children:[
      {id:"piekarniki",name:"Piekarniki",desc:"Piekarniki z funkcjami premium.",children:[]},
      {id:"plyty-indukcyjne",name:"Płyty",desc:"Płyty indukcyjne i gazowe.",children:[]},
      {id:"okapy",name:"Okapy",desc:"Okapy do skutecznej wentylacji kuchni.",children:[]}
    ]},
    {id:"male-agd",name:"Małe AGD",img:"assets/categories/male-agd.jpg",fallback:"assets/categories/male-agd.svg",desc:"Małe urządzenia, które ułatwiają codzienność.",children:[
      {id:"ekspresy",name:"Ekspresy",desc:"Ekspresy do kawy w domu.",children:[]},
      {id:"odkurzacze",name:"Odkurzacze",desc:"Odkurzacze pionowe i tradycyjne.",children:[]},
      {id:"zelazka",name:"Żelazka",desc:"Żelazka i stacje pary.",children:[]}
    ]},
    {id:"komputery-telefony",name:"Komputery i telefony",img:"assets/categories/komputery-telefony.jpg",fallback:"assets/categories/komputery-telefony.svg",desc:"Laptopy, smartfony i akcesoria do pracy i domu.",children:[
      {id:"laptopy",name:"Laptopy",desc:"Laptopy do pracy, szkoły i domu.",children:[]},
      {id:"smartfony",name:"Smartfony",desc:"Telefony z dobrym aparatem i baterią.",children:[]},
      {id:"akcesoria-it",name:"Akcesoria",desc:"Ładowarki, kable i dodatki.",children:[]}
    ]},
    {id:"serwis",name:"Serwis i doradztwo",img:"assets/categories/serwis.jpg",fallback:"assets/categories/serwis.svg",desc:"Lokalne wsparcie, konfiguracja i fachowe doradztwo.",children:[
      {id:"doradztwo",name:"Doradztwo",desc:"Pomoc w wyborze sprzętu.",children:[]},
      {id:"konfiguracja",name:"Konfiguracja",desc:"Pomoc przy ustawieniach.",children:[]},
      {id:"transport",name:"Transport",desc:"Dostawa lokalna.",children:[]}
    ]}
  ];

  const demoProducts = {
    "lodowka-tcl-rp318bxe2":{name:"Lodówka TCL RP318BXE2",category:"AGD / Lodówki",price:"1699,00 zł",oldPrice:"1931,00 zł",image:"assets/products/lodowka-tcl.png",badge:"Dostępny w sklepie",lead:"Nowoczesna chłodziarko-zamrażarka do codziennego użytku, zaprojektowana z myślą o wygodzie, pojemności i rozsądnym zużyciu energii.",features:["No Frost","Pojemna chłodziarka","Cicha praca","Dobry wybór do domu"],description:"Ten model sprawdzi się w mieszkaniu i domu rodzinnym. Oferuje wygodną organizację żywności, prostą obsługę i nowoczesny wygląd. W ELKASS Olesno pomożemy dobrać sprzęt do miejsca w kuchni, sposobu użytkowania oraz budżetu."},
    "pralka-beko-wue7636xoa":{name:"Pralka BEKO WUE7636XOA",category:"AGD / Pralki",price:"1349,00 zł",oldPrice:"1606,00 zł",image:"assets/products/pralka-beko.png",badge:"Promocja",lead:"Pralka do codziennego prania z programami dopasowanymi do różnych tkanin i wygodną obsługą.",features:["7 kg załadunku","1200 obr./min","Program szybki","Dobra cena"],description:"Dobry wybór do mieszkania i domu. Pralka oferuje wygodne programy, rozsądną pojemność i funkcje przydatne w codziennym użytkowaniu. Doradzimy, czy ten model pasuje do Twoich potrzeb."}
  };

  function slug(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}
  function flat(nodes,out=[]){(nodes||[]).forEach(n=>{out.push(n);flat(n.children||[],out)});return out}
  function normalizeRoots(){
    return ROOTS.map(c=>({id:c.id,name:c.name,image:c.img,fallback:c.fallback,premiumDescription:c.desc,active:true,showOnHome:true,children:c.children.map(ch=>({id:ch.id,name:ch.name,image:c.img,fallback:c.fallback,premiumDescription:ch.desc,active:true,children:(ch.children||[]).map(x=>({id:slug(x),name:x,image:c.img,fallback:c.fallback,premiumDescription:"Sprawdź dostępność produktów i aktualne promocje w ELKASS Olesno.",active:true,children:[]}))}))}));
  }
  async function cats(){
    try{const r=await fetch("categories/category-tree.json?v=661",{cache:"no-store"}); if(r.ok){const j=await r.json(); if(j.items&&j.items.length)return j.items;}}catch(e){}
    return normalizeRoots();
  }

  function renderHomeCategories(items){
    const grid=document.getElementById("categories-grid")||document.querySelector(".elkass57-category-grid,.elkass-final-category-grid,.category-grid,[data-category-grid]");
    if(!grid || /category\.html/i.test(location.pathname)) return;
    const roots=items.filter(x=>x.active!==false && x.showOnHome!==false).slice(0,6);
    grid.classList.add("elkass57-category-grid");
    grid.innerHTML=roots.map(c=>{
      const chips=(c.children||[]).filter(x=>x.active!==false).slice(0,3).map(x=>`<span>${x.name}</span>`).join("");
      return `<article class="elkass57-category-card elkass-category-route-card" data-category-id="${c.id}">
        <img src="${c.image||c.img}" alt="${c.name}" loading="lazy" onerror="this.src='${c.fallback||"assets/categories/default.svg"}'">
        <div class="elkass57-category-content"><h3>${c.name}</h3><p>${chips}</p><a href="category.html?cat=${encodeURIComponent(c.id)}">Zobacz więcej →</a></div>
        <a class="elkass-category-link-overlay" href="category.html?cat=${encodeURIComponent(c.id)}">Zobacz kategorię ${c.name}</a>
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

  async function getProduct(id){
    if(window.ELKASSCloud){try{const arr=await window.ELKASSCloud.list("products"); const f=(arr||[]).find(p=>p.id===id||p.slug===id||slug(p.name)===id); if(f)return f;}catch(e){}}
    return demoProducts[id] || Object.values(demoProducts)[0];
  }
  async function renderProduct(){
    if(!/product\.html/i.test(location.pathname))return;
    const id=new URLSearchParams(location.search).get("id")||"lodowka-tcl-rp318bxe2";
    const p=await getProduct(id);
    const main=document.querySelector("main")||document.body;
    document.querySelector(".elkass-product-premium-shell")?.remove();
    document.querySelector(".elkass-product-description-box")?.remove();
    const features=(p.features||[]).slice(0,8).map(f=>`<li>✓ ${f}</li>`).join("");
    main.insertAdjacentHTML("afterbegin",`<section class="elkass-product-premium-shell"><article class="elkass-product-premium-card"><div class="elkass-product-premium-media"><div class="elkass-product-badge">${p.badge||"Dostępny w sklepie"}</div><img src="${p.image||"assets/categories/agd.jpg"}" alt="${p.name||"Produkt ELKASS"}" onerror="this.src='assets/categories/agd.svg'"></div><div class="elkass-product-premium-info"><small>${p.category||"Produkt ELKASS"}</small><h1>${p.name||"Produkt ELKASS"}</h1><p class="elkass-product-premium-lead">${p.lead||"Sprawdź dostępność, aktualną cenę i szczegóły produktu w ELKASS Olesno."}</p><div class="elkass-product-premium-price"><strong>${p.price||"Zapytaj o cenę"}</strong>${p.oldPrice?`<span>${p.oldPrice}</span>`:""}</div><ul class="elkass-product-features">${features}</ul><div class="elkass-product-service-grid"><div>🚚 Szybki transport</div><div>💳 Raty 0%</div><div>🧠 Fachowe doradztwo</div></div><div class="elkass-product-cta-row"><a class="elkass-product-cta-primary" href="tel:343582442">☎ Zapytaj o produkt</a><a class="elkass-product-cta-secondary" href="index.html#promocje">Zobacz promocje</a></div></div></article></section><section class="elkass-product-description-box"><h2>Opis produktu</h2><p>${p.description||"Opis produktu możesz uzupełnić w panelu. Najważniejsze informacje powinny wyjaśniać, do czego sprzęt jest najlepszy, jakie ma cechy i dlaczego warto kupić go lokalnie w ELKASS."}</p></section>`);
  }

  function adminUX(){
    if(!/\/admin\/?/.test(location.pathname))return;
    if(!document.querySelector(".admin-mobile-topbar")){
      const bar=document.createElement("div");bar.className="admin-mobile-topbar";bar.innerHTML='<button type="button" class="admin-mobile-menu-btn">☰ Menu</button><strong>ELKASS CMS</strong><button type="button" class="admin-mobile-close-btn">×</button>';document.body.prepend(bar);
      const back=document.createElement("div");back.className="admin-mobile-backdrop";document.body.appendChild(back);
      bar.querySelector(".admin-mobile-menu-btn").onclick=()=>document.body.classList.add("elkass-admin-menu-open");
      bar.querySelector(".admin-mobile-close-btn").onclick=()=>document.body.classList.remove("elkass-admin-menu-open");
      back.onclick=()=>document.body.classList.remove("elkass-admin-menu-open");
    }
    if(!document.querySelector(".elkass-661-quickstart")){
      const target=document.querySelector(".dashboard-content,.admin-main,.main-content,main,.content")||document.body;
      const box=document.createElement("section");box.className="elkass-661-quickstart";
      box.innerHTML='<h2>🚀 Szybki start ELKASS</h2><div class="elkass-661-grid"><a class="elkass-661-tile" href="product-wizard-65.html">📦 Dodaj produkt krok po kroku<span>nazwa, cena, zdjęcie, opis premium</span></a><a class="elkass-661-tile" href="category-tree-manager-631.html">📂 Kategorie i podkategorie<span>aktywne, ukryte, grafiki, opisy</span></a><a class="elkass-661-tile" href="media-manager-65.html">🖼️ Grafiki i media<span>Hero, kategorie, produkty, galeria</span></a><a class="elkass-661-tile" href="glossary-manager-65.html">📚 Biblioteka terminów<span>hasło + definicja dla opisów</span></a></div>';
      target.prepend(box);
    }
  }

  function galleryArrows(){
    let images=[...document.querySelectorAll('.gallery img, .gallery-grid img, [data-gallery] img')];
    if(!images.length)return;
    images.forEach((img,i)=>img.dataset.elkassGalleryIndex=i);
    let current=0;
    function open(i){
      current=(i+images.length)%images.length;
      const img=images[current];
      if(img && !document.querySelector('.elkass-gallery-prev')){
        const prev=document.createElement('button'), next=document.createElement('button'), counter=document.createElement('div');
        prev.className='elkass-gallery-arrow elkass-gallery-prev';next.className='elkass-gallery-arrow elkass-gallery-next';counter.className='elkass-gallery-counter';
        prev.textContent='‹';next.textContent='›';
        document.body.append(prev,next,counter);
        prev.onclick=()=>open(current-1);next.onclick=()=>open(current+1);
        document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')open(current-1);if(e.key==='ArrowRight')open(current+1);});
      }
      const c=document.querySelector('.elkass-gallery-counter'); if(c)c.textContent=(current+1)+' / '+images.length;
    }
    images.forEach((img,i)=>img.addEventListener('click',()=>setTimeout(()=>open(i),60)));
  }

  function stopFlicker(){document.querySelectorAll(".categories-section,#oferta,.elkass57-category-grid,.category-grid,#categories-grid").forEach(el=>{el.style.opacity="1";el.style.visibility="visible";el.style.animation="none";});}
  async function run(){const items=await cats();renderHomeCategories(items);renderCategory(items);renderProduct();adminUX();galleryArrows();stopFlicker();}
  document.addEventListener("DOMContentLoaded",()=>{run();setTimeout(run,400);setTimeout(run,1200);});
  document.addEventListener("elkass:theme60-change",()=>setTimeout(run,120));
})();
