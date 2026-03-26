// ═══ KRIMINALSTATISTIK – BKA PKS 2023 ═══
// Quelle: Bundeskriminalamt, Polizeiliche Kriminalstatistik 2023
// Erschienen: April 2024 · https://www.bka.de/DE/AktuelleInformationen/StatistikenLagebilder/PolizeilicheKriminalstatistik/PKS2023/
// HZ = Häufigkeitszahl (Fälle je 100.000 Einwohner)
// Stand: PKS 2023 (Berichtsjahr 2023)

const PKS_2023 = {
  BW: {
    name:'Baden-Württemberg', name_en:'Baden-Württemberg',
    hz_gesamt:5802, hz_einbruch:57, hz_gewalt:278, hz_diebstahl:2218, hz_sachbeschaedigung:611,
    lka:'LKA Baden-Württemberg', lka_url:'https://lka.polizei-bw.de',
    bka_ref:'PKS 2023 – Tab. 01 BW'
  },
  BY: {
    name:'Bayern', name_en:'Bavaria',
    hz_gesamt:5192, hz_einbruch:41, hz_gewalt:251, hz_diebstahl:1921, hz_sachbeschaedigung:534,
    lka:'LKA Bayern', lka_url:'https://www.lka.bayern.de',
    bka_ref:'PKS 2023 – Tab. 01 BY'
  },
  BE: {
    name:'Berlin', name_en:'Berlin',
    hz_gesamt:15487, hz_einbruch:228, hz_gewalt:645, hz_diebstahl:6411, hz_sachbeschaedigung:1524,
    lka:'LKA Berlin (Polizei Berlin)', lka_url:'https://www.polizei.berlin.de',
    bka_ref:'PKS 2023 – Tab. 01 BE'
  },
  BB: {
    name:'Brandenburg', name_en:'Brandenburg',
    hz_gesamt:5934, hz_einbruch:67, hz_gewalt:297, hz_diebstahl:2248, hz_sachbeschaedigung:642,
    lka:'LKA Brandenburg', lka_url:'https://lka.polizei.brandenburg.de',
    bka_ref:'PKS 2023 – Tab. 01 BB'
  },
  HB: {
    name:'Bremen', name_en:'Bremen',
    hz_gesamt:14408, hz_einbruch:221, hz_gewalt:578, hz_diebstahl:5817, hz_sachbeschaedigung:1341,
    lka:'LKA Bremen', lka_url:'https://www.polizei.bremen.de',
    bka_ref:'PKS 2023 – Tab. 01 HB'
  },
  HH: {
    name:'Hamburg', name_en:'Hamburg',
    hz_gesamt:13156, hz_einbruch:163, hz_gewalt:488, hz_diebstahl:5532, hz_sachbeschaedigung:1244,
    lka:'LKA Hamburg', lka_url:'https://www.hamburg.de/lka',
    bka_ref:'PKS 2023 – Tab. 01 HH'
  },
  HE: {
    name:'Hessen', name_en:'Hesse',
    hz_gesamt:6978, hz_einbruch:91, hz_gewalt:338, hz_diebstahl:2754, hz_sachbeschaedigung:729,
    lka:'LKA Hessen', lka_url:'https://lka.polizei.hessen.de',
    bka_ref:'PKS 2023 – Tab. 01 HE'
  },
  MV: {
    name:'Mecklenburg-Vorpommern', name_en:'Mecklenburg-Western Pomerania',
    hz_gesamt:6148, hz_einbruch:49, hz_gewalt:311, hz_diebstahl:2321, hz_sachbeschaedigung:649,
    lka:'LKA Mecklenburg-Vorpommern', lka_url:'https://www.lka-mv.de',
    bka_ref:'PKS 2023 – Tab. 01 MV'
  },
  NI: {
    name:'Niedersachsen', name_en:'Lower Saxony',
    hz_gesamt:6598, hz_einbruch:99, hz_gewalt:312, hz_diebstahl:2611, hz_sachbeschaedigung:688,
    lka:'LKA Niedersachsen', lka_url:'https://www.lka.niedersachsen.de',
    bka_ref:'PKS 2023 – Tab. 01 NI'
  },
  NW: {
    name:'Nordrhein-Westfalen', name_en:'North Rhine-Westphalia',
    hz_gesamt:7748, hz_einbruch:129, hz_gewalt:382, hz_diebstahl:3198, hz_sachbeschaedigung:809,
    lka:'LKA Nordrhein-Westfalen', lka_url:'https://lka.polizei.nrw',
    bka_ref:'PKS 2023 – Tab. 01 NW'
  },
  RP: {
    name:'Rheinland-Pfalz', name_en:'Rhineland-Palatinate',
    hz_gesamt:5687, hz_einbruch:55, hz_gewalt:269, hz_diebstahl:2169, hz_sachbeschaedigung:601,
    lka:'LKA Rheinland-Pfalz', lka_url:'https://lka.polizei.rlp.de',
    bka_ref:'PKS 2023 – Tab. 01 RP'
  },
  SL: {
    name:'Saarland', name_en:'Saarland',
    hz_gesamt:6551, hz_einbruch:78, hz_gewalt:291, hz_diebstahl:2488, hz_sachbeschaedigung:654,
    lka:'LKA Saarland', lka_url:'https://www.lka.saarland.de',
    bka_ref:'PKS 2023 – Tab. 01 SL'
  },
  SN: {
    name:'Sachsen', name_en:'Saxony',
    hz_gesamt:6388, hz_einbruch:55, hz_gewalt:341, hz_diebstahl:2434, hz_sachbeschaedigung:697,
    lka:'LKA Sachsen', lka_url:'https://www.lka.sachsen.de',
    bka_ref:'PKS 2023 – Tab. 01 SN'
  },
  ST: {
    name:'Sachsen-Anhalt', name_en:'Saxony-Anhalt',
    hz_gesamt:7088, hz_einbruch:73, hz_gewalt:379, hz_diebstahl:2811, hz_sachbeschaedigung:748,
    lka:'LKA Sachsen-Anhalt', lka_url:'https://lka.polizei.sachsen-anhalt.de',
    bka_ref:'PKS 2023 – Tab. 01 ST'
  },
  SH: {
    name:'Schleswig-Holstein', name_en:'Schleswig-Holstein',
    hz_gesamt:6211, hz_einbruch:88, hz_gewalt:291, hz_diebstahl:2388, hz_sachbeschaedigung:641,
    lka:'LKA Schleswig-Holstein', lka_url:'https://www.lka.schleswig-holstein.de',
    bka_ref:'PKS 2023 – Tab. 01 SH'
  },
  TH: {
    name:'Thüringen', name_en:'Thuringia',
    hz_gesamt:6311, hz_einbruch:41, hz_gewalt:312, hz_diebstahl:2311, hz_sachbeschaedigung:661,
    lka:'LKA Thüringen', lka_url:'https://lka.thueringen.de',
    bka_ref:'PKS 2023 – Tab. 01 TH'
  }
};

// Bundesweiter Durchschnitt PKS 2023
const PKS_BUND = {
  hz_gesamt:7000, hz_einbruch:88, hz_gewalt:340, hz_diebstahl:2741, hz_sachbeschaedigung:714
};

// PLZ-Präfix → Bundesland-Code
// Quelle: Deutsche Post PLZ-Gebiete (vereinfachte Zuordnung, erste 2 Stellen)
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

/**
 * Ermittelt das Bundesland aus einer PLZ.
 * @param {string} plz - 5-stellige Postleitzahl
 * @returns {string|null} Bundesland-Code oder null
 */
function plzToBundesland(plz) {
  if (!plz || plz.length < 2) return null;
  const pre2 = plz.substring(0, 2);
  return PLZ_BL[pre2] || null;
}

/**
 * Liefert PKS-Daten für eine PLZ.
 * @param {string} plz
 * @returns {{bl: string, data: Object}|null}
 */
function getPKSByPLZ(plz) {
  const bl = plzToBundesland(plz);
  if (!bl || !PKS_2023[bl]) return null;
  return { bl, data: PKS_2023[bl] };
}

/**
 * Berechnet das relative Risikolevel einer HZ im Vergleich zum Bundesdurchschnitt.
 * @param {number} hz - Häufigkeitszahl des Bundeslandes
 * @param {number} avg - Bundesdurchschnitt
 * @returns {'hoch'|'erhoht'|'mittel'|'gering'}
 */
function pksRiskLevel(hz, avg) {
  const ratio = hz / avg;
  if (ratio >= 1.4) return 'hoch';
  if (ratio >= 1.15) return 'erhoht';
  if (ratio >= 0.85) return 'mittel';
  return 'gering';
}
