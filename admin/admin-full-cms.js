(function(){
  const CMS_KEY='elkassFullCmsV42';
  const DEFAULT={
    general:{logo:'ELKASS OLESNO',logoSub:'RTV / AGD / MULTIMEDIA / SERWIS',phone:'34 358 24 42',email:'elkass@wp.pl'},
    hero:{title:'Nowoczesna elektronika dla Twojego domu',subtitle:'RTV • AGD • KOMPUTERY • TELEFONY • AUDIO • SERWIS',image:'assets/hero-wow-v5.png',badges:['⭐ 25+ lat doświadczenia','🏆 Partner NeoPunkt','👥 15 000+ klientów'],btn1Text:'Zobacz promocje 🛒',btn1Link:'#promocje',btn2Text:'Skontaktuj się 📞',btn2Link:'tel:343582442'},
    quickActions:[['🔥 Promocje','#promocje'],['📦 Kategorie','#oferta'],['💳 Raty 0%','#kontakt'],['🚚 Dostawa','#kontakt'],['🛠 Serwis','#kontakt']],
    local:{title:'Dlaczego warto kupić w ELKASS?',text:'U nas nie zostajesz sam z wyborem sprzętu. Doradzamy, pomagamy porównać modele, sprawdzamy dostępność i wspieramy po zakupie.',image:'assets/sklep.jpg',cards:[['🎯','Fachowe doradztwo','Dobór sprzętu do potrzeb i budżetu.'],['📦','Odbiór w sklepie','Możliwość obejrzenia sprzętu przed zakupem.'],['🛠','Pomoc po zakupie','Wsparcie, konfiguracja i serwis.'],['📞','Kontakt z człowiekiem','Telefonicznie lub na miejscu w Oleśnie.']]},
    gallery:{eyebrow:'Galeria ELKASS',title:'Zobacz sklep od środka',text:'Pełną galerię salonu, ekspozycji RTV/AGD i małego AGD przenieśliśmy na osobną podstronę, żeby strona główna została szybka i czytelna.',image:'assets/sklep.jpg',button:'Otwórz galerię →'},
    sections:{search:true,hero:true,trust:true,deals:true,products:true,categories:true,bestsellers:true,reviews:true,local:true,gallery:true,about:true,contact:true,partners:true},
    custom:{visible:false,eyebrow:'Nowość',title:'Nowa sekcja na stronie',text:'Wpisz tutaj opis własnej sekcji.',image:'assets/banners/weekend-sale.jpg',button:'Sprawdź →',link:'#kontakt'},
    banners:[['Weekend RTV','Do -25% na wybrane produkty','assets/banners/weekend-sale.jpg','promotions.html','Zobacz promocje'],['Raty 0%','Zapytaj doradcę o finansowanie','assets/banners/raty-0.jpg','#kontakt','Zapytaj']],
    appearance:{accent:'#e30613',green:'#8bc34a',radius:24,shadow:'soft',headerMode:'light'},
    seo:{title:'ELKASS Olesno | RTV AGD Komputery',description:'ELKASS Olesno - RTV, AGD, Komputery, Telefony. Profesjonalne doradztwo i najlepsze marki.',image:'assets/hero-wow-v5.png',keywords:'RTV Olesno, AGD Olesno, telewizory Olesno, pralki Olesno'}
  };
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  function load(){try{return {...DEFAULT,...JSON.parse(localStorage.getItem(CMS_KEY)||'{}')}}catch(e){return structuredClone(DEFAULT)}}
  function save(data){localStorage.setItem(CMS_KEY,JSON.stringify(data)); showSaved();}
  let cms=load();
  function linesToPairs(v){return String(v||'').split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{const p=line.split('|');return [p[0]?.trim()||'',p[1]?.trim()||'#']})}
  function pairsToLines(arr){return (arr||[]).map(x=>x.join('|')).join('\n')}
  function linesToTriples(v){return String(v||'').split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{const p=line.split('|');return [p[0]?.trim()||'',p[1]?.trim()||'',p[2]?.trim()||'']})}
  function triplesToLines(arr){return (arr||[]).map(x=>x.join('|')).join('\n')}
  function linesToBanners(v){return String(v||'').split('\n').map(x=>x.trim()).filter(Boolean).map(line=>{const p=line.split('|');return [p[0]?.trim()||'',p[1]?.trim()||'',p[2]?.trim()||'',p[3]?.trim()||'#',p[4]?.trim()||'Sprawdź']})}
  function bannersToLines(arr){return (arr||[]).map(x=>x.join('|')).join('\n')}
  function fill(){
    cms=load();
    const g=cms.general||DEFAULT.general, h=cms.hero||DEFAULT.hero, l=cms.local||DEFAULT.local, ga=cms.gallery||DEFAULT.gallery, a=cms.appearance||DEFAULT.appearance, seo=cms.seo||DEFAULT.seo;
    if(!$('cms-logo')) return;
    $('cms-logo').value=g.logo||''; $('cms-logo-sub').value=g.logoSub||''; $('cms-phone').value=g.phone||''; $('cms-email').value=g.email||'';
    $('cms-hero-title').value=h.title||''; $('cms-hero-subtitle').value=h.subtitle||''; $('cms-hero-image').value=h.image||''; $('cms-hero-badges').value=(h.badges||[]).join('\n');
    $('cms-hero-btn1-text').value=h.btn1Text||''; $('cms-hero-btn1-link').value=h.btn1Link||''; $('cms-hero-btn2-text').value=h.btn2Text||''; $('cms-hero-btn2-link').value=h.btn2Link||'';
    $('cms-quick-actions').value=pairsToLines(cms.quickActions);
    $('cms-local-title').value=l.title||''; $('cms-local-text').value=l.text||''; $('cms-local-image').value=l.image||''; $('cms-local-cards').value=triplesToLines(l.cards);
    $('cms-gallery-eyebrow').value=ga.eyebrow||''; $('cms-gallery-title').value=ga.title||''; $('cms-gallery-text').value=ga.text||''; $('cms-gallery-image').value=ga.image||''; $('cms-gallery-button').value=ga.button||'';
    document.querySelectorAll('[data-cms-section]').forEach(ch=>ch.checked=(cms.sections||{})[ch.dataset.cmsSection]!==false);
    const c=cms.custom||DEFAULT.custom; $('cms-custom-visible').checked=!!c.visible; $('cms-custom-eyebrow').value=c.eyebrow||''; $('cms-custom-title').value=c.title||''; $('cms-custom-text').value=c.text||''; $('cms-custom-image').value=c.image||''; $('cms-custom-button').value=c.button||''; $('cms-custom-link').value=c.link||'';
    $('cms-banners-list').value=bannersToLines(cms.banners);
    $('cms-accent').value=a.accent||'#e30613'; $('cms-green').value=a.green||'#8bc34a'; $('cms-radius').value=a.radius||24; $('cms-shadow').value=a.shadow||'soft'; $('cms-header-mode').value=a.headerMode||'light';
    $('cms-seo-title').value=seo.title||''; $('cms-seo-description').value=seo.description||''; $('cms-seo-image').value=seo.image||''; $('cms-seo-keywords').value=seo.keywords||'';
  }
  function collectBase(){
    const sections={}; document.querySelectorAll('[data-cms-section]').forEach(ch=>sections[ch.dataset.cmsSection]=ch.checked);
    return {
      general:{logo:$('cms-logo').value,logoSub:$('cms-logo-sub').value,phone:$('cms-phone').value,email:$('cms-email').value},
      hero:{title:$('cms-hero-title').value,subtitle:$('cms-hero-subtitle').value,image:$('cms-hero-image').value,badges:$('cms-hero-badges').value.split('\n').map(x=>x.trim()).filter(Boolean),btn1Text:$('cms-hero-btn1-text').value,btn1Link:$('cms-hero-btn1-link').value,btn2Text:$('cms-hero-btn2-text').value,btn2Link:$('cms-hero-btn2-link').value},
      quickActions:linesToPairs($('cms-quick-actions').value),
      local:{title:$('cms-local-title').value,text:$('cms-local-text').value,image:$('cms-local-image').value,cards:linesToTriples($('cms-local-cards').value)},
      gallery:{eyebrow:$('cms-gallery-eyebrow').value,title:$('cms-gallery-title').value,text:$('cms-gallery-text').value,image:$('cms-gallery-image').value,button:$('cms-gallery-button').value},
      sections,
      custom:{visible:$('cms-custom-visible').checked,eyebrow:$('cms-custom-eyebrow').value,title:$('cms-custom-title').value,text:$('cms-custom-text').value,image:$('cms-custom-image').value,button:$('cms-custom-button').value,link:$('cms-custom-link').value},
      banners:linesToBanners($('cms-banners-list').value),
      appearance:{accent:$('cms-accent').value,green:$('cms-green').value,radius:Number($('cms-radius').value||24),shadow:$('cms-shadow').value,headerMode:$('cms-header-mode').value},
      seo:{title:$('cms-seo-title').value,description:$('cms-seo-description').value,image:$('cms-seo-image').value,keywords:$('cms-seo-keywords').value}
    }
  }
  function showSaved(){
    let n=document.getElementById('cms-toast');
    if(!n){n=document.createElement('div');n.id='cms-toast';n.className='cms-toast';document.body.appendChild(n)}
    n.textContent='Zapisano ustawienia strony'; n.classList.add('show'); setTimeout(()=>n.classList.remove('show'),1600);
  }
  ['cms-save-builder','cms-save-banners','cms-save-appearance','cms-save-seo'].forEach(id=>{document.addEventListener('click',e=>{if(e.target&&e.target.id===id){save(collectBase())}})});
  document.addEventListener('DOMContentLoaded',fill);
})();
