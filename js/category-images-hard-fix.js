/* ELKASS 5.4.2 — twarda naprawa obrazków kategorii */
(function(){
const fixed={
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
const order=['rtv','agd','komputery','telefony','audio','serwis'];
function norm(v){return String(v||'').trim().toLowerCase();}
function imageForName(name,i){return fixed[norm(name)] || fixed[order[i]] || 'assets/categories/default.svg';}
function patchStorage(){
 ['elkassAdminData','elkassCmsData'].forEach(key=>{
  try{
   const raw=localStorage.getItem(key); if(!raw) return;
   const data=JSON.parse(raw);
   const arr=Array.isArray(data.categories)?data.categories:(Array.isArray(data.categoryTiles)?data.categoryTiles:null);
   if(!arr) return;
   arr.forEach((c,i)=>{ c.img=imageForName(c.name,i); c.image=c.img; });
   localStorage.setItem(key,JSON.stringify(data));
  }catch(e){}
 });
}
function patchDom(){
 const grid=document.getElementById('categories-grid')||document.querySelector('.category-grid,.elkass-category-wow-grid');
 if(!grid) return;
 [...grid.querySelectorAll('.category-card,.elkass-category-wow-card')].forEach((card,i)=>{
   const title=(card.querySelector('h3')||{}).textContent || '';
   const src=imageForName(title,i);
   card.style.setProperty('--bg',`url('${src}')`);
   card.dataset.img=src;
   let img=card.querySelector('img');
   if(!img){
     img=document.createElement('img');
     img.className='elkass-category-wow-img';
     img.alt=title||'Kategoria ELKASS';
     card.insertBefore(img,card.firstChild);
   }
   img.src=src;
   img.loading='lazy';
   img.onerror=function(){ const c=this.closest('.category-card,.elkass-category-wow-card'); if(c)c.classList.add('no-img'); };
 });
}
function run(){patchStorage(); if(window.ELKASS_RENDER_CATEGORY_IMAGES) window.ELKASS_RENDER_CATEGORY_IMAGES(); patchDom();}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
setTimeout(run,100); setTimeout(run,700); setTimeout(run,1500);
})();
