// ELKASS Enterprise 2.1 — optional admin link injector
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const targets = document.querySelectorAll('.admin-menu,.sidebar,.eps-sidebar,nav');
    targets.forEach(nav=>{
      if(!nav.querySelector('[href*="product-link-import"]')){
        const a=document.createElement('a');
        a.href='product-link-import.html';
        a.textContent='🤖 Dodaj ze strony';
        a.className='admin-link product-link-import-link';
        nav.appendChild(a);
      }
    });
  });
})();
