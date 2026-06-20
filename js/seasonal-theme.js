(function(){
  const DEFAULTS={
    default:{label:'',message:''},
    'black-week':{label:'Black Week',message:'Black Week w ELKASS — sprawdź aktualne okazje RTV/AGD!'},
    cyber:{label:'Cyber Week',message:'Cyber okazje ELKASS — elektronika, RTV i AGD w specjalnej odsłonie!'},
    christmas:{label:'Święta Bożego Narodzenia',message:'Świąteczne okazje ELKASS — prezenty, AGD i RTV dla domu!'},
    easter:{label:'Wielkanoc',message:'Wielkanocne promocje ELKASS — odśwież dom na święta!'},
    summer:{label:'Lato',message:'Letnie okazje ELKASS — sprzęt na gorący sezon!'}
  };
  function read(){
    try{return JSON.parse(localStorage.getItem('elkassSeasonalTheme')||'{}')}catch(e){return {}}
  }
  function apply(){
    const cfg=read();
    const theme=cfg.theme||'default';
    document.documentElement.setAttribute('data-elkass-theme',theme);
    let bar=document.querySelector('.seasonal-bar');
    if(!bar){
      bar=document.createElement('div');
      bar.className='seasonal-bar';
      document.body.insertBefore(bar,document.body.firstChild);
    }
    const msg=cfg.message || (DEFAULTS[theme]&&DEFAULTS[theme].message) || '';
    bar.textContent=msg;
    let corner=document.querySelector('.seasonal-corner-badge'); if(!corner){corner=document.createElement('div'); corner.className='seasonal-corner-badge'; document.body.appendChild(corner);} let conf=document.querySelector('.season-confetti');
    if(!conf){
      conf=document.createElement('div');
      conf.className='season-confetti';
      document.body.appendChild(conf);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply); else apply();
  window.ELKASS_applySeasonalTheme=apply;
})();