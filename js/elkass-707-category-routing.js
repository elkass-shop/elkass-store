/* ELKASS 7.0.7 HOTFIX — exact category/subcategory routing */
(function(){
  const ROOTS = {
    "rtv": {
      title: "RTV",
      subtitle: "Wybierz podkategorię RTV",
      children: [
        ["telewizory","📺","Telewizory","Smart TV, 4K, QLED, OLED"],
        ["audio","🔊","Audio","Głośniki, kina domowe, soundbary"],
        ["soundbary","🎵","Soundbary","Dźwięk do telewizora"],
        ["multimedia","🎬","Multimedia","Odtwarzacze i akcesoria"]
      ]
    },
    "agd": {
      title: "AGD",
      subtitle: "Wybierz podkategorię AGD",
      children: [
        ["lodowki","❄️","Lodówki","Wolnostojące i No Frost"],
        ["pralki","🧺","Pralki","Slim i pełnowymiarowe"],
        ["zmywarki","🍽️","Zmywarki","45 cm i 60 cm"],
        ["zamrazarki","🧊","Zamrażarki","Szufladowe i skrzyniowe"],
        ["odkurzacze","🧹","Odkurzacze","Klasyczne i pionowe"],
        ["czajniki","☕","Czajniki","Elektryczne i designerskie"],
        ["zelazka","👔","Żelazka","Parowe i klasyczne"],
        ["generatory-pary","💨","Generatory pary","Do prasowania premium"]
      ]
    },
    "agd-zabudowa": {
      title: "AGD do zabudowy",
      subtitle: "Wybierz podkategorię AGD do zabudowy",
      children: [
        ["piekarniki","🔥","Piekarniki","Do nowoczesnej kuchni"],
        ["plyty-indukcyjne","⚡","Płyty indukcyjne","Szybkie i oszczędne gotowanie"],
        ["plyty-gazowe","🔥","Płyty gazowe","Klasyczne rozwiązania"],
        ["okapy","🌬️","Okapy","Kuchenne i podszafkowe"],
        ["kuchnie","🍳","Kuchnie","Wolnostojące i zabudowa"],
        ["zmywarki-zabudowa","🍽️","Zmywarki do zabudowy","45 cm i 60 cm"]
      ]
    },
    "komputery-telefony": {
      title: "Komputery i telefony",
      subtitle: "Wybierz podkategorię",
      children: [
        ["laptopy","💻","Laptopy","Do domu, pracy i szkoły"],
        ["smartfony","📱","Smartfony","Telefony i akcesoria"],
        ["tablety","📲","Tablety","Mobilna praca i rozrywka"],
        ["akcesoria-it","⌨️","Akcesoria","Myszki, klawiatury, ładowarki"]
      ]
    },
    "male-agd": {
      title: "Małe AGD",
      subtitle: "Wybierz podkategorię",
      children: [
        ["czajniki","☕","Czajniki","Elektryczne i designerskie"],
        ["tostery","🍞","Tostery","Do kuchni i śniadań"],
        ["golarki","🪒","Golarki","Męskie i damskie"],
        ["zelazka","👔","Żelazka","Parowe i klasyczne"],
        ["generatory-pary","💨","Generatory pary","Do prasowania premium"]
      ]
    },
    "serwis": {
      title: "Serwis",
      subtitle: "Wybierz zakres pomocy",
      children: [
        ["serwis-rtv","🛠️","Serwis RTV","Telewizory i multimedia"],
        ["serwis-agd","🔧","Serwis AGD","Pralki, lodówki, zmywarki"],
        ["pomoc-techniczna","☎️","Pomoc techniczna","Doradztwo i kontakt"]
      ]
    }
  };

  const TEXT_TO_ROOT = [
    [/agd\s*do\s*zabudowy/i, "agd-zabudowa"],
    [/\brtv\b/i, "rtv"],
    [/\bagd\b/i, "agd"],
    [/małe\s*agd|male\s*agd/i, "male-agd"],
    [/komputery|telefony|laptopy/i, "komputery-telefony"],
    [/serwis/i, "serwis"]
  ];

  function param(name){
    return new URLSearchParams(location.search).get(name);
  }

  function normalize(text){
    return String(text || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
      .replace(/ł/g,"l").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }

  function detectRootFromText(text){
    for(const [rx,id] of TEXT_TO_ROOT){
      if(rx.test(text)) return id;
    }
    return null;
  }

  function fixHomeCategoryCards(){
    if(/category\.html|product\.html/.test(location.pathname)) return;

    const candidates = [...document.querySelectorAll("a, button, .category-card, .offer-card, .elkass57-category-card, [role='button']")];

    candidates.forEach(el => {
      if(el.__elkass707Fixed) return;
      const text = (el.textContent || "").trim();
      const rootId = detectRootFromText(text);
      if(!rootId) return;

      el.__elkass707Fixed = true;
      el.classList.add("elkass707-home-category-fixed");
      const href = "category.html?cat=" + encodeURIComponent(rootId);

      if(el.tagName === "A"){
        el.setAttribute("href", href);
      } else {
        el.addEventListener("click", e => {
          e.preventDefault();
          location.href = href;
        });
      }
    });
  }

  function renderSubcategories(){
    if(!/category\.html/.test(location.pathname)) return;

    const cat = normalize(param("cat") || param("category") || "");
    const root = ROOTS[cat];
    if(!root) return;

    if(document.querySelector(".elkass707-subcategories")) return;

    const section = document.createElement("section");
    section.className = "elkass707-subcategories";
    section.innerHTML = `
      <div class="elkass707-subcategories-head">
        <small>Oferta sklepu</small>
        <h1>${root.title}</h1>
        <p>${root.subtitle}. Wybierz kafel, aby przejść do konkretnych produktów lub zapytać o dostępność.</p>
      </div>
      <div class="elkass707-subcategory-grid">
        ${root.children.map(([id,icon,title,sub]) => `
          <a class="elkass707-subcategory-card" href="category.html?cat=${encodeURIComponent(id)}">
            <span>${icon}</span>
            <strong>${title}</strong>
            <small>${sub}</small>
            <em>Zobacz więcej</em>
          </a>
        `).join("")}
      </div>
    `;

    const main = document.querySelector("main") || document.body;
    const breadcrumb = [...document.querySelectorAll("section, div")].find(el => {
      const t = (el.textContent || "").toLowerCase();
      return t.includes("strona główna") && t.includes(root.title.toLowerCase());
    });

    if(breadcrumb && breadcrumb.parentNode){
      breadcrumb.parentNode.insertBefore(section, breadcrumb.nextSibling);
    } else {
      main.prepend(section);
    }

    // Ukryj stare, nieklikalne lub błędnie podpięte kafle głównych kategorii na tej stronie,
    // ale nie ukrywaj nowej sekcji.
    [...document.querySelectorAll("section, div")].forEach(el => {
      if(el.closest(".elkass707-subcategories")) return;
      const t = (el.textContent || "").toLowerCase();
      const box = el.getBoundingClientRect();
      if(box.height > 160 && t.includes("oferta sklepu") && t.includes("najpopularniejsze kategorie")){
        el.style.display = "none";
        el.setAttribute("data-elkass707-hidden-old-category-grid","true");
      }
    });
  }

  function run(){
    fixHomeCategoryCards();
    renderSubcategories();
  }

  document.addEventListener("DOMContentLoaded", () => {
    run();
    setTimeout(run, 400);
    setTimeout(run, 1200);
  });

  window.ELKASS707CategoryRouting = { run, ROOTS };
})();
