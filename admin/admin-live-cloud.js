(function(){
  const DEFAULT_LAYOUT = [
    {id:'hero',type:'Hero',name:'Hero premium',desc:'Główna sekcja z hasłem, zdjęciem i CTA',img:'assets/hero-wow-v5.png',enabled:true},
    {id:'search',type:'Wyszukiwarka',name:'Szybkie wyszukiwanie',desc:'Pole wyszukiwania produktów i kategorii',img:'',enabled:true},
    {id:'promotions',type:'Promocje',name:'Nowości i promocje',desc:'Karuzela ofert oraz etykiety promocyjne',img:'assets/banners/weekend-sale.jpg',enabled:true},
    {id:'categories',type:'Kategorie',name:'Najpopularniejsze kategorie',desc:'Kafle kategorii i podkategorii',img:'assets/agd.jpg',enabled:true},
    {id:'featured',type:'Produkty',name:'Najczęściej wybierane',desc:'Produkty polecane klientom',img:'',enabled:true},
    {id:'local',type:'Lokalny sklep',name:'Kupujesz lokalnie',desc:'Dlaczego warto kupować w ELKASS Olesno',img:'assets/sklep.jpg',enabled:true},
    {id:'reviews',type:'Opinie',name:'Opinie klientów',desc:'Opinie z Olesna i okolic',img:'',enabled:true},
    {id:'gallery',type:'Galeria',name:'Podgląd galerii',desc:'Krótki odnośnik do galerii ELKASS',img:'assets/gallery/gallery-16-salon-elkass.jpg',enabled:true},
    {id:'partners',type:'Partnerzy',name:'Nasi partnerzy',desc:'Slider marek i logotypów',img:'',enabled:true},
    {id:'contact',type:'Kontakt',name:'Kontakt',desc:'Telefon, adres, e-mail i godziny',img:'',enabled:true}
  ];
  const KEY='elkassBuilderLayout';
  const SELECTED='elkassBuilderSelectedId';
  function getLayout(){
    try{
      const parsed=JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(parsed) && parsed.length ? parsed : structuredClone(DEFAULT_LAYOUT);
    }catch(e){return structuredClone(DEFAULT_LAYOUT)}
  }
  function setLayout(v){
    localStorage.setItem(KEY,JSON.stringify(v));
    window.dispatchEvent(new CustomEvent('elkass:builder-updated',{detail:v}));
  }
  function selectedId(){return localStorage.getItem(SELECTED)||''}
  function setSelected(id){localStorage.setItem(SELECTED,id||'')}
  function uid(name){return String(name||'sekcja').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'-'+Date.now()}
  function byId(id){return document.getElementById(id)}
  function fillForm(section){
    const title=byId('builder-section-title'), desc=byId('builder-section-desc'), img=byId('builder-section-img'), hint=byId('builder-edit-hint');
    if(title) title.value=section?.name||'';
    if(desc) desc.value=section?.desc||'';
    if(img) img.value=section?.img||'';
    if(hint) hint.textContent=section ? `Edytujesz: ${section.name}` : 'Dodajesz nową sekcję.';
  }
  function render(){
    const box=byId('builder-layout-list'); if(!box)return;
    const layout=getLayout(); const active=selectedId();
    box.innerHTML=layout.map((s,i)=>`<div class="builder-row ${s.id===active?'selected':''}" data-id="${s.id}">
      <div class="handle">${i+1}</div>
      <div>
        <strong>${escapeHtml(s.name||'Sekcja')}</strong>
        <small>${escapeHtml(s.desc||'Brak opisu')}</small>
        ${s.img?`<small class="builder-img-path">🖼 ${escapeHtml(s.img)}</small>`:''}
      </div>
      <div class="builder-actions">
        <button data-move="up" ${i===0?'disabled':''}>↑</button>
        <button data-move="down" ${i===layout.length-1?'disabled':''}>↓</button>
        <button class="${s.enabled?'active':'off'}" data-toggle="1">${s.enabled?'Włączona':'Wyłączona'}</button>
        <button data-edit="1">Edytuj</button>
        <button data-delete="1" class="danger-mini">Usuń</button>
      </div>
    </div>`).join('');
    updatePreviewSummary(layout);
  }
  function escapeHtml(v){return String(v??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]))}
  function updatePreviewSummary(layout){
    const existing=byId('builder-live-summary');
    let box=existing;
    const list=byId('builder-layout-list');
    if(!box && list){
      box=document.createElement('div'); box.id='builder-live-summary'; box.className='builder-live-summary'; list.after(box);
    }
    if(box){
      const on=layout.filter(x=>x.enabled).length;
      box.innerHTML=`<strong>Aktywne sekcje:</strong> ${on}/${layout.length}. <span>Zmiany są zapisane lokalnie w przeglądarce i gotowe pod zapis cloud.</span>`;
    }
  }
  function saveForm(){
    let layout=getLayout();
    const title=(byId('builder-section-title')?.value||'').trim();
    const desc=(byId('builder-section-desc')?.value||'').trim();
    const img=(byId('builder-section-img')?.value||'').trim();
    if(!title){ alert('Wpisz nazwę sekcji.'); return; }
    let id=selectedId();
    const idx=layout.findIndex(x=>x.id===id);
    if(idx>=0){
      layout[idx]={...layout[idx],name:title,desc,img};
    }else{
      id=uid(title);
      layout.push({id,type:'Własna sekcja',name:title,desc,img,enabled:true});
      setSelected(id);
    }
    setLayout(layout); render(); toast('Sekcja zapisana.');
  }
  function toast(msg){
    let t=document.querySelector('.cms-toast');
    if(!t){t=document.createElement('div'); t.className='cms-toast'; document.body.appendChild(t)}
    t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2200);
  }
  document.addEventListener('click',e=>{
    const add=e.target.closest('[data-builder-add]');
    if(add){
      const name=add.dataset.builderAdd;
      const item={id:uid(name),type:name,name:name==='Własna sekcja'?'Nowa własna sekcja':name,desc:'Nowa sekcja dodana z panelu',img:'',enabled:true};
      const layout=getLayout(); layout.push(item); setLayout(layout); setSelected(item.id); fillForm(item); render(); return;
    }
    const row=e.target.closest('.builder-row');
    if(row){
      let layout=getLayout(); const idx=layout.findIndex(x=>x.id===row.dataset.id); if(idx<0)return;
      if(e.target.matches('[data-move="up"]') && idx>0){[layout[idx-1],layout[idx]]=[layout[idx],layout[idx-1]];setLayout(layout);render();return;}
      if(e.target.matches('[data-move="down"]') && idx<layout.length-1){[layout[idx+1],layout[idx]]=[layout[idx],layout[idx+1]];setLayout(layout);render();return;}
      if(e.target.matches('[data-toggle]')){layout[idx].enabled=!layout[idx].enabled;setLayout(layout);render();return;}
      if(e.target.matches('[data-edit]')){setSelected(layout[idx].id);fillForm(layout[idx]);render();document.getElementById('live-builder')?.scrollIntoView({behavior:'smooth'});return;}
      if(e.target.matches('[data-delete]')){if(confirm('Usunąć tę sekcję z układu?')){layout.splice(idx,1);setLayout(layout);setSelected('');fillForm(null);render();}return;}
    }
    if(e.target?.id==='builder-reset-layout'){setLayout(structuredClone(DEFAULT_LAYOUT));setSelected('');fillForm(null);render();toast('Przywrócono domyślny układ.');}
    if(e.target?.id==='builder-save-draft'){saveForm();}
    if(e.target?.id==='builder-clear-draft'){setSelected('');fillForm(null);render();}
  });
  document.addEventListener('DOMContentLoaded',()=>{render(); const id=selectedId(); const item=getLayout().find(x=>x.id===id); if(item) fillForm(item);});
})();
