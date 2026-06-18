document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  const topBtn = document.getElementById('topBtn');

  if (burger && nav) {
    burger.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
  }

  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => revealObserver.observe(el));

  window.addEventListener('scroll', () => {
    if (!topBtn) return;
    topBtn.classList.toggle('show', window.scrollY > 500);
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
