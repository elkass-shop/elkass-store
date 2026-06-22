(function(){
function normalize(t){return ({'black-week':'black',default:'standard'}[t]||t||'standard')}
function get(){try{return normalize(JSON.parse(localStorage.getItem('elkassSeasonalTheme')||'{}').theme)}catch(e){return 'standard'}}
function run(){document.documentElement.setAttribute('data-elkass-season',get());let l=document.querySelector('.seasonal-wow-layer-final');if(!l){l=document.createElement('div');l.className='seasonal-wow-layer-final';document.body.appendChild(l)}}
document.addEventListener('DOMContentLoaded',run);
window.addEventListener('storage',run);
})();