// 10K Final terim üretme scripti
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
// Programatik terim üretimi - Tıbbi terimler
const generateMedicalTerms = () => {
  const terms = [];

  // Tıbbi önekler ve kökler
  const prefixes = [
    ["Hyper", "Hiper", "Fazla, aşırı"],
    ["Hypo", "Hipo", "Az, düşük"],
    ["Brady", "Bradi", "Yavaş"],
    ["Tachy", "Taşi", "Hızlı"],
    ["Poly", "Poli", "Çok"],
    ["Oligo", "Oligo", "Az"],
    ["Mono", "Mono", "Tek"],
    ["Bi", "Bi", "İki"],
    ["Tri", "Tri", "Üç"],
    ["Quadri", "Kuadri", "Dört"],
    ["Multi", "Multi", "Çok"],
    ["Pan", "Pan", "Tüm"],
    ["Hemi", "Hemi", "Yarım"],
    ["Semi", "Semi", "Yarı"],
    ["Pseudo", "Psödo", "Yalancı"],
    ["Neo", "Neo", "Yeni"],
    ["Paleo", "Paleo", "Eski"],
    ["Proto", "Proto", "İlk"],
    ["Pre", "Pre", "Önce"],
    ["Post", "Post", "Sonra"],
    ["Peri", "Peri", "Çevre"],
    ["Para", "Para", "Yanı"],
    ["Epi", "Epi", "Üst"],
    ["Endo", "Endo", "İç"],
    ["Exo", "Ekzo", "Dış"],
    ["Intra", "İntra", "İçinde"],
    ["Extra", "Ekstra", "Dışında"],
    ["Inter", "İnter", "Arasında"],
    ["Trans", "Trans", "Karşı"],
    ["Sub", "Sub", "Alt"],
    ["Supra", "Supra", "Üst"],
    ["Infra", "İnfra", "Alt"],
    ["Retro", "Retro", "Geri"],
    ["Ante", "Ante", "Ön"],
    ["Anti", "Anti", "Karşı"],
    ["Contra", "Kontra", "Karşıt"],
    ["Pro", "Pro", "İleri"],
    ["Re", "Re", "Tekrar"],
    ["De", "De", "Uzaklaştırma"],
    ["Dis", "Dis", "Ayrılma"],
    ["Dys", "Dis", "Bozuk"],
    ["Eu", "Ö", "Normal, iyi"],
    ["Mal", "Mal", "Kötü"],
    ["Macro", "Makro", "Büyük"],
    ["Micro", "Mikro", "Küçük"],
    ["Mega", "Mega", "Dev"],
    ["Iso", "İzo", "Eşit"],
    ["Hetero", "Hetero", "Farklı"],
    ["Homo", "Homo", "Aynı"],
    ["Auto", "Oto", "Kendi"],
  ];

  prefixes.forEach(([latin, turkish, def]) => {
    terms.push(
      createTerm(
        latin + "-",
        turkish + "-",
        TermCategory.COMPONENT,
        "Tıbbi önek: " + def
      )
    );
  });

  // Tıbbi sonekler
  const suffixes = [
    ["-itis", "-it", "İltihap"],
    ["-osis", "-oz", "Durum, hastalık"],
    ["-emia", "-emi", "Kan durumu"],
    ["-uria", "-üri", "İdrar durumu"],
    ["-penia", "-peni", "Eksiklik"],
    ["-cytosis", "-sitoz", "Hücre artışı"],
    ["-megaly", "-megali", "Büyüme"],
    ["-trophy", "-trofi", "Beslenme, büyüme"],
    ["-plasia", "-plazi", "Oluşum"],
    ["-genesis", "-genez", "Oluşum, üretim"],
    ["-lysis", "-liz", "Yıkım, parçalanma"],
    ["-stasis", "-staz", "Durma, denge"],
    ["-kinesis", "-kinezi", "Hareket"],
    ["-pathy", "-pati", "Hastalık"],
    ["-algia", "-alji", "Ağrı"],
    ["-dynia", "-dini", "Ağrı"],
    ["-ectomy", "-ektomi", "Çıkarma"],
    ["-otomy", "-otomi", "Kesme"],
    ["-ostomy", "-ostomi", "Ağız açma"],
    ["-plasty", "-plasti", "Onarım"],
    ["-pexy", "-peksi", "Sabitleme"],
    ["-rraphy", "-rafi", "Dikme"],
    ["-centesis", "-sentez", "Delme"],
    ["-scopy", "-skopi", "Görüntüleme"],
    ["-graphy", "-grafi", "Kayıt"],
    ["-metry", "-metri", "Ölçüm"],
    ["-therapy", "-terapi", "Tedavi"],
    ["-ectasis", "-ektazi", "Genişleme"],
    ["-stenosis", "-stenoz", "Daralma"],
    ["-sclerosis", "-skleroz", "Sertleşme"],
    ["-malacia", "-malazi", "Yumuşama"],
    ["-necrosis", "-nekroz", "Ölüm"],
    ["-ptosis", "-ptoz", "Düşme"],
    ["-rrhea", "-re", "Akıntı"],
    ["-rrhage", "-raji", "Kanama"],
    ["-spasm", "-spazm", "Kasılma"],
    ["-plegia", "-pleji", "Felç"],
    ["-paresis", "-parezi", "Kısmi felç"],
    ["-phobia", "-fobi", "Korku"],
    ["-mania", "-mani", "Aşırı istek"],
    ["-philia", "-fili", "Sevgi, eğilim"],
    ["-cyte", "-sit", "Hücre"],
    ["-blast", "-blast", "Öncü hücre"],
    ["-clast", "-klast", "Yıkıcı hücre"],
    ["-oid", "-oid", "Benzer"],
    ["-form", "-form", "Şekilli"],
    ["-genic", "-jenik", "Üreten"],
    ["-lytic", "-litik", "Yıkıcı"],
    ["-static", "-statik", "Durdurucu"],
    ["-tropic", "-tropik", "Yönelen"],
  ];

  suffixes.forEach(([latin, turkish, def]) => {
    terms.push(
      createTerm(latin, turkish, TermCategory.COMPONENT, "Tıbbi sonek: " + def)
    );
  });

  return terms;
};
// Laboratuvar testleri
const generateLabTests = () => {
  const tests = [
    ["Complete blood count", "Tam Kan Sayımı", "Hemogram"],
    ["White blood cell count", "Beyaz Kan Hücresi Sayımı", "Lökosit sayısı"],
    ["Red blood cell count", "Kırmızı Kan Hücresi Sayımı", "Eritrosit sayısı"],
    ["Hemoglobin", "Hemoglobin", "Hb, oksijen taşıyıcı"],
    ["Hematocrit", "Hematokrit", "Hct, kan yoğunluğu"],
    ["Mean corpuscular volume", "Ortalama Eritrosit Hacmi", "MCV"],
    ["Mean corpuscular hemoglobin", "Ortalama Eritrosit Hemoglobini", "MCH"],
    [
      "Mean corpuscular hemoglobin concentration",
      "Ortalama Eritrosit Hemoglobin Konsantrasyonu",
      "MCHC",
    ],
    ["Red cell distribution width", "Eritrosit Dağılım Genişliği", "RDW"],
    ["Platelet count", "Trombosit Sayısı", "Plt"],
    ["Mean platelet volume", "Ortalama Trombosit Hacmi", "MPV"],
    ["Reticulocyte count", "Retikülosit Sayısı", "Genç eritrosit"],
    [
      "Erythrocyte sedimentation rate",
      "Eritrosit Sedimentasyon Hızı",
      "ESR, sedim",
    ],
    ["C-reactive protein", "C-Reaktif Protein", "CRP, inflamasyon"],
    ["Procalcitonin", "Prokalsitonin", "PCT, bakteriyel enfeksiyon"],
    ["Blood urea nitrogen", "Kan Üre Azotu", "BUN"],
    ["Creatinine", "Kreatinin", "Böbrek fonksiyonu"],
    ["Glomerular filtration rate", "Glomerüler Filtrasyon Hızı", "GFR"],
    ["Cystatin C", "Sistatin C", "Böbrek fonksiyonu"],
    ["Uric acid", "Ürik Asit", "Gut, böbrek"],
    ["Sodium", "Sodyum", "Na, elektrolit"],
    ["Potassium", "Potasyum", "K, elektrolit"],
    ["Chloride", "Klorür", "Cl, elektrolit"],
    ["Bicarbonate", "Bikarbonat", "HCO3, asit-baz"],
    ["Calcium", "Kalsiyum", "Ca, mineral"],
    ["Ionized calcium", "İyonize Kalsiyum", "iCa"],
    ["Phosphorus", "Fosfor", "P, mineral"],
    ["Magnesium", "Magnezyum", "Mg, mineral"],
    ["Fasting glucose", "Açlık Kan Şekeri", "AKŞ"],
    ["Random glucose", "Rastgele Kan Şekeri", "RKŞ"],
    ["Hemoglobin A1c", "Hemoglobin A1c", "HbA1c, diyabet kontrolü"],
    ["Fructosamine", "Fruktozamin", "Kısa dönem glisemi"],
    ["Oral glucose tolerance test", "Oral Glukoz Tolerans Testi", "OGTT"],
    ["Insulin", "İnsülin", "Pankreas hormonu"],
    ["C-peptide", "C-Peptid", "İnsülin üretimi"],
    ["Total cholesterol", "Total Kolesterol", "Lipid profili"],
    ["LDL cholesterol", "LDL Kolesterol", "Kötü kolesterol"],
    ["HDL cholesterol", "HDL Kolesterol", "İyi kolesterol"],
    ["Triglycerides", "Trigliseridler", "TG, yağ"],
    ["Lipoprotein a", "Lipoprotein a", "Lp(a), kardiyovasküler risk"],
    ["Apolipoprotein A1", "Apolipoprotein A1", "ApoA1"],
    ["Apolipoprotein B", "Apolipoprotein B", "ApoB"],
    ["Aspartate aminotransferase", "Aspartat Aminotransferaz", "AST, SGOT"],
    ["Alanine aminotransferase", "Alanin Aminotransferaz", "ALT, SGPT"],
    ["Alkaline phosphatase", "Alkalen Fosfataz", "ALP"],
    ["Gamma-glutamyl transferase", "Gama-Glutamil Transferaz", "GGT"],
    ["Total bilirubin", "Total Bilirubin", "T.Bil"],
    ["Direct bilirubin", "Direkt Bilirubin", "D.Bil, konjuge"],
    ["Indirect bilirubin", "İndirekt Bilirubin", "İ.Bil, unkonjuge"],
    ["Albumin", "Albümin", "Karaciğer proteini"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};
// Laboratuvar testleri - Bölüm 2
const generateLabTests2 = () => {
  const tests = [
    ["Total protein", "Total Protein", "Serum proteini"],
    ["Globulin", "Globülin", "İmmün protein"],
    ["Prothrombin time", "Protrombin Zamanı", "PT, pıhtılaşma"],
    [
      "International normalized ratio",
      "Uluslararası Normalleştirilmiş Oran",
      "INR",
    ],
    [
      "Activated partial thromboplastin time",
      "Aktive Parsiyel Tromboplastin Zamanı",
      "aPTT",
    ],
    ["Fibrinogen", "Fibrinojen", "Pıhtılaşma faktörü"],
    ["D-dimer", "D-Dimer", "Fibrin yıkım ürünü"],
    ["Thrombin time", "Trombin Zamanı", "TT"],
    ["Bleeding time", "Kanama Zamanı", "BT"],
    ["Factor VIII", "Faktör VIII", "Hemofili A"],
    ["Factor IX", "Faktör IX", "Hemofili B"],
    ["Von Willebrand factor", "Von Willebrand Faktörü", "VWF"],
    ["Antithrombin III", "Antitrombin III", "AT III"],
    ["Protein C", "Protein C", "Antikoagülan protein"],
    ["Protein S", "Protein S", "Antikoagülan protein"],
    ["Lupus anticoagulant", "Lupus Antikoagülanı", "LA"],
    ["Anticardiolipin antibodies", "Antikardiyolipin Antikorları", "ACA"],
    ["Anti-beta2 glycoprotein I", "Anti-Beta2 Glikoprotein I", "Anti-β2GPI"],
    ["Thyroid stimulating hormone", "Tiroid Stimüle Edici Hormon", "TSH"],
    ["Free thyroxine", "Serbest Tiroksin", "sT4"],
    ["Free triiodothyronine", "Serbest Triiyodotironin", "sT3"],
    ["Total thyroxine", "Total Tiroksin", "T4"],
    ["Total triiodothyronine", "Total Triiyodotironin", "T3"],
    ["Thyroglobulin", "Tiroglobulin", "Tg"],
    [
      "Anti-thyroid peroxidase antibodies",
      "Anti-Tiroid Peroksidaz Antikorları",
      "Anti-TPO",
    ],
    [
      "Anti-thyroglobulin antibodies",
      "Anti-Tiroglobulin Antikorları",
      "Anti-Tg",
    ],
    ["TSH receptor antibodies", "TSH Reseptör Antikorları", "TRAb"],
    ["Parathyroid hormone", "Paratiroid Hormonu", "PTH"],
    ["Vitamin D 25-hydroxy", "25-Hidroksi Vitamin D", "25-OH D"],
    ["Vitamin D 1,25-dihydroxy", "1,25-Dihidroksi Vitamin D", "Kalsitriol"],
    ["Cortisol", "Kortizol", "Stres hormonu"],
    ["ACTH", "ACTH", "Adrenokortikotropik hormon"],
    ["Aldosterone", "Aldosteron", "Mineralokortikoid"],
    ["Renin", "Renin", "Böbrek enzimi"],
    ["Testosterone", "Testosteron", "Androjen"],
    ["Free testosterone", "Serbest Testosteron", "sT"],
    ["Estradiol", "Estradiol", "E2, östrojen"],
    ["Progesterone", "Progesteron", "P4"],
    ["Follicle stimulating hormone", "Folikül Stimüle Edici Hormon", "FSH"],
    ["Luteinizing hormone", "Lüteinize Edici Hormon", "LH"],
    ["Prolactin", "Prolaktin", "PRL"],
    ["Growth hormone", "Büyüme Hormonu", "GH"],
    [
      "Insulin-like growth factor 1",
      "İnsülin Benzeri Büyüme Faktörü 1",
      "IGF-1",
    ],
    [
      "Dehydroepiandrosterone sulfate",
      "Dehidroepiandrosteron Sülfat",
      "DHEA-S",
    ],
    ["Sex hormone binding globulin", "Seks Hormonu Bağlayıcı Globülin", "SHBG"],
    ["Anti-Mullerian hormone", "Anti-Müllerian Hormon", "AMH"],
    [
      "Human chorionic gonadotropin",
      "İnsan Koryonik Gonadotropini",
      "hCG, beta-hCG",
    ],
    ["Alpha-fetoprotein", "Alfa-Fetoprotein", "AFP"],
    ["Carcinoembryonic antigen", "Karsinoembriyonik Antijen", "CEA"],
    ["Prostate specific antigen", "Prostat Spesifik Antijen", "PSA"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};
// Laboratuvar testleri - Bölüm 3
const generateLabTests3 = () => {
  const tests = [
    ["CA 125", "CA 125", "Over kanseri belirteci"],
    ["CA 19-9", "CA 19-9", "Pankreas kanseri belirteci"],
    ["CA 15-3", "CA 15-3", "Meme kanseri belirteci"],
    ["CA 27-29", "CA 27-29", "Meme kanseri belirteci"],
    ["Neuron specific enolase", "Nöron Spesifik Enolaz", "NSE"],
    ["Chromogranin A", "Kromogranin A", "CgA, nöroendokrin"],
    ["Calcitonin", "Kalsitonin", "Medüller tiroid kanseri"],
    ["Lactate dehydrogenase", "Laktat Dehidrojenaz", "LDH"],
    ["Creatine kinase", "Kreatin Kinaz", "CK, kas enzimi"],
    ["Creatine kinase MB", "Kreatin Kinaz MB", "CK-MB, kalp"],
    ["Troponin I", "Troponin I", "cTnI, kalp hasarı"],
    ["Troponin T", "Troponin T", "cTnT, kalp hasarı"],
    ["Brain natriuretic peptide", "Beyin Natriüretik Peptid", "BNP"],
    ["N-terminal pro-BNP", "N-Terminal Pro-BNP", "NT-proBNP"],
    ["Myoglobin", "Miyoglobin", "Kas proteini"],
    ["Amylase", "Amilaz", "Pankreas enzimi"],
    ["Lipase", "Lipaz", "Pankreas enzimi"],
    ["Ammonia", "Amonyak", "Karaciğer fonksiyonu"],
    ["Lactate", "Laktat", "Anaerobik metabolizma"],
    ["Arterial blood gas", "Arteriyel Kan Gazı", "AKG"],
    ["pH", "pH", "Asit-baz dengesi"],
    ["Partial pressure of oxygen", "Parsiyel Oksijen Basıncı", "PaO2"],
    [
      "Partial pressure of carbon dioxide",
      "Parsiyel Karbondioksit Basıncı",
      "PaCO2",
    ],
    ["Oxygen saturation", "Oksijen Satürasyonu", "SaO2"],
    ["Base excess", "Baz Fazlası", "BE"],
    ["Anion gap", "Anyon Açığı", "AG"],
    ["Osmolality", "Osmolalite", "Serum osmolalitesi"],
    ["Urinalysis", "İdrar Analizi", "TİT"],
    ["Urine specific gravity", "İdrar Özgül Ağırlığı", "Dansite"],
    ["Urine pH", "İdrar pH", "Asidite"],
    ["Urine protein", "İdrar Proteini", "Proteinüri"],
    ["Urine glucose", "İdrar Glukozu", "Glukozüri"],
    ["Urine ketones", "İdrar Ketonları", "Ketonüri"],
    ["Urine blood", "İdrar Kanı", "Hematüri"],
    ["Urine bilirubin", "İdrar Bilirubini", "Bilirubinüri"],
    ["Urine urobilinogen", "İdrar Ürobilinojen", "Ürobilinojenüri"],
    ["Urine nitrite", "İdrar Nitriti", "Bakteriüri"],
    ["Urine leukocyte esterase", "İdrar Lökosit Esterazı", "Piyüri"],
    ["Urine microscopy", "İdrar Mikroskopisi", "Sediment"],
    [
      "24-hour urine protein",
      "24 Saatlik İdrar Proteini",
      "Proteinüri miktarı",
    ],
    [
      "Urine albumin to creatinine ratio",
      "İdrar Albümin/Kreatinin Oranı",
      "UACR",
    ],
    ["Urine creatinine", "İdrar Kreatinini", "Böbrek fonksiyonu"],
    ["Urine sodium", "İdrar Sodyumu", "Tübüler fonksiyon"],
    ["Fractional excretion of sodium", "Sodyumun Fraksiyonel Atılımı", "FENa"],
    [
      "Cerebrospinal fluid analysis",
      "Beyin Omurilik Sıvısı Analizi",
      "BOS analizi",
    ],
    ["CSF protein", "BOS Proteini", "BOS protein düzeyi"],
    ["CSF glucose", "BOS Glukozu", "BOS şeker düzeyi"],
    ["CSF cell count", "BOS Hücre Sayımı", "BOS hücre"],
    ["Synovial fluid analysis", "Sinoviyal Sıvı Analizi", "Eklem sıvısı"],
    ["Pleural fluid analysis", "Plevral Sıvı Analizi", "Plevra sıvısı"],
  ];
  return tests.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};
// Tıbbi prosedürler
const generateProcedures = () => {
  const procedures = [
    ["Electrocardiogram", "Elektrokardiyogram", "EKG, kalp ritmi"],
    ["Echocardiogram", "Ekokardiyogram", "Kalp ultrason"],
    ["Stress test", "Stres Testi", "Efor testi"],
    ["Holter monitor", "Holter Monitör", "24 saat EKG"],
    [
      "Cardiac catheterization",
      "Kardiyak Kateterizasyon",
      "Koroner anjiyografi",
    ],
    ["Coronary angioplasty", "Koroner Anjiyoplasti", "PTCA, stent"],
    ["Coronary artery bypass graft", "Koroner Arter Bypass Greft", "CABG"],
    ["Pacemaker implantation", "Kalp Pili Takılması", "Pacemaker"],
    [
      "Implantable cardioverter defibrillator",
      "İmplante Edilebilir Kardiyoverter Defibrilatör",
      "ICD",
    ],
    ["Cardiac ablation", "Kardiyak Ablasyon", "Aritmi tedavisi"],
    [
      "Transcatheter aortic valve replacement",
      "Transkateter Aort Kapak Replasmanı",
      "TAVR",
    ],
    ["Chest X-ray", "Göğüs Röntgeni", "Akciğer grafisi"],
    ["Computed tomography", "Bilgisayarlı Tomografi", "BT, CT"],
    ["Magnetic resonance imaging", "Manyetik Rezonans Görüntüleme", "MRG, MRI"],
    ["Positron emission tomography", "Pozitron Emisyon Tomografisi", "PET"],
    ["Ultrasound", "Ultrason", "USG"],
    ["Doppler ultrasound", "Doppler Ultrason", "Damar akımı"],
    ["Mammography", "Mamografi", "Meme görüntüleme"],
    ["Bone densitometry", "Kemik Dansitometrisi", "DEXA"],
    ["Fluoroscopy", "Floroskopi", "Canlı röntgen"],
    ["Angiography", "Anjiyografi", "Damar görüntüleme"],
    ["Bronchoscopy", "Bronkoskopi", "Hava yolu görüntüleme"],
    ["Colonoscopy", "Kolonoskopi", "Kalın bağırsak görüntüleme"],
    ["Gastroscopy", "Gastroskopi", "Mide görüntüleme"],
    [
      "Esophagogastroduodenoscopy",
      "Özofagogastroduodenoskopi",
      "ÖGD, üst endoskopi",
    ],
    [
      "Endoscopic retrograde cholangiopancreatography",
      "Endoskopik Retrograd Kolanjiyopankreatografi",
      "ERCP",
    ],
    ["Cystoscopy", "Sistoskopi", "Mesane görüntüleme"],
    ["Laparoscopy", "Laparoskopi", "Karın içi görüntüleme"],
    ["Thoracoscopy", "Torakoskopi", "Göğüs içi görüntüleme"],
    ["Arthroscopy", "Artroskopi", "Eklem görüntüleme"],
    ["Lumbar puncture", "Lomber Ponksiyon", "BOS alımı"],
    ["Bone marrow biopsy", "Kemik İliği Biyopsisi", "KİB"],
    ["Liver biopsy", "Karaciğer Biyopsisi", "Hepatik biyopsi"],
    ["Kidney biopsy", "Böbrek Biyopsisi", "Renal biyopsi"],
    ["Skin biopsy", "Deri Biyopsisi", "Kutanöz biyopsi"],
    ["Lymph node biopsy", "Lenf Nodu Biyopsisi", "LN biyopsisi"],
    ["Fine needle aspiration", "İnce İğne Aspirasyonu", "İİAB"],
    ["Core needle biopsy", "Kalın İğne Biyopsisi", "Tru-cut biyopsi"],
    ["Electroencephalogram", "Elektroensefalogram", "EEG, beyin dalgaları"],
    ["Electromyography", "Elektromiyografi", "EMG, kas aktivitesi"],
    ["Nerve conduction study", "Sinir İletim Çalışması", "SİÇ"],
    ["Pulmonary function test", "Solunum Fonksiyon Testi", "SFT"],
    ["Spirometry", "Spirometri", "Akciğer kapasitesi"],
    ["Peak flow measurement", "Tepe Akım Ölçümü", "PEF"],
    ["Polysomnography", "Polisomnografi", "Uyku çalışması"],
    ["Audiometry", "Odyometri", "İşitme testi"],
    ["Tympanometry", "Timpanometri", "Orta kulak testi"],
    ["Visual field test", "Görme Alanı Testi", "Perimetri"],
    ["Fundoscopy", "Fundoskopi", "Göz dibi muayenesi"],
    ["Tonometry", "Tonometri", "Göz içi basınç ölçümü"],
  ];
  return procedures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};
// Tıbbi prosedürler - Bölüm 2
const generateProcedures2 = () => {
  const procedures = [
    ["Slit lamp examination", "Yarık Lamba Muayenesi", "Biyomikroskopi"],
    ["Optical coherence tomography", "Optik Koherens Tomografi", "OCT"],
    ["Fluorescein angiography", "Floresein Anjiyografi", "FA, göz damarları"],
    ["Hemodialysis", "Hemodiyaliz", "HD, kan diyalizi"],
    ["Peritoneal dialysis", "Periton Diyalizi", "PD"],
    [
      "Continuous renal replacement therapy",
      "Sürekli Renal Replasman Tedavisi",
      "CRRT",
    ],
    ["Plasmapheresis", "Plazmaferez", "Plazma değişimi"],
    ["Blood transfusion", "Kan Transfüzyonu", "Kan nakli"],
    ["Platelet transfusion", "Trombosit Transfüzyonu", "Trombosit nakli"],
    [
      "Fresh frozen plasma transfusion",
      "Taze Donmuş Plazma Transfüzyonu",
      "TDP nakli",
    ],
    ["Bone marrow transplantation", "Kemik İliği Nakli", "KİN"],
    ["Stem cell transplantation", "Kök Hücre Nakli", "KHN"],
    ["Organ transplantation", "Organ Nakli", "Transplantasyon"],
    ["Kidney transplantation", "Böbrek Nakli", "Renal transplantasyon"],
    ["Liver transplantation", "Karaciğer Nakli", "Hepatik transplantasyon"],
    ["Heart transplantation", "Kalp Nakli", "Kardiyak transplantasyon"],
    ["Lung transplantation", "Akciğer Nakli", "Pulmoner transplantasyon"],
    [
      "Pancreas transplantation",
      "Pankreas Nakli",
      "Pankreatik transplantasyon",
    ],
    ["Corneal transplantation", "Kornea Nakli", "Keratoplasti"],
    ["Radiation therapy", "Radyoterapi", "Işın tedavisi"],
    ["External beam radiation", "Dış Işın Radyoterapisi", "EBRT"],
    ["Brachytherapy", "Brakiterapi", "İç ışınlama"],
    [
      "Stereotactic radiosurgery",
      "Stereotaktik Radyocerrahi",
      "SRS, gamma knife",
    ],
    ["Chemotherapy", "Kemoterapi", "İlaç tedavisi"],
    ["Immunotherapy", "İmmünoterapi", "Bağışıklık tedavisi"],
    ["Targeted therapy", "Hedefe Yönelik Tedavi", "Hedefli tedavi"],
    ["Hormone therapy", "Hormon Tedavisi", "Endokrin tedavi"],
    ["Phototherapy", "Fototerapi", "Işık tedavisi"],
    ["Photodynamic therapy", "Fotodinamik Terapi", "PDT"],
    [
      "Extracorporeal shock wave lithotripsy",
      "Ekstrakorporeal Şok Dalga Litotripsi",
      "ESWL",
    ],
    ["Percutaneous nephrolithotomy", "Perkütan Nefrolitotomi", "PNL"],
    ["Ureteroscopy", "Üreteroskopi", "URS"],
    [
      "Transurethral resection of prostate",
      "Transüretral Prostat Rezeksiyonu",
      "TUR-P",
    ],
    [
      "Transurethral resection of bladder tumor",
      "Transüretral Mesane Tümörü Rezeksiyonu",
      "TUR-MT",
    ],
    ["Radical prostatectomy", "Radikal Prostatektomi", "RP"],
    ["Radical nephrectomy", "Radikal Nefrektomi", "RN"],
    ["Partial nephrectomy", "Parsiyel Nefrektomi", "PN"],
    ["Radical cystectomy", "Radikal Sistektomi", "RC"],
    ["Hysterectomy", "Histerektomi", "Rahim alınması"],
    ["Oophorectomy", "Ooforektomi", "Yumurtalık alınması"],
    ["Salpingectomy", "Salpenjektomi", "Tüp alınması"],
    ["Mastectomy", "Mastektomi", "Meme alınması"],
    ["Lumpectomy", "Lumpektomi", "Meme koruyucu cerrahi"],
    ["Thyroidectomy", "Tiroidektomi", "Tiroid alınması"],
    ["Parathyroidectomy", "Paratiroidektomi", "Paratiroid alınması"],
    ["Adrenalectomy", "Adrenalektomi", "Adrenal bez alınması"],
    ["Splenectomy", "Splenektomi", "Dalak alınması"],
    ["Cholecystectomy", "Kolesistektomi", "Safra kesesi alınması"],
    ["Appendectomy", "Apendektomi", "Apendiks alınması"],
    ["Gastrectomy", "Gastrektomi", "Mide alınması"],
  ];
  return procedures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};
// Tıbbi prosedürler - Bölüm 3
const generateProcedures3 = () => {
  const procedures = [
    ["Colectomy", "Kolektomi", "Kolon alınması"],
    ["Hepatectomy", "Hepatektomi", "Karaciğer rezeksiyonu"],
    ["Pancreatectomy", "Pankreatektomi", "Pankreas alınması"],
    ["Whipple procedure", "Whipple Prosedürü", "Pankreatikoduodenektomi"],
    ["Esophagectomy", "Özofajektomi", "Yemek borusu alınması"],
    ["Pneumonectomy", "Pnömonektomi", "Akciğer alınması"],
    ["Lobectomy", "Lobektomi", "Lob alınması"],
    ["Craniotomy", "Kraniyotomi", "Kafatası açılması"],
    ["Craniectomy", "Kraniyektomi", "Kafatası kemiği alınması"],
    ["Laminectomy", "Laminektomi", "Omurga kemiği alınması"],
    ["Discectomy", "Diskektomi", "Disk alınması"],
    ["Spinal fusion", "Spinal Füzyon", "Omurga kaynağı"],
    ["Total hip replacement", "Total Kalça Protezi", "TKP"],
    ["Total knee replacement", "Total Diz Protezi", "TDP"],
    ["Shoulder replacement", "Omuz Protezi", "Omuz artroplastisi"],
    ["Rotator cuff repair", "Rotator Manşet Tamiri", "Omuz tamiri"],
    ["ACL reconstruction", "ÖÇB Rekonstrüksiyonu", "Ön çapraz bağ tamiri"],
    ["Meniscectomy", "Menisektomi", "Menisküs alınması"],
    ["Carpal tunnel release", "Karpal Tünel Gevşetme", "KTS cerrahisi"],
    ["Trigger finger release", "Tetik Parmak Gevşetme", "Tenosinovektomi"],
    [
      "Dupuytren contracture release",
      "Dupuytren Kontraktür Gevşetme",
      "Fasiyektomi",
    ],
    ["Bunionectomy", "Bunyonektomi", "Halluks valgus cerrahisi"],
    ["Amputation", "Amputasyon", "Uzuv kesimi"],
    ["Skin grafting", "Deri Grefti", "Deri nakli"],
    ["Flap surgery", "Flep Cerrahisi", "Doku transferi"],
    ["Liposuction", "Liposuction", "Yağ emme"],
    ["Abdominoplasty", "Abdominoplasti", "Karın germe"],
    ["Rhinoplasty", "Rinoplasti", "Burun estetiği"],
    ["Blepharoplasty", "Blefaroplasti", "Göz kapağı estetiği"],
    ["Rhytidectomy", "Ritidektomi", "Yüz germe"],
    ["Breast augmentation", "Meme Büyütme", "Meme protezi"],
    ["Breast reduction", "Meme Küçültme", "Redüksiyon mammoplasti"],
    ["Breast reconstruction", "Meme Rekonstrüksiyonu", "Meme yeniden yapımı"],
    ["Cleft lip repair", "Yarık Dudak Tamiri", "Keiloplasti"],
    ["Cleft palate repair", "Yarık Damak Tamiri", "Palatoplasti"],
    ["Tonsillectomy", "Tonsillektomi", "Bademcik alınması"],
    ["Adenoidectomy", "Adenoidektomi", "Geniz eti alınması"],
    ["Septoplasty", "Septoplasti", "Burun kemiği düzeltme"],
    ["Turbinectomy", "Turbinektomi", "Konka küçültme"],
    ["Sinus surgery", "Sinüs Cerrahisi", "FESS"],
    ["Myringotomy", "Miringotomi", "Kulak zarı kesisi"],
    ["Tympanoplasty", "Timpanoplasti", "Kulak zarı tamiri"],
    ["Mastoidectomy", "Mastoidektomi", "Mastoid kemiği cerrahisi"],
    ["Stapedectomy", "Stapedektomi", "Üzengi kemiği cerrahisi"],
    ["Cochlear implantation", "Koklear İmplantasyon", "Biyonik kulak"],
    ["Cataract surgery", "Katarakt Cerrahisi", "Fakoemülsifikasyon"],
    ["LASIK", "LASIK", "Lazer göz ameliyatı"],
    ["Vitrectomy", "Vitrektomi", "Vitreus cerrahisi"],
    ["Trabeculectomy", "Trabekülektomi", "Glokom cerrahisi"],
    ["Corneal transplant", "Kornea Nakli", "Keratoplasti"],
  ];
  return procedures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};
// Tıbbi semptomlar ve bulgular
const generateSymptoms = () => {
  const symptoms = [
    ["Fever", "Ateş", "Hipertermi, pireksi"],
    ["Chills", "Titreme", "Üşüme"],
    ["Fatigue", "Yorgunluk", "Halsizlik"],
    ["Malaise", "Kırgınlık", "Genel rahatsızlık"],
    ["Weight loss", "Kilo Kaybı", "Zayıflama"],
    ["Weight gain", "Kilo Alımı", "Şişmanlama"],
    ["Anorexia", "İştahsızlık", "Anoreksi"],
    ["Night sweats", "Gece Terlemesi", "Nokturnal hiperhidrozis"],
    ["Headache", "Baş Ağrısı", "Sefalji"],
    ["Dizziness", "Baş Dönmesi", "Vertigo, sersemlik"],
    ["Syncope", "Bayılma", "Senkop"],
    ["Confusion", "Konfüzyon", "Bilinç bulanıklığı"],
    ["Altered mental status", "Değişmiş Mental Durum", "AMS"],
    ["Seizure", "Nöbet", "Konvülsiyon"],
    ["Tremor", "Titreme", "Tremor"],
    ["Weakness", "Güçsüzlük", "Halsizlik"],
    ["Numbness", "Uyuşukluk", "Parestezi"],
    ["Tingling", "Karıncalanma", "Parestezi"],
    ["Paralysis", "Felç", "Paralizi"],
    ["Ataxia", "Ataksi", "Koordinasyon bozukluğu"],
    ["Dysarthria", "Dizartri", "Konuşma güçlüğü"],
    ["Dysphagia", "Disfaji", "Yutma güçlüğü"],
    ["Aphasia", "Afazi", "Konuşma kaybı"],
    ["Amnesia", "Amnezi", "Hafıza kaybı"],
    ["Insomnia", "Uykusuzluk", "İnsomni"],
    ["Hypersomnia", "Aşırı Uyku", "Hipersomni"],
    ["Chest pain", "Göğüs Ağrısı", "Torasik ağrı"],
    ["Palpitations", "Çarpıntı", "Palpitasyon"],
    ["Dyspnea", "Nefes Darlığı", "Dispne"],
    ["Orthopnea", "Ortopne", "Yatınca nefes darlığı"],
    ["Paroxysmal nocturnal dyspnea", "Paroksismal Nokturnal Dispne", "PND"],
    ["Cough", "Öksürük", "Tussis"],
    ["Hemoptysis", "Hemoptizi", "Kan tükürme"],
    ["Wheezing", "Hırıltı", "Vizing"],
    ["Stridor", "Stridor", "İnspiratuvar ses"],
    ["Cyanosis", "Siyanoz", "Morarma"],
    ["Edema", "Ödem", "Şişlik"],
    ["Peripheral edema", "Periferik Ödem", "Bacak şişliği"],
    ["Ascites", "Asit", "Karın sıvısı"],
    ["Jaundice", "Sarılık", "İkter"],
    ["Pruritus", "Kaşıntı", "Prurit"],
    ["Rash", "Döküntü", "Egzantem"],
    ["Urticaria", "Ürtiker", "Kurdeşen"],
    ["Petechiae", "Peteşi", "Nokta kanama"],
    ["Purpura", "Purpura", "Mor lekeler"],
    ["Ecchymosis", "Ekimoz", "Çürük"],
    ["Pallor", "Solukluk", "Pallor"],
    ["Flushing", "Kızarma", "Flaşing"],
    ["Diaphoresis", "Terleme", "Diyaforez"],
    ["Alopecia", "Saç Dökülmesi", "Alopesi"],
  ];
  return symptoms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};
// Tıbbi semptomlar - Bölüm 2
const generateSymptoms2 = () => {
  const symptoms = [
    ["Abdominal pain", "Karın Ağrısı", "Abdominal ağrı"],
    ["Nausea", "Bulantı", "Mide bulantısı"],
    ["Vomiting", "Kusma", "Emezis"],
    ["Diarrhea", "İshal", "Diyare"],
    ["Constipation", "Kabızlık", "Konstipasyon"],
    ["Melena", "Melena", "Siyah dışkı"],
    ["Hematochezia", "Hematokezya", "Kanlı dışkı"],
    ["Hematemesis", "Hematemez", "Kan kusma"],
    ["Dyspepsia", "Dispepsi", "Hazımsızlık"],
    ["Heartburn", "Mide Yanması", "Pirozis"],
    ["Bloating", "Şişkinlik", "Abdominal distansiyon"],
    ["Flatulence", "Gaz", "Flatulans"],
    ["Tenesmus", "Tenesmus", "Dışkılama hissi"],
    ["Incontinence", "İnkontinans", "Kaçırma"],
    ["Urinary frequency", "Sık İdrara Çıkma", "Pollakiüri"],
    ["Urinary urgency", "İdrar Sıkışması", "Üriner aciliyet"],
    ["Dysuria", "Dizüri", "Ağrılı idrar"],
    ["Hematuria", "Hematüri", "Kanlı idrar"],
    ["Polyuria", "Poliüri", "Çok idrar"],
    ["Oliguria", "Oligüri", "Az idrar"],
    ["Anuria", "Anüri", "İdrar yokluğu"],
    ["Nocturia", "Noktüri", "Gece idrara kalkma"],
    ["Urinary retention", "İdrar Retansiyonu", "İdrar tutulması"],
    ["Flank pain", "Böğür Ağrısı", "Yan ağrısı"],
    ["Arthralgia", "Artralji", "Eklem ağrısı"],
    ["Myalgia", "Miyalji", "Kas ağrısı"],
    ["Back pain", "Sırt Ağrısı", "Dorsalji"],
    ["Neck pain", "Boyun Ağrısı", "Servikal ağrı"],
    ["Joint swelling", "Eklem Şişliği", "Artrit"],
    ["Joint stiffness", "Eklem Sertliği", "Tutukluk"],
    ["Limited range of motion", "Hareket Kısıtlılığı", "ROM azalması"],
    ["Muscle cramps", "Kas Krampları", "Kramp"],
    ["Muscle spasms", "Kas Spazmları", "Spazm"],
    ["Claudication", "Kladikasyon", "Topallama"],
    ["Restless legs", "Huzursuz Bacak", "RLS"],
    ["Photophobia", "Fotofobi", "Işık hassasiyeti"],
    ["Phonophobia", "Fonofobi", "Ses hassasiyeti"],
    ["Blurred vision", "Bulanık Görme", "Görme bulanıklığı"],
    ["Double vision", "Çift Görme", "Diplopi"],
    ["Visual field defect", "Görme Alanı Defekti", "Skotom"],
    ["Floaters", "Uçuşan Cisimler", "Floater"],
    ["Flashes", "Işık Çakmaları", "Fotopsi"],
    ["Eye pain", "Göz Ağrısı", "Oküler ağrı"],
    ["Red eye", "Kırmızı Göz", "Konjonktival hiperemi"],
    ["Eye discharge", "Göz Akıntısı", "Oküler akıntı"],
    ["Tearing", "Gözyaşı Akması", "Epifora"],
    ["Dry eyes", "Kuru Göz", "Kseroftalmi"],
    ["Hearing loss", "İşitme Kaybı", "Hipakuzi"],
    ["Tinnitus", "Kulak Çınlaması", "Tinnitus"],
    ["Ear pain", "Kulak Ağrısı", "Otalji"],
  ];
  return symptoms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};
// Ana fonksiyon
async function main() {
  console.log("🚀 10K Final Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(50));

  console.log("📝 Terimler oluşturuluyor...");

  const medicalTerms = generateMedicalTerms();
  const labTests1 = generateLabTests();
  const labTests2 = generateLabTests2();
  const labTests3 = generateLabTests3();
  const procedures1 = generateProcedures();
  const procedures2 = generateProcedures2();
  const procedures3 = generateProcedures3();
  const symptoms1 = generateSymptoms();
  const symptoms2 = generateSymptoms2();

  const allTerms = [
    ...medicalTerms,
    ...labTests1,
    ...labTests2,
    ...labTests3,
    ...procedures1,
    ...procedures2,
    ...procedures3,
    ...symptoms1,
    ...symptoms2,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Tıbbi terimler: ${medicalTerms.length}`);
  console.log(
    `   Lab testleri: ${labTests1.length + labTests2.length + labTests3.length}`
  );
  console.log(
    `   Prosedürler: ${
      procedures1.length + procedures2.length + procedures3.length
    }`
  );
  console.log(`   Semptomlar: ${symptoms1.length + symptoms2.length}`);
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
