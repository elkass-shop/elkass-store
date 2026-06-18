
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
    {id:'c1', name:'RTV', description:'Telewizory, audio, akcesoria', img:'assets/rtv.jpg', subcategories:[{name:'Telewizory', description:'Smart TV i ekrany 4K'}, {name:'Audio', description:'Soundbary i kino domowe'}]},
    {id:'c2', name:'AGD', description:'Lodówki, pralki, piekarniki', img:'assets/agd.jpg', subcategories:[{name:'Lodówki', description:'No Frost i duże pojemności'}, {name:'Pralki', description:'Pralki ładowane od frontu'}]},
    {id:'c3', name:'Komputery', description:'Laptopy, komputery, peryferia', img:'assets/komputery.jpg', subcategories:[{name:'Laptopy', description:'Do pracy i nauki'}, {name:'Monitory', description:'Gaming i biuro'}]},
    {id:'c4', name:'Telefony', description:'Smartfony i akcesoria', img:'assets/telefony.jpg', subcategories:[{name:'Smartfony', description:'Android i akcesoria'}, {name:'Tablety', description:'Do domu i szkoły'}]},
    {id:'c5', name:'Audio', description:'Głośniki, soundbary, słuchawki', img:'assets/audio.jpg', subcategories:[{name:'Słuchawki', description:'Bluetooth i ANC'}, {name:'Głośniki', description:'Domowe i przenośne'}]},
    {id:'c6', name:'Serwis', description:'Pomoc techniczna po zakupie', img:'assets/gaming.jpg', subcategories:[{name:'Wsparcie', description:'Konfiguracja i pomoc'}, {name:'Doradztwo', description:'Dobór sprzętu'}]}
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

  const data = getData();
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const topBtn = document.getElementById('topBtn');

  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  }

  const categoriesGrid = document.getElementById('categories-grid');
  function renderCategories() {
    if (!categoriesGrid) return;
    categoriesGrid.innerHTML = '';
    data.categories.forEach(cat => {
      const sub = (cat.subcategories || []).slice(0, 3).map(s => `<span>${s.name}</span>`).join('');
      const card = document.createElement('article');
      card.className = 'category-card';
      card.innerHTML = `
        <img src="${cat.img}" alt="${cat.name}" loading="lazy">
        <div>
          <h3>${cat.name}</h3>
          <p>${cat.description || ''}</p>
          <div class="subcategory-pills">${sub}</div>
        </div>
      `;
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
    const list = (data.products || []).filter(p => p.visible !== false && p.promo !== false);
    return list.length ? list : defaultProducts;
  }

  function renderProducts() {
    if (!productsGrid) return;
    const list = productList();
    const count = visibleProductCount();
    productsGrid.classList.add('is-changing');
    window.setTimeout(() => {
      productsGrid.innerHTML = '';
      for (let i = 0; i < count; i++) {
        const product = list[(productIndex + i) % list.length];
        const discount = stableDiscount(product);
        const price = Number(product.price || 0);
        const oldPrice = discount ? Math.round(price / (1 - discount / 100)) : price;
        const features = Array.isArray(product.features) ? product.features : String(product.features || '').split('\n').filter(Boolean);
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="product-badge">${product.badge || 'PROMOCJA'}</div>
          ${discount ? `<div class="discount">-${discount}%</div>` : ''}
          <div class="product-image"><img src="${product.img}" alt="${product.name}" loading="lazy"></div>
          <h3>${product.name}</h3>
          <ul class="features">${features.map(item => `<li>• ${item}</li>`).join('')}</ul>
          <div class="price"><strong>${formatPrice(price)}</strong>${discount ? `<del>${formatPrice(oldPrice)}</del>` : ''}</div>
        `;
        productsGrid.appendChild(card);
      }
      productsGrid.classList.remove('is-changing');
    }, 160);
  }

  function startProductRotation() {
    if (productTimer) window.clearInterval(productTimer);
    productTimer = window.setInterval(() => {
      productIndex = (productIndex + visibleProductCount()) % productList().length;
      renderProducts();
    }, 5000);
  }

  renderProducts();
  startProductRotation();
  window.addEventListener('resize', () => { renderProducts(); startProductRotation(); });

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
    return `<a class="search-result" href="#kontakt">
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

  const hitName = document.getElementById('hitName');
  const hitPrice = document.getElementById('hitPrice');
  const hitDesc = document.getElementById('hitDesc');
  const hitImage = document.getElementById('hitImage');
  const hitDiscount = document.getElementById('hitDiscount');
  const hitProducts = productList().filter(p => /hit|nowość|promocja/i.test(p.badge || '')).slice(0,8);
  let hitIndex = 0;
  function renderHit(){
    if(!hitName || !hitPrice || !hitProducts.length) return;
    const p = hitProducts[hitIndex % hitProducts.length];
    const discount = stableDiscount(p);
    hitName.textContent = p.name;
    hitPrice.textContent = formatPrice(p.price);
    if(hitDesc) hitDesc.textContent = `${p.category || 'RTV/AGD'} • ${(p.features || []).slice(0,3).join(' • ')}`;
    if(hitImage) hitImage.src = p.img;
    if(hitDiscount) hitDiscount.textContent = discount ? `-${discount}%` : 'HIT';
    hitIndex++;
  }
  renderHit();
  setInterval(renderHit, 7000);

  const bestGrid = document.getElementById('bestsellers-grid');
  function renderBestSellers(){
    if(!bestGrid) return;
    const best = productList().slice(4,10);
    bestGrid.innerHTML = best.map((p,i)=>`<article class="bestseller-card">
      <div class="bestseller-tag">TOP ${i+1}</div>
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="bestseller-stars">★★★★★ 4.${8 - (i%2)}</div>
      <h3>${p.name}</h3>
      <div class="bestseller-price">${formatPrice(p.price)}</div>
    </article>`).join('');
  }
  renderBestSellers();

  function updateCountdown(){
    const now = new Date();
    const end = new Date();
    end.setDate(now.getDate() + (7 - now.getDay()));
    end.setHours(23,59,59,999);
    let diff = Math.max(0, end - now);
    const d = Math.floor(diff / 86400000); diff -= d*86400000;
    const h = Math.floor(diff / 3600000); diff -= h*3600000;
    const m = Math.floor(diff / 60000);
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    if(cdDays) cdDays.textContent = String(d).padStart(2,'0');
    if(cdHours) cdHours.textContent = String(h).padStart(2,'0');
    if(cdMinutes) cdMinutes.textContent = String(m).padStart(2,'0');
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);

});
