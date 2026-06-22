const q=id=>document.getElementById(id);
const money=n=>Number(n||0).toLocaleString('pl-PL')+',00 zł';
const lines=v=>String(v||'').split('\n').map(x=>x.trim()).filter(Boolean);
let step=1;let techs=[];
let dictionary=JSON.parse(localStorage.getItem('elkassTechDictionary')||'{}');
const starter={'No Frost':'System bezszronowy ograniczający osadzanie szronu i ułatwiający codzienne użytkowanie.','Total NoFrost':'Pełny system No Frost w chłodziarce i zamrażarce, który pomaga utrzymać stabilne warunki przechowywania.','Multi Air Flow':'Równomierne rozprowadzanie chłodnego powietrza we wnętrzu urządzenia.','LED':'Energooszczędne oświetlenie LED poprawiające widoczność wnętrza.','AAT':'Automatyczna regulacja temperatury dostosowująca pracę urządzenia do warunków użytkowania.','R600a':'Czynnik chłodniczy stosowany w nowoczesnych urządzeniach chłodniczych.'};
dictionary={...starter,...dictionary};function saveDict(){localStorage.setItem('elkassTechDictionary',JSON.stringify(dictionary))}
function showStep(){document.querySelectorAll('.step').forEach(s=>s.classList.toggle('active',s.dataset.panel==step));document.querySelectorAll('.stepbar button').forEach(b=>b.classList.toggle('active',b.dataset.step==step))}
document.querySelectorAll('.stepbar button').forEach(b=>b.onclick=()=>{step=Number(b.dataset.step);showStep();render()});
q('nextStep').onclick=()=>{step=Math.min(6,step+1);showStep();render()};q('prevStep').onclick=()=>{step=Math.max(1,step-1);showStep();render()};
function parseTechInput(v){let [name,...desc]=String(v).split('-');return {name:name.trim(),desc:desc.join('-').trim()}}
function renderDictionary(){q('dictionaryList').innerHTML=Object.entries(dictionary).slice(0,30).map(([k,v])=>`<div class="dict-item"><strong>${k}</strong><br>${v}</div>`).join('')}
function renderTechs(){q('techList').innerHTML=techs.map((t,i)=>`<div class="tech-item"><strong>${t.name}</strong><br>${t.desc}<br><button type="button" onclick="removeTech(${i})">Usuń</button></div>`).join('')}
function removeTech(i){techs.splice(i,1);renderTechs();render()}
q('techInput').addEventListener('input',()=>{const p=parseTechInput(q('techInput').value.trim());if(dictionary[p.name])q('techHint').textContent='Znaleziono definicję: '+dictionary[p.name];else if(p.name)q('techHint').textContent='Nowa technologia — po dodaniu zapiszę ją w słowniku.';else q('techHint').textContent=''});
q('addTech').onclick=()=>{const p=parseTechInput(q('techInput').value);if(!p.name)return alert('Wpisz nazwę technologii.');let desc=p.desc||dictionary[p.name]||'';if(!desc)return alert('Nie znam definicji. Wpisz format: Nazwa - opis');dictionary[p.name]=desc;saveDict();techs.push({name:p.name,desc});q('techInput').value='';q('techHint').textContent='Dodano i zapamiętano.';renderDictionary();renderTechs();render()};
function params(){return lines(q('params').value).map(x=>{const [k,...v]=x.split(':');return {k:(k||'Parametr').trim(),v:v.join(':').trim()||'-'}})}
function data(){const price=Number(q('price').value||0),discount=Number(q('discount').value||0),oldManual=Number(q('oldPrice').value||0);return {name:q('name').value,brand:q('brand').value,model:q('model').value,category:q('category').value,subcategory:q('subcategory').value,image:q('image').value,gallery:lines(q('gallery').value),price,discount,old:oldManual||(discount?Math.round(price/(1-discount/100)):0),promo:q('customPromo').value.trim()||q('promo').value,shortDesc:q('shortDesc').value,premiumDesc:q('premiumDesc').value,printDesc:q('printDesc').value,techs,params:params()}}
function autoTexts(){const p=data();const techNames=techs.map(t=>t.name).join(', ');q('shortDesc').value=`${p.brand} ${p.model} • ${p.subcategory} • ${techNames || 'sprawdzone funkcje'} w ofercie ELKASS Olesno.`;q('premiumDesc').value=`${p.name} to produkt z kategorii ${p.category} / ${p.subcategory}, przygotowany do profesjonalnej prezentacji w ofercie ELKASS Olesno. Najważniejsze technologie (${techNames || 'funkcje produktu'}) zostały opisane w czytelny sposób, dzięki czemu klient szybko widzi zalety, parametry i cenę urządzenia. Doradcy ELKASS pomogą sprawdzić dostępność, raty oraz możliwość dostawy.`;q('printDesc').value=`${p.name} — karta informacyjna ELKASS Olesno. Produkt z opisanymi technologiami, parametrami technicznymi i ceną, przygotowany do prezentacji klientowi w sklepie.`;render()}
q('generateText').onclick=autoTexts;
function img(src){return `<img src="${src}" onerror="this.src='https://placehold.co/700x500?text=ELKASS'">`}
function badge(p){return p.promo&&p.promo!=='Brak'?`<span class="badge">${p.promo}${p.discount?` -${p.discount}%`:''}</span>`:''}
function score(p){let s=0;if(p.name)s+=15;if(p.brand)s+=10;if(p.price)s+=15;if(p.image)s+=10;if(p.techs.length)s+=20;if(p.params.length>=5)s+=15;if(p.premiumDesc.length>120)s+=15;return s}
function quality(p){const s=score(p);q('scoreBox').innerHTML=`<div class="score ${s>80?'good':s>55?'mid':'bad'}">${s}/100</div>`;const arr=[[p.name,'Nazwa'],[p.brand,'Marka'],[p.price,'Cena'],[p.image,'Zdjęcie'],[p.techs.length,'Technologie'],[p.params.length>=5,'Parametry'],[p.premiumDesc.length>120,'Opis premium']];q('qualityList').innerHTML=arr.map(([ok,t])=>`<li class="${ok?'good':'bad'}">${ok?'✓':'⚠'} ${t}</li>`).join('')}
function render(){const p=data();quality(p);q('tilePreview').innerHTML=`<article class="product-tile"><div class="product-img">${img(p.image)}</div><div class="product-body">${badge(p)}<div class="title">${p.name}</div><p>${p.shortDesc}</p><div class="price">${money(p.price)}</div>${p.old?`<div class="old">${money(p.old)}</div>`:''}</div></article>`;q('pagePreview').innerHTML=`<article class="product-page"><div><div class="product-img">${img(p.image)}</div><div class="gallery-row">${p.gallery.map(g=>img(g)).join('')}</div></div><div>${badge(p)}<h2>${p.name}</h2><p><strong>${p.brand}</strong> • ${p.category} / ${p.subcategory}</p><p>${p.premiumDesc}</p><div class="price">${money(p.price)}</div>${p.old?`<div class="old">${money(p.old)}</div>`:''}<div class="features">${p.techs.map(t=>`<div class="tech-box"><strong>${t.name}</strong><br>${t.desc}</div>`).join('')}</div><table class="params">${p.params.map(r=>`<tr><td>${r.k}</td><td>${r.v}</td></tr>`).join('')}</table></div></article>`;q('printPreview').innerHTML=`<div class="print-mini"><div class="print-mini-head"><strong>ELKASS</strong><span>karta A4</span></div><h2>${p.name}</h2><div class="price">${money(p.price)}</div><p>${p.printDesc}</p><div class="features">${p.techs.slice(0,6).map(t=>`<span>${t.name}: ${t.desc}</span>`).join('')}</div></div>`}
q('printCard').onclick=()=>{const p=data();localStorage.setItem('elkassPrintProduct',JSON.stringify({name:p.name,brand:p.brand,model:p.model,category:p.category,subcategory:p.subcategory,image:p.image,price:p.price,old:p.old,promo:p.promo,discount:p.discount,printDesc:p.printDesc,features:p.techs.map(t=>`${t.name}: ${t.desc}`),params:p.params}));window.open('product-print.html','_blank')};
q('saveDraft').onclick=()=>{const p=data();const arr=JSON.parse(localStorage.getItem('elkassPremiumWizardProducts')||'[]');arr.unshift({...p,id:'wizard-'+Date.now(),status:'do akceptacji'});localStorage.setItem('elkassPremiumWizardProducts',JSON.stringify(arr));alert('Zapisano produkt do akceptacji.')};
q('exportJson').onclick=()=>{const blob=new Blob([JSON.stringify(data(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='elkass-premium-product.json';a.click()};
['name','brand','model','category','subcategory','image','gallery','price','discount','oldPrice','promo','customPromo','shortDesc','premiumDesc','printDesc','params'].forEach(id=>q(id).addEventListener('input',render));
renderDictionary();renderTechs();autoTexts();showStep();

/* ELKASS 4.3 — Media Wizard Fix */
let elkassWizardImages = [];
function syncWizardImages(){
  if(!elkassWizardImages.length) return;
  q('image').value = elkassWizardImages[0].src;
  q('gallery').value = elkassWizardImages.map(x=>x.src).join('\n');
  renderMediaGallery();
  render();
}
function renderMediaGallery(){
  const box = q('mediaGallery');
  if(!box) return;
  if(!elkassWizardImages.length){
    box.innerHTML = '<div class="hint">Nie dodano jeszcze zdjęć. Dodaj pliki z komputera albo zostaw ścieżki ręcznie.</div>';
    return;
  }
  box.innerHTML = elkassWizardImages.map((img,i)=>`
    <div class="media-item">
      ${i===0?'<span class="media-main-badge">Zdjęcie główne</span>':''}
      <div class="media-thumb"><img src="${img.src}" alt="${img.name}"></div>
      <div class="media-actions">
        <button type="button" onclick="setMainWizardImage(${i})">Ustaw jako główne</button>
        <button type="button" onclick="removeWizardImage(${i})">Usuń</button>
      </div>
    </div>
  `).join('');
}
function setMainWizardImage(i){
  const item = elkassWizardImages.splice(i,1)[0];
  elkassWizardImages.unshift(item);
  syncWizardImages();
}
function removeWizardImage(i){
  elkassWizardImages.splice(i,1);
  if(elkassWizardImages.length) syncWizardImages();
  else { renderMediaGallery(); render(); }
}
function setupWizardMediaUpload(){
  const input = q('imageFiles');
  if(!input) return;
  input.addEventListener('change', function(){
    const files = Array.from(input.files || []);
    if(!files.length) return;
    let pending = files.length;
    files.forEach(file=>{
      if(!file.type.startsWith('image/')){ pending--; return; }
      const reader = new FileReader();
      reader.onload = e=>{
        elkassWizardImages.push({name:file.name,type:file.type,src:e.target.result});
        pending--;
        if(pending<=0) syncWizardImages();
      };
      reader.readAsDataURL(file);
    });
  });
  renderMediaGallery();
}
document.addEventListener('DOMContentLoaded', setupWizardMediaUpload);
try{setupWizardMediaUpload()}catch(e){}
