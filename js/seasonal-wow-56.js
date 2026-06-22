/* ELKASS ENTERPRISE 5.6 — SEASONAL WOW FULL INTEGRATION */
(function(){
  const STORAGE_KEY='elkassSeasonalTheme56';
  const LEGACY_KEY='elkassSeasonalTheme';

  const seasons={
    standard:{label:'Standard',badge:''},
    christmas:{label:'Boże Narodzenie',badge:'🎄 Świąteczna oferta ELKASS'},
    mikolajki:{label:'Mikołajki',badge:'🎅 Pomysły na prezent'},
    easter:{label:'Wielkanoc',badge:'🐣 Wielkanocne okazje'},
    spring:{label:'Wiosna',badge:'🌸 Wiosenne promocje'},
    summer:{label:'Lato',badge:'☀️ Letnie okazje'},
    autumn:{label:'Jesień',badge:'🍂 Jesienne promocje'},
    winter:{label:'Zima',badge:'❄️ Zimowa oferta'},
    blackweek:{label:'Black Week',badge:'⚫ Black Week w ELKASS'},
    cyberweek:{label:'Cyber Week',badge:'💻 Cyber Week w ELKASS'}
  };

  function normalize(t){
    if(!t) return 'standard';
    const map={
      default:'standard',
      black:'blackweek',
      'black-week':'blackweek',
      cyber:'cyberweek',
      christmas:'christmas',
      mikolajki:'mikolajki',
      easter:'easter',
      spring:'spring',
      summer:'summer',
      autumn:'autumn',
      winter:'winter'
    };
    return map[t] || t;
  }

  function read(){
    try{
      const raw=localStorage.getItem(STORAGE_KEY);
      if(raw) return normalize(JSON.parse(raw).theme || raw);
    }catch(e){}
    try{
      const legacy=JSON.parse(localStorage.getItem(LEGACY_KEY)||'{}');
      return normalize(legacy.theme);
    }catch(e){}
    return 'standard';
  }

  function write(theme){
    theme=normalize(theme);
    localStorage.setItem(STORAGE_KEY,JSON.stringify({theme,updatedAt:new Date().toISOString()}));
    localStorage.setItem(LEGACY_KEY,JSON.stringify({theme,updatedAt:new Date().toISOString()}));
    apply(theme);
  }

  function ensureDom(){
    let layer=document.querySelector('.elkass-seasonal-layer');
    if(!layer){
      layer=document.createElement('div');
      layer.className='elkass-seasonal-layer';
      document.body.appendChild(layer);
    }
    let badge=document.querySelector('.elkass-seasonal-badge');
    if(!badge){
      badge=document.createElement('div');
      badge.className='elkass-seasonal-badge';
      document.body.appendChild(badge);
    }
    return {layer,badge};
  }

  function apply(theme){
    theme=normalize(theme);
    if(!seasons[theme]) theme='standard';
    document.documentElement.setAttribute('data-elkass-season',theme);
    const {badge}=ensureDom();
    badge.textContent=seasons[theme].badge || '';
    badge.setAttribute('aria-label','Aktywny motyw: '+seasons[theme].label);
    document.dispatchEvent(new CustomEvent('elkass:season-change',{detail:{theme,label:seasons[theme].label}}));
  }

  function buildPanel(){
    const holder=document.querySelector('[data-seasonal-wow-panel]');
    if(!holder) return;
    holder.innerHTML=Object.entries(seasons).map(([key,s])=>`
      <button type="button" class="season-btn" data-theme="${key}">
        <span>${key==='standard'?'🏠':s.badge.split(' ')[0]}</span>
        <strong>${s.label}</strong>
      </button>
    `).join('');
    holder.querySelectorAll('[data-theme]').forEach(btn=>{
      btn.addEventListener('click',()=>{
        write(btn.dataset.theme);
        holder.querySelectorAll('[data-theme]').forEach(b=>b.classList.toggle('active',b.dataset.theme===btn.dataset.theme));
      });
    });
    const active=read();
    holder.querySelectorAll('[data-theme]').forEach(b=>b.classList.toggle('active',b.dataset.theme===active));
  }

  document.addEventListener('DOMContentLoaded',()=>{
    apply(read());
    buildPanel();
  });

  window.ELKASS_SEASONAL_WOW_56={set:write,get:read,seasons};
})();
