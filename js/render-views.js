function renderDB(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  let gC=0,yC=0,rC=0;S.docs.forEach(d=>{const s=docStatus(d);if(s==='green')gC++;else if(s==='yellow')yC++;else if(s==='red')rC++;});
  let content=S.dbTab==='compliance'?renderCompliance():S.dbTab==='expiring'?renderExpiring():renderAllDocs();
  document.getElementById('mainContent').innerHTML=`<div class="panel">
  <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:16px">
    <div><div class="panel-title">${L==='en'?'Database':'Datenbank'}</div></div>
    <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
      <div class="search-wrap"><span class="search-icon-lbl" style="font-family:var(--fm);font-size:.6rem">S</span><input id="dbSearchInput" placeholder="${L==='en'?'Search…':'Suchen…'}" value="${esc(S.dbSearch)}" oninput="S.dbSearch=this.value;document.getElementById('dbClear').classList.toggle('show',!!this.value);renderDBContent()"><button class="search-clear ${S.dbSearch?'show':''}" id="dbClear" onclick="S.dbSearch='';document.getElementById('dbSearchInput').value='';this.classList.remove('show');renderDBContent()">✕</button></div>
      <button class="btn-p" onclick="openDocModal()">${L==='en'?'+ Document':'+ Dokument'}</button>
    </div>
  </div>
  <div class="stats" style="grid-template-columns:repeat(4,1fr)"><div class="stat orange"><div class="stat-val">${S.docs.length}</div><div class="stat-lbl">${L==='en'?'Total':'Gesamt'}</div></div><div class="stat ok"><div class="stat-val">${gC}</div><div class="stat-lbl">${L==='en'?'Current':'Aktuell'}</div></div><div class="stat warn"><div class="stat-val">${yC}</div><div class="stat-lbl">${L==='en'?'Expiring':'Läuft ab'}</div></div><div class="stat danger"><div class="stat-val">${rC}</div><div class="stat-lbl">${L==='en'?'Overdue':'Überfällig'}</div></div></div>
  <div class="tabs"><button class="tab ${S.dbTab==='all'?'active':''}" onclick="S.dbTab='all';S.dbSearch='';render()">${L==='en'?'All':'Alle'}</button><button class="tab ${S.dbTab==='compliance'?'active':''}" onclick="S.dbTab='compliance';render()">Compliance</button><button class="tab ${S.dbTab==='expiring'?'active':''}" onclick="S.dbTab='expiring';render()">${L==='en'?'Expiry':'Ablauf'}</button></div>
  <div id="dbContent">${content}</div></div>`;
}
function renderDBContent(){
  const el=document.getElementById('dbContent');
  if(el)el.innerHTML=S.dbTab==='compliance'?renderCompliance():S.dbTab==='expiring'?renderExpiring():renderAllDocs();
}
function renderAllDocs(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const q=(S.dbSearch||'').toLowerCase().trim();
  let docs=S.docs;
  if(q)docs=docs.filter(d=>(d.name||'').toLowerCase().includes(q)||(d.category||'').toLowerCase().includes(q)||(d.norms||[]).some(n=>n.toLowerCase().includes(q))||(d.owner||'').toLowerCase().includes(q));
  if(!S.docs.length)return`<div style="text-align:center;padding:24px;opacity:.5">${L==='en'?'No documents yet':'Noch keine Dokumente'}</div>`;
  if(!docs.length)return`<div style="text-align:center;padding:24px;opacity:.5">${L==='en'?'No results for':'Keine Treffer für'} „${esc(S.dbSearch)}"</div>`;
  return`<div class="doc-grid">${docs.map(d=>{const st=docStatus(d),sl={green:L==='en'?'Current':'Aktuell',yellow:L==='en'?'Expiring':'Läuft ab',red:L==='en'?'Overdue':'Überfällig',gray:'–'}[st];return`<div class="doc"><div class="doc-icon">${CATI[d.category]||'SO'}</div><div class="doc-body"><div class="doc-name">${esc(d.name)}</div><div class="doc-meta"><span>${d.category}</span><span>${d.expiry?new Date(d.expiry).toLocaleDateString(L==='en'?'en-GB':'de-DE'):'–'}</span></div><div class="doc-norms">${(d.norms||[]).map(n=>`<span class="nb ${modCls(NORMS[n]?.m)}" style="font-size:.44rem">${n}</span>`).join('')}</div></div><div class="pill ${st}">● ${sl}</div><div style="display:flex;gap:3px"><button class="btn-sm" onclick="openDocModal(${d.id})">${L==='en'?'Edit':'Bearb.'}</button><button class="btn-sm danger" onclick="deleteDoc(${d.id})">${L==='en'?'Del':'Lösch.'}</button></div></div>`;}).join('')}</div>`;
}
function renderCompliance(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  let h='';Object.entries(NORMS).forEach(([nk,nd])=>{if(S.norms.length&&!S.norms.includes(nk))return;const dn=S.docs.filter(d=>d.norms?.includes(nk));const pct=nd.reqs.length?Math.round(Math.min(dn.length,nd.reqs.length)/nd.reqs.length*100):0;const bc=pct>=80?'var(--ok)':pct>=50?'var(--warn)':'var(--danger)';
  h+=`<div class="cn"><div class="cn-h" onclick="this.classList.toggle('open');this.nextElementSibling.classList.toggle('open')"><div style="display:flex;align-items:center;gap:6px"><span class="nb ${modCls(nd.m)}" style="margin:0">${nk}</span><span style="font-size:.8rem;font-weight:600;color:var(--text2)">${nd.fn}</span></div><div style="display:flex;align-items:center;gap:6px"><div class="cn-bar"><div class="cn-bar-fill" style="width:${pct}%;background:${bc}"></div></div><span class="cn-pct" style="color:${bc}">${pct}%</span><span class="cn-arrow">▼</span></div></div><div class="cn-body"><div style="padding:0 12px 10px">${nd.reqs.map(r=>`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid var(--border);font-size:.74rem"><span style="font-family:var(--fm);font-size:.55rem;color:var(--soft);min-width:32px">${r.n}</span><span style="flex:1;color:var(--muted)">${r.t}</span>${dn.length?`<span class="pill green" style="font-size:.44rem">● ${dn.length}</span>`:`<span class="pill red" style="font-size:.44rem">● ${L==='en'?'Missing':'Fehlt'}</span>`}</div>`).join('')}</div></div></div>`;});return h;
}
function renderExpiring(){const L=typeof _LANG!=='undefined'?_LANG:'de';const exp=S.docs.filter(d=>d.expiry&&['yellow','red'].includes(docStatus(d))).sort((a,b)=>new Date(a.expiry)-new Date(b.expiry));if(!exp.length)return`<div style="text-align:center;padding:24px"><span style="color:var(--ok);font-weight:600">${L==='en'?'All up to date':'Alles aktuell'}</span></div>`;return renderAllDocs();}

// ═══ MAßNAHMEN ═══
function renderMA(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ma=S.massnahmen,o=ma.filter(m=>m.status==='offen').length,p=ma.filter(m=>m.status==='in Bearbeitung').length,d=ma.filter(m=>m.status==='erledigt').length,ue=ma.filter(m=>m.deadline&&new Date(m.deadline)<new Date()&&m.status!=='erledigt').length;
  const krit=[];activeChecks().forEach(ch=>ch.items.forEach(it=>{if(S.findings[it.id]?.status==='kritisch')krit.push({l:it.l,sec:ch.l,note:S.findings[it.id]?.note||''});}));
  const prioEN={Kritisch:'Critical',Hoch:'High',Mittel:'Medium',Niedrig:'Low'};
  const statEN={'offen':'Open','in Bearbeitung':'In Progress','erledigt':'Done'};
  let cards=ma.length?`<div class="ma-grid">${ma.map(m=>{const pc={Kritisch:'kritisch',Hoch:'hoch',Mittel:'mittel',Niedrig:'niedrig'}[m.prio]||'';const sc={offen:'var(--danger)','in Bearbeitung':'var(--warn)',erledigt:'var(--ok)'}[m.status]||'var(--muted)';const pr=m.status==='erledigt'?100:m.status==='in Bearbeitung'?50:0;const ov=m.deadline&&new Date(m.deadline)<new Date()&&m.status!=='erledigt';
  const prioLabel=L==='en'?(prioEN[m.prio]||m.prio):m.prio;const statLabel=L==='en'?(statEN[m.status]||m.status):m.status;
  return`<div class="ma-card prio-${pc}"><div class="ma-body"><div class="ma-title">${esc(m.title)}${ov?` <span style="color:var(--danger);font-size:.62rem;font-family:var(--fm);font-weight:700;letter-spacing:.04em">${L==='en'?'OVERDUE':'ÜBERFÄLLIG'}</span>`:''}</div><div class="ma-meta"><span>${prioLabel}</span><span>${esc(m.owner||'–')}</span><span>${m.deadline?new Date(m.deadline).toLocaleDateString(L==='en'?'en-GB':'de-DE'):'–'}</span><span style="color:${sc};font-weight:600">● ${statLabel}</span></div><div class="ma-bar"><div class="ma-bar-fill" style="width:${pr}%;background:${pr===100?'var(--ok)':'var(--warn)'}"></div></div></div><div class="ma-right"><button class="btn-sm" onclick="openMaModal(${m.id})">${L==='en'?'Edit':'Bearb.'}</button><button class="btn-sm danger" onclick="deleteMa(${m.id})">${L==='en'?'Del':'Lösch.'}</button></div></div>`;}).join('')}</div>`:
  `<div style="text-align:center;padding:24px;opacity:.5">${L==='en'?'No measures yet':'Noch keine Maßnahmen'}</div>`;
  document.getElementById('mainContent').innerHTML=`<div class="panel"><div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:16px"><div><div class="panel-title">${L==='en'?'Measures':'Maßnahmen'}</div></div><div style="display:flex;gap:4px">${krit.length?`<button class="btn-sm danger" onclick="showEsk()">${L==='en'?'Escalation':'Eskalation'}</button>`:''}<button class="btn-p" onclick="openMaModal()">${L==='en'?'+ Measure':'+ Maßnahme'}</button></div></div>
  <div class="stats" style="grid-template-columns:repeat(4,1fr)"><div class="stat danger"><div class="stat-val">${o}</div><div class="stat-lbl">${L==='en'?'Open':'Offen'}</div></div><div class="stat warn"><div class="stat-val">${p}</div><div class="stat-lbl">${L==='en'?'In Progress':'In Bearb.'}</div></div><div class="stat ok"><div class="stat-val">${d}</div><div class="stat-lbl">${L==='en'?'Done':'Erledigt'}</div></div><div class="stat orange"><div class="stat-val">${ue}</div><div class="stat-lbl">${L==='en'?'Overdue':'Überfällig'}</div></div></div>${cards}</div>`;
}

// ═══ DASHBOARD ═══
function renderDash(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  // destroy any existing Chart.js instances to prevent "canvas already has chart" errors
  if(window._dashCharts){window._dashCharts.forEach(c=>{try{c.destroy();}catch(e){}});window._dashCharts=[];}
  const ac=activeChecks();
  let kC=0,mC=0,okC=0,naC=0,nc=0;
  ac.forEach(ch=>ch.items.forEach(it=>{const s=S.findings[it.id]?.status;if(s==='ok')okC++;else if(s==='mangel')mC++;else if(s==='kritisch')kC++;else if(s==='na')naC++;else nc++;}));
  const total=kC+mC+okC+naC+nc;
  const assessed=kC+mC+okC;
  const comp=assessed?Math.round(okC/assessed*100):0;
  const avgMat=ac.length?Math.round(ac.reduce((s,c)=>s+(S.maturity[c.id]||0),0)/ac.length*10)/10:0;
  const maO=S.massnahmen.filter(m=>m.status!=='erledigt').length;
  const risk=calcObjectRisk();
  const riskColor={'ok':'#22c55e','warn':'#eab308','orange':'#f97316','danger':'#ef4444'}[risk.cls]||'#64748b';
  // per-domain bar data
  const domStats=ac.map(ck=>{
    let ok=0,mn=0,kr=0,na=0,op=0;
    ck.items.forEach(it=>{const s=S.findings[it.id]?.status;if(s==='ok')ok++;else if(s==='mangel')mn++;else if(s==='kritisch')kr++;else if(s==='na')na++;else op++;});
    const tot=ok+mn+kr;const pct=tot?Math.round(ok/tot*100):0;
    return{l:(L==='en'&&ck.l_en?ck.l_en:ck.l).substring(0,14),ok,mn,kr,na,op,pct,mat:S.maturity[ck.id]||0};
  });
  document.getElementById('mainContent').innerHTML=`
  <div class="panel">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">
      <div class="panel-title" style="margin-bottom:0">Dashboard</div>
      <button class="print-btn" style="border-color:rgba(20,184,166,.3);color:var(--accent)" onclick="window.print()">PDF</button>
    </div>
    <p class="panel-sub">${S.meta.objekt?`<strong style="color:var(--text2)">${esc(S.meta.objekt)}</strong> · `:''} ${new Date().toLocaleDateString(L==='en'?'en-GB':'de-DE')}</p>
    <div class="stats" style="grid-template-columns:repeat(7,1fr)">
      <div class="stat purple"><div class="stat-val">${comp}%</div><div class="stat-lbl">Compliance</div></div>
      <div class="stat danger"><div class="stat-val">${kC}</div><div class="stat-lbl">${L==='en'?'Critical':'Kritisch'}</div></div>
      <div class="stat warn"><div class="stat-val">${mC}</div><div class="stat-lbl">${L==='en'?'Deficiencies':'Mängel'}</div></div>
      <div class="stat ok"><div class="stat-val">${okC}</div><div class="stat-lbl">OK</div></div>
      <div class="stat total"><div class="stat-val">${nc}</div><div class="stat-lbl">${L==='en'?'Open':'Offen'}</div></div>
      <div class="stat emerald"><div class="stat-val">${avgMat.toFixed(1)}</div><div class="stat-lbl">${L==='en'?'Maturity':'Reifegrad'}</div></div>
      <div class="stat ${risk.cls}"><div class="stat-val">${risk.score}</div><div class="stat-lbl">${L==='en'?'Risk':'Risiko'}</div></div>
    </div>
    ${!S.module?`<div style="display:flex;align-items:center;gap:10px;padding:10px 14px;margin-bottom:10px;background:var(--bg3);border-radius:8px;border:1px solid var(--border)">
      <div style="font-size:1.2rem;opacity:.5">📋</div>
      <div style="flex:1;font-size:.8rem;color:var(--muted)">${L==='en'?'No audit active — charts show placeholder data.':'Kein Audit aktiv — Diagramme zeigen Platzhalterdaten.'}</div>
      <button class="btn-sm" onclick="go('audit')" style="white-space:nowrap">${L==='en'?'Start Audit →':'Audit starten →'}</button>
      ${S.history?.length?`<button class="btn-sm" onclick="go('historie')" style="white-space:nowrap">${L==='en'?'From History':'Aus Historie'}</button>`:''}</div>`:''}
    <div class="chart-grid">
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Control Points':'Prüfpunkte'} (${total})</div><div style="height:185px;position:relative"><canvas id="c1"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Compliance by Domain':'Compliance pro Bereich'}</div><div style="height:185px;position:relative"><canvas id="c2"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Maturity by Domain':'Reifegrad pro Bereich'}</div><div style="height:185px;position:relative"><canvas id="c3"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Object Risk Profile':'Objekt-Risikoprofil'}</div><div style="height:185px;position:relative"><canvas id="c4"></canvas></div></div>
    </div>
    <div class="chart-grid" style="grid-template-columns:1fr 1fr">
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Measures':'Maßnahmen'}</div><div style="height:140px;position:relative"><canvas id="c5"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Documents':'Dokumente'}</div><div style="height:140px;position:relative"><canvas id="c6"></canvas></div></div>
    </div>
  </div>`;
  window._dashCharts=[];
  setTimeout(()=>{
    const tc='#94a3b8',gc='rgba(30,41,59,.4)';
    const df={responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:tc,font:{size:9,family:'DM Sans'},boxWidth:10,padding:8}}}};
    const dfNoLeg={...df,plugins:{legend:{display:false}}};
    // C1 — doughnut control points
    const el1=document.getElementById('c1');
    if(el1&&(okC+mC+kC+naC+nc>0)){
      window._dashCharts.push(new Chart(el1,{type:'doughnut',
        data:{labels:L==='en'?['OK','Deficiency','Critical','N/A','Open']:['OK','Mangel','Kritisch','N/A','Offen'],
          datasets:[{data:[okC,mC,kC,naC,nc],backgroundColor:['#22c55e','#eab308','#ef4444','#64748b','#334155'],borderWidth:0,hoverOffset:4}]},
        options:{...df,cutout:'60%',plugins:{...df.plugins,
          tooltip:{callbacks:{label:ctx=>`${ctx.label}: ${ctx.parsed} (${total?Math.round(ctx.parsed/total*100):0}%)`}}}}}));
    } else if(el1){el1.parentElement.innerHTML=`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--muted);font-size:.75rem">${L==='en'?'No data yet':'Noch keine Daten'}</div>`;}
    // C2 — horizontal bar compliance per domain
    const el2=document.getElementById('c2');
    if(el2&&domStats.length){
      window._dashCharts.push(new Chart(el2,{type:'bar',
        data:{labels:domStats.map(d=>d.l),
          datasets:[
            {label:'OK',data:domStats.map(d=>d.ok),backgroundColor:'#22c55e',borderRadius:2,borderWidth:0},
            {label:L==='en'?'Deficiency':'Mangel',data:domStats.map(d=>d.mn),backgroundColor:'#eab308',borderRadius:2,borderWidth:0},
            {label:L==='en'?'Critical':'Kritisch',data:domStats.map(d=>d.kr),backgroundColor:'#ef4444',borderRadius:2,borderWidth:0}
          ]},
        options:{...df,indexAxis:'y',scales:{
          x:{stacked:true,ticks:{color:tc,font:{size:8}},grid:{color:gc}},
          y:{stacked:true,ticks:{color:tc,font:{size:8}},grid:{display:false}}},
          plugins:{...df.plugins,tooltip:{mode:'index'}}}}));
    } else if(el2){el2.parentElement.innerHTML=`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--muted);font-size:.75rem">${L==='en'?'No findings yet':'Noch keine Befunde'}</div>`;}
    // C3 — radar maturity
    const el3=document.getElementById('c3');
    if(el3&&domStats.length>=3){
      window._dashCharts.push(new Chart(el3,{type:'radar',
        data:{labels:domStats.map(d=>d.l),
          datasets:[{label:L==='en'?'Maturity':'Reifegrad',data:domStats.map(d=>d.mat),
            borderColor:'#a78bfa',backgroundColor:'rgba(167,139,250,.15)',borderWidth:2,pointRadius:3,
            pointBackgroundColor:'#a78bfa',pointHoverRadius:5}]},
        options:{...df,scales:{r:{min:0,max:5,ticks:{stepSize:1,color:tc,backdropColor:'transparent',font:{size:7}},
          grid:{color:gc},pointLabels:{color:tc,font:{size:7}}}}}}));
    } else if(el3&&domStats.length>0){
      // fallback bar for <3 domains
      window._dashCharts.push(new Chart(el3,{type:'bar',
        data:{labels:domStats.map(d=>d.l),datasets:[{label:L==='en'?'Maturity Level':'Reifegrad',data:domStats.map(d=>d.mat),backgroundColor:'#a78bfa',borderRadius:4,borderWidth:0}]},
        options:{...dfNoLeg,scales:{x:{ticks:{color:tc},grid:{display:false}},y:{min:0,max:5,ticks:{stepSize:1,color:tc},grid:{color:gc}}}}}));
    } else if(el3){el3.parentElement.innerHTML=`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--muted);font-size:.75rem">${L==='en'?'No maturity data':'Keine Reifegraddaten'}</div>`;}
    // C4 — risk profile radar (object meta risk factors)
    const el4=document.getElementById('c4');
    if(el4){
      const m=S.meta;
      const yn=v=>v==='ja'?100:v==='teilweise'?50:v==='vollständig'?100:v==='nein'||v===''?0:20;
      const riskFactors=[
        {l:L==='en'?'Break-ins':'Einbrüche',v:yn(m.einbrueche)},
        {l:L==='en'?'Theft':'Diebstahl',v:yn(m.diebstahl)},
        {l:L==='en'?'Sabotage':'Sabotage',v:yn(m.sabotage)},
        {l:L==='en'?'IT Incidents':'IT-Vorfälle',v:yn(m.itVorfaelle)},
        {l:L==='en'?'Fire Damage':'Brandschäden',v:yn(m.brandschaden)},
        {l:L==='en'?'Int. Theft':'Pers.diebst.',v:yn(m.personaldiebstahl)},
      ];
      const mitFactors=[
        {l:L==='en'?'Access Ctrl':'Zugang',v:yn(m.zugangskontrolle)},
        {l:L==='en'?'Alarm':'Alarm',v:yn(m.alarmanlage==='ja'||m.alarmanlage==='teilweise'?m.alarmanlage:'nein')},
        {l:L==='en'?'Security':'Wachdienst',v:yn(m.sicherheitsdienst)},
        {l:L==='en'?'Fence':'Zaun',v:yn(m.einzaeunung)},
        {l:L==='en'?'Lighting':'Beleuchtg.',v:yn(m.aussenbeleuchtung)},
        {l:L==='en'?'24h Guard':'24h-Bewachg.',v:yn(m.bewachung24h)},
      ];
      window._dashCharts.push(new Chart(el4,{type:'bar',
        data:{labels:[...riskFactors.map(f=>f.l),...mitFactors.map(f=>f.l)],
          datasets:[
            {label:L==='en'?'Risk Factors':'Risikofaktoren',data:[...riskFactors.map(f=>f.v),...mitFactors.map(()=>0)],backgroundColor:'rgba(239,68,68,.7)',borderWidth:0,borderRadius:3},
            {label:L==='en'?'Mitigations':'Schutzmaßnahmen',data:[...riskFactors.map(()=>0),...mitFactors.map(f=>f.v)],backgroundColor:'rgba(34,197,94,.6)',borderWidth:0,borderRadius:3}
          ]},
        options:{...df,scales:{x:{ticks:{color:tc,font:{size:7}},grid:{display:false}},y:{min:0,max:100,ticks:{color:tc,font:{size:8}},grid:{color:gc}}},
          plugins:{...df.plugins,annotation:{},tooltip:{mode:'index'}}}}));
    }
    // C5 — measures
    const el5=document.getElementById('c5');
    if(el5){
      const mO2=S.massnahmen.filter(m=>m.status==='offen').length;
      const mP2=S.massnahmen.filter(m=>m.status==='in Bearbeitung').length;
      const mD2=S.massnahmen.filter(m=>m.status==='erledigt').length;
      window._dashCharts.push(new Chart(el5,{type:'bar',
        data:{labels:L==='en'?['Open','In Progress','Done']:['Offen','In Bearb.','Erledigt'],
          datasets:[{data:[mO2,mP2,mD2],backgroundColor:['#ef4444','#eab308','#22c55e'],borderRadius:5,borderWidth:0}]},
        options:{...dfNoLeg,scales:{x:{ticks:{color:tc,font:{size:9}},grid:{display:false}},y:{ticks:{color:tc,font:{size:8},stepSize:1},grid:{color:gc}}}}}));
    }
    // C6 — documents
    const el6=document.getElementById('c6');
    if(el6){
      let dG=0,dY=0,dR=0,dN=0;S.docs.forEach(d=>{const s=docStatus(d);if(s==='green')dG++;else if(s==='yellow')dY++;else if(s==='red')dR++;else dN++;});
      if(S.docs.length>0){
        window._dashCharts.push(new Chart(el6,{type:'doughnut',
          data:{labels:L==='en'?['Current','Expiring','Overdue','No expiry']:['Aktuell','Läuft ab','Überfällig','Kein Ablauf'],
            datasets:[{data:[dG,dY,dR,dN],backgroundColor:['#22c55e','#eab308','#ef4444','#64748b'],borderWidth:0,hoverOffset:4}]},
          options:{...df,cutout:'55%'}}));
      } else {
        el6.parentElement.innerHTML=`<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--muted);font-size:.75rem">${L==='en'?'No documents':'Keine Dokumente'}</div>`;
      }
    }
  },100);
}

// ═══ HISTORIE ═══
function renderHist(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const modLabels={security:'Security',qm:'QM',itgov:'IT-Gov',combined:L==='en'?'Combined':'Kombiniert',religion:'Religion'};
  document.getElementById('mainContent').innerHTML=`<div class="panel"><div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:16px"><div><div class="panel-title">${L==='en'?'History':'Historie'}</div></div><div style="display:flex;gap:4px;flex-wrap:wrap"><button class="btn-sm accent" onclick="importData()" title="${L==='en'?'Import JSON':'JSON importieren'}">Import</button><button class="btn-sm accent" onclick="exportData()" title="${L==='en'?'Export JSON':'JSON exportieren'}">Export</button><button class="btn-p" onclick="saveSnap()">Snapshot</button></div></div>
  ${S.history.length?`<div class="doc-grid">${S.history.map((h,i)=>`<div class="doc"><div class="doc-icon" style="font-family:var(--fm);font-size:.44rem;font-weight:700">AUD</div><div class="doc-body"><div class="doc-name">${esc(h.meta?.objekt||'Audit')} – ${new Date(h.savedAt).toLocaleDateString(L==='en'?'en-GB':'de-DE')}</div><div class="doc-meta"><span>${modLabels[h.module]||''}</span><span>OK:${h.okC||0} W:${h.maC||0} K:${h.krC||0}</span></div></div><button class="btn-sm accent" onclick="loadSnap(${i})">${L==='en'?'Load':'Laden'}</button><button class="btn-sm danger" onclick="deleteSnap(${i})">${L==='en'?'Del':'Löschen'}</button></div>`).join('')}</div>`:
  `<div style="text-align:center;padding:24px;opacity:.5">${L==='en'?'No snapshots — Tip: press <span class="kbd">5</span> for History':'Keine Snapshots — <span style="font-size:.72rem">Tipp: <span class="kbd">5</span> für Historie</span>'}</div>`}
  <div style="margin-top:12px;padding:10px 14px;background:rgba(255,255,255,.02);border-radius:var(--r);border:1px solid var(--border);font-size:.72rem;color:var(--soft)">
    <strong style="color:var(--muted)">${L==='en'?'Keyboard shortcuts:':'Tastenkürzel:'}</strong> &nbsp;<span class="kbd">1</span>–<span class="kbd">5</span> Navigation &nbsp;·&nbsp; <span class="kbd">Ctrl</span>+<span class="kbd">→</span> ${L==='en'?'Next Step':'Nächster Schritt'} &nbsp;·&nbsp; <span class="kbd">Esc</span> ${L==='en'?'Close modal':'Modal schließen'}
  </div></div>`;
}
function saveSnap(){const L=typeof _LANG!=='undefined'?_LANG:'de';const ac=activeChecks();let ok=0,ma=0,kr=0;ac.forEach(ch=>ch.items.forEach(it=>{const s=S.findings[it.id]?.status;if(s==='ok')ok++;else if(s==='mangel')ma++;else if(s==='kritisch')kr++;}));S.history.push({savedAt:new Date().toISOString(),module:S.module,meta:{...S.meta},findings:{...S.findings},maturity:{...S.maturity},norms:[...S.norms],okC:ok,maC:ma,krC:kr});save();render();toast(L==='en'?'Snapshot saved':'Snapshot gespeichert','success');}
function loadSnap(i){const L=typeof _LANG!=='undefined'?_LANG:'de';const h=S.history[i];if(!h||!confirm(L==='en'?'Overwrite current state?':'Aktuellen Stand überschreiben?'))return;S.module=h.module;S.meta={...h.meta};S.findings={...h.findings};S.maturity={...h.maturity};S.norms=[...h.norms];S.step=0;S.mode='audit';save();render();toast(L==='en'?'Snapshot loaded':'Snapshot geladen','info');}

// ═══ REPORT ═══
