// Final batch - 10,000 hedefi için son terimler
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

// Programatik terim üretimi - Tıbbi kökler ve kombinasyonlar
const generateMedicalRoots = () => {
  const roots = [
    // Organ kökleri
    ["Cardi-", "Kardi-", "Kalp ile ilgili"],
    ["Hepat-", "Hepat-", "Karaciğer ile ilgili"],
    ["Nephr-", "Nefr-", "Böbrek ile ilgili"],
    ["Pulmon-", "Pulmon-", "Akciğer ile ilgili"],
    ["Gastr-", "Gastr-", "Mide ile ilgili"],
    ["Enter-", "Enter-", "Bağırsak ile ilgili"],
    ["Cyst-", "Sist-", "Mesane ile ilgili"],
    ["Dermat-", "Dermat-", "Deri ile ilgili"],
    ["Oste-", "Oste-", "Kemik ile ilgili"],
    ["Arthr-", "Artr-", "Eklem ile ilgili"],
    ["My-", "Mi-", "Kas ile ilgili"],
    ["Neur-", "Nör-", "Sinir ile ilgili"],
    ["Encephal-", "Ensefal-", "Beyin ile ilgili"],
    ["Ophthalm-", "Oftalm-", "Göz ile ilgili"],
    ["Ot-", "Ot-", "Kulak ile ilgili"],
    ["Rhin-", "Rin-", "Burun ile ilgili"],
    ["Laryng-", "Larenj-", "Gırtlak ile ilgili"],
    ["Pharyng-", "Farenj-", "Yutak ile ilgili"],
    ["Trache-", "Trake-", "Nefes borusu ile ilgili"],
    ["Bronch-", "Bronk-", "Bronş ile ilgili"],
    ["Pneum-", "Pnöm-", "Akciğer/hava ile ilgili"],
    ["Angi-", "Anji-", "Damar ile ilgili"],
    ["Phleb-", "Fleb-", "Toplardamar ile ilgili"],
    ["Arteri-", "Arteri-", "Atardamar ile ilgili"],
    ["Hem-", "Hem-", "Kan ile ilgili"],
    ["Lymph-", "Lenf-", "Lenf ile ilgili"],
    ["Splen-", "Splen-", "Dalak ile ilgili"],
    ["Thym-", "Tim-", "Timus ile ilgili"],
    ["Aden-", "Aden-", "Bez ile ilgili"],
    ["Thyroid-", "Tiroid-", "Tiroid ile ilgili"],
    ["Pancreat-", "Pankreat-", "Pankreas ile ilgili"],
    ["Cholecyst-", "Kolesist-", "Safra kesesi ile ilgili"],
    ["Cholangi-", "Kolanji-", "Safra yolu ile ilgili"],
    ["Prostat-", "Prostat-", "Prostat ile ilgili"],
    ["Oophor-", "Oofor-", "Yumurtalık ile ilgili"],
    ["Salping-", "Salpinj-", "Tüp ile ilgili"],
    ["Hyster-", "Hister-", "Rahim ile ilgili"],
    ["Metr-", "Metr-", "Rahim ile ilgili"],
    ["Colp-", "Kolp-", "Vajina ile ilgili"],
    ["Mast-", "Mast-", "Meme ile ilgili"],
    ["Mamm-", "Mam-", "Meme ile ilgili"],
    ["Orchi-", "Orki-", "Testis ile ilgili"],
    ["Cephal-", "Sefal-", "Baş ile ilgili"],
    ["Cervic-", "Servik-", "Boyun ile ilgili"],
    ["Thorac-", "Torak-", "Göğüs ile ilgili"],
    ["Abdomin-", "Abdomin-", "Karın ile ilgili"],
    ["Pelv-", "Pelv-", "Pelvis ile ilgili"],
    ["Lumb-", "Lomb-", "Bel ile ilgili"],
    ["Sacr-", "Sakr-", "Sakrum ile ilgili"],
    ["Coccyg-", "Koksij-", "Kuyruk kemiği ile ilgili"],
  ];
  return roots.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, "Tıbbi kök: " + def)
  );
};

// Tıbbi terimler - Patoloji
const generatePathologyTerms = () => {
  const terms = [
    ["Hyperplasia", "Hiperplazi", "Hücre sayısında artış"],
    ["Hypertrophy", "Hipertrofi", "Hücre boyutunda artış"],
    ["Atrophy", "Atrofi", "Doku küçülmesi"],
    ["Metaplasia", "Metaplazi", "Hücre tipi değişimi"],
    ["Dysplasia", "Displazi", "Anormal hücre gelişimi"],
    ["Neoplasia", "Neoplazi", "Yeni doku oluşumu"],
    ["Anaplasia", "Anaplazi", "Hücre farklılaşma kaybı"],
    ["Aplasia", "Aplazi", "Organ/doku yokluğu"],
    ["Hypoplasia", "Hipoplazi", "Yetersiz gelişim"],
    ["Agenesis", "Agenezi", "Organ oluşmama"],
    ["Ectopia", "Ektopi", "Anormal yerleşim"],
    ["Heterotopia", "Heterotopi", "Yanlış yerde doku"],
    ["Hamartoma", "Hamartom", "Düzensiz doku kitlesi"],
    ["Choristoma", "Koristom", "Yabancı doku"],
    ["Teratoma", "Teratom", "Üç germ yaprağı tümörü"],
    ["Adenoma", "Adenom", "Bez tümörü"],
    ["Carcinoma", "Karsinom", "Epitel kanseri"],
    ["Sarcoma", "Sarkom", "Bağ dokusu kanseri"],
    ["Lymphoma", "Lenfoma", "Lenf dokusu kanseri"],
    ["Leukemia", "Lösemi", "Kan kanseri"],
    ["Melanoma", "Melanom", "Pigment hücre kanseri"],
    ["Blastoma", "Blastom", "Embriyonik tümör"],
    ["Papilloma", "Papillom", "Papiller tümör"],
    ["Polyp", "Polip", "Mukoza çıkıntısı"],
    ["Cyst", "Kist", "Sıvı dolu kese"],
    ["Abscess", "Apse", "İrin birikimi"],
    ["Granuloma", "Granülom", "Granülomatöz iltihap"],
    ["Fibrosis", "Fibrozis", "Bağ dokusu artışı"],
    ["Sclerosis", "Skleroz", "Sertleşme"],
    ["Calcification", "Kalsifikasyon", "Kireçlenme"],
    ["Necrosis", "Nekroz", "Doku ölümü"],
    ["Apoptosis", "Apoptoz", "Programlı hücre ölümü"],
    ["Gangrene", "Kangren", "Doku çürümesi"],
    ["Infarction", "Enfarktüs", "İskemik nekroz"],
    ["Ischemia", "İskemi", "Kan akımı azalması"],
    ["Hemorrhage", "Hemoraji", "Kanama"],
    ["Thrombosis", "Tromboz", "Pıhtı oluşumu"],
    ["Embolism", "Emboli", "Pıhtı göçü"],
    ["Edema", "Ödem", "Sıvı birikimi"],
    ["Effusion", "Efüzyon", "Boşlukta sıvı"],
    ["Exudate", "Eksüda", "İltihabi sıvı"],
    ["Transudate", "Transüda", "Non-inflamatuvar sıvı"],
    ["Congestion", "Konjesyon", "Kan göllenmesi"],
    ["Hyperemia", "Hiperemi", "Kan artışı"],
    ["Petechiae", "Peteşi", "Nokta kanama"],
    ["Purpura", "Purpura", "Mor lekeler"],
    ["Ecchymosis", "Ekimoz", "Çürük"],
    ["Hematoma", "Hematom", "Kan birikimi"],
    ["Contusion", "Kontüzyon", "Ezilme"],
    ["Laceration", "Laserasyon", "Yırtık"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Histoloji terimleri
const generateHistologyTerms = () => {
  const terms = [
    ["Epithelium", "Epitel", "Örtü dokusu"],
    [
      "Simple squamous epithelium",
      "Basit Yassı Epitel",
      "Tek katlı yassı epitel",
    ],
    [
      "Simple cuboidal epithelium",
      "Basit Kübik Epitel",
      "Tek katlı kübik epitel",
    ],
    [
      "Simple columnar epithelium",
      "Basit Silindirik Epitel",
      "Tek katlı silindirik epitel",
    ],
    [
      "Stratified squamous epithelium",
      "Çok Katlı Yassı Epitel",
      "Çok katlı yassı epitel",
    ],
    [
      "Pseudostratified epithelium",
      "Yalancı Çok Katlı Epitel",
      "Psödostratifiye epitel",
    ],
    ["Transitional epithelium", "Değişici Epitel", "Ürotelyal epitel"],
    ["Connective tissue", "Bağ Dokusu", "Destek dokusu"],
    ["Loose connective tissue", "Gevşek Bağ Dokusu", "Areolar doku"],
    ["Dense connective tissue", "Sıkı Bağ Dokusu", "Fibröz doku"],
    ["Adipose tissue", "Yağ Dokusu", "Adipoz doku"],
    ["Cartilage", "Kıkırdak", "Kartilaj"],
    ["Hyaline cartilage", "Hiyalin Kıkırdak", "Cam kıkırdak"],
    ["Elastic cartilage", "Elastik Kıkırdak", "Esnek kıkırdak"],
    ["Fibrocartilage", "Fibrokıkırdak", "Lifli kıkırdak"],
    ["Bone tissue", "Kemik Dokusu", "Osseöz doku"],
    ["Compact bone", "Kompakt Kemik", "Kortikal kemik"],
    ["Spongy bone", "Süngerimsi Kemik", "Trabeküler kemik"],
    ["Muscle tissue", "Kas Dokusu", "Müsküler doku"],
    ["Skeletal muscle", "İskelet Kası", "Çizgili kas"],
    ["Cardiac muscle", "Kalp Kası", "Kardiyak kas"],
    ["Smooth muscle", "Düz Kas", "Visseral kas"],
    ["Nervous tissue", "Sinir Dokusu", "Nöral doku"],
    ["Neuron", "Nöron", "Sinir hücresi"],
    ["Neuroglia", "Nöroglia", "Destek hücreleri"],
    ["Astrocyte", "Astrosit", "Yıldız hücre"],
    ["Oligodendrocyte", "Oligodendrosit", "Miyelin yapıcı"],
    ["Microglia", "Mikroglia", "Beyin makrofajı"],
    ["Schwann cell", "Schwann Hücresi", "Periferik miyelin"],
    ["Fibroblast", "Fibroblast", "Bağ dokusu hücresi"],
    ["Chondrocyte", "Kondrosit", "Kıkırdak hücresi"],
    ["Osteocyte", "Osteosit", "Kemik hücresi"],
    ["Osteoblast", "Osteoblast", "Kemik yapıcı"],
    ["Osteoclast", "Osteoklast", "Kemik yıkıcı"],
    ["Adipocyte", "Adiposit", "Yağ hücresi"],
    ["Macrophage", "Makrofaj", "Büyük yiyici hücre"],
    ["Mast cell", "Mast Hücresi", "Histamin hücresi"],
    ["Plasma cell", "Plazma Hücresi", "Antikor yapıcı"],
    ["Lymphocyte", "Lenfosit", "Lenf hücresi"],
    ["Neutrophil", "Nötrofil", "Çok çekirdekli lökosit"],
    ["Eosinophil", "Eozinofil", "Asidofilik lökosit"],
    ["Basophil", "Bazofil", "Bazofilik lökosit"],
    ["Monocyte", "Monosit", "Tek çekirdekli lökosit"],
    ["Erythrocyte", "Eritrosit", "Kırmızı kan hücresi"],
    ["Thrombocyte", "Trombosit", "Kan pulcuğu"],
    ["Reticulocyte", "Retikülosit", "Genç eritrosit"],
    ["Megakaryocyte", "Megakaryosit", "Trombosit öncüsü"],
    ["Stem cell", "Kök Hücre", "Pluripotent hücre"],
    ["Progenitor cell", "Progenitör Hücre", "Öncü hücre"],
    ["Goblet cell", "Kadeh Hücresi", "Mukus salgılayan"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Biyokimya terimleri
const generateBiochemistryTerms = () => {
  const terms = [
    ["Adenosine triphosphate", "Adenozin Trifosfat", "ATP, enerji molekülü"],
    ["Adenosine diphosphate", "Adenozin Difosfat", "ADP"],
    ["Adenosine monophosphate", "Adenozin Monofosfat", "AMP"],
    ["Cyclic AMP", "Siklik AMP", "cAMP, ikincil haberci"],
    ["Guanosine triphosphate", "Guanozin Trifosfat", "GTP"],
    [
      "Nicotinamide adenine dinucleotide",
      "Nikotinamid Adenin Dinükleotid",
      "NAD+/NADH",
    ],
    ["Flavin adenine dinucleotide", "Flavin Adenin Dinükleotid", "FAD/FADH2"],
    ["Coenzyme A", "Koenzim A", "CoA, asetil taşıyıcı"],
    ["Acetyl-CoA", "Asetil-KoA", "Metabolizma ara ürünü"],
    ["Pyruvate", "Piruvat", "Glikoliz son ürünü"],
    ["Lactate", "Laktat", "Anaerobik metabolizma"],
    ["Citrate", "Sitrat", "Krebs döngüsü"],
    ["Oxaloacetate", "Oksaloasetat", "Krebs döngüsü"],
    ["Alpha-ketoglutarate", "Alfa-Ketoglutarat", "Krebs döngüsü"],
    ["Succinate", "Süksinat", "Krebs döngüsü"],
    ["Fumarate", "Fumarat", "Krebs döngüsü"],
    ["Malate", "Malat", "Krebs döngüsü"],
    ["Glycolysis", "Glikoliz", "Glukoz yıkımı"],
    ["Gluconeogenesis", "Glukoneogenez", "Glukoz sentezi"],
    ["Glycogenesis", "Glikojenez", "Glikojen sentezi"],
    ["Glycogenolysis", "Glikojenoliz", "Glikojen yıkımı"],
    ["Lipogenesis", "Lipogenez", "Yağ sentezi"],
    ["Lipolysis", "Lipoliz", "Yağ yıkımı"],
    ["Beta-oxidation", "Beta Oksidasyon", "Yağ asidi yıkımı"],
    ["Ketogenesis", "Ketogenez", "Keton cismi sentezi"],
    ["Ketone bodies", "Keton Cisimleri", "Asetoasetat, beta-hidroksibutirat"],
    ["Urea cycle", "Üre Döngüsü", "Amonyak detoksifikasyonu"],
    ["Transamination", "Transaminasyon", "Amino grubu transferi"],
    ["Deamination", "Deaminasyon", "Amino grubu çıkarma"],
    ["Oxidative phosphorylation", "Oksidatif Fosforilasyon", "ATP sentezi"],
    ["Electron transport chain", "Elektron Taşıma Zinciri", "ETC"],
    ["Chemiosmosis", "Kemiozmoz", "Proton gradyanı"],
    [
      "Substrate-level phosphorylation",
      "Substrat Düzeyinde Fosforilasyon",
      "Direkt ATP",
    ],
    ["Pentose phosphate pathway", "Pentoz Fosfat Yolu", "NADPH ve riboz"],
    ["Glucuronic acid pathway", "Glukuronik Asit Yolu", "Detoksifikasyon"],
    ["Methylation", "Metilasyon", "Metil grubu ekleme"],
    ["Acetylation", "Asetilasyon", "Asetil grubu ekleme"],
    ["Phosphorylation", "Fosforilasyon", "Fosfat grubu ekleme"],
    ["Ubiquitination", "Ubikuitinasyon", "Protein işaretleme"],
    ["Glycosylation", "Glikozilasyon", "Şeker ekleme"],
    ["Hydroxylation", "Hidroksilasyon", "Hidroksil grubu ekleme"],
    ["Carboxylation", "Karboksilasyon", "Karboksil grubu ekleme"],
    ["Decarboxylation", "Dekarboksilasyon", "CO2 çıkarma"],
    ["Oxidation", "Oksidasyon", "Elektron kaybı"],
    ["Reduction", "Redüksiyon", "Elektron kazanımı"],
    ["Hydrolysis", "Hidroliz", "Su ile parçalama"],
    ["Condensation", "Kondensasyon", "Su çıkararak birleşme"],
    ["Isomerization", "İzomerizasyon", "İzomer dönüşümü"],
    ["Polymerization", "Polimerizasyon", "Monomer birleşimi"],
    ["Proteolysis", "Proteoliz", "Protein yıkımı"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Farmakoloji terimleri
const generatePharmacologyTerms = () => {
  const terms = [
    ["Pharmacokinetics", "Farmakokinetik", "İlacın vücuttaki hareketi"],
    ["Pharmacodynamics", "Farmakodinamik", "İlacın etki mekanizması"],
    ["Absorption", "Absorpsiyon", "Emilim"],
    ["Distribution", "Dağılım", "Vücutta dağılım"],
    ["Metabolism", "Metabolizma", "Biyotransformasyon"],
    ["Excretion", "Atılım", "Eliminasyon"],
    ["Bioavailability", "Biyoyararlanım", "Sistemik dolaşıma ulaşan oran"],
    ["First-pass effect", "İlk Geçiş Etkisi", "Karaciğer metabolizması"],
    ["Half-life", "Yarı Ömür", "Konsantrasyon yarılanma süresi"],
    ["Clearance", "Klirens", "Temizlenme hızı"],
    ["Volume of distribution", "Dağılım Hacmi", "Vd"],
    ["Steady state", "Kararlı Durum", "Denge konsantrasyonu"],
    ["Loading dose", "Yükleme Dozu", "Başlangıç dozu"],
    ["Maintenance dose", "İdame Dozu", "Sürdürme dozu"],
    ["Therapeutic index", "Terapötik İndeks", "Güvenlik aralığı"],
    ["Therapeutic window", "Terapötik Pencere", "Etkin doz aralığı"],
    ["Minimum effective concentration", "Minimum Etkin Konsantrasyon", "MEC"],
    ["Maximum tolerated dose", "Maksimum Tolere Edilen Doz", "MTD"],
    ["Lethal dose 50", "Letal Doz 50", "LD50"],
    ["Effective dose 50", "Etkin Doz 50", "ED50"],
    ["Agonist", "Agonist", "Reseptör aktive edici"],
    ["Antagonist", "Antagonist", "Reseptör bloke edici"],
    ["Partial agonist", "Parsiyel Agonist", "Kısmi aktivatör"],
    ["Inverse agonist", "İnvers Agonist", "Ters etki"],
    ["Competitive antagonist", "Kompetitif Antagonist", "Yarışmalı blokaj"],
    [
      "Non-competitive antagonist",
      "Non-Kompetitif Antagonist",
      "Yarışmasız blokaj",
    ],
    ["Allosteric modulator", "Allosterik Modülatör", "Farklı bölge etkisi"],
    ["Receptor", "Reseptör", "İlaç bağlanma bölgesi"],
    ["Ligand", "Ligand", "Reseptöre bağlanan molekül"],
    ["Affinity", "Afinite", "Bağlanma gücü"],
    ["Efficacy", "Efikasite", "Etkinlik"],
    ["Potency", "Potens", "Güç"],
    ["Selectivity", "Selektivite", "Seçicilik"],
    ["Specificity", "Spesifisite", "Özgüllük"],
    ["Tolerance", "Tolerans", "Etki azalması"],
    ["Tachyphylaxis", "Taşifilaksi", "Hızlı tolerans"],
    ["Dependence", "Bağımlılık", "Fiziksel/psikolojik"],
    ["Withdrawal", "Yoksunluk", "Çekilme belirtileri"],
    ["Addiction", "Bağımlılık", "Madde kullanım bozukluğu"],
    ["Idiosyncrasy", "İdiyosinkrazi", "Bireysel farklı tepki"],
    ["Hypersensitivity", "Hipersensitivite", "Aşırı duyarlılık"],
    ["Anaphylaxis", "Anafilaksi", "Şiddetli alerji"],
    ["Drug interaction", "İlaç Etkileşimi", "İlaçlar arası etki"],
    ["Synergism", "Sinerjizm", "Artırıcı etki"],
    ["Antagonism", "Antagonizma", "Azaltıcı etki"],
    ["Potentiation", "Potansiyalizasyon", "Güçlendirme"],
    ["Additive effect", "Aditif Etki", "Toplayıcı etki"],
    ["Prodrug", "Ön İlaç", "Aktif forma dönüşen"],
    ["Active metabolite", "Aktif Metabolit", "Etkin yıkım ürünü"],
    ["Enzyme induction", "Enzim İndüksiyonu", "Enzim artışı"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Mikrobiyoloji terimleri
const generateMicrobiologyTerms = () => {
  const terms = [
    ["Gram-positive bacteria", "Gram Pozitif Bakteri", "Mor boyanan bakteri"],
    ["Gram-negative bacteria", "Gram Negatif Bakteri", "Pembe boyanan bakteri"],
    ["Cocci", "Koklar", "Yuvarlak bakteriler"],
    ["Bacilli", "Basiller", "Çubuk bakteriler"],
    ["Spirochetes", "Spiroketler", "Spiral bakteriler"],
    ["Aerobic bacteria", "Aerobik Bakteri", "Oksijen gerektiren"],
    ["Anaerobic bacteria", "Anaerobik Bakteri", "Oksijensiz yaşayan"],
    ["Facultative anaerobe", "Fakültatif Anaerob", "Her iki ortamda yaşayan"],
    ["Obligate anaerobe", "Obligat Anaerob", "Sadece oksijensiz"],
    ["Spore-forming bacteria", "Spor Oluşturan Bakteri", "Endospor yapan"],
    ["Biofilm", "Biyofilm", "Bakteri topluluğu"],
    ["Virulence", "Virülans", "Hastalık yapma gücü"],
    ["Pathogenicity", "Patojenite", "Hastalık yapabilme"],
    ["Toxin", "Toksin", "Bakteri zehiri"],
    ["Endotoxin", "Endotoksin", "Hücre duvarı toksini"],
    ["Exotoxin", "Ekzotoksin", "Salgılanan toksin"],
    ["Antigen", "Antijen", "Bağışıklık uyarıcı"],
    ["Antibody", "Antikor", "İmmünoglobulin"],
    ["Immunoglobulin G", "İmmünoglobulin G", "IgG"],
    ["Immunoglobulin M", "İmmünoglobulin M", "IgM"],
    ["Immunoglobulin A", "İmmünoglobulin A", "IgA"],
    ["Immunoglobulin E", "İmmünoglobulin E", "IgE"],
    ["Immunoglobulin D", "İmmünoglobulin D", "IgD"],
    ["Complement system", "Kompleman Sistemi", "Bağışıklık proteini"],
    ["Cytokine", "Sitokin", "Hücre sinyali"],
    ["Interleukin", "İnterlökin", "IL, sitokin"],
    ["Interferon", "İnterferon", "IFN, antiviral"],
    ["Tumor necrosis factor", "Tümör Nekroz Faktörü", "TNF"],
    ["Colony forming unit", "Koloni Oluşturan Birim", "CFU"],
    [
      "Minimum inhibitory concentration",
      "Minimum İnhibitör Konsantrasyon",
      "MİK",
    ],
    [
      "Minimum bactericidal concentration",
      "Minimum Bakterisidal Konsantrasyon",
      "MBK",
    ],
    ["Antibiotic resistance", "Antibiyotik Direnci", "İlaç direnci"],
    ["Beta-lactamase", "Beta-Laktamaz", "Penisilin yıkıcı enzim"],
    [
      "Extended-spectrum beta-lactamase",
      "Geniş Spektrumlu Beta-Laktamaz",
      "GSBL",
    ],
    [
      "Methicillin-resistant Staphylococcus aureus",
      "Metisiline Dirençli S. aureus",
      "MRSA",
    ],
    [
      "Vancomycin-resistant Enterococcus",
      "Vankomisine Dirençli Enterokok",
      "VRE",
    ],
    [
      "Carbapenem-resistant Enterobacteriaceae",
      "Karbapenem Dirençli Enterobacteriaceae",
      "CRE",
    ],
    ["Multidrug-resistant organism", "Çoklu İlaç Dirençli Organizma", "MDRO"],
    ["Nosocomial infection", "Nozokomiyal Enfeksiyon", "Hastane enfeksiyonu"],
    [
      "Healthcare-associated infection",
      "Sağlık Bakımı İlişkili Enfeksiyon",
      "SBİE",
    ],
    ["Opportunistic infection", "Fırsatçı Enfeksiyon", "İmmün yetmezlikte"],
    ["Zoonosis", "Zoonoz", "Hayvan kaynaklı hastalık"],
    ["Vector-borne disease", "Vektör Kaynaklı Hastalık", "Böcek taşımalı"],
    ["Incubation period", "İnkübasyon Periyodu", "Kuluçka süresi"],
    ["Prodromal period", "Prodromal Dönem", "Öncü belirtiler"],
    ["Convalescence", "Konvalesan Dönem", "İyileşme dönemi"],
    ["Carrier state", "Taşıyıcılık", "Asemptomatik enfeksiyon"],
    ["Endemic", "Endemik", "Bölgesel hastalık"],
    ["Epidemic", "Epidemik", "Salgın"],
    ["Pandemic", "Pandemik", "Küresel salgın"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// İmmünoloji terimleri
const generateImmunologyTerms = () => {
  const terms = [
    ["Innate immunity", "Doğal Bağışıklık", "Doğuştan gelen"],
    ["Adaptive immunity", "Adaptif Bağışıklık", "Kazanılmış bağışıklık"],
    ["Humoral immunity", "Hümoral Bağışıklık", "Antikor aracılı"],
    ["Cell-mediated immunity", "Hücresel Bağışıklık", "T hücre aracılı"],
    ["Active immunity", "Aktif Bağışıklık", "Kendi üretimi"],
    ["Passive immunity", "Pasif Bağışıklık", "Dışarıdan alınan"],
    ["Natural immunity", "Doğal Bağışıklık", "Enfeksiyon sonrası"],
    ["Artificial immunity", "Yapay Bağışıklık", "Aşı ile"],
    ["T lymphocyte", "T Lenfosit", "T hücresi"],
    ["B lymphocyte", "B Lenfosit", "B hücresi"],
    ["Natural killer cell", "Doğal Öldürücü Hücre", "NK hücresi"],
    ["Helper T cell", "Yardımcı T Hücresi", "CD4+ T hücresi"],
    ["Cytotoxic T cell", "Sitotoksik T Hücresi", "CD8+ T hücresi"],
    ["Regulatory T cell", "Düzenleyici T Hücresi", "Treg"],
    ["Memory cell", "Hafıza Hücresi", "İmmün hafıza"],
    ["Dendritic cell", "Dendritik Hücre", "Antijen sunucu"],
    ["Antigen-presenting cell", "Antijen Sunan Hücre", "APC"],
    [
      "Major histocompatibility complex",
      "Majör Histokompatibilite Kompleksi",
      "MHC",
    ],
    ["Human leukocyte antigen", "İnsan Lökosit Antijeni", "HLA"],
    ["Cluster of differentiation", "Farklılaşma Kümesi", "CD"],
    ["T cell receptor", "T Hücre Reseptörü", "TCR"],
    ["B cell receptor", "B Hücre Reseptörü", "BCR"],
    ["Toll-like receptor", "Toll Benzeri Reseptör", "TLR"],
    ["Pattern recognition receptor", "Patern Tanıma Reseptörü", "PRR"],
    [
      "Pathogen-associated molecular pattern",
      "Patojen İlişkili Moleküler Patern",
      "PAMP",
    ],
    [
      "Damage-associated molecular pattern",
      "Hasar İlişkili Moleküler Patern",
      "DAMP",
    ],
    ["Opsonization", "Opsonizasyon", "Fagositoz kolaylaştırma"],
    ["Phagocytosis", "Fagositoz", "Hücre yutma"],
    ["Chemotaxis", "Kemotaksis", "Kimyasal çekim"],
    ["Inflammation", "İnflamasyon", "İltihap"],
    ["Acute inflammation", "Akut İnflamasyon", "Ani iltihap"],
    ["Chronic inflammation", "Kronik İnflamasyon", "Uzun süreli iltihap"],
    ["Autoimmunity", "Otoimmünite", "Kendi dokusuna saldırı"],
    ["Autoantibody", "Otoantikor", "Kendi antijenine antikor"],
    [
      "Hypersensitivity reaction",
      "Hipersensitivite Reaksiyonu",
      "Aşırı duyarlılık",
    ],
    [
      "Type I hypersensitivity",
      "Tip I Hipersensitivite",
      "IgE aracılı, anafilaksi",
    ],
    ["Type II hypersensitivity", "Tip II Hipersensitivite", "Sitotoksik"],
    ["Type III hypersensitivity", "Tip III Hipersensitivite", "İmmün kompleks"],
    ["Type IV hypersensitivity", "Tip IV Hipersensitivite", "Gecikmiş tip"],
    ["Anergy", "Anerji", "İmmün yanıtsızlık"],
    ["Tolerance", "Tolerans", "İmmün hoşgörü"],
    ["Immunodeficiency", "İmmün Yetmezlik", "Bağışıklık eksikliği"],
    ["Primary immunodeficiency", "Primer İmmün Yetmezlik", "Doğuştan"],
    ["Secondary immunodeficiency", "Sekonder İmmün Yetmezlik", "Edinilmiş"],
    ["Graft-versus-host disease", "Graft Versus Host Hastalığı", "GVHD"],
    ["Transplant rejection", "Transplant Reddi", "Nakil reddi"],
    ["Hyperacute rejection", "Hiperakut Red", "Dakikalar içinde"],
    ["Acute rejection", "Akut Red", "Günler-haftalar"],
    ["Chronic rejection", "Kronik Red", "Aylar-yıllar"],
    ["Immunosuppression", "İmmünosupresyon", "Bağışıklık baskılama"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Fizyoloji terimleri
const generatePhysiologyTerms = () => {
  const terms = [
    ["Homeostasis", "Homeostaz", "İç denge"],
    ["Negative feedback", "Negatif Geri Bildirim", "Dengeleyici mekanizma"],
    ["Positive feedback", "Pozitif Geri Bildirim", "Artırıcı mekanizma"],
    ["Action potential", "Aksiyon Potansiyeli", "Sinir impulsu"],
    [
      "Resting membrane potential",
      "Dinlenme Membran Potansiyeli",
      "Hücre elektrik potansiyeli",
    ],
    ["Depolarization", "Depolarizasyon", "Elektrik değişimi"],
    ["Repolarization", "Repolarizasyon", "Elektrik geri dönüşü"],
    ["Hyperpolarization", "Hiperpolarizasyon", "Aşırı negatifleşme"],
    ["Refractory period", "Refrakter Periyod", "Uyarılmaz dönem"],
    ["Synaptic transmission", "Sinaptik İletim", "Sinir iletimi"],
    ["Neurotransmitter", "Nörotransmitter", "Sinir ileticisi"],
    ["Acetylcholine", "Asetilkolin", "ACh, nörotransmitter"],
    ["Norepinephrine", "Norepinefrin", "NE, nörotransmitter"],
    ["Epinephrine", "Epinefrin", "Adrenalin"],
    ["Dopamine", "Dopamin", "DA, nörotransmitter"],
    ["Serotonin", "Serotonin", "5-HT, nörotransmitter"],
    ["Gamma-aminobutyric acid", "Gama-Aminobütirik Asit", "GABA, inhibitör"],
    ["Glutamate", "Glutamat", "Eksitatör nörotransmitter"],
    ["Glycine", "Glisin", "İnhibitör nörotransmitter"],
    ["Endorphin", "Endorfin", "Doğal ağrı kesici"],
    ["Enkephalin", "Enkefalin", "Opioid peptid"],
    ["Substance P", "Substans P", "Ağrı ileticisi"],
    ["Cardiac output", "Kardiyak Output", "Kalp debisi"],
    ["Stroke volume", "Atım Hacmi", "Bir atımda pompalanan kan"],
    ["Heart rate", "Kalp Hızı", "Dakikadaki atım sayısı"],
    ["Blood pressure", "Kan Basıncı", "Arteriyel basınç"],
    ["Systolic pressure", "Sistolik Basınç", "Kasılma basıncı"],
    ["Diastolic pressure", "Diyastolik Basınç", "Gevşeme basıncı"],
    ["Mean arterial pressure", "Ortalama Arteriyel Basınç", "MAP"],
    ["Peripheral resistance", "Periferik Direnç", "Damar direnci"],
    ["Preload", "Ön Yük", "Doluş hacmi"],
    ["Afterload", "Ard Yük", "Ejeksiyon direnci"],
    ["Contractility", "Kontraktilite", "Kasılma gücü"],
    [
      "Frank-Starling mechanism",
      "Frank-Starling Mekanizması",
      "Kalp adaptasyonu",
    ],
    ["Baroreceptor reflex", "Baroreseptör Refleksi", "Basınç düzenleme"],
    ["Tidal volume", "Tidal Volüm", "Soluk hacmi"],
    ["Vital capacity", "Vital Kapasite", "Maksimum soluk"],
    ["Residual volume", "Rezidüel Volüm", "Kalan hava"],
    ["Total lung capacity", "Total Akciğer Kapasitesi", "TLC"],
    ["Functional residual capacity", "Fonksiyonel Rezidüel Kapasite", "FRC"],
    ["Forced expiratory volume", "Zorlu Ekspiratuar Volüm", "FEV1"],
    ["Forced vital capacity", "Zorlu Vital Kapasite", "FVC"],
    ["Minute ventilation", "Dakika Ventilasyonu", "Dakikada solunan hava"],
    [
      "Alveolar ventilation",
      "Alveoler Ventilasyon",
      "Gaz değişimi ventilasyonu",
    ],
    ["Dead space", "Ölü Boşluk", "Gaz değişimi olmayan"],
    ["Ventilation-perfusion ratio", "Ventilasyon-Perfüzyon Oranı", "V/Q"],
    ["Oxygen saturation", "Oksijen Satürasyonu", "SpO2"],
    ["Partial pressure of oxygen", "Parsiyel Oksijen Basıncı", "PO2"],
    [
      "Partial pressure of carbon dioxide",
      "Parsiyel Karbondioksit Basıncı",
      "PCO2",
    ],
    ["Glomerular filtration rate", "Glomerüler Filtrasyon Hızı", "GFR"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Genetik terimleri
const generateGeneticsTerms = () => {
  const terms = [
    ["Deoxyribonucleic acid", "Deoksiribonükleik Asit", "DNA"],
    ["Ribonucleic acid", "Ribonükleik Asit", "RNA"],
    ["Messenger RNA", "Haberci RNA", "mRNA"],
    ["Transfer RNA", "Taşıyıcı RNA", "tRNA"],
    ["Ribosomal RNA", "Ribozomal RNA", "rRNA"],
    ["MicroRNA", "MikroRNA", "miRNA"],
    ["Chromosome", "Kromozom", "Genetik materyal taşıyıcı"],
    ["Autosome", "Otozom", "Cinsiyet dışı kromozom"],
    ["Sex chromosome", "Cinsiyet Kromozomu", "X ve Y"],
    ["Gene", "Gen", "Kalıtım birimi"],
    ["Allele", "Alel", "Gen varyantı"],
    ["Genotype", "Genotip", "Genetik yapı"],
    ["Phenotype", "Fenotip", "Gözlenen özellik"],
    ["Dominant", "Dominant", "Baskın"],
    ["Recessive", "Resesif", "Çekinik"],
    ["Codominant", "Kodominant", "Eş baskın"],
    ["Homozygous", "Homozigot", "Aynı alelli"],
    ["Heterozygous", "Heterozigot", "Farklı alelli"],
    ["Hemizygous", "Hemizigot", "Tek alelli"],
    ["Mutation", "Mutasyon", "Genetik değişim"],
    ["Point mutation", "Nokta Mutasyonu", "Tek baz değişimi"],
    [
      "Frameshift mutation",
      "Çerçeve Kayması Mutasyonu",
      "Okuma çerçevesi değişimi",
    ],
    ["Deletion", "Delesyon", "Kayıp"],
    ["Insertion", "İnsersiyon", "Ekleme"],
    ["Duplication", "Duplikasyon", "Çoğalma"],
    ["Inversion", "İnversiyon", "Ters dönme"],
    ["Translocation", "Translokasyon", "Yer değiştirme"],
    ["Aneuploidy", "Anöploidi", "Kromozom sayı anomalisi"],
    ["Polyploidy", "Poliploidi", "Çoklu kromozom seti"],
    ["Trisomy", "Trizomi", "Üç kromozom"],
    ["Monosomy", "Monozomi", "Tek kromozom"],
    ["Mosaicism", "Mozaikizm", "Farklı hücre hatları"],
    ["Transcription", "Transkripsiyon", "DNA'dan RNA"],
    ["Translation", "Translasyon", "RNA'dan protein"],
    ["Replication", "Replikasyon", "DNA kopyalama"],
    ["Codon", "Kodon", "Üçlü baz"],
    ["Anticodon", "Antikodon", "tRNA üçlüsü"],
    ["Start codon", "Başlangıç Kodonu", "AUG"],
    ["Stop codon", "Durma Kodonu", "UAA, UAG, UGA"],
    ["Promoter", "Promotör", "Gen başlangıç bölgesi"],
    ["Enhancer", "Artırıcı", "Gen ifade artırıcı"],
    ["Silencer", "Susturucu", "Gen ifade azaltıcı"],
    ["Intron", "İntron", "Kodlamayan bölge"],
    ["Exon", "Ekzon", "Kodlayan bölge"],
    ["Splicing", "Kırpma", "İntron çıkarma"],
    ["Epigenetics", "Epigenetik", "Gen ifade düzenleme"],
    ["DNA methylation", "DNA Metilasyonu", "Epigenetik işaret"],
    ["Histone modification", "Histon Modifikasyonu", "Kromatin düzenleme"],
    ["Imprinting", "İmprinting", "Genomik damgalama"],
    ["X-inactivation", "X İnaktivasyonu", "X kromozomu susturma"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Radyoloji terimleri
const generateRadiologyTerms = () => {
  const terms = [
    ["X-ray", "X-Işını", "Röntgen"],
    ["Radiograph", "Radyograf", "Röntgen filmi"],
    ["Fluoroscopy", "Floroskopi", "Canlı röntgen"],
    ["Computed tomography", "Bilgisayarlı Tomografi", "BT, CT"],
    ["Magnetic resonance imaging", "Manyetik Rezonans Görüntüleme", "MRG, MRI"],
    ["Ultrasound", "Ultrason", "USG"],
    ["Doppler ultrasound", "Doppler Ultrason", "Akım ölçümü"],
    ["Echocardiography", "Ekokardiyografi", "Kalp ultrasonu"],
    ["Nuclear medicine", "Nükleer Tıp", "Radyoizotop görüntüleme"],
    ["Positron emission tomography", "Pozitron Emisyon Tomografisi", "PET"],
    [
      "Single photon emission computed tomography",
      "Tek Foton Emisyon BT",
      "SPECT",
    ],
    ["Bone scintigraphy", "Kemik Sintigrafisi", "Kemik taraması"],
    ["Thyroid scintigraphy", "Tiroid Sintigrafisi", "Tiroid taraması"],
    ["Mammography", "Mamografi", "Meme görüntüleme"],
    ["Angiography", "Anjiyografi", "Damar görüntüleme"],
    ["Coronary angiography", "Koroner Anjiyografi", "Kalp damarı görüntüleme"],
    [
      "Cerebral angiography",
      "Serebral Anjiyografi",
      "Beyin damarı görüntüleme",
    ],
    ["Venography", "Venografi", "Ven görüntüleme"],
    ["Lymphangiography", "Lenfanjiyografi", "Lenf damarı görüntüleme"],
    ["Myelography", "Miyelografi", "Omurilik görüntüleme"],
    ["Arthrography", "Artrografi", "Eklem görüntüleme"],
    ["Hysterosalpingography", "Histerosalpingografi", "Rahim-tüp görüntüleme"],
    [
      "Intravenous pyelography",
      "İntravenöz Piyelografi",
      "IVP, böbrek görüntüleme",
    ],
    ["Barium swallow", "Baryum Yutma", "Yemek borusu görüntüleme"],
    ["Barium enema", "Baryumlu Lavman", "Kolon görüntüleme"],
    ["Contrast medium", "Kontrast Madde", "Görüntüleme ajanı"],
    ["Iodinated contrast", "İyotlu Kontrast", "BT kontrastı"],
    ["Gadolinium contrast", "Gadolinyum Kontrast", "MR kontrastı"],
    ["Radiopaque", "Radyoopak", "X-ışını geçirmeyen"],
    ["Radiolucent", "Radyolüsen", "X-ışını geçiren"],
    ["Hounsfield unit", "Hounsfield Birimi", "HU, BT yoğunluk"],
    ["T1-weighted image", "T1 Ağırlıklı Görüntü", "MR sekansı"],
    ["T2-weighted image", "T2 Ağırlıklı Görüntü", "MR sekansı"],
    ["FLAIR", "FLAIR", "Sıvı baskılı MR"],
    ["Diffusion-weighted imaging", "Difüzyon Ağırlıklı Görüntüleme", "DWI"],
    ["Apparent diffusion coefficient", "Görünür Difüzyon Katsayısı", "ADC"],
    ["Perfusion imaging", "Perfüzyon Görüntüleme", "Kan akımı görüntüleme"],
    ["Functional MRI", "Fonksiyonel MRI", "fMRI"],
    ["MR spectroscopy", "MR Spektroskopi", "MRS"],
    ["CT angiography", "BT Anjiyografi", "BTA"],
    ["MR angiography", "MR Anjiyografi", "MRA"],
    ["Dual-energy CT", "Çift Enerjili BT", "DECT"],
    ["Cone beam CT", "Konik Işınlı BT", "CBCT"],
    ["Interventional radiology", "Girişimsel Radyoloji", "Minimal invaziv"],
    ["Embolization", "Embolizasyon", "Damar tıkama"],
    ["Ablation", "Ablasyon", "Doku yıkımı"],
    ["Radiofrequency ablation", "Radyofrekans Ablasyon", "RFA"],
    ["Cryoablation", "Kriyoablasyon", "Dondurarak yıkım"],
    ["Biopsy guidance", "Biyopsi Rehberliği", "Görüntü eşliğinde"],
    ["Drainage", "Drenaj", "Sıvı boşaltma"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Cerrahi terimler
const generateSurgicalTerms = () => {
  const terms = [
    ["Incision", "İnsizyon", "Kesme"],
    ["Excision", "Eksizyon", "Çıkarma"],
    ["Resection", "Rezeksiyon", "Kısmi çıkarma"],
    ["Ablation", "Ablasyon", "Yok etme"],
    ["Debridement", "Debridman", "Ölü doku temizleme"],
    ["Anastomosis", "Anastomoz", "Birleştirme"],
    ["Ligation", "Ligasyon", "Bağlama"],
    ["Suture", "Sütür", "Dikiş"],
    ["Staple", "Zımba", "Cerrahi zımba"],
    ["Cauterization", "Koterizasyon", "Yakma"],
    ["Electrocautery", "Elektrokoter", "Elektrikle yakma"],
    ["Hemostasis", "Hemostaz", "Kanama durdurma"],
    ["Dissection", "Diseksiyon", "Ayırma"],
    ["Retraction", "Retraksiyon", "Geri çekme"],
    ["Dilation", "Dilatasyon", "Genişletme"],
    ["Drainage", "Drenaj", "Boşaltma"],
    ["Irrigation", "İrrigasyon", "Yıkama"],
    ["Aspiration", "Aspirasyon", "Emme"],
    ["Biopsy", "Biyopsi", "Doku örneği alma"],
    ["Frozen section", "Frozen Kesit", "Hızlı patoloji"],
    ["Laparotomy", "Laparotomi", "Karın açma"],
    ["Laparoscopy", "Laparoskopi", "Kapalı karın cerrahisi"],
    ["Thoracotomy", "Torakotomi", "Göğüs açma"],
    ["Thoracoscopy", "Torakoskopi", "Kapalı göğüs cerrahisi"],
    ["Craniotomy", "Kraniyotomi", "Kafatası açma"],
    ["Sternotomy", "Sternotomi", "Göğüs kemiği açma"],
    ["Arthrotomy", "Artrotomi", "Eklem açma"],
    ["Arthroscopy", "Artroskopi", "Kapalı eklem cerrahisi"],
    ["Endoscopy", "Endoskopi", "İç organ görüntüleme"],
    ["Minimally invasive surgery", "Minimal İnvaziv Cerrahi", "Kapalı cerrahi"],
    ["Robotic surgery", "Robotik Cerrahi", "Robot yardımlı"],
    ["Open surgery", "Açık Cerrahi", "Geleneksel cerrahi"],
    ["Elective surgery", "Elektif Cerrahi", "Planlı ameliyat"],
    ["Emergency surgery", "Acil Cerrahi", "Acil ameliyat"],
    ["Palliative surgery", "Palyatif Cerrahi", "Rahatlatıcı ameliyat"],
    ["Curative surgery", "Küratif Cerrahi", "İyileştirici ameliyat"],
    ["Reconstructive surgery", "Rekonstrüktif Cerrahi", "Onarıcı ameliyat"],
    ["Cosmetic surgery", "Kozmetik Cerrahi", "Estetik ameliyat"],
    ["Transplant surgery", "Transplant Cerrahisi", "Nakil ameliyatı"],
    ["Bariatric surgery", "Bariatrik Cerrahi", "Obezite cerrahisi"],
    ["Cardiac surgery", "Kardiyak Cerrahi", "Kalp cerrahisi"],
    ["Vascular surgery", "Vasküler Cerrahi", "Damar cerrahisi"],
    ["Neurosurgery", "Nöroşirürji", "Beyin cerrahisi"],
    ["Orthopedic surgery", "Ortopedik Cerrahi", "Kemik cerrahisi"],
    ["Plastic surgery", "Plastik Cerrahi", "Plastik ve rekonstrüktif"],
    ["General surgery", "Genel Cerrahi", "Genel ameliyatlar"],
    ["Pediatric surgery", "Pediatrik Cerrahi", "Çocuk cerrahisi"],
    ["Oncologic surgery", "Onkolojik Cerrahi", "Kanser cerrahisi"],
    ["Trauma surgery", "Travma Cerrahisi", "Yaralanma cerrahisi"],
    ["Transplantation", "Transplantasyon", "Organ nakli"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.COMPONENT, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Final Batch Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(60));

  console.log("📝 Terimler oluşturuluyor...");

  const medicalRoots = generateMedicalRoots();
  const pathologyTerms = generatePathologyTerms();
  const histologyTerms = generateHistologyTerms();
  const biochemistryTerms = generateBiochemistryTerms();
  const pharmacologyTerms = generatePharmacologyTerms();
  const microbiologyTerms = generateMicrobiologyTerms();
  const immunologyTerms = generateImmunologyTerms();
  const physiologyTerms = generatePhysiologyTerms();
  const geneticsTerms = generateGeneticsTerms();
  const radiologyTerms = generateRadiologyTerms();
  const surgicalTerms = generateSurgicalTerms();

  const allTerms = [
    ...medicalRoots,
    ...pathologyTerms,
    ...histologyTerms,
    ...biochemistryTerms,
    ...pharmacologyTerms,
    ...microbiologyTerms,
    ...immunologyTerms,
    ...physiologyTerms,
    ...geneticsTerms,
    ...radiologyTerms,
    ...surgicalTerms,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Tıbbi Kökler: ${medicalRoots.length}`);
  console.log(`   Patoloji Terimleri: ${pathologyTerms.length}`);
  console.log(`   Histoloji Terimleri: ${histologyTerms.length}`);
  console.log(`   Biyokimya Terimleri: ${biochemistryTerms.length}`);
  console.log(`   Farmakoloji Terimleri: ${pharmacologyTerms.length}`);
  console.log(`   Mikrobiyoloji Terimleri: ${microbiologyTerms.length}`);
  console.log(`   İmmünoloji Terimleri: ${immunologyTerms.length}`);
  console.log(`   Fizyoloji Terimleri: ${physiologyTerms.length}`);
  console.log(`   Genetik Terimleri: ${geneticsTerms.length}`);
  console.log(`   Radyoloji Terimleri: ${radiologyTerms.length}`);
  console.log(`   Cerrahi Terimler: ${surgicalTerms.length}`);
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
