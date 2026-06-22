/* ELKASS 5.5.0 — blokuje stare skrypty kategorii i pilnuje premium układu */
(function(){
  var html = document.getElementById('categories-grid');
  if(!html) return;
  html.dataset.elkassFinalCategories = 'true';
  html.className = 'elkass-premium-categories-grid';
  function cleanup(){
    var grid = document.getElementById('categories-grid');
    if(!grid) return;
    grid.dataset.elkassFinalCategories = 'true';
    grid.className = 'elkass-premium-categories-grid';
    var cards = grid.querySelectorAll('.elkass-premium-category-card');
    if(cards.length !== 6) return;
    cards.forEach(function(card){
      card.classList.remove('category-card','category-clickable','active','elkass544-category-card','elkass-category-wow-card');
      card.style.backgroundColor = '';
      var img = card.querySelector('img');
      if(img) img.remove();
    });
  }
  cleanup();
  window.addEventListener('load', cleanup);
  setTimeout(cleanup, 300);
  setTimeout(cleanup, 1000);
})();
