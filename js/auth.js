// ═══ TOAST ═══
function toast(msg, type='info', actionLabel, actionFn, duration=3500) {
  const wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  const icons = {success:'✅',error:'❌',warn:'⚠️',info:'ℹ️'};
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span class="toast-msg">${msg}</span>${actionLabel?`<button class="toast-action">${actionLabel}</button>`:''}`;
  wrap.appendChild(t);
  if (actionLabel && actionFn) t.querySelector('.toast-action').addEventListener('click',()=>{actionFn();t.remove();});
  setTimeout(()=>{t.classList.add('out');setTimeout(()=>t.remove(),300);},duration);
}

// ═══ AUTOSAVE ═══
function triggerAutosave() {
  const dot = document.getElementById('autosaveDot');
  if (!dot) return;
  dot.classList.remove('pulse');
  void dot.offsetWidth;
  dot.classList.add('pulse');
}

// ═══ DELETE WITH UNDO ═══
function deleteDoc(id) {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const idx = S.docs.findIndex(x=>x.id===id);
  if (idx<0) return;
  const removed = S.docs.splice(idx,1)[0];
  save(); render();
  toast(`„${removed.name}" ${L==='en'?'deleted':'gelöscht'}`,'warn',L==='en'?'Undo':'Rückgängig',()=>{S.docs.splice(idx,0,removed);save();render();});
}
function deleteMa(id) {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const idx = S.massnahmen.findIndex(x=>x.id===id);
  if (idx<0) return;
  const removed = S.massnahmen.splice(idx,1)[0];
  save(); render();
  toast(`„${removed.title}" ${L==='en'?'deleted':'gelöscht'}`,'warn',L==='en'?'Undo':'Rückgängig',()=>{S.massnahmen.splice(idx,0,removed);save();render();});
}
function deleteSnap(i) {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const removed = S.history.splice(i,1)[0];
  save(); render();
  toast(L==='en'?'Snapshot deleted':'Snapshot gelöscht','warn',L==='en'?'Undo':'Rückgängig',()=>{S.history.splice(i,0,removed);save();render();});
}

// ═══ EXPORT / IMPORT ═══
function exportData() {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const blob = new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download=`securestay_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click(); URL.revokeObjectURL(url);
  toast(L==='en'?'Backup exported':'Backup exportiert','success');
}
function importData() {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const inp = document.createElement('input');
  inp.type='file'; inp.accept='.json';
  inp.onchange = e => {
    const f=e.target.files[0]; if(!f)return;
    const r=new FileReader();
    r.onload = ev => {
      try {
        const d=JSON.parse(ev.target.result);
        if(!confirm(L==='en'?'Overwrite all current data?':'Alle aktuellen Daten überschreiben?'))return;
        Object.assign(S,d); save(); render();
        toast(L==='en'?'Backup imported':'Backup importiert','success');
      } catch {toast(L==='en'?'Invalid file':'Ungültige Datei','error');}
    };
    r.readAsText(f);
  };
  inp.click();
}

// ═══ KEYBOARD SHORTCUTS ═══
document.addEventListener('keydown', e => {
  if (!sessionStorage.getItem('ssa_sess')) return;
  if (e.key==='Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));
    return;
  }
  const tag=e.target.tagName;
  if (tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT') return;
  if (e.ctrlKey && e.key==='ArrowRight'){e.preventDefault();next();return;}
  if (e.ctrlKey && e.key==='ArrowLeft'){e.preventDefault();prev();return;}
  if (!e.ctrlKey && !e.altKey && !e.metaKey) {
    if (e.key==='1') go('audit');
    else if (e.key==='2') go('database');
    else if (e.key==='3') go('massnahmen');
    else if (e.key==='4') go('dashboard');
    else if (e.key==='5') go('historie');
    else if (e.key==='6') go('admin');
  }
});

// ═══ AUTH ═══
const _USERS = [
  btoa(unescape(encodeURIComponent('Admin\x00TEstpasswort123'))),
  btoa(unescape(encodeURIComponent('Grygoriy.Ogorinskyy\x00TEstpasswort123'))),
  btoa(unescape(encodeURIComponent('Werner.Devosse\x00TEstpasswort123'))),
  btoa(unescape(encodeURIComponent('Mario.Strerath\x00TEstpasswort123!'))),
];
let _loginAttempts = 0;
let _lockoutTimer = null;

function checkAuth() {
  const sess = sessionStorage.getItem('ssa_sess');
  if (sess && _USERS.includes(sess)) {
    const uname = sessionStorage.getItem('ssa_u') || 'Admin';
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('userBadge').style.display = 'flex';
    document.getElementById('userName').textContent = uname;
    document.getElementById('userAvatar').textContent = uname.charAt(0).toUpperCase();
    return true;
  }
  return false;
}

function doLogin() {
  if (_lockoutTimer) return;
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const u = (document.getElementById('li_user').value || '').trim();
  const p = document.getElementById('li_pass').value || '';
  const err = document.getElementById('loginError');
  err.classList.remove('show');
  if (!u || !p) {
    err.textContent = L==='en'?'Please fill in all fields.':'Bitte alle Felder ausfüllen.';
    err.classList.add('show');
    return;
  }
  const h = btoa(unescape(encodeURIComponent(u + '\x00' + p)));
  if (_USERS.includes(h)) {
    _loginAttempts = 0;
    sessionStorage.setItem('ssa_sess', h);
    sessionStorage.setItem('ssa_u', u);
    document.getElementById('loginOverlay').classList.add('hidden');
    document.getElementById('userBadge').style.display = 'flex';
    document.getElementById('userName').textContent = u;
    document.getElementById('userAvatar').textContent = u.charAt(0).toUpperCase();
    render();
  } else {
    _loginAttempts++;
    const card = document.getElementById('loginCard');
    card.classList.add('shake');
    setTimeout(() => card.classList.remove('shake'), 400);
    if (_loginAttempts >= 5) {
      err.classList.remove('show');
      const lockEl = document.getElementById('loginLockout');
      const btn = document.getElementById('loginBtn');
      lockEl.classList.add('show');
      btn.disabled = true;
      let secs = 30;
      lockEl.textContent = L==='en'?`⛔ Too many failed attempts. Please wait ${secs}s.`:`⛔ Zu viele Fehlversuche. Bitte ${secs}s warten.`;
      _lockoutTimer = setInterval(() => {
        secs--;
        lockEl.textContent = L==='en'?`⛔ Too many failed attempts. Please wait ${secs}s.`:`⛔ Zu viele Fehlversuche. Bitte ${secs}s warten.`;
        if (secs <= 0) {
          clearInterval(_lockoutTimer);
          _lockoutTimer = null;
          _loginAttempts = 0;
          lockEl.classList.remove('show');
          btn.disabled = false;
        }
      }, 1000);
    } else {
      const rem = 5 - _loginAttempts;
      err.textContent = L==='en'?`❌ Invalid credentials. (${rem} attempt${rem !== 1 ? 's' : ''} remaining)`:`❌ Ungültige Anmeldedaten. (${rem} Versuch${rem !== 1 ? 'e' : ''} verbleibend)`;
      err.classList.add('show');
    }
  }
}

function doLogout() {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  if (!confirm(L==='en'?'Really sign out?':'Wirklich abmelden?')) return;
  sessionStorage.removeItem('ssa_sess');
  sessionStorage.removeItem('ssa_u');
  _loginAttempts = 0;
  if (_lockoutTimer) { clearInterval(_lockoutTimer); _lockoutTimer = null; }
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('userBadge').style.display = 'none';
  document.getElementById('li_user').value = '';
  document.getElementById('li_pass').value = '';
  document.getElementById('li_pass').type = 'password';
  document.getElementById('eyeBtn').textContent = '👁';
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('loginLockout').classList.remove('show');
  document.getElementById('loginBtn').disabled = false;
}

function togglePw() {
  const inp = document.getElementById('li_pass');
  const btn = document.getElementById('eyeBtn');
  if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '🙈'; }
  else { inp.type = 'password'; btn.textContent = '👁'; }
}

// Init EmailJS if configured
(()=>{const k=localStorage.getItem('ssa_ejs_key');if(k)try{emailjs.init(k);}catch(e){}})();

// ═══ LANGUAGE SYSTEM ═══
let _LANG = localStorage.getItem('ssa_lang')||'de';
function setLoginLang(lang){_LANG=lang;localStorage.setItem('ssa_lang',lang);updateLangUI();}
function toggleLang(){_LANG=_LANG==='de'?'en':'de';localStorage.setItem('ssa_lang',_LANG);updateLangUI();render();}
function updateLangUI(){
  const btn=document.getElementById('langToggleBtn');
  if(btn)btn.textContent=_LANG==='de'?'EN':'DE';
  const nav={audit:_LANG==='en'?'Audit':'Audit',database:_LANG==='en'?'Database':'Datenbank',massnahmen:_LANG==='en'?'Measures':'Maßnahmen',dashboard:'Dashboard',historie:_LANG==='en'?'History':'Historie',admin:_LANG==='en'?'Internal':'Intern'};
  Object.keys(nav).forEach(k=>{const el=document.getElementById('nav_'+k);if(el)el.textContent=nav[k];});
  const ab=document.getElementById('autosaveDot');if(ab)ab.title=_LANG==='en'?'Saved':'Gespeichert';
  // Login form
  const liSub=document.querySelector('.login-sub');
  if(liSub)liSub.textContent=_LANG==='en'?'Audit & Compliance Platform — Please sign in':'Audit & Compliance Platform — Bitte anmelden';
  const liUser=document.getElementById('li_user');
  if(liUser){liUser.placeholder=_LANG==='en'?'Username':'Nutzername';const ul=liUser.closest('.login-field')?.querySelector('label');if(ul)ul.textContent=_LANG==='en'?'Username':'Nutzername';}
  const liPass=document.getElementById('li_pass');
  if(liPass){liPass.placeholder=_LANG==='en'?'Password':'Passwort';const pl=liPass.closest('.login-field')?.querySelector('label');if(pl)pl.textContent=_LANG==='en'?'Password':'Passwort';}
  const liBtn=document.getElementById('loginBtn');
  if(liBtn)liBtn.textContent=_LANG==='en'?'Sign in →':'Anmelden →';
  // Language dropdown sync
  const liLang=document.getElementById('li_lang');
  if(liLang)liLang.value=_LANG;
  // User badge logout label
  const logoutLbl=document.querySelector('.user-logout-lbl');
  if(logoutLbl)logoutLbl.textContent=_LANG==='en'?'Sign out':'Abmelden';
  // User badge title
  const userBadge=document.getElementById('userBadge');
  if(userBadge)userBadge.title=_LANG==='en'?'Sign out':'Abmelden';
}

updateLangUI();
if (checkAuth()){render();}

// ═══ THEME SYSTEM ═══
let _THEME=localStorage.getItem('ssa_theme')||'dark';
function toggleTheme(){_THEME=_THEME==='dark'?'light':'dark';localStorage.setItem('ssa_theme',_THEME);applyTheme();}
function applyTheme(){
  document.documentElement.setAttribute('data-theme',_THEME);
  const btn=document.getElementById('themeToggleBtn');
  if(btn)btn.textContent=_THEME==='dark'?'☀':'☽';
}
applyTheme();
