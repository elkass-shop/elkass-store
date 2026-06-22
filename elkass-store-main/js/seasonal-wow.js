/* ELKASS ENTERPRISE 5.0 — Seasonal WOW layer */
(function(){
  function ensureLayer(){
    let layer=document.querySelector('.seasonal-wow-layer');
    if(!layer){
      layer=document.createElement('div');
      layer.className='seasonal-wow-layer';
      document.body.appendChild(layer);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ensureLayer); else ensureLayer();
})();
