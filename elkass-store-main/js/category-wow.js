/* ELKASS 5.4.2 — KATEGORIE Z GRAFIKĄ JPG (naprawa dla laika)
   Co robi ten plik:
   1) bierze prawdziwe zdjęcia z assets/categories/*.jpg,
   2) rysuje kafelki kategorii od nowa,
   3) nie zależy od starych SVG ani od danych zapisanych wcześniej w przeglądarce.
*/
(function(){
  const CATEGORY_IMAGES = {
    'rtv':'assets/categories/rtv.jpg',
    'agd':'assets/categories/agd.jpg',
    'agd do zabudowy':'assets/categories/agd-zabudowa.jpg',
    'małe agd':'assets/categories/male-agd.jpg',
    'male agd':'assets/categories/male-agd.jpg',
    'komputery':'assets/categories/komputery-telefony.jpg',
    'telefony':'assets/categories/komputery-telefony.jpg',
    'komputery i telefony':'assets/categories/komputery-telefony.jpg',
    'audio':'assets/categories/rtv.jpg',
    'serwis':'assets/categories/serwis.jpg',
    'serwis i doradztwo':'assets/categories/serwis.jpg'
  };
  const DEFAULT_CATEGORIES=[
    {name:'RTV',desc:'Telewizory, soundbary, kino domowe',img:CATEGORY_IMAGES['rtv'],subs:['Telewizory','Soundbary','Audio']},
    {name:'AGD',desc:'Lodówki, pralki, zmywarki',img:CATEGORY_IMAGES['agd'],subs:['Lodówki','Pralki','Zmywarki']},
    {name:'AGD do zabudowy',desc:'Piekarniki, płyty, okapy',img:CATEGORY_IMAGES['agd do zabudowy'],subs:['Piekarniki','Płyty','Okapy']},
    {name:'Małe AGD',desc:'Ekspresy, odkurzacze, żelazka',img:CATEGORY_IMAGES['małe agd'],subs:['Ekspresy','Odkurzacze','Żelazka']},
    {name:'Komputery i telefony',desc:'Laptopy, smartfony, akcesoria',img:CATEGORY_IMAGES['komputery i telefony'],subs:['Laptopy','Smartfony','Akcesoria']},
    {name:'Serwis i doradztwo',desc:'Pomoc, konfiguracja, fachowe wsparcie',img:CATEGORY_IMAGES['serwis i doradztwo'],subs:['Wsparcie','Konfiguracja','Doradztwo']}
  ];
  function norm(v){return String(v||'').trim().toLowerCase();}
  function fixedImage(cat){
    const key=norm(cat && cat.name);
    return CATEGORY_IMAGES[key] || (cat && (cat.img||cat.image)) || 'assets/categories/default.svg';
  }
  function readCats(){
    try{
      const cms=JSON.parse(localStorage.getItem('elkassCmsData')||'{}');
      if(Array.isArray(cms.categoryTiles) && cms.categoryTiles.length) return cms.categoryTiles;
    }catch(e){}
    try{
      const admin=JSON.parse(localStorage.getItem('elkassAdminData')||'{}');
      if(Array.isArray(admin.categories) && admin.categories.length) return admin.categories;
    }catch(e){}
    return DEFAULT_CATEGORIES;
  }
  function findTarget(){
    return document.getElementById('categories-grid') || document.querySelector('[data-category-grid], .category-grid, .categories-grid, .home-categories, #categoriesGrid, #categoryGrid');
  }
  function categoryUrl(name){ return 'category.html?category=' + encodeURIComponent(name||''); }
  function render(){
    const target=findTarget();
    if(!target) return;
    target.classList.add('elkass-category-wow-grid');
    const cats=readCats().slice(0,6);
    target.innerHTML=cats.map(cat=>{
      const subs=(cat.subs||cat.subcategories||[]).slice(0,3).map(s=>typeof s==='string'?s:(s&&s.name)||'');
      const img=fixedImage(cat);
      const name=cat.name||'Kategoria';
      const desc=cat.desc||cat.description||'Oferta ELKASS';
      return `<article class="elkass-category-wow-card" style="--bg:url('${img}')" data-img="${img}">
        <img class="elkass-category-wow-img" src="${img}" alt="${name}" loading="lazy" onerror="this.closest('.elkass-category-wow-card').classList.add('no-img')">
        <div class="elkass-category-wow-overlay"></div>
        <div class="elkass-category-wow-content">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="elkass-category-wow-subs">${subs.map(s=>`<span>${s}</span>`).join('')}</div>
          <a href="${categoryUrl(name)}">Zobacz więcej →</a>
        </div>
      </article>`;
    }).join('');
  }
  window.ELKASS_RENDER_CATEGORY_IMAGES = render;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
  setTimeout(render,100);
  setTimeout(render,700);
})();
