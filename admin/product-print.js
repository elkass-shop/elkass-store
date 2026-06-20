function money(n){return Number(n||0).toLocaleString('pl-PL')+',00 zł'}
function readData(){try{return JSON.parse(localStorage.getItem('elkassPrintProduct')||'{}')}catch(e){return {}}}
function set(id,v){document.getElementById(id).textContent=v||''}
function img(id,src){const el=document.getElementById(id);el.src=src||'https://placehold.co/700x500?text=ELKASS';el.onerror=()=>{el.src='https://placehold.co/700x500?text=BRAK+ZDJECIA'}}
function render(){
 const p=readData();
 const promo=p.promo&&p.promo!=='Brak'?`${p.promo}${p.discount?` -${p.discount}%`:''}`:'';
 img('pImage',p.image);
 set('pPromo',promo);
 set('pName',p.name||'Produkt ELKASS');
 set('pMeta',[p.brand,p.model,p.category,p.subcategory].filter(Boolean).join(' • '));
 set('pPrice',p.price?money(p.price):'Zapytaj o cenę');
 set('pOld',p.old?money(p.old):'');
 set('pPrintDesc',p.printDesc||p.premiumDesc||'Karta produktu przygotowana przez ELKASS Olesno.');
 const features=(p.features||[]).slice(0,8);
 document.getElementById('pFeatures').innerHTML=features.map(f=>`<div class="feature">${f}</div>`).join('');
 const params=(p.params||[]).slice(0,12);
 document.getElementById('pParams').innerHTML=params.map(r=>`<tr><td>${r.k||r.key||''}</td><td>${r.v||r.value||''}</td></tr>`).join('');
}
render();