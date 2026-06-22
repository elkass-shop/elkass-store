/* ELKASS ENTERPRISE 6.0 WOW THEME REBUILD */
(function(){
  const KEY='elkassTheme60';
  const LEGACY56='elkassSeasonalTheme56';
  const LEGACY='elkassSeasonalTheme';

  const themes={
    standard:{label:'Standard',badge:''},
    christmas:{label:'Boże Narodzenie',badge:'🎄 Świąteczna kampania ELKASS'},
    mikolajki:{label:'Mikołajki',badge:'🎅 Pomysły na prezent w ELKASS'},
    easter:{label:'Wielkanoc',badge:'🐣 Wielkanocne okazje RTV/AGD'},
    spring:{label:'Wiosna',badge:'🌸 Wiosenne odświeżenie domu'},
    summer:{label:'Lato',badge:'☀️ Letnie okazje w ELKASS'},
    autumn:{label:'Jesień',badge:'🍂 Jesienne promocje do domu'},
    winter:{label:'Zima',badge:'❄️ Zimowa oferta RTV/AGD'},
    blackweek:{label:'Black Week',badge:'⚫ Black Week — okazje premium'},
    cyberweek:{label:'Cyber Week',badge:'💻 Cyber Week — technologia w promocji'}
  };

  function normalize(t){
    if(!t) return 'standard';
    const map={default:'standard',black:'blackweek','black-week':'blackweek',cyber:'cyberweek'};
    return map[t] || t;
  }

  function read(){
    try{
      const raw=localStorage.getItem(KEY);
      if(raw) return normalize(JSON.parse(raw).theme || raw);
    }catch(e){}
    try{
      const raw56=localStorage.getItem(LEGACY56);
      if(raw56) return normalize(JSON.parse(raw56).theme || raw56);
    }catch(e){}
    try{
      const raw=localStorage.getItem(LEGACY);
      if(raw) return normalize(JSON.parse(raw).theme || raw);
    }catch(e){}
    return 'standard';
  }

  function save(theme){
    theme=normalize(theme);
    const payload=JSON.stringify({theme,updatedAt:new Date().toISOString(),version:'6.0'});
    localStorage.setItem(KEY,payload);
    localStorage.setItem(LEGACY56,payload);
    localStorage.setItem(LEGACY,payload);
    apply(theme);
  }

  function ensureDom(){
    let layer=document.querySelector('.e60-theme-layer');
    if(!layer){
      layer=document.createElement('div');
      layer.className='e60-theme-layer';
      document.body.appendChild(layer);
    }
    let ribbon=document.querySelector('.e60-theme-ribbon');
    if(!ribbon){
      ribbon=document.createElement('div');
      ribbon.className='e60-theme-ribbon';
      document.body.appendChild(ribbon);
    }
    return {layer,ribbon};
  }

  function apply(theme){
    theme=normalize(theme);
    if(!themes[theme]) theme='standard';
    document.documentElement.setAttribute('data-elkass-theme60',theme);
    document.documentElement.setAttribute('data-elkass-season',theme);
    const dom=ensureDom();
    dom.ribbon.textContent=themes[theme].badge || '';
    dom.ribbon.setAttribute('aria-label','Aktywny motyw ELKASS: '+themes[theme].label);
    document.dispatchEvent(new CustomEvent('elkass:theme60-change',{detail:{theme,label:themes[theme].label,badge:themes[theme].badge}}));
  }

  function buildPanel(){
    const holder=document.querySelector('[data-theme60-panel]');
    if(!holder) return;
    holder.innerHTML=Object.entries(themes).map(([key,t])=>{
      const icon=t.badge ? t.badge.split(' ')[0] : '🏠';
      return `<button type="button" class="theme60-btn" data-theme="${key}"><span>${icon}</span><strong>${t.label}</strong><em>${t.badge || 'Klasyczny wygląd strony'}</em></button>`;
    }).join('');
    const active=read();
    holder.querySelectorAll('[data-theme]').forEach(btn=>{
      btn.classList.toggle('active',btn.dataset.theme===active);
      btn.addEventListener('click',()=>{
        save(btn.dataset.theme);
        holder.querySelectorAll('[data-theme]').forEach(b=>b.classList.toggle('active',b.dataset.theme===btn.dataset.theme));
      });
    });
  }

  document.addEventListener('DOMContentLoaded',()=>{
    apply(read());
    buildPanel();
  });

  window.ELKASS_THEME_60={get:read,set:save,themes};
})();
