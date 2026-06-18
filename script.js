
document.addEventListener('DOMContentLoaded', () => {
  const DATA_KEY = 'elkassAdminData';

  const defaultProducts = [
    {id:'p1', visible:true, promo:true, randomDiscount:true, badge:'HIT DNIA', img:'assets/products/product-01-lodowka-tcl.jpg', name:'Lodówka TCL RP318BXE2', category:'AGD', subcategory:'Lodówki', features:['No Frost','Multi Air Flow','Pojemna chłodziarka'], price:1699},
    {id:'p2', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-02-pralka-beko.jpg', name:'Pralka BEKO WUE7636XOA', category:'AGD', subcategory:'Pralki', features:['7 kg załadunku','1200 obr./min','Program szybki'], price:1349},
    {id:'p3', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-03-chlodziarka-amica.jpg', name:'Chłodziarka Amica FM170.4', category:'AGD', subcategory:'Chłodziarki', features:['122 l pojemności','3 półki','Komora FreshZone'], price:899},
    {id:'p4', visible:true, promo:true, randomDiscount:true, badge:'HIT DNIA', img:'assets/products/product-04-piekarnik-samsung.jpg', name:'Piekarnik Samsung NV7B44305AK', category:'AGD', subcategory:'Piekarniki', features:['Dual Cook','Air Fry','Prowadnice teleskopowe'], price:1799},
    {id:'p5', visible:true, promo:true, randomDiscount:true, badge:'NOWOŚĆ', img:'assets/products/product-05-telewizor-samsung.jpg', name:'Telewizor Samsung 55” 4K UHD', category:'RTV', subcategory:'Telewizory', features:['Smart TV','HDR','Krystaliczny obraz'], price:2299},
    {id:'p6', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-06-soundbar-lg.jpg', name:'Soundbar LG S60Q', category:'Audio', subcategory:'Soundbary', features:['Bluetooth','Mocny bas','HDMI ARC'], price:899},
    {id:'p7', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-07-laptop-lenovo.jpg', name:'Laptop Lenovo IdeaPad 15', category:'Komputery', subcategory:'Laptopy', features:['Intel Core i5','SSD 512 GB','15,6 cala'], price:2499},
    {id:'p8', visible:true, promo:true, randomDiscount:true, badge:'HIT CENOWY', img:'assets/products/product-08-smartfon-samsung.jpg', name:'Smartfon Samsung Galaxy A35', category:'Telefony', subcategory:'Smartfony', features:['Ekran AMOLED','Aparat 50 MP','Duża bateria'], price:1399},
    {id:'p9', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-09-odkurzacz-bosch.jpg', name:'Odkurzacz Bosch Serie 4', category:'AGD', subcategory:'Odkurzacze', features:['Duża moc ssania','Cicha praca','Filtr HEPA'], price:649},
    {id:'p10', visible:true, promo:true, randomDiscount:true, badge:'NOWOŚĆ', img:'assets/products/product-10-zmywarka-bosch.jpg', name:'Zmywarka Bosch 60 cm', category:'AGD', subcategory:'Zmywarki', features:['EcoSilence Drive','AquaStop','Pojemne kosze'], price:2199},
    {id:'p11', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-11-mikrofala-amica.jpg', name:'Kuchenka mikrofalowa Amica', category:'AGD', subcategory:'Mikrofalówki', features:['20 l pojemności','Grill','Szybkie podgrzewanie'], price:399},
    {id:'p12', visible:true, promo:true, randomDiscount:true, badge:'HIT DNIA', img:'assets/products/product-12-ekspres-philips.jpg', name:'Ekspres Philips LatteGo', category:'AGD', subcategory:'Ekspresy do kawy', features:['Kawa ziarnista','Spienianie mleka','Łatwe czyszczenie'], price:1999},
    {id:'p13', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-13-zamrazarka-kernau.jpg', name:'Zamrażarka Kernau KFUF 17153', category:'AGD', subcategory:'Zamrażarki', features:['No Frost','Pojemne szuflady','Cicha praca'], price:1799},
    {id:'p14', visible:true, promo:true, randomDiscount:true, badge:'NOWOŚĆ', img:'assets/products/product-14-pralka-philco.jpg', name:'Pralka Philco PLD 106EPL', category:'AGD', subcategory:'Pralki', features:['6 kg załadunku','Programy szybkie','Klasa ekonomiczna'], price:1149},
    {id:'p15', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-15-robot-sprzatajacy.jpg', name:'Robot sprzątający Sencor', category:'AGD', subcategory:'Roboty sprzątające', features:['Mapa pomieszczeń','Sterowanie aplikacją','Mopowanie'], price:999},
    {id:'p16', visible:true, promo:true, randomDiscount:true, badge:'HIT CENOWY', img:'assets/products/product-16-lodowka-lg.jpg', name:'Lodówka LG No Frost', category:'AGD', subcategory:'Lodówki', features:['Total No Frost','DoorCooling','Cicha praca'], price:2699},
    {id:'p17', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-17-monitor-gaming.jpg', name:'Monitor gamingowy 27”', category:'Komputery', subcategory:'Monitory', features:['165 Hz','IPS','Niski czas reakcji'], price:999},
    {id:'p18', visible:true, promo:true, randomDiscount:true, badge:'NOWOŚĆ', img:'assets/products/product-18-sluchawki-sony.jpg', name:'Słuchawki bezprzewodowe Sony', category:'Audio', subcategory:'Słuchawki', features:['ANC','Długi czas pracy','Czyste brzmienie'], price:599},
    {id:'p19', visible:true, promo:true, randomDiscount:true, badge:'PROMOCJA', img:'assets/products/product-19-tablet-lenovo.jpg', name:'Tablet Lenovo Tab M10', category:'Telefony', subcategory:'Tablety', features:['10,1 cala','Wi-Fi','Dla domu i szkoły'], price:749},
    {id:'p20', visible:true, promo:true, randomDiscount:true, badge:'HIT DNIA', img:'assets/products/product-20-plyta-indukcyjna.jpg', name:'Płyta indukcyjna Bosch', category:'AGD', subcategory:'Płyty indukcyjne', features:['4 pola grzewcze','PowerBoost','Sterowanie dotykowe'], price:1499}
  ];

  const defaultCategories = [
    {id:'c1', name:'RTV', description:'Telewizory, soundbary, kino domowe', img:'assets/rtv.jpg', subcategories:[{name:'Telewizory', description:'Smart TV, QLED, OLED i 4K'}, {name:'Soundbary', description:'Lepszy dźwięk do telewizora'}, {name:'Audio', description:'Głośniki, wieże i kino domowe'}]},
    {id:'c2', name:'AGD', description:'Lodówki, pralki, zmywarki', img:'assets/agd.jpg', subcategories:[{name:'Lodówki', description:'No Frost i duże pojemności'}, {name:'Pralki', description:'Slim, standard i pralko-suszarki'}, {name:'Zmywarki', description:'45 cm, 60 cm i do zabudowy'}]},
    {id:'c3', name:'Komputery', description:'Laptopy, monitory, akcesoria', img:'assets/komputery.jpg', subcategories:[{name:'Laptopy', description:'Do pracy, nauki i domu'}, {name:'Monitory', description:'Biuro, gaming i multimedia'}, {name:'Akcesoria', description:'Myszy, klawiatury, drukarki'}]},
    {id:'c4', name:'Telefony', description:'Smartfony, tablety, akcesoria', img:'assets/telefony.jpg', subcategories:[{name:'Smartfony', description:'Android, 5G i duże baterie'}, {name:'Tablety', description:'Do szkoły, pracy i rozrywki'}, {name:'Akcesoria GSM', description:'Ładowarki, szkła i etui'}]},
    {id:'c5', name:'Audio', description:'Słuchawki, głośniki, soundbary', img:'assets/audio.jpg', subcategories:[{name:'Słuchawki', description:'Bluetooth, ANC i sportowe'}, {name:'Głośniki', description:'Przenośne i domowe'}, {name:'Soundbary', description:'Do telewizora i kina domowego'}]},
    {id:'c6', name:'Serwis', description:'Pomoc, konfiguracja, doradztwo', img:'assets/gaming.jpg', subcategories:[{name:'Wsparcie', description:'Pomoc po zakupie'}, {name:'Konfiguracja', description:'Ustawienie sprzętu i aplikacji'}, {name:'Doradztwo', description:'Dobór sprzętu do potrzeb'}]}
  ];

  function getData() {
    try {
      const saved = JSON.parse(localStorage.getItem(DATA_KEY) || 'null');
      if (saved && Array.isArray(saved.products) && Array.isArray(saved.categories)) return saved;
    } catch (e) { console.warn('Błąd odczytu panelu admin:', e); }
    return { products: defaultProducts, categories: defaultCategories };
  }

  function stableDiscount(product) {
    if (product.randomDiscount === false) return 0;
    const source = String(product.id || product.name || Math.random());
    let sum = 0;
    for (let i = 0; i < source.length; i++) sum += source.charCodeAt(i) * (i + 3);
    return 5 + (sum % 21); // 5-25
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('pl-PL', { style:'currency', currency:'PLN', minimumFractionDigits:2, maximumFractionDigits:2 }).format(Number(value || 0));
  }

  function productAvailability(product) {
    return product.availability || product.status || 'Dostępny w sklepie';
  }
  function availabilityClass(product) {
    const value = productAvailability(product).toLowerCase();
    if (value.includes('niedost')) return 'unavailable';
    if (value.includes('zamów') || value.includes('zamow')) return 'order';
    return 'available';
  }
  function productUrl(product) {
    return `product.html?id=${encodeURIComponent(product.id || product.name)}`;
  }

  const data = getData();
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const topBtn = document.getElementById('topBtn');

  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  }

  const categoriesGrid = document.getElementById('categories-grid');
  let activeCategory = null;
  let activeSubcategory = null;

  function normalizeCategoryData(categories) {
    const fallback = Object.fromEntries(defaultCategories.map(c => [c.name, c]));
    return (categories || defaultCategories).map(cat => {
      const base = fallback[cat.name] || {};
      const subcategories = Array.isArray(cat.subcategories) && cat.subcategories.length
        ? cat.subcategories
        : (base.subcategories || []);
      return { ...cat, subcategories: subcategories };
    });
  }

  function buildCategoryUrl(category, subcategory) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (subcategory) params.set('subcategory', subcategory);
    return `category.html?${params.toString()}`;
  }

  function applyCategoryFilter(category, subcategory) {
    window.location.href = buildCategoryUrl(category, subcategory);
  }

  function clearCategoryFilter() {
    activeCategory = null;
    activeSubcategory = null;
    productIndex = 0;
    renderProducts();
    updateActiveFilter();
  }

  function updateActiveFilter() {
    const box = document.getElementById('activeFilter');
    if (!box) return;
    if (!activeCategory && !activeSubcategory) {
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    const label = activeSubcategory ? `${activeCategory} / ${activeSubcategory}` : activeCategory;
    box.hidden = false;
    box.innerHTML = `<span>Pokazuję produkty: <strong>${label}</strong></span><button type="button" id="clearFilter">Pokaż wszystkie</button>`;
    const btn = document.getElementById('clearFilter');
    if (btn) btn.addEventListener('click', clearCategoryFilter);
  }

  function renderCategories() {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = '';
    normalizeCategoryData(data.categories).forEach(cat => {
      const card = document.createElement('article');
      const isActive = activeCategory && String(activeCategory).toLowerCase() === String(cat.name).toLowerCase() && !activeSubcategory;
      card.className = `category-card category-clickable${isActive ? ' active' : ''}`;
      const sub = (cat.subcategories || []).map(s => {
        const subActive = activeSubcategory && String(activeSubcategory).toLowerCase() === String(s.name).toLowerCase() && String(activeCategory).toLowerCase() === String(cat.name).toLowerCase();
        return `<a href="${buildCategoryUrl(cat.name, s.name)}" class="subcategory-pill${subActive ? ' active' : ''}" data-category="${cat.name}" data-subcategory="${s.name}">${s.name}</a>`;
      }).join('');
      card.innerHTML = `
        <img src="${cat.img}" alt="${cat.name}" loading="lazy">
        <div class="category-content">
          <h3>${cat.name}</h3>
          <p>${cat.description || ''}</p>
          <div class="subcategory-pills">${sub}</div>
          <a href="${buildCategoryUrl(cat.name, null)}" class="category-open" data-category="${cat.name}">Wejdź do kategorii →</a>
        </div>
      `;
      card.addEventListener('click', (e) => {
        const subBtn = e.target.closest('.subcategory-pill');
        const catBtn = e.target.closest('.category-open');
        if (subBtn) {
          e.preventDefault();
          e.stopPropagation();
          applyCategoryFilter(subBtn.dataset.category, subBtn.dataset.subcategory);
          renderCategories();
          return;
        }
        if (catBtn || e.target.closest('.category-card')) {
          applyCategoryFilter(cat.name, null);
          renderCategories();
        }
      });
      categoriesGrid.appendChild(card);
    });
  }
  renderCategories();

  const productsGrid = document.getElementById('products-grid');
  let productIndex = 0;
  let productTimer = null;

  function visibleProductCount() {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  function productList() {
    const all = (data.products || []).filter(p => p.visible !== false && p.promo !== false);
    let list = all;
    if (activeCategory && activeSubcategory) {
      list = all.filter(p =>
        String(p.category || '').toLowerCase() === String(activeCategory).toLowerCase() &&
        String(p.subcategory || '').toLowerCase() === String(activeSubcategory).toLowerCase()
      );
      // Jeśli w danej podkategorii nie ma jeszcze produktów, pokaż produkty z tej podkategorii globalnie.
      // Dzięki temu kliknięcie nigdy nie wygląda jak zepsute, a panel admin może później dopisać dokładne przypisania.
      if (!list.length) {
        list = all.filter(p => String(p.subcategory || '').toLowerCase() === String(activeSubcategory).toLowerCase());
      }
      // Ostatni fallback: pokaż kategorię główną, żeby sekcja zawsze żyła.
      if (!list.length) {
        list = all.filter(p => String(p.category || '').toLowerCase() === String(activeCategory).toLowerCase());
      }
      return list;
    }
    if (activeCategory) {
      list = all.filter(p => String(p.category || '').toLowerCase() === String(activeCategory).toLowerCase());
      return list;
    }
    if (activeSubcategory) {
      list = all.filter(p => String(p.subcategory || '').toLowerCase() === String(activeSubcategory).toLowerCase());
      return list;
    }
    return list.length ? list : defaultProducts;
  }

  function renderProducts() {
    if (!productsGrid) return;
    const list = productList();
    const count = visibleProductCount();
    productsGrid.classList.add('is-changing');
    window.setTimeout(() => {
      productsGrid.innerHTML = '';
      if (!list.length) {
        productsGrid.innerHTML = `<div class="empty-products"><strong>Nie ma jeszcze produktów w tej kategorii.</strong><span>Dodaj produkt w panelu administratora albo zapytaj nas telefonicznie o dostępność.</span></div>`;
        productsGrid.classList.remove('is-changing');
        return;
      }
      for (let i = 0; i < count; i++) {
        const product = list[(productIndex + i) % list.length];
        const discount = stableDiscount(product);
        const price = Number(product.price || 0);
        const oldPrice = discount ? Math.round(price / (1 - discount / 100)) : price;
        const features = Array.isArray(product.features) ? product.features : String(product.features || '').split('\n').filter(Boolean);
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
          <a class="product-link-card" href="${productUrl(product)}" aria-label="Zobacz produkt ${product.name}">
            <div class="product-badge">${product.badge || 'PROMOCJA'}</div>
            ${discount ? `<div class="discount">-${discount}%</div>` : ''}
            <div class="product-image"><img src="${product.img}" alt="${product.name}" loading="lazy"></div>
            <span class="product-status ${availabilityClass(product)}">● ${productAvailability(product)}</span>
            <h3>${product.name}</h3>
            <ul class="features">${features.map(item => `<li>• ${item}</li>`).join('')}</ul>
            <div class="price"><strong>${formatPrice(price)}</strong>${discount ? `<del>${formatPrice(oldPrice)}</del>` : ''}</div>
          </a>
        `;
        productsGrid.appendChild(card);
      }
      productsGrid.classList.remove('is-changing');
    }, 160);
  }

  function startProductRotation() {
    if (productTimer) window.clearInterval(productTimer);
    productTimer = window.setInterval(() => {
      const list = productList();
      if (!list.length) { renderProducts(); return; }
      productIndex = (productIndex + visibleProductCount()) % list.length;
      renderProducts();
    }, 5000);
  }

  renderProducts();
  startProductRotation();
  window.addEventListener('resize', () => { renderProducts(); startProductRotation(); });

  // WOW16 — osobne podstrony kategorii i podkategorii.
  // Dzięki category.html?category=RTV&subcategory=Telewizory działa normalny przycisk Wstecz w przeglądarce.
  const categoryPageProducts = document.getElementById('categoryPageProducts');
  const categoryPageTitle = document.getElementById('categoryPageTitle');
  const categoryPageSubtitle = document.getElementById('categoryPageSubtitle');
  const categoryPageCount = document.getElementById('categoryPageCount');
  const categoryPageSubcategories = document.getElementById('categoryPageSubcategories');

  function getRouteParams(){
    const params = new URLSearchParams(window.location.search);
    return {
      category: params.get('category') || '',
      subcategory: params.get('subcategory') || ''
    };
  }

  function renderCategoryPage(){
    if(!categoryPageProducts) return;
    const route = getRouteParams();
    const categoryName = route.category || 'Wszystkie produkty';
    const currentCategory = normalizeCategoryData(data.categories).find(c => String(c.name).toLowerCase() === String(route.category).toLowerCase());
    let list = (data.products || defaultProducts).filter(p => p.visible !== false);
    if(route.category){
      list = list.filter(p => String(p.category || '').toLowerCase() === String(route.category).toLowerCase());
    }
    if(route.subcategory){
      list = list.filter(p => String(p.subcategory || '').toLowerCase() === String(route.subcategory).toLowerCase());
    }
    if(categoryPageTitle) categoryPageTitle.textContent = route.subcategory ? `${route.category}: ${route.subcategory}` : categoryName;
    if(categoryPageSubtitle){
      categoryPageSubtitle.textContent = route.subcategory
        ? `Produkty z podkategorii ${route.subcategory}. Wróć do kategorii lub sprawdź dostępność telefonicznie.`
        : (currentCategory?.description || 'Wybierz podkategorię albo sprawdź aktualne produkty w ofercie.');
    }
    if(categoryPageCount) categoryPageCount.textContent = `${list.length} produktów`;

    if(categoryPageSubcategories){
      const subs = currentCategory?.subcategories || [];
      const allUrl = buildCategoryUrl(route.category, null);
      categoryPageSubcategories.innerHTML = route.category ? `<a class="category-page-chip ${!route.subcategory ? 'active' : ''}" href="${allUrl}">Wszystkie</a>` + subs.map(s => {
        const active = String(s.name).toLowerCase() === String(route.subcategory).toLowerCase();
        return `<a class="category-page-chip ${active ? 'active' : ''}" href="${buildCategoryUrl(route.category, s.name)}">${s.name}</a>`;
      }).join('') : '';
    }

    categoryPageProducts.innerHTML = '';
    if(!list.length){
      categoryPageProducts.innerHTML = `<div class="empty-products category-empty"><strong>Brak produktów w tej podkategorii.</strong><span>Dodaj produkt w panelu administratora albo wróć do kategorii głównej.</span><a class="btn btn-primary small" href="admin/">Dodaj w panelu</a></div>`;
      return;
    }
    list.forEach(product => {
      const discount = stableDiscount(product);
      const price = Number(product.price || 0);
      const oldPrice = discount ? Math.round(price / (1 - discount / 100)) : price;
      const features = Array.isArray(product.features) ? product.features : String(product.features || '').split('\n').filter(Boolean);
      const card = document.createElement('article');
      card.className = 'product-card category-page-product';
      card.innerHTML = `
        <a class="product-link-card" href="${productUrl(product)}" aria-label="Zobacz produkt ${product.name}">
          <div class="product-badge">${product.badge || 'OFERTA'}</div>
          ${discount ? `<div class="discount">-${discount}%</div>` : ''}
          <div class="product-image"><img src="${product.img}" alt="${product.name}" loading="lazy"></div>
          <span class="product-status ${availabilityClass(product)}">● ${productAvailability(product)}</span>
          <h3>${product.name}</h3>
          <ul class="features">${features.slice(0,4).map(item => `<li>• ${item}</li>`).join('')}</ul>
          <div class="price"><strong>${formatPrice(price)}</strong>${discount ? `<del>${formatPrice(oldPrice)}</del>` : ''}</div>
        </a>
      `;
      categoryPageProducts.appendChild(card);
    });
  }

  renderCategoryPage();


  // WOW27: uzupełnienie sekcji „Najczęściej wybierane”, żeby nie była pusta.
  const bestsellersGrid = document.getElementById('bestsellers-grid');
  function renderBestsellers(){
    if(!bestsellersGrid) return;
    const source = (data.products || defaultProducts).filter(p => p.visible !== false);
    const preferredIds = ['p5','p1','p2','p12','p8','p9'];
    const picked = preferredIds.map(id => source.find(p => p.id === id)).filter(Boolean);
    const fallback = source.filter(p => !picked.some(x => x.id === p.id)).slice(0, 6 - picked.length);
    const list = [...picked, ...fallback].slice(0,6);
    bestsellersGrid.innerHTML = list.map((p, i) => `
      <a class="bestseller-card" href="${productUrl(p)}" aria-label="Zobacz ${p.name}">
        <span class="bestseller-tag">${i < 2 ? 'HIT' : 'POPULARNE'}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <h3>${p.name}</h3>
        <div class="bestseller-stars">★★★★★ <span>4.${8 - (i % 3)}</span></div>
        <div class="bestseller-price">${formatPrice(p.price)}</div>
      </a>
    `).join('');
  }
  renderBestsellers();


  function renderSmallProductCard(product) {
    const discount = stableDiscount(product);
    const price = Number(product.price || 0);
    const oldPrice = discount ? Math.round(price / (1 - discount / 100)) : price;
    const features = Array.isArray(product.features) ? product.features : String(product.features || '').split('\n').filter(Boolean);
    return `<article class="product-card">
      <a class="product-link-card" href="${productUrl(product)}">
        <div class="product-badge">${product.badge || 'OFERTA'}</div>
        ${discount ? `<div class="discount">-${discount}%</div>` : ''}
        <div class="product-image"><img src="${product.img}" alt="${product.name}" loading="lazy"></div>
        <span class="product-status ${availabilityClass(product)}">● ${productAvailability(product)}</span>
        <h3>${product.name}</h3>
        <ul class="features">${features.slice(0,3).map(item => `<li>• ${item}</li>`).join('')}</ul>
        <div class="price"><strong>${formatPrice(price)}</strong>${discount ? `<del>${formatPrice(oldPrice)}</del>` : ''}</div>
      </a>
    </article>`;
  }

  function renderProductDetailPage(){
    const detail = document.getElementById('productDetail');
    if(!detail) return;
    const id = new URLSearchParams(window.location.search).get('id');
    const all = (data.products || defaultProducts).filter(p => p.visible !== false);
    const product = all.find(p => String(p.id) === String(id)) || all.find(p => String(p.name) === String(id)) || all[0];
    if(!product){ detail.innerHTML = '<div class="product-detail-empty">Nie znaleziono produktu.</div>'; return; }
    document.title = `${product.name} | ELKASS Olesno`;
    const discount = stableDiscount(product);
    const price = Number(product.price || 0);
    const oldPrice = discount ? Math.round(price / (1 - discount / 100)) : price;
    const features = Array.isArray(product.features) ? product.features : String(product.features || '').split('\n').filter(Boolean);
    detail.innerHTML = `
      <div class="product-detail-media"><img src="${product.img}" alt="${product.name}"></div>
      <div class="product-detail-info">
        <span class="product-badge static">${product.badge || 'OFERTA'}</span>
        <h1>${product.name}</h1>
        <div class="product-detail-category"><span>${product.category || 'Oferta'}</span><span>${product.subcategory || 'Produkt'}</span></div>
        <span class="product-status ${availabilityClass(product)}">● ${productAvailability(product)}</span>
        <div class="product-detail-price"><strong>${formatPrice(price)}</strong>${discount ? `<del>${formatPrice(oldPrice)}</del>` : ''}</div>
        <p>Zapytaj o aktualną dostępność, odbiór w sklepie lub możliwość dostawy. Nasi doradcy pomogą dobrać najlepszy sprzęt do Twoich potrzeb.</p>
        <ul class="product-specs">${features.map(f => `<li>${f}</li>`).join('') || '<li>Fachowe doradztwo</li><li>Możliwość zakupu na raty</li>'}</ul>
        <div class="product-detail-actions">
          <a class="btn btn-primary" href="tel:343582442">📞 Zapytaj telefonicznie</a>
          <a class="btn btn-outline" href="mailto:elkass@wp.pl?subject=Zapytanie o produkt ${encodeURIComponent(product.name)}">✉️ Napisz e-mail</a>
          <a class="btn btn-outline" href="index.html#kontakt">📍 Odwiedź sklep</a>
        </div>
      </div>`;
    const relatedBox = document.getElementById('relatedProducts');
    if(relatedBox){
      const related = all.filter(p => p.id !== product.id && (p.category === product.category || p.subcategory === product.subcategory)).slice(0,4);
      relatedBox.innerHTML = (related.length ? related : all.filter(p => p.id !== product.id).slice(0,4)).map(renderSmallProductCard).join('');
    }
  }
  renderProductDetailPage();

  function startStoreSlider(){
    const slides = Array.from(document.querySelectorAll('.store-slide'));
    if(!slides.length) return;
    let currentStoreSlide = 0;
    window.setInterval(() => {
      slides[currentStoreSlide].classList.remove('active');
      currentStoreSlide = (currentStoreSlide + 1) % slides.length;
      slides[currentStoreSlide].classList.add('active');
    }, 4500);
  }
  startStoreSlider();

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.14 });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  window.addEventListener('scroll', () => {
    if (!topBtn) return;
    topBtn.classList.toggle('show', window.scrollY > 480);
  });
  if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

  const opinions = [
    {name:'Marek K.', city:'Olesno', text:'Profesjonalne doradztwo i bardzo dobra obsługa. Zawsze można liczyć na pomoc przy wyborze sprzętu.'},
    {name:'Anna P.', city:'Dobrodzień', text:'Duży wybór produktów oraz bardzo miła obsługa klienta. Zakupy przebiegły szybko i bez problemów.'},
    {name:'Tomasz W.', city:'Praszka', text:'Kupowałem telewizor. Fachowe doradztwo, szybka realizacja i konkretna pomoc na miejscu.'},
    {name:'Joanna S.', city:'Kluczbork', text:'Świetna obsługa oraz atrakcyjne ceny. Polecam sklep każdemu, kto szuka sprzętu do domu.'},
    {name:'Piotr D.', city:'Radłów', text:'Bardzo dobre podejście do klienta i profesjonalna pomoc przy wyborze pralki.'},
    {name:'Ewa M.', city:'Gorzów Śląski', text:'Kupowałam lodówkę. Wszystko przebiegło sprawnie, a obsługa dokładnie wyjaśniła różnice między modelami.'},
    {name:'Patrycja G.', city:'Olesno', text:'Od lat wracamy po sprzęt RTV i AGD. Zawsze jesteśmy zadowoleni z obsługi.'},
    {name:'Robert J.', city:'Rudniki', text:'Duży wybór, dobre ceny i fachowe doradztwo. Bardzo pozytywne doświadczenie.'},
    {name:'Monika Z.', city:'Byczyna', text:'Profesjonalna obsługa i fachowa pomoc przy zakupach. Wszystko załatwione sprawnie.'},
    {name:'Łukasz T.', city:'Lubliniec', text:'Szybka realizacja zamówienia i bardzo dobry kontakt. Polecam.'},
    {name:'Karolina D.', city:'Zębowice', text:'Bardzo miła obsługa i konkretne doradztwo. Sprzęt dobrany idealnie do potrzeb.'},
    {name:'Damian P.', city:'Lasowice Wielkie', text:'Dobre ceny i szeroki wybór produktów. Warto podjechać i porozmawiać ze sprzedawcą.'},
    {name:'Beata S.', city:'Wołczyn', text:'Pomoc przy wyborze sprzętu była bardzo wartościowa. Wszystko bez pośpiechu i z wyjaśnieniem.'},
    {name:'Andrzej M.', city:'Dobrodzień', text:'Zakup lodówki przebiegł zgodnie z oczekiwaniami. Obsługa bardzo pomocna.'},
    {name:'Paulina N.', city:'Kochanowice', text:'Profesjonalne podejście, szeroka oferta i bardzo dobry kontakt z klientem.'},
    {name:'Sebastian K.', city:'Pawonków', text:'Miła atmosfera i fachowe doradztwo podczas zakupów. Polecam lokalny sklep.'},
    {name:'Magdalena W.', city:'Kluczbork', text:'Bardzo dobre ceny i duży wybór elektroniki użytkowej. Na pewno wrócę.'},
    {name:'Wojciech B.', city:'Olesno', text:'Obsługa na wysokim poziomie. Pomogli dobrać sprzęt i wytłumaczyli najważniejsze funkcje.'},
    {name:'Katarzyna L.', city:'Praszka', text:'Zakup przebiegł szybko, a obsługa była bardzo pomocna i cierpliwa.'},
    {name:'Mateusz G.', city:'Gorzów Śląski', text:'Duży wybór sprzętu i fachowe doradztwo. Dobra alternatywa dla dużych marketów.'},
    {name:'Agnieszka T.', city:'Rudniki', text:'Profesjonalna obsługa i przyjazna atmosfera. Wszystko wyjaśnione jasno.'},
    {name:'Daniel P.', city:'Byczyna', text:'Sklep godny polecenia. Szybko, konkretnie i bez niepotrzebnego zamieszania.'},
    {name:'Sylwia R.', city:'Radłów', text:'Bardzo dobra jakość obsługi oraz atrakcyjne ceny. Polecam zakupy w ELKASS.'},
    {name:'Paweł M.', city:'Zębowice', text:'Zakupy przebiegły sprawnie. Dostałem pomoc w wyborze sprzętu do mieszkania.'},
    {name:'Renata K.', city:'Lasowice Wielkie', text:'Pomoc przy wyborze sprzętu była bardzo wartościowa. Polecam za cierpliwość i wiedzę.'}
  ];

  const reviewsGrid = document.getElementById('reviews-grid');
  let reviewIndex = 0;
  function visibleReviewCount() { if (window.innerWidth <= 720) return 1; if (window.innerWidth <= 1100) return 3; return 5; }
  function renderReviews() {
    if (!reviewsGrid) return;
    const count = visibleReviewCount();
    reviewsGrid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const review = opinions[(reviewIndex + i) % opinions.length];
      const card = document.createElement('article');
      card.className = 'review-card';
      card.innerHTML = `<div class="review-stars">★★★★★</div><p class="review-text">${review.text}</p><div class="review-author">${review.name}</div><div class="review-location">${review.city}</div>`;
      reviewsGrid.appendChild(card);
    }
  }
  renderReviews();
  setInterval(() => { reviewIndex = (reviewIndex + visibleReviewCount()) % opinions.length; renderReviews(); }, 5000);
  window.addEventListener('resize', renderReviews);

  // WOW9: wyszukiwarka, hit tygodnia, bestsellery, licznik promocji
  const searchInput = document.getElementById('productSearch');
  const searchResults = document.getElementById('searchResults');

  function productCardSmall(product){
    return `<a class="search-result" href="${productUrl(product)}">
      <img src="${product.img}" alt="${product.name}">
      <div><b>${product.name}</b><span>${formatPrice(product.price)}</span></div>
    </a>`;
  }

  function runSearch(){
    if(!searchInput || !searchResults) return;
    const q = searchInput.value.trim().toLowerCase();
    if(q.length < 2){ searchResults.classList.remove('active'); searchResults.innerHTML=''; return; }
    const results = (data.products || defaultProducts).filter(p =>
      `${p.name} ${p.category} ${p.subcategory} ${(p.features||[]).join(' ')}`.toLowerCase().includes(q)
    ).slice(0,8);
    searchResults.classList.add('active');
    searchResults.innerHTML = results.length ? results.map(productCardSmall).join('') : '<div class="search-empty">Brak wyników. Zadzwoń — sprawdzimy dostępność w sklepie.</div>';
  }
  if(searchInput) searchInput.addEventListener('input', runSearch);

  // WOW13: 5 hitów tygodnia, każdy z osobnym żywym licznikiem
  const hitName = document.getElementById('hitName');
  const hitPrice = document.getElementById('hitPrice');
  const hitDesc = document.getElementById('hitDesc');
  const hitImage = document.getElementById('hitImage');
  const hitDiscount = document.getElementById('hitDiscount');
  const dealMiniList = document.getElementById('dealMiniList');

  const weeklyDealSource = productList();
  const weeklyDeals = [
    { id:'deal-tv', product: weeklyDealSource.find(p => p.id === 'p5') || weeklyDealSource[0], label:'HIT TYGODNIA', durationMs:(2*24*60*60 + 7*60*60 + 15*60 + 12) * 1000 },
    { id:'deal-lodowka', product: weeklyDealSource.find(p => p.id === 'p1') || weeklyDealSource[1], label:'OKAZJA AGD', durationMs:(4*24*60*60 + 3*60*60 + 42*60 + 8) * 1000 },
    { id:'deal-pralka', product: weeklyDealSource.find(p => p.id === 'p2') || weeklyDealSource[2], label:'RATY 0%', durationMs:(1*24*60*60 + 18*60*60 + 9*60 + 55) * 1000 },
    { id:'deal-ekspres', product: weeklyDealSource.find(p => p.id === 'p12') || weeklyDealSource[3], label:'PREMIUM DEAL', durationMs:(5*24*60*60 + 11*60*60 + 24*60 + 33) * 1000 },
    { id:'deal-smartfon', product: weeklyDealSource.find(p => p.id === 'p8') || weeklyDealSource[4], label:'HIT CENOWY', durationMs:(0*24*60*60 + 23*60*60 + 36*60 + 17) * 1000 }
  ].filter(item => item.product);

  const DEAL_DEADLINES_KEY = 'elkassDealDeadlinesWOW13';

  function getDealDeadlines(){
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(DEAL_DEADLINES_KEY) || '{}') || {}; }
    catch(e){ saved = {}; }
    const now = Date.now();
    weeklyDeals.forEach(deal => {
      if(!saved[deal.id] || Number(saved[deal.id]) <= now){
        saved[deal.id] = now + deal.durationMs;
      }
    });
    localStorage.setItem(DEAL_DEADLINES_KEY, JSON.stringify(saved));
    return saved;
  }

  let dealDeadlines = getDealDeadlines();
  let activeDealIndex = 0;

  function timeParts(ms){
    let diff = Math.max(0, ms);
    const d = Math.floor(diff / 86400000); diff -= d * 86400000;
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    return {d,h,m,s};
  }

  function dealTimeLeft(deal){
    const now = Date.now();
    if(!dealDeadlines[deal.id] || Number(dealDeadlines[deal.id]) <= now){
      dealDeadlines[deal.id] = now + deal.durationMs;
      localStorage.setItem(DEAL_DEADLINES_KEY, JSON.stringify(dealDeadlines));
    }
    return Number(dealDeadlines[deal.id]) - now;
  }

  function renderMainDeal(){
    if(!hitName || !hitPrice || !weeklyDeals.length) return;
    const deal = weeklyDeals[activeDealIndex % weeklyDeals.length];
    const p = deal.product;
    const discount = stableDiscount(p);
    hitName.textContent = p.name;
    hitPrice.textContent = formatPrice(p.price);
    if(hitDesc) hitDesc.textContent = `${deal.label} • ${p.category || 'RTV/AGD'} • ${(p.features || []).slice(0,3).join(' • ')}`;
    if(hitImage){
      hitImage.src = p.img;
      hitImage.alt = p.name;
    }
    if(hitDiscount) hitDiscount.textContent = discount ? `-${discount}%` : 'HIT';
    updateMainCountdown();
    updateMiniDealsActiveState();
  }

  function updateMainCountdown(){
    if(!weeklyDeals.length) return;
    const deal = weeklyDeals[activeDealIndex % weeklyDeals.length];
    const t = timeParts(dealTimeLeft(deal));
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');
    if(cdDays) cdDays.textContent = String(t.d).padStart(2,'0');
    if(cdHours) cdHours.textContent = String(t.h).padStart(2,'0');
    if(cdMinutes) cdMinutes.textContent = String(t.m).padStart(2,'0');
    if(cdSeconds) cdSeconds.textContent = String(t.s).padStart(2,'0');
  }

  function renderMiniDeals(){
    if(!dealMiniList || !weeklyDeals.length) return;
    dealMiniList.innerHTML = weeklyDeals.map((deal, index) => {
      const p = deal.product;
      const discount = stableDiscount(p);
      const t = timeParts(dealTimeLeft(deal));
      return `<button class="deal-mini-card ${index === activeDealIndex ? 'active' : ''}" data-deal-index="${index}" type="button">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span>${deal.label}</span>
        <strong>${p.name}</strong>
        <small>${discount ? '-' + discount + '% • ' : ''}${String(t.d).padStart(2,'0')}d ${String(t.h).padStart(2,'0')}h ${String(t.m).padStart(2,'0')}m ${String(t.s).padStart(2,'0')}s</small>
      </button>`;
    }).join('');
    dealMiniList.querySelectorAll('[data-deal-index]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeDealIndex = Number(btn.dataset.dealIndex || 0);
        renderMainDeal();
        renderMiniDeals();
      });
    });
  }

  function updateMiniDealsCountdowns(){
    if(!dealMiniList || !weeklyDeals.length) return;
    const buttons = dealMiniList.querySelectorAll('.deal-mini-card');
    buttons.forEach((btn, index) => {
      const deal = weeklyDeals[index];
      if(!deal) return;
      const p = deal.product;
      const discount = stableDiscount(p);
      const t = timeParts(dealTimeLeft(deal));
      const small = btn.querySelector('small');
      if(small) small.textContent = `${discount ? '-' + discount + '% • ' : ''}${String(t.d).padStart(2,'0')}d ${String(t.h).padStart(2,'0')}h ${String(t.m).padStart(2,'0')}m ${String(t.s).padStart(2,'0')}s`;
    });
  }

  function updateMiniDealsActiveState(){
    if(!dealMiniList) return;
    dealMiniList.querySelectorAll('.deal-mini-card').forEach((btn, index) => {
      btn.classList.toggle('active', index === activeDealIndex);
    });
  }

  renderMainDeal();
  renderMiniDeals();

  window.setInterval(() => {
    activeDealIndex = (activeDealIndex + 1) % weeklyDeals.length;
    renderMainDeal();
    renderMiniDeals();
  }, 7000);

  window.setInterval(() => {
    updateMainCountdown();
    updateMiniDealsCountdowns();
  }, 1000);

});


// WOW19: Galeria ELKASS - podgląd zdjęć
(function(){
  const cards=document.querySelectorAll('[data-gallery-src]');
  const box=document.getElementById('galleryLightbox');
  const img=document.getElementById('galleryLightboxImg');
  const caption=document.getElementById('galleryLightboxCaption');
  const close=document.getElementById('galleryClose');
  if(!cards.length||!box||!img||!caption) return;
  function openGallery(src,title){img.src=src;caption.textContent=title||'Galeria ELKASS';box.classList.add('active');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
  function closeGallery(){box.classList.remove('active');box.setAttribute('aria-hidden','true');document.body.style.overflow='';setTimeout(()=>{img.src=''},160)}
  cards.forEach(card=>card.addEventListener('click',()=>openGallery(card.dataset.gallerySrc,card.dataset.galleryTitle)));
  if(close) close.addEventListener('click',closeGallery);
  box.addEventListener('click',e=>{if(e.target===box) closeGallery()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box.classList.contains('active')) closeGallery()});
})();
