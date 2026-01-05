// Mega terim üretme scripti - 10,000 terime ulaşmak için
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
// Pediatrik hastalıklar
const generatePediatricDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Neonatal jaundice", "Yenidoğan Sarılığı", "Hiperbilirubinemi"],
    ["Kernicterus", "Kernikterus", "Bilirubin ensefalopatisi"],
    [
      "Respiratory distress syndrome",
      "Solunum Sıkıntısı Sendromu",
      "RDS, prematüre",
    ],
    ["Bronchopulmonary dysplasia", "Bronkopulmoner Displazi", "BPD"],
    ["Necrotizing enterocolitis", "Nekrotizan Enterokolit", "NEC"],
    ["Patent ductus arteriosus", "Patent Duktus Arteriozus", "PDA"],
    ["Ventricular septal defect", "Ventriküler Septal Defekt", "VSD"],
    ["Atrial septal defect", "Atriyal Septal Defekt", "ASD"],
    ["Tetralogy of Fallot", "Fallot Tetralojisi", "Siyanotik kalp hastalığı"],
    [
      "Transposition of great arteries",
      "Büyük Arterlerin Transpozisyonu",
      "TGA",
    ],
    ["Coarctation of aorta", "Aort Koarktasyonu", "Aort darlığı"],
    [
      "Hypoplastic left heart syndrome",
      "Hipoplastik Sol Kalp Sendromu",
      "HLHS",
    ],
    ["Pyloric stenosis", "Pilorik Stenoz", "Mide çıkış darlığı"],
    ["Intussusception", "İntusepsiyon", "Bağırsak içine girme"],
    ["Hirschsprung disease", "Hirschsprung Hastalığı", "Konjenital megakolon"],
    ["Meconium ileus", "Mekonyum İleusu", "Kistik fibrozis belirtisi"],
    ["Omphalocele", "Omfalosel", "Göbek fıtığı"],
    ["Gastroschisis", "Gastroşizis", "Karın duvarı defekti"],
    ["Esophageal atresia", "Özofagus Atrezisi", "Yemek borusu yokluğu"],
    ["Tracheoesophageal fistula", "Trakeoözofageal Fistül", "TEF"],
    ["Duodenal atresia", "Duodenal Atrezi", "Duodenum tıkanıklığı"],
    ["Anorectal malformation", "Anorektal Malformasyon", "İmperfore anüs"],
    ["Biliary atresia", "Biliyer Atrezi", "Safra yolu yokluğu"],
    ["Congenital diaphragmatic hernia", "Konjenital Diyafragma Hernisi", "CDH"],
    ["Cleft lip", "Yarık Dudak", "Tavşan dudağı"],
    ["Cleft palate", "Yarık Damak", "Kurt ağzı"],
    ["Craniosynostosis", "Kraniyosinostoz", "Erken kafatası kapanması"],
    ["Hydrocephalus", "Hidrosefali", "Beyin sıvısı birikimi"],
    ["Spina bifida", "Spina Bifida", "Omurga kapanma defekti"],
    ["Meningomyelocele", "Meningomiyelosel", "Açık spina bifida"],
    ["Anencephaly", "Anensefali", "Beyin yokluğu"],
    ["Congenital hypothyroidism", "Konjenital Hipotiroidizm", "Kretenizm"],
    ["Phenylketonuria", "Fenilketonüri", "PKU"],
    ["Galactosemia", "Galaktozemi", "Galaktoz metabolizma bozukluğu"],
    ["Maple syrup urine disease", "Akçaağaç Şurubu İdrar Hastalığı", "MSUD"],
    ["Glycogen storage disease", "Glikojen Depo Hastalığı", "GSD"],
    ["Mucopolysaccharidosis", "Mukopolisakkaridoz", "MPS"],
    ["Tay-Sachs disease", "Tay-Sachs Hastalığı", "GM2 gangliosidoz"],
    ["Gaucher disease", "Gaucher Hastalığı", "Glukoserebrosidaz eksikliği"],
    [
      "Niemann-Pick disease",
      "Niemann-Pick Hastalığı",
      "Sfingomyelinaz eksikliği",
    ],
    ["Fabry disease", "Fabry Hastalığı", "Alfa-galaktosidaz eksikliği"],
    ["Pompe disease", "Pompe Hastalığı", "Asit maltaz eksikliği"],
    ["Cystic fibrosis", "Kistik Fibrozis", "CFTR mutasyonu"],
    ["Duchenne muscular dystrophy", "Duchenne Müsküler Distrofi", "DMD"],
    ["Spinal muscular atrophy", "Spinal Müsküler Atrofi", "SMA"],
    ["Down syndrome", "Down Sendromu", "Trizomi 21"],
    ["Turner syndrome", "Turner Sendromu", "45,X"],
    ["Klinefelter syndrome", "Klinefelter Sendromu", "47,XXY"],
    ["Fragile X syndrome", "Frajil X Sendromu", "FMR1 mutasyonu"],
    ["Prader-Willi syndrome", "Prader-Willi Sendromu", "15q11-13 delesyonu"],
    ["Angelman syndrome", "Angelman Sendromu", "15q11-13 delesyonu"],
    ["Williams syndrome", "Williams Sendromu", "7q11.23 delesyonu"],
    ["DiGeorge syndrome", "DiGeorge Sendromu", "22q11.2 delesyonu"],
    ["Noonan syndrome", "Noonan Sendromu", "RAS-MAPK yolak bozukluğu"],
    ["Marfan syndrome", "Marfan Sendromu", "Fibrilin-1 mutasyonu"],
    ["Ehlers-Danlos syndrome", "Ehlers-Danlos Sendromu", "Kollajen bozukluğu"],
    [
      "Osteogenesis imperfecta",
      "Osteogenezis İmperfekta",
      "Cam kemik hastalığı",
    ],
    ["Achondroplasia", "Akondroplazi", "Cücelik"],
    [
      "Neurofibromatosis type 1",
      "Nörofibromatozis Tip 1",
      "NF1, von Recklinghausen",
    ],
    ["Neurofibromatosis type 2", "Nörofibromatozis Tip 2", "NF2"],
    ["Tuberous sclerosis", "Tüberoz Skleroz", "TSC"],
    [
      "Sturge-Weber syndrome",
      "Sturge-Weber Sendromu",
      "Ensefalotrigeminal anjiomatoz",
    ],
    ["Von Hippel-Lindau disease", "Von Hippel-Lindau Hastalığı", "VHL"],
    ["Retinoblastoma", "Retinoblastom", "Göz kanseri"],
    ["Wilms tumor", "Wilms Tümörü", "Nefroblastom"],
    ["Neuroblastoma", "Nöroblastom", "Adrenal tümör"],
    ["Rhabdomyosarcoma", "Rabdomiyosarkom", "Yumuşak doku sarkomu"],
    ["Ewing sarcoma", "Ewing Sarkomu", "Kemik tümörü"],
    ["Osteosarcoma", "Osteosarkom", "Kemik kanseri"],
    [
      "Acute lymphoblastic leukemia",
      "Akut Lenfoblastik Lösemi",
      "ALL, çocukluk",
    ],
    [
      "Kawasaki disease",
      "Kawasaki Hastalığı",
      "Mukokutanöz lenf nodu sendromu",
    ],
    ["Henoch-Schonlein purpura", "Henoch-Schönlein Purpurası", "IgA vasküliti"],
    ["Juvenile idiopathic arthritis", "Juvenil İdiyopatik Artrit", "JIA"],
    ["Febrile seizure", "Febril Konvülziyon", "Ateşli havale"],
    ["Infantile spasms", "İnfantil Spazmlar", "West sendromu"],
    ["Lennox-Gastaut syndrome", "Lennox-Gastaut Sendromu", "Dirençli epilepsi"],
    ["Autism spectrum disorder", "Otizm Spektrum Bozukluğu", "OSB"],
    [
      "Attention deficit hyperactivity disorder",
      "Dikkat Eksikliği Hiperaktivite Bozukluğu",
      "DEHB",
    ],
    ["Cerebral palsy", "Serebral Palsi", "Beyin felci"],
    ["Developmental dysplasia of hip", "Gelişimsel Kalça Displazisi", "GKD"],
    ["Scoliosis", "Skolyoz", "Omurga eğriliği"],
    [
      "Legg-Calve-Perthes disease",
      "Legg-Calvé-Perthes Hastalığı",
      "Femur başı avasküler nekrozu",
    ],
    ["Slipped capital femoral epiphysis", "Femur Başı Epifiz Kayması", "SCFE"],
    [
      "Osgood-Schlatter disease",
      "Osgood-Schlatter Hastalığı",
      "Tibial tüberkül apofiziti",
    ],
    ["Growing pains", "Büyüme Ağrıları", "Benign ekstremite ağrısı"],
    ["Failure to thrive", "Gelişme Geriliği", "Büyüme yetersizliği"],
    ["Short stature", "Boy Kısalığı", "Büyüme hormonu eksikliği"],
    ["Precocious puberty", "Erken Ergenlik", "Prekoks puberte"],
    ["Delayed puberty", "Geç Ergenlik", "Gecikmiş puberte"],
    ["Enuresis", "Enürezis", "Yatak ıslatma"],
    ["Encopresis", "Enkoprezis", "Dışkı kaçırma"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Jinekolojik ve obstetrik hastalıklar
const generateGynecologicDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Endometriosis", "Endometriozis", "Ektopik endometrium"],
    ["Adenomyosis", "Adenomiyozis", "Miyometrium içi endometrium"],
    ["Uterine fibroids", "Uterin Fibroidler", "Miyom"],
    ["Uterine polyps", "Uterin Polipler", "Endometriyal polip"],
    [
      "Endometrial hyperplasia",
      "Endometriyal Hiperplazi",
      "Endometrium kalınlaşması",
    ],
    ["Endometrial cancer", "Endometriyal Kanser", "Rahim kanseri"],
    ["Cervical dysplasia", "Servikal Displazi", "CIN"],
    ["Cervical cancer", "Serviks Kanseri", "Rahim ağzı kanseri"],
    ["Ovarian cyst", "Over Kisti", "Yumurtalık kisti"],
    ["Polycystic ovary syndrome", "Polikistik Over Sendromu", "PKOS"],
    ["Ovarian cancer", "Over Kanseri", "Yumurtalık kanseri"],
    ["Ovarian torsion", "Over Torsiyonu", "Yumurtalık dönmesi"],
    ["Ectopic pregnancy", "Ektopik Gebelik", "Dış gebelik"],
    ["Pelvic inflammatory disease", "Pelvik İnflamatuar Hastalık", "PID"],
    ["Vulvovaginitis", "Vulvovajinit", "Vulva-vajina iltihabı"],
    ["Bacterial vaginosis", "Bakteriyel Vajinoz", "BV"],
    [
      "Vulvovaginal candidiasis",
      "Vulvovajinal Kandidiyaz",
      "Mantar enfeksiyonu",
    ],
    ["Trichomoniasis", "Trikomoniyaz", "Trichomonas vaginalis"],
    ["Bartholin cyst", "Bartholin Kisti", "Bartholin bezi kisti"],
    ["Vulvar cancer", "Vulva Kanseri", "Vulva malignitesi"],
    ["Vaginal cancer", "Vajina Kanseri", "Vajinal malignite"],
    [
      "Gestational trophoblastic disease",
      "Gestasyonel Trofoblastik Hastalık",
      "GTH",
    ],
    ["Hydatidiform mole", "Hidatidiform Mol", "Mol gebelik"],
    ["Choriocarcinoma", "Koryokarsinom", "Trofoblastik tümör"],
    ["Amenorrhea", "Amenore", "Adet görememe"],
    ["Primary amenorrhea", "Primer Amenore", "Hiç adet görmeme"],
    ["Secondary amenorrhea", "Sekonder Amenore", "Adet kesilmesi"],
    ["Dysmenorrhea", "Dismenore", "Ağrılı adet"],
    ["Menorrhagia", "Menoraji", "Aşırı adet kanaması"],
    ["Metrorrhagia", "Metroraji", "Düzensiz kanama"],
    ["Premenstrual syndrome", "Premenstrüel Sendrom", "PMS"],
    [
      "Premenstrual dysphoric disorder",
      "Premenstrüel Disforik Bozukluk",
      "PMDD",
    ],
    ["Menopause", "Menopoz", "Adet kesilmesi"],
    [
      "Premature ovarian insufficiency",
      "Prematür Over Yetmezliği",
      "Erken menopoz",
    ],
    ["Infertility", "İnfertilite", "Kısırlık"],
    ["Female infertility", "Kadın İnfertilitesi", "Kadın kısırlığı"],
    ["Male infertility", "Erkek İnfertilitesi", "Erkek kısırlığı"],
    [
      "Recurrent pregnancy loss",
      "Tekrarlayan Gebelik Kaybı",
      "Habitual abortus",
    ],
    ["Preeclampsia", "Preeklampsi", "Gebelik hipertansiyonu"],
    ["Eclampsia", "Eklampsi", "Gebelik konvülziyonu"],
    ["HELLP syndrome", "HELLP Sendromu", "Hemoliz, karaciğer, trombositopeni"],
    ["Gestational diabetes", "Gestasyonel Diyabet", "Gebelik diyabeti"],
    [
      "Hyperemesis gravidarum",
      "Hiperemezis Gravidarum",
      "Şiddetli gebelik bulantısı",
    ],
    ["Placenta previa", "Plasenta Previa", "Düşük yerleşimli plasenta"],
    ["Placental abruption", "Plasenta Dekolmanı", "Plasenta ayrılması"],
    ["Preterm labor", "Preterm Doğum", "Erken doğum"],
    ["Premature rupture of membranes", "Erken Membran Rüptürü", "PROM"],
    [
      "Intrauterine growth restriction",
      "İntrauterin Büyüme Kısıtlılığı",
      "IUGR",
    ],
    ["Postpartum hemorrhage", "Postpartum Kanama", "Doğum sonrası kanama"],
    [
      "Postpartum depression",
      "Postpartum Depresyon",
      "Doğum sonrası depresyon",
    ],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Ürolojik hastalıklar
const generateUrologicDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Benign prostatic hyperplasia", "Benign Prostat Hiperplazisi", "BPH"],
    ["Prostate cancer", "Prostat Kanseri", "Prostat adenokarsinomu"],
    ["Prostatitis", "Prostatit", "Prostat iltihabı"],
    [
      "Acute bacterial prostatitis",
      "Akut Bakteriyel Prostatit",
      "Akut prostatit",
    ],
    ["Chronic prostatitis", "Kronik Prostatit", "Kronik pelvik ağrı sendromu"],
    ["Erectile dysfunction", "Erektil Disfonksiyon", "İktidarsızlık"],
    ["Premature ejaculation", "Erken Boşalma", "Prematür ejakülasyon"],
    ["Peyronie disease", "Peyronie Hastalığı", "Penis eğriliği"],
    ["Priapism", "Priapizm", "Uzamış ereksiyon"],
    ["Phimosis", "Fimozis", "Sünnet derisi darlığı"],
    ["Paraphimosis", "Parafimozis", "Sünnet derisi sıkışması"],
    ["Balanitis", "Balanit", "Glans penis iltihabı"],
    ["Epididymitis", "Epididimit", "Epididim iltihabı"],
    ["Orchitis", "Orşit", "Testis iltihabı"],
    ["Testicular torsion", "Testis Torsiyonu", "Testis dönmesi"],
    ["Varicocele", "Varikosel", "Skrotal varisler"],
    ["Hydrocele", "Hidrosel", "Skrotal sıvı birikimi"],
    ["Spermatocele", "Spermatosel", "Epididim kisti"],
    ["Testicular cancer", "Testis Kanseri", "Testis tümörü"],
    ["Seminoma", "Seminom", "Germ hücreli tümör"],
    [
      "Nonseminomatous germ cell tumor",
      "Nonseminomatöz Germ Hücreli Tümör",
      "NSGCT",
    ],
    ["Cryptorchidism", "Kriptorşidizm", "İnmemiş testis"],
    ["Hypospadias", "Hipospadias", "Üretra açıklığı anomalisi"],
    ["Epispadias", "Epispadias", "Üretra üst açıklığı"],
    ["Bladder cancer", "Mesane Kanseri", "Mesane karsinomu"],
    [
      "Transitional cell carcinoma",
      "Transizyonel Hücreli Karsinom",
      "Ürotelyal karsinom",
    ],
    ["Interstitial cystitis", "İnterstisyel Sistit", "Ağrılı mesane sendromu"],
    ["Overactive bladder", "Aşırı Aktif Mesane", "OAB"],
    ["Urinary incontinence", "Üriner İnkontinans", "İdrar kaçırma"],
    [
      "Stress urinary incontinence",
      "Stres Üriner İnkontinans",
      "Efor inkontinansı",
    ],
    [
      "Urge urinary incontinence",
      "Urge Üriner İnkontinans",
      "Sıkışma inkontinansı",
    ],
    ["Neurogenic bladder", "Nörojenik Mesane", "Mesane disfonksiyonu"],
    ["Urethral stricture", "Üretral Darlık", "Üretra stenozu"],
    [
      "Ureteropelvic junction obstruction",
      "Üreteropelvik Bileşke Obstrüksiyonu",
      "UPJO",
    ],
    ["Vesicoureteral reflux", "Vezikoüreteral Reflü", "VUR"],
    ["Renal cell carcinoma", "Renal Hücreli Karsinom", "Böbrek kanseri"],
    ["Angiomyolipoma", "Anjiyomiyolipom", "Böbrek benign tümörü"],
    ["Oncocytoma", "Onkositom", "Böbrek benign tümörü"],
    ["Renal cyst", "Böbrek Kisti", "Basit böbrek kisti"],
    ["Polycystic kidney disease", "Polikistik Böbrek Hastalığı", "PKD"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Kas-iskelet sistemi anatomisi
const generateMusculoskeletalAnatomy = () => {
  const anatomy = [];
  const anatomyList = [
    // Kemikler
    ["Skull", "Kafatası", "Kraniyum"],
    ["Frontal bone", "Frontal Kemik", "Alın kemiği"],
    ["Parietal bone", "Parietal Kemik", "Yan kafatası kemiği"],
    ["Temporal bone", "Temporal Kemik", "Şakak kemiği"],
    ["Occipital bone", "Oksipital Kemik", "Arka kafa kemiği"],
    ["Sphenoid bone", "Sfenoid Kemik", "Kelebek kemik"],
    ["Ethmoid bone", "Etmoid Kemik", "Kalbur kemik"],
    ["Maxilla", "Maksilla", "Üst çene kemiği"],
    ["Mandible", "Mandibula", "Alt çene kemiği"],
    ["Zygomatic bone", "Zigomatik Kemik", "Elmacık kemiği"],
    ["Nasal bone", "Nazal Kemik", "Burun kemiği"],
    ["Lacrimal bone", "Lakrimal Kemik", "Gözyaşı kemiği"],
    ["Palatine bone", "Palatin Kemik", "Damak kemiği"],
    ["Hyoid bone", "Hiyoid Kemik", "Dil kemiği"],
    ["Vertebral column", "Omurga", "Vertebral kolon"],
    ["Cervical vertebrae", "Servikal Omurlar", "Boyun omurları"],
    ["Atlas", "Atlas", "C1 omuru"],
    ["Axis", "Aksis", "C2 omuru"],
    ["Thoracic vertebrae", "Torasik Omurlar", "Göğüs omurları"],
    ["Lumbar vertebrae", "Lomber Omurlar", "Bel omurları"],
    ["Sacrum", "Sakrum", "Kuyruk sokumu"],
    ["Coccyx", "Koksiks", "Kuyruk kemiği"],
    ["Sternum", "Sternum", "Göğüs kemiği"],
    ["Manubrium", "Manubrium", "Sternum üst kısmı"],
    ["Xiphoid process", "Ksifoid Çıkıntı", "Sternum alt ucu"],
    ["Ribs", "Kaburgalar", "Kostalar"],
    ["True ribs", "Gerçek Kaburgalar", "1-7. kaburgalar"],
    ["False ribs", "Yalancı Kaburgalar", "8-12. kaburgalar"],
    ["Floating ribs", "Yüzen Kaburgalar", "11-12. kaburgalar"],
    ["Clavicle", "Klavikula", "Köprücük kemiği"],
    ["Scapula", "Skapula", "Kürek kemiği"],
    ["Humerus", "Humerus", "Üst kol kemiği"],
    ["Radius", "Radius", "Önkol dış kemiği"],
    ["Ulna", "Ulna", "Önkol iç kemiği"],
    ["Carpal bones", "Karpal Kemikler", "El bileği kemikleri"],
    ["Metacarpal bones", "Metakarpal Kemikler", "El tarağı kemikleri"],
    ["Phalanges of hand", "El Parmak Kemikleri", "El falanjları"],
    ["Pelvis", "Pelvis", "Leğen kemiği"],
    ["Ilium", "İlium", "Kalça kemiği üst kısmı"],
    ["Ischium", "İskiyum", "Kalça kemiği alt kısmı"],
    ["Pubis", "Pubis", "Kalça kemiği ön kısmı"],
    ["Femur", "Femur", "Uyluk kemiği"],
    ["Patella", "Patella", "Diz kapağı"],
    ["Tibia", "Tibia", "Kaval kemiği"],
    ["Fibula", "Fibula", "Baldır kemiği"],
    ["Tarsal bones", "Tarsal Kemikler", "Ayak bileği kemikleri"],
    ["Calcaneus", "Kalkaneus", "Topuk kemiği"],
    ["Talus", "Talus", "Aşık kemiği"],
    ["Metatarsal bones", "Metatarsal Kemikler", "Ayak tarağı kemikleri"],
    ["Phalanges of foot", "Ayak Parmak Kemikleri", "Ayak falanjları"],
    // Eklemler
    ["Temporomandibular joint", "Temporomandibular Eklem", "Çene eklemi"],
    ["Shoulder joint", "Omuz Eklemi", "Glenohumeral eklem"],
    ["Elbow joint", "Dirsek Eklemi", "Humeroulnar eklem"],
    ["Wrist joint", "El Bileği Eklemi", "Radiokarpal eklem"],
    ["Hip joint", "Kalça Eklemi", "Koksofemoral eklem"],
    ["Knee joint", "Diz Eklemi", "Tibiofemoral eklem"],
    ["Ankle joint", "Ayak Bileği Eklemi", "Talocrural eklem"],
    ["Intervertebral joint", "İntervertebral Eklem", "Omurlar arası eklem"],
    ["Sacroiliac joint", "Sakroiliak Eklem", "SI eklem"],
    ["Acromioclavicular joint", "Akromiyoklaviküler Eklem", "AC eklem"],
    ["Sternoclavicular joint", "Sternoklaviküler Eklem", "SC eklem"],
    // Kaslar
    ["Trapezius", "Trapezius", "Sırt üst kası"],
    ["Latissimus dorsi", "Latissimus Dorsi", "Sırt geniş kası"],
    ["Rhomboid major", "Romboid Major", "Sırt kası"],
    ["Rhomboid minor", "Romboid Minor", "Sırt kası"],
    ["Levator scapulae", "Levator Skapula", "Kürek kaldırıcı kas"],
    ["Deltoid", "Deltoid", "Omuz kası"],
    ["Rotator cuff", "Rotator Manşet", "Omuz döndürücü kaslar"],
    ["Supraspinatus", "Supraspinatus", "Rotator manşet kası"],
    ["Infraspinatus", "İnfraspinatus", "Rotator manşet kası"],
    ["Teres minor", "Teres Minor", "Rotator manşet kası"],
    ["Subscapularis", "Subskapularis", "Rotator manşet kası"],
    ["Biceps brachii", "Biseps Brakii", "Kol ön kası"],
    ["Triceps brachii", "Triseps Brakii", "Kol arka kası"],
    ["Brachialis", "Brakiyalis", "Kol kası"],
    ["Brachioradialis", "Brakiyoradiyalis", "Önkol kası"],
    ["Pectoralis major", "Pektoralis Major", "Göğüs büyük kası"],
    ["Pectoralis minor", "Pektoralis Minor", "Göğüs küçük kası"],
    ["Serratus anterior", "Serratus Anterior", "Testere kası"],
    ["Rectus abdominis", "Rektus Abdominis", "Karın düz kası"],
    ["External oblique", "Eksternal Oblik", "Dış eğik karın kası"],
    ["Internal oblique", "İnternal Oblik", "İç eğik karın kası"],
    ["Transversus abdominis", "Transversus Abdominis", "Enine karın kası"],
    ["Quadratus lumborum", "Kuadratus Lumborum", "Bel kası"],
    ["Erector spinae", "Erektor Spina", "Omurga dikleştirici"],
    ["Iliopsoas", "İliopsoas", "Kalça fleksör kası"],
    ["Gluteus maximus", "Gluteus Maksimus", "Kalça büyük kası"],
    ["Gluteus medius", "Gluteus Medius", "Kalça orta kası"],
    ["Gluteus minimus", "Gluteus Minimus", "Kalça küçük kası"],
    ["Quadriceps femoris", "Kuadriseps Femoris", "Uyluk ön kası"],
    ["Rectus femoris", "Rektus Femoris", "Kuadriseps kası"],
    ["Vastus lateralis", "Vastus Lateralis", "Kuadriseps kası"],
    ["Vastus medialis", "Vastus Medialis", "Kuadriseps kası"],
    ["Vastus intermedius", "Vastus İntermedius", "Kuadriseps kası"],
    ["Hamstrings", "Hamstringler", "Uyluk arka kasları"],
    ["Biceps femoris", "Biseps Femoris", "Hamstring kası"],
    ["Semitendinosus", "Semitendinozus", "Hamstring kası"],
    ["Semimembranosus", "Semimembranozus", "Hamstring kası"],
    ["Adductor muscles", "Adduktor Kaslar", "Uyluk iç kasları"],
    ["Gastrocnemius", "Gastroknemius", "Baldır kası"],
    ["Soleus", "Soleus", "Baldır kası"],
    ["Tibialis anterior", "Tibialis Anterior", "Ön baldır kası"],
  ];

  anatomyList.forEach(([latin, turkish, def]) => {
    anatomy.push(createTerm(latin, turkish, TermCategory.ANATOMY, def));
  });

  return anatomy;
};

// Ek bitkiler - Tıbbi bitkiler
const generateMedicinalPlants = () => {
  const plants = [];
  const plantList = [
    ["Malva sylvestris", "Ebegümeci", "Yatıştırıcı, mukolitik"],
    ["Marrubium vulgare", "Boz Ot", "Ekspektoran, sindirim"],
    ["Melissa officinalis", "Melisa", "Anksiyolitik, antiviral"],
    ["Mentha arvensis", "Tarla Nanesi", "Karminatif, analjezik"],
    ["Menyanthes trifoliata", "Su Yoncası", "Acı tonik, sindirim"],
    ["Myrtus communis", "Mersin", "Antiseptik, ekspektoran"],
    ["Nepeta cataria", "Kedi Nanesi", "Sedatif, karminatif"],
    ["Oenothera biennis", "Çuha Çiçeği", "GLA kaynağı, cilt"],
    ["Olea europaea", "Zeytin", "Antioksidan, kardiyovasküler"],
    ["Origanum majorana", "Mercanköşk", "Karminatif, antispazmodik"],
    ["Paeonia officinalis", "Şakayık", "Antiinflamatuar, analjezik"],
    ["Papaver rhoeas", "Gelincik", "Sedatif, öksürük kesici"],
    ["Petroselinum crispum", "Maydanoz", "Diüretik, karminatif"],
    [
      "Phytolacca americana",
      "Amerikan Şekerciboyası",
      "Lenfatik, antiinflamatuar",
    ],
    ["Pimpinella saxifraga", "Taş Kıran", "Ekspektoran, diüretik"],
    ["Pinus sylvestris", "Sarıçam", "Ekspektoran, antiseptik"],
    ["Pistacia lentiscus", "Sakız Ağacı", "Sindirim, antimikrobiyal"],
    [
      "Plantago lanceolata",
      "Dar Yapraklı Sinir Otu",
      "Ekspektoran, yara iyileştirici",
    ],
    ["Plantago major", "Sinir Otu", "Yara iyileştirici, antiinflamatuar"],
    ["Polygonum aviculare", "Kuş Otu", "Astrenjan, diüretik"],
    ["Populus nigra", "Kara Kavak", "Antiinflamatuar, antiseptik"],
    ["Potentilla erecta", "Beş Parmak Otu", "Astrenjan, antidiyareik"],
    ["Primula veris", "Çuha Çiçeği", "Ekspektoran, sedatif"],
    ["Prunus spinosa", "Çakal Eriği", "Laksatif, diüretik"],
    ["Pulmonaria officinalis", "Ciğer Otu", "Ekspektoran, yatıştırıcı"],
    ["Quercus robur", "Meşe", "Astrenjan, antiinflamatuar"],
    ["Rhamnus cathartica", "Cehri", "Laksatif"],
    ["Ribes nigrum", "Siyah Frenk Üzümü", "Antiinflamatuar, antioksidan"],
    ["Rosa canina", "Kuşburnu", "C vitamini, antioksidan"],
    ["Rosmarinus officinalis", "Biberiye", "Antioksidan, hafıza"],
    ["Rubus idaeus", "Ahududu", "Kadın sağlığı, astrenjan"],
    ["Ruscus aculeatus", "Tavşan Memesi", "Venöz yetmezlik"],
    ["Ruta graveolens", "Sedef Otu", "Antispazmodik, emmenagog"],
    ["Salix alba", "Ak Söğüt", "Antiinflamatuar, analjezik"],
    ["Salvia officinalis", "Adaçayı", "Antiseptik, hafıza"],
    ["Sambucus nigra", "Mürver", "Antiviral, immünostimülan"],
    ["Sanguisorba officinalis", "Çayır Düğmesi", "Hemostatik, astrenjan"],
    ["Saponaria officinalis", "Sabun Otu", "Ekspektoran, detoks"],
    ["Satureja hortensis", "Sater", "Karminatif, antiseptik"],
    ["Scrophularia nodosa", "Sıraca Otu", "Lenfatik, cilt"],
    ["Senecio vulgaris", "Kanarya Otu", "Emmenagog, yara iyileştirici"],
    ["Silybum marianum", "Deve Dikeni", "Hepatoprotektif"],
    ["Solidago virgaurea", "Altın Başak", "Diüretik, antiinflamatuar"],
    ["Stachys officinalis", "Betonica", "Sedatif, sindirim"],
    ["Stellaria media", "Kuş Otu", "Cilt, antiinflamatuar"],
    ["Symphytum officinale", "Karakafes Otu", "Yara iyileştirici, kemik"],
    ["Tanacetum vulgare", "Solucan Otu", "Antiparaziter, sindirim"],
    ["Taraxacum officinale", "Karahindiba", "Diüretik, hepatoprotektif"],
    ["Teucrium chamaedrys", "Kısamahmut", "Sindirim, antiinflamatuar"],
    ["Thymus serpyllum", "Kekik", "Antiseptik, ekspektoran"],
  ];

  plantList.forEach(([latin, turkish, def]) => {
    plants.push(createTerm(latin, turkish, TermCategory.PLANT, def));
  });

  return plants;
};

// Ek böcekler ve parazitler
const generateMoreInsects = () => {
  const insects = [];
  const insectList = [
    ["Aedes vexans", "Sel Sivrisineği", "Yaygın sivrisinek"],
    ["Anopheles stephensi", "Stephensi Sivrisineği", "Sıtma vektörü"],
    ["Chrysomya bezziana", "Eski Dünya Solucan Sineği", "Miyaz etkeni"],
    ["Cochliomyia hominivorax", "Yeni Dünya Solucan Sineği", "Miyaz etkeni"],
    ["Cordylobia anthropophaga", "Tumbu Sineği", "Afrika miyaz etkeni"],
    ["Dermatobia hominis", "İnsan Bot Sineği", "Miyaz etkeni"],
    ["Gasterophilus intestinalis", "At Bot Sineği", "At paraziti"],
    ["Hypoderma bovis", "Sığır Sineği", "Sığır paraziti"],
    ["Lucilia sericata", "Yeşil Şişe Sineği", "Yara tedavisi"],
    ["Oestrus ovis", "Koyun Burun Sineği", "Koyun paraziti"],
    ["Sarcophaga carnaria", "Et Sineği", "Miyaz etkeni"],
    ["Wohlfahrtia magnifica", "Wohlfahrtia Sineği", "Miyaz etkeni"],
    ["Haematopinus suis", "Domuz Biti", "Domuz ektoparaziti"],
    ["Linognathus setosus", "Köpek Biti", "Köpek ektoparaziti"],
    ["Trichodectes canis", "Köpek Çiğneyici Biti", "Köpek ektoparaziti"],
    ["Felicola subrostratus", "Kedi Biti", "Kedi ektoparaziti"],
    ["Bovicola bovis", "Sığır Biti", "Sığır ektoparaziti"],
    ["Damalinia ovis", "Koyun Biti", "Koyun ektoparaziti"],
    ["Echidnophaga gallinacea", "Tavuk Piresi", "Kümes hayvanı paraziti"],
    ["Nosopsyllus fasciatus", "Kuzey Sıçan Piresi", "Kemirgen piresi"],
    ["Leptopsylla segnis", "Fare Piresi", "Kemirgen piresi"],
    ["Ceratophyllus gallinae", "Tavuk Piresi", "Kuş piresi"],
    ["Archaeopsylla erinacei", "Kirpi Piresi", "Kirpi paraziti"],
    ["Spilopsyllus cuniculi", "Tavşan Piresi", "Tavşan paraziti"],
    ["Ctenocephalides felis", "Kedi Piresi", "En yaygın pire"],
    ["Pulex simulans", "Yalancı İnsan Piresi", "Pire türü"],
    ["Hyalomma marginatum", "Hyalomma Kenesi", "Kırım-Kongo vektörü"],
    ["Hyalomma detritum", "Hyalomma Kenesi", "Kene türü"],
    ["Boophilus microplus", "Sığır Kenesi", "Babesiosis vektörü"],
    ["Haemaphysalis longicornis", "Asya Uzun Boynuzlu Kene", "İstilacı kene"],
    [
      "Ornithodoros moubata",
      "Afrika Yumuşak Kenesi",
      "Relapsing fever vektörü",
    ],
    ["Argas persicus", "Tavuk Kenesi", "Kümes hayvanı paraziti"],
    ["Otobius megnini", "Kulak Kenesi", "Spinose kulak kenesi"],
    ["Dermanyssus gallinae", "Kırmızı Tavuk Akarı", "Kümes paraziti"],
    ["Ornithonyssus sylviarum", "Kuzey Tavuk Akarı", "Kuş paraziti"],
    ["Cheyletiella yasguri", "Yürüyen Kepek Akarı", "Köpek paraziti"],
    ["Notoedres cati", "Kedi Uyuz Akarı", "Kedi uyuzu"],
    ["Psoroptes ovis", "Koyun Uyuz Akarı", "Koyun uyuzu"],
    ["Chorioptes bovis", "Sığır Uyuz Akarı", "Sığır uyuzu"],
    ["Otodectes cynotis", "Kulak Akarı", "Kedi/köpek kulak akarı"],
    ["Pneumonyssoides caninum", "Köpek Burun Akarı", "Köpek paraziti"],
    ["Linguatula serrata", "Dil Kurdu", "Pentastomid parazit"],
    ["Armillifer armillatus", "Armillifer", "Pentastomid parazit"],
    ["Porocephalus crotali", "Yılan Dil Kurdu", "Pentastomid parazit"],
    ["Myobia musculi", "Fare Kürk Akarı", "Kemirgen paraziti"],
    ["Radfordia affinis", "Fare Kürk Akarı", "Kemirgen paraziti"],
    ["Liponyssoides sanguineus", "Ev Fare Akarı", "Rickettsialpox vektörü"],
    ["Allodermanyssus sanguineus", "Fare Akarı", "Rickettsia vektörü"],
    ["Leptotrombidium deliense", "Scrub Typhus Akarı", "Scrub typhus vektörü"],
    ["Neotrombicula autumnalis", "Hasat Akarı", "Kaşıntı etkeni"],
  ];

  insectList.forEach(([latin, turkish, def]) => {
    insects.push(createTerm(latin, turkish, TermCategory.INSECT, def));
  });

  return insects;
};

// Ek bileşenler - Nörotransmitterler ve reseptörler
const generateNeurotransmitters = () => {
  const components = [];
  const componentList = [
    // Nörotransmitterler
    ["Acetylcholine", "Asetilkolin", "Kolinerjik nörotransmitter"],
    ["Dopamine", "Dopamin", "Katekolamin nörotransmitter"],
    ["Norepinephrine", "Norepinefrin", "Noradrenalin"],
    ["Epinephrine", "Epinefrin", "Adrenalin"],
    ["Serotonin", "Serotonin", "5-HT, monoamin"],
    ["Histamine", "Histamin", "Biyojenik amin"],
    ["GABA", "GABA", "Gama-aminobütirik asit"],
    ["Glutamate", "Glutamat", "Eksitatör nörotransmitter"],
    ["Glycine", "Glisin", "İnhibitör nörotransmitter"],
    ["Aspartate", "Aspartat", "Eksitatör amino asit"],
    ["Adenosine", "Adenozin", "Pürin nöromodülatör"],
    ["ATP", "ATP", "Adenozin trifosfat"],
    ["Nitric oxide", "Nitrik Oksit", "NO, gaz nörotransmitter"],
    ["Carbon monoxide", "Karbon Monoksit", "CO, gaz nörotransmitter"],
    ["Hydrogen sulfide", "Hidrojen Sülfür", "H2S, gaz nörotransmitter"],
    ["Endorphin", "Endorfin", "Endojen opioid"],
    ["Enkephalin", "Enkefalin", "Endojen opioid"],
    ["Dynorphin", "Dinorfin", "Endojen opioid"],
    ["Substance P", "Substans P", "Nöropeptid, ağrı"],
    ["Neuropeptide Y", "Nöropeptid Y", "NPY, iştah"],
    ["Vasoactive intestinal peptide", "Vazoaktif İntestinal Peptid", "VIP"],
    ["Cholecystokinin", "Kolesistokinin", "CCK, tokluk"],
    ["Neurotensin", "Nörotensin", "Nöropeptid"],
    ["Orexin", "Oreksin", "Hipocretin, uyanıklık"],
    ["Anandamide", "Anandamid", "Endokannabinoid"],
    [
      "2-Arachidonoylglycerol",
      "2-Arakidonoilgliserol",
      "2-AG, endokannabinoid",
    ],
    // Reseptörler
    ["Nicotinic receptor", "Nikotinik Reseptör", "nAChR"],
    ["Muscarinic receptor", "Muskarinik Reseptör", "mAChR"],
    ["Dopamine D1 receptor", "Dopamin D1 Reseptörü", "D1R"],
    ["Dopamine D2 receptor", "Dopamin D2 Reseptörü", "D2R"],
    ["Serotonin 5-HT1A receptor", "Serotonin 5-HT1A Reseptörü", "5-HT1AR"],
    ["Serotonin 5-HT2A receptor", "Serotonin 5-HT2A Reseptörü", "5-HT2AR"],
    ["Adrenergic alpha-1 receptor", "Adrenerjik Alfa-1 Reseptör", "α1-AR"],
    ["Adrenergic alpha-2 receptor", "Adrenerjik Alfa-2 Reseptör", "α2-AR"],
    ["Adrenergic beta-1 receptor", "Adrenerjik Beta-1 Reseptör", "β1-AR"],
    ["Adrenergic beta-2 receptor", "Adrenerjik Beta-2 Reseptör", "β2-AR"],
    ["GABA-A receptor", "GABA-A Reseptörü", "İyonotropik GABA reseptörü"],
    ["GABA-B receptor", "GABA-B Reseptörü", "Metabotropik GABA reseptörü"],
    ["NMDA receptor", "NMDA Reseptörü", "Glutamat reseptörü"],
    ["AMPA receptor", "AMPA Reseptörü", "Glutamat reseptörü"],
    ["Kainate receptor", "Kainat Reseptörü", "Glutamat reseptörü"],
    ["Opioid mu receptor", "Opioid Mü Reseptörü", "MOR"],
    ["Opioid kappa receptor", "Opioid Kappa Reseptörü", "KOR"],
    ["Opioid delta receptor", "Opioid Delta Reseptörü", "DOR"],
    ["Cannabinoid CB1 receptor", "Kannabinoid CB1 Reseptörü", "CB1R"],
    ["Cannabinoid CB2 receptor", "Kannabinoid CB2 Reseptörü", "CB2R"],
    ["Histamine H1 receptor", "Histamin H1 Reseptörü", "H1R"],
    ["Histamine H2 receptor", "Histamin H2 Reseptörü", "H2R"],
    ["Adenosine A1 receptor", "Adenozin A1 Reseptörü", "A1R"],
    ["Adenosine A2A receptor", "Adenozin A2A Reseptörü", "A2AR"],
  ];

  componentList.forEach(([latin, turkish, def]) => {
    components.push(createTerm(latin, turkish, TermCategory.COMPONENT, def));
  });

  return components;
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Mega Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(50));

  console.log("📝 Terimler oluşturuluyor...");

  const pediatricDiseases = generatePediatricDiseases();
  const gynecologicDiseases = generateGynecologicDiseases();
  const urologicDiseases = generateUrologicDiseases();
  const musculoskeletalAnatomy = generateMusculoskeletalAnatomy();
  const medicinalPlants = generateMedicinalPlants();
  const moreInsects = generateMoreInsects();
  const neurotransmitters = generateNeurotransmitters();

  const allTerms = [
    ...pediatricDiseases,
    ...gynecologicDiseases,
    ...urologicDiseases,
    ...musculoskeletalAnatomy,
    ...medicinalPlants,
    ...moreInsects,
    ...neurotransmitters,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Pediatrik Hastalıklar: ${pediatricDiseases.length}`);
  console.log(`   Jinekolojik Hastalıklar: ${gynecologicDiseases.length}`);
  console.log(`   Ürolojik Hastalıklar: ${urologicDiseases.length}`);
  console.log(`   Kas-İskelet Anatomisi: ${musculoskeletalAnatomy.length}`);
  console.log(`   Tıbbi Bitkiler: ${medicinalPlants.length}`);
  console.log(`   Ek Böcekler: ${moreInsects.length}`);
  console.log(`   Nörotransmitterler: ${neurotransmitters.length}`);
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
