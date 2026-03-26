// ═══════════════════════════════════════════════════════════════════════════
// FACHBEGRIFF-GLOSSAR | PROFESSIONAL GLOSSARY
// SecureStay: Analytics – Wortglossar-Datenbank
// Quellen: ISO 31000:2018, ISO/IEC 27001:2022, ISO 22301:2019,
//          BSI IT-Grundschutz, COBIT 2019, NIS2, DSGVO
// ═══════════════════════════════════════════════════════════════════════════

const GLOSSARY = [

  // ─── ISO 31000:2018 – Risikomanagement ──────────────────────────────────

  {
    id: 'G-001',
    term: 'Risiko',
    term_en: 'Risk',
    definition: 'Auswirkung von Ungewissheit auf Ziele. Eine Auswirkung ist eine positive oder negative Abweichung vom Erwarteten. Ungewissheit ist ein Zustand, in dem Informationen zu einem Ereignis, dessen Folgen oder dessen Wahrscheinlichkeit fehlen, unzureichend oder unzuverlässig sind.',
    definition_en: 'Effect of uncertainty on objectives. An effect is a deviation from the expected, positive or negative. Uncertainty is the state of deficiency of information related to understanding or knowledge of an event, its consequence, or likelihood.',
    source: 'ISO 31000:2018, Kl. 3.1',
    category: 'iso31000'
  },
  {
    id: 'G-002',
    term: 'Risikomanagement',
    term_en: 'Risk Management',
    definition: 'Koordinierte Aktivitäten zur Steuerung und Kontrolle einer Organisation im Hinblick auf Risiken. Risikomanagement umfasst alle Maßnahmen zur systematischen Erkennung, Analyse, Bewertung, Überwachung und Kommunikation von Risiken.',
    definition_en: 'Coordinated activities to direct and control an organization with regard to risk. Risk management encompasses all measures for the systematic identification, analysis, evaluation, monitoring and communication of risks.',
    source: 'ISO 31000:2018, Kl. 3.2',
    category: 'iso31000'
  },
  {
    id: 'G-003',
    term: 'Risikobeurteilung',
    term_en: 'Risk Assessment',
    definition: 'Gesamtprozess bestehend aus Risikoidentifikation, Risikoanalyse und Risikobewertung. Die Risikobeurteilung bildet die Grundlage für fundierte Entscheidungen über die Risikobehandlung und zur Priorisierung von Schutzmaßnahmen.',
    definition_en: 'Overall process comprising risk identification, risk analysis and risk evaluation. The risk assessment provides the basis for informed decisions about risk treatment and the prioritisation of protective measures.',
    source: 'ISO 31000:2018, Kl. 3.4',
    category: 'iso31000'
  },
  {
    id: 'G-004',
    term: 'Risikoidentifikation',
    term_en: 'Risk Identification',
    definition: 'Prozess der Suche, Erkennung und Beschreibung von Risiken. Die Risikoidentifikation umfasst die Identifikation von Risikoquellen, Ereignissen, deren Ursachen und möglichen Folgen. Ziel ist eine vollständige und strukturierte Erfassung aller relevanten Risiken.',
    definition_en: 'Process of finding, recognising and describing risks. Risk identification involves identifying risk sources, events, their causes and potential consequences. The aim is a complete and structured recording of all relevant risks.',
    source: 'ISO 31000:2018, Kl. 3.5',
    category: 'iso31000'
  },
  {
    id: 'G-005',
    term: 'Risikoanalyse',
    term_en: 'Risk Analysis',
    definition: 'Prozess zum Verständnis der Art des Risikos und zur Bestimmung der Risikostufe. Die Risikoanalyse bewertet Eintrittswahrscheinlichkeit und mögliche Auswirkungen eines Risikoszenarios unter Berücksichtigung bestehender Kontrollen und Schutzmaßnahmen.',
    definition_en: 'Process to comprehend the nature of risk and to determine the level of risk. Risk analysis assesses the likelihood and potential impact of a risk scenario, taking into account existing controls and protective measures.',
    source: 'ISO 31000:2018, Kl. 3.6',
    category: 'iso31000'
  },
  {
    id: 'G-006',
    term: 'Risikobewertung',
    term_en: 'Risk Evaluation',
    definition: 'Prozess zum Vergleich der Ergebnisse der Risikoanalyse mit Risikokriterien, um festzustellen, ob das Risiko und/oder seine Größenordnung akzeptabel oder tolerierbar ist. Die Risikobewertung unterstützt Entscheidungen über die Risikobehandlung.',
    definition_en: 'Process of comparing the results of risk analysis with risk criteria to determine whether the risk and/or its magnitude is acceptable or tolerable. Risk evaluation supports decisions about risk treatment.',
    source: 'ISO 31000:2018, Kl. 3.7',
    category: 'iso31000'
  },
  {
    id: 'G-007',
    term: 'Risikobehandlung',
    term_en: 'Risk Treatment',
    definition: 'Prozess zur Veränderung von Risiken. Optionen der Risikobehandlung umfassen: Risikovermeidung (Aktivität wird eingestellt), Risikoänderung (Verringerung der Wahrscheinlichkeit oder Auswirkung), Risikoteilung (z.B. Versicherung), Risikoakzeptanz (bewusste Hinnahme). Eine Risikobehandlung kann neue Risiken erzeugen.',
    definition_en: 'Process to modify risk. Risk treatment options include: risk avoidance (activity is discontinued), risk modification (reduction of likelihood or impact), risk sharing (e.g. insurance), risk acceptance (conscious acceptance). A risk treatment can generate new risks.',
    source: 'ISO 31000:2018, Kl. 3.8',
    category: 'iso31000'
  },
  {
    id: 'G-008',
    term: 'Restrisiko',
    term_en: 'Residual Risk',
    definition: 'Risiko, das nach der Risikobehandlung verbleibt. Das Restrisiko kann noch nicht identifizierte Risiken enthalten. Es muss dokumentiert, kommuniziert und von der zuständigen Führungsebene akzeptiert werden. Ein Restrisiko von null ist in der Praxis nicht erreichbar.',
    definition_en: 'Risk remaining after risk treatment. Residual risk can contain unidentified risks. It must be documented, communicated and accepted by the responsible management level. A residual risk of zero is not achievable in practice.',
    source: 'ISO 31000:2018, Kl. 3.9',
    category: 'iso31000'
  },
  {
    id: 'G-009',
    term: 'Risikoappetit',
    term_en: 'Risk Appetite',
    definition: 'Menge und Art des Risikos, das eine Organisation bereit ist, zu verfolgen oder einzugehen. Der Risikoappetit spiegelt die Risikokultur einer Organisation wider und wird durch die oberste Leitung festgelegt. Er definiert die Grenzen akzeptierbarer Risikoexposition.',
    definition_en: 'Amount and type of risk that an organisation is willing to pursue or take. Risk appetite reflects the risk culture of an organisation and is defined by top management. It defines the boundaries of acceptable risk exposure.',
    source: 'ISO 31000:2018',
    category: 'iso31000'
  },
  {
    id: 'G-010',
    term: 'Risikomatrix',
    term_en: 'Risk Matrix',
    definition: 'Werkzeug zur Visualisierung und Priorisierung von Risiken durch Gegenüberstellung von Eintrittswahrscheinlichkeit und Schadensauswirkung. Risiken werden in Felder (z.B. gering/mittel/hoch/kritisch) eingestuft. Die Risikomatrix erleichtert die Kommunikation von Risiken an Entscheidungsträger.',
    definition_en: 'Tool for visualising and prioritising risks by contrasting likelihood and impact. Risks are classified into cells (e.g. low/medium/high/critical). The risk matrix facilitates the communication of risks to decision-makers.',
    source: 'ISO 31000:2018 / IEC 31010',
    category: 'iso31000'
  },
  {
    id: 'G-011',
    term: 'Risikoregister',
    term_en: 'Risk Register',
    definition: 'Strukturiertes Dokument oder Datenbank, das alle identifizierten Risiken einer Organisation mit ihren Eigenschaften (Ursache, Auswirkung, Wahrscheinlichkeit, Behandlungsmaßnahmen, Verantwortliche) erfasst. Das Risikoregister ist zentrales Instrument des Risikomanagements.',
    definition_en: 'Structured document or database recording all identified risks of an organisation with their characteristics (cause, impact, likelihood, treatment measures, responsible parties). The risk register is a central instrument of risk management.',
    source: 'ISO 31000:2018',
    category: 'iso31000'
  },
  {
    id: 'G-012',
    term: 'Eintrittswahrscheinlichkeit',
    term_en: 'Likelihood / Probability',
    definition: 'Maß für die Möglichkeit, dass ein Ereignis eintritt. Kann qualitativ (selten/möglich/wahrscheinlich/fast sicher) oder quantitativ (Prozentsatz oder Häufigkeit) ausgedrückt werden. Die Eintrittswahrscheinlichkeit ist ein Kernparameter der Risikoanalyse.',
    definition_en: 'Measure of the possibility that an event will occur. Can be expressed qualitatively (rare/possible/likely/almost certain) or quantitatively (percentage or frequency). Likelihood is a core parameter of risk analysis.',
    source: 'ISO 31000:2018, Kl. 3.1 Anm.',
    category: 'iso31000'
  },
  {
    id: 'G-013',
    term: 'Schadensauswirkung',
    term_en: 'Consequence / Impact',
    definition: 'Ergebnis eines Ereignisses, das einen oder mehrere Aspekte eines Ziels beeinflusst. Auswirkungen können sicher oder unsicher sein und positive oder negative, direkte oder indirekte Effekte auf Ziele haben. Die Schadensauswirkung ist neben der Eintrittswahrscheinlichkeit der zweite Kernparameter der Risikoanalyse.',
    definition_en: 'Outcome of an event affecting objectives. Consequences can be certain or uncertain and can have positive or negative, direct or indirect effects on objectives. Impact is the second core parameter of risk analysis alongside likelihood.',
    source: 'ISO 31000:2018, Kl. 3.1 Anm.',
    category: 'iso31000'
  },
  {
    id: 'G-014',
    term: 'Risikokommunikation',
    term_en: 'Risk Communication',
    definition: 'Kontinuierlicher und iterativer Prozess des Informationsaustauschs über das Risiko zwischen der Organisation und den Stakeholdern. Ziel ist es, das Risikobewusstsein zu schärfen, Vertrauen zu schaffen und fundierte Entscheidungen zu ermöglichen. Risikokommunikation ist integraler Bestandteil des Risikomanagementprozesses.',
    definition_en: 'Continuous and iterative process of exchanging information about risk between the organisation and its stakeholders. The aim is to sharpen risk awareness, build trust and enable informed decisions. Risk communication is an integral part of the risk management process.',
    source: 'ISO 31000:2018, Kl. 6.2',
    category: 'iso31000'
  },
  {
    id: 'G-015',
    term: 'Schutzmaßnahme / Kontrolle',
    term_en: 'Control / Safeguard',
    definition: 'Maßnahme, die ein Risiko verändert. Schutzmaßnahmen umfassen Prozesse, Richtlinien, Vorrichtungen, Praktiken oder andere Handlungen, die die Wahrscheinlichkeit oder die Auswirkung eines Risikos verändern. Eine Kontrolle kann auch eine bestehende Maßnahme aufrechterhalten.',
    definition_en: 'Measure that modifies risk. Controls include processes, policies, devices, practices or other actions that modify the likelihood or impact of a risk. A control can also maintain an existing measure.',
    source: 'ISO 31000:2018 / ISO/IEC 27001',
    category: 'iso31000'
  },

  // ─── Physische Sicherheit ────────────────────────────────────────────────

  {
    id: 'G-016',
    term: 'Perimeter',
    term_en: 'Perimeter',
    definition: 'Äußere Begrenzung eines Sicherheitsbereichs, die durch physische Barrieren (Zäune, Mauern, Schranken) definiert wird. Der Perimeter bildet die erste Verteidigungslinie gegen unbefugten Zutritt und schützt das innere Sicherheitskonzept nach dem Prinzip der gestaffelten Sicherheitszonen.',
    definition_en: 'Outer boundary of a security area defined by physical barriers (fences, walls, barriers). The perimeter forms the first line of defence against unauthorised access and protects the inner security concept according to the principle of layered security zones.',
    source: 'DIN EN 1627 / VdS 2311',
    category: 'physical'
  },
  {
    id: 'G-017',
    term: 'Zutrittskontrolle',
    term_en: 'Access Control',
    definition: 'Technische und organisatorische Maßnahmen zur Steuerung und Überwachung des physischen Zugangs zu Gebäuden, Bereichen oder Ressourcen. Systeme umfassen mechanische Schließanlagen, elektronische Zutrittssysteme (RFID, Biometrie), Schleusen und Besuchermanagement. Zutrittskontrolle schützt vor unbefugtem Zutritt gemäß ISO/IEC 27001 Anhang A.11.',
    definition_en: 'Technical and organisational measures for controlling and monitoring physical access to buildings, areas or resources. Systems include mechanical locking systems, electronic access control (RFID, biometrics), airlocks and visitor management. Access control protects against unauthorised access in accordance with ISO/IEC 27001 Annex A.11.',
    source: 'ISO/IEC 27001:2022, A.7.2',
    category: 'physical'
  },
  {
    id: 'G-018',
    term: 'Einbruchhemmung',
    term_en: 'Burglar Resistance',
    definition: 'Eigenschaft von Bauteilen (Türen, Fenster, Fassaden), einem gewaltsamen Eindringen für eine definierte Zeitspanne zu widerstehen. Klassifiziert nach Widerstandsklassen (RC 1–RC 6 gemäß DIN EN 1627). Die Widerstandsklasse wird auf Basis des Schutzbedarfs und der Risikoanalyse ausgewählt.',
    definition_en: 'Property of building components (doors, windows, façades) to resist forced entry for a defined period of time. Classified according to resistance classes (RC 1–RC 6 in accordance with DIN EN 1627). The resistance class is selected based on the protection requirement and risk analysis.',
    source: 'DIN EN 1627',
    category: 'physical'
  },
  {
    id: 'G-019',
    term: 'Sicherheitszone',
    term_en: 'Security Zone',
    definition: 'Definierter Bereich mit einheitlichem Schutzniveau und kontrollierten Übergängen. Sicherheitszonen werden nach dem Prinzip der gestaffelten Verteidigung (Defence in Depth) konzipiert: von öffentlichen Außenbereichen über kontrollierte Innenbereiche bis hin zu gesicherten Hochsicherheitsbereichen.',
    definition_en: 'Defined area with a uniform level of protection and controlled transitions. Security zones are designed according to the defence-in-depth principle: from public outer areas through controlled inner areas to secured high-security areas.',
    source: 'ISO/IEC 27001:2022, A.7.1',
    category: 'physical'
  },

  // ─── Audit & Compliance ──────────────────────────────────────────────────

  {
    id: 'G-020',
    term: 'Audit',
    term_en: 'Audit',
    definition: 'Systematischer, unabhängiger und dokumentierter Prozess zur Erlangung von Nachweisen und zu deren objektiver Auswertung, um festzustellen, inwieweit Auditkriterien erfüllt sind. Audits können intern (First Party), durch Vertragspartner (Second Party) oder durch unabhängige Dritte (Third Party, z.B. Zertifizierungsstellen) durchgeführt werden.',
    definition_en: 'Systematic, independent and documented process for obtaining evidence and evaluating it objectively to determine the extent to which audit criteria are fulfilled. Audits can be conducted internally (first party), by contractual partners (second party) or by independent third parties (third party, e.g. certification bodies).',
    source: 'ISO 19011:2018 / ISO/IEC 27001',
    category: 'compliance'
  },
  {
    id: 'G-021',
    term: 'Befund',
    term_en: 'Finding',
    definition: 'Ergebnis der Bewertung gesammelter Auditnachweise im Vergleich zu den Auditkriterien. Befunde zeigen Konformität oder Nichtkonformität an. Kritische Befunde weisen auf unmittelbare Risiken hin und erfordern sofortige Maßnahmen. Befunde sind die Grundlage für Verbesserungsmaßnahmen.',
    definition_en: 'Results of the evaluation of collected audit evidence against audit criteria. Findings indicate conformity or non-conformity. Critical findings indicate immediate risks and require immediate action. Findings are the basis for improvement measures.',
    source: 'ISO 19011:2018',
    category: 'compliance'
  },
  {
    id: 'G-022',
    term: 'Kritischer Mangel',
    term_en: 'Critical Deficiency',
    definition: 'Nichtkonformität, die ein unmittelbares oder hohes Risiko für Personen, Sachwerte oder den Betrieb darstellt. Kritische Mängel erfordern sofortige Korrekturmaßnahmen (Frist: ≤ 4 Wochen) und können bei Nichtbehebung zu eingeschränktem Versicherungsschutz, Betriebsunterbrechungen oder regulatorischen Konsequenzen führen.',
    definition_en: 'Non-conformity that represents an immediate or high risk to persons, assets or operations. Critical deficiencies require immediate corrective action (deadline: ≤ 4 weeks) and, if unaddressed, can lead to restricted insurance coverage, business interruptions or regulatory consequences.',
    source: 'ISO 31000:2018 / NIS2 §38',
    category: 'compliance'
  },
  {
    id: 'G-023',
    term: 'Compliance',
    term_en: 'Compliance',
    definition: 'Einhaltung von gesetzlichen, regulatorischen, normativen und internen Anforderungen durch eine Organisation. Compliance umfasst die Erfüllung von Vorgaben aus Gesetzen (z.B. DSGVO, KRITIS-DachG), Normen (z.B. ISO/IEC 27001, ISO 9001) und vertraglichen Vereinbarungen. Compliance-Management identifiziert, überwacht und berichtet über die Einhaltung dieser Anforderungen.',
    definition_en: 'Adherence by an organisation to legal, regulatory, normative and internal requirements. Compliance includes meeting requirements from laws (e.g. GDPR, KRITIS-DachG), standards (e.g. ISO/IEC 27001, ISO 9001) and contractual agreements. Compliance management identifies, monitors and reports on adherence to these requirements.',
    source: 'ISO/IEC 27001:2022, A.5.31',
    category: 'compliance'
  },
  {
    id: 'G-024',
    term: 'Reifegradmodell',
    term_en: 'Maturity Model',
    definition: 'Strukturierter Ansatz zur Bewertung und Entwicklung organisatorischer Fähigkeiten. Reifegrade beschreiben typische Entwicklungsstufen von Initial (ad-hoc, unstrukturiert) über Wiederholbar, Definiert, Gesteuert bis Optimierend (kontinuierliche Verbesserung). Das Modell ermöglicht die Identifikation von Verbesserungspotenzialen und die Planung gezielter Maßnahmen.',
    definition_en: 'Structured approach for assessing and developing organisational capabilities. Maturity levels describe typical development stages from Initial (ad hoc, unstructured) through Repeatable, Defined, Managed to Optimising (continuous improvement). The model enables the identification of improvement potential and the planning of targeted measures.',
    source: 'CMMI / COBIT 2019',
    category: 'compliance'
  },
  {
    id: 'G-025',
    term: 'Korrekturmaßnahme',
    term_en: 'Corrective Action',
    definition: 'Maßnahme zur Beseitigung der Ursache einer Nichtkonformität oder eines unerwünschten Ereignisses, um ein erneutes Auftreten zu verhindern. Korrekturmaßnahmen adressieren die Grundursache (Root Cause), nicht nur das Symptom. Sie sind von Sofortmaßnahmen (Eindämmung) zu unterscheiden und müssen dokumentiert und auf Wirksamkeit überprüft werden.',
    definition_en: 'Action to eliminate the cause of a nonconformity or undesired event to prevent recurrence. Corrective actions address the root cause, not just the symptom. They are to be distinguished from immediate actions (containment) and must be documented and verified for effectiveness.',
    source: 'ISO 9001:2015, Kl. 10.2 / ISO/IEC 27001',
    category: 'compliance'
  },

  // ─── Informationssicherheit ──────────────────────────────────────────────

  {
    id: 'G-026',
    term: 'ISMS – Informationssicherheits-Managementsystem',
    term_en: 'ISMS – Information Security Management System',
    definition: 'Systematischer Ansatz zur Verwaltung von Unternehmensinformationen und zum Schutz vertraulicher Daten. Ein ISMS umfasst Richtlinien, Prozesse, Verfahren und Kontrollen, die auf die Risiken eines Unternehmens zugeschnitten sind. Die internationale Norm ISO/IEC 27001 beschreibt die Anforderungen an ein zertifizierbares ISMS.',
    definition_en: 'Systematic approach for managing company information and protecting confidential data. An ISMS encompasses policies, processes, procedures and controls tailored to the risks of a company. The international standard ISO/IEC 27001 describes the requirements for a certifiable ISMS.',
    source: 'ISO/IEC 27001:2022',
    category: 'itsec'
  },
  {
    id: 'G-027',
    term: 'CIA-Triade',
    term_en: 'CIA Triad',
    definition: 'Die drei grundlegenden Schutzziele der Informationssicherheit: Vertraulichkeit (Confidentiality – nur autorisierte Personen haben Zugriff), Integrität (Integrity – Daten sind vollständig und unverändert) und Verfügbarkeit (Availability – Daten und Systeme sind bei Bedarf zugänglich). Die CIA-Triade bildet das Fundament von ISO/IEC 27001.',
    definition_en: 'The three fundamental protection objectives of information security: Confidentiality (only authorised persons have access), Integrity (data is complete and unchanged) and Availability (data and systems are accessible when needed). The CIA triad forms the foundation of ISO/IEC 27001.',
    source: 'ISO/IEC 27001:2022 / BSI IT-Grundschutz',
    category: 'itsec'
  },
  {
    id: 'G-028',
    term: 'Schutzbedarfsfeststellung',
    term_en: 'Protection Needs Assessment',
    definition: 'Prozess zur Bestimmung des Schutzbedarfs von Informationen, IT-Systemen und Geschäftsprozessen. Der Schutzbedarf wird für die drei Grundwerte Vertraulichkeit, Integrität und Verfügbarkeit auf einer Skala (normal/hoch/sehr hoch) bewertet. Ergebnis ist die Grundlage für die Auswahl angemessener Sicherheitsmaßnahmen.',
    definition_en: 'Process for determining the protection needs of information, IT systems and business processes. The protection need is assessed for the three basic values of confidentiality, integrity and availability on a scale (normal/high/very high). The result is the basis for selecting appropriate security measures.',
    source: 'BSI IT-Grundschutz-Kompendium',
    category: 'itsec'
  },

  // ─── Business Continuity ────────────────────────────────────────────────

  {
    id: 'G-029',
    term: 'Business Continuity Management (BCM)',
    term_en: 'Business Continuity Management',
    definition: 'Managementprozess zur Identifikation potenzieller Bedrohungen für eine Organisation und deren Auswirkungen auf den Geschäftsbetrieb. BCM schafft Widerstandsfähigkeit (Resilienz) und stellt die Reaktions- und Wiederherstellungsfähigkeit sicher. ISO 22301 definiert die international anerkannten Anforderungen an ein BCMS.',
    definition_en: 'Management process for identifying potential threats to an organisation and their impacts on business operations. BCM creates resilience and ensures response and recovery capability. ISO 22301 defines the internationally recognised requirements for a BCMS.',
    source: 'ISO 22301:2019',
    category: 'bcm'
  },
  {
    id: 'G-030',
    term: 'Business Impact Analyse (BIA)',
    term_en: 'Business Impact Analysis',
    definition: 'Analyse der Auswirkungen einer Unterbrechung kritischer Geschäftsprozesse auf die Organisation. Die BIA identifiziert und priorisiert Geschäftsprozesse, bestimmt maximal tolerierbare Ausfallzeiten (MTPD) und Recovery Time Objectives (RTO). Sie ist die Grundlage für die Entwicklung von Business-Continuity-Strategien.',
    definition_en: 'Analysis of the impacts of disruption to critical business processes on the organisation. The BIA identifies and prioritises business processes, determines maximum tolerable period of disruption (MTPD) and recovery time objectives (RTO). It is the basis for developing business continuity strategies.',
    source: 'ISO 22301:2019, Kl. 8.2',
    category: 'bcm'
  },
  {
    id: 'G-031',
    term: 'Recovery Time Objective (RTO)',
    term_en: 'Recovery Time Objective',
    definition: 'Maximal tolerierbare Zeitspanne, innerhalb derer ein Prozess oder System nach einem Ausfall wiederhergestellt sein muss, um inakzeptable Konsequenzen zu vermeiden. Der RTO ist ein Kernergebnis der Business Impact Analyse und bestimmt die Anforderungen an Notfallpläne und Wiederherstellungslösungen.',
    definition_en: 'Maximum tolerable time period within which a process or system must be restored after a failure to avoid unacceptable consequences. The RTO is a core output of the Business Impact Analysis and determines requirements for contingency plans and recovery solutions.',
    source: 'ISO 22301:2019',
    category: 'bcm'
  },
  {
    id: 'G-032',
    term: 'Notfallplan',
    term_en: 'Emergency / Contingency Plan',
    definition: 'Dokumentierter Plan mit definierten Maßnahmen, Verantwortlichkeiten und Ressourcen zur Reaktion auf ein spezifisches Notfallereignis. Notfallpläne sind Teil des Business-Continuity-Managements und müssen regelmäßig getestet, überprüft und aktualisiert werden. Sie umfassen Alarmierungs-, Evakuierungs- und Wiederherstellungsprozeduren.',
    definition_en: 'Documented plan with defined measures, responsibilities and resources for responding to a specific emergency event. Contingency plans are part of business continuity management and must be regularly tested, reviewed and updated. They include alert, evacuation and recovery procedures.',
    source: 'ISO 22301:2019, Kl. 8.4',
    category: 'bcm'
  },

  // ─── Regulatorik & Recht ─────────────────────────────────────────────────

  {
    id: 'G-033',
    term: 'KRITIS – Kritische Infrastruktur',
    term_en: 'KRITIS – Critical Infrastructure',
    definition: 'Organisationen und Einrichtungen, deren Ausfall oder Beeinträchtigung zu erheblichen Versorgungsengpässen oder Sicherheitsgefährdungen für die Bevölkerung führen würde. Das KRITIS-DachG (2024) regelt in Deutschland sektorenübergreifend Mindestanforderungen für physische und digitale Sicherheit kritischer Infrastrukturbetreiber.',
    definition_en: 'Organisations and facilities whose failure or impairment would lead to significant supply bottlenecks or security threats to the population. The KRITIS-DachG (2024) regulates minimum requirements for physical and digital security of critical infrastructure operators across sectors in Germany.',
    source: 'KRITIS-DachG 2024 / BSI-KritisV',
    category: 'regulatory'
  },
  {
    id: 'G-034',
    term: 'NIS2-Richtlinie',
    term_en: 'NIS2 Directive',
    definition: 'EU-Richtlinie (2022/2555) zur Netz- und Informationssicherheit, die Mindestanforderungen für Cybersicherheitsmaßnahmen in wesentlichen und wichtigen Einrichtungen definiert. NIS2 erweitert den Anwendungsbereich erheblich und schreibt u.a. Risikomanagement, Vorfallmeldepflichten und Sicherheit der Lieferkette vor.',
    definition_en: 'EU Directive (2022/2555) on network and information security, defining minimum requirements for cybersecurity measures in essential and important entities. NIS2 significantly expands the scope and mandates risk management, incident reporting obligations and supply chain security.',
    source: 'EU-Richtlinie 2022/2555 / NIS2UmsuCG',
    category: 'regulatory'
  },
  {
    id: 'G-035',
    term: 'Sicherheitskonzept',
    term_en: 'Security Concept',
    definition: 'Strukturiertes Dokument, das die Sicherheitsstrategie, Schutzziele, Risikobewertung, Schutzmaßnahmen und deren Umsetzungsplanung für ein Objekt oder eine Organisation beschreibt. Ein Sicherheitskonzept ist Grundlage für ganzheitliche Sicherheitsmaßnahmen, Versicherungsverträge und die Erfüllung regulatorischer Anforderungen.',
    definition_en: 'Structured document describing the security strategy, protection objectives, risk assessment, protective measures and their implementation planning for an object or organisation. A security concept is the basis for holistic security measures, insurance contracts and fulfilment of regulatory requirements.',
    source: 'VdS 3473 / ISO 31000 / BSI IT-Grundschutz',
    category: 'regulatory'
  }

];
