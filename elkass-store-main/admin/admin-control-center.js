
(function(){
  const $ = (id)=>document.getElementById(id);
  const modules = [
    {key:'produkt', title:'Produkty', desc:'Nazwy, ceny, zdjęcia, opisy, promocje, dostępność', tab:'products'},
    {key:'cena rabat promocja hit dnia hit tygodnia black friday', title:'Promocje', desc:'Etykiety promocji, rabaty, liczniki i karuzele', tab:'promotions'},
    {key:'kategoria podkategoria menu rtv agd telefony audio', title:'Kategorie i podkategorie', desc:'Struktura sklepu, grafiki i opisy kategorii', tab:'categories'},
    {key:'hero baner strona główna lokalny sklep tekst zdjęcie', title:'Strona główna', desc:'Hero, opisy, zdjęcia i sekcje główne', tab:'homepage'},
    {key:'sekcja kolejność włącz wyłącz kreator', title:'Kreator strony', desc:'Sekcje strony i przygotowanie pod page builder', tab:'builder'},
    {key:'banner grafika sezon promocja slider', title:'Banery', desc:'Banery promocyjne i przyciski', tab:'banners'},
    {key:'media zdjęcie obraz webp jpg png avif svg logo', title:'Media Manager', desc:'Przygotowanie zdjęć i ścieżek do użycia', tab:'media'},
    {key:'galeria salon zdjęcia sklep ekspozycja', title:'Galeria ELKASS', desc:'Zdjęcia sklepu i podpisy galerii', tab:'gallery'},
    {key:'partner logo samsung lg sony bosch amica', title:'Partnerzy', desc:'Logotypy marek i slider partnerów', tab:'partners'},
    {key:'opinia klient gwiazdki miasto olesno dobrodzień', title:'Opinie', desc:'Opinie klientów i miejscowości', tab:'reviews'},
    {key:'kontakt telefon email adres godziny mapa', title:'Kontakt', desc:'Dane sklepu, mapa i godziny otwarcia', tab:'contact'},
    {key:'seo google tytuł opis meta elkass olesno', title:'SEO', desc:'Ustawienia pod Google i elkass.pl', tab:'seo'},
    {key:'administrator hasło email reset superadmin konto', title:'Superadmin', desc:'Konto administratora i ustawienia bezpieczeństwa', tab:'superadmin'}
  ];
  function activate(tab){
    if(typeof window.activateTab === 'function') return window.activateTab(tab);
    document.querySelectorAll('.tab,.tab-panel').forEach(x=>x.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${tab}"]`)?.classList.add('active');
    document.getElementById(tab)?.classList.add('active');
  }
  function render(q=''){
    const box=$('control-search-results'); if(!box) return;
    const words=q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const list = !words.length ? modules.slice(0,6) : modules.filter(m=>words.every(w=>(m.key+' '+m.title+' '+m.desc).toLowerCase().includes(w)));
    box.innerHTML = list.map(m=>`<div class="control-result"><div><strong>${m.title}</strong><small>${m.desc}</small></div><button type="button" data-open-tab="${m.tab}">Otwórz</button></div>`).join('') || '<div class="control-result"><div><strong>Brak wyniku</strong><small>Spróbuj wpisać krótsze hasło, np. produkt, cena, hero, kontakt.</small></div></div>';
  }
  document.addEventListener('click',e=>{
    const btn=e.target.closest('[data-open-tab]');
    if(btn) activate(btn.dataset.openTab);
  });
  document.addEventListener('input',e=>{ if(e.target && e.target.id==='control-search') render(e.target.value); });
  document.addEventListener('click',e=>{ if(e.target && e.target.id==='control-search-clear'){ $('control-search').value=''; render(''); }});
  document.addEventListener('DOMContentLoaded',()=>render(''));
})();
