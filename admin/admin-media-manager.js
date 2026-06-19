/* ELKASS WOW45 Media Manager — statyczny moduł gotowy pod Firebase/Supabase Storage */
(function(){
  const MEDIA_KEY = 'elkass_media_library_v45';
  const MAX_IMAGE_SIZE = 1600;
  const PRODUCT_SIZE = 900;
  const QUALITY = 0.86;
  let current = null;

  const $ = (id)=>document.getElementById(id);
  const slugify = (str)=>String(str||'obraz')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'obraz';

  function loadLibrary(){
    try{return JSON.parse(localStorage.getItem(MEDIA_KEY)||'[]')}catch(e){return []}
  }
  function saveLibrary(items){
    localStorage.setItem(MEDIA_KEY, JSON.stringify(items.slice(0,80)));
    renderLibrary();
  }
  function setInfo(text){ if($('media-info')) $('media-info').innerHTML=text; }
  function bytes(n){
    if(!n) return '0 KB';
    if(n<1024*1024) return Math.round(n/1024)+' KB';
    return (n/(1024*1024)).toFixed(2)+' MB';
  }
  function targetFolder(type){
    return ({products:'assets/products',gallery:'assets/gallery',banners:'assets/banners',hero:'assets',logos:'assets/logos',categories:'assets/categories'}[type] || 'assets/media');
  }
  function targetAspect(type){
    return ({products:'1:1',gallery:'4:3',banners:'16:6',hero:'16:9',logos:'logo',categories:'4:3'}[type] || 'auto');
  }
  function extFor(type, originalType){
    if(originalType==='image/svg+xml') return 'svg';
    return type==='logos' ? 'png' : 'webp';
  }
  function outputPath(type, slug, ext){
    const folder = targetFolder(type);
    if(type==='hero') return `${folder}/${slug}.${ext}`;
    return `${folder}/${slug}.${ext}`;
  }
  function setPreview(src){
    const img=$('media-preview'), box=document.querySelector('.media-preview-shell');
    if(!img||!box) return;
    img.src=src; box.classList.add('has-image');
  }
  function dataURLSize(dataUrl){
    const b64 = String(dataUrl).split(',')[1]||'';
    return Math.round((b64.length*3)/4);
  }
  function readFileAsDataURL(file){
    return new Promise((resolve,reject)=>{const r=new FileReader(); r.onload=()=>resolve(r.result); r.onerror=reject; r.readAsDataURL(file);});
  }
  function loadImage(src){
    return new Promise((resolve,reject)=>{const img=new Image(); img.onload=()=>resolve(img); img.onerror=reject; img.src=src;});
  }
  async function optimizeRaster(file, type, dataUrl){
    const img = await loadImage(dataUrl);
    let targetW = img.naturalWidth, targetH = img.naturalHeight;
    const max = type==='products' ? PRODUCT_SIZE : MAX_IMAGE_SIZE;
    const ratio = Math.min(1, max / Math.max(targetW,targetH));
    targetW = Math.round(targetW*ratio);
    targetH = Math.round(targetH*ratio);
    const canvas = document.createElement('canvas');
    canvas.width = targetW; canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img,0,0,targetW,targetH);
    const mime = type==='logos' ? 'image/png' : 'image/webp';
    const out = canvas.toDataURL(mime, QUALITY);
    return {url:out,width:targetW,height:targetH,size:dataURLSize(out),mime};
  }
  async function prepareMedia(){
    const input=$('media-file');
    const file=input?.files?.[0];
    if(!file) return alert('Wybierz plik graficzny.');
    const allowed=['image/jpeg','image/jpg','image/png','image/webp','image/avif','image/svg+xml'];
    if(!allowed.includes(file.type)) return alert('Obsługiwane formaty: JPG, JPEG, PNG, WEBP, AVIF, SVG.');
    const type=$('media-type').value;
    let slug = slugify($('media-slug').value || file.name.replace(/\.[^.]+$/,''));
    const raw = await readFileAsDataURL(file);
    let prepared;
    if(file.type==='image/svg+xml'){
      prepared = {url:raw,width:'SVG',height:'vector',size:file.size,mime:file.type};
    }else{
      prepared = await optimizeRaster(file,type,raw);
    }
    const ext = extFor(type,file.type);
    const path = outputPath(type,slug,ext);
    current = {id:'m'+Date.now(),name:file.name,slug,type,path,aspect:targetAspect(type),originalType:file.type,originalSize:file.size,...prepared,createdAt:new Date().toISOString()};
    $('media-output-path').value=path;
    $('media-output-url').value=current.url;
    $('media-download').disabled=false;
    $('media-copy-path').disabled=false;
    setPreview(current.url);
    setInfo(`<strong>Przygotowano:</strong> ${file.name}<br>Format: ${file.type || 'nieznany'} → ${current.mime}<br>Rozmiar: ${bytes(file.size)} → ${bytes(current.size)}<br>Wymiary: ${current.width} × ${current.height}<br>Docelowo: <code>${path}</code>`);
    const lib=loadLibrary();
    lib.unshift(current);
    saveLibrary(lib);
  }
  function downloadCurrent(){
    if(!current) return;
    const a=document.createElement('a');
    a.href=current.url; a.download=current.path.split('/').pop(); a.click();
  }
  async function copyPath(){
    if(!current) return;
    try{await navigator.clipboard.writeText(current.path); alert('Skopiowano ścieżkę: '+current.path)}catch(e){$('media-output-path').select(); document.execCommand('copy'); alert('Skopiowano ścieżkę.')}
  }
  function activate(tab){
    document.querySelector(`.tab[data-tab="${tab}"]`)?.click();
  }
  function useUrl(kind){
    if(!current) return alert('Najpierw przygotuj obraz.');
    const value = current.url; // w wersji statycznej działa od razu; po wdrożeniu storage zamienimy na current.path
    if(kind==='product'){$('product-img').value=value; $('product-name').value=$('product-name').value || current.slug.replace(/-/g,' '); window.updateProductPreview?.(); activate('products');}
    if(kind==='gallery'){$('gallery-img').value=value; $('gallery-title').value=$('gallery-title').value || current.slug.replace(/-/g,' '); window.updateGalleryPreview?.(); activate('gallery');}
    if(kind==='hero'){$('home-hero-img').value=value; activate('homepage');}
    if(kind==='category'){$('category-img').value=value; $('category-name').value=$('category-name').value || current.slug.replace(/-/g,' '); window.updateCategoryPreview?.(); activate('categories');}
    if(kind==='partner'){$('partner-logo').value=value; $('partner-name').value=$('partner-name').value || current.slug.replace(/-/g,' '); activate('partners');}
    if(kind==='banner'){alert('Obraz przygotowany. Skopiuj ścieżkę lub data URL i wstaw w sekcji banerów / kreatora strony.'); activate('banners');}
  }
  function renderLibrary(){
    const box=$('media-library'); if(!box) return;
    const lib=loadLibrary();
    if(!lib.length){box.innerHTML='<div class="admin-note">Biblioteka jest pusta. Dodaj pierwszy obraz w Media Managerze.</div>'; return;}
    box.innerHTML=lib.map(item=>`<div class="media-library-card" data-id="${item.id}"><div class="thumb"><img src="${item.url}" alt=""></div><strong>${item.slug}</strong><small>${item.type} • ${item.aspect}<br>${item.path}<br>${bytes(item.size)}</small><button type="button" data-use="${item.id}">Użyj ponownie</button></div>`).join('');
  }
  function init(){
    if(!$('media-file')) return;
    $('media-file').addEventListener('change', async e=>{
      const file=e.target.files?.[0]; if(!file) return;
      $('media-slug').value = $('media-slug').value || slugify(file.name.replace(/\.[^.]+$/,''));
      const raw=await readFileAsDataURL(file); setPreview(raw);
      setInfo(`<strong>Wybrano:</strong> ${file.name}<br>Typ: ${file.type || 'nieznany'}<br>Rozmiar: ${bytes(file.size)}<br>Kliknij „Przygotuj obraz”, żeby zoptymalizować i dodać do biblioteki.`);
    });
    $('media-optimize').addEventListener('click',prepareMedia);
    $('media-download').addEventListener('click',downloadCurrent);
    $('media-copy-path').addEventListener('click',copyPath);
    $('media-use-product').addEventListener('click',()=>useUrl('product'));
    $('media-use-gallery').addEventListener('click',()=>useUrl('gallery'));
    $('media-use-hero').addEventListener('click',()=>useUrl('hero'));
    $('media-use-category').addEventListener('click',()=>useUrl('category'));
    $('media-use-partner').addEventListener('click',()=>useUrl('partner'));
    $('media-use-banner').addEventListener('click',()=>useUrl('banner'));
    $('media-clear-library').addEventListener('click',()=>{if(confirm('Wyczyścić lokalną bibliotekę mediów?')) saveLibrary([])});
    $('media-library').addEventListener('click',e=>{const btn=e.target.closest('button[data-use]'); if(!btn) return; const item=loadLibrary().find(x=>x.id===btn.dataset.use); if(item){current=item; $('media-output-path').value=item.path; $('media-output-url').value=item.url; setPreview(item.url); $('media-download').disabled=false; $('media-copy-path').disabled=false; setInfo(`<strong>Wybrano z biblioteki:</strong> ${item.slug}<br>Ścieżka: <code>${item.path}</code>`);}});
    renderLibrary();
  }
  document.addEventListener('DOMContentLoaded',init);
})();
