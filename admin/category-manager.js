const DEFAULT=[
{name:'RTV',desc:'Telewizory, soundbary, kino domowe',img:'assets/categories/rtv.jpg',subs:['Telewizory','Soundbary','Audio']},
{name:'AGD',desc:'Lodówki, pralki, zmywarki',img:'assets/categories/agd.jpg',subs:['Lodówki','Pralki','Zmywarki']},
{name:'AGD do zabudowy',desc:'Piekarniki, płyty, okapy',img:'assets/categories/agd-zabudowa.jpg',subs:['Piekarniki','Płyty','Okapy']},
{name:'Małe AGD',desc:'Ekspresy, odkurzacze, żelazka',img:'assets/categories/male-agd.jpg',subs:['Ekspresy','Odkurzacze','Żelazka']},
{name:'Komputery i telefony',desc:'Laptopy, smartfony, akcesoria',img:'assets/categories/komputery-telefony.jpg',subs:['Laptopy','Smartfony','Akcesoria']},
{name:'Serwis i doradztwo',desc:'Pomoc, konfiguracja, fachowe wsparcie',img:'assets/categories/serwis.jpg',subs:['Wsparcie','Konfiguracja','Doradztwo']}
];
let data=(()=>{try{const cms=JSON.parse(localStorage.getItem('elkassCmsData')||'{}');return cms.categoryTiles||DEFAULT}catch(e){return DEFAULT}})();
function render(){
 document.getElementById('catEditor').innerHTML=data.map((c,i)=>`<div class="cat-row">
 <div class="thumb"><img src="${c.img}" onerror="this.src='https://placehold.co/400x300?text=ELKASS'"></div>
 <div class="fields">
  <label>Nazwa<input value="${c.name||''}" oninput="data[${i}].name=this.value"></label>
  <label>Opis<input value="${c.desc||''}" oninput="data[${i}].desc=this.value"></label>
  <label>Podkategorie — wpisz dowolną liczbę, kafel pokaże 3<textarea oninput="data[${i}].subs=this.value.split('\\n').filter(Boolean)">${(c.subs||[]).join('\n')}</textarea></label>
  <label>Ścieżka zdjęcia<input value="${c.img||''}" oninput="data[${i}].img=this.value;render()"></label>
  <label class="upload">📷 Dodaj zdjęcie z komputera<input type="file" accept="image/*" onchange="uploadCatImage(event,${i})"></label>
  <div class="note">Obsługa JPG, PNG, WEBP, GIF, SVG. Zdjęcie zostanie dopasowane do kafla.</div>
 </div></div>`).join('');
}
function uploadCatImage(ev,i){
 const file=ev.target.files[0]; if(!file)return;
 const reader=new FileReader();
 reader.onload=e=>{data[i].img=e.target.result;render()};
 reader.readAsDataURL(file);
}
document.getElementById('saveAll').onclick=()=>{
 const cms=JSON.parse(localStorage.getItem('elkassCmsData')||'{}');
 cms.categoryTiles=data;
 localStorage.setItem('elkassCmsData',JSON.stringify(cms));
 alert('Kategorie zapisane. Otwórz stronę główną i zrób Ctrl+F5.');
};
render();