const q=id=>document.getElementById(id);
const money=n=>Number(n||0).toLocaleString('pl-PL')+',00 zł';
const lines=v=>String(v||'').split('\n').map(x=>x.trim()).filter(Boolean);

const BRANDS=['Samsung','LG','Sony','Philips','Bosch','Siemens','Amica','Beko','Whirlpool','Electrolux','Hisense','Gorenje','TCL','Sharp','Manta','Finlux','Tefal','Remington','Sencor','Kernau','DeLonghi','Zelmer','Braun','Xiaomi','Apple','Lenovo','HP','Acer','Asus','JBL','Panasonic','Miele','Candy','Hoover','Indesit','Liebherr','Haier','Ariete'];

const RULES=[
 {cat:'AGD',sub:'Lodówki',keys:['lodówka','lodowka','chłodziarko','chłodziarka','zamrażarka','no frost','freezer','fridge']},
 {cat:'AGD',sub:'Pralki',keys:['pralka','pralko','wirowanie','obr/min','kg prania','steamcure','washer']},
 {cat:'AGD',sub:'Suszarki',keys:['suszarka do ubrań','pompa ciepła','suszenie','dryer']},
 {cat:'AGD',sub:'Zmywarki',keys:['zmywarka','kompletów','dishwasher']},
 {cat:'AGD',sub:'Piekarniki do zabudowy',keys:['piekarnik','termoobieg','steam','catalytic','pyroliza','oven']},
 {cat:'AGD',sub:'Płyty grzewcze',keys:['płyta indukcyjna','plyta indukcyjna','indukcja','hob']},
 {cat:'AGD',sub:'Okapy',keys:['okap','pochłaniacz','wyciąg']},
 {cat:'Małe AGD',sub:'Czajniki',keys:['czajnik','kettle']},
 {cat:'Małe AGD',sub:'Ekspresy do kawy',keys:['ekspres','coffee','espresso','delonghi']},
 {cat:'Małe AGD',sub:'Odkurzacze',keys:['odkurzacz','vacuum','bezprzewodowy odkurzacz']},
 {cat:'Małe AGD',sub:'Żelazka',keys:['żelazko','zelazko','steam iron']},
 {cat:'Małe AGD',sub:'Blendery i miksery',keys:['blender','mikser','robot kuchenny','malakser']},
 {cat:'RTV',sub:'Telewizory',keys:['telewizor','tv','qled','oled','led tv','mini led','uhd','4k','8k','smart tv','hdr','dvb-t2']},
 {cat:'RTV',sub:'Audio',keys:['soundbar','głośnik','glosnik','audio','słuchawki','sluchawki','jbl']},
 {cat:'Komputery',sub:'Laptopy',keys:['laptop','notebook','ryzen','intel core','ssd','ram','windows']},
 {cat:'Telefony',sub:'Smartfony',keys:['smartfon','telefon','iphone','android','xiaomi','galaxy']},
];

function normalize(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');}
function firstSentence(text){return (text||'').split(/[.!?]\s/).find(s=>s.trim().length>30)||'';}
function cleanName(s){return String(s||'').replace(/\s+/g,' ').replace(/ cena.*$/i,'').trim();}
function parsePrice(text){
 const m=String(text||'').match(/(\d[\d\s]{2,})(?:[,\.](\d{2}))?\s*(zł|zl|pln)/i);
 if(!m)return '';
 return Number(m[1].replace(/\s/g,''));
}
function detectBrand(text){
 const n=normalize(text);
 return BRANDS.find(b=>n.includes(normalize(b))) || '';
}
function detectCategory(text){
 const n=normalize(text);
 let best=null,score=0;
 RULES.forEach(r=>{
   const s=r.keys.reduce((a,k)=>a+(n.includes(normalize(k))?1:0),0);
   if(s>score){score=s;best=r;}
 });
 return best || {cat:'AGD',sub:'Inne produkty'};
}
function detectModel(text,brand){
 const raw=String(text||'');
 const patterns=[
   /\b[A-Z]{1,4}\d{2,}[A-Z0-9\-\/]{2,}\b/g,
   /\b[A-Z0-9]{4,}[-][A-Z0-9]{2,}\b/g
 ];
 let found=[];
 patterns.forEach(p=>{found=found.concat(raw.match(p)||[])});
 found=found.filter(x=>!['DVB','HDMI','QLED','OLED','SMART','NOFROST'].includes(x));
 return found[0] || '';
}
function buildName(text,url,brand,model,cat){
 const l=lines(text);
 let candidate=l.find(x=>x.length>12 && x.length<130 && !/cookie|regulamin|koszyk|raty|dostawa/i.test(x)) || '';
 if(!candidate && url){
   candidate=url.split('/').filter(Boolean).pop()||'';
   candidate=candidate.replaceAll('-',' ').replaceAll('_',' ');
 }
 candidate=cleanName(candidate);
 if(brand && !normalize(candidate).includes(normalize(brand))) candidate=brand+' '+candidate;
 if(model && !candidate.includes(model)) candidate=candidate+' '+model;
 if(!candidate) candidate=cat.sub+' '+(brand||'ELKASS');
 return candidate;
}
function extractParams(text,cat){
 const raw=String(text||'');
 const out=[];
 const pairs=raw.split(/\n|;|\|/).map(x=>x.trim()).filter(Boolean);
 pairs.forEach(row=>{
   if(row.includes(':') && row.length<120){
     const [k,...v]=row.split(':');
     if(k&&v.join(':').trim()) out.push({k:k.trim(),v:v.join(':').trim()});
   }
 });
 const n=normalize(raw);
 const add=(k,v)=>{if(v && !out.some(p=>normalize(p.k)===normalize(k))) out.push({k,v})}
 const inches=raw.match(/(\d{2,3})\s*(?:["”]|cali|cal)/i); if(inches) add('Przekątna ekranu', inches[1]+' cali');
 const kg=raw.match(/(\d{1,2})\s*kg/i); if(kg) add('Pojemność', kg[1]+' kg');
 const rpm=raw.match(/(\d{3,4})\s*(obr|obr\/min)/i); if(rpm) add('Prędkość wirowania', rpm[1]+' obr./min');
 const liters=raw.match(/(\d{2,3})\s*l\b/i); if(liters) add('Pojemność', liters[1]+' l');
 const power=raw.match(/(\d{3,4})\s*w\b/i); if(power) add('Moc', power[1]+' W');
 if(n.includes('no frost')) add('No Frost','Tak');
 if(n.includes('smart tv')) add('Smart TV','Tak');
 if(n.includes('qled')) add('Technologia obrazu','QLED');
 if(n.includes('oled')) add('Technologia obrazu','OLED');
 if(n.includes('4k')) add('Rozdzielczość','4K UHD');
 if(n.includes('dvb-t2')) add('Tuner','DVB-T2');
 if(n.includes('klasa a')||n.includes('energetyczna a')) add('Klasa energetyczna','A');
 if(!out.length){
   if(cat.cat==='AGD') out.push({k:'Typ produktu',v:cat.sub},{k:'Dostępność',v:'zapytaj w sklepie'},{k:'Gwarancja',v:'producenta'});
   else out.push({k:'Typ produktu',v:cat.sub},{k:'Gwarancja',v:'producenta'});
 }
 return out.slice(0,12);
}
function buildFeatures(text,cat,params){
 const n=normalize(text);
 const f=[];
 const add=x=>{if(!f.includes(x))f.push(x)}
 if(cat.sub.includes('Lodówki')){add('Pojemna chłodziarka do codziennego użytkowania'); if(n.includes('no frost')) add('System No Frost ograniczający osadzanie szronu');}
 if(cat.sub.includes('Pralki')){add('Wygodne programy prania do codziennego użytku'); add('Dobry wybór do domu i mieszkania');}
 if(cat.sub.includes('Telewizory')){add('Obraz w wysokiej rozdzielczości'); if(n.includes('smart')) add('Funkcje Smart TV'); if(n.includes('qled')||n.includes('oled')) add('Nowoczesna technologia obrazu');}
 if(cat.sub.includes('Piekarniki')){add('Wygodne pieczenie i funkcje do zabudowy'); if(n.includes('steam')) add('Funkcja pary dla lepszych efektów pieczenia');}
 if(n.includes('raty')) add('Możliwość zakupu na raty');
 add('Fachowe doradztwo ELKASS Olesno');
 add('Możliwość odbioru osobistego lub dostawy');
 params.slice(0,3).forEach(p=>add(`${p.k}: ${p.v}`));
 return f.slice(0,8);
}
function setText(id,val){q(id).value=val||''}
function analyze(){
 const url=q('productUrl').value.trim();
 const text=(q('sourceText').value+' '+url).trim();
 if(!text){alert('Wklej link lub tekst produktu.'); return}
 const brand=detectBrand(text);
 const cat=detectCategory(text);
 const model=detectModel(text,brand);
 const name=buildName(q('sourceText').value,url,brand,model,cat);
 const price=parsePrice(text);
 const params=extractParams(q('sourceText').value,cat);
 const features=buildFeatures(q('sourceText').value,cat,params);
 setText('brand',brand);
 setText('model',model);
 q('category').value=cat.cat;
 setText('subcategory',cat.sub);
 setText('name',name);
 if(price) q('price').value=price;
 setText('shortDesc',`${cat.sub} ${brand?brand+' ':''}w ofercie ELKASS Olesno. Sprawdź aktualną dostępność i promocję.`);
 setText('premiumDesc',`${name} to produkt z kategorii ${cat.cat} / ${cat.sub}, przygotowany do oferty ELKASS Olesno. Najważniejsze informacje zostały uporządkowane tak, aby klient szybko zobaczył cenę, zalety i dane techniczne. Nasi doradcy pomogą dobrać sprzęt, sprawdzić dostępność oraz warunki zakupu.`);
 setText('printDesc',`${name} — karta informacyjna ELKASS Olesno. Produkt dostępny do zapytania w sklepie, z możliwością sprawdzenia promocji, rat i dostawy.`);
 setText('features',features.join('\n'));
 setText('params',params.map(p=>`${p.k}: ${p.v}`).join('\n'));
 if(cat.cat==='AGD') q('promo').value='Okazja AGD'; else q('promo').value='Nowość';
 render();
}
function data(){
 const price=Number(q('price').value||0), discount=Number(q('discount').value||0);
 const oldManual=Number(q('oldPrice').value||0);
 const old=oldManual || (discount?Math.round(price/(1-discount/100)):0);
 const promo=q('customPromo').value.trim() || q('promo').value;
 return {url:q('productUrl').value,name:q('name').value,brand:q('brand').value,model:q('model').value,category:q('category').value,subcategory:q('subcategory').value,price,discount,old,promo,image:q('image').value,gallery:lines(q('gallery').value),shortDesc:q('shortDesc').value,premiumDesc:q('premiumDesc').value,printDesc:q('printDesc').value,features:lines(q('features').value),params:lines(q('params').value).map(x=>{const [k,...v]=x.split(':');return {k:(k||'Parametr').trim(),v:v.join(':').trim()||'-'}}),placement:[...document.querySelectorAll('.checks input:checked')].map(i=>i.value)}
}
function img(src){return `<img src="${src}" onerror="this.src='https://placehold.co/700x500?text=ELKASS'">`}
function badge(p){return p.promo&&p.promo!=='Brak'?`<span class="badge">${p.promo}${p.discount?` -${p.discount}%`:''}</span>`:''}
function quality(p){
 const list=[];list.push([p.name.length>8,'Nazwa produktu uzupełniona']);list.push([!!p.brand,'Marka rozpoznana lub wpisana']);list.push([p.category&&p.subcategory,'Kategoria i podkategoria przypisane']);list.push([p.price>0,'Cena produktu uzupełniona']);list.push([p.premiumDesc.length>120,'Opis premium ma dobrą długość']);list.push([p.features.length>=4,'Minimum 4 cechy produktu']);list.push([p.params.length>=4,'Minimum 4 parametry techniczne']);
 q('qualityList').innerHTML=list.map(([ok,t])=>`<li class="${ok?'ok':'warn'}">${ok?'✓':'⚠'} ${t}</li>`).join('');
}
function render(){
 const p=data();quality(p);
 q('tilePreview').innerHTML=`<article class="product-tile"><div class="product-img">${img(p.image)}</div><div class="product-body">${badge(p)}<div class="title">${p.name}</div><p>${p.shortDesc}</p><div class="price">${money(p.price)}</div>${p.old?`<div class="old">${money(p.old)}</div>`:''}</div></article>`;
 q('pagePreview').innerHTML=`<article class="product-page"><div><div class="product-img">${img(p.image)}</div><div class="gallery-row">${p.gallery.map(g=>img(g)).join('')}</div></div><div>${badge(p)}<h2>${p.name}</h2><p><strong>${p.brand}</strong> • ${p.category} / ${p.subcategory}</p><p>${p.premiumDesc}</p><div class="price">${money(p.price)}</div>${p.old?`<div class="old">${money(p.old)}</div>`:''}<div class="features">${p.features.map(f=>`<span>✓ ${f}</span>`).join('')}</div><table class="params">${p.params.map(r=>`<tr><td>${r.k}</td><td>${r.v}</td></tr>`).join('')}</table></div></article>`;
 q('mobilePreview').innerHTML=`<div class="mobile-box">${q('tilePreview').innerHTML}</div>`;
 q('printPreview').innerHTML=`<article class="print-card"><div class="print-head"><div><strong>ELKASS OLESNO</strong><br>RTV / AGD / MULTIMEDIA / SERWIS</div><div>Armii Krajowej 5<br>34 358 24 42</div></div><div class="print-main"><div>${img(p.image)}</div><div><h2>${p.name}</h2>${badge(p)}<div class="price">${money(p.price)}</div>${p.old?`<div class="old">${money(p.old)}</div>`:''}<p>${p.printDesc}</p><div class="features">${p.features.slice(0,6).map(f=>`<span>✓ ${f}</span>`).join('')}</div></div></div><h3>Parametry techniczne</h3><table class="params">${p.params.slice(0,10).map(r=>`<tr><td>${r.k}</td><td>${r.v}</td></tr>`).join('')}</table><p>Zapytaj doradcę ELKASS o dostępność, raty i dostawę.</p></article>`;
}
q('fetchBtn').onclick=analyze;
q('enhanceBtn').onclick=()=>{const p=data(); q('premiumDesc').value=`${p.name} to starannie dobrany produkt w ofercie ELKASS Olesno. Opis został przygotowany w czytelnej formie dla klienta: najpierw najważniejsze korzyści, później parametry techniczne i cena. Dzięki temu produkt dobrze wygląda na stronie, w promocjach oraz na wydruku A4.`; q('printDesc').value=`${p.name} — oferta ELKASS Olesno. Sprawdź dostępność, cenę, raty 0%, odbiór osobisty i możliwość dostawy.`; render();}
q('previewBtn').onclick=render;q('printOnlyBtn').onclick=()=>{render();window.print();};q('saveBtn').onclick=()=>{const p=data(); const arr=JSON.parse(localStorage.getItem('elkassBotPremiumProducts')||'[]'); arr.unshift({...p,id:'bot-'+Date.now(),status:'do akceptacji'}); localStorage.setItem('elkassBotPremiumProducts',JSON.stringify(arr)); alert('Zapisano do akceptacji.');};q('exportBtn').onclick=()=>{const blob=new Blob([JSON.stringify(data(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='elkass-produkt-premium.json'; a.click();};
render();