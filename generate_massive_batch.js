// Massive batch - 10,000 hedefi için büyük terim seti
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

// Programatik terim üretimi - Hastalık kombinasyonları
const generateDiseaseVariants = () => {
  const organs = [
    ["Hepatic", "Hepatik", "Karaciğer"],
    ["Renal", "Renal", "Böbrek"],
    ["Cardiac", "Kardiyak", "Kalp"],
    ["Pulmonary", "Pulmoner", "Akciğer"],
    ["Cerebral", "Serebral", "Beyin"],
    ["Gastric", "Gastrik", "Mide"],
    ["Intestinal", "İntestinal", "Bağırsak"],
    ["Pancreatic", "Pankreatik", "Pankreas"],
    ["Splenic", "Splenik", "Dalak"],
    ["Thyroid", "Tiroid", "Tiroid"],
    ["Adrenal", "Adrenal", "Böbrek üstü"],
    ["Prostatic", "Prostatik", "Prostat"],
    ["Ovarian", "Ovariyan", "Over"],
    ["Uterine", "Uterin", "Rahim"],
    ["Mammary", "Mamer", "Meme"],
    ["Dermal", "Dermal", "Deri"],
    ["Osseous", "Osseöz", "Kemik"],
    ["Articular", "Artiküler", "Eklem"],
    ["Muscular", "Müsküler", "Kas"],
    ["Neural", "Nöral", "Sinir"],
  ];

  const conditions = [
    ["failure", "yetmezliği", "Fonksiyon kaybı"],
    ["insufficiency", "yetersizliği", "Yetersiz fonksiyon"],
    ["dysfunction", "disfonksiyonu", "Bozuk fonksiyon"],
    ["disease", "hastalığı", "Patolojik durum"],
    ["disorder", "bozukluğu", "Düzensizlik"],
    ["syndrome", "sendromu", "Belirti kompleksi"],
    ["injury", "yaralanması", "Hasar"],
    ["trauma", "travması", "Fiziksel hasar"],
    ["infection", "enfeksiyonu", "Mikrobik hastalık"],
    ["inflammation", "iltihabı", "İnflamasyon"],
  ];

  const terms = [];
  organs.forEach(([orgEn, orgTr, orgDef]) => {
    conditions.forEach(([condEn, condTr, condDef]) => {
      terms.push(
        createTerm(
          `${orgEn} ${condEn}`,
          `${orgTr} ${condTr}`,
          TermCategory.DISEASE,
          `${orgDef} ${condDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Tıbbi işlem kombinasyonları
const generateProcedureVariants = () => {
  const organs = [
    ["Hepat", "Hepat", "Karaciğer"],
    ["Nephr", "Nefr", "Böbrek"],
    ["Cardi", "Kardi", "Kalp"],
    ["Pneum", "Pnöm", "Akciğer"],
    ["Gastr", "Gastr", "Mide"],
    ["Enter", "Enter", "Bağırsak"],
    ["Col", "Kol", "Kolon"],
    ["Cyst", "Sist", "Mesane"],
    ["Prostat", "Prostat", "Prostat"],
    ["Hyster", "Hister", "Rahim"],
    ["Oophor", "Oofor", "Over"],
    ["Mast", "Mast", "Meme"],
    ["Thyroid", "Tiroid", "Tiroid"],
    ["Splen", "Splen", "Dalak"],
    ["Cholecyst", "Kolesist", "Safra kesesi"],
    ["Appendic", "Apendik", "Apendiks"],
    ["Tonsill", "Tonsil", "Bademcik"],
    ["Adenoid", "Adenoid", "Geniz eti"],
    ["Laryng", "Larenj", "Gırtlak"],
    ["Trache", "Trake", "Nefes borusu"],
  ];

  const procedures = [
    ["ectomy", "ektomi", "Çıkarma ameliyatı"],
    ["otomy", "otomi", "Kesme ameliyatı"],
    ["ostomy", "ostomi", "Ağız açma ameliyatı"],
    ["plasty", "plasti", "Onarım ameliyatı"],
    ["pexy", "peksi", "Sabitleme ameliyatı"],
    ["scopy", "skopi", "Görüntüleme işlemi"],
    ["graphy", "grafi", "Görüntüleme yöntemi"],
    ["centesis", "sentez", "Delme işlemi"],
  ];

  const terms = [];
  organs.forEach(([orgEn, orgTr, orgDef]) => {
    procedures.forEach(([procEn, procTr, procDef]) => {
      terms.push(
        createTerm(
          `${orgEn}${procEn}`,
          `${orgTr}${procTr}`,
          TermCategory.COMPONENT,
          `${orgDef} ${procDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Laboratuvar değerleri
const generateLabValues = () => {
  const tests = [
    ["Serum sodium level", "Serum Sodyum Düzeyi", "Na, elektrolit"],
    ["Serum potassium level", "Serum Potasyum Düzeyi", "K, elektrolit"],
    ["Serum chloride level", "Serum Klorür Düzeyi", "Cl, elektrolit"],
    ["Serum bicarbonate level", "Serum Bikarbonat Düzeyi", "HCO3, asit-baz"],
    ["Serum calcium level", "Serum Kalsiyum Düzeyi", "Ca, mineral"],
    ["Serum phosphorus level", "Serum Fosfor Düzeyi", "P, mineral"],
    ["Serum magnesium level", "Serum Magnezyum Düzeyi", "Mg, mineral"],
    ["Serum iron level", "Serum Demir Düzeyi", "Fe, mineral"],
    ["Serum ferritin level", "Serum Ferritin Düzeyi", "Demir deposu"],
    ["Total iron binding capacity", "Total Demir Bağlama Kapasitesi", "TIBC"],
    ["Transferrin saturation", "Transferrin Satürasyonu", "TSAT"],
    ["Serum copper level", "Serum Bakır Düzeyi", "Cu, mineral"],
    ["Serum zinc level", "Serum Çinko Düzeyi", "Zn, mineral"],
    ["Serum ceruloplasmin", "Serum Seruloplazmin", "Bakır taşıyıcı"],
    ["Serum albumin level", "Serum Albümin Düzeyi", "Protein"],
    ["Serum globulin level", "Serum Globülin Düzeyi", "Protein"],
    ["Serum total protein", "Serum Total Protein", "Protein toplamı"],
    ["Albumin to globulin ratio", "Albümin/Globülin Oranı", "A/G oranı"],
    ["Serum prealbumin", "Serum Prealbumin", "Transthyretin"],
    ["Serum transferrin", "Serum Transferrin", "Demir taşıyıcı"],
    ["Serum haptoglobin", "Serum Haptoglobin", "Hemoglobin bağlayıcı"],
    [
      "Serum alpha-1 antitrypsin",
      "Serum Alfa-1 Antitripsin",
      "Proteaz inhibitörü",
    ],
    [
      "Serum alpha-2 macroglobulin",
      "Serum Alfa-2 Makroglobulin",
      "Proteaz inhibitörü",
    ],
    ["Serum complement C3", "Serum Kompleman C3", "İmmün protein"],
    ["Serum complement C4", "Serum Kompleman C4", "İmmün protein"],
    ["Total complement activity", "Total Kompleman Aktivitesi", "CH50"],
    ["Serum immunoglobulin G", "Serum İmmünoglobulin G", "IgG düzeyi"],
    ["Serum immunoglobulin A", "Serum İmmünoglobulin A", "IgA düzeyi"],
    ["Serum immunoglobulin M", "Serum İmmünoglobulin M", "IgM düzeyi"],
    ["Serum immunoglobulin E", "Serum İmmünoglobulin E", "IgE düzeyi"],
    [
      "Serum free light chains",
      "Serum Serbest Hafif Zincirler",
      "Kappa/Lambda",
    ],
    ["Serum protein electrophoresis", "Serum Protein Elektroforezi", "SPEP"],
    ["Urine protein electrophoresis", "İdrar Protein Elektroforezi", "UPEP"],
    ["Immunofixation electrophoresis", "İmmünfiksasyon Elektroforezi", "IFE"],
    ["Serum viscosity", "Serum Viskozitesi", "Kan kalınlığı"],
    ["Plasma viscosity", "Plazma Viskozitesi", "Plazma kalınlığı"],
    ["Serum osmolality", "Serum Osmolalitesi", "Konsantrasyon"],
    ["Urine osmolality", "İdrar Osmolalitesi", "İdrar konsantrasyonu"],
    ["Serum anion gap", "Serum Anyon Açığı", "Metabolik asidoz"],
    ["Urine anion gap", "İdrar Anyon Açığı", "Renal tübüler asidoz"],
    ["Fractional excretion of sodium", "Sodyumun Fraksiyonel Atılımı", "FENa"],
    ["Fractional excretion of urea", "Ürenin Fraksiyonel Atılımı", "FEUrea"],
    ["Creatinine clearance", "Kreatinin Klirensi", "CrCl"],
    ["Urea clearance", "Üre Klirensi", "Böbrek fonksiyonu"],
    ["Inulin clearance", "İnülin Klirensi", "GFR ölçümü"],
    ["Cystatin C clearance", "Sistatin C Klirensi", "GFR tahmini"],
    ["Beta-2 microglobulin", "Beta-2 Mikroglobulin", "Böbrek fonksiyonu"],
    ["Retinol binding protein", "Retinol Bağlayıcı Protein", "RBP"],
    [
      "N-acetyl-beta-D-glucosaminidase",
      "N-Asetil-Beta-D-Glukozaminidaz",
      "NAG, tübüler hasar",
    ],
    ["Kidney injury molecule-1", "Böbrek Hasar Molekülü-1", "KIM-1"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Daha fazla laboratuvar testleri
const generateMoreLabTests = () => {
  const tests = [
    [
      "Neutrophil to lymphocyte ratio",
      "Nötrofil/Lenfosit Oranı",
      "NLR, inflamasyon",
    ],
    [
      "Platelet to lymphocyte ratio",
      "Trombosit/Lenfosit Oranı",
      "PLR, inflamasyon",
    ],
    [
      "Monocyte to lymphocyte ratio",
      "Monosit/Lenfosit Oranı",
      "MLR, inflamasyon",
    ],
    [
      "Systemic immune-inflammation index",
      "Sistemik İmmün-İnflamasyon İndeksi",
      "SII",
    ],
    ["Red cell distribution width", "Eritrosit Dağılım Genişliği", "RDW"],
    ["Mean platelet volume", "Ortalama Trombosit Hacmi", "MPV"],
    ["Platelet distribution width", "Trombosit Dağılım Genişliği", "PDW"],
    ["Plateletcrit", "Plateletkrit", "PCT"],
    ["Immature platelet fraction", "İmmatür Trombosit Fraksiyonu", "IPF"],
    [
      "Reticulocyte hemoglobin content",
      "Retikülosit Hemoglobin İçeriği",
      "CHr",
    ],
    ["Reticulocyte production index", "Retikülosit Üretim İndeksi", "RPI"],
    ["Absolute reticulocyte count", "Mutlak Retikülosit Sayısı", "ARC"],
    ["Corrected reticulocyte count", "Düzeltilmiş Retikülosit Sayısı", "CRC"],
    ["Serum iron studies", "Serum Demir Çalışmaları", "Demir paneli"],
    [
      "Hemoglobin electrophoresis",
      "Hemoglobin Elektroforezi",
      "Hb elektroforezi",
    ],
    ["Sickle cell screen", "Orak Hücre Taraması", "Sickling testi"],
    ["Osmotic fragility test", "Ozmotik Frajilite Testi", "Sferositoz"],
    ["Direct antiglobulin test", "Direkt Antiglobulin Testi", "DAT, Coombs"],
    ["Indirect antiglobulin test", "İndirekt Antiglobulin Testi", "IAT"],
    ["Cold agglutinin titer", "Soğuk Aglütinin Titresi", "Soğuk AIHA"],
    ["Warm agglutinin test", "Sıcak Aglütinin Testi", "Sıcak AIHA"],
    [
      "Paroxysmal nocturnal hemoglobinuria screen",
      "PNH Taraması",
      "Flow sitometri",
    ],
    [
      "Glucose-6-phosphate dehydrogenase level",
      "G6PD Düzeyi",
      "G6PD eksikliği",
    ],
    ["Pyruvate kinase level", "Piruvat Kinaz Düzeyi", "PK eksikliği"],
    ["Heinz body preparation", "Heinz Cisimciği Preparatı", "Oksidatif hasar"],
    ["Howell-Jolly body", "Howell-Jolly Cisimciği", "Aspleni"],
    ["Pappenheimer body", "Pappenheimer Cisimciği", "Sideroblastik anemi"],
    ["Basophilic stippling", "Bazofilik Noktalanma", "Kurşun zehirlenmesi"],
    ["Target cells", "Hedef Hücreler", "Kodositler"],
    ["Spherocytes", "Sferositler", "Küre hücreler"],
    ["Elliptocytes", "Eliptositler", "Oval hücreler"],
    ["Schistocytes", "Şistositler", "Parçalanmış hücreler"],
    ["Acanthocytes", "Akantositler", "Dikenli hücreler"],
    ["Echinocytes", "Ekinositler", "Burr hücreleri"],
    ["Stomatocytes", "Stomatositler", "Ağız hücreleri"],
    ["Dacryocytes", "Dakriositler", "Gözyaşı hücreleri"],
    ["Rouleaux formation", "Rulo Formasyonu", "Para dizisi"],
    ["Polychromasia", "Polikromazi", "Çok renklilik"],
    ["Anisocytosis", "Anizositoz", "Boyut farklılığı"],
    ["Poikilocytosis", "Poikilositoz", "Şekil farklılığı"],
    ["Hypochromia", "Hipokromi", "Soluk hücreler"],
    ["Hyperchromia", "Hiperkromi", "Koyu hücreler"],
    ["Microcytosis", "Mikrositoz", "Küçük hücreler"],
    ["Macrocytosis", "Makrositoz", "Büyük hücreler"],
    [
      "Megaloblastic changes",
      "Megaloblastik Değişiklikler",
      "B12/folat eksikliği",
    ],
    [
      "Hypersegmented neutrophils",
      "Hipersegmente Nötrofiller",
      "Megaloblastik",
    ],
    ["Toxic granulation", "Toksik Granülasyon", "Enfeksiyon"],
    ["Dohle bodies", "Döhle Cisimleri", "Enfeksiyon"],
    ["Auer rods", "Auer Çubukları", "AML"],
    ["Smudge cells", "Leke Hücreleri", "KLL"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi cihazlar ve ekipmanlar
const generateMedicalDevices = () => {
  const devices = [
    ["Stethoscope", "Stetoskop", "Dinleme aleti"],
    ["Sphygmomanometer", "Sfigmomanometre", "Tansiyon aleti"],
    ["Otoscope", "Otoskop", "Kulak muayene aleti"],
    ["Ophthalmoscope", "Oftalmoskop", "Göz dibi muayene aleti"],
    ["Laryngoscope", "Laringoskop", "Gırtlak muayene aleti"],
    ["Bronchoscope", "Bronkoskop", "Bronş muayene aleti"],
    ["Gastroscope", "Gastroskop", "Mide muayene aleti"],
    ["Colonoscope", "Kolonoskop", "Kolon muayene aleti"],
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
    ["Pulse oximeter", "Pulse Oksimetre", "Oksijen ölçer"],
    ["Capnograph", "Kapnograf", "CO2 ölçer"],
    ["Spirometer", "Spirometre", "Solunum ölçer"],
    ["Peak flow meter", "Tepe Akım Ölçer", "PEF ölçer"],
    ["Glucometer", "Glukozometre", "Şeker ölçer"],
    ["Thermometer", "Termometre", "Ateş ölçer"],
    ["Tympanometer", "Timpanometre", "Kulak basınç ölçer"],
    ["Audiometer", "Odyometre", "İşitme ölçer"],
    ["Tonometer", "Tonometre", "Göz basınç ölçer"],
    ["Refractometer", "Refraktometre", "Kırılma ölçer"],
    ["Keratometer", "Keratometre", "Kornea eğrilik ölçer"],
    ["Pachymeter", "Pakimetre", "Kornea kalınlık ölçer"],
    ["Perimeter", "Perimetre", "Görme alanı ölçer"],
    ["Fundus camera", "Fundus Kamerası", "Göz dibi fotoğrafı"],
    ["Slit lamp", "Yarık Lamba", "Biyomikroskop"],
    ["Defibrillator", "Defibrilatör", "Kalp şoku cihazı"],
    ["Pacemaker", "Kalp Pili", "Kalp ritim düzenleyici"],
    [
      "Implantable cardioverter-defibrillator",
      "İmplante Kardiyoverter-Defibrilatör",
      "ICD",
    ],
    [
      "Cardiac resynchronization therapy device",
      "Kardiyak Resenkronizasyon Tedavi Cihazı",
      "CRT",
    ],
    ["Ventricular assist device", "Ventriküler Destek Cihazı", "VAD"],
    ["Intra-aortic balloon pump", "İntra-Aortik Balon Pompası", "IABP"],
    [
      "Extracorporeal membrane oxygenation",
      "Ekstrakorporeal Membran Oksijenasyonu",
      "ECMO",
    ],
    ["Hemodialysis machine", "Hemodiyaliz Makinesi", "Diyaliz cihazı"],
    ["Peritoneal dialysis cycler", "Periton Diyaliz Sikleri", "APD cihazı"],
    [
      "Continuous renal replacement therapy machine",
      "CRRT Makinesi",
      "Sürekli diyaliz",
    ],
    ["Ventilator", "Ventilatör", "Solunum cihazı"],
    ["CPAP machine", "CPAP Cihazı", "Sürekli pozitif hava yolu basıncı"],
    ["BiPAP machine", "BiPAP Cihazı", "İki seviyeli pozitif hava yolu basıncı"],
    ["Nebulizer", "Nebülizatör", "İlaç buharlaştırıcı"],
    ["Infusion pump", "İnfüzyon Pompası", "Sıvı verme pompası"],
    ["Syringe pump", "Şırınga Pompası", "İlaç verme pompası"],
    [
      "Patient-controlled analgesia pump",
      "Hasta Kontrollü Analjezi Pompası",
      "PCA pompası",
    ],
  ];
  return devices.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Daha fazla tıbbi cihazlar
const generateMoreMedicalDevices = () => {
  const devices = [
    ["Insulin pump", "İnsülin Pompası", "Sürekli insülin infüzyonu"],
    ["Continuous glucose monitor", "Sürekli Glukoz Monitörü", "CGM"],
    ["Cochlear implant", "Koklear İmplant", "Biyonik kulak"],
    ["Hearing aid", "İşitme Cihazı", "Duyma yardımcısı"],
    ["Bone-anchored hearing aid", "Kemik Ankrajlı İşitme Cihazı", "BAHA"],
    ["Intraocular lens", "Göz İçi Lensi", "IOL"],
    ["Contact lens", "Kontakt Lens", "Temas lensi"],
    ["Prosthetic limb", "Protez Uzuv", "Yapay kol/bacak"],
    ["Orthotic device", "Ortez Cihazı", "Destek cihazı"],
    ["Wheelchair", "Tekerlekli Sandalye", "Hareket yardımcısı"],
    ["Walker", "Yürüteç", "Yürüme yardımcısı"],
    ["Crutches", "Koltuk Değneği", "Yürüme desteği"],
    ["Cane", "Baston", "Yürüme yardımcısı"],
    ["Hospital bed", "Hastane Yatağı", "Hasta yatağı"],
    ["Stretcher", "Sedye", "Hasta taşıma"],
    ["Surgical table", "Ameliyat Masası", "Operasyon masası"],
    ["Anesthesia machine", "Anestezi Makinesi", "Narkoz cihazı"],
    ["Surgical robot", "Cerrahi Robot", "Robotik cerrahi sistemi"],
    ["Electrosurgical unit", "Elektrocerrahi Ünitesi", "Koter cihazı"],
    ["Harmonic scalpel", "Harmonik Bistüri", "Ultrasonik kesici"],
    ["Laser surgical system", "Lazer Cerrahi Sistemi", "Lazer kesici"],
    ["Cryosurgical unit", "Kriyocerrahi Ünitesi", "Dondurma cihazı"],
    ["Lithotripter", "Litotriptör", "Taş kırma cihazı"],
    ["Gamma knife", "Gama Bıçağı", "Radyocerrahi cihazı"],
    ["CyberKnife", "SiberBıçak", "Robotik radyocerrahi"],
    ["Linear accelerator", "Lineer Akseleratör", "LINAC, radyoterapi"],
    ["Brachytherapy unit", "Brakiterapi Ünitesi", "İç ışınlama cihazı"],
    ["CT scanner", "BT Tarayıcı", "Bilgisayarlı tomografi"],
    ["MRI scanner", "MR Tarayıcı", "Manyetik rezonans"],
    ["PET scanner", "PET Tarayıcı", "Pozitron emisyon tomografi"],
    ["SPECT scanner", "SPECT Tarayıcı", "Tek foton emisyon BT"],
    ["Ultrasound machine", "Ultrason Cihazı", "USG cihazı"],
    ["X-ray machine", "Röntgen Cihazı", "X-ışını cihazı"],
    ["Fluoroscopy unit", "Floroskopi Ünitesi", "Canlı röntgen"],
    ["Mammography unit", "Mamografi Ünitesi", "Meme görüntüleme"],
    ["Bone densitometer", "Kemik Dansitometresi", "DEXA cihazı"],
    ["Angiography system", "Anjiyografi Sistemi", "Damar görüntüleme"],
    [
      "Cardiac catheterization lab",
      "Kardiyak Kateterizasyon Laboratuvarı",
      "Kateter lab",
    ],
    ["Electrophysiology lab", "Elektrofizyoloji Laboratuvarı", "EP lab"],
    ["Endoscopy tower", "Endoskopi Kulesi", "Endoskopi sistemi"],
    ["Microscope surgical", "Cerrahi Mikroskop", "Ameliyat mikroskobu"],
    ["Centrifuge", "Santrifüj", "Ayırma cihazı"],
    ["Autoclave", "Otoklav", "Sterilizasyon cihazı"],
    ["Incubator", "İnkübatör", "Kültür cihazı"],
    ["Blood gas analyzer", "Kan Gazı Analizörü", "AKG cihazı"],
    ["Hematology analyzer", "Hematoloji Analizörü", "Kan sayım cihazı"],
    ["Chemistry analyzer", "Biyokimya Analizörü", "Otoanalizör"],
    ["Coagulation analyzer", "Koagülasyon Analizörü", "Pıhtılaşma cihazı"],
    ["Urinalysis analyzer", "İdrar Analizörü", "TİT cihazı"],
    ["Flow cytometer", "Akış Sitometresi", "Hücre analiz cihazı"],
  ];
  return devices.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi uzmanlık alanları
const generateMedicalSpecialties = () => {
  const specialties = [
    ["Internal medicine", "İç Hastalıkları", "Dahiliye"],
    ["General surgery", "Genel Cerrahi", "Cerrahi"],
    ["Pediatrics", "Pediatri", "Çocuk hastalıkları"],
    ["Obstetrics and gynecology", "Kadın Hastalıkları ve Doğum", "Jinekoloji"],
    ["Cardiology", "Kardiyoloji", "Kalp hastalıkları"],
    ["Pulmonology", "Göğüs Hastalıkları", "Pulmoner tıp"],
    ["Gastroenterology", "Gastroenteroloji", "Sindirim hastalıkları"],
    ["Nephrology", "Nefroloji", "Böbrek hastalıkları"],
    ["Endocrinology", "Endokrinoloji", "Hormon hastalıkları"],
    ["Rheumatology", "Romatoloji", "Eklem hastalıkları"],
    ["Hematology", "Hematoloji", "Kan hastalıkları"],
    ["Oncology", "Onkoloji", "Kanser hastalıkları"],
    ["Infectious diseases", "Enfeksiyon Hastalıkları", "Bulaşıcı hastalıklar"],
    ["Neurology", "Nöroloji", "Sinir hastalıkları"],
    ["Psychiatry", "Psikiyatri", "Ruh sağlığı"],
    ["Dermatology", "Dermatoloji", "Deri hastalıkları"],
    ["Ophthalmology", "Oftalmoloji", "Göz hastalıkları"],
    ["Otorhinolaryngology", "Kulak Burun Boğaz", "KBB"],
    ["Urology", "Üroloji", "İdrar yolu hastalıkları"],
    ["Orthopedics", "Ortopedi", "Kemik hastalıkları"],
    ["Neurosurgery", "Beyin Cerrahisi", "Nöroşirürji"],
    ["Cardiothoracic surgery", "Kalp Damar Cerrahisi", "KVC"],
    ["Plastic surgery", "Plastik Cerrahi", "Estetik cerrahi"],
    ["Vascular surgery", "Damar Cerrahisi", "Vasküler cerrahi"],
    ["Pediatric surgery", "Çocuk Cerrahisi", "Pediatrik cerrahi"],
    ["Anesthesiology", "Anesteziyoloji", "Narkoz"],
    ["Radiology", "Radyoloji", "Görüntüleme"],
    ["Nuclear medicine", "Nükleer Tıp", "Radyoizotop tıp"],
    ["Radiation oncology", "Radyasyon Onkolojisi", "Işın tedavisi"],
    ["Pathology", "Patoloji", "Hastalık bilimi"],
    ["Clinical pathology", "Klinik Patoloji", "Laboratuvar tıbbı"],
    ["Anatomic pathology", "Anatomik Patoloji", "Doku patolojisi"],
    ["Emergency medicine", "Acil Tıp", "Acil servis"],
    ["Critical care medicine", "Yoğun Bakım", "Kritik bakım"],
    ["Family medicine", "Aile Hekimliği", "Birinci basamak"],
    ["Geriatrics", "Geriatri", "Yaşlı hastalıkları"],
    ["Sports medicine", "Spor Hekimliği", "Sporcu sağlığı"],
    ["Occupational medicine", "İş Sağlığı", "Meslek hastalıkları"],
    ["Preventive medicine", "Koruyucu Hekimlik", "Önleyici tıp"],
    [
      "Physical medicine and rehabilitation",
      "Fiziksel Tıp ve Rehabilitasyon",
      "FTR",
    ],
    ["Pain medicine", "Ağrı Tıbbı", "Algoloji"],
    ["Palliative medicine", "Palyatif Tıp", "Destek tedavi"],
    ["Hospice medicine", "Hospis Tıbbı", "Son dönem bakım"],
    ["Sleep medicine", "Uyku Tıbbı", "Uyku bozuklukları"],
    ["Addiction medicine", "Bağımlılık Tıbbı", "Madde bağımlılığı"],
    [
      "Allergy and immunology",
      "Alerji ve İmmünoloji",
      "Bağışıklık hastalıkları",
    ],
    ["Medical genetics", "Tıbbi Genetik", "Kalıtsal hastalıklar"],
    ["Neonatology", "Neonatoloji", "Yenidoğan tıbbı"],
    ["Perinatology", "Perinatoloji", "Riskli gebelik"],
    ["Reproductive endocrinology", "Üreme Endokrinolojisi", "Tüp bebek"],
  ];
  return specialties.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi kısaltmalar
const generateMedicalAbbreviations = () => {
  const abbreviations = [
    ["NPO", "NPO", "Ağızdan bir şey almama"],
    ["PRN", "PRN", "Gerektiğinde"],
    ["QD", "QD", "Günde bir kez"],
    ["BID", "BID", "Günde iki kez"],
    ["TID", "TID", "Günde üç kez"],
    ["QID", "QID", "Günde dört kez"],
    ["QHS", "QHS", "Yatmadan önce"],
    ["AC", "AC", "Yemekten önce"],
    ["PC", "PC", "Yemekten sonra"],
    ["PO", "PO", "Ağızdan"],
    ["IV", "IV", "Damar içi"],
    ["IM", "IM", "Kas içi"],
    ["SC", "SC", "Deri altı"],
    ["SL", "SL", "Dil altı"],
    ["PR", "PR", "Rektal"],
    ["PV", "PV", "Vajinal"],
    ["TOP", "TOP", "Topikal"],
    ["INH", "INH", "İnhalasyon"],
    ["GTT", "GTT", "Damla"],
    ["TAB", "TAB", "Tablet"],
    ["CAP", "CAP", "Kapsül"],
    ["AMP", "AMP", "Ampul"],
    ["VIAL", "VIAL", "Flakon"],
    ["SOL", "SOL", "Solüsyon"],
    ["SUSP", "SUSP", "Süspansiyon"],
    ["OINT", "OINT", "Merhem"],
    ["CRM", "CRM", "Krem"],
    ["LOT", "LOT", "Losyon"],
    ["SUPP", "SUPP", "Supozituvar"],
    ["STAT", "STAT", "Hemen"],
    ["ASAP", "ASAP", "En kısa sürede"],
    ["DNR", "DNR", "Resüsite etme"],
    ["DNI", "DNI", "Entübe etme"],
    ["CMO", "CMO", "Sadece konfor önlemleri"],
    ["ADL", "ADL", "Günlük yaşam aktiviteleri"],
    ["ROM", "ROM", "Hareket açıklığı"],
    ["WNL", "WNL", "Normal sınırlar içinde"],
    ["NAD", "NAD", "Akut sıkıntı yok"],
    ["HEENT", "HEENT", "Baş, göz, kulak, burun, boğaz"],
    ["PERRLA", "PERRLA", "Pupiller eşit, yuvarlak, ışığa reaktif"],
    ["RRR", "RRR", "Düzenli ritim ve hız"],
    ["CTA", "CTA", "Oskültasyonda temiz"],
    ["NABS", "NABS", "Normal bağırsak sesleri"],
    ["A&O", "A&O", "Uyanık ve oryante"],
    ["AAOx3", "AAOx3", "Kişi, yer, zamana oryante"],
    ["GCS", "GCS", "Glasgow Koma Skalası"],
    ["APACHE", "APACHE", "Akut fizyoloji skoru"],
    ["SOFA", "SOFA", "Sıralı organ yetmezliği değerlendirmesi"],
    ["qSOFA", "qSOFA", "Hızlı SOFA"],
    ["NEWS", "NEWS", "Ulusal erken uyarı skoru"],
  ];
  return abbreviations.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi skorlar ve sınıflamalar
const generateMedicalScores = () => {
  const scores = [
    ["NYHA classification", "NYHA Sınıflaması", "Kalp yetmezliği sınıflaması"],
    ["CCS angina classification", "CCS Anjina Sınıflaması", "Anjina şiddeti"],
    [
      "Killip classification",
      "Killip Sınıflaması",
      "MI sonrası kalp yetmezliği",
    ],
    ["TIMI risk score", "TIMI Risk Skoru", "AKS risk değerlendirmesi"],
    ["GRACE score", "GRACE Skoru", "AKS mortalite riski"],
    ["HEART score", "HEART Skoru", "Göğüs ağrısı değerlendirmesi"],
    ["CHA2DS2-VASc score", "CHA2DS2-VASc Skoru", "AF inme riski"],
    ["HAS-BLED score", "HAS-BLED Skoru", "Kanama riski"],
    ["Wells score DVT", "Wells Skoru DVT", "DVT olasılığı"],
    ["Wells score PE", "Wells Skoru PE", "PE olasılığı"],
    ["Geneva score", "Geneva Skoru", "PE olasılığı"],
    ["PESI score", "PESI Skoru", "PE şiddeti"],
    ["Child-Pugh score", "Child-Pugh Skoru", "Karaciğer hastalığı şiddeti"],
    ["MELD score", "MELD Skoru", "Karaciğer hastalığı şiddeti"],
    ["Ranson criteria", "Ranson Kriterleri", "Akut pankreatit şiddeti"],
    ["BISAP score", "BISAP Skoru", "Akut pankreatit şiddeti"],
    [
      "Glasgow-Imrie criteria",
      "Glasgow-Imrie Kriterleri",
      "Akut pankreatit şiddeti",
    ],
    ["Rockall score", "Rockall Skoru", "GI kanama riski"],
    ["Blatchford score", "Blatchford Skoru", "GI kanama riski"],
    ["CURB-65 score", "CURB-65 Skoru", "Pnömoni şiddeti"],
    ["PSI score", "PSI Skoru", "Pnömoni şiddet indeksi"],
    ["GOLD classification", "GOLD Sınıflaması", "KOAH şiddeti"],
    ["BODE index", "BODE İndeksi", "KOAH prognozu"],
    ["ABCD assessment", "ABCD Değerlendirmesi", "KOAH yönetimi"],
    ["Hunt and Hess scale", "Hunt ve Hess Skalası", "SAK şiddeti"],
    ["Fisher grade", "Fisher Derecesi", "SAK BT bulguları"],
    ["WFNS grade", "WFNS Derecesi", "SAK şiddeti"],
    ["NIH Stroke Scale", "NIH İnme Skalası", "NIHSS, inme şiddeti"],
    [
      "Modified Rankin Scale",
      "Modifiye Rankin Skalası",
      "mRS, fonksiyonel sonuç",
    ],
    ["Barthel Index", "Barthel İndeksi", "Günlük yaşam aktiviteleri"],
    ["Karnofsky Performance Status", "Karnofsky Performans Durumu", "KPS"],
    ["ECOG Performance Status", "ECOG Performans Durumu", "Fonksiyonel durum"],
    ["TNM staging", "TNM Evreleme", "Kanser evreleme"],
    ["Ann Arbor staging", "Ann Arbor Evreleme", "Lenfoma evreleme"],
    ["Rai staging", "Rai Evreleme", "KLL evreleme"],
    ["Binet staging", "Binet Evreleme", "KLL evreleme"],
    [
      "International Staging System",
      "Uluslararası Evreleme Sistemi",
      "ISS, miyelom",
    ],
    ["Gleason score", "Gleason Skoru", "Prostat kanseri derecesi"],
    ["Fuhrman grade", "Fuhrman Derecesi", "Böbrek kanseri derecesi"],
    ["Breslow thickness", "Breslow Kalınlığı", "Melanom kalınlığı"],
    ["Clark level", "Clark Seviyesi", "Melanom derinliği"],
    ["APGAR score", "APGAR Skoru", "Yenidoğan değerlendirmesi"],
    ["Ballard score", "Ballard Skoru", "Gestasyonel yaş"],
    ["Bishop score", "Bishop Skoru", "Servikal olgunluk"],
    ["Aldrete score", "Aldrete Skoru", "Anestezi sonrası derlenme"],
    ["ASA classification", "ASA Sınıflaması", "Anestezi riski"],
    [
      "Mallampati classification",
      "Mallampati Sınıflaması",
      "Hava yolu değerlendirmesi",
    ],
    [
      "Cormack-Lehane grade",
      "Cormack-Lehane Derecesi",
      "Laringoskopi görünümü",
    ],
    [
      "Richmond Agitation-Sedation Scale",
      "Richmond Ajitasyon-Sedasyon Skalası",
      "RASS",
    ],
    ["Ramsay Sedation Scale", "Ramsay Sedasyon Skalası", "Sedasyon düzeyi"],
  ];
  return scores.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Acil tıp terimleri
const generateEmergencyTerms = () => {
  const terms = [
    ["Triage", "Triyaj", "Hasta sınıflandırma"],
    ["Resuscitation", "Resüsitasyon", "Canlandırma"],
    ["Cardiopulmonary resuscitation", "Kardiyopulmoner Resüsitasyon", "KPR"],
    ["Basic life support", "Temel Yaşam Desteği", "TYD"],
    ["Advanced cardiac life support", "İleri Kardiyak Yaşam Desteği", "ACLS"],
    [
      "Pediatric advanced life support",
      "Pediatrik İleri Yaşam Desteği",
      "PALS",
    ],
    ["Neonatal resuscitation", "Neonatal Resüsitasyon", "NRP"],
    ["Advanced trauma life support", "İleri Travma Yaşam Desteği", "ATLS"],
    ["Primary survey", "Birincil Değerlendirme", "ABCDE"],
    ["Secondary survey", "İkincil Değerlendirme", "Detaylı muayene"],
    ["Airway management", "Hava Yolu Yönetimi", "Hava yolu açıklığı"],
    ["Bag-valve-mask ventilation", "Balon-Valf-Maske Ventilasyonu", "Ambu"],
    ["Endotracheal intubation", "Endotrakeal Entübasyon", "ETT"],
    ["Rapid sequence intubation", "Hızlı Seri Entübasyon", "RSI"],
    ["Cricothyrotomy", "Krikotirotomi", "Acil hava yolu"],
    ["Tracheostomy", "Trakeostomi", "Nefes borusu açma"],
    ["Chest tube insertion", "Göğüs Tüpü Takılması", "Torakostomi"],
    ["Needle decompression", "İğne Dekompresyonu", "Tansiyon pnömotoraks"],
    ["Pericardiocentesis", "Perikardiyosentez", "Kalp zarı sıvı boşaltma"],
    ["Central venous catheterization", "Santral Venöz Kateterizasyon", "SVK"],
    ["Arterial line placement", "Arteriyel Hat Yerleştirme", "A-line"],
    ["Intraosseous access", "İntraosseöz Erişim", "IO"],
    ["Lumbar puncture", "Lomber Ponksiyon", "LP, BOS alımı"],
    ["Paracentesis", "Parasentez", "Karın sıvısı boşaltma"],
    ["Thoracentesis", "Torasentez", "Göğüs sıvısı boşaltma"],
    ["Cardioversion", "Kardiyoversiyon", "Elektriksel ritim düzeltme"],
    ["Defibrillation", "Defibrilasyon", "Kalp şoku"],
    ["Transcutaneous pacing", "Transkutanöz Pacing", "Dış kalp pili"],
    ["Transvenous pacing", "Transvenöz Pacing", "Geçici kalp pili"],
    ["Thrombolysis", "Tromboliz", "Pıhtı eritme"],
    ["Mechanical thrombectomy", "Mekanik Trombektomi", "Pıhtı çıkarma"],
    ["Therapeutic hypothermia", "Terapötik Hipotermi", "Soğutma tedavisi"],
    ["Targeted temperature management", "Hedefli Sıcaklık Yönetimi", "TTM"],
    ["Massive transfusion protocol", "Masif Transfüzyon Protokolü", "MTP"],
    ["Damage control surgery", "Hasar Kontrol Cerrahisi", "DCS"],
    ["Damage control resuscitation", "Hasar Kontrol Resüsitasyonu", "DCR"],
    [
      "Permissive hypotension",
      "İzin Verilen Hipotansiyon",
      "Kontrollü düşük tansiyon",
    ],
    [
      "Hemostatic resuscitation",
      "Hemostatik Resüsitasyon",
      "Kan ürünü tedavisi",
    ],
    ["Tourniquet application", "Turnike Uygulaması", "Kanama kontrolü"],
    ["Wound packing", "Yara Tamponlaması", "Kanama kontrolü"],
    ["Splinting", "Atel Uygulaması", "Kırık tespiti"],
    ["Reduction", "Redüksiyon", "Çıkık yerine koyma"],
    ["Closed reduction", "Kapalı Redüksiyon", "Ameliyatsız düzeltme"],
    ["Open reduction", "Açık Redüksiyon", "Ameliyatla düzeltme"],
    ["External fixation", "Eksternal Fiksasyon", "Dış tespit"],
    ["Internal fixation", "İnternal Fiksasyon", "İç tespit"],
    ["Fasciotomy", "Fasiyotomi", "Kompartman sendromu tedavisi"],
    ["Escharotomy", "Eskarotomi", "Yanık kesisi"],
    ["Debridement", "Debridman", "Ölü doku temizleme"],
    ["Wound closure", "Yara Kapatma", "Dikiş, stapler"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Yoğun bakım terimleri
const generateICUTerms = () => {
  const terms = [
    ["Mechanical ventilation", "Mekanik Ventilasyon", "Solunum cihazı desteği"],
    [
      "Invasive mechanical ventilation",
      "İnvaziv Mekanik Ventilasyon",
      "Entübe hasta",
    ],
    ["Non-invasive ventilation", "Non-İnvaziv Ventilasyon", "NIV, maske ile"],
    [
      "Positive end-expiratory pressure",
      "Pozitif End-Ekspiratuar Basınç",
      "PEEP",
    ],
    [
      "Continuous positive airway pressure",
      "Sürekli Pozitif Hava Yolu Basıncı",
      "CPAP",
    ],
    [
      "Bilevel positive airway pressure",
      "İki Seviyeli Pozitif Hava Yolu Basıncı",
      "BiPAP",
    ],
    ["Pressure support ventilation", "Basınç Destek Ventilasyonu", "PSV"],
    ["Volume control ventilation", "Volüm Kontrol Ventilasyonu", "VCV"],
    ["Pressure control ventilation", "Basınç Kontrol Ventilasyonu", "PCV"],
    [
      "Synchronized intermittent mandatory ventilation",
      "Senkronize Aralıklı Zorunlu Ventilasyon",
      "SIMV",
    ],
    ["Assist-control ventilation", "Asist-Kontrol Ventilasyonu", "A/C"],
    [
      "High-frequency oscillatory ventilation",
      "Yüksek Frekanslı Osilasyon Ventilasyonu",
      "HFOV",
    ],
    [
      "Airway pressure release ventilation",
      "Hava Yolu Basınç Salınım Ventilasyonu",
      "APRV",
    ],
    ["Prone positioning", "Pron Pozisyonu", "Yüzüstü yatırma"],
    ["Recruitment maneuver", "Rekrütman Manevrası", "Akciğer açma"],
    [
      "Lung protective ventilation",
      "Akciğer Koruyucu Ventilasyon",
      "Düşük tidal volüm",
    ],
    ["Weaning from ventilator", "Ventilatörden Ayırma", "Weaning"],
    ["Spontaneous breathing trial", "Spontan Solunum Denemesi", "SBT"],
    ["Extubation", "Ekstübasyon", "Tüp çıkarma"],
    ["Tracheostomy", "Trakeostomi", "Uzun süreli hava yolu"],
    ["Sedation", "Sedasyon", "Sakinleştirme"],
    ["Analgesia", "Analjezi", "Ağrı kontrolü"],
    ["Neuromuscular blockade", "Nöromüsküler Blokaj", "Kas felci"],
    ["Daily sedation interruption", "Günlük Sedasyon Kesintisi", "SAT"],
    ["Delirium", "Deliryum", "Akut konfüzyon"],
    ["ICU-acquired weakness", "YBÜ Edinilmiş Güçsüzlük", "ICUAW"],
    ["Ventilator-associated pneumonia", "Ventilatör İlişkili Pnömoni", "VİP"],
    [
      "Central line-associated bloodstream infection",
      "Santral Hat İlişkili Kan Dolaşımı Enfeksiyonu",
      "CLABSİ",
    ],
    [
      "Catheter-associated urinary tract infection",
      "Kateter İlişkili İdrar Yolu Enfeksiyonu",
      "CAUTİ",
    ],
    ["Pressure ulcer", "Basınç Ülseri", "Yatak yarası"],
    [
      "Deep vein thrombosis prophylaxis",
      "Derin Ven Trombozu Profilaksisi",
      "DVT profilaksisi",
    ],
    ["Stress ulcer prophylaxis", "Stres Ülseri Profilaksisi", "SUP"],
    ["Glycemic control", "Glisemik Kontrol", "Kan şekeri yönetimi"],
    ["Nutrition support", "Beslenme Desteği", "Enteral/parenteral"],
    ["Enteral nutrition", "Enteral Beslenme", "Tüple beslenme"],
    ["Parenteral nutrition", "Parenteral Beslenme", "Damar yoluyla beslenme"],
    ["Total parenteral nutrition", "Total Parenteral Beslenme", "TPN"],
    ["Renal replacement therapy", "Renal Replasman Tedavisi", "RRT, diyaliz"],
    [
      "Continuous renal replacement therapy",
      "Sürekli Renal Replasman Tedavisi",
      "CRRT",
    ],
    ["Intermittent hemodialysis", "Aralıklı Hemodiyaliz", "IHD"],
    [
      "Sustained low-efficiency dialysis",
      "Sürdürülen Düşük Verimli Diyaliz",
      "SLED",
    ],
    ["Hemofiltration", "Hemofiltrasyon", "Sıvı çıkarma"],
    ["Hemodiafiltration", "Hemodiyafiltrasyon", "HDF"],
    ["Plasmapheresis", "Plazmaferez", "Plazma değişimi"],
    ["Therapeutic plasma exchange", "Terapötik Plazma Değişimi", "TPE"],
    [
      "Extracorporeal membrane oxygenation",
      "Ekstrakorporeal Membran Oksijenasyonu",
      "ECMO",
    ],
    ["Veno-venous ECMO", "Veno-Venöz ECMO", "VV-ECMO"],
    ["Veno-arterial ECMO", "Veno-Arteriyel ECMO", "VA-ECMO"],
    ["Intra-aortic balloon pump", "İntra-Aortik Balon Pompası", "IABP"],
    ["Impella", "İmpella", "Perkutan VAD"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Massive Batch Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(60));

  console.log("📝 Terimler oluşturuluyor...");

  const diseaseVariants = generateDiseaseVariants();
  const procedureVariants = generateProcedureVariants();
  const labValues = generateLabValues();
  const moreLabTests = generateMoreLabTests();
  const medicalDevices = generateMedicalDevices();
  const moreMedicalDevices = generateMoreMedicalDevices();
  const medicalSpecialties = generateMedicalSpecialties();
  const medicalAbbreviations = generateMedicalAbbreviations();
  const medicalScores = generateMedicalScores();
  const emergencyTerms = generateEmergencyTerms();
  const icuTerms = generateICUTerms();

  const allTerms = [
    ...diseaseVariants,
    ...procedureVariants,
    ...labValues,
    ...moreLabTests,
    ...medicalDevices,
    ...moreMedicalDevices,
    ...medicalSpecialties,
    ...medicalAbbreviations,
    ...medicalScores,
    ...emergencyTerms,
    ...icuTerms,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Hastalık Varyantları: ${diseaseVariants.length}`);
  console.log(`   Prosedür Varyantları: ${procedureVariants.length}`);
  console.log(`   Laboratuvar Değerleri: ${labValues.length}`);
  console.log(`   Daha Fazla Lab Testleri: ${moreLabTests.length}`);
  console.log(`   Tıbbi Cihazlar: ${medicalDevices.length}`);
  console.log(`   Daha Fazla Tıbbi Cihazlar: ${moreMedicalDevices.length}`);
  console.log(`   Tıbbi Uzmanlıklar: ${medicalSpecialties.length}`);
  console.log(`   Tıbbi Kısaltmalar: ${medicalAbbreviations.length}`);
  console.log(`   Tıbbi Skorlar: ${medicalScores.length}`);
  console.log(`   Acil Tıp Terimleri: ${emergencyTerms.length}`);
  console.log(`   Yoğun Bakım Terimleri: ${icuTerms.length}`);
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
