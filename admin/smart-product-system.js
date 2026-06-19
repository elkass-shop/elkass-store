const q=(id)=>document.getElementById(id);
const money=(n)=>Number(n||0).toLocaleString('pl-PL')+',00 zł';
const lines=(v)=>String(v||'').split('\n').map(x=>x.trim()).filter(Boolean);
function collect(){
 const price=Number(q('price').value||0);
 const discount=Number(q('discount').value||0);
 const old=discount?Math.round(price/(1-discount/100)):0;
 return {
  url:q('productUrl').value,name:q('name').value,brand:q('brand').value,model:q('model').value,
  category:q('category').value,subcategory:q('subcategory').value,price,discount,old,
  promo:q('promo').value,image:q('image').value,
  gallery:lines(q('gallery').value),description:q('description').value,
  features:lines(q('features').value),
  params:lines(q('params').value).map(x=>{const [k,...v]=x.split(':');return {k:(k||'Parametr').trim(),v:v.join(':').trim()||'-'}}),
  placement:[...document.querySelectorAll('.eps-checks input:checked')].map(i=>i.value)
 }
}
function img(src){return `<img src="${src}" onerror="this.src='https://placehold.co/700x500?text=ELKASS'">`}
function render(){
 const p=collect();
 const badge=p.promo&&p.promo!=='Brak'?`<span class="ep-badge">${p.promo}${p.discount?` -${p.discount}%`:''}</span>`:'';
 q('tilePreview').innerHTML=`<article class="ep-tile"><div class="ep-img">${img(p.image)}</div><div class="ep-body">${badge}<div class="ep-title">${p.name}</div><p>${p.brand} • ${p.category} / ${p.subcategory}</p><div class="ep-price">${money(p.price)}</div>${p.old?`<div class="ep-old">${money(p.old)}</div>`:''}</div></article>`;
 q('pagePreview').innerHTML=`<article class="ep-page"><div><div class="ep-img">${img(p.image)}</div><div class="ep-gallery">${p.gallery.map(g=>img(g)).join('')}</div></div><div>${badge}<h2>${p.name}</h2><p>${p.description}</p><div class="ep-price">${money(p.price)}</div>${p.old?`<div class="ep-old">${money(p.old)}</div>`:''}<div class="ep-features">${p.features.map(f=>`<span>✓ ${f}</span>`).join('')}</div><table class="ep-params">${p.params.map(r=>`<tr><td>${r.k}</td><td>${r.v}</td></tr>`).join('')}</table></div></article>`;
 q('printPreview').innerHTML=`<article class="print-card"><div class="print-top"><strong>ELKASS OLESNO</strong><span>tel. 34 358 24 42</span></div><div class="print-main"><div>${img(p.image)}</div><div><h2>${p.name}</h2>${badge}<div class="ep-price">${money(p.price)}</div>${p.old?`<div class="ep-old">${money(p.old)}</div>`:''}<p>${p.description}</p><div class="ep-features">${p.features.slice(0,5).map(f=>`<span>✓ ${f}</span>`).join('')}</div></div></div><h3>Parametry</h3><table class="ep-params">${p.params.slice(0,8).map(r=>`<tr><td>${r.k}</td><td>${r.v}</td></tr>`).join('')}</table><p>Armii Krajowej 5, Olesno • elkass@wp.pl</p></article>`;
}
q('fetchBtn').onclick=()=>{const url=q('productUrl').value.trim(); if(!url){alert('Wklej link produktu.');return} const slug=url.split('/').filter(Boolean).pop()||'produkt'; q('name').value=slug.replaceAll('-',' ').replaceAll('_',' ').toUpperCase(); q('description').value='Szkic produktu pobrany z linku. Uzupełnij cenę, zdjęcia i parametry, a system automatycznie złoży kafel, kartę produktu i wydruk premium.'; render();}
q('previewBtn').onclick=render;
q('saveBtn').onclick=()=>{const data=collect(); const arr=JSON.parse(localStorage.getItem('elkassPendingProducts')||'[]'); arr.unshift({...data,id:'pending-'+Date.now(),status:'do akceptacji'}); localStorage.setItem('elkassPendingProducts',JSON.stringify(arr)); alert('Zapisano produkt do akceptacji. Po podpięciu Supabase zapis będzie online.');}
q('printBtn').onclick=()=>{render();window.print()}
q('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(collect(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='produkt-elkass.json'; a.click();}
render();