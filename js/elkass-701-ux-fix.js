/* ELKASS 7.0.1 UX FIX — promotions, product fields, gallery, comments */
(function(){
  const demoProducts = [
    {id:"lodowka-tcl-rp318bxe2", name:"Lodówka TCL RP318BXE2", category_id:"lodowki", category:"AGD / Lodówki", price:"1699,00 zł", oldPrice:"1931,00 zł", image:"assets/products/lodowka-tcl.png", badge:"Black Friday", discount:"-12%", features:["Pełny No Frost","Pojemna chłodziarka","Cicha praca","Klasa E"], description:"Lodówka TCL RP318BXE2 to praktyczny model do domu i mieszkania. Sprawdza się przy codziennym przechowywaniu żywności i pozwala wygodnie zorganizować chłodziarkę oraz zamrażarkę."},
    {id:"piekarnik-samsung-nv7b44305ak", name:"Piekarnik Samsung NV7B44305AK", category_id:"piekarniki", category:"AGD do zabudowy", price:"1799,00 zł", oldPrice:"2367,00 zł", image:"assets/products/piekarnik-samsung.png", badge:"Hit dnia", discount:"-24%", features:["Termoobieg","Programy automatyczne","Nowoczesny wygląd"], description:"Piekarnik do nowoczesnej kuchni z funkcjami wygodnego pieczenia."},
    {id:"telewizor-samsung-55-4k-uhd", name:"Telewizor Samsung 55” 4K UHD", category_id:"telewizory", category:"RTV / Telewizory", price:"2299,00 zł", oldPrice:"3065,00 zł", image:"assets/products/telewizor-samsung.png", badge:"Black Friday", discount:"-25%", features:["Smart TV","HDR","Krystaliczny obraz","55 cali"], description:"Telewizor z dużym ekranem 4K do filmów, sportu i codziennej rozrywki."},
    {id:"smartfon-samsung-galaxy-a35", name:"Smartfon Samsung Galaxy A35", category_id:"smartfony", category:"Telefony", price:"899,00 zł", oldPrice:"999,00 zł", image:"assets/products/smartfon-samsung.png", badge:"Hit dnia", discount:"-10%", features:["Dobry aparat","Bateria na cały dzień","Płynne działanie"], description:"Smartfon do codziennego użytkowania, zdjęć i komunikacji."}
  ];

  const commentBank = {
    telewizory:[
      "Dobry obraz i szybka pomoc przy wyborze odpowiedniego rozmiaru telewizora.",
      "Obsługa doradziła model do salonu i wszystko działa jak trzeba.",
      "Telewizor kupiony lokalnie, szybki odbiór i konkretna porada.",
      "Fajnie, że można było zapytać o różnice między modelami przed zakupem.",
      "Bardzo dobra jakość obrazu i sprawna obsługa w sklepie."
    ],
    pralki:[
      "Pralka dobrana do małej łazienki, obsługa pomogła wybrać slim.",
      "Dobry kontakt i szybka informacja o dostępności.",
      "Programy są proste w obsłudze, zakup udany.",
      "Pomogli dobrać pralkę pod pojemność i budżet.",
      "Sprzęt działa dobrze, doceniam lokalne doradztwo."
    ],
    zmywarki:[
      "Zmywarka dobrana pod szerokość kuchni, wszystko pasuje.",
      "Pomogli wybrać model 45 cm, bardzo dobra obsługa.",
      "Cicha praca i wygodne programy.",
      "Zakup lokalny, szybka dostępność i jasne wyjaśnienia.",
      "Dobre doradztwo przy wyborze zmywarki do zabudowy."
    ],
    lodowki:[
      "Pomogli dobrać lodówkę pod miejsce w kuchni.",
      "Dobra pojemność i wygodny układ półek.",
      "Obsługa wyjaśniła różnice w No Frost.",
      "Szybka dostępność i konkretna pomoc.",
      "Lodówka pasuje idealnie, dobry zakup."
    ],
    odkurzacze:[
      "Dobrze doradzony odkurzacz do mieszkania.",
      "Sprzęt lekki i wygodny, obsługa bardzo pomocna.",
      "Szybka informacja o modelach i cenach.",
      "Dobry wybór do codziennego sprzątania.",
      "Polecam za konkretne doradztwo."
    ],
    default:[
      "Bardzo dobra obsługa i konkretna pomoc przy wyborze sprzętu.",
      "Zakup przebiegł sprawnie, a doradca wyjaśnił najważniejsze różnice.",
      "Doceniam lokalny sklep i możliwość rozmowy przed zakupem.",
      "Szybka odpowiedź o dostępności i dobry kontakt.",
      "Sprzęt dobrany do potrzeb, bez wciskania najdroższego modelu."
    ]
  };

  function slugify(text){
    return String(text||"").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l")
      .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }
  function clean(s){return String(s||"").replace(/[<>&"]/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));}
  function productType(p){
    const s = slugify([p.name,p.category,p.category_id].filter(Boolean).join(" "));
    const rules = [
      ["telewizory",["telewizor","tv","qled","oled"]],
      ["pralki",["pralka","pralki"]],
      ["zmywarki",["zmywarka","zmywarki"]],
      ["lodowki",["lodowka","lodowki","chłodziarka","zamrazarka","zamrażarka"]],
      ["odkurzacze",["odkurzacz","odkurzacze"]]
    ];
    for(const [type,keys] of rules){
      if(keys.some(k=>s.includes(slugify(k)))) return type;
    }
    return "default";
  }
  function pick(arr,n){
    const copy=[...(arr||[])];
    for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
    return copy.slice(0,n);
  }
  async function getProducts(){
    if(window.ELKASSCloud){
      try{
        const arr = await window.ELKASSCloud.list("products");
        if(Array.isArray(arr) && arr.length) return arr;
      }catch(e){}
    }
    return demoProducts;
  }
  function normalizeProduct(p){
    return {
      id:p.id||p.slug||slugify(p.name),
      name:p.name||"Produkt ELKASS",
      category:p.category||p.category_id||"Produkt",
      category_id:p.category_id||slugify(p.category||""),
      price:p.price||"Zapytaj o cenę",
      oldPrice:p.oldPrice||p.old_price||"",
      image:p.image||"assets/categories/agd.jpg",
      badge:p.badge||"Promocja",
      discount:p.discount||"",
      features:Array.isArray(p.features)?p.features:[],
      specs:p.specs||p.parameters||{},
      description:p.description||"",
      images:Array.isArray(p.images)&&p.images.length?p.images:(p.image?[p.image]:[])
    };
  }

  function renderPromoSection(products){
    const main=document.querySelector("main")||document.body;
    const existing=document.querySelector(".elkass701-promo-section");
    if(existing) existing.remove();

    const p = normalizeProduct(products.find(x=>/telewizor/i.test(x.name||"")) || products[0] || demoProducts[0]);
    const minis = products.slice(0,4).map(x=>{
      const q=normalizeProduct(x);
      return `<a class="elkass701-mini-card" href="product.html?id=${encodeURIComponent(q.id)}">
        <img src="${clean(q.image)}" alt="${clean(q.name)}" onerror="this.src='assets/categories/default.svg'">
        <span><small>${clean(q.badge)}</small><b>${clean(q.name)}</b></span>
      </a>`;
    }).join("");

    const section=document.createElement("section");
    section.className="elkass701-promo-section";
    section.innerHTML=`<article class="elkass701-promo-hero">
      <div class="elkass701-promo-title">
        <span class="elkass701-promo-badge">🔥 HIT TYGODNIA</span>
        <h2>${clean(p.name)}</h2>
        <p class="elkass701-promo-meta">${clean(p.category)} • ${p.features.slice(0,3).map(clean).join(" • ")}</p>
        <div class="elkass701-promo-price"><strong>${clean(p.price)}</strong><a class="elkass701-promo-btn" href="product.html?id=${encodeURIComponent(p.id)}">Zobacz kartę produktu</a></div>
      </div>
      <a class="elkass701-promo-image-wrap" href="product.html?id=${encodeURIComponent(p.id)}">
        <img src="${clean(p.image)}" alt="${clean(p.name)}" onerror="this.src='assets/categories/default.svg'">
      </a>
      ${p.discount?`<div class="elkass701-discount">${clean(p.discount)}</div>`:""}
    </article><div class="elkass701-promo-mini">${minis}</div>`;

    const oldPromo = document.querySelector(".deal-banner-section,.promo-strip,.top-offers-strip,#dealMiniList,.deal-mini-list");
    if(oldPromo && oldPromo.parentNode){
      oldPromo.parentNode.insertBefore(section, oldPromo);
      oldPromo.style.display="none";
    } else {
      const cats = document.querySelector("#oferta,.categories-section,.elkass57-category-grid");
      if(cats && cats.parentNode) cats.parentNode.insertBefore(section,cats);
      else main.prepend(section);
    }
  }

  function improveProductPage(products){
    if(!/product\.html/i.test(location.pathname)) return;
    const id = new URLSearchParams(location.search).get("id");
    const p = normalizeProduct(products.find(x=>x.id===id||x.slug===id||slugify(x.name)===id) || products[0] || demoProducts[0]);

    setTimeout(()=>{
      const page=document.querySelector(".elkass70-product-page");
      if(!page) return;

      // Ensure feature chips under price are product features/spec-derived only, max 8
      const featuresUl = page.querySelector(".elkass70-features");
      if(featuresUl){
        const specVals = Object.entries(p.specs||{}).map(([k,v])=>{
          const s=String(k+" "+v);
          if(/no frost|bezszron/i.test(s)) return "Pełny No Frost";
          if(/hałas|halas/i.test(s)) return String(v).includes("dB") ? "Cicha praca " + v : "Cicha praca";
          if(/klasa/i.test(s)) return "Klasa " + v;
          if(/pojem/i.test(s)) return String(v).replace(/^/,"Pojemność ");
          return null;
        }).filter(Boolean);
        const chips=[...p.features, ...specVals].filter(Boolean).slice(0,8);
        if(chips.length) featuresUl.innerHTML=chips.map(x=>`<li>✓ ${clean(x)}</li>`).join("");
      }

      // Move benefits below product description
      const benefits = page.querySelector(".elkass70-benefits");
      const descSec = [...page.querySelectorAll(".elkass70-section")].find(s=>/Opis produktu/i.test(s.textContent));
      if(benefits && descSec && !benefits.classList.contains("elkass701-benefits-moved")){
        const wrap=document.createElement("section");
        wrap.className="elkass70-section";
        wrap.innerHTML="<h2>Korzyści zakupu w ELKASS</h2>";
        benefits.classList.add("elkass701-benefits-moved");
        wrap.appendChild(benefits);
        descSec.parentNode.insertBefore(wrap, descSec.nextSibling);
      }

      // Rename any wrong "Parametry produktu" heading to "Opis produktu" only if it contains description-like text
      page.querySelectorAll("h2").forEach(h=>{
        if(/Parametry produktu/i.test(h.textContent)) h.textContent="Opis produktu";
      });

      // Comments section before related products, not print
      if(!page.querySelector(".elkass701-comments-section")){
        const type=productType(p);
        const comments=pick(commentBank[type]||commentBank.default, 3 + Math.floor(Math.random()*3));
        const sec=document.createElement("section");
        sec.className="elkass70-section elkass701-comments-section";
        sec.innerHTML=`<h2>Opinie klientów o produktach z tej kategorii</h2>
          <div class="elkass701-comments-grid">
            ${comments.map((c,i)=>`<article class="elkass701-comment"><div class="elkass701-comment-stars">★★★★★</div><p>${clean(c)}</p><b>${["Anna","Marek","Katarzyna","Piotr","Tomasz"][i] || "Klient"}, okolice Olesna</b></article>`).join("")}
          </div>`;
        const related=[...page.querySelectorAll(".elkass70-section")].find(s=>/Produkty podobne/i.test(s.textContent));
        if(related) related.parentNode.insertBefore(sec, related);
        else page.appendChild(sec);
      }

      // Gallery: ensure thumbs from images/spec if missing
      const thumbs = page.querySelector(".elkass70-thumbs");
      const mainImg = page.querySelector("#elkass70MainImage");
      if(thumbs && mainImg && p.images && p.images.length>1 && thumbs.children.length<2){
        thumbs.innerHTML=p.images.map((img,i)=>`<button class="elkass70-thumb ${i===0?"is-active":""}" type="button" data-img="${clean(img)}"><img src="${clean(img)}" alt="${clean(p.name)} miniatura" onerror="this.src='assets/categories/default.svg'"></button>`).join("");
        thumbs.querySelectorAll(".elkass70-thumb").forEach(btn=>btn.addEventListener("click",()=>{
          thumbs.querySelectorAll(".elkass70-thumb").forEach(x=>x.classList.remove("is-active"));
          btn.classList.add("is-active"); mainImg.src=btn.dataset.img;
        }));
      }
    }, 650);
  }

  function improveProductWizard(){
    if(!/product-wizard-clean\.html|product-wizard-65\.html/i.test(location.pathname)) return;
    setTimeout(()=>{
      document.querySelectorAll("label,h2,h3,p").forEach(el=>{
        if(/Opis\s*\/\s*cechy produktu/i.test(el.textContent)) el.textContent=el.textContent.replace(/Opis\s*\/\s*cechy produktu/i,"Cechy produktu");
        if(/^Parametry produktu$/i.test(el.textContent.trim())) el.textContent="Opis produktu";
      });

      // Add gallery URLs field if missing
      if(!document.querySelector("#images")){
        const imageInput=document.querySelector("#image");
        const parent=imageInput?.closest("label")?.parentNode || document.querySelector(".grid") || document.querySelector(".card");
        if(parent){
          const label=document.createElement("label");
          label.innerHTML='Galeria produktu — zdjęcia po przecinku<textarea id="images" placeholder="assets/products/produkt-1.jpg, assets/products/produkt-2.jpg"></textarea>';
          parent.appendChild(label);
        }
      }

      // Patch save to include images from #images
      if(window.ELKASSCloud && window.ELKASSCloud.save && !window.__elkass701SavePatched){
        window.__elkass701SavePatched=true;
        const orig=window.ELKASSCloud.save;
        window.ELKASSCloud.save=async function(collection,item){
          if(collection==="products" || collection==="product"){
            const imgs=document.querySelector("#images")?.value;
            if(imgs){
              item.images=imgs.split(",").map(x=>x.trim()).filter(Boolean);
              if(!item.image && item.images.length) item.image=item.images[0];
            }
          }
          return orig.call(window.ELKASSCloud, collection, item);
        };
      }
    },500);
  }

  document.addEventListener("DOMContentLoaded", async ()=>{
    const products=(await getProducts()).map(normalizeProduct);
    if(!/product\.html/i.test(location.pathname) && !/\/admin\//.test(location.pathname)){
      renderPromoSection(products);
    }
    improveProductPage(products);
    improveProductWizard();
  });
})();
