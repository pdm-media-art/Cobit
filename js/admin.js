// ═══ ADMIN AUTH ═══
const _ADM_USERS = [
  btoa(unescape(encodeURIComponent('SecureStay\x00TEstpasswort123'))),
  btoa(unescape(encodeURIComponent('Grygoriy.Ogorinskyy\x00TEstpasswort123'))),
  btoa(unescape(encodeURIComponent('Werner.Devosse\x00TEstpasswort123'))),
];
let _admAttempts = 0;

function adminDoLogin() {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const u = (document.getElementById('adm_user').value||'').trim();
  const p = document.getElementById('adm_pass').value||'';
  const err = document.getElementById('admLoginError');
  err.classList.remove('show');
  if (!u||!p){err.textContent=L==='en'?'Please fill in all fields.':'Bitte alle Felder ausfüllen.';err.classList.add('show');return;}
  const h = btoa(unescape(encodeURIComponent(u+'\x00'+p)));
  if (_ADM_USERS.includes(h)) {
    _admAttempts=0;
    sessionStorage.setItem('ssa_adm',h);
    document.getElementById('admLoginOverlay').classList.remove('open');
    S.mode='admin';
    document.querySelectorAll('.tn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tn')[5]?.classList.add('active');
    render(); save();
  } else {
    _admAttempts++;
    document.getElementById('admLoginCard').classList.add('shake');
    setTimeout(()=>document.getElementById('admLoginCard').classList.remove('shake'),400);
    const rem = 5-_admAttempts;
    err.textContent = rem>0 ? (L==='en'?`Wrong password. (${rem} attempt${rem!==1?'s':''} remaining)`:`Falsches Passwort. (${rem} Versuch${rem!==1?'e':''} verbleibend)`) : (L==='en'?'Too many failed attempts.':'Zu viele Fehlversuche.');
    err.classList.add('show');
    if(_admAttempts>=5){setTimeout(()=>{_admAttempts=0;err.classList.remove('show');},30000);}
  }
}
function adminDoLogout() {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  if(!confirm(L==='en'?'Leave internal area?':'Internen Bereich verlassen?'))return;
  sessionStorage.removeItem('ssa_adm');
  S.kva.admTab='kva';
  go('audit');
  toast(L==='en'?'Left internal area':'Interner Bereich verlassen','info');
}

// ═══ ADMIN RENDER ═══
function renderAdmin() {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const tab = S.kva.admTab||'kva';
  const isAdm = !!sessionStorage.getItem('ssa_adm');
  if(!isAdm){go('audit');return;}
  document.getElementById('auditNav').style.display='none';
  const ejsCfg = {svc:localStorage.getItem('ssa_ejs_svc')||'',tpl:localStorage.getItem('ssa_ejs_tpl')||'',key:localStorage.getItem('ssa_ejs_key')||''};
  const ejsOk = ejsCfg.svc&&ejsCfg.tpl&&ejsCfg.key;
  document.getElementById('mainContent').innerHTML=`
  <div class="adm-grid">
    <div class="adm-sidebar">
      <div style="font-family:var(--fm);font-size:.48rem;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);margin-bottom:10px;padding:0 4px">${L==='en'?'Internal Area':'Interner Bereich'}</div>
      <div class="adm-nav-item ${tab==='kva'?'active':''}" onclick="S.kva.admTab='kva';renderAdmin()"><span class="adm-nav-icon">KVA</span>${L==='en'?'Quote':'Kostenvoranschlag'}</div>
      <div class="adm-nav-item ${tab==='email'?'active':''}" onclick="S.kva.admTab='email';renderAdmin()"><span class="adm-nav-icon">MAIL</span>${L==='en'?'Send Email':'E-Mail senden'}</div>
      <div class="adm-nav-item ${tab==='settings'?'active':''}" onclick="S.kva.admTab='settings';renderAdmin()"><span class="adm-nav-icon">CFG</span>${L==='en'?'Settings':'Einstellungen'}</div>
      <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--border)">
        <button class="btn-sm danger" style="width:100%" onclick="adminDoLogout()">${L==='en'?'Sign Out':'Abmelden'}</button>
      </div>
      <div style="margin-top:12px;padding:8px;background:rgba(239,68,68,.05);border:1px solid rgba(239,68,68,.1);border-radius:8px;font-size:.62rem;color:var(--muted);text-align:center">
        ${L==='en'?'Logged in as':'Eingeloggt als'}<br><strong style="color:var(--danger)">SecureStay Intern</strong><br>
        <span style="font-size:.56rem;color:var(--soft)">${L==='en'?'Confidential':'Vertraulich'}</span>
      </div>
    </div>
    <div class="adm-section" id="admContent">${tab==='kva'?renderKVAPanel():tab==='email'?renderEmailPanel():renderSettingsPanel()}</div>
  </div>`;
}

// ═══ KVA PANEL ═══
function renderKVAPanel() {
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ac = activeChecks();
  const hasAudit = S.module && Object.keys(S.findings).length>0;
  if(!S.kva.positions.length && hasAudit) generateKVAPositions();
  const rate = S.kva.rate||250;
  const ku = !!S.kva.kleinunternehmer;
  const pos = S.kva.positions;
  const activePos = pos.filter(p=>p.included!==false);
  const totalH = activePos.reduce((s,p)=>s+(Number(p.h)||0),0);
  const totalBrutto = totalH*rate;
  const disc = Number(S.kva.discount)||0;
  const totalNetto = totalBrutto*(1-disc/100);
  const mwst = ku ? 0 : totalNetto*0.19;
  const totalBruttofinal = totalNetto+mwst;

  const now = new Date();
  if(!S.kva.nr)S.kva.nr='KVA-'+now.getFullYear()+'-'+String((S.history?.length||0)+1).padStart(3,'0');
  if(!S.kva.date)S.kva.date=now.toISOString().split('T')[0];
  if(!S.kva.validUntil){const v=new Date(now);v.setDate(v.getDate()+30);S.kva.validUntil=v.toISOString().split('T')[0];}

  const catLabels=L==='en'?{fix:'Fixed Price',begehung:'Inspection',konzept:'Concept',umsetzung:'Implementation',empfehlung:'Recommendation',custom:'Custom',optional:'Optional'}:{fix:'Festpreis',begehung:'Begehung',konzept:'Konzept',umsetzung:'Umsetzung',empfehlung:'Empfehlung',custom:'Individuell',optional:'Optional'};
  return`
  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:18px">
    <div><div class="panel-title">${L==='en'?'Quote':'Kostenvoranschlag'}</div><p class="panel-sub" style="margin:0">${L==='en'?'Generated from audit results · 250 €/h':'Aus Audit-Ergebnissen generiert · 250 €/h'}</p></div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      ${hasAudit?`<button class="btn-sm accent" onclick="generateKVAPositions();renderAdmin()">${L==='en'?'Regenerate':'Neu generieren'}</button>`:''}
      <button class="btn-sm accent" onclick="kvaAddCustomPos();renderAdmin()">+ Position</button>
      <button class="btn-sm" onclick="openEmailModal('kva')">${L==='en'?'By Email':'Per E-Mail'}</button>
      <button class="btn-p" onclick="printKVA()">PDF</button>
    </div>
  </div>
  ${!hasAudit?`<div style="background:rgba(234,179,8,.06);border:1px solid rgba(234,179,8,.2);border-radius:10px;padding:16px;margin-bottom:16px;font-size:.82rem;color:var(--warn)">${L==='en'?'No audit loaded. Run an inspection first.':'Kein Audit geladen. Führe zuerst eine Begehung durch.'}</div>`:''}
  <div class="kva-form-grid">
    <div class="fg"><label>${L==='en'?'Quote No.':'KVA-Nummer'}</label><input value="${esc(S.kva.nr)}" oninput="S.kva.nr=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Date':'Datum'}</label><input type="date" value="${S.kva.date}" oninput="S.kva.date=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Valid Until':'Gültig bis'}</label><input type="date" value="${S.kva.validUntil}" oninput="S.kva.validUntil=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Hourly Rate (€)':'Stundensatz (€)'}</label><input type="number" value="${rate}" oninput="S.kva.rate=Number(this.value)||250;save();renderAdmin()"></div>
    <div class="fg"><label>${L==='en'?'Client':'Auftraggeber'}</label><input value="${esc(S.meta.auftraggeber||'')}" oninput="S.meta.auftraggeber=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Discount (%)':'Rabatt (%)'}</label><input type="number" min="0" max="100" value="${disc}" oninput="S.kva.discount=Number(this.value)||0;save();renderAdmin()"></div>
    <div class="fg fg-full" style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:${ku?'rgba(20,184,166,.06)':'rgba(255,255,255,.02)'};border:1px solid ${ku?'rgba(20,184,166,.2)':'var(--border)'};border-radius:8px;transition:.2s">
      <input type="checkbox" id="kuToggle" ${ku?'checked':''} onchange="S.kva.kleinunternehmer=this.checked;save();renderAdmin()" style="accent-color:var(--accent);width:16px;height:16px;cursor:pointer;flex-shrink:0">
      <label for="kuToggle" style="cursor:pointer;margin:0;font-weight:600;color:${ku?'var(--accent)':'var(--text2)'}">${L==='en'?'Small business (§ 19 UStG) — no VAT shown':'Kleinunternehmer (§ 19 UStG) — keine Umsatzsteuer ausweisen'}</label>
    </div>
  </div>
  ${pos.length?`
  <div style="overflow-x:auto;margin-bottom:8px">
  <table class="kva-table">
    <thead><tr><th style="width:28px"></th><th>${L==='en'?'Position / Description':'Position / Leistungsbeschreibung'}</th><th style="width:60px">${L==='en'?'Hrs':'Std.'}</th><th style="width:80px">${L==='en'?'Price (€)':'Preis (€)'}</th><th style="width:30px"></th></tr></thead>
    <tbody>
    ${pos.map((p,i)=>`
      <tr class="kva-row ${p.included===false?'excluded':''}" id="kvr_${i}">
        <td><input type="checkbox" ${p.included!==false?'checked':''} onchange="S.kva.positions[${i}].included=this.checked;save();renderAdmin()" style="accent-color:var(--accent);cursor:pointer"></td>
        <td style="cursor:pointer" onclick="kvaOpenEdit(${i})"><div class="kva-pos-name">${esc(p.name)}</div><div class="kva-pos-desc">${esc(p.desc||'—')}</div><span class="kva-cat ${p.category||'custom'}">${catLabels[p.category||'custom']||p.category}</span></td>
        <td><input class="kva-h-input" type="number" min="0" step="0.5" value="${p.h}" oninput="S.kva.positions[${i}].h=Number(this.value)||0;save();renderAdmin()"></td>
        <td style="font-family:var(--fm);font-size:.78rem;color:var(--accent);text-align:right;white-space:nowrap">${((p.included!==false?Number(p.h)||0:0)*rate).toLocaleString('de-DE')} €</td>
        <td style="white-space:nowrap"><button class="login-eye" onclick="kvaOpenEdit(${i})" title="${L==='en'?'Edit':'Bearbeiten'}" style="color:var(--muted);margin-right:2px">✎</button><button class="login-eye" onclick="S.kva.positions.splice(${i},1);save();renderAdmin()" title="${L==='en'?'Remove':'Entfernen'}" style="color:var(--danger)">✕</button></td>
      </tr>`).join('')}
    </tbody>
    <tfoot>
      <tr class="kva-total-row"><td></td><td style="color:var(--muted);font-size:.74rem">${L==='en'?`Total (${activePos.length} positions, ${totalH} hrs)`:`Gesamt (${activePos.length} Positionen, ${totalH} Std.)`}</td><td style="font-family:var(--fm);text-align:center;color:var(--text2)">${totalH}</td><td style="font-family:var(--fm);color:var(--text2);text-align:right;white-space:nowrap">${totalBrutto.toLocaleString('de-DE')} €</td><td></td></tr>
    </tfoot>
  </table></div>
  <div class="kva-summary">
    <div class="kva-summary-row"><span>${L==='en'?'Net amount':'Nettobetrag'}</span><span>${totalBrutto.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
    ${disc>0?`<div class="kva-summary-row"><span>${L==='en'?'Discount':'Rabatt'} (${disc}%)</span><span>– ${(totalBrutto*disc/100).toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>`:''}
    ${disc>0?`<div class="kva-summary-row"><span>${L==='en'?'Net after discount':'Netto nach Rabatt'}</span><span>${totalNetto.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>`:''}
    ${ku?`<div class="kva-summary-row"><span style="font-size:.72rem;color:var(--muted)">§ 19 UStG – keine MwSt.</span><span style="font-size:.72rem;color:var(--muted)">0,00 €</span></div>`
       :`<div class="kva-summary-row"><span>${L==='en'?'VAT 19%':'MwSt. 19%'}</span><span>${mwst.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>`}
    <div class="kva-summary-row"><span>${ku?(L==='en'?'Total (net)':'Gesamtbetrag (netto)'):(L==='en'?'Total (gross)':'Gesamtbetrag (brutto)')}</span><span style="font-size:1rem;font-family:var(--fh)">${totalBruttofinal.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
  </div>`:''}
  <div class="fg fg-full"><label>${L==='en'?'Internal Notes / Special Agreements':'Interne Notizen / Besondere Vereinbarungen'}</label><textarea rows="3" oninput="S.kva.notes=this.value;save()" style="width:100%;background:rgba(15,23,42,.8);border:1px solid var(--border);border-radius:8px;padding:8px 11px;color:var(--text);font-size:.8rem;font-family:var(--ff);outline:none;resize:vertical">${esc(S.kva.notes||'')}</textarea></div>`;
}

function generateKVAPositions() {
  const ac = activeChecks();
  let krit=[], mangel=[];
  ac.forEach(ch=>ch.items.forEach(it=>{
    const f=S.findings[it.id];
    if(f?.status==='kritisch')krit.push({...it,sec:ch.l});
    else if(f?.status==='mangel')mangel.push({...it,sec:ch.l});
  }));
  const assessed=Object.values(S.findings).filter(f=>f.status).length;
  const secK=krit.filter(f=>f.m==='security'),secM=mangel.filter(f=>f.m==='security');
  const qmK=krit.filter(f=>f.m==='qm'),qmM=mangel.filter(f=>f.m==='qm');
  const itK=krit.filter(f=>f.m==='itgov'),itM=mangel.filter(f=>f.m==='itgov');
  const begehungH=Math.max(4,Math.round(assessed*0.3+krit.length*0.25));
  const pos=[];
  pos.push({name:'Projektmanagement & Koordination',desc:'Projektkickoff, Terminplanung, Stakeholder-Abstimmung, Kommunikation während des gesamten Projekts',h:4,category:'fix',included:true});
  pos.push({name:`Vor-Ort-Begehung & Inspektion`,desc:`Durchführung der ${assessed>0?`Sicherheits- und Compliance-Begehung (${assessed} Prüfpunkte)`:'Begehung'}, Fotodokumentation, Befunderfassung vor Ort`,h:begehungH,category:'begehung',included:true});
  if(secK.length>0){
    pos.push({name:`Sicherheitskonzept – Kritische Mängel (${secK.length})`,desc:`Detailliertes Konzept zur Behebung kritischer Sicherheitsmängel: ${secK.slice(0,2).map(f=>f.l).join(', ')}${secK.length>2?` u. ${secK.length-2} weitere`:''}`,h:secK.length*6,category:'konzept',included:true});
    pos.push({name:'Umsetzungsbegleitung Security (kritisch)',desc:'Begleitende Beratung bei der Maßnahmenumsetzung, Lieferantenkoordination, Abnahme und Wirksamkeitsprüfung',h:secK.length*8,category:'umsetzung',included:true});
  }
  if(secM.length>0)pos.push({name:`Handlungsempfehlungen Security (${secM.length} Mängel)`,desc:'Priorisierte Handlungsempfehlungen mit Lösungsvorschlägen und Kostenrahmen',h:secM.length*3,category:'empfehlung',included:true});
  if(qmK.length>0){
    pos.push({name:`QM-Konzept – Kritische Abweichungen (${qmK.length})`,desc:'ISO 9001/45001-konforme Konzepterstellung, Prozessoptimierung, Dokumentenvorlagen',h:qmK.length*5,category:'konzept',included:true});
    pos.push({name:'Umsetzungsbegleitung QM (kritisch)',desc:'Workshop-Durchführung, Prozessimplementierung, Mitarbeiterschulung, Wirksamkeitsprüfung',h:qmK.length*6,category:'umsetzung',included:true});
  }
  if(qmM.length>0)pos.push({name:`Handlungsempfehlungen QM (${qmM.length} Abweichungen)`,desc:'Optimierungsempfehlungen mit Muster-Dokumenten und Prozess-Templates',h:qmM.length*2,category:'empfehlung',included:true});
  if(itK.length>0){
    pos.push({name:`IT-Governance-Konzept – Kritische Findings (${itK.length})`,desc:'COBIT 2019/ISO 20000 Konzepterstellung, ISMS-Aufbau, Policy- und Richtlinien-Erstellung',h:itK.length*10,category:'konzept',included:true});
    pos.push({name:'Umsetzungsbegleitung IT-Governance (kritisch)',desc:'Technische Implementierungsbegleitung, Tool-Selektion, Schulungen, Integrations-Tests',h:itK.length*14,category:'umsetzung',included:true});
  }
  if(itM.length>0)pos.push({name:`Handlungsempfehlungen IT-Governance (${itM.length} Findings)`,desc:'Best-Practice-Empfehlungen, Gap-Analyse, Roadmap-Erstellung',h:itM.length*4,category:'empfehlung',included:true});
  pos.push({name:'Auditbericht & Abschlusspräsentation',desc:'Professioneller Auditbericht, Executive Summary, Management-Präsentation der Ergebnisse und Maßnahmen',h:6,category:'fix',included:true});
  pos.push({name:'Nachprüfung / Re-Audit (optional)',desc:'Überprüfung umgesetzter Maßnahmen auf Wirksamkeit, Nachbericht mit Ergebnisbestätigung',h:8,category:'optional',included:false});
  S.kva.positions=pos;
  save();
}
function kvaAddCustomPos(){
  const idx=S.kva.positions.push({name:'Individuelle Leistung',desc:'',h:2,category:'custom',included:true})-1;
  save();
  renderAdmin();
  setTimeout(()=>kvaOpenEdit(idx),80);
}

// ═══ KVA POSITION SUGGESTIONS ═══
const KVA_SUGGESTIONS=[
  {name:'DSGVO-Beratung & Datenschutzkonzept',desc:'Analyse der datenschutzrechtlichen Anforderungen, Erstellung eines Datenschutzkonzepts, DSGVO-konforme Prozesse und Dokumentation',cat:'konzept',h:8},
  {name:'Mitarbeiterschulung Sicherheit',desc:'Konzeption und Durchführung einer Schulung zu Sicherheitsrichtlinien, Verhalten im Notfall und Awareness-Training',cat:'fix',h:4},
  {name:'Notfallplanung & Business Continuity',desc:'Erstellung eines Notfallhandbuchs, Festlegung von Recovery-Zeiten, Übung von Notfallszenarien',cat:'konzept',h:10},
  {name:'Zertifizierungsvorbereitung ISO 27001',desc:'Gap-Analyse, Dokumentenerstellung, ISMS-Implementierung, Begleitung bis zur externen Zertifizierung',cat:'umsetzung',h:20},
  {name:'Zertifizierungsvorbereitung ISO 9001',desc:'Prozessaufnahme, Dokumentation nach ISO 9001, Vorbereitung auf externes Audit',cat:'umsetzung',h:16},
  {name:'Zertifizierungsvorbereitung ISO 45001',desc:'Gefährdungsbeurteilung, Arbeitsschutzmanagement, Dokumentation und Zertifizierungsvorbereitung',cat:'umsetzung',h:14},
  {name:'Schwachstellenanalyse (technisch)',desc:'Systematische Prüfung technischer Systeme auf Sicherheitslücken, Risikobewertung, Maßnahmenempfehlung',cat:'konzept',h:6},
  {name:'Penetrationstest (Netzwerk / IT)',desc:'Autorisierter Penetrationstest zur Identifikation von Angriffsvektoren, Bericht mit Priorisierung',cat:'fix',h:12},
  {name:'Social Engineering Test',desc:'Simulierte Phishing- und Social-Engineering-Angriffe, Auswertung der Ergebnisse, Handlungsempfehlungen',cat:'fix',h:6},
  {name:'Phishing-Simulation & Awareness',desc:'Planung und Durchführung einer Phishing-Kampagne, Auswertung, gezielte Nachschulung der betroffenen Mitarbeiter',cat:'empfehlung',h:5},
  {name:'ISMS-Aufbau & Einführungsberatung',desc:'Aufbau eines Informationssicherheits-Managementsystems von Grund auf, Scope-Definition, erste Policies',cat:'konzept',h:16},
  {name:'Passwort-Audit & Zugangskontrolle',desc:'Analyse bestehender Passwort-Richtlinien, Empfehlungen zu MFA, Zugriffskontrolle und Rollentrennung',cat:'empfehlung',h:4},
  {name:'Brandschutzberatung',desc:'Prüfung der baulichen und organisatorischen Brandschutzmaßnahmen, Empfehlungen, Flucht- und Rettungswegkonzept',cat:'empfehlung',h:4},
  {name:'Objektschutzkonzept',desc:'Erstellung eines umfassenden Objektschutzkonzepts inkl. Zutrittskontrolle, Videoüberwachung, Alarmierung',cat:'konzept',h:8},
  {name:'Lieferantenaudit',desc:'Durchführung eines Lieferantenaudits, Bewertung von Qualitäts- und Sicherheitsstandards, Auditbericht',cat:'begehung',h:6},
  {name:'Sicherheitshandbuch erstellen',desc:'Erstellung oder Aktualisierung des unternehmensweiten Sicherheitshandbuchs inkl. Richtlinien und Prozessbeschreibungen',cat:'konzept',h:8},
  {name:'Krisenmanagement & Kommunikationsplan',desc:'Entwicklung eines Krisenmanagement-Konzepts, Kommunikationsleitfaden, Übung von Eskalationspfaden',cat:'konzept',h:6},
  {name:'Reise-Risikobewertung',desc:'Analyse der Reisesicherheitsrisiken für bestimmte Zielregionen, Handlungsempfehlungen und Reiserichtlinien',cat:'empfehlung',h:3},
  {name:'Interne Revision / Compliance-Check',desc:'Eigenständige Überprüfung der Einhaltung interner Richtlinien und gesetzlicher Anforderungen, Revisionsbericht',cat:'fix',h:8},
  {name:'Schulung Führungskräfte (Sicherheit)',desc:'Zielgruppenspezifische Schulung für Führungskräfte zu Sicherheitsverantwortung, Haftung und Maßnahmenpflichten',cat:'fix',h:3},
];

function kvaOpenEdit(idx){
  const p=S.kva.positions[idx];
  if(!p)return;
  document.getElementById('kvaEditIdx').value=idx;
  document.getElementById('kvaEditName').value=p.name||'';
  document.getElementById('kvaEditDesc').value=p.desc||'';
  document.getElementById('kvaEditCat').value=p.category||'custom';
  document.getElementById('kvaEditH').value=p.h||2;
  // Render suggestions
  const grid=document.getElementById('kvaSugGrid');
  grid.innerHTML=KVA_SUGGESTIONS.map((s,i)=>`
    <button class="kva-sug-chip" onclick="kvaApplySug(${i})">
      <div class="sug-name">${esc(s.name)}</div>
      <div class="sug-desc">${esc(s.desc.substring(0,60))}…</div>
    </button>`).join('');
  document.getElementById('kvaEditModal').classList.add('open');
  setTimeout(()=>document.getElementById('kvaEditName').focus(),80);
}
function kvaApplySug(si){
  const s=KVA_SUGGESTIONS[si];
  document.getElementById('kvaEditName').value=s.name;
  document.getElementById('kvaEditDesc').value=s.desc;
  document.getElementById('kvaEditCat').value=s.cat;
  document.getElementById('kvaEditH').value=s.h;
}
function kvaSaveEdit(){
  const idx=Number(document.getElementById('kvaEditIdx').value);
  const p=S.kva.positions[idx];
  if(!p)return;
  p.name=(document.getElementById('kvaEditName').value||'').trim()||'Individuelle Leistung';
  p.desc=(document.getElementById('kvaEditDesc').value||'').trim();
  p.category=document.getElementById('kvaEditCat').value||'custom';
  p.h=Number(document.getElementById('kvaEditH').value)||0;
  save();
  closeModal('kvaEditModal');
  renderAdmin();
}

// ═══ EMAIL PANEL ═══
function renderEmailPanel(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ejsCfg={svc:localStorage.getItem('ssa_ejs_svc')||'',tpl:localStorage.getItem('ssa_ejs_tpl')||'',key:localStorage.getItem('ssa_ejs_key')||''};
  const ejsOk=ejsCfg.svc&&ejsCfg.tpl&&ejsCfg.key;
  return`
  <div class="panel-title" style="margin-bottom:4px">${L==='en'?'Email Dispatch':'E-Mail-Versand'}</div>
  <p class="panel-sub">${L==='en'?'Send quote or inspection report directly.':'Kostenvoranschlag oder Begehungsprotokoll direkt versenden.'}<br>${L==='en'?'Sender:':'Absender:'} <strong style="color:var(--accent)">securestay@outlook.de</strong></p>
  ${!ejsOk?`<div class="adm-lock-banner">${L==='en'?'EmailJS not configured — go to <strong>Settings</strong> and enter your credentials.':'EmailJS nicht konfiguriert — Gehe zu <strong>Einstellungen</strong> und trage deine Zugangsdaten ein.'}</div>`:`<div style="background:var(--okDim);border:1px solid rgba(34,197,94,.15);border-radius:8px;padding:8px 12px;margin-bottom:12px;font-size:.78rem;color:var(--ok)">${L==='en'?'EmailJS connected — sending via securestay@outlook.de active':'EmailJS verbunden — Versand über securestay@outlook.de aktiv'}</div>`}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:16px;cursor:pointer;transition:.2s" onclick="openEmailModal('kva')" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="font-family:var(--fm);font-size:.52rem;font-weight:700;letter-spacing:.08em;padding:5px 10px;border-radius:5px;display:inline-block;background:var(--accentDim);color:var(--accent);border:1px solid rgba(20,184,166,.2);margin-bottom:8px">KVA</div>
      <div style="font-weight:700;color:var(--text2);margin-bottom:4px">${L==='en'?'Quote':'Kostenvoranschlag'}</div>
      <div style="font-size:.72rem;color:var(--muted)">${L==='en'?'Send quote as formatted email with position list and total amount':'KVA als formatierte E-Mail mit Positionsliste und Gesamtbetrag senden'}</div>
      <button class="btn-sm accent" style="margin-top:10px">${L==='en'?'Send':'Senden'}</button>
    </div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:16px;cursor:pointer;transition:.2s" onclick="openEmailModal('protokoll')" onmouseover="this.style.borderColor='var(--orange)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="font-family:var(--fm);font-size:.52rem;font-weight:700;letter-spacing:.08em;padding:5px 10px;border-radius:5px;display:inline-block;background:var(--orangeDim);color:var(--orange);border:1px solid rgba(249,115,22,.2);margin-bottom:8px">RPT</div>
      <div style="font-weight:700;color:var(--text2);margin-bottom:4px">${L==='en'?'Inspection Report':'Begehungsprotokoll'}</div>
      <div style="font-size:.72rem;color:var(--muted)">${L==='en'?'Send summary of audit results with findings and recommendations':'Zusammenfassung der Audit-Ergebnisse mit Befunden und Empfehlungen senden'}</div>
      <button class="btn-sm" style="margin-top:10px;border-color:rgba(249,115,22,.3);color:var(--orange)">${L==='en'?'Send':'Senden'}</button>
    </div>
  </div>`;
}

// ═══ SETTINGS PANEL ═══
function renderSettingsPanel(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const svc=localStorage.getItem('ssa_ejs_svc')||'';
  const tpl=localStorage.getItem('ssa_ejs_tpl')||'';
  const key=localStorage.getItem('ssa_ejs_key')||'';
  return`
  <div class="panel-title" style="margin-bottom:4px">${L==='en'?'Settings':'Einstellungen'}</div>
  <p class="panel-sub">${L==='en'?'EmailJS configuration for automatic email dispatch.':'EmailJS-Konfiguration für automatischen E-Mail-Versand.'}</p>
  <div style="background:rgba(59,130,246,.05);border:1px solid rgba(59,130,246,.15);border-radius:10px;padding:14px;margin-bottom:18px;font-size:.78rem;color:var(--blue)">
    ${L==='en'
      ?`ℹ️ <strong>Setup:</strong> Create a free account at <strong>emailjs.com</strong>, connect your Outlook account (securestay@outlook.de) and create an email template. You'll find your credentials in your EmailJS dashboard.`
      :`ℹ️ <strong>Einrichtung:</strong> Erstelle einen kostenlosen Account auf <strong>emailjs.com</strong>, verknüpfe dein Outlook-Konto (securestay@outlook.de) und erstelle ein E-Mail-Template. Die Zugangsdaten findest du in deinem EmailJS-Dashboard.`}
  </div>
  <div class="mg" style="margin-bottom:16px">
    <div class="fg fg-full"><label>EmailJS Service-ID</label><input id="ejs_svc" value="${esc(svc)}" placeholder="service_xxxxxxx"></div>
    <div class="fg fg-full"><label>EmailJS Template-ID</label><input id="ejs_tpl" value="${esc(tpl)}" placeholder="template_xxxxxxx"></div>
    <div class="fg fg-full"><label>EmailJS Public Key</label><input id="ejs_key" value="${esc(key)}" placeholder="xxxxxxxxxxxxxxx"></div>
  </div>
  <div class="nav-row"><div></div>
    <div style="display:flex;gap:6px">
      <button class="btn-sm danger" onclick="localStorage.removeItem('ssa_ejs_svc');localStorage.removeItem('ssa_ejs_tpl');localStorage.removeItem('ssa_ejs_key');renderAdmin();toast('Konfiguration gelöscht','warn')">Zurücksetzen</button>
      <button class="btn-p" onclick="saveEmailSettings()">Speichern</button>
    </div>
  </div>`;
}
function saveEmailSettings(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const svc=(document.getElementById('ejs_svc')?.value||'').trim();
  const tpl=(document.getElementById('ejs_tpl')?.value||'').trim();
  const key=(document.getElementById('ejs_key')?.value||'').trim();
  if(!svc||!tpl||!key){toast(L==='en'?'Fill in all three fields':'Alle drei Felder ausfüllen','error');return;}
  localStorage.setItem('ssa_ejs_svc',svc);
  localStorage.setItem('ssa_ejs_tpl',tpl);
  localStorage.setItem('ssa_ejs_key',key);
  try{emailjs.init(key);}catch(e){}
  toast(L==='en'?'EmailJS configuration saved':'EmailJS-Konfiguration gespeichert','success');
  renderAdmin();
}

// ═══ EMAIL OPEN MODAL ═══
function openEmailModal(type) {
  const ac=activeChecks();
  let krit=[],mangel=[];
  ac.forEach(ch=>ch.items.forEach(it=>{const f=S.findings[it.id];if(f?.status==='kritisch')krit.push({...it,sec:ch.l});else if(f?.status==='mangel')mangel.push({...it,sec:ch.l});}));
  const ds=S.meta.datum?new Date(S.meta.datum).toLocaleDateString('de-DE'):'';
  const ejsCfg={svc:localStorage.getItem('ssa_ejs_svc')||'',tpl:localStorage.getItem('ssa_ejs_tpl')||'',key:localStorage.getItem('ssa_ejs_key')||''};
  const ejsOk=ejsCfg.svc&&ejsCfg.tpl&&ejsCfg.key;
  document.getElementById('emailjsSetupHint').style.display=ejsOk?'none':'block';
  let subject,body;
  if(type==='kva'){
    const rate=S.kva.rate||250;
    const kuE=!!S.kva.kleinunternehmer;
    const activePos=S.kva.positions.filter(p=>p.included!==false);
    const totalH=activePos.reduce((s,p)=>s+(Number(p.h)||0),0);
    const disc=Number(S.kva.discount)||0;
    const netto=totalH*rate*(1-disc/100);
    const brutto=kuE?netto:netto*1.19;
    document.getElementById('emailModalTitle').textContent='Kostenvoranschlag senden';
    document.getElementById('emailModalSub').textContent=`Von: securestay@outlook.de · KVA ${S.kva.nr||''}`;
    subject=`Kostenvoranschlag ${S.kva.nr||''} – ${S.meta.objekt||'Audit-Beratung'} | SecureStay Solutions`;
    body=`Sehr geehrte Damen und Herren,${S.meta.auftraggeber?'\nfür '+S.meta.auftraggeber:''},\n\nvielen Dank für Ihr Vertrauen. Anbei erhalten Sie unseren Kostenvoranschlag für die Beratungsleistungen im Rahmen des durchgeführten Audits.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nKOSTENVORANSCHLAG ${S.kva.nr||''}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nObjekt:      ${S.meta.objekt||'–'}\nAuftrag:     ${S.meta.auftraggeber||'–'}\nDatum:       ${S.kva.date?new Date(S.kva.date).toLocaleDateString('de-DE'):ds}\nGültig bis:  ${S.kva.validUntil?new Date(S.kva.validUntil).toLocaleDateString('de-DE'):'–'}\nStundensatz: ${rate} €/h\n\nLEISTUNGSPOSITIONEN:\n${activePos.map((p,i)=>`${String(i+1).padStart(2,'0')}. ${p.name}\n    ${p.desc}\n    Aufwand: ${p.h} Std. × ${rate} € = ${(Number(p.h)*rate).toLocaleString('de-DE')} €`).join('\n\n')}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nGESAMT: ${totalH} Std.\nNettobetrag:  ${(totalH*rate).toLocaleString('de-DE',{minimumFractionDigits:2})} €${disc>0?`\nRabatt ${disc}%: – ${(totalH*rate*disc/100).toLocaleString('de-DE',{minimumFractionDigits:2})} €`:''}
Netto:        ${netto.toLocaleString('de-DE',{minimumFractionDigits:2})} €\n${kuE?'§ 19 UStG: keine Umsatzsteuer':'MwSt. 19%:   '+(netto*0.19).toLocaleString('de-DE',{minimumFractionDigits:2})+' €'}\nGESAMT (${kuE?'netto':'brutto'}): ${brutto.toLocaleString('de-DE',{minimumFractionDigits:2})} €\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${S.kva.notes?'\nBesondere Vereinbarungen:\n'+S.kva.notes+'\n':''}\nBei Fragen stehen wir Ihnen jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\n\nSecureStay Solutions UG (haftungsbeschränkt)\nKirchstr. 8b · 55270 Essenheim\nsecurestay@outlook.de`;
  } else {
    document.getElementById('emailModalTitle').textContent='Begehungsprotokoll senden';
    document.getElementById('emailModalSub').textContent='Von: securestay@outlook.de · Zusammenfassung der Audit-Ergebnisse';
    subject=`Begehungsprotokoll${S.meta.objekt?' – '+S.meta.objekt:''} | SecureStay Solutions`;
    const assessed=Object.values(S.findings).filter(f=>f.status).length;
    body=`Sehr geehrte Damen und Herren,${S.meta.auftraggeber?'\nfür '+S.meta.auftraggeber:''},\n\nerbei erhalten Sie das Protokoll der durchgeführten Begehung.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nBEGEHUNGSPROTOKOLL\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nObjekt:       ${S.meta.objekt||'–'}\nAdresse:      ${S.meta.adresse||'–'}\nDatum:        ${ds||'–'}\nAuditor:      ${S.meta.pruefer||'–'}\nAnlass:       ${S.meta.anlass||'–'}\nGeprüfte KP: ${assessed}\n\nERGEBNISSE:\nKritische Mängel:  ${krit.length}\nVerbesserungen:    ${mangel.length}\n\n${krit.length?'KRITISCHE MÄNGEL (sofortiger Handlungsbedarf):\n'+krit.map((f,i)=>`${i+1}. ${f.sec} → ${f.l}${S.findings[f.id]?.note?' ('+S.findings[f.id].note+')':''}`).join('\n')+'\n':''}\n${mangel.length?'VERBESSERUNGSBEDARF:\n'+mangel.map((f,i)=>`${i+1}. ${f.sec} → ${f.l}${S.findings[f.id]?.note?' ('+S.findings[f.id].note+')':''}`).join('\n')+'\n':''}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nFür Rückfragen stehen wir jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\n\nSecureStay Solutions UG (haftungsbeschränkt)\nKirchstr. 8b · 55270 Essenheim\nsecurestay@outlook.de`;
  }
  document.getElementById('em_to').value=S.kva.recipient||S.meta.auftraggeber||'';
  document.getElementById('em_sub').value=subject;
  document.getElementById('em_body').value=body;
  document.getElementById('emailSendBtn').disabled=false;
  document.getElementById('emailSendBtn').textContent='Senden';
  document.getElementById('emailModal').classList.add('open');
}

function sendEmail(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const to=(document.getElementById('em_to').value||'').trim();
  const sub=(document.getElementById('em_sub').value||'').trim();
  const body=(document.getElementById('em_body').value||'').trim();
  if(!to||!sub||!body){toast(L==='en'?'Please fill in all fields':'Bitte alle Felder ausfüllen','error');return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)){toast(L==='en'?'Invalid email address':'Ungültige E-Mail-Adresse','error');return;}
  S.kva.recipient=to;save();
  const ejsCfg={svc:localStorage.getItem('ssa_ejs_svc')||'',tpl:localStorage.getItem('ssa_ejs_tpl')||'',key:localStorage.getItem('ssa_ejs_key')||''};
  const ejsOk=ejsCfg.svc&&ejsCfg.tpl&&ejsCfg.key;
  if(!ejsOk){toast(L==='en'?'EmailJS not configured — open Settings':'EmailJS nicht konfiguriert – Einstellungen öffnen','error',null,null,5000);return;}
  const btn=document.getElementById('emailSendBtn');
  btn.disabled=true;btn.textContent=L==='en'?'Sending…':'Wird gesendet…';
  try{emailjs.init(ejsCfg.key);}catch(e){}
  emailjs.send(ejsCfg.svc,ejsCfg.tpl,{to_email:to,subject:sub,message:body,from_name:'SecureStay Solutions UG',reply_to:'securestay@outlook.de'})
    .then(()=>{
      toast(L==='en'?`Email sent successfully to ${to}`:`E-Mail erfolgreich gesendet an ${to}`,'success',null,null,5000);
      closeModal('emailModal');
    })
    .catch(err=>{
      btn.disabled=false;btn.textContent=L==='en'?'Retry':'Erneut senden';
      toast(`${L==='en'?'Error':'Fehler'}: ${err?.text||(L==='en'?'Sending failed':'Versand fehlgeschlagen')}`,'error',null,null,6000);
    });
}

// ═══ KVA PDF PRINT ═══
function printKVA(){
  const pos=S.kva.positions.filter(p=>p.included!==false);
  const rate=S.kva.rate||250;
  const ku=!!S.kva.kleinunternehmer;
  const totalH=pos.reduce((s,p)=>s+(Number(p.h)||0),0);
  const disc=Number(S.kva.discount)||0;
  const netto=totalH*rate*(1-disc/100);
  const mwst=ku?0:netto*0.19;
  const brutto=netto+mwst;
  const catColors={fix:'#14b8a6',begehung:'#f97316',konzept:'#a78bfa',umsetzung:'#3b82f6',empfehlung:'#10b981',custom:'#eab308',optional:'#64748b'};
  const catLabel={fix:'Festpreis',begehung:'Begehung',konzept:'Konzept',umsetzung:'Umsetzung',empfehlung:'Empfehlung',custom:'Individuell',optional:'Optional'};
  const html=`<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>KVA ${S.kva.nr||''}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Segoe UI',Arial,sans-serif;font-size:11px;color:#1e293b;background:#fff;line-height:1.5}
  @page{size:A4;margin:16mm 14mm}
  .header{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:2px solid #14b8a6;margin-bottom:16px}
  .logo-block .company{font-size:18px;font-weight:800;color:#0f172a}.logo-block .sub{font-size:9px;color:#64748b;letter-spacing:.1em;text-transform:uppercase;margin-top:1px}
  .logo-block .addr{font-size:9px;color:#94a3b8;margin-top:4px;line-height:1.6}
  .kva-info{text-align:right}.kva-nr{font-size:20px;font-weight:800;color:#14b8a6}.kva-meta{font-size:9px;color:#64748b;margin-top:4px;line-height:1.8}
  .client-box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 16px;margin-bottom:16px;display:flex;justify-content:space-between}
  .client-col .label{font-size:8px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8;margin-bottom:2px}.client-col .val{font-size:11px;font-weight:600;color:#1e293b}
  .section-title{font-size:9px;text-transform:uppercase;letter-spacing:.1em;color:#94a3b8;font-weight:700;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid #e2e8f0}
  table{width:100%;border-collapse:collapse;margin-bottom:16px}
  th{background:#f1f5f9;text-align:left;padding:7px 10px;font-size:8.5px;text-transform:uppercase;letter-spacing:.07em;color:#64748b;border-bottom:1px solid #e2e8f0}
  th:last-child{text-align:right}th:nth-child(3){text-align:center}th:nth-child(4){text-align:center}
  td{padding:8px 10px;border-bottom:1px solid #f1f5f9;vertical-align:top}
  td:last-child{text-align:right;font-weight:600;white-space:nowrap;color:#0f766e}
  td:nth-child(3){text-align:center;font-family:monospace;color:#334155}
  td:nth-child(4){text-align:center;font-family:monospace;color:#334155}
  .pos-nr{font-size:9px;color:#94a3b8;font-weight:700;font-family:monospace}
  .pos-name{font-weight:600;font-size:10.5px;color:#1e293b;margin-bottom:2px}
  .pos-desc{font-size:9px;color:#64748b;line-height:1.5}
  .cat-badge{display:inline-block;font-size:7.5px;padding:1px 6px;border-radius:20px;margin-top:3px;font-weight:600;letter-spacing:.04em}
  tr:last-child td{border-bottom:none}
  .subtotal-row td{background:#f8fafc;font-weight:600;font-size:10.5px}
  .summary{margin-left:auto;width:280px;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-bottom:16px}
  .sum-row{display:flex;justify-content:space-between;padding:7px 14px;border-bottom:1px solid #f1f5f9;font-size:10px}
  .sum-row:last-child{border-bottom:none;background:#0f766e;color:#fff;font-weight:700;font-size:11px;padding:10px 14px}
  .sum-row .lbl{color:#64748b}.sum-row .val{font-weight:600;color:#0f172a;font-family:monospace}
  .sum-row:last-child .lbl,.sum-row:last-child .val{color:#fff}
  .notes-box{background:#fffbeb;border:1px solid #fde68a;border-radius:6px;padding:10px 14px;margin-bottom:16px;font-size:10px;color:#92400e}
  .footer{border-top:1px solid #e2e8f0;padding-top:10px;display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;margin-top:8px}
  .validity-box{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:8px 14px;font-size:9.5px;color:#166534;margin-bottom:14px}
  .page-break{page-break-before:always}
</style></head><body>
<div class="header">
  <div class="logo-block">
    <div class="company">SecureStay: Analytics</div>
    <div class="sub">SecureStay Solutions UG (haftungsbeschränkt)</div>
    <div class="addr">Kirchstr. 8b · 55270 Essenheim<br>securestay@outlook.de</div>
  </div>
  <div class="kva-info">
    <div class="kva-nr">KOSTENVORANSCHLAG</div>
    <div class="kva-meta">
      Nr.: <strong>${S.kva.nr||'–'}</strong><br>
      Datum: <strong>${S.kva.date?new Date(S.kva.date).toLocaleDateString('de-DE'):new Date().toLocaleDateString('de-DE')}</strong><br>
      Gültig bis: <strong>${S.kva.validUntil?new Date(S.kva.validUntil).toLocaleDateString('de-DE'):'–'}</strong><br>
      Stundensatz: <strong>${rate} €/h (zzgl. MwSt.)</strong>
    </div>
  </div>
</div>
<div class="client-box">
  <div class="client-col"><div class="label">Auftraggeber</div><div class="val">${S.meta.auftraggeber||'–'}</div></div>
  <div class="client-col"><div class="label">Objekt / Projekt</div><div class="val">${S.meta.objekt||'–'}</div></div>
  <div class="client-col"><div class="label">Adresse</div><div class="val">${S.meta.adresse||'–'}</div></div>
  <div class="client-col"><div class="label">Begehungsdatum</div><div class="val">${S.meta.datum?new Date(S.meta.datum).toLocaleDateString('de-DE'):'–'}</div></div>
</div>
<div class="validity-box">Dieser Kostenvoranschlag ist unverbindlich und gilt bis zum ${S.kva.validUntil?new Date(S.kva.validUntil).toLocaleDateString('de-DE'):'–'}. Alle Preise verstehen sich zzgl. gesetzlicher Mehrwertsteuer.</div>
<div class="section-title">Leistungsübersicht</div>
<table>
  <thead><tr><th style="width:26px">Pos.</th><th>Leistung / Beschreibung</th><th style="width:50px">Std.</th><th style="width:70px">Preis/Std.</th><th style="width:80px">Betrag</th></tr></thead>
  <tbody>
  ${pos.map((p,i)=>{const am=Number(p.h)*rate;const cc=catColors[p.category||'custom']||'#64748b';const cl=catLabel[p.category||'custom']||p.category;return`<tr>
    <td><div class="pos-nr">${String(i+1).padStart(2,'0')}</div></td>
    <td><div class="pos-name">${p.name}</div><div class="pos-desc">${p.desc}</div><span class="cat-badge" style="background:${cc}18;color:${cc}">${cl}</span></td>
    <td>${p.h}</td><td>${rate} €</td><td>${am.toLocaleString('de-DE',{minimumFractionDigits:2})} €</td></tr>`;}).join('')}
  <tr class="subtotal-row"><td></td><td>Zwischensumme (${pos.length} Positionen)</td><td>${totalH}</td><td>${rate} €</td><td>${(totalH*rate).toLocaleString('de-DE',{minimumFractionDigits:2})} €</td></tr>
  </tbody>
</table>
<div class="summary">
  <div class="sum-row"><span class="lbl">Nettobetrag</span><span class="val">${(totalH*rate).toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
  ${disc>0?`<div class="sum-row"><span class="lbl">Rabatt (${disc}%)</span><span class="val">– ${(totalH*rate*disc/100).toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>`:''}
  ${disc>0?`<div class="sum-row"><span class="lbl">Netto nach Rabatt</span><span class="val">${netto.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>`:''}
  ${ku?`<div class="sum-row" style="font-size:9px"><span class="lbl" style="color:#94a3b8">Umsatzsteuer gem. § 19 UStG nicht ausgewiesen</span><span class="val" style="color:#94a3b8">entfällt</span></div>`
     :`<div class="sum-row"><span class="lbl">Mehrwertsteuer 19%</span><span class="val">${mwst.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>`}
  <div class="sum-row"><span class="lbl">${ku?'GESAMTBETRAG (netto)':'GESAMTBETRAG (brutto)'}</span><span class="val">${brutto.toLocaleString('de-DE',{minimumFractionDigits:2})} €</span></div>
</div>
${S.kva.notes?`<div class="notes-box"><strong>Besondere Vereinbarungen:</strong><br>${S.kva.notes.replace(/\n/g,'<br>')}</div>`:''}
${ku?`<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:7px 14px;font-size:9px;color:#166534;margin-bottom:10px">Gemäß § 19 UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer erhoben und ausgewiesen.</div>`:''}
<div class="footer">
  <div>SecureStay Solutions UG (haftungsbeschränkt) · Kirchstr. 8b · 55270 Essenheim · securestay@outlook.de</div>
  <div>Erstellt: ${new Date().toLocaleDateString('de-DE')} · ${S.kva.nr||''}</div>
</div>
</body></html>`;
  const w=window.open('','_blank','width=900,height=750');
  w.document.write(html);w.document.close();
  setTimeout(()=>w.print(),600);
}

