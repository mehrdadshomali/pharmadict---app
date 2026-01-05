// Toplu terim üretme scripti - 10,000 terime ulaşmak için
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

// Kapsamlı ilaç listesi - Tüm kategoriler
const generateBulkDrugs = () => {
  const drugs = [];

  // Anestezikler
  const anesthetics = [
    ["Propofol", "Propofol", "IV anestezik indüksiyon ajanı"],
    ["Etomidate", "Etomidat", "IV anestezik indüksiyon ajanı"],
    ["Ketamine", "Ketamin", "Disosiyatif anestezik"],
    ["Thiopental", "Tiyopental", "Barbitürat anestezik"],
    ["Methohexital", "Metoheksital", "Barbitürat anestezik"],
    ["Sevoflurane", "Sevofluran", "İnhalasyon anestezik"],
    ["Desflurane", "Desfluran", "İnhalasyon anestezik"],
    ["Isoflurane", "İzofluran", "İnhalasyon anestezik"],
    ["Nitrous oxide", "Azot Oksit", "İnhalasyon anestezik, güldürücü gaz"],
    ["Halothane", "Halotan", "İnhalasyon anestezik"],
    ["Enflurane", "Enfluran", "İnhalasyon anestezik"],
    ["Lidocaine", "Lidokain", "Lokal anestezik, antiaritmik"],
    ["Bupivacaine", "Bupivakain", "Uzun etkili lokal anestezik"],
    ["Ropivacaine", "Ropivakain", "Lokal anestezik"],
    ["Mepivacaine", "Mepivakain", "Lokal anestezik"],
    ["Prilocaine", "Prilokain", "Lokal anestezik"],
    ["Articaine", "Artikain", "Dental lokal anestezik"],
    ["Tetracaine", "Tetrakain", "Topikal anestezik"],
    ["Benzocaine", "Benzokain", "Topikal anestezik"],
    ["Procaine", "Prokain", "Ester lokal anestezik"],
    ["Chloroprocaine", "Kloroprokain", "Kısa etkili lokal anestezik"],
    ["Cocaine", "Kokain", "Lokal anestezik, vazokonstriktör"],
    ["Dexmedetomidine", "Deksmedetomidin", "Alfa-2 agonist sedatif"],
    ["Midazolam", "Midazolam", "Benzodiazepin sedatif"],
    ["Fentanyl", "Fentanil", "Opioid analjezik"],
    ["Sufentanil", "Sufentanil", "Potent opioid analjezik"],
    ["Alfentanil", "Alfentanil", "Kısa etkili opioid"],
    ["Remifentanil", "Remifentanil", "Ultra kısa etkili opioid"],
    ["Rocuronium", "Rokuronyum", "Non-depolarizan kas gevşetici"],
    ["Vecuronium", "Vekuronyum", "Non-depolarizan kas gevşetici"],
    ["Cisatracurium", "Sisatrakuryum", "Non-depolarizan kas gevşetici"],
    ["Atracurium", "Atrakuryum", "Non-depolarizan kas gevşetici"],
    ["Pancuronium", "Pankuronyum", "Non-depolarizan kas gevşetici"],
    ["Succinylcholine", "Süksinilkolin", "Depolarizan kas gevşetici"],
    ["Sugammadex", "Sugammadeks", "Rokuronyum antidotu"],
    ["Neostigmine", "Neostigmin", "Kolinesteraz inhibitörü, reversal"],
    ["Pyridostigmine", "Piridostigmin", "Kolinesteraz inhibitörü"],
    ["Edrophonium", "Edrofonyum", "Kısa etkili kolinesteraz inhibitörü"],
    ["Flumazenil", "Flumazenil", "Benzodiazepin antagonisti"],
    ["Naloxone", "Nalokson", "Opioid antagonisti"],
  ];

  // Kas gevşeticiler ve spazmolitikler
  const muscleRelaxants = [
    ["Baclofen", "Baklofen", "GABA-B agonisti, spastisite"],
    ["Tizanidine", "Tizanidin", "Alfa-2 agonist, kas gevşetici"],
    ["Cyclobenzaprine", "Siklobenzaprin", "Santral kas gevşetici"],
    ["Methocarbamol", "Metokarbamol", "Santral kas gevşetici"],
    ["Carisoprodol", "Karisoprodol", "Santral kas gevşetici"],
    ["Orphenadrine", "Orfenadin", "Antikolinerjik kas gevşetici"],
    ["Chlorzoxazone", "Klorzoksazon", "Santral kas gevşetici"],
    ["Metaxalone", "Metaksalon", "Santral kas gevşetici"],
    ["Dantrolene", "Dantrolen", "Periferik kas gevşetici, MH"],
    ["Botulinum toxin A", "Botulinum Toksin A", "Nöromüsküler blokaj"],
    ["Botulinum toxin B", "Botulinum Toksin B", "Nöromüsküler blokaj"],
    ["Dicyclomine", "Disikloverine", "Antispazmodik, IBS"],
    ["Hyoscyamine", "Hiyosiyamin", "Antispazmodik"],
    ["Propantheline", "Propantelin", "Antikolinerjik antispazmodik"],
    ["Glycopyrrolate", "Glikopirrolat", "Antikolinerjik"],
    ["Oxybutynin", "Oksibutinin", "Antikolinerjik, aşırı aktif mesane"],
    ["Tolterodine", "Tolterodin", "Antimuskarinik, aşırı aktif mesane"],
    ["Solifenacin", "Solifenasin", "Antimuskarinik, aşırı aktif mesane"],
    ["Darifenacin", "Darifenasin", "M3 selektif antimuskarinik"],
    ["Fesoterodine", "Fesoterodin", "Antimuskarinik, aşırı aktif mesane"],
    ["Trospium", "Trospiyum", "Antimuskarinik, aşırı aktif mesane"],
    ["Mirabegron", "Mirabegron", "Beta-3 agonist, aşırı aktif mesane"],
    ["Vibegron", "Vibegron", "Beta-3 agonist, aşırı aktif mesane"],
    ["Flavoxate", "Flavoksat", "Üriner antispazmodik"],
    ["Phenazopyridine", "Fenazopiridin", "Üriner analjezik"],
  ];

  // Antihistaminikler
  const antihistamines = [
    ["Diphenhydramine", "Difenhidramin", "Birinci kuşak antihistaminik"],
    ["Chlorpheniramine", "Klorfeniramin", "Birinci kuşak antihistaminik"],
    ["Brompheniramine", "Bromfeniramin", "Birinci kuşak antihistaminik"],
    [
      "Dexchlorpheniramine",
      "Deksklorfeniramin",
      "Birinci kuşak antihistaminik",
    ],
    ["Triprolidine", "Triprolidin", "Birinci kuşak antihistaminik"],
    ["Clemastine", "Klemastin", "Birinci kuşak antihistaminik"],
    ["Cyproheptadine", "Siproheptadin", "Antihistaminik, iştah açıcı"],
    ["Hydroxyzine", "Hidroksizin", "Antihistaminik, anksiyolitik"],
    ["Promethazine", "Prometazin", "Fenotiazin antihistaminik"],
    ["Meclizine", "Meklizin", "Antihistaminik, vertigo"],
    ["Dimenhydrinate", "Dimenhidrinat", "Antihistaminik, hareket hastalığı"],
    ["Cetirizine", "Setirizin", "İkinci kuşak antihistaminik"],
    ["Levocetirizine", "Levosetirizin", "İkinci kuşak antihistaminik"],
    ["Loratadine", "Loratadin", "İkinci kuşak antihistaminik"],
    ["Desloratadine", "Desloratadin", "İkinci kuşak antihistaminik"],
    ["Fexofenadine", "Feksofenadin", "İkinci kuşak antihistaminik"],
    ["Azelastine", "Azelastin", "İntranazal antihistaminik"],
    ["Olopatadine", "Olopatadin", "Antihistaminik göz damlası"],
    ["Ketotifen", "Ketotifen", "Mast hücre stabilizatörü"],
    ["Epinastine", "Epinastin", "Antihistaminik göz damlası"],
    ["Bilastine", "Bilastin", "İkinci kuşak antihistaminik"],
    ["Rupatadine", "Rupatadinr", "İkinci kuşak antihistaminik"],
    ["Ebastine", "Ebastin", "İkinci kuşak antihistaminik"],
    ["Mizolastine", "Mizolastin", "İkinci kuşak antihistaminik"],
    ["Acrivastine", "Akrivastin", "İkinci kuşak antihistaminik"],
  ];

  // Hormonlar ve endokrin ilaçlar
  const hormones = [
    ["Levothyroxine", "Levotiroksin", "Tiroid hormonu replasmanı"],
    ["Liothyronine", "Liyotironin", "T3 tiroid hormonu"],
    ["Methimazole", "Metimazol", "Antitiroid ilaç"],
    ["Propylthiouracil", "Propiltiyourasil", "Antitiroid ilaç"],
    ["Potassium iodide", "Potasyum İyodür", "Tiroid koruyucu"],
    ["Prednisone", "Prednizon", "Oral kortikosteroid"],
    ["Prednisolone", "Prednizolon", "Oral kortikosteroid"],
    ["Methylprednisolone", "Metilprednizolon", "Kortikosteroid"],
    ["Dexamethasone", "Deksametazon", "Güçlü kortikosteroid"],
    ["Hydrocortisone", "Hidrokortizon", "Kortikosteroid"],
    ["Betamethasone", "Betametazon", "Kortikosteroid"],
    ["Triamcinolone", "Triamsinolon", "Kortikosteroid"],
    ["Budesonide", "Budesonid", "Topikal kortikosteroid"],
    ["Fluticasone", "Flutikason", "İnhale kortikosteroid"],
    ["Mometasone", "Mometazon", "Topikal kortikosteroid"],
    ["Fludrocortisone", "Fludrokortizon", "Mineralokortikoid"],
    ["Cosyntropin", "Kosintropin", "ACTH analoğu"],
    ["Desmopressin", "Desmopressin", "ADH analoğu"],
    ["Vasopressin", "Vazopressin", "ADH"],
    ["Terlipressin", "Terlipressin", "Vazopressin analoğu"],
    ["Octreotide", "Oktreotid", "Somatostatin analoğu"],
    ["Lanreotide", "Lanreotid", "Somatostatin analoğu"],
    ["Pasireotide", "Pasireotid", "Somatostatin analoğu"],
    ["Pegvisomant", "Pegvisomant", "GH reseptör antagonisti"],
    ["Somatropin", "Somatropin", "Büyüme hormonu"],
    ["Mecasermin", "Mekasermin", "IGF-1"],
    ["Tesamorelin", "Tesamorelin", "GHRH analoğu"],
    ["Cabergoline", "Kabergolin", "Dopamin agonisti, prolaktinoma"],
    ["Bromocriptine", "Bromokriptin", "Dopamin agonisti"],
    ["Quinagolide", "Kinagolid", "Dopamin agonisti"],
    ["Estradiol", "Estradiol", "Östrojen"],
    ["Conjugated estrogens", "Konjuge Östrojenler", "Östrojen karışımı"],
    ["Ethinyl estradiol", "Etinil Estradiol", "Sentetik östrojen"],
    ["Estrone", "Estron", "Östrojen"],
    ["Estriol", "Estriol", "Östrojen"],
    ["Progesterone", "Progesteron", "Doğal progestin"],
    ["Medroxyprogesterone", "Medroksiprogesteron", "Sentetik progestin"],
    ["Norethindrone", "Noretindron", "Progestin"],
    ["Levonorgestrel", "Levonorgestrel", "Progestin, acil kontrasepsiyon"],
    ["Desogestrel", "Desogestrel", "Progestin"],
    ["Drospirenone", "Drospirenon", "Progestin, antimineralokortikoid"],
    ["Dienogest", "Dienogest", "Progestin, endometriozis"],
    ["Etonogestrel", "Etonogestrel", "Progestin implant"],
    ["Ulipristal", "Ulipristal", "Progesteron reseptör modülatörü"],
    ["Mifepristone", "Mifepriston", "Progesteron antagonisti"],
    ["Testosterone", "Testosteron", "Androjen"],
    ["Testosterone cypionate", "Testosteron Sipionat", "Androjen ester"],
    ["Testosterone enanthate", "Testosteron Enantat", "Androjen ester"],
    ["Testosterone undecanoate", "Testosteron Undekanoat", "Oral androjen"],
    ["Methyltestosterone", "Metiltestosteron", "Oral androjen"],
    ["Oxandrolone", "Oksandrolon", "Anabolik steroid"],
    ["Nandrolone", "Nandrolon", "Anabolik steroid"],
    ["Danazol", "Danazol", "Androjen, endometriozis"],
    ["Finasteride", "Finasterid", "5-alfa redüktaz inhibitörü"],
    ["Dutasteride", "Dutasterid", "5-alfa redüktaz inhibitörü"],
    ["Flutamide", "Flutamid", "Antiandrojen"],
    ["Bicalutamide", "Bikalutamid", "Antiandrojen"],
    ["Enzalutamide", "Enzalutamid", "Antiandrojen, prostat kanseri"],
    ["Apalutamide", "Apalutamid", "Antiandrojen, prostat kanseri"],
    ["Darolutamide", "Darolutamid", "Antiandrojen, prostat kanseri"],
    ["Abiraterone", "Abirateron", "CYP17 inhibitörü, prostat kanseri"],
    ["Spironolactone", "Spironolakton", "Antiandrojen, diüretik"],
    ["Cyproterone", "Siproteron", "Antiandrojen"],
    ["Leuprolide", "Leuprolid", "GnRH agonisti"],
    ["Goserelin", "Goserelin", "GnRH agonisti"],
    ["Triptorelin", "Triptorelin", "GnRH agonisti"],
    ["Buserelin", "Buserelin", "GnRH agonisti"],
    ["Nafarelin", "Nafarelin", "GnRH agonisti"],
    ["Histrelin", "Histrelin", "GnRH agonisti implant"],
    ["Degarelix", "Degarelix", "GnRH antagonisti"],
    ["Relugolix", "Relugolix", "Oral GnRH antagonisti"],
    ["Elagolix", "Elagolix", "GnRH antagonisti, endometriozis"],
    ["Clomiphene", "Klomifen", "SERM, ovülasyon indüksiyonu"],
    ["Letrozole", "Letrozol", "Aromataz inhibitörü"],
    ["Anastrozole", "Anastrozol", "Aromataz inhibitörü"],
    ["Exemestane", "Eksemestan", "Aromataz inhibitörü"],
    ["Tamoxifen", "Tamoksifen", "SERM, meme kanseri"],
    ["Raloxifene", "Raloksifen", "SERM, osteoporoz"],
    ["Toremifene", "Toremifen", "SERM, meme kanseri"],
    ["Fulvestrant", "Fulvestrant", "Östrojen reseptör antagonisti"],
    ["Bazedoxifene", "Bazedoksifen", "SERM"],
    ["Ospemifene", "Ospemifen", "SERM, vulvovajinal atrofi"],
    ["Follitropin alfa", "Folitropin Alfa", "FSH"],
    ["Follitropin beta", "Folitropin Beta", "FSH"],
    ["Lutropin alfa", "Lutropin Alfa", "LH"],
    ["Menotropins", "Menotropinler", "FSH + LH"],
    ["Choriogonadotropin alfa", "Koriyogonadotropin Alfa", "hCG"],
    ["Ganirelix", "Ganirelix", "GnRH antagonisti, IVF"],
    ["Cetrorelix", "Setrorelix", "GnRH antagonisti, IVF"],
    ["Calcitonin", "Kalsitonin", "Kemik rezorpsiyon inhibitörü"],
    ["Teriparatide", "Teriparatid", "PTH analoğu, osteoporoz"],
    ["Abaloparatide", "Abaloparatid", "PTHrP analoğu"],
    ["Romosozumab", "Romosozumab", "Anti-sklerostin, osteoporoz"],
    ["Denosumab", "Denosumab", "Anti-RANKL, osteoporoz"],
    ["Alendronate", "Alendronat", "Bifosfonat, osteoporoz"],
    ["Risedronate", "Risedronat", "Bifosfonat, osteoporoz"],
    ["Ibandronate", "İbandronat", "Bifosfonat, osteoporoz"],
    ["Zoledronic acid", "Zoledronik Asit", "Bifosfonat, osteoporoz, kanser"],
    ["Pamidronate", "Pamidronat", "Bifosfonat"],
    ["Etidronate", "Etidronat", "Bifosfonat"],
    ["Cinacalcet", "Sinakalset", "Kalsimimetik, hiperparatiroidizm"],
    ["Etelcalcetide", "Etelkalsetid", "Kalsimimetik"],
    ["Paricalcitol", "Parikalsitriol", "D vitamini analoğu"],
    ["Doxercalciferol", "Dokserkalsiferol", "D vitamini analoğu"],
    ["Calcitriol", "Kalsitriol", "Aktif D vitamini"],
    ["Alfacalcidol", "Alfakalsidol", "D vitamini analoğu"],
  ];

  // Tüm ilaçları birleştir
  [...anesthetics, ...muscleRelaxants, ...antihistamines, ...hormones].forEach(
    ([latin, turkish, def]) => {
      drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
    }
  );

  return drugs;
};

// Kapsamlı hastalık listesi
const generateBulkDiseases = () => {
  const diseases = [];

  const diseaseList = [
    // Göz hastalıkları
    ["Glaucoma", "Glokom", "Göz içi basınç artışı"],
    ["Open-angle glaucoma", "Açık Açılı Glokom", "En sık glokom tipi"],
    ["Angle-closure glaucoma", "Kapalı Açılı Glokom", "Akut glokom"],
    [
      "Normal tension glaucoma",
      "Normal Basınçlı Glokom",
      "Düşük basınçlı glokom",
    ],
    ["Cataract", "Katarakt", "Göz merceği bulanıklığı"],
    [
      "Age-related macular degeneration",
      "Yaşa Bağlı Makula Dejenerasyonu",
      "AMD",
    ],
    [
      "Wet macular degeneration",
      "Yaş Tip Makula Dejenerasyonu",
      "Neovasküler AMD",
    ],
    [
      "Dry macular degeneration",
      "Kuru Tip Makula Dejenerasyonu",
      "Atrofik AMD",
    ],
    [
      "Diabetic retinopathy",
      "Diyabetik Retinopati",
      "Diyabet göz komplikasyonu",
    ],
    [
      "Proliferative diabetic retinopathy",
      "Proliferatif Diyabetik Retinopati",
      "İleri diyabetik retinopati",
    ],
    ["Diabetic macular edema", "Diyabetik Makula Ödemi", "DME"],
    ["Retinal detachment", "Retina Dekolmanı", "Retina ayrılması"],
    [
      "Retinal vein occlusion",
      "Retinal Ven Oklüzyonu",
      "Retina damar tıkanıklığı",
    ],
    [
      "Central retinal artery occlusion",
      "Santral Retinal Arter Oklüzyonu",
      "Retina arter tıkanıklığı",
    ],
    [
      "Retinitis pigmentosa",
      "Retinitis Pigmentoza",
      "Kalıtsal retina dejenerasyonu",
    ],
    ["Macular hole", "Makula Deliği", "Makula defekti"],
    ["Epiretinal membrane", "Epiretinal Membran", "Makula pucker"],
    ["Vitreous hemorrhage", "Vitreus Kanaması", "Göz içi kanama"],
    ["Posterior vitreous detachment", "Posterior Vitreus Dekolmanı", "PVD"],
    ["Uveitis", "Üveit", "Göz içi iltihabı"],
    ["Anterior uveitis", "Anterior Üveit", "İrit"],
    ["Intermediate uveitis", "İntermediat Üveit", "Pars planit"],
    ["Posterior uveitis", "Posterior Üveit", "Koroidit"],
    ["Panuveitis", "Panüveit", "Yaygın üveit"],
    ["Conjunctivitis", "Konjonktivit", "Göz iltihabı"],
    [
      "Allergic conjunctivitis",
      "Alerjik Konjonktivit",
      "Alerji kaynaklı göz iltihabı",
    ],
    [
      "Bacterial conjunctivitis",
      "Bakteriyel Konjonktivit",
      "Bakteri kaynaklı göz iltihabı",
    ],
    [
      "Viral conjunctivitis",
      "Viral Konjonktivit",
      "Virüs kaynaklı göz iltihabı",
    ],
    ["Keratitis", "Keratit", "Kornea iltihabı"],
    [
      "Herpes simplex keratitis",
      "Herpes Simpleks Keratiti",
      "HSV kornea enfeksiyonu",
    ],
    [
      "Acanthamoeba keratitis",
      "Akantamöba Keratiti",
      "Parazit kornea enfeksiyonu",
    ],
    ["Fungal keratitis", "Fungal Keratit", "Mantar kornea enfeksiyonu"],
    ["Corneal ulcer", "Kornea Ülseri", "Kornea yarası"],
    ["Keratoconus", "Keratokonus", "Kornea incelmesi ve çıkıntısı"],
    ["Fuchs dystrophy", "Fuchs Distrofisi", "Kornea endotel distrofisi"],
    ["Dry eye syndrome", "Kuru Göz Sendromu", "Gözyaşı yetersizliği"],
    ["Blepharitis", "Blefarit", "Göz kapağı iltihabı"],
    ["Chalazion", "Şalazyon", "Göz kapağı kisti"],
    ["Hordeolum", "Hordeolum", "Arpacık"],
    ["Ptosis", "Pitozis", "Göz kapağı düşüklüğü"],
    ["Ectropion", "Ektropion", "Göz kapağı dışa dönmesi"],
    ["Entropion", "Entropion", "Göz kapağı içe dönmesi"],
    ["Trichiasis", "Trikiyazis", "Kirpik içe dönmesi"],
    ["Dacryocystitis", "Dakriyosistit", "Gözyaşı kesesi iltihabı"],
    [
      "Nasolacrimal duct obstruction",
      "Nazolakrimal Kanal Tıkanıklığı",
      "Gözyaşı kanalı tıkanıklığı",
    ],
    ["Strabismus", "Şaşılık", "Göz kayması"],
    ["Esotropia", "Ezotropya", "İçe şaşılık"],
    ["Exotropia", "Ekzotropya", "Dışa şaşılık"],
    ["Amblyopia", "Ambliyopi", "Tembel göz"],
    ["Nystagmus", "Nistagmus", "Göz titremesi"],
    ["Optic neuritis", "Optik Nörit", "Görme siniri iltihabı"],
    ["Papilledema", "Papilödem", "Optik disk şişmesi"],
    ["Optic atrophy", "Optik Atrofi", "Görme siniri atrofisi"],
    [
      "Ischemic optic neuropathy",
      "İskemik Optik Nöropati",
      "Görme siniri kan akımı azalması",
    ],
    [
      "Leber hereditary optic neuropathy",
      "Leber Herediter Optik Nöropati",
      "LHON",
    ],
    ["Myopia", "Miyopi", "Yakın görüşlülük"],
    ["Hyperopia", "Hipermetropi", "Uzak görüşlülük"],
    ["Astigmatism", "Astigmatizma", "Kornea eğrilik bozukluğu"],
    ["Presbyopia", "Presbiyopi", "Yaşa bağlı yakın görme kaybı"],
    ["Color blindness", "Renk Körlüğü", "Renk görme bozukluğu"],
    ["Night blindness", "Gece Körlüğü", "Niktalopi"],
    ["Ocular melanoma", "Oküler Melanom", "Göz melanomu"],
    ["Retinoblastoma", "Retinoblastom", "Çocukluk göz kanseri"],
    ["Orbital cellulitis", "Orbital Selülit", "Göz çevresi enfeksiyonu"],
    ["Thyroid eye disease", "Tiroid Göz Hastalığı", "Graves oftalmopatisi"],

    // Kulak-burun-boğaz hastalıkları
    ["Otitis media", "Otitis Media", "Orta kulak iltihabı"],
    ["Acute otitis media", "Akut Otitis Media", "Akut orta kulak iltihabı"],
    [
      "Chronic otitis media",
      "Kronik Otitis Media",
      "Kronik orta kulak iltihabı",
    ],
    ["Otitis media with effusion", "Efüzyonlu Otitis Media", "Seröz otit"],
    ["Otitis externa", "Otitis Eksterna", "Dış kulak iltihabı"],
    [
      "Malignant otitis externa",
      "Malign Otitis Eksterna",
      "Nekrotizan dış kulak iltihabı",
    ],
    ["Cholesteatoma", "Kolesteatom", "Orta kulak epidermal kisti"],
    [
      "Tympanic membrane perforation",
      "Timpanik Membran Perforasyonu",
      "Kulak zarı delinmesi",
    ],
    ["Otosclerosis", "Otoskleroz", "Stapes fiksasyonu"],
    ["Meniere disease", "Meniere Hastalığı", "İç kulak hastalığı"],
    [
      "Benign paroxysmal positional vertigo",
      "Benign Paroksismal Pozisyonel Vertigo",
      "BPPV",
    ],
    ["Vestibular neuritis", "Vestibüler Nörit", "Denge siniri iltihabı"],
    ["Labyrinthitis", "Labirentit", "İç kulak iltihabı"],
    ["Acoustic neuroma", "Akustik Nörom", "Vestibüler schwannom"],
    [
      "Sensorineural hearing loss",
      "Sensörinöral İşitme Kaybı",
      "İç kulak işitme kaybı",
    ],
    [
      "Conductive hearing loss",
      "İletim Tipi İşitme Kaybı",
      "Orta kulak işitme kaybı",
    ],
    ["Presbycusis", "Presbikuzi", "Yaşa bağlı işitme kaybı"],
    [
      "Noise-induced hearing loss",
      "Gürültüye Bağlı İşitme Kaybı",
      "Mesleki işitme kaybı",
    ],
    [
      "Sudden sensorineural hearing loss",
      "Ani Sensörinöral İşitme Kaybı",
      "Ani işitme kaybı",
    ],
    ["Tinnitus", "Tinnitus", "Kulak çınlaması"],
    ["Hyperacusis", "Hiperakuzi", "Ses hassasiyeti"],
    ["Sinusitis", "Sinüzit", "Sinüs iltihabı"],
    ["Acute sinusitis", "Akut Sinüzit", "Akut sinüs iltihabı"],
    ["Chronic sinusitis", "Kronik Sinüzit", "Kronik sinüs iltihabı"],
    ["Allergic rhinitis", "Alerjik Rinit", "Saman nezlesi"],
    ["Vasomotor rhinitis", "Vazomotor Rinit", "Non-alerjik rinit"],
    ["Nasal polyps", "Nazal Polip", "Burun polipleri"],
    [
      "Deviated nasal septum",
      "Nazal Septum Deviasyonu",
      "Burun kemiği eğriliği",
    ],
    ["Epistaxis", "Epistaksis", "Burun kanaması"],
    ["Anosmia", "Anozmi", "Koku kaybı"],
    ["Hyposmia", "Hipozmi", "Koku azalması"],
    ["Pharyngitis", "Farenjit", "Boğaz iltihabı"],
    [
      "Streptococcal pharyngitis",
      "Streptokokal Farenjit",
      "Streptokok boğaz enfeksiyonu",
    ],
    ["Tonsillitis", "Tonsillit", "Bademcik iltihabı"],
    ["Peritonsillar abscess", "Peritonsiller Apse", "Bademcik çevresi apse"],
    ["Adenoid hypertrophy", "Adenoid Hipertrofisi", "Geniz eti büyümesi"],
    ["Laryngitis", "Larenjit", "Gırtlak iltihabı"],
    ["Vocal cord nodules", "Vokal Kord Nodülleri", "Ses teli nodülleri"],
    ["Vocal cord polyps", "Vokal Kord Polipleri", "Ses teli polipleri"],
    ["Vocal cord paralysis", "Vokal Kord Paralizisi", "Ses teli felci"],
    ["Laryngeal cancer", "Larenks Kanseri", "Gırtlak kanseri"],
    ["Epiglottitis", "Epiglottit", "Gırtlak kapağı iltihabı"],
    ["Croup", "Krup", "Laringotrakeobronşit"],
    ["Obstructive sleep apnea", "Obstrüktif Uyku Apnesi", "OSA"],
    ["Snoring", "Horlama", "Uyku sırasında solunum sesi"],
    ["Salivary gland stones", "Tükürük Bezi Taşı", "Sialolitiyazis"],
    ["Sialadenitis", "Sialadenit", "Tükürük bezi iltihabı"],
    ["Parotitis", "Parotit", "Parotis bezi iltihabı"],
    ["Mumps", "Kabakulak", "Viral parotit"],
    ["Salivary gland tumor", "Tükürük Bezi Tümörü", "Tükürük bezi kitlesi"],
    ["Oral cancer", "Ağız Kanseri", "Oral kavite kanseri"],
    ["Tongue cancer", "Dil Kanseri", "Dil malignitesi"],
    [
      "Nasopharyngeal carcinoma",
      "Nazofarenks Karsinomu",
      "Nazofarenks kanseri",
    ],
    ["Thyroid nodule", "Tiroid Nodülü", "Tiroid kitlesi"],
    ["Thyroid cancer", "Tiroid Kanseri", "Tiroid malignitesi"],
    [
      "Papillary thyroid cancer",
      "Papiller Tiroid Kanseri",
      "En sık tiroid kanseri",
    ],
    ["Follicular thyroid cancer", "Foliküler Tiroid Kanseri", "Tiroid kanseri"],
    [
      "Medullary thyroid cancer",
      "Medüller Tiroid Kanseri",
      "C hücreli tiroid kanseri",
    ],
    [
      "Anaplastic thyroid cancer",
      "Anaplastik Tiroid Kanseri",
      "Agresif tiroid kanseri",
    ],
    ["Parathyroid adenoma", "Paratiroid Adenomu", "Paratiroid tümörü"],
    ["Head and neck cancer", "Baş Boyun Kanseri", "Baş boyun malignitesi"],
    [
      "Squamous cell carcinoma of head and neck",
      "Baş Boyun Skuamöz Hücreli Karsinomu",
      "HNSCC",
    ],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Kapsamlı bitki listesi
const generateBulkPlants = () => {
  const plants = [];
  const plantList = [
    ["Echinacea purpurea", "Ekinezya", "Bağışıklık güçlendirici"],
    ["Ginkgo biloba", "Ginkgo", "Hafıza ve dolaşım destekleyici"],
    ["Panax ginseng", "Kore Ginsengi", "Adaptojenik, enerji artırıcı"],
    [
      "Hypericum perforatum",
      "Sarı Kantaron",
      "Antidepresan, yara iyileştirici",
    ],
    ["Valeriana officinalis", "Kediotu", "Sedatif, uyku düzenleyici"],
    ["Silybum marianum", "Deve Dikeni", "Karaciğer koruyucu"],
    ["Curcuma longa", "Zerdeçal", "Antiinflamatuar, antioksidan"],
    ["Zingiber officinale", "Zencefil", "Antiemetik, antiinflamatuar"],
    ["Allium sativum", "Sarımsak", "Antimikrobiyal, kardiyovasküler"],
    ["Camellia sinensis", "Yeşil Çay", "Antioksidan, metabolizma hızlandırıcı"],
    ["Matricaria chamomilla", "Papatya", "Sedatif, sindirim düzenleyici"],
    ["Mentha piperita", "Nane", "Sindirim düzenleyici, antispazmodik"],
    ["Lavandula angustifolia", "Lavanta", "Anksiyolitik, antiseptik"],
    ["Rosmarinus officinalis", "Biberiye", "Antioksidan, hafıza destekleyici"],
    ["Thymus vulgaris", "Kekik", "Antiseptik, ekspektoran"],
    ["Salvia officinalis", "Adaçayı", "Antiseptik, hafıza destekleyici"],
    ["Origanum vulgare", "Kekik", "Antimikrobiyal, antioksidan"],
    ["Ocimum basilicum", "Fesleğen", "Antiinflamatuar, adaptojenik"],
    ["Aloe vera", "Aloe Vera", "Yara iyileştirici, laksatif"],
    ["Calendula officinalis", "Aynısefa", "Yara iyileştirici, antiinflamatuar"],
    ["Arnica montana", "Arnika", "Antiinflamatuar, travma tedavisi"],
    ["Hamamelis virginiana", "Cadı Fındığı", "Astrenjan, hemoroid tedavisi"],
    ["Centella asiatica", "Gotu Kola", "Yara iyileştirici, anksiyolitik"],
    ["Bacopa monnieri", "Brahmi", "Nootropik, hafıza güçlendirici"],
    ["Withania somnifera", "Ashwagandha", "Adaptojenik, anksiyolitik"],
    ["Rhodiola rosea", "Altın Kök", "Adaptojenik, antidepresan"],
    ["Eleutherococcus senticosus", "Sibirya Ginsengi", "Adaptojenik"],
    ["Schisandra chinensis", "Schisandra", "Adaptojenik, hepatoprotektif"],
    ["Astragalus membranaceus", "Astragalus", "İmmünomodülatör"],
    ["Glycyrrhiza glabra", "Meyan Kökü", "Antiinflamatuar, ekspektoran"],
    ["Passiflora incarnata", "Çarkıfelek", "Anksiyolitik, sedatif"],
    ["Melissa officinalis", "Melisa", "Anksiyolitik, antiviral"],
    ["Humulus lupulus", "Şerbetçiotu", "Sedatif, östrojenik"],
    ["Crataegus monogyna", "Alıç", "Kardiyotonik, antihipertansif"],
    ["Vaccinium myrtillus", "Yaban Mersini", "Antioksidan, göz sağlığı"],
    ["Sambucus nigra", "Mürver", "Antiviral, immünostimülan"],
    ["Taraxacum officinale", "Karahindiba", "Diüretik, hepatoprotektif"],
    ["Urtica dioica", "Isırgan Otu", "Antiinflamatuar, BPH tedavisi"],
    ["Serenoa repens", "Saw Palmetto", "BPH tedavisi, antiandrojenik"],
    ["Pygeum africanum", "Pygeum", "BPH tedavisi"],
    ["Tribulus terrestris", "Demir Dikeni", "Libido artırıcı"],
    ["Maca root", "Maka Kökü", "Enerji artırıcı, libido destekleyici"],
    ["Foeniculum vulgare", "Rezene", "Karminatif, galaktogog"],
    ["Pimpinella anisum", "Anason", "Karminatif, ekspektoran"],
    ["Carum carvi", "Kimyon", "Karminatif, sindirim düzenleyici"],
    ["Coriandrum sativum", "Kişniş", "Karminatif, antioksidan"],
    ["Cuminum cyminum", "Kimyon", "Sindirim düzenleyici"],
    ["Elettaria cardamomum", "Kakule", "Karminatif, antiemetik"],
    ["Cinnamomum verum", "Tarçın", "Antidiyabetik, antimikrobiyal"],
    ["Syzygium aromaticum", "Karanfil", "Antiseptik, analjezik"],
    ["Piper nigrum", "Karabiber", "Biyoyararlanım artırıcı"],
    ["Capsicum annuum", "Kırmızı Biber", "Analjezik, metabolizma hızlandırıcı"],
    ["Boswellia serrata", "Akgünlük", "Antiinflamatuar, antiartritik"],
    ["Commiphora mukul", "Guggul", "Hipolipidemik, antiinflamatuar"],
    ["Terminalia arjuna", "Arjuna", "Kardiyotonik"],
    ["Terminalia chebula", "Haritaki", "Laksatif, antioksidan"],
    ["Emblica officinalis", "Amla", "Antioksidan, C vitamini kaynağı"],
    ["Tinospora cordifolia", "Guduchi", "İmmünomodülatör"],
    ["Andrographis paniculata", "Andrographis", "İmmünostimülan, antiviral"],
    ["Phyllanthus niruri", "Chanca Piedra", "Hepatoprotektif, böbrek taşı"],
    ["Moringa oleifera", "Moringa", "Besleyici, antioksidan"],
    ["Azadirachta indica", "Neem", "Antimikrobiyal, antiparaziter"],
    ["Ocimum sanctum", "Kutsal Fesleğen", "Adaptojenik, antioksidan"],
    ["Coleus forskohlii", "Coleus", "Bronkodilatör, lipoliz"],
    ["Gymnema sylvestre", "Gymnema", "Antidiyabetik"],
    ["Momordica charantia", "Kudret Narı", "Antidiyabetik"],
    ["Trigonella foenum-graecum", "Çemen Otu", "Antidiyabetik, galaktogog"],
    ["Nigella sativa", "Çörek Otu", "İmmünomodülatör, antioksidan"],
    ["Plantago ovata", "Psyllium", "Laksatif, kolesterol düşürücü"],
    ["Cassia angustifolia", "Sinameki", "Stimülan laksatif"],
    ["Rhamnus purshiana", "Cascara", "Stimülan laksatif"],
    ["Rheum palmatum", "Ravent", "Laksatif, antiinflamatuar"],
    ["Podophyllum peltatum", "Mayapple", "Antiviral, siğil tedavisi"],
    ["Sanguinaria canadensis", "Bloodroot", "Antiseptik, ekspektoran"],
    ["Hydrastis canadensis", "Goldenseal", "Antimikrobiyal, immünostimülan"],
    ["Cimicifuga racemosa", "Black Cohosh", "Menopoz semptomları"],
    ["Vitex agnus-castus", "Hayıt", "PMS, menstrüel düzensizlik"],
    ["Dioscorea villosa", "Yabani Yam", "Östrojenik, antiinflamatuar"],
    ["Angelica sinensis", "Dong Quai", "Emmenagog, kan tonik"],
    ["Paeonia lactiflora", "Şakayık", "Antiinflamatuar, analjezik"],
    ["Rehmannia glutinosa", "Rehmannia", "Tonik, kan besleyici"],
    ["Ligusticum wallichii", "Chuanxiong", "Kan dolaşımı düzenleyici"],
    ["Salvia miltiorrhiza", "Dan Shen", "Kardiyovasküler, antioksidan"],
    ["Scutellaria baicalensis", "Çin Kaside", "Antiinflamatuar, antioksidan"],
    ["Coptis chinensis", "Huang Lian", "Antimikrobiyal, antiinflamatuar"],
    ["Berberis vulgaris", "Kadın Tuzluğu", "Antimikrobiyal, hepatoprotektif"],
    ["Mahonia aquifolium", "Oregon Üzümü", "Antimikrobiyal, psoriazis"],
    ["Uncaria tomentosa", "Kedi Pençesi", "İmmünomodülatör, antiinflamatuar"],
    [
      "Harpagophytum procumbens",
      "Şeytan Pençesi",
      "Antiinflamatuar, analjezik",
    ],
    ["Tanacetum parthenium", "Feverfew", "Migren profilaksisi"],
    ["Petasites hybridus", "Butterbur", "Migren, alerjik rinit"],
    ["Grifola frondosa", "Maitake", "İmmünomodülatör, antitümör"],
    ["Lentinula edodes", "Shiitake", "İmmünomodülatör"],
    ["Ganoderma lucidum", "Reishi", "Adaptojenik, immünomodülatör"],
    ["Cordyceps sinensis", "Cordyceps", "Adaptojenik, performans artırıcı"],
    ["Inonotus obliquus", "Chaga", "Antioksidan, immünomodülatör"],
    ["Trametes versicolor", "Turkey Tail", "İmmünomodülatör, antitümör"],
    ["Hericium erinaceus", "Aslan Yelesi", "Nöroprotektif, nootropik"],
    ["Agaricus blazei", "Agaricus", "İmmünomodülatör"],
  ];

  plantList.forEach(([latin, turkish, def]) => {
    plants.push(createTerm(latin, turkish, TermCategory.PLANT, def));
  });

  return plants;
};

// Kapsamlı vitamin ve mineral listesi
const generateBulkVitamins = () => {
  const vitamins = [];
  const vitaminList = [
    ["Retinol", "Retinol", "A vitamini, görme, cilt sağlığı"],
    ["Beta-carotene", "Beta Karoten", "Provitamin A, antioksidan"],
    ["Retinyl palmitate", "Retinil Palmitat", "A vitamini esteri"],
    ["Retinyl acetate", "Retinil Asetat", "A vitamini esteri"],
    ["Thiamine hydrochloride", "Tiamin Hidroklorür", "B1 vitamini tuzu"],
    ["Thiamine mononitrate", "Tiamin Mononitrat", "B1 vitamini tuzu"],
    ["Benfotiamine", "Benfotiamin", "Yağda çözünür B1 formu"],
    ["Riboflavin-5-phosphate", "Riboflavin-5-Fosfat", "Aktif B2 formu"],
    ["Nicotinamide", "Nikotinamid", "B3 vitamini, amid formu"],
    ["Nicotinic acid", "Nikotinik Asit", "B3 vitamini, niasin"],
    ["Inositol hexanicotinate", "İnositol Heksanikosinat", "Flush-free niasin"],
    ["Pantothenic acid", "Pantotenik Asit", "B5 vitamini"],
    ["Calcium pantothenate", "Kalsiyum Pantotenat", "B5 vitamini tuzu"],
    ["Dexpanthenol", "Dekspantenol", "Provitamin B5"],
    ["Pyridoxine hydrochloride", "Piridoksin Hidroklorür", "B6 vitamini tuzu"],
    ["Pyridoxal-5-phosphate", "Piridoksal-5-Fosfat", "Aktif B6 formu"],
    ["Biotin", "Biyotin", "B7 vitamini, saç ve tırnak sağlığı"],
    ["Folic acid", "Folik Asit", "B9 vitamini, sentetik form"],
    ["Folate", "Folat", "B9 vitamini, doğal form"],
    ["5-methyltetrahydrofolate", "5-Metiltetrahidrofolat", "Aktif folat formu"],
    ["Folinic acid", "Folinik Asit", "Leucovorin, folat türevi"],
    ["Cyanocobalamin", "Siyanokobalamin", "B12 vitamini, sentetik"],
    ["Methylcobalamin", "Metilkobalamin", "Aktif B12 formu"],
    ["Hydroxocobalamin", "Hidroksokobalamin", "B12 formu, siyanür antidotu"],
    ["Adenosylcobalamin", "Adenozilkobalamin", "Aktif B12 formu"],
    ["Ascorbic acid", "Askorbik Asit", "C vitamini"],
    ["Sodium ascorbate", "Sodyum Askorbat", "Tamponlu C vitamini"],
    ["Calcium ascorbate", "Kalsiyum Askorbat", "Tamponlu C vitamini"],
    ["Ascorbyl palmitate", "Askorbil Palmitat", "Yağda çözünür C vitamini"],
    [
      "Liposomal vitamin C",
      "Lipozomal C Vitamini",
      "Yüksek emilimli C vitamini",
    ],
    ["Cholecalciferol", "Kolekalsiferol", "D3 vitamini"],
    ["Ergocalciferol", "Ergokalsiferol", "D2 vitamini"],
    ["Calcifediol", "Kalsifediol", "25-OH D vitamini"],
    ["Calcitriol", "Kalsitriol", "Aktif D vitamini"],
    ["Alpha-tocopherol", "Alfa Tokoferol", "E vitamini, ana form"],
    ["Gamma-tocopherol", "Gama Tokoferol", "E vitamini formu"],
    ["Mixed tocopherols", "Karışık Tokoferoller", "E vitamini kompleksi"],
    ["Tocotrienols", "Tokotrienoller", "E vitamini ailesi"],
    ["Phylloquinone", "Fillokinon", "K1 vitamini"],
    ["Menaquinone-4", "Menakinon-4", "K2 vitamini, MK-4"],
    ["Menaquinone-7", "Menakinon-7", "K2 vitamini, MK-7"],
    ["Choline bitartrate", "Kolin Bitartrat", "Kolin tuzu"],
    ["Choline chloride", "Kolin Klorür", "Kolin tuzu"],
    ["Phosphatidylcholine", "Fosfatidilkolin", "Lesitin bileşeni"],
    ["CDP-choline", "CDP-Kolin", "Sitidin, nootropik"],
    ["Alpha-GPC", "Alfa-GPC", "Kolin formu, nootropik"],
    ["Inositol", "İnositol", "B vitamini benzeri, anksiyolitik"],
    ["PABA", "PABA", "Para-aminobenzoik asit"],
  ];

  vitaminList.forEach(([latin, turkish, def]) => {
    vitamins.push(createTerm(latin, turkish, TermCategory.VITAMIN, def));
  });

  return vitamins;
};

// Kapsamlı mineral listesi
const generateBulkMinerals = () => {
  const minerals = [];
  const mineralList = [
    ["Calcium carbonate", "Kalsiyum Karbonat", "Kalsiyum tuzu, antasit"],
    ["Calcium citrate", "Kalsiyum Sitrat", "Kalsiyum tuzu, yüksek emilim"],
    ["Calcium phosphate", "Kalsiyum Fosfat", "Kalsiyum tuzu"],
    ["Calcium gluconate", "Kalsiyum Glukonat", "IV kalsiyum"],
    ["Calcium lactate", "Kalsiyum Laktat", "Kalsiyum tuzu"],
    [
      "Calcium hydroxyapatite",
      "Kalsiyum Hidroksiapatit",
      "Kemik formu kalsiyum",
    ],
    ["Magnesium oxide", "Magnezyum Oksit", "Magnezyum tuzu, laksatif"],
    ["Magnesium citrate", "Magnezyum Sitrat", "Magnezyum tuzu, yüksek emilim"],
    [
      "Magnesium glycinate",
      "Magnezyum Glisinat",
      "Magnezyum tuzu, sakinleştirici",
    ],
    [
      "Magnesium taurate",
      "Magnezyum Taurat",
      "Magnezyum tuzu, kardiyovasküler",
    ],
    ["Magnesium malate", "Magnezyum Malat", "Magnezyum tuzu, enerji"],
    [
      "Magnesium threonate",
      "Magnezyum Treonat",
      "Magnezyum tuzu, beyin sağlığı",
    ],
    ["Magnesium chloride", "Magnezyum Klorür", "Magnezyum tuzu, topikal"],
    ["Magnesium sulfate", "Magnezyum Sülfat", "Epsom tuzu, laksatif"],
    ["Potassium chloride", "Potasyum Klorür", "Potasyum takviyesi"],
    ["Potassium citrate", "Potasyum Sitrat", "Potasyum tuzu, böbrek taşı"],
    ["Potassium gluconate", "Potasyum Glukonat", "Potasyum takviyesi"],
    ["Potassium bicarbonate", "Potasyum Bikarbonat", "Potasyum tuzu"],
    ["Sodium chloride", "Sodyum Klorür", "Tuz, elektrolit"],
    ["Sodium bicarbonate", "Sodyum Bikarbonat", "Karbonat, antasit"],
    ["Ferrous sulfate", "Demir Sülfat", "Demir takviyesi"],
    ["Ferrous gluconate", "Demir Glukonat", "Demir takviyesi"],
    ["Ferrous fumarate", "Demir Fumarat", "Demir takviyesi"],
    ["Ferric citrate", "Demir Sitrat", "Demir takviyesi, fosfat bağlayıcı"],
    ["Iron bisglycinate", "Demir Bisglinat", "Şelatlı demir, yüksek emilim"],
    ["Carbonyl iron", "Karbonil Demir", "Elementel demir"],
    [
      "Polysaccharide iron complex",
      "Polisakkarit Demir Kompleksi",
      "Demir takviyesi",
    ],
    ["Zinc sulfate", "Çinko Sülfat", "Çinko takviyesi"],
    ["Zinc gluconate", "Çinko Glukonat", "Çinko takviyesi"],
    ["Zinc picolinate", "Çinko Pikolinat", "Çinko takviyesi, yüksek emilim"],
    ["Zinc citrate", "Çinko Sitrat", "Çinko takviyesi"],
    ["Zinc acetate", "Çinko Asetat", "Çinko takviyesi, soğuk algınlığı"],
    ["Zinc carnosine", "Çinko Karnozin", "Çinko takviyesi, mide koruyucu"],
    ["Zinc oxide", "Çinko Oksit", "Topikal çinko, güneş koruyucu"],
    ["Copper sulfate", "Bakır Sülfat", "Bakır takviyesi"],
    ["Copper gluconate", "Bakır Glukonat", "Bakır takviyesi"],
    ["Copper bisglycinate", "Bakır Bisglinat", "Şelatlı bakır"],
    ["Manganese sulfate", "Manganez Sülfat", "Manganez takviyesi"],
    ["Manganese gluconate", "Manganez Glukonat", "Manganez takviyesi"],
    ["Selenium selenite", "Selenyum Selenit", "Selenyum takviyesi"],
    ["Selenium selenate", "Selenyum Selenat", "Selenyum takviyesi"],
    ["Selenomethionine", "Selenometiyonin", "Organik selenyum"],
    ["Selenium yeast", "Selenyum Mayası", "Organik selenyum"],
    ["Chromium picolinate", "Krom Pikolinat", "Krom takviyesi, kan şekeri"],
    ["Chromium polynicotinate", "Krom Polinikotinat", "Krom takviyesi"],
    ["Chromium chloride", "Krom Klorür", "Krom takviyesi"],
    ["Molybdenum", "Molibden", "Eser element, enzim kofaktörü"],
    ["Iodine", "İyot", "Tiroid fonksiyonu"],
    ["Potassium iodide", "Potasyum İyodür", "İyot takviyesi"],
  ];

  mineralList.forEach(([latin, turkish, def]) => {
    minerals.push(createTerm(latin, turkish, TermCategory.MINERAL, def));
  });

  return minerals;
};

// Kapsamlı anatomi listesi
const generateBulkAnatomy = () => {
  const anatomy = [];
  const anatomyList = [
    // Sinir sistemi
    ["Cerebrum", "Serebrum", "Beyin, büyük beyin"],
    ["Cerebellum", "Serebellum", "Beyincik, denge ve koordinasyon"],
    ["Brainstem", "Beyin Sapı", "Medulla, pons, mezensefalon"],
    ["Medulla oblongata", "Medulla Oblongata", "Omurilik soğanı"],
    ["Pons", "Pons", "Köprü, beyin sapı bölümü"],
    ["Midbrain", "Mezensefalon", "Orta beyin"],
    ["Thalamus", "Talamus", "Duyusal aktarım merkezi"],
    ["Hypothalamus", "Hipotalamus", "Otonom ve endokrin düzenleme"],
    ["Hippocampus", "Hipokampus", "Hafıza merkezi"],
    ["Amygdala", "Amigdala", "Duygu merkezi"],
    ["Basal ganglia", "Bazal Ganglionlar", "Hareket kontrolü"],
    ["Corpus callosum", "Korpus Kallozum", "Hemisferler arası bağlantı"],
    ["Frontal lobe", "Frontal Lob", "Ön beyin lobu, karar verme"],
    ["Parietal lobe", "Parietal Lob", "Duyu işleme"],
    ["Temporal lobe", "Temporal Lob", "İşitme, hafıza"],
    ["Occipital lobe", "Oksipital Lob", "Görme merkezi"],
    ["Cerebral cortex", "Serebral Korteks", "Beyin kabuğu"],
    ["White matter", "Beyaz Cevher", "Miyelinli aksonlar"],
    ["Gray matter", "Gri Cevher", "Nöron hücre gövdeleri"],
    ["Meninges", "Meninksler", "Beyin zarları"],
    ["Dura mater", "Dura Mater", "Sert beyin zarı"],
    ["Arachnoid mater", "Araknoid Mater", "Örümceksi zar"],
    ["Pia mater", "Pia Mater", "Yumuşak beyin zarı"],
    ["Cerebrospinal fluid", "Beyin Omurilik Sıvısı", "BOS"],
    ["Ventricles", "Ventriküller", "Beyin boşlukları"],
    ["Spinal cord", "Omurilik", "Medulla spinalis"],
    ["Cervical spine", "Servikal Omurga", "Boyun omurları"],
    ["Thoracic spine", "Torasik Omurga", "Göğüs omurları"],
    ["Lumbar spine", "Lomber Omurga", "Bel omurları"],
    ["Sacrum", "Sakrum", "Kuyruk sokumu kemiği"],
    ["Coccyx", "Koksiks", "Kuyruk kemiği"],
    ["Intervertebral disc", "İntervertebral Disk", "Omurlar arası disk"],
    ["Spinal nerve", "Spinal Sinir", "Omurilik siniri"],
    ["Cranial nerves", "Kraniyal Sinirler", "Kafa çiftleri"],
    ["Olfactory nerve", "Olfaktör Sinir", "I. kafa çifti, koku"],
    ["Optic nerve", "Optik Sinir", "II. kafa çifti, görme"],
    ["Oculomotor nerve", "Okülomotor Sinir", "III. kafa çifti"],
    ["Trochlear nerve", "Troklear Sinir", "IV. kafa çifti"],
    ["Trigeminal nerve", "Trigeminal Sinir", "V. kafa çifti, yüz duyusu"],
    ["Abducens nerve", "Abdusens Sinir", "VI. kafa çifti"],
    ["Facial nerve", "Fasiyal Sinir", "VII. kafa çifti, yüz kasları"],
    ["Vestibulocochlear nerve", "Vestibülokoklear Sinir", "VIII. kafa çifti"],
    ["Glossopharyngeal nerve", "Glossofaringeal Sinir", "IX. kafa çifti"],
    ["Vagus nerve", "Vagus Siniri", "X. kafa çifti, parasempatik"],
    ["Accessory nerve", "Aksesuar Sinir", "XI. kafa çifti"],
    ["Hypoglossal nerve", "Hipoglossal Sinir", "XII. kafa çifti, dil"],
    ["Brachial plexus", "Brakiyal Pleksus", "Kol sinir ağı"],
    ["Lumbar plexus", "Lomber Pleksus", "Bel sinir ağı"],
    ["Sacral plexus", "Sakral Pleksus", "Sakral sinir ağı"],
    ["Sciatic nerve", "Siyatik Sinir", "Vücudun en kalın siniri"],
  ];

  anatomyList.forEach(([latin, turkish, def]) => {
    anatomy.push(createTerm(latin, turkish, TermCategory.ANATOMY, def));
  });

  return anatomy;
};

// Kapsamlı bileşen listesi
const generateBulkComponents = () => {
  const components = [];
  const componentList = [
    // Amino asitler
    ["L-Alanine", "L-Alanin", "Amino asit, enerji metabolizması"],
    ["L-Arginine", "L-Arjinin", "Amino asit, NO öncüsü"],
    ["L-Asparagine", "L-Asparagin", "Amino asit"],
    ["L-Aspartic acid", "L-Aspartik Asit", "Amino asit, nörotransmitter"],
    ["L-Cysteine", "L-Sistein", "Amino asit, antioksidan"],
    ["L-Glutamine", "L-Glutamin", "Amino asit, bağırsak sağlığı"],
    ["L-Glutamic acid", "L-Glutamik Asit", "Amino asit, nörotransmitter"],
    ["Glycine", "Glisin", "Amino asit, nörotransmitter"],
    ["L-Histidine", "L-Histidin", "Amino asit, histamin öncüsü"],
    ["L-Isoleucine", "L-İzolösin", "BCAA, kas metabolizması"],
    ["L-Leucine", "L-Lösin", "BCAA, protein sentezi"],
    ["L-Lysine", "L-Lizin", "Amino asit, kolajen sentezi"],
    ["L-Methionine", "L-Metiyonin", "Amino asit, metil donörü"],
    ["L-Phenylalanine", "L-Fenilalanin", "Amino asit, dopamin öncüsü"],
    ["L-Proline", "L-Prolin", "Amino asit, kolajen bileşeni"],
    ["L-Serine", "L-Serin", "Amino asit, fosfolipid sentezi"],
    ["L-Threonine", "L-Treonin", "Amino asit, mukus üretimi"],
    ["L-Tryptophan", "L-Triptofan", "Amino asit, serotonin öncüsü"],
    ["L-Tyrosine", "L-Tirozin", "Amino asit, katekolamin öncüsü"],
    ["L-Valine", "L-Valin", "BCAA, kas metabolizması"],
    ["N-Acetyl cysteine", "N-Asetil Sistein", "NAC, antioksidan, mukolitik"],
    ["Acetyl-L-carnitine", "Asetil-L-Karnitin", "Nootropik, enerji"],
    ["L-Carnitine", "L-Karnitin", "Yağ metabolizması"],
    ["L-Citrulline", "L-Sitrulin", "NO öncüsü, performans"],
    ["L-Ornithine", "L-Ornitin", "Üre döngüsü, amonyak detoksu"],
    ["Taurine", "Taurin", "Amino asit türevi, kardiyovasküler"],
    ["Beta-alanine", "Beta-Alanin", "Karnosin öncüsü, performans"],
    ["Creatine", "Kreatin", "Enerji metabolizması, kas gücü"],
    ["Creatine monohydrate", "Kreatin Monohidrat", "En yaygın kreatin formu"],
    ["Creatine HCL", "Kreatin HCL", "Yüksek çözünürlüklü kreatin"],
    // Yağ asitleri
    ["Omega-3 fatty acids", "Omega-3 Yağ Asitleri", "EPA, DHA, ALA"],
    ["Eicosapentaenoic acid", "Eikosapentaenoik Asit", "EPA, antiinflamatuar"],
    ["Docosahexaenoic acid", "Dokosaheksaenoik Asit", "DHA, beyin sağlığı"],
    ["Alpha-linolenic acid", "Alfa-Linolenik Asit", "ALA, bitkisel omega-3"],
    ["Gamma-linolenic acid", "Gama-Linolenik Asit", "GLA, antiinflamatuar"],
    ["Conjugated linoleic acid", "Konjuge Linoleik Asit", "CLA, yağ yakımı"],
    [
      "Medium chain triglycerides",
      "Orta Zincirli Trigliseritler",
      "MCT, enerji",
    ],
    ["Phosphatidylserine", "Fosfatidilserin", "Fosfolipid, beyin sağlığı"],
    ["Lecithin", "Lesitin", "Fosfolipid karışımı"],
    // Antioksidanlar
    ["Coenzyme Q10", "Koenzim Q10", "Ubiquinon, enerji, antioksidan"],
    ["Ubiquinol", "Ubikinol", "Aktif CoQ10 formu"],
    ["Alpha-lipoic acid", "Alfa-Lipoik Asit", "ALA, antioksidan, diyabet"],
    ["Glutathione", "Glutatyon", "Ana hücresel antioksidan"],
    ["Superoxide dismutase", "Süperoksit Dismutaz", "SOD, antioksidan enzim"],
    ["Resveratrol", "Resveratrol", "Polifenol, antioksidan"],
    ["Quercetin", "Kuersetin", "Flavonoid, antiinflamatuar"],
    ["Rutin", "Rutin", "Flavonoid, damar sağlığı"],
    ["Hesperidin", "Hesperidin", "Flavonoid, damar sağlığı"],
    ["Naringenin", "Naringenin", "Flavonoid, antioksidan"],
    ["Catechins", "Kateşinler", "Yeşil çay polifenolleri"],
  ];

  componentList.forEach(([latin, turkish, def]) => {
    components.push(createTerm(latin, turkish, TermCategory.COMPONENT, def));
  });

  return components;
};

// Kapsamlı böcek listesi
const generateBulkInsects = () => {
  const insects = [];
  const insectList = [
    ["Apis mellifera", "Bal Arısı", "Polinatör, bal üretimi"],
    ["Bombus terrestris", "Toprak Yaban Arısı", "Polinatör"],
    ["Vespa crabro", "Eşek Arısı", "Yırtıcı böcek"],
    ["Vespula germanica", "Alman Eşek Arısı", "Zararlı böcek"],
    ["Polistes dominula", "Kağıt Arısı", "Yırtıcı böcek"],
    ["Formica rufa", "Kırmızı Orman Karıncası", "Yararlı böcek"],
    ["Camponotus herculeanus", "Dev Marangoz Karıncası", "Ahşap zararlısı"],
    ["Solenopsis invicta", "Ateş Karıncası", "İstilacı tür, ağrılı sokma"],
    ["Monomorium pharaonis", "Firavun Karıncası", "Ev zararlısı"],
    ["Lasius niger", "Siyah Bahçe Karıncası", "Yaygın karınca"],
    ["Musca domestica", "Ev Sineği", "Hastalık vektörü"],
    ["Drosophila melanogaster", "Meyve Sineği", "Model organizma"],
    ["Glossina morsitans", "Çeçe Sineği", "Uyku hastalığı vektörü"],
    ["Stomoxys calcitrans", "Ahır Sineği", "Isırıcı sinek"],
    ["Tabanus bovinus", "At Sineği", "Isırıcı sinek"],
    ["Chrysops relictus", "Geyik Sineği", "Isırıcı sinek"],
    ["Simulium damnosum", "Kara Sinek", "Onkoserkiyaz vektörü"],
    ["Phlebotomus papatasi", "Tatarcık", "Leishmaniasis vektörü"],
    ["Culicoides imicola", "Yakıcı Sinek", "Mavi dil hastalığı vektörü"],
    ["Anopheles gambiae", "Anofel Sivrisineği", "Sıtma vektörü"],
    ["Aedes aegypti", "Sarı Humma Sivrisineği", "Dang, Zika vektörü"],
    ["Aedes albopictus", "Asya Kaplan Sivrisineği", "Hastalık vektörü"],
    ["Culex pipiens", "Ev Sivrisineği", "Batı Nil virüsü vektörü"],
    ["Culex quinquefasciatus", "Güney Ev Sivrisineği", "Filariasis vektörü"],
    ["Cimex lectularius", "Yatak Böceği", "Kan emici parazit"],
    ["Cimex hemipterus", "Tropikal Yatak Böceği", "Kan emici parazit"],
    ["Pediculus humanus capitis", "Baş Biti", "Ektoparazit"],
    ["Pediculus humanus corporis", "Vücut Biti", "Tifüs vektörü"],
    ["Phthirus pubis", "Kasık Biti", "Ektoparazit"],
    ["Pulex irritans", "İnsan Piresi", "Kan emici parazit"],
    ["Ctenocephalides felis", "Kedi Piresi", "Yaygın pire türü"],
    ["Ctenocephalides canis", "Köpek Piresi", "Yaygın pire türü"],
    ["Xenopsylla cheopis", "Doğu Sıçan Piresi", "Veba vektörü"],
    ["Tunga penetrans", "Kum Piresi", "Tungiyaz etkeni"],
    ["Blattella germanica", "Alman Hamamböceği", "Ev zararlısı"],
    ["Periplaneta americana", "Amerikan Hamamböceği", "Ev zararlısı"],
    ["Blatta orientalis", "Doğu Hamamböceği", "Ev zararlısı"],
    ["Supella longipalpa", "Kahverengi Bantlı Hamamböceği", "Ev zararlısı"],
    ["Ixodes scapularis", "Geyik Kenesi", "Lyme hastalığı vektörü"],
    ["Ixodes ricinus", "Koyun Kenesi", "Lyme hastalığı vektörü"],
    ["Dermacentor variabilis", "Amerikan Köpek Kenesi", "RMSF vektörü"],
    ["Amblyomma americanum", "Yalnız Yıldız Kenesi", "Ehrlichiosis vektörü"],
    [
      "Rhipicephalus sanguineus",
      "Kahverengi Köpek Kenesi",
      "Babesiosis vektörü",
    ],
    ["Sarcoptes scabiei", "Uyuz Akarı", "Uyuz etkeni"],
    ["Demodex folliculorum", "Kıl Folikülü Akarı", "Demodikoz etkeni"],
    ["Dermatophagoides pteronyssinus", "Ev Tozu Akarı", "Alerjen"],
    ["Trombiculidae", "Hasat Akarı", "Kaşıntılı döküntü"],
    ["Latrodectus mactans", "Kara Dul Örümceği", "Zehirli örümcek"],
    ["Loxosceles reclusa", "Kahverengi Münzevi Örümceği", "Nekrotik zehir"],
    ["Phoneutria nigriventer", "Brezilya Gezgin Örümceği", "Çok zehirli"],
  ];

  insectList.forEach(([latin, turkish, def]) => {
    insects.push(createTerm(latin, turkish, TermCategory.INSECT, def));
  });

  return insects;
};

// Ek ilaçlar - Kardiyovasküler
const generateCardiovascularDrugs = () => {
  const drugs = [];
  const drugList = [
    ["Atenolol", "Atenolol", "Beta bloker, hipertansiyon"],
    ["Metoprolol", "Metoprolol", "Beta bloker, hipertansiyon, MI"],
    ["Propranolol", "Propranolol", "Non-selektif beta bloker"],
    ["Bisoprolol", "Bisoprolol", "Kardiyoselektif beta bloker"],
    ["Carvedilol", "Karvedilol", "Alfa-beta bloker, kalp yetmezliği"],
    ["Labetalol", "Labetalol", "Alfa-beta bloker, hipertansiyon"],
    ["Nebivolol", "Nebivolol", "Beta bloker, NO salınımı"],
    ["Esmolol", "Esmolol", "Ultra kısa etkili beta bloker"],
    ["Sotalol", "Sotalol", "Beta bloker, antiaritmik"],
    ["Timolol", "Timolol", "Beta bloker, glokom"],
    ["Amlodipine", "Amlodipin", "Kalsiyum kanal blokeri"],
    ["Nifedipine", "Nifedipin", "Kalsiyum kanal blokeri"],
    ["Diltiazem", "Diltiazem", "Kalsiyum kanal blokeri"],
    ["Verapamil", "Verapamil", "Kalsiyum kanal blokeri"],
    ["Felodipine", "Felodipin", "Kalsiyum kanal blokeri"],
    ["Nicardipine", "Nikardipin", "Kalsiyum kanal blokeri"],
    ["Nimodipine", "Nimodipin", "Serebral vazodilatatör"],
    ["Clevidipine", "Klevidipine", "IV kalsiyum kanal blokeri"],
    ["Lisinopril", "Lisinopril", "ACE inhibitörü"],
    ["Enalapril", "Enalapril", "ACE inhibitörü"],
    ["Ramipril", "Ramipril", "ACE inhibitörü"],
    ["Captopril", "Kaptopril", "ACE inhibitörü"],
    ["Perindopril", "Perindopril", "ACE inhibitörü"],
    ["Quinapril", "Kinapril", "ACE inhibitörü"],
    ["Benazepril", "Benazepril", "ACE inhibitörü"],
    ["Fosinopril", "Fosinopril", "ACE inhibitörü"],
    ["Trandolapril", "Trandolapril", "ACE inhibitörü"],
    ["Losartan", "Losartan", "ARB, hipertansiyon"],
    ["Valsartan", "Valsartan", "ARB, hipertansiyon"],
    ["Irbesartan", "İrbesartan", "ARB, hipertansiyon"],
    ["Candesartan", "Kandesartan", "ARB, hipertansiyon"],
    ["Telmisartan", "Telmisartan", "ARB, hipertansiyon"],
    ["Olmesartan", "Olmesartan", "ARB, hipertansiyon"],
    ["Azilsartan", "Azilsartan", "ARB, hipertansiyon"],
    ["Eprosartan", "Eprosartan", "ARB, hipertansiyon"],
    ["Sacubitril", "Sakubitril", "Neprilisin inhibitörü"],
    ["Hydrochlorothiazide", "Hidroklorotiyazid", "Tiyazid diüretik"],
    ["Chlorthalidone", "Klortalidon", "Tiyazid benzeri diüretik"],
    ["Indapamide", "İndapamid", "Tiyazid benzeri diüretik"],
    ["Metolazone", "Metolazon", "Tiyazid benzeri diüretik"],
    ["Furosemide", "Furosemid", "Loop diüretik"],
    ["Bumetanide", "Bumetanid", "Loop diüretik"],
    ["Torsemide", "Torsemid", "Loop diüretik"],
    ["Ethacrynic acid", "Etakrinik Asit", "Loop diüretik"],
    ["Spironolactone", "Spironolakton", "Potasyum tutucu diüretik"],
    ["Eplerenone", "Eplerenon", "Selektif aldosteron antagonisti"],
    ["Amiloride", "Amilorid", "Potasyum tutucu diüretik"],
    ["Triamterene", "Triamteren", "Potasyum tutucu diüretik"],
    ["Acetazolamide", "Asetazolamid", "Karbonik anhidraz inhibitörü"],
    ["Mannitol", "Mannitol", "Osmotik diüretik"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Ek ilaçlar - Nöroloji ve Psikiyatri
const generateNeuroPsychDrugs = () => {
  const drugs = [];
  const drugList = [
    ["Sertraline", "Sertralin", "SSRI antidepresan"],
    ["Fluoxetine", "Fluoksetin", "SSRI antidepresan"],
    ["Paroxetine", "Paroksetin", "SSRI antidepresan"],
    ["Citalopram", "Sitalopram", "SSRI antidepresan"],
    ["Escitalopram", "Essitalopram", "SSRI antidepresan"],
    ["Fluvoxamine", "Fluvoksamin", "SSRI antidepresan"],
    ["Venlafaxine", "Venlafaksin", "SNRI antidepresan"],
    ["Duloxetine", "Duloksetin", "SNRI antidepresan"],
    ["Desvenlafaxine", "Desvenlafaksin", "SNRI antidepresan"],
    ["Levomilnacipran", "Levomilnasipran", "SNRI antidepresan"],
    ["Milnacipran", "Milnasipran", "SNRI antidepresan"],
    ["Bupropion", "Bupropion", "NDRI antidepresan"],
    ["Mirtazapine", "Mirtazapin", "NaSSA antidepresan"],
    ["Trazodone", "Trazodon", "SARI antidepresan"],
    ["Nefazodone", "Nefazodon", "SARI antidepresan"],
    ["Vilazodone", "Vilazodon", "SSRI + 5-HT1A agonist"],
    ["Vortioxetine", "Vortiyoksetin", "Multimodal antidepresan"],
    ["Amitriptyline", "Amitriptilin", "TCA antidepresan"],
    ["Nortriptyline", "Nortriptilin", "TCA antidepresan"],
    ["Imipramine", "İmipramin", "TCA antidepresan"],
    ["Desipramine", "Desipramin", "TCA antidepresan"],
    ["Clomipramine", "Klomipramin", "TCA antidepresan, OKB"],
    ["Doxepin", "Doksepin", "TCA antidepresan"],
    ["Trimipramine", "Trimipramin", "TCA antidepresan"],
    ["Phenelzine", "Fenelzin", "MAOI antidepresan"],
    ["Tranylcypromine", "Tranilsipromin", "MAOI antidepresan"],
    ["Selegiline", "Selejilin", "MAO-B inhibitörü"],
    ["Moclobemide", "Moklobemid", "RIMA antidepresan"],
    ["Lithium", "Lityum", "Duygudurum dengeleyici"],
    ["Valproic acid", "Valproik Asit", "Antiepileptik, duygudurum"],
    ["Carbamazepine", "Karbamazepin", "Antiepileptik, duygudurum"],
    ["Oxcarbazepine", "Okskarbazepin", "Antiepileptik"],
    ["Lamotrigine", "Lamotrijin", "Antiepileptik, bipolar"],
    ["Topiramate", "Topiramat", "Antiepileptik, migren"],
    ["Gabapentin", "Gabapentin", "Antiepileptik, nöropatik ağrı"],
    ["Pregabalin", "Pregabalin", "Antiepileptik, nöropatik ağrı"],
    ["Levetiracetam", "Levetirasetam", "Antiepileptik"],
    ["Phenytoin", "Fenitoin", "Antiepileptik"],
    ["Phenobarbital", "Fenobarbital", "Barbitürat antiepileptik"],
    ["Primidone", "Primidon", "Antiepileptik"],
    ["Ethosuximide", "Etosüksimid", "Absans epilepsi"],
    ["Zonisamide", "Zonisamid", "Antiepileptik"],
    ["Lacosamide", "Lakozamid", "Antiepileptik"],
    ["Brivaracetam", "Brivarasetam", "Antiepileptik"],
    ["Perampanel", "Perampanel", "AMPA antagonisti"],
    ["Clobazam", "Klobazam", "Benzodiazepin antiepileptik"],
    ["Clonazepam", "Klonazepam", "Benzodiazepin antiepileptik"],
    ["Diazepam", "Diazepam", "Benzodiazepin"],
    ["Lorazepam", "Lorazepam", "Benzodiazepin"],
    ["Alprazolam", "Alprazolam", "Benzodiazepin, anksiyete"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Ek hastalıklar - Metabolik ve Endokrin
const generateMetabolicDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Type 1 diabetes mellitus", "Tip 1 Diyabet", "İnsülin bağımlı diyabet"],
    ["Type 2 diabetes mellitus", "Tip 2 Diyabet", "İnsülin direnci diyabeti"],
    ["Gestational diabetes", "Gestasyonel Diyabet", "Gebelik diyabeti"],
    ["Diabetic ketoacidosis", "Diyabetik Ketoasidoz", "DKA, akut komplikasyon"],
    [
      "Hyperosmolar hyperglycemic state",
      "Hiperozmolar Hiperglisemik Durum",
      "HHS",
    ],
    ["Hypoglycemia", "Hipoglisemi", "Düşük kan şekeri"],
    ["Metabolic syndrome", "Metabolik Sendrom", "İnsülin direnci sendromu"],
    ["Obesity", "Obezite", "Aşırı kilo, BMI>30"],
    ["Morbid obesity", "Morbid Obezite", "BMI>40"],
    ["Hyperthyroidism", "Hipertiroidizm", "Tiroid hormon fazlalığı"],
    ["Graves disease", "Graves Hastalığı", "Otoimmün hipertiroidizm"],
    [
      "Toxic multinodular goiter",
      "Toksik Multinodüler Guatr",
      "Plummer hastalığı",
    ],
    ["Thyroid storm", "Tiroid Fırtınası", "Tirotoksik kriz"],
    ["Hypothyroidism", "Hipotiroidizm", "Tiroid hormon eksikliği"],
    ["Hashimoto thyroiditis", "Hashimoto Tiroiditi", "Otoimmün hipotiroidizm"],
    ["Myxedema coma", "Miksödem Koması", "Şiddetli hipotiroidizm"],
    ["Subacute thyroiditis", "Subakut Tiroidit", "De Quervain tiroiditi"],
    ["Postpartum thyroiditis", "Postpartum Tiroidit", "Doğum sonrası tiroidit"],
    ["Thyroid nodule", "Tiroid Nodülü", "Tiroid kitlesi"],
    ["Goiter", "Guatr", "Tiroid büyümesi"],
    ["Cushing syndrome", "Cushing Sendromu", "Kortizol fazlalığı"],
    ["Cushing disease", "Cushing Hastalığı", "Hipofiz kaynaklı Cushing"],
    ["Addison disease", "Addison Hastalığı", "Primer adrenal yetmezlik"],
    ["Adrenal insufficiency", "Adrenal Yetmezlik", "Kortizol eksikliği"],
    ["Adrenal crisis", "Adrenal Kriz", "Akut adrenal yetmezlik"],
    ["Primary aldosteronism", "Primer Aldosteronizm", "Conn sendromu"],
    ["Pheochromocytoma", "Feokromositoma", "Adrenal medulla tümörü"],
    ["Paraganglioma", "Paraganglioma", "Ekstra-adrenal feokromositoma"],
    ["Congenital adrenal hyperplasia", "Konjenital Adrenal Hiperplazi", "CAH"],
    ["Acromegaly", "Akromegali", "Büyüme hormonu fazlalığı"],
    ["Gigantism", "Gigantizm", "Çocukluk GH fazlalığı"],
    ["Growth hormone deficiency", "Büyüme Hormonu Eksikliği", "GH eksikliği"],
    ["Hypopituitarism", "Hipopituitarizm", "Hipofiz yetmezliği"],
    [
      "Panhypopituitarism",
      "Panhipopituitarizm",
      "Tüm hipofiz hormon eksikliği",
    ],
    ["Prolactinoma", "Prolaktinoma", "Prolaktin salgılayan adenom"],
    ["Hyperprolactinemia", "Hiperprolaktinemi", "Prolaktin yüksekliği"],
    ["Diabetes insipidus", "Diabetes İnsipidus", "ADH eksikliği/direnci"],
    ["SIADH", "SIADH", "Uygunsuz ADH sendromu"],
    ["Hyperparathyroidism", "Hiperparatiroidizm", "PTH fazlalığı"],
    [
      "Primary hyperparathyroidism",
      "Primer Hiperparatiroidizm",
      "Paratiroid adenomu",
    ],
    [
      "Secondary hyperparathyroidism",
      "Sekonder Hiperparatiroidizm",
      "KBY'ye bağlı",
    ],
    ["Hypoparathyroidism", "Hipoparatiroidizm", "PTH eksikliği"],
    ["Hypercalcemia", "Hiperkalsemi", "Yüksek kalsiyum"],
    ["Hypocalcemia", "Hipokalsemi", "Düşük kalsiyum"],
    ["Osteoporosis", "Osteoporoz", "Kemik erimesi"],
    ["Osteomalacia", "Osteomalazi", "Kemik yumuşaması"],
    ["Rickets", "Raşitizm", "Çocukluk D vitamini eksikliği"],
    [
      "Paget disease of bone",
      "Kemik Paget Hastalığı",
      "Kemik yeniden yapılanma bozukluğu",
    ],
    [
      "Phenylketonuria",
      "Fenilketonüri",
      "PKU, amino asit metabolizma bozukluğu",
    ],
    ["Galactosemia", "Galaktozemi", "Galaktoz metabolizma bozukluğu"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Ek hastalıklar - Kardiyovasküler
const generateCardiovascularDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Hypertension", "Hipertansiyon", "Yüksek tansiyon"],
    [
      "Essential hypertension",
      "Esansiyel Hipertansiyon",
      "Primer hipertansiyon",
    ],
    [
      "Secondary hypertension",
      "Sekonder Hipertansiyon",
      "İkincil hipertansiyon",
    ],
    ["Malignant hypertension", "Malign Hipertansiyon", "Hipertansif acil"],
    [
      "Hypertensive emergency",
      "Hipertansif Acil",
      "Organ hasarı ile hipertansiyon",
    ],
    [
      "Pulmonary hypertension",
      "Pulmoner Hipertansiyon",
      "Akciğer hipertansiyonu",
    ],
    ["Coronary artery disease", "Koroner Arter Hastalığı", "KAH, ateroskleroz"],
    ["Stable angina", "Stabil Anjina", "Eforla göğüs ağrısı"],
    ["Unstable angina", "Unstabil Anjina", "İstirahatte göğüs ağrısı"],
    ["Prinzmetal angina", "Prinzmetal Anjina", "Vazospastik anjina"],
    ["Acute coronary syndrome", "Akut Koroner Sendrom", "AKS"],
    ["STEMI", "STEMI", "ST elevasyonlu MI"],
    ["NSTEMI", "NSTEMI", "ST elevasyonsuz MI"],
    ["Myocardial infarction", "Miyokard Enfarktüsü", "Kalp krizi"],
    ["Heart failure", "Kalp Yetmezliği", "Kardiyak yetmezlik"],
    ["Systolic heart failure", "Sistolik Kalp Yetmezliği", "HFrEF"],
    ["Diastolic heart failure", "Diyastolik Kalp Yetmezliği", "HFpEF"],
    ["Congestive heart failure", "Konjestif Kalp Yetmezliği", "KKY"],
    ["Cardiogenic shock", "Kardiyojenik Şok", "Kalp kaynaklı şok"],
    ["Cardiomyopathy", "Kardiyomiyopati", "Kalp kası hastalığı"],
    ["Dilated cardiomyopathy", "Dilate Kardiyomiyopati", "DCM"],
    ["Hypertrophic cardiomyopathy", "Hipertrofik Kardiyomiyopati", "HCM"],
    ["Restrictive cardiomyopathy", "Restriktif Kardiyomiyopati", "RCM"],
    ["Arrhythmogenic cardiomyopathy", "Aritmojenik Kardiyomiyopati", "ARVC"],
    [
      "Takotsubo cardiomyopathy",
      "Takotsubo Kardiyomiyopati",
      "Stres kardiyomiyopatisi",
    ],
    ["Atrial fibrillation", "Atriyal Fibrilasyon", "AF, düzensiz kalp ritmi"],
    ["Atrial flutter", "Atriyal Flutter", "Düzenli atriyal taşikardi"],
    ["Supraventricular tachycardia", "Supraventriküler Taşikardi", "SVT"],
    ["Ventricular tachycardia", "Ventriküler Taşikardi", "VT"],
    [
      "Ventricular fibrillation",
      "Ventriküler Fibrilasyon",
      "VF, ölümcül aritmi",
    ],
    ["Bradycardia", "Bradikardi", "Yavaş kalp hızı"],
    ["Sick sinus syndrome", "Hasta Sinüs Sendromu", "SSS"],
    ["AV block", "AV Blok", "Atriyoventriküler blok"],
    ["Bundle branch block", "Dal Bloğu", "İletim bozukluğu"],
    ["Long QT syndrome", "Uzun QT Sendromu", "LQTS"],
    ["Brugada syndrome", "Brugada Sendromu", "Ani kardiyak ölüm riski"],
    ["Wolff-Parkinson-White syndrome", "WPW Sendromu", "Aksesuar yol"],
    ["Aortic stenosis", "Aort Stenozu", "Aort kapak darlığı"],
    ["Aortic regurgitation", "Aort Regürjitasyonu", "Aort kapak yetmezliği"],
    ["Mitral stenosis", "Mitral Stenoz", "Mitral kapak darlığı"],
    ["Mitral regurgitation", "Mitral Regürjitasyon", "Mitral kapak yetmezliği"],
    ["Mitral valve prolapse", "Mitral Kapak Prolapsusu", "MVP"],
    [
      "Tricuspid regurgitation",
      "Triküspit Regürjitasyon",
      "Triküspit yetmezliği",
    ],
    ["Pulmonary stenosis", "Pulmoner Stenoz", "Pulmoner kapak darlığı"],
    [
      "Infective endocarditis",
      "Enfektif Endokardit",
      "Kalp kapağı enfeksiyonu",
    ],
    ["Pericarditis", "Perikardit", "Kalp zarı iltihabı"],
    ["Pericardial effusion", "Perikardiyal Efüzyon", "Kalp zarı sıvısı"],
    ["Cardiac tamponade", "Kardiyak Tamponad", "Kalp sıkışması"],
    [
      "Constrictive pericarditis",
      "Konstriktif Perikardit",
      "Sıkıştırıcı perikardit",
    ],
    ["Myocarditis", "Miyokardit", "Kalp kası iltihabı"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Ek hastalıklar - Nörolojik
const generateNeurologicalDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Alzheimer disease", "Alzheimer Hastalığı", "Demans, hafıza kaybı"],
    ["Vascular dementia", "Vasküler Demans", "Damarsal demans"],
    ["Lewy body dementia", "Lewy Cisimcikli Demans", "DLB"],
    ["Frontotemporal dementia", "Frontotemporal Demans", "FTD"],
    ["Parkinson disease", "Parkinson Hastalığı", "Hareket bozukluğu"],
    ["Parkinsonism", "Parkinsonizm", "Parkinson benzeri belirtiler"],
    ["Progressive supranuclear palsy", "Progresif Supranükleer Palsi", "PSP"],
    ["Multiple system atrophy", "Multipl Sistem Atrofisi", "MSA"],
    ["Corticobasal degeneration", "Kortikobazal Dejenerasyon", "CBD"],
    ["Huntington disease", "Huntington Hastalığı", "Kore, genetik"],
    ["Essential tremor", "Esansiyel Tremor", "İdiyopatik tremor"],
    ["Dystonia", "Distoni", "Kas kasılma bozukluğu"],
    ["Cervical dystonia", "Servikal Distoni", "Tortikollis"],
    ["Blepharospasm", "Blefarospazm", "Göz kapağı spazmı"],
    [
      "Tardive dyskinesia",
      "Tardif Diskinezi",
      "İlaç kaynaklı hareket bozukluğu",
    ],
    ["Restless legs syndrome", "Huzursuz Bacak Sendromu", "RLS"],
    ["Multiple sclerosis", "Multipl Skleroz", "MS, demiyelinizan hastalık"],
    ["Relapsing-remitting MS", "Relapsing-Remitting MS", "RRMS"],
    ["Primary progressive MS", "Primer Progresif MS", "PPMS"],
    ["Secondary progressive MS", "Sekonder Progresif MS", "SPMS"],
    ["Neuromyelitis optica", "Nöromiyelitis Optika", "Devic hastalığı"],
    [
      "Acute disseminated encephalomyelitis",
      "Akut Dissemine Ensefalomiyelit",
      "ADEM",
    ],
    [
      "Guillain-Barre syndrome",
      "Guillain-Barre Sendromu",
      "GBS, akut polinöropati",
    ],
    [
      "Chronic inflammatory demyelinating polyneuropathy",
      "CIDP",
      "Kronik demiyelinizan polinöropati",
    ],
    ["Myasthenia gravis", "Miyastenia Gravis", "Nöromüsküler kavşak hastalığı"],
    ["Lambert-Eaton syndrome", "Lambert-Eaton Sendromu", "LEMS"],
    [
      "Amyotrophic lateral sclerosis",
      "Amiyotrofik Lateral Skleroz",
      "ALS, Lou Gehrig",
    ],
    ["Spinal muscular atrophy", "Spinal Müsküler Atrofi", "SMA"],
    ["Muscular dystrophy", "Müsküler Distrofi", "Kas distrofisi"],
    ["Duchenne muscular dystrophy", "Duchenne Müsküler Distrofi", "DMD"],
    ["Becker muscular dystrophy", "Becker Müsküler Distrofi", "BMD"],
    ["Myotonic dystrophy", "Miyotonik Distrofi", "DM1, DM2"],
    ["Epilepsy", "Epilepsi", "Sara hastalığı"],
    ["Generalized epilepsy", "Jeneralize Epilepsi", "Yaygın nöbet"],
    ["Focal epilepsy", "Fokal Epilepsi", "Parsiyel nöbet"],
    ["Absence seizure", "Absans Nöbet", "Petit mal"],
    ["Tonic-clonic seizure", "Tonik-Klonik Nöbet", "Grand mal"],
    ["Status epilepticus", "Status Epileptikus", "Uzamış nöbet"],
    ["Febrile seizure", "Febril Konvülziyon", "Ateşli havale"],
    ["Migraine", "Migren", "Baş ağrısı sendromu"],
    ["Migraine with aura", "Auralı Migren", "Klasik migren"],
    ["Migraine without aura", "Aurasız Migren", "Yaygın migren"],
    ["Cluster headache", "Küme Baş Ağrısı", "Trigeminal otonom sefalalji"],
    ["Tension headache", "Gerilim Tipi Baş Ağrısı", "En sık baş ağrısı"],
    ["Trigeminal neuralgia", "Trigeminal Nevralji", "Yüz ağrısı"],
    ["Ischemic stroke", "İskemik İnme", "Beyin damar tıkanıklığı"],
    ["Hemorrhagic stroke", "Hemorajik İnme", "Beyin kanaması"],
    ["Transient ischemic attack", "Geçici İskemik Atak", "TIA, mini inme"],
    ["Subarachnoid hemorrhage", "Subaraknoid Kanama", "SAK"],
    ["Intracerebral hemorrhage", "İntraserebral Kanama", "Beyin içi kanama"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Toplu Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(50));

  console.log("📝 Terimler oluşturuluyor...");

  const bulkDrugs = generateBulkDrugs();
  const bulkDiseases = generateBulkDiseases();
  const bulkPlants = generateBulkPlants();
  const bulkVitamins = generateBulkVitamins();
  const bulkMinerals = generateBulkMinerals();
  const bulkAnatomy = generateBulkAnatomy();
  const bulkComponents = generateBulkComponents();
  const bulkInsects = generateBulkInsects();
  const cardiovascularDrugs = generateCardiovascularDrugs();
  const neuroPsychDrugs = generateNeuroPsychDrugs();
  const metabolicDiseases = generateMetabolicDiseases();
  const cardiovascularDiseases = generateCardiovascularDiseases();
  const neurologicalDiseases = generateNeurologicalDiseases();

  const allTerms = [
    ...bulkDrugs,
    ...bulkDiseases,
    ...bulkPlants,
    ...bulkVitamins,
    ...bulkMinerals,
    ...bulkAnatomy,
    ...bulkComponents,
    ...bulkInsects,
    ...cardiovascularDrugs,
    ...neuroPsychDrugs,
    ...metabolicDiseases,
    ...cardiovascularDiseases,
    ...neurologicalDiseases,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(
    `   İlaçlar (Anestezik, Kas Gevşetici, Antihistaminik, Hormon): ${bulkDrugs.length}`
  );
  console.log(`   Hastalıklar (Göz, KBB): ${bulkDiseases.length}`);
  console.log(`   Bitkiler: ${bulkPlants.length}`);
  console.log(`   Vitaminler: ${bulkVitamins.length}`);
  console.log(`   Mineraller: ${bulkMinerals.length}`);
  console.log(`   Anatomi: ${bulkAnatomy.length}`);
  console.log(`   Bileşenler: ${bulkComponents.length}`);
  console.log(`   Böcekler: ${bulkInsects.length}`);
  console.log(`   Kardiyovasküler İlaçlar: ${cardiovascularDrugs.length}`);
  console.log(`   Nöroloji/Psikiyatri İlaçları: ${neuroPsychDrugs.length}`);
  console.log(`   Metabolik Hastalıklar: ${metabolicDiseases.length}`);
  console.log(
    `   Kardiyovasküler Hastalıklar: ${cardiovascularDiseases.length}`
  );
  console.log(`   Nörolojik Hastalıklar: ${neurologicalDiseases.length}`);
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
