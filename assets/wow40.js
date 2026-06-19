/* ELKASS WOW40 Final Boss — front-end enhancements */
(function(){
  const DATA_KEY='elkassAdminData';
  const COMPARE_KEY='elkassCompareProducts';
  const FALLBACK_PRODUCTS=[
    {id:'p1',name:'Lodówka TCL RP318BXE2',category:'AGD',subcategory:'Lodówki',price:1699,img:'assets/products/product-01-lodowka-tcl.jpg',features:['No Frost','Multi Air Flow','Pojemna chłodziarka'],availability:'Dostępny w sklepie',promoType:'hit-week',promoLabel:'HIT TYGODNIA',customDiscount:15,discountMode:'custom'},
    {id:'p2',name:'Pralka BEKO WUE7636XOA',category:'AGD',subcategory:'Pralki',price:1349,img:'assets/products/product-02-pralka-beko.jpg',features:['7 kg załadunku','1200 obr./min','Program szybki'],availability:'Dostępny w sklepie',promoType:'agd-deal',promoLabel:'OKAZJA AGD',discountMode:'random'},
    {id:'p5',name:'Telewizor Samsung 55” 4K UHD',category:'RTV',subcategory:'Telewizory',price:2299,img:'assets/products/product-05-telewizor-samsung.jpg',features:['Smart TV','HDR','Krystaliczny obraz'],availability:'Dostępny w sklepie',promoType:'black-friday',promoLabel:'BLACK FRIDAY',customDiscount:20,discountMode:'custom'},
    {id:'p7',name:'Laptop Lenovo IdeaPad 15',category:'Komputery',subcategory:'Laptopy',price:2499,img:'assets/products/product-07-laptop-lenovo.jpg',features:['Intel Core i5','SSD 512 GB','15,6 cala'],availability:'Na zamówienie',promoType:'premium-deal',promoLabel:'PREMIUM DEAL',discountMode:'random'}
  ];
  function getData(){try{const d=JSON.parse(localStorage.getItem(DATA_KEY)||'null'); if(d&&Array.isArray(d.products))return d;}catch(e){} return {products:FALLBACK_PRODUCTS,categories:[]};}
  function getProducts(){return (getData().products||FALLBACK_PRODUCTS).filter(p=>p.visible!==false)}
  function price(v){return new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN',minimumFractionDigits:2}).format(Number(v||0));}
  function discount(p){
    if(!p) return 0;
    const mode=p.discountMode||'random';
    if(mode==='none') return 0;
    if(mode==='custom') return Math.max(0,Math.min(90,Number(p.customDiscount||0)));
    let s=String(p.id||p.name||'x'), sum=0; for(let i=0;i<s.length;i++)sum+=s.charCodeAt(i)*(i+7);
    return 5+(sum%21);
  }
  function oldPrice(p){const d=discount(p), pr=Number(p.price||0); return d?Math.round(pr/(1-d/100)):pr;}
  function compareIds(){try{return JSON.parse(localStorage.getItem(COMPARE_KEY)||'[]')}catch(e){return[]}}
  function setCompareIds(ids){localStorage.setItem(COMPARE_KEY,JSON.stringify([...new Set(ids)].slice(0,4))); renderTray();}
  function productIdFromCard(card){const a=card.querySelector('a[href*="product.html?id="]'); if(!a)return null; return new URL(a.href,location.href).searchParams.get('id');}
  function enhanceCards(){
    document.querySelectorAll('.product-card,.bestseller-card').forEach(card=>{
      if(card.dataset.compareReady)return;
      const id=productIdFromCard(card); if(!id)return;
      card.dataset.compareReady='1';
      const btn=document.createElement('button'); btn.type='button'; btn.className='compare-mini-btn'; btn.textContent='☑ Porównaj';
      btn.addEventListener('click',e=>{e.preventDefault();e.stopPropagation(); const ids=compareIds(); if(ids.includes(id)) setCompareIds(ids.filter(x=>x!==id)); else setCompareIds([...ids,id]); btn.classList.toggle('active');});
      card.appendChild(btn);
    });
  }
  function renderTray(){
    let tray=document.getElementById('compareTray');
    const ids=compareIds();
    if(!tray){tray=document.createElement('div');tray.id='compareTray';tray.className='compare-tray';document.body.appendChild(tray);}
    if(!ids.length){tray.classList.remove('show');tray.innerHTML='';return;}
    tray.classList.add('show');
    tray.innerHTML=`<strong>Porównywarka</strong><span>${ids.length}/4 produkty</span><a href="compare.html">Porównaj teraz</a><button type="button" id="clearCompare">×</button>`;
    tray.querySelector('#clearCompare').onclick=()=>setCompareIds([]);
  }
  function renderComparePage(){
    const box=document.getElementById('comparePage'); if(!box)return;
    const products=getProducts(); const ids=compareIds(); const chosen=ids.map(id=>products.find(p=>String(p.id)===String(id))).filter(Boolean);
    if(!chosen.length){box.innerHTML='<div class="empty-products"><strong>Nie wybrano produktów do porównania.</strong><span>Wróć do oferty i kliknij „Porównaj” przy wybranych produktach.</span><a class="btn btn-primary small" href="index.html#promocje">Wróć do produktów</a></div>'; return;}
    const rows=[['Kategoria',p=>p.category||'-'],['Podkategoria',p=>p.subcategory||'-'],['Cena promocyjna',p=>price(p.price)],['Cena przed rabatem',p=>discount(p)?price(oldPrice(p)):'-'],['Rabat',p=>discount(p)?'-'+discount(p)+'%':'-'],['Dostępność',p=>p.availability||'Dostępny w sklepie'],['Cechy',p=>(Array.isArray(p.features)?p.features:String(p.features||'').split('\n')).slice(0,4).join(', ')]];
    box.innerHTML=`<div class="compare-table-wrap"><table class="compare-table"><thead><tr><th>Cecha</th>${chosen.map(p=>`<th><img src="${p.img}" alt=""><strong>${p.name}</strong></th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td>${chosen.map(p=>`<td>${r[1](p)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function renderPromotionsPage(){
    const box=document.getElementById('promotionsPage'); if(!box)return;
    const products=getProducts().filter(p=>(p.promo!==false)&&(p.promoType&&p.promoType!=='none'||p.badge||p.promoLabel));
    const filters=['Wszystkie','Hit dnia','Hit tygodnia','Black Friday','Okazja AGD','Premium Deal'];
    box.innerHTML=`<div class="promo-filter-row">${filters.map((f,i)=>`<button class="promo-filter ${i===0?'active':''}" data-filter="${f}">${f}</button>`).join('')}</div><div class="products-grid cms-promo-grid" id="promoPageGrid"></div>`;
    const grid=box.querySelector('#promoPageGrid');
    function draw(f='Wszystkie'){
      box.querySelectorAll('.promo-filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===f));
      const list=f==='Wszystkie'?products:products.filter(p=>String(p.promoLabel||p.badge||p.promoType||'').toLowerCase().includes(f.toLowerCase().replace('ó','o'))||String(p.promoLabel||p.badge||'').toLowerCase().includes(f.toLowerCase()));
      grid.innerHTML=list.map(p=>{const d=discount(p);return `<article class="product-card"><a class="product-link-card" href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-badge">${p.promoLabel||p.badge||'PROMOCJA'}</div>${d?`<div class="discount">-${d}%</div>`:''}<div class="product-image"><img src="${p.img}" alt="${p.name}" loading="lazy"></div><span class="product-status available">● ${p.availability||'Dostępny w sklepie'}</span><h3>${p.name}</h3><div class="price"><strong>${price(p.price)}</strong>${d?`<del>${price(oldPrice(p))}</del>`:''}</div></a></article>`}).join('')||'<div class="empty-products">Brak produktów dla wybranego filtra.</div>';
      setTimeout(enhanceCards,40);
    }
    box.querySelectorAll('.promo-filter').forEach(b=>b.onclick=()=>draw(b.dataset.filter)); draw();
  }
  const mo=new MutationObserver(()=>enhanceCards()); mo.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded',()=>{enhanceCards();renderTray();renderComparePage();renderPromotionsPage();});
})();
