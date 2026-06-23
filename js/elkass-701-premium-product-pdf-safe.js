/* ELKASS 7.0.1 — Premium product page + complete PDF print, safe overlay */
(function(){
  const demoProducts = {
    "lodowka-tcl-rp318bxe2": {
      id:"lodowka-tcl-rp318bxe2",
      name:"Lodówka TCL RP318BXE2",
      category:"AGD / Lodówki",
      price:"1699,00 zł",
      oldPrice:"1931,00 zł",
      saving:"Oszczędzasz 232 zł",
      image:"assets/products/lodowka-tcl.png",
      badge:"Dostępny w sklepie",
      rating:"4.8",
      reviews:"17 opinii",
      lead:"Nowoczesna chłodziarko-zamrażarka do codziennego użytku, zaprojektowana z myślą o wygodzie, pojemności i rozsądnym zużyciu energii.",
      features:["No Frost","Pojemna chłodziarka","Cicha praca","Dobry wybór do domu","Oświetlenie LED","Nowoczesny wygląd"],
      description:"Lodówka TCL RP318BXE2 została zaprojektowana dla osób szukających pojemnego i wygodnego urządzenia do codziennego użytkowania. Technologia No Frost ogranicza powstawanie szronu, a przemyślany układ półek ułatwia organizację żywności. Model sprawdzi się zarówno w mieszkaniu, jak i domu rodzinnym. W ELKASS Olesno pomożemy dobrać sprzęt do miejsca w kuchni, sposobu użytkowania oraz budżetu.",
      specs:{
        "Producent":"TCL",
        "Model":"RP318BXE2",
        "Typ":"Chłodziarko-zamrażarka",
        "No Frost":"Tak",
        "Kolor":"Inox",
        "Dostępność":"Sklep / zamówienie"
      },
      definitions:[
        {term:"No Frost", definition:"System ograniczający powstawanie szronu. Dzięki temu urządzenie jest wygodniejsze w codziennym użytkowaniu."},
        {term:"Oświetlenie LED", definition:"Energooszczędne oświetlenie wnętrza ułatwiające szybkie znalezienie produktów."}
      ],
      images:["assets/products/lodowka-tcl.png","assets/categories/agd.jpg","assets/categories/agd.svg"]
    },
    "pralka-beko-wue7636xoa": {
      id:"pralka-beko-wue7636xoa",
      name:"Pralka BEKO WUE7636XOA",
      category:"AGD / Pralki",
      price:"1349,00 zł",
      oldPrice:"1606,00 zł",
      saving:"Oszczędzasz 257 zł",
      image:"assets/products/pralka-beko.png",
      badge:"Promocja",
      rating:"4.7",
      reviews:"12 opinii",
      lead:"Pralka do codziennego prania z programami dopasowanymi do różnych tkanin i wygodną obsługą.",
      features:["7 kg załadunku","1200 obr./min","Program szybki","Dobra cena","Codzienne pranie","Prosta obsługa"],
      description:"Dobry wybór do mieszkania i domu. Pralka oferuje wygodne programy, rozsądną pojemność i funkcje przydatne w codziennym użytkowaniu. Doradzimy, czy ten model pasuje do Twoich potrzeb.",
      specs:{"Producent":"BEKO","Model":"WUE7636XOA","Załadunek":"7 kg","Obroty":"1200 obr./min","Typ":"Wolnostojąca","Dostępność":"Sklep / zamówienie"},
      definitions:[{term:"Program szybki",definition:"Program pozwalający wyprać lekko zabrudzone ubrania w krótszym czasie."}],
      images:["assets/products/pralka-beko.png","assets/categories/agd.jpg","assets/categories/agd.svg"]
    }
  };

  function slugify(text){
    return String(text||"").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l")
      .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }

  async function getProduct(){
    const id = new URLSearchParams(location.search).get("id") || "lodowka-tcl-rp318bxe2";
    if(window.ELKASSCloud){
      try{
        const arr = await window.ELKASSCloud.list("products");
        const p = (arr||[]).find(x => x.id === id || x.slug === id || slugify(x.name) === id);
        if(p) return normalizeProduct(p);
      }catch(e){}
    }
    return normalizeProduct(demoProducts[id] || demoProducts["lodowka-tcl-rp318bxe2"]);
  }

  function normalizeProduct(p){
    const features = Array.isArray(p.features) ? p.features : [];
    const specs = p.specs || p.parameters || {
      "Kategoria": p.category || "Produkt ELKASS",
      "Dostępność": p.badge || "Zapytaj w sklepie"
    };
    const images = Array.isArray(p.images) && p.images.length ? p.images : [p.image || "assets/categories/agd.jpg"];
    return {
      id: p.id || p.slug || slugify(p.name),
      name: p.name || "Produkt ELKASS",
      category: p.category || p.category_id || "Produkt ELKASS",
      price: p.price || "Zapytaj o cenę",
      oldPrice: p.oldPrice || p.old_price || "",
      saving: p.saving || "",
      image: p.image || images[0],
      badge: p.badge || "Dostępny w sklepie",
      rating: p.rating || "4.8",
      reviews: p.reviews || "opinie klientów",
      lead: p.lead || "Sprawdź dostępność, aktualną cenę i szczegóły produktu w ELKASS Olesno.",
      description: p.description || "Opis produktu możesz uzupełnić w panelu. Najważniejsze informacje powinny wyjaśniać, do czego sprzęt jest najlepszy, jakie ma cechy i dlaczego warto kupić go lokalnie w ELKASS.",
      features,
      specs,
      definitions: Array.isArray(p.definitions) ? p.definitions : [],
      images
    };
  }

  function relatedProducts(currentId){
    return Object.values(demoProducts).filter(p => p.id !== currentId).slice(0,3);
  }

  function safe(text){
    return String(text || "").replace(/[<>&"]/g, c => ({"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;"}[c]));
  }

  function render(p){
    document.body.classList.add("elkass70-product-active");

    const main = document.querySelector("main") || document.body;
    document.querySelector(".elkass70-product-page")?.remove();

    const thumbs = p.images.map((img,i)=>`
      <button class="elkass70-thumb ${i===0?"is-active":""}" type="button" data-img="${safe(img)}">
        <img src="${safe(img)}" alt="${safe(p.name)} miniatura ${i+1}" onerror="this.src='assets/categories/agd.svg'">
      </button>`).join("");

    const features = (p.features || []).slice(0,8).map(f=>`<li>✓ ${safe(f)}</li>`).join("");

    const specs = Object.entries(p.specs || {}).map(([k,v])=>`
      <tr><th>${safe(k)}</th><td>${safe(v)}</td></tr>`).join("");

    const defs = (p.definitions || []).length ? `
      <section class="elkass70-section">
        <h2>Wyjaśnienie pojęć</h2>
        <div class="elkass70-def-grid">
          ${p.definitions.map(d=>`<div class="elkass70-def-card"><strong>${safe(d.term)}</strong><p>${safe(d.definition)}</p></div>`).join("")}
        </div>
      </section>` : "";

    const related = relatedProducts(p.id).map(r => `
      <article class="elkass70-related-card">
        <img src="${safe(r.image || "assets/categories/agd.jpg")}" alt="${safe(r.name)}" onerror="this.src='assets/categories/agd.svg'">
        <h3>${safe(r.name)}</h3>
        <strong>${safe(r.price || "Zapytaj o cenę")}</strong><br>
        <a href="product.html?id=${encodeURIComponent(r.id)}">Zobacz produkt</a>
      </article>`).join("");

    const html = `
      <article class="elkass70-product-page" id="elkass70-print-area">
        <section class="elkass70-product-hero">
          <div class="elkass70-gallery">
            <div class="elkass70-main-image">
              <img id="elkass70MainImage" src="${safe(p.image)}" alt="${safe(p.name)}" onerror="this.src='assets/categories/agd.svg'">
            </div>
            <div class="elkass70-thumbs">${thumbs}</div>
          </div>

          <div class="elkass70-info">
            <div class="elkass70-breadcrumb">${safe(p.category)}</div>
            <h1>${safe(p.name)}</h1>
            <div class="elkass70-rating">
              <span class="elkass70-stars">★★★★★</span>
              <span>${safe(p.rating)} / 5 · ${safe(p.reviews)}</span>
            </div>

            <div class="elkass70-price">
              <strong>${safe(p.price)}</strong>
              ${p.oldPrice ? `<span class="elkass70-old-price">${safe(p.oldPrice)}</span>` : ""}
            </div>
            ${p.saving ? `<div class="elkass70-saving">${safe(p.saving)}</div>` : ""}

            <div class="elkass70-status">
              <span>🟢 ${safe(p.badge)}</span>
              <span>🟢 Odbiór osobisty w Olesnie</span>
              <span>🟢 Możliwa dostawa lokalna</span>
            </div>

            <p class="elkass70-lead">${safe(p.lead)}</p>

            <div class="elkass70-actions">
              <a class="elkass70-btn elkass70-btn-primary" href="#" data-elkass-buy>🛒 Kup teraz</a>
              <a class="elkass70-btn elkass70-btn-dark" href="tel:343582442">📞 Zapytaj o produkt</a>
              <button class="elkass70-btn elkass70-btn-light" type="button" data-elkass-print>🖨️ Drukuj / PDF</button>
            </div>

            <div class="elkass70-benefits">
              <span>🚚 Szybki transport</span>
              <span>💳 Raty 0%</span>
              <span>🧠 Fachowe doradztwo</span>
              <span>🛠️ Wsparcie po zakupie</span>
            </div>

            <ul class="elkass70-features">${features}</ul>
          </div>
        </section>

        <section class="elkass70-section">
          <h2>Opis produktu</h2>
          <p>${safe(p.description)}</p>
        </section>

        <section class="elkass70-section">
          <h2>Dlaczego warto kupić w ELKASS?</h2>
          <div class="elkass70-why-grid">
            <div>✓ Lokalny sklep z wieloletnim doświadczeniem</div>
            <div>✓ Fachowe doradztwo przed zakupem</div>
            <div>✓ Odbiór osobisty w Olesnie</div>
            <div>✓ Możliwość dostawy i wsparcia po zakupie</div>
          </div>
        </section>

        <section class="elkass70-section">
          <h2>Parametry techniczne</h2>
          <table class="elkass70-spec">${specs}</table>
        </section>

        ${defs}

        <section class="elkass70-section">
          <h2>Produkty podobne</h2>
          <div class="elkass70-related">${related}</div>
        </section>

        <section class="elkass70-section">
          <h2>ELKASS Olesno</h2>
          <p>Telefon: 34 358 24 42 · Lokalny sklep RTV/AGD, multimedia i serwis. Karta produktu zawiera pełny opis, cechy, parametry i informacje przydatne dla klienta przy zakupie.</p>
        </section>
      </article>
    `;

    main.insertAdjacentHTML("afterbegin", html);

    document.querySelectorAll(".elkass70-thumb").forEach(btn=>{
      btn.addEventListener("click",()=>{
        document.querySelectorAll(".elkass70-thumb").forEach(x=>x.classList.remove("is-active"));
        btn.classList.add("is-active");
        const img = document.getElementById("elkass70MainImage");
        if(img) img.src = btn.dataset.img;
      });
    });

    const printBtn = document.querySelector("[data-elkass-print]");
    if(printBtn) printBtn.addEventListener("click",()=>window.print());

    const buyBtn = document.querySelector("[data-elkass-buy]");
    if(buyBtn) buyBtn.addEventListener("click",(e)=>{
      e.preventDefault();
      alert("Sprzedaż online jest przygotowana. Po aktywacji w panelu przycisk może prowadzić do koszyka lub zamówienia.");
    });
  }

  document.addEventListener("DOMContentLoaded", async ()=>{
    if(!/product\.html/i.test(location.pathname)) return;
    const p = await getProduct();
    render(p);
  });
})();
