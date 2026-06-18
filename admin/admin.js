const DATA_KEY='elkassAdminData';
const AUTH_KEY='elkassAdminAuth';
const defaultData={
products:[
{id:'p1',visible:true,promo:true,randomDiscount:true,badge:'HIT DNIA',img:'assets/products/product-01-lodowka-tcl.jpg',name:'Lodówka TCL RP318BXE2',category:'AGD',subcategory:'Lodówki',features:['No Frost','Multi Air Flow','Pojemna chłodziarka'],price:1699},
{id:'p2',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-02-pralka-beko.jpg',name:'Pralka BEKO WUE7636XOA',category:'AGD',subcategory:'Pralki',features:['7 kg załadunku','1200 obr./min','Program szybki'],price:1349},
{id:'p3',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-03-chlodziarka-amica.jpg',name:'Chłodziarka Amica FM170.4',category:'AGD',subcategory:'Chłodziarki',features:['122 l pojemności','3 półki','Komora FreshZone'],price:899},
{id:'p4',visible:true,promo:true,randomDiscount:true,badge:'HIT DNIA',img:'assets/products/product-04-piekarnik-samsung.jpg',name:'Piekarnik Samsung NV7B44305AK',category:'AGD',subcategory:'Piekarniki',features:['Dual Cook','Air Fry','Prowadnice teleskopowe'],price:1799},
{id:'p5',visible:true,promo:true,randomDiscount:true,badge:'NOWOŚĆ',img:'assets/products/product-05-telewizor-samsung.jpg',name:'Telewizor Samsung 55” 4K UHD',category:'RTV',subcategory:'Telewizory',features:['Smart TV','HDR','Krystaliczny obraz'],price:2299},
{id:'p6',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-06-soundbar-lg.jpg',name:'Soundbar LG S60Q',category:'Audio',subcategory:'Soundbary',features:['Bluetooth','Mocny bas','HDMI ARC'],price:899},
{id:'p7',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-07-laptop-lenovo.jpg',name:'Laptop Lenovo IdeaPad 15',category:'Komputery',subcategory:'Laptopy',features:['Intel Core i5','SSD 512 GB','15,6 cala'],price:2499},
{id:'p8',visible:true,promo:true,randomDiscount:true,badge:'HIT CENOWY',img:'assets/products/product-08-smartfon-samsung.jpg',name:'Smartfon Samsung Galaxy A35',category:'Telefony',subcategory:'Smartfony',features:['Ekran AMOLED','Aparat 50 MP','Duża bateria'],price:1399},
{id:'p9',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-09-odkurzacz-bosch.jpg',name:'Odkurzacz Bosch Serie 4',category:'AGD',subcategory:'Odkurzacze',features:['Duża moc ssania','Cicha praca','Filtr HEPA'],price:649},
{id:'p10',visible:true,promo:true,randomDiscount:true,badge:'NOWOŚĆ',img:'assets/products/product-10-zmywarka-bosch.jpg',name:'Zmywarka Bosch 60 cm',category:'AGD',subcategory:'Zmywarki',features:['EcoSilence Drive','AquaStop','Pojemne kosze'],price:2199},
{id:'p11',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-11-mikrofala-amica.jpg',name:'Kuchenka mikrofalowa Amica',category:'AGD',subcategory:'Mikrofalówki',features:['20 l pojemności','Grill','Szybkie podgrzewanie'],price:399},
{id:'p12',visible:true,promo:true,randomDiscount:true,badge:'HIT DNIA',img:'assets/products/product-12-ekspres-philips.jpg',name:'Ekspres Philips LatteGo',category:'AGD',subcategory:'Ekspresy do kawy',features:['Kawa ziarnista','Spienianie mleka','Łatwe czyszczenie'],price:1999},
{id:'p13',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-13-zamrazarka-kernau.jpg',name:'Zamrażarka Kernau KFUF 17153',category:'AGD',subcategory:'Zamrażarki',features:['No Frost','Pojemne szuflady','Cicha praca'],price:1799},
{id:'p14',visible:true,promo:true,randomDiscount:true,badge:'NOWOŚĆ',img:'assets/products/product-14-pralka-philco.jpg',name:'Pralka Philco PLD 106EPL',category:'AGD',subcategory:'Pralki',features:['6 kg załadunku','Programy szybkie','Klasa ekonomiczna'],price:1149},
{id:'p15',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-15-robot-sprzatajacy.jpg',name:'Robot sprzątający Sencor',category:'AGD',subcategory:'Roboty sprzątające',features:['Mapa pomieszczeń','Sterowanie aplikacją','Mopowanie'],price:999},
{id:'p16',visible:true,promo:true,randomDiscount:true,badge:'HIT CENOWY',img:'assets/products/product-16-lodowka-lg.jpg',name:'Lodówka LG No Frost',category:'AGD',subcategory:'Lodówki',features:['Total No Frost','DoorCooling','Cicha praca'],price:2699},
{id:'p17',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-17-monitor-gaming.jpg',name:'Monitor gamingowy 27”',category:'Komputery',subcategory:'Monitory',features:['165 Hz','IPS','Niski czas reakcji'],price:999},
{id:'p18',visible:true,promo:true,randomDiscount:true,badge:'NOWOŚĆ',img:'assets/products/product-18-sluchawki-sony.jpg',name:'Słuchawki bezprzewodowe Sony',category:'Audio',subcategory:'Słuchawki',features:['ANC','Długi czas pracy','Czyste brzmienie'],price:599},
{id:'p19',visible:true,promo:true,randomDiscount:true,badge:'PROMOCJA',img:'assets/products/product-19-tablet-lenovo.jpg',name:'Tablet Lenovo Tab M10',category:'Telefony',subcategory:'Tablety',features:['10,1 cala','Wi-Fi','Dla domu i szkoły'],price:749},
{id:'p20',visible:true,promo:true,randomDiscount:true,badge:'HIT DNIA',img:'assets/products/product-20-plyta-indukcyjna.jpg',name:'Płyta indukcyjna Bosch',category:'AGD',subcategory:'Płyty indukcyjne',features:['4 pola grzewcze','PowerBoost','Sterowanie dotykowe'],price:1499}
],
categories:[
{id:'c1',name:'RTV',description:'Telewizory, soundbary, kino domowe',img:'assets/rtv.jpg',subcategories:[{name:'Telewizory',description:'Smart TV, QLED, OLED i 4K'},{name:'Soundbary',description:'Lepszy dźwięk do telewizora'},{name:'Audio',description:'Głośniki, wieże i kino domowe'}]},
{id:'c2',name:'AGD',description:'Lodówki, pralki, zmywarki',img:'assets/agd.jpg',subcategories:[{name:'Lodówki',description:'No Frost i duże pojemności'},{name:'Pralki',description:'Slim, standard i pralko-suszarki'},{name:'Zmywarki',description:'45 cm, 60 cm i do zabudowy'}]},
{id:'c3',name:'Komputery',description:'Laptopy, monitory, akcesoria',img:'assets/komputery.jpg',subcategories:[{name:'Laptopy',description:'Do pracy, nauki i domu'},{name:'Monitory',description:'Biuro, gaming i multimedia'},{name:'Akcesoria',description:'Myszy, klawiatury, drukarki'}]},
{id:'c4',name:'Telefony',description:'Smartfony, tablety, akcesoria',img:'assets/telefony.jpg',subcategories:[{name:'Smartfony',description:'Android, 5G i duże baterie'},{name:'Tablety',description:'Do szkoły, pracy i rozrywki'},{name:'Akcesoria GSM',description:'Ładowarki, szkła i etui'}]},
{id:'c5',name:'Audio',description:'Słuchawki, głośniki, soundbary',img:'assets/audio.jpg',subcategories:[{name:'Słuchawki',description:'Bluetooth, ANC i sportowe'},{name:'Głośniki',description:'Przenośne i domowe'},{name:'Soundbary',description:'Do telewizora i kina domowego'}]},
{id:'c6',name:'Serwis',description:'Pomoc, konfiguracja, doradztwo',img:'assets/gaming.jpg',subcategories:[{name:'Wsparcie',description:'Pomoc po zakupie'},{name:'Konfiguracja',description:'Ustawienie sprzętu i aplikacji'},{name:'Doradztwo',description:'Dobór sprzętu do potrzeb'}]}
]};
let data = loadData();
data = ensureDataModel(data);

function loadData(){
  try{
    const saved = JSON.parse(localStorage.getItem(DATA_KEY) || 'null');
    if(saved && Array.isArray(saved.products) && Array.isArray(saved.categories)) return saved;
  }catch(e){console.warn('Błąd odczytu danych panelu:', e)}
  return structuredClone(defaultData);
}
function ensureDataModel(source){
  const cloned = structuredClone(source || defaultData);
  cloned.products = Array.isArray(cloned.products) ? cloned.products : [];
  cloned.categories = Array.isArray(cloned.categories) ? cloned.categories : [];
  cloned.categories = cloned.categories.map((cat, index) => ({
    id: cat.id || ('c' + Date.now() + '_' + index),
    name: cat.name || 'Nowa kategoria',
    description: cat.description || '',
    img: cat.img || 'assets/rtv.jpg',
    subcategories: Array.isArray(cat.subcategories) ? cat.subcategories.map((sub, subIndex) => ({
      id: sub.id || ('s' + Date.now() + '_' + index + '_' + subIndex),
      name: sub.name || 'Nowa podkategoria',
      description: sub.description || ''
    })) : []
  }));
  cloned.products = cloned.products.map((p, index) => ({
    id: p.id || ('p' + Date.now() + '_' + index),
    visible: p.visible !== false,
    promo: p.promo !== false,
    randomDiscount: p.randomDiscount !== false,
    badge: p.badge || 'PROMOCJA',
    img: p.img || 'assets/products/product-01-lodowka-tcl.jpg',
    name: p.name || 'Nowy produkt',
    category: p.category || '',
    subcategory: p.subcategory || '',
    features: Array.isArray(p.features) ? p.features : String(p.features || '').split('\n').filter(Boolean),
    price: Number(p.price || 0),
    availability: p.availability || 'Dostępny w sklepie'
  }));
  return cloned;
}
function saveData(silent=false){
  data = ensureDataModel(data);
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
  if(!silent) flash('Zapisano zmiany. Odśwież stronę główną, aby zobaczyć efekt.');
}
function flash(msg){ alert(msg); }
function $(id){ return document.getElementById(id); }
function escapeHtml(value){
  return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[ch]));
}
function normalizeAdminSrc(src){
  if(!src) return '../assets/products/product-01-lodowka-tcl.jpg';
  if(src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) return src;
  return src.startsWith('../') ? src : '../' + src;
}
function fileToDataUrl(input, cb){
  const f = input.files && input.files[0];
  if(!f) return;
  const r = new FileReader();
  r.onload = () => cb(r.result);
  r.readAsDataURL(f);
}

const loginScreen=$('login-screen'), panel=$('panel');
function showPanel(){ loginScreen.classList.add('hidden'); panel.classList.remove('hidden'); renderAll(); }
function showLogin(){ loginScreen.classList.remove('hidden'); panel.classList.add('hidden'); }
if(localStorage.getItem(AUTH_KEY)==='1') showPanel(); else showLogin();
$('login-form').addEventListener('submit', e => {
  e.preventDefault();
  if($('login').value==='admin' && $('password').value==='admin'){
    localStorage.setItem(AUTH_KEY,'1');
    showPanel();
  }else alert('Nieprawidłowy login lub hasło');
});
$('logout').onclick = () => { localStorage.removeItem(AUTH_KEY); showLogin(); };
document.querySelectorAll('.tab').forEach(btn => btn.onclick = () => {
  document.querySelectorAll('.tab,.tab-panel').forEach(x => x.classList.remove('active'));
  btn.classList.add('active');
  $(btn.dataset.tab).classList.add('active');
});

function getCategoryByName(name){
  return data.categories.find(c => String(c.name).toLowerCase() === String(name).toLowerCase());
}
function getCategoryById(id){ return data.categories.find(c => c.id === id); }
function fillSelect(select, options, selected='', placeholder='Wybierz'){
  if(!select) return;
  select.innerHTML = `<option value="">${placeholder}</option>` + options.map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`).join('');
  select.value = selected || '';
}
function populateProductCategorySelect(selectedCategory='', selectedSubcategory=''){
  const catSelect=$('product-category');
  const subSelect=$('product-subcategory');
  if(!catSelect || !subSelect) return;
  fillSelect(catSelect, data.categories.map(c => ({value:c.name,label:c.name})), selectedCategory, 'Wybierz kategorię');
  const current = getCategoryByName(catSelect.value);
  const subs = current && Array.isArray(current.subcategories) ? current.subcategories : [];
  fillSelect(subSelect, subs.map(s => ({value:s.name,label:s.name})), selectedSubcategory, 'Wybierz podkategorię');
}
function populateSubcategoryParentSelect(selectedId=''){
  fillSelect($('subcategory-parent'), data.categories.map(c => ({value:c.id,label:c.name})), selectedId, 'Wybierz kategorię');
}

$('product-category').addEventListener('change', () => populateProductCategorySelect($('product-category').value,''));
$('product-upload').addEventListener('change', e => fileToDataUrl(e.target, url => { $('product-img').value=url; updateProductPreview(); }));
$('category-upload').addEventListener('change', e => fileToDataUrl(e.target, url => { $('category-img').value=url; updateCategoryPreview(); }));
['product-img','category-img'].forEach(id => {
  const el=$(id); if(el) el.addEventListener('input', () => id==='product-img' ? updateProductPreview() : updateCategoryPreview());
});
function updateProductPreview(){ const img=$('product-preview'); if(img) img.src=normalizeAdminSrc($('product-img').value.trim()); }
function updateCategoryPreview(){ const img=$('category-preview'); if(img) img.src=normalizeAdminSrc($('category-img').value.trim()); }

function renderProducts(){
  const box=$('products-list'); if(!box) return;
  box.innerHTML='';
  data.products.forEach(p => {
    const row=document.createElement('div'); row.className='item-row';
    row.innerHTML = `<img src="${normalizeAdminSrc(p.img)}" alt=""><div><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.category||'Brak kategorii')} / ${escapeHtml(p.subcategory||'Brak podkategorii')} • ${escapeHtml(p.price)} zł • ${escapeHtml(p.availability || 'Dostępny w sklepie')} • ${p.randomDiscount?'rabat 5-25%':'bez rabatu'} • ${p.visible!==false?'widoczny':'ukryty'}</small></div><div class="item-actions"><button class="edit" type="button">Edytuj</button><button class="delete" type="button">Usuń</button></div>`;
    row.querySelector('.edit').onclick=()=>editProduct(p.id);
    row.querySelector('.delete').onclick=()=>{ if(confirm('Usunąć produkt?')){ data.products=data.products.filter(x=>x.id!==p.id); renderProducts(); saveData(); }};
    box.appendChild(row);
  });
}
function clearProduct(){
  ['product-id','product-name','product-price','product-badge','product-img','product-features'].forEach(id=>$(id).value='');
  populateProductCategorySelect('','');
  if($('product-availability')) $('product-availability').value='Dostępny w sklepie'; $('product-visible').checked=true; $('product-promo').checked=true; $('product-discount').checked=true;
  updateProductPreview();
}
$('clear-product').onclick=clearProduct;
function editProduct(id){
  const p=data.products.find(x=>x.id===id); if(!p) return;
  $('product-id').value=p.id; $('product-name').value=p.name; $('product-price').value=p.price;
  populateProductCategorySelect(p.category||'',p.subcategory||'');
  $('product-badge').value=p.badge||''; $('product-img').value=p.img||'';
  $('product-features').value=(p.features||[]).join('\n');
  if($('product-availability')) $('product-availability').value=p.availability||'Dostępny w sklepie'; $('product-visible').checked=p.visible!==false; $('product-promo').checked=p.promo!==false; $('product-discount').checked=p.randomDiscount!==false;
  updateProductPreview(); window.scrollTo({top:0,behavior:'smooth'});
}
$('product-form').addEventListener('submit', e => {
  e.preventDefault();
  const id=$('product-id').value || ('p'+Date.now());
  const p={
    id,
    name:$('product-name').value.trim(),
    price:Number($('product-price').value),
    category:$('product-category').value.trim(),
    subcategory:$('product-subcategory').value.trim(),
    badge:$('product-badge').value.trim() || 'PROMOCJA',
    img:$('product-img').value.trim(),
    availability: $('product-availability') ? $('product-availability').value : 'Dostępny w sklepie',
    features:$('product-features').value.split('\n').map(x=>x.trim()).filter(Boolean),
    visible:$('product-visible').checked,
    promo:$('product-promo').checked,
    randomDiscount:$('product-discount').checked
  };
  const i=data.products.findIndex(x=>x.id===id); if(i>=0) data.products[i]=p; else data.products.push(p);
  clearProduct(); renderProducts(); saveData();
});

function renderCategories(){
  const box=$('categories-list'); if(!box) return;
  box.innerHTML='';
  data.categories.forEach(c => {
    const row=document.createElement('div'); row.className='item-row category-row';
    row.innerHTML = `<img src="${normalizeAdminSrc(c.img)}" alt=""><div><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.description||'')}<br>Podkategorie: ${(c.subcategories||[]).length}</small></div><div class="item-actions"><button class="edit" type="button">Edytuj</button><button class="delete" type="button">Usuń</button></div>`;
    row.querySelector('.edit').onclick=()=>editCategory(c.id);
    row.querySelector('.delete').onclick=()=>deleteCategory(c.id);
    box.appendChild(row);
  });
}
function clearCategory(){ ['category-id','category-name','category-description','category-img'].forEach(id=>$(id).value=''); updateCategoryPreview(); }
$('clear-category').onclick=clearCategory;
function editCategory(id){
  const c=getCategoryById(id); if(!c) return;
  $('category-id').value=c.id; $('category-name').value=c.name; $('category-description').value=c.description||''; $('category-img').value=c.img||'';
  updateCategoryPreview(); window.scrollTo({top:0,behavior:'smooth'});
}
function deleteCategory(id){
  const c=getCategoryById(id); if(!c) return;
  const count = data.products.filter(p => p.category === c.name).length;
  const msg = count ? `Ta kategoria ma ${count} produktów. Usunąć kategorię i odpiąć produkty od tej kategorii?` : 'Usunąć kategorię?';
  if(!confirm(msg)) return;
  data.products = data.products.map(p => p.category === c.name ? {...p, category:'', subcategory:''} : p);
  data.categories = data.categories.filter(x => x.id !== id);
  renderAll(); saveData();
}
$('category-form').addEventListener('submit', e => {
  e.preventDefault();
  const id=$('category-id').value || ('c'+Date.now());
  const old = getCategoryById(id);
  const oldName = old ? old.name : '';
  const category = {
    id,
    name:$('category-name').value.trim(),
    description:$('category-description').value.trim(),
    img:$('category-img').value.trim(),
    subcategories: old && Array.isArray(old.subcategories) ? old.subcategories : []
  };
  if(!category.name){ alert('Podaj nazwę kategorii'); return; }
  const duplicate = data.categories.find(c => c.id !== id && String(c.name).toLowerCase() === String(category.name).toLowerCase());
  if(duplicate){ alert('Taka kategoria już istnieje'); return; }
  const i=data.categories.findIndex(x=>x.id===id); if(i>=0) data.categories[i]=category; else data.categories.push(category);
  if(oldName && oldName !== category.name){ data.products = data.products.map(p => p.category === oldName ? {...p, category:category.name} : p); }
  clearCategory(); renderAll(); saveData();
});

function renderSubcategories(){
  const box=$('subcategories-list'); if(!box) return;
  box.innerHTML='';
  data.categories.forEach(cat => (cat.subcategories||[]).forEach(sub => {
    const row=document.createElement('div'); row.className='item-row subcategory-row';
    row.innerHTML = `<div class="mini-icon">${escapeHtml(cat.name.slice(0,2).toUpperCase())}</div><div><strong>${escapeHtml(sub.name)}</strong><small>${escapeHtml(cat.name)} • ${escapeHtml(sub.description||'')}</small></div><div class="item-actions"><button class="edit" type="button">Edytuj</button><button class="delete" type="button">Usuń</button></div>`;
    row.querySelector('.edit').onclick=()=>editSubcategory(cat.id, sub.id || sub.name);
    row.querySelector('.delete').onclick=()=>deleteSubcategory(cat.id, sub.id || sub.name);
    box.appendChild(row);
  }));
}
function clearSubcategory(){
  ['subcategory-id','subcategory-original-parent','subcategory-name','subcategory-description'].forEach(id=>$(id).value='');
  populateSubcategoryParentSelect('');
}
$('clear-subcategory').onclick=clearSubcategory;
function findSubcategory(parentId, subIdOrName){
  const cat=getCategoryById(parentId); if(!cat) return null;
  const sub=(cat.subcategories||[]).find(s => s.id === subIdOrName || s.name === subIdOrName);
  return sub ? {cat, sub} : null;
}
function editSubcategory(parentId, subIdOrName){
  const found=findSubcategory(parentId, subIdOrName); if(!found) return;
  $('subcategory-id').value=found.sub.id || found.sub.name;
  $('subcategory-original-parent').value=found.cat.id;
  populateSubcategoryParentSelect(found.cat.id);
  $('subcategory-name').value=found.sub.name || '';
  $('subcategory-description').value=found.sub.description || '';
  window.scrollTo({top:0,behavior:'smooth'});
}
function deleteSubcategory(parentId, subIdOrName){
  const found=findSubcategory(parentId, subIdOrName); if(!found) return;
  const count=data.products.filter(p => p.category===found.cat.name && p.subcategory===found.sub.name).length;
  const msg=count ? `Ta podkategoria ma ${count} produktów. Usunąć ją i odpiąć produkty od tej podkategorii?` : 'Usunąć podkategorię?';
  if(!confirm(msg)) return;
  found.cat.subcategories = (found.cat.subcategories||[]).filter(s => (s.id || s.name) !== (found.sub.id || found.sub.name));
  data.products=data.products.map(p => p.category===found.cat.name && p.subcategory===found.sub.name ? {...p, subcategory:''} : p);
  renderAll(); saveData();
}
$('subcategory-form').addEventListener('submit', e => {
  e.preventDefault();
  const parentId=$('subcategory-parent').value;
  const cat=getCategoryById(parentId);
  if(!cat){ alert('Wybierz kategorię dla podkategorii'); return; }
  const id=$('subcategory-id').value || ('s'+Date.now());
  const originalParent=$('subcategory-original-parent').value;
  const name=$('subcategory-name').value.trim();
  const description=$('subcategory-description').value.trim();
  if(!name){ alert('Podaj nazwę podkategorii'); return; }
  const duplicate = (cat.subcategories||[]).find(s => (s.id !== id) && String(s.name).toLowerCase() === String(name).toLowerCase());
  if(duplicate){ alert('Taka podkategoria już istnieje w wybranej kategorii'); return; }
  let oldCat=null, oldSub=null;
  if(originalParent){ const found=findSubcategory(originalParent,id); if(found){ oldCat=found.cat; oldSub=found.sub; } }
  if(oldCat){ oldCat.subcategories = (oldCat.subcategories||[]).filter(s => (s.id || s.name) !== (oldSub.id || oldSub.name)); }
  cat.subcategories = Array.isArray(cat.subcategories) ? cat.subcategories : [];
  cat.subcategories.push({id,name,description});
  if(oldCat && oldSub){
    data.products=data.products.map(p => p.category===oldCat.name && p.subcategory===oldSub.name ? {...p, category:cat.name, subcategory:name} : p);
  }
  clearSubcategory(); renderAll(); saveData();
});

function renderAll(){
  data=ensureDataModel(data);
  populateProductCategorySelect($('product-category') ? $('product-category').value : '', $('product-subcategory') ? $('product-subcategory').value : '');
  populateSubcategoryParentSelect($('subcategory-parent') ? $('subcategory-parent').value : '');
  renderProducts(); renderCategories(); renderSubcategories();
  updateProductPreview(); updateCategoryPreview();
}
$('save-all').onclick=()=>saveData();
$('reset-data').onclick=()=>{ if(confirm('Przywrócić dane demonstracyjne?')){ data=ensureDataModel(defaultData); saveData(true); renderAll(); flash('Przywrócono dane demonstracyjne.'); } };
$('export-json').onclick=()=>{ const blob=new Blob([JSON.stringify(ensureDataModel(data),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='elkass-dane.json'; a.click(); URL.revokeObjectURL(a.href); };
$('import-json').addEventListener('change', e => {
  const f=e.target.files && e.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{ try{ const imported=JSON.parse(r.result); if(!Array.isArray(imported.products)||!Array.isArray(imported.categories)) throw new Error('Zły format'); data=ensureDataModel(imported); saveData(true); renderAll(); flash('Zaimportowano dane.'); }catch(err){ alert('Nieprawidłowy plik JSON'); } };
  r.readAsText(f);
});
renderAll();
