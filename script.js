document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const topBtn = document.getElementById('topBtn');

  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  }

  // === PROMOCJE / NOWOŚCI ===
  // Tutaj podmieniasz produkty: nazwę, cenę główną, opis i grafikę.
  // Grafiki produktów trzymaj w folderze: assets/products/
  // Pole "price" to cena, którą wpisujesz jako główną. Rabat 5-25% generuje się automatycznie,
  // a cena przekreślona jest wyliczana od tej ceny.
  const products = [
    {badge:'HIT DNIA', img:'assets/products/product-01-lodowka-tcl.jpg', name:'Lodówka TCL RP318BXE2', features:['No Frost','Multi Air Flow','Pojemna chłodziarka'], price:1699},
    {badge:'PROMOCJA', img:'assets/products/product-02-pralka-beko.jpg', name:'Pralka BEKO WUE7636XOA', features:['7 kg załadunku','1200 obr./min','Program szybki'], price:1349},
    {badge:'PROMOCJA', img:'assets/products/product-03-chlodziarka-amica.jpg', name:'Chłodziarka Amica FM170.4', features:['122 l pojemności','3 półki','Komora FreshZone'], price:899},
    {badge:'HIT DNIA', img:'assets/products/product-04-piekarnik-samsung.jpg', name:'Piekarnik Samsung NV7B44305AK', features:['Dual Cook','Air Fry','Prowadnice teleskopowe'], price:1799},

    {badge:'NOWOŚĆ', img:'assets/products/product-05-telewizor-samsung.jpg', name:'Telewizor Samsung 55” 4K UHD', features:['Smart TV','HDR','Krystaliczny obraz'], price:2299},
    {badge:'PROMOCJA', img:'assets/products/product-06-soundbar-lg.jpg', name:'Soundbar LG S60Q', features:['Bluetooth','Mocny bas','HDMI ARC'], price:899},
    {badge:'PROMOCJA', img:'assets/products/product-07-laptop-lenovo.jpg', name:'Laptop Lenovo IdeaPad 15', features:['Intel Core i5','SSD 512 GB','15,6 cala'], price:2499},
    {badge:'HIT CENOWY', img:'assets/products/product-08-smartfon-samsung.jpg', name:'Smartfon Samsung Galaxy A35', features:['Ekran AMOLED','Aparat 50 MP','Duża bateria'], price:1399},

    {badge:'PROMOCJA', img:'assets/products/product-09-odkurzacz-bosch.jpg', name:'Odkurzacz Bosch Serie 4', features:['Duża moc ssania','Cicha praca','Filtr HEPA'], price:649},
    {badge:'NOWOŚĆ', img:'assets/products/product-10-zmywarka-bosch.jpg', name:'Zmywarka Bosch 60 cm', features:['EcoSilence Drive','AquaStop','Pojemne kosze'], price:2199},
    {badge:'PROMOCJA', img:'assets/products/product-11-mikrofala-amica.jpg', name:'Kuchenka mikrofalowa Amica', features:['20 l pojemności','Grill','Szybkie podgrzewanie'], price:399},
    {badge:'HIT DNIA', img:'assets/products/product-12-ekspres-philips.jpg', name:'Ekspres Philips LatteGo', features:['Kawa ziarnista','Spienianie mleka','Łatwe czyszczenie'], price:1999},

    {badge:'PROMOCJA', img:'assets/products/product-13-zamrazarka-kernau.jpg', name:'Zamrażarka Kernau KFUF 17153', features:['No Frost','Pojemne szuflady','Cicha praca'], price:1799},
    {badge:'NOWOŚĆ', img:'assets/products/product-14-pralka-philco.jpg', name:'Pralka Philco PLD 106EPL', features:['6 kg załadunku','Programy szybkie','Klasa ekonomiczna'], price:1149},
    {badge:'PROMOCJA', img:'assets/products/product-15-robot-sprzatajacy.jpg', name:'Robot sprzątający Sencor', features:['Mapa pomieszczeń','Sterowanie aplikacją','Mopowanie'], price:999},
    {badge:'HIT CENOWY', img:'assets/products/product-16-lodowka-lg.jpg', name:'Lodówka LG No Frost', features:['Total No Frost','DoorCooling','Cicha praca'], price:2699},

    {badge:'PROMOCJA', img:'assets/products/product-17-monitor-gaming.jpg', name:'Monitor gamingowy 27”', features:['165 Hz','IPS','Niski czas reakcji'], price:999},
    {badge:'NOWOŚĆ', img:'assets/products/product-18-sluchawki-sony.jpg', name:'Słuchawki bezprzewodowe Sony', features:['ANC','Długi czas pracy','Czyste brzmienie'], price:599},
    {badge:'PROMOCJA', img:'assets/products/product-19-tablet-lenovo.jpg', name:'Tablet Lenovo Tab M10', features:['10,1 cala','Wi-Fi','Dla domu i szkoły'], price:749},
    {badge:'HIT DNIA', img:'assets/products/product-20-plyta-indukcyjna.jpg', name:'Płyta indukcyjna Bosch', features:['4 pola grzewcze','PowerBoost','Sterowanie dotykowe'], price:1499}
  ];

  function randomDiscount() {
    return Math.floor(Math.random() * 21) + 5; // 5-25%
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  }

  const productsWithDiscounts = products.map(product => {
    const discount = randomDiscount();
    const oldPrice = Math.round(product.price / (1 - discount / 100));
    return { ...product, discount, oldPrice };
  });

  const productsGrid = document.getElementById('products-grid');
  let productIndex = 0;
  let productTimer = null;

  function visibleProductCount() {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 4;
  }

  function renderProducts() {
    if (!productsGrid) return;
    const count = visibleProductCount();
    productsGrid.classList.add('is-changing');

    window.setTimeout(() => {
      productsGrid.innerHTML = '';

      for (let i = 0; i < count; i++) {
        const product = productsWithDiscounts[(productIndex + i) % productsWithDiscounts.length];
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="product-badge">${product.badge}</div>
          <div class="discount">-${product.discount}%</div>
          <div class="product-image"><img src="${product.img}" alt="${product.name}" loading="lazy"></div>
          <h3>${product.name}</h3>
          <ul class="features">${product.features.map(item => `<li>• ${item}</li>`).join('')}</ul>
          <div class="price"><strong>${formatPrice(product.price)}</strong><del>${formatPrice(product.oldPrice)}</del></div>
        `;
        productsGrid.appendChild(card);
      }

      productsGrid.classList.remove('is-changing');
    }, 160);
  }

  function startProductRotation() {
    if (productTimer) window.clearInterval(productTimer);
    productTimer = window.setInterval(() => {
      productIndex = (productIndex + visibleProductCount()) % productsWithDiscounts.length;
      renderProducts();
    }, 5000);
  }

  renderProducts();
  startProductRotation();
  window.addEventListener('resize', () => {
    renderProducts();
    startProductRotation();
  });

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.14 });
  revealElements.forEach(el => revealObserver.observe(el));

  window.addEventListener('scroll', () => {
    if (!topBtn) return;
    topBtn.classList.toggle('show', window.scrollY > 480);
  });
  if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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
    {name:'Renata K.', city:'Lasowice Wielkie', text:'Pomoc przy wyborze sprzętu była bardzo wartościowa. Polecam za cierpliwość i wiedzę.'},
    {name:'Marcin D.', city:'Wołczyn', text:'Szeroka oferta i profesjonalne podejście do klienta. Dobry lokalny sklep.'},
    {name:'Joanna B.', city:'Lubliniec', text:'Polecam za fachową pomoc i dużą wiedzę pracowników. Sprzęt działa bez zarzutu.'},
    {name:'Rafał W.', city:'Kochanowice', text:'Kupowałem telewizor i jestem bardzo zadowolony z zakupu oraz doradztwa.'},
    {name:'Ewelina S.', city:'Dobrodzień', text:'Miła obsługa i szybka realizacja zamówienia. Wszystko zgodnie z ustaleniami.'},
    {name:'Adrian K.', city:'Pawonków', text:'Profesjonalizm i duży wybór sprzętu w jednym miejscu. Polecam.'},
    {name:'Martyna P.', city:'Praszka', text:'Zakupy przebiegły bezproblemowo. Obsługa pomogła wybrać najlepszy model.'},
    {name:'Mariusz J.', city:'Olesno', text:'Bardzo dobre ceny i szeroki wybór produktów. Warto sprawdzić ofertę lokalnie.'},
    {name:'Dorota G.', city:'Dobrodzień', text:'Świetna obsługa klienta i fachowe doradztwo przy wyborze AGD.'},
    {name:'Jakub N.', city:'Praszka', text:'Duży wybór elektroniki oraz szybka realizacja zamówień. Polecam.'},
    {name:'Izabela T.', city:'Kluczbork', text:'Bardzo pomocna obsługa oraz atrakcyjne promocje. Zakup udany.'},
    {name:'Grzegorz P.', city:'Rudniki', text:'Wysoka jakość obsługi i duża wiedza pracowników. Wszystko konkretnie wyjaśnione.'},
    {name:'Elżbieta M.', city:'Gorzów Śląski', text:'Od wielu lat korzystam z oferty sklepu i zawsze jestem zadowolona.'},
    {name:'Kamil S.', city:'Radłów', text:'Zakup sprzętu przebiegł szybko i profesjonalnie. Dobre doradztwo.'},
    {name:'Aleksandra W.', city:'Zębowice', text:'Polecam za profesjonalne podejście do klienta i przyjazną obsługę.'},
    {name:'Norbert D.', city:'Lasowice Wielkie', text:'Bardzo dobra obsługa i szeroki wybór produktów. Dobre miejsce na zakupy RTV AGD.'},
    {name:'Teresa K.', city:'Byczyna', text:'Świetne miejsce na zakup sprzętu RTV i AGD. Fachowa pomoc i dobre ceny.'},
    {name:'Patryk B.', city:'Wołczyn', text:'Profesjonalna pomoc przy wyborze sprzętu do domu. Wszystko przebiegło sprawnie.'},
    {name:'Weronika L.', city:'Lubliniec', text:'Bardzo miła obsługa i atrakcyjne ceny. Warto sprawdzić przed zakupem.'},
    {name:'Arkadiusz R.', city:'Pawonków', text:'Polecam za fachowe doradztwo i szybką realizację. Dobry kontakt.'},
    {name:'Natalia Z.', city:'Kochanowice', text:'Duży wybór produktów oraz profesjonalna obsługa klienta.'}
  ];

  const reviewsGrid = document.getElementById('reviews-grid');
  let reviewIndex = 0;

  function visibleReviewCount() {
    if (window.innerWidth <= 720) return 1;
    if (window.innerWidth <= 1100) return 3;
    return 5;
  }

  function renderReviews() {
    if (!reviewsGrid) return;
    const count = visibleReviewCount();
    reviewsGrid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const review = opinions[(reviewIndex + i) % opinions.length];
      const card = document.createElement('article');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-stars">★★★★★</div>
        <p class="review-text">${review.text}</p>
        <div class="review-author">${review.name}</div>
        <div class="review-location">${review.city}</div>
      `;
      reviewsGrid.appendChild(card);
    }
  }

  renderReviews();
  setInterval(() => {
    reviewIndex = (reviewIndex + visibleReviewCount()) % opinions.length;
    renderReviews();
  }, 5000);
  window.addEventListener('resize', renderReviews);
});
