/* ELKASS ENTERPRISE 5.6.0 — finalny renderer kategorii premium */
(function(){
 const data=[
  ['rtv','Domowa rozrywka','RTV','Telewizory, soundbary i kino domowe','RTV',['Telewizory','Soundbary','Audio']],
  ['agd','Sprzęt do domu','AGD','Lodówki, pralki i zmywarki','AGD',['Lodówki','Pralki','Zmywarki']],
  ['agd-zabudowa','Nowoczesna kuchnia','AGD do zabudowy','Piekarniki, płyty i okapy','AGD do zabudowy',['Piekarniki','Płyty','Okapy']],
  ['male-agd','Codzienna wygoda','Małe AGD','Ekspresy, odkurzacze i żelazka','Małe AGD',['Ekspresy','Odkurzacze','Żelazka']],
  ['komputery-telefony','Technologia','Komputery i telefony','Laptopy, smartfony i akcesoria','Komputery i telefony',['Laptopy','Smartfony','Akcesoria']],
  ['serwis','Pomoc ELKASS','Serwis i doradztwo','Konfiguracja, wsparcie i fachowa pomoc','Serwis i doradztwo',['Wsparcie','Konfiguracja','Doradztwo']]
 ];
 function enc(x){return encodeURIComponent(x)}
 function render(){
  const grid=document.getElementById('categories-grid'); if(!grid) return;
  grid.dataset.elkassFinalCategories='true'; grid.className='elkass-premium-categories-grid';
  grid.innerHTML=data.map(([slug,eye,title,desc,cat,pills])=>`<article class="elkass-premium-category-card" style="--cat-img:url('assets/categories/${slug}.jpg?v=560')" onclick="location.href='category.html?category=${enc(cat)}'"><div class="elkass-premium-category-photo" aria-hidden="true"></div><div class="elkass-premium-category-shine" aria-hidden="true"></div><div class="elkass-premium-category-content"><span class="elkass-premium-eyebrow">${eye}</span><h3>${title}</h3><p>${desc}</p><div class="elkass-premium-pills">${pills.map(p=>`<a onclick="event.stopPropagation()" href="category.html?category=${enc(cat)}&subcategory=${enc(p)}">${p}</a>`).join('')}</div><a onclick="event.stopPropagation()" class="elkass-premium-button" href="category.html?category=${enc(cat)}">Zobacz kategorię →</a></div></article>`).join('');
 }
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
 window.addEventListener('load',render); setTimeout(render,400); setTimeout(render,1200);
})();
