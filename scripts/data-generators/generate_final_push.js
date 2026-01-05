// Final Push - 10,000 hedefi için son terimler
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

// Anatomik bölge kombinasyonları
const generateAnatomicalRegions = () => {
  const positions = [
    ["Right", "Sağ", "Sağ taraf"],
    ["Left", "Sol", "Sol taraf"],
    ["Bilateral", "Bilateral", "İki taraflı"],
    ["Unilateral", "Unilateral", "Tek taraflı"],
    ["Upper", "Üst", "Üst kısım"],
    ["Lower", "Alt", "Alt kısım"],
    ["Central", "Santral", "Merkezi"],
    ["Peripheral", "Periferik", "Çevresel"],
  ];

  const organs = [
    ["lung", "akciğer", "Solunum organı"],
    ["kidney", "böbrek", "Boşaltım organı"],
    ["adrenal gland", "adrenal bez", "Böbrek üstü bezi"],
    ["ovary", "over", "Yumurtalık"],
    ["testis", "testis", "Erkek üreme bezi"],
    ["breast", "meme", "Meme dokusu"],
    ["eye", "göz", "Görme organı"],
    ["ear", "kulak", "İşitme organı"],
    ["tonsil", "bademcik", "Lenf dokusu"],
    ["thyroid lobe", "tiroid lobu", "Tiroid bezi lobu"],
    ["parotid gland", "parotis bezi", "Tükürük bezi"],
    ["submandibular gland", "submandibular bez", "Çene altı bezi"],
    ["carotid artery", "karotis arter", "Boyun ana damarı"],
    ["jugular vein", "juguler ven", "Boyun toplardamarı"],
    ["femoral artery", "femoral arter", "Uyluk damarı"],
    ["popliteal artery", "popliteal arter", "Diz arkası damarı"],
    ["radial artery", "radyal arter", "Ön kol damarı"],
    ["ulnar artery", "ulnar arter", "Dirsek damarı"],
    ["tibial artery", "tibial arter", "Baldır damarı"],
    ["renal artery", "renal arter", "Böbrek damarı"],
  ];

  const terms = [];
  positions.forEach(([posEn, posTr, posDef]) => {
    organs.forEach(([orgEn, orgTr, orgDef]) => {
      terms.push(
        createTerm(
          `${posEn} ${orgEn}`,
          `${posTr} ${orgTr}`,
          TermCategory.ANATOMY,
          `${posDef} ${orgDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Hastalık lokalizasyonları
const generateDiseaseLocations = () => {
  const diseases = [
    ["carcinoma", "karsinom", "Kanser"],
    ["adenoma", "adenom", "İyi huylu tümör"],
    ["sarcoma", "sarkom", "Bağ doku kanseri"],
    ["lymphoma", "lenfoma", "Lenf kanseri"],
    ["melanoma", "melanom", "Deri kanseri"],
    ["abscess", "apse", "İrin birikimi"],
    ["cyst", "kist", "Sıvı dolu kese"],
    ["polyp", "polip", "Mukoza çıkıntısı"],
    ["ulcer", "ülser", "Yara"],
    ["stricture", "darlık", "Daralma"],
  ];

  const locations = [
    ["gastric", "mide", "Mide"],
    ["colonic", "kolon", "Kalın bağırsak"],
    ["rectal", "rektal", "Rektum"],
    ["esophageal", "özofagus", "Yemek borusu"],
    ["hepatic", "karaciğer", "Karaciğer"],
    ["pancreatic", "pankreas", "Pankreas"],
    ["renal", "böbrek", "Böbrek"],
    ["bladder", "mesane", "İdrar kesesi"],
    ["prostatic", "prostat", "Prostat"],
    ["uterine", "rahim", "Rahim"],
    ["ovarian", "over", "Yumurtalık"],
    ["thyroid", "tiroid", "Tiroid"],
    ["pulmonary", "akciğer", "Akciğer"],
    ["cerebral", "beyin", "Beyin"],
    ["spinal", "omurilik", "Omurilik"],
  ];

  const terms = [];
  locations.forEach(([locEn, locTr, locDef]) => {
    diseases.forEach(([disEn, disTr, disDef]) => {
      terms.push(
        createTerm(
          `${locEn.charAt(0).toUpperCase() + locEn.slice(1)} ${disEn}`,
          `${locDef} ${disTr}`,
          TermCategory.DISEASE,
          `${locDef} ${disDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// İlaç sınıfları
const generateDrugClasses = () => {
  const classes = [
    ["Aminoglycoside", "Aminoglikozid", "Antibiyotik sınıfı"],
    ["Cephalosporin", "Sefalosporin", "Beta-laktam antibiyotik"],
    ["Fluoroquinolone", "Florokinolon", "Geniş spektrumlu antibiyotik"],
    ["Macrolide", "Makrolid", "Antibiyotik sınıfı"],
    ["Tetracycline", "Tetrasiklin", "Geniş spektrumlu antibiyotik"],
    ["Penicillin", "Penisilin", "Beta-laktam antibiyotik"],
    ["Carbapenem", "Karbapenem", "Geniş spektrumlu antibiyotik"],
    ["Glycopeptide", "Glikopeptid", "Antibiyotik sınıfı"],
    ["Sulfonamide", "Sülfonamid", "Antibakteriyel"],
    ["Nitroimidazole", "Nitroimidazol", "Antiprotozoal antibiyotik"],
    ["Benzodiazepine", "Benzodiazepin", "Anksiyolitik sınıfı"],
    ["Barbiturate", "Barbitürat", "Sedatif hipnotik"],
    ["Opioid", "Opioid", "Ağrı kesici sınıfı"],
    ["NSAID", "NSAİİ", "Steroid olmayan antiinflamatuvar"],
    ["Corticosteroid", "Kortikosteroid", "Steroid hormon"],
    ["Statin", "Statin", "Kolesterol düşürücü"],
    ["ACE inhibitor", "ACE İnhibitörü", "Tansiyon ilacı"],
    ["ARB", "ARB", "Anjiyotensin reseptör blokeri"],
    ["Beta blocker", "Beta Bloker", "Kalp ilacı"],
    ["Calcium channel blocker", "Kalsiyum Kanal Blokeri", "Tansiyon ilacı"],
  ];
  return classes.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Daha fazla ilaç sınıfları
const generateMoreDrugClasses = () => {
  const classes = [
    ["Diuretic", "Diüretik", "İdrar söktürücü"],
    ["Antihistamine", "Antihistaminik", "Alerji ilacı"],
    ["Proton pump inhibitor", "Proton Pompa İnhibitörü", "Mide asit azaltıcı"],
    ["H2 blocker", "H2 Bloker", "Mide asit azaltıcı"],
    ["Antacid", "Antasit", "Mide asit nötralize edici"],
    ["Laxative", "Laksatif", "Bağırsak yumuşatıcı"],
    ["Antidiarrheal", "Antidiyareik", "İshal kesici"],
    ["Antiemetic", "Antiemetik", "Bulantı kesici"],
    ["Bronchodilator", "Bronkodilatör", "Bronş genişletici"],
    ["Mucolytic", "Mukolitik", "Balgam söktürücü"],
    ["Antitussive", "Antitussif", "Öksürük kesici"],
    ["Expectorant", "Ekspektoran", "Balgam çıkarıcı"],
    ["Decongestant", "Dekonjestan", "Burun açıcı"],
    ["Anticoagulant", "Antikoagülan", "Kan sulandırıcı"],
    ["Antiplatelet", "Antiplatelet", "Trombosit önleyici"],
    ["Thrombolytic", "Trombolitik", "Pıhtı eritici"],
    ["Antiarrhythmic", "Antiaritmik", "Ritim düzenleyici"],
    ["Vasodilator", "Vazodilatör", "Damar genişletici"],
    ["Vasoconstrictor", "Vazokonstriktör", "Damar daraltıcı"],
    ["Inotrope", "İnotrop", "Kalp kasılma gücü artırıcı"],
  ];
  return classes.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Ek ilaç sınıfları
const generateExtraDrugClasses = () => {
  const classes = [
    ["Antipsychotic", "Antipsikotik", "Psikoz ilacı"],
    ["Antidepressant", "Antidepresan", "Depresyon ilacı"],
    ["Anxiolytic", "Anksiyolitik", "Anksiyete ilacı"],
    ["Mood stabilizer", "Duygudurum Dengeleyici", "Bipolar ilacı"],
    ["Anticonvulsant", "Antikonvülzan", "Epilepsi ilacı"],
    ["Muscle relaxant", "Kas Gevşetici", "Kas gevşetici"],
    ["Anesthetic", "Anestezik", "Uyuşturucu"],
    ["Analgesic", "Analjezik", "Ağrı kesici"],
    ["Antipyretic", "Antipiretik", "Ateş düşürücü"],
    ["Immunosuppressant", "İmmünosüpresan", "Bağışıklık baskılayıcı"],
    ["Immunomodulator", "İmmünomodülatör", "Bağışıklık düzenleyici"],
    ["Cytotoxic", "Sitotoksik", "Hücre öldürücü"],
    ["Antineoplastic", "Antineoplastik", "Kanser ilacı"],
    ["Hormone", "Hormon", "Hormon preparatı"],
    ["Antihormone", "Antihormon", "Hormon karşıtı"],
    ["Hypoglycemic", "Hipoglisemik", "Kan şekeri düşürücü"],
    ["Antidiabetic", "Antidiyabetik", "Diyabet ilacı"],
    ["Antithyroid", "Antitiroid", "Tiroid baskılayıcı"],
    ["Thyroid hormone", "Tiroid Hormonu", "Tiroid yerine koyma"],
    ["Bisphosphonate", "Bifosfonat", "Kemik erimesi ilacı"],
  ];
  return classes.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Böcek türleri
const generateInsectSpecies = () => {
  const insects = [
    ["Aedes aegypti", "Sarıhumma Sivrisineği", "Dang humması vektörü"],
    ["Aedes albopictus", "Asya Kaplan Sivrisineği", "Hastalık taşıyıcı"],
    ["Anopheles gambiae", "Afrika Sıtma Sivrisineği", "Sıtma vektörü"],
    ["Culex pipiens", "Ev Sivrisineği", "Batı Nil virüsü vektörü"],
    ["Phlebotomus papatasi", "Tatarcık", "Leishmaniasis vektörü"],
    ["Glossina morsitans", "Çeçe Sineği", "Uyku hastalığı vektörü"],
    ["Simulium damnosum", "Kara Sinek", "Nehir körlüğü vektörü"],
    ["Chrysops silacea", "Geyik Sineği", "Loa loa vektörü"],
    ["Musca domestica", "Ev Sineği", "Mekanik hastalık taşıyıcı"],
    ["Stomoxys calcitrans", "Ahır Sineği", "Isırıcı sinek"],
    ["Cimex lectularius", "Yatak Böceği", "Kan emici böcek"],
    ["Pediculus humanus capitis", "Baş Biti", "Ektoparazit"],
    ["Pediculus humanus corporis", "Vücut Biti", "Tifüs vektörü"],
    ["Phthirus pubis", "Kasık Biti", "Ektoparazit"],
    ["Sarcoptes scabiei", "Uyuz Akarı", "Uyuz etkeni"],
    ["Demodex folliculorum", "Kıl Folikül Akarı", "Deri paraziti"],
    ["Dermatophagoides pteronyssinus", "Ev Tozu Akarı", "Alerjen"],
    ["Ixodes scapularis", "Geyik Kenesi", "Lyme hastalığı vektörü"],
    ["Dermacentor variabilis", "Amerikan Köpek Kenesi", "Kene felci vektörü"],
    [
      "Rhipicephalus sanguineus",
      "Kahverengi Köpek Kenesi",
      "Ehrlichiosis vektörü",
    ],
  ];
  return insects.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.INSECT, def)
  );
};

// Daha fazla böcek türleri
const generateMoreInsectSpecies = () => {
  const insects = [
    ["Amblyomma americanum", "Lone Star Kenesi", "Ehrlichiosis vektörü"],
    ["Ornithodoros moubata", "Afrika Yumuşak Kenesi", "Dönek ateş vektörü"],
    ["Triatoma infestans", "Öpücük Böceği", "Chagas hastalığı vektörü"],
    ["Rhodnius prolixus", "Öpücük Böceği", "Chagas vektörü"],
    ["Xenopsylla cheopis", "Doğu Sıçan Piresi", "Veba vektörü"],
    ["Pulex irritans", "İnsan Piresi", "Kan emici böcek"],
    ["Ctenocephalides felis", "Kedi Piresi", "Parazit taşıyıcı"],
    ["Ctenocephalides canis", "Köpek Piresi", "Parazit taşıyıcı"],
    ["Tunga penetrans", "Kum Piresi", "Tungiyazis etkeni"],
    ["Blattella germanica", "Alman Hamamböceği", "Alerjen taşıyıcı"],
    ["Periplaneta americana", "Amerikan Hamamböceği", "Hastalık taşıyıcı"],
    ["Apis mellifera", "Bal Arısı", "Zehirli sokma"],
    ["Vespula vulgaris", "Eşek Arısı", "Anafilaksi riski"],
    ["Vespa crabro", "Eşek Arısı", "Zehirli sokma"],
    ["Solenopsis invicta", "Ateş Karıncası", "Ağrılı sokma"],
    ["Latrodectus mactans", "Kara Dul Örümcek", "Nörotoksik zehir"],
    ["Loxosceles reclusa", "Kahverengi Münzevi Örümcek", "Nekrotik zehir"],
    ["Centruroides sculpturatus", "Arizona Akrebi", "Nörotoksik zehir"],
    ["Androctonus australis", "Sarı Akrep", "Ölümcül zehir"],
    ["Scolopendra gigantea", "Dev Kırkayak", "Zehirli ısırık"],
  ];
  return insects.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.INSECT, def)
  );
};

// Patojen mikroorganizmalar
const generatePathogens = () => {
  const pathogens = [
    ["Staphylococcus aureus", "Altın Stafilokok", "Deri enfeksiyonu etkeni"],
    [
      "Streptococcus pyogenes",
      "A Grubu Streptokok",
      "Boğaz enfeksiyonu etkeni",
    ],
    ["Streptococcus pneumoniae", "Pnömokok", "Zatürre etkeni"],
    ["Escherichia coli", "E. coli", "Bağırsak bakterisi"],
    ["Klebsiella pneumoniae", "Klebsiella", "Hastane enfeksiyonu etkeni"],
    ["Pseudomonas aeruginosa", "Pseudomonas", "Fırsatçı patojen"],
    ["Acinetobacter baumannii", "Acinetobacter", "Hastane enfeksiyonu etkeni"],
    ["Enterococcus faecalis", "Enterokok", "İdrar yolu enfeksiyonu etkeni"],
    ["Clostridium difficile", "C. difficile", "Antibiyotik ilişkili ishal"],
    [
      "Clostridium perfringens",
      "Gazlı Gangren Etkeni",
      "Yumuşak doku enfeksiyonu",
    ],
    ["Clostridium tetani", "Tetanoz Basili", "Tetanoz etkeni"],
    ["Clostridium botulinum", "Botulizm Basili", "Botulizm etkeni"],
    ["Bacillus anthracis", "Şarbon Basili", "Şarbon etkeni"],
    ["Mycobacterium tuberculosis", "Tüberküloz Basili", "Verem etkeni"],
    ["Mycobacterium leprae", "Cüzzam Basili", "Cüzzam etkeni"],
    ["Neisseria meningitidis", "Meningokok", "Menenjit etkeni"],
    ["Neisseria gonorrhoeae", "Gonokok", "Bel soğukluğu etkeni"],
    ["Haemophilus influenzae", "Hemofilus", "Solunum enfeksiyonu etkeni"],
    ["Bordetella pertussis", "Boğmaca Basili", "Boğmaca etkeni"],
    ["Legionella pneumophila", "Lejyonella", "Lejyoner hastalığı etkeni"],
  ];
  return pathogens.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla patojenler
const generateMorePathogens = () => {
  const pathogens = [
    ["Salmonella typhi", "Tifo Basili", "Tifo etkeni"],
    ["Salmonella enteritidis", "Salmonella", "Gıda zehirlenmesi etkeni"],
    ["Shigella dysenteriae", "Dizanteri Basili", "Basilli dizanteri etkeni"],
    ["Vibrio cholerae", "Kolera Vibriyonu", "Kolera etkeni"],
    ["Campylobacter jejuni", "Kampillobakter", "Gastroenterit etkeni"],
    ["Helicobacter pylori", "H. pylori", "Mide ülseri etkeni"],
    ["Yersinia pestis", "Veba Basili", "Veba etkeni"],
    ["Brucella melitensis", "Brusella", "Malta humması etkeni"],
    ["Francisella tularensis", "Tularemi Basili", "Tularemi etkeni"],
    ["Listeria monocytogenes", "Listeria", "Listeriozis etkeni"],
    ["Treponema pallidum", "Sifiliz Spiroketi", "Frengi etkeni"],
    ["Borrelia burgdorferi", "Lyme Spiroketi", "Lyme hastalığı etkeni"],
    ["Leptospira interrogans", "Leptospira", "Leptospirozis etkeni"],
    ["Rickettsia rickettsii", "Riketsiya", "Kayalık Dağ benekli ateşi"],
    ["Chlamydia trachomatis", "Klamidya", "Cinsel yolla bulaşan enfeksiyon"],
    ["Mycoplasma pneumoniae", "Mikoplazma", "Atipik zatürre etkeni"],
    ["Candida albicans", "Kandida", "Mantar enfeksiyonu etkeni"],
    ["Aspergillus fumigatus", "Aspergillus", "Akciğer mantarı"],
    ["Cryptococcus neoformans", "Kriptokokus", "Menenjit etkeni mantar"],
    ["Pneumocystis jirovecii", "Pnömosistis", "AIDS ilişkili zatürre"],
  ];
  return pathogens.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Virüsler
const generateViruses = () => {
  const viruses = [
    ["Influenza A virus", "İnfluenza A Virüsü", "Grip etkeni"],
    ["Influenza B virus", "İnfluenza B Virüsü", "Grip etkeni"],
    ["Respiratory syncytial virus", "RSV", "Solunum yolu virüsü"],
    ["Rhinovirus", "Rinovirüs", "Soğuk algınlığı etkeni"],
    ["Coronavirus", "Koronavirüs", "Solunum yolu virüsü"],
    ["SARS-CoV-2", "SARS-CoV-2", "COVID-19 etkeni"],
    ["Adenovirus", "Adenovirüs", "Solunum ve göz enfeksiyonu"],
    ["Parainfluenza virus", "Parainfluenza Virüsü", "Krup etkeni"],
    ["Measles virus", "Kızamık Virüsü", "Kızamık etkeni"],
    ["Mumps virus", "Kabakulak Virüsü", "Kabakulak etkeni"],
    ["Rubella virus", "Kızamıkçık Virüsü", "Kızamıkçık etkeni"],
    ["Varicella zoster virus", "Suçiçeği Virüsü", "Suçiçeği ve zona etkeni"],
    ["Herpes simplex virus 1", "HSV-1", "Oral herpes etkeni"],
    ["Herpes simplex virus 2", "HSV-2", "Genital herpes etkeni"],
    ["Epstein-Barr virus", "EBV", "Enfeksiyöz mononükleoz etkeni"],
    ["Cytomegalovirus", "CMV", "Fırsatçı enfeksiyon etkeni"],
    ["Human papillomavirus", "HPV", "Siğil ve kanser etkeni"],
    ["Hepatitis A virus", "Hepatit A Virüsü", "Hepatit A etkeni"],
    ["Hepatitis B virus", "Hepatit B Virüsü", "Hepatit B etkeni"],
    ["Hepatitis C virus", "Hepatit C Virüsü", "Hepatit C etkeni"],
  ];
  return viruses.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla virüsler
const generateMoreViruses = () => {
  const viruses = [
    ["Hepatitis D virus", "Hepatit D Virüsü", "Hepatit D etkeni"],
    ["Hepatitis E virus", "Hepatit E Virüsü", "Hepatit E etkeni"],
    ["Human immunodeficiency virus", "HIV", "AIDS etkeni"],
    ["Rabies virus", "Kuduz Virüsü", "Kuduz etkeni"],
    ["Dengue virus", "Dang Virüsü", "Dang humması etkeni"],
    ["Yellow fever virus", "Sarıhumma Virüsü", "Sarıhumma etkeni"],
    ["Zika virus", "Zika Virüsü", "Zika hastalığı etkeni"],
    ["West Nile virus", "Batı Nil Virüsü", "Ensefalit etkeni"],
    [
      "Japanese encephalitis virus",
      "Japon Ensefaliti Virüsü",
      "Ensefalit etkeni",
    ],
    ["Chikungunya virus", "Chikungunya Virüsü", "Eklem ağrısı etkeni"],
    ["Ebola virus", "Ebola Virüsü", "Hemorajik ateş etkeni"],
    ["Marburg virus", "Marburg Virüsü", "Hemorajik ateş etkeni"],
    ["Lassa virus", "Lassa Virüsü", "Lassa ateşi etkeni"],
    ["Hantavirus", "Hantavirüs", "Hemorajik ateş etkeni"],
    ["Rotavirus", "Rotavirüs", "Çocuk ishali etkeni"],
    ["Norovirus", "Norovirüs", "Gastroenterit etkeni"],
    ["Poliovirus", "Poliovirüs", "Çocuk felci etkeni"],
    ["Coxsackievirus", "Koksaki Virüsü", "El ayak ağız hastalığı"],
    ["Enterovirus", "Enterovirüs", "Bağırsak virüsü"],
    ["Parvovirus B19", "Parvovirüs B19", "Beşinci hastalık etkeni"],
  ];
  return viruses.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Parazitler
const generateParasites = () => {
  const parasites = [
    ["Plasmodium falciparum", "Sıtma Paraziti", "Ağır sıtma etkeni"],
    ["Plasmodium vivax", "Sıtma Paraziti", "Tekrarlayan sıtma etkeni"],
    ["Plasmodium malariae", "Sıtma Paraziti", "Dört günlük sıtma"],
    ["Plasmodium ovale", "Sıtma Paraziti", "Sıtma etkeni"],
    ["Toxoplasma gondii", "Toksoplazma", "Toksoplazmoz etkeni"],
    ["Leishmania donovani", "Leishmania", "Kala-azar etkeni"],
    ["Leishmania tropica", "Leishmania", "Şark çıbanı etkeni"],
    ["Trypanosoma cruzi", "Tripanozoma", "Chagas hastalığı etkeni"],
    ["Trypanosoma brucei", "Tripanozoma", "Uyku hastalığı etkeni"],
    ["Giardia lamblia", "Giardia", "Giardiazis etkeni"],
    ["Entamoeba histolytica", "Amip", "Amipli dizanteri etkeni"],
    ["Cryptosporidium parvum", "Kriptosporidyum", "İshal etkeni"],
    ["Trichomonas vaginalis", "Trikomonas", "Vajinal enfeksiyon etkeni"],
    ["Balantidium coli", "Balantidyum", "Bağırsak paraziti"],
    ["Ascaris lumbricoides", "Bağırsak Solucanı", "Askariazis etkeni"],
    ["Enterobius vermicularis", "Kıl Kurdu", "Enterobiyazis etkeni"],
    ["Trichuris trichiura", "Kırbaç Kurdu", "Triküriazis etkeni"],
    ["Ancylostoma duodenale", "Kancalı Kurt", "Anemi etkeni"],
    ["Necator americanus", "Kancalı Kurt", "Anemi etkeni"],
    ["Strongyloides stercoralis", "İplik Kurt", "Strongiloidiyazis etkeni"],
  ];
  return parasites.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla parazitler
const generateMoreParasites = () => {
  const parasites = [
    ["Wuchereria bancrofti", "Fil Hastalığı Paraziti", "Lenfatik filariazis"],
    ["Brugia malayi", "Filaria", "Lenfatik filariazis"],
    ["Onchocerca volvulus", "Nehir Körlüğü Paraziti", "Onkoserkiyazis"],
    ["Loa loa", "Göz Kurdu", "Loiazis etkeni"],
    ["Dracunculus medinensis", "Gine Kurdu", "Drakunkuliyazis"],
    ["Taenia solium", "Domuz Tenyası", "Sistiserkoz etkeni"],
    ["Taenia saginata", "Sığır Tenyası", "Bağırsak paraziti"],
    ["Diphyllobothrium latum", "Balık Tenyası", "B12 eksikliği"],
    ["Hymenolepis nana", "Cüce Tenya", "Bağırsak paraziti"],
    ["Echinococcus granulosus", "Kist Hidatik Paraziti", "Hidatik kist etkeni"],
    ["Echinococcus multilocularis", "Alveoler Ekinokok", "Karaciğer kisti"],
    ["Fasciola hepatica", "Karaciğer Kelebeği", "Fascioliyazis etkeni"],
    ["Clonorchis sinensis", "Çin Karaciğer Kelebeği", "Klonorkiyazis"],
    ["Opisthorchis viverrini", "Karaciğer Kelebeği", "Opistorkiyazis"],
    ["Paragonimus westermani", "Akciğer Kelebeği", "Paragonimiazis"],
    ["Schistosoma mansoni", "Kan Kelebeği", "Şistosomiyazis"],
    ["Schistosoma haematobium", "Kan Kelebeği", "Üriner şistosomiyazis"],
    ["Schistosoma japonicum", "Kan Kelebeği", "Şistosomiyazis"],
    ["Trichinella spiralis", "Trişin", "Trikinelloz etkeni"],
    ["Toxocara canis", "Köpek Solucanı", "Visseral larva migrans"],
  ];
  return parasites.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Amino asitler
const generateAminoAcids = () => {
  const aminoAcids = [
    ["L-Alanine", "L-Alanin", "Esansiyel olmayan amino asit"],
    ["L-Arginine", "L-Arjinin", "Yarı esansiyel amino asit"],
    ["L-Asparagine", "L-Asparagin", "Esansiyel olmayan amino asit"],
    ["L-Aspartic acid", "L-Aspartik Asit", "Esansiyel olmayan amino asit"],
    ["L-Cysteine", "L-Sistein", "Sülfür içeren amino asit"],
    ["L-Glutamic acid", "L-Glutamik Asit", "Nörotransmitter öncüsü"],
    ["L-Glutamine", "L-Glutamin", "En bol amino asit"],
    ["Glycine", "Glisin", "En basit amino asit"],
    ["L-Histidine", "L-Histidin", "Esansiyel amino asit"],
    ["L-Isoleucine", "L-İzolösin", "Dallı zincirli amino asit"],
    ["L-Leucine", "L-Lösin", "Dallı zincirli amino asit"],
    ["L-Lysine", "L-Lizin", "Esansiyel amino asit"],
    ["L-Methionine", "L-Metiyonin", "Sülfür içeren amino asit"],
    ["L-Phenylalanine", "L-Fenilalanin", "Aromatik amino asit"],
    ["L-Proline", "L-Prolin", "Halkalı amino asit"],
    ["L-Serine", "L-Serin", "Hidroksil içeren amino asit"],
    ["L-Threonine", "L-Treonin", "Esansiyel amino asit"],
    ["L-Tryptophan", "L-Triptofan", "Serotonin öncüsü"],
    ["L-Tyrosine", "L-Tirozin", "Aromatik amino asit"],
    ["L-Valine", "L-Valin", "Dallı zincirli amino asit"],
  ];
  return aminoAcids.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Enzimler
const generateEnzymes = () => {
  const enzymes = [
    ["Amylase", "Amilaz", "Nişasta sindiren enzim"],
    ["Lipase", "Lipaz", "Yağ sindiren enzim"],
    ["Protease", "Proteaz", "Protein sindiren enzim"],
    ["Lactase", "Laktaz", "Laktoz sindiren enzim"],
    ["Cellulase", "Selülaz", "Selüloz sindiren enzim"],
    ["Pepsin", "Pepsin", "Mide proteazı"],
    ["Trypsin", "Tripsin", "Pankreas proteazı"],
    ["Chymotrypsin", "Kimotripsin", "Pankreas proteazı"],
    ["Elastase", "Elastaz", "Elastin sindiren enzim"],
    ["Collagenase", "Kollajenaz", "Kolajen sindiren enzim"],
    ["Hyaluronidase", "Hiyalüronidaz", "Hiyalüronik asit sindiren"],
    ["Lysozyme", "Lizozim", "Antibakteriyel enzim"],
    ["Catalase", "Katalaz", "Hidrojen peroksit parçalayan"],
    ["Superoxide dismutase", "Süperoksit Dismutaz", "Antioksidan enzim"],
    ["Glutathione peroxidase", "Glutatyon Peroksidaz", "Antioksidan enzim"],
    ["Cytochrome P450", "Sitokrom P450", "İlaç metabolize eden enzim"],
    [
      "Acetylcholinesterase",
      "Asetilkolinesteraz",
      "Nörotransmitter parçalayan",
    ],
    ["Monoamine oxidase", "Monoamin Oksidaz", "MAO enzimi"],
    ["Cyclooxygenase", "Siklooksijenaz", "COX enzimi"],
    ["Lipoxygenase", "Lipoksijenaz", "Lökotrien sentez enzimi"],
  ];
  return enzymes.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Hormonlar
const generateHormones = () => {
  const hormones = [
    ["Insulin", "İnsülin", "Kan şekeri düşürücü hormon"],
    ["Glucagon", "Glukagon", "Kan şekeri yükseltici hormon"],
    ["Cortisol", "Kortizol", "Stres hormonu"],
    ["Aldosterone", "Aldosteron", "Tuz dengesi hormonu"],
    ["Adrenaline", "Adrenalin", "Savaş-kaç hormonu"],
    ["Noradrenaline", "Noradrenalin", "Katekolamin"],
    ["Thyroxine", "Tiroksin", "T4 hormonu"],
    ["Triiodothyronine", "Triiyodotironin", "T3 hormonu"],
    ["Calcitonin", "Kalsitonin", "Kalsiyum düşürücü hormon"],
    ["Parathyroid hormone", "Paratiroid Hormonu", "Kalsiyum yükseltici"],
    ["Growth hormone", "Büyüme Hormonu", "Somatotropin"],
    ["Prolactin", "Prolaktin", "Süt hormonu"],
    ["Oxytocin", "Oksitosin", "Bağlanma hormonu"],
    ["Vasopressin", "Vazopressin", "Antidiüretik hormon"],
    ["Melatonin", "Melatonin", "Uyku hormonu"],
    ["Serotonin", "Serotonin", "Mutluluk hormonu"],
    ["Dopamine", "Dopamin", "Ödül hormonu"],
    ["Testosterone", "Testosteron", "Erkeklik hormonu"],
    ["Estrogen", "Östrojen", "Kadınlık hormonu"],
    ["Progesterone", "Progesteron", "Gebelik hormonu"],
  ];
  return hormones.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Nörotransmitterler
const generateNeurotransmitters = () => {
  const neurotransmitters = [
    ["Acetylcholine", "Asetilkolin", "Kolinerjik nörotransmitter"],
    ["Glutamate", "Glutamat", "Uyarıcı nörotransmitter"],
    ["GABA", "GABA", "İnhibitör nörotransmitter"],
    ["Glycine", "Glisin", "İnhibitör nörotransmitter"],
    ["Aspartate", "Aspartat", "Uyarıcı nörotransmitter"],
    ["Histamine", "Histamin", "Biyojenik amin"],
    ["Substance P", "Substans P", "Ağrı nöropeptidi"],
    ["Endorphin", "Endorfin", "Doğal ağrı kesici"],
    ["Enkephalin", "Enkefalin", "Opioid peptid"],
    ["Dynorphin", "Dinorfin", "Opioid peptid"],
    ["Neuropeptide Y", "Nöropeptid Y", "İştah düzenleyici"],
    ["Cholecystokinin", "Kolesistokinin", "Tokluk hormonu"],
    ["Vasoactive intestinal peptide", "VIP", "Bağırsak peptidi"],
    ["Somatostatin", "Somatostatin", "Büyüme hormonu inhibitörü"],
    ["Neurotensin", "Nörotensin", "Nöropeptid"],
    ["Orexin", "Oreksin", "Uyanıklık peptidi"],
    ["Galanin", "Galanin", "Nöropeptid"],
    ["Calcitonin gene-related peptide", "CGRP", "Migren ilişkili peptid"],
    ["Brain-derived neurotrophic factor", "BDNF", "Nörotrofik faktör"],
    ["Nerve growth factor", "NGF", "Sinir büyüme faktörü"],
  ];
  return neurotransmitters.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 FINAL PUSH - 10,000 HEDEFİ İÇİN SON TERİMLER");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const anatomicalRegions = generateAnatomicalRegions();
  const diseaseLocations = generateDiseaseLocations();
  const drugClasses = generateDrugClasses();
  const moreDrugClasses = generateMoreDrugClasses();
  const extraDrugClasses = generateExtraDrugClasses();
  const insectSpecies = generateInsectSpecies();
  const moreInsectSpecies = generateMoreInsectSpecies();
  const pathogens = generatePathogens();
  const morePathogens = generateMorePathogens();
  const viruses = generateViruses();
  const moreViruses = generateMoreViruses();
  const parasites = generateParasites();
  const moreParasites = generateMoreParasites();
  const aminoAcids = generateAminoAcids();
  const enzymes = generateEnzymes();
  const hormones = generateHormones();
  const neurotransmitters = generateNeurotransmitters();

  const allTerms = [
    ...anatomicalRegions,
    ...diseaseLocations,
    ...drugClasses,
    ...moreDrugClasses,
    ...extraDrugClasses,
    ...insectSpecies,
    ...moreInsectSpecies,
    ...pathogens,
    ...morePathogens,
    ...viruses,
    ...moreViruses,
    ...parasites,
    ...moreParasites,
    ...aminoAcids,
    ...enzymes,
    ...hormones,
    ...neurotransmitters,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(`   Anatomik Bölgeler: ${anatomicalRegions.length}`);
  console.log(`   Hastalık Lokalizasyonları: ${diseaseLocations.length}`);
  console.log(
    `   İlaç Sınıfları: ${
      drugClasses.length + moreDrugClasses.length + extraDrugClasses.length
    }`
  );
  console.log(
    `   Böcek Türleri: ${insectSpecies.length + moreInsectSpecies.length}`
  );
  console.log(`   Patojenler: ${pathogens.length + morePathogens.length}`);
  console.log(`   Virüsler: ${viruses.length + moreViruses.length}`);
  console.log(`   Parazitler: ${parasites.length + moreParasites.length}`);
  console.log(`   Amino Asitler: ${aminoAcids.length}`);
  console.log(`   Enzimler: ${enzymes.length}`);
  console.log(`   Hormonlar: ${hormones.length}`);
  console.log(`   Nörotransmitterler: ${neurotransmitters.length}`);
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
