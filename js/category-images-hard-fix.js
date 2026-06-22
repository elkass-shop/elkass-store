(function(){
const fixed=[
 {name:'RTV',description:'Telewizory, soundbary, kino domowe',img:'assets/categories/rtv.jpg',subcategories:[{name:'Telewizory'},{name:'Soundbary'},{name:'Audio'}]},
 {name:'AGD',description:'Lodówki, pralki, zmywarki',img:'assets/categories/agd.jpg',subcategories:[{name:'Lodówki'},{name:'Pralki'},{name:'Zmywarki'}]},
 {name:'AGD do zabudowy',description:'Piekarniki, płyty, okapy',img:'assets/categories/agd-zabudowa.jpg',subcategories:[{name:'Piekarniki'},{name:'Płyty'},{name:'Okapy'}]},
 {name:'Małe AGD',description:'Ekspresy, odkurzacze, żelazka',img:'assets/categories/male-agd.jpg',subcategories:[{name:'Ekspresy'},{name:'Odkurzacze'},{name:'Żelazka'}]},
 {name:'Komputery i telefony',description:'Laptopy, smartfony, akcesoria',img:'assets/categories/komputery-telefony.jpg',subcategories:[{name:'Laptopy'},{name:'Smartfony'},{name:'Akcesoria'}]},
 {name:'Serwis i doradztwo',description:'Pomoc, konfiguracja, fachowe wsparcie',img:'assets/categories/serwis.jpg',subcategories:[{name:'Wsparcie'},{name:'Konfiguracja'},{name:'Doradztwo'}]}
];
function patchDom(){
 const grid=document.getElementById('categories-grid')||document.querySelector('.category-grid');
 if(!grid) return;
 const cards=[...grid.querySelectorAll('.category-card')];
 cards.forEach((card,i)=>{
   const img=card.querySelector('img');
   if(img && fixed[i]){
     img.src=fixed[i].img;
     img.onerror=function(){this.style.background='linear-gradient(135deg,#101418,#e30613)';};
   }
 });
}
function patchStorage(){
 try{
  const raw=localStorage.getItem('elkassAdminData');
  if(!raw) return;
  const data=JSON.parse(raw);
  if(data && Array.isArray(data.categories)){
    data.categories=data.categories.map((c,i)=>Object.assign({},c,{img:(fixed[i]&&fixed[i].img)||c.img}));
    localStorage.setItem('elkassAdminData',JSON.stringify(data));
  }
 }catch(e){}
}
document.addEventListener('DOMContentLoaded',()=>{patchStorage();setTimeout(patchDom,50);setTimeout(patchDom,500);});
})();