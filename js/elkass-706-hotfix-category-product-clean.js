/* ELKASS 7.0.6 HOTFIX — clean category/product pages and stable promo placement */
(function(){
  function qa(sel){ return [...document.querySelectorAll(sel)]; }
  function q(sel){ return document.querySelector(sel); }

  const path = location.pathname.toLowerCase();
  const isSubpage = /category\.html|product\.html|promotions\.html|gallery\.html|compare\.html/.test(path);

  function looksLikeEmptyHomeHero(el){
    if(!el || el.closest(".elkass702-promo-v2")) return false;

    const text = (el.textContent || "").trim().toLowerCase();
    const cls = (el.className || "").toString().toLowerCase();
    const id = (el.id || "").toLowerCase();
    const box = el.getBoundingClientRect();

    if(box.height < 160 || box.width < 300) return false;

    const isDarkHero =
      cls.includes("hero") ||
      cls.includes("modern") ||
      cls.includes("season") ||
      cls.includes("premium") ||
      id.includes("hero") ||
      id.includes("modern") ||
      id.includes("season");

    const hasOnlyHomeButtons =
      text.includes("sprawdź promocje") &&
      text.includes("zapytaj o dostępność") &&
      !text.includes("strona główna") &&
      !text.includes("opis produktu") &&
      !text.includes("parametry");

    const hasModernHomeText = text.includes("nowoczesna elektronika dla twojego domu");

    // Na podstronach te bloki są elementem strony głównej, nie powinny występować.
    return (isDarkHero && (hasOnlyHomeButtons || hasModernHomeText));
  }

  function cleanSubpage(){
    if(!isSubpage) return;
    document.body.classList.add("elkass706-subpage-clean");

    qa("section, div, article").forEach(el=>{
      if(looksLikeEmptyHomeHero(el)){
        el.setAttribute("data-elkass706-empty-hero","true");
        el.classList.add("elkass706-hidden-home-block");
        el.style.display = "none";
      }
    });

    // Na category/product nie pokazujemy promocji homepage, chyba że to strona promotions.html.
    if(!/promotions\.html/.test(path)){
      qa(".elkass702-promo-v2,.elkass701-promo-section").forEach(el=>{
        el.setAttribute("data-elkass706-empty-hero","true");
        el.style.display = "none";
      });
    }
  }

  function findModernElectronicsHome(){
    if(isSubpage) return null;

    const candidates = qa("section, div, article").filter(el=>{
      if(el.closest(".elkass702-promo-v2")) return false;
      const text = (el.textContent || "").toLowerCase();
      if(!text.includes("nowoczesna elektronika")) return false;
      const box = el.getBoundingClientRect();
      if(box.height < 180 || box.width < 400) return false;

      // Preferuj pierwszy duży blok w górnej połowie strony, nie footer/FAQ.
      const y = box.top + window.scrollY;
      return y < Math.max(1800, document.body.scrollHeight * 0.55);
    });

    return candidates[0] || null;
  }

  function stableHomePromo(){
    if(isSubpage) return;

    const promos = qa(".elkass702-promo-v2");
    if(!promos.length) return;

    const promo = promos[0];
    promos.slice(1).forEach(p=>p.style.display="none");

    const modern = findModernElectronicsHome();
    const search = q("#search,.search-section,.quick-search-section,.shop-search-section,#szybkie-wyszukiwanie");

    if(modern && modern.parentNode && modern.nextElementSibling !== promo){
      modern.parentNode.insertBefore(promo, modern.nextSibling);
      return;
    }

    if(search && search.parentNode && search.nextElementSibling !== promo){
      search.parentNode.insertBefore(promo, search.nextSibling);
    }
  }

  function fixCategoryLinks(){
    const map = {
      "rtv":"rtv",
      "agd":"agd",
      "agd do zabudowy":"agd-zabudowa",
      "telewizory":"telewizory",
      "lodówki":"lodowki",
      "lodowki":"lodowki",
      "pralki":"pralki",
      "zmywarki":"zmywarki",
      "piekarniki":"piekarniki",
      "odkurzacze":"odkurzacze",
      "komputery":"komputery-telefony",
      "telefony":"komputery-telefony"
    };

    qa("a,button,[role='button'],.category-card").forEach(el=>{
      if(el.__elkass706CatPatched) return;
      const text = (el.textContent || "").toLowerCase();
      const key = Object.keys(map).find(k => text.includes(k));
      if(!key) return;

      el.__elkass706CatPatched = true;
      const href = "category.html?cat=" + encodeURIComponent(map[key]);

      if(el.tagName === "A"){
        const old = el.getAttribute("href") || "";
        if(!old || old === "#" || old.includes("#") || old.includes("promotions")){
          el.setAttribute("href", href);
        }
      } else {
        el.addEventListener("click", e=>{
          e.preventDefault();
          location.href = href;
        });
      }
    });
  }

  function run(){
    cleanSubpage();
    stableHomePromo();
    fixCategoryLinks();
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    run();
    setTimeout(run, 300);
    setTimeout(run, 1000);
    setTimeout(run, 2200);
  });

  window.ELKASS706Hotfix = { run, cleanSubpage, stableHomePromo };
})();
