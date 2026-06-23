/* ELKASS 6.5 Product Premium Builder */
(function(){
  const demoProducts = {
    "lodowka-tcl-rp318bxe2": {
      name:"Lodówka TCL RP318BXE2",
      category:"AGD / Lodówki",
      price:"1699,00 zł",
      oldPrice:"1931,00 zł",
      image:"assets/products/lodowka-tcl.png",
      badge:"Dostępny w sklepie",
      lead:"Nowoczesna chłodziarko-zamrażarka do codziennego użytku, zaprojektowana z myślą o wygodzie, pojemności i rozsądnym zużyciu energii.",
      features:["No Frost","Pojemna chłodziarka","Cicha praca","Dobry wybór do domu"],
      description:"Ten model sprawdzi się w mieszkaniu i domu rodzinnym. Oferuje wygodną organizację żywności, prostą obsługę i nowoczesny wygląd. W ELKASS Olesno pomożemy dobrać sprzęt do miejsca w kuchni, sposobu użytkowania oraz budżetu."
    },
    "pralka-beko-wue7636xoa": {
      name:"Pralka BEKO WUE7636XOA",
      category:"AGD / Pralki",
      price:"1349,00 zł",
      oldPrice:"1606,00 zł",
      image:"assets/products/pralka-beko.png",
      badge:"Promocja",
      lead:"Pralka do codziennego prania z programami dopasowanymi do różnych tkanin i wygodną obsługą.",
      features:["7 kg załadunku","1200 obr./min","Program szybki","Dobra cena"],
      description:"Dobry wybór do mieszkania i domu. Pralka oferuje wygodne programy, rozsądną pojemność i funkcje przydatne w codziennym użytkowaniu. Doradzimy, czy ten model pasuje do Twoich potrzeb."
    }
  };

  function slugify(text){return String(text||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");}

  function getProductId(){
    const q = new URLSearchParams(location.search);
    return q.get("id") || q.get("product") || "";
  }

  async function getProduct(id){
    if(window.ELKASSCloud){
      try{
        const products = await window.ELKASSCloud.list("products");
        const found = (products||[]).find(p => p.id === id || p.slug === id || slugify(p.name) === id);
        if(found) return found;
      }catch(e){}
    }
    return demoProducts[id] || Object.values(demoProducts)[0];
  }

  function render(p){
    const old = p.oldPrice ? `<span>${p.oldPrice}</span>` : "";
    const features = (p.features || []).slice(0,8).map(f=>`<li>✓ ${f}</li>`).join("");
    const img = p.image || "assets/categories/agd.jpg";
    const html = `
      <section class="elkass-product-premium-shell">
        <article class="elkass-product-premium-card">
          <div class="elkass-product-premium-media">
            <div class="elkass-product-badge">${p.badge || "Dostępny w sklepie"}</div>
            <img src="${img}" alt="${p.name || "Produkt ELKASS"}" onerror="this.src='assets/categories/agd.svg'">
          </div>
          <div class="elkass-product-premium-info">
            <small>${p.category || "Produkt ELKASS"}</small>
            <h1>${p.name || "Produkt ELKASS"}</h1>
            <p class="elkass-product-premium-lead">${p.lead || "Sprawdź dostępność, aktualną cenę i szczegóły produktu w ELKASS Olesno."}</p>
            <div class="elkass-product-premium-price"><strong>${p.price || "Zapytaj o cenę"}</strong>${old}</div>
            <ul class="elkass-product-features">${features}</ul>
            <div class="elkass-product-service-grid">
              <div>🚚 Szybki transport</div>
              <div>💳 Raty 0%</div>
              <div>🧠 Fachowe doradztwo</div>
            </div>
            <div class="elkass-product-cta-row">
              <a class="elkass-product-cta-primary" href="tel:343582442">☎ Zapytaj o produkt</a>
              <a class="elkass-product-cta-secondary" href="index.html#promocje">Zobacz promocje</a>
            </div>
          </div>
        </article>
      </section>
      <section class="elkass-product-description-box">
        <h2>Opis produktu</h2>
        <p>${p.description || "Opis produktu możesz uzupełnić w panelu. Najważniejsze informacje powinny wyjaśniać, do czego sprzęt jest najlepszy, jakie ma cechy i dlaczego warto kupić go lokalnie w ELKASS."}</p>
      </section>`;
    const main = document.querySelector("main") || document.body;
    const oldContent = document.querySelector(".elkass-product-premium-shell");
    if(oldContent) oldContent.remove();
    main.insertAdjacentHTML("afterbegin", html);
  }

  document.addEventListener("DOMContentLoaded", async ()=>{
    if(!/product\.html/i.test(location.pathname)) return;
    const product = await getProduct(getProductId());
    render(product);
  });
})();
