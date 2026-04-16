// ═══ SOLL/IST-ANALYSE ═══
function renderAnalyse(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  if(window._analyseCharts){window._analyseCharts.forEach(c=>{try{c.destroy();}catch(e){}});window._analyseCharts=[];}
  if(!S.analyse)S.analyse={targets:{},riskDecisions:{},annualDamage:50000,tab:'soll_ist'};
  if(!S.analyse.tab)S.analyse.tab='soll_ist';

  const ac=activeChecks();
  if(!S.module||!ac.length){
    document.getElementById('mainContent').innerHTML=`<div class="panel"><div class="panel-title">${L==='en'?'Gap Analysis':'Soll/Ist-Analyse'}</div>
    <p class="panel-sub">${L==='en'?'No active audit. Start an audit first to use the gap analysis.':'Kein aktives Audit. Starten Sie zuerst ein Audit, um die Analyse zu nutzen.'}</p>
    <button class="btn-p" onclick="go('audit')">${L==='en'?'Start Audit →':'Audit starten →'}</button></div>`;
    return;
  }

  // ── Daten berechnen ──
  const domData=ac.map(ck=>{
    let ok=0,mn=0,kr=0,na=0,op=0;
    ck.items.forEach(it=>{const s=S.findings[it.id]?.status;if(s==='ok')ok++;else if(s==='mangel')mn++;else if(s==='kritisch')kr++;else if(s==='na')na++;else op++;});
    const tot=ok+mn+kr; const compPct=tot?Math.round(ok/tot*100):0;
    const istMat=S.maturity[ck.id]||0;
    const sollMat=(S.analyse.targets||{})[ck.id]||3;
    const gap=Math.max(0,sollMat-istMat);
    let costLow=0,costHigh=0;
    ck.items.forEach(it=>{const s=S.findings[it.id]?.status;if(s==='mangel'||s==='kritisch'){const[a,b]=parseCost((it.c||{})[s]||'');costLow+=a;costHigh+=b;}});
    return{id:ck.id,l:L==='en'&&ck.l_en?ck.l_en:ck.l,ok,mn,kr,na,op,tot,compPct,istMat,sollMat,gap,costLow,costHigh,riskDecision:(S.analyse.riskDecisions||{})[ck.id]||''};
  });

  const totalCostLow=domData.reduce((s,d)=>s+d.costLow,0);
  const totalCostHigh=domData.reduce((s,d)=>s+d.costHigh,0);
  const avgCost=(totalCostLow+totalCostHigh)/2;
  const avgIst=domData.length?domData.reduce((s,d)=>s+d.istMat,0)/domData.length:0;
  const avgSoll=domData.length?domData.reduce((s,d)=>s+d.sollMat,0)/domData.length:0;
  const totalGap=domData.reduce((s,d)=>s+d.gap,0);
  const risk=calcObjectRisk();
  const annualDamage=S.analyse.annualDamage||50000;
  const annualSaving=Math.round(annualDamage*(risk.score/100));
  const breakevenMonths=annualSaving>0?Math.round((avgCost/annualSaving)*12):0;
  const riskColor={'ok':'#22c55e','warn':'#eab308','orange':'#f97316','danger':'#ef4444'}[risk.cls]||'#64748b';

  // ── Tabs ──
  const tabs=[
    {id:'soll_ist',l:L==='en'?'Target/Actual':'Soll/Ist'},
    {id:'break_even',l:'Break-Even'},
    {id:'risk_decision',l:L==='en'?'Risk Decisions':'Risiko-Entscheidung'}
  ];
  const tabBar=`<div class="tabs" style="margin-bottom:20px">${tabs.map(t=>`<button class="tab ${S.analyse.tab===t.id?'active':''}" onclick="S.analyse.tab='${t.id}';renderAnalyse()">${t.l}</button>`).join('')}</div>`;

  // ── KPI-Karten ──
  const kpiRow=`<div class="stats" style="grid-template-columns:repeat(5,1fr);margin-bottom:20px">
    <div class="stat purple"><div class="stat-val">${avgIst.toFixed(1)}</div><div class="stat-lbl">${L==='en'?'IST Level':'IST-Level'}</div></div>
    <div class="stat total"><div class="stat-val">${avgSoll.toFixed(1)}</div><div class="stat-lbl">${L==='en'?'SOLL Level':'SOLL-Level'}</div></div>
    <div class="stat ${totalGap>0?'danger':'ok'}"><div class="stat-val">${totalGap.toFixed(1)}</div><div class="stat-lbl">${L==='en'?'Total Gap':'Gesamt-Gap'}</div></div>
    <div class="stat orange"><div class="stat-val">${totalCostLow>0?'€ '+Math.round(totalCostLow/1000)+'k':'–'}</div><div class="stat-lbl">${L==='en'?'Invest Min.':'Invest Min.'}</div></div>
    <div class="stat ${risk.cls}"><div class="stat-val">${risk.score}</div><div class="stat-lbl">${L==='en'?'Risk Score':'Risikoscore'}</div></div>
  </div>`;

  // ── Tab-Inhalte ──
  let tabContent='';

  if(S.analyse.tab==='soll_ist'){
    // Balken-Chart Soll/Ist + Ziel-Setzer
    const chartSection=`<div class="chart-box" style="margin-bottom:18px">
      <div class="chart-box-title">${L==='en'?'Maturity: IST vs. SOLL (Radar)':'Reifegrad: IST vs. SOLL (Vergleich)'}</div>
      <div style="height:220px;position:relative"><canvas id="ac1"></canvas></div>
    </div>`;

    // Ziel-Setzer Tabelle
    const tblRows=domData.map(d=>{
      const gapColor=d.gap>=3?'var(--danger)':d.gap>=2?'var(--orange)':d.gap>=1?'var(--warn)':'var(--ok)';
      const gapLabel=d.gap===0?(L==='en'?'On target':'Ziel erreicht'):`-${d.gap}`;
      const istBar=d.istMat?`<div style="display:inline-block;width:${d.istMat/5*80}px;height:6px;background:var(--purple);border-radius:3px;vertical-align:middle;margin-right:4px"></div>`:'<div style="display:inline-block;width:2px;height:6px;background:var(--border2);border-radius:1px;vertical-align:middle;margin-right:4px"></div>';
      const sollBtns=[1,2,3,4,5].map(lv=>`<button onclick="if(!S.analyse.targets)S.analyse.targets={};S.analyse.targets['${d.id}']=${lv};save();renderAnalyse()" style="width:22px;height:22px;border-radius:5px;border:1px solid ${d.sollMat===lv?'var(--accent)':'var(--border)'};background:${d.sollMat===lv?'var(--accentDim)':'transparent'};color:${d.sollMat===lv?'var(--accent)':'var(--muted)'};font-size:.6rem;font-weight:700;cursor:pointer">${lv}</button>`).join('');
      return`<tr>
        <td style="font-size:.78rem;font-weight:600;color:var(--text2);padding:8px 6px">${esc(d.l)}</td>
        <td style="text-align:center;padding:8px 6px">${istBar}<span style="font-family:var(--fm);font-size:.72rem;color:var(--purple)">${d.istMat||'–'}</span></td>
        <td style="padding:8px 6px"><div style="display:flex;gap:3px">${sollBtns}</div></td>
        <td style="text-align:center;padding:8px 6px"><span style="font-family:var(--fm);font-size:.72rem;font-weight:700;color:${gapColor}">${gapLabel}</span></td>
        <td style="text-align:right;padding:8px 6px;font-size:.72rem;color:var(--muted)">${d.costLow>0?`€ ${d.costLow.toLocaleString('de-DE')}–${d.costHigh.toLocaleString('de-DE')}`:'–'}</td>
      </tr>`;
    }).join('');

    const tbl=`<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
      <thead><tr>
        <th style="text-align:left;font-family:var(--fm);font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);padding:6px 6px;border-bottom:1px solid var(--border)">${L==='en'?'Domain':'Bereich'}</th>
        <th style="text-align:center;font-family:var(--fm);font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);padding:6px 6px;border-bottom:1px solid var(--border)">IST</th>
        <th style="font-family:var(--fm);font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);padding:6px 6px;border-bottom:1px solid var(--border)">SOLL <span style="color:var(--soft);font-weight:400">(${L==='en'?'click to set':'klicken'})</span></th>
        <th style="text-align:center;font-family:var(--fm);font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);padding:6px 6px;border-bottom:1px solid var(--border)">Gap</th>
        <th style="text-align:right;font-family:var(--fm);font-size:.5rem;letter-spacing:.1em;text-transform:uppercase;color:var(--soft);padding:6px 6px;border-bottom:1px solid var(--border)">${L==='en'?'Cost Est.':'Kosten-Sch.'}</th>
      </tr></thead>
      <tbody>${tblRows}</tbody>
    </table></div>`;

    const legendBox=`<div style="display:flex;gap:12px;margin-top:12px;flex-wrap:wrap;padding:10px 14px;background:var(--surface2);border-radius:8px;border:1px solid var(--border);font-size:.7rem;color:var(--muted)">
      <span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--purple);vertical-align:middle;margin-right:3px"></span>IST</span>
      <span><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--accent);vertical-align:middle;margin-right:3px"></span>SOLL</span>
      <span style="color:var(--ok)">● ${L==='en'?'Gap = 0: On target':'Gap = 0: Ziel erreicht'}</span>
      <span style="color:var(--warn)">● ${L==='en'?'Gap 1: Minor':'Gap 1: Gering'}</span>
      <span style="color:var(--orange)">● ${L==='en'?'Gap 2: Moderate':'Gap 2: Mittel'}</span>
      <span style="color:var(--danger)">● ${L==='en'?'Gap ≥3: Critical':'Gap ≥3: Kritisch'}</span>
    </div>`;

    tabContent=chartSection+tbl+legendBox;

  } else if(S.analyse.tab==='break_even'){
    const avgInvest=Math.round((totalCostLow+totalCostHigh)/2);
    const beYears=(breakevenMonths/12).toFixed(1);
    const roiPct=avgInvest>0?Math.round(((annualSaving*3-avgInvest)/avgInvest)*100):0;
    const beWidth=breakevenMonths>0?Math.min(100,Math.round((12/breakevenMonths)*100)):100;

    const costCards=`<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px">
      <div class="chart-box" style="text-align:center">
        <div class="chart-box-title">${L==='en'?'Investment Required':'Investitionsbedarf'}</div>
        <div style="font-family:var(--fh);font-size:1.4rem;font-weight:900;color:var(--orange);margin:8px 0">€ ${Math.round(totalCostLow/1000)}k – ${Math.round(totalCostHigh/1000)}k</div>
        <div style="font-size:.72rem;color:var(--muted)">${L==='en'?'Based on open findings':'Aus offenen Befunden'}</div>
      </div>
      <div class="chart-box" style="text-align:center">
        <div class="chart-box-title">${L==='en'?'Annual Risk Savings':'Jährliche Risikoeinsparung'}</div>
        <div style="font-family:var(--fh);font-size:1.4rem;font-weight:900;color:var(--ok);margin:8px 0">€ ${annualSaving.toLocaleString('de-DE')}</div>
        <div style="font-size:.72rem;color:var(--muted)">${risk.score}% ${L==='en'?'of expected damage':'des Schadenserwartungswerts'}</div>
      </div>
      <div class="chart-box" style="text-align:center">
        <div class="chart-box-title">Break-Even</div>
        <div style="font-family:var(--fh);font-size:1.4rem;font-weight:900;color:${breakevenMonths<=12?'var(--ok)':breakevenMonths<=36?'var(--warn)':'var(--danger)'};margin:8px 0">${breakevenMonths>0?beYears+' '+( L==='en'?'Years':'Jahre'):(L==='en'?'No data':'Keine Daten')}</div>
        <div style="font-size:.72rem;color:var(--muted)">${breakevenMonths>0?breakevenMonths+' '+( L==='en'?'months':'Monate'):'–'}</div>
      </div>
    </div>`;

    // Schadenserwartung editierbar
    const damageInput=`<div class="chart-box" style="margin-bottom:16px">
      <div class="chart-box-title">${L==='en'?'Expected Annual Damage (basis for calculation)':'Schadenserwartungswert p.a. (Berechnungsbasis)'}</div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:8px;flex-wrap:wrap">
        <div class="fg" style="flex:1;min-width:200px">
          <label>${L==='en'?'Estimated annual damage / loss potential in €:':'Geschätzter Jahresschaden / Verlustpotenzial in €:'}</label>
          <input type="number" value="${annualDamage}" min="1000" step="1000"
            oninput="S.analyse.annualDamage=parseInt(this.value)||50000;save();renderAnalyse()"
            style="background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:8px 12px;color:var(--text2);font-size:.84rem;outline:none;width:100%">
        </div>
        <div style="font-size:.72rem;color:var(--muted);max-width:260px;line-height:1.5">${L==='en'?'This value represents the estimated financial damage per year in the absence of security measures (theft, downtime, fines, reputational damage).':'Dieser Wert entspricht dem geschätzten Finanziellen Schaden pro Jahr ohne Sicherheitsmaßnahmen (Diebstahl, Ausfälle, Bußgelder, Reputationsschaden).'}</div>
      </div>
    </div>`;

    // Break-Even Timeline
    const timeline=breakevenMonths>0?`<div class="chart-box" style="margin-bottom:16px">
      <div class="chart-box-title">${L==='en'?'Break-Even Timeline':'Break-Even-Zeitstrahl'}</div>
      <div style="margin:14px 0 8px">
        <div style="display:flex;justify-content:space-between;font-size:.62rem;color:var(--muted);margin-bottom:4px">
          <span>${L==='en'?'Investment':'Investition'}</span><span>Break-Even: ${beYears} ${L==='en'?'yrs':'J.'}</span><span>${L==='en'?'3-Year horizon':'3-Jahres-Horizont'}</span>
        </div>
        <div style="height:10px;background:var(--bg3);border-radius:5px;overflow:hidden;position:relative">
          <div style="position:absolute;left:0;top:0;height:100%;width:${Math.min(100,beWidth)}%;background:linear-gradient(90deg,var(--danger),var(--warn),var(--ok));border-radius:5px;transition:.5s"></div>
          <div style="position:absolute;left:${Math.min(97,beWidth)}%;top:-2px;width:2px;height:14px;background:var(--text2)"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.6rem;color:var(--soft);margin-top:4px">
          <span>0</span><span>12 ${L==='en'?'mo':'Mo.'}</span><span>24 ${L==='en'?'mo':'Mo.'}</span><span>36 ${L==='en'?'mo':'Mo.'}</span>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px">
        <div style="text-align:center;padding:8px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
          <div style="font-size:.6rem;color:var(--muted);margin-bottom:3px">${L==='en'?'Year 1 net':'Jahr 1 netto'}</div>
          <div style="font-family:var(--fm);font-size:.82rem;font-weight:700;color:${annualSaving-avgInvest>=0?'var(--ok)':'var(--danger)'}">${(annualSaving-avgInvest).toLocaleString('de-DE')} €</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
          <div style="font-size:.6rem;color:var(--muted);margin-bottom:3px">${L==='en'?'Year 2 net':'Jahr 2 netto'}</div>
          <div style="font-family:var(--fm);font-size:.82rem;font-weight:700;color:${annualSaving*2-avgInvest>=0?'var(--ok)':'var(--danger)'}">${(annualSaving*2-avgInvest).toLocaleString('de-DE')} €</div>
        </div>
        <div style="text-align:center;padding:8px;background:var(--surface2);border-radius:8px;border:1px solid var(--border)">
          <div style="font-size:.6rem;color:var(--muted);margin-bottom:3px">${L==='en'?'3-yr ROI':'3-J.-ROI'}</div>
          <div style="font-family:var(--fm);font-size:.82rem;font-weight:700;color:${roiPct>=0?'var(--ok)':'var(--danger)'}">${roiPct >= 0 ? '+' : ''}${roiPct}%</div>
        </div>
      </div>
    </div>`:'';

    // Kosten nach Bereich
    const domCosts=domData.filter(d=>d.costLow>0).sort((a,b)=>b.costHigh-a.costHigh);
    const costBreakdown=domCosts.length?`<div class="chart-box">
      <div class="chart-box-title">${L==='en'?'Cost breakdown by domain':'Kostenverteilung nach Bereich'}</div>
      <div style="margin-top:10px">${domCosts.map(d=>{
        const maxCost=domCosts[0].costHigh||1;
        const barW=Math.round(d.costHigh/maxCost*100);
        return`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
          <div style="min-width:100px;font-size:.72rem;color:var(--text2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(d.l)}</div>
          <div style="flex:1;height:7px;background:var(--bg3);border-radius:4px;overflow:hidden"><div style="width:${barW}%;height:100%;background:linear-gradient(90deg,var(--accent),var(--orange));border-radius:4px"></div></div>
          <div style="min-width:80px;text-align:right;font-family:var(--fm);font-size:.62rem;color:var(--muted)">€ ${d.costLow.toLocaleString('de-DE')}–${d.costHigh.toLocaleString('de-DE')}</div>
        </div>`;}).join('')}
      </div>
    </div>`:'';

    tabContent=costCards+damageInput+timeline+costBreakdown;

  } else if(S.analyse.tab==='risk_decision'){
    // Erklärungsbox
    const decisionTypes=[
      {id:'akzeptanz',l:L==='en'?'Accept':'Akzeptanz',desc:L==='en'?'Risk is consciously accepted. No further action.':'Risiko wird bewusst in Kauf genommen. Keine weiteren Maßnahmen.',color:'var(--ok)',bg:'rgba(34,197,94,.08)',border:'rgba(34,197,94,.2)'},
      {id:'transfer',l:L==='en'?'Transfer':'Transfer',desc:L==='en'?'Risk transferred to third parties (insurance, outsourcing).':'Risiko auf Dritte übertragen (Versicherung, Outsourcing).',color:'var(--cyan)',bg:'rgba(6,182,212,.08)',border:'rgba(6,182,212,.2)'},
      {id:'minderung',l:L==='en'?'Mitigate':'Minderung',desc:L==='en'?'Measures are implemented to reduce the risk.':'Maßnahmen werden umgesetzt, um das Risiko zu reduzieren.',color:'var(--warn)',bg:'rgba(234,179,8,.08)',border:'rgba(234,179,8,.2)'},
      {id:'vermeidung',l:L==='en'?'Avoid':'Vermeidung',desc:L==='en'?'The risk-triggering activity is discontinued.':'Die risikoauslösende Aktivität wird eingestellt.',color:'var(--danger)',bg:'rgba(239,68,68,.08)',border:'rgba(239,68,68,.2)'}
    ];

    const infoBox=`<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:20px">
      ${decisionTypes.map(dt=>`<div style="padding:10px 14px;background:${dt.bg};border:1px solid ${dt.border};border-radius:10px">
        <div style="font-family:var(--fm);font-size:.6rem;font-weight:700;color:${dt.color};margin-bottom:3px;text-transform:uppercase;letter-spacing:.08em">${dt.l}</div>
        <div style="font-size:.72rem;color:var(--muted);line-height:1.5">${dt.desc}</div>
      </div>`).join('')}
    </div>`;

    // Entscheidungstabelle pro Bereich
    const decisionRows=domData.map(d=>{
      const chosen=(S.analyse.riskDecisions||{})[d.id]||'';
      const gapColor=d.gap>=3?'var(--danger)':d.gap>=2?'var(--orange)':d.gap>=1?'var(--warn)':'var(--ok)';
      // Empfehlung basierend auf Gap + Befunden
      let recommendation='';
      if(d.kr>0)recommendation=L==='en'?'Mitigate (critical findings)':'Minderung (kritische Befunde)';
      else if(d.gap>=2)recommendation=L==='en'?'Mitigate (large gap)':'Minderung (großer Gap)';
      else if(d.gap===1)recommendation=L==='en'?'Mitigate or Accept':'Minderung oder Akzeptanz';
      else recommendation=L==='en'?'Accept (target reached)':'Akzeptanz (Ziel erreicht)';

      const btns=decisionTypes.map(dt=>{
        const isActive=chosen===dt.id;
        return`<button onclick="if(!S.analyse.riskDecisions)S.analyse.riskDecisions={};S.analyse.riskDecisions['${d.id}']='${dt.id}';save();renderAnalyse()"
          style="padding:4px 10px;border-radius:6px;border:1px solid ${isActive?dt.border:'var(--border)'};background:${isActive?dt.bg:'transparent'};color:${isActive?dt.color:'var(--muted)'};font-size:.62rem;font-family:var(--fm);font-weight:${isActive?'700':'500'};cursor:pointer;transition:.15s">${dt.l}</button>`;
      }).join('');

      return`<div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 16px;margin-bottom:8px">
        <div style="display:flex;align-items:flex-start;gap:10px;flex-wrap:wrap">
          <div style="flex:1;min-width:160px">
            <div style="font-size:.82rem;font-weight:700;color:var(--text2);margin-bottom:3px">${esc(d.l)}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:.68rem;color:var(--muted)">
              <span>${L==='en'?'IST:':'IST:'} <strong style="color:var(--purple)">${d.istMat||'–'}</strong></span>
              <span>${L==='en'?'SOLL:':'SOLL:'} <strong style="color:var(--accent)">${d.sollMat}</strong></span>
              <span>Gap: <strong style="color:${gapColor}">${d.gap}</strong></span>
              ${d.kr>0?`<span style="color:var(--danger)">${d.kr} ${L==='en'?'critical':'kritisch'}</span>`:''}
              ${d.mn>0?`<span style="color:var(--warn)">${d.mn} ${L==='en'?'defic.':'Mängel'}</span>`:''}
            </div>
            <div style="font-size:.65rem;color:var(--soft);margin-top:4px;font-style:italic">${L==='en'?'Recommendation:':'Empfehlung:'} ${recommendation}</div>
          </div>
          <div style="display:flex;gap:4px;flex-wrap:wrap;align-items:center">${btns}</div>
        </div>
      </div>`;
    }).join('');

    // Zusammenfassung der Entscheidungen
    const summary={akzeptanz:0,transfer:0,minderung:0,vermeidung:0};
    domData.forEach(d=>{if(summary.hasOwnProperty(d.riskDecision))summary[d.riskDecision]++;});
    const decided=Object.values(summary).reduce((a,b)=>a+b,0);
    const summaryBox=decided>0?`<div style="margin-top:16px;padding:12px 16px;background:rgba(20,184,166,.04);border:1px solid rgba(20,184,166,.15);border-radius:10px">
      <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:8px">${L==='en'?'Decision Summary':'Entscheidungsübersicht'}</div>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        ${decisionTypes.filter(dt=>summary[dt.id]>0).map(dt=>`<span style="font-size:.74rem;color:${dt.color}"><strong>${summary[dt.id]}</strong> × ${dt.l}</span>`).join('')}
        ${decided<domData.length?`<span style="font-size:.74rem;color:var(--soft)">${domData.length-decided} ${L==='en'?'undecided':'offen'}</span>`:''}
      </div>
    </div>`:'';

    tabContent=infoBox+decisionRows+summaryBox;
  }

  document.getElementById('mainContent').innerHTML=`<div class="panel">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:4px">
      <div>
        <div class="panel-title">${L==='en'?'Gap Analysis & Risk Decisions':'Soll/Ist-Analyse & Risikomanagement'}</div>
        <p class="panel-sub" style="margin-bottom:0">${S.meta.objekt?`<strong style="color:var(--text2)">${esc(S.meta.objekt)}</strong> · `:''}<span style="color:var(--${risk.cls})">${L==='en'?'Risk Score':'Risikoscore'}: ${risk.score} (${risk.level})</span></p>
      </div>
      <button class="btn-sm accent" onclick="go('audit')">${L==='en'?'Back to Audit':'Zum Audit'}</button>
    </div>
    <div class="section-divider"></div>
    ${kpiRow}${tabBar}
    <div id="analyseTabContent">${tabContent}</div>
  </div>`;

  // Chart rendern
  window._analyseCharts=[];
  if(S.analyse.tab==='soll_ist'){
    setTimeout(()=>{
      const el=document.getElementById('ac1');
      if(!el)return;
      const isLight=typeof _THEME!=='undefined'&&_THEME==='light';
      const tc=isLight?'#2e5a8a':'#94a3b8',gc=isLight?'rgba(189,208,232,.7)':'rgba(30,41,59,.4)';
      const labels=domData.map(d=>d.l.substring(0,12));
      window._analyseCharts.push(new Chart(el,{
        type:'radar',
        data:{labels,datasets:[
          {label:'IST',data:domData.map(d=>d.istMat),borderColor:'#a78bfa',backgroundColor:'rgba(167,139,250,.15)',borderWidth:2,pointRadius:3,pointBackgroundColor:'#a78bfa'},
          {label:'SOLL',data:domData.map(d=>d.sollMat),borderColor:'#14b8a6',backgroundColor:'rgba(20,184,166,.1)',borderWidth:2,borderDash:[5,3],pointRadius:3,pointBackgroundColor:'#14b8a6'}
        ]},
        options:{responsive:true,maintainAspectRatio:false,
          plugins:{legend:{labels:{color:tc,font:{size:9},boxWidth:10,padding:8}}},
          scales:{r:{min:0,max:5,ticks:{stepSize:1,color:tc,backdropColor:'transparent',font:{size:7}},
            grid:{color:gc},pointLabels:{color:tc,font:{size:7}}}}}
      }));
    },80);
  }
}
