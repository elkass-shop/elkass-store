<<<<<<< HEAD
/* ELKASS 5.5.1 — blokuje stare skrypty kategorii i pilnuje premium układu */
=======
/* ELKASS 5.5.0 — blokuje stare skrypty kategorii i pilnuje premium układu */
>>>>>>> 43a82d7383f27c598355a2e0f020d57b601bb753
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
<<<<<<< HEAD
    var imgs=['rtv','agd','agd-zabudowa','male-agd','komputery-telefony','serwis'];
    cards.forEach(function(card,i){
      if(imgs[i]){
        card.style.setProperty('--cat-img', "url('assets/categories/"+imgs[i]+".jpg?v=551')");
        var photo=card.querySelector('.elkass-premium-category-photo');
        if(photo){ photo.style.backgroundImage="url('assets/categories/"+imgs[i]+".jpg?v=551')"; photo.style.opacity='1'; }
      }
    });

=======
>>>>>>> 43a82d7383f27c598355a2e0f020d57b601bb753
  }
  cleanup();
  window.addEventListener('load', cleanup);
  setTimeout(cleanup, 300);
  setTimeout(cleanup, 1000);
})();
