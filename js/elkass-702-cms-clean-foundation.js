/* ELKASS 7.0 Stage 2 — CMS Clean Foundation */
(function(){
  function isAdmin(){
    return /\/admin\/?/.test(location.pathname) || /admin/.test(location.pathname);
  }

  function statusText(){
    if(window.ELKASSCloud && window.ELKASSCloud.status){
      return window.ELKASSCloud.status();
    }
    const cfg = window.ELKASS_CLOUD_CONFIG || {};
    return cfg.enabled ? "cloud-ready" : "local-fallback";
  }

  function ensureAdminHome(){
    if(!isAdmin()) return;
    document.body.classList.add("elkass702-admin");

    if(document.querySelector(".elkass702-admin-shell")) return;

    const target = document.querySelector("main,.admin-main,.dashboard-content,.content,.main-content") || document.body;
    const shell = document.createElement("section");
    shell.className = "elkass702-admin-shell";
    shell.innerHTML = `
      <header class="elkass702-admin-hero">
        <h1>ELKASS CMS</h1>
        <p>Uporządkowany panel przed pełnym wdrożeniem Supabase. Najważniejsze funkcje są na górze, a stare wersje managerów nie muszą być używane.</p>
        <div class="elkass702-status">Tryb danych: ${statusText()}</div>
      </header>

      <nav class="elkass702-grid" aria-label="Szybki start CMS">
        <a class="elkass702-card" href="product-wizard-clean.html"><em>📦</em><strong>Dodaj produkt</strong><span>Krok po kroku: zdjęcie, cena, opis, cechy, PDF, kup teraz.</span></a>
        <a class="elkass702-card" href="category-manager-clean.html"><em>📂</em><strong>Kategorie</strong><span>Kategorie, podkategorie, aktywne/ukryte, opisy premium.</span></a>
        <a class="elkass702-card" href="media-manager-clean.html"><em>🖼️</em><strong>Grafiki</strong><span>Hero, kategorie, produkty, galeria, social i sezonowe.</span></a>
        <a class="elkass702-card" href="glossary-manager-clean.html"><em>📚</em><strong>Terminy</strong><span>Biblioteka definicji dla opisów produktów i SEO.</span></a>
        <a class="elkass702-card" href="commerce-manager-clean.html"><em>🛒</em><strong>Sprzedaż</strong><span>Zapytaj, Kup teraz, Koszyk — gotowe pod aktywację.</span></a>
        <a class="elkass702-card" href="theme-manager-clean.html"><em>🎄</em><strong>Motywy</strong><span>Standard i motywy sezonowe bez rozjeżdżania layoutu.</span></a>
        <a class="elkass702-card" href="cloud-test-67.html"><em>☁️</em><strong>Chmura</strong><span>Test Supabase i trybu lokalnego.</span></a>
        <a class="elkass702-card" href="../product.html?id=lodowka-tcl-rp318bxe2"><em>🧾</em><strong>Podgląd produktu</strong><span>Karta produktu premium + druk/PDF.</span></a>
      </nav>

      <section class="elkass702-section">
        <h2>Jedna właściwa ścieżka obsługi</h2>
        <div class="elkass702-list">
          <div class="elkass702-row"><strong>Produkty</strong><code>product-wizard-clean.html</code><span class="elkass702-badge">używać</span></div>
          <div class="elkass702-row"><strong>Kategorie</strong><code>category-manager-clean.html</code><span class="elkass702-badge">używać</span></div>
          <div class="elkass702-row"><strong>Grafiki</strong><code>media-manager-clean.html</code><span class="elkass702-badge">używać</span></div>
          <div class="elkass702-row"><strong>Terminy</strong><code>glossary-manager-clean.html</code><span class="elkass702-badge">używać</span></div>
          <div class="elkass702-row"><strong>Stare manager-y</strong><code>media-manager-63/64/65/67, category-tree-manager-631...</code><span class="elkass702-badge elkass702-warn">nie używać</span></div>
        </div>
      </section>
    `;
    target.prepend(shell);
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    ensureAdminHome();
    setTimeout(ensureAdminHome, 500);
  });
})();
