function renderReport(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ac=activeChecks();let k=[],m=[],okItems=[],ok=0,cMin=0,cMax=0;
  ac.forEach(ch=>ch.items.forEach(it=>{const f=S.findings[it.id],s=f?.status;if(s==='ok'){ok++;okItems.push({...it,sec:ch.l});}else if(s==='kritisch'){k.push({...it,note:f?.note||'',sec:ch.l,icon:ch.i});const[a,b]=parseCost(it.c.kritisch);cMin+=a;cMax+=b;}else if(s==='mangel'){m.push({...it,note:f?.note||'',sec:ch.l,icon:ch.i});const[a,b]=parseCost(it.c.mangel);cMin+=a;cMax+=b;}}));
  const assessed=k.length+m.length+ok,comp=assessed?Math.round(ok/assessed*100):0;
  let rl,rc;if(k.length>=5){rl=L==='en'?'Critical':'Kritisch';rc='kritisch';}else if(k.length>=2||m.length>=6){rl=L==='en'?'High':'Hoch';rc='hoch';}else if(k.length>=1||m.length>=3){rl=L==='en'?'Medium':'Mittel';rc='mittel';}else{rl=L==='en'?'Low':'Gering';rc='gering';}
  const ds=S.meta.datum?new Date(S.meta.datum).toLocaleDateString(L==='en'?'en-GB':'de-DE',{day:'2-digit',month:'long',year:'numeric'}):'–';
  const avgMat=ac.length?ac.reduce((s,c)=>s+(S.maturity[c.id]||0),0)/ac.length:0;
  const modN={security:'Security',qm:'QM',itgov:'IT-Governance',combined:L==='en'?'Combined':'Kombiniertes',religion:L==='en'?'Religious Institutions':'Religionsgemeinschaften'}[S.module]||'';
  const fr=(f,p)=>`<div class="finding ${p}"><div class="finding-icon">${f.icon}</div><div class="f-body"><div class="f-label">${f.l} <span class="mi ${modCls(f.m)}">${modLabel(f.m)}</span>${f.m==='itgov'?` <span class="nb it" style="font-size:.42rem;margin:0">COBIT ${f.n}</span>`:''}</div><div class="f-section">${f.sec}${f.m!=='itgov'?' · '+f.n:''}</div>${f.note?`<div class="f-note">"${esc(f.note)}"</div>`:''}</div><div class="f-cost"><div class="f-cost-val">€ ${f.c[p]}</div><div class="f-cost-lbl">${L==='en'?'Estimate':'Schätzung'}</div></div></div>`;
  if(S.reportView==='konzept'){renderKonzept();return;}
  document.getElementById('mainContent').innerHTML=`
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
    <div class="rpt-tabs">
      <button class="rpt-tab active" onclick="S.reportView='begehung';render()">${L==='en'?'Inspection Report':'Begehungsprotokoll'}</button>
      <button class="rpt-tab konzept-tab" onclick="S.reportView='konzept';render()">${L==='en'?'Security Report':'Sicherheitsbericht'}</button>
    </div>
    <div style="display:flex;gap:6px">
      <button class="print-btn" onclick="exportData()" title="${L==='en'?'Backup as JSON':'Als JSON sichern'}">Backup</button>
      <button class="print-btn" style="border-color:rgba(20,184,166,.3);color:var(--accent)" onclick="window.print()">PDF</button>
    </div>
  </div>
  <div style="font-size:.68rem;color:var(--muted);margin-bottom:14px">${L==='en'?'Created':'Erstellt'}: ${new Date().toLocaleDateString(L==='en'?'en-GB':'de-DE',{day:'2-digit',month:'long',year:'numeric'})} · ${sessionStorage.getItem('ssa_u')||'Admin'}</div>
  <div class="rpt-hdr">
    <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:6px">SecureStay: Analytics · ${modN} Audit</div>
    <div class="rpt-title">${esc(S.meta.objekt)||'Objekt'}</div>
    <div class="rpt-meta" style="margin-top:6px">
      ${S.meta.auftraggeber?`<strong>${esc(S.meta.auftraggeber)}</strong> · `:''}${ds}${S.meta.pruefer?` · Auditor: ${esc(S.meta.pruefer)}`:''}
      ${S.meta.anlass?` · ${esc(S.meta.anlass)}`:''}${S.meta.adresse?`<br style="margin-top:3px">${esc(S.meta.adresse)}`:''}
    </div>
    ${(S.meta.eingaenge||S.meta.einfahrten||S.meta.stockwerke||S.meta.mitarbeiter||S.meta.flaeche)?`<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:10px;font-size:.72rem;color:var(--muted)">${S.meta.eingaenge?`<span><strong style="color:var(--text2)">${esc(S.meta.eingaenge)}</strong> ${L==='en'?'Entr.':'Eing.'}</span>`:''}${S.meta.einfahrten?`<span><strong style="color:var(--text2)">${esc(S.meta.einfahrten)}</strong> ${L==='en'?'Gates':'Einf.'}</span>`:''}${S.meta.stockwerke?`<span><strong style="color:var(--text2)">${esc(S.meta.stockwerke)}</strong> ${L==='en'?'Floors':'Stk.'}</span>`:''}${S.meta.mitarbeiter?`<span><strong style="color:var(--text2)">${esc(S.meta.mitarbeiter)}</strong> ${L==='en'?'Empl.':'MA'}</span>`:''}${S.meta.flaeche?`<span><strong style="color:var(--text2)">${esc(S.meta.flaeche)}</strong> m²</span>`:''}${S.meta.parkplaetze?`<span><strong style="color:var(--text2)">${esc(S.meta.parkplaetze)}</strong> ${L==='en'?'Parking':'PP'}</span>`:''}${S.meta.kameras?`<span><strong style="color:var(--text2)">${esc(S.meta.kameras)}</strong> ${L==='en'?'Cams':'Kam.'}</span>`:''}</div>`:''}
    ${S.norms.length?`<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:4px">${S.norms.map(n=>`<span class="nb ${modCls(NORMS[n]?.m)}">${n}</span>`).join('')}</div>`:''}
  </div>
  <div class="stats" style="grid-template-columns:repeat(6,1fr);margin-bottom:14px">
    <div class="stat danger"><div class="stat-val">${k.length}</div><div class="stat-lbl">${L==='en'?'Critical':'Kritisch'}</div></div>
    <div class="stat warn"><div class="stat-val">${m.length}</div><div class="stat-lbl">${L==='en'?'Deficiencies':'Mängel'}</div></div>
    <div class="stat ok"><div class="stat-val">${ok}</div><div class="stat-lbl">OK</div></div>
    <div class="stat total"><div class="stat-val">${assessed}</div><div class="stat-lbl">${L==='en'?'Assessed':'Bewertet'}</div></div>
    <div class="stat purple"><div class="stat-val">${comp}%</div><div class="stat-lbl">Compliance</div></div>
    <div class="stat emerald"><div class="stat-val">${avgMat.toFixed(1)}</div><div class="stat-lbl">${L==='en'?'Maturity':'Reifegrad'}</div></div>
  </div>
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;flex-wrap:wrap">
    <div class="risk-level ${rc}">● ${L==='en'?'Risk:':'Risiko:'} <strong>${rl}</strong></div>
    ${assessed>0?`<div style="flex:1;min-width:120px"><div style="height:6px;background:var(--border);border-radius:3px;overflow:hidden"><div style="width:${comp}%;height:100%;background:${comp>=80?'var(--ok)':comp>=50?'var(--warn)':'var(--danger)'};border-radius:3px;transition:.5s"></div></div><div style="font-size:.62rem;color:var(--muted);margin-top:3px">${comp}% ${L==='en'?'of assessed points compliant':'der bewerteten Punkte konform'}</div></div>`:''}
  </div>
  ${k.length?`<div style="margin-bottom:14px"><div style="font-family:var(--fm);font-size:.65rem;font-weight:700;color:var(--danger);margin-bottom:7px;padding:5px 10px;background:rgba(239,68,68,.06);border-radius:6px;display:inline-block">${L==='en'?`✕ Critical deficiencies (${k.length}) — Immediate action required`:`✕ Kritische Mängel (${k.length}) — Sofortiger Handlungsbedarf`}</div>${k.map(f=>fr(f,'kritisch')).join('')}</div>`:''}
  ${m.length?`<div style="margin-bottom:14px"><div style="font-family:var(--fm);font-size:.65rem;font-weight:700;color:var(--warn);margin-bottom:7px;padding:5px 10px;background:rgba(234,179,8,.06);border-radius:6px;display:inline-block">${L==='en'?`⚠ Deficiencies (${m.length}) — Medium-term action required`:`⚠ Verbesserungsbedarf (${m.length}) — Mittelfristiger Handlungsbedarf`}</div>${m.map(f=>fr(f,'mangel')).join('')}</div>`:''}
  ${!k.length&&!m.length?`<div style="background:var(--okDim);border:1px solid rgba(34,197,94,.18);border-radius:12px;padding:24px;text-align:center;margin-bottom:14px"><span style="color:#4ade80;font-size:1.1rem;font-weight:700">${L==='en'?'No deficiencies found':'Keine Mängel festgestellt'}</span><div style="font-size:.78rem;color:var(--muted);margin-top:4px">${L==='en'?'All assessed control points compliant':'Alle bewerteten Kontrollpunkte erfüllt'}</div></div>`:''}
  ${okItems.length?`<div style="margin-bottom:14px"><div style="font-family:var(--fm);font-size:.65rem;font-weight:700;color:var(--ok);margin-bottom:7px;padding:5px 10px;background:var(--okDim);border-radius:6px;display:inline-block">✓ ${L==='en'?`Compliant (${okItems.length})`:`Konform (${okItems.length})`}</div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:3px">${okItems.map(f=>`<div style="font-size:.7rem;color:var(--muted);padding:3px 8px;background:rgba(34,197,94,.04);border:1px solid rgba(34,197,94,.08);border-radius:5px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis" title="${esc(f.l)}">✓ ${esc(f.l)}</div>`).join('')}</div></div>`:''}
  <div class="cost-sum">
    <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:8px">${L==='en'?'💶 Investment Required (Estimate)':'💶 Investitionsbedarf (Schätzung)'}</div>
    <div class="cost-row"><span>${L==='en'?'⚡ Immediate measures (critical)':'⚡ Sofortmaßnahmen (kritisch)'}</span><span>€ ${fmtCA(k,'kritisch')}</span></div>
    <div class="cost-row"><span>${L==='en'?'📅 Medium-term (deficiencies)':'📅 Mittelfristig (Mängel)'}</span><span>€ ${fmtCA(m,'mangel')}</span></div>
    <div class="cost-row" style="border-top:1px solid var(--border2);margin-top:4px;padding-top:10px"><span style="color:var(--text2);font-weight:700">${L==='en'?'Total':'Gesamt'}</span><span style="color:var(--text2);font-weight:700;font-family:var(--fh);font-size:.92rem">€ ${cMin.toLocaleString('de-DE')} – ${cMax.toLocaleString('de-DE')}</span></div>
  </div>
  <div class="rpt-sig-row">
    <div class="rpt-sig-box"><div style="color:var(--text2);font-size:.8rem;font-weight:700;margin-bottom:3px">${esc(S.meta.pruefer||sessionStorage.getItem('ssa_u')||'–')}</div><div>${L==='en'?'Auditor · SecureStay: Analytics':'Auditor/in · SecureStay: Analytics'}</div><div style="color:var(--accent);font-size:.66rem;margin-top:2px">securestay@outlook.de</div></div>
    <div class="rpt-sig-box"><div style="color:var(--text2);font-size:.8rem;font-weight:700;margin-bottom:3px">___________________________</div><div>${L==='en'?'Client / Authorised Representative':'Auftraggeber / Bevollmächtigte/r'}</div></div>
    <div class="rpt-sig-box"><div style="color:var(--text2);font-size:.8rem;font-weight:700;margin-bottom:3px">_____________</div><div>${L==='en'?'Date':'Datum'}</div></div>
  </div>
  <div style="background:linear-gradient(135deg,rgba(20,184,166,.04),rgba(16,185,129,.02));border:1px solid rgba(20,184,166,.12);border-radius:12px;padding:18px;text-align:center;margin-top:6px">
    <div style="font-family:var(--fh);font-weight:700;color:var(--text2);font-size:1rem">SecureStay: Analytics</div>
    <div style="font-size:.76rem;color:var(--muted);margin-top:2px">SecureStay Solutions UG (haftungsbeschränkt)</div>
    <div style="font-size:.64rem;color:var(--soft);margin-top:2px">Kirchstr. 8b · 55270 Essenheim · securestay@outlook.de</div>
  </div>
  <div class="nav-row"><button class="btn-s" onclick="prev()">←</button><div style="display:flex;gap:6px"><button class="btn-p konzept-tab" onclick="S.reportView='konzept';render()" style="background:linear-gradient(135deg,var(--purple),#7c3aed);box-shadow:0 6px 18px rgba(167,139,250,.3)">📐 ${typeof _LANG!=='undefined'&&_LANG==='en'?'Generate Security Report':'Sicherheitsbericht erstellen'}</button><button class="btn-p" onclick="window.print()">🖨 PDF</button></div></div>`;
}

// ═══ KONZEPT HELPERS ═══
function _kskMeasureTable(items,prio,idOffset){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  if(!items.length)return`<div class="ksk-okbox">✓ ${L==='en'?`No ${prio==='kritisch'?'critical':'medium-term'} measures required.`:`Keine ${prio==='kritisch'?'kritischen':'mittelfristigen'} Maßnahmen erforderlich.`}</div>`;
  let idx=idOffset||0;
  const rows=items.map(f=>{
    idx++;
    const tf=prio==='kritisch'?(L==='en'?'≤ 4 weeks':'≤ 4 Wochen'):(L==='en'?'3–6 months':'3–6 Monate');
    const costStr=f.c?(f.c[prio]?`€ ${f.c[prio]}`:(f.c.mangel?`€ ${f.c.mangel}`:(L==='en'?'on request':'auf Anfrage'))):(L==='en'?'on request':'auf Anfrage');
    const prioCell=prio==='kritisch'?`<span class="risk-krit">${L==='en'?'URGENT':'SOFORT'}</span>`:`<span class="risk-mangel">${L==='en'?'MEDIUM':'MITTEL'}</span>`;
    return`<tr><td style="font-family:var(--fm);font-size:.65rem;white-space:nowrap">M-${String(idx).padStart(3,'0')}</td><td><strong>${esc(f.l)}</strong>${f.note?`<br><em style="font-size:.72rem">"${esc(f.note)}"</em>`:''}</td><td style="font-size:.72rem">${esc(f.sec)}</td><td>${prioCell}</td><td style="font-size:.72rem;white-space:nowrap">${tf}</td><td style="font-size:.72rem">${costStr}</td><td style="font-size:.65rem">${f.n||'–'}</td></tr>`;
  }).join('');
  return`<table class="ksk-table"><thead><tr><th>ID</th><th>${L==='en'?'Finding / Measure':'Befund / Maßnahme'}</th><th>${L==='en'?'Domain':'Prüfbereich'}</th><th>${L==='en'?'Priority':'Priorität'}</th><th>${L==='en'?'Timeline':'Frist'}</th><th>Invest.</th><th>${L==='en'?'Norm Ref.':'Norm-Ref.'}</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function _kskUmfeldHTML(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const addrStr=S.meta.strasse?`${S.meta.strasse} ${S.meta.hausnummer||''}, ${S.meta.plz||''} ${S.meta.ort||''}`.trim():(S.meta.adresse||'');
  if(!S.umfeld?.done){
    return`<p class="ksk-text" style="font-style:italic">${L==='en'?'No environmental analysis conducted. For a complete security report, a site-specific environmental analysis of the vicinity in accordance with DIN 14675 / VdS 2311 is recommended. The analysis can be started via the "Site Analysis" step in the audit wizard.':'Keine Umfeldanalyse durchgeführt. Für einen vollständigen Sicherheitsbericht wird eine standortbezogene Umfeldanalyse gemäß DIN 14675 / VdS 2311 empfohlen. Die Analyse kann über den Schritt „Umfeld" im Audit-Assistenten gestartet werden.'}</p>
    ${addrStr?`<div class="ksk-infobox"><strong>${L==='en'?'Object address:':'Objektadresse:'}</strong> ${esc(addrStr)}</div>`:''}`;
  }
  const u=S.umfeld;
  const ts=u.timestamp?new Date(u.timestamp).toLocaleDateString(L==='de'?'de-DE':'en-GB',{day:'2-digit',month:'long',year:'numeric'}):'';
  const allRisks=u.risks||[];
  const highRisks=allRisks.filter(r=>r.level==='hoch');
  const midRisks=allRisks.filter(r=>r.level==='mittel');
  const lowRisks=allRisks.filter(r=>r.level==='niedrig'||r.level==='info');
  const riskRows=allRisks.map(r=>{
    const cls=r.level==='hoch'?'risk-krit':r.level==='mittel'?'risk-mangel':'risk-ok';
    const lbl=r.level==='hoch'?(L==='en'?'HIGH':'HOCH'):r.level==='mittel'?(L==='en'?'MEDIUM':'MITTEL'):(L==='en'?'LOW':'GERING');
    const itemStr=r.items?.length?`<div style="font-size:.68rem;color:var(--soft);margin-top:2px">${r.items.slice(0,5).join(' · ')}${r.items.length>5?` +${r.items.length-5} ${L==='en'?'more':'weitere'}`:''}</div>`:'';
    return`<tr><td><strong>${esc(r.category)}</strong>${itemStr}</td><td style="text-align:center;font-family:var(--fm)">${r.count||0}</td><td><span class="${cls}">${lbl}</span></td><td style="font-size:.72rem">${esc(r.recommend||'')}</td></tr>`;
  }).join('');
  const osmLink=u.lat&&u.lon?`<a href="https://www.openstreetmap.org/#map=15/${u.lat.toFixed(5)}/${u.lon.toFixed(5)}" style="color:#60a5fa;font-size:.72rem" target="_blank">OpenStreetMap ↗</a>`:'';
  return`
  <p class="ksk-text">${L==='en'
    ?`The environmental analysis was conducted on <strong>${ts}</strong> using OpenStreetMap data (Overpass API). The analysis covered a radius of <strong>${u.radius||250} m</strong> around the object and recorded <strong>${u.poiCount||0} security-relevant objects</strong> in the vicinity. The overall environmental risk was assessed as <strong>${u.overallRisk||'–'}</strong>.`
    :`Die Umfeldanalyse wurde am <strong>${ts}</strong> auf Basis von OpenStreetMap-Daten (Overpass API) durchgeführt. Die Analyse umfasste einen Radius von <strong>${u.radius||250} m</strong> um das Objekt und erfasste <strong>${u.poiCount||0} sicherheitsrelevante Objekte</strong> in der Umgebung. Das Gesamt-Umfeldrisiko wurde als <strong>${u.overallRisk||'–'}</strong> eingestuft.`
  }</p>
  <table class="ksk-table" style="margin-bottom:10px">
    <thead><tr><th colspan="2">${L==='en'?'Location Details':'Standortangaben'}</th></tr></thead>
    <tbody>
      ${addrStr?`<tr><td style="color:var(--muted);width:140px">${L==='en'?'Address':'Adresse'}</td><td><strong style="color:#e2e8f0">${esc(addrStr)}</strong></td></tr>`:''}
      ${u.lat&&u.lon?`<tr><td style="color:var(--muted)">${L==='en'?'Coordinates':'Koordinaten'}</td><td style="font-family:var(--fm);font-size:.76rem">${u.lat.toFixed(6)}, ${u.lon.toFixed(6)} · ${osmLink}</td></tr>`:''}
      <tr><td style="color:var(--muted)">${L==='en'?'Analysis Radius':'Analyseradius'}</td><td style="font-family:var(--fm)">${u.radius||250} m</td></tr>
      <tr><td style="color:var(--muted)">${L==='en'?'Objects found':'Objekte gefunden'}</td><td style="font-family:var(--fm)">${u.poiCount||0}</td></tr>
      <tr><td style="color:var(--muted)">${L==='en'?'Overall Risk':'Gesamtrisiko'}</td><td><strong style="color:${u.overallRiskCls==='ok'?'#22c55e':u.overallRiskCls==='warn'?'#eab308':'#ef4444'}">${u.overallRisk||'–'}</strong></td></tr>
    </tbody>
  </table>
  ${allRisks.length?`
  <table class="ksk-table">
    <thead><tr><th>${L==='en'?'Category':'Kategorie'}</th><th>${L==='en'?'Count':'Anzahl'}</th><th>${L==='en'?'Risk Level':'Risikostufe'}</th><th>${L==='en'?'Recommendation':'Handlungsempfehlung'}</th></tr></thead>
    <tbody>${riskRows}</tbody>
  </table>
  `:`<div class="ksk-okbox">✓ ${L==='en'?'No elevated environmental risks identified in the vicinity.':'Keine erhöhten Umfeldrisiken in der Umgebung identifiziert.'}</div>`}
  ${highRisks.length||midRisks.length?`<div class="ksk-warnbox"><strong>${L==='en'?'Assessment:':'Bewertung:'}</strong> ${L==='en'
    ?`The environmental analysis identified <strong>${highRisks.length} high-risk</strong> and <strong>${midRisks.length} medium-risk</strong> factors in the vicinity. These environmental risks must be taken into account in the security concept and addressed through appropriate preventive measures in accordance with <strong>ISO 31000:2018, Clause 6.3</strong> (risk identification).`
    :`Die Umfeldanalyse identifizierte <strong>${highRisks.length} Hochrisiko-</strong> und <strong>${midRisks.length} Mittelrisiko</strong>-Faktoren in der Umgebung. Diese Umfeldrisiken sind im Sicherheitsbericht zu berücksichtigen und durch geeignete Präventivmaßnahmen gemäß <strong>ISO 31000:2018, Kl. 6.3</strong> (Risikoidentifikation) zu adressieren.`
  }</div>`:`<div class="ksk-okbox">✓ ${L==='en'?'No critical or elevated environmental risks identified. Regular monitoring of the site environment is recommended per ISO 31000 risk monitoring requirements (Clause 6.7).':'Keine kritischen oder erhöhten Umfeldrisiken identifiziert. Eine regelmäßige Überwachung der Objektumgebung wird gemäß ISO 31000 Überwachungsanforderungen (Kl. 6.7) empfohlen.'}</div>`}`;
}
function _kskNormHTML(norms){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const descMap={'ISO/IEC 27001':'ISO/IEC 27001:2022 – Informationssicherheits-Managementsystem (ISMS). Internationale Norm für Aufbau, Betrieb und kontinuierliche Verbesserung eines ISMS.','ISO 9001':'ISO 9001:2015 – Qualitätsmanagementsystem. Anforderungen an ein wirksames QMS mit risikobasiertem Ansatz.','COBIT 2019':'COBIT 2019 – Framework für IT-Governance, IT-Management und Kontrollziele zur Steuerung von IT-Risiken.','DSGVO / GDPR':'Datenschutz-Grundverordnung (EU) 2016/679. Europäische Verordnung zum Schutz personenbezogener Daten und Rechenschaftspflicht.','BSI IT-Grundschutz':'BSI IT-Grundschutz – Bundesamt für Sicherheit in der Informationstechnik. Deutsches Rahmenwerk für systematische IT-Sicherheitsmaßnahmen.'};
  if(!norms||!norms.length)return`<p class="ksk-text">${L==='en'?'The audit is based on recognised best-practice guidelines in security and risk management (incl. ISO 31000, VdS 3473, DIN EN ISO 45001). Norm mapping to ISO/IEC 27001 or BSI IT-Grundschutz is available on request.':'Die Prüfung basiert auf anerkannten Best-Practice-Leitfäden des Sicherheits- und Risikomanagements (u.a. ISO 31000, VdS 3473, DIN EN ISO 45001). Eine Normzuordnung nach ISO/IEC 27001 oder BSI IT-Grundschutz ist auf Wunsch möglich.'}</p>`;
  const rows=norms.map(n=>`<tr><td><strong>${n}</strong></td><td style="font-size:.76rem">${descMap[n]||n}</td><td style="font-size:.72rem">${L==='en'?'Basis of audit methodology':'Grundlage der Prüfmethodik'}</td></tr>`).join('');
  return`<p class="ksk-text">${L==='en'?'This security concept was prepared in consideration of the following standards and regulatory requirements:':'Das Sicherheitskonzept wurde unter Berücksichtigung folgender Normen, Standards und regulatorischer Anforderungen erstellt:'}</p><table class="ksk-table"><thead><tr><th>Norm / Standard</th><th>${L==='en'?'Description':'Beschreibung'}</th><th>${L==='en'?'Relevance':'Relevanz'}</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ═══ GLOSSAR HELPER ═══
function _kskGlossaryHTML(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  if(typeof GLOSSARY==='undefined'||!GLOSSARY.length)return`<p class="ksk-text" style="font-style:italic">${L==='en'?'Glossary database not loaded.':'Glossar-Datenbank nicht geladen.'}</p>`;
  const cats={iso31000:L==='en'?'ISO 31000 – Risk Management':'ISO 31000 – Risikomanagement',physical:L==='en'?'Physical Security':'Physische Sicherheit',compliance:L==='en'?'Audit & Compliance':'Audit & Compliance',itsec:L==='en'?'Information Security':'Informationssicherheit',bcm:L==='en'?'Business Continuity':'Business Continuity',regulatory:L==='en'?'Regulatory Framework':'Regulatorik & Recht'};
  const catOrder=['iso31000','physical','compliance','itsec','bcm','regulatory'];
  let html='';
  catOrder.forEach(cat=>{
    const items=GLOSSARY.filter(g=>g.category===cat);
    if(!items.length)return;
    html+=`<div style="margin-top:18px;margin-bottom:6px"><span style="font-family:var(--fm);font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);font-weight:700">${cats[cat]||cat}</span></div>`;
    html+=`<table class="ksk-table"><thead><tr><th>ID</th><th>${L==='en'?'Term':'Begriff'}</th><th>${L==='en'?'Definition':'Definition'}</th><th>${L==='en'?'Source':'Quelle'}</th></tr></thead><tbody>`;
    items.forEach(g=>{
      const term=L==='en'?(g.term_en||g.term):g.term;
      const def=L==='en'?(g.definition_en||g.definition):g.definition;
      html+=`<tr><td style="font-family:var(--fm);font-size:.62rem;white-space:nowrap;color:var(--muted)">${g.id}</td><td style="min-width:130px"><strong style="color:#e2e8f0;font-size:.78rem">${term}</strong>${g.term_en&&L!=='en'?`<div style="font-size:.64rem;color:var(--muted);font-style:italic">${g.term_en}</div>`:''}</td><td style="font-size:.72rem;line-height:1.5">${def}</td><td style="font-size:.65rem;white-space:nowrap;color:var(--soft)">${g.source}</td></tr>`;
    });
    html+=`</tbody></table>`;
  });
  return html;
}

// ═══ KRIMINALSTATISTIK HELPER ═══
function _kskCrimeStatsHTML(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const plz=S.meta.plz||'';
  const pks=typeof getPKSByPLZ!=='undefined'?getPKSByPLZ(plz):null;
  const bund=typeof PKS_BUND!=='undefined'?PKS_BUND:null;
  if(!plz){
    return`<p class="ksk-text" style="font-style:italic">${L==='en'?'No postal code entered. Please add a postal code in the object data to enable crime statistics lookup.':'Keine Postleitzahl hinterlegt. Bitte Postleitzahl in den Objektdaten ergänzen, um die Kriminalstatistik abzurufen.'}</p>`;
  }
  if(!pks){
    return`<p class="ksk-text" style="font-style:italic">${L==='en'?`No crime statistics available for postal code ${esc(plz)}.`:`Für Postleitzahl ${esc(plz)} sind keine Statistikdaten verfügbar.`}</p>`;
  }
  const {bl,data}=pks;
  const rlEinbruch=pksRiskLevel(data.hz_einbruch,bund.hz_einbruch);
  const rlGewalt=pksRiskLevel(data.hz_gewalt,bund.hz_gewalt);
  const rlGesamt=pksRiskLevel(data.hz_gesamt,bund.hz_gesamt);
  const rlColor={hoch:'#dc2626',erhoht:'#ea580c',mittel:'#ca8a04',gering:'#16a34a'};
  const rlLabel={hoch:L==='en'?'HIGH':'HOCH',erhoht:L==='en'?'ELEVATED':'ERHÖHT',mittel:L==='en'?'MEDIUM':'MITTEL',gering:L==='en'?'LOW':'GERING'};
  const blName=L==='en'?data.name_en:data.name;
  const badge=(rl)=>`<strong style="color:${rlColor[rl]}">${rlLabel[rl]}</strong>`;
  const pct=(hz,avg)=>Math.round(hz/avg*100);
  const bar=(hz,avg,col)=>{const w=Math.min(Math.round(hz/avg*100),200);return`<div style="background:rgba(255,255,255,.06);border-radius:3px;height:6px;overflow:hidden;min-width:80px;margin-top:3px"><div style="width:${w/2}%;height:100%;background:${col};border-radius:3px"></div></div>`;};
  return`
  <p class="ksk-text">${L==='en'
    ?`The following crime statistics are based on the <strong>Polizeiliche Kriminalstatistik (PKS) 2023</strong> published by the Bundeskriminalamt (BKA) in April 2024. Based on the postal code <strong>${esc(plz)}</strong>, the object is located in <strong>${blName}</strong>. The Häufigkeitszahl (HZ) indicates the number of recorded cases per 100,000 inhabitants.`
    :`Die nachfolgenden Kriminalstatistiken basieren auf der <strong>Polizeilichen Kriminalstatistik (PKS) 2023</strong>, veröffentlicht vom Bundeskriminalamt (BKA) im April 2024. Auf Basis der Postleitzahl <strong>${esc(plz)}</strong> befindet sich das Objekt in <strong>${blName}</strong>. Die Häufigkeitszahl (HZ) gibt die Anzahl der erfassten Fälle je 100.000 Einwohner an.`
  }</p>
  <table class="ksk-table">
    <thead><tr><th>${L==='en'?'Crime Category':'Deliktkategorie'}</th><th>${L==='en'?`${blName} (HZ)`:`${blName} (HZ)`}</th><th>${L==='en'?'National Avg (HZ)':'Bundesschnitt (HZ)'}</th><th>${L==='en'?'Relative Level':'Relatives Niveau'}</th><th>${L==='en'?'Trend vs. Avg':'Abweichung'}</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>${L==='en'?'All Offences':'Straftaten gesamt'}</strong></td>
        <td style="font-family:var(--fm);font-weight:700">${data.hz_gesamt.toLocaleString('de-DE')}</td>
        <td style="font-family:var(--fm);color:var(--muted)">${bund.hz_gesamt.toLocaleString('de-DE')}</td>
        <td>${badge(rlGesamt)}</td>
        <td style="font-size:.72rem;color:var(--muted)">${pct(data.hz_gesamt,bund.hz_gesamt)}% ${L==='en'?'of avg':'des Schnitts'}${bar(data.hz_gesamt,bund.hz_gesamt,rlColor[rlGesamt])}</td>
      </tr>
      <tr>
        <td><strong>${L==='en'?'Residential Burglary':'Wohnungseinbruchdiebstahl'}</strong></td>
        <td style="font-family:var(--fm);font-weight:700">${data.hz_einbruch.toLocaleString('de-DE')}</td>
        <td style="font-family:var(--fm);color:var(--muted)">${bund.hz_einbruch.toLocaleString('de-DE')}</td>
        <td>${badge(rlEinbruch)}</td>
        <td style="font-size:.72rem;color:var(--muted)">${pct(data.hz_einbruch,bund.hz_einbruch)}% ${L==='en'?'of avg':'des Schnitts'}${bar(data.hz_einbruch,bund.hz_einbruch,rlColor[rlEinbruch])}</td>
      </tr>
      <tr>
        <td><strong>${L==='en'?'Violent Crime':'Gewaltkriminalität'}</strong></td>
        <td style="font-family:var(--fm);font-weight:700">${data.hz_gewalt.toLocaleString('de-DE')}</td>
        <td style="font-family:var(--fm);color:var(--muted)">${bund.hz_gewalt.toLocaleString('de-DE')}</td>
        <td>${badge(rlGewalt)}</td>
        <td style="font-size:.72rem;color:var(--muted)">${pct(data.hz_gewalt,bund.hz_gewalt)}% ${L==='en'?'of avg':'des Schnitts'}${bar(data.hz_gewalt,bund.hz_gewalt,rlColor[rlGewalt])}</td>
      </tr>
      <tr>
        <td><strong>${L==='en'?'Theft (total)':'Diebstahl gesamt'}</strong></td>
        <td style="font-family:var(--fm);font-weight:700">${data.hz_diebstahl.toLocaleString('de-DE')}</td>
        <td style="font-family:var(--fm);color:var(--muted)">${bund.hz_diebstahl.toLocaleString('de-DE')}</td>
        <td>${badge(pksRiskLevel(data.hz_diebstahl,bund.hz_diebstahl))}</td>
        <td style="font-size:.72rem;color:var(--muted)">${pct(data.hz_diebstahl,bund.hz_diebstahl)}% ${L==='en'?'of avg':'des Schnitts'}${bar(data.hz_diebstahl,bund.hz_diebstahl,rlColor[pksRiskLevel(data.hz_diebstahl,bund.hz_diebstahl)])}</td>
      </tr>
      <tr>
        <td><strong>${L==='en'?'Criminal Damage':'Sachbeschädigung'}</strong></td>
        <td style="font-family:var(--fm);font-weight:700">${data.hz_sachbeschaedigung.toLocaleString('de-DE')}</td>
        <td style="font-family:var(--fm);color:var(--muted)">${bund.hz_sachbeschaedigung.toLocaleString('de-DE')}</td>
        <td>${badge(pksRiskLevel(data.hz_sachbeschaedigung,bund.hz_sachbeschaedigung))}</td>
        <td style="font-size:.72rem;color:var(--muted)">${pct(data.hz_sachbeschaedigung,bund.hz_sachbeschaedigung)}% ${L==='en'?'of avg':'des Schnitts'}${bar(data.hz_sachbeschaedigung,bund.hz_sachbeschaedigung,rlColor[pksRiskLevel(data.hz_sachbeschaedigung,bund.hz_sachbeschaedigung)])}</td>
      </tr>
    </tbody>
  </table>
  <div class="ksk-infobox" style="margin-top:10px">
    <strong>${L==='en'?'Source & Authority:':'Quelle & Zuständigkeit:'}</strong>
    ${L==='en'
      ?`Bundeskriminalamt (BKA) – PKS 2023, ${data.bka_ref}. Responsible state authority: <strong>${data.lka}</strong>.`
      :`Bundeskriminalamt (BKA) – PKS 2023, ${data.bka_ref}. Zuständige Landesbehörde: <strong>${data.lka}</strong>.`
    }
    ${L==='en'
      ?`Current annual reports available at: BKA (<a href="https://www.bka.de/DE/AktuelleInformationen/StatistikenLagebilder/PolizeilicheKriminalstatistik/PKS2023/" style="color:#60a5fa" target="_blank">bka.de/pks2023</a>) and ${data.lka} (<a href="${data.lka_url}" style="color:#60a5fa" target="_blank">${data.lka_url.replace('https://','')}</a>).`
      :`Aktuelle Jahresberichte: BKA (<a href="https://www.bka.de/DE/AktuelleInformationen/StatistikenLagebilder/PolizeilicheKriminalstatistik/PKS2023/" style="color:#60a5fa" target="_blank">bka.de/pks2023</a>) und ${data.lka} (<a href="${data.lka_url}" style="color:#60a5fa" target="_blank">${data.lka_url.replace('https://','')}</a>).`
    }
  </div>`;
}

// ═══ SICHERHEITSBERICHT (vormals Konzept) ═══
function renderKonzept(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ac=activeChecks();
  let kritisch=[],mangel=[],ok=[];
  ac.forEach(ch=>ch.items.forEach(it=>{const f=S.findings[it.id],s=f?.status;if(s==='kritisch')kritisch.push({...it,note:f?.note||'',sec:L==='en'?ch.l_en||ch.l:ch.l,icon:ch.i});else if(s==='mangel')mangel.push({...it,note:f?.note||'',sec:L==='en'?ch.l_en||ch.l:ch.l,icon:ch.i});else if(s==='ok')ok.push(it);}));
  const assessed=kritisch.length+mangel.length+ok.length;
  const comp=assessed?Math.round(ok.length/assessed*100):0;
  const ds=S.meta.datum?new Date(S.meta.datum).toLocaleDateString(L==='en'?'en-GB':'de-DE',{day:'2-digit',month:'long',year:'numeric'}):'–';
  const genDateTime=new Date().toLocaleString(L==='en'?'en-GB':'de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
  const objekt=esc(S.meta.objekt||'');
  const auftraggeber=esc(S.meta.auftraggeber||'');
  const pruefer=esc(S.meta.pruefer||sessionStorage.getItem('ssa_u')||'–');
  const version=esc(S.meta.konzeptVersion||'1.0');
  const status=esc(S.meta.konzeptStatus||L==='en'?'Draft':'Entwurf');
  const riskLevel=kritisch.length>=5?(L==='en'?'HIGH':'HOCH'):kritisch.length>=2?(L==='en'?'ELEVATED':'ERHÖHT'):kritisch.length>=1?(L==='en'?'MEDIUM':'MITTEL'):(L==='en'?'LOW':'GERING');
  const riskColor=kritisch.length>=5?'#dc2626':kritisch.length>=2?'#ea580c':kritisch.length>=1?'#ca8a04':'#16a34a';
  const riskText=L==='en'?(kritisch.length>=2?'Critical deficiencies were identified that must be addressed immediately. Without remediation, insurance coverage may be restricted.':kritisch.length===1?'One critical deficiency was identified that must be addressed as a priority.':mangel.length>0?'No critical deficiencies found. Improvement requirements should be addressed in the medium term.':'The object meets all assessed security requirements. No immediate action required.'):(kritisch.length>=2?'Es wurden kritische Mängel festgestellt, die priorisiert und unverzüglich zu beheben sind. Ohne Mängelbeseitigung ist der Versicherungsschutz möglicherweise eingeschränkt.':kritisch.length===1?'Es wurde ein kritischer Mangel identifiziert, der vorrangig zu beheben ist.':mangel.length>0?'Es wurden keine kritischen Mängel festgestellt. Der Verbesserungsbedarf sollte mittelfristig adressiert werden.':'Das Objekt erfüllt alle geprüften Sicherheitsanforderungen. Kein sofortiger Handlungsbedarf.');
  const secK=kritisch.filter(f=>f.m==='security'),qmK=kritisch.filter(f=>f.m==='qm'),itK=kritisch.filter(f=>f.m==='itgov');
  const secM=mangel.filter(f=>f.m==='security'),qmM=mangel.filter(f=>f.m==='qm'),itM=mangel.filter(f=>f.m==='itgov');
  const domainSec=(items,prio)=>{if(!items.length)return`<div class="ksk-okbox">✓ ${L==='en'?'No findings in this category.':'Keine Befunde in dieser Kategorie.'}</div>`;const sec=items.filter(f=>f.m==='security'),qm=items.filter(f=>f.m==='qm'),it=items.filter(f=>f.m==='itgov');let h='';if(sec.length)h+=`<div class="ksk-domain-header"><span class="ksk-domain-icon">${L==='en'?'PHYSICAL':'PHYSISCH'}</span><span class="ksk-domain-title">${L==='en'?'Physical Security':'Physische Sicherheit'}</span></div>${_kskMeasureTable(sec,prio,0)}`;if(qm.length)h+=`<div class="ksk-domain-header" style="margin-top:12px"><span class="ksk-domain-icon" style="color:#fb923c;border-color:rgba(251,146,60,.25);background:rgba(251,146,60,.08)">QM</span><span class="ksk-domain-title">${L==='en'?'Quality Management':'Qualitätsmanagement'}</span></div>${_kskMeasureTable(qm,prio,sec.length)}`;if(it.length)h+=`<div class="ksk-domain-header" style="margin-top:12px"><span class="ksk-domain-icon" style="color:#34d399;border-color:rgba(52,211,153,.25);background:rgba(52,211,153,.08)">IT-GOV</span><span class="ksk-domain-title">IT-Governance</span></div>${_kskMeasureTable(it,prio,sec.length+qm.length)}`;return h;};
  const sz=[{id:'SZ-01',z:L==='en'?'Physical Security':'Physische Sicherheit',d:L==='en'?'Protection of persons, assets and the building against unauthorised access, theft, vandalism and other physical threats.':'Schutz von Personen, Sachwerten und Gebäude vor unbefugtem Zutritt, Diebstahl, Vandalismus und sonstigen physischen Bedrohungen.',p:'HOCH'},{id:'SZ-02',z:L==='en'?'Business Continuity (BCM)':'Betriebskontinuität (BCM)',d:L==='en'?'Ensuring uninterrupted operations and swift recovery after incidents or security-related events.':'Sicherstellung des ununterbrochenen Geschäftsbetriebs sowie schnelle Wiederherstellung nach Störungen.',p:'HOCH'},{id:'SZ-03',z:L==='en'?'Compliance & Legal Certainty':'Compliance & Rechtssicherheit',d:L==='en'?'Adherence to all applicable legal, regulatory and normative requirements in security and data protection.':'Einhaltung aller relevanten gesetzlichen, regulatorischen und normativen Anforderungen im Bereich Sicherheit und Datenschutz.',p:'HOCH'},{id:'SZ-04',z:L==='en'?'Information Security (CIA)':'Informationssicherheit (CIA)',d:L==='en'?'Ensuring confidentiality, integrity and availability of all protected information and IT systems (ISO/IEC 27001).':'Gewährleistung von Vertraulichkeit, Integrität und Verfügbarkeit aller schützenswerten Informationen und IT-Systeme.',p:'MITTEL'},{id:'SZ-05',z:L==='en'?'Loss Minimisation':'Schadensminimierung',d:L==='en'?'Reduction of probability and impact of identified risks through preventive and reactive measures (ISO 31000).':'Reduktion von Eintrittswahrscheinlichkeit und Schadensauswirkung durch präventive und reaktive Maßnahmen (ISO 31000).',p:'MITTEL'}];
  const matRows=ac.map(ch=>{const mat=S.maturity[ch.id]||0;const col=mat>=4?'#22c55e':mat>=3?'#eab308':mat>=2?'#f97316':'#ef4444';const lbl=mat===0?(L==='en'?'n/a':'k.A.'):mat===1?'Initial':mat===2?(L==='en'?'Repeatable':'Wiederholbar'):mat===3?(L==='en'?'Defined':'Definiert'):mat===4?(L==='en'?'Managed':'Gesteuert'):(L==='en'?'Optimising':'Optimierend');return`<tr><td>${ch.i} ${L==='en'?ch.l_en||ch.l:ch.l}</td><td><div style="background:rgba(255,255,255,.06);border-radius:3px;height:7px;overflow:hidden;min-width:80px"><div style="width:${mat/5*100}%;height:100%;background:${col};border-radius:3px"></div></div></td><td style="font-family:var(--fm);font-size:.65rem;font-weight:700;color:${col}">${mat}/5</td><td style="font-size:.72rem;color:var(--muted)">${lbl}</td></tr>`;}).join('');
  const fullAddrDisplay=S.meta.strasse?[S.meta.strasse+(S.meta.hausnummer?' '+S.meta.hausnummer:''),S.meta.plz&&S.meta.ort?S.meta.plz+' '+S.meta.ort:''].filter(Boolean).join(', '):(S.meta.adresse||'');
  const objRows=[['Objekt / Object',S.meta.objekt],[L==='en'?'Client':'Auftraggeber',S.meta.auftraggeber],[L==='en'?'Address':'Adresse',fullAddrDisplay],[L==='en'?'Inspection Date':'Begehungsdatum',ds],[L==='en'?'Auditor':'Prüfer/in',pruefer],[L==='en'?'Occasion':'Anlass',S.meta.anlass],[L==='en'?'Doc. Version':'Dokumentversion',version],['Status',status],[L==='en'?'Generated':'Erstellt am',genDateTime]].filter(([,v])=>v).map(([k,v])=>`<tr><td>${k}</td><td><strong style="color:#e2e8f0">${esc(String(v))}</strong></td></tr>`).join('');
  const metricRows=[[L==='en'?'Entrances':'Eingänge',S.meta.eingaenge],[L==='en'?'Gates':'Einfahrten',S.meta.einfahrten],[L==='en'?'Floors':'Stockwerke',S.meta.stockwerke],[L==='en'?'Staff':'Mitarbeiter',S.meta.mitarbeiter],[L==='en'?'Area (m²)':'Fläche (m²)',S.meta.flaeche],[L==='en'?'Parking':'Parkplätze',S.meta.parkplaetze],[L==='en'?'Cameras':'Kameras',S.meta.kameras]].filter(([,v])=>v).map(([k,v])=>`<tr><td>${k}</td><td><strong style="color:#e2e8f0">${esc(String(v))}</strong></td></tr>`).join('');
  let totalMin=0,totalMax=0;kritisch.forEach(f=>{const[a,b]=parseCost(f.c?.kritisch||'');totalMin+=a;totalMax+=b;});mangel.forEach(f=>{const[a,b]=parseCost(f.c?.mangel||'');totalMin+=a;totalMax+=b;});
  const totalCostStr=totalMin||totalMax?`${totalMin.toLocaleString('de-DE')} – ${totalMax.toLocaleString('de-DE')}`:'0';
  const normBadges=(S.norms||[]).map(n=>`<span class="ksk-norm-badge">${n}</span>`).join(' ');
  const tocL=L==='en'?['Executive Summary','Object Data','Environmental Analysis','Crime Statistics','Protection Objectives','Regulatory Framework','Risk Overview','Immediate Measures','Medium-Term Measures','Maturity Assessment','Investment Plan','Release & Signature','Glossary & Terminology']:['Zusammenfassung','Objektdaten','Umfeldanalyse','Kriminalstatistik','Schutzziele','Normgrundlagen','Risikoübersicht','Sofortmaßnahmen','Mittelfristige Maßnahmen','Reifegradübersicht','Investitionsplan','Freigabe & Unterschrift','Fachbegriffe & Glossar'];
  const tocHTML=tocL.map((t,i)=>`<div class="ksk-toc-entry" onclick="document.getElementById('ksk-s${i+1}')?.scrollIntoView({behavior:'smooth'})"><span class="ksk-toc-num">${i+1}.</span><span>${t}</span></div>`).join('');
  const S2=(num,title,content)=>`<div class="ksk-section" id="ksk-s${num}"><div class="ksk-section-title"><span class="ksk-section-number">${num}</span>${title}</div>${content}</div>`;
  document.getElementById('mainContent').innerHTML=`
  <div class="ksk-controls">
    <div class="rpt-tabs">
      <button class="rpt-tab" onclick="S.reportView='begehung';render()">${L==='en'?'Inspection Report':'Begehungsprotokoll'}</button>
      <button class="rpt-tab active konzept-tab">${L==='en'?'Security Report':'Sicherheitsbericht'}</button>
    </div>
    <div style="display:flex;gap:6px">
      <button class="print-btn" onclick="exportData()">Backup</button>
      <button class="print-btn" style="border-color:rgba(167,139,250,.3);color:var(--purple)" onclick="window.print()">🖨 PDF</button>
    </div>
  </div>
  <div class="ksk-doc">
    <div class="ksk-cover">
      <div class="ksk-cover-logo">SecureStay<span>: Analytics</span></div>
      <div class="ksk-cover-type">${L==='en'?'Security Report · Confidential':'Sicherheitsbericht · Vertraulich'}</div>
      <div class="ksk-cover-title">${objekt||'–'}</div>
      ${auftraggeber?`<div class="ksk-cover-objekt">${auftraggeber}</div>`:''}
      <table class="ksk-cover-meta-table">
        <tr><td>${L==='en'?'Inspection Date':'Begehungsdatum'}</td><td>${ds}</td></tr>
        <tr><td>${L==='en'?'Prepared by':'Erstellt von'}</td><td>${pruefer}</td></tr>
        <tr><td>Version</td><td>${version}</td></tr>
        <tr><td>Status</td><td>${status}</td></tr>
        <tr><td>Compliance</td><td><strong style="color:${comp>=80?'#4ade80':comp>=50?'#fde047':'#f87171'}">${comp}%</strong></td></tr>
        <tr><td>${L==='en'?'Risk Level':'Risikostufe'}</td><td><strong style="color:${riskColor}">${riskLevel}</strong></td></tr>
      </table>
      ${S.norms?.length?`<div style="margin-top:16px;display:flex;flex-wrap:wrap;gap:4px;justify-content:center;position:relative;z-index:1">${normBadges}</div>`:''}
      <div class="ksk-vertraulich">🔒 ${L==='en'?'CONFIDENTIAL – For authorised recipients only':'VERTRAULICH – Nur für autorisierte Empfänger'}</div>
    </div>
    <div class="ksk-toc">
      <div class="ksk-toc-title">${L==='en'?'Table of Contents':'Inhaltsverzeichnis'}</div>
      <div class="ksk-toc-grid">${tocHTML}</div>
    </div>
    <div class="ksk-body">
      ${S2(1,L==='en'?'Executive Summary':'Zusammenfassung',`
        <p class="ksk-text">${L==='en'?`This security concept was prepared on the basis of an on-site inspection of <em>${objekt||'–'}</em> on <strong>${ds}</strong>. A total of <strong>${assessed}</strong> control points were assessed.`:`Das vorliegende Sicherheitskonzept wurde auf Basis einer Begehung des Objekts <em>${objekt||'–'}</em> am <strong>${ds}</strong> erstellt. Es wurden insgesamt <strong>${assessed}</strong> Prüfpunkte bewertet.`}</p>
        <p class="ksk-text">${L==='en'?`The assessment was conducted in accordance with the risk management methodology of <strong>ISO 31000:2018</strong>. The process encompasses risk identification, risk analysis and risk evaluation in order to provide a structured basis for risk treatment decisions. Each finding has been classified according to its likelihood and potential impact, and assigned to one of the risk treatment options defined in ISO 31000 — risk modification (corrective measures), risk avoidance, risk sharing or risk acceptance.`:`Die Beurteilung erfolgte nach der Risikomanagement-Methodik der <strong>ISO 31000:2018</strong>. Der Prozess umfasst Risikoidentifikation, Risikoanalyse und Risikobewertung, um eine strukturierte Grundlage für Risikobehandlungsentscheidungen zu schaffen. Jeder Befund wurde nach Eintrittswahrscheinlichkeit und potenzieller Schadensauswirkung klassifiziert und einer der in ISO 31000 definierten Risikobehandlungsoptionen zugeordnet — Risikoänderung (Korrekturmaßnahmen), Risikovermeidung, Risikoteilung oder Risikoakzeptanz.`}</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px;margin:14px 0">
          <div class="ksk-maturity-item" style="text-align:center"><div style="font-size:1.5rem;font-weight:800;font-family:var(--fh);color:#f87171">${kritisch.length}</div><div style="font-size:.7rem;color:var(--muted)">${L==='en'?'Critical':'Kritisch'}</div></div>
          <div class="ksk-maturity-item" style="text-align:center"><div style="font-size:1.5rem;font-weight:800;font-family:var(--fh);color:#fde047">${mangel.length}</div><div style="font-size:.7rem;color:var(--muted)">${L==='en'?'Deficiencies':'Mängel'}</div></div>
          <div class="ksk-maturity-item" style="text-align:center"><div style="font-size:1.5rem;font-weight:800;font-family:var(--fh);color:#4ade80">${ok.length}</div><div style="font-size:.7rem;color:var(--muted)">OK</div></div>
          <div class="ksk-maturity-item" style="text-align:center"><div style="font-size:1.5rem;font-weight:800;font-family:var(--fh);color:${comp>=80?'#4ade80':comp>=50?'#fde047':'#f87171'}">${comp}%</div><div style="font-size:.7rem;color:var(--muted)">Compliance</div></div>
          <div class="ksk-maturity-item" style="text-align:center"><div style="font-size:1rem;font-weight:800;font-family:var(--fh);color:${riskColor}">${riskLevel}</div><div style="font-size:.7rem;color:var(--muted)">${L==='en'?'Risk':'Risiko'}</div></div>
        </div>
        <div class="ksk-${kritisch.length>=1?'warnbox':'okbox'}"><strong>${L==='en'?'Assessment:':'Bewertung:'}</strong> ${riskText}</div>
      `)}
      ${S2(2,L==='en'?'Object Data & Inspection Scope':'Objektdaten & Prüfumfang',`
        <table class="ksk-table">${objRows}</table>
        ${metricRows?`<p class="ksk-text" style="margin-top:10px"><strong>${L==='en'?'Building metrics:':'Objektkennzahlen:'}</strong></p><table class="ksk-table">${metricRows}</table>`:''}
      `)}
      ${S2(3,L==='en'?'Environmental Analysis':'Umfeldanalyse',_kskUmfeldHTML())}
      ${S2(4,L==='en'?'Crime Statistics (BKA PKS 2023)':'Kriminalstatistik (BKA PKS 2023)',_kskCrimeStatsHTML())}
      ${S2(5,L==='en'?'Protection Objectives':'Schutzziele',`
        <p class="ksk-text">${L==='en'?'The following protection objectives form the basis of this security report:':'Die folgenden Schutzziele bilden die Grundlage dieses Sicherheitsberichts:'}</p>
        <table class="ksk-table"><thead><tr><th>ID</th><th>${L==='en'?'Objective':'Schutzziel'}</th><th>${L==='en'?'Description':'Beschreibung'}</th><th>${L==='en'?'Priority':'Priorität'}</th></tr></thead><tbody>${sz.map(s=>`<tr><td style="font-family:var(--fm);font-size:.65rem;font-weight:700">${s.id}</td><td><strong style="color:#e2e8f0">${s.z}</strong></td><td style="font-size:.76rem">${s.d}</td><td><span class="${s.p==='HOCH'?'risk-krit':'risk-mangel'}">${s.p}</span></td></tr>`).join('')}</tbody></table>
      `)}
      ${S2(6,L==='en'?'Regulatory Framework & Standards':'Normgrundlagen & Regelwerk',_kskNormHTML(S.norms||[]))}
      ${S2(7,L==='en'?'Risk Overview':'Risikoübersicht',`
        <p class="ksk-text">${L==='en'?'Overall risk classification based on the number and severity of identified deficiencies:':'Gesamtrisikoeinstufung auf Basis der Anzahl und Schwere der festgestellten Mängel:'}</p>
        <p class="ksk-text">${L==='en'?`According to <strong>ISO 31000:2018</strong>, risk is defined as the <em>effect of uncertainty on objectives</em>. The risk level is determined by the interaction of <strong>likelihood</strong> (probability that a threat event occurs) and <strong>consequence</strong> (extent of potential damage). The risk matrix used classifies findings into four levels: <em>Low · Medium · High · Critical</em>. Critical findings represent an immediate threat to the protection objectives and require risk treatment within four weeks.`:`Gemäß <strong>ISO 31000:2018</strong> ist Risiko definiert als die <em>Auswirkung von Ungewissheit auf Ziele</em>. Die Risikostufe ergibt sich aus dem Zusammenspiel von <strong>Eintrittswahrscheinlichkeit</strong> (Wahrscheinlichkeit des Eintretens eines Bedrohungsereignisses) und <strong>Schadensauswirkung</strong> (Ausmaß des potenziellen Schadens). Die verwendete Risikomatrix klassifiziert Befunde in vier Stufen: <em>Gering · Mittel · Hoch · Kritisch</em>. Kritische Befunde stellen eine unmittelbare Gefährdung der Schutzziele dar und erfordern eine Risikobehandlung innerhalb von vier Wochen.`}</p>
        <div style="display:flex;align-items:center;gap:14px;margin:12px 0;padding:14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;flex-wrap:wrap">
          <div style="font-size:1.6rem;font-weight:800;font-family:var(--fh);color:${riskColor}">${riskLevel}</div>
          <div style="flex:1;min-width:120px"><div style="height:8px;background:rgba(255,255,255,.06);border-radius:4px;overflow:hidden"><div style="width:${comp}%;height:100%;background:${comp>=80?'#22c55e':comp>=50?'#eab308':'#ef4444'};border-radius:4px"></div></div><div style="font-size:.66rem;color:var(--muted);margin-top:4px">${comp}% ${L==='en'?'compliance rate':'Konformitätsquote'}</div></div>
        </div>
        <table class="ksk-table"><thead><tr><th>${L==='en'?'Category':'Kategorie'}</th><th>${L==='en'?'Count':'Anzahl'}</th><th>${L==='en'?'Share':'Anteil'}</th></tr></thead><tbody>
          <tr><td><span class="risk-krit">${L==='en'?'Critical':'Kritisch'}</span></td><td>${kritisch.length}</td><td>${assessed?Math.round(kritisch.length/assessed*100):0}%</td></tr>
          <tr><td><span class="risk-mangel">${L==='en'?'Deficiencies':'Mängel'}</span></td><td>${mangel.length}</td><td>${assessed?Math.round(mangel.length/assessed*100):0}%</td></tr>
          <tr><td><span class="risk-ok">${L==='en'?'Compliant':'Konform'}</span></td><td>${ok.length}</td><td>${assessed?Math.round(ok.length/assessed*100):0}%</td></tr>
          <tr style="border-top:1px solid rgba(255,255,255,.08)"><td><strong style="color:#e2e8f0">${L==='en'?'Total assessed':'Gesamt bewertet'}</strong></td><td><strong style="color:#e2e8f0">${assessed}</strong></td><td><strong style="color:#e2e8f0">100%</strong></td></tr>
        </tbody></table>
      `)}
      ${S2(8,L==='en'?'Immediate Measures (Critical Deficiencies)':'Sofortmaßnahmen (Kritische Mängel)',`
        <p class="ksk-text">${L==='en'?'The following critical deficiencies require immediate remediation within <strong>4 weeks</strong>. Non-compliance may affect insurance coverage and lead to regulatory consequences.':'Die folgenden kritischen Mängel sind unverzüglich — innerhalb von <strong>4 Wochen</strong> — zu beheben. Ohne Mängelbeseitigung kann der Versicherungsschutz eingeschränkt sein und regulatorische Konsequenzen drohen.'}</p>
        <p class="ksk-text">${L==='en'?`In the framework of <strong>ISO 31000:2018 risk treatment</strong> (Clause 6.6), these findings are assigned to the option <em>"risk modification"</em>: the likelihood and/or impact of the risk is to be reduced through targeted corrective measures. Each measure listed below addresses the root cause of the identified deficiency and contributes to reducing residual risk to an acceptable level. Responsibility for implementation lies with the client's authorised management.`:`Im Rahmen der <strong>Risikobehandlung nach ISO 31000:2018</strong> (Kl. 6.6) sind diese Befunde der Option <em>„Risikoänderung"</em> zugeordnet: Durch gezielte Korrekturmaßnahmen soll die Eintrittswahrscheinlichkeit und/oder die Schadensauswirkung des Risikos reduziert werden. Jede der nachfolgend aufgeführten Maßnahmen adressiert die Grundursache des festgestellten Mangels und leistet einen Beitrag zur Reduktion des Restrisikos auf ein akzeptables Niveau. Die Umsetzungsverantwortung liegt bei der bevollmächtigten Geschäftsleitung des Auftraggebers.`}</p>
        ${domainSec(kritisch,'kritisch')}
      `)}
      ${S2(9,L==='en'?'Medium-Term Measures (Deficiencies)':'Mittelfristige Maßnahmen (Mängel)',`
        <p class="ksk-text">${L==='en'?'The following deficiencies should be addressed within <strong>3–6 months</strong> as part of a structured improvement programme.':'Die folgenden Mängel sind im Rahmen eines strukturierten Verbesserungsprogramms innerhalb von <strong>3–6 Monaten</strong> umzusetzen.'}</p>
        <p class="ksk-text">${L==='en'?`These findings are likewise classified as <em>risk modification measures</em> per <strong>ISO 31000:2018</strong>, but due to their lower risk level they may be implemented in a structured improvement programme. The implementation should be documented in an action plan with defined milestones, responsibilities and verification dates. After completion, the effectiveness of each measure is to be verified through a follow-up inspection.`:`Diese Befunde sind ebenfalls als <em>Risikoänderungsmaßnahmen</em> gemäß <strong>ISO 31000:2018</strong> klassifiziert, aufgrund des geringeren Risikoniveaus jedoch in einem strukturierten Verbesserungsprogramm umsetzbar. Die Umsetzung ist in einem Maßnahmenplan mit definierten Meilensteinen, Verantwortlichkeiten und Verifikationsterminen zu dokumentieren. Nach Abschluss ist die Wirksamkeit jeder Maßnahme im Rahmen einer Nachschauprüfung zu verifizieren.`}</p>
        ${domainSec(mangel,'mangel')}
      `)}
      ${S2(10,L==='en'?'Maturity Assessment':'Reifegradübersicht',`
        <p class="ksk-text">${L==='en'?'Maturity levels per audit domain (0 = not assessed · 1 = Initial · 2 = Repeatable · 3 = Defined · 4 = Managed · 5 = Optimising):':'Reifegradstufen je Prüfbereich (0 = nicht bewertet · 1 = Initial · 2 = Wiederholbar · 3 = Definiert · 4 = Gesteuert · 5 = Optimierend):'}</p>
        <table class="ksk-table"><thead><tr><th>${L==='en'?'Domain':'Bereich'}</th><th>${L==='en'?'Maturity':'Reifegrad'}</th><th>${L==='en'?'Score':'Wert'}</th><th>${L==='en'?'Level':'Stufe'}</th></tr></thead><tbody>${matRows||`<tr><td colspan="4" style="text-align:center;color:var(--muted)">${L==='en'?'No maturity data entered.':'Keine Reifegrad-Daten erfasst.'}</td></tr>`}</tbody></table>
      `)}
      ${S2(11,L==='en'?'Investment Plan':'Investitionsplan',`
        <p class="ksk-text">${L==='en'?'Estimated investment requirements for remediation of identified deficiencies (indicative market values, excl. VAT):':'Geschätzter Investitionsbedarf zur Behebung der festgestellten Mängel (Richtwerte, zzgl. MwSt.):'}</p>
        <table class="ksk-table"><thead><tr><th>${L==='en'?'Category':'Kategorie'}</th><th>${L==='en'?'Findings':'Befunde'}</th><th>${L==='en'?'Estimate':'Schätzung'}</th><th>${L==='en'?'Timeline':'Zeitrahmen'}</th></tr></thead><tbody>
          <tr><td><strong class="risk-krit">${L==='en'?'Critical (immediate)':'Kritisch (sofort)'}</strong></td><td>${kritisch.length}</td><td><strong style="color:#e2e8f0">€ ${fmtCA(kritisch,'kritisch')}</strong></td><td style="font-size:.76rem">${L==='en'?'≤ 4 weeks':'≤ 4 Wochen'}</td></tr>
          <tr><td><strong class="risk-mangel">${L==='en'?'Deficiencies (medium-term)':'Mängel (mittelfristig)'}</strong></td><td>${mangel.length}</td><td><strong style="color:#e2e8f0">€ ${fmtCA(mangel,'mangel')}</strong></td><td style="font-size:.76rem">${L==='en'?'3–6 months':'3–6 Monate'}</td></tr>
        </tbody><tfoot><tr><td colspan="2" style="padding-top:10px;border-top:1px solid rgba(255,255,255,.1)"><strong style="color:#f1f5f9">${L==='en'?'Total estimate':'Gesamt Schätzung'}</strong></td><td colspan="2" style="padding-top:10px;border-top:1px solid rgba(255,255,255,.1)"><strong style="color:#60a5fa;font-family:var(--fh);font-size:.9rem">€ ${totalCostStr}</strong></td></tr></tfoot></table>
        <div class="ksk-infobox">${L==='en'?'<strong>Note:</strong> All cost estimates are indicative market values based on standard security equipment and installation. Final costs depend on specific product selection, tender results and local conditions. All amounts excl. VAT.':'<strong>Hinweis:</strong> Alle Kostenangaben sind Richtwerte auf Basis marktüblicher Sicherheitstechnik. Endkosten hängen von Produktauswahl, Ausschreibungsergebnissen und örtlichen Gegebenheiten ab. Alle Beträge netto zzgl. MwSt.'}</div>
      `)}
      ${S2(12,L==='en'?'Release & Signature':'Freigabe & Unterschrift',`
        <p class="ksk-text">${L==='en'?'This security report was prepared by SecureStay: Analytics and requires review and approval by the authorised representatives of the client.':'Der vorliegende Sicherheitsbericht wurde durch SecureStay: Analytics erstellt und bedarf der Prüfung und Freigabe durch die bevollmächtigten Vertreter des Auftraggebers.'}</p>
        <div class="ksk-sig-row">
          <div class="ksk-sig-box"><div style="color:#e2e8f0;font-size:.82rem;font-weight:700;margin-bottom:3px">${pruefer}</div><div>${L==='en'?'Auditor · SecureStay: Analytics':'Auditor/in · SecureStay: Analytics'}</div><div style="color:#60a5fa;font-size:.68rem;margin-top:2px">Kirchstr. 8b · 55270 Essenheim</div></div>
          <div class="ksk-sig-box"><div style="color:#e2e8f0;font-size:.82rem;font-weight:700;margin-bottom:3px">${auftraggeber||'___________________________'}</div><div>${L==='en'?'Client / Authorised Representative':'Auftraggeber / Bevollmächtigte/r'}</div></div>
          <div class="ksk-sig-box"><div style="color:#e2e8f0;font-size:.82rem;font-weight:700;margin-bottom:3px">_____________</div><div>${L==='en'?'Date of Approval':'Freigabedatum'}</div></div>
        </div>
        <div class="ksk-infobox" style="margin-top:18px;font-size:.74rem">${L==='en'?`Generated: ${genDateTime} · Version: ${version} · Status: ${status}`:`Erstellt: ${genDateTime} · Version: ${version} · Status: ${status}`}</div>
      `)}
      ${S2(13,L==='en'?'Glossary & Terminology':'Fachbegriffe & Glossar',`
        <p class="ksk-text">${L==='en'?'The following glossary defines the key technical terms used in this security concept. The definitions are based on internationally recognised standards, in particular <strong>ISO 31000:2018</strong> (Risk Management), <strong>ISO/IEC 27001:2022</strong> (Information Security), <strong>ISO 22301:2019</strong> (Business Continuity) and the <strong>BSI IT-Grundschutz</strong>. Understanding these terms ensures a common basis for the assessment, communication and treatment of risks.':'Das nachfolgende Glossar definiert die wesentlichen Fachbegriffe dieses Sicherheitskonzepts. Die Definitionen basieren auf international anerkannten Normen, insbesondere <strong>ISO 31000:2018</strong> (Risikomanagement), <strong>ISO/IEC 27001:2022</strong> (Informationssicherheit), <strong>ISO 22301:2019</strong> (Business Continuity) sowie dem <strong>BSI IT-Grundschutz</strong>. Das Verständnis dieser Begriffe schafft eine gemeinsame Grundlage für die Beurteilung, Kommunikation und Behandlung von Risiken.'}</p>
        ${_kskGlossaryHTML()}
      `)}
      <div style="background:linear-gradient(135deg,rgba(37,99,235,.06),rgba(16,185,129,.03));border-top:1px solid rgba(37,99,235,.15);padding:24px 40px;text-align:center">
        <div style="font-family:var(--fh);font-weight:800;color:#f1f5f9;font-size:1rem">SecureStay: Analytics</div>
        <div style="font-size:.76rem;color:#94a3b8;margin-top:3px">SecureStay Solutions UG (haftungsbeschränkt)</div>
        <div style="font-size:.64rem;color:#64748b;margin-top:2px">Kirchstr. 8b · 55270 Essenheim · securestay@outlook.de</div>
      </div>
    </div>
  </div>
  <div class="nav-row"><button class="btn-s" onclick="S.reportView='begehung';render()">← ${L==='en'?'Back to Report':'Zurück zum Bericht'}</button><button class="btn-p" style="background:linear-gradient(135deg,var(--purple),#7c3aed);box-shadow:0 6px 18px rgba(167,139,250,.3)" onclick="window.print()">🖨 PDF</button></div>`;
}
