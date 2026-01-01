// Ultra terim üretme scripti - 10,000 terime ulaşmak için
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  doc,
} = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCETgJvY3XPdHF0gVQhdsEVd9UIEwYyWbw",
  authDomain: "pharmadict-66629.firebaseapp.com",
  projectId: "pharmadict-66629",
  storageBucket: "pharmadict-66629.firebasestorage.app",
  messagingSenderId: "55210435202",
  appId: "1:55210435202:web:cffc317dfdd7dbbcac8a9b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TermCategory = {
  DRUG: "İlaçlar",
  PLANT: "Bitkiler",
  VITAMIN: "Vitaminler",
  MINERAL: "Mineraller",
  DISEASE: "Hastalıklar",
  INSECT: "Böcekler",
  COMPONENT: "Bileşenler",
  ANATOMY: "Anatomi",
};

const createTerm = (latin, turkish, category, def) => ({
  latinName: latin,
  turkishName: turkish,
  category,
  definition: def,
  components: [],
  relatedTerms: [],
  etymology: "",
  usage: "",
  sideEffects: [],
  dosage: "",
  contraindications: [],
  interactions: [],
  synonyms: [],
});
// Kapsamlı ilaç listesi - Bölüm 1
const generateDrugs1 = () => {
  const drugs = [];
  const drugList = [
    // Antiaritmikler
    ["Amiodarone", "Amiodaron", "Sınıf III antiaritmik"],
    ["Dronedarone", "Dronedaron", "Sınıf III antiaritmik"],
    ["Sotalol", "Sotalol", "Sınıf III antiaritmik"],
    ["Dofetilide", "Dofetilid", "Sınıf III antiaritmik"],
    ["Ibutilide", "İbutilid", "Sınıf III antiaritmik"],
    ["Flecainide", "Flekainid", "Sınıf IC antiaritmik"],
    ["Propafenone", "Propafenon", "Sınıf IC antiaritmik"],
    ["Quinidine", "Kinidin", "Sınıf IA antiaritmik"],
    ["Procainamide", "Prokainamid", "Sınıf IA antiaritmik"],
    ["Disopyramide", "Dizopiramid", "Sınıf IA antiaritmik"],
    ["Lidocaine IV", "IV Lidokain", "Sınıf IB antiaritmik"],
    ["Mexiletine", "Meksiletine", "Sınıf IB antiaritmik"],
    ["Adenosine", "Adenozin", "SVT tedavisi"],
    ["Digoxin", "Digoksin", "Kardiyak glikozid"],
    ["Ivabradine", "İvabradin", "If kanal inhibitörü"],
    // Vazodilatörler
    ["Nitroglycerin", "Nitrogliserin", "Nitrat, anjina"],
    ["Isosorbide dinitrate", "İzosorbid Dinitrat", "Nitrat, anjina"],
    ["Isosorbide mononitrate", "İzosorbid Mononitrat", "Nitrat, anjina"],
    ["Hydralazine", "Hidralazin", "Direkt vazodilatör"],
    ["Minoxidil", "Minoksidil", "Direkt vazodilatör, saç"],
    ["Sodium nitroprusside", "Sodyum Nitroprusid", "IV vazodilatör"],
    ["Nesiritide", "Nesiritid", "BNP, kalp yetmezliği"],
    ["Alprostadil", "Alprostadil", "PGE1, ED, PDA"],
    ["Epoprostenol", "Epoprostenol", "Prostasiklin, PAH"],
    ["Iloprost", "İloprost", "Prostasiklin analoğu"],
    ["Treprostinil", "Treprostinil", "Prostasiklin analoğu"],
    ["Selexipag", "Seleksipag", "Prostasiklin reseptör agonisti"],
    // İnotroplar
    ["Dobutamine", "Dobutamin", "Beta-1 agonist, inotrop"],
    ["Dopamine", "Dopamin", "Katekolamin, inotrop"],
    ["Milrinone", "Milrinon", "PDE3 inhibitörü, inotrop"],
    ["Levosimendan", "Levosimendan", "Kalsiyum duyarlaştırıcı"],
    // Vazopresörler
    ["Norepinephrine", "Norepinefrin", "Alfa agonist, vazopresör"],
    ["Epinephrine", "Epinefrin", "Katekolamin, anafilaksi"],
    ["Phenylephrine", "Fenilefrin", "Alfa-1 agonist"],
    ["Vasopressin", "Vazopressin", "ADH, vazopresör"],
    ["Angiotensin II", "Anjiyotensin II", "Vazopresör"],
    ["Midodrine", "Midodrin", "Oral alfa agonist"],
    ["Droxidopa", "Droksidopa", "Nörojenik hipotansiyon"],
    // Antianjinal
    ["Ranolazine", "Ranolazin", "Geç sodyum akımı inhibitörü"],
    ["Trimetazidine", "Trimetazidin", "Metabolik modülatör"],
    ["Nicorandil", "Nikorandil", "Potasyum kanal açıcı"],
    // Kalp yetmezliği
    ["Sacubitril-valsartan", "Sakubitril-Valsartan", "ARNI"],
    ["Vericiguat", "Verisiguat", "sGC stimülatörü"],
    ["Omecamtiv mecarbil", "Omekamtiv Mekarbil", "Miyozin aktivatörü"],
    // Pulmoner hipertansiyon
    ["Bosentan", "Bosentan", "Endotelin antagonisti"],
    ["Ambrisentan", "Ambrisentan", "Endotelin antagonisti"],
    ["Macitentan", "Masitentan", "Endotelin antagonisti"],
    ["Riociguat", "Riosiguat", "sGC stimülatörü"],
    // Dermatolojik ilaçlar
    ["Tretinoin", "Tretinoin", "Retinoid, akne, yaşlanma"],
    ["Adapalene", "Adapalen", "Retinoid, akne"],
    ["Tazarotene", "Tazaroten", "Retinoid, psoriazis, akne"],
    ["Isotretinoin", "İzotretinoin", "Oral retinoid, şiddetli akne"],
    ["Acitretin", "Asitretin", "Oral retinoid, psoriazis"],
    ["Alitretinoin", "Alitretinoin", "Retinoid, el egzaması"],
    ["Benzoyl peroxide", "Benzoil Peroksit", "Akne, antibakteriyel"],
    ["Salicylic acid", "Salisilik Asit", "Keratolitik, akne"],
    ["Azelaic acid", "Azelaik Asit", "Akne, rozasea"],
    ["Clindamycin topical", "Topikal Klindamisin", "Topikal antibiyotik, akne"],
    [
      "Erythromycin topical",
      "Topikal Eritromisin",
      "Topikal antibiyotik, akne",
    ],
    ["Dapsone topical", "Topikal Dapson", "Akne"],
    ["Metronidazole topical", "Topikal Metronidazol", "Rozasea"],
    ["Ivermectin topical", "Topikal İvermektin", "Rozasea"],
    ["Brimonidine topical", "Topikal Brimonidin", "Rozasea eritem"],
    ["Oxymetazoline topical", "Topikal Oksimetazolin", "Rozasea eritem"],
    ["Calcipotriene", "Kalsipotriol", "D vitamini analoğu, psoriazis"],
    ["Calcitriol topical", "Topikal Kalsitriol", "D vitamini, psoriazis"],
    [
      "Tacrolimus topical",
      "Topikal Takrolimus",
      "Kalsinörin inhibitörü, egzama",
    ],
    ["Pimecrolimus", "Pimekrolimus", "Kalsinörin inhibitörü, egzama"],
    ["Crisaborole", "Krisaborol", "PDE4 inhibitörü, egzama"],
    ["Ruxolitinib topical", "Topikal Ruksolitinib", "JAK inhibitörü, egzama"],
    [
      "Hydrocortisone topical",
      "Topikal Hidrokortizon",
      "Düşük potens kortikosteroid",
    ],
    [
      "Triamcinolone topical",
      "Topikal Triamsinolon",
      "Orta potens kortikosteroid",
    ],
    [
      "Betamethasone topical",
      "Topikal Betametazon",
      "Yüksek potens kortikosteroid",
    ],
    ["Clobetasol", "Klobetazol", "Süper potens kortikosteroid"],
    ["Halobetasol", "Halobetazol", "Süper potens kortikosteroid"],
    ["Fluocinonide", "Fluosinonid", "Yüksek potens kortikosteroid"],
    ["Desoximetasone", "Dezoksimetazon", "Yüksek potens kortikosteroid"],
    ["Fluticasone topical", "Topikal Flutikason", "Orta potens kortikosteroid"],
    ["Mometasone topical", "Topikal Mometazon", "Orta potens kortikosteroid"],
    ["Desonide", "Dezonid", "Düşük potens kortikosteroid"],
    ["Alclometasone", "Alklometazon", "Düşük potens kortikosteroid"],
    ["Coal tar", "Kömür Katranı", "Psoriazis, seboreik dermatit"],
    ["Anthralin", "Antralin", "Psoriazis"],
    ["Psoralen", "Psoralen", "PUVA tedavisi"],
    ["Imiquimod", "İmikimod", "İmmün modülatör, siğil, AK"],
    ["Fluorouracil topical", "Topikal Fluorourasil", "AK, BCC"],
    ["Ingenol mebutate", "İngenol Mebutat", "Aktinik keratoz"],
    ["Diclofenac topical", "Topikal Diklofenak", "Aktinik keratoz"],
    ["Tirbanibulin", "Tirbanibulin", "Aktinik keratoz"],
    ["Minoxidil topical", "Topikal Minoksidil", "Alopesi"],
    ["Finasteride topical", "Topikal Finasterid", "Alopesi"],
    ["Bimatoprost eyelash", "Kirpik Bimatoprost", "Kirpik büyütücü"],
    ["Eflornithine", "Eflornithin", "Hirsutizm"],
    ["Permethrin", "Permetrin", "Uyuz, bit"],
    ["Lindane", "Lindan", "Uyuz, bit"],
    ["Malathion", "Malatyon", "Bit"],
    ["Spinosad", "Spinosad", "Bit"],
    ["Ivermectin oral", "Oral İvermektin", "Uyuz, bit"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Kapsamlı ilaç listesi - Bölüm 2
const generateDrugs2 = () => {
  const drugs = [];
  const drugList = [
    // İmmünosupresanlar
    ["Cyclosporine", "Siklosporin", "Kalsinörin inhibitörü"],
    ["Tacrolimus", "Takrolimus", "Kalsinörin inhibitörü"],
    ["Sirolimus", "Sirolimus", "mTOR inhibitörü"],
    ["Everolimus", "Everolimus", "mTOR inhibitörü"],
    ["Mycophenolate mofetil", "Mikofenolat Mofetil", "IMPDH inhibitörü"],
    ["Mycophenolic acid", "Mikofenolik Asit", "IMPDH inhibitörü"],
    ["Azathioprine", "Azatioprin", "Pürin analoğu"],
    ["Methotrexate", "Metotreksat", "Antifolat, RA, psoriazis"],
    ["Leflunomide", "Leflunomid", "Pirimidin sentez inhibitörü"],
    ["Teriflunomide", "Teriflunomid", "MS tedavisi"],
    ["Hydroxychloroquine", "Hidroksiklorokin", "DMARD, SLE, RA"],
    ["Sulfasalazine", "Sülfasalazin", "DMARD, RA, IBD"],
    ["Penicillamine", "Penisillamin", "DMARD, Wilson"],
    ["Gold sodium thiomalate", "Altın Sodyum Tiyomalat", "DMARD"],
    ["Auranofin", "Auranofin", "Oral altın, RA"],
    // Biyolojik ajanlar - TNF inhibitörleri
    ["Infliximab", "İnfliksimab", "Anti-TNF, RA, IBD, psoriazis"],
    ["Adalimumab", "Adalimumab", "Anti-TNF, RA, IBD, psoriazis"],
    ["Etanercept", "Etanersept", "TNF reseptör füzyon proteini"],
    ["Golimumab", "Golimumab", "Anti-TNF"],
    ["Certolizumab pegol", "Sertolizumab Pegol", "Pegillenmiş anti-TNF"],
    // IL inhibitörleri
    ["Anakinra", "Anakinra", "IL-1 reseptör antagonisti"],
    ["Canakinumab", "Kanakinumab", "Anti-IL-1β"],
    ["Rilonacept", "Rilonasept", "IL-1 tuzağı"],
    ["Tocilizumab", "Tosilizumab", "Anti-IL-6R"],
    ["Sarilumab", "Sarilumab", "Anti-IL-6R"],
    ["Siltuximab", "Siltuksimab", "Anti-IL-6"],
    ["Secukinumab", "Sekukinumab", "Anti-IL-17A"],
    ["Ixekizumab", "İksekizumab", "Anti-IL-17A"],
    ["Brodalumab", "Brodalumab", "Anti-IL-17R"],
    ["Ustekinumab", "Ustekinumab", "Anti-IL-12/23"],
    ["Guselkumab", "Guselkumab", "Anti-IL-23"],
    ["Tildrakizumab", "Tildrakizumab", "Anti-IL-23"],
    ["Risankizumab", "Risankizumab", "Anti-IL-23"],
    ["Dupilumab", "Dupilumab", "Anti-IL-4/IL-13"],
    ["Tralokinumab", "Tralokinumab", "Anti-IL-13"],
    ["Lebrikizumab", "Lebrikizumab", "Anti-IL-13"],
    // JAK inhibitörleri
    ["Tofacitinib", "Tofasitinib", "JAK inhibitörü"],
    ["Baricitinib", "Barisitinib", "JAK inhibitörü"],
    ["Upadacitinib", "Upadacitinib", "JAK inhibitörü"],
    ["Filgotinib", "Filgotinib", "JAK inhibitörü"],
    ["Ruxolitinib", "Ruksolitinib", "JAK inhibitörü"],
    ["Fedratinib", "Fedratinib", "JAK2 inhibitörü"],
    ["Pacritinib", "Pakritinib", "JAK2 inhibitörü"],
    ["Abrocitinib", "Abrocitinib", "JAK1 inhibitörü"],
    // Diğer biyolojikler
    ["Abatacept", "Abatasept", "CTLA-4 Ig, T hücre kostimülasyon blokajı"],
    ["Belimumab", "Belimumab", "Anti-BLyS, SLE"],
    ["Anifrolumab", "Anifrolumab", "Anti-IFNAR1, SLE"],
    ["Rituximab", "Rituksimab", "Anti-CD20, RA, lenfoma"],
    ["Ocrelizumab", "Okrelizumab", "Anti-CD20, MS"],
    ["Ofatumumab", "Ofatumumab", "Anti-CD20, MS, CLL"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Kapsamlı hastalık listesi - Bölüm 1
const generateDiseases1 = () => {
  const diseases = [];
  const diseaseList = [
    // Otoimmün hastalıklar
    ["Autoimmune hepatitis", "Otoimmün Hepatit", "AIH"],
    ["Primary biliary cholangitis", "Primer Biliyer Kolanjit", "PBC"],
    ["Primary sclerosing cholangitis", "Primer Sklerozan Kolanjit", "PSC"],
    ["Autoimmune pancreatitis", "Otoimmün Pankreatit", "AIP"],
    ["Autoimmune gastritis", "Otoimmün Gastrit", "Pernisiyöz anemi"],
    ["Celiac disease", "Çölyak Hastalığı", "Gluten enteropatisi"],
    ["Autoimmune enteropathy", "Otoimmün Enteropati", "Bağırsak otoimmünitesi"],
    ["Autoimmune thyroiditis", "Otoimmün Tiroidit", "Hashimoto"],
    ["Graves disease", "Graves Hastalığı", "Otoimmün hipertiroidizm"],
    ["Type 1 diabetes", "Tip 1 Diyabet", "Otoimmün diyabet"],
    ["Addison disease", "Addison Hastalığı", "Otoimmün adrenal yetmezlik"],
    ["Autoimmune hypophysitis", "Otoimmün Hipofizit", "Hipofiz iltihabı"],
    ["Autoimmune orchitis", "Otoimmün Orşit", "Testis iltihabı"],
    ["Autoimmune oophoritis", "Otoimmün Ooforit", "Over iltihabı"],
    ["Pemphigus vulgaris", "Pemfigus Vulgaris", "Deri otoimmün hastalığı"],
    ["Pemphigus foliaceus", "Pemfigus Foliaseus", "Deri otoimmün hastalığı"],
    ["Bullous pemphigoid", "Büllöz Pemfigoid", "Deri otoimmün hastalığı"],
    ["Cicatricial pemphigoid", "Sikatrisyel Pemfigoid", "Mukozal pemfigoid"],
    [
      "Dermatitis herpetiformis",
      "Dermatitis Herpetiformis",
      "Çölyak deri belirtisi",
    ],
    ["Linear IgA disease", "Lineer IgA Hastalığı", "Deri otoimmün hastalığı"],
    ["Epidermolysis bullosa acquisita", "Edinsel Epidermolizis Bülloza", "EBA"],
    ["Vitiligo", "Vitiligo", "Pigment kaybı"],
    ["Alopecia areata", "Alopesi Areata", "Saç dökülmesi"],
    ["Lichen planus", "Liken Planus", "Deri ve mukoza hastalığı"],
    ["Morphea", "Morfea", "Lokalize skleroderma"],
    ["Systemic sclerosis", "Sistemik Skleroz", "Skleroderma"],
    ["Mixed connective tissue disease", "Mikst Bağ Dokusu Hastalığı", "MCTD"],
    [
      "Undifferentiated connective tissue disease",
      "Farklılaşmamış Bağ Dokusu Hastalığı",
      "UCTD",
    ],
    ["Overlap syndrome", "Overlap Sendromu", "Çakışma sendromu"],
    ["Antisynthetase syndrome", "Antisintetaz Sendromu", "Miyozit alt tipi"],
    ["Stiff person syndrome", "Katı İnsan Sendromu", "Nörolojik otoimmün"],
    ["Neuromyelitis optica", "Nöromiyelitis Optika", "Devic hastalığı"],
    ["Autoimmune encephalitis", "Otoimmün Ensefalit", "Beyin iltihabı"],
    [
      "Anti-NMDA receptor encephalitis",
      "Anti-NMDA Reseptör Ensefaliti",
      "Otoimmün ensefalit",
    ],
    ["Limbic encephalitis", "Limbik Ensefalit", "Limbik sistem iltihabı"],
    ["Hashimoto encephalopathy", "Hashimoto Ensefalopatisi", "SREAT"],
    [
      "Autoimmune autonomic ganglionopathy",
      "Otoimmün Otonom Gangliyonopati",
      "AAG",
    ],
    [
      "Chronic inflammatory demyelinating polyneuropathy",
      "CIDP",
      "Kronik demiyelinizan polinöropati",
    ],
    ["Multifocal motor neuropathy", "Multifokal Motor Nöropati", "MMN"],
    ["Myasthenia gravis", "Miyastenia Gravis", "Nöromüsküler kavşak hastalığı"],
    ["Lambert-Eaton syndrome", "Lambert-Eaton Sendromu", "LEMS"],
    ["Acquired neuromyotonia", "Edinsel Nöromiyotoni", "Isaacs sendromu"],
    ["Autoimmune hemolytic anemia", "Otoimmün Hemolitik Anemi", "AIHA"],
    ["Immune thrombocytopenia", "İmmün Trombositopeni", "ITP"],
    ["Evans syndrome", "Evans Sendromu", "AIHA + ITP"],
    [
      "Thrombotic thrombocytopenic purpura",
      "Trombotik Trombositopenik Purpura",
      "TTP",
    ],
    ["Autoimmune neutropenia", "Otoimmün Nötropeni", "AIN"],
    ["Pure red cell aplasia", "Saf Kırmızı Hücre Aplazisi", "PRCA"],
    ["Aplastic anemia", "Aplastik Anemi", "Kemik iliği yetmezliği"],
    [
      "Autoimmune lymphoproliferative syndrome",
      "Otoimmün Lenfoproliferatif Sendrom",
      "ALPS",
    ],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Kapsamlı hastalık listesi - Bölüm 2
const generateDiseases2 = () => {
  const diseases = [];
  const diseaseList = [
    // Kanserler
    ["Acute myeloid leukemia", "Akut Miyeloid Lösemi", "AML"],
    ["Acute lymphoblastic leukemia", "Akut Lenfoblastik Lösemi", "ALL"],
    ["Chronic myeloid leukemia", "Kronik Miyeloid Lösemi", "KML"],
    ["Chronic lymphocytic leukemia", "Kronik Lenfositik Lösemi", "KLL"],
    ["Hairy cell leukemia", "Tüylü Hücreli Lösemi", "HCL"],
    ["Prolymphocytic leukemia", "Prolenfositik Lösemi", "PLL"],
    ["Adult T-cell leukemia", "Erişkin T Hücreli Lösemi", "ATL"],
    [
      "Large granular lymphocytic leukemia",
      "Büyük Granüler Lenfositik Lösemi",
      "LGL",
    ],
    ["Hodgkin lymphoma", "Hodgkin Lenfoma", "HL"],
    ["Classical Hodgkin lymphoma", "Klasik Hodgkin Lenfoma", "cHL"],
    [
      "Nodular lymphocyte predominant Hodgkin lymphoma",
      "Nodüler Lenfosit Predominant HL",
      "NLPHL",
    ],
    [
      "Diffuse large B-cell lymphoma",
      "Diffüz Büyük B Hücreli Lenfoma",
      "DLBCL",
    ],
    ["Follicular lymphoma", "Foliküler Lenfoma", "FL"],
    ["Mantle cell lymphoma", "Mantle Hücreli Lenfoma", "MCL"],
    ["Marginal zone lymphoma", "Marjinal Zon Lenfoma", "MZL"],
    ["MALT lymphoma", "MALT Lenfoma", "Mukoza ilişkili lenfoid doku lenfoma"],
    ["Burkitt lymphoma", "Burkitt Lenfoma", "Agresif B hücreli lenfoma"],
    ["Lymphoplasmacytic lymphoma", "Lenfoplazmositik Lenfoma", "LPL"],
    [
      "Primary mediastinal B-cell lymphoma",
      "Primer Mediastinal B Hücreli Lenfoma",
      "PMBCL",
    ],
    ["Primary CNS lymphoma", "Primer SSS Lenfoma", "PCNSL"],
    ["Peripheral T-cell lymphoma", "Periferik T Hücreli Lenfoma", "PTCL"],
    [
      "Anaplastic large cell lymphoma",
      "Anaplastik Büyük Hücreli Lenfoma",
      "ALCL",
    ],
    [
      "Angioimmunoblastic T-cell lymphoma",
      "Anjiyoimmünoblastik T Hücreli Lenfoma",
      "AITL",
    ],
    ["Mycosis fungoides", "Mikozis Fungoides", "Kutanöz T hücreli lenfoma"],
    ["Sezary syndrome", "Sézary Sendromu", "Lösemik CTCL"],
    ["Multiple myeloma", "Multipl Miyelom", "MM"],
    ["Smoldering myeloma", "Smoldering Miyelom", "Asemptomatik miyelom"],
    ["Plasma cell leukemia", "Plazma Hücreli Lösemi", "PCL"],
    ["Waldenstrom macroglobulinemia", "Waldenström Makroglobulinemisi", "WM"],
    ["AL amyloidosis", "AL Amiloidoz", "Primer amiloidoz"],
    ["POEMS syndrome", "POEMS Sendromu", "Polinöropati, organomegali"],
    ["Myelodysplastic syndrome", "Miyelodisplastik Sendrom", "MDS"],
    ["Myeloproliferative neoplasm", "Miyeloproliferatif Neoplazm", "MPN"],
    ["Polycythemia vera", "Polisitemia Vera", "PV"],
    ["Essential thrombocythemia", "Esansiyel Trombositemi", "ET"],
    ["Primary myelofibrosis", "Primer Miyelofibrozis", "PMF"],
    [
      "Chronic myelomonocytic leukemia",
      "Kronik Miyelomonositik Lösemi",
      "KMML",
    ],
    ["Mastocytosis", "Mastositoz", "Mast hücre hastalığı"],
    ["Systemic mastocytosis", "Sistemik Mastositoz", "SM"],
    ["Mast cell leukemia", "Mast Hücreli Lösemi", "MCL"],
    ["Langerhans cell histiocytosis", "Langerhans Hücreli Histiyositoz", "LCH"],
    ["Erdheim-Chester disease", "Erdheim-Chester Hastalığı", "ECD"],
    ["Rosai-Dorfman disease", "Rosai-Dorfman Hastalığı", "RDD"],
    [
      "Hemophagocytic lymphohistiocytosis",
      "Hemofagositik Lenfohistiyositoz",
      "HLH",
    ],
    ["Castleman disease", "Castleman Hastalığı", "CD"],
    [
      "Post-transplant lymphoproliferative disorder",
      "Transplant Sonrası Lenfoproliferatif Bozukluk",
      "PTLD",
    ],
    ["Kaposi sarcoma", "Kaposi Sarkomu", "HHV-8 ilişkili"],
    ["Primary effusion lymphoma", "Primer Efüzyon Lenfoma", "PEL"],
    ["Plasmablastic lymphoma", "Plazmablastik Lenfoma", "PBL"],
    [
      "Blastic plasmacytoid dendritic cell neoplasm",
      "Blastik Plazmositoid Dendritik Hücre Neoplazm",
      "BPDCN",
    ],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Kapsamlı anatomi listesi
const generateAnatomy1 = () => {
  const anatomy = [];
  const anatomyList = [
    // Endokrin sistem
    ["Pituitary gland", "Hipofiz Bezi", "Ana endokrin bez"],
    ["Anterior pituitary", "Ön Hipofiz", "Adenohipofiz"],
    ["Posterior pituitary", "Arka Hipofiz", "Nörohipofiz"],
    ["Pineal gland", "Pineal Bez", "Epifiz"],
    ["Thyroid gland", "Tiroid Bezi", "Tiroid hormonu üretimi"],
    ["Parathyroid glands", "Paratiroid Bezleri", "PTH üretimi"],
    ["Adrenal glands", "Adrenal Bezler", "Böbrek üstü bezleri"],
    ["Adrenal cortex", "Adrenal Korteks", "Steroid hormon üretimi"],
    ["Zona glomerulosa", "Zona Glomeruloza", "Aldosteron üretimi"],
    ["Zona fasciculata", "Zona Fasikulata", "Kortizol üretimi"],
    ["Zona reticularis", "Zona Retikularis", "Androjen üretimi"],
    ["Adrenal medulla", "Adrenal Medulla", "Katekolamin üretimi"],
    ["Pancreatic islets", "Pankreas Adacıkları", "Langerhans adacıkları"],
    ["Alpha cells", "Alfa Hücreleri", "Glukagon üretimi"],
    ["Beta cells", "Beta Hücreleri", "İnsülin üretimi"],
    ["Delta cells", "Delta Hücreleri", "Somatostatin üretimi"],
    ["PP cells", "PP Hücreleri", "Pankreatik polipeptid"],
    // Lenfatik sistem
    ["Lymph nodes", "Lenf Düğümleri", "Lenfatik filtre"],
    ["Cervical lymph nodes", "Servikal Lenf Düğümleri", "Boyun lenf düğümleri"],
    [
      "Axillary lymph nodes",
      "Aksiller Lenf Düğümleri",
      "Koltuk altı lenf düğümleri",
    ],
    ["Inguinal lymph nodes", "İnguinal Lenf Düğümleri", "Kasık lenf düğümleri"],
    [
      "Mediastinal lymph nodes",
      "Mediastinal Lenf Düğümleri",
      "Göğüs lenf düğümleri",
    ],
    [
      "Mesenteric lymph nodes",
      "Mezenterik Lenf Düğümleri",
      "Bağırsak lenf düğümleri",
    ],
    ["Spleen", "Dalak", "Lenfoid organ, kan filtresi"],
    ["Red pulp", "Kırmızı Pulpa", "Eritrosit filtrasyonu"],
    ["White pulp", "Beyaz Pulpa", "Lenfoid doku"],
    ["Thymus", "Timus", "T hücre olgunlaşması"],
    ["Tonsils", "Bademcikler", "Lenfoid doku"],
    ["Palatine tonsils", "Palatin Tonsiller", "Damak bademcikleri"],
    ["Pharyngeal tonsil", "Faringeal Tonsil", "Adenoid"],
    ["Lingual tonsils", "Lingual Tonsiller", "Dil bademcikleri"],
    ["Peyer patches", "Peyer Plakları", "Bağırsak lenfoid dokusu"],
    ["Appendix", "Apendiks", "Lenfoid doku içerir"],
    ["Bone marrow", "Kemik İliği", "Hematopoez merkezi"],
    ["Red bone marrow", "Kırmızı Kemik İliği", "Aktif hematopoez"],
    ["Yellow bone marrow", "Sarı Kemik İliği", "Yağ dokusu"],
    // Deri ve ekleri
    ["Epidermis", "Epidermis", "Deri üst tabakası"],
    ["Stratum corneum", "Stratum Korneum", "Boynuzsu tabaka"],
    ["Stratum lucidum", "Stratum Lusidum", "Saydam tabaka"],
    ["Stratum granulosum", "Stratum Granulozum", "Granüler tabaka"],
    ["Stratum spinosum", "Stratum Spinozum", "Dikensi tabaka"],
    ["Stratum basale", "Stratum Bazale", "Bazal tabaka"],
    ["Dermis", "Dermis", "Deri orta tabakası"],
    ["Papillary dermis", "Papiller Dermis", "Üst dermis"],
    ["Reticular dermis", "Retiküler Dermis", "Alt dermis"],
    ["Hypodermis", "Hipodermis", "Deri altı yağ dokusu"],
    ["Hair follicle", "Kıl Folikülü", "Kıl kökü"],
    ["Sebaceous gland", "Sebase Bez", "Yağ bezi"],
    ["Sweat gland", "Ter Bezi", "Ekrin ve apokrin"],
    ["Nail", "Tırnak", "Keratin yapı"],
  ];

  anatomyList.forEach(([latin, turkish, def]) => {
    anatomy.push(createTerm(latin, turkish, TermCategory.ANATOMY, def));
  });

  return anatomy;
};

// Kapsamlı bitki listesi
const generatePlants1 = () => {
  const plants = [];
  const plantList = [
    ["Tilia cordata", "Ihlamur", "Sedatif, diaforetik"],
    ["Trifolium pratense", "Kırmızı Yonca", "Fitoöstrojen, menopoz"],
    ["Tropaeolum majus", "Latin Çiçeği", "Antibakteriyel, C vitamini"],
    ["Tussilago farfara", "Öksürük Otu", "Ekspektoran, yatıştırıcı"],
    ["Ulmus rubra", "Kaygan Karaağaç", "Yatıştırıcı, sindirim"],
    ["Urtica dioica", "Isırgan Otu", "Antiinflamatuar, BPH"],
    ["Usnea barbata", "Sakal Likeni", "Antibakteriyel"],
    ["Vaccinium macrocarpon", "Turna Yemişi", "Üriner enfeksiyon"],
    ["Vaccinium myrtillus", "Yaban Mersini", "Antioksidan, göz sağlığı"],
    ["Valeriana officinalis", "Kediotu", "Sedatif, anksiyolitik"],
    ["Verbascum thapsus", "Sığır Kuyruğu", "Ekspektoran, yatıştırıcı"],
    ["Verbena officinalis", "Mine Çiçeği", "Sedatif, sindirim"],
    ["Viburnum opulus", "Gilaburu", "Antispazmodik, kadın sağlığı"],
    ["Viburnum prunifolium", "Siyah Haw", "Uterus gevşetici"],
    ["Vinca minor", "Küçük Cezayir Menekşesi", "Serebral dolaşım"],
    ["Viola tricolor", "Hercai Menekşe", "Cilt, ekspektoran"],
    ["Viscum album", "Ökse Otu", "Antihipertansif, antitümör"],
    ["Vitex agnus-castus", "Hayıt", "PMS, menstrüel düzensizlik"],
    ["Vitis vinifera", "Asma", "Antioksidan, venöz yetmezlik"],
    ["Withania somnifera", "Ashwagandha", "Adaptojenik, anksiyolitik"],
    ["Zanthoxylum americanum", "Diş Ağrısı Ağacı", "Analjezik, sindirim"],
    ["Zea mays", "Mısır Püskülü", "Diüretik, üriner"],
    ["Zingiber officinale", "Zencefil", "Antiemetik, antiinflamatuar"],
    ["Ziziphus jujuba", "Hünnap", "Sedatif, sindirim"],
    // Ayurveda bitkileri
    ["Bacopa monnieri", "Brahmi", "Nootropik, hafıza"],
    ["Boswellia serrata", "Akgünlük", "Antiinflamatuar"],
    ["Centella asiatica", "Gotu Kola", "Yara iyileştirici, nootropik"],
    ["Commiphora mukul", "Guggul", "Hipolipidemik"],
    ["Curcuma longa", "Zerdeçal", "Antiinflamatuar, antioksidan"],
    ["Emblica officinalis", "Amla", "Antioksidan, C vitamini"],
    ["Gymnema sylvestre", "Gymnema", "Antidiyabetik"],
    ["Mucuna pruriens", "Kadife Fasulye", "Dopamin öncüsü"],
    ["Ocimum sanctum", "Kutsal Fesleğen", "Adaptojenik"],
    ["Phyllanthus niruri", "Chanca Piedra", "Hepatoprotektif, böbrek taşı"],
    ["Piper longum", "Uzun Biber", "Biyoyararlanım artırıcı"],
    ["Terminalia arjuna", "Arjuna", "Kardiyotonik"],
    ["Terminalia chebula", "Haritaki", "Laksatif, antioksidan"],
    ["Tinospora cordifolia", "Guduchi", "İmmünomodülatör"],
    ["Tribulus terrestris", "Demir Dikeni", "Libido, performans"],
    // Çin tıbbı bitkileri
    ["Angelica sinensis", "Dong Quai", "Kan tonik, kadın sağlığı"],
    ["Astragalus membranaceus", "Huang Qi", "İmmünomodülatör"],
    ["Atractylodes macrocephala", "Bai Zhu", "Sindirim, tonik"],
    ["Bupleurum chinense", "Chai Hu", "Karaciğer, ateş düşürücü"],
    ["Codonopsis pilosula", "Dang Shen", "Qi tonik"],
    ["Coptis chinensis", "Huang Lian", "Antimikrobiyal, antiinflamatuar"],
    ["Corydalis yanhusuo", "Yan Hu Suo", "Analjezik"],
    ["Ligusticum wallichii", "Chuan Xiong", "Kan dolaşımı"],
    ["Paeonia lactiflora", "Bai Shao", "Antiinflamatuar, analjezik"],
    ["Panax notoginseng", "San Qi", "Hemostatik, kan dolaşımı"],
    ["Polygonum multiflorum", "He Shou Wu", "Tonik, saç"],
    ["Rehmannia glutinosa", "Di Huang", "Kan tonik"],
    ["Salvia miltiorrhiza", "Dan Shen", "Kardiyovasküler"],
    ["Schisandra chinensis", "Wu Wei Zi", "Adaptojenik, hepatoprotektif"],
    ["Scutellaria baicalensis", "Huang Qin", "Antiinflamatuar, antioksidan"],
  ];

  plantList.forEach(([latin, turkish, def]) => {
    plants.push(createTerm(latin, turkish, TermCategory.PLANT, def));
  });

  return plants;
};

// Kapsamlı bileşen listesi
const generateComponents1 = () => {
  const components = [];
  const componentList = [
    // Vitaminler ve kofaktörler
    ["Thiamine pyrophosphate", "Tiamin Pirofosfat", "TPP, B1 aktif formu"],
    [
      "Flavin adenine dinucleotide",
      "Flavin Adenin Dinükleotid",
      "FAD, B2 kofaktörü",
    ],
    ["Flavin mononucleotide", "Flavin Mononükleotid", "FMN, B2 kofaktörü"],
    [
      "Nicotinamide adenine dinucleotide",
      "Nikotinamid Adenin Dinükleotid",
      "NAD+, B3 kofaktörü",
    ],
    ["Coenzyme A", "Koenzim A", "CoA, B5 türevi"],
    ["Pyridoxal phosphate", "Piridoksal Fosfat", "PLP, B6 aktif formu"],
    ["Tetrahydrofolate", "Tetrahidrofolat", "THF, B9 aktif formu"],
    ["Methylcobalamin", "Metilkobalamin", "B12 aktif formu"],
    ["Adenosylcobalamin", "Adenozilkobalamin", "B12 aktif formu"],
    ["Biotin", "Biyotin", "B7, karboksilaz kofaktörü"],
    ["Lipoic acid", "Lipoik Asit", "Mitokondriyal kofaktör"],
    ["Ubiquinone", "Ubikinon", "Koenzim Q10"],
    ["Ubiquinol", "Ubikinol", "Redükte CoQ10"],
    ["Pyrroloquinoline quinone", "Pirolokinolin Kinon", "PQQ, antioksidan"],
    // Mineraller ve eser elementler
    ["Heme iron", "Hem Demiri", "Hemoglobin demiri"],
    ["Non-heme iron", "Hem Olmayan Demir", "Bitkisel demir"],
    ["Ferritin", "Ferritin", "Demir depo proteini"],
    ["Transferrin", "Transferrin", "Demir taşıyıcı protein"],
    ["Ceruloplasmin", "Seruloplazmin", "Bakır taşıyıcı protein"],
    ["Metallothionein", "Metalotiyonein", "Metal bağlayıcı protein"],
    ["Selenoprotein", "Selenoprotein", "Selenyum içeren protein"],
    ["Zinc finger protein", "Çinko Parmak Proteini", "DNA bağlayıcı protein"],
    // Lipidler
    ["Phosphatidylcholine", "Fosfatidilkolin", "Lesitin, membran lipidi"],
    ["Phosphatidylethanolamine", "Fosfatidiletanolamin", "Membran lipidi"],
    ["Phosphatidylserine", "Fosfatidilserin", "Membran lipidi, beyin"],
    ["Phosphatidylinositol", "Fosfatidilinositol", "Sinyal lipidi"],
    ["Sphingomyelin", "Sfingomiyelin", "Miyelin lipidi"],
    ["Ceramide", "Seramid", "Sfingolipid"],
    ["Ganglioside", "Gangliozid", "Sinir dokusu lipidi"],
    ["Cholesterol", "Kolesterol", "Membran lipidi, steroid öncüsü"],
    ["Bile acids", "Safra Asitleri", "Kolesterol türevleri"],
    ["Cholic acid", "Kolik Asit", "Primer safra asidi"],
    ["Chenodeoxycholic acid", "Kenodeoksikolik Asit", "Primer safra asidi"],
    ["Deoxycholic acid", "Deoksikolik Asit", "Sekonder safra asidi"],
    ["Lithocholic acid", "Litokolik Asit", "Sekonder safra asidi"],
    // Karbonhidratlar
    ["Glucose", "Glukoz", "Kan şekeri"],
    ["Fructose", "Fruktoz", "Meyve şekeri"],
    ["Galactose", "Galaktoz", "Süt şekeri bileşeni"],
    ["Mannose", "Mannoz", "Glikoprotein bileşeni"],
    ["Ribose", "Riboz", "RNA şekeri"],
    ["Deoxyribose", "Deoksiriboz", "DNA şekeri"],
    ["Sucrose", "Sukroz", "Sofra şekeri"],
    ["Lactose", "Laktoz", "Süt şekeri"],
    ["Maltose", "Maltoz", "Malt şekeri"],
    ["Glycogen", "Glikojen", "Hayvansal nişasta"],
    ["Starch", "Nişasta", "Bitkisel polisakkarit"],
    ["Cellulose", "Selüloz", "Bitkisel lif"],
    ["Chitin", "Kitin", "Böcek ve mantar polisakkariti"],
    ["Hyaluronic acid", "Hiyaluronik Asit", "Eklem sıvısı, cilt"],
    ["Chondroitin sulfate", "Kondroitin Sülfat", "Kıkırdak bileşeni"],
    ["Glucosamine", "Glukozamin", "Kıkırdak öncüsü"],
  ];

  componentList.forEach(([latin, turkish, def]) => {
    components.push(createTerm(latin, turkish, TermCategory.COMPONENT, def));
  });

  return components;
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Ultra Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(50));

  console.log("📝 Terimler oluşturuluyor...");

  const drugs1 = generateDrugs1();
  const drugs2 = generateDrugs2();
  const diseases1 = generateDiseases1();
  const diseases2 = generateDiseases2();
  const anatomy1 = generateAnatomy1();
  const plants1 = generatePlants1();
  const components1 = generateComponents1();

  const allTerms = [
    ...drugs1,
    ...drugs2,
    ...diseases1,
    ...diseases2,
    ...anatomy1,
    ...plants1,
    ...components1,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   İlaçlar Bölüm 1: ${drugs1.length}`);
  console.log(`   İlaçlar Bölüm 2: ${drugs2.length}`);
  console.log(`   Hastalıklar Bölüm 1: ${diseases1.length}`);
  console.log(`   Hastalıklar Bölüm 2: ${diseases2.length}`);
  console.log(`   Anatomi: ${anatomy1.length}`);
  console.log(`   Bitkiler: ${plants1.length}`);
  console.log(`   Bileşenler: ${components1.length}`);
  console.log(`   ─────────────────────`);
  console.log(`   TOPLAM: ${allTerms.length} terim\n`);

  console.log("🔍 Mevcut terimler kontrol ediliyor...");
  const termsRef = collection(db, "terms");
  const existingSnapshot = await getDocs(termsRef);
  const existingTerms = new Set();

  existingSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    existingTerms.add(data.latinName?.toLowerCase());
    existingTerms.add(data.turkishName?.toLowerCase());
  });

  console.log(`   Mevcut terim sayısı: ${existingSnapshot.size}`);

  const newTerms = allTerms.filter((term) => {
    const latinLower = term.latinName?.toLowerCase();
    const turkishLower = term.turkishName?.toLowerCase();
    return !existingTerms.has(latinLower) && !existingTerms.has(turkishLower);
  });

  console.log(`   Yeni eklenecek terim sayısı: ${newTerms.length}\n`);

  if (newTerms.length === 0) {
    console.log("✅ Tüm terimler zaten mevcut.");
    process.exit(0);
  }

  const BATCH_SIZE = 400;
  let uploadedCount = 0;
  let batchNumber = 1;

  console.log("📤 Firebase'e yükleme başlıyor...\n");

  for (let i = 0; i < newTerms.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    const batchTerms = newTerms.slice(i, i + BATCH_SIZE);

    for (const term of batchTerms) {
      const docRef = doc(collection(db, "terms"));
      batch.set(docRef, {
        ...term,
        createdAt: new Date(),
        updatedAt: new Date(),
        isBookmarked: false,
      });
    }

    try {
      await batch.commit();
      uploadedCount += batchTerms.length;
      console.log(
        `   ✅ Batch ${batchNumber}: ${batchTerms.length} terim yüklendi (Toplam: ${uploadedCount}/${newTerms.length})`
      );
      batchNumber++;
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`   ❌ Batch ${batchNumber} hatası:`, error.message);
    }
  }

  console.log("\n" + "═".repeat(50));
  console.log("📊 YÜKLEME TAMAMLANDI");
  console.log("═".repeat(50));
  console.log(`   Önceki terim sayısı: ${existingSnapshot.size}`);
  console.log(`   Yeni eklenen: ${uploadedCount}`);
  console.log(
    `   Toplam terim sayısı: ${existingSnapshot.size + uploadedCount}`
  );
  console.log("═".repeat(50) + "\n");

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Hata:", error);
  process.exit(1);
});
