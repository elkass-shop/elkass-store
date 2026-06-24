/* ELKASS 7.0.5 HOTFIX UX FLOW */
(function(){
  function q(sel){ return document.querySelector(sel); }
  function qa(sel){ return [...document.querySelectorAll(sel)]; }

  function findModernElectronicsSection(){
    const candidates = qa("section, div, article");
    let best = null;
    for(const el of candidates){
      const t = (el.textContent || "").toLowerCase();
      if(t.includes("nowoczesna elektronika") || t.includes("nowoczesna elektronika dla twojego domu")){
        const box = el.getBoundingClientRect();
        if(box.height > 150 && box.width > 300){
          best = el;
          break;
        }
      }
    }
    return best;
  }

  function movePromoAfterModernElectronics(){
    const promo = q(".elkass702-promo-v2") || q(".elkass701-promo-section");
    if(!promo) return;

    // hide/remove duplicate promos
    qa(".elkass702-promo-v2,.elkass701-promo-section").forEach((el,i)=>{
      if(el !== promo) el.style.display = "none";
    });

    const modern = findModernElectronicsSection();
    if(modern && modern.parentNode && modern.nextElementSibling !== promo){
      modern.parentNode.insertBefore(promo, modern.nextSibling);
    } else if(!modern) {
      const search = q("#search,.search-section,.quick-search-section,.shop-search-section,#szybkie-wyszukiwanie");
      if(search && search.parentNode && search.nextElementSibling !== promo){
        search.parentNode.insertBefore(promo, search.nextSibling);
      }
    }

    document.body.classList.add("elkass704-single-promo");
  }

  const popularCats = [
    {id:"telewizory", icon:"📺", title:"Telewizory", sub:"RTV i Smart TV"},
    {id:"lodowki", icon:"❄️", title:"Lodówki", sub:"AGD wolnostojące"},
    {id:"pralki", icon:"🧺", title:"Pralki", sub:"Slim i pełnowymiarowe"},
    {id:"zmywarki", icon:"🍽️", title:"Zmywarki", sub:"45 cm i 60 cm"},
    {id:"odkurzacze", icon:"🧹", title:"Odkurzacze", sub:"Klasyczne i pionowe"},
    {id:"piekarniki", icon:"🔥", title:"Piekarniki", sub:"AGD do zabudowy"}
  ];

  function replaceFrequentlyChosen(){
    if(q(".elkass705-popular-categories")) return;

    const html = `<section class="elkass705-popular-categories" id="najczesciej-wybierane-kategorie">
      <div class="elkass705-popular-head">
        <small>Klienci najczęściej pytają o</small>
        <h2>Najczęściej wybierane kategorie</h2>
      </div>
      <div class="elkass705-popular-grid">
        ${popularCats.map(c=>`<a class="elkass705-popular-card" href="category.html?cat=${encodeURIComponent(c.id)}">
          <span>${c.icon}</span><strong>${c.title}</strong><small>${c.sub}</small>
        </a>`).join("")}
      </div>
    </section>`;

    const old = qa("section, div").find(el=>{
      const t = (el.textContent||"").toLowerCase();
      const box = el.getBoundingClientRect();
      return box.height > 120 && t.includes("klienci najczęściej pytają") && t.includes("najczęściej wybierane");
    });

    if(old && old.parentNode){
      old.insertAdjacentHTML("beforebegin", html);
      old.style.display = "none";
      old.setAttribute("data-elkass705-hidden-old-popular","true");
    } else {
      const promo = q(".elkass702-promo-v2") || q(".elkass701-promo-section");
      if(promo && promo.parentNode) promo.parentNode.insertBefore(document.createRange().createContextualFragment(html), promo.nextSibling);
      else (q("main")||document.body).insertAdjacentHTML("beforeend", html);
    }
    document.body.classList.add("elkass705-popular-active");
  }

  function patchCategoryRouting(){
    // Fix category cards/buttons that do not route to category.html?cat=
    const map = {
      "rtv":"rtv",
      "agd":"agd",
      "agd do zabudowy":"agd-zabudowa",
      "komputery":"komputery-telefony",
      "telefony":"komputery-telefony",
      "serwis":"serwis",
      "telewizory":"telewizory",
      "lodówki":"lodowki",
      "lodowki":"lodowki",
      "pralki":"pralki",
      "zmywarki":"zmywarki",
      "odkurzacze":"odkurzacze",
      "piekarniki":"piekarniki"
    };
    qa("a,button,[role='button'],.category-card,.elkass705-popular-card").forEach(el=>{
      if(el.__elkass705RoutePatched) return;
      const text = (el.textContent||"").trim().toLowerCase();
      const key = Object.keys(map).find(k => text.includes(k));
      if(!key) return;
      el.__elkass705RoutePatched = true;
      const url = "category.html?cat=" + encodeURIComponent(map[key]);
      if(el.tagName === "A") {
        const href = el.getAttribute("href") || "";
        if(!href || href === "#" || href.includes("promotions") || href.includes("#")) el.setAttribute("href", url);
      } else {
        el.addEventListener("click", (e)=>{
          e.preventDefault();
          location.href = url;
        });
      }
    });
  }

  function applyUnifiedTheme(){
    const val = localStorage.getItem("elkass_theme60") ||
      localStorage.getItem("elkassSeasonalTheme") ||
      document.documentElement.getAttribute("data-elkass-theme60") ||
      "standard";
    const t = String(val).toLowerCase();
    document.documentElement.setAttribute("data-elkass-theme60", t);
    document.body.setAttribute("data-elkass-theme60", t);
    localStorage.setItem("elkass_theme60", t);
    localStorage.setItem("elkassSeasonalTheme", t);
  }

  function adminWoodyboyHierarchy(){
    if(!/\/admin\/?/.test(location.pathname) && !location.pathname.includes("/admin/")) return;
    if(q(".elkass705-platform-banner")) return;
    const banner = document.createElement("div");
    banner.className = "elkass705-platform-banner";
    banner.innerHTML = `<strong>👑 WoodyBoy Platform</strong><span>Główny silnik zarządzania projektami. ELKASS jest jednym ze sklepów działających na tej platformie.</span>`;
    document.body.prepend(banner);
  }

  function blackAppearanceHook(){
    // Future-ready: if panel sets appearance to black, front follows.
    const appearance = localStorage.getItem("elkass_appearance") || localStorage.getItem("elkassAppearance") || "";
    if(appearance.toLowerCase().includes("black") || appearance.toLowerCase().includes("dark")){
      document.documentElement.setAttribute("data-elkass-appearance","black");
      document.body.setAttribute("data-elkass-appearance","black");
    }
  }

  function run(){
    applyUnifiedTheme();
    blackAppearanceHook();
    movePromoAfterModernElectronics();
    replaceFrequentlyChosen();
    patchCategoryRouting();
    adminWoodyboyHierarchy();
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    run();
    setTimeout(run, 400);
    setTimeout(run, 1200);
    setTimeout(run, 2500);
  });
  window.addEventListener("storage", run);
  window.ELKASS705UXFlow = { run, movePromoAfterModernElectronics, replaceFrequentlyChosen, patchCategoryRouting };
})();
