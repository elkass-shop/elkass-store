const themes={
 default:{message:'',bg:'#e30613'},
 'black-week':{message:'Black Week w ELKASS — sprawdź aktualne okazje RTV/AGD!',bg:'linear-gradient(135deg,#050505,#ffcc00)'},
 cyber:{message:'Cyber okazje ELKASS — elektronika, RTV i AGD w specjalnej odsłonie!',bg:'linear-gradient(135deg,#07111f,#00e5ff)'},
 christmas:{message:'Świąteczne okazje ELKASS — prezenty, AGD i RTV dla domu!',bg:'linear-gradient(135deg,#064e3b,#d90429)'},
 easter:{message:'Wielkanocne promocje ELKASS — odśwież dom na święta!',bg:'linear-gradient(135deg,#8bc34a,#f59e0b)'},
 summer:{message:'Letnie okazje ELKASS — sprzęt na gorący sezon!',bg:'linear-gradient(135deg,#0284c7,#f97316)'}
};
let selected=JSON.parse(localStorage.getItem('elkassSeasonalTheme')||'{}').theme||'black-week';
function q(s){return document.querySelector(s)}
function setActive(){document.querySelectorAll('[data-theme]').forEach(b=>b.classList.toggle('active',b.dataset.theme===selected))}
function preview(){
 const cfg=themes[selected]||themes.default;
 q('#message').value=q('#message').value||cfg.message||'';
 q('.preview-bar').textContent=q('#message').value||'ELKASS';
 q('.preview-hero').style.background=cfg.bg||'linear-gradient(135deg,#07111f,#e30613)';
 q('.preview-bar').style.background=selected==='default'?'#111827':cfg.bg;
 setActive();
}
document.querySelectorAll('[data-theme]').forEach(b=>b.onclick=()=>{selected=b.dataset.theme;q('#message').value=themes[selected].message||'';preview()});
q('#preview').onclick=preview;
q('#save').onclick=()=>{localStorage.setItem('elkassSeasonalTheme',JSON.stringify({theme:selected,message:q('#message').value,startDate:q('#startDate').value,endDate:q('#endDate').value}));alert('Motyw zapisany. Otwórz stronę i zrób Ctrl+F5. Po Supabase będzie globalny dla wszystkich klientów.')};
q('#reset').onclick=()=>{selected='default';q('#message').value='';localStorage.setItem('elkassSeasonalTheme',JSON.stringify({theme:'default',message:''}));preview();alert('Motyw wyłączony.')};
preview();