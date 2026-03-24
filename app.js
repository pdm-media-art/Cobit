const NORMS={
'ISO 31000':{m:'security',fn:'ISO 31000:2018 – Risikomanagement',reqs:[{n:'5.2',t:'Führung und Verpflichtung'},{n:'6.3',t:'Risikoidentifikation'},{n:'6.4',t:'Risikoanalyse'},{n:'6.5',t:'Risikobewertung'},{n:'6.6',t:'Risikobehandlung'},{n:'6.7',t:'Überwachung'}]},
'ISO/IEC 27001':{m:'security',fn:'ISO/IEC 27001:2022 – Informationssicherheit',reqs:[{n:'A.5',t:'Informationssicherheitsrichtlinien'},{n:'A.7',t:'Personalsicherheit'},{n:'A.8',t:'Asset Management'},{n:'A.9',t:'Zugangssteuerung'},{n:'A.11',t:'Physische Sicherheit'},{n:'A.12',t:'Betriebssicherheit'},{n:'A.15',t:'Lieferantenbeziehungen'},{n:'A.16',t:'Vorfallmanagement'},{n:'A.17',t:'BCM'},{n:'A.18',t:'Compliance'}]},
'ISO 22301':{m:'security',fn:'ISO 22301:2019 – Business Continuity',reqs:[{n:'8.2',t:'Business Impact Analyse'},{n:'8.3',t:'BC-Strategien'},{n:'8.4',t:'BC-Pläne'},{n:'8.5',t:'Übungsprogramm'},{n:'9',t:'Leistungsbewertung'}]},
'BSI IT-Grundschutz':{m:'security',fn:'BSI IT-Grundschutz-Kompendium',reqs:[{n:'ISMS.1',t:'Sicherheitsmanagement'},{n:'ORP.1',t:'Organisation'},{n:'ORP.3',t:'Schulung'},{n:'CON.3',t:'Datensicherung'},{n:'DER.1',t:'Detektion'},{n:'INF.1',t:'Gebäude'},{n:'INF.2',t:'Rechenzentrum'}]},
'KRITIS-DachG':{m:'security',fn:'KRITIS-Dachgesetz',reqs:[{n:'§13',t:'Resilienzmaßnahmen'},{n:'§14',t:'Risikoanalyse'},{n:'§15',t:'Meldepflichten'},{n:'§16',t:'Personalüberprüfung'}]},
'NIS2':{m:'security',fn:'NIS2-Umsetzungsgesetz',reqs:[{n:'§30',t:'Risikomanagement'},{n:'§31',t:'Meldepflicht'},{n:'§38',t:'Schulungspflicht GF'}]},
'ISO 9001':{m:'qm',fn:'ISO 9001:2015 – Qualitätsmanagement',reqs:[{n:'4.1',t:'Kontext'},{n:'4.2',t:'Interessierte Parteien'},{n:'5.2',t:'Qualitätspolitik'},{n:'6.1',t:'Risiken & Chancen'},{n:'6.2',t:'Qualitätsziele'},{n:'7.2',t:'Kompetenz'},{n:'7.5',t:'Dokumentation'},{n:'8.2',t:'Kundenanforderungen'},{n:'8.4',t:'Externe Anbieter'},{n:'8.7',t:'Nichtkonformitäten'},{n:'9.2',t:'Internes Audit'},{n:'9.3',t:'Managementbewertung'},{n:'10.2',t:'Korrekturmaßnahmen'},{n:'10.3',t:'KVP'}]},
'ISO 45001':{m:'qm',fn:'ISO 45001:2018 – Arbeitsschutz',reqs:[{n:'5.2',t:'SGA-Politik'},{n:'5.4',t:'Arbeitnehmer-Konsultation'},{n:'6.1.2',t:'Gefährdungsidentifizierung'},{n:'6.2',t:'SGA-Ziele'},{n:'8.1',t:'Betriebliche Steuerung'},{n:'8.2',t:'Notfallplanung'},{n:'9.2',t:'Internes Audit'},{n:'10.2',t:'Vorfall/Korrektur'}]},
'COBIT 2019':{m:'itgov',fn:'COBIT 2019 – IT-Governance Framework',reqs:[{n:'EDM',t:'Evaluate, Direct and Monitor'},{n:'APO',t:'Align, Plan and Organize'},{n:'BAI',t:'Build, Acquire and Implement'},{n:'DSS',t:'Deliver, Service and Support'},{n:'MEA',t:'Monitor, Evaluate and Assess'}]},
'ISO/IEC 20000':{m:'itgov',fn:'ISO/IEC 20000-1 – IT Service Management',reqs:[{n:'4',t:'Kontext der Organisation'},{n:'5',t:'Leadership'},{n:'6',t:'Planning'},{n:'7',t:'Support of the SMS'},{n:'8',t:'Operation of the SMS'},{n:'9',t:'Performance Evaluation'},{n:'10',t:'Improvement'}]},
};

const CK=[
// ═══ SECURITY ═══
{id:'perimeter',l:'Perimeter & Gelände',l_en:'Perimeter & Premises',m:'security',norms:['ISO 31000','KRITIS-DachG','BSI IT-Grundschutz'],i:'🏗️',s:'Außensicherung, Gelände, Beleuchtung.',items:[
{id:'p1',l:'Geländeeinfriedung',n:'DIN EN 1627 · BSI INF.1',d:'Zustand, Höhe ≥2m, Lückenfreiheit.',c:{mangel:'2.000–8.000',kritisch:'8.000–25.000'},m:'security'},
{id:'p2',l:'Fahrzeugsperre / Poller',n:'PAS 68 · IWA 14',d:'Rammschutz an Eingängen.',c:{mangel:'5.000–15.000',kritisch:'15.000–60.000'},m:'security'},
{id:'p3',l:'Geländebeleuchtung',n:'DIN EN 12464',d:'Lückenlose Ausleuchtung.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'security'},
{id:'p4',l:'Beschilderung',n:'ASR A1.3',d:'Schilder komplett.',c:{mangel:'200–800',kritisch:'800–2.000'},m:'security'},
{id:'p5',l:'Drohnenabwehr',n:'KRITIS-DachG §13',d:'UAV-Schutz.',c:{mangel:'10.000–30.000',kritisch:'30.000–100.000'},m:'security'},
]},
{id:'zutritt',l:'Zutrittskontrolle',l_en:'Access Control',m:'security',norms:['ISO/IEC 27001','BSI IT-Grundschutz','NIS2'],i:'🔐',s:'ZKS, Schlüssel, Schleusen, Besucher.',items:[
{id:'z1',l:'Elektronische ZKS',n:'DIN VDE 0830-8',d:'Protokollierung, Karten/PIN/Bio.',c:{mangel:'5.000–15.000',kritisch:'15.000–40.000'},m:'security'},
{id:'z2',l:'Schlüsselverwaltung',n:'VdS 2311',d:'Register, Ausgabeprotokoll.',c:{mangel:'500–2.000',kritisch:'2.000–8.000'},m:'security'},
{id:'z3',l:'Einlassschleuse',n:'DIN EN 1627',d:'Vereinzelung Hochsicherheit.',c:{mangel:'8.000–20.000',kritisch:'20.000–60.000'},m:'security'},
{id:'z4',l:'Besuchermanagement',n:'ISO 27001 A.11',d:'Registrierung, Begleitpflicht.',c:{mangel:'1.000–4.000',kritisch:'4.000–10.000'},m:'security'},
{id:'z5',l:'Berechtigungskonzept',n:'ISO 27001 A.9',d:'Dokumentiert, geprüft.',c:{mangel:'1.500–4.000',kritisch:'4.000–8.000'},m:'security'},
]},
{id:'einbruch',l:'Einbruchhemmung',l_en:'Intrusion Prevention',m:'security',norms:['ISO 31000'],i:'🚪',s:'Türen, Fenster, Tresore.',items:[
{id:'e1',l:'Außentüren RC2+',n:'DIN EN 1627',d:'≥ RC2.',c:{mangel:'1.500–5.000',kritisch:'5.000–15.000'},m:'security'},
{id:'e2',l:'Fenster ≥ P6B',n:'EN 356',d:'EG einbruchhemmend.',c:{mangel:'2.000–8.000',kritisch:'8.000–25.000'},m:'security'},
{id:'e3',l:'Tresore',n:'EN 1143-1',d:'Zertifiziert, verankert.',c:{mangel:'2.000–6.000',kritisch:'6.000–20.000'},m:'security'},
]},
{id:'video',l:'Videoüberwachung',l_en:'Video Surveillance',m:'security',norms:['ISO/IEC 27001','BSI IT-Grundschutz'],i:'📹',s:'Kameras, Auflösung, Speicher, DSGVO.',items:[
{id:'v1',l:'Kamera Eingänge',n:'DIN EN 62676-4',d:'Identifikationsqualität.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'security'},
{id:'v2',l:'Innenraum',n:'DIN EN 62676-4',d:'Kritische Bereiche.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'security'},
{id:'v3',l:'≥1080p',n:'DIN EN 62676-4',d:'Auflösung/Framerate.',c:{mangel:'4.000–12.000',kritisch:'12.000–30.000'},m:'security'},
{id:'v4',l:'Speicherung ≥72h',n:'VdS 2366',d:'Manipulationsschutz.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'security'},
{id:'v5',l:'DSGVO-Schilder',n:'DSGVO Art.13',d:'Hinweise vorhanden.',c:{mangel:'200–600',kritisch:'600–2.000'},m:'security'},
]},
{id:'alarm',l:'Alarm & Meldeanlagen',l_en:'Alarm Systems',m:'security',norms:['ISO 31000','BSI IT-Grundschutz'],i:'🚨',s:'EMA, ÜMA, NSL, Wartung.',items:[
{id:'a1',l:'EMA',n:'DIN EN 50131',d:'VdS-anerkannt.',c:{mangel:'5.000–15.000',kritisch:'15.000–40.000'},m:'security'},
{id:'a2',l:'NSL-Aufschaltung',n:'VdS 2311',d:'24/7.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'security'},
{id:'a3',l:'Bewegungsmelder',n:'DIN EN 50131-2',d:'PIR/Dual-Tech.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'security'},
{id:'a4',l:'Wartungsnachweis',n:'VdS 2311',d:'Jährlich.',c:{mangel:'500–1.500',kritisch:'1.500–4.000'},m:'security'},
]},
{id:'brand',l:'Brandschutz',l_en:'Fire Protection',m:'security',norms:['ISO 45001','BSI IT-Grundschutz'],i:'🔥',s:'BMA, Löscher, Fluchtwege.',items:[
{id:'b1',l:'BMA',n:'DIN 14675',d:'Automatische Melder.',c:{mangel:'8.000–25.000',kritisch:'25.000–80.000'},m:'security'},
{id:'b2',l:'Feuerlöscher',n:'DIN EN 3',d:'Geprüft, korrekte Klassen.',c:{mangel:'500–2.000',kritisch:'2.000–6.000'},m:'security'},
{id:'b3',l:'Fluchtwege',n:'ASR A2.3',d:'Frei, gekennzeichnet.',c:{mangel:'1.000–4.000',kritisch:'4.000–12.000'},m:'security'},
{id:'b4',l:'Brandschutzordnung',n:'DIN 14096',d:'Teil A/B/C aktuell.',c:{mangel:'800–2.500',kritisch:'2.500–6.000'},m:'security'},
]},
{id:'orga',l:'Sicherheitsorganisation',l_en:'Security Organisation',m:'security',norms:['ISO 31000','ISO/IEC 27001','ISO 22301','NIS2','KRITIS-DachG'],i:'📋',s:'Richtlinien, Schulungen, BCM.',items:[
{id:'o1',l:'Sicherheitsrichtlinie',n:'ISO 27001 A.5',d:'GF-unterzeichnet.',c:{mangel:'2.000–5.000',kritisch:'5.000–10.000'},m:'security'},
{id:'o2',l:'Security Awareness',n:'BSI ORP.3',d:'Regelmäßig.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'security'},
{id:'o3',l:'Notfall-/Krisenplan',n:'ISO 22301 §8.4',d:'Getestet.',c:{mangel:'4.000–10.000',kritisch:'10.000–25.000'},m:'security'},
{id:'o4',l:'BIA',n:'ISO 22301 §8.2',d:'RTO/RPO festgelegt.',c:{mangel:'3.000–8.000',kritisch:'8.000–18.000'},m:'security'},
{id:'o5',l:'Meldepflicht-Prozess',n:'NIS2 §31',d:'24h/72h definiert.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'security'},
]},
{id:'religion',l:'Religionsgemeinschaften',l_en:'Religious Institutions',m:'religion',norms:['ISO 31000','NIS2','KRITIS-DachG'],i:'REL',s:'Sicherheitsanforderungen für religiöse Einrichtungen im Umfeld.',s_en:'Security requirements for religious institutions in the vicinity.',items:[
{id:'rel1',l:'Synagoge / Jüdische Einrichtung',l_en:'Synagogue / Jewish Institution',n:'ISO 31000 · KRITIS-DachG §13',d:'Jüdische Einrichtung im Umfeld – polizeilicher Schutzstatus prüfen, erhöhte Zutrittskontrolle, Videoüberwachung, Perimeterschutz. Häufig unter Polizeibegleitung und Sonderschutz.',d_en:'Jewish institution in vicinity – check police protection status, enhanced access control, CCTV, perimeter protection. Often under police escort and special protection.',c:{mangel:'3.000–8.000',kritisch:'8.000–25.000'},m:'security'},
{id:'rel2',l:'Moschee / Islamische Einrichtung',l_en:'Mosque / Islamic Institution',n:'ISO 31000',d:'Islamische Einrichtung im Umfeld – erhöhte Wachsamkeit gegenüber Hasskriminalität. Videoüberwachung an Eingängen, gute Beleuchtung, Kontakt zur Polizei empfohlen.',d_en:'Islamic institution in vicinity – heightened vigilance against hate crime. CCTV at entrances, good lighting, police contact recommended.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'security'},
{id:'rel3',l:'Kirche / Dom / Kapelle',l_en:'Church / Cathedral / Chapel',n:'ISO 31000',d:'Christliche Einrichtung im Umfeld. Bei Großveranstaltungen erhöhte Personenströme und besondere Sicherheitsmaßnahmen berücksichtigen.',d_en:'Christian institution in vicinity. Account for high foot traffic and special security measures during large events.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'security'},
{id:'rel4',l:'Tempel / Sonstige Religionsgemeinschaft',l_en:'Temple / Other Religious Community',n:'ISO 31000',d:'Sonstige religiöse Einrichtung im Umfeld. Kulturelle Sensibilität und angepasste Sicherheitsmaßnahmen beachten.',d_en:'Other religious institution in vicinity. Cultural sensitivity and adapted security measures required.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'security'},
{id:'rel5',l:'Polizeilicher Schutz koordiniert',l_en:'Police Protection Coordinated',n:'KRITIS-DachG §13',d:'Regelmäßige Abstimmung mit der zuständigen Polizeidienststelle bzgl. Schutzbedarfs und Lagebeurteilung erfolgt.',d_en:'Regular coordination with the responsible police authority regarding protection needs and situational assessment carried out.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'security'},
{id:'rel6',l:'Notfallplan für politisch motivierte Gewalt',l_en:'Emergency Plan for Politically Motivated Violence',n:'ISO 22301 · NIS2',d:'Spezifischer Notfallplan für Anschlagsszenarien, Hasskriminalität und politisch motivierte Gewalt vorhanden und geübt.',d_en:'Specific emergency plan for attack scenarios, hate crime and politically motivated violence exists and has been rehearsed.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'security'},
]},
// ═══ QM ═══
{id:'qm_kf',l:'Kontext & Führung',l_en:'Context & Leadership',m:'qm',norms:['ISO 9001','ISO 45001'],i:'🎯',s:'Kontext, Parteien, Politik.',items:[
{id:'q1',l:'Kontext',n:'ISO 9001 4.1',d:'Themen identifiziert.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'qm'},
{id:'q2',l:'Interessierte Parteien',n:'ISO 9001 4.2',d:'Stakeholder-Analyse.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'qm'},
{id:'q3',l:'Qualitätspolitik',n:'ISO 9001 5.2',d:'Kommuniziert.',c:{mangel:'1.000–3.000',kritisch:'3.000–6.000'},m:'qm'},
{id:'q4',l:'Rollen & Verantwortung',n:'ISO 9001 5.3',d:'Organigramm.',c:{mangel:'1.500–4.000',kritisch:'4.000–8.000'},m:'qm'},
]},
{id:'qm_plan',l:'Planung & Risiken',l_en:'Planning & Risks',m:'qm',norms:['ISO 9001','ISO 45001'],i:'📊',s:'Risikobewertung, Ziele, Gefährdungsbeurteilung.',items:[
{id:'qp1',l:'Risiken & Chancen',n:'ISO 9001 6.1',d:'Systematisch bewertet.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'qm'},
{id:'qp2',l:'Qualitätsziele SMART',n:'ISO 9001 6.2',d:'Messbar, nachverfolgt.',c:{mangel:'1.000–3.000',kritisch:'3.000–6.000'},m:'qm'},
{id:'qp3',l:'Gefährdungsbeurteilung',n:'ISO 45001 6.1.2',d:'Alle Arbeitsplätze.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'qm'},
{id:'qp4',l:'Rechtskataster',n:'ISO 45001 6.1.3',d:'Aktuell.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'qm'},
]},
{id:'qm_res',l:'Ressourcen & Kompetenz',l_en:'Resources & Competence',m:'qm',norms:['ISO 9001','ISO 45001'],i:'👥',s:'Personal, Schulung, Dokumentation.',items:[
{id:'qs1',l:'Kompetenz',n:'ISO 9001 7.2',d:'Schulungsplan, Nachweise.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'qm'},
{id:'qs2',l:'Dokumentenlenkung',n:'ISO 9001 7.5',d:'Erstellen, Genehmigen.',c:{mangel:'2.000–5.000',kritisch:'5.000–10.000'},m:'qm'},
]},
{id:'qm_op',l:'Betrieb & Steuerung',l_en:'Operations & Control',m:'qm',norms:['ISO 9001','ISO 45001'],i:'⚙️',s:'Planung, Lieferanten, Nichtkonformitäten.',items:[
{id:'qb1',l:'Betriebliche Planung',n:'ISO 9001 8.1',d:'Prozesse gesteuert.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'qm'},
{id:'qb2',l:'Lieferantensteuerung',n:'ISO 9001 8.4',d:'Bewertung, Überwachung.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'qm'},
{id:'qb3',l:'Nichtkonformitäten',n:'ISO 9001 8.7',d:'Identifiziert, korrigiert.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'qm'},
]},
{id:'qm_kvp',l:'Bewertung & KVP',l_en:'Evaluation & CIP',m:'qm',norms:['ISO 9001','ISO 45001'],i:'📈',s:'Audits, Managementbewertung, KVP.',items:[
{id:'qv1',l:'Internes Audit',n:'ISO 9001 9.2',d:'Auditplan, Berichte.',c:{mangel:'3.000–8.000',kritisch:'8.000–18.000'},m:'qm'},
{id:'qv2',l:'Managementbewertung',n:'ISO 9001 9.3',d:'Jährlich.',c:{mangel:'2.000–5.000',kritisch:'5.000–10.000'},m:'qm'},
{id:'qv3',l:'KVP-Prozess',n:'ISO 9001 10.3',d:'Systematisch.',c:{mangel:'1.500–4.000',kritisch:'4.000–8.000'},m:'qm'},
]},
// ═══ IT-GOVERNANCE (COBIT) ═══
{id:'itg_org',l:'1. IT-Organisation',l_en:'1. IT Organisation',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'🏛️',s:'Rollen, Verantwortlichkeiten, Personalbedarf.',items:[
{id:'c01',l:'Rollen & Verantwortlichkeiten IT',n:'APO01.05',d:'IT-Organigramm, Stellenbeschreibungen.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Leadership',rd:'IT-Organigramm; IT-Stellenbeschreibungen',f:'J'},
{id:'c02',l:'Personalbedarf regelmäßig bewertet',n:'APO01.08',d:'Prozess zur Bewertung des IT-Personalbedarfs.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'itgov',iso20k:'Support – Resources',rd:'Personalbedarfsanalyse',f:'J'},
{id:'c03',l:'Zielkompetenzen IT-Personal',n:'APO01.08',d:'Kompetenzprofile, Weiterbildungsplan.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Support – Competence',rd:'Kompetenzmatrix; Schulungsplan',f:'J'},
]},
{id:'itg_strat',l:'2. IT-Strategie',l_en:'2. IT Strategy',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'🧭',s:'Strategieplan, KPIs, Stakeholder-Genehmigung.',items:[
{id:'c04',l:'IT-Strategie dokumentiert',n:'APO02.05',d:'Ganzheitliche IT-Strategie und Roadmap.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Planning – Objectives',rd:'IT-Strategiedokument',f:'J'},
{id:'c05',l:'IT-KPIs messbar definiert',n:'APO02.05',d:'Strategische Ziele in messbare KPIs übersetzt.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Planning – Objectives',rd:'KPI-Maßnahmenplan',f:'Q'},
{id:'c06',l:'IT-Strategie genehmigt',n:'APO02.05',d:'Formale Genehmigung durch Stakeholder/GF.',c:{mangel:'1.000–3.000',kritisch:'3.000–6.000'},m:'itgov',iso20k:'Planning – Plan the SMS',rd:'Genehmigungsnachweis',f:'J'},
]},
{id:'itg_isms',l:'3. Informationssicherheit',l_en:'3. Information Security',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000','ISO/IEC 27001'],i:'🔒',s:'ISMS, Richtlinien, SOA, Audits, Reporting.',items:[
{id:'c07',l:'ISMS-Rollen definiert',n:'APO13.01',d:'Informationssicherheitsbeauftragter benannt.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Service Assurance',rd:'Rollenbeschreibung ISO',f:'J'},
{id:'c08',l:'Informationssicherheits-Policy',n:'APO13.01',d:'Von Management genehmigte Policy.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Management Policy',rd:'Informationssicherheits-Policy',f:'J'},
{id:'c09',l:'Sicherheitsrichtlinien abgeleitet',n:'APO13.02',d:'Spezifische Richtlinien aus Policy abgeleitet.',c:{mangel:'2.000–5.000',kritisch:'5.000–10.000'},m:'itgov',iso20k:'Service Assurance',rd:'Sicherheitsrichtlinien',f:'J'},
{id:'c10',l:'Statement of Applicability',n:'APO13.01',d:'SOA vorhanden, Scope definiert.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'Statement of Applicability (SOA)',f:'J'},
{id:'c11',l:'ISMS-Audits durchgeführt',n:'APO13.03',d:'Regelmäßige ISMS-Reviews und Audits.',c:{mangel:'3.000–8.000',kritisch:'8.000–18.000'},m:'itgov',iso20k:'Service Assurance',rd:'ISMS-Auditberichte',f:'J'},
{id:'c12',l:'ISMS-Reporting an Management',n:'APO13.03',d:'Regelmäßige Berichte an GF.',c:{mangel:'1.000–3.000',kritisch:'3.000–6.000'},m:'itgov',iso20k:'Communication',rd:'ISMS-Management-Reports',f:'Q'},
]},
{id:'itg_risk',l:'4. IT-Risikomanagement',l_en:'4. IT Risk Management',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'⚡',s:'Risiko-Policy, Assets, Schutzbedarfe, Reports.',items:[
{id:'c13',l:'IT-Risikomanagement-Policy',n:'APO12.01',d:'Methode zur Risikoerfassung etabliert.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Risks and Opportunities',rd:'IT-Risikomanagement-Policy',f:'J'},
{id:'c14',l:'IT-Asset-Inventar',n:'APO12.03',d:'Geschäftsprozesse und IT-Assets inventarisiert.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'itgov',iso20k:'Service Portfolio',rd:'IT-Asset-Inventar; Prozesslandschaft',f:'Q'},
{id:'c15',l:'Schutzbedarfsfeststellung',n:'APO12.03',d:'Schutzniveaus für IT-Services festgelegt.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Risks and Opportunities',rd:'Schutzbedarfsfeststellung',f:'J'},
{id:'c16',l:'IT-Risiko-Report',n:'APO12.04',d:'Risikoanalyse-Ergebnisse an Stakeholder.',c:{mangel:'1.500–4.000',kritisch:'4.000–8.000'},m:'itgov',iso20k:'Risks and Opportunities',rd:'IT-Risiko-Report',f:'Q'},
{id:'c17',l:'Risikominderungsplan',n:'APO12.05',d:'Kontrollaktivitäten inventarisiert.',c:{mangel:'2.000–5.000',kritisch:'5.000–10.000'},m:'itgov',iso20k:'Risks and Opportunities',rd:'Risikominderungsplan',f:'Q'},
{id:'c18',l:'Audit-Feststellungen nachverfolgt',n:'MEA03.03',d:'Remediation Tracking vorhanden.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Performance Evaluation',rd:'Maßnahmenlisten; Remediation Tracking',f:'Q'},
]},
{id:'itg_inc',l:'5. Incident-Management',l_en:'5. Incident Management',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'🚧',s:'Incident-Prozess, Tickets, Reporting.',items:[
{id:'c19',l:'Incident-Management-Prozess',n:'DSS02.02',d:'Klassifizierung, Priorisierung, Eskalation.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Resolution and Fulfilment',rd:'Incident-Policy; Eskalationsregeln; Klassifizierung',f:'O'},
{id:'c20',l:'Incident-Analyse & Diagnose',n:'DSS02.04',d:'Symptome identifiziert, Root-Cause-Analyse.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Resolution and Fulfilment',rd:'Incident-Tickets; Incident-Log',f:'O'},
{id:'c21',l:'Incident-Reporting & Trends',n:'DSS02.07',d:'Regelmäßige Statusberichte und Trendanalyse.',c:{mangel:'1.500–4.000',kritisch:'4.000–8.000'},m:'itgov',iso20k:'Resolution and Fulfilment',rd:'Incident-Status-Reports; Trendberichte',f:'M'},
]},
{id:'itg_access',l:'6. Logischer Zugriff',l_en:'6. Logical Access',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000','ISO/IEC 27001'],i:'🔑',s:'Berechtigungen, Passwörter, privilegierte Accounts.',items:[
{id:'c22',l:'Zugriffs-Policy & Verfahren',n:'DSS05.04',d:'Richtlinien für Vergabe/Änderung/Entzug.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'User-Access-Policy; Berechtigungskonzept',f:'J'},
{id:'c23',l:'Änderungen an Zugriffsrechten',n:'DSS05.04',d:'Erstellung/Änderung/Löschung dokumentiert.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Service Assurance',rd:'Genehmigte Zugriffsanträge',f:'O'},
{id:'c24',l:'Privilegierte Accounts',n:'DSS05.04',d:'Nur autorisierte Administratoren.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Service Assurance',rd:'Admin-Rollenkonzept',f:'Q'},
{id:'c25',l:'Personalisierte Accounts',n:'DSS05.04',d:'Keine generischen Accounts für Enduser.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'itgov',iso20k:'Service Assurance',rd:'Active Directory; Service-Account-Übersicht',f:'Q'},
{id:'c26',l:'Passwort-Richtlinie',n:'DSS05.04',d:'Authentifizierung, Komplexität, MFA.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'itgov',iso20k:'Service Assurance',rd:'Passwort-Guideline',f:'J'},
{id:'c27',l:'Jährlicher Account-Review',n:'DSS05.04',d:'Alle Accounts und Berechtigungen überprüft.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'Account-Review-Dokumentation',f:'J'},
]},
{id:'itg_phys',l:'7. Physischer IT-Zugriff',l_en:'7. Physical IT Access',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'🚪',s:'Serverraum-Zugang, Besucherlogbuch, Autorisierung.',items:[
{id:'c28',l:'Perimeter-Schutz IT-Bereiche',n:'DSS05.05',d:'Zugang einschränken und überwachen.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Service Assurance',rd:'Zugangskonzept IT-Räume',f:'Q'},
{id:'c29',l:'Besucher-Registrierung IT',n:'DSS05.05',d:'Alle Besucher/Dienstleister registriert.',c:{mangel:'500–2.000',kritisch:'2.000–5.000'},m:'itgov',iso20k:'Service Assurance',rd:'Besucherlogbuch',f:'O'},
{id:'c30',l:'Zugangsgenehmigung IT-Bereiche',n:'DSS05.05',d:'Zugangsanträge genehmigt und autorisiert.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'itgov',iso20k:'Service Assurance',rd:'Genehmigte Zugangsanträge',f:'O'},
{id:'c31',l:'Zugangs-Review IT-Räume',n:'DSS05.05',d:'Autorisierungen regelmäßig überprüft.',c:{mangel:'1.000–3.000',kritisch:'3.000–6.000'},m:'itgov',iso20k:'Service Assurance',rd:'Review-Ergebnisse',f:'Q'},
{id:'c32',l:'Zugangs-Logs ausgewertet',n:'DSS05.07',d:'Protokolle regelmäßig evaluiert.',c:{mangel:'1.000–3.000',kritisch:'3.000–8.000'},m:'itgov',iso20k:'Service Assurance',rd:'Zugangs-Logs; Auswertungen',f:'M'},
]},
{id:'itg_physec',l:'8. Physische IT-Sicherheit',l_en:'8. Physical IT Security',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'🏢',s:'USV, Klima, Wartung, Umgebungsschutz.',items:[
{id:'c33',l:'Sauberkeit & Sicherheit IT-Räume',n:'DSS01.04',d:'Ordnung, Brandlasten minimiert.',c:{mangel:'500–2.000',kritisch:'2.000–6.000'},m:'itgov',iso20k:'Service Assurance',rd:'Begehungsprotokolle',f:'Q'},
{id:'c34',l:'Umgebungsschutz Serverraum',n:'DSS01.04',d:'Gegen Umwelteinflüsse geschützt.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Service Assurance',rd:'Security-Policy IT-Facilities',f:'J'},
{id:'c35',l:'Umgebungsüberwachung',n:'DSS01.04',d:'Klima, Feuchte, Temperatur-Monitoring.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'Monitoring-Protokolle',f:'M'},
{id:'c36',l:'USV-Tests',n:'DSS01.05',d:'Regelmäßige USV-Tests dokumentiert.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Service Assurance',rd:'USV-Testprotokolle',f:'Q'},
{id:'c37',l:'Redundante Stromversorgung',n:'DSS01.05',d:'Mehr als eine Stromquelle.',c:{mangel:'5.000–15.000',kritisch:'15.000–40.000'},m:'itgov',iso20k:'Service Assurance',rd:'Infrastruktur-Dokumentation',f:'J'},
{id:'c38',l:'Wartungsverträge IT-Infrastruktur',n:'DSS01.05',d:'Herstellervorgaben eingehalten.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'Wartungspläne; Wartungsverträge',f:'J'},
]},
{id:'itg_dev',l:'9. Anwendungsentwicklung',l_en:'9. Application Development',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'💻',s:'Change Management, Testing, Release, CMDB.',items:[
{id:'c39',l:'Entwicklungs-/Change-Richtlinie',n:'BAI03.02',d:'Standardisiertes Verfahren.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Design Build and Transition',rd:'Change-Management-Guideline; Rollen/Verantwortlichkeiten',f:'J'},
{id:'c40',l:'Anforderungsdokumentation',n:'BAI03.02',d:'Funktionale/nicht-funktionale Anforderungen.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Design Build and Transition',rd:'Anforderungsdokumente; Genehmigungsnachweise',f:'O'},
{id:'c41',l:'Getrennte Entwicklungs-/Testumgebung',n:'BAI03.03',d:'Dev/Test separat von Produktion.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'itgov',iso20k:'Design Build and Transition',rd:'Umgebungs-Dokumentation',f:'J'},
{id:'c42',l:'Versionierung & Dokumentation',n:'BAI03.03',d:'Coding Guidelines, Versionskontrolle.',c:{mangel:'1.500–4.000',kritisch:'4.000–8.000'},m:'itgov',iso20k:'Design Build and Transition',rd:'Coding Guidelines; Changelog',f:'O'},
{id:'c43',l:'Testplan & -verfahren',n:'BAI03.07',d:'Testplan, Testumgebung definiert.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Design Build and Transition',rd:'Testplan; Testprozeduren',f:'O'},
{id:'c44',l:'Testdurchführung dokumentiert',n:'BAI03.08',d:'Testergebnisse, Bug-Listen.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Design Build and Transition',rd:'Testergebnisse; Bug-Listen',f:'O'},
{id:'c45',l:'Release-/Konfigurationsmanagement',n:'BAI03.09',d:'CMDB, Change-Tracking in Produktion.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'itgov',iso20k:'Design Build and Transition',rd:'CMDB; Produktions-Changelog',f:'O'},
]},
{id:'itg_mon',l:'10. Infrastruktur-Monitoring',l_en:'10. Infrastructure Monitoring',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'📡',s:'Performance- und Kapazitätsüberwachung.',items:[
{id:'c46',l:'IT-Infrastruktur-Monitoring',n:'DSS01.03',d:'Performance/Kapazität kontinuierlich überwacht.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Service Portfolio',rd:'Monitoring-Regeln; Incident-Tickets aus Monitoring',f:'O'},
]},
{id:'itg_malware',l:'11. Schutz vor Schadsoftware',l_en:'11. Malware Protection',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'🛡️',s:'Anti-Malware, Penetration Tests, Awareness, Endpoints.',items:[
{id:'c47',l:'Anti-Malware aktiv',n:'DSS05.01',d:'Auf allen Systemen installiert/aktiv.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'Anti-Malware-Policy',f:'O'},
{id:'c48',l:'Traffic-Filterung & Penetration Tests',n:'DSS05.01',d:'E-Mail/Download-Filter, regelmäßige Pentests.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Service Assurance',rd:'Pentest-Ergebnisse',f:'J'},
{id:'c49',l:'Security-Awareness-Programm',n:'DSS05.01',d:'Mitarbeiter geschult, Präventionsmaßnahmen.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'Security-Awareness-Programm; Schulungsnachweise',f:'J'},
{id:'c50',l:'Endpoint-Sicherheit',n:'DSS05.03',d:'Endpoints konfiguriert, Netzwerktrennung.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Service Assurance',rd:'Endpoint-Security-Policies',f:'Q'},
]},
{id:'itg_vendor',l:'12. Auslagerung & Vendor Mgmt',l_en:'12. Outsourcing & Vendor Mgmt',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000'],i:'🤝',s:'Lieferantenauswahl, Risikobewertung, SLA-Monitoring.',items:[
{id:'c51',l:'Vendor-Management-Prozess',n:'APO10.01',d:'Auswahl, Bewertung, Katalog.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Relationship and Agreement',rd:'Vendor-Policy; Lieferantenkatalog',f:'J'},
{id:'c52',l:'Vendor-Risikobewertung',n:'APO10.04',d:'Third-Party-Risk-Assessment.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'itgov',iso20k:'Relationship and Agreement',rd:'Third-Party-Risk-Reports',f:'J'},
{id:'c53',l:'Vendor-Performance-Monitoring',n:'APO10.05',d:'SLA-Überwachung, Compliance-Check.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Relationship and Agreement',rd:'Vendor-Compliance-Reports',f:'Q'},
]},
{id:'itg_bcm',l:'13. BCM & Backup',l_en:'13. BCM & Backup',m:'itgov',norms:['COBIT 2019','ISO/IEC 20000','ISO 22301'],i:'🔄',s:'BIA, BCP, DRP, Backup-Tests.',items:[
{id:'c54',l:'Business Impact Analyse (IT)',n:'DSS04.02',d:'BIA für IT-Prozesse.',c:{mangel:'3.000–8.000',kritisch:'8.000–20.000'},m:'itgov',iso20k:'Service Assurance',rd:'Business Impact Analyse',f:'J'},
{id:'c55',l:'BCP & DRP vorhanden',n:'DSS04.03',d:'Business Continuity & Disaster Recovery Plan.',c:{mangel:'4.000–10.000',kritisch:'10.000–25.000'},m:'itgov',iso20k:'Service Assurance',rd:'BCP; DRP',f:'J'},
{id:'c56',l:'BCP/DRP getestet',n:'DSS04.04',d:'Übungen durchgeführt, Ergebnisse dokumentiert.',c:{mangel:'2.000–6.000',kritisch:'6.000–15.000'},m:'itgov',iso20k:'Service Assurance',rd:'BCM-Testergebnisse',f:'J'},
{id:'c57',l:'BCM-Pläne aktuell',n:'DSS04.05',d:'Management-Review, kontinuierliche Pflege.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Service Assurance',rd:'BCM-Review-Ergebnisse',f:'J'},
{id:'c58',l:'Backup-Policy',n:'DSS04.07',d:'Definierter Backup-Zeitplan.',c:{mangel:'1.500–4.000',kritisch:'4.000–10.000'},m:'itgov',iso20k:'Service Assurance',rd:'Backup-Policy; Backup-Protokolle',f:'M'},
{id:'c59',l:'Backup-Restore-Tests',n:'DSS04.07',d:'Regelmäßige Wiederherstellungstests.',c:{mangel:'2.000–5.000',kritisch:'5.000–12.000'},m:'itgov',iso20k:'Service Assurance',rd:'Restore-Testergebnisse',f:'Q'},
]},
];

const CATS=['Richtlinie','Zertifikat','Protokoll','Schulung','Wartung','Vertrag','Plan','Analyse','Sonstiges'];
const CATI={Richtlinie:'RL',Zertifikat:'ZT',Protokoll:'PR',Schulung:'SH',Wartung:'WT',Vertrag:'VT',Plan:'PL',Analyse:'AN',Sonstiges:'SO'};
const FREQ_LABEL={J:'Jährlich',Q:'Quartalsweise',M:'Monatlich',O:'Operativ/Laufend'};
const TEMPLATES=[
{id:'logistik',name:'Logistik',name_en:'Logistics',icon:'LOG',desc:'Perimeter, Zutritt, Brand, QM.',desc_en:'Perimeter, access, fire, QM.',mod:'combined'},
{id:'buero',name:'Büro',name_en:'Office',icon:'OFF',desc:'Zutritt, IT, Brand, QM.',desc_en:'Access, IT, fire, QM.',mod:'combined'},
{id:'produktion',name:'Produktion',name_en:'Production',icon:'PRD',desc:'Arbeitsschutz, QM komplett.',desc_en:'Workplace safety, full QM.',mod:'qm'},
{id:'kritis',name:'KRITIS',name_en:'KRITIS',icon:'KRI',desc:'Maximaler Umfang.',desc_en:'Maximum scope.',mod:'combined'},
{id:'gemeinde',name:'Gemeinde / Kommunal',name_en:'Municipality',icon:'GOV',desc:'Öffentliche Gebäude, Bürgerämter, kommunale Verwaltung.',desc_en:'Public buildings, civic centers, municipal administration.',mod:'combined'},
{id:'it',name:'IT / RZ',name_en:'IT / DC',icon:'ITG',desc:'IT-Governance + Security.',desc_en:'IT Governance + Security.',mod:'itgov'},
{id:'religion',name:'Religionsgemeinschaften',name_en:'Religious Institutions',icon:'REL',desc:'Sicherheit für religiöse Einrichtungen.',desc_en:'Security for religious institutions.',mod:'religion'},
];

let S={mode:'audit',dbTab:'all',dbSearch:'',step:0,module:null,norms:[],
meta:{
  objekt:'',adresse:'',datum:'',pruefer:'',auftraggeber:'',anlass:'',typ:'',notizen:'',
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
umfeld:{done:false},reportView:'begehung',
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
function renderModule(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  document.getElementById('mainContent').innerHTML=`<div class="panel"><div class="panel-title">${L==='en'?'Select Audit Module':'Audit-Modul wählen'}</div><p class="panel-sub">${L==='en'?'5 modules available. Use industry templates or select manually.':'5 Module verfügbar. Nutzen Sie Branchenvorlagen oder wählen Sie manuell.'}</p>
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
function selMod(m){S.module=m;S.norms=[];render();save();}

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
    ${!S.module?`<div style="text-align:center;padding:30px;opacity:.5;font-size:.85rem">${L==='en'?'No audit module selected yet — start an audit first.':'Noch kein Audit-Modul gewählt — zuerst ein Audit starten.'}</div>`:`
    <div class="chart-grid">
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Control Points':'Prüfpunkte'} (${total})</div><div style="height:185px;position:relative"><canvas id="c1"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Compliance by Domain':'Compliance pro Bereich'}</div><div style="height:185px;position:relative"><canvas id="c2"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Maturity by Domain':'Reifegrad pro Bereich'}</div><div style="height:185px;position:relative"><canvas id="c3"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Object Risk Profile':'Objekt-Risikoprofil'}</div><div style="height:185px;position:relative"><canvas id="c4"></canvas></div></div>
    </div>
    <div class="chart-grid" style="grid-template-columns:1fr 1fr">
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Measures':'Maßnahmen'}</div><div style="height:140px;position:relative"><canvas id="c5"></canvas></div></div>
      <div class="chart-box"><div class="chart-box-title">${L==='en'?'Documents':'Dokumente'}</div><div style="height:140px;position:relative"><canvas id="c6"></canvas></div></div>
    </div>`}
  </div>`;
  if(!S.module)return;
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
function renderReport(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ac=activeChecks();let k=[],m=[],ok=0,cMin=0,cMax=0;
  ac.forEach(ch=>ch.items.forEach(it=>{const f=S.findings[it.id],s=f?.status;if(s==='ok')ok++;else if(s==='kritisch'){k.push({...it,note:f?.note||'',sec:ch.l,icon:ch.i});const[a,b]=parseCost(it.c.kritisch);cMin+=a;cMax+=b;}else if(s==='mangel'){m.push({...it,note:f?.note||'',sec:ch.l,icon:ch.i});const[a,b]=parseCost(it.c.mangel);cMin+=a;cMax+=b;}}));
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
      <button class="rpt-tab konzept-tab" onclick="S.reportView='konzept';render()">${L==='en'?'Security Concept':'Sicherheitskonzept'}</button>
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
  <div class="cost-sum">
    <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.08em;text-transform:uppercase;color:var(--accent);margin-bottom:8px">${L==='en'?'💶 Investment Required (Estimate)':'💶 Investitionsbedarf (Schätzung)'}</div>
    <div class="cost-row"><span>${L==='en'?'⚡ Immediate measures (critical)':'⚡ Sofortmaßnahmen (kritisch)'}</span><span>€ ${fmtCA(k,'kritisch')}</span></div>
    <div class="cost-row"><span>${L==='en'?'📅 Medium-term (deficiencies)':'📅 Mittelfristig (Mängel)'}</span><span>€ ${fmtCA(m,'mangel')}</span></div>
    <div class="cost-row" style="border-top:1px solid var(--border2);margin-top:4px;padding-top:10px"><span style="color:var(--text2);font-weight:700">${L==='en'?'Total':'Gesamt'}</span><span style="color:var(--text2);font-weight:700;font-family:var(--fh);font-size:.92rem">€ ${cMin.toLocaleString('de-DE')} – ${cMax.toLocaleString('de-DE')}</span></div>
  </div>
  <div style="background:linear-gradient(135deg,rgba(20,184,166,.04),rgba(16,185,129,.02));border:1px solid rgba(20,184,166,.12);border-radius:12px;padding:18px;text-align:center;margin-top:6px">
    <div style="font-family:var(--fh);font-weight:700;color:var(--text2);font-size:1rem">SecureStay: Analytics</div>
    <div style="font-size:.76rem;color:var(--muted);margin-top:2px">SecureStay Solutions UG (haftungsbeschränkt)</div>
    <div style="font-size:.64rem;color:var(--soft);margin-top:2px">Kirchstr. 8b · 55270 Essenheim · securestay@outlook.de</div>
  </div>
  <div class="nav-row"><button class="btn-s" onclick="prev()">←</button><div style="display:flex;gap:6px"><button class="btn-p konzept-tab" onclick="S.reportView='konzept';render()" style="background:linear-gradient(135deg,var(--purple),#7c3aed);box-shadow:0 6px 18px rgba(167,139,250,.3)">📐 ${typeof _LANG!=='undefined'&&_LANG==='en'?'Generate Concept':'Konzept generieren'}</button><button class="btn-p" onclick="window.print()">🖨 PDF</button></div></div>`;
}

// ═══ KONZEPT HELPERS ═══
function _kskMeasureTable(items,prio,idOffset){
  if(!items.length)return`<div class="ksk-okbox">✓ Keine ${prio==='kritisch'?'kritischen':'mittelfristigen'} Maßnahmen erforderlich.</div>`;
  let idx=idOffset||0;
  const rows=items.map(f=>{
    idx++;
    const tf=prio==='kritisch'?'≤ 4 Wochen':'3–6 Monate';
    const costStr=f.c?(f.c[prio]?`€ ${f.c[prio]}`:(f.c.mangel?`€ ${f.c.mangel}`:'auf Anfrage')):'auf Anfrage';
    const prioCell=prio==='kritisch'?'<span class="risk-krit">SOFORT</span>':'<span class="risk-mangel">MITTEL</span>';
    return`<tr><td style="font-family:var(--fm);font-size:.65rem;white-space:nowrap">M-${String(idx).padStart(3,'0')}</td><td><strong>${esc(f.l)}</strong>${f.note?`<br><em style="font-size:.72rem">"${esc(f.note)}"</em>`:''}</td><td style="font-size:.72rem">${esc(f.sec)}</td><td>${prioCell}</td><td style="font-size:.72rem;white-space:nowrap">${tf}</td><td style="font-size:.72rem">${costStr}</td><td style="font-size:.65rem">${f.n||'–'}</td></tr>`;
  }).join('');
  return`<table class="ksk-table"><thead><tr><th>ID</th><th>Befund / Maßnahme</th><th>Prüfbereich</th><th>Priorität</th><th>Frist</th><th>Invest.</th><th>Norm-Ref.</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function _kskUmfeldHTML(){
  if(!S.umfeld?.done)return`<p class="ksk-text" style="font-style:italic">Keine Umfeldanalyse durchgeführt. Für ein vollständiges Sicherheitskonzept wird eine standortbezogene Umfeldanalyse gemäß DIN 14675 / VdS 2311 empfohlen.</p>`;
  const highRisks=(S.umfeld.risks||[]).filter(r=>r.level==='hoch'||r.level==='mittel');
  const rows=highRisks.map(r=>`<tr><td><strong>${r.category}</strong></td><td style="text-align:center">${r.count}</td><td><span class="${r.level==='hoch'?'risk-krit':'risk-mangel'}">${r.level.toUpperCase()}</span></td><td style="font-size:.72rem">${r.recommend}</td></tr>`).join('');
  return`<p class="ksk-text">Im Rahmen der Umfeldanalyse wurden <strong>${S.umfeld.poiCount||'–'} sicherheitsrelevante Objekte</strong> in einem Radius von <strong>${S.umfeld.radius||250} m</strong> erfasst. Gesamtbewertung Umfeld-Risiko: <strong>${S.umfeld.overallRisk||'–'}</strong>.</p>${highRisks.length?`<table class="ksk-table"><thead><tr><th>Kategorie</th><th>Anzahl</th><th>Risikostufe</th><th>Handlungsempfehlung</th></tr></thead><tbody>${rows}</tbody></table>`:'<div class="ksk-okbox">✓ Keine erhöhten Umfeldrisiken identifiziert.</div>'}`;
}
function _kskNormHTML(norms){
  const descMap={'ISO/IEC 27001':'ISO/IEC 27001:2022 – Informationssicherheits-Managementsystem (ISMS). Internationale Norm für Aufbau, Betrieb und kontinuierliche Verbesserung eines ISMS.','ISO 9001':'ISO 9001:2015 – Qualitätsmanagementsystem. Anforderungen an ein wirksames QMS mit risikobasiertem Ansatz.','COBIT 2019':'COBIT 2019 – Framework für IT-Governance, IT-Management und Kontrollziele zur Steuerung von IT-Risiken.','DSGVO / GDPR':'Datenschutz-Grundverordnung (EU) 2016/679. Europäische Verordnung zum Schutz personenbezogener Daten und Rechenschaftspflicht.','BSI IT-Grundschutz':'BSI IT-Grundschutz – Bundesamt für Sicherheit in der Informationstechnik. Deutsches Rahmenwerk für systematische IT-Sicherheitsmaßnahmen.'};
  if(!norms||!norms.length)return`<p class="ksk-text">Die Prüfung basiert auf anerkannten Best-Practice-Leitfäden des Sicherheits- und Risikomanagements (u.a. ISO 31000, VdS 3473, DIN EN ISO 45001). Eine Normzuordnung nach ISO/IEC 27001 oder BSI IT-Grundschutz ist auf Wunsch möglich.</p>`;
  const rows=norms.map(n=>`<tr><td><strong>${n}</strong></td><td style="font-size:.76rem">${descMap[n]||n}</td><td style="font-size:.72rem">Grundlage der Prüfmethodik</td></tr>`).join('');
  return`<p class="ksk-text">Das Sicherheitskonzept wurde unter Berücksichtigung folgender Normen, Standards und regulatorischer Anforderungen erstellt:</p><table class="ksk-table"><thead><tr><th>Norm / Standard</th><th>Beschreibung</th><th>Relevanz</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ═══ KONZEPT ═══
function renderKonzept(){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  const ac=activeChecks();
  let kritisch=[],mangel=[],ok=[];
  ac.forEach(ch=>ch.items.forEach(it=>{const f=S.findings[it.id],s=f?.status;if(s==='kritisch')kritisch.push({...it,note:f?.note||'',sec:ch.l,icon:ch.i});else if(s==='mangel')mangel.push({...it,note:f?.note||'',sec:ch.l,icon:ch.i});else if(s==='ok')ok.push({...it,sec:ch.l});}));
  const assessed=kritisch.length+mangel.length+ok.length;
  const comp=assessed?Math.round(ok.length/assessed*100):0;
  const ds=S.meta.datum?new Date(S.meta.datum).toLocaleDateString(L==='en'?'en-GB':'de-DE',{day:'2-digit',month:'long',year:'numeric'}):'–';
  const genDate=new Date().toLocaleDateString(L==='en'?'en-GB':'de-DE',{day:'2-digit',month:'long',year:'numeric'});
  // Group kritisch by domain
  const domainMap={security:L==='en'?'Physical Security':'Physische Sicherheit',qm:L==='en'?'Quality Management':'Qualitätsmanagement',itgov:L==='en'?'IT Governance':'IT-Governance'};
  // Computed values
  const riskLevel=kritisch.length>=5?'HOCH':kritisch.length>=2?'ERHÖHT':kritisch.length>=1?'MITTEL':'GERING';
  const riskColor=kritisch.length>=5?'#dc2626':kritisch.length>=2?'#ea580c':kritisch.length>=1?'#ca8a04':'#16a34a';
  const riskText=kritisch.length>=2?'Es wurden kritische Mängel festgestellt, die priorisiert und unverzüglich zu beheben sind. Ohne Mängelbeseitigung ist der Versicherungsschutz möglicherweise eingeschränkt.':kritisch.length===1?'Es wurde ein kritischer Mangel identifiziert, der vorrangig zu beheben ist.':mangel.length>0?'Es wurden keine kritischen Mängel festgestellt. Der vorhandene Verbesserungsbedarf sollte mittelfristig adressiert werden.':'Das Objekt erfüllt alle geprüften Sicherheitsanforderungen. Kein sofortiger Handlungsbedarf.';
  const objekt=esc(S.meta.objekt||'');
  const auftraggeber=esc(S.meta.auftraggeber||'');
  const pruefer=esc(S.meta.pruefer||sessionStorage.getItem('ssa_u')||'–');
  const adresse=esc(S.meta.adresse||'');
  const version=esc(S.meta.konzeptVersion||'1.0');
  const status=esc(S.meta.konzeptStatus||'Entwurf');
  const genDate=new Date().toLocaleDateString('de-DE',{day:'2-digit',month:'long',year:'numeric'});
  const genDateTime=new Date().toLocaleString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
  const selectedMods=(S.modules||[]).map(id=>{const t=(typeof TEMPLATES!=='undefined'?TEMPLATES:[]).find(t=>t.id===id);return t?t.name:'';}).filter(Boolean);
  const modsText=selectedMods.length?selectedMods.join(', '):'allgemeine Sicherheitsbegehung';
  const normBadges=(S.norms||[]).map(n=>`<span class="ksk-norm-badge">${n}</span>`).join(' ');
  // Schutzziele (auto-generated)
  const sz=[{id:'SZ-01',z:'Physische Sicherheit',d:'Schutz von Personen, Sachwerten und Gebäude vor unbefugtem Zutritt, Diebstahl, Vandalismus und sonstigen physischen Bedrohungen.',p:'HOCH'},{id:'SZ-02',z:'Betriebskontinuität (BCM)',d:'Sicherstellung des ununterbrochenen Geschäftsbetriebs sowie schnelle Wiederherstellung nach Störungen oder sicherheitsrelevanten Ereignissen.',p:'HOCH'},{id:'SZ-03',z:'Compliance & Rechtssicherheit',d:'Einhaltung aller relevanten gesetzlichen, regulatorischen und normativen Anforderungen im Bereich Sicherheit und Datenschutz.',p:'HOCH'},{id:'SZ-04',z:'Informationssicherheit (CIA)',d:'Gewährleistung von Vertraulichkeit, Integrität und Verfügbarkeit aller schützenswerten Informationen und IT-Systeme (ISO/IEC 27001).',p:'MITTEL'},{id:'SZ-05',z:'Schadensminimierung',d:'Reduktion von Eintrittswahrscheinlichkeit und Schadensauswirkung identifizierter Risiken durch präventive und reaktive Maßnahmen (ISO 31000).',p:'MITTEL'}];
  // Investment summary helper
  const fmtCostRange=(arr,prio)=>{let mn=0,mx=0;arr.forEach(f=>{if(!f.c)return;const r=f.c[prio]||'';const m=r.match(/(\d[\d.]*)\s*[–-]\s*(\d[\d.]*)/);if(m){mn+=parseInt(m[1].replace(/\./g,''));mx+=parseInt(m[2].replace(/\./g,''));}});return mn||mx?`€ ${mn.toLocaleString('de-DE')} – ${mx.toLocaleString('de-DE')}`:'auf Anfrage';};
  document.getElementById('mainContent').innerHTML=`
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
    <div class="rpt-tabs">
      <button class="rpt-tab" onclick="S.reportView='begehung';render()">${L==='en'?'Inspection Report':'Begehungsprotokoll'}</button>
      <button class="rpt-tab active konzept-tab" onclick="S.reportView='konzept';render()">${L==='en'?'Security Concept':'Sicherheitskonzept'}</button>
    </div>
    <div style="display:flex;gap:6px">
      <button class="print-btn" onclick="exportData()">Backup</button>
      <button class="print-btn" style="border-color:rgba(167,139,250,.3);color:var(--purple)" onclick="window.print()">PDF</button>
    </div>
  </div>
  <div class="rpt-hdr" style="background:linear-gradient(135deg,rgba(167,139,250,.07),rgba(59,130,246,.04),rgba(15,23,42,.9));border-color:rgba(167,139,250,.2)">
    <div style="font-family:var(--fm);font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;color:var(--purple);margin-bottom:6px">SecureStay: Analytics · ${L==='en'?'Security Concept':'Sicherheitskonzept'}</div>
    <div class="rpt-title">${esc(S.meta.objekt)||'Objekt'}</div>
    <div class="rpt-meta" style="margin-top:6px">
      ${S.meta.auftraggeber?`<strong>${esc(S.meta.auftraggeber)}</strong> · `:''}${ds}${S.meta.pruefer?` · ${L==='en'?'Author':'Autor'}: ${esc(S.meta.pruefer)}`:''}
      ${S.meta.adresse?`<br>${esc(S.meta.adresse)}`:''}
    </div>
    <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
      <span style="font-family:var(--fm);font-size:.58rem;color:var(--purple);background:var(--purpleDim);border:1px solid rgba(167,139,250,.2);border-radius:999px;padding:2px 10px">${L==='en'?'Generated':'Erstellt'}: ${genDate}</span>
      <span style="font-family:var(--fm);font-size:.58rem;color:var(--accent);background:var(--accentDim);border:1px solid rgba(20,184,166,.2);border-radius:999px;padding:2px 10px">${comp}% ${L==='en'?'Compliance':'Compliance'}</span>
    </div>
  </div>
  <div class="konzept-section">
    <div class="konzept-section-title">${L==='en'?'Executive Summary':'Zusammenfassung'}</div>
    <div style="font-size:.82rem;color:var(--muted);line-height:1.7">
      ${L==='en'
        ?`This security concept was prepared on the basis of an on-site inspection at <strong style="color:var(--text2)">${esc(S.meta.objekt)||'the object'}</strong> on ${ds}. A total of <strong style="color:var(--text2)">${assessed}</strong> control points were assessed. <strong style="color:var(--danger)">${kritisch.length}</strong> critical deficiencies and <strong style="color:var(--warn)">${mangel.length}</strong> deficiencies requiring improvement were identified. The overall compliance level is <strong style="color:${comp>=80?'var(--ok)':comp>=50?'var(--warn)':'var(--danger)'}">${comp}%</strong>.`
        :`Das vorliegende Sicherheitskonzept wurde auf Basis einer Begehung des Objekts <strong style="color:var(--text2)">${esc(S.meta.objekt)||'–'}</strong> am ${ds} erstellt. Es wurden insgesamt <strong style="color:var(--text2)">${assessed}</strong> Prüfpunkte bewertet. Dabei wurden <strong style="color:var(--danger)">${kritisch.length}</strong> kritische Mängel und <strong style="color:var(--warn)">${mangel.length}</strong> Verbesserungsbedarfe festgestellt. Der Gesamterfüllungsgrad beträgt <strong style="color:${comp>=80?'var(--ok)':comp>=50?'var(--warn)':'var(--danger)'}">${comp}%</strong>.`}
    </div>
  </div>
  ${umfeldSect}
  ${kritisch.length||mangel.length?`
  <div class="konzept-section">
    <div class="konzept-section-title">${L==='en'?'Immediate Measures (Critical)':'Sofortmaßnahmen (Kritisch)'}</div>
    <p style="font-size:.78rem;color:var(--muted);margin-bottom:10px">${L==='en'?'Must be remediated immediately (within 4 weeks):':'Unverzüglich umzusetzen (innerhalb von 4 Wochen):'}</p>
    ${secK.length?`<div style="margin-bottom:8px"><div style="font-family:var(--fm);font-size:.52rem;text-transform:uppercase;color:var(--accent);margin-bottom:6px;letter-spacing:.06em">${domainMap.security}</div>${mkm(secK,'kritisch',L==='en'?'≤ 4 weeks':'≤ 4 Wochen')}</div>`:''}
    ${qmK.length?`<div style="margin-bottom:8px"><div style="font-family:var(--fm);font-size:.52rem;text-transform:uppercase;color:var(--orange);margin-bottom:6px;letter-spacing:.06em">${domainMap.qm}</div>${mkm(qmK,'kritisch',L==='en'?'≤ 4 weeks':'≤ 4 Wochen')}</div>`:''}
    ${itK.length?`<div style="margin-bottom:8px"><div style="font-family:var(--fm);font-size:.52rem;text-transform:uppercase;color:var(--emerald);margin-bottom:6px;letter-spacing:.06em">${domainMap.itgov}</div>${mkm(itK,'kritisch',L==='en'?'≤ 4 weeks':'≤ 4 Wochen')}</div>`:''}
  </div>
  <div class="konzept-section">
    <div class="konzept-section-title">${L==='en'?'Medium-Term Measures (Deficiencies)':'Mittelfristige Maßnahmen (Mängel)'}</div>
    <p style="font-size:.78rem;color:var(--muted);margin-bottom:10px">${L==='en'?'To be addressed within 3–6 months:':'Umzusetzen innerhalb von 3–6 Monaten:'}</p>
    ${secM.length?`<div style="margin-bottom:8px"><div style="font-family:var(--fm);font-size:.52rem;text-transform:uppercase;color:var(--accent);margin-bottom:6px;letter-spacing:.06em">${domainMap.security}</div>${mkm(secM,'mangel',L==='en'?'3–6 months':'3–6 Monate')}</div>`:''}
    ${qmM.length?`<div style="margin-bottom:8px"><div style="font-family:var(--fm);font-size:.52rem;text-transform:uppercase;color:var(--orange);margin-bottom:6px;letter-spacing:.06em">${domainMap.qm}</div>${mkm(qmM,'mangel',L==='en'?'3–6 months':'3–6 Monate')}</div>`:''}
    ${itM.length?`<div style="margin-bottom:8px"><div style="font-family:var(--fm);font-size:.52rem;text-transform:uppercase;color:var(--emerald);margin-bottom:6px;letter-spacing:.06em">${domainMap.itgov}</div>${mkm(itM,'mangel',L==='en'?'3–6 months':'3–6 Monate')}</div>`:''}
  </div>
  `:''}
  <div class="konzept-section">
    <div class="konzept-section-title">${L==='en'?'Investment Summary':'Investitionszusammenfassung'}</div>
    <div class="cost-sum">
      <div class="cost-row"><span>${L==='en'?'Immediate (critical)':'Sofort (kritisch)'}</span><span>€ ${fmtCA(kritisch,'kritisch')}</span></div>
      <div class="cost-row"><span>${L==='en'?'Medium-term (deficiencies)':'Mittelfristig (Mängel)'}</span><span>€ ${fmtCA(mangel,'mangel')}</span></div>
    </div>
  </div>
  <div style="background:linear-gradient(135deg,rgba(167,139,250,.04),rgba(59,130,246,.02));border:1px solid rgba(167,139,250,.12);border-radius:12px;padding:18px;text-align:center;margin-top:6px">
    <div style="font-family:var(--fh);font-weight:700;color:var(--text2)">SecureStay: Analytics</div>
    <div style="font-size:.76rem;color:var(--muted);margin-top:2px">SecureStay Solutions UG (haftungsbeschränkt)</div>
    <div style="font-size:.64rem;color:var(--soft)">Kirchstr. 8b · 55270 Essenheim · securestay@outlook.de</div>
  </div>
  <div class="nav-row"><button class="btn-s" onclick="S.reportView='begehung';render()">← ${L==='en'?'Back to Report':'Zurück zum Bericht'}</button><button class="btn-p" style="background:linear-gradient(135deg,var(--purple),#7c3aed);box-shadow:0 6px 18px rgba(167,139,250,.3)" onclick="window.print()">PDF</button></div>`;
}

// ═══ MODALS ═══
function closeModal(id){document.getElementById(id).classList.remove('open');}
function openDocModal(editId){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  S.editDocId=editId||null;document.getElementById('docModalTitle').textContent=editId?(L==='en'?'Edit':'Bearbeiten'):(L==='en'?'Add':'Hinzufügen');
  document.getElementById('docForm').innerHTML=`<div class="fg fg-full"><label>Name</label><input id="df_n"></div><div class="fg"><label>${L==='en'?'Category':'Kategorie'}</label><select id="df_c">${CATS.map(c=>`<option>${c}</option>`).join('')}</select></div><div class="fg"><label>${L==='en'?'Expiry Date':'Ablaufdatum'}</label><input type="date" id="df_e"></div><div class="fg"><label>Version</label><input id="df_v"></div><div class="fg"><label>${L==='en'?'Responsible':'Verantwortlich'}</label><input id="df_o"></div><div class="fg fg-full"><label>${L==='en'?'Standards':'Normen'}</label><div class="norm-chips" id="df_norms">${Object.entries(NORMS).map(([k,v])=>`<div class="nc ${v.m==='qm'?'qc':v.m==='itgov'?'ic':''}" data-norm="${k}" onclick="this.classList.toggle('active')" style="font-size:.65rem;padding:3px 8px">${k}</div>`).join('')}</div></div><div class="fg fg-full"><label>${L==='en'?'Check Points':'Prüfpunkte'}</label><select id="df_cp" multiple style="min-height:60px"><option value="">${L==='en'?'None':'Keine'}</option>${allCPs().map(cp=>`<option value="${cp.id}">${cp.sec} → ${cp.l}</option>`).join('')}</select></div><div class="fg fg-full"><label>${L==='en'?'Notes':'Notizen'}</label><textarea id="df_nt" rows="2"></textarea></div>`;
  if(editId){const d=S.docs.find(x=>x.id===editId);if(d){document.getElementById('df_n').value=d.name||'';document.getElementById('df_c').value=d.category;document.getElementById('df_e').value=d.expiry||'';document.getElementById('df_v').value=d.version||'';document.getElementById('df_o').value=d.owner||'';document.getElementById('df_nt').value=d.notes||'';(d.norms||[]).forEach(n=>{const c=document.querySelector(`#df_norms [data-norm="${n}"]`);if(c)c.classList.add('active');});(d.checkpoints||[]).forEach(cp=>{const o=document.querySelector(`#df_cp option[value="${cp}"]`);if(o)o.selected=true;});}}
  document.getElementById('docModal').classList.add('open');
}
function saveDoc(){const L=typeof _LANG!=='undefined'?_LANG:'de';const name=document.getElementById('df_n').value.trim();if(!name){toast(L==='en'?'Please enter a name':'Bitte einen Namen eingeben','error');return;}const obj={name,category:document.getElementById('df_c').value,expiry:document.getElementById('df_e').value,version:document.getElementById('df_v').value.trim(),owner:document.getElementById('df_o').value.trim(),notes:document.getElementById('df_nt').value.trim(),norms:[...document.querySelectorAll('#df_norms .nc.active')].map(e=>e.dataset.norm),checkpoints:[...document.getElementById('df_cp').selectedOptions].map(o=>o.value).filter(v=>v)};if(S.editDocId){const d=S.docs.find(x=>x.id===S.editDocId);if(d)Object.assign(d,obj);toast(L==='en'?'Document updated':'Dokument aktualisiert','success');}else{S.docs.push({id:Date.now(),...obj,addedAt:new Date().toISOString()});toast(L==='en'?'Document added':'Dokument hinzugefügt','success');}save();closeModal('docModal');render();}

function openMaModal(editId){
  const L=typeof _LANG!=='undefined'?_LANG:'de';
  S.editMaId=editId||null;document.getElementById('maModalTitle').textContent=editId?(L==='en'?'Edit':'Bearbeiten'):(L==='en'?'New Measure':'Neue Maßnahme');
  document.getElementById('maForm').innerHTML=`<div class="fg fg-full"><label>${L==='en'?'Title':'Titel'}</label><input id="ma_t"></div><div class="fg"><label>${L==='en'?'Priority':'Priorität'}</label><select id="ma_p"><option>Kritisch</option><option>Hoch</option><option>Mittel</option><option>Niedrig</option></select></div><div class="fg"><label>Status</label><select id="ma_s"><option>offen</option><option>in Bearbeitung</option><option>erledigt</option></select></div><div class="fg"><label>${L==='en'?'Responsible':'Verantwortlich'}</label><input id="ma_o"></div><div class="fg"><label>${L==='en'?'Deadline':'Frist'}</label><input type="date" id="ma_d"></div><div class="fg fg-full"><label>${L==='en'?'Description':'Beschreibung'}</label><textarea id="ma_desc" rows="2"></textarea></div>`;
  if(editId){const m=S.massnahmen.find(x=>x.id===editId);if(m){document.getElementById('ma_t').value=m.title;document.getElementById('ma_p').value=m.prio;document.getElementById('ma_s').value=m.status;document.getElementById('ma_o').value=m.owner||'';document.getElementById('ma_d').value=m.deadline||'';document.getElementById('ma_desc').value=m.desc||'';}}
  document.getElementById('maModal').classList.add('open');
}
function saveMa(){const L=typeof _LANG!=='undefined'?_LANG:'de';const t=document.getElementById('ma_t').value.trim();if(!t){toast(L==='en'?'Please enter a title':'Bitte einen Titel eingeben','error');return;}const obj={title:t,prio:document.getElementById('ma_p').value,status:document.getElementById('ma_s').value,owner:document.getElementById('ma_o').value.trim(),deadline:document.getElementById('ma_d').value,desc:document.getElementById('ma_desc').value.trim()};if(S.editMaId){const m=S.massnahmen.find(x=>x.id===S.editMaId);if(m)Object.assign(m,obj);toast(L==='en'?'Measure updated':'Maßnahme aktualisiert','success');}else{S.massnahmen.push({id:Date.now(),...obj});toast(L==='en'?'Measure created':'Maßnahme erstellt','success');}save();closeModal('maModal');render();}

function showEsk(){const L=typeof _LANG!=='undefined'?_LANG:'de';const krit=[];activeChecks().forEach(ch=>ch.items.forEach(it=>{if(S.findings[it.id]?.status==='kritisch')krit.push({l:it.l,sec:ch.l,note:S.findings[it.id]?.note||''});}));
document.getElementById('eskText').value=L==='en'
?`URGENT – Escalation of Critical Deficiencies\n\nDear Management,\n\nduring the inspection on ${S.meta.datum||'[Date]'} at "${S.meta.objekt||'[Object]'}", ${krit.length} critical deficiencies were identified:\n\n${krit.map((k,i)=>`${i+1}. ${k.sec} → ${k.l}${k.note?' ('+k.note+')':''}`).join('\n')}\n\nImmediate corrective measures required pursuant to NIS2 §38 / ISO 31000.\n\nKind regards,\n${S.meta.pruefer||'[Auditor]'}\nSecureStay Solutions UG (limited liability)`
:`DRINGEND – Eskalation kritischer Mängel\n\nSehr geehrte Geschäftsleitung,\n\nbei der Begehung am ${S.meta.datum||'[Datum]'} des Objekts "${S.meta.objekt||'[Objekt]'}" wurden ${krit.length} kritische Mängel festgestellt:\n\n${krit.map((k,i)=>`${i+1}. ${k.sec} → ${k.l}${k.note?' ('+k.note+')':''}`).join('\n')}\n\nSofortige Korrekturmaßnahmen gemäß NIS2 §38 / ISO 31000 erforderlich.\n\nMit freundlichen Grüßen,\n${S.meta.pruefer||'[Auditor]'}\nSecureStay Solutions UG (haftungsbeschränkt)`;
document.getElementById('eskModal').classList.add('open');}

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
    err.textContent = rem>0 ? (L==='en'?`❌ Wrong password. (${rem} attempt${rem!==1?'s':''} remaining)`:`❌ Falsches Passwort. (${rem} Versuch${rem!==1?'e':''} verbleibend)`) : (L==='en'?'⛔ Too many failed attempts.':'⛔ Zu viele Fehlversuche.');
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
        <td style="white-space:nowrap"><button class="login-eye" onclick="kvaOpenEdit(${i})" title="${L==='en'?'Edit':'Bearbeiten'}" style="color:var(--muted);margin-right:2px">✏️</button><button class="login-eye" onclick="S.kva.positions.splice(${i},1);save();renderAdmin()" title="${L==='en'?'Remove':'Entfernen'}" style="color:var(--danger)">✕</button></td>
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
      <button class="btn-sm danger" onclick="localStorage.removeItem('ssa_ejs_svc');localStorage.removeItem('ssa_ejs_tpl');localStorage.removeItem('ssa_ejs_key');renderAdmin();toast('Konfiguration gelöscht','warn')">🗑 Zurücksetzen</button>
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
    document.getElementById('emailModalTitle').textContent='📋 Kostenvoranschlag senden';
    document.getElementById('emailModalSub').textContent=`Von: securestay@outlook.de · KVA ${S.kva.nr||''}`;
    subject=`Kostenvoranschlag ${S.kva.nr||''} – ${S.meta.objekt||'Audit-Beratung'} | SecureStay Solutions`;
    body=`Sehr geehrte Damen und Herren,${S.meta.auftraggeber?'\nfür '+S.meta.auftraggeber:''},\n\nvielen Dank für Ihr Vertrauen. Anbei erhalten Sie unseren Kostenvoranschlag für die Beratungsleistungen im Rahmen des durchgeführten Audits.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nKOSTENVORANSCHLAG ${S.kva.nr||''}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nObjekt:      ${S.meta.objekt||'–'}\nAuftrag:     ${S.meta.auftraggeber||'–'}\nDatum:       ${S.kva.date?new Date(S.kva.date).toLocaleDateString('de-DE'):ds}\nGültig bis:  ${S.kva.validUntil?new Date(S.kva.validUntil).toLocaleDateString('de-DE'):'–'}\nStundensatz: ${rate} €/h\n\nLEISTUNGSPOSITIONEN:\n${activePos.map((p,i)=>`${String(i+1).padStart(2,'0')}. ${p.name}\n    ${p.desc}\n    Aufwand: ${p.h} Std. × ${rate} € = ${(Number(p.h)*rate).toLocaleString('de-DE')} €`).join('\n\n')}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nGESAMT: ${totalH} Std.\nNettobetrag:  ${(totalH*rate).toLocaleString('de-DE',{minimumFractionDigits:2})} €${disc>0?`\nRabatt ${disc}%: – ${(totalH*rate*disc/100).toLocaleString('de-DE',{minimumFractionDigits:2})} €`:''}
Netto:        ${netto.toLocaleString('de-DE',{minimumFractionDigits:2})} €\n${kuE?'§ 19 UStG: keine Umsatzsteuer':'MwSt. 19%:   '+(netto*0.19).toLocaleString('de-DE',{minimumFractionDigits:2})+' €'}\nGESAMT (${kuE?'netto':'brutto'}): ${brutto.toLocaleString('de-DE',{minimumFractionDigits:2})} €\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${S.kva.notes?'\nBesondere Vereinbarungen:\n'+S.kva.notes+'\n':''}\nBei Fragen stehen wir Ihnen jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\n\nSecureStay Solutions UG (haftungsbeschränkt)\nKirchstr. 8b · 55270 Essenheim\nsecurestay@outlook.de`;
  } else {
    document.getElementById('emailModalTitle').textContent='📝 Begehungsprotokoll senden';
    document.getElementById('emailModalSub').textContent='Von: securestay@outlook.de · Zusammenfassung der Audit-Ergebnisse';
    subject=`Begehungsprotokoll${S.meta.objekt?' – '+S.meta.objekt:''} | SecureStay Solutions`;
    const assessed=Object.values(S.findings).filter(f=>f.status).length;
    body=`Sehr geehrte Damen und Herren,${S.meta.auftraggeber?'\nfür '+S.meta.auftraggeber:''},\n\nerbei erhalten Sie das Protokoll der durchgeführten Begehung.\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nBEGEHUNGSPROTOKOLL\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nObjekt:       ${S.meta.objekt||'–'}\nAdresse:      ${S.meta.adresse||'–'}\nDatum:        ${ds||'–'}\nAuditor:      ${S.meta.pruefer||'–'}\nAnlass:       ${S.meta.anlass||'–'}\nGeprüfte KP: ${assessed}\n\nERGEBNISSE:\nKritische Mängel:  ${krit.length}\nVerbesserungen:    ${mangel.length}\n\n${krit.length?'KRITISCHE MÄNGEL (sofortiger Handlungsbedarf):\n'+krit.map((f,i)=>`${i+1}. ${f.sec} → ${f.l}${S.findings[f.id]?.note?' ('+S.findings[f.id].note+')':''}`).join('\n')+'\n':''}\n${mangel.length?'VERBESSERUNGSBEDARF:\n'+mangel.map((f,i)=>`${i+1}. ${f.sec} → ${f.l}${S.findings[f.id]?.note?' ('+S.findings[f.id].note+')':''}`).join('\n')+'\n':''}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nFür Rückfragen stehen wir jederzeit zur Verfügung.\n\nMit freundlichen Grüßen\n\nSecureStay Solutions UG (haftungsbeschränkt)\nKirchstr. 8b · 55270 Essenheim\nsecurestay@outlook.de`;
  }
  document.getElementById('em_to').value=S.kva.recipient||S.meta.auftraggeber||'';
  document.getElementById('em_sub').value=subject;
  document.getElementById('em_body').value=body;
  document.getElementById('emailSendBtn').disabled=false;
  document.getElementById('emailSendBtn').textContent='📤 Senden';
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
  btn.disabled=true;btn.textContent=L==='en'?'⏳ Sending…':'⏳ Wird gesendet…';
  try{emailjs.init(ejsCfg.key);}catch(e){}
  emailjs.send(ejsCfg.svc,ejsCfg.tpl,{to_email:to,subject:sub,message:body,from_name:'SecureStay Solutions UG',reply_to:'securestay@outlook.de'})
    .then(()=>{
      toast(L==='en'?`Email sent successfully to ${to}`:`E-Mail erfolgreich gesendet an ${to}`,'success',null,null,5000);
      closeModal('emailModal');
    })
    .catch(err=>{
      btn.disabled=false;btn.textContent=L==='en'?'📤 Retry':'📤 Erneut senden';
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
<div class="validity-box">📋 Dieser Kostenvoranschlag ist unverbindlich und gilt bis zum ${S.kva.validUntil?new Date(S.kva.validUntil).toLocaleDateString('de-DE'):'–'}. Alle Preise verstehen sich zzgl. gesetzlicher Mehrwertsteuer.</div>
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
  if(liUser)liUser.placeholder=_LANG==='en'?'Username':'Nutzername';
  const liPass=document.getElementById('li_pass');
  if(liPass)liPass.placeholder=_LANG==='en'?'Password':'Passwort';
  const liBtn=document.getElementById('loginBtn');
  if(liBtn)liBtn.textContent=_LANG==='en'?'Sign in →':'Anmelden →';
  // User badge logout label
  const logoutLbl=document.querySelector('.user-logout-lbl');
  if(logoutLbl)logoutLbl.textContent=_LANG==='en'?'Sign out':'Abmelden';
  // User badge title
  const userBadge=document.getElementById('userBadge');
  if(userBadge)userBadge.title=_LANG==='en'?'Sign out':'Abmelden';
}

if (checkAuth()){updateLangUI();render();}

/* ═══ LOGIN BACKGROUND — Digital Web ═══ */
(function(){
  const canvas=document.getElementById('loginWebCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  const N=90, DIST=155, SPEED=0.35;
  const TEAL='20,184,166', PURPLE='167,139,250', ORANGE='249,115,22';
  let nodes=[], raf;

  function resize(){
    canvas.width=canvas.offsetWidth||window.innerWidth;
    canvas.height=canvas.offsetHeight||window.innerHeight;
  }
  function mkNode(){
    const palettes=[TEAL,TEAL,TEAL,TEAL,TEAL,PURPLE,ORANGE];
    return{
      x:Math.random()*canvas.width, y:Math.random()*canvas.height,
      vx:(Math.random()-.5)*SPEED, vy:(Math.random()-.5)*SPEED,
      r:Math.random()*1.6+.6,
      col:palettes[Math.floor(Math.random()*palettes.length)],
      phase:Math.random()*Math.PI*2,
      hub:Math.random()<.06
    };
  }
  function init(){ nodes=[]; for(let i=0;i<N;i++) nodes.push(mkNode()); }

  function draw(t){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // move
    nodes.forEach(n=>{
      n.x+=n.vx; n.y+=n.vy;
      if(n.x<0||n.x>canvas.width) n.vx*=-1;
      if(n.y<0||n.y>canvas.height) n.vy*=-1;
    });
    // lines
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const dx=nodes[i].x-nodes[j].x, dy=nodes[i].y-nodes[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<DIST){
          const a=(1-d/DIST)*.45;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x,nodes[i].y);
          ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(${TEAL},${a})`;
          ctx.lineWidth=nodes[i].hub||nodes[j].hub?.9:.4;
          ctx.stroke();
        }
      }
    }
    // dots
    nodes.forEach(n=>{
      const pulse=1+.4*Math.sin(t*.0018+n.phase);
      const r=n.r*(n.hub?2.2:1)*pulse;
      // glow halo
      const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*5);
      g.addColorStop(0,`rgba(${n.col},.55)`);
      g.addColorStop(1,`rgba(${n.col},0)`);
      ctx.beginPath(); ctx.arc(n.x,n.y,r*5,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      // core
      ctx.beginPath(); ctx.arc(n.x,n.y,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${n.col},.9)`; ctx.fill();
    });
    raf=requestAnimationFrame(draw);
  }

  // pause when overlay hidden (perf)
  const obs=new MutationObserver(()=>{
    if(document.getElementById('loginOverlay')?.classList.contains('hidden')){
      cancelAnimationFrame(raf);
    } else {
      raf=requestAnimationFrame(draw);
    }
  });
  const overlay=document.getElementById('loginOverlay');
  if(overlay) obs.observe(overlay,{attributes:true,attributeFilter:['class']});
  window.addEventListener('resize',()=>{ resize(); init(); });
  resize(); init(); raf=requestAnimationFrame(draw);
})();
