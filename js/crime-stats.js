// ═══ KRIMINALSTATISTIK – dynamischer Loader ═══
// Daten werden aus data/pks.json geladen (BKA PKS – aktuellstes Berichtsjahr).
// Die JSON-Datei wird via GitHub Action jährlich im Mai aktualisiert (nach BKA-Veröffentlichung ~April).
// BKA PKS: https://www.bka.de/DE/AktuelleInformationen/StatistikenLagebilder/PolizeilicheKriminalstatistik/

// Gecachte Daten nach dem Laden
let _PKS_CACHE = null;

/**
 * Lädt PKS-Daten aus data/pks.json (einmalig, dann gecacht).
 * @returns {Promise<Object>} PKS-Datenobjekt
 */
async function loadPKSData() {
  if (_PKS_CACHE) return _PKS_CACHE;
  try {
    const r = await fetch('./data/pks.json', { cache: 'no-cache' });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    _PKS_CACHE = await r.json();
    return _PKS_CACHE;
  } catch (e) {
    console.warn('[PKS] Datei nicht ladbar:', e.message);
    return null;
  }
}

// PLZ-Präfix → Bundesland-Code (erste 2 Stellen der PLZ)
const PLZ_BL = {
  '01':'SN','02':'SN','03':'BB','04':'SN','06':'ST','07':'TH','08':'SN','09':'SN',
  '10':'BE','11':'BE','12':'BE','13':'BE','14':'BB','15':'BB','16':'MV',
  '17':'MV','18':'MV','19':'MV',
  '20':'HH','21':'HH','22':'HH','23':'SH','24':'SH','25':'SH',
  '26':'NI','27':'NI','28':'HB','29':'NI',
  '30':'NI','31':'NI','32':'NI','33':'NI','34':'HE','35':'HE','36':'HE','37':'NI','38':'NI','39':'ST',
  '40':'NW','41':'NW','42':'NW','44':'NW','45':'NW','46':'NW','47':'NW','48':'NW','49':'NI',
  '50':'NW','51':'NW','52':'NW','53':'NW',
  '54':'RP','55':'RP','56':'RP','57':'NW','58':'NW','59':'NW',
  '60':'HE','61':'HE','63':'HE','64':'HE','65':'HE',
  '66':'SL','67':'RP','68':'BW','69':'BW',
  '70':'BW','71':'BW','72':'BW','73':'BW','74':'BW','75':'BW','76':'BW','77':'BW','78':'BW','79':'BW',
  '80':'BY','81':'BY','82':'BY','83':'BY','84':'BY','85':'BY','86':'BY','87':'BY','88':'BW','89':'BW',
  '90':'BY','91':'BY','92':'BY','93':'BY','94':'BY','95':'BY','96':'BY','97':'BY',
  '98':'TH','99':'TH'
};

/** Bundesland-Code aus PLZ ermitteln */
function plzToBundesland(plz) {
  if (!plz || plz.length < 2) return null;
  return PLZ_BL[plz.substring(0, 2)] || null;
}

/** PKS-Daten für eine PLZ liefern (aus Cache) */
function getPKSByPLZ(plz) {
  if (!_PKS_CACHE) return null;
  const bl = plzToBundesland(plz);
  if (!bl) return null;
  const data = _PKS_CACHE.laender?.[bl];
  if (!data) return null;
  return { bl, data };
}

/** Bundesweiter Durchschnitt aus Cache */
function getPKSBund() {
  return _PKS_CACHE?.bund || null;
}

/** PKS-Metadaten aus Cache */
function getPKSMeta() {
  return _PKS_CACHE?._meta || null;
}

/**
 * Relatives Risikolevel einer HZ im Vergleich zum Bundesdurchschnitt.
 * @returns {'hoch'|'erhoht'|'mittel'|'gering'}
 */
function pksRiskLevel(hz, avg) {
  const ratio = hz / avg;
  if (ratio >= 1.4) return 'hoch';
  if (ratio >= 1.15) return 'erhoht';
  if (ratio >= 0.85) return 'mittel';
  return 'gering';
}

// Vorausladen beim App-Start (non-blocking)
loadPKSData().then(d => {
  if (d) console.info(`[PKS] Daten geladen – Berichtsjahr ${d._meta?.berichtsjahr||'?'}, Stand ${d._meta?.zuletzt_aktualisiert||'?'}`);
});
