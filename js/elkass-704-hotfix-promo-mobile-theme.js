/* ELKASS 7.0.4 HOTFIX — one promo only + mobile seasonal theme switch */
(function(){
  function byText(node, words){
    const t = (node.textContent || "").toLowerCase();
    return words.some(w => t.includes(w));
  }

  function removeDuplicatePromos(){
    const active = document.querySelectorAll(".elkass702-promo-v2");
    if(active.length){
      document.body.classList.add("elkass704-single-promo");

      // Zostaw tylko pierwszą nową promocję.
      active.forEach((el, i) => {
        if(i > 0) el.remove();
      });

      const mainPromo = document.querySelector(".elkass702-promo-v2");

      // Ukryj stare promocje, które zawierają typowe teksty.
      const candidates = [...document.querySelectorAll("section, div, article")].filter(el => {
        if(!el || el === mainPromo || el.closest(".elkass702-promo-v2")) return false;
        const cls = (el.className || "").toString().toLowerCase();
        const id = (el.id || "").toLowerCase();

        const looksPromo =
          cls.includes("promo") ||
          cls.includes("deal") ||
          cls.includes("hit") ||
          id.includes("promo") ||
          id.includes("deal") ||
          id.includes("hit") ||
          byText(el, ["hit tygodnia", "black friday", "zobacz kartę produktu"]);

        if(!looksPromo) return false;

        // Nie chowaj małych elementów nawigacji typu przycisk Promocje.
        const box = el.getBoundingClientRect();
        if(box.height < 120 && box.width < 500) return false;

        return true;
      });

      candidates.forEach(el => {
        el.setAttribute("data-elkass704-hidden-old-promo", "true");
        el.style.display = "none";
      });

      // Przenieś główną promocję pod wyszukiwarkę, jeśli wylądowała niżej.
      const search = document.querySelector("#search,.search-section,.quick-search-section,.shop-search-section,#szybkie-wyszukiwanie");
      if(mainPromo && search && search.parentNode && mainPromo.previousElementSibling !== search){
        search.parentNode.insertBefore(mainPromo, search.nextSibling);
      } else if(mainPromo){
        const hero = document.querySelector(".hero,.hero-section,section.hero,.hero-premium");
        if(hero && hero.parentNode && mainPromo.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING){
          hero.parentNode.insertBefore(mainPromo, hero.nextSibling);
        }
      }
    }
  }

  function normalizeThemeName(v){
    const s = String(v || "").toLowerCase();
    if(["christmas","swieta","święta","boze-narodzenie","boże-narodzenie"].includes(s)) return "christmas";
    if(["winter","zima"].includes(s)) return "winter";
    if(["autumn","jesien","jesień"].includes(s)) return "autumn";
    if(["spring","wiosna"].includes(s)) return "spring";
    if(["summer","lato"].includes(s)) return "summer";
    if(["easter","wielkanoc"].includes(s)) return "easter";
    if(["blackweek","black-week","black friday"].includes(s)) return "blackweek";
    if(["cyberweek","cyber-week"].includes(s)) return "cyberweek";
    return s || "standard";
  }

  function currentTheme(){
    return normalizeThemeName(
      localStorage.getItem("elkass_theme60") ||
      localStorage.getItem("elkassSeasonalTheme") ||
      localStorage.getItem("elkass_theme") ||
      document.documentElement.getAttribute("data-elkass-theme60") ||
      document.body.getAttribute("data-theme") ||
      "standard"
    );
  }

  function applyTheme(theme){
    const t = normalizeThemeName(theme);
    document.documentElement.setAttribute("data-elkass-theme60", t);
    document.documentElement.setAttribute("data-elkass-theme", t);
    document.body.setAttribute("data-elkass-theme60", t);
    document.body.setAttribute("data-theme", t);
    localStorage.setItem("elkass_theme60", t);
    localStorage.setItem("elkassSeasonalTheme", t);

    // Daj sygnał starszym skryptom motywów, jeśli ich słuchają.
    window.dispatchEvent(new CustomEvent("elkass:theme-change", { detail: { theme: t }}));
  }

  function hookThemeControls(){
    const controls = document.querySelectorAll("select, input, button, a");
    controls.forEach(el => {
      if(el.__elkass704ThemeHooked) return;
      const text = ((el.textContent || "") + " " + (el.value || "") + " " + (el.id || "") + " " + (el.name || "") + " " + (el.className || "")).toLowerCase();
      if(!/(motyw|theme|season|sezon|christmas|winter|autumn|jesień|zima|święta|swieta)/.test(text)) return;
      el.__elkass704ThemeHooked = true;

      const handler = () => {
        const val = el.value || el.getAttribute("data-theme") || el.getAttribute("data-season") || el.textContent;
        const t = normalizeThemeName(val);
        if(t) setTimeout(() => applyTheme(t), 20);
      };

      el.addEventListener("change", handler);
      el.addEventListener("click", handler);
    });
  }

  function run(){
    removeDuplicatePromos();
    applyTheme(currentTheme());
    hookThemeControls();
  }

  document.addEventListener("DOMContentLoaded", () => {
    run();
    setTimeout(run, 400);
    setTimeout(run, 1200);
    setTimeout(run, 2500);
  });

  window.addEventListener("storage", run);
  window.ELKASS704Hotfix = { run, applyTheme, removeDuplicatePromos };
})();
