(function(){
  const ACCOUNT_KEY='elkassSuperAdminAccount';
  const CMS_KEY='elkassFullCmsV42';
  const DEFAULT_ACCOUNT={login:'admin',password:'admin',email:'elkass@wp.pl'};
  const sectionLabels={search:'Szybkie wyszukiwanie',hero:'Hero',trust:'Pasek zaufania',deals:'Hity tygodnia',products:'Nowości i promocje',categories:'Kategorie',bestsellers:'Najczęściej wybierane',reviews:'Opinie',local:'Kupujesz lokalnie',gallery:'Galeria',about:'O firmie',contact:'Kontakt',partners:'Partnerzy'};
  const $=id=>document.getElementById(id);
  function toast(msg){let n=document.getElementById('cms-toast');if(!n){n=document.createElement('div');n.id='cms-toast';n.className='cms-toast';document.body.appendChild(n)}n.textContent=msg;n.classList.add('show');setTimeout(()=>n.classList.remove('show'),1800)}
  function account(){try{return {...DEFAULT_ACCOUNT,...JSON.parse(localStorage.getItem(ACCOUNT_KEY)||'{}')}}catch(e){return DEFAULT_ACCOUNT}}
  function saveAccount(data){localStorage.setItem(ACCOUNT_KEY,JSON.stringify({...account(),...data}))}
  function cms(){try{return JSON.parse(localStorage.getItem(CMS_KEY)||'{}')}catch(e){return {}}}
  function saveCms(data){localStorage.setItem(CMS_KEY,JSON.stringify(data))}
  function fillAccount(){const a=account(); if($('superadmin-login')) $('superadmin-login').value=a.login; if($('superadmin-email')) $('superadmin-email').value=a.email||'elkass@wp.pl'}
  function renderSections(){const box=$('superadmin-sections'); if(!box)return; const data=cms(); const sections={...Object.fromEntries(Object.keys(sectionLabels).map(k=>[k,true])),...(data.sections||{})}; box.innerHTML=Object.entries(sectionLabels).map(([key,label])=>`<label class="superadmin-section-item"><input type="checkbox" data-super-section="${key}" ${sections[key]!==false?'checked':''}> ${label}</label>`).join('')}
  function bind(){
    const save=$('superadmin-save-account'); if(save) save.onclick=()=>{const pass=$('superadmin-password').value; const pass2=$('superadmin-password-repeat').value; if(pass||pass2){if(pass.length<5)return alert('Hasło musi mieć minimum 5 znaków.'); if(pass!==pass2)return alert('Hasła nie są takie same.')} saveAccount({login:$('superadmin-login').value||'admin',email:$('superadmin-email').value||'elkass@wp.pl',...(pass?{password:pass}:{})}); $('superadmin-password').value=''; $('superadmin-password-repeat').value=''; toast('Zapisano konto administratora');};
    const reset=$('superadmin-reset-email'); if(reset) reset.onclick=()=>{const email=($('superadmin-email')?.value||'elkass@wp.pl'); window.location.href=`mailto:${email}?subject=Reset%20has%C5%82a%20ELKASS%20CMS&body=Prosz%C4%99%20o%20reset%20has%C5%82a%20do%20panelu%20ELKASS%20CMS.%0A%0AProdukcja:%20podpi%C4%99cie%20Supabase/Firebase%20Auth.`};
    const forgot=$('forgot-password'); if(forgot) forgot.onclick=()=>{const email=account().email||'elkass@wp.pl'; window.location.href=`mailto:${email}?subject=Reset%20has%C5%82a%20ELKASS%20CMS&body=Prosz%C4%99%20o%20reset%20has%C5%82a%20do%20panelu%20ELKASS%20CMS.`};
    const saveSections=$('superadmin-save-sections'); if(saveSections) saveSections.onclick=()=>{const data=cms(); const sections=data.sections||{}; document.querySelectorAll('[data-super-section]').forEach(ch=>sections[ch.dataset.superSection]=ch.checked); data.sections=sections; saveCms(data); toast('Zapisano widoczność sekcji');};
  }
  document.addEventListener('DOMContentLoaded',()=>{fillAccount();renderSections();bind()});
})();