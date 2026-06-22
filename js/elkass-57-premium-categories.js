/* ELKASS 5.7 — premium category renderer */
(function(){
 const cats=[
  {name:'RTV',img:'assets/categories/rtv.svg',subs:['Telewizory','Soundbary','Audio'],href:'#promocje'},
  {name:'AGD',img:'assets/categories/agd.svg',subs:['Lodówki','Pralki','Zmywarki'],href:'#promocje'},
  {name:'AGD do zabudowy',img:'assets/categories/agd-zabudowa.svg',subs:['Piekarniki','Płyty','Okapy'],href:'#promocje'},
  {name:'Małe AGD',img:'assets/categories/male-agd.svg',subs:['Ekspresy','Odkurzacze','Żelazka'],href:'#promocje'},
  {name:'Komputery i telefony',img:'assets/categories/komputery-telefony.svg',subs:['Laptopy','Smartfony','Akcesoria'],href:'#promocje'},
  {name:'Serwis i doradztwo',img:'assets/categories/serwis.svg',subs:['Wsparcie','Konfiguracja','Pomoc'],href:'#kontakt'}
 ];
 function render(){
  const grid=document.getElementById('categories-grid')||document.querySelector('[data-category-grid]');
  if(!grid)return;
  grid.className='elkass57-category-grid';
  grid.innerHTML=cats.map(c=>`<article class="elkass57-category-card"><img src="${c.img}" alt="${c.name}" loading="lazy"><div class="elkass57-category-content"><h3>${c.name}</h3><p>${c.subs.map(s=>`<span>${s}</span>`).join('')}</p><a href="${c.href}">Zobacz więcej →</a></div></article>`).join('');
 }
 document.addEventListener('DOMContentLoaded',()=>{render();setTimeout(render,300);setTimeout(render,900)});
})();
