// Final 807 - Son benzersiz terimler
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

// Tıbbi prosedürler
const generateMedicalProcedures = () => {
  const procedures = [
    ["Appendectomy", "Apendektomi", "Apendiks çıkarılması"],
    ["Cholecystectomy", "Kolesistektomi", "Safra kesesi çıkarılması"],
    ["Colectomy", "Kolektomi", "Kolon çıkarılması"],
    ["Gastrectomy", "Gastrektomi", "Mide çıkarılması"],
    ["Hepatectomy", "Hepatektomi", "Karaciğer rezeksiyonu"],
    ["Nephrectomy", "Nefrektomi", "Böbrek çıkarılması"],
    ["Splenectomy", "Splenektomi", "Dalak çıkarılması"],
    ["Pancreatectomy", "Pankreatektomi", "Pankreas çıkarılması"],
    ["Thyroidectomy", "Tiroidektomi", "Tiroid çıkarılması"],
    ["Parathyroidectomy", "Paratiroidektomi", "Paratiroid çıkarılması"],
    ["Adrenalectomy", "Adrenalektomi", "Adrenal bez çıkarılması"],
    ["Mastectomy", "Mastektomi", "Meme çıkarılması"],
    ["Lumpectomy", "Lumpektomi", "Meme kitlesi çıkarılması"],
    ["Hysterectomy", "Histerektomi", "Rahim çıkarılması"],
    ["Oophorectomy", "Ooforektomi", "Yumurtalık çıkarılması"],
    ["Salpingectomy", "Salpenjektomi", "Fallop tüpü çıkarılması"],
    ["Prostatectomy", "Prostatektomi", "Prostat çıkarılması"],
    ["Orchiectomy", "Orşiektomi", "Testis çıkarılması"],
    ["Cystectomy", "Sistektomi", "Mesane çıkarılması"],
    ["Pneumonectomy", "Pnömonektomi", "Akciğer çıkarılması"],
    ["Lobectomy", "Lobektomi", "Akciğer lobu çıkarılması"],
    ["Laryngectomy", "Larenjektomi", "Gırtlak çıkarılması"],
    ["Glossectomy", "Glossektomi", "Dil çıkarılması"],
    ["Tonsillectomy", "Tonsillektomi", "Bademcik çıkarılması"],
    ["Adenoidectomy", "Adenoidektomi", "Geniz eti çıkarılması"],
  ];
  return procedures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Daha fazla prosedürler
const generateMoreProcedures = () => {
  const procedures = [
    ["Craniotomy", "Kraniyotomi", "Kafatası açılması"],
    ["Craniectomy", "Kraniyektomi", "Kafatası kemiği çıkarılması"],
    ["Laminectomy", "Laminektomi", "Omurga lamina çıkarılması"],
    ["Discectomy", "Diskektomi", "Disk çıkarılması"],
    ["Foraminotomy", "Foraminotomi", "Sinir kanalı genişletme"],
    ["Arthroscopy", "Artroskopi", "Eklem endoskopisi"],
    ["Arthroplasty", "Artroplasti", "Eklem protezi"],
    ["Arthrodesis", "Artrodez", "Eklem füzyonu"],
    ["Osteotomy", "Osteotomi", "Kemik kesimi"],
    ["Fasciotomy", "Fasiyotomi", "Fasya kesimi"],
    ["Tenorrhaphy", "Tenorafi", "Tendon dikişi"],
    ["Neurorrhaphy", "Nörorafi", "Sinir dikişi"],
    ["Angioplasty", "Anjiyoplasti", "Damar genişletme"],
    ["Endarterectomy", "Endarterektomi", "Damar temizleme"],
    ["Embolectomy", "Embolektomi", "Emboli çıkarılması"],
    ["Thrombectomy", "Trombektomi", "Pıhtı çıkarılması"],
    ["Valvuloplasty", "Valvüloplasti", "Kapak onarımı"],
    ["Valvotomy", "Valvotomi", "Kapak kesimi"],
    ["Pericardiocentesis", "Perikardiyosentez", "Kalp zarı sıvısı alma"],
    ["Thoracotomy", "Torakotomi", "Göğüs açılması"],
  ];
  return procedures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Ek prosedürler
const generateExtraProcedures = () => {
  const procedures = [
    ["Laparotomy", "Laparotomi", "Karın açılması"],
    ["Laparoscopy", "Laparoskopi", "Karın endoskopisi"],
    ["Thoracoscopy", "Torakoskopi", "Göğüs endoskopisi"],
    ["Mediastinoscopy", "Mediyastinoskopi", "Göğüs ortası endoskopisi"],
    ["Bronchoscopy", "Bronkoskopi", "Bronş endoskopisi"],
    ["Esophagoscopy", "Özofagoskopi", "Yemek borusu endoskopisi"],
    ["Gastroscopy", "Gastroskopi", "Mide endoskopisi"],
    ["Duodenoscopy", "Duodenoskopi", "Onikiparmak endoskopisi"],
    ["Colonoscopy", "Kolonoskopi", "Kalın bağırsak endoskopisi"],
    ["Sigmoidoscopy", "Sigmoidoskopi", "Sigmoid kolon endoskopisi"],
    ["Proctoscopy", "Proktoskopi", "Rektum endoskopisi"],
    ["Anoscopy", "Anoskopi", "Anüs endoskopisi"],
    ["Cystoscopy", "Sistoskopi", "Mesane endoskopisi"],
    ["Ureteroscopy", "Üreteroskopi", "Üreter endoskopisi"],
    ["Nephroscopy", "Nefroskopi", "Böbrek endoskopisi"],
    ["Hysteroscopy", "Histeroskopi", "Rahim endoskopisi"],
    ["Colposcopy", "Kolposkopi", "Vajina büyütmeli muayene"],
    ["Rhinoscopy", "Rinoskopi", "Burun endoskopisi"],
    ["Laryngoscopy", "Laringoskopi", "Gırtlak endoskopisi"],
    ["Otoscopy", "Otoskopi", "Kulak muayenesi"],
  ];
  return procedures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Cerrahi teknikler
const generateSurgicalTechniques = () => {
  const techniques = [
    ["Anastomosis", "Anastomoz", "Bağırsak birleştirme"],
    ["Resection", "Rezeksiyon", "Doku çıkarılması"],
    ["Excision", "Eksizyon", "Kesip çıkarma"],
    ["Incision", "İnsizyon", "Kesme"],
    ["Ablation", "Ablasyon", "Doku yok etme"],
    ["Cauterization", "Koterizasyon", "Yakma"],
    ["Cryotherapy", "Kriyoterapi", "Dondurma tedavisi"],
    ["Debridement", "Debridman", "Ölü doku temizleme"],
    ["Drainage", "Drenaj", "Sıvı boşaltma"],
    ["Irrigation", "İrigasyon", "Yıkama"],
    ["Suturing", "Sütürasyon", "Dikiş atma"],
    ["Stapling", "Zımbalama", "Cerrahi zımba"],
    ["Ligation", "Ligasyon", "Bağlama"],
    ["Coagulation", "Koagülasyon", "Pıhtılaştırma"],
    ["Hemostasis", "Hemostaz", "Kanama durdurma"],
    ["Dissection", "Diseksiyon", "Ayırma"],
    ["Mobilization", "Mobilizasyon", "Serbestleştirme"],
    ["Reconstruction", "Rekonstrüksiyon", "Yeniden yapılandırma"],
    ["Transplantation", "Transplantasyon", "Nakil"],
    ["Implantation", "İmplantasyon", "Yerleştirme"],
  ];
  return techniques.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Tıbbi durumlar - Sendromlar
const generateSyndromes = () => {
  const syndromes = [
    ["Down syndrome", "Down Sendromu", "Trizomi 21"],
    ["Turner syndrome", "Turner Sendromu", "45,X kromozom anomalisi"],
    [
      "Klinefelter syndrome",
      "Klinefelter Sendromu",
      "47,XXY kromozom anomalisi",
    ],
    ["Marfan syndrome", "Marfan Sendromu", "Bağ doku hastalığı"],
    ["Ehlers-Danlos syndrome", "Ehlers-Danlos Sendromu", "Bağ doku hastalığı"],
    ["Cushing syndrome", "Cushing Sendromu", "Kortizol fazlalığı"],
    ["Addison disease", "Addison Hastalığı", "Adrenal yetmezlik"],
    ["Graves disease", "Graves Hastalığı", "Otoimmün hipertiroidi"],
    ["Hashimoto thyroiditis", "Hashimoto Tiroiditi", "Otoimmün hipotiroidi"],
    ["Sjogren syndrome", "Sjögren Sendromu", "Kuru göz ve ağız"],
    ["Raynaud phenomenon", "Raynaud Fenomeni", "Parmak dolaşım bozukluğu"],
    ["Carpal tunnel syndrome", "Karpal Tünel Sendromu", "El sinir sıkışması"],
    ["Tarsal tunnel syndrome", "Tarsal Tünel Sendromu", "Ayak sinir sıkışması"],
    [
      "Thoracic outlet syndrome",
      "Torasik Çıkış Sendromu",
      "Boyun-kol sıkışması",
    ],
    ["Piriformis syndrome", "Piriformis Sendromu", "Kalça sinir sıkışması"],
    [
      "Restless legs syndrome",
      "Huzursuz Bacak Sendromu",
      "Bacak hareket bozukluğu",
    ],
    [
      "Chronic fatigue syndrome",
      "Kronik Yorgunluk Sendromu",
      "Sürekli yorgunluk",
    ],
    ["Fibromyalgia syndrome", "Fibromiyalji Sendromu", "Yaygın ağrı sendromu"],
    [
      "Irritable bowel syndrome",
      "İrritabl Bağırsak Sendromu",
      "Fonksiyonel bağırsak",
    ],
    ["Metabolic syndrome", "Metabolik Sendrom", "Obezite-diyabet-tansiyon"],
  ];
  return syndromes.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla sendromlar
const generateMoreSyndromes = () => {
  const syndromes = [
    [
      "Polycystic ovary syndrome",
      "Polikistik Over Sendromu",
      "Hormonal bozukluk",
    ],
    ["Premenstrual syndrome", "Premenstrüel Sendrom", "Adet öncesi belirtiler"],
    ["Menopause syndrome", "Menopoz Sendromu", "Menopoz belirtileri"],
    ["Andropause syndrome", "Andropoz Sendromu", "Erkek menopoz"],
    ["Nephrotic syndrome", "Nefrotik Sendrom", "Böbrek protein kaybı"],
    ["Nephritic syndrome", "Nefritik Sendrom", "Böbrek iltihabı"],
    [
      "Hepatorenal syndrome",
      "Hepatorenal Sendrom",
      "Karaciğer-böbrek yetmezliği",
    ],
    ["Hepatopulmonary syndrome", "Hepatopulmoner Sendrom", "Karaciğer-akciğer"],
    ["Acute coronary syndrome", "Akut Koroner Sendrom", "Kalp krizi spektrumu"],
    ["Compartment syndrome", "Kompartman Sendromu", "Kas basınç artışı"],
    ["Crush syndrome", "Ezilme Sendromu", "Kas yıkımı"],
    [
      "Refeeding syndrome",
      "Yeniden Beslenme Sendromu",
      "Açlık sonrası beslenme",
    ],
    ["Dumping syndrome", "Damping Sendromu", "Mide ameliyatı sonrası"],
    ["Short bowel syndrome", "Kısa Bağırsak Sendromu", "Bağırsak yetersizliği"],
    ["Blind loop syndrome", "Kör Ans Sendromu", "Bağırsak aşırı üremesi"],
    ["Malabsorption syndrome", "Malabsorpsiyon Sendromu", "Emilim bozukluğu"],
    ["Carcinoid syndrome", "Karsinoid Sendrom", "Nöroendokrin tümör"],
    ["Paraneoplastic syndrome", "Paraneoplastik Sendrom", "Kanser ilişkili"],
    [
      "Tumor lysis syndrome",
      "Tümör Lizis Sendromu",
      "Kanser tedavi komplikasyonu",
    ],
    [
      "Superior vena cava syndrome",
      "Süperior Vena Kava Sendromu",
      "Üst vena tıkanması",
    ],
  ];
  return syndromes.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Patolojik durumlar
const generatePathologicalConditions = () => {
  const conditions = [
    ["Atrophy", "Atrofi", "Doku küçülmesi"],
    ["Hypertrophy", "Hipertrofi", "Doku büyümesi"],
    ["Hyperplasia", "Hiperplazi", "Hücre sayısı artışı"],
    ["Metaplasia", "Metaplazi", "Hücre tipi değişimi"],
    ["Dysplasia", "Displazi", "Anormal hücre gelişimi"],
    ["Neoplasia", "Neoplazi", "Yeni doku oluşumu"],
    ["Anaplasia", "Anaplazi", "Hücre farklılaşma kaybı"],
    ["Necrosis", "Nekroz", "Doku ölümü"],
    ["Apoptosis", "Apoptoz", "Programlı hücre ölümü"],
    ["Gangrene", "Gangren", "Doku çürümesi"],
    ["Infarction", "Enfarktüs", "Kan akımı kesilmesi"],
    ["Ischemia", "İskemi", "Kan akımı azalması"],
    ["Hemorrhage", "Hemoraji", "Kanama"],
    ["Thrombosis", "Tromboz", "Pıhtı oluşumu"],
    ["Embolism", "Emboli", "Pıhtı göçü"],
    ["Stenosis", "Stenoz", "Daralma"],
    ["Occlusion", "Oklüzyon", "Tıkanma"],
    ["Perforation", "Perforasyon", "Delinme"],
    ["Rupture", "Rüptür", "Yırtılma"],
    ["Fistula", "Fistül", "Anormal bağlantı"],
  ];
  return conditions.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla patolojik durumlar
const generateMorePathologicalConditions = () => {
  const conditions = [
    ["Abscess", "Apse", "İrin birikimi"],
    ["Cellulitis", "Selülit", "Deri altı enfeksiyonu"],
    ["Phlegmon", "Flegmon", "Yaygın enfeksiyon"],
    ["Empyema", "Ampiyem", "Boşlukta irin"],
    ["Effusion", "Efüzyon", "Sıvı birikimi"],
    ["Exudate", "Eksüda", "İltihabi sıvı"],
    ["Transudate", "Transüda", "Non-iltihabi sıvı"],
    ["Edema", "Ödem", "Doku şişmesi"],
    ["Lymphedema", "Lenfödem", "Lenf sıvısı birikimi"],
    ["Anasarca", "Anazarka", "Yaygın ödem"],
    ["Ascites", "Asit", "Karın sıvısı"],
    ["Hydrothorax", "Hidrotoraks", "Göğüs sıvısı"],
    ["Hydrocephalus", "Hidrosefali", "Beyin sıvısı birikimi"],
    ["Pneumothorax", "Pnömotoraks", "Göğüste hava"],
    ["Hemothorax", "Hemotoraks", "Göğüste kan"],
    ["Pyothorax", "Piyotoraks", "Göğüste irin"],
    ["Chylothorax", "Şilotoraks", "Göğüste lenf sıvısı"],
    ["Hematoma", "Hematom", "Kan birikimi"],
    ["Seroma", "Seroma", "Seröz sıvı birikimi"],
    ["Cyst", "Kist", "Sıvı dolu kese"],
  ];
  return conditions.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Anatomik varyasyonlar
const generateAnatomicalVariations = () => {
  const variations = [
    ["Dextrocardia", "Dekstrokardi", "Kalbin sağda olması"],
    ["Situs inversus", "Situs İnversus", "Organların ters yerleşimi"],
    ["Polydactyly", "Polidaktili", "Fazla parmak"],
    ["Syndactyly", "Sindaktili", "Yapışık parmak"],
    ["Brachydactyly", "Brakidaktili", "Kısa parmak"],
    ["Arachnodactyly", "Araknodaktili", "Uzun ince parmak"],
    ["Clinodactyly", "Klinodaktili", "Eğri parmak"],
    ["Camptodactyly", "Kamptodaktili", "Bükük parmak"],
    ["Macrodactyly", "Makrodaktili", "Büyük parmak"],
    ["Ectrodactyly", "Ektrodaktili", "Eksik parmak"],
    ["Polythelia", "Politeli", "Fazla meme başı"],
    ["Polymastia", "Polimasti", "Fazla meme"],
    ["Amastia", "Amasti", "Meme yokluğu"],
    ["Athelia", "Ateli", "Meme başı yokluğu"],
    ["Microtia", "Mikrotia", "Küçük kulak"],
    ["Anotia", "Anotia", "Kulak yokluğu"],
    ["Macrotia", "Makrotia", "Büyük kulak"],
    ["Cryptotia", "Kriptotia", "Gömük kulak"],
    ["Microphthalmia", "Mikroftalmi", "Küçük göz"],
    ["Anophthalmia", "Anoftalmi", "Göz yokluğu"],
  ];
  return variations.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Konjenital anomaliler
const generateCongenitalAnomalies = () => {
  const anomalies = [
    ["Cleft lip", "Yarık Dudak", "Dudak yarığı"],
    ["Cleft palate", "Yarık Damak", "Damak yarığı"],
    ["Spina bifida", "Spina Bifida", "Omurga yarığı"],
    ["Anencephaly", "Anensefali", "Beyin yokluğu"],
    ["Encephalocele", "Ensefalosel", "Beyin fıtığı"],
    ["Meningocele", "Meningosel", "Zar fıtığı"],
    ["Myelomeningocele", "Miyelomeningosel", "Omurilik fıtığı"],
    [
      "Hydrocephalus congenital",
      "Konjenital Hidrosefali",
      "Doğuştan beyin sıvısı",
    ],
    ["Craniosynostosis", "Kraniyosinostoz", "Erken kafatası kapanması"],
    ["Plagiocephaly", "Plajiysefali", "Asimetrik kafa"],
    ["Scaphocephaly", "Skafosefali", "Uzun dar kafa"],
    ["Brachycephaly", "Brakisefali", "Kısa geniş kafa"],
    ["Trigonocephaly", "Trigonosefali", "Üçgen kafa"],
    ["Omphalocele", "Omfalosel", "Göbek fıtığı"],
    ["Gastroschisis", "Gastroşizis", "Karın duvarı defekti"],
    ["Diaphragmatic hernia", "Diyafram Hernisi", "Diyafram fıtığı"],
    ["Esophageal atresia", "Özofagus Atrezisi", "Yemek borusu tıkanıklığı"],
    ["Duodenal atresia", "Duodenal Atrezi", "Onikiparmak tıkanıklığı"],
    ["Imperforate anus", "İmperfore Anüs", "Anüs yokluğu"],
    [
      "Hirschsprung disease",
      "Hirschsprung Hastalığı",
      "Bağırsak sinir yokluğu",
    ],
  ];
  return anomalies.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Kalp anomalileri
const generateCardiacAnomalies = () => {
  const anomalies = [
    ["Atrial septal defect", "Atriyal Septal Defekt", "Kulakçık deliği"],
    [
      "Ventricular septal defect",
      "Ventriküler Septal Defekt",
      "Karıncık deliği",
    ],
    ["Patent ductus arteriosus", "Patent Duktus Arteriozus", "Açık duktus"],
    ["Tetralogy of Fallot", "Fallot Tetralojisi", "Dört anomali birlikteliği"],
    [
      "Transposition of great arteries",
      "Büyük Arter Transpozisyonu",
      "Damar yer değişimi",
    ],
    ["Coarctation of aorta", "Aort Koarktasyonu", "Aort daralması"],
    ["Pulmonary stenosis", "Pulmoner Stenoz", "Akciğer kapak darlığı"],
    [
      "Aortic stenosis congenital",
      "Konjenital Aort Stenozu",
      "Aort kapak darlığı",
    ],
    ["Tricuspid atresia", "Triküspit Atrezisi", "Triküspit kapak yokluğu"],
    ["Pulmonary atresia", "Pulmoner Atrezi", "Pulmoner kapak yokluğu"],
    ["Hypoplastic left heart", "Hipoplastik Sol Kalp", "Sol kalp gelişmemesi"],
    ["Ebstein anomaly", "Ebstein Anomalisi", "Triküspit anomalisi"],
    ["Truncus arteriosus", "Trunkus Arteriozus", "Tek büyük damar"],
    [
      "Total anomalous pulmonary venous return",
      "Total Anormal Pulmoner Venöz Dönüş",
      "Pulmoner ven anomalisi",
    ],
    [
      "Double outlet right ventricle",
      "Çift Çıkışlı Sağ Ventrikül",
      "Damar çıkış anomalisi",
    ],
    ["Single ventricle", "Tek Ventrikül", "Tek karıncık"],
    [
      "Atrioventricular canal defect",
      "Atriyoventriküler Kanal Defekti",
      "AV kanal anomalisi",
    ],
    ["Cor triatriatum", "Kor Triatriatum", "Üç kulakçıklı kalp"],
    ["Anomalous coronary artery", "Anormal Koroner Arter", "Koroner anomalisi"],
    ["Vascular ring", "Vasküler Halka", "Damar halkası"],
  ];
  return anomalies.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Ürogenital anomaliler
const generateUrogenitalAnomalies = () => {
  const anomalies = [
    ["Hypospadias", "Hipospadias", "İdrar deliği alt yerleşimi"],
    ["Epispadias", "Epispadias", "İdrar deliği üst yerleşimi"],
    ["Cryptorchidism", "Kriptorşidizm", "İnmemiş testis"],
    ["Hydrocele", "Hidrosel", "Testis sıvı birikimi"],
    ["Varicocele", "Varikosel", "Testis damar genişlemesi"],
    ["Phimosis", "Fimozis", "Sünnet derisi darlığı"],
    ["Paraphimosis", "Parafimozis", "Sünnet derisi sıkışması"],
    ["Micropenis", "Mikropenis", "Küçük penis"],
    ["Ambiguous genitalia", "Belirsiz Genitalya", "Cinsiyet belirsizliği"],
    ["Horseshoe kidney", "At Nalı Böbrek", "Birleşik böbrek"],
    ["Duplex kidney", "Dupleks Böbrek", "Çift toplayıcı sistem"],
    ["Ectopic kidney", "Ektopik Böbrek", "Yerinden böbrek"],
    ["Pelvic kidney", "Pelvik Böbrek", "Pelviste böbrek"],
    ["Crossed fused ectopia", "Çapraz Füzyon Ektopi", "Çapraz böbrek"],
    ["Renal agenesis", "Renal Agenezi", "Böbrek yokluğu"],
    [
      "Multicystic dysplastic kidney",
      "Multikistik Displastik Böbrek",
      "Kistik böbrek",
    ],
    [
      "Polycystic kidney disease",
      "Polikistik Böbrek Hastalığı",
      "Çok kistli böbrek",
    ],
    [
      "Ureteropelvic junction obstruction",
      "Üreteropelvik Bileşke Obstrüksiyonu",
      "Böbrek çıkış tıkanıklığı",
    ],
    ["Vesicoureteral reflux", "Vezikoüreteral Reflü", "İdrar geri akışı"],
    ["Posterior urethral valves", "Posterior Üretral Valv", "Üretra kapakçığı"],
  ];
  return anomalies.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Kas-iskelet anomalileri
const generateMusculoskeletalAnomalies = () => {
  const anomalies = [
    ["Clubfoot", "Çarpık Ayak", "Pes ekinovarus"],
    ["Flatfoot", "Düz Taban", "Pes planus"],
    ["Cavus foot", "Kavus Ayak", "Yüksek ark"],
    ["Metatarsus adductus", "Metatarsus Adduktus", "İçe dönük ayak"],
    ["Vertical talus", "Vertikal Talus", "Dikey aşık kemiği"],
    ["Tarsal coalition", "Tarsal Koalisyon", "Ayak kemik birleşmesi"],
    ["Hip dysplasia", "Kalça Displazisi", "Kalça gelişim bozukluğu"],
    [
      "Legg-Calve-Perthes disease",
      "Legg-Calve-Perthes Hastalığı",
      "Kalça kemik nekrozu",
    ],
    [
      "Slipped capital femoral epiphysis",
      "Femur Başı Epifiz Kayması",
      "Kalça epifiz kayması",
    ],
    ["Genu varum", "Genu Varum", "O bacak"],
    ["Genu valgum", "Genu Valgum", "X bacak"],
    ["Genu recurvatum", "Genu Rekurvatum", "Aşırı diz açılması"],
    ["Tibial torsion", "Tibial Torsiyon", "Kaval kemik dönmesi"],
    ["Femoral anteversion", "Femoral Anteversiyon", "Uyluk kemiği dönmesi"],
    ["Scoliosis", "Skolyoz", "Omurga eğriliği"],
    ["Kyphosis", "Kifoz", "Kamburluk"],
    ["Lordosis", "Lordoz", "Bel çukurluğu"],
    ["Torticollis", "Tortikolis", "Boyun eğriliği"],
    ["Sprengel deformity", "Sprengel Deformitesi", "Yüksek kürek kemiği"],
    ["Klippel-Feil syndrome", "Klippel-Feil Sendromu", "Boyun omur füzyonu"],
  ];
  return anomalies.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla kas-iskelet anomalileri
const generateMoreMusculoskeletalAnomalies = () => {
  const anomalies = [
    ["Achondroplasia", "Akondroplazi", "Cücelik"],
    [
      "Osteogenesis imperfecta",
      "Osteogenezis İmperfekta",
      "Cam kemik hastalığı",
    ],
    ["Osteopetrosis", "Osteopetrozis", "Mermer kemik hastalığı"],
    ["Fibrous dysplasia", "Fibröz Displazi", "Kemik fibröz değişimi"],
    ["Osteochondroma", "Osteokondrom", "Kemik-kıkırdak tümörü"],
    ["Enchondroma", "Enkondrom", "Kıkırdak tümörü"],
    ["Osteoid osteoma", "Osteoid Osteom", "Kemik tümörü"],
    ["Osteoblastoma", "Osteoblastom", "Kemik tümörü"],
    ["Giant cell tumor", "Dev Hücreli Tümör", "Kemik tümörü"],
    ["Aneurysmal bone cyst", "Anevrizmal Kemik Kisti", "Kemik kisti"],
    ["Simple bone cyst", "Basit Kemik Kisti", "Unikameral kist"],
    ["Ewing sarcoma", "Ewing Sarkomu", "Kemik kanseri"],
    ["Osteosarcoma", "Osteosarkom", "Kemik kanseri"],
    ["Chondrosarcoma", "Kondrosarkom", "Kıkırdak kanseri"],
    ["Multiple myeloma", "Multipl Miyelom", "Plazma hücre kanseri"],
    [
      "Paget disease of bone",
      "Kemik Paget Hastalığı",
      "Kemik yeniden yapılanma",
    ],
    ["Osteomalacia", "Osteomalazi", "Kemik yumuşaması"],
    ["Rickets", "Raşitizm", "D vitamini eksikliği"],
    ["Osteoporosis", "Osteoporoz", "Kemik erimesi"],
    ["Osteonecrosis", "Osteonekroz", "Kemik ölümü"],
  ];
  return anomalies.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Nörolojik hastalıklar
const generateNeurologicalDiseases = () => {
  const diseases = [
    ["Alzheimer disease", "Alzheimer Hastalığı", "Demans"],
    ["Parkinson disease", "Parkinson Hastalığı", "Hareket bozukluğu"],
    ["Multiple sclerosis", "Multipl Skleroz", "Demiyelinizan hastalık"],
    [
      "Amyotrophic lateral sclerosis",
      "Amiyotrofik Lateral Skleroz",
      "Motor nöron hastalığı",
    ],
    ["Huntington disease", "Huntington Hastalığı", "Hareket bozukluğu"],
    ["Myasthenia gravis", "Miyastenia Gravis", "Nöromüsküler hastalık"],
    ["Guillain-Barre syndrome", "Guillain-Barré Sendromu", "Akut polinöropati"],
    ["Bell palsy", "Bell Paralizisi", "Yüz felci"],
    ["Trigeminal neuralgia", "Trigeminal Nevralji", "Yüz ağrısı"],
    ["Epilepsy", "Epilepsi", "Sara hastalığı"],
    ["Status epilepticus", "Status Epileptikus", "Sürekli nöbet"],
    ["Febrile seizure", "Febril Konvülziyon", "Ateşli havale"],
    ["Absence seizure", "Absans Nöbet", "Dalma nöbeti"],
    ["Tonic-clonic seizure", "Tonik-Klonik Nöbet", "Büyük nöbet"],
    ["Focal seizure", "Fokal Nöbet", "Parsiyel nöbet"],
    ["Stroke", "İnme", "Beyin damar hastalığı"],
    ["Transient ischemic attack", "Geçici İskemik Atak", "Mini inme"],
    ["Subarachnoid hemorrhage", "Subaraknoid Kanama", "Beyin zarı kanaması"],
    ["Subdural hematoma", "Subdural Hematom", "Beyin zarı altı kanama"],
    ["Epidural hematoma", "Epidural Hematom", "Beyin zarı üstü kanama"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla nörolojik hastalıklar
const generateMoreNeurologicalDiseases = () => {
  const diseases = [
    ["Cerebral palsy", "Serebral Palsi", "Beyin felci"],
    ["Spinal cord injury", "Omurilik Yaralanması", "Omurilik hasarı"],
    ["Paraplegia", "Parapleji", "Alt ekstremite felci"],
    ["Quadriplegia", "Kuadripleji", "Dört ekstremite felci"],
    ["Hemiplegia", "Hemipleji", "Yarım vücut felci"],
    ["Monoplegia", "Monopleji", "Tek ekstremite felci"],
    ["Peripheral neuropathy", "Periferik Nöropati", "Çevresel sinir hastalığı"],
    ["Diabetic neuropathy", "Diyabetik Nöropati", "Şeker sinir hasarı"],
    ["Carpal tunnel syndrome", "Karpal Tünel Sendromu", "El sinir sıkışması"],
    ["Sciatica", "Siyatik", "Siyatik sinir ağrısı"],
    ["Radiculopathy", "Radikülopati", "Sinir kökü hastalığı"],
    ["Myelopathy", "Miyelopati", "Omurilik hastalığı"],
    ["Encephalopathy", "Ensefalopati", "Beyin hastalığı"],
    ["Meningitis", "Menenjit", "Beyin zarı iltihabı"],
    ["Encephalitis", "Ensefalit", "Beyin iltihabı"],
    ["Brain abscess", "Beyin Apsesi", "Beyin irini"],
    ["Hydrocephalus", "Hidrosefali", "Beyin sıvısı birikimi"],
    [
      "Normal pressure hydrocephalus",
      "Normal Basınçlı Hidrosefali",
      "Yaşlılık hidrosefali",
    ],
    ["Pseudotumor cerebri", "Psödotümör Serebri", "Yalancı beyin tümörü"],
    ["Chiari malformation", "Chiari Malformasyonu", "Beyin sarkması"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 FINAL 807 - 10,000 HEDEFİNİ TAMAMLAMA");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const medicalProcedures = generateMedicalProcedures();
  const moreProcedures = generateMoreProcedures();
  const extraProcedures = generateExtraProcedures();
  const surgicalTechniques = generateSurgicalTechniques();
  const syndromes = generateSyndromes();
  const moreSyndromes = generateMoreSyndromes();
  const pathologicalConditions = generatePathologicalConditions();
  const morePathologicalConditions = generateMorePathologicalConditions();
  const anatomicalVariations = generateAnatomicalVariations();
  const congenitalAnomalies = generateCongenitalAnomalies();
  const cardiacAnomalies = generateCardiacAnomalies();
  const urogenitalAnomalies = generateUrogenitalAnomalies();
  const musculoskeletalAnomalies = generateMusculoskeletalAnomalies();
  const moreMusculoskeletalAnomalies = generateMoreMusculoskeletalAnomalies();
  const neurologicalDiseases = generateNeurologicalDiseases();
  const moreNeurologicalDiseases = generateMoreNeurologicalDiseases();

  const allTerms = [
    ...medicalProcedures,
    ...moreProcedures,
    ...extraProcedures,
    ...surgicalTechniques,
    ...syndromes,
    ...moreSyndromes,
    ...pathologicalConditions,
    ...morePathologicalConditions,
    ...anatomicalVariations,
    ...congenitalAnomalies,
    ...cardiacAnomalies,
    ...urogenitalAnomalies,
    ...musculoskeletalAnomalies,
    ...moreMusculoskeletalAnomalies,
    ...neurologicalDiseases,
    ...moreNeurologicalDiseases,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(
    `   Tıbbi Prosedürler: ${
      medicalProcedures.length + moreProcedures.length + extraProcedures.length
    }`
  );
  console.log(`   Cerrahi Teknikler: ${surgicalTechniques.length}`);
  console.log(`   Sendromlar: ${syndromes.length + moreSyndromes.length}`);
  console.log(
    `   Patolojik Durumlar: ${
      pathologicalConditions.length + morePathologicalConditions.length
    }`
  );
  console.log(`   Anatomik Varyasyonlar: ${anatomicalVariations.length}`);
  console.log(`   Konjenital Anomaliler: ${congenitalAnomalies.length}`);
  console.log(`   Kalp Anomalileri: ${cardiacAnomalies.length}`);
  console.log(`   Ürogenital Anomaliler: ${urogenitalAnomalies.length}`);
  console.log(
    `   Kas-İskelet Anomalileri: ${
      musculoskeletalAnomalies.length + moreMusculoskeletalAnomalies.length
    }`
  );
  console.log(
    `   Nörolojik Hastalıklar: ${
      neurologicalDiseases.length + moreNeurologicalDiseases.length
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
