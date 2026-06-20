/* ELKASS 4.4 — Category + Seasonal WOW */
(function(){
  const DEFAULT_CATEGORIES=[
    {name:'RTV',desc:'Telewizory, soundbary, kino domowe',img:'assets/categories/rtv.jpg',subs:['Telewizory','Soundbary','Audio']},
    {name:'AGD',desc:'Lodówki, pralki, zmywarki',img:'assets/categories/agd.jpg',subs:['Lodówki','Pralki','Zmywarki']},
    {name:'AGD do zabudowy',desc:'Piekarniki, płyty, okapy',img:'assets/categories/agd-zabudowa.jpg',subs:['Piekarniki','Płyty','Okapy']},
    {name:'Małe AGD',desc:'Ekspresy, odkurzacze, żelazka',img:'assets/categories/male-agd.jpg',subs:['Ekspresy','Odkurzacze','Żelazka']},
    {name:'Komputery i telefony',desc:'Laptopy, smartfony, akcesoria',img:'assets/categories/komputery-telefony.jpg',subs:['Laptopy','Smartfony','Akcesoria']},
    {name:'Serwis i doradztwo',desc:'Pomoc, konfiguracja, fachowe wsparcie',img:'assets/categories/serwis.jpg',subs:['Wsparcie','Konfiguracja','Doradztwo']}
  ];
  function readCats(){
    try{
      const cms=JSON.parse(localStorage.getItem('elkassCmsData')||'{}');
      if(Array.isArray(cms.categoryTiles) && cms.categoryTiles.length) return cms.categoryTiles;
    }catch(e){}
    return DEFAULT_CATEGORIES;
  }
  function findTarget(){
    return document.querySelector('[data-category-grid], .category-grid, .categories-grid, .home-categories, #categoriesGrid, #categoryGrid');
  }
  function render(){
    const target=findTarget();
    if(!target) return;
    target.classList.add('elkass-category-wow-grid');
    const cats=readCats().slice(0,6);
    target.innerHTML=cats.map(cat=>{
      const subs=(cat.subs||cat.subcategories||[]).slice(0,3);
      const img=cat.img||cat.image||'assets/categories/default.jpg';
      const name=cat.name||'Kategoria';
      const desc=cat.desc||cat.description||'Oferta ELKASS';
      return `<article class="elkass-category-wow-card" style="--bg:url('${img}')">
        <div class="elkass-category-wow-overlay"></div>
        <div class="elkass-category-wow-content">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="elkass-category-wow-subs">${subs.map(s=>`<span>${s}</span>`).join('')}</div>
          <a href="category.html?cat=${encodeURIComponent(name)}">Zobacz więcej →</a>
        </div>
      </article>`;
    }).join('');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);else render();
})();