(function(){
const labels={standard:'',christmas:'🎄 Świąteczna oferta ELKASS',black:'⚫ Black Week w ELKASS',cyber:'💻 Cyber Week w ELKASS',easter:'🐣 Wielkanocne promocje',spring:'🌸 Wiosenne okazje',summer:'☀️ Letnie okazje',autumn:'🍂 Jesienne promocje',winter:'❄️ Zimowa oferta'};
function theme(){
  try{const x=JSON.parse(localStorage.getItem('elkassSeasonalTheme')||'{}');return ({'black-week':'black',default:'standard'}[x.theme]||x.theme||'standard')}catch(e){return 'standard'}
}
function ensure(){
 const t=theme(); document.documentElement.setAttribute('data-season-54',t);
 let layer=document.querySelector('.seasonal-wow-layer-54'); if(!layer){layer=document.createElement('div');layer.className='seasonal-wow-layer-54';document.body.appendChild(layer)}
 let badge=document.querySelector('.seasonal-wow-badge-54'); if(!badge){badge=document.createElement('div');badge.className='seasonal-wow-badge-54';document.body.appendChild(badge)}
 badge.textContent=labels[t]||'';
}
document.addEventListener('DOMContentLoaded',ensure);
window.addEventListener('storage',ensure);
})();