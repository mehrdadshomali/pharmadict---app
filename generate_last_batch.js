// Last batch - 10,000 hedefi için son terimler
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

// Programatik üretim - Hastalık alt tipleri
const generateDiseaseSubtypes = () => {
  const diseases = [
    ["Acute", "Akut", "Ani başlangıçlı"],
    ["Chronic", "Kronik", "Uzun süreli"],
    ["Subacute", "Subakut", "Yarı akut"],
    ["Recurrent", "Tekrarlayan", "Yineleyen"],
    ["Progressive", "Progresif", "İlerleyici"],
    ["Relapsing", "Relaps", "Nüks eden"],
    ["Remitting", "Remisyon", "Gerileme gösteren"],
    ["Intermittent", "Aralıklı", "Kesintili"],
    ["Persistent", "Kalıcı", "Sürekli"],
    ["Transient", "Geçici", "Kısa süreli"],
  ];

  const conditions = [
    ["hepatitis", "hepatit", "Karaciğer iltihabı"],
    ["nephritis", "nefrit", "Böbrek iltihabı"],
    ["pancreatitis", "pankreatit", "Pankreas iltihabı"],
    ["cholecystitis", "kolesistit", "Safra kesesi iltihabı"],
    ["appendicitis", "apandisit", "Apendiks iltihabı"],
    ["gastritis", "gastrit", "Mide iltihabı"],
    ["colitis", "kolit", "Kolon iltihabı"],
    ["enteritis", "enterit", "Bağırsak iltihabı"],
    ["bronchitis", "bronşit", "Bronş iltihabı"],
    ["sinusitis", "sinüzit", "Sinüs iltihabı"],
    ["pharyngitis", "farenjit", "Yutak iltihabı"],
    ["laryngitis", "larenjit", "Gırtlak iltihabı"],
    ["tonsillitis", "tonsillit", "Bademcik iltihabı"],
    ["otitis", "otit", "Kulak iltihabı"],
    ["conjunctivitis", "konjonktivit", "Göz iltihabı"],
    ["dermatitis", "dermatit", "Deri iltihabı"],
    ["arthritis", "artrit", "Eklem iltihabı"],
    ["myositis", "miyozit", "Kas iltihabı"],
    ["neuritis", "nörit", "Sinir iltihabı"],
    ["meningitis", "menenjit", "Beyin zarı iltihabı"],
    ["encephalitis", "ensefalit", "Beyin iltihabı"],
    ["myelitis", "miyelit", "Omurilik iltihabı"],
    ["carditis", "kardit", "Kalp iltihabı"],
    ["pericarditis", "perikardit", "Kalp zarı iltihabı"],
    ["myocarditis", "miyokardit", "Kalp kası iltihabı"],
    ["endocarditis", "endokardit", "Kalp iç zarı iltihabı"],
    ["vasculitis", "vaskülit", "Damar iltihabı"],
    ["phlebitis", "flebit", "Ven iltihabı"],
    ["lymphangitis", "lenfanjit", "Lenf damarı iltihabı"],
    ["lymphadenitis", "lenfadenit", "Lenf bezi iltihabı"],
  ];

  const terms = [];
  diseases.forEach(([typeEn, typeTr, typeDef]) => {
    conditions.forEach(([condEn, condTr, condDef]) => {
      terms.push(
        createTerm(
          `${typeEn} ${condEn}`,
          `${typeTr} ${condTr}`,
          TermCategory.DISEASE,
          `${typeDef} ${condDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Tıbbi işlem varyantları
const generateProcedureVariants = () => {
  const approaches = [
    ["Open", "Açık", "Açık cerrahi"],
    ["Laparoscopic", "Laparoskopik", "Kapalı karın cerrahisi"],
    ["Thoracoscopic", "Torakoskopik", "Kapalı göğüs cerrahisi"],
    ["Endoscopic", "Endoskopik", "Endoskopik yaklaşım"],
    ["Percutaneous", "Perkütan", "Deri yoluyla"],
    ["Transoral", "Transoral", "Ağız yoluyla"],
    ["Transnasal", "Transnazal", "Burun yoluyla"],
    ["Transvaginal", "Transvajinal", "Vajina yoluyla"],
    ["Transrectal", "Transrektal", "Rektum yoluyla"],
    ["Robotic", "Robotik", "Robot yardımlı"],
  ];

  const procedures = [
    ["cholecystectomy", "kolesistektomi", "Safra kesesi alınması"],
    ["appendectomy", "apendektomi", "Apendiks alınması"],
    ["hernia repair", "fıtık onarımı", "Fıtık tamiri"],
    ["colectomy", "kolektomi", "Kolon alınması"],
    ["gastrectomy", "gastrektomi", "Mide alınması"],
    ["nephrectomy", "nefrektomi", "Böbrek alınması"],
    ["prostatectomy", "prostatektomi", "Prostat alınması"],
    ["hysterectomy", "histerektomi", "Rahim alınması"],
    ["thyroidectomy", "tiroidektomi", "Tiroid alınması"],
    ["adrenalectomy", "adrenalektomi", "Adrenal bez alınması"],
    ["splenectomy", "splenektomi", "Dalak alınması"],
    ["pancreatectomy", "pankreatektomi", "Pankreas alınması"],
    ["lobectomy", "lobektomi", "Lob alınması"],
    ["pneumonectomy", "pnömonektomi", "Akciğer alınması"],
    ["mastectomy", "mastektomi", "Meme alınması"],
    ["oophorectomy", "ooforektomi", "Over alınması"],
    ["salpingectomy", "salpenjektomi", "Tüp alınması"],
    ["orchiectomy", "orşiektomi", "Testis alınması"],
    ["cystectomy", "sistektomi", "Mesane alınması"],
    ["esophagectomy", "özofajektomi", "Yemek borusu alınması"],
  ];

  const terms = [];
  approaches.forEach(([appEn, appTr, appDef]) => {
    procedures.forEach(([procEn, procTr, procDef]) => {
      terms.push(
        createTerm(
          `${appEn} ${procEn}`,
          `${appTr} ${procTr}`,
          TermCategory.COMPONENT,
          `${appDef} ile ${procDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Tıbbi durumlar - Şiddet dereceleri
const generateSeverityVariants = () => {
  const severities = [
    ["Mild", "Hafif", "Hafif şiddette"],
    ["Moderate", "Orta", "Orta şiddette"],
    ["Severe", "Şiddetli", "Ağır şiddette"],
    ["Critical", "Kritik", "Kritik düzeyde"],
    ["Life-threatening", "Hayatı Tehdit Eden", "Yaşamı tehdit eden"],
    ["Fulminant", "Fulminan", "Ani ve şiddetli"],
    ["Indolent", "İndolan", "Yavaş seyirli"],
    ["Aggressive", "Agresif", "Hızlı ilerleyen"],
    ["Refractory", "Refrakter", "Tedaviye dirençli"],
    ["Treatment-resistant", "Tedaviye Dirençli", "İlaçlara yanıtsız"],
  ];

  const conditions = [
    ["asthma", "astım", "Bronşiyal astım"],
    ["COPD", "KOAH", "Kronik obstrüktif akciğer hastalığı"],
    ["heart failure", "kalp yetmezliği", "Kalp pompa yetersizliği"],
    ["hypertension", "hipertansiyon", "Yüksek tansiyon"],
    ["diabetes", "diyabet", "Şeker hastalığı"],
    ["depression", "depresyon", "Majör depresif bozukluk"],
    ["anxiety", "anksiyete", "Anksiyete bozukluğu"],
    ["pain", "ağrı", "Ağrı sendromu"],
    ["infection", "enfeksiyon", "Mikrobik hastalık"],
    ["anemia", "anemi", "Kansızlık"],
    ["thrombocytopenia", "trombositopeni", "Trombosit düşüklüğü"],
    ["neutropenia", "nötropeni", "Nötrofil düşüklüğü"],
    ["hypoglycemia", "hipoglisemi", "Düşük kan şekeri"],
    ["hyperglycemia", "hiperglisemi", "Yüksek kan şekeri"],
    ["hypotension", "hipotansiyon", "Düşük tansiyon"],
    ["hypothermia", "hipotermi", "Düşük vücut ısısı"],
    ["hyperthermia", "hipertermi", "Yüksek vücut ısısı"],
    ["dehydration", "dehidratasyon", "Su kaybı"],
    ["malnutrition", "malnütrisyon", "Yetersiz beslenme"],
    ["obesity", "obezite", "Şişmanlık"],
  ];

  const terms = [];
  severities.forEach(([sevEn, sevTr, sevDef]) => {
    conditions.forEach(([condEn, condTr, condDef]) => {
      terms.push(
        createTerm(
          `${sevEn} ${condEn}`,
          `${sevTr} ${condTr}`,
          TermCategory.DISEASE,
          `${sevDef} ${condDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Laboratuvar bulguları
const generateLabFindings = () => {
  const findings = [
    ["Elevated", "Yüksek", "Artmış"],
    ["Decreased", "Düşük", "Azalmış"],
    ["Normal", "Normal", "Normal sınırlarda"],
    ["Borderline", "Sınırda", "Sınır değerde"],
    ["Markedly elevated", "Belirgin Yüksek", "Belirgin artmış"],
    ["Critically low", "Kritik Düşük", "Kritik düzeyde düşük"],
    ["Mildly elevated", "Hafif Yüksek", "Hafif artmış"],
    ["Moderately elevated", "Orta Yüksek", "Orta derecede artmış"],
    ["Severely decreased", "Şiddetli Düşük", "Şiddetli azalmış"],
    ["Undetectable", "Saptanamayan", "Ölçülemeyen"],
  ];

  const parameters = [
    ["hemoglobin", "hemoglobin", "Kan hemoglobini"],
    ["hematocrit", "hematokrit", "Kan yoğunluğu"],
    ["white blood cell count", "beyaz küre sayısı", "Lökosit sayısı"],
    ["platelet count", "trombosit sayısı", "Kan pulcuğu sayısı"],
    ["creatinine", "kreatinin", "Böbrek fonksiyon göstergesi"],
    ["BUN", "BUN", "Kan üre azotu"],
    ["glucose", "glukoz", "Kan şekeri"],
    ["sodium", "sodyum", "Serum sodyumu"],
    ["potassium", "potasyum", "Serum potasyumu"],
    ["calcium", "kalsiyum", "Serum kalsiyumu"],
    ["magnesium", "magnezyum", "Serum magnezyumu"],
    ["phosphorus", "fosfor", "Serum fosforu"],
    ["albumin", "albümin", "Serum albümini"],
    ["total protein", "total protein", "Serum proteini"],
    ["bilirubin", "bilirubin", "Serum bilirubini"],
    ["AST", "AST", "Karaciğer enzimi"],
    ["ALT", "ALT", "Karaciğer enzimi"],
    ["alkaline phosphatase", "alkalen fosfataz", "ALP"],
    ["GGT", "GGT", "Gama glutamil transferaz"],
    ["LDH", "LDH", "Laktat dehidrojenaz"],
  ];

  const terms = [];
  findings.forEach(([findEn, findTr, findDef]) => {
    parameters.forEach(([paramEn, paramTr, paramDef]) => {
      terms.push(
        createTerm(
          `${findEn} ${paramEn}`,
          `${findTr} ${paramTr}`,
          TermCategory.COMPONENT,
          `${findDef} ${paramDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Farmakolojik terimler
const generatePharmacologyTerms = () => {
  const prefixes = [
    ["Anti", "Anti", "Karşı"],
    ["Pro", "Pro", "Öncü"],
    ["Pre", "Pre", "Ön"],
    ["Post", "Post", "Sonra"],
    ["Hyper", "Hiper", "Aşırı"],
    ["Hypo", "Hipo", "Az"],
    ["Poly", "Poli", "Çok"],
    ["Mono", "Mono", "Tek"],
    ["Multi", "Multi", "Çoklu"],
    ["Neo", "Neo", "Yeni"],
  ];

  const roots = [
    ["pyretic", "piretik", "Ateş ile ilgili"],
    ["emetic", "emetik", "Kusma ile ilgili"],
    ["tussive", "tussif", "Öksürük ile ilgili"],
    ["spasmodic", "spazmodik", "Spazm ile ilgili"],
    ["inflammatory", "inflamatuvar", "İltihap ile ilgili"],
    ["bacterial", "bakteriyel", "Bakteri ile ilgili"],
    ["viral", "viral", "Virüs ile ilgili"],
    ["fungal", "fungal", "Mantar ile ilgili"],
    ["histaminic", "histaminik", "Histamin ile ilgili"],
    ["cholinergic", "kolinerjik", "Kolinerjik sistem ile ilgili"],
  ];

  const terms = [];
  prefixes.forEach(([preEn, preTr, preDef]) => {
    roots.forEach(([rootEn, rootTr, rootDef]) => {
      terms.push(
        createTerm(
          `${preEn}${rootEn}`,
          `${preTr}${rootTr}`,
          TermCategory.DRUG,
          `${preDef} ${rootDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Tıbbi cihaz ve ekipman terimleri
const generateMedicalEquipment = () => {
  const equipment = [
    ["Stethoscope", "Stetoskop", "Kalp ve akciğer dinleme aleti"],
    ["Sphygmomanometer", "Sfigmomanometre", "Tansiyon ölçer"],
    ["Otoscope", "Otoskop", "Kulak muayene aleti"],
    ["Ophthalmoscope", "Oftalmoskop", "Göz dibi muayene aleti"],
    ["Laryngoscope", "Laringoskop", "Gırtlak muayene aleti"],
    ["Bronchoscope", "Bronkoskop", "Bronş muayene aleti"],
    ["Gastroscope", "Gastroskop", "Mide muayene aleti"],
    ["Colonoscope", "Kolonoskop", "Kalın bağırsak muayene aleti"],
    ["Cystoscope", "Sistoskop", "Mesane muayene aleti"],
    ["Arthroscope", "Artroskop", "Eklem muayene aleti"],
    ["Laparoscope", "Laparoskop", "Karın muayene aleti"],
    ["Thoracoscope", "Torakoskop", "Göğüs muayene aleti"],
    ["Hysteroscope", "Histeroskop", "Rahim muayene aleti"],
    ["Colposcope", "Kolposkop", "Vajina muayene aleti"],
    ["Dermatoscope", "Dermatoskop", "Deri muayene aleti"],
    ["Electrocardiograph", "Elektrokardiyograf", "EKG cihazı"],
    ["Electroencephalograph", "Elektroensefalograf", "EEG cihazı"],
    ["Electromyograph", "Elektromiyograf", "EMG cihazı"],
    ["Defibrillator", "Defibrilatör", "Kalp şoku cihazı"],
    ["Pacemaker", "Kalp Pili", "Kalp ritim düzenleyici"],
  ];
  return equipment.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Daha fazla tıbbi cihazlar
const generateMoreEquipment = () => {
  const equipment = [
    ["Ventilator", "Ventilatör", "Solunum cihazı"],
    ["Nebulizer", "Nebülizatör", "İlaç buharlaştırıcı"],
    ["Pulse oximeter", "Pulse Oksimetre", "Oksijen ölçer"],
    ["Infusion pump", "İnfüzyon Pompası", "Sıvı verme pompası"],
    ["Syringe pump", "Şırınga Pompası", "İlaç verme pompası"],
    ["Dialysis machine", "Diyaliz Makinesi", "Böbrek yıkama cihazı"],
    ["CPAP machine", "CPAP Cihazı", "Sürekli pozitif hava basıncı"],
    ["BiPAP machine", "BiPAP Cihazı", "İki seviyeli pozitif hava basıncı"],
    ["Suction apparatus", "Aspiratör", "Emme cihazı"],
    ["Autoclave", "Otoklav", "Sterilizasyon cihazı"],
    ["Centrifuge", "Santrifüj", "Ayırma cihazı"],
    ["Microscope", "Mikroskop", "Büyütme aleti"],
    ["Ultrasound machine", "Ultrason Cihazı", "Ses dalgası görüntüleme"],
    ["X-ray machine", "Röntgen Cihazı", "X-ışını görüntüleme"],
    ["CT scanner", "BT Tarayıcı", "Bilgisayarlı tomografi"],
    ["MRI scanner", "MR Tarayıcı", "Manyetik rezonans görüntüleme"],
    ["PET scanner", "PET Tarayıcı", "Pozitron emisyon tomografisi"],
    ["Mammography unit", "Mamografi Ünitesi", "Meme görüntüleme"],
    ["Fluoroscopy unit", "Floroskopi Ünitesi", "Canlı X-ışını görüntüleme"],
    ["Angiography unit", "Anjiyografi Ünitesi", "Damar görüntüleme"],
  ];
  return equipment.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Cerrahi aletler
const generateSurgicalInstruments = () => {
  const instruments = [
    ["Scalpel", "Bistüri", "Cerrahi kesici alet"],
    ["Forceps", "Forseps", "Tutma aleti"],
    ["Scissors", "Makas", "Kesme aleti"],
    ["Retractor", "Ekartör", "Açma aleti"],
    ["Clamp", "Klemp", "Sıkıştırma aleti"],
    ["Needle holder", "İğne Tutucu", "Dikiş iğnesi tutacağı"],
    ["Suture", "Sütür", "Dikiş malzemesi"],
    ["Trocar", "Trokar", "Delme aleti"],
    ["Cannula", "Kanül", "Boru şeklinde alet"],
    ["Catheter", "Kateter", "İnce boru"],
    ["Dilator", "Dilatör", "Genişletici alet"],
    ["Curette", "Küret", "Kazıma aleti"],
    ["Probe", "Sonda", "Yoklama aleti"],
    ["Speculum", "Spekulum", "Açma aleti"],
    ["Bougie", "Buji", "Genişletici çubuk"],
    ["Elevator", "Elevatör", "Kaldırma aleti"],
    ["Rongeur", "Kemik Kesici", "Kemik kesme aleti"],
    ["Osteotome", "Osteotom", "Kemik kesici"],
    ["Chisel", "Keski", "Kemik oyma aleti"],
    ["Mallet", "Tokmak", "Çekiç"],
  ];
  return instruments.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Daha fazla cerrahi aletler
const generateMoreSurgicalInstruments = () => {
  const instruments = [
    ["Dermatome", "Dermatom", "Deri kesme aleti"],
    ["Stapler", "Zımba", "Cerrahi zımba"],
    ["Electrocautery", "Elektrokoter", "Elektrikli yakma aleti"],
    ["Harmonic scalpel", "Harmonik Bistüri", "Ultrasonik kesici"],
    ["Ligasure", "Ligasure", "Damar mühürleyici"],
    ["Endostapler", "Endostapler", "Endoskopik zımba"],
    ["Clip applier", "Klip Aplikatör", "Klip uygulayıcı"],
    ["Suction irrigator", "Aspiratör İrigatör", "Yıkama emme aleti"],
    ["Bone saw", "Kemik Testeresi", "Kemik kesme testeresi"],
    ["Wire cutter", "Tel Kesici", "Cerrahi tel kesici"],
    ["Plate bender", "Plak Bükücü", "Kemik plağı bükücü"],
    ["Drill", "Matkap", "Cerrahi matkap"],
    ["Reamer", "Rayba", "Oyma aleti"],
    ["Tap", "Kılavuz", "Vida yolu açıcı"],
    ["Screwdriver", "Tornavida", "Cerrahi tornavida"],
    ["Depth gauge", "Derinlik Ölçer", "Derinlik ölçme aleti"],
    ["Goniometer", "Gonyometre", "Açı ölçer"],
    ["Caliper", "Kumpas", "Ölçüm aleti"],
    ["Ruler", "Cetvel", "Cerrahi cetvel"],
    ["Marking pen", "İşaretleme Kalemi", "Cerrahi işaretleyici"],
  ];
  return instruments.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Hastalık belirtileri
const generateSymptoms = () => {
  const symptoms = [
    ["Fever", "Ateş", "Vücut ısısı yükselmesi"],
    ["Chills", "Titreme", "Soğuk titremesi"],
    ["Fatigue", "Yorgunluk", "Halsizlik"],
    ["Malaise", "Kırgınlık", "Genel rahatsızlık hissi"],
    ["Weakness", "Güçsüzlük", "Kas güçsüzlüğü"],
    ["Dizziness", "Baş dönmesi", "Vertigo"],
    ["Syncope", "Bayılma", "Bilinç kaybı"],
    ["Headache", "Baş ağrısı", "Sefalji"],
    ["Migraine", "Migren", "Şiddetli baş ağrısı"],
    ["Nausea", "Bulantı", "Mide bulantısı"],
    ["Vomiting", "Kusma", "Mide içeriğinin atılması"],
    ["Diarrhea", "İshal", "Sulu dışkılama"],
    ["Constipation", "Kabızlık", "Dışkılama güçlüğü"],
    ["Abdominal pain", "Karın ağrısı", "Batın ağrısı"],
    ["Chest pain", "Göğüs ağrısı", "Torasik ağrı"],
    ["Back pain", "Sırt ağrısı", "Dorsal ağrı"],
    ["Joint pain", "Eklem ağrısı", "Artralji"],
    ["Muscle pain", "Kas ağrısı", "Miyalji"],
    ["Sore throat", "Boğaz ağrısı", "Farenjit belirtisi"],
    ["Cough", "Öksürük", "Tussif refleks"],
  ];
  return symptoms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla belirtiler
const generateMoreSymptoms = () => {
  const symptoms = [
    ["Dyspnea", "Nefes darlığı", "Solunum güçlüğü"],
    ["Wheezing", "Hırıltı", "Bronşiyal ses"],
    ["Stridor", "Stridor", "Üst solunum yolu sesi"],
    ["Hemoptysis", "Hemoptizi", "Kan tükürme"],
    ["Epistaxis", "Epistaksis", "Burun kanaması"],
    ["Hematemesis", "Hematemez", "Kan kusma"],
    ["Melena", "Melena", "Kanlı siyah dışkı"],
    ["Hematuria", "Hematüri", "Kanlı idrar"],
    ["Dysuria", "Dizüri", "Ağrılı idrar yapma"],
    ["Polyuria", "Poliüri", "Çok idrar yapma"],
    ["Oliguria", "Oligüri", "Az idrar yapma"],
    ["Anuria", "Anüri", "İdrar yapamama"],
    ["Edema", "Ödem", "Şişlik"],
    ["Ascites", "Asit", "Karın sıvısı birikimi"],
    ["Jaundice", "Sarılık", "İkter"],
    ["Cyanosis", "Siyanoz", "Morarma"],
    ["Pallor", "Solukluk", "Renk solukluğu"],
    ["Flushing", "Kızarma", "Yüz kızarması"],
    ["Pruritus", "Kaşıntı", "Deri kaşıntısı"],
    ["Rash", "Döküntü", "Deri döküntüsü"],
  ];
  return symptoms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Ek belirtiler
const generateExtraSymptoms = () => {
  const symptoms = [
    ["Urticaria", "Ürtiker", "Kurdeşen"],
    ["Petechiae", "Peteşi", "Nokta kanamalar"],
    ["Ecchymosis", "Ekimoz", "Morluk"],
    ["Purpura", "Purpura", "Mor lekeler"],
    ["Alopecia", "Alopesi", "Saç dökülmesi"],
    ["Hirsutism", "Hirsutizm", "Aşırı kıllanma"],
    ["Gynecomastia", "Jinekomasti", "Erkekte meme büyümesi"],
    ["Galactorrhea", "Galaktore", "Süt akıntısı"],
    ["Amenorrhea", "Amenore", "Adet görememe"],
    ["Dysmenorrhea", "Dismenore", "Ağrılı adet"],
    ["Menorrhagia", "Menoraji", "Aşırı adet kanaması"],
    ["Metrorrhagia", "Metroraji", "Düzensiz kanama"],
    ["Dyspareunia", "Disparoni", "Ağrılı cinsel ilişki"],
    ["Impotence", "İmpotans", "Ereksiyon bozukluğu"],
    ["Infertility", "İnfertilite", "Kısırlık"],
    ["Insomnia", "İnsomni", "Uykusuzluk"],
    ["Hypersomnia", "Hipersomni", "Aşırı uyuma"],
    ["Somnolence", "Somnolans", "Uyuklama"],
    ["Confusion", "Konfüzyon", "Bilinç bulanıklığı"],
    ["Delirium", "Deliryum", "Akut bilinç bozukluğu"],
  ];
  return symptoms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// İlaç formları
const generateDrugForms = () => {
  const forms = [
    ["Tablet", "Tablet", "Katı ilaç formu"],
    ["Capsule", "Kapsül", "Jelatin kaplı ilaç"],
    ["Syrup", "Şurup", "Sıvı ilaç formu"],
    ["Suspension", "Süspansiyon", "Askıda katı içeren sıvı"],
    ["Emulsion", "Emülsiyon", "Yağ-su karışımı"],
    ["Solution", "Solüsyon", "Çözelti"],
    ["Elixir", "Eliksir", "Alkollü şurup"],
    ["Tincture", "Tentür", "Alkollü bitki özütü"],
    ["Ointment", "Merhem", "Yağlı krem"],
    ["Cream", "Krem", "Yarı katı preparat"],
    ["Gel", "Jel", "Jelimsi preparat"],
    ["Lotion", "Losyon", "Sıvı deri preparatı"],
    ["Suppository", "Supozituvar", "Fitil"],
    ["Enema", "Lavman", "Rektal sıvı"],
    ["Inhaler", "İnhaler", "Solunum spreyi"],
    ["Nebule", "Nebül", "Nebülizatör solüsyonu"],
    ["Patch", "Yama", "Transdermal bant"],
    ["Implant", "İmplant", "Deri altı yerleştirme"],
    ["Injection", "Enjeksiyon", "İğne ile verilen ilaç"],
    ["Infusion", "İnfüzyon", "Damar içi sıvı"],
  ];
  return forms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Daha fazla ilaç formları
const generateMoreDrugForms = () => {
  const forms = [
    ["Eye drops", "Göz Damlası", "Oftalmik solüsyon"],
    ["Ear drops", "Kulak Damlası", "Otik solüsyon"],
    ["Nasal spray", "Burun Spreyi", "Nazal sprey"],
    ["Nasal drops", "Burun Damlası", "Nazal damla"],
    ["Mouthwash", "Gargara", "Ağız çalkalama solüsyonu"],
    ["Lozenge", "Pastil", "Emilen tablet"],
    ["Chewable tablet", "Çiğneme Tableti", "Çiğnenebilir tablet"],
    ["Effervescent tablet", "Efervesan Tablet", "Köpüren tablet"],
    ["Sublingual tablet", "Dilaltı Tablet", "Dil altı tablet"],
    ["Buccal tablet", "Bukkal Tablet", "Yanak içi tablet"],
    ["Enteric coated tablet", "Enterik Kaplı Tablet", "Bağırsak kaplı"],
    ["Extended release", "Uzatılmış Salım", "Yavaş salınan"],
    ["Immediate release", "Hızlı Salım", "Hemen salınan"],
    ["Modified release", "Modifiye Salım", "Değiştirilmiş salım"],
    ["Controlled release", "Kontrollü Salım", "Kontrollü salınan"],
    ["Sustained release", "Sürekli Salım", "Sürekli salınan"],
    ["Delayed release", "Gecikmeli Salım", "Geciktirilmiş salım"],
    ["Powder", "Toz", "Toz ilaç formu"],
    ["Granule", "Granül", "Tanecikli form"],
    ["Pellet", "Pelet", "Küçük topçuk"],
  ];
  return forms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Vitamin ve mineral kombinasyonları
const generateVitaminMineralCombos = () => {
  const vitamins = [
    ["Vitamin A palmitate", "A Vitamini Palmitat", "Retinol palmitat"],
    ["Vitamin A acetate", "A Vitamini Asetat", "Retinol asetat"],
    ["Beta carotene", "Beta Karoten", "Provitamin A"],
    ["Thiamine mononitrate", "Tiamin Mononitrat", "B1 vitamini tuzu"],
    ["Thiamine hydrochloride", "Tiamin Hidroklorür", "B1 vitamini tuzu"],
    ["Riboflavin phosphate", "Riboflavin Fosfat", "B2 vitamini aktif formu"],
    ["Niacinamide", "Nikotinamid", "B3 vitamini amid formu"],
    ["Nicotinic acid", "Nikotinik Asit", "B3 vitamini asit formu"],
    ["Calcium pantothenate", "Kalsiyum Pantotenat", "B5 vitamini tuzu"],
    ["Pyridoxine hydrochloride", "Piridoksin Hidroklorür", "B6 vitamini tuzu"],
    ["Pyridoxal phosphate", "Piridoksal Fosfat", "B6 vitamini aktif formu"],
    ["Biotin", "Biyotin", "B7 vitamini"],
    ["Folic acid", "Folik Asit", "B9 vitamini"],
    ["Methylfolate", "Metilfolat", "Aktif folat"],
    ["Cyanocobalamin", "Siyanokobalamin", "B12 vitamini"],
    ["Methylcobalamin", "Metilkobalamin", "Aktif B12"],
    ["Hydroxocobalamin", "Hidroksokobalamin", "B12 formu"],
    ["Ascorbic acid", "Askorbik Asit", "C vitamini"],
    ["Sodium ascorbate", "Sodyum Askorbat", "C vitamini tuzu"],
    ["Calcium ascorbate", "Kalsiyum Askorbat", "C vitamini tuzu"],
  ];
  return vitamins.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.VITAMIN, def)
  );
};

// Daha fazla vitamin formları
const generateMoreVitaminForms = () => {
  const vitamins = [
    ["Cholecalciferol", "Kolekalsiferol", "D3 vitamini"],
    ["Ergocalciferol", "Ergokalsiferol", "D2 vitamini"],
    ["Calcifediol", "Kalsifediol", "25-OH D vitamini"],
    ["Calcitriol", "Kalsitriol", "Aktif D vitamini"],
    ["Alpha tocopherol", "Alfa Tokoferol", "E vitamini"],
    ["Gamma tocopherol", "Gama Tokoferol", "E vitamini formu"],
    ["Mixed tocopherols", "Karışık Tokoferoller", "E vitamini karışımı"],
    ["Tocotrienols", "Tokotrienoller", "E vitamini ailesi"],
    ["Phylloquinone", "Fillokinon", "K1 vitamini"],
    ["Menaquinone-4", "Menakinon-4", "K2 vitamini MK-4"],
    ["Menaquinone-7", "Menakinon-7", "K2 vitamini MK-7"],
    ["Choline bitartrate", "Kolin Bitartrat", "Kolin tuzu"],
    ["Choline chloride", "Kolin Klorür", "Kolin tuzu"],
    ["Inositol", "İnositol", "B vitamini benzeri"],
    ["PABA", "PABA", "Para-aminobenzoik asit"],
    ["Coenzyme Q10", "Koenzim Q10", "Ubikinon"],
    ["Ubiquinol", "Ubikinol", "Aktif CoQ10"],
    ["Alpha lipoic acid", "Alfa Lipoik Asit", "Antioksidan"],
    ["R-lipoic acid", "R-Lipoik Asit", "Aktif lipoik asit"],
    ["Acetyl L-carnitine", "Asetil L-Karnitin", "Karnitin türevi"],
  ];
  return vitamins.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.VITAMIN, def)
  );
};

// Mineral formları
const generateMineralForms = () => {
  const minerals = [
    ["Calcium carbonate", "Kalsiyum Karbonat", "Kalsiyum tuzu"],
    ["Calcium citrate", "Kalsiyum Sitrat", "Kalsiyum tuzu"],
    ["Calcium gluconate", "Kalsiyum Glukonat", "Kalsiyum tuzu"],
    ["Calcium lactate", "Kalsiyum Laktat", "Kalsiyum tuzu"],
    ["Calcium phosphate", "Kalsiyum Fosfat", "Kalsiyum tuzu"],
    ["Magnesium oxide", "Magnezyum Oksit", "Magnezyum tuzu"],
    ["Magnesium citrate", "Magnezyum Sitrat", "Magnezyum tuzu"],
    ["Magnesium glycinate", "Magnezyum Glisinat", "Magnezyum tuzu"],
    ["Magnesium taurate", "Magnezyum Taurat", "Magnezyum tuzu"],
    ["Magnesium malate", "Magnezyum Malat", "Magnezyum tuzu"],
    ["Magnesium threonate", "Magnezyum Treonat", "Magnezyum tuzu"],
    ["Zinc sulfate", "Çinko Sülfat", "Çinko tuzu"],
    ["Zinc gluconate", "Çinko Glukonat", "Çinko tuzu"],
    ["Zinc picolinate", "Çinko Pikolinat", "Çinko tuzu"],
    ["Zinc citrate", "Çinko Sitrat", "Çinko tuzu"],
    ["Zinc acetate", "Çinko Asetat", "Çinko tuzu"],
    ["Iron sulfate", "Demir Sülfat", "Demir tuzu"],
    ["Iron gluconate", "Demir Glukonat", "Demir tuzu"],
    ["Iron fumarate", "Demir Fumarat", "Demir tuzu"],
    ["Iron bisglycinate", "Demir Bisglinat", "Demir tuzu"],
  ];
  return minerals.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.MINERAL, def)
  );
};

// Daha fazla mineral formları
const generateMoreMineralForms = () => {
  const minerals = [
    ["Potassium chloride", "Potasyum Klorür", "Potasyum tuzu"],
    ["Potassium citrate", "Potasyum Sitrat", "Potasyum tuzu"],
    ["Potassium gluconate", "Potasyum Glukonat", "Potasyum tuzu"],
    ["Sodium chloride", "Sodyum Klorür", "Tuz"],
    ["Sodium bicarbonate", "Sodyum Bikarbonat", "Karbonat"],
    ["Selenium selenite", "Selenyum Selenit", "Selenyum tuzu"],
    ["Selenium methionine", "Selenyum Metiyonin", "Organik selenyum"],
    ["Chromium picolinate", "Krom Pikolinat", "Krom tuzu"],
    ["Chromium polynicotinate", "Krom Polinikotinat", "Krom tuzu"],
    ["Manganese sulfate", "Manganez Sülfat", "Manganez tuzu"],
    ["Manganese gluconate", "Manganez Glukonat", "Manganez tuzu"],
    ["Copper sulfate", "Bakır Sülfat", "Bakır tuzu"],
    ["Copper gluconate", "Bakır Glukonat", "Bakır tuzu"],
    ["Molybdenum", "Molibden", "Eser element"],
    ["Iodine", "İyot", "Tiroid için gerekli"],
    ["Potassium iodide", "Potasyum İyodür", "İyot tuzu"],
    ["Boron", "Bor", "Eser element"],
    ["Silicon", "Silikon", "Eser element"],
    ["Vanadium", "Vanadyum", "Eser element"],
    ["Strontium", "Stronsiyum", "Kemik minerali"],
  ];
  return minerals.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.MINERAL, def)
  );
};

// Tıbbi terimler - Tanı yöntemleri
const generateDiagnosticMethods = () => {
  const methods = [
    ["Auscultation", "Oskültasyon", "Dinleme muayenesi"],
    ["Palpation", "Palpasyon", "Elle muayene"],
    ["Percussion", "Perküsyon", "Vurma muayenesi"],
    ["Inspection", "İnspeksiyon", "Gözle muayene"],
    ["Biopsy", "Biyopsi", "Doku örneği alma"],
    ["Aspiration", "Aspirasyon", "Sıvı çekme"],
    ["Puncture", "Ponksiyon", "İğne ile girme"],
    ["Lumbar puncture", "Lomber Ponksiyon", "Bel ponksiyonu"],
    ["Thoracentesis", "Torasentez", "Göğüs sıvısı alma"],
    ["Paracentesis", "Parasentez", "Karın sıvısı alma"],
    ["Arthrocentesis", "Artrosentez", "Eklem sıvısı alma"],
    ["Amniocentesis", "Amniyosentez", "Amniyotik sıvı alma"],
    ["Cordocentesis", "Kordosentez", "Kordon kanı alma"],
    ["Bone marrow biopsy", "Kemik İliği Biyopsisi", "İlik örneği alma"],
    ["Skin biopsy", "Deri Biyopsisi", "Deri örneği alma"],
    ["Liver biopsy", "Karaciğer Biyopsisi", "Karaciğer örneği"],
    ["Kidney biopsy", "Böbrek Biyopsisi", "Böbrek örneği"],
    ["Lung biopsy", "Akciğer Biyopsisi", "Akciğer örneği"],
    ["Lymph node biopsy", "Lenf Nodu Biyopsisi", "Lenf bezi örneği"],
    ["Muscle biopsy", "Kas Biyopsisi", "Kas örneği"],
  ];
  return methods.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Görüntüleme yöntemleri
const generateImagingMethods = () => {
  const methods = [
    ["Plain radiography", "Düz Radyografi", "Basit röntgen"],
    ["Contrast radiography", "Kontrastlı Radyografi", "Boyalı röntgen"],
    ["Fluoroscopy", "Floroskopi", "Canlı röntgen"],
    ["Computed tomography", "Bilgisayarlı Tomografi", "BT tarama"],
    ["CT angiography", "BT Anjiyografi", "Damar BT"],
    ["CT urography", "BT Ürografi", "İdrar yolu BT"],
    ["CT colonography", "BT Kolonografi", "Sanal kolonoskopi"],
    ["Magnetic resonance imaging", "Manyetik Rezonans", "MR görüntüleme"],
    ["MR angiography", "MR Anjiyografi", "Damar MR"],
    ["MR spectroscopy", "MR Spektroskopi", "Kimyasal MR"],
    ["Functional MRI", "Fonksiyonel MR", "Beyin aktivite MR"],
    ["Diffusion MRI", "Difüzyon MR", "Su hareketi MR"],
    ["Ultrasonography", "Ultrasonografi", "Ses dalgası görüntüleme"],
    ["Doppler ultrasound", "Doppler Ultrason", "Akım ölçen ultrason"],
    ["Echocardiography", "Ekokardiyografi", "Kalp ultrasonu"],
    ["Transesophageal echo", "Transözofageal Eko", "Yemek borusu ultrasonu"],
    ["Nuclear medicine", "Nükleer Tıp", "Radyoaktif görüntüleme"],
    ["Bone scintigraphy", "Kemik Sintigrafisi", "Kemik taraması"],
    ["Thyroid scintigraphy", "Tiroid Sintigrafisi", "Tiroid taraması"],
    ["Myocardial perfusion", "Miyokard Perfüzyon", "Kalp kan akımı taraması"],
  ];
  return methods.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Laboratuvar testleri
const generateLabTests = () => {
  const tests = [
    ["Complete blood count", "Tam Kan Sayımı", "Hemogram"],
    ["Peripheral blood smear", "Periferik Yayma", "Kan yayması"],
    ["Reticulocyte count", "Retikülosit Sayımı", "Genç eritrosit sayısı"],
    ["Erythrocyte sedimentation rate", "Eritrosit Sedimentasyon Hızı", "ESR"],
    ["C-reactive protein", "C-Reaktif Protein", "CRP"],
    ["Procalcitonin", "Prokalsitonin", "Enfeksiyon belirteci"],
    ["Blood culture", "Kan Kültürü", "Kan mikrop üretimi"],
    ["Urine culture", "İdrar Kültürü", "İdrar mikrop üretimi"],
    ["Sputum culture", "Balgam Kültürü", "Balgam mikrop üretimi"],
    ["Stool culture", "Gaita Kültürü", "Dışkı mikrop üretimi"],
    ["Wound culture", "Yara Kültürü", "Yara mikrop üretimi"],
    ["Throat culture", "Boğaz Kültürü", "Boğaz mikrop üretimi"],
    ["Cerebrospinal fluid analysis", "BOS Analizi", "Beyin omurilik sıvısı"],
    ["Synovial fluid analysis", "Sinoviyal Sıvı Analizi", "Eklem sıvısı"],
    ["Pleural fluid analysis", "Plevral Sıvı Analizi", "Akciğer zarı sıvısı"],
    ["Ascitic fluid analysis", "Asit Sıvısı Analizi", "Karın sıvısı"],
    ["Urinalysis", "İdrar Tahlili", "İdrar analizi"],
    ["Urine microscopy", "İdrar Mikroskopisi", "İdrar sedimenti"],
    ["Stool examination", "Gaita Muayenesi", "Dışkı incelemesi"],
    ["Occult blood test", "Gizli Kan Testi", "Dışkıda gizli kan"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Biyokimya testleri
const generateBiochemistryTests = () => {
  const tests = [
    ["Liver function tests", "Karaciğer Fonksiyon Testleri", "KC testleri"],
    ["Renal function tests", "Böbrek Fonksiyon Testleri", "Böbrek testleri"],
    ["Lipid profile", "Lipid Profili", "Yağ testleri"],
    ["Thyroid function tests", "Tiroid Fonksiyon Testleri", "Tiroid testleri"],
    ["Cardiac enzymes", "Kardiyak Enzimler", "Kalp enzimleri"],
    ["Troponin", "Troponin", "Kalp hasarı belirteci"],
    ["BNP", "BNP", "Kalp yetmezliği belirteci"],
    ["D-dimer", "D-Dimer", "Pıhtı belirteci"],
    ["Fibrinogen", "Fibrinojen", "Pıhtılaşma proteini"],
    ["PT INR", "PT INR", "Pıhtılaşma zamanı"],
    ["aPTT", "aPTT", "Aktive parsiyel tromboplastin zamanı"],
    ["Bleeding time", "Kanama Zamanı", "Kanama süresi"],
    ["Clotting time", "Pıhtılaşma Zamanı", "Pıhtı oluşum süresi"],
    ["Blood gas analysis", "Kan Gazı Analizi", "Arter kan gazı"],
    ["Electrolyte panel", "Elektrolit Paneli", "İyon testleri"],
    ["Glucose tolerance test", "Glukoz Tolerans Testi", "Şeker yükleme"],
    ["HbA1c", "HbA1c", "Glikozile hemoglobin"],
    ["Insulin level", "İnsülin Düzeyi", "Kan insülini"],
    ["C-peptide", "C-Peptid", "İnsülin üretim belirteci"],
    ["Cortisol", "Kortizol", "Stres hormonu"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Hormon testleri
const generateHormoneTests = () => {
  const tests = [
    ["TSH", "TSH", "Tiroid uyarıcı hormon"],
    ["Free T4", "Serbest T4", "Serbest tiroksin"],
    ["Free T3", "Serbest T3", "Serbest triiyodotironin"],
    ["Anti-TPO", "Anti-TPO", "Tiroid peroksidaz antikoru"],
    ["Thyroglobulin", "Tiroglobulin", "Tiroid proteini"],
    ["FSH", "FSH", "Folikül uyarıcı hormon"],
    ["LH", "LH", "Luteinize edici hormon"],
    ["Estradiol", "Estradiol", "Östrojen"],
    ["Progesterone", "Progesteron", "Gebelik hormonu"],
    ["Testosterone", "Testosteron", "Erkeklik hormonu"],
    ["DHEA-S", "DHEA-S", "Adrenal androjen"],
    ["Prolactin", "Prolaktin", "Süt hormonu"],
    ["Growth hormone", "Büyüme Hormonu", "GH"],
    ["IGF-1", "IGF-1", "İnsülin benzeri büyüme faktörü"],
    ["ACTH", "ACTH", "Adrenokortikotropik hormon"],
    ["Aldosterone", "Aldosteron", "Tuz hormonu"],
    ["Renin", "Renin", "Böbrek enzimi"],
    ["PTH", "PTH", "Paratiroid hormonu"],
    ["Calcitonin", "Kalsitonin", "Kalsiyum düşürücü hormon"],
    ["Vitamin D 25-OH", "25-OH D Vitamini", "D vitamini düzeyi"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tümör belirteçleri
const generateTumorMarkers = () => {
  const markers = [
    ["AFP", "AFP", "Alfa fetoprotein"],
    ["CEA", "CEA", "Karsinoembriyonik antijen"],
    ["CA 19-9", "CA 19-9", "Pankreas tümör belirteci"],
    ["CA 125", "CA 125", "Over tümör belirteci"],
    ["CA 15-3", "CA 15-3", "Meme tümör belirteci"],
    ["PSA", "PSA", "Prostat spesifik antijen"],
    ["Free PSA", "Serbest PSA", "Serbest prostat antijeni"],
    ["Beta-HCG", "Beta-HCG", "Gebelik hormonu"],
    ["LDH", "LDH", "Laktat dehidrojenaz"],
    ["NSE", "NSE", "Nöron spesifik enolaz"],
    ["Chromogranin A", "Kromogranin A", "Nöroendokrin belirteç"],
    ["Calcitonin", "Kalsitonin", "Tiroid medüller ca belirteci"],
    ["Thyroglobulin", "Tiroglobulin", "Tiroid ca takip belirteci"],
    ["S-100", "S-100", "Melanom belirteci"],
    ["HE4", "HE4", "Over ca belirteci"],
    ["ROMA index", "ROMA İndeksi", "Over ca risk değerlendirmesi"],
    ["PIVKA-II", "PIVKA-II", "Hepatosellüler ca belirteci"],
    ["Cyfra 21-1", "Cyfra 21-1", "Akciğer ca belirteci"],
    ["SCC", "SCC", "Skuamöz hücreli ca antijeni"],
    ["Beta-2 microglobulin", "Beta-2 Mikroglobulin", "Lenfoma belirteci"],
  ];
  return markers.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Otoimmün testler
const generateAutoimmunTests = () => {
  const tests = [
    ["ANA", "ANA", "Antinükleer antikor"],
    ["Anti-dsDNA", "Anti-dsDNA", "Çift sarmallı DNA antikoru"],
    ["Anti-Smith", "Anti-Smith", "Smith antikoru"],
    ["Anti-RNP", "Anti-RNP", "Ribonükleoprotein antikoru"],
    ["Anti-SSA", "Anti-SSA", "Ro antikoru"],
    ["Anti-SSB", "Anti-SSB", "La antikoru"],
    ["Anti-Scl-70", "Anti-Scl-70", "Skleroderma antikoru"],
    ["Anti-centromere", "Anti-Sentromer", "Sentromer antikoru"],
    ["Anti-Jo-1", "Anti-Jo-1", "Miyozit antikoru"],
    ["ANCA", "ANCA", "Antinötrofil sitoplazmik antikor"],
    ["c-ANCA", "c-ANCA", "Sitoplazmik ANCA"],
    ["p-ANCA", "p-ANCA", "Perinükleer ANCA"],
    ["Anti-CCP", "Anti-CCP", "Siklik sitrüline peptid antikoru"],
    ["Rheumatoid factor", "Romatoid Faktör", "RF"],
    ["Anti-GBM", "Anti-GBM", "Glomerüler bazal membran antikoru"],
    ["Anti-phospholipid", "Antifosfolipid", "Fosfolipid antikorları"],
    ["Lupus anticoagulant", "Lupus Antikoagülanı", "LA"],
    ["Anti-cardiolipin", "Anti-Kardiyolipin", "Kardiyolipin antikoru"],
    ["Anti-beta2 glycoprotein", "Anti-Beta2 Glikoprotein", "B2GP1 antikoru"],
    ["Complement C3 C4", "Kompleman C3 C4", "Kompleman düzeyleri"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Enfeksiyon testleri
const generateInfectionTests = () => {
  const tests = [
    ["HIV antibody", "HIV Antikoru", "AIDS testi"],
    ["HIV RNA PCR", "HIV RNA PCR", "HIV viral yük"],
    ["HBsAg", "HBsAg", "Hepatit B yüzey antijeni"],
    ["Anti-HBs", "Anti-HBs", "Hepatit B yüzey antikoru"],
    ["Anti-HBc", "Anti-HBc", "Hepatit B kor antikoru"],
    ["HBeAg", "HBeAg", "Hepatit B e antijeni"],
    ["HBV DNA", "HBV DNA", "Hepatit B viral yük"],
    ["Anti-HCV", "Anti-HCV", "Hepatit C antikoru"],
    ["HCV RNA", "HCV RNA", "Hepatit C viral yük"],
    ["Anti-HAV IgM", "Anti-HAV IgM", "Akut hepatit A"],
    ["Anti-HAV IgG", "Anti-HAV IgG", "Hepatit A bağışıklığı"],
    ["CMV IgM IgG", "CMV IgM IgG", "Sitomegalovirüs antikorları"],
    ["EBV panel", "EBV Paneli", "Epstein-Barr virüs testleri"],
    ["Toxoplasma IgM IgG", "Toxoplasma IgM IgG", "Toksoplazmoz antikorları"],
    ["Rubella IgM IgG", "Rubella IgM IgG", "Kızamıkçık antikorları"],
    ["HSV IgM IgG", "HSV IgM IgG", "Herpes antikorları"],
    ["VZV IgM IgG", "VZV IgM IgG", "Suçiçeği antikorları"],
    ["VDRL RPR", "VDRL RPR", "Sifiliz tarama testi"],
    ["FTA-ABS", "FTA-ABS", "Sifiliz doğrulama testi"],
    ["Mantoux test", "Mantoux Testi", "Tüberküloz deri testi"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Genetik testler
const generateGeneticTests = () => {
  const tests = [
    ["Karyotype", "Karyotip", "Kromozom analizi"],
    ["FISH", "FISH", "Floresan in situ hibridizasyon"],
    ["PCR", "PCR", "Polimeraz zincir reaksiyonu"],
    ["RT-PCR", "RT-PCR", "Gerçek zamanlı PCR"],
    ["DNA sequencing", "DNA Dizileme", "Gen dizileme"],
    ["Next generation sequencing", "Yeni Nesil Dizileme", "NGS"],
    ["Whole exome sequencing", "Tüm Ekzom Dizileme", "WES"],
    ["Whole genome sequencing", "Tüm Genom Dizileme", "WGS"],
    ["Microarray", "Mikroarray", "Gen çip analizi"],
    ["CGH array", "CGH Array", "Karşılaştırmalı genomik hibridizasyon"],
    ["SNP array", "SNP Array", "Tek nükleotid polimorfizm analizi"],
    ["Methylation analysis", "Metilasyon Analizi", "Epigenetik test"],
    ["Gene panel", "Gen Paneli", "Hedefli gen analizi"],
    ["Carrier screening", "Taşıyıcı Taraması", "Genetik taşıyıcılık testi"],
    ["Prenatal screening", "Prenatal Tarama", "Doğum öncesi tarama"],
    ["NIPT", "NIPT", "İnvaziv olmayan prenatal test"],
    [
      "Amniocentesis genetics",
      "Amniyosentez Genetik",
      "Amniyotik sıvı genetik",
    ],
    ["CVS genetics", "CVS Genetik", "Koryon villus genetik"],
    ["Newborn screening", "Yenidoğan Taraması", "Topuk kanı testi"],
    ["Pharmacogenomics", "Farmakogenomik", "İlaç genetiği"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Daha fazla bitkiler - Şifalı otlar
const generateHerbalPlants = () => {
  const plants = [
    ["Achillea millefolium", "Civanperçemi", "Yara iyileştirici, sindirim"],
    ["Acorus calamus", "Eğir Otu", "Sindirim, hafıza"],
    ["Adhatoda vasica", "Adhatoda", "Öksürük, bronşit"],
    ["Aegle marmelos", "Bael", "Sindirim, ishal"],
    ["Aframomum melegueta", "Cennet Tanesi", "Sindirim, afrodizyak"],
    ["Agathosma betulina", "Buchu", "Diüretik, idrar yolu"],
    ["Ageratum conyzoides", "Keçi Otu", "Yara, ateş düşürücü"],
    ["Ailanthus altissima", "Cennet Ağacı", "Antiparaziter"],
    ["Albizia lebbeck", "Gülibrişim", "Alerji, astım"],
    ["Aloe ferox", "Acı Aloe", "Laksatif, deri"],
    ["Alpinia galanga", "Galangal", "Sindirim, antiinflamatuvar"],
    ["Althaea rosea", "Hatmi Çiçeği", "Solunum, deri"],
    ["Ammi majus", "Diş Otu", "Vitiligo, sedef"],
    ["Ammi visnaga", "Hıltan", "Astım, böbrek taşı"],
    ["Anacyclus pyrethrum", "Akarkara", "Diş ağrısı, afrodizyak"],
    ["Andrographis paniculata", "Andrographis", "Bağışıklık, karaciğer"],
    ["Anethum graveolens", "Dereotu", "Sindirim, gaz giderici"],
    ["Angelica sinensis", "Dong Quai", "Kadın sağlığı, kan"],
    ["Annona muricata", "Graviola", "Antikanser, bağışıklık"],
    ["Apium graveolens", "Kereviz", "Diüretik, tansiyon"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Daha fazla şifalı bitkiler
const generateMoreHerbalPlants = () => {
  const plants = [
    ["Aralia racemosa", "Amerikan Sarmaşığı", "Solunum, öksürük"],
    ["Argemone mexicana", "Meksika Haşhaşı", "Deri, göz"],
    ["Aristolochia serpentaria", "Virginia Yılan Otu", "Ateş, sindirim"],
    ["Armoracia rusticana", "Bayır Turpu", "Sinüzit, sindirim"],
    ["Arnica montana", "Arnika", "Çürük, kas ağrısı"],
    ["Artemisia dracunculus", "Tarhun", "Sindirim, iştah"],
    ["Artemisia vulgaris", "Yavşan Otu", "Kadın sağlığı, sindirim"],
    ["Asarum europaeum", "Asarum", "Kusturucu, solunum"],
    ["Asclepias tuberosa", "Kelebek Otu", "Solunum, ateş"],
    ["Asparagus racemosus", "Shatavari", "Kadın sağlığı, sindirim"],
    ["Astragalus propinquus", "Huang Qi", "Bağışıklık, enerji"],
    ["Atropa belladonna", "Belladonna", "Antikolinerjik, zehirli"],
    ["Azadirachta indica", "Neem", "Antimikrobiyal, deri"],
    ["Bacopa monnieri", "Brahmi", "Hafıza, anksiyete"],
    ["Ballota nigra", "Kara Ballıbaba", "Sakinleştirici, bulantı"],
    ["Baptisia tinctoria", "Yabani Çivit", "Bağışıklık, enfeksiyon"],
    ["Berberis aquifolium", "Oregon Üzümü", "Deri, sindirim"],
    ["Bidens pilosa", "Şeytan İğnesi", "Antiinflamatuvar, diyabet"],
    ["Bixa orellana", "Annatto", "Antioksidan, deri"],
    ["Boerhavia diffusa", "Punarnava", "Diüretik, karaciğer"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Ek şifalı bitkiler
const generateExtraHerbalPlants = () => {
  const plants = [
    ["Boswellia serrata", "Hint Günlüğü", "Antiinflamatuvar, eklem"],
    ["Brassica nigra", "Siyah Hardal", "Solunum, kas ağrısı"],
    ["Bryonia alba", "Beyaz Asma", "Romatizma, öksürük"],
    ["Bupleurum chinense", "Chai Hu", "Karaciğer, ateş"],
    ["Butea monosperma", "Palash", "Parazit, deri"],
    ["Caesalpinia bonduc", "Karanjwa", "Ateş, sıtma"],
    ["Calotropis gigantea", "Dev Akasya", "Deri, solunum"],
    ["Camellia sinensis", "Çay Bitkisi", "Antioksidan, enerji"],
    ["Cananga odorata", "Ylang Ylang", "Sakinleştirici, cilt"],
    ["Cannabis sativa", "Kenevir", "Ağrı, epilepsi"],
    ["Capparis spinosa", "Kapari", "Antiinflamatuvar, sindirim"],
    ["Carica papaya", "Papaya", "Sindirim, parazit"],
    ["Carthamus tinctorius", "Aspir", "Kan dolaşımı, kadın sağlığı"],
    ["Carum copticum", "Ajwain", "Sindirim, gaz"],
    ["Caryophyllus aromaticus", "Karanfil", "Diş ağrısı, antimikrobiyal"],
    ["Cassia fistula", "Altın Yağmur", "Laksatif, deri"],
    ["Catharanthus roseus", "Madagaskar Periwinkle", "Antikanser"],
    ["Caulophyllum thalictroides", "Mavi Cohosh", "Doğum, kadın sağlığı"],
    ["Cedrus deodara", "Himalaya Sediri", "Solunum, deri"],
    ["Centaurea cyanus", "Peygamber Çiçeği", "Göz, sindirim"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Son şifalı bitkiler
const generateFinalHerbalPlants = () => {
  const plants = [
    ["Centella asiatica", "Gotu Kola", "Hafıza, yara iyileştirme"],
    ["Cephaelis ipecacuanha", "İpeka", "Kusturucu, ekspektoran"],
    ["Chamaemelum nobile", "Roma Papatyası", "Sakinleştirici, sindirim"],
    ["Chionanthus virginicus", "Saçak Ağacı", "Karaciğer, safra"],
    ["Chrysanthemum morifolium", "Krizantem", "Göz, baş ağrısı"],
    ["Cimicifuga racemosa", "Siyah Cohosh", "Menopoz, kadın sağlığı"],
    ["Cinchona officinalis", "Kınakına", "Sıtma, ateş"],
    ["Cinnamomum camphora", "Kafur Ağacı", "Solunum, kas ağrısı"],
    ["Cistus incanus", "Laden", "Bağışıklık, antioksidan"],
    ["Citrus aurantium", "Acı Portakal", "Sindirim, anksiyete"],
    ["Clematis vitalba", "Akasma", "Romatizma, deri"],
    ["Cnidium monnieri", "She Chuang Zi", "Deri, afrodizyak"],
    ["Codonopsis pilosula", "Dang Shen", "Enerji, bağışıklık"],
    ["Coffea arabica", "Kahve", "Uyarıcı, antioksidan"],
    ["Cola nitida", "Kola Fıstığı", "Uyarıcı, sindirim"],
    ["Coleus forskohlii", "Coleus", "Kilo, kalp"],
    ["Collinsonia canadensis", "Taş Kökü", "Hemoroid, sindirim"],
    ["Commiphora mukul", "Guggul", "Kolesterol, eklem"],
    ["Coptis chinensis", "Huang Lian", "Antimikrobiyal, sindirim"],
    ["Cordia dichotoma", "Lasura", "Solunum, sindirim"],
  ];
  return plants.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.PLANT, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 SON BATCH - 10,000 HEDEFİ İÇİN TERİM YÜKLEME");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const diseaseSubtypes = generateDiseaseSubtypes();
  const procedureVariants = generateProcedureVariants();
  const severityVariants = generateSeverityVariants();
  const labFindings = generateLabFindings();
  const pharmacologyTerms = generatePharmacologyTerms();
  const medicalEquipment = generateMedicalEquipment();
  const moreEquipment = generateMoreEquipment();
  const surgicalInstruments = generateSurgicalInstruments();
  const moreSurgicalInstruments = generateMoreSurgicalInstruments();
  const symptoms = generateSymptoms();
  const moreSymptoms = generateMoreSymptoms();
  const extraSymptoms = generateExtraSymptoms();
  const drugForms = generateDrugForms();
  const moreDrugForms = generateMoreDrugForms();
  const vitaminMineralCombos = generateVitaminMineralCombos();
  const moreVitaminForms = generateMoreVitaminForms();
  const mineralForms = generateMineralForms();
  const moreMineralForms = generateMoreMineralForms();
  const diagnosticMethods = generateDiagnosticMethods();
  const imagingMethods = generateImagingMethods();

  const labTests = generateLabTests();
  const biochemistryTests = generateBiochemistryTests();
  const hormoneTests = generateHormoneTests();
  const tumorMarkers = generateTumorMarkers();
  const autoimmunTests = generateAutoimmunTests();
  const infectionTests = generateInfectionTests();
  const geneticTests = generateGeneticTests();
  const herbalPlants = generateHerbalPlants();
  const moreHerbalPlants = generateMoreHerbalPlants();
  const extraHerbalPlants = generateExtraHerbalPlants();
  const finalHerbalPlants = generateFinalHerbalPlants();

  const allTerms = [
    ...diseaseSubtypes,
    ...procedureVariants,
    ...severityVariants,
    ...labFindings,
    ...pharmacologyTerms,
    ...medicalEquipment,
    ...moreEquipment,
    ...surgicalInstruments,
    ...moreSurgicalInstruments,
    ...symptoms,
    ...moreSymptoms,
    ...extraSymptoms,
    ...drugForms,
    ...moreDrugForms,
    ...vitaminMineralCombos,
    ...moreVitaminForms,
    ...mineralForms,
    ...moreMineralForms,
    ...diagnosticMethods,
    ...imagingMethods,
    ...labTests,
    ...biochemistryTests,
    ...hormoneTests,
    ...tumorMarkers,
    ...autoimmunTests,
    ...infectionTests,
    ...geneticTests,
    ...herbalPlants,
    ...moreHerbalPlants,
    ...extraHerbalPlants,
    ...finalHerbalPlants,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(`   Hastalık Alt Tipleri: ${diseaseSubtypes.length}`);
  console.log(`   İşlem Varyantları: ${procedureVariants.length}`);
  console.log(`   Şiddet Varyantları: ${severityVariants.length}`);
  console.log(`   Lab Bulguları: ${labFindings.length}`);
  console.log(`   Farmakoloji: ${pharmacologyTerms.length}`);
  console.log(
    `   Tıbbi Cihazlar: ${medicalEquipment.length + moreEquipment.length}`
  );
  console.log(
    `   Cerrahi Aletler: ${
      surgicalInstruments.length + moreSurgicalInstruments.length
    }`
  );
  console.log(
    `   Belirtiler: ${
      symptoms.length + moreSymptoms.length + extraSymptoms.length
    }`
  );
  console.log(`   İlaç Formları: ${drugForms.length + moreDrugForms.length}`);
  console.log(
    `   Vitamin Formları: ${
      vitaminMineralCombos.length + moreVitaminForms.length
    }`
  );
  console.log(
    `   Mineral Formları: ${mineralForms.length + moreMineralForms.length}`
  );
  console.log(
    `   Tanı Yöntemleri: ${diagnosticMethods.length + imagingMethods.length}`
  );
  console.log(`   Lab Testleri: ${labTests.length + biochemistryTests.length}`);
  console.log(`   Hormon Testleri: ${hormoneTests.length}`);
  console.log(`   Tümör Belirteçleri: ${tumorMarkers.length}`);
  console.log(`   Otoimmün Testler: ${autoimmunTests.length}`);
  console.log(`   Enfeksiyon Testleri: ${infectionTests.length}`);
  console.log(`   Genetik Testler: ${geneticTests.length}`);
  console.log(
    `   Şifalı Bitkiler: ${
      herbalPlants.length +
      moreHerbalPlants.length +
      extraHerbalPlants.length +
      finalHerbalPlants.length
    }`
  );
  console.log(`   ─────────────────────────────`);
  console.log(`   TOPLAM: ${allTerms.length} terim\n`);

  console.log("🔍 Mevcut terimler kontrol ediliyor...");
  const termsRef = collection(db, "terms");
  const existingSnapshot = await getDocs(termsRef);
  const existingTerms = new Set();

  existingSnapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (data.latinName) existingTerms.add(data.latinName.toLowerCase());
    if (data.turkishName) existingTerms.add(data.turkishName.toLowerCase());
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

  console.log("\n" + "═".repeat(60));
  console.log("📊 YÜKLEME TAMAMLANDI");
  console.log("═".repeat(60));
  console.log(`   Önceki terim sayısı: ${existingSnapshot.size}`);
  console.log(`   Yeni eklenen: ${uploadedCount}`);
  console.log(
    `   Toplam terim sayısı: ${existingSnapshot.size + uploadedCount}`
  );
  console.log("═".repeat(60) + "\n");

  process.exit(0);
}

main().catch((error) => {
  console.error("❌ Hata:", error);
  process.exit(1);
});
