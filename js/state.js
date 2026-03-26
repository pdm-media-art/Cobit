
let S={mode:'audit',dbTab:'all',dbSearch:'',step:0,module:null,norms:[],
meta:{
  objekt:'',strasse:'',hausnummer:'',plz:'',ort:'',adresse:'',datum:'',pruefer:'',auftraggeber:'',anlass:'',typ:'',notizen:'',
  eingaenge:'',einfahrten:'',stockwerke:'',mitarbeiter:'',flaeche:'',parkplaetze:'',kameras:'',
  gebaeudetype:'',baujahr:'',anzahlGebaeude:'1',aussengelaende:'',
  zugangskontrolle:'',alarmanlage:'',sicherheitsdienst:'',bewachung24h:'',
  schluessel:'',aussenbeleuchtung:'',einzaeunung:'',serverraumgesichert:'',
  einbrueche:'',diebstahl:'',sabotage:'',brandschaden:'',
  itVorfaelle:'',versicherungsschaden:'',personaldiebstahl:'',
  vorfaelle12m:'',letzteRisikoanalyse:'',vorfaelleFreitext:'',
  schutzbedarf:'',oeffentlichZugaenglich:'',gefaehrlicheStoffe:'',
  kritischeInfrastruktur:'',datenschutz:'',kassenbereich:'',
  nachtnutzung:'',besucherverkehr:'',lage:'',
  konzeptVersion:'1.0',konzeptStatus:'Entwurf'
},
findings:{},maturity:{},docs:[],massnahmen:[],history:[],editDocId:null,editMaId:null,
umfeld:{done:false,selectedRadius:1000},reportView:'begehung',
kva:{nr:'',date:'',validUntil:'',rate:250,positions:[],notes:'',discount:0,recipient:'',admTab:'kva',kleinunternehmer:false}};
function save(){try{localStorage.setItem('ssa4',JSON.stringify(S));triggerAutosave();}catch(e){}}
function load(){try{const d=JSON.parse(localStorage.getItem('ssa4'));if(d)Object.assign(S,d)}catch(e){}}
load();

function activeChecks(){if(!S.module)return[];if(S.module==='combined')return CK.filter(c=>c.m!=='religion');if(S.module==='religion')return CK.filter(c=>c.id==='religion');return CK.filter(c=>c.m===S.module);}
function getSteps(){const lang=typeof _LANG!=='undefined'?_LANG:'de';const s=[{id:'module',l:lang==='en'?'Module':'Modul'},{id:'norms',l:lang==='en'?'Standards':'Normen'},{id:'meta',l:lang==='en'?'Object Data':'Objektdaten'}];if(S.module==='security'||S.module==='combined')s.push({id:'umfeld',l:lang==='en'?'Site Analysis':'Umfeld'});activeChecks().forEach(c=>s.push({id:c.id,l:(lang==='en'&&c.l_en)?c.l_en:c.l}));s.push({id:'maturity',l:lang==='en'?'Maturity':'Reifegrad'},{id:'report',l:lang==='en'?'Report':'Bericht'});return s;}
function allCPs(){let a=[];CK.forEach(c=>c.items.forEach(i=>a.push({id:i.id,l:i.l,sec:c.l,m:c.m})));return a;}
function docStatus(d){if(!d.expiry)return'gray';const now=new Date(),exp=new Date(d.expiry);if(exp<now)return'red';if(exp<=new Date(now.getTime()+30*864e5))return'yellow';return'green';}
function parseCost(s){if(!s)return[0,0];const p=s.replace(/\./g,'').split('–').map(x=>parseInt(x.replace(/\D/g,''))||0);return[p[0]||0,p[1]||p[0]||0];}
function fmtCA(items,p){let a=0,b=0;items.forEach(f=>{const[x,y]=parseCost(f.c[p]);a+=x;b+=y;});return a===0&&b===0?'0':`${a.toLocaleString('de-DE')} – ${b.toLocaleString('de-DE')}`;}
function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function modCls(m){return m==='qm'?'qm':m==='itgov'?'it':'sec';}
function modLabel(m){return m==='qm'?'QM':m==='itgov'?'ITG':'SEC';}

