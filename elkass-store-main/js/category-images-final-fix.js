

(function(){
  const CATS=[
    ['RTV','Telewizory, soundbary, kino domowe','assets/categories/rtv.jpg',['Telewizory','Soundbary','Audio']],
    ['AGD','Lodówki, pralki, zmywarki','assets/categories/agd.jpg',['Lodówki','Pralki','Zmywarki']],
    ['AGD do zabudowy','Piekarniki, płyty, okapy','assets/categories/agd-zabudowa.jpg',['Piekarniki','Płyty','Okapy']],
    ['Małe AGD','Ekspresy, odkurzacze, żelazka','assets/categories/male-agd.jpg',['Ekspresy','Odkurzacze','Żelazka']],
    ['Komputery i telefony','Laptopy, smartfony, akcesoria','assets/categories/komputery-telefony.jpg',['Laptopy','Smartfony','Akcesoria']],
    ['Serwis i doradztwo','Pomoc, konfiguracja, fachowe wsparcie','assets/categories/serwis.jpg',['Wsparcie','Konfiguracja','Doradztwo']]
  ];
  function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function link(c,s){const p=new URLSearchParams();p.set('category',c);if(s)p.set('subcategory',s);return 'category.html?'+p.toString();}
  function render(){
    const grid=document.getElementById('categories-grid'); if(!grid) return;
    grid.className='elkass544-category-grid';
    grid.innerHTML=CATS.map(c=>`<article class="elkass544-category-card" onclick="location.href='${link(c[0],'')}'">
      <img class="elkass544-category-img" src="${c[2]}?v=544" alt="${esc(c[0])}" loading="eager" decoding="async">
      <div class="elkass544-category-content"><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p>
      <div class="elkass544-pills">${c[3].map(s=>`<a onclick="event.stopPropagation()" href="${link(c[0],s)}">${esc(s)}</a>`).join('')}</div>
      <a onclick="event.stopPropagation()" class="elkass544-button" href="${link(c[0],'')}">Zobacz więcej →</a></div>
    </article>`).join('');
  }
  function force(){ const g=document.getElementById('categories-grid'); if(!g || g.className!=='elkass544-category-grid' || g.children.length!==6) render(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
  window.addEventListener('load',render);
  setInterval(force,700);
})();

