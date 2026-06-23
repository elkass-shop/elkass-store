/* ELKASS 7.0 FINAL PRE-CLOUD */
(function(){
  function slugify(text){
    return String(text||"").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l")
      .replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
  }

  function normalizeTerms(text){
    const map = [
      [/no frost/gi, "No Frost"],
      [/pełny no frost/gi, "Pełny No Frost"],
      [/\bled\b/gi, "LED"],
      [/\bwifi\b/gi, "Wi-Fi"],
      [/smart tv/gi, "Smart TV"],
      [/multi air flow/gi, "Multi Air Flow"],
      [/obr\/min/gi, "obr/min"],
      [/kwh/gi, "kWh"],
      [/db/gi, "dB"]
    ];
    let out = String(text || "").replace(/\s+\n/g,"\n").replace(/\n{3,}/g,"\n\n").trim();
    map.forEach(([rx,val]) => out = out.replace(rx,val));
    return out;
  }

  function parseProducerText(raw){
    const text = normalizeTerms(raw);
    const lines = text.split(/\n+/).map(x=>x.trim()).filter(Boolean);
    const params = {};
    const functions = [];
    const description = [];

    lines.forEach(line=>{
      const colon = line.indexOf(":");
      if(colon > 0 && colon < 80){
        const key = line.slice(0, colon).trim();
        const value = line.slice(colon+1).trim();
        if(key && value){
          params[key] = value;
          return;
        }
      }

      const dash = line.match(/^(.{3,55}?)\s[-–—]\s(.+)$/);
      if(dash){
        functions.push({title: dash[1].trim(), text: dash[2].trim()});
        return;
      }

      const sentenceTitle = line.match(/^((Program|System|Funkcja|Technologia|Opóźnienie|Pełny|Oświetlenie)[^.!?]{2,55})[.!?]?\s+(.+)$/i);
      if(sentenceTitle){
        functions.push({title: sentenceTitle[1].trim(), text: sentenceTitle[3].trim()});
        return;
      }

      description.push(line);
    });

    return {
      cleanText: text,
      params,
      functions,
      description: description.join("\n\n")
    };
  }

  function addAdminTopBar(){
    if(!/\/admin\/?/.test(location.pathname) && !location.pathname.includes("/admin/")) return;
    if(document.querySelector(".elkass70-admin-top")) return;
    const status = window.ELKASSCloud && window.ELKASSCloud.status ? window.ELKASSCloud.status() : ((window.ELKASS_CLOUD_CONFIG||{}).enabled ? "cloud-ready" : "local-fallback");
    const bar = document.createElement("div");
    bar.className = "elkass70-admin-top";
    bar.innerHTML = `
      <div class="elkass70-admin-top-left">
        <a class="elkass70-home" href="../index.html">🏠 Powrót do sklepu</a>
        <a href="../index.html" target="_blank">👁 Podgląd</a>
        <a href="product-wizard-clean.html">📦 Produkt</a>
        <a href="category-manager-clean.html">📂 Kategorie</a>
        <a href="media-manager-clean.html">🖼 Grafiki</a>
      </div>
      <div class="elkass70-admin-top-right">
        <a href="cloud-production-setup.html">☁️ Chmura</a>
        <span class="elkass70-admin-mode">${status}</span>
      </div>`;
    document.body.prepend(bar);
  }

  function enhanceProductWizard(){
    if(!/product-wizard-clean\.html|product-wizard-65\.html/i.test(location.pathname)) return;
    if(document.querySelector("#producerRaw")) return;

    const description = document.querySelector("#description");
    if(!description) return;

    const box = document.createElement("section");
    box.className = "card";
    box.innerHTML = `
      <h2>📋 Wklej dane producenta</h2>
      <p class="note">Wklej parametry i opis z hurtowni lub producenta. System rozpozna parametry „Nazwa: wartość” i funkcje produktu, a potem zapisze je do strony i PDF.</p>
      <label>Dane producenta / opis techniczny
        <textarea id="producerRaw" placeholder="Wymiary (WxSxG) [cm]: 203 x 59.5 x 65.8
Pojemność [l]: 283 chłodziarka + 130 zamrażarka
Roczne zużycie prądu: 182 kWh = 234.78 zł

Pełny No Frost - ogranicza powstawanie szronu."></textarea>
      </label>
      <div class="elkass70-parser-actions">
        <button type="button" id="parseProducer">Rozpoznaj i ułóż opis</button>
        <button type="button" id="applyProducer">Wstaw do produktu</button>
      </div>
      <div id="producerPreview" class="elkass70-parser-preview" style="display:none"></div>
    `;

    const firstCard = description.closest(".card") || document.querySelector(".card");
    if(firstCard) firstCard.parentNode.insertBefore(box, firstCard.nextSibling);

    let parsed = null;

    function renderPreview(){
      if(!parsed) return;
      const preview = document.querySelector("#producerPreview");
      const paramsRows = Object.entries(parsed.params).map(([k,v])=>`<tr><th>${k}</th><td>${v}</td></tr>`).join("");
      const functions = parsed.functions.map(f=>`<div class="elkass70-function-card"><strong>${f.title}</strong><p>${f.text}</p></div>`).join("");
      preview.style.display = "block";
      preview.innerHTML = `
        <h3>Podgląd ułożenia</h3>
        ${parsed.description ? `<h4>Opis</h4><p>${parsed.description.replace(/\n/g,"<br>")}</p>` : ""}
        ${functions ? `<h4>Najważniejsze funkcje</h4>${functions}` : ""}
        ${paramsRows ? `<h4>Parametry techniczne</h4><table class="elkass70-parser-table"><tbody>${paramsRows}</tbody></table>` : ""}
      `;
    }

    document.querySelector("#parseProducer").addEventListener("click",()=>{
      parsed = parseProducerText(document.querySelector("#producerRaw").value);
      renderPreview();
    });

    document.querySelector("#applyProducer").addEventListener("click",()=>{
      parsed = parsed || parseProducerText(document.querySelector("#producerRaw").value);
      const desc = document.querySelector("#description");
      const lead = document.querySelector("#lead");
      const features = document.querySelector("#features");
      if(desc){
        const functionText = parsed.functions.map(f=>`${f.title}\n${f.text}`).join("\n\n");
        desc.value = [parsed.description, functionText].filter(Boolean).join("\n\n");
      }
      if(lead && !lead.value && parsed.description){
        lead.value = parsed.description.split(/\n+/)[0].slice(0,220);
      }
      if(features && !features.value){
        features.value = Object.keys(parsed.params).slice(0,6).join(", ");
      }

      // ukryte pola JSON do zapisu przez nasz override save
      let specs = document.querySelector("#elkass70SpecsJson");
      if(!specs){
        specs = document.createElement("textarea");
        specs.id = "elkass70SpecsJson";
        specs.style.display = "none";
        document.body.appendChild(specs);
      }
      specs.value = JSON.stringify(parsed.params);

      let defs = document.querySelector("#elkass70DefinitionsJson");
      if(!defs){
        defs = document.createElement("textarea");
        defs.id = "elkass70DefinitionsJson";
        defs.style.display = "none";
        document.body.appendChild(defs);
      }
      defs.value = JSON.stringify(parsed.functions.map(f=>({term:f.title, definition:f.text})));

      alert("Opis, cechy i parametry zostały przygotowane. Teraz kliknij Zapisz produkt.");
    });

    // przechwyt zapisu: dodaj specs/definitions do ELKASSCloud.save
    const originalSave = window.ELKASSCloud && window.ELKASSCloud.save;
    if(originalSave && !window.__elkass70SavePatched){
      window.__elkass70SavePatched = true;
      window.ELKASSCloud.save = async function(collection, item){
        if(collection === "products" || collection === "product"){
          try{
            const specs = document.querySelector("#elkass70SpecsJson")?.value;
            const defs = document.querySelector("#elkass70DefinitionsJson")?.value;
            if(specs) item.specs = JSON.parse(specs);
            if(defs) item.definitions = JSON.parse(defs);
            item.autoFormatted = true;
          }catch(e){}
        }
        return originalSave.call(window.ELKASSCloud, collection, item);
      };
    }
  }

  function enhanceProductPagePrint(){
    if(!/product\.html/i.test(location.pathname)) return;
    const page = document.querySelector(".elkass70-product-page");
    if(!page || page.querySelector(".elkass70-print-header")) return;

    const header = document.createElement("div");
    header.className = "elkass70-print-header";
    header.innerHTML = `
      <div>
        <h1>ELKASS Olesno</h1>
        <p>RTV · AGD · Multimedia · Serwis</p>
        <p>Telefon: 34 358 24 42</p>
      </div>
      <div class="elkass70-qr" aria-label="QR do produktu"></div>`;
    page.prepend(header);

    const description = [...page.querySelectorAll(".elkass70-section")].find(s => /Opis produktu/i.test(s.textContent));
    if(description) description.setAttribute("data-print-important","true");

    const specs = [...page.querySelectorAll(".elkass70-section")].find(s => /Parametry techniczne/i.test(s.textContent));
    if(specs) specs.setAttribute("data-print-important","true");

    if(![...page.querySelectorAll(".elkass70-section")].some(s => /Porada eksperta/i.test(s.textContent))){
      const expert = document.createElement("section");
      expert.className = "elkass70-section";
      expert.setAttribute("data-print-important","true");
      expert.innerHTML = `<h2>Porada eksperta ELKASS</h2><div class="elkass70-expert-note">Przed zakupem sprawdź wymiary miejsca montażu, sposób otwierania drzwi oraz dostępność transportu. W razie wątpliwości doradca ELKASS pomoże dobrać sprzęt do Twojego domu.</div>`;
      const why = [...page.querySelectorAll(".elkass70-section")].find(s => /Dlaczego warto/i.test(s.textContent));
      if(why) why.parentNode.insertBefore(expert, why.nextSibling);
      else page.appendChild(expert);
    }
  }

  document.addEventListener("DOMContentLoaded", ()=>{
    addAdminTopBar();
    enhanceProductWizard();
    setTimeout(enhanceProductPagePrint, 250);
    setTimeout(enhanceProductPagePrint, 900);
  });

  window.ELKASS70Parser = { parseProducerText, normalizeTerms };
})();
