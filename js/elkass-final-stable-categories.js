/* ELKASS 5.5 — final stable category renderer */
(function(){
  const CATS=[
    {name:'RTV', img:'assets/categories/rtv.svg', subs:['Telewizory','Soundbary','Audio'], href:'#promocje'},
    {name:'AGD', img:'assets/categories/agd.svg', subs:['Lodówki','Pralki','Zmywarki'], href:'#promocje'},
    {name:'AGD do zabudowy', img:'assets/categories/agd-zabudowa.svg', subs:['Piekarniki','Płyty','Okapy'], href:'#promocje'},
    {name:'Małe AGD', img:'assets/categories/male-agd.svg', subs:['Ekspresy','Odkurzacze','Żelazka'], href:'#promocje'},
    {name:'Komputery i telefony', img:'assets/categories/komputery-telefony.svg', subs:['Laptopy','Smartfony','Akcesoria'], href:'#promocje'},
    {name:'Serwis i doradztwo', img:'assets/categories/serwis.svg', subs:['Wsparcie','Konfiguracja','Pomoc'], href:'#kontakt'}
  ];
  function render(){
    const grid=document.getElementById('categories-grid')||document.querySelector('[data-category-grid]');
    if(!grid) return;
    grid.className='elkass-final-category-grid';
    grid.innerHTML=CATS.map(c=>`
      <article class="elkass-final-category-card">
        <img src="${c.img}" alt="${c.name}" loading="lazy">
        <div class="elkass-final-category-content">
          <h3>${c.name}</h3>
          <p>${c.subs.slice(0,3).map(s=>`<span>${s}</span>`).join('')}</p>
          <a href="${c.href}">Zobacz więcej →</a>
        </div>
      </article>`).join('');
  }
  document.addEventListener('DOMContentLoaded',()=>{setTimeout(render,0);setTimeout(render,300);setTimeout(render,900)});
})();