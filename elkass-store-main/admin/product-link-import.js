const $ = (id)=>document.getElementById(id);
function lines(v){return String(v||'').split('\n').map(x=>x.trim()).filter(Boolean)}
function productData(){
  const price = Number($('price').value || 0);
  const discount = Number($('discount').value || 0);
  const oldPrice = discount>0 ? Math.round(price/(1-discount/100)) : null;
  return {
    sourceUrl:$('productUrl').value,
    name:$('name').value,
    brand:$('brand').value,
    category:$('category').value,
    subcategory:$('subcategory').value,
    price,
    discount,
    oldPrice,
    promoLabel:$('promoLabel').value,
    image:$('image').value,
    description:$('description').value,
    features:lines($('features').value),
    params:lines($('params').value).map(row=>{
      const [k,...rest]=row.split(':');
      return {key:(k||'Parametr').trim(), value:rest.join(':').trim() || '-'};
    })
  }
}
function render(){
 const p=productData();
 const badge = p.promoLabel && p.promoLabel!=='Brak' ? `<div class="badge">${p.promoLabel}${p.discount?` -${p.discount}%`:''}</div>` : '';
 $('productTile').innerHTML = `<article class="product-tile">
   <div class="product-img"><img src="${p.image}" onerror="this.src='https://placehold.co/600x400?text=ELKASS'"></div>
   <div class="product-info">${badge}<h3>${p.name}</h3><p>${p.brand} • ${p.category} / ${p.subcategory}</p>
   <div class="price">${p.price} zł</div>${p.oldPrice?`<div class="old">${p.oldPrice} zł</div>`:''}</div>
 </article>`;
 $('productPage').innerHTML = `<article class="product-page-preview">
   <div class="product-img"><img src="${p.image}" onerror="this.src='https://placehold.co/800x500?text=ELKASS'"></div>
   <h2>${p.name}</h2>${badge}<p>${p.description}</p>
   <div class="price">${p.price} zł</div>${p.oldPrice?`<div class="old">${p.oldPrice} zł</div>`:''}
   <div class="feature-list">${p.features.map(f=>`<span>✓ ${f}</span>`).join('')}</div>
   <table class="params">${p.params.map(r=>`<tr><td>${r.key}</td><td>${r.value}</td></tr>`).join('')}</table>
   <p><strong>ELKASS Olesno</strong> • Armii Krajowej 5 • tel. 34 358 24 42</p>
 </article>`;
}
$('previewBtn').addEventListener('click',render);
$('analyzeBtn').addEventListener('click',()=>{
 const url = $('productUrl').value.trim();
 if(!url){alert('Wklej link produktu.');return}
 const slug = url.split('/').filter(Boolean).pop() || 'produkt';
 $('name').value = slug.replaceAll('-',' ').replaceAll('_',' ').toUpperCase();
 $('description').value = 'Roboczy opis produktu utworzony na podstawie linku. Uzupełnij cenę, zdjęcia, cechy i parametry, a system automatycznie dopasuje kartę produktu i wydruk.';
 render();
});
$('saveBtn').addEventListener('click',()=>{
 const data = productData();
 const all = JSON.parse(localStorage.getItem('elkassImportedProducts') || '[]');
 all.unshift({...data, id:'import-'+Date.now(), createdAt:new Date().toISOString()});
 localStorage.setItem('elkassImportedProducts', JSON.stringify(all));
 alert('Produkt zapisany roboczo w przeglądarce. Po podłączeniu Supabase/Firebase będzie zapisywany online.');
});
$('printBtn').addEventListener('click',()=>{render();window.print()});
render();