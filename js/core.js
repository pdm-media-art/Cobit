function go(mode){
  if(mode==='admin'){
    if(!sessionStorage.getItem('ssa_adm')){
      document.getElementById('admLoginOverlay').classList.add('open');
      document.getElementById('adm_user').value='';
      document.getElementById('adm_pass').value='';
      document.getElementById('admLoginError').classList.remove('show');
      setTimeout(()=>document.getElementById('adm_user').focus(),100);
      return;
    }
  }
  S.mode=mode;document.querySelectorAll('.tn').forEach(b=>b.classList.remove('active'));
  const map={audit:0,database:1,massnahmen:2,dashboard:3,historie:4,admin:5};
  document.querySelectorAll('.tn')[map[mode]??0]?.classList.add('active');render();save();
}
function goTo(i){S.step=i;render();scrollTo(0,0);save();}
function next(){const s=getSteps();if(S.step<s.length-1){S.step++;render();scrollTo(0,0);save();}}
function prev(){if(S.step>0){S.step--;render();scrollTo(0,0);save();}}

function render(){
  document.getElementById('auditNav').style.display=(S.mode==='audit')?'':'none';
  if(S.mode==='audit'){const steps=getSteps();renderStepper(steps);renderProgress(steps);const st=steps[S.step];if(!st)return;if(st.id==='module')renderModule();else if(st.id==='norms')renderNorms();else if(st.id==='meta')renderMeta();else if(st.id==='umfeld')renderUmfeld();else if(st.id==='maturity')renderMaturity();else if(st.id==='report')renderReport();else{const c=CK.find(x=>x.id===st.id);if(c)renderCheck(c);}}
  else if(S.mode==='database')renderDB();else if(S.mode==='massnahmen')renderMA();else if(S.mode==='dashboard')renderDash();else if(S.mode==='historie')renderHist();else if(S.mode==='admin')renderAdmin();
  const b=document.getElementById('hdrBadge');
  const bL=typeof _LANG!=='undefined'?_LANG:'de';
  if(S.mode!=='audit'){b.textContent={database:bL==='en'?'Database':'Datenbank',massnahmen:bL==='en'?'Measures':'Maßnahmen',dashboard:'Dashboard',historie:bL==='en'?'History':'Historie',admin:bL==='en'?'Internal':'Intern'}[S.mode]||'';}
  else if(!S.module)b.textContent=bL==='en'?'Select Module':'Modul wählen';
  else b.textContent={security:'Security',qm:'QM',itgov:'IT-Governance',combined:bL==='en'?'Combined':'Kombiniert',religion:bL==='en'?'Religion':'Religion'}[S.module]||'';
}
function renderStepper(steps){document.getElementById('stepper').innerHTML=steps.map((s,i)=>`<div class="step"><button class="step-btn ${i===S.step?'active':''} ${i<S.step?'done':''}" onclick="goTo(${i})"><span class="step-num">${i<S.step?'✓':(i+1)}</span><span class="step-label">${s.l}</span></button><div class="step-line"></div></div>`).join('');}
function renderProgress(steps){document.getElementById('progressFill').style.width=Math.round((S.step/Math.max(steps.length-1,1))*100)+'%';}

// ═══ MODULE ═══
function newAudit(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const hasData=!!(S.module||S.meta.objekt||Object.keys(S.findings||{}).length);
  if(hasData){
    if(!confirm(L==='en'
      ?'Start a new audit?\n\nAll current data (object data, findings, results) will be cleared.\nThe current audit will be saved to History first.'
      :'Neues Audit starten?\n\nAlle aktuellen Daten (Objektdaten, Befunde, Ergebnisse) werden gelöscht.\nDer aktuelle Stand wird zuvor automatisch in der Historie gesichert.'))return;
    // Auto-save snapshot to history
    if(!S.history)S.history=[];
    S.history.unshift({date:new Date().toISOString(),module:S.module,meta:{...S.meta},findings:{...S.findings},maturity:{...S.maturity},norms:[...(S.norms||[])]});
    if(S.history.length>20)S.history.pop();
  }
  // Reset all audit data
  S.module=null;S.norms=[];S.step=0;S.findings={};S.maturity={};S.docs=[];
  S.umfeld={done:false,selectedRadius:S.umfeld?.selectedRadius||1000};
  S.massnahmen=[];S.reportView='begehung';S.editDocId=null;S.editMaId=null;
  const keepMeta={konzeptVersion:'1.0',konzeptStatus:'Entwurf',anzahlGebaeude:'1'};
  Object.keys(S.meta).forEach(k=>S.meta[k]='');
  Object.assign(S.meta,keepMeta);
  save();render();
  if(hasData)toast(L==='en'?'New audit started — previous data saved to History.':'Neues Audit gestartet — vorheriger Stand in der Historie gesichert.','info');
}

function selMod(m){S.module=m;S.norms=[];render();save();}

function renderModule(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const hasData=!!(S.module||S.meta.objekt||Object.keys(S.findings||{}).length);
  document.getElementById('mainContent').innerHTML=`<div class="panel">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:6px">
    <div><div class="panel-title">${L==='en'?'Select Audit Module':'Audit-Modul wählen'}</div>
    <p class="panel-sub" style="margin-bottom:0">${L==='en'?'5 modules available. Use industry templates or select manually.':'5 Module verfügbar. Nutzen Sie Branchenvorlagen oder wählen Sie manuell.'}</p></div>
    ${hasData?`<button class="btn-sm danger" onclick="newAudit()" style="white-space:nowrap;align-self:flex-start">${L==='en'?'+ New Audit':'+ Neues Audit'}</button>`:''}
  </div>
  <div style="font-family:var(--fm);font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:6px">${L==='en'?'Industry Templates':'Branchenvorlagen'}</div>
  <div class="tpl-cards">${TEMPLATES.map(t=>`<div class="tpl-card" onclick="selMod('${t.mod}')"><div class="tpl-icon">${t.icon}</div><div class="tpl-name">${L==='en'&&t.name_en?t.name_en:t.name}</div><div class="tpl-desc">${L==='en'&&t.desc_en?t.desc_en:t.desc}</div></div>`).join('')}</div>
  <div class="section-divider"></div>
  <div class="mcards">
    <div class="mcard sec ${S.module==='security'?'selected':''}" onclick="selMod('security')"><div class="mc-check">&#10003;</div><div class="mc-icon">SEC</div><div class="mc-title">Security</div><div class="mc-desc">${L==='en'?'Physical security, access, CCTV, alarm, BCM.':'Physische Sicherheit, Zutritt, Video, Alarm, BCM.'}</div><div class="mc-norms"><span class="nb sec">ISO 31000</span><span class="nb sec">27001</span><span class="nb sec">NIS2</span></div></div>
    <div class="mcard qm ${S.module==='qm'?'selected':''}" onclick="selMod('qm')"><div class="mc-check">&#10003;</div><div class="mc-icon">QM</div><div class="mc-title">QM</div><div class="mc-desc">${L==='en'?'Context, risks, resources, continual improvement.':'Kontext, Risiken, Ressourcen, KVP.'}</div><div class="mc-norms"><span class="nb qm">ISO 9001</span><span class="nb qm">45001</span></div></div>
    <div class="mcard itg ${S.module==='itgov'?'selected':''}" onclick="selMod('itgov')"><div class="mc-check">&#10003;</div><div class="mc-icon">ITG</div><div class="mc-title">IT-Governance</div><div class="mc-desc">${L==='en'?'COBIT 2019 – 13 domains, 59 control points.':'COBIT 2019 – 13 Prüfbereiche, 59 Kontrollpunkte.'}</div><div class="mc-norms"><span class="nb it">COBIT 2019</span><span class="nb it">ISO 20000</span></div></div>
    <div class="mcard combo ${S.module==='combined'?'selected':''}" onclick="selMod('combined')"><div class="mc-check">&#10003;</div><div class="mc-icon">ALL</div><div class="mc-title">${L==='en'?'Combined':'Kombiniert'}</div><div class="mc-desc">${L==='en'?'Security + QM + IT-Governance.':'Security + QM + IT-Governance.'}</div><div class="mc-norms"><span class="nb comb">${L==='en'?'All':'Alle'}</span></div></div>
  </div>
  <div class="nav-row"><div></div><button class="btn-p" onclick="next()" ${!S.module?'disabled':''}>${L==='en'?'Continue →':'Weiter →'}</button></div></div>`;
}

// ═══ NORMS ═══
function renderNorms(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const show=m=>S.module===m||S.module==='combined'||S.module==='religion'&&m==='security';
  let h='';
  if(show('security'))h+=normGroup('Security','security','sec');
  if(show('qm'))h+=normGroup('QM','qm','qm');
  if(show('itgov'))h+=normGroup('IT-Governance','itgov','it');
  let det='';S.norms.forEach(nk=>{const nd=NORMS[nk];if(!nd)return;const cls=modCls(nd.m);det+=`<div class="nd"><div class="nd-h" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')"><div><span class="nd-t">${nd.fn}</span></div><span class="nd-a">▼</span></div><div class="nd-b"><div class="nd-c">${nd.reqs.map(r=>`<div class="nd-r ${nd.m==='qm'?'qr':nd.m==='itgov'?'ir':''}"><span class="nd-n">${r.n}</span><span>${r.t}</span></div>`).join('')}</div></div></div>`;});
  document.getElementById('mainContent').innerHTML=`<div class="panel"><div class="panel-title">${L==='en'?'Standards & Norms':'Normen & Standards'}</div><p class="panel-sub">${L==='en'?'Click to activate/deactivate. Expand for requirements.':'Aktivieren/deaktivieren per Klick. Aufklappen für Anforderungen.'}</p>${h}<div class="section-divider"></div>${det}<div class="nav-row"><button class="btn-s" onclick="prev()">${L==='en'?'← Back':'← Zurück'}</button><button class="btn-p" onclick="next()">${L==='en'?'Continue →':'Weiter →'}</button></div></div>`;
}
function normGroup(label,mod,chipCls){
  return`<div style="margin-bottom:10px"><div style="font-family:var(--fm);font-size:.55rem;letter-spacing:.1em;text-transform:uppercase;color:var(--${mod==='security'?'accent':mod==='qm'?'orange':'emerald'});margin-bottom:5px">${label}</div><div class="norm-chips">${Object.entries(NORMS).filter(([,v])=>v.m===mod).map(([k])=>`<div class="nc ${chipCls==='qm'?'qc':chipCls==='it'?'ic':''} ${S.norms.includes(k)?'active':''}" onclick="togNorm('${k}')">${k}</div>`).join('')}</div></div>`;
}
function togNorm(k){const i=S.norms.indexOf(k);if(i>-1)S.norms.splice(i,1);else S.norms.push(k);render();save();}

// ═══ OBJEKT-RISIKOSCORE ═══
function calcObjectRisk(){
  const m=S.meta;let score=0;
  // Vorfallhistorie — höchste Gewichtung
  if(m.einbrueche==='ja')score+=20;else if(m.einbrueche==='unbekannt')score+=8;
  if(m.sabotage==='ja')score+=20;else if(m.sabotage==='unbekannt')score+=8;
  if(m.personaldiebstahl==='ja')score+=15;else if(m.personaldiebstahl==='unbekannt')score+=6;
  if(m.diebstahl==='ja')score+=15;else if(m.diebstahl==='unbekannt')score+=5;
  if(m.brandschaden==='ja')score+=12;else if(m.brandschaden==='unbekannt')score+=4;
  if(m.itVorfaelle==='ja')score+=12;else if(m.itVorfaelle==='unbekannt')score+=4;
  if(m.versicherungsschaden==='ja')score+=8;
  const v12=parseInt(m.vorfaelle12m)||0;if(v12>=5)score+=15;else if(v12>=2)score+=8;else if(v12>=1)score+=4;
  // Risikoprofil
  if(m.schutzbedarf==='sehr hoch')score+=20;else if(m.schutzbedarf==='erhöht')score+=10;
  if(m.kritischeInfrastruktur==='ja')score+=15;
  if(m.gefaehrlicheStoffe==='ja')score+=12;
  if(m.kassenbereich==='ja')score+=10;
  if(m.datenschutz==='ja')score+=6;
  if(m.oeffentlichZugaenglich==='ja')score+=6;
  if(m.nachtnutzung==='ja')score+=5;
  if(m.lage==='problematisch')score+=15;else if(m.lage==='mittel')score+=6;
  if(m.besucherverkehr==='sehr hoch')score+=8;else if(m.besucherverkehr==='hoch')score+=5;
  // Schutzmaßnahmen — Abzug
  if(m.zugangskontrolle==='vollständig')score-=12;else if(m.zugangskontrolle==='teilweise')score-=5;
  if(m.alarmanlage==='ja')score-=10;
  if(m.sicherheitsdienst==='ja')score-=12;
  if(m.bewachung24h==='ja')score-=10;
  if(m.einzaeunung==='ja')score-=6;
  if(m.aussenbeleuchtung==='ja')score-=5;
  if(m.schluessel==='ja')score-=5;
  if(m.serverraumgesichert==='ja')score-=4;
  score=Math.max(0,Math.min(100,score));
  let level,cls;
  if(score>=70){level='Kritisch';cls='danger';}else if(score>=45){level='Hoch';cls='orange';}else if(score>=20){level='Mittel';cls='warn';}else{level='Gering';cls='ok';}
  return{score,level,cls};
}

// ═══ META ═══
