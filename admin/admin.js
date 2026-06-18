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
{id:'c1',name:'RTV',description:'Telewizory, audio, akcesoria',img:'assets/rtv.jpg',subcategories:[{name:'Telewizory',description:'Smart TV i ekrany 4K'},{name:'Audio',description:'Soundbary i kino domowe'}]},
{id:'c2',name:'AGD',description:'Lodówki, pralki, piekarniki',img:'assets/agd.jpg',subcategories:[{name:'Lodówki',description:'No Frost i duże pojemności'},{name:'Pralki',description:'Pralki ładowane od frontu'}]},
{id:'c3',name:'Komputery',description:'Laptopy, komputery, peryferia',img:'assets/komputery.jpg',subcategories:[{name:'Laptopy',description:'Do pracy i nauki'},{name:'Monitory',description:'Gaming i biuro'}]},
{id:'c4',name:'Telefony',description:'Smartfony i akcesoria',img:'assets/telefony.jpg',subcategories:[{name:'Smartfony',description:'Android i akcesoria'},{name:'Tablety',description:'Do domu i szkoły'}]},
{id:'c5',name:'Audio',description:'Głośniki, soundbary, słuchawki',img:'assets/audio.jpg',subcategories:[{name:'Słuchawki',description:'Bluetooth i ANC'},{name:'Głośniki',description:'Domowe i przenośne'}]},
{id:'c6',name:'Serwis',description:'Pomoc techniczna po zakupie',img:'assets/gaming.jpg',subcategories:[{name:'Wsparcie',description:'Konfiguracja i pomoc'},{name:'Doradztwo',description:'Dobór sprzętu'}]}
]};
let data=loadData();
function loadData(){try{return JSON.parse(localStorage.getItem(DATA_KEY))||structuredClone(defaultData)}catch(e){return structuredClone(defaultData)}}
function saveData(){localStorage.setItem(DATA_KEY,JSON.stringify(data));flash('Zapisano zmiany. Odśwież stronę główną, aby zobaczyć efekt.')}function flash(msg){alert(msg)}
function $(id){return document.getElementById(id)}
const loginScreen=$('login-screen'), panel=$('panel');
function showPanel(){loginScreen.classList.add('hidden');panel.classList.remove('hidden');renderAll()}function showLogin(){loginScreen.classList.remove('hidden');panel.classList.add('hidden')}
if(localStorage.getItem(AUTH_KEY)==='1')showPanel();else showLogin();
$('login-form').addEventListener('submit',e=>{e.preventDefault();if($('login').value==='admin'&&$('password').value==='admin'){localStorage.setItem(AUTH_KEY,'1');showPanel()}else alert('Nieprawidłowy login lub hasło')});
$('logout').onclick=()=>{localStorage.removeItem(AUTH_KEY);showLogin()};
document.querySelectorAll('.tab').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('.tab,.tab-panel').forEach(x=>x.classList.remove('active'));btn.classList.add('active');$(btn.dataset.tab).classList.add('active')});
function fileToDataUrl(input,cb){const f=input.files&&input.files[0];if(!f)return;const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(f)}
$('product-upload').addEventListener('change',e=>fileToDataUrl(e.target,url=>$('product-img').value=url));
$('category-upload').addEventListener('change',e=>fileToDataUrl(e.target,url=>$('category-img').value=url));
function renderProducts(){const box=$('products-list');box.innerHTML='';data.products.forEach(p=>{const row=document.createElement('div');row.className='item-row';row.innerHTML=`<img src="../${p.img}" onerror="this.src='${p.img}'"><div><strong>${p.name}</strong><small>${p.category||''} / ${p.subcategory||''} • ${p.price} zł • ${p.randomDiscount?'rabat 5-25%':'bez rabatu'} • ${p.visible!==false?'widoczny':'ukryty'}</small></div><div class="item-actions"><button class="edit">Edytuj</button><button class="delete">Usuń</button></div>`;row.querySelector('.edit').onclick=()=>editProduct(p.id);row.querySelector('.delete').onclick=()=>{if(confirm('Usunąć produkt?')){data.products=data.products.filter(x=>x.id!==p.id);renderProducts();saveData()}};box.appendChild(row)})}
function clearProduct(){['product-id','product-name','product-price','product-category','product-subcategory','product-badge','product-img','product-features'].forEach(id=>$(id).value='');$('product-visible').checked=true;$('product-promo').checked=true;$('product-discount').checked=true}$('clear-product').onclick=clearProduct;
function editProduct(id){const p=data.products.find(x=>x.id===id);if(!p)return;$('product-id').value=p.id;$('product-name').value=p.name;$('product-price').value=p.price;$('product-category').value=p.category||'';$('product-subcategory').value=p.subcategory||'';$('product-badge').value=p.badge||'';$('product-img').value=p.img||'';$('product-features').value=(p.features||[]).join('\n');$('product-visible').checked=p.visible!==false;$('product-promo').checked=p.promo!==false;$('product-discount').checked=p.randomDiscount!==false;window.scrollTo({top:0,behavior:'smooth'})}
$('product-form').addEventListener('submit',e=>{e.preventDefault();const id=$('product-id').value||('p'+Date.now());const p={id,name:$('product-name').value.trim(),price:Number($('product-price').value),category:$('product-category').value.trim(),subcategory:$('product-subcategory').value.trim(),badge:$('product-badge').value.trim()||'PROMOCJA',img:$('product-img').value.trim(),features:$('product-features').value.split('\n').map(x=>x.trim()).filter(Boolean),visible:$('product-visible').checked,promo:$('product-promo').checked,randomDiscount:$('product-discount').checked};const i=data.products.findIndex(x=>x.id===id);if(i>=0)data.products[i]=p;else data.products.push(p);clearProduct();renderProducts();saveData()});
function renderCategories(){const box=$('categories-list');box.innerHTML='';data.categories.forEach(c=>{const row=document.createElement('div');row.className='item-row';row.innerHTML=`<img src="../${c.img}" onerror="this.src='${c.img}'"><div><strong>${c.name}</strong><small>${c.description||''}<br>${(c.subcategories||[]).map(s=>s.name).join(', ')}</small></div><div class="item-actions"><button class="edit">Edytuj</button><button class="delete">Usuń</button></div>`;row.querySelector('.edit').onclick=()=>editCategory(c.id);row.querySelector('.delete').onclick=()=>{if(confirm('Usunąć kategorię?')){data.categories=data.categories.filter(x=>x.id!==c.id);renderCategories();saveData()}};box.appendChild(row)})}
function clearCategory(){['category-id','category-name','category-description','category-img','category-subcategories'].forEach(id=>$(id).value='')}$('clear-category').onclick=clearCategory;
function editCategory(id){const c=data.categories.find(x=>x.id===id);if(!c)return;$('category-id').value=c.id;$('category-name').value=c.name;$('category-description').value=c.description||'';$('category-img').value=c.img||'';$('category-subcategories').value=(c.subcategories||[]).map(s=>`${s.name} | ${s.description||''}`).join('\n');window.scrollTo({top:0,behavior:'smooth'})}
$('category-form').addEventListener('submit',e=>{e.preventDefault();const id=$('category-id').value||('c'+Date.now());const c={id,name:$('category-name').value.trim(),description:$('category-description').value.trim(),img:$('category-img').value.trim(),subcategories:$('category-subcategories').value.split('\n').map(line=>{const [name,description='']=line.split('|').map(x=>x.trim());return name?{name,description}:null}).filter(Boolean)};const i=data.categories.findIndex(x=>x.id===id);if(i>=0)data.categories[i]=c;else data.categories.push(c);clearCategory();renderCategories();saveData()});
function renderAll(){renderProducts();renderCategories()}
$('save-all').onclick=saveData;$('reset-data').onclick=()=>{if(confirm('Przywrócić dane demonstracyjne?')){data=structuredClone(defaultData);saveData();renderAll()}};
$('export-json').onclick=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='elkass-dane.json';a.click();URL.revokeObjectURL(a.href)};
$('import-json').addEventListener('change',e=>{const f=e.target.files&&e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const imported=JSON.parse(r.result);if(!Array.isArray(imported.products)||!Array.isArray(imported.categories))throw new Error('Zły format');data=imported;saveData();renderAll()}catch(err){alert('Nieprawidłowy plik JSON')}};r.readAsText(f)});

// WOW11 — automatyczny podgląd grafik w panelu admina
(function(){
  const productImg = document.getElementById('product-img');
  const categoryImg = document.getElementById('category-img');
  const productPreview = document.getElementById('product-preview');
  const categoryPreview = document.getElementById('category-preview');

  function normalizeAdminSrc(src){
    if(!src) return '';
    if(src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) return src;
    return src.startsWith('../') ? src : '../' + src;
  }

  function updateProductPreview(){
    if(productImg && productPreview && productImg.value.trim()){
      productPreview.src = normalizeAdminSrc(productImg.value.trim());
    }
  }

  function updateCategoryPreview(){
    if(categoryImg && categoryPreview && categoryImg.value.trim()){
      categoryPreview.src = normalizeAdminSrc(categoryImg.value.trim());
    }
  }

  if(productImg){
    productImg.addEventListener('input', updateProductPreview);
    productImg.addEventListener('change', updateProductPreview);
  }
  if(categoryImg){
    categoryImg.addEventListener('input', updateCategoryPreview);
    categoryImg.addEventListener('change', updateCategoryPreview);
  }

  document.addEventListener('click', function(e){
    if(e.target && e.target.classList && e.target.classList.contains('edit')){
      setTimeout(function(){updateProductPreview(); updateCategoryPreview();}, 80);
    }
  });

  setTimeout(function(){updateProductPreview(); updateCategoryPreview();}, 300);
})();
