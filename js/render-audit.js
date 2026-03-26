function renderMeta(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const deOpts=['','Erstaudit','Überwachungsaudit','Re-Zertifizierung','KRITIS','NIS2','Internes Audit'];
  const enOpts=['','Initial Audit','Surveillance Audit','Re-Certification','KRITIS','NIS2','Internal Audit'];
  const opts=L==='en'?enOpts:deOpts;
  const risk=calcObjectRisk();
  const yn=(key,label,extra='')=>{
    const v=S.meta[key]||'';
    const opts3=[['','– '],['ja',L==='en'?'Yes':'Ja'],['nein',L==='en'?'No':'Nein'],['unbekannt',L==='en'?'Unknown':'Unbekannt']];
    return`<div class="fg"><label>${label}</label><select onchange="S.meta.${key}=this.value;save();document.getElementById('obj-risk-badge').textContent='${L==='en'?'Risk':'Risiko'}: '+calcObjectRisk().level;document.getElementById('obj-risk-badge').style.color='var(--'+calcObjectRisk().cls+')';">${opts3.map(([v2,l2])=>`<option value="${v2}" ${v===v2?'selected':''}>${l2}</option>`).join('')}</select>${extra}</div>`;
  };
  const ynOpts=(key,label,optsArr)=>{
    const v=S.meta[key]||'';
    return`<div class="fg"><label>${label}</label><select onchange="S.meta.${key}=this.value;save();">${optsArr.map(([v2,l2])=>`<option value="${v2}" ${v===v2?'selected':''}>${l2}</option>`).join('')}</select></div>`;
  };
  document.getElementById('mainContent').innerHTML=`<div class="panel">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:2px">
    <div><div class="panel-title">${L==='en'?'Object Data & Risk Profile':'Objektdaten & Risikoprofil'}</div>
    <p class="panel-sub" style="margin-bottom:0">${L==='en'?'Complete all sections for accurate risk scoring, report, and cost estimate.':'Alle Abschnitte ausfüllen für präzise Risikowertung, Bericht und Kalkulation.'}</p></div>
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:10px 16px;text-align:center;min-width:110px">
      <div style="font-family:var(--fm);font-size:1.4rem;font-weight:800;color:var(--${risk.cls})">${risk.score}</div>
      <div style="font-family:var(--fm);font-size:.48rem;letter-spacing:.06em;text-transform:uppercase;color:var(--soft);margin-bottom:2px">${L==='en'?'Risk Score':'Risiko-Score'}</div>
      <div id="obj-risk-badge" style="font-family:var(--fm);font-size:.56rem;font-weight:700;color:var(--${risk.cls})">${risk.level}</div>
    </div>
  </div>

  <div class="section-divider"></div>
  <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-bottom:8px">${L==='en'?'1 · Audit Data':'1 · Auditdaten'}</div>
  <div class="mg" style="margin-bottom:14px">
    <div class="fg"><label>${L==='en'?'Object / Site Name':'Objekt / Standortname'}</label><input value="${esc(S.meta.objekt)}" oninput="S.meta.objekt=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Client / Operator':'Auftraggeber / Betreiber'}</label><input value="${esc(S.meta.auftraggeber)}" oninput="S.meta.auftraggeber=this.value;save()"></div>
    <div class="fg fg-full"><label>${L==='en'?'Full Address':'Vollständige Adresse'}</label><input value="${esc(S.meta.adresse)}" oninput="S.meta.adresse=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Audit Date':'Auditdatum'}</label><input type="date" value="${esc(S.meta.datum)}" oninput="S.meta.datum=this.value;save()"></div>
    <div class="fg"><label>Auditor</label><input value="${esc(S.meta.pruefer)}" oninput="S.meta.pruefer=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Occasion / Audit Type':'Anlass / Auditart'}</label><select onchange="S.meta.anlass=this.value;save()">${opts.map(o=>`<option ${S.meta.anlass===o?'selected':''}>${o||(L==='en'?'Please select…':'Bitte wählen…')}</option>`).join('')}</select></div>
  </div>

  <div class="section-divider"></div>
  <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-bottom:8px">${L==='en'?'2 · Building & Structure':'2 · Gebäude & Struktur'}</div>
  <div class="mg" style="margin-bottom:14px">
    ${ynOpts('gebaeudetype',L==='en'?'Building Type':'Gebäudetyp',[['','– '],['Bürogebäude',L==='en'?'Office Building':'Bürogebäude'],['Produktionshalle',L==='en'?'Production Hall':'Produktionshalle'],['Lager / Logistik',L==='en'?'Warehouse / Logistics':'Lager / Logistik'],['Einzelhandel',L==='en'?'Retail':'Einzelhandel'],['Behörde / Verwaltung',L==='en'?'Authority / Administration':'Behörde / Verwaltung'],['Religiöse Einrichtung',L==='en'?'Religious Institution':'Religiöse Einrichtung'],['Krankenhaus / Klinik',L==='en'?'Hospital / Clinic':'Krankenhaus / Klinik'],['Schule / Bildung',L==='en'?'School / Education':'Schule / Bildung'],['Rechenzentrum / IT',L==='en'?'Data Center / IT':'Rechenzentrum / IT'],['Gemischte Nutzung',L==='en'?'Mixed Use':'Gemischte Nutzung'],['Sonstiges',L==='en'?'Other':'Sonstiges']])}
    <div class="fg"><label>${L==='en'?'Year of Construction':'Baujahr'}</label><input type="number" min="1800" max="2025" placeholder="z.B. 1998" value="${esc(S.meta.baujahr)}" oninput="S.meta.baujahr=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Number of Buildings on Site':'Anzahl Gebäude auf Gelände'}</label><input type="number" min="1" placeholder="1" value="${esc(S.meta.anzahlGebaeude||'1')}" oninput="S.meta.anzahlGebaeude=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Floors (incl. basement)':'Stockwerke (inkl. UG)'}</label><input type="number" min="0" placeholder="z.B. 3" value="${esc(S.meta.stockwerke)}" oninput="S.meta.stockwerke=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Floor Area (m²)':'Grundfläche gesamt (m²)'}</label><input type="number" min="0" placeholder="z.B. 1200" value="${esc(S.meta.flaeche)}" oninput="S.meta.flaeche=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Employees / Regular Persons':'Mitarbeiter / Regelpersonen'}</label><input type="number" min="0" placeholder="z.B. 50" value="${esc(S.meta.mitarbeiter)}" oninput="S.meta.mitarbeiter=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Entrances (pedestrian)':'Eingänge (Personen)'}</label><input type="number" min="0" placeholder="z.B. 3" value="${esc(S.meta.eingaenge)}" oninput="S.meta.eingaenge=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Vehicle Gates / Driveways':'Einfahrten / Tore (Fahrzeuge)'}</label><input type="number" min="0" placeholder="z.B. 2" value="${esc(S.meta.einfahrten)}" oninput="S.meta.einfahrten=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Parking Spaces':'Parkplätze'}</label><input type="number" min="0" placeholder="z.B. 40" value="${esc(S.meta.parkplaetze)}" oninput="S.meta.parkplaetze=this.value;save()"></div>
    ${ynOpts('aussengelaende',L==='en'?'Outdoor / Perimeter Area':'Außengelände / Freigelände',[['','– '],['ja',L==='en'?'Yes':'Ja'],['nein',L==='en'?'No':'Nein']])}
  </div>

  <div class="section-divider"></div>
  <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-bottom:8px">${L==='en'?'3 · Security Infrastructure (existing)':'3 · Vorhandene Sicherheitsinfrastruktur'}</div>
  <div class="mg" style="margin-bottom:14px">
    ${ynOpts('zugangskontrolle',L==='en'?'Access Control System':'Zugangskontrollsystem',[['','– '],['vollständig',L==='en'?'Fully implemented':'Vollständig vorhanden'],['teilweise',L==='en'?'Partially implemented':'Teilweise vorhanden'],['nein',L==='en'?'Not present':'Nicht vorhanden'],['veraltet',L==='en'?'Outdated/deficient':'Veraltet / mangelhaft']])}
    ${ynOpts('alarmanlage',L==='en'?'Intrusion Alarm System':'Einbruchmeldeanlage (EMA)',[['','– '],['ja',L==='en'?'Present & functional':'Vorhanden & funktionsfähig'],['teilweise',L==='en'?'Partial / not all zones':'Nur teilweise / nicht alle Bereiche'],['nein',L==='en'?'Not present':'Nicht vorhanden'],['defekt',L==='en'?'Defective':'Defekt / außer Betrieb']])}
    <div class="fg"><label>${L==='en'?'Existing CCTV Cameras':'Vorhandene Kameras (Anzahl)'}</label><input type="number" min="0" placeholder="z.B. 8" value="${esc(S.meta.kameras)}" oninput="S.meta.kameras=this.value;save()"></div>
    ${ynOpts('sicherheitsdienst',L==='en'?'Security Service':'Sicherheitsdienst / Wachdienst',[['','– '],['ja',L==='en'?'Yes, regular':'Ja, regelmäßig'],['nein',L==='en'?'No':'Nein'],['geplant',L==='en'?'Planned':'Geplant']])}
    ${ynOpts('bewachung24h',L==='en'?'24h Guarding':'24h / 7d Bewachung vor Ort',[['','– '],['ja','Ja'],['nein','Nein'],['teilweise',L==='en'?'Partial (day only)':'Teilweise (nur Tageszeit)']])}
    ${ynOpts('schluessel',L==='en'?'Key Management System':'Schlüsselmanagement geregelt',[['','– '],['ja',L==='en'?'Yes, documented':'Ja, dokumentiert'],['nein',L==='en'?'No / informal':'Nein / informell'],['teilweise',L==='en'?'Partial':'Teilweise']])}
    ${ynOpts('einzaeunung',L==='en'?'Perimeter Fence / Enclosure':'Einzäunung / Perimeterschutz',[['','– '],['ja',L==='en'?'Complete perimeter':'Vollständig eingezäunt'],['teilweise',L==='en'?'Partial':'Teilweise'],['nein','Nein']])}
    ${ynOpts('aussenbeleuchtung',L==='en'?'Outdoor / Perimeter Lighting':'Außenbeleuchtung Gelände',[['','– '],['ja',L==='en'?'Complete':'Vollständig'],['teilweise',L==='en'?'Partial':'Teilweise'],['nein','Nein']])}
    ${ynOpts('serverraumgesichert',L==='en'?'Server Room / IT Room secured':'Serverraum / IT-Raum gesichert',[['','– '],['ja',L==='en'?'Yes, locked & access controlled':'Ja, gesperrt & zugangskontrolliert'],['nein',L==='en'?'No / accessible':'Nein / frei zugänglich'],['nicht vorhanden',L==='en'?'N/A – no server room':'Nicht vorhanden']])}
  </div>

  <div class="section-divider"></div>
  <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
    <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--danger)">${L==='en'?'4 · Incident History & Damage Record':'4 · Vorfallhistorie & Schadensdokumentation'}</div>
    <div style="font-family:var(--fm);font-size:.44rem;padding:2px 7px;border-radius:999px;background:var(--dangerDim);color:var(--danger);border:1px solid rgba(239,68,68,.2)">${L==='en'?'HIGH IMPACT ON RISK SCORE':'HOHER EINFLUSS AUF RISIKO-SCORE'}</div>
  </div>
  <div class="mg" style="margin-bottom:14px">
    ${yn('einbrueche',L==='en'?'Break-ins known / documented':'Einbrüche bekannt / dokumentiert')}
    ${yn('diebstahl',L==='en'?'Theft incidents (external) known':'Diebstähle (extern) bekannt')}
    ${yn('personaldiebstahl',L==='en'?'Internal theft / insider incidents known':'Personaldiebstahl / interne Vorfälle bekannt')}
    ${yn('sabotage',L==='en'?'Sabotage / vandalism known':'Sabotage / Vandalismus bekannt')}
    ${yn('brandschaden',L==='en'?'Fire damage in the past':'Brandschäden in der Vergangenheit')}
    ${yn('itVorfaelle',L==='en'?'IT security incidents known (hack, ransomware…)':'IT-Sicherheitsvorfälle bekannt (Hack, Ransomware…)')}
    ${yn('versicherungsschaden',L==='en'?'Insurance claim filed in last 3 years':'Versicherungsschaden gemeldet (letzte 3 Jahre)')}
    <div class="fg"><label>${L==='en'?'No. of security incidents last 12 months':'Anzahl Sicherheitsvorfälle letzte 12 Monate'}</label><input type="number" min="0" placeholder="0" value="${esc(S.meta.vorfaelle12m)}" oninput="S.meta.vorfaelle12m=this.value;save()"></div>
    <div class="fg"><label>${L==='en'?'Last risk analysis performed':'Letzte Risikoanalyse durchgeführt'}</label><input type="date" value="${esc(S.meta.letzteRisikoanalyse)}" oninput="S.meta.letzteRisikoanalyse=this.value;save()"></div>
    <div class="fg fg-full"><label>${L==='en'?'Description of known incidents / damages (free text)':'Beschreibung bekannter Vorfälle / Schäden (Freitext)'}</label><textarea style="min-height:70px" oninput="S.meta.vorfaelleFreitext=this.value;save()">${esc(S.meta.vorfaelleFreitext)}</textarea></div>
  </div>

  <div class="section-divider"></div>
  <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-bottom:8px">${L==='en'?'5 · Risk Profile & Classification':'5 · Risikoprofil & Einstufung'}</div>
  <div class="mg" style="margin-bottom:14px">
    ${ynOpts('schutzbedarf',L==='en'?'Protection Requirement Level (BSI)':'Schutzbedarf (BSI-Einstufung)',[['','– '],['normal','Normal'],['erhöht',L==='en'?'Elevated':'Erhöht'],['sehr hoch',L==='en'?'Very High / Critical':'Sehr hoch / Kritisch']])}
    ${ynOpts('lage',L==='en'?'Location / Neighbourhood':'Lage / Umfeld (Sicherheit)',[['','– '],['gut',L==='en'?'Good / safe area':'Gut / sicheres Umfeld'],['mittel',L==='en'?'Average':'Mittel'],['problematisch',L==='en'?'Problematic / high-crime':'Problematisch / erhöhte Kriminalität']])}
    ${ynOpts('besucherverkehr',L==='en'?'Visitor / Public Traffic':'Besucherverkehr / Publikumsverkehr',[['','– '],['gering',L==='en'?'Low (internal only)':'Gering (nur intern)'],['mittel',L==='en'?'Moderate':'Mittel'],['hoch',L==='en'?'High':'Hoch'],['sehr hoch',L==='en'?'Very high (public building)':'Sehr hoch (öffentliche Einrichtung)']])}
    ${yn('oeffentlichZugaenglich',L==='en'?'Publicly accessible (open to anyone)':'Öffentlich zugänglich (jedermann)')}
    ${yn('nachtnutzung',L==='en'?'Night / weekend operations':'Nacht- / Wochenendnutzung')}
    ${yn('kritischeInfrastruktur',L==='en'?'Critical infrastructure (KRITIS)':'Kritische Infrastruktur (KRITIS-relevant)')}
    ${yn('gefaehrlicheStoffe',L==='en'?'Hazardous materials on site':'Gefährliche Stoffe / Gefahrgut vor Ort')}
    ${yn('kassenbereich',L==='en'?'Cash handling / valuables storage':'Kassenbereich / Wertaufbewahrung')}
    ${yn('datenschutz',L==='en'?'Personal data / GDPR sensitive data processed':'Personenbezogene / DSGVO-relevante Daten')}
  </div>

  <div class="section-divider"></div>
  <div class="fg fg-full" style="margin-bottom:0"><label>${L==='en'?'General Notes':'Allgemeine Notizen'}</label><textarea oninput="S.meta.notizen=this.value;save()">${esc(S.meta.notizen)}</textarea></div>
  <div class="nav-row"><button class="btn-s" onclick="prev()">←</button><button class="btn-p" onclick="next()">${L==='en'?'Start Inspection →':'Begehung starten →'}</button></div></div>`;
}

// ═══ UMFELD ═══
function renderUmfeld(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const u=S.umfeld||{};
  const hasAddr=!!(S.meta.adresse&&S.meta.adresse.trim().length>=5);
  const riskCol={hoch:'var(--danger)',mittel:'var(--warn)',niedrig:'var(--ok)',info:'var(--cyan)'};
  const riskIcon={hoch:'HIGH',mittel:'MED',niedrig:'LOW',info:'INFO'};
  let cards='';
  if(u.done&&u.risks){
    u.risks.forEach(r=>{
      cards+=`<div class="uf-card uf-${r.level}">
        <div class="uf-icon">${r.icon}</div>
        <div class="uf-body">
          <div class="uf-title">${r.category}<span class="uf-badge" style="background:${riskCol[r.level]}22;color:${riskCol[r.level]};border:1px solid ${riskCol[r.level]}44;font-family:var(--fm);font-size:.46rem;letter-spacing:.06em">${riskIcon[r.level]}</span>${r.count?` <span style="font-family:var(--fm);font-size:.54rem;color:var(--muted)">${r.count} ${L==='en'?'found':'gefunden'}</span>`:''}</div>
          <div class="uf-desc">${r.desc}</div>
          ${r.items?.length?`<div style="font-size:.7rem;color:var(--soft);margin-bottom:5px">${r.items.join(' · ')}</div>`:''}
          <div class="uf-rec"><span style="font-family:var(--fm);font-size:.5rem;color:var(--accent);background:var(--accentDim);border:1px solid rgba(20,184,166,.2);border-radius:3px;padding:1px 4px;margin-right:4px">REC</span>${r.recommend}</div>
        </div>
      </div>`;
    });
    if(!u.risks.length)cards=`<div style="text-align:center;padding:20px;color:var(--ok)">${L==='en'?'No significant risks identified in the vicinity.':'Keine besonderen Risiken im Umfeld identifiziert.'}</div>`;
  }
  const ts=u.timestamp?new Date(u.timestamp).toLocaleString(L==='de'?'de-DE':'en-GB'):'';
  document.getElementById('mainContent').innerHTML=`
  <div class="panel">
    <div class="panel-title">${L==='en'?'Site Environment Analysis':'Umfeldanalyse'}</div>
    <p class="panel-sub">${L==='en'?'Automated risk analysis of the surrounding area based on OpenStreetMap data (1 km radius).':'Automatische Risikoanalyse der Umgebung auf Basis von OpenStreetMap-Daten (1 km Radius).'}</p>
    ${!hasAddr?`<div style="background:var(--warnDim);border:1px solid rgba(234,179,8,.2);border-radius:10px;padding:14px;margin-bottom:16px;font-size:.82rem;color:var(--warn)">${L==='en'?'Please enter an address in Object Data first.':'Bitte zuerst eine Adresse in den Objektdaten eingeben.'}</div>`:''}
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:16px">
      <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-bottom:6px">${L==='en'?'Address':'Adresse'}</div>
      <div style="font-size:.9rem;color:var(--text2);font-weight:600">${esc(S.meta.adresse||'–')}</div>
      ${u.done?`<div style="font-size:.7rem;color:var(--muted);margin-top:4px">${L==='en'?'Coordinates':'Koordinaten'}: ${u.lat?.toFixed(5)}, ${u.lon?.toFixed(5)} · ${ts}</div>`:''}
    </div>
    <div id="uf-status" style="margin-bottom:10px"></div>
    <div style="display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap">
      <button class="btn-p" id="uf-btn" onclick="startUmfeldanalyse()" ${!hasAddr?'disabled':''}>${u.done?(L==='en'?'Re-analyse':'Neu analysieren'):(L==='en'?'Start Site Analysis':'Umfeldanalyse starten')}</button>
      ${u.done?`<a href="https://www.openstreetmap.org/#map=15/${u.lat}/${u.lon}" target="_blank" class="btn-sm accent" style="text-decoration:none;display:inline-flex;align-items:center">OpenStreetMap</a>`:''}
      ${u.done?`<button class="btn-sm" onclick="S.umfeld={done:false};save();render()">${L==='en'?'Reset':'Zurücksetzen'}</button>`:''}
    </div>
    ${u.done?`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap">
      <div class="risk-level ${u.overallRiskCls}">● ${L==='en'?'Area Risk':'Umfeld-Risiko'}: <strong>${u.overallRisk}</strong></div>
      <div style="font-family:var(--fm);font-size:.66rem;color:var(--muted)">${u.poiCount} ${L==='en'?'objects found':'Objekte gefunden'} · ${L==='en'?'radius':'Radius'} ${u.radius}m</div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:6px;margin-bottom:16px">
      ${u.stats?.synagogues>0?`<div class="stat danger" style="padding:8px 6px"><div class="stat-val" style="font-size:1.1rem">${u.stats.synagogues}</div><div class="stat-lbl">${L==='en'?'Synagogues':'Synagogen'}</div></div>`:''}
      ${u.stats?.mosques>0?`<div class="stat warn" style="padding:8px 6px"><div class="stat-val" style="font-size:1.1rem">${u.stats.mosques}</div><div class="stat-lbl">${L==='en'?'Mosques':'Moscheen'}</div></div>`:''}
      ${u.stats?.churches>0?`<div class="stat ok" style="padding:8px 6px"><div class="stat-val" style="font-size:1.1rem">${u.stats.churches}</div><div class="stat-lbl">${L==='en'?'Churches':'Kirchen'}</div></div>`:''}
      ${u.stats?.government>0?`<div class="stat orange" style="padding:8px 6px"><div class="stat-val" style="font-size:1.1rem">${u.stats.government}</div><div class="stat-lbl">${L==='en'?'Authorities':'Behörden'}</div></div>`:''}
      ${u.stats?.police>0?`<div class="stat blue" style="padding:8px 6px"><div class="stat-val" style="font-size:1.1rem">${u.stats.police}</div><div class="stat-lbl">${L==='en'?'Police':'Polizei'}</div></div>`:''}
      ${u.stats?.military>0?`<div class="stat purple" style="padding:8px 6px"><div class="stat-val" style="font-size:1.1rem">${u.stats.military}</div><div class="stat-lbl">${L==='en'?'Military':'Militär'}</div></div>`:''}
    </div>
    <div>${cards}</div>
    `:''}
    <div class="nav-row"><button class="btn-s" onclick="prev()">←</button><button class="btn-p" onclick="next()">${L==='en'?'Continue →':'Weiter →'}</button></div>
  </div>`;
}

async function startUmfeldanalyse(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const addr=S.meta.adresse;
  if(!addr||addr.trim().length<5){toast(L==='en'?'Please enter an address first':'Bitte zuerst Adresse eingeben','warn');return;}
  const btn=document.getElementById('uf-btn');
  const status=document.getElementById('uf-status');
  if(btn){btn.disabled=true;btn.textContent='⏳ '+(L==='en'?'Analysing...':'Analyse läuft...');}
  if(status)status.innerHTML=`<div style="color:var(--muted);font-size:.8rem;padding:8px 0">🔍 ${L==='en'?'Geocoding address...':'Geocodierung der Adresse...'}</div>`;
  const OVERPASS_ENDPOINTS=['https://overpass-api.de/api/interpreter','https://overpass.kumi.systems/api/interpreter','https://maps.mail.ru/osm/tools/overpass/api/interpreter'];
  async function fetchOverpass(q){
    for(const ep of OVERPASS_ENDPOINTS){
      try{
        const r=await fetch(ep,{method:'POST',body:'data='+encodeURIComponent(q),headers:{'Content-Type':'application/x-www-form-urlencoded'}});
        if(!r.ok)continue;
        const d=await r.json();
        if(d&&d.elements!==undefined)return d;
      }catch(e){continue;}
    }
    throw new Error(L==='en'?'Overpass API unavailable — all endpoints failed':'Overpass API nicht erreichbar — alle Endpunkte fehlgeschlagen');
  }
  try{
    const geoRes=await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addr)}&format=json&limit=1&addressdetails=1`,{headers:{'Accept':'application/json'}});
    if(!geoRes.ok)throw new Error(L==='en'?'Geocoding failed (HTTP '+geoRes.status+')':'Geocodierung fehlgeschlagen (HTTP '+geoRes.status+')');
    const geoData=await geoRes.json();
    if(!geoData||!geoData.length){
      toast(L==='en'?'Address not found':'Adresse nicht gefunden','error');
      if(btn){btn.disabled=false;btn.textContent=L==='en'?'Start Site Analysis':'Umfeldanalyse starten';}
      if(status)status.innerHTML=`<div style="color:var(--danger);font-size:.8rem;padding:8px 0">❌ ${L==='en'?'Address not found. Please check.':'Adresse nicht gefunden. Bitte prüfen.'}</div>`;
      return;
    }
    const {lat,lon}=geoData[0];const latF=parseFloat(lat),lonF=parseFloat(lon);
    if(status)status.innerHTML=`<div style="color:var(--muted);font-size:.8rem;padding:8px 0">📡 ${L==='en'?'Fetching nearby objects...':'Umgebungsobjekte werden geladen...'}</div>`;
    const radius=1000;
    const q=`[out:json][timeout:30];(node(around:${radius},${latF},${lonF})[amenity=place_of_worship];way(around:${radius},${latF},${lonF})[amenity=place_of_worship];node(around:${radius},${latF},${lonF})[amenity=police];node(around:${radius},${latF},${lonF})[amenity=hospital];node(around:${radius},${latF},${lonF})[amenity=school];node(around:${radius},${latF},${lonF})[amenity=university];node(around:${radius},${latF},${lonF})[amenity=bank];node(around:${radius},${latF},${lonF})[amenity=courthouse];node(around:${radius},${latF},${lonF})[amenity=embassy];node(around:${radius},${latF},${lonF})[office=government];node(around:${radius},${latF},${lonF})[landuse=military];node(around:${radius},${latF},${lonF})[amenity=fire_station];node(around:${radius},${latF},${lonF})[railway=station];node(around:${radius},${latF},${lonF})[public_transport=station];node(around:${radius},${latF},${lonF})[shop=mall];node(around:${radius},${latF},${lonF})[amenity=marketplace];node(around:${radius},${latF},${lonF})[tourism=museum];node(around:${radius},${latF},${lonF})[historic=memorial];node(around:${radius},${latF},${lonF})[amenity=prison];);out body qt;`;
    const ovData=await fetchOverpass(q);
    const pois=ovData.elements||[];
    const worship=pois.filter(p=>p.tags?.amenity==='place_of_worship');
    const syn=worship.filter(p=>p.tags?.religion==='jewish'||(p.tags?.name||'').toLowerCase().includes('synagog')||(p.tags?.name||'').toLowerCase().includes('jüdisch'));
    const mos=worship.filter(p=>p.tags?.religion==='muslim'||(p.tags?.name||'').toLowerCase().includes('moschee')||(p.tags?.name||'').toLowerCase().includes('mosque'));
    const chr=worship.filter(p=>!syn.includes(p)&&!mos.includes(p)&&(p.tags?.religion==='christian'||(p.tags?.name||'').toLowerCase().includes('kirche')||(p.tags?.name||'').toLowerCase().includes('church')||(p.tags?.name||'').toLowerCase().includes('dom')));
    const otherW=worship.filter(p=>!syn.includes(p)&&!mos.includes(p)&&!chr.includes(p));
    const police=pois.filter(p=>p.tags?.amenity==='police');
    const hosp=pois.filter(p=>p.tags?.amenity==='hospital');
    const schools=pois.filter(p=>p.tags?.amenity==='school'||p.tags?.amenity==='university');
    const banks=pois.filter(p=>p.tags?.amenity==='bank');
    const gov=pois.filter(p=>p.tags?.amenity==='courthouse'||p.tags?.amenity==='embassy'||p.tags?.office==='government');
    const mil=pois.filter(p=>p.tags?.landuse==='military'||p.tags?.amenity==='prison');
    const transit=pois.filter(p=>p.tags?.railway==='station'||p.tags?.public_transport==='station');
    const pub=pois.filter(p=>p.tags?.shop==='mall'||p.tags?.amenity==='marketplace'||p.tags?.tourism==='museum'||p.tags?.historic==='memorial');
    const risks=[];let score=0;
    if(syn.length){score+=3;risks.push({level:'hoch',icon:'SYN',category:L==='en'?'Jewish Institution (Synagogue)':'Jüdische Einrichtung (Synagoge)',count:syn.length,desc:L==='en'?`${syn.length} synagogue(s) within 1 km. High security requirement — frequently under police protection. Heightened vigilance against antisemitic violence.`:`${syn.length} Synagoge(n) im 1-km-Radius. Erhöhter Schutzbedarf – häufig unter Polizeischutz. Besondere Wachsamkeit gegenüber antisemitischer Gewalt erforderlich.`,items:syn.map(p=>p.tags?.name||'Synagoge').slice(0,3),recommend:L==='en'?'Coordinate with local police authority. Review perimeter protection and CCTV coverage.':'Abstimmung mit zuständiger Polizeidienststelle empfohlen. Perimeterschutz und Videoüberwachung prüfen.'});}
    if(mos.length){score+=2;risks.push({level:'mittel',icon:'MOS',category:L==='en'?'Islamic Institution (Mosque)':'Islamische Einrichtung (Moschee)',count:mos.length,desc:L==='en'?`${mos.length} mosque(s) within 1 km. Potential target for hate crime.`:`${mos.length} Moschee(n) im 1-km-Radius. Mögliches Ziel für Hasskriminalität.`,items:mos.map(p=>p.tags?.name||'Moschee').slice(0,3),recommend:L==='en'?'CCTV at entrances, adequate lighting, police contact recommended.':'Videoüberwachung an Eingängen, gute Beleuchtung, Polizeikontakt empfohlen.'});}
    if(chr.length){score+=1;risks.push({level:'niedrig',icon:'CHR',category:L==='en'?'Christian Institution (Church)':'Christliche Einrichtung (Kirche)',count:chr.length,desc:L==='en'?`${chr.length} church(es) within 1 km.`:`${chr.length} Kirche(n) im 1-km-Radius.`,items:chr.map(p=>p.tags?.name||'Kirche').slice(0,3),recommend:L==='en'?'Standard security measures. Enhanced presence during major events.':'Standardsicherheitsmaßnahmen ausreichend. Bei Großveranstaltungen erhöhte Präsenz.'});}
    if(otherW.length){risks.push({level:'info',icon:'REL',category:L==='en'?'Other Religious Institutions':'Sonstige Religionsgemeinschaften',count:otherW.length,desc:L==='en'?`${otherW.length} other religious institution(s) in vicinity.`:`${otherW.length} sonstige Religionsgemeinde(n) im Umfeld.`,items:otherW.map(p=>p.tags?.name||'Religionsgemeinschaft').slice(0,3),recommend:L==='en'?'Cultural sensitivity and standard security measures.':'Kulturelle Sensibilität und Standardsicherheitsmaßnahmen.'});}
    if(gov.length){score+=2;risks.push({level:'mittel',icon:'GOV',category:L==='en'?'Government / Embassy':'Behörde / Botschaft',count:gov.length,desc:L==='en'?`${gov.length} government/embassy building(s) within 1 km. Elevated risk during demonstrations or political events.`:`${gov.length} Behörde(n)/Botschaft(en) im 1-km-Radius. Erhöhtes Risiko bei Demonstrationen oder politischen Ereignissen.`,items:gov.map(p=>p.tags?.name||'Behörde').slice(0,3),recommend:L==='en'?'Prepare for demonstrations and political events. Monitor police situation reports.':'Auf Demonstrationen und politische Ereignisse vorbereiten. Polizeiliche Lageberichte beobachten.'});}
    if(mil.length){score+=2;risks.push({level:'mittel',icon:'MIL',category:L==='en'?'Military / Detention Facility':'Militärische Einrichtung / JVA',count:mil.length,desc:L==='en'?`${mil.length} military/security facility in vicinity.`:`${mil.length} militärische/sicherheitsrelevante Anlage im Umfeld.`,items:mil.map(p=>p.tags?.name||'Militär').slice(0,3),recommend:L==='en'?'Espionage and sabotage risk. Enhanced access control.':'Spionage- und Sabotagerisiko. Erhöhte Zutrittskontrolle empfohlen.'});}
    if(transit.length){score+=1;risks.push({level:'niedrig',icon:'TRN',category:L==='en'?'Public Transport Hub':'Öffentlicher Verkehrsknotenpunkt',count:transit.length,desc:L==='en'?`${transit.length} station(s) within 1 km. High foot traffic.`:`${transit.length} Bahnhof/Haltestelle im 1-km-Radius. Hoher Personenverkehr.`,items:transit.map(p=>p.tags?.name||'Haltestelle').slice(0,3),recommend:L==='en'?'Access control and CCTV at entrances especially important.':'Zutrittskontrolle und Videoüberwachung in Eingangsbereichen besonders wichtig.'});}
    if(banks.length){risks.push({level:'info',icon:'BNK',category:L==='en'?'Banks / Financial Institutions':'Banken / Finanzinstitute',count:banks.length,desc:L==='en'?`${banks.length} bank(s) within 1 km.`:`${banks.length} Bank(en) im 1-km-Radius.`,items:banks.map(p=>p.tags?.name||'Bank').slice(0,3),recommend:L==='en'?'Elevated risk for pickpocketing and cash transit in the area.':'Erhöhtes Risiko für Trickdiebstahl und Geldtransporte im Umfeld.'});}
    if(hosp.length){risks.push({level:'info',icon:'MED',category:L==='en'?'Hospitals / Medical Facilities':'Krankenhäuser / Gesundheitseinrichtungen',count:hosp.length,desc:L==='en'?`${hosp.length} hospital(s) within 1 km.`:`${hosp.length} Krankenhaus/Klinik im 1-km-Radius.`,items:hosp.map(p=>p.tags?.name||'Krankenhaus').slice(0,3),recommend:L==='en'?'Keep emergency access routes clear.':'Rettungszufahrten freihalten.'});}
    if(schools.length){risks.push({level:'info',icon:'EDU',category:L==='en'?'Schools / Educational Institutions':'Schulen / Bildungseinrichtungen',count:schools.length,desc:L==='en'?`${schools.length} school(s) within 1 km. High pedestrian volume at peak times.`:`${schools.length} Schule(n) im 1-km-Radius. Hoher Personenverkehr zu Stoßzeiten.`,items:schools.map(p=>p.tags?.name||'Schule').slice(0,3),recommend:L==='en'?'Account for peak hours in security planning.':'Stoßzeiten bei Sicherheitsplanung berücksichtigen.'});}
    if(pub.length){risks.push({level:'info',icon:'PUB',category:L==='en'?'Public Spaces / Landmarks':'Öffentliche Plätze / Sehenswürdigkeiten',count:pub.length,desc:L==='en'?`${pub.length} public venue(s) within 1 km.`:`${pub.length} öffentliche Einrichtung(en) im 1-km-Radius.`,items:pub.map(p=>p.tags?.name||'Einrichtung').slice(0,3),recommend:L==='en'?'Consider visitor flows and event calendars.':'Besucherströme und Veranstaltungskalender beachten.'});}
    let overallRisk,overallRiskCls;
    if(score>=6){overallRisk=L==='en'?'High':'Hoch';overallRiskCls='hoch';}
    else if(score>=3){overallRisk=L==='en'?'Medium':'Mittel';overallRiskCls='mittel';}
    else if(score>=1){overallRisk=L==='en'?'Low':'Gering';overallRiskCls='gering';}
    else{overallRisk=L==='en'?'Very Low':'Sehr gering';overallRiskCls='gering';}
    S.umfeld={done:true,lat:latF,lon:lonF,risks,riskScore:score,overallRisk,overallRiskCls,poiCount:pois.length,timestamp:new Date().toISOString(),radius,stats:{worship:worship.length,synagogues:syn.length,mosques:mos.length,churches:chr.length,police:police.length,hospitals:hosp.length,schools:schools.length,banks:banks.length,government:gov.length,military:mil.length,transit:transit.length}};
    save();render();
    if(status)status.innerHTML='';
    toast(L==='en'?'Site analysis complete':'Umfeldanalyse abgeschlossen','success');
  }catch(err){
    console.error('Umfeldanalyse error:',err);
    // Re-query DOM in case elements were replaced
    const btnE=document.getElementById('uf-btn');
    const statusE=document.getElementById('uf-status');
    if(btnE){btnE.disabled=false;btnE.textContent=L==='en'?'Start Site Analysis':'Umfeldanalyse starten';}
    if(statusE)statusE.innerHTML=`<div style="color:var(--danger);font-size:.82rem;padding:10px 12px;background:var(--dangerDim);border:1px solid rgba(220,38,38,.2);border-radius:8px;margin-bottom:8px">❌ <strong>${L==='en'?'Error':'Fehler'}:</strong> ${err.message}</div>`;
    toast((L==='en'?'Analysis failed: ':'Analyse fehlgeschlagen: ')+err.message,'error');
  }
}

// ═══ CHECK ═══
function renderCheck(ck){
  const chkL=typeof _LANG!=='undefined'?_LANG:'de';
  const FREQ_LABEL_EN={J:'Annually',Q:'Quarterly',M:'Monthly',O:'Ongoing'};
  const items=ck.items.map(it=>{
    const f=S.findings[it.id]||{},s=f.status||'',mc=modCls(it.m),ml=modLabel(it.m);
    const itLabel=(chkL==='en'&&it.l_en)?it.l_en:it.l;
    const itDesc=(chkL==='en'&&it.d_en)?it.d_en:it.d;
    const ld=S.docs.filter(d=>d.checkpoints?.includes(it.id));
    let dh=ld.length?ld.map(d=>`<div class="ci-doc"><span class="ci-dot ${docStatus(d)}"></span><a href="#" onclick="go('database');return false">${esc(d.name)}</a></div>`).join(''):`<div class="ci-doc"><span class="ci-dot gray"></span><span style="color:var(--soft)">${chkL==='en'?'No document':'Kein Dokument'}</span></div>`;
    // COBIT extras
    let extras='';
    if(it.m==='itgov'){
      extras=`<div class="ci-extras">`;
      extras+=`<span class="nb it" style="font-size:.44rem">COBIT ${it.n}</span>`;
      if(it.iso20k)extras+=`<span class="nb comb" style="font-size:.44rem">ISO 20000: ${it.iso20k}</span>`;
      if(it.f)extras+=`<span class="freq-badge">${(chkL==='en'?(FREQ_LABEL_EN[it.f]||it.f):(FREQ_LABEL[it.f]||it.f))}</span>`;
      extras+=`</div>`;
      if(it.rd)extras+=`<div class="ci-req-docs">${chkL==='en'?'Required evidence:':'Geforderte Nachweise:'} ${it.rd}</div>`;
    }
    return`<div class="ci ${s?'s-'+s:''}" id="ci_${it.id}"><div class="ci-top"><div class="ci-text"><div class="ci-label">${itLabel} <span class="mi ${mc}">${ml}</span></div><div class="ci-norm ${mc}">${it.n}</div><div class="ci-desc">${itDesc}</div>${extras}${dh}</div><div class="ci-btns"><button class="cb ok ${s==='ok'?'active':''}" onclick="setS('${it.id}','ok')">✓</button><button class="cb mangel ${s==='mangel'?'active':''}" onclick="setS('${it.id}','mangel')">⚠</button><button class="cb kritisch ${s==='kritisch'?'active':''}" onclick="setS('${it.id}','kritisch')">✕</button><button class="cb na ${s==='na'?'active':''}" onclick="setS('${it.id}','na')">–</button></div></div><div class="ci-note ${s&&s!=='ok'&&s!=='na'?'show':''}" id="note_${it.id}"><input placeholder="${chkL==='en'?'Note...':'Notiz...'}" value="${esc(f.note||'')}" oninput="setN('${it.id}',this.value)"></div></div>`;
  }).join('');
  const done=ck.items.filter(i=>S.findings[i.id]?.status).length;
  const nb=ck.norms.map(n=>`<span class="nb ${modCls(NORMS[n]?.m)}">${n}</span>`).join('');
  const ckL=typeof _LANG!=='undefined'?_LANG:'de';
  const ckTitle=(ckL==='en'&&ck.l_en)?ck.l_en:ck.l;
  const ckSub=(ckL==='en'&&ck.s_en)?ck.s_en:ck.s;
  const legend=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;padding:9px 12px;background:rgba(255,255,255,.02);border:1px solid var(--border);border-radius:8px;align-items:center">
    <span style="font-family:var(--fm);font-size:.46rem;letter-spacing:.08em;text-transform:uppercase;color:var(--soft);margin-right:4px">${ckL==='en'?'LEGEND:':'LEGENDE:'}</span>
    <span style="font-family:var(--fm);font-size:.54rem;padding:2px 8px;border-radius:999px;background:rgba(34,197,94,.15);color:var(--ok);border:1px solid rgba(34,197,94,.2)">${ckL==='en'?'✓ OK — Requirement met':'✓ OK — Anforderung erfüllt'}</span>
    <span style="font-family:var(--fm);font-size:.54rem;padding:2px 8px;border-radius:999px;background:var(--warnDim);color:var(--warn);border:1px solid rgba(234,179,8,.2)">${ckL==='en'?'⚠ Deficiency — Partial/documentation missing':'⚠ Mangel — Teilweise/Nachweis fehlt'}</span>
    <span style="font-family:var(--fm);font-size:.54rem;padding:2px 8px;border-radius:999px;background:var(--dangerDim);color:var(--danger);border:1px solid rgba(239,68,68,.2)">${ckL==='en'?'✕ Critical — Not implemented':'✕ Kritisch — Nicht umgesetzt'}</span>
    <span style="font-family:var(--fm);font-size:.54rem;padding:2px 8px;border-radius:999px;background:rgba(100,116,139,.08);color:var(--muted);border:1px solid rgba(100,116,139,.2)">${ckL==='en'?'– N/A — Not applicable':'– N/A — Nicht zutreffend'}</span>
  </div>`;
  document.getElementById('mainContent').innerHTML=`<div class="panel"><div>${nb}</div><div class="panel-title">${ckTitle}</div><p class="panel-sub">${ckSub} <strong style="color:var(--accent)">${done}/${ck.items.length}</strong></p>${legend}${items}<div class="nav-row"><button class="btn-s" onclick="prev()">←</button><button class="btn-p" onclick="next()">${ckL==='en'?'Continue →':'Weiter →'}</button></div></div>`;
}
function setS(id,s){if(!S.findings[id])S.findings[id]={status:'',note:''};S.findings[id].status=s;const ci=document.getElementById('ci_'+id);if(ci){ci.className='ci s-'+s;ci.querySelectorAll('.cb').forEach(b=>b.classList.toggle('active',b.classList.contains(s)));const n=document.getElementById('note_'+id);if(n)n.classList.toggle('show',s==='mangel'||s==='kritisch');}save();}
function setN(id,v){if(!S.findings[id])S.findings[id]={status:'',note:''};S.findings[id].note=v;save();}

// ═══ MATURITY ═══
function renderMaturity(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ac=activeChecks();
  const lbl={1:'Initial',2:'Managed',3:'Defined',4:'Controlled',5:'Optimized'};
  const lblDE={1:'Initial',2:'Gemanagt',3:'Definiert',4:'Kontrolliert',5:'Optimiert'};
  const tips={
    1:L==='en'?'Level 1 – Initial: Processes are unpredictable, poorly controlled and reactive. No formal procedures.':'Level 1 – Initial: Prozesse sind unvorhersehbar, kaum kontrolliert und reaktiv. Keine formalen Verfahren.',
    2:L==='en'?'Level 2 – Managed: Processes are planned and executed according to policy. Basic controls in place.':'Level 2 – Gemanagt: Prozesse werden geplant und gemäß Richtlinien durchgeführt. Grundlegende Kontrollen vorhanden.',
    3:L==='en'?'Level 3 – Defined: Processes are well-characterized, well-understood, and described as standards.':'Level 3 – Definiert: Prozesse sind gut charakterisiert, verstanden und als Standards beschrieben.',
    4:L==='en'?'Level 4 – Controlled: Processes are measured and controlled using quantitative techniques.':'Level 4 – Kontrolliert: Prozesse werden mit quantitativen Methoden gemessen und gesteuert.',
    5:L==='en'?'Level 5 – Optimized: Focus on continual process improvement through incremental and innovative changes.':'Level 5 – Optimiert: Kontinuierliche Prozessverbesserung durch inkrementelle und innovative Änderungen.'
  };
  let rows=ac.map(ck=>{const cur=S.maturity[ck.id]||0;const ckLabel=typeof ck.l_en!=='undefined'&&L==='en'?ck.l_en:ck.l;return`<div class="mat-row"><div class="mat-label">${ckLabel}</div><div class="mat-btns">${[1,2,3,4,5].map(lv=>`<button class="mat-btn l${lv} ${cur==lv?'active':''}" title="${tips[lv]}" onclick="S.maturity['${ck.id}']=${lv};save();render()">${lv}</button>`).join('')}</div><div style="font-size:.66rem;color:var(--muted);min-width:70px;text-align:right">${cur?(L==='en'?lbl[cur]:lblDE[cur]):'–'}</div></div>`;}).join('');
  const avg=ac.length?ac.reduce((s,c)=>s+(S.maturity[c.id]||0),0)/ac.length:0;
  const levelBox=`<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">
    ${[1,2,3,4,5].map(lv=>`<div style="flex:1;min-width:100px;background:var(--surface2);border:1px solid var(--border);border-radius:var(--r);padding:8px 10px" title="${tips[lv]}">
      <div style="font-family:var(--fm);font-size:.52rem;font-weight:700;color:${['','var(--danger)','var(--orange)','var(--warn)','var(--accent)','var(--ok)'][lv]};margin-bottom:2px">L${lv} — ${L==='en'?lbl[lv]:lblDE[lv]}</div>
      <div style="font-size:.62rem;color:var(--muted);line-height:1.4">${[
        '',
        L==='en'?'No formal processes, reactive':'Keine formalen Prozesse, reaktiv',
        L==='en'?'Basic controls in place':'Grundlegende Kontrollen vorhanden',
        L==='en'?'Documented organization-wide standards':'Dokumentierte organisationsweite Standards',
        L==='en'?'Quantitative measurement and control':'Quantitative Messung und Steuerung',
        L==='en'?'Continuous improvement culture':'Kultur der kontinuierlichen Verbesserung'
      ][lv]}</div>
    </div>`).join('')}
  </div>`;
  document.getElementById('mainContent').innerHTML=`<div class="panel"><div class="panel-title">${L==='en'?'Maturity Level':'Reifegradbewertung'}</div><p class="panel-sub">${L==='en'?'Rate each domain on a scale of 1 (Initial) to 5 (Optimized). Hover over the level buttons for detailed descriptions.':'Bewerten Sie jeden Bereich auf einer Skala von 1 (Initial) bis 5 (Optimiert). Fahren Sie mit der Maus über die Level-Buttons für detaillierte Beschreibungen.'}</p>
  ${levelBox}
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px"><div class="stat purple" style="padding:10px 16px"><div class="stat-val">${avg.toFixed(1)}</div><div class="stat-lbl">Ø Level</div></div></div>${rows}
  <div class="nav-row"><button class="btn-s" onclick="prev()">←</button><button class="btn-p" onclick="next()">${L==='en'?'Report →':'Bericht →'}</button></div></div>`;
}

// ═══ DB ═══
