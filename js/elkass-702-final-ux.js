/* ELKASS 7.0.2 FINAL UX — product, promotion, comments, gallery */
(function(){
  const fallbackProducts = [
    {id:"telewizor-samsung-55-4k-uhd", name:"Telewizor Samsung 55” 4K UHD", category:"RTV / Telewizory", category_id:"telewizory", price:"2299,00 zł", oldPrice:"3065,00 zł", image:"assets/products/telewizor-samsung.png", badge:"Hit tygodnia", discount:"-25%", promo_active:true, promo_role:"hero", promo_badges:[{icon:"📺",text:"55”"},{icon:"✨",text:"Smart TV"},{icon:"🎬",text:"HDR10+"},{icon:"⚡",text:"4K UHD"}], features:["Smart TV","HDR10+","4K UHD","55 cali"], description:"Telewizor Samsung 55” 4K UHD to propozycja do salonu, w którym liczy się duży obraz, wygodna obsługa i nowoczesne funkcje Smart TV."},
    {id:"lodowka-tcl-rp318bxe2", name:"Lodówka TCL RP318BXE2", category:"AGD / Lodówki", category_id:"lodowki", price:"1699,00 zł", oldPrice:"1931,00 zł", image:"assets/products/lodowka-tcl.png", badge:"Promocja", discount:"-12%", promo_active:true, promo_role:"mini", promo_badges:[{icon:"❄️",text:"No Frost"},{icon:"📦",text:"Pojemna"},{icon:"🔇",text:"Cicha"}], features:["Pełny No Frost","Pojemna chłodziarka","Cicha praca","Klasa E"], description:"Lodówka TCL RP318BXE2 sprawdzi się w mieszkaniu i domu rodzinnym. Oferuje wygodną organizację żywności, prostą obsługę i nowoczesny wygląd."},
    {id:"pralka-beko-wue7636xoa", name:"Pralka BEKO WUE7636XOA", category:"AGD / Pralki", category_id:"pralki", price:"1349,00 zł", oldPrice:"1606,00 zł", image:"assets/products/pralka-beko.png", badge:"Promocja", discount:"-16%", promo_active:true, promo_role:"mini", promo_badges:[{icon:"🧺",text:"7 kg"},{icon:"⚙️",text:"1200 obr."},{icon:"⏱️",text:"Program szybki"}], features:["7 kg załadunku","1200 obr./min","Program szybki","Dobra cena"], description:"Pralka BEKO do codziennego prania z programami dopasowanymi do różnych tkanin i wygodną obsługą."},
    {id:"piekarnik-samsung-nv7b44305ak", name:"Piekarnik Samsung NV7B44305AK", category:"AGD do zabudowy", category_id:"piekarniki", price:"1799,00 zł", oldPrice:"2367,00 zł", image:"assets/products/piekarnik-samsung.png", badge:"Hit dnia", discount:"-24%", promo_active:true, promo_role:"mini", promo_badges:[{icon:"🔥",text:"Termoobieg"},{icon:"🍟",text:"Air Fry"},{icon:"✨",text:"Premium"}], features:["Termoobieg","Air Fry","Prowadnice","Nowoczesny design"], description:"Piekarnik do nowoczesnej kuchni z funkcjami wygodnego pieczenia."}
  ];

  const comments = {
    telewizory:[
      "Telewizor dobrany idealnie do salonu. Obsługa wyjaśniła różnice między modelami.",
      "Bardzo dobra jakość obrazu i szybka pomoc przy wyborze odpowiedniego rozmiaru.",
      "Kupiliśmy lokalnie i od razu wiedzieliśmy, który model będzie najlepszy.",
      "Fachowa obsługa, konkretnie i bez wciskania najdroższego sprzętu.",
      "Duży plus za pomoc w konfiguracji i wyjaśnienie funkcji Smart TV."
    ],
    lodowki:[
      "Pomogli dobrać lodówkę pod wymiary kuchni i sposób otwierania drzwi.",
      "Dobra pojemność, wygodny układ półek i szybka informacja o dostępności.",
      "Obsługa jasno wyjaśniła, czym różni się No Frost od zwykłego chłodzenia.",
      "Lodówka pasuje idealnie, zakup przebiegł sprawnie.",
      "Doceniam lokalne doradztwo i możliwość odbioru sprzętu na miejscu."
    ],
    pralki:[
      "Pralka dobrana do małej łazienki, wszystko zostało jasno wyjaśnione.",
      "Dobry kontakt, pomoc przy wyborze pojemności i programów.",
      "Sprzęt działa dobrze, a obsługa była bardzo konkretna.",
      "Pomogli wybrać model slim i sprawdzić najważniejsze parametry.",
      "Zakup udany, szybka dostępność i dobra cena."
    ],
    zmywarki:[
      "Zmywarka dobrana pod szerokość kuchni i potrzeby domowników.",
      "Bardzo dobra pomoc przy wyborze modelu do zabudowy.",
      "Cicha praca, wygodne programy i sprawny zakup.",
      "Obsługa wyjaśniła różnice między 45 cm i 60 cm.",
      "Polecam za konkretną poradę i dobry kontakt."
    ],
    default:[
      "Bardzo dobra obsługa i konkretna pomoc przy wyborze sprzętu.",
      "Zakup przebiegł sprawnie, a doradca wyjaśnił najważniejsze różnice.",
      "Doceniam lokalny sklep i możliwość rozmowy przed zakupem.",
      "Szybka informacja o dostępności i dobra pomoc.",
      "Sprzęt dobrany do potrzeb, bez wciskania najdroższego modelu."
    ]
  };

  function slugify(text){
    return String(text||"").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l")
      .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }
  function esc(s){return String(s||"").replace(/[<>&"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));}
  function normalize(p){
    const images = Array.isArray(p.images)&&p.images.length ? p.images : (p.image ? [p.image] : ["assets/categories/agd.jpg"]);
    return {
      id:p.id||p.slug||slugify(p.name),
      name:p.name||"Produkt ELKASS",
      category:p.category||p.category_id||"Produkt",
      category_id:p.category_id||slugify(p.category||""),
      price:p.price||"Zapytaj o cenę",
      oldPrice:p.oldPrice||p.old_price||"",
      image:p.image||images[0],
      images,
      badge:p.badge||"Promocja",
      discount:p.discount||"",
      promo_active:p.promo_active!==false && p.active!==false,
      promo_role:p.promo_role||"",
      promo_badges:Array.isArray(p.promo_badges)?p.promo_badges:buildBadges(p),
      features:Array.isArray(p.features)?p.features:[],
      specs:p.specs||p.parameters||{},
      description:p.description||""
    };
  }
  function buildBadges(p){
    const source = []
      .concat(Array.isArray(p.features)?p.features:[])
      .concat(Object.entries(p.specs||p.parameters||{}).map(([k,v])=>String(k+" "+v)));
    const out=[];
    const text = source.join(" ").toLowerCase();
    if(/55|65|43|cal/.test(text) || /telewizor|tv/i.test(p.name||"")) out.push({icon:"📺",text:(text.match(/\b(43|50|55|65|75)\b/)||["","TV"])[1] ? (text.match(/\b(43|50|55|65|75)\b/)[1]+'”') : "TV"});
    if(/smart/.test(text)) out.push({icon:"✨",text:"Smart TV"});
    if(/hdr/.test(text)) out.push({icon:"🎬",text:"HDR"});
    if(/4k|uhd/.test(text)) out.push({icon:"⚡",text:"4K UHD"});
    if(/no frost|bezszron/.test(text)) out.push({icon:"❄️",text:"No Frost"});
    if(/pojem/.test(text)) out.push({icon:"📦",text:"Pojemny"});
    if(/hałas|halas|cicha/.test(text)) out.push({icon:"🔇",text:"Cicha praca"});
    if(/program szybki|30/.test(text)) out.push({icon:"⏱️",text:"Program szybki"});
    return out.slice(0,4);
  }
  async function products(){
    if(window.ELKASSCloud){
      try{
        const rows = await window.ELKASSCloud.list("products");
        if(Array.isArray(rows) && rows.length) return rows.map(normalize);
      }catch(e){}
    }
    return fallbackProducts.map(normalize);
  }
  function typeOf(p){
    const s=slugify([p.name,p.category,p.category_id].join(" "));
    if(/telewizor|tv|qled|oled/.test(s)) return "telewizory";
    if(/lodowka|lodowki|chlodz|zamraz/.test(s)) return "lodowki";
    if(/pralka|pralki/.test(s)) return "pralki";
    if(/zmywarka|zmywarki/.test(s)) return "zmywarki";
    return "default";
  }
  function shufflePick(a,n){
    const arr=[...(a||[])];
    for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
    return arr.slice(0,n);
  }

  function renderPromo(list){
    if(/product\.html|category\.html|\/admin\//i.test(location.pathname)) return;
    if(document.querySelector(".elkass702-promo-v2")) return;
    const active=list.filter(p=>p.promo_active);
    const hero=active.find(p=>p.promo_role==="hero") || active.find(p=>/telewizor|tv/i.test(p.name)) || active[0] || list[0];
    if(!hero) return;
    const minis=active.filter(p=>p.id!==hero.id).slice(0,4);
    const badges=(hero.promo_badges||[]).slice(0,5).map(b=>`<span class="elkass702-premium-badge"><span>${esc(b.icon||"✨")}</span>${esc(b.text||b)}</span>`).join("");
    const miniHtml=minis.map(p=>`<a href="product.html?id=${encodeURIComponent(p.id)}">
      <img src="${esc(p.image)}" alt="${esc(p.name)}" onerror="this.src='assets/categories/default.svg'">
      <span><small>${esc(p.badge)}</small><b>${esc(p.name)}</b></span>
    </a>`).join("");
    const sec=document.createElement("section");
    sec.className="elkass702-promo-v2";
    sec.innerHTML=`<article class="elkass702-promo-v2-hero">
      <div class="elkass702-promo-v2-copy">
        <span class="elkass702-promo-v2-kicker">🔥 ${esc(hero.badge||"Hit tygodnia")}</span>
        <h2>${esc(hero.name)}</h2>
        <p class="elkass702-promo-v2-lead">${esc(hero.description||"Sprawdź aktualną ofertę ELKASS Olesno i zapytaj o dostępność produktu.")}</p>
        <div class="elkass702-premium-badges">${badges}</div>
        <div class="elkass702-promo-v2-price"><strong>${esc(hero.price)}</strong>${hero.oldPrice?`<s>${esc(hero.oldPrice)}</s>`:""}</div>
        <a class="elkass702-promo-v2-cta" href="product.html?id=${encodeURIComponent(hero.id)}">Zobacz produkt</a>
      </div>
      <div class="elkass702-promo-v2-media">
        <a class="elkass702-promo-v2-image" href="product.html?id=${encodeURIComponent(hero.id)}">
          <img src="${esc(hero.image)}" alt="${esc(hero.name)}" onerror="this.src='assets/categories/default.svg'">
        </a>
      </div>
      ${hero.discount?`<div class="elkass702-discount-orb">${esc(hero.discount)}</div>`:""}
    </article>
    ${miniHtml?`<div class="elkass702-promo-v2-mini">${miniHtml}</div>`:""}`;
    document.body.classList.add("elkass702-promo-active");

    const search = document.querySelector("#search,.search-section,.quick-search-section,.shop-search-section,#szybkie-wyszukiwanie");
    if(search && search.parentNode) search.parentNode.insertBefore(sec, search.nextSibling);
    else {
      const heroNode=document.querySelector(".hero,.hero-section,section.hero,.hero-premium");
      if(heroNode && heroNode.parentNode) heroNode.parentNode.insertBefore(sec, heroNode.nextSibling);
      else (document.querySelector("main")||document.body).prepend(sec);
    }
  }

  function enhanceProduct(list){
    if(!/product\.html/i.test(location.pathname)) return;
    setTimeout(()=>{
      const id=new URLSearchParams(location.search).get("id");
      const p=list.find(x=>x.id===id||slugify(x.name)===id) || list[0];
      const page=document.querySelector(".elkass70-product-page,.product-page,main");
      if(!page || !p) return;

      // premium badges / feature chips under price
      const featuresUl=document.querySelector(".elkass70-features,.product-specs");
      if(featuresUl){
        const specBadges=Object.entries(p.specs||{}).map(([k,v])=>{
          const s=(k+" "+v).toLowerCase();
          if(/no frost|bezszron/.test(s)) return "Pełny No Frost";
          if(/hałas|halas/.test(s)) return "Cicha praca " + v;
          if(/klasa/.test(s)) return "Klasa " + v;
          if(/pojem/.test(s)) return String(v);
          return null;
        }).filter(Boolean);
        const chips=[...p.features,...specBadges].filter(Boolean).slice(0,8);
        if(chips.length) featuresUl.innerHTML=chips.map(x=>`<li>✓ ${esc(x)}</li>`).join("");
      }

      // move benefits under description
      const benefits=document.querySelector(".elkass70-benefits,.elkass-product-service-grid");
      const desc=[...document.querySelectorAll(".elkass70-section,section")].find(s=>/Opis produktu/i.test(s.textContent));
      if(benefits && desc && !document.querySelector(".elkass702-benefits-section")){
        const sec=document.createElement("section");
        sec.className="elkass70-section elkass702-benefits-section";
        sec.innerHTML="<h2>Korzyści zakupu w ELKASS</h2>";
        sec.appendChild(benefits);
        desc.parentNode.insertBefore(sec, desc.nextSibling);
      }

      // gallery repair
      const thumbs=document.querySelector(".elkass70-thumbs");
      const mainImg=document.querySelector("#elkass70MainImage,.elkass70-main-image img");
      if(thumbs && mainImg && p.images && p.images.length>1){
        thumbs.innerHTML=p.images.map((img,i)=>`<button class="elkass70-thumb ${i===0?"is-active":""}" type="button" data-img="${esc(img)}"><img src="${esc(img)}" alt="${esc(p.name)} miniatura" onerror="this.src='assets/categories/default.svg'"></button>`).join("");
        thumbs.querySelectorAll(".elkass70-thumb").forEach(btn=>{
          btn.addEventListener("click",()=>{
            thumbs.querySelectorAll(".elkass70-thumb").forEach(x=>x.classList.remove("is-active"));
            btn.classList.add("is-active");
            mainImg.src=btn.dataset.img;
          });
        });
      }

      // comments category (not print)
      if(!document.querySelector(".elkass702-comments-section")){
        const c=shufflePick(comments[typeOf(p)]||comments.default, 3+Math.floor(Math.random()*3));
        const names=["Anna","Marek","Katarzyna","Piotr","Tomasz"];
        const sec=document.createElement("section");
        sec.className="elkass70-section elkass702-comments-section elkass702-no-print";
        sec.innerHTML=`<h2>Opinie klientów o produktach z tej kategorii</h2>
          <div class="elkass702-comments-grid">
            ${c.map((txt,i)=>`<article class="elkass702-comment-card"><div class="elkass702-comment-stars">★★★★★</div><p>${esc(txt)}</p><b>${names[i]||"Klient"}, okolice Olesna</b></article>`).join("")}
          </div>`;
        const related=[...document.querySelectorAll(".elkass70-section,section")].find(s=>/Produkty podobne/i.test(s.textContent));
        if(related) related.parentNode.insertBefore(sec,related);
        else page.appendChild(sec);
      }

      document.querySelectorAll("h2").forEach(h=>{
        if(/^Parametry produktu$/i.test(h.textContent.trim())) h.textContent="Opis produktu";
      });
    }, 800);
  }

  function enhanceWizard(){
    if(!/product-wizard-clean\.html|product-wizard-65\.html/i.test(location.pathname)) return;
    setTimeout(()=>{
      // Rename labels
      document.querySelectorAll("label,h2,h3,p").forEach(el=>{
        if(/Opis\s*\/\s*cechy produktu/i.test(el.textContent)) el.textContent=el.textContent.replace(/Opis\s*\/\s*cechy produktu/i,"Cechy produktu");
        if(/^Parametry produktu$/i.test(el.textContent.trim())) el.textContent="Opis produktu";
      });

      // Add promo panel
      if(!document.querySelector("#elkass702PromoPanel")){
        const card=document.createElement("section");
        card.className="elkass702-promo-panel";
        card.id="elkass702PromoPanel";
        card.innerHTML=`<h2>⭐ Promocja produktu</h2>
          <p class="note">Ustaw czy produkt ma być pokazywany w sekcji promocji i jakie premium badge mają się wyświetlać.</p>
          <label><input type="checkbox" id="promo_active"> Aktywna promocja</label>
          <label>Rola promocji
            <select id="promo_role"><option value="">Miniatura</option><option value="hero">Główna promocja hero</option><option value="mini">Miniatura</option></select>
          </label>
          <label>Rabat / etykieta ceny <input id="discount" placeholder="-25%"></label>
          <h3>Premium badge</h3>
          <div id="promoBadgeList" class="elkass702-promo-badge-list"></div>
          <button type="button" class="elkass702-add-badge" id="addPromoBadge">+ Dodaj badge</button>
          <label>Galeria produktu — zdjęcia po przecinku
            <textarea id="images" placeholder="assets/products/produkt-1.jpg, assets/products/produkt-2.jpg"></textarea>
          </label>`;
        const first=document.querySelector(".card") || document.querySelector("main") || document.body;
        first.parentNode.insertBefore(card, first.nextSibling);

        function addRow(icon="✨", text=""){
          const row=document.createElement("div");
          row.className="elkass702-promo-badge-row";
          row.innerHTML=`<input class="promo-badge-icon" value="${esc(icon)}" placeholder="Ikona"><input class="promo-badge-text" value="${esc(text)}" placeholder="np. Smart TV"><button type="button">Usuń</button>`;
          row.querySelector("button").onclick=()=>row.remove();
          document.querySelector("#promoBadgeList").appendChild(row);
        }
        addRow("📺","55”"); addRow("✨","Smart TV"); addRow("🎬","HDR10+");
        document.querySelector("#addPromoBadge").onclick=()=>addRow();
      }

      // Patch cloud save to include promo, badge, gallery fields
      if(window.ELKASSCloud && window.ELKASSCloud.save && !window.__elkass702SavePatched){
        window.__elkass702SavePatched=true;
        const orig=window.ELKASSCloud.save;
        window.ELKASSCloud.save=async function(collection,item){
          if(collection==="products" || collection==="product"){
            item.promo_active=!!document.querySelector("#promo_active")?.checked;
            item.promo_role=document.querySelector("#promo_role")?.value || "";
            item.discount=document.querySelector("#discount")?.value || item.discount || "";
            item.promo_badges=[...document.querySelectorAll(".elkass702-promo-badge-row")].map(row=>({
              icon:row.querySelector(".promo-badge-icon")?.value || "✨",
              text:row.querySelector(".promo-badge-text")?.value || ""
            })).filter(x=>x.text);
            const imgs=document.querySelector("#images")?.value;
            if(imgs){
              item.images=imgs.split(",").map(x=>x.trim()).filter(Boolean);
              if(!item.image && item.images.length) item.image=item.images[0];
            }
          }
          return orig.call(window.ELKASSCloud, collection, item);
        };
      }
    },600);
  }

  document.addEventListener("DOMContentLoaded", async ()=>{
    const list=await products();
    renderPromo(list);
    enhanceProduct(list);
    enhanceWizard();
  });
})();
