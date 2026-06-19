(function(){
  const DEFAULT_LAYOUT = [
    {id:'hero',name:'Hero premium',desc:'Główna sekcja z hasłem, zdjęciem i CTA',enabled:true},
    {id:'search',name:'Szybkie wyszukiwanie',desc:'Pole wyszukiwania produktów i kategorii',enabled:true},
    {id:'promotions',name:'Nowości i promocje',desc:'Karuzela ofert oraz etykiety promocyjne',enabled:true},
    {id:'categories',name:'Najpopularniejsze kategorie',desc:'Kafle kategorii i podkategorii',enabled:true},
    {id:'featured',name:'Najczęściej wybierane',desc:'Produkty polecane klientom',enabled:true},
    {id:'local',name:'Kupujesz lokalnie',desc:'Dlaczego ELKASS Olesno',enabled:true},
    {id:'reviews',name:'Opinie klientów',desc:'Opinie z Olesna i okolic',enabled:true},
    {id:'gallery',name:'Podgląd galerii',desc:'Krótki odnośnik do galerii ELKASS',enabled:true},
    {id:'partners',name:'Nasi partnerzy',desc:'Slider marek i logotypów',enabled:true},
    {id:'contact',name:'Kontakt',desc:'Telefon, adres, e-mail i godziny',enabled:true}
  ];
  const KEY='elkassBuilderLayout';
  const get=()=>{try{return JSON.parse(localStorage.getItem(KEY))||DEFAULT_LAYOUT}catch(e){return DEFAULT_LAYOUT}};
  const set=(v)=>localStorage.setItem(KEY,JSON.stringify(v));
  function activate(tab){ if(typeof window.activateTab==='function') return window.activateTab(tab); document.querySelectorAll('.tab,.tab-panel').forEach(x=>x.classList.remove('active')); document.querySelector(`.tab[data-tab="${tab}"]`)?.classList.add('active'); document.getElementById(tab)?.classList.add('active'); }
  function render(){
    const box=document.getElementById('builder-layout-list'); if(!box)return;
    const layout=get();
    box.innerHTML=layout.map((s,i)=>`<div class="builder-row" data-id="${s.id}"><div class="handle">${i+1}</div><div><strong>${s.name}</strong><small>${s.desc}</small></div><div class="builder-actions"><button data-move="up" ${i===0?'disabled':''}>↑</button><button data-move="down" ${i===layout.length-1?'disabled':''}>↓</button><button class="${s.enabled?'active':'off'}" data-toggle="1">${s.enabled?'Włączona':'Wyłączona'}</button><button data-edit="1">Edytuj</button></div></div>`).join('');
  }
  document.addEventListener('click',e=>{
    const add=e.target.closest('[data-builder-add]');
    if(add){ const layout=get(); const name=add.dataset.builderAdd; layout.push({id:'custom-'+Date.now(),name,desc:'Nowa sekcja dodana w panelu',enabled:true}); set(layout); render(); return; }
    const row=e.target.closest('.builder-row'); if(row){
      let layout=get(); const idx=layout.findIndex(x=>x.id===row.dataset.id); if(idx<0)return;
      if(e.target.matches('[data-move="up"]') && idx>0){ [layout[idx-1],layout[idx]]=[layout[idx],layout[idx-1]]; set(layout); render(); }
      if(e.target.matches('[data-move="down"]') && idx<layout.length-1){ [layout[idx+1],layout[idx]]=[layout[idx],layout[idx+1]]; set(layout); render(); }
      if(e.target.matches('[data-toggle]')){ layout[idx].enabled=!layout[idx].enabled; set(layout); render(); }
      if(e.target.matches('[data-edit]')){ document.getElementById('builder-section-title').value=layout[idx].name; document.getElementById('builder-section-desc').value=layout[idx].desc; window.scrollTo({top:0,behavior:'smooth'}); }
    }
    if(e.target && e.target.id==='builder-reset-layout'){ set(DEFAULT_LAYOUT); render(); }
    if(e.target && e.target.id==='builder-save-draft'){ alert('Szkic sekcji zapisany lokalnie. Po podpięciu chmury będzie zapisywany w bazie.'); }
    if(e.target && e.target.id==='builder-clear-draft'){ ['builder-section-title','builder-section-desc','builder-section-img'].forEach(id=>{const el=document.getElementById(id); if(el)el.value='';}); }
  });
  document.addEventListener('DOMContentLoaded',render);
})();
