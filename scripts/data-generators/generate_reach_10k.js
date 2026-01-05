// Reach 10K - Son 659 terim
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

// Dermatolojik hastalıklar
const generateDermatologicalDiseases = () => {
  const diseases = [
    ["Psoriasis", "Sedef Hastalığı", "Kronik deri hastalığı"],
    ["Eczema", "Egzama", "Atopik dermatit"],
    ["Acne vulgaris", "Akne Vulgaris", "Sivilce"],
    ["Rosacea", "Rozasea", "Yüz kızarıklığı"],
    ["Vitiligo", "Vitiligo", "Deri renk kaybı"],
    ["Alopecia areata", "Alopesi Areata", "Saç dökülmesi"],
    ["Urticaria", "Ürtiker", "Kurdeşen"],
    ["Angioedema", "Anjiyoödem", "Derin doku şişmesi"],
    ["Contact dermatitis", "Kontakt Dermatit", "Temas alerjisi"],
    ["Seborrheic dermatitis", "Seboreik Dermatit", "Yağlı deri iltihabı"],
    ["Tinea corporis", "Tinea Korporis", "Vücut mantarı"],
    ["Tinea pedis", "Tinea Pedis", "Ayak mantarı"],
    ["Tinea cruris", "Tinea Kruris", "Kasık mantarı"],
    ["Tinea capitis", "Tinea Kapitis", "Saçlı deri mantarı"],
    ["Onychomycosis", "Onikomikoz", "Tırnak mantarı"],
    ["Candidiasis cutaneous", "Kutanöz Kandidiyazis", "Deri mantarı"],
    ["Impetigo", "İmpetigo", "Deri enfeksiyonu"],
    ["Cellulitis", "Selülit", "Deri altı enfeksiyonu"],
    ["Erysipelas", "Erizipel", "Yüzeyel deri enfeksiyonu"],
    ["Folliculitis", "Folikülit", "Kıl folikülü iltihabı"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla dermatolojik hastalıklar
const generateMoreDermatologicalDiseases = () => {
  const diseases = [
    ["Furuncle", "Furunkül", "Çıban"],
    ["Carbuncle", "Karbonkül", "Büyük çıban"],
    ["Abscess cutaneous", "Kutanöz Apse", "Deri apsesi"],
    ["Herpes simplex", "Herpes Simpleks", "Uçuk"],
    ["Herpes zoster", "Herpes Zoster", "Zona"],
    ["Molluscum contagiosum", "Molluskum Kontagiyozum", "Bulaşıcı yumuşak ur"],
    ["Verruca vulgaris", "Verruka Vulgaris", "Siğil"],
    ["Condyloma acuminatum", "Kondiloma Aküminatum", "Genital siğil"],
    ["Scabies", "Uyuz", "Uyuz hastalığı"],
    ["Pediculosis", "Pedikulozis", "Bit enfestasyonu"],
    ["Lichen planus", "Liken Planus", "Deri döküntüsü"],
    ["Pityriasis rosea", "Pitiriazis Rozea", "Pembe pullu döküntü"],
    ["Pityriasis versicolor", "Pitiriazis Versikolor", "Kepekli mantar"],
    ["Pemphigus vulgaris", "Pemfigus Vulgaris", "Otoimmün kabarcık"],
    ["Bullous pemphigoid", "Büllöz Pemfigoid", "Kabarcıklı hastalık"],
    [
      "Dermatitis herpetiformis",
      "Dermatitis Herpetiformis",
      "Çölyak deri bulgusu",
    ],
    ["Erythema multiforme", "Eritema Multiforme", "Hedef lezyonlar"],
    [
      "Stevens-Johnson syndrome",
      "Stevens-Johnson Sendromu",
      "Ciddi deri reaksiyonu",
    ],
    [
      "Toxic epidermal necrolysis",
      "Toksik Epidermal Nekroliz",
      "Deri soyulması",
    ],
    ["Drug eruption", "İlaç Döküntüsü", "İlaç reaksiyonu"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Göz hastalıkları
const generateOphthalmicDiseases = () => {
  const diseases = [
    ["Cataract", "Katarakt", "Göz merceği bulanıklığı"],
    ["Glaucoma", "Glokom", "Göz tansiyonu"],
    ["Macular degeneration", "Makula Dejenerasyonu", "Sarı nokta hastalığı"],
    ["Diabetic retinopathy", "Diyabetik Retinopati", "Şeker göz hasarı"],
    ["Retinal detachment", "Retina Dekolmanı", "Retina ayrılması"],
    ["Conjunctivitis", "Konjonktivit", "Göz iltihabı"],
    ["Keratitis", "Keratit", "Kornea iltihabı"],
    ["Uveitis", "Üveit", "Üvea iltihabı"],
    ["Blepharitis", "Blefarit", "Göz kapağı iltihabı"],
    ["Chalazion", "Şalazyon", "Göz kapağı kisti"],
    ["Hordeolum", "Arpacık", "Göz kapağı enfeksiyonu"],
    ["Pterygium", "Pterijyum", "Göz eti"],
    ["Pinguecula", "Pingekula", "Göz sarı lekesi"],
    ["Dry eye syndrome", "Kuru Göz Sendromu", "Gözyaşı yetersizliği"],
    ["Strabismus", "Şaşılık", "Göz kayması"],
    ["Amblyopia", "Ambliyopi", "Tembel göz"],
    ["Nystagmus", "Nistagmus", "Göz titremesi"],
    ["Optic neuritis", "Optik Nörit", "Görme siniri iltihabı"],
    ["Papilledema", "Papilödem", "Optik disk şişmesi"],
    ["Retinitis pigmentosa", "Retinitis Pigmentoza", "Retina dejenerasyonu"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Kulak burun boğaz hastalıkları
const generateENTDiseases = () => {
  const diseases = [
    ["Otitis media", "Otitis Media", "Orta kulak iltihabı"],
    ["Otitis externa", "Otitis Eksterna", "Dış kulak iltihabı"],
    ["Mastoiditis", "Mastoidit", "Mastoid kemiği iltihabı"],
    ["Cholesteatoma", "Kolesteatom", "Kulak kisti"],
    [
      "Tympanic membrane perforation",
      "Kulak Zarı Perforasyonu",
      "Kulak zarı delinmesi",
    ],
    ["Otosclerosis", "Otoskleroz", "Kulak kemiği sertleşmesi"],
    ["Meniere disease", "Meniere Hastalığı", "İç kulak hastalığı"],
    ["Benign paroxysmal positional vertigo", "BPPV", "Pozisyonel baş dönmesi"],
    ["Labyrinthitis", "Labirentit", "İç kulak iltihabı"],
    ["Vestibular neuritis", "Vestibüler Nörit", "Denge siniri iltihabı"],
    ["Tinnitus", "Tinnitus", "Kulak çınlaması"],
    ["Hearing loss", "İşitme Kaybı", "Sağırlık"],
    ["Presbycusis", "Presbikuzi", "Yaşa bağlı işitme kaybı"],
    ["Sinusitis", "Sinüzit", "Sinüs iltihabı"],
    ["Rhinitis", "Rinit", "Burun iltihabı"],
    ["Allergic rhinitis", "Alerjik Rinit", "Saman nezlesi"],
    ["Nasal polyp", "Nazal Polip", "Burun polipi"],
    ["Deviated septum", "Septum Deviasyonu", "Burun kemiği eğriliği"],
    ["Epistaxis", "Epistaksis", "Burun kanaması"],
    ["Pharyngitis", "Farenjit", "Boğaz iltihabı"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla KBB hastalıkları
const generateMoreENTDiseases = () => {
  const diseases = [
    ["Tonsillitis", "Tonsillit", "Bademcik iltihabı"],
    ["Peritonsillar abscess", "Peritonsiller Apse", "Bademcik çevresi apse"],
    ["Laryngitis", "Larenjit", "Gırtlak iltihabı"],
    ["Epiglottitis", "Epiglottit", "Gırtlak kapağı iltihabı"],
    ["Vocal cord nodule", "Ses Teli Nodülü", "Ses teli yumrusu"],
    ["Vocal cord polyp", "Ses Teli Polipi", "Ses teli polipi"],
    ["Laryngeal cancer", "Larinks Kanseri", "Gırtlak kanseri"],
    ["Nasopharyngeal carcinoma", "Nazofarinks Karsinomu", "Geniz kanseri"],
    ["Oral cancer", "Ağız Kanseri", "Ağız boşluğu kanseri"],
    ["Tongue cancer", "Dil Kanseri", "Dil kanseri"],
    ["Salivary gland tumor", "Tükürük Bezi Tümörü", "Tükürük bezi tümörü"],
    ["Parotid tumor", "Parotis Tümörü", "Parotis bezi tümörü"],
    ["Thyroglossal duct cyst", "Tiroglossal Kanal Kisti", "Boyun kisti"],
    ["Branchial cleft cyst", "Brankiyal Yarık Kisti", "Boyun kisti"],
    ["Ranula", "Ranula", "Dil altı kisti"],
    ["Mucocele", "Mukosel", "Mukus kisti"],
    ["Sleep apnea", "Uyku Apnesi", "Uyku solunum durması"],
    ["Snoring", "Horlama", "Uyku horlaması"],
    ["Dysphagia", "Disfaji", "Yutma güçlüğü"],
    ["Globus sensation", "Globus Hissi", "Boğazda yumru hissi"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Endokrin hastalıklar
const generateEndocrineDiseases = () => {
  const diseases = [
    ["Diabetes mellitus type 1", "Tip 1 Diyabet", "İnsülin bağımlı diyabet"],
    ["Diabetes mellitus type 2", "Tip 2 Diyabet", "İnsülin direnci diyabeti"],
    ["Gestational diabetes", "Gestasyonel Diyabet", "Gebelik diyabeti"],
    ["Diabetic ketoacidosis", "Diyabetik Ketoasidoz", "Diyabet komplikasyonu"],
    [
      "Hyperosmolar hyperglycemic state",
      "Hiperozmolar Hiperglisemik Durum",
      "Diyabet acili",
    ],
    ["Hypoglycemia", "Hipoglisemi", "Düşük kan şekeri"],
    ["Hyperthyroidism", "Hipertiroidi", "Tiroid fazla çalışması"],
    ["Hypothyroidism", "Hipotiroidi", "Tiroid az çalışması"],
    ["Thyroid nodule", "Tiroid Nodülü", "Tiroid yumrusu"],
    ["Thyroid cancer", "Tiroid Kanseri", "Tiroid kanseri"],
    ["Goiter", "Guatr", "Tiroid büyümesi"],
    ["Thyroiditis", "Tiroidit", "Tiroid iltihabı"],
    ["Hyperparathyroidism", "Hiperparatiroidi", "Paratiroid fazla çalışması"],
    ["Hypoparathyroidism", "Hipoparatiroidi", "Paratiroid az çalışması"],
    ["Adrenal insufficiency", "Adrenal Yetmezlik", "Böbrek üstü yetersizliği"],
    ["Pheochromocytoma", "Feokromositoma", "Adrenal tümör"],
    ["Hyperaldosteronism", "Hiperaldosteronizm", "Aldosteron fazlalığı"],
    ["Acromegaly", "Akromegali", "Büyüme hormonu fazlalığı"],
    ["Gigantism", "Gigantizm", "Dev büyüme"],
    ["Dwarfism", "Cücelik", "Büyüme hormonu eksikliği"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Hematolojik hastalıklar
const generateHematologicalDiseases = () => {
  const diseases = [
    ["Iron deficiency anemia", "Demir Eksikliği Anemisi", "Demir yetersizliği"],
    [
      "Vitamin B12 deficiency anemia",
      "B12 Eksikliği Anemisi",
      "Pernisiyöz anemi",
    ],
    [
      "Folate deficiency anemia",
      "Folat Eksikliği Anemisi",
      "Folat yetersizliği",
    ],
    ["Hemolytic anemia", "Hemolitik Anemi", "Eritrosit yıkımı"],
    ["Sickle cell disease", "Orak Hücre Hastalığı", "Hemoglobin bozukluğu"],
    ["Thalassemia", "Talasemi", "Akdeniz anemisi"],
    ["Aplastic anemia", "Aplastik Anemi", "Kemik iliği yetersizliği"],
    ["Polycythemia vera", "Polisitemia Vera", "Eritrosit fazlalığı"],
    ["Thrombocytopenia", "Trombositopeni", "Trombosit azlığı"],
    ["Thrombocytosis", "Trombositoz", "Trombosit fazlalığı"],
    ["Immune thrombocytopenic purpura", "İmmün Trombositopenik Purpura", "ITP"],
    [
      "Thrombotic thrombocytopenic purpura",
      "Trombotik Trombositopenik Purpura",
      "TTP",
    ],
    ["Hemophilia A", "Hemofili A", "Faktör VIII eksikliği"],
    ["Hemophilia B", "Hemofili B", "Faktör IX eksikliği"],
    ["Von Willebrand disease", "Von Willebrand Hastalığı", "Kanama bozukluğu"],
    [
      "Disseminated intravascular coagulation",
      "Yaygın Damar İçi Pıhtılaşma",
      "DIC",
    ],
    ["Deep vein thrombosis", "Derin Ven Trombozu", "Bacak pıhtısı"],
    ["Pulmonary embolism", "Pulmoner Emboli", "Akciğer pıhtısı"],
    ["Leukemia", "Lösemi", "Kan kanseri"],
    ["Lymphoma", "Lenfoma", "Lenf kanseri"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla hematolojik hastalıklar
const generateMoreHematologicalDiseases = () => {
  const diseases = [
    ["Acute lymphoblastic leukemia", "Akut Lenfoblastik Lösemi", "ALL"],
    ["Acute myeloid leukemia", "Akut Miyeloid Lösemi", "AML"],
    ["Chronic lymphocytic leukemia", "Kronik Lenfositik Lösemi", "KLL"],
    ["Chronic myeloid leukemia", "Kronik Miyeloid Lösemi", "KML"],
    ["Hodgkin lymphoma", "Hodgkin Lenfoma", "Hodgkin hastalığı"],
    ["Non-Hodgkin lymphoma", "Non-Hodgkin Lenfoma", "NHL"],
    ["Multiple myeloma", "Multipl Miyelom", "Plazma hücre kanseri"],
    ["Myelodysplastic syndrome", "Miyelodisplastik Sendrom", "MDS"],
    ["Myeloproliferative neoplasm", "Miyeloproliferatif Neoplazm", "MPN"],
    ["Essential thrombocythemia", "Esansiyel Trombositemi", "Trombosit artışı"],
    ["Primary myelofibrosis", "Primer Miyelofibrozis", "Kemik iliği fibrozisi"],
    ["Neutropenia", "Nötropeni", "Nötrofil azlığı"],
    ["Agranulocytosis", "Agranülositoz", "Granülosit yokluğu"],
    ["Leukocytosis", "Lökositoz", "Beyaz küre artışı"],
    ["Lymphocytosis", "Lenfositoz", "Lenfosit artışı"],
    ["Eosinophilia", "Eozinofili", "Eozinofil artışı"],
    ["Basophilia", "Bazofili", "Bazofil artışı"],
    ["Monocytosis", "Monositoz", "Monosit artışı"],
    ["Pancytopenia", "Pansitopeni", "Tüm hücre azlığı"],
    ["Splenomegaly", "Splenomegali", "Dalak büyümesi"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Romatolojik hastalıklar
const generateRheumatologicalDiseases = () => {
  const diseases = [
    ["Rheumatoid arthritis", "Romatoid Artrit", "Otoimmün eklem iltihabı"],
    ["Osteoarthritis", "Osteoartrit", "Kıkırdak aşınması"],
    ["Gout", "Gut", "Ürik asit hastalığı"],
    ["Pseudogout", "Psödogut", "Kalsiyum kristal hastalığı"],
    ["Systemic lupus erythematosus", "Sistemik Lupus Eritematozus", "SLE"],
    ["Scleroderma", "Skleroderma", "Deri sertleşmesi"],
    ["Dermatomyositis", "Dermatomiyozit", "Deri-kas iltihabı"],
    ["Polymyositis", "Polimiyozit", "Kas iltihabı"],
    ["Polymyalgia rheumatica", "Polimiyalji Romatika", "Kas ağrısı sendromu"],
    ["Giant cell arteritis", "Dev Hücreli Arterit", "Temporal arterit"],
    ["Takayasu arteritis", "Takayasu Arteriti", "Büyük damar iltihabı"],
    ["Polyarteritis nodosa", "Poliarteritis Nodoza", "Orta damar iltihabı"],
    ["Granulomatosis with polyangiitis", "Polianjitli Granülomatoz", "Wegener"],
    [
      "Eosinophilic granulomatosis with polyangiitis",
      "Eozinofilik Granülomatoz",
      "Churg-Strauss",
    ],
    [
      "Microscopic polyangiitis",
      "Mikroskopik Polianjit",
      "Küçük damar iltihabı",
    ],
    ["Behcet disease", "Behçet Hastalığı", "Ülser hastalığı"],
    ["Ankylosing spondylitis", "Ankilozan Spondilit", "Omurga iltihabı"],
    ["Psoriatic arthritis", "Psoriatik Artrit", "Sedef artriti"],
    ["Reactive arthritis", "Reaktif Artrit", "Enfeksiyon sonrası artrit"],
    [
      "Enteropathic arthritis",
      "Enteropatik Artrit",
      "Bağırsak ilişkili artrit",
    ],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Gastrointestinal hastalıklar
const generateGastrointestinalDiseases = () => {
  const diseases = [
    [
      "Gastroesophageal reflux disease",
      "Gastroözofageal Reflü Hastalığı",
      "GÖRH",
    ],
    ["Peptic ulcer disease", "Peptik Ülser Hastalığı", "Mide ülseri"],
    ["Gastric ulcer", "Mide Ülseri", "Mide yarası"],
    ["Duodenal ulcer", "Duodenal Ülser", "Onikiparmak ülseri"],
    ["Gastritis", "Gastrit", "Mide iltihabı"],
    ["Gastroparesis", "Gastroparezi", "Mide felci"],
    ["Celiac disease", "Çölyak Hastalığı", "Gluten intoleransı"],
    ["Crohn disease", "Crohn Hastalığı", "İnflamatuvar bağırsak"],
    ["Ulcerative colitis", "Ülseratif Kolit", "Kolon iltihabı"],
    ["Diverticulitis", "Divertikülit", "Divertikül iltihabı"],
    ["Diverticulosis", "Divertiküloz", "Bağırsak kesecikleri"],
    ["Appendicitis", "Apandisit", "Apendiks iltihabı"],
    ["Intestinal obstruction", "Bağırsak Tıkanıklığı", "İleus"],
    ["Volvulus", "Volvulus", "Bağırsak dönmesi"],
    ["Intussusception", "İntusepsiyon", "Bağırsak içine girme"],
    ["Hemorrhoids", "Hemoroid", "Basur"],
    ["Anal fissure", "Anal Fissür", "Anüs çatlağı"],
    ["Anal fistula", "Anal Fistül", "Anüs fistülü"],
    ["Rectal prolapse", "Rektal Prolapsus", "Rektum sarkması"],
    ["Colorectal cancer", "Kolorektal Kanser", "Bağırsak kanseri"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Karaciğer ve safra hastalıkları
const generateHepatobiliaryDiseases = () => {
  const diseases = [
    ["Hepatitis A", "Hepatit A", "A tipi karaciğer iltihabı"],
    ["Hepatitis B", "Hepatit B", "B tipi karaciğer iltihabı"],
    ["Hepatitis C", "Hepatit C", "C tipi karaciğer iltihabı"],
    [
      "Alcoholic liver disease",
      "Alkolik Karaciğer Hastalığı",
      "Alkol karaciğer hasarı",
    ],
    [
      "Non-alcoholic fatty liver disease",
      "Non-Alkolik Yağlı Karaciğer",
      "NAFLD",
    ],
    ["Cirrhosis", "Siroz", "Karaciğer sertleşmesi"],
    [
      "Hepatocellular carcinoma",
      "Hepatosellüler Karsinom",
      "Karaciğer kanseri",
    ],
    ["Liver failure", "Karaciğer Yetmezliği", "Karaciğer yetersizliği"],
    ["Portal hypertension", "Portal Hipertansiyon", "Karaciğer damar basıncı"],
    ["Esophageal varices", "Özofagus Varisleri", "Yemek borusu varisleri"],
    [
      "Hepatic encephalopathy",
      "Hepatik Ensefalopati",
      "Karaciğer beyin etkisi",
    ],
    ["Ascites", "Asit", "Karın sıvısı birikimi"],
    [
      "Spontaneous bacterial peritonitis",
      "Spontan Bakteriyel Peritonit",
      "SBP",
    ],
    ["Cholelithiasis", "Kolelitiazis", "Safra taşı"],
    ["Cholecystitis", "Kolesistit", "Safra kesesi iltihabı"],
    ["Choledocholithiasis", "Koledokolitiazis", "Safra yolu taşı"],
    ["Cholangitis", "Kolanjit", "Safra yolu iltihabı"],
    ["Primary biliary cholangitis", "Primer Biliyer Kolanjit", "PBC"],
    ["Primary sclerosing cholangitis", "Primer Sklerozan Kolanjit", "PSC"],
    ["Cholangiocarcinoma", "Kolanjiyokarsinom", "Safra yolu kanseri"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Pankreas hastalıkları
const generatePancreaticDiseases = () => {
  const diseases = [
    ["Acute pancreatitis", "Akut Pankreatit", "Ani pankreas iltihabı"],
    ["Chronic pancreatitis", "Kronik Pankreatit", "Sürekli pankreas iltihabı"],
    ["Pancreatic pseudocyst", "Pankreas Psödokisti", "Pankreas kisti"],
    ["Pancreatic cancer", "Pankreas Kanseri", "Pankreas kanseri"],
    ["Pancreatic neuroendocrine tumor", "Pankreas Nöroendokrin Tümör", "PNET"],
    ["Insulinoma", "İnsülinoma", "İnsülin salgılayan tümör"],
    ["Glucagonoma", "Glukagonoma", "Glukagon salgılayan tümör"],
    ["Gastrinoma", "Gastrinoma", "Gastrin salgılayan tümör"],
    ["VIPoma", "VIPoma", "VIP salgılayan tümör"],
    ["Somatostatinoma", "Somatostatinoma", "Somatostatin salgılayan tümör"],
    [
      "Exocrine pancreatic insufficiency",
      "Ekzokrin Pankreas Yetmezliği",
      "Sindirim enzim eksikliği",
    ],
    ["Cystic fibrosis", "Kistik Fibrozis", "Mukus hastalığı"],
    ["Hereditary pancreatitis", "Herediter Pankreatit", "Kalıtsal pankreatit"],
    [
      "Autoimmune pancreatitis",
      "Otoimmün Pankreatit",
      "Bağışıklık pankreatiti",
    ],
    ["Pancreas divisum", "Pankreas Divizum", "Pankreas anomalisi"],
    ["Annular pancreas", "Anüler Pankreas", "Halka pankreas"],
    ["Pancreatic fistula", "Pankreas Fistülü", "Pankreas fistülü"],
    ["Pancreatic ascites", "Pankreatik Asit", "Pankreas sıvı birikimi"],
    ["Pancreatic abscess", "Pankreas Apsesi", "Pankreas irini"],
    ["Pancreatic necrosis", "Pankreas Nekrozu", "Pankreas ölümü"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Böbrek hastalıkları
const generateRenalDiseases = () => {
  const diseases = [
    ["Acute kidney injury", "Akut Böbrek Hasarı", "Ani böbrek yetersizliği"],
    [
      "Chronic kidney disease",
      "Kronik Böbrek Hastalığı",
      "Sürekli böbrek yetersizliği",
    ],
    [
      "End-stage renal disease",
      "Son Dönem Böbrek Hastalığı",
      "Diyaliz gerektiren",
    ],
    ["Glomerulonephritis", "Glomerülonefrit", "Böbrek süzgeç iltihabı"],
    ["IgA nephropathy", "IgA Nefropatisi", "Berger hastalığı"],
    ["Membranous nephropathy", "Membranöz Nefropati", "Zar nefropatisi"],
    [
      "Minimal change disease",
      "Minimal Değişiklik Hastalığı",
      "Çocuk nefrotik sendrom",
    ],
    [
      "Focal segmental glomerulosclerosis",
      "Fokal Segmental Glomerüloskleroz",
      "FSGS",
    ],
    ["Diabetic nephropathy", "Diyabetik Nefropati", "Şeker böbrek hasarı"],
    [
      "Hypertensive nephropathy",
      "Hipertansif Nefropati",
      "Tansiyon böbrek hasarı",
    ],
    ["Lupus nephritis", "Lupus Nefriti", "Lupus böbrek tutulumu"],
    [
      "Interstitial nephritis",
      "İnterstisyel Nefrit",
      "Böbrek ara doku iltihabı",
    ],
    ["Pyelonephritis", "Piyelonefrit", "Böbrek enfeksiyonu"],
    ["Urinary tract infection", "İdrar Yolu Enfeksiyonu", "İYE"],
    ["Cystitis", "Sistit", "Mesane iltihabı"],
    ["Urethritis", "Üretrit", "Üretra iltihabı"],
    ["Nephrolithiasis", "Nefrolitiazis", "Böbrek taşı"],
    ["Ureterolithiasis", "Üreterolitiazis", "Üreter taşı"],
    ["Renal cell carcinoma", "Renal Hücreli Karsinom", "Böbrek kanseri"],
    [
      "Transitional cell carcinoma",
      "Transizyonel Hücreli Karsinom",
      "Ürotelyal kanser",
    ],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Solunum hastalıkları
const generateRespiratoryDiseases = () => {
  const diseases = [
    ["Asthma", "Astım", "Bronşiyal astım"],
    [
      "Chronic obstructive pulmonary disease",
      "KOAH",
      "Kronik akciğer hastalığı",
    ],
    ["Emphysema", "Amfizem", "Akciğer hava kesecikleri hasarı"],
    ["Chronic bronchitis", "Kronik Bronşit", "Sürekli bronş iltihabı"],
    ["Bronchiectasis", "Bronşektazi", "Bronş genişlemesi"],
    ["Pneumonia", "Pnömoni", "Zatürre"],
    ["Community-acquired pneumonia", "Toplum Kökenli Pnömoni", "TKP"],
    ["Hospital-acquired pneumonia", "Hastane Kökenli Pnömoni", "HKP"],
    ["Aspiration pneumonia", "Aspirasyon Pnömonisi", "Yutma pnömonisi"],
    ["Tuberculosis", "Tüberküloz", "Verem"],
    ["Lung abscess", "Akciğer Apsesi", "Akciğer irini"],
    ["Pleural effusion", "Plevral Efüzyon", "Akciğer zarı sıvısı"],
    ["Empyema", "Ampiyem", "Plevral irin"],
    ["Pneumothorax", "Pnömotoraks", "Akciğer zarında hava"],
    ["Pulmonary fibrosis", "Pulmoner Fibrozis", "Akciğer sertleşmesi"],
    ["Idiopathic pulmonary fibrosis", "İdiyopatik Pulmoner Fibrozis", "IPF"],
    ["Sarcoidosis", "Sarkoidoz", "Granülomatöz hastalık"],
    [
      "Pulmonary hypertension",
      "Pulmoner Hipertansiyon",
      "Akciğer damar basıncı",
    ],
    ["Lung cancer", "Akciğer Kanseri", "Bronş kanseri"],
    ["Mesothelioma", "Mezotelyoma", "Akciğer zarı kanseri"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 REACH 10K - 10,000 HEDEFİNE ULAŞMA");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const dermatologicalDiseases = generateDermatologicalDiseases();
  const moreDermatologicalDiseases = generateMoreDermatologicalDiseases();
  const ophthalmicDiseases = generateOphthalmicDiseases();
  const entDiseases = generateENTDiseases();
  const moreEntDiseases = generateMoreENTDiseases();
  const endocrineDiseases = generateEndocrineDiseases();
  const hematologicalDiseases = generateHematologicalDiseases();
  const moreHematologicalDiseases = generateMoreHematologicalDiseases();
  const rheumatologicalDiseases = generateRheumatologicalDiseases();
  const gastrointestinalDiseases = generateGastrointestinalDiseases();
  const hepatobiliaryDiseases = generateHepatobiliaryDiseases();
  const pancreaticDiseases = generatePancreaticDiseases();
  const renalDiseases = generateRenalDiseases();
  const respiratoryDiseases = generateRespiratoryDiseases();

  const allTerms = [
    ...dermatologicalDiseases,
    ...moreDermatologicalDiseases,
    ...ophthalmicDiseases,
    ...entDiseases,
    ...moreEntDiseases,
    ...endocrineDiseases,
    ...hematologicalDiseases,
    ...moreHematologicalDiseases,
    ...rheumatologicalDiseases,
    ...gastrointestinalDiseases,
    ...hepatobiliaryDiseases,
    ...pancreaticDiseases,
    ...renalDiseases,
    ...respiratoryDiseases,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(
    `   Dermatoloji: ${
      dermatologicalDiseases.length + moreDermatologicalDiseases.length
    }`
  );
  console.log(`   Göz: ${ophthalmicDiseases.length}`);
  console.log(`   KBB: ${entDiseases.length + moreEntDiseases.length}`);
  console.log(`   Endokrin: ${endocrineDiseases.length}`);
  console.log(
    `   Hematoloji: ${
      hematologicalDiseases.length + moreHematologicalDiseases.length
    }`
  );
  console.log(`   Romatoloji: ${rheumatologicalDiseases.length}`);
  console.log(`   Gastroenteroloji: ${gastrointestinalDiseases.length}`);
  console.log(`   Hepatobiliyer: ${hepatobiliaryDiseases.length}`);
  console.log(`   Pankreas: ${pancreaticDiseases.length}`);
  console.log(`   Böbrek: ${renalDiseases.length}`);
  console.log(`   Solunum: ${respiratoryDiseases.length}`);
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
