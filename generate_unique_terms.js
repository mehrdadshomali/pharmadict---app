// Benzersiz terimler - 10,000 hedefi için
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

// Dermatolojik ilaçlar
const generateDermatologicalDrugs = () => {
  const drugs = [
    ["Tretinoin", "Tretinoin", "Retinoid, akne ve anti-aging"],
    ["Adapalene", "Adapalen", "Retinoid, akne tedavisi"],
    ["Tazarotene", "Tazaroten", "Retinoid, psoriazis ve akne"],
    ["Isotretinoin", "İzotretinoin", "Sistemik retinoid, şiddetli akne"],
    ["Benzoyl peroxide", "Benzoil Peroksit", "Akne tedavisi, antibakteriyel"],
    ["Salicylic acid", "Salisilik Asit", "Keratolitik, akne tedavisi"],
    ["Azelaic acid", "Azelaik Asit", "Akne ve rozasea tedavisi"],
    ["Clindamycin topical", "Topikal Klindamisin", "Topikal antibiyotik, akne"],
    [
      "Erythromycin topical",
      "Topikal Eritromisin",
      "Topikal antibiyotik, akne",
    ],
    ["Dapsone topical", "Topikal Dapson", "Akne tedavisi"],
    ["Metronidazole topical", "Topikal Metronidazol", "Rozasea tedavisi"],
    ["Ivermectin topical", "Topikal İvermektin", "Rozasea tedavisi"],
    ["Brimonidine topical", "Topikal Brimonidin", "Rozasea kızarıklığı"],
    ["Oxymetazoline topical", "Topikal Oksimetazolin", "Rozasea kızarıklığı"],
    ["Tacrolimus topical", "Topikal Takrolimus", "Atopik dermatit"],
    ["Pimecrolimus", "Pimekrolimus", "Atopik dermatit"],
    ["Calcipotriene", "Kalsipotriol", "Psoriazis, D vitamini analoğu"],
    ["Calcitriol topical", "Topikal Kalsitriol", "Psoriazis tedavisi"],
    ["Anthralin", "Antralin", "Psoriazis tedavisi"],
    ["Coal tar", "Kömür Katranı", "Psoriazis ve seboreik dermatit"],
    ["Selenium sulfide", "Selenyum Sülfür", "Kepek ve tinea versicolor"],
    [
      "Ketoconazole shampoo",
      "Ketokonazol Şampuan",
      "Kepek ve seboreik dermatit",
    ],
    ["Ciclopirox", "Siklopiroks", "Antifungal, tırnak mantarı"],
    ["Efinaconazole", "Efinakonazol", "Tırnak mantarı"],
    ["Tavaborole", "Tavaborol", "Tırnak mantarı"],
    ["Naftifine", "Naftifin", "Topikal antifungal"],
    ["Butenafine", "Butenafin", "Topikal antifungal"],
    ["Tolnaftate", "Tolnaftat", "Topikal antifungal"],
    ["Undecylenic acid", "Undesilenik Asit", "Topikal antifungal"],
    ["Permethrin", "Permetrin", "Uyuz ve bit tedavisi"],
    ["Lindane", "Lindan", "Uyuz ve bit tedavisi"],
    ["Malathion", "Malatyon", "Bit tedavisi"],
    ["Spinosad", "Spinosad", "Bit tedavisi"],
    ["Benzyl alcohol lotion", "Benzil Alkol Losyonu", "Bit tedavisi"],
    ["Crotamiton", "Krotamiton", "Uyuz ve kaşıntı tedavisi"],
    ["Podofilox", "Podofiloks", "Genital siğil tedavisi"],
    ["Imiquimod", "İmikimod", "Genital siğil ve aktinik keratoz"],
    ["Ingenol mebutate", "İngenol Mebutat", "Aktinik keratoz"],
    ["Fluorouracil topical", "Topikal Fluorourasil", "Aktinik keratoz ve BCC"],
    ["Diclofenac topical", "Topikal Diklofenak", "Aktinik keratoz"],
    ["Minoxidil", "Minoksidil", "Saç dökülmesi tedavisi"],
    ["Finasteride topical", "Topikal Finasterid", "Saç dökülmesi tedavisi"],
    ["Bimatoprost eyelash", "Kirpik Bimatoprost", "Kirpik uzatıcı"],
    ["Hydroquinone", "Hidrokinon", "Cilt beyazlatıcı"],
    ["Azelaic acid", "Azelaik Asit", "Hiperpigmentasyon tedavisi"],
    ["Kojic acid", "Kojik Asit", "Cilt beyazlatıcı"],
    ["Arbutin", "Arbutin", "Cilt beyazlatıcı"],
    ["Tranexamic acid topical", "Topikal Traneksamik Asit", "Melazma tedavisi"],
    ["Cysteamine", "Sisteamin", "Melazma tedavisi"],
    ["Eflornithine", "Eflornithin", "Yüz kıllanması tedavisi"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Oftalmik ilaçlar
const generateOphthalmicDrugs = () => {
  const drugs = [
    ["Latanoprost", "Latanoprost", "Prostaglandin, glokom"],
    ["Bimatoprost ophthalmic", "Oftalmik Bimatoprost", "Prostaglandin, glokom"],
    ["Travoprost", "Travoprost", "Prostaglandin, glokom"],
    ["Tafluprost", "Tafluprost", "Prostaglandin, glokom"],
    ["Timolol ophthalmic", "Oftalmik Timolol", "Beta bloker, glokom"],
    ["Betaxolol ophthalmic", "Oftalmik Betaksolol", "Beta bloker, glokom"],
    ["Levobunolol", "Levobunolol", "Beta bloker, glokom"],
    ["Dorzolamide", "Dorzolamid", "Karbonik anhidraz inhibitörü, glokom"],
    ["Brinzolamide", "Brinzolamid", "Karbonik anhidraz inhibitörü, glokom"],
    ["Brimonidine ophthalmic", "Oftalmik Brimonidin", "Alfa agonist, glokom"],
    ["Apraclonidine", "Apraklonidin", "Alfa agonist, glokom"],
    ["Pilocarpine ophthalmic", "Oftalmik Pilokarpin", "Kolinerjik, glokom"],
    ["Carbachol", "Karbakol", "Kolinerjik, glokom"],
    ["Netarsudil", "Netarsudil", "Rho kinaz inhibitörü, glokom"],
    ["Latanoprostene bunod", "Latanoprosten Bunod", "NO donör prostaglandin"],
    ["Cyclosporine ophthalmic", "Oftalmik Siklosporin", "Kuru göz tedavisi"],
    ["Lifitegrast", "Lifitegrast", "Kuru göz tedavisi"],
    ["Varenicline ophthalmic", "Oftalmik Vareniklin", "Kuru göz tedavisi"],
    ["Artificial tears", "Yapay Gözyaşı", "Kuru göz tedavisi"],
    ["Hydroxypropyl cellulose", "Hidroksipropil Selüloz", "Kuru göz tedavisi"],
    ["Prednisolone ophthalmic", "Oftalmik Prednizolon", "Göz iltihabı"],
    ["Dexamethasone ophthalmic", "Oftalmik Deksametazon", "Göz iltihabı"],
    ["Loteprednol", "Loteprednol", "Göz iltihabı"],
    ["Fluorometholone", "Fluorometolon", "Göz iltihabı"],
    ["Difluprednate", "Difluprednate", "Göz iltihabı"],
    ["Ketorolac ophthalmic", "Oftalmik Ketorolak", "Göz NSAİİ"],
    ["Nepafenac", "Nepafenac", "Göz NSAİİ"],
    ["Bromfenac", "Bromfenak", "Göz NSAİİ"],
    ["Diclofenac ophthalmic", "Oftalmik Diklofenak", "Göz NSAİİ"],
    ["Olopatadine ophthalmic", "Oftalmik Olopatadin", "Göz alerjisi"],
    ["Ketotifen ophthalmic", "Oftalmik Ketotifen", "Göz alerjisi"],
    ["Azelastine ophthalmic", "Oftalmik Azelastin", "Göz alerjisi"],
    ["Epinastine", "Epinastin", "Göz alerjisi"],
    ["Alcaftadine", "Alkaftadin", "Göz alerjisi"],
    ["Bepotastine", "Bepotastin", "Göz alerjisi"],
    ["Cromolyn ophthalmic", "Oftalmik Kromolin", "Göz alerjisi"],
    ["Nedocromil ophthalmic", "Oftalmik Nedokromil", "Göz alerjisi"],
    ["Moxifloxacin ophthalmic", "Oftalmik Moksifloksasin", "Göz enfeksiyonu"],
    ["Gatifloxacin ophthalmic", "Oftalmik Gatifloksasin", "Göz enfeksiyonu"],
    ["Besifloxacin", "Besifloksasin", "Göz enfeksiyonu"],
    ["Ofloxacin ophthalmic", "Oftalmik Ofloksasin", "Göz enfeksiyonu"],
    ["Ciprofloxacin ophthalmic", "Oftalmik Siprofloksasin", "Göz enfeksiyonu"],
    ["Tobramycin ophthalmic", "Oftalmik Tobramisin", "Göz enfeksiyonu"],
    ["Gentamicin ophthalmic", "Oftalmik Gentamisin", "Göz enfeksiyonu"],
    ["Erythromycin ophthalmic", "Oftalmik Eritromisin", "Göz enfeksiyonu"],
    ["Bacitracin ophthalmic", "Oftalmik Basitrasin", "Göz enfeksiyonu"],
    ["Natamycin", "Natamisin", "Göz mantar enfeksiyonu"],
    ["Trifluridine", "Trifluridin", "Göz herpes enfeksiyonu"],
    [
      "Ganciclovir ophthalmic",
      "Oftalmik Gansiklovir",
      "Göz herpes enfeksiyonu",
    ],
    ["Phenylephrine ophthalmic", "Oftalmik Fenilefrin", "Midriyatik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Otolojik ilaçlar
const generateOticDrugs = () => {
  const drugs = [
    ["Ciprofloxacin otic", "Otik Siprofloksasin", "Kulak enfeksiyonu"],
    ["Ofloxacin otic", "Otik Ofloksasin", "Kulak enfeksiyonu"],
    ["Neomycin otic", "Otik Neomisin", "Kulak enfeksiyonu"],
    ["Polymyxin B otic", "Otik Polimiksin B", "Kulak enfeksiyonu"],
    ["Hydrocortisone otic", "Otik Hidrokortizon", "Kulak iltihabı"],
    ["Dexamethasone otic", "Otik Deksametazon", "Kulak iltihabı"],
    ["Fluocinolone otic", "Otik Fluosinolon", "Kulak iltihabı"],
    ["Acetic acid otic", "Otik Asetik Asit", "Kulak enfeksiyonu"],
    ["Carbamide peroxide otic", "Otik Karbamid Peroksit", "Kulak kiri çözücü"],
    ["Benzocaine otic", "Otik Benzokain", "Kulak ağrısı"],
    ["Antipyrine otic", "Otik Antipirin", "Kulak ağrısı"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Nazal ilaçlar
const generateNasalDrugs = () => {
  const drugs = [
    ["Fluticasone nasal", "Nazal Flutikazon", "Nazal kortikosteroid"],
    ["Mometasone nasal", "Nazal Mometazon", "Nazal kortikosteroid"],
    ["Budesonide nasal", "Nazal Budesonid", "Nazal kortikosteroid"],
    ["Triamcinolone nasal", "Nazal Triamsinolon", "Nazal kortikosteroid"],
    ["Beclomethasone nasal", "Nazal Beklometazon", "Nazal kortikosteroid"],
    ["Ciclesonide nasal", "Nazal Siklesonid", "Nazal kortikosteroid"],
    ["Flunisolide nasal", "Nazal Flunisolid", "Nazal kortikosteroid"],
    ["Azelastine nasal", "Nazal Azelastin", "Nazal antihistaminik"],
    ["Olopatadine nasal", "Nazal Olopatadin", "Nazal antihistaminik"],
    ["Cromolyn nasal", "Nazal Kromolin", "Nazal mast hücre stabilizatörü"],
    ["Ipratropium nasal", "Nazal İpratropium", "Nazal antikolinerjik"],
    ["Oxymetazoline nasal", "Nazal Oksimetazolin", "Nazal dekonjestan"],
    ["Phenylephrine nasal", "Nazal Fenilefrin", "Nazal dekonjestan"],
    ["Xylometazoline nasal", "Nazal Ksilometazolin", "Nazal dekonjestan"],
    ["Saline nasal spray", "Nazal Salin Sprey", "Nazal nemlendirici"],
    ["Sodium chloride nasal", "Nazal Sodyum Klorür", "Nazal yıkama"],
    ["Desmopressin nasal", "Nazal Desmopressin", "Diabetes insipidus"],
    ["Calcitonin nasal", "Nazal Kalsitonin", "Osteoporoz"],
    ["Sumatriptan nasal", "Nazal Sumatriptan", "Migren"],
    ["Zolmitriptan nasal", "Nazal Zolmitriptan", "Migren"],
    ["Butorphanol nasal", "Nazal Butorfanol", "Ağrı kesici"],
    ["Nicotine nasal spray", "Nazal Nikotin Spreyi", "Sigara bırakma"],
    ["Esketamine nasal", "Nazal Esketamin", "Dirençli depresyon"],
    ["Naloxone nasal", "Nazal Nalokson", "Opioid doz aşımı"],
    ["Midazolam nasal", "Nazal Midazolam", "Nöbet tedavisi"],
    ["Diazepam nasal", "Nazal Diazepam", "Nöbet tedavisi"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Hematolojik ilaçlar
const generateHematologicalDrugs = () => {
  const drugs = [
    ["Epoetin alfa", "Epoetin Alfa", "Eritropoietin, anemi"],
    ["Darbepoetin alfa", "Darbepoetin Alfa", "Uzun etkili eritropoietin"],
    [
      "Methoxy polyethylene glycol-epoetin beta",
      "Metoksi PEG-Epoetin Beta",
      "Uzun etkili ESA",
    ],
    ["Filgrastim", "Filgrastim", "G-CSF, nötropeni"],
    ["Pegfilgrastim", "Pegfilgrastim", "Uzun etkili G-CSF"],
    ["Sargramostim", "Sargramostim", "GM-CSF"],
    ["Romiplostim", "Romiplostim", "Trombopoetin agonisti"],
    ["Eltrombopag", "Eltrombopag", "Trombopoetin agonisti"],
    ["Avatrombopag", "Avatrombopag", "Trombopoetin agonisti"],
    ["Lusutrombopag", "Lusutrombopag", "Trombopoetin agonisti"],
    ["Oprelvekin", "Oprelvekin", "IL-11, trombositopeni"],
    ["Iron sucrose", "Demir Sukroz", "IV demir preparatı"],
    ["Ferric carboxymaltose", "Ferrik Karboksimaltoz", "IV demir preparatı"],
    ["Iron dextran", "Demir Dekstran", "IV demir preparatı"],
    ["Ferumoxytol", "Ferumoksitol", "IV demir preparatı"],
    ["Ferric gluconate", "Ferrik Glukonat", "IV demir preparatı"],
    ["Ferrous sulfate", "Ferröz Sülfat", "Oral demir preparatı"],
    ["Ferrous gluconate", "Ferröz Glukonat", "Oral demir preparatı"],
    ["Ferrous fumarate", "Ferröz Fumarat", "Oral demir preparatı"],
    [
      "Polysaccharide iron complex",
      "Polisakkarit Demir Kompleksi",
      "Oral demir",
    ],
    ["Cyanocobalamin", "Siyanokobalamin", "B12 vitamini"],
    ["Hydroxocobalamin", "Hidroksokobalamin", "B12 vitamini, siyanür antidotu"],
    ["Folic acid", "Folik Asit", "B9 vitamini"],
    ["Leucovorin", "Lökovorin", "Folinik asit, metotreksat kurtarma"],
    ["Levoleucovorin", "Lefolökovorin", "Aktif folinik asit"],
    ["Vitamin K1", "K1 Vitamini", "Fitonadion, pıhtılaşma"],
    ["Aminocaproic acid", "Aminokaproik Asit", "Antifibrinolitik"],
    ["Tranexamic acid", "Traneksamik Asit", "Antifibrinolitik"],
    ["Desmopressin", "Desmopressin", "DDAVP, hemofili A ve VWD"],
    [
      "Factor VIII concentrate",
      "Faktör VIII Konsantresi",
      "Hemofili A tedavisi",
    ],
    ["Factor IX concentrate", "Faktör IX Konsantresi", "Hemofili B tedavisi"],
    ["Emicizumab", "Emisizumab", "Hemofili A profilaksisi"],
    ["Recombinant factor VIIa", "Rekombinant Faktör VIIa", "Kanama tedavisi"],
    [
      "Prothrombin complex concentrate",
      "Protrombin Kompleks Konsantresi",
      "PCC, kanama",
    ],
    ["Fibrinogen concentrate", "Fibrinojen Konsantresi", "Kanama tedavisi"],
    [
      "Antithrombin III concentrate",
      "Antitrombin III Konsantresi",
      "AT eksikliği",
    ],
    ["Protein C concentrate", "Protein C Konsantresi", "Protein C eksikliği"],
    ["Idarucizumab", "İdarusizumab", "Dabigatran antidotu"],
    ["Andexanet alfa", "Andeksanet Alfa", "Xa inhibitörü antidotu"],
    ["Protamine sulfate", "Protamin Sülfat", "Heparin antidotu"],
    ["Phytonadione", "Fitonadion", "Varfarin antidotu"],
    ["Hydroxyurea", "Hidroksiüre", "Orak hücre ve miyeloproliferatif"],
    ["Voxelotor", "Vokselotor", "Orak hücre hastalığı"],
    ["Crizanlizumab", "Krizanlizumab", "Orak hücre hastalığı"],
    ["L-glutamine", "L-Glutamin", "Orak hücre hastalığı"],
    ["Deferasirox", "Deferasiroks", "Demir şelatörü"],
    ["Deferoxamine", "Deferoksamin", "Demir şelatörü"],
    ["Deferiprone", "Deferipron", "Demir şelatörü"],
    ["Luspatercept", "Luspatersept", "Talasemi ve MDS anemisi"],
    ["Caplacizumab", "Kaplasiuzumab", "TTP tedavisi"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Romatolojik ilaçlar
const generateRheumatologicalDrugs = () => {
  const drugs = [
    ["Methotrexate", "Metotreksat", "DMARD, RA ve psoriazis"],
    ["Leflunomide", "Leflunomid", "DMARD, RA"],
    ["Sulfasalazine", "Sülfasalazin", "DMARD, RA ve İBH"],
    ["Hydroxychloroquine", "Hidroksiklorokin", "DMARD, SLE ve RA"],
    ["Azathioprine", "Azatioprin", "İmmünosupresif"],
    ["Mycophenolate mofetil", "Mikofenolat Mofetil", "İmmünosupresif"],
    ["Mycophenolic acid", "Mikofenolik Asit", "İmmünosupresif"],
    ["Cyclosporine", "Siklosporin", "Kalsinörin inhibitörü"],
    ["Tacrolimus", "Takrolimus", "Kalsinörin inhibitörü"],
    ["Sirolimus", "Sirolimus", "mTOR inhibitörü"],
    ["Cyclophosphamide", "Siklofosfamid", "Alkilleyici ajan, vaskülit"],
    ["Rituximab", "Rituksimab", "Anti-CD20, RA ve vaskülit"],
    ["Abatacept", "Abatasept", "T hücre kostimülasyon inhibitörü"],
    ["Tocilizumab", "Tosilizumab", "Anti-IL-6R, RA"],
    ["Sarilumab", "Sarilumab", "Anti-IL-6R, RA"],
    ["Anakinra", "Anakinra", "IL-1 reseptör antagonisti"],
    ["Canakinumab", "Kanakinumab", "Anti-IL-1β"],
    ["Rilonacept", "Rilonasept", "IL-1 tuzağı"],
    ["Secukinumab", "Sekukinumab", "Anti-IL-17A"],
    ["Ixekizumab", "İksekizumab", "Anti-IL-17A"],
    ["Brodalumab", "Brodalumab", "Anti-IL-17R"],
    ["Guselkumab", "Guselkumab", "Anti-IL-23"],
    ["Tildrakizumab", "Tildrakizumab", "Anti-IL-23"],
    ["Risankizumab", "Risankizumab", "Anti-IL-23"],
    ["Apremilast", "Apremilast", "PDE4 inhibitörü"],
    ["Deucravacitinib", "Deukravasitinib", "TYK2 inhibitörü"],
    ["Anifrolumab", "Anifrolumab", "Anti-IFNAR1, SLE"],
    ["Belimumab", "Belimumab", "Anti-BLyS, SLE"],
    ["Voclosporin", "Voklosporin", "Kalsinörin inhibitörü, lupus nefriti"],
    ["Colchicine", "Kolşisin", "Gut ve FMF"],
    ["Allopurinol", "Allopurinol", "Ksantin oksidaz inhibitörü, gut"],
    ["Febuxostat", "Febuksostat", "Ksantin oksidaz inhibitörü, gut"],
    ["Probenecid", "Probenesid", "Ürikozürik, gut"],
    ["Lesinurad", "Lesinurad", "URAT1 inhibitörü, gut"],
    ["Pegloticase", "Peglotikaz", "Ürikaz, refrakter gut"],
    ["Rasburicase", "Rasburikaz", "Ürikaz, tümör lizis sendromu"],
    ["Diacerein", "Diaserein", "Osteoartrit"],
    ["Glucosamine sulfate", "Glukozamin Sülfat", "Eklem sağlığı"],
    ["Chondroitin sulfate", "Kondroitin Sülfat", "Eklem sağlığı"],
    [
      "Hyaluronic acid injection",
      "Hiyalüronik Asit Enjeksiyonu",
      "Viskosuplemantasyon",
    ],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Ürolojik ilaçlar
const generateUrologicalDrugs = () => {
  const drugs = [
    ["Tamsulosin", "Tamsulosin", "Alfa bloker, BPH"],
    ["Alfuzosin", "Alfuzosin", "Alfa bloker, BPH"],
    ["Silodosin", "Silodosin", "Alfa bloker, BPH"],
    ["Doxazosin", "Doksazosin", "Alfa bloker, BPH ve hipertansiyon"],
    ["Terazosin", "Terazosin", "Alfa bloker, BPH ve hipertansiyon"],
    ["Prazosin", "Prazosin", "Alfa bloker, hipertansiyon"],
    ["Finasteride", "Finasterid", "5-alfa redüktaz inhibitörü, BPH"],
    ["Dutasteride", "Dutasterid", "5-alfa redüktaz inhibitörü, BPH"],
    ["Tadalafil BPH", "Tadalafil BPH", "PDE5 inhibitörü, BPH"],
    ["Oxybutynin", "Oksibutinin", "Antikolinerjik, aşırı aktif mesane"],
    ["Tolterodine", "Tolterodin", "Antikolinerjik, aşırı aktif mesane"],
    ["Solifenacin", "Solifenasin", "Antikolinerjik, aşırı aktif mesane"],
    ["Darifenacin", "Darifenasin", "Antikolinerjik, aşırı aktif mesane"],
    ["Fesoterodine", "Fesoterodin", "Antikolinerjik, aşırı aktif mesane"],
    ["Trospium", "Trospium", "Antikolinerjik, aşırı aktif mesane"],
    ["Mirabegron", "Mirabegron", "Beta-3 agonist, aşırı aktif mesane"],
    ["Vibegron", "Vibegron", "Beta-3 agonist, aşırı aktif mesane"],
    [
      "Botulinum toxin bladder",
      "Mesane Botulinum Toksini",
      "Aşırı aktif mesane",
    ],
    ["Sildenafil", "Sildenafil", "PDE5 inhibitörü, ED"],
    ["Tadalafil", "Tadalafil", "PDE5 inhibitörü, ED"],
    ["Vardenafil", "Vardenafil", "PDE5 inhibitörü, ED"],
    ["Avanafil", "Avanafil", "PDE5 inhibitörü, ED"],
    ["Alprostadil", "Alprostadil", "Prostaglandin E1, ED"],
    ["Testosterone replacement", "Testosteron Replasman", "Hipogonadizm"],
    ["Testosterone cypionate", "Testosteron Sipionat", "Androjen"],
    ["Testosterone enanthate", "Testosteron Enantat", "Androjen"],
    ["Testosterone undecanoate", "Testosteron Undekanoat", "Oral androjen"],
    ["Testosterone gel", "Testosteron Jel", "Transdermal androjen"],
    ["Testosterone patch", "Testosteron Patch", "Transdermal androjen"],
    ["Clomiphene citrate", "Klomifen Sitrat", "SERM, erkek infertilite"],
    [
      "Human chorionic gonadotropin",
      "İnsan Koryonik Gonadotropini",
      "hCG, hipogonadizm",
    ],
    [
      "Follicle stimulating hormone",
      "Folikül Stimüle Edici Hormon",
      "FSH, infertilite",
    ],
    ["Potassium citrate", "Potasyum Sitrat", "Böbrek taşı önleme"],
    ["Sodium citrate", "Sodyum Sitrat", "İdrar alkalileştirici"],
    [
      "Allopurinol uric acid stones",
      "Allopurinol Ürik Asit Taşları",
      "Ürik asit taşı önleme",
    ],
    [
      "Thiazide diuretics stones",
      "Tiyazid Diüretikler Taşlar",
      "Kalsiyum taşı önleme",
    ],
    ["Pentosan polysulfate", "Pentosan Polisülfat", "İnterstisyel sistit"],
    ["Dimethyl sulfoxide bladder", "Mesane DMSO", "İnterstisyel sistit"],
    ["Phenazopyridine", "Fenazopiridin", "Üriner analjezik"],
    ["Methenamine", "Metenamin", "Üriner antiseptik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Jinekolojik ilaçlar
const generateGynecologicalDrugs = () => {
  const drugs = [
    ["Ethinyl estradiol", "Etinil Estradiol", "Sentetik östrojen"],
    ["Mestranol", "Mestranol", "Sentetik östrojen"],
    ["Conjugated estrogens", "Konjuge Östrojenler", "Menopoz tedavisi"],
    ["Estradiol", "Estradiol", "Biyoidentik östrojen"],
    ["Estradiol valerate", "Estradiol Valerat", "Östrojen"],
    ["Estriol", "Estriol", "Zayıf östrojen"],
    ["Norethindrone", "Noretindron", "Progestin"],
    ["Levonorgestrel", "Levonorgestrel", "Progestin"],
    ["Desogestrel", "Desogestrel", "Progestin"],
    ["Norgestimate", "Norgestimat", "Progestin"],
    ["Drospirenone", "Drospirenon", "Progestin, antimineralokortikoid"],
    ["Dienogest", "Dienogest", "Progestin, endometriozis"],
    ["Medroxyprogesterone acetate", "Medroksiprogesteron Asetat", "Progestin"],
    ["Progesterone", "Progesteron", "Doğal progesteron"],
    [
      "Micronized progesterone",
      "Mikronize Progesteron",
      "Biyoidentik progesteron",
    ],
    ["Norethindrone acetate", "Noretindron Asetat", "Progestin"],
    [
      "Etonogestrel implant",
      "Etonogestrel İmplant",
      "Uzun etkili kontraseptif",
    ],
    ["Copper IUD", "Bakır RİA", "Non-hormonal kontraseptif"],
    ["Levonorgestrel IUD", "Levonorgestrel RİA", "Hormonal RİA"],
    ["Ulipristal acetate", "Ulipristal Asetat", "Acil kontraseptif"],
    ["Mifepristone", "Mifepriston", "Antiprogestin"],
    ["Misoprostol", "Mizoprostol", "Prostaglandin, düşük indüksiyonu"],
    ["Dinoprostone", "Dinoproston", "Prostaglandin E2, servikal olgunlaştırma"],
    ["Carboprost", "Karboprost", "Prostaglandin F2α, postpartum kanama"],
    ["Methylergonovine", "Metilergonovin", "Uterotonik, postpartum kanama"],
    ["Oxytocin", "Oksitosin", "Uterotonik, doğum indüksiyonu"],
    ["Atosiban", "Atosiban", "Oksitosin antagonisti, preterm doğum"],
    ["Nifedipine tocolytic", "Tokolitik Nifedipin", "Preterm doğum önleme"],
    ["Indomethacin tocolytic", "Tokolitik İndometasin", "Preterm doğum önleme"],
    [
      "Magnesium sulfate tocolytic",
      "Tokolitik Magnezyum Sülfat",
      "Preterm doğum önleme",
    ],
    ["Terbutaline tocolytic", "Tokolitik Terbutalin", "Preterm doğum önleme"],
    [
      "Betamethasone antenatal",
      "Antenatal Betametazon",
      "Fetal akciğer olgunlaştırma",
    ],
    [
      "Dexamethasone antenatal",
      "Antenatal Deksametazon",
      "Fetal akciğer olgunlaştırma",
    ],
    ["Clomiphene", "Klomifen", "Ovülasyon indüksiyonu"],
    ["Letrozole fertility", "Fertilite Letrozol", "Ovülasyon indüksiyonu"],
    ["Gonadotropins", "Gonadotropinler", "Ovülasyon indüksiyonu"],
    ["GnRH agonists", "GnRH Agonistleri", "Endometriozis, IVF"],
    ["Leuprolide", "Leuprolid", "GnRH agonisti"],
    ["Goserelin", "Goserelin", "GnRH agonisti"],
    ["Nafarelin", "Nafarelin", "GnRH agonisti"],
    ["GnRH antagonists", "GnRH Antagonistleri", "IVF protokolü"],
    ["Cetrorelix", "Setrorelix", "GnRH antagonisti"],
    ["Ganirelix", "Ganirelix", "GnRH antagonisti"],
    ["Elagolix", "Elagoliks", "Oral GnRH antagonisti, endometriozis"],
    ["Relugolix", "Relugoliks", "Oral GnRH antagonisti"],
    ["Danazol", "Danazol", "Androjen, endometriozis"],
    ["Ospemifene", "Ospemifen", "SERM, vajinal atrofi"],
    ["Prasterone", "Prasteron", "DHEA, vajinal atrofi"],
    ["Estradiol vaginal", "Vajinal Estradiol", "Vajinal atrofi"],
    [
      "Conjugated estrogens vaginal",
      "Vajinal Konjuge Östrojenler",
      "Vajinal atrofi",
    ],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Pediatrik hastalıklar
const generatePediatricDiseases = () => {
  const diseases = [
    ["Neonatal jaundice", "Yenidoğan Sarılığı", "Neonatal hiperbilirubinemi"],
    ["Kernicterus", "Kernikterus", "Bilirubin ensefalopatisi"],
    [
      "Respiratory distress syndrome newborn",
      "Yenidoğan Solunum Sıkıntısı Sendromu",
      "RDS, hyalin membran hastalığı",
    ],
    [
      "Bronchopulmonary dysplasia",
      "Bronkopulmoner Displazi",
      "BPD, kronik akciğer hastalığı",
    ],
    ["Necrotizing enterocolitis", "Nekrotizan Enterokolit", "NEC"],
    ["Retinopathy of prematurity", "Prematüre Retinopatisi", "ROP"],
    ["Intraventricular hemorrhage", "İntraventriküler Kanama", "IVH"],
    ["Periventricular leukomalacia", "Periventriküler Lökomalazi", "PVL"],
    ["Patent ductus arteriosus", "Patent Duktus Arteriozus", "PDA"],
    ["Neonatal sepsis", "Yenidoğan Sepsisi", "Neonatal enfeksiyon"],
    ["Meconium aspiration syndrome", "Mekonyum Aspirasyon Sendromu", "MAS"],
    ["Transient tachypnea of newborn", "Yenidoğanın Geçici Taşipnesi", "TTN"],
    ["Congenital diaphragmatic hernia", "Konjenital Diyafragma Hernisi", "CDH"],
    ["Esophageal atresia", "Özofagus Atrezisi", "Yemek borusu yokluğu"],
    ["Tracheoesophageal fistula", "Trakeoözofageal Fistül", "TEF"],
    ["Pyloric stenosis", "Pilor Stenozu", "Mide çıkışı darlığı"],
    ["Hirschsprung disease", "Hirschsprung Hastalığı", "Konjenital megakolon"],
    ["Intussusception", "İnvajinasyon", "Bağırsak iç içe geçmesi"],
    ["Malrotation", "Malrotasyon", "Bağırsak rotasyon anomalisi"],
    ["Omphalocele", "Omfalosel", "Göbek fıtığı"],
    ["Gastroschisis", "Gastroşizis", "Karın duvarı defekti"],
    ["Biliary atresia", "Biliyer Atrezi", "Safra yolu yokluğu"],
    [
      "Congenital hypothyroidism",
      "Konjenital Hipotiroidizm",
      "Doğuştan tiroid yetersizliği",
    ],
    ["Phenylketonuria", "Fenilketonüri", "PKU, metabolik hastalık"],
    ["Galactosemia", "Galaktozemi", "Galaktoz metabolizma bozukluğu"],
    ["Maple syrup urine disease", "Akçaağaç Şurubu İdrar Hastalığı", "MSUD"],
    ["Homocystinuria", "Homosistinüri", "Metiyonin metabolizma bozukluğu"],
    ["Tyrosinemia", "Tirozinemi", "Tirozin metabolizma bozukluğu"],
    ["Glycogen storage diseases", "Glikojen Depo Hastalıkları", "GSD"],
    ["Mucopolysaccharidoses", "Mukopolisakkaridozlar", "MPS"],
    ["Gaucher disease", "Gaucher Hastalığı", "Lizozomal depo hastalığı"],
    ["Fabry disease", "Fabry Hastalığı", "Lizozomal depo hastalığı"],
    [
      "Niemann-Pick disease",
      "Niemann-Pick Hastalığı",
      "Lizozomal depo hastalığı",
    ],
    ["Tay-Sachs disease", "Tay-Sachs Hastalığı", "GM2 gangliosidoz"],
    ["Pompe disease", "Pompe Hastalığı", "GSD tip II"],
    ["Duchenne muscular dystrophy", "Duchenne Müsküler Distrofi", "DMD"],
    ["Becker muscular dystrophy", "Becker Müsküler Distrofi", "BMD"],
    ["Spinal muscular atrophy", "Spinal Müsküler Atrofi", "SMA"],
    [
      "Congenital heart disease",
      "Konjenital Kalp Hastalığı",
      "Doğuştan kalp anomalisi",
    ],
    ["Tetralogy of Fallot", "Fallot Tetralojisi", "TOF"],
    [
      "Transposition of great arteries",
      "Büyük Arterlerin Transpozisyonu",
      "TGA",
    ],
    ["Ventricular septal defect", "Ventriküler Septal Defekt", "VSD"],
    ["Atrial septal defect", "Atriyal Septal Defekt", "ASD"],
    ["Coarctation of aorta", "Aort Koarktasyonu", "Aort daralması"],
    [
      "Hypoplastic left heart syndrome",
      "Hipoplastik Sol Kalp Sendromu",
      "HLHS",
    ],
    [
      "Kawasaki disease",
      "Kawasaki Hastalığı",
      "Mukokutanöz lenf nodu sendromu",
    ],
    ["Henoch-Schonlein purpura", "Henoch-Schönlein Purpurası", "IgA vasküliti"],
    ["Juvenile idiopathic arthritis", "Jüvenil İdiyopatik Artrit", "JIA"],
    ["Febrile seizures", "Febril Konvülsiyonlar", "Ateşli havale"],
    ["Infantile spasms", "İnfantil Spazmlar", "West sendromu"],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Genetik hastalıklar
const generateGeneticDiseases = () => {
  const diseases = [
    ["Down syndrome", "Down Sendromu", "Trizomi 21"],
    ["Edwards syndrome", "Edwards Sendromu", "Trizomi 18"],
    ["Patau syndrome", "Patau Sendromu", "Trizomi 13"],
    ["Turner syndrome", "Turner Sendromu", "45,X"],
    ["Klinefelter syndrome", "Klinefelter Sendromu", "47,XXY"],
    ["Triple X syndrome", "Üçlü X Sendromu", "47,XXX"],
    ["XYY syndrome", "XYY Sendromu", "47,XYY"],
    ["Fragile X syndrome", "Frajil X Sendromu", "FMR1 mutasyonu"],
    ["Cri du chat syndrome", "Kedi Miyavlaması Sendromu", "5p delesyonu"],
    ["Wolf-Hirschhorn syndrome", "Wolf-Hirschhorn Sendromu", "4p delesyonu"],
    ["DiGeorge syndrome", "DiGeorge Sendromu", "22q11.2 delesyonu"],
    ["Williams syndrome", "Williams Sendromu", "7q11.23 delesyonu"],
    ["Prader-Willi syndrome", "Prader-Willi Sendromu", "15q11-q13 delesyonu"],
    ["Angelman syndrome", "Angelman Sendromu", "15q11-q13 delesyonu"],
    ["Marfan syndrome", "Marfan Sendromu", "FBN1 mutasyonu"],
    [
      "Ehlers-Danlos syndrome",
      "Ehlers-Danlos Sendromu",
      "Bağ dokusu hastalığı",
    ],
    [
      "Osteogenesis imperfecta",
      "Osteogenezis İmperfekta",
      "Kırılgan kemik hastalığı",
    ],
    ["Achondroplasia", "Akondroplazi", "Cücelik"],
    [
      "Neurofibromatosis type 1",
      "Nörofibromatozis Tip 1",
      "NF1, von Recklinghausen",
    ],
    ["Neurofibromatosis type 2", "Nörofibromatozis Tip 2", "NF2"],
    ["Tuberous sclerosis", "Tüberoz Skleroz", "TSC"],
    ["Von Hippel-Lindau disease", "Von Hippel-Lindau Hastalığı", "VHL"],
    ["Huntington disease", "Huntington Hastalığı", "HTT mutasyonu"],
    ["Myotonic dystrophy", "Miyotonik Distrofi", "DM1, DM2"],
    ["Facioscapulohumeral dystrophy", "Fasiyoskapulohumeral Distrofi", "FSHD"],
    [
      "Limb-girdle muscular dystrophy",
      "Ekstremite-Kuşak Müsküler Distrofi",
      "LGMD",
    ],
    [
      "Charcot-Marie-Tooth disease",
      "Charcot-Marie-Tooth Hastalığı",
      "CMT, herediter nöropati",
    ],
    ["Friedreich ataxia", "Friedreich Ataksisi", "FXN mutasyonu"],
    ["Spinocerebellar ataxia", "Spinoserebellar Ataksi", "SCA"],
    ["Hereditary spastic paraplegia", "Herediter Spastik Parapleji", "HSP"],
    [
      "Familial adenomatous polyposis",
      "Ailesel Adenomatöz Polipozis",
      "FAP, APC mutasyonu",
    ],
    ["Lynch syndrome", "Lynch Sendromu", "HNPCC, MMR mutasyonu"],
    ["Li-Fraumeni syndrome", "Li-Fraumeni Sendromu", "TP53 mutasyonu"],
    ["BRCA1/2 mutation", "BRCA1/2 Mutasyonu", "Herediter meme/over kanseri"],
    ["Hereditary hemochromatosis", "Herediter Hemokromatoz", "HFE mutasyonu"],
    ["Wilson disease", "Wilson Hastalığı", "ATP7B mutasyonu, bakır birikimi"],
    [
      "Alpha-1 antitrypsin deficiency",
      "Alfa-1 Antitripsin Eksikliği",
      "SERPINA1 mutasyonu",
    ],
    ["Hemophilia A", "Hemofili A", "Faktör VIII eksikliği"],
    ["Hemophilia B", "Hemofili B", "Faktör IX eksikliği"],
    ["Von Willebrand disease", "Von Willebrand Hastalığı", "VWF eksikliği"],
    ["Sickle cell disease", "Orak Hücre Hastalığı", "HbS"],
    ["Thalassemia major", "Talasemi Major", "Beta talasemi"],
    ["Thalassemia minor", "Talasemi Minor", "Talasemi taşıyıcılığı"],
    ["G6PD deficiency", "G6PD Eksikliği", "Favizm"],
    [
      "Hereditary spherocytosis",
      "Herediter Sferositoz",
      "Eritrosit membran defekti",
    ],
    [
      "Hereditary elliptocytosis",
      "Herediter Eliptositoz",
      "Eritrosit şekil anomalisi",
    ],
    [
      "Familial hypercholesterolemia",
      "Ailesel Hiperkolesterolemi",
      "LDLR mutasyonu",
    ],
    [
      "Familial Mediterranean fever",
      "Ailesel Akdeniz Ateşi",
      "FMF, MEFV mutasyonu",
    ],
    ["Cystic fibrosis", "Kistik Fibrozis", "CFTR mutasyonu"],
    [
      "Polycystic kidney disease",
      "Polikistik Böbrek Hastalığı",
      "PKD1/PKD2 mutasyonu",
    ],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Kanser türleri
const generateCancerTypes = () => {
  const cancers = [
    ["Acute lymphoblastic leukemia", "Akut Lenfoblastik Lösemi", "ALL"],
    ["Acute myeloid leukemia", "Akut Miyeloid Lösemi", "AML"],
    ["Chronic lymphocytic leukemia", "Kronik Lenfositik Lösemi", "KLL"],
    ["Chronic myeloid leukemia", "Kronik Miyeloid Lösemi", "KML"],
    ["Hodgkin lymphoma", "Hodgkin Lenfoma", "HL"],
    ["Non-Hodgkin lymphoma", "Non-Hodgkin Lenfoma", "NHL"],
    [
      "Diffuse large B-cell lymphoma",
      "Diffüz Büyük B Hücreli Lenfoma",
      "DLBCL",
    ],
    ["Follicular lymphoma", "Foliküler Lenfoma", "FL"],
    ["Mantle cell lymphoma", "Mantle Hücreli Lenfoma", "MCL"],
    ["Marginal zone lymphoma", "Marjinal Zon Lenfoma", "MZL"],
    ["Burkitt lymphoma", "Burkitt Lenfoma", "Agresif B hücreli lenfoma"],
    ["Multiple myeloma", "Multipl Miyelom", "Plazma hücre kanseri"],
    ["Waldenstrom macroglobulinemia", "Waldenström Makroglobulinemisi", "WM"],
    ["Myelodysplastic syndrome", "Miyelodisplastik Sendrom", "MDS"],
    ["Myeloproliferative neoplasms", "Miyeloproliferatif Neoplazmlar", "MPN"],
    ["Polycythemia vera", "Polisitemia Vera", "PV"],
    ["Essential thrombocythemia", "Esansiyel Trombositemi", "ET"],
    ["Primary myelofibrosis", "Primer Miyelofibrozis", "PMF"],
    ["Breast cancer", "Meme Kanseri", "Meme karsinomu"],
    ["Ductal carcinoma in situ", "Duktal Karsinoma İn Situ", "DCIS"],
    ["Invasive ductal carcinoma", "İnvaziv Duktal Karsinom", "IDC"],
    ["Invasive lobular carcinoma", "İnvaziv Lobüler Karsinom", "ILC"],
    ["Triple negative breast cancer", "Üçlü Negatif Meme Kanseri", "TNBC"],
    [
      "HER2 positive breast cancer",
      "HER2 Pozitif Meme Kanseri",
      "HER2+ meme kanseri",
    ],
    ["Colorectal cancer", "Kolorektal Kanser", "Kolon ve rektum kanseri"],
    ["Colon adenocarcinoma", "Kolon Adenokarsinomu", "Kolon kanseri"],
    ["Rectal cancer", "Rektal Kanser", "Rektum kanseri"],
    ["Gastric cancer", "Mide Kanseri", "Gastrik karsinom"],
    ["Esophageal cancer", "Özofagus Kanseri", "Yemek borusu kanseri"],
    [
      "Hepatocellular carcinoma",
      "Hepatoselüler Karsinom",
      "HCC, karaciğer kanseri",
    ],
    ["Cholangiocarcinoma", "Kolanjiyokarsinom", "Safra yolu kanseri"],
    [
      "Pancreatic adenocarcinoma",
      "Pankreas Adenokarsinomu",
      "Pankreas kanseri",
    ],
    ["Pancreatic neuroendocrine tumor", "Pankreas Nöroendokrin Tümör", "PNET"],
    ["Renal cell carcinoma", "Renal Hücreli Karsinom", "RCC, böbrek kanseri"],
    ["Clear cell renal carcinoma", "Berrak Hücreli Renal Karsinom", "ccRCC"],
    ["Urothelial carcinoma", "Ürotelyal Karsinom", "Mesane kanseri"],
    ["Prostate adenocarcinoma", "Prostat Adenokarsinomu", "Prostat kanseri"],
    ["Testicular cancer", "Testis Kanseri", "Germ hücreli tümör"],
    ["Seminoma", "Seminom", "Testis germ hücreli tümör"],
    [
      "Non-seminomatous germ cell tumor",
      "Non-Seminomatöz Germ Hücreli Tümör",
      "NSGCT",
    ],
    ["Ovarian cancer", "Over Kanseri", "Yumurtalık kanseri"],
    ["Epithelial ovarian cancer", "Epitelyal Over Kanseri", "EOC"],
    ["Endometrial cancer", "Endometriyal Kanser", "Rahim kanseri"],
    ["Cervical cancer", "Serviks Kanseri", "Rahim ağzı kanseri"],
    ["Vulvar cancer", "Vulva Kanseri", "Dış genital kanser"],
    ["Melanoma", "Melanom", "Deri kanseri"],
    ["Basal cell carcinoma", "Bazal Hücreli Karsinom", "BCC"],
    ["Squamous cell carcinoma skin", "Deri Skuamöz Hücreli Karsinom", "SCC"],
    ["Merkel cell carcinoma", "Merkel Hücreli Karsinom", "MCC"],
    [
      "Cutaneous T-cell lymphoma",
      "Kutanöz T Hücreli Lenfoma",
      "CTCL, mikozis fungoides",
    ],
  ];
  return cancers.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla kanser türleri
const generateMoreCancerTypes = () => {
  const cancers = [
    [
      "Head and neck squamous cell carcinoma",
      "Baş Boyun Skuamöz Hücreli Karsinom",
      "HNSCC",
    ],
    ["Nasopharyngeal carcinoma", "Nazofaringeal Karsinom", "NPC"],
    ["Laryngeal cancer", "Larenks Kanseri", "Gırtlak kanseri"],
    ["Thyroid papillary carcinoma", "Tiroid Papiller Karsinom", "PTC"],
    ["Thyroid follicular carcinoma", "Tiroid Foliküler Karsinom", "FTC"],
    ["Medullary thyroid carcinoma", "Medüller Tiroid Karsinom", "MTC"],
    ["Anaplastic thyroid carcinoma", "Anaplastik Tiroid Karsinom", "ATC"],
    ["Adrenocortical carcinoma", "Adrenokortikal Karsinom", "ACC"],
    ["Pheochromocytoma", "Feokromositoma", "Adrenal medulla tümörü"],
    ["Paraganglioma", "Paraganglioma", "Ekstra-adrenal feokromositoma"],
    ["Carcinoid tumor", "Karsinoid Tümör", "Nöroendokrin tümör"],
    [
      "Small bowel adenocarcinoma",
      "İnce Bağırsak Adenokarsinomu",
      "İnce bağırsak kanseri",
    ],
    [
      "Gastrointestinal stromal tumor",
      "Gastrointestinal Stromal Tümör",
      "GIST",
    ],
    ["Soft tissue sarcoma", "Yumuşak Doku Sarkomu", "STS"],
    ["Liposarcoma", "Liposarkom", "Yağ dokusu sarkomu"],
    ["Leiomyosarcoma", "Leyomiyosarkom", "Düz kas sarkomu"],
    ["Rhabdomyosarcoma", "Rabdomiyosarkom", "Çizgili kas sarkomu"],
    ["Synovial sarcoma", "Sinoviyal Sarkom", "Eklem zarı sarkomu"],
    ["Angiosarcoma", "Anjiyosarkom", "Damar sarkomu"],
    ["Kaposi sarcoma", "Kaposi Sarkomu", "HHV-8 ilişkili sarkom"],
    ["Osteosarcoma", "Osteosarkom", "Kemik kanseri"],
    ["Ewing sarcoma", "Ewing Sarkomu", "Kemik/yumuşak doku sarkomu"],
    ["Chondrosarcoma", "Kondrosarkom", "Kıkırdak sarkomu"],
    ["Giant cell tumor of bone", "Kemiğin Dev Hücreli Tümörü", "GCT"],
    [
      "Glioblastoma multiforme",
      "Glioblastoma Multiforme",
      "GBM, grade IV gliom",
    ],
    ["Anaplastic astrocytoma", "Anaplastik Astrositom", "Grade III astrositom"],
    ["Oligodendroglioma", "Oligodendrogliom", "Beyin tümörü"],
    ["Ependymoma", "Ependimom", "Beyin/omurilik tümörü"],
    ["Medulloblastoma", "Medulloblastom", "Pediatrik beyin tümörü"],
    ["Craniopharyngioma", "Kraniyofarinjiom", "Hipofiz bölgesi tümörü"],
    ["Pituitary adenoma", "Hipofiz Adenomu", "Hipofiz tümörü"],
    ["Meningioma", "Menenjiyom", "Beyin zarı tümörü"],
    ["Schwannoma", "Schwannom", "Sinir kılıfı tümörü"],
    ["Neuroblastoma", "Nöroblastom", "Pediatrik adrenal tümör"],
    ["Wilms tumor", "Wilms Tümörü", "Nefroblastom, pediatrik böbrek"],
    ["Retinoblastoma", "Retinoblastom", "Pediatrik göz tümörü"],
    ["Hepatoblastoma", "Hepatoblastom", "Pediatrik karaciğer tümörü"],
    ["Thymoma", "Timoma", "Timus tümörü"],
    ["Thymic carcinoma", "Timik Karsinom", "Timus kanseri"],
    ["Malignant pleural mesothelioma", "Malign Plevral Mezotelyoma", "MPM"],
    [
      "Peritoneal mesothelioma",
      "Peritoneal Mezotelyoma",
      "Karın zarı mezotelyoması",
    ],
    ["Primary peritoneal carcinoma", "Primer Peritoneal Karsinom", "PPC"],
    ["Cancer of unknown primary", "Primeri Bilinmeyen Kanser", "CUP"],
    [
      "Gestational trophoblastic disease",
      "Gestasyonel Trofoblastik Hastalık",
      "GTD",
    ],
    ["Choriocarcinoma", "Koryokarsinom", "Trofoblastik tümör"],
    ["Desmoid tumor", "Desmoid Tümör", "Agresif fibromatoz"],
    [
      "Dermatofibrosarcoma protuberans",
      "Dermatofibrosarkoma Protuberans",
      "DFSP",
    ],
    ["Phyllodes tumor", "Fillodes Tümör", "Meme fibroepitelyal tümör"],
    ["Carcinosarcoma", "Karsinosarkom", "Malign mikst tümör"],
    ["Neuroendocrine carcinoma", "Nöroendokrin Karsinom", "NEC"],
  ];
  return cancers.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Psikiyatrik hastalıklar
const generatePsychiatricDiseases = () => {
  const diseases = [
    [
      "Major depressive disorder",
      "Majör Depresif Bozukluk",
      "Klinik depresyon",
    ],
    ["Persistent depressive disorder", "Kalıcı Depresif Bozukluk", "Distimi"],
    ["Bipolar I disorder", "Bipolar I Bozukluk", "Manik depresif hastalık"],
    ["Bipolar II disorder", "Bipolar II Bozukluk", "Hipomani ve depresyon"],
    ["Cyclothymic disorder", "Siklotimik Bozukluk", "Hafif bipolar"],
    ["Generalized anxiety disorder", "Yaygın Anksiyete Bozukluğu", "YAB"],
    ["Panic disorder", "Panik Bozukluk", "Panik atak"],
    ["Social anxiety disorder", "Sosyal Anksiyete Bozukluğu", "Sosyal fobi"],
    ["Specific phobia", "Özgül Fobi", "Belirli korku"],
    ["Agoraphobia", "Agorafobi", "Alan korkusu"],
    ["Obsessive-compulsive disorder", "Obsesif Kompulsif Bozukluk", "OKB"],
    ["Body dysmorphic disorder", "Beden Dismorfik Bozukluk", "BDB"],
    ["Hoarding disorder", "İstifçilik Bozukluğu", "Biriktirme hastalığı"],
    ["Trichotillomania", "Trikotillomani", "Saç yolma bozukluğu"],
    ["Excoriation disorder", "Ekskoriasyon Bozukluğu", "Deri yolma"],
    [
      "Post-traumatic stress disorder",
      "Travma Sonrası Stres Bozukluğu",
      "TSSB",
    ],
    ["Acute stress disorder", "Akut Stres Bozukluğu", "ASB"],
    ["Adjustment disorder", "Uyum Bozukluğu", "Adaptasyon bozukluğu"],
    ["Reactive attachment disorder", "Reaktif Bağlanma Bozukluğu", "RAD"],
    ["Schizophrenia", "Şizofreni", "Psikotik bozukluk"],
    [
      "Schizoaffective disorder",
      "Şizoaffektif Bozukluk",
      "Şizofreni + duygudurum",
    ],
    [
      "Schizophreniform disorder",
      "Şizofreniform Bozukluk",
      "Kısa süreli şizofreni",
    ],
    ["Brief psychotic disorder", "Kısa Psikotik Bozukluk", "Akut psikoz"],
    ["Delusional disorder", "Sanrısal Bozukluk", "Paranoya"],
    ["Borderline personality disorder", "Sınır Kişilik Bozukluğu", "BPD"],
    ["Antisocial personality disorder", "Antisosyal Kişilik Bozukluğu", "ASPD"],
    [
      "Narcissistic personality disorder",
      "Narsisistik Kişilik Bozukluğu",
      "NPD",
    ],
    ["Histrionic personality disorder", "Histriyonik Kişilik Bozukluğu", "HPD"],
    ["Avoidant personality disorder", "Kaçıngan Kişilik Bozukluğu", "AvPD"],
    ["Dependent personality disorder", "Bağımlı Kişilik Bozukluğu", "DPD"],
    [
      "Obsessive-compulsive personality disorder",
      "Obsesif Kompulsif Kişilik Bozukluğu",
      "OKPB",
    ],
    ["Paranoid personality disorder", "Paranoid Kişilik Bozukluğu", "PPD"],
    ["Schizoid personality disorder", "Şizoid Kişilik Bozukluğu", "SPD"],
    ["Schizotypal personality disorder", "Şizotipal Kişilik Bozukluğu", "STPD"],
    ["Anorexia nervosa", "Anoreksiya Nervoza", "Yeme bozukluğu"],
    ["Bulimia nervosa", "Bulimiya Nervoza", "Yeme bozukluğu"],
    ["Binge eating disorder", "Tıkınırcasına Yeme Bozukluğu", "BED"],
    [
      "Avoidant restrictive food intake disorder",
      "Kaçıngan Kısıtlayıcı Gıda Alım Bozukluğu",
      "ARFID",
    ],
    ["Pica", "Pika", "Yenilemez madde yeme"],
    ["Rumination disorder", "Ruminasyon Bozukluğu", "Geviş getirme"],
    [
      "Attention deficit hyperactivity disorder",
      "Dikkat Eksikliği Hiperaktivite Bozukluğu",
      "DEHB",
    ],
    ["Autism spectrum disorder", "Otizm Spektrum Bozukluğu", "OSB"],
    ["Intellectual disability", "Zihinsel Yetersizlik", "Mental retardasyon"],
    [
      "Specific learning disorder",
      "Özgül Öğrenme Bozukluğu",
      "Disleksi, diskalkuli",
    ],
    ["Tourette syndrome", "Tourette Sendromu", "Tik bozukluğu"],
    ["Conduct disorder", "Davranım Bozukluğu", "Çocukluk davranış sorunu"],
    [
      "Oppositional defiant disorder",
      "Karşı Olma Karşı Gelme Bozukluğu",
      "ODD",
    ],
    [
      "Separation anxiety disorder",
      "Ayrılık Anksiyetesi Bozukluğu",
      "Çocukluk anksiyetesi",
    ],
    ["Selective mutism", "Seçici Konuşmazlık", "Durumsal sessizlik"],
    [
      "Dissociative identity disorder",
      "Dissosiyatif Kimlik Bozukluğu",
      "Çoklu kişilik",
    ],
  ];
  return diseases.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Daha fazla anatomi terimleri
const generateMoreAnatomyTerms = () => {
  const terms = [
    // Kardiyovasküler sistem
    ["Right atrium", "Sağ Atriyum", "Sağ kulakçık"],
    ["Left atrium", "Sol Atriyum", "Sol kulakçık"],
    ["Right ventricle", "Sağ Ventrikül", "Sağ karıncık"],
    ["Left ventricle", "Sol Ventrikül", "Sol karıncık"],
    ["Tricuspid valve", "Triküspit Kapak", "Üç yapraklı kapak"],
    ["Mitral valve", "Mitral Kapak", "İki yapraklı kapak"],
    ["Aortic valve", "Aort Kapağı", "Aort kapağı"],
    ["Pulmonary valve", "Pulmoner Kapak", "Akciğer kapağı"],
    [
      "Interventricular septum",
      "İnterventriküler Septum",
      "Karıncıklar arası duvar",
    ],
    ["Interatrial septum", "İnteratriyal Septum", "Kulakçıklar arası duvar"],
    ["Sinoatrial node", "Sinoatriyal Düğüm", "SA düğümü, kalp pili"],
    ["Atrioventricular node", "Atriyoventriküler Düğüm", "AV düğümü"],
    ["Bundle of His", "His Demeti", "İleti sistemi"],
    ["Purkinje fibers", "Purkinje Lifleri", "İleti sistemi"],
    ["Coronary arteries", "Koroner Arterler", "Kalp damarları"],
    ["Left anterior descending artery", "Sol Ön İnen Arter", "LAD"],
    ["Left circumflex artery", "Sol Sirkumfleks Arter", "LCx"],
    ["Right coronary artery", "Sağ Koroner Arter", "RCA"],
    ["Ascending aorta", "Çıkan Aort", "Aorta ascendens"],
    ["Aortic arch", "Aort Arkı", "Arcus aortae"],
    ["Descending aorta", "İnen Aort", "Aorta descendens"],
    ["Thoracic aorta", "Torasik Aort", "Göğüs aortu"],
    ["Abdominal aorta", "Abdominal Aort", "Karın aortu"],
    ["Common carotid artery", "Ana Karotis Arter", "Boyun ana damarı"],
    ["Internal carotid artery", "İç Karotis Arter", "Beyin besleyen"],
    ["External carotid artery", "Dış Karotis Arter", "Yüz besleyen"],
    ["Vertebral artery", "Vertebral Arter", "Omurga arteri"],
    ["Basilar artery", "Baziler Arter", "Beyin sapı arteri"],
    ["Circle of Willis", "Willis Poligonu", "Beyin damar halkası"],
    ["Subclavian artery", "Subklaviyan Arter", "Köprücük altı arter"],
    ["Axillary artery", "Aksiller Arter", "Koltuk altı arteri"],
    ["Brachial artery", "Brakiyal Arter", "Kol arteri"],
    ["Radial artery", "Radyal Arter", "Döner arter"],
    ["Ulnar artery", "Ulnar Arter", "Dirsek arteri"],
    ["Celiac trunk", "Çölyak Trunk", "Karın organları arteri"],
    [
      "Superior mesenteric artery",
      "Süperior Mezenterik Arter",
      "Üst bağırsak arteri",
    ],
    [
      "Inferior mesenteric artery",
      "İnferior Mezenterik Arter",
      "Alt bağırsak arteri",
    ],
    ["Renal artery", "Renal Arter", "Böbrek arteri"],
    ["Common iliac artery", "Ana İliyak Arter", "Kalça ana arteri"],
    ["External iliac artery", "Dış İliyak Arter", "Bacak arteri"],
    ["Internal iliac artery", "İç İliyak Arter", "Pelvis arteri"],
    ["Femoral artery", "Femoral Arter", "Uyluk arteri"],
    ["Popliteal artery", "Popliteal Arter", "Diz arkası arteri"],
    ["Anterior tibial artery", "Ön Tibial Arter", "Ön baldır arteri"],
    ["Posterior tibial artery", "Arka Tibial Arter", "Arka baldır arteri"],
    ["Dorsalis pedis artery", "Dorsalis Pedis Arter", "Ayak sırtı arteri"],
    ["Superior vena cava", "Süperior Vena Kava", "Üst ana toplardamar"],
    ["Inferior vena cava", "İnferior Vena Kava", "Alt ana toplardamar"],
    ["Jugular vein", "Juguler Ven", "Boyun toplardamarı"],
    ["Portal vein", "Portal Ven", "Karaciğer kapı toplardamarı"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Sindirim sistemi anatomisi
const generateDigestiveAnatomyTerms = () => {
  const terms = [
    ["Oral cavity", "Ağız Boşluğu", "Cavitas oris"],
    ["Hard palate", "Sert Damak", "Palatum durum"],
    ["Soft palate", "Yumuşak Damak", "Palatum molle"],
    ["Uvula", "Küçük Dil", "Uvula"],
    ["Tongue", "Dil", "Lingua"],
    ["Salivary glands", "Tükürük Bezleri", "Glandulae salivariae"],
    ["Parotid gland", "Parotis Bezi", "Kulak altı bezi"],
    ["Submandibular gland", "Submandibular Bez", "Çene altı bezi"],
    ["Sublingual gland", "Sublingual Bez", "Dil altı bezi"],
    ["Pharynx", "Farinks", "Yutak"],
    ["Nasopharynx", "Nazofarinks", "Burun yutağı"],
    ["Oropharynx", "Orofarinks", "Ağız yutağı"],
    ["Laryngopharynx", "Laringofarinks", "Gırtlak yutağı"],
    ["Esophagus", "Özofagus", "Yemek borusu"],
    ["Lower esophageal sphincter", "Alt Özofagus Sfinkteri", "Kardiya"],
    ["Stomach", "Mide", "Gaster"],
    ["Cardia", "Kardiya", "Mide girişi"],
    ["Fundus of stomach", "Mide Fundusu", "Mide kubbesi"],
    ["Body of stomach", "Mide Gövdesi", "Corpus gastricum"],
    ["Pylorus", "Pilor", "Mide çıkışı"],
    ["Pyloric sphincter", "Pilorik Sfinkter", "Mide çıkış kasılması"],
    ["Duodenum", "Duodenum", "Onikiparmak bağırsağı"],
    ["Jejunum", "Jejunum", "Boş bağırsak"],
    ["Ileum", "İleum", "Kıvrım bağırsak"],
    ["Ileocecal valve", "İleoçekal Kapak", "İnce-kalın bağırsak kapağı"],
    ["Cecum", "Çekum", "Kör bağırsak"],
    ["Appendix", "Apendiks", "Kör bağırsak uzantısı"],
    ["Ascending colon", "Çıkan Kolon", "Sağ kolon"],
    ["Transverse colon", "Transvers Kolon", "Yatay kolon"],
    ["Descending colon", "İnen Kolon", "Sol kolon"],
    ["Sigmoid colon", "Sigmoid Kolon", "S şekilli kolon"],
    ["Rectum", "Rektum", "Düz bağırsak"],
    ["Anal canal", "Anal Kanal", "Anüs kanalı"],
    ["Internal anal sphincter", "İç Anal Sfinkter", "İç anüs kası"],
    ["External anal sphincter", "Dış Anal Sfinkter", "Dış anüs kası"],
    ["Liver", "Karaciğer", "Hepar"],
    ["Right lobe of liver", "Karaciğer Sağ Lobu", "Lobus hepatis dexter"],
    ["Left lobe of liver", "Karaciğer Sol Lobu", "Lobus hepatis sinister"],
    ["Caudate lobe", "Kaudat Lob", "Kuyruklu lob"],
    ["Quadrate lobe", "Kuadrat Lob", "Kare lob"],
    ["Hepatic artery", "Hepatik Arter", "Karaciğer arteri"],
    ["Hepatic vein", "Hepatik Ven", "Karaciğer veni"],
    ["Gallbladder", "Safra Kesesi", "Vesica biliaris"],
    ["Common bile duct", "Ana Safra Kanalı", "Ductus choledochus"],
    ["Cystic duct", "Sistik Kanal", "Safra kesesi kanalı"],
    ["Common hepatic duct", "Ana Hepatik Kanal", "Karaciğer kanalı"],
    ["Pancreas", "Pankreas", "Pankreas"],
    ["Pancreatic head", "Pankreas Başı", "Caput pancreatis"],
    ["Pancreatic body", "Pankreas Gövdesi", "Corpus pancreatis"],
    ["Pancreatic tail", "Pankreas Kuyruğu", "Cauda pancreatis"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Solunum sistemi anatomisi
const generateRespiratoryAnatomyTerms = () => {
  const terms = [
    ["Nasal cavity", "Burun Boşluğu", "Cavitas nasi"],
    ["Nasal septum", "Burun Septumu", "Septum nasi"],
    ["Nasal conchae", "Burun Konkaları", "Conchae nasales"],
    ["Paranasal sinuses", "Paranazal Sinüsler", "Yüz sinüsleri"],
    ["Maxillary sinus", "Maksiller Sinüs", "Üst çene sinüsü"],
    ["Frontal sinus", "Frontal Sinüs", "Alın sinüsü"],
    ["Ethmoid sinus", "Etmoid Sinüs", "Kalbur sinüsü"],
    ["Sphenoid sinus", "Sfenoid Sinüs", "Kama sinüsü"],
    ["Larynx", "Larinks", "Gırtlak"],
    ["Epiglottis", "Epiglot", "Gırtlak kapağı"],
    ["Thyroid cartilage", "Tiroid Kıkırdak", "Adem elması"],
    ["Cricoid cartilage", "Krikoid Kıkırdak", "Yüzük kıkırdak"],
    ["Arytenoid cartilage", "Aritenoid Kıkırdak", "İbrik kıkırdak"],
    ["Vocal cords", "Ses Telleri", "Plicae vocales"],
    ["Glottis", "Glottis", "Ses yarığı"],
    ["Trachea", "Trakea", "Nefes borusu"],
    ["Carina", "Karina", "Trakea çatalı"],
    ["Main bronchi", "Ana Bronşlar", "Bronchi principales"],
    ["Right main bronchus", "Sağ Ana Bronş", "Bronchus principalis dexter"],
    ["Left main bronchus", "Sol Ana Bronş", "Bronchus principalis sinister"],
    ["Lobar bronchi", "Lober Bronşlar", "Lob bronşları"],
    ["Segmental bronchi", "Segmental Bronşlar", "Segment bronşları"],
    ["Bronchioles", "Bronşiyoller", "Küçük bronşlar"],
    ["Terminal bronchioles", "Terminal Bronşiyoller", "Son bronşiyoller"],
    [
      "Respiratory bronchioles",
      "Respiratuar Bronşiyoller",
      "Solunum bronşiyolleri",
    ],
    ["Alveolar ducts", "Alveoler Kanallar", "Hava kesesi kanalları"],
    ["Alveolar sacs", "Alveoler Keseler", "Hava keseleri"],
    ["Alveoli", "Alveoller", "Hava keseleri"],
    ["Right lung", "Sağ Akciğer", "Pulmo dexter"],
    ["Left lung", "Sol Akciğer", "Pulmo sinister"],
    ["Superior lobe", "Üst Lob", "Lobus superior"],
    ["Middle lobe", "Orta Lob", "Lobus medius"],
    ["Inferior lobe", "Alt Lob", "Lobus inferior"],
    ["Hilum of lung", "Akciğer Hilumu", "Akciğer kapısı"],
    ["Pulmonary artery", "Pulmoner Arter", "Akciğer arteri"],
    ["Pulmonary vein", "Pulmoner Ven", "Akciğer veni"],
    ["Pleura", "Plevra", "Akciğer zarı"],
    ["Visceral pleura", "Visseral Plevra", "İç akciğer zarı"],
    ["Parietal pleura", "Parietal Plevra", "Dış akciğer zarı"],
    ["Pleural cavity", "Plevral Boşluk", "Akciğer zarı boşluğu"],
    ["Diaphragm", "Diyafram", "Karın-göğüs zarı"],
    ["Central tendon", "Santral Tendon", "Diyafram merkez tendonu"],
    ["Intercostal muscles", "İnterkostal Kaslar", "Kaburga arası kaslar"],
    ["External intercostals", "Dış İnterkostaller", "Dış kaburga arası kaslar"],
    ["Internal intercostals", "İç İnterkostaller", "İç kaburga arası kaslar"],
    [
      "Accessory respiratory muscles",
      "Yardımcı Solunum Kasları",
      "Ek solunum kasları",
    ],
    ["Scalene muscles", "Skalen Kaslar", "Boyun kasları"],
    ["Sternocleidomastoid", "Sternokleidomastoid", "Boyun kası"],
    ["Mediastinum", "Mediastinum", "Göğüs orta bölümü"],
    ["Thoracic cavity", "Torasik Kavite", "Göğüs boşluğu"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Üriner sistem anatomisi
const generateUrinaryAnatomyTerms = () => {
  const terms = [
    ["Kidney", "Böbrek", "Ren"],
    ["Renal cortex", "Böbrek Korteksi", "Böbrek kabuğu"],
    ["Renal medulla", "Böbrek Medullası", "Böbrek özü"],
    ["Renal pyramids", "Böbrek Piramitleri", "Medulla piramitleri"],
    ["Renal columns", "Böbrek Kolonları", "Bertin kolonları"],
    ["Renal pelvis", "Böbrek Pelvisi", "Böbrek havuzu"],
    ["Major calyces", "Major Kaliksler", "Büyük böbrek kadehleri"],
    ["Minor calyces", "Minor Kaliksler", "Küçük böbrek kadehleri"],
    ["Nephron", "Nefron", "Böbrek fonksiyonel birimi"],
    ["Glomerulus", "Glomerül", "Böbrek yumağı"],
    ["Bowman capsule", "Bowman Kapsülü", "Glomerül kapsülü"],
    ["Proximal convoluted tubule", "Proksimal Kıvrımlı Tübül", "PKT"],
    ["Loop of Henle", "Henle Kulpu", "Henle halkası"],
    ["Distal convoluted tubule", "Distal Kıvrımlı Tübül", "DKT"],
    ["Collecting duct", "Toplayıcı Kanal", "Toplama kanalı"],
    ["Juxtaglomerular apparatus", "Jukstaglomerüler Aparat", "JGA"],
    ["Macula densa", "Makula Densa", "Yoğun leke"],
    ["Afferent arteriole", "Afferent Arteriyol", "Getirici arteriyol"],
    ["Efferent arteriole", "Efferent Arteriyol", "Götürücü arteriyol"],
    [
      "Peritubular capillaries",
      "Peritübüler Kapillerler",
      "Tübül çevresi kılcallar",
    ],
    ["Vasa recta", "Vasa Rekta", "Düz damarlar"],
    ["Ureter", "Üreter", "İdrar borusu"],
    ["Urinary bladder", "Mesane", "İdrar kesesi"],
    ["Detrusor muscle", "Detrüsör Kası", "Mesane kası"],
    ["Trigone", "Trigon", "Mesane üçgeni"],
    [
      "Internal urethral sphincter",
      "İç Üretral Sfinkter",
      "İç idrar yolu kası",
    ],
    [
      "External urethral sphincter",
      "Dış Üretral Sfinkter",
      "Dış idrar yolu kası",
    ],
    ["Urethra", "Üretra", "İdrar yolu"],
    ["Male urethra", "Erkek Üretrası", "Erkek idrar yolu"],
    ["Female urethra", "Kadın Üretrası", "Kadın idrar yolu"],
    ["Prostatic urethra", "Prostatik Üretra", "Prostat içi üretra"],
    ["Membranous urethra", "Membranöz Üretra", "Zarlı üretra"],
    ["Spongy urethra", "Süngerimsi Üretra", "Penis üretrası"],
    ["External urethral orifice", "Dış Üretral Orifis", "İdrar yolu ağzı"],
    ["Adrenal gland", "Adrenal Bez", "Böbrek üstü bezi"],
    ["Adrenal cortex", "Adrenal Korteks", "Böbrek üstü kabuğu"],
    ["Adrenal medulla", "Adrenal Medulla", "Böbrek üstü özü"],
    ["Zona glomerulosa", "Zona Glomeruloza", "Dış korteks tabakası"],
    ["Zona fasciculata", "Zona Fasikulata", "Orta korteks tabakası"],
    ["Zona reticularis", "Zona Retikularis", "İç korteks tabakası"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Üreme sistemi anatomisi
const generateReproductiveAnatomyTerms = () => {
  const terms = [
    // Erkek üreme sistemi
    ["Testis", "Testis", "Erkek üreme bezi"],
    ["Seminiferous tubules", "Seminifer Tübüller", "Sperm üretim kanalları"],
    ["Leydig cells", "Leydig Hücreleri", "Testosteron üreten hücreler"],
    ["Sertoli cells", "Sertoli Hücreleri", "Destek hücreleri"],
    ["Epididymis", "Epididimis", "Testis üstü"],
    ["Vas deferens", "Vas Deferens", "Sperm kanalı"],
    ["Ejaculatory duct", "Ejakülatör Kanal", "Boşalma kanalı"],
    ["Seminal vesicle", "Seminal Vezikül", "Meni kesesi"],
    ["Prostate gland", "Prostat Bezi", "Prostat"],
    ["Bulbourethral gland", "Bulboüretral Bez", "Cowper bezi"],
    ["Penis", "Penis", "Erkek cinsel organı"],
    ["Corpus cavernosum", "Korpus Kavernozum", "Kavernöz cisim"],
    ["Corpus spongiosum", "Korpus Spongiozum", "Süngerimsi cisim"],
    ["Glans penis", "Glans Penis", "Penis başı"],
    ["Prepuce", "Prepus", "Sünnet derisi"],
    ["Scrotum", "Skrotum", "Testis torbası"],
    // Kadın üreme sistemi
    ["Ovary", "Over", "Yumurtalık"],
    ["Ovarian follicle", "Over Folikülü", "Yumurta kesesi"],
    ["Corpus luteum", "Korpus Luteum", "Sarı cisim"],
    ["Fallopian tube", "Fallop Tüpü", "Yumurta kanalı"],
    ["Fimbriae", "Fimbriyalar", "Tüp saçakları"],
    ["Ampulla of uterine tube", "Tuba Ampullası", "Tüp genişlemesi"],
    ["Isthmus of uterine tube", "Tuba İstmusu", "Tüp dar bölümü"],
    ["Uterus", "Uterus", "Rahim"],
    ["Fundus of uterus", "Uterus Fundusu", "Rahim tabanı"],
    ["Body of uterus", "Uterus Gövdesi", "Rahim gövdesi"],
    ["Cervix", "Serviks", "Rahim ağzı"],
    ["Endometrium", "Endometriyum", "Rahim iç zarı"],
    ["Myometrium", "Miyometriyum", "Rahim kas tabakası"],
    ["Perimetrium", "Perimetriyum", "Rahim dış zarı"],
    ["Vagina", "Vajina", "Dölyolu"],
    ["Vaginal fornix", "Vajinal Forniks", "Vajina çıkmazı"],
    ["Hymen", "Himen", "Kızlık zarı"],
    ["Vulva", "Vulva", "Dış genital organlar"],
    ["Labia majora", "Labia Majora", "Büyük dudaklar"],
    ["Labia minora", "Labia Minora", "Küçük dudaklar"],
    ["Clitoris", "Klitoris", "Bızır"],
    ["Vestibule", "Vestibül", "Vajina girişi"],
    ["Bartholin glands", "Bartholin Bezleri", "Büyük vestibüler bezler"],
    ["Mammary gland", "Meme Bezi", "Süt bezi"],
    ["Nipple", "Meme Başı", "Papilla mammaria"],
    ["Areola", "Areola", "Meme başı çevresi"],
    ["Lactiferous ducts", "Süt Kanalları", "Ductus lactiferi"],
    ["Placenta", "Plasenta", "Eş"],
    ["Umbilical cord", "Göbek Kordonu", "Göbek bağı"],
    ["Amniotic sac", "Amniyotik Kese", "Su kesesi"],
    ["Amniotic fluid", "Amniyotik Sıvı", "Bebek suyu"],
  ];
  return terms.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.ANATOMY, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Benzersiz Terimler Yükleme Başlıyor...\n");
  console.log("═".repeat(60));

  console.log("📝 Terimler oluşturuluyor...");

  const dermatologicalDrugs = generateDermatologicalDrugs();
  const ophthalmicDrugs = generateOphthalmicDrugs();
  const oticDrugs = generateOticDrugs();
  const nasalDrugs = generateNasalDrugs();
  const hematologicalDrugs = generateHematologicalDrugs();
  const rheumatologicalDrugs = generateRheumatologicalDrugs();
  const urologicalDrugs = generateUrologicalDrugs();
  const gynecologicalDrugs = generateGynecologicalDrugs();
  const pediatricDiseases = generatePediatricDiseases();
  const geneticDiseases = generateGeneticDiseases();
  const cancerTypes = generateCancerTypes();
  const moreCancerTypes = generateMoreCancerTypes();
  const psychiatricDiseases = generatePsychiatricDiseases();
  const moreAnatomyTerms = generateMoreAnatomyTerms();
  const digestiveAnatomyTerms = generateDigestiveAnatomyTerms();
  const respiratoryAnatomyTerms = generateRespiratoryAnatomyTerms();
  const urinaryAnatomyTerms = generateUrinaryAnatomyTerms();
  const reproductiveAnatomyTerms = generateReproductiveAnatomyTerms();

  const allTerms = [
    ...dermatologicalDrugs,
    ...ophthalmicDrugs,
    ...oticDrugs,
    ...nasalDrugs,
    ...hematologicalDrugs,
    ...rheumatologicalDrugs,
    ...urologicalDrugs,
    ...gynecologicalDrugs,
    ...pediatricDiseases,
    ...geneticDiseases,
    ...cancerTypes,
    ...moreCancerTypes,
    ...psychiatricDiseases,
    ...moreAnatomyTerms,
    ...digestiveAnatomyTerms,
    ...respiratoryAnatomyTerms,
    ...urinaryAnatomyTerms,
    ...reproductiveAnatomyTerms,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Dermatolojik İlaçlar: ${dermatologicalDrugs.length}`);
  console.log(`   Oftalmik İlaçlar: ${ophthalmicDrugs.length}`);
  console.log(`   Otik İlaçlar: ${oticDrugs.length}`);
  console.log(`   Nazal İlaçlar: ${nasalDrugs.length}`);
  console.log(`   Hematolojik İlaçlar: ${hematologicalDrugs.length}`);
  console.log(`   Romatolojik İlaçlar: ${rheumatologicalDrugs.length}`);
  console.log(`   Ürolojik İlaçlar: ${urologicalDrugs.length}`);
  console.log(`   Jinekolojik İlaçlar: ${gynecologicalDrugs.length}`);
  console.log(`   Pediatrik Hastalıklar: ${pediatricDiseases.length}`);
  console.log(`   Genetik Hastalıklar: ${geneticDiseases.length}`);
  console.log(`   Kanser Türleri: ${cancerTypes.length}`);
  console.log(`   Daha Fazla Kanser: ${moreCancerTypes.length}`);
  console.log(`   Psikiyatrik Hastalıklar: ${psychiatricDiseases.length}`);
  console.log(`   Kardiyovasküler Anatomi: ${moreAnatomyTerms.length}`);
  console.log(`   Sindirim Anatomisi: ${digestiveAnatomyTerms.length}`);
  console.log(`   Solunum Anatomisi: ${respiratoryAnatomyTerms.length}`);
  console.log(`   Üriner Anatomi: ${urinaryAnatomyTerms.length}`);
  console.log(`   Üreme Anatomisi: ${reproductiveAnatomyTerms.length}`);
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
