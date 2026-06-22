/* ELKASS 6.0.1 — removes floating campaign banner and fixes heading labels */
(function(){
  const labels={
    standard:'',
    christmas:'🎄 Boże Narodzenie',
    mikolajki:'🎅 Mikołajki',
    easter:'🐣 Wielkanoc',
    spring:'🌸 Wiosna',
    summer:'☀️ Lato',
    autumn:'🍂 Jesień',
    winter:'❄️ Zima',
    blackweek:'⚫ Black Week',
    cyberweek:'💻 Cyber Week'
  };

  function getTheme(){
    return document.documentElement.getAttribute('data-elkass-theme60') || 'standard';
  }

  function removeFloating(){
    document.querySelectorAll('.e60-theme-ribbon,.elkass-seasonal-badge').forEach(el=>{
      el.remove();
    });
  }

  function applyLabels(){
    const theme=getTheme();
    const label=labels[theme] || '';
    document.querySelectorAll('.section-title,.section-heading').forEach(h=>{
      if(label) h.setAttribute('data-season-label',label);
      else h.removeAttribute('data-season-label');
    });
  }

  function fixCategories(){
    const grid=document.getElementById('categories-grid') || document.querySelector('[data-category-grid],.category-grid,.elkass57-category-grid');
    if(grid){
      grid.classList.add('elkass60-fixed-categories');
    }
  }

  function run(){
    removeFloating();
    applyLabels();
    fixCategories();
  }

  document.addEventListener('DOMContentLoaded',()=>{run();setTimeout(run,300);setTimeout(run,900)});
  document.addEventListener('elkass:theme60-change',()=>{setTimeout(run,30);setTimeout(run,300)});
  window.addEventListener('storage',()=>setTimeout(run,80));
})();
