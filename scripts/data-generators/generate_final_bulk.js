// Final toplu terim üretme scripti - 10,000 terime ulaşmak için
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
// Psikiyatri ilaçları
const generatePsychiatricDrugs = () => {
  const drugs = [];
  const drugList = [
    // Antipsikotikler
    ["Haloperidol", "Haloperidol", "Tipik antipsikotik"],
    ["Chlorpromazine", "Klorpromazin", "Tipik antipsikotik"],
    ["Fluphenazine", "Flufenazin", "Tipik antipsikotik"],
    ["Perphenazine", "Perfenazin", "Tipik antipsikotik"],
    ["Thioridazine", "Tiyoridazin", "Tipik antipsikotik"],
    ["Thiothixene", "Tiyotiksene", "Tipik antipsikotik"],
    ["Loxapine", "Loksapin", "Tipik antipsikotik"],
    ["Molindone", "Molindon", "Tipik antipsikotik"],
    ["Pimozide", "Pimozid", "Tipik antipsikotik, Tourette"],
    ["Risperidone", "Risperidon", "Atipik antipsikotik"],
    ["Paliperidone", "Paliperidon", "Atipik antipsikotik"],
    ["Olanzapine", "Olanzapin", "Atipik antipsikotik"],
    ["Quetiapine", "Ketiapin", "Atipik antipsikotik"],
    ["Ziprasidone", "Ziprasidon", "Atipik antipsikotik"],
    ["Aripiprazole", "Aripiprazol", "Atipik antipsikotik"],
    ["Brexpiprazole", "Breksipiprazol", "Atipik antipsikotik"],
    ["Cariprazine", "Kariprazin", "Atipik antipsikotik"],
    ["Asenapine", "Asenapin", "Atipik antipsikotik"],
    ["Iloperidone", "İloperidon", "Atipik antipsikotik"],
    ["Lurasidone", "Lurasidon", "Atipik antipsikotik"],
    ["Clozapine", "Klozapin", "Atipik antipsikotik, dirençli şizofreni"],
    ["Pimavanserin", "Pimavanserin", "Parkinson psikozu"],
    ["Lumateperone", "Lumateperon", "Atipik antipsikotik"],
    // Anksiyolitikler
    ["Buspirone", "Buspiron", "Non-benzodiazepin anksiyolitik"],
    ["Hydroxyzine", "Hidroksizin", "Antihistaminik anksiyolitik"],
    ["Chlordiazepoxide", "Klordiazepoksit", "Benzodiazepin"],
    ["Oxazepam", "Oksazepam", "Benzodiazepin"],
    ["Temazepam", "Temazepam", "Benzodiazepin hipnotik"],
    ["Triazolam", "Triazolam", "Benzodiazepin hipnotik"],
    ["Flurazepam", "Flurazepam", "Benzodiazepin hipnotik"],
    ["Estazolam", "Estazolam", "Benzodiazepin hipnotik"],
    ["Quazepam", "Kuazepam", "Benzodiazepin hipnotik"],
    // Hipnotikler
    ["Zolpidem", "Zolpidem", "Z-ilaç hipnotik"],
    ["Zaleplon", "Zaleplon", "Z-ilaç hipnotik"],
    ["Eszopiclone", "Eszopiklon", "Z-ilaç hipnotik"],
    ["Ramelteon", "Ramelteon", "Melatonin reseptör agonisti"],
    ["Suvorexant", "Suvoreksant", "Oreksin antagonisti"],
    ["Lemborexant", "Lemboreksant", "Oreksin antagonisti"],
    ["Daridorexant", "Daridoreksant", "Oreksin antagonisti"],
    ["Doxepin low-dose", "Düşük Doz Doksepin", "Hipnotik"],
    // DEHB ilaçları
    ["Methylphenidate", "Metilfenidat", "Stimülan, DEHB"],
    ["Dexmethylphenidate", "Deksmetilfenidat", "Stimülan, DEHB"],
    ["Amphetamine", "Amfetamin", "Stimülan, DEHB"],
    ["Dextroamphetamine", "Dekstroamfetamin", "Stimülan, DEHB"],
    ["Lisdexamfetamine", "Lisdeksamfetamin", "Stimülan ön ilacı, DEHB"],
    ["Atomoxetine", "Atomoksetin", "Non-stimülan, DEHB"],
    ["Viloxazine", "Viloksazin", "Non-stimülan, DEHB"],
    ["Guanfacine", "Guanfasin", "Alfa-2 agonist, DEHB"],
    ["Clonidine", "Klonidin", "Alfa-2 agonist, DEHB, hipertansiyon"],
    // Madde bağımlılığı
    ["Naltrexone", "Naltrekson", "Opioid antagonisti, alkol bağımlılığı"],
    ["Acamprosate", "Akamprosat", "Alkol bağımlılığı"],
    ["Disulfiram", "Disülfiram", "Alkol bağımlılığı, aversif"],
    ["Buprenorphine", "Buprenorfin", "Opioid kısmi agonist"],
    ["Methadone", "Metadon", "Opioid agonist, bağımlılık tedavisi"],
    ["Lofexidine", "Lofeksidin", "Opioid yoksunluk tedavisi"],
    ["Varenicline", "Vareniklin", "Sigara bırakma"],
    ["Bupropion", "Bupropion", "Sigara bırakma, antidepresan"],
    ["Nicotine replacement", "Nikotin Replasman", "Sigara bırakma"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Ağrı kesiciler ve analjezikler
const generateAnalgesics = () => {
  const drugs = [];
  const drugList = [
    // NSAİİ'ler
    ["Aspirin", "Aspirin", "Asetilsalisilik asit, NSAİİ"],
    ["Ibuprofen", "İbuprofen", "NSAİİ"],
    ["Naproxen", "Naproksen", "NSAİİ"],
    ["Diclofenac", "Diklofenak", "NSAİİ"],
    ["Indomethacin", "İndometasin", "NSAİİ"],
    ["Ketorolac", "Ketorolak", "NSAİİ, güçlü analjezik"],
    ["Piroxicam", "Piroksikam", "NSAİİ"],
    ["Meloxicam", "Meloksikam", "COX-2 selektif NSAİİ"],
    ["Celecoxib", "Selekoksib", "COX-2 inhibitörü"],
    ["Etoricoxib", "Etorikoksib", "COX-2 inhibitörü"],
    ["Sulindac", "Sulindak", "NSAİİ"],
    ["Etodolac", "Etodolak", "NSAİİ"],
    ["Nabumetone", "Nabumeton", "NSAİİ"],
    ["Oxaprozin", "Oksaprozin", "NSAİİ"],
    ["Fenoprofen", "Fenoprofen", "NSAİİ"],
    ["Flurbiprofen", "Flurbiprofen", "NSAİİ"],
    ["Ketoprofen", "Ketoprofen", "NSAİİ"],
    ["Mefenamic acid", "Mefenamik Asit", "NSAİİ"],
    ["Tolmetin", "Tolmetin", "NSAİİ"],
    // Asetaminofen
    ["Acetaminophen", "Asetaminofen", "Parasetamol, analjezik, antipiretik"],
    // Opioidler
    ["Morphine", "Morfin", "Güçlü opioid analjezik"],
    ["Oxycodone", "Oksikodon", "Opioid analjezik"],
    ["Hydrocodone", "Hidrokodon", "Opioid analjezik"],
    ["Hydromorphone", "Hidromorfon", "Güçlü opioid analjezik"],
    ["Oxymorphone", "Oksimorfon", "Güçlü opioid analjezik"],
    ["Fentanyl", "Fentanil", "Sentetik opioid"],
    ["Methadone", "Metadon", "Uzun etkili opioid"],
    ["Buprenorphine", "Buprenorfin", "Kısmi opioid agonist"],
    ["Tramadol", "Tramadol", "Zayıf opioid, SNRI"],
    ["Tapentadol", "Tapentadol", "Opioid, norepinefrin geri alım inhibitörü"],
    ["Codeine", "Kodein", "Zayıf opioid"],
    ["Meperidine", "Meperidin", "Opioid analjezik"],
    ["Levorphanol", "Levorfanol", "Opioid analjezik"],
    ["Pentazocine", "Pentazosin", "Opioid agonist-antagonist"],
    ["Butorphanol", "Butorfanol", "Opioid agonist-antagonist"],
    ["Nalbuphine", "Nalbufin", "Opioid agonist-antagonist"],
    // Nöropatik ağrı
    ["Gabapentin", "Gabapentin", "Nöropatik ağrı, epilepsi"],
    ["Pregabalin", "Pregabalin", "Nöropatik ağrı, epilepsi"],
    ["Duloxetine", "Duloksetin", "SNRI, nöropatik ağrı"],
    ["Amitriptyline", "Amitriptilin", "TCA, nöropatik ağrı"],
    ["Nortriptyline", "Nortriptilin", "TCA, nöropatik ağrı"],
    ["Carbamazepine", "Karbamazepin", "Trigeminal nevralji"],
    ["Oxcarbazepine", "Okskarbazepin", "Trigeminal nevralji"],
    ["Capsaicin", "Kapsaisin", "Topikal analjezik"],
    ["Lidocaine patch", "Lidokain Yama", "Topikal analjezik"],
    // Migren
    ["Sumatriptan", "Sumatriptan", "Triptan, migren"],
    ["Rizatriptan", "Rizatriptan", "Triptan, migren"],
    ["Zolmitriptan", "Zolmitriptan", "Triptan, migren"],
    ["Eletriptan", "Eletriptan", "Triptan, migren"],
    ["Naratriptan", "Naratriptan", "Triptan, migren"],
    ["Almotriptan", "Almotriptan", "Triptan, migren"],
    ["Frovatriptan", "Frovatriptan", "Triptan, migren"],
    ["Lasmiditan", "Lasmiditan", "5-HT1F agonist, migren"],
    ["Ubrogepant", "Ubrogepant", "CGRP antagonist, migren"],
    ["Rimegepant", "Rimegepant", "CGRP antagonist, migren"],
    ["Erenumab", "Erenumab", "Anti-CGRP, migren profilaksisi"],
    ["Fremanezumab", "Fremanezumab", "Anti-CGRP, migren profilaksisi"],
    ["Galcanezumab", "Galkanezumab", "Anti-CGRP, migren profilaksisi"],
    ["Eptinezumab", "Eptinezumab", "Anti-CGRP, migren profilaksisi"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Diyabet ilaçları
const generateDiabetesDrugs = () => {
  const drugs = [];
  const drugList = [
    // İnsülinler
    ["Insulin lispro", "İnsülin Lispro", "Hızlı etkili insülin"],
    ["Insulin aspart", "İnsülin Aspart", "Hızlı etkili insülin"],
    ["Insulin glulisine", "İnsülin Glulisin", "Hızlı etkili insülin"],
    ["Regular insulin", "Regüler İnsülin", "Kısa etkili insülin"],
    ["NPH insulin", "NPH İnsülin", "Orta etkili insülin"],
    ["Insulin glargine", "İnsülin Glarjin", "Uzun etkili insülin"],
    ["Insulin detemir", "İnsülin Detemir", "Uzun etkili insülin"],
    ["Insulin degludec", "İnsülin Degludek", "Ultra uzun etkili insülin"],
    [
      "Insulin glargine U-300",
      "İnsülin Glarjin U-300",
      "Konsantre uzun etkili",
    ],
    // Biguanidler
    ["Metformin", "Metformin", "Biguanid, birinci basamak"],
    // Sülfonilüreler
    ["Glipizide", "Glipizid", "Sülfonilüre"],
    ["Glyburide", "Glibürid", "Sülfonilüre"],
    ["Glimepiride", "Glimepirid", "Sülfonilüre"],
    ["Glibenclamide", "Glibenklamid", "Sülfonilüre"],
    ["Gliclazide", "Gliklazid", "Sülfonilüre"],
    // Meglitinidler
    ["Repaglinide", "Repaglinid", "Meglitinid"],
    ["Nateglinide", "Nateglinid", "Meglitinid"],
    // Tiyazolidindionlar
    ["Pioglitazone", "Pioglitazon", "TZD, insülin duyarlaştırıcı"],
    ["Rosiglitazone", "Rosiglitazon", "TZD, insülin duyarlaştırıcı"],
    // DPP-4 inhibitörleri
    ["Sitagliptin", "Sitagliptin", "DPP-4 inhibitörü"],
    ["Saxagliptin", "Saksagliptin", "DPP-4 inhibitörü"],
    ["Linagliptin", "Linagliptin", "DPP-4 inhibitörü"],
    ["Alogliptin", "Alogliptin", "DPP-4 inhibitörü"],
    ["Vildagliptin", "Vildagliptin", "DPP-4 inhibitörü"],
    // GLP-1 agonistleri
    ["Exenatide", "Eksenatid", "GLP-1 agonisti"],
    ["Liraglutide", "Liraglutid", "GLP-1 agonisti"],
    ["Dulaglutide", "Dulaglutid", "GLP-1 agonisti"],
    ["Semaglutide", "Semaglutid", "GLP-1 agonisti"],
    ["Lixisenatide", "Liksisenatid", "GLP-1 agonisti"],
    ["Tirzepatide", "Tirzepatid", "GIP/GLP-1 agonisti"],
    // SGLT2 inhibitörleri
    ["Canagliflozin", "Kanagliflozin", "SGLT2 inhibitörü"],
    ["Dapagliflozin", "Dapagliflozin", "SGLT2 inhibitörü"],
    ["Empagliflozin", "Empagliflozin", "SGLT2 inhibitörü"],
    ["Ertugliflozin", "Ertugliflozin", "SGLT2 inhibitörü"],
    // Alfa-glukozidaz inhibitörleri
    ["Acarbose", "Akarboz", "Alfa-glukozidaz inhibitörü"],
    ["Miglitol", "Miglitol", "Alfa-glukozidaz inhibitörü"],
    // Diğer
    ["Pramlintide", "Pramlintid", "Amilin analoğu"],
    ["Colesevelam", "Kolesevelam", "Safra asidi bağlayıcı, diyabet"],
    ["Bromocriptine", "Bromokriptin", "Dopamin agonisti, diyabet"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Lipid düşürücü ilaçlar
const generateLipidDrugs = () => {
  const drugs = [];
  const drugList = [
    // Statinler
    ["Atorvastatin", "Atorvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Rosuvastatin", "Rosuvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Simvastatin", "Simvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Pravastatin", "Pravastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Lovastatin", "Lovastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Fluvastatin", "Fluvastatin", "HMG-CoA redüktaz inhibitörü"],
    ["Pitavastatin", "Pitavastatin", "HMG-CoA redüktaz inhibitörü"],
    // Ezetimib
    ["Ezetimibe", "Ezetimib", "Kolesterol emilim inhibitörü"],
    // PCSK9 inhibitörleri
    ["Evolocumab", "Evolokumab", "PCSK9 inhibitörü"],
    ["Alirocumab", "Alirokumab", "PCSK9 inhibitörü"],
    ["Inclisiran", "İnklisiran", "PCSK9 siRNA"],
    // Fibratlar
    ["Fenofibrate", "Fenofibrat", "Fibrat, trigliserid düşürücü"],
    ["Gemfibrozil", "Gemfibrozil", "Fibrat, trigliserid düşürücü"],
    // Niasin
    ["Niacin", "Niasin", "B3 vitamini, lipid düşürücü"],
    // Omega-3
    [
      "Omega-3 acid ethyl esters",
      "Omega-3 Asit Etil Esterleri",
      "Trigliserid düşürücü",
    ],
    ["Icosapent ethyl", "İkosapent Etil", "EPA, kardiyovasküler koruma"],
    // Safra asidi bağlayıcılar
    ["Cholestyramine", "Kolestiramin", "Safra asidi bağlayıcı"],
    ["Colestipol", "Kolestipol", "Safra asidi bağlayıcı"],
    ["Colesevelam", "Kolesevelam", "Safra asidi bağlayıcı"],
    // Bempedoik asit
    ["Bempedoic acid", "Bempedoik Asit", "ACL inhibitörü"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Antikoagülanlar ve antitrombotikler
const generateAnticoagulants = () => {
  const drugs = [];
  const drugList = [
    // Heparinler
    ["Unfractionated heparin", "Fraksiyone Olmamış Heparin", "UFH"],
    ["Enoxaparin", "Enoksaparin", "DMAH"],
    ["Dalteparin", "Dalteparin", "DMAH"],
    ["Tinzaparin", "Tinzaparin", "DMAH"],
    ["Fondaparinux", "Fondaparinuks", "Faktör Xa inhibitörü"],
    // Vitamin K antagonistleri
    ["Warfarin", "Varfarin", "Vitamin K antagonisti"],
    // DOAK'lar
    ["Dabigatran", "Dabigatran", "Direkt trombin inhibitörü"],
    ["Rivaroxaban", "Rivaroksaban", "Faktör Xa inhibitörü"],
    ["Apixaban", "Apiksaban", "Faktör Xa inhibitörü"],
    ["Edoxaban", "Edoksaban", "Faktör Xa inhibitörü"],
    ["Betrixaban", "Betriksaban", "Faktör Xa inhibitörü"],
    // Direkt trombin inhibitörleri
    ["Argatroban", "Argatroban", "Direkt trombin inhibitörü"],
    ["Bivalirudin", "Bivalirudin", "Direkt trombin inhibitörü"],
    // Antidotlar
    ["Protamine", "Protamin", "Heparin antidotu"],
    ["Idarucizumab", "İdarusizumab", "Dabigatran antidotu"],
    ["Andexanet alfa", "Andeksanet Alfa", "Faktör Xa inhibitörü antidotu"],
    // Antiplatelet ajanlar
    ["Aspirin", "Aspirin", "COX inhibitörü, antiplatelet"],
    ["Clopidogrel", "Klopidogrel", "P2Y12 inhibitörü"],
    ["Prasugrel", "Prasugrel", "P2Y12 inhibitörü"],
    ["Ticagrelor", "Tikagrelor", "P2Y12 inhibitörü"],
    ["Cangrelor", "Kangrelor", "IV P2Y12 inhibitörü"],
    ["Dipyridamole", "Dipiridamol", "Fosfodiesteraz inhibitörü"],
    ["Cilostazol", "Silostazol", "PDE3 inhibitörü"],
    ["Vorapaxar", "Vorapaksar", "PAR-1 antagonisti"],
    // GP IIb/IIIa inhibitörleri
    ["Abciximab", "Absiksimab", "GP IIb/IIIa inhibitörü"],
    ["Eptifibatide", "Eptifibatid", "GP IIb/IIIa inhibitörü"],
    ["Tirofiban", "Tirofiban", "GP IIb/IIIa inhibitörü"],
    // Trombolitikler
    ["Alteplase", "Alteplaz", "tPA, trombolitik"],
    ["Reteplase", "Reteplaz", "Trombolitik"],
    ["Tenecteplase", "Tenekteplaz", "Trombolitik"],
    ["Streptokinase", "Streptokinaz", "Trombolitik"],
    ["Urokinase", "Ürokinaz", "Trombolitik"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Oftalmik ilaçlar
const generateOphthalmicDrugs = () => {
  const drugs = [];
  const drugList = [
    // Glokom ilaçları
    ["Timolol ophthalmic", "Oftalmik Timolol", "Beta bloker, glokom"],
    ["Betaxolol ophthalmic", "Oftalmik Betaksolol", "Beta bloker, glokom"],
    ["Levobunolol", "Levobunolol", "Beta bloker, glokom"],
    ["Carteolol ophthalmic", "Oftalmik Karteolol", "Beta bloker, glokom"],
    ["Latanoprost", "Latanoprost", "Prostaglandin analoğu, glokom"],
    ["Travoprost", "Travoprost", "Prostaglandin analoğu, glokom"],
    ["Bimatoprost", "Bimatoprost", "Prostaglandin analoğu, glokom"],
    ["Tafluprost", "Tafluprost", "Prostaglandin analoğu, glokom"],
    ["Latanoprostene bunod", "Latanoprosten Bunod", "NO donör prostaglandin"],
    ["Brimonidine", "Brimonidin", "Alfa-2 agonist, glokom"],
    ["Apraclonidine", "Apraklonidin", "Alfa-2 agonist, glokom"],
    ["Dorzolamide", "Dorzolamid", "Karbonik anhidraz inhibitörü"],
    ["Brinzolamide", "Brinzolamid", "Karbonik anhidraz inhibitörü"],
    ["Pilocarpine ophthalmic", "Oftalmik Pilokarpin", "Kolinerjik, glokom"],
    ["Netarsudil", "Netarsudil", "Rho kinaz inhibitörü, glokom"],
    // Antiinflamatuar
    [
      "Prednisolone ophthalmic",
      "Oftalmik Prednizolon",
      "Kortikosteroid göz damlası",
    ],
    [
      "Dexamethasone ophthalmic",
      "Oftalmik Deksametazon",
      "Kortikosteroid göz damlası",
    ],
    ["Loteprednol", "Loteprednol", "Kortikosteroid göz damlası"],
    ["Fluorometholone", "Florometolon", "Kortikosteroid göz damlası"],
    ["Difluprednate", "Difluprednate", "Kortikosteroid göz damlası"],
    ["Ketorolac ophthalmic", "Oftalmik Ketorolak", "NSAİİ göz damlası"],
    ["Nepafenac", "Nepafenac", "NSAİİ göz damlası"],
    ["Bromfenac", "Bromfenac", "NSAİİ göz damlası"],
    ["Diclofenac ophthalmic", "Oftalmik Diklofenak", "NSAİİ göz damlası"],
    // Antibiyotik
    [
      "Moxifloxacin ophthalmic",
      "Oftalmik Moksifloksasin",
      "Florokinolon göz damlası",
    ],
    [
      "Gatifloxacin ophthalmic",
      "Oftalmik Gatifloksasin",
      "Florokinolon göz damlası",
    ],
    ["Besifloxacin", "Besifloksasin", "Florokinolon göz damlası"],
    [
      "Ciprofloxacin ophthalmic",
      "Oftalmik Siprofloksasin",
      "Florokinolon göz damlası",
    ],
    ["Ofloxacin ophthalmic", "Oftalmik Ofloksasin", "Florokinolon göz damlası"],
    [
      "Tobramycin ophthalmic",
      "Oftalmik Tobramisin",
      "Aminoglikozid göz damlası",
    ],
    [
      "Gentamicin ophthalmic",
      "Oftalmik Gentamisin",
      "Aminoglikozid göz damlası",
    ],
    ["Erythromycin ophthalmic", "Oftalmik Eritromisin", "Makrolid göz merhemi"],
    ["Azithromycin ophthalmic", "Oftalmik Azitromisin", "Makrolid göz damlası"],
    ["Bacitracin ophthalmic", "Oftalmik Basitrasin", "Antibiyotik göz merhemi"],
    // Anti-VEGF
    ["Ranibizumab", "Ranibizumab", "Anti-VEGF, AMD"],
    ["Aflibercept", "Aflibersept", "Anti-VEGF, AMD"],
    ["Brolucizumab", "Brolucizumab", "Anti-VEGF, AMD"],
    ["Faricimab", "Farisimab", "Anti-VEGF/Ang-2, AMD"],
    // Kuru göz
    [
      "Cyclosporine ophthalmic",
      "Oftalmik Siklosporin",
      "Kuru göz, immünomodülatör",
    ],
    ["Lifitegrast", "Lifitegrast", "LFA-1 antagonisti, kuru göz"],
    ["Varenicline nasal", "Nazal Vareniklin", "Kuru göz, gözyaşı stimülanı"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Enfeksiyon hastalıkları
const generateInfectiousDiseases = () => {
  const diseases = [];
  const diseaseList = [
    // Bakteriyel enfeksiyonlar
    [
      "Streptococcal pharyngitis",
      "Streptokokal Farenjit",
      "Streptokok boğaz enfeksiyonu",
    ],
    ["Scarlet fever", "Kızıl", "Streptokok döküntülü hastalık"],
    ["Rheumatic fever", "Romatizmal Ateş", "Streptokok komplikasyonu"],
    [
      "Staphylococcal infection",
      "Stafilokok Enfeksiyonu",
      "S. aureus enfeksiyonu",
    ],
    ["MRSA infection", "MRSA Enfeksiyonu", "Metisilin dirençli S. aureus"],
    ["Toxic shock syndrome", "Toksik Şok Sendromu", "TSS"],
    ["Pneumococcal pneumonia", "Pnömokok Pnömonisi", "S. pneumoniae pnömonisi"],
    [
      "Meningococcal meningitis",
      "Meningokok Menenjiti",
      "N. meningitidis menenjiti",
    ],
    ["Gonococcal infection", "Gonokok Enfeksiyonu", "Gonore"],
    ["Syphilis", "Sifiliz", "Frengi, T. pallidum"],
    ["Primary syphilis", "Primer Sifiliz", "Şankr"],
    ["Secondary syphilis", "Sekonder Sifiliz", "Döküntülü sifiliz"],
    ["Tertiary syphilis", "Tersiyer Sifiliz", "Geç sifiliz"],
    ["Neurosyphilis", "Nörosifiliz", "Sinir sistemi sifilizi"],
    ["Chlamydia infection", "Klamidya Enfeksiyonu", "C. trachomatis"],
    ["Lymphogranuloma venereum", "Lenfogranüloma Venereum", "LGV"],
    ["Trachoma", "Trahom", "Klamidya göz enfeksiyonu"],
    ["Lyme disease", "Lyme Hastalığı", "Borrelia burgdorferi"],
    ["Rocky Mountain spotted fever", "Rocky Mountain Benekli Ateşi", "RMSF"],
    ["Ehrlichiosis", "Ehrlichiosis", "Kene kaynaklı enfeksiyon"],
    ["Anaplasmosis", "Anaplazmoz", "Kene kaynaklı enfeksiyon"],
    ["Q fever", "Q Ateşi", "Coxiella burnetii"],
    ["Brucellosis", "Bruselloz", "Malta humması"],
    ["Tularemia", "Tularemi", "Tavşan humması"],
    ["Anthrax", "Şarbon", "Bacillus anthracis"],
    ["Plague", "Veba", "Yersinia pestis"],
    ["Cholera", "Kolera", "Vibrio cholerae"],
    ["Typhoid fever", "Tifo", "Salmonella typhi"],
    ["Salmonellosis", "Salmonelloz", "Salmonella gastroenteriti"],
    ["Shigellosis", "Şigelloz", "Basilli dizanteri"],
    ["Campylobacter infection", "Kampillobakter Enfeksiyonu", "Gastroenterit"],
    ["E. coli infection", "E. coli Enfeksiyonu", "Enterik enfeksiyon"],
    ["Listeriosis", "Listerioz", "Listeria monocytogenes"],
    ["Botulism", "Botulizm", "Clostridium botulinum"],
    ["Tetanus", "Tetanoz", "Clostridium tetani"],
    ["Gas gangrene", "Gazlı Gangren", "Clostridium perfringens"],
    ["Diphtheria", "Difteri", "Corynebacterium diphtheriae"],
    ["Pertussis", "Boğmaca", "Bordetella pertussis"],
    ["Legionnaires disease", "Lejyoner Hastalığı", "Legionella pneumophila"],
    ["Pseudomonas infection", "Psödomonas Enfeksiyonu", "P. aeruginosa"],
    [
      "Acinetobacter infection",
      "Acinetobacter Enfeksiyonu",
      "Hastane enfeksiyonu",
    ],
    ["Klebsiella infection", "Klebsiella Enfeksiyonu", "Hastane enfeksiyonu"],
    ["Enterococcal infection", "Enterokok Enfeksiyonu", "VRE dahil"],
    [
      "Helicobacter pylori infection",
      "Helicobacter Pylori Enfeksiyonu",
      "Peptik ülser",
    ],
    ["Mycoplasma pneumonia", "Mikoplazma Pnömonisi", "Atipik pnömoni"],
    ["Chlamydophila pneumonia", "Klamidofila Pnömonisi", "Atipik pnömoni"],
    ["Nocardiosis", "Nokardioz", "Nocardia enfeksiyonu"],
    ["Actinomycosis", "Aktinomikoz", "Actinomyces enfeksiyonu"],
    ["Leprosy", "Cüzzam", "Hansen hastalığı"],
    ["Bartonellosis", "Bartonelloz", "Kedi tırmığı hastalığı"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Viral hastalıklar
const generateViralDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Influenza", "İnfluenza", "Grip"],
    ["Influenza A", "İnfluenza A", "Grip A"],
    ["Influenza B", "İnfluenza B", "Grip B"],
    ["COVID-19", "COVID-19", "SARS-CoV-2 enfeksiyonu"],
    ["SARS", "SARS", "Şiddetli akut solunum sendromu"],
    ["MERS", "MERS", "Orta Doğu solunum sendromu"],
    ["Common cold", "Soğuk Algınlığı", "Rinovirüs enfeksiyonu"],
    ["RSV infection", "RSV Enfeksiyonu", "Respiratuvar sinsityal virüs"],
    ["Parainfluenza", "Parainfluenza", "Krup etkeni"],
    [
      "Adenovirus infection",
      "Adenovirüs Enfeksiyonu",
      "Solunum yolu enfeksiyonu",
    ],
    ["Measles", "Kızamık", "Rubeola"],
    ["Rubella", "Kızamıkçık", "Alman kızamığı"],
    ["Mumps", "Kabakulak", "Parotit"],
    ["Varicella", "Su Çiçeği", "Varisella zoster"],
    ["Herpes zoster", "Zona", "Herpes zoster reaktivasyonu"],
    ["Herpes simplex type 1", "Herpes Simpleks Tip 1", "Oral herpes"],
    ["Herpes simplex type 2", "Herpes Simpleks Tip 2", "Genital herpes"],
    ["Infectious mononucleosis", "Enfeksiyöz Mononükleoz", "EBV enfeksiyonu"],
    ["Cytomegalovirus infection", "Sitomegalovirüs Enfeksiyonu", "CMV"],
    [
      "Human papillomavirus infection",
      "İnsan Papilloma Virüsü Enfeksiyonu",
      "HPV",
    ],
    ["HIV infection", "HIV Enfeksiyonu", "İnsan immün yetmezlik virüsü"],
    ["AIDS", "AIDS", "Edinilmiş immün yetmezlik sendromu"],
    ["Hepatitis A", "Hepatit A", "HAV enfeksiyonu"],
    ["Hepatitis B", "Hepatit B", "HBV enfeksiyonu"],
    ["Hepatitis C", "Hepatit C", "HCV enfeksiyonu"],
    ["Hepatitis D", "Hepatit D", "HDV enfeksiyonu"],
    ["Hepatitis E", "Hepatit E", "HEV enfeksiyonu"],
    ["Dengue fever", "Dang Humması", "Dang virüsü"],
    ["Dengue hemorrhagic fever", "Dang Hemorajik Ateşi", "Şiddetli dang"],
    ["Zika virus infection", "Zika Virüsü Enfeksiyonu", "Zika"],
    ["Chikungunya", "Çikungunya", "Chikungunya virüsü"],
    ["Yellow fever", "Sarı Humma", "Sarı humma virüsü"],
    ["West Nile virus infection", "Batı Nil Virüsü Enfeksiyonu", "WNV"],
    ["Japanese encephalitis", "Japon Ensefaliti", "JE virüsü"],
    ["Rabies", "Kuduz", "Rabies virüsü"],
    ["Poliomyelitis", "Poliomiyelit", "Çocuk felci"],
    [
      "Hand foot and mouth disease",
      "El Ayak Ağız Hastalığı",
      "Coxsackie virüsü",
    ],
    ["Rotavirus infection", "Rotavirüs Enfeksiyonu", "Viral gastroenterit"],
    ["Norovirus infection", "Norovirüs Enfeksiyonu", "Viral gastroenterit"],
    ["Ebola virus disease", "Ebola Virüs Hastalığı", "EVD"],
    ["Marburg virus disease", "Marburg Virüs Hastalığı", "MVD"],
    ["Lassa fever", "Lassa Ateşi", "Lassa virüsü"],
    ["Hantavirus infection", "Hantavirüs Enfeksiyonu", "HPS, HFRS"],
    ["Smallpox", "Çiçek Hastalığı", "Variola"],
    ["Monkeypox", "Maymun Çiçeği", "Mpox"],
    ["Molluscum contagiosum", "Molluskum Kontagiyozum", "Poxvirus"],
    [
      "Parvovirus B19 infection",
      "Parvovirüs B19 Enfeksiyonu",
      "Beşinci hastalık",
    ],
    ["Human herpesvirus 6 infection", "HHV-6 Enfeksiyonu", "Roseola"],
    ["Human herpesvirus 8 infection", "HHV-8 Enfeksiyonu", "Kaposi sarkomu"],
    ["HTLV-1 infection", "HTLV-1 Enfeksiyonu", "T hücreli lösemi virüsü"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Paraziter hastalıklar
const generateParasiticDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Malaria", "Sıtma", "Plasmodium enfeksiyonu"],
    ["Plasmodium falciparum malaria", "P. falciparum Sıtması", "Tropik sıtma"],
    ["Plasmodium vivax malaria", "P. vivax Sıtması", "Benign tersiyan sıtma"],
    ["Plasmodium malariae malaria", "P. malariae Sıtması", "Kuartan sıtma"],
    ["Plasmodium ovale malaria", "P. ovale Sıtması", "Oval sıtma"],
    ["Toxoplasmosis", "Toksoplazmoz", "Toxoplasma gondii"],
    ["Amebiasis", "Amebiyaz", "Entamoeba histolytica"],
    [
      "Amebic liver abscess",
      "Amebik Karaciğer Apsesi",
      "Amip karaciğer apsesi",
    ],
    ["Giardiasis", "Giyardiyaz", "Giardia lamblia"],
    ["Cryptosporidiosis", "Kriptosporidioz", "Cryptosporidium"],
    ["Cyclosporiasis", "Siklosporiyaz", "Cyclospora cayetanensis"],
    ["Isosporiasis", "İzosporiyaz", "Cystoisospora belli"],
    ["Microsporidiosis", "Mikrosporidioz", "Microsporidia"],
    ["Leishmaniasis", "Leishmaniasis", "Leishmania enfeksiyonu"],
    ["Visceral leishmaniasis", "Visseral Leishmaniasis", "Kala-azar"],
    ["Cutaneous leishmaniasis", "Kutanöz Leishmaniasis", "Şark çıbanı"],
    ["Mucocutaneous leishmaniasis", "Mukokutanöz Leishmaniasis", "Espundia"],
    ["Trypanosomiasis", "Tripanozomiyaz", "Trypanosoma enfeksiyonu"],
    ["African trypanosomiasis", "Afrika Tripanozomiyazı", "Uyku hastalığı"],
    ["Chagas disease", "Chagas Hastalığı", "Amerikan tripanozomiyazı"],
    ["Babesiosis", "Babesioz", "Babesia enfeksiyonu"],
    ["Ascariasis", "Askariazis", "Bağırsak solucanı"],
    ["Hookworm infection", "Kancalı Kurt Enfeksiyonu", "Ankylostoma, Necator"],
    ["Trichuriasis", "Triküriazis", "Kırbaç kurdu"],
    ["Enterobiasis", "Enterobiyaz", "Kıl kurdu"],
    ["Strongyloidiasis", "Strongiloidiyaz", "Strongyloides stercoralis"],
    ["Trichinellosis", "Trikinelloz", "Trichinella spiralis"],
    ["Toxocariasis", "Toksokariazis", "Toxocara enfeksiyonu"],
    ["Filariasis", "Filariazis", "Filarya enfeksiyonu"],
    ["Lymphatic filariasis", "Lenfatik Filariazis", "Fil hastalığı"],
    ["Onchocerciasis", "Onkoserkiyaz", "Nehir körlüğü"],
    ["Loiasis", "Loiazis", "Loa loa"],
    ["Dracunculiasis", "Drakunkuliyaz", "Gine kurdu"],
    ["Schistosomiasis", "Şistozomiyaz", "Bilharzia"],
    ["Taeniasis", "Tenyazis", "Şerit enfeksiyonu"],
    ["Cysticercosis", "Sistiserkoz", "T. solium larva enfeksiyonu"],
    ["Neurocysticercosis", "Nörosistiserkoz", "Beyin sistiserkoz"],
    ["Echinococcosis", "Ekinokokkoz", "Kist hidatik"],
    ["Fascioliasis", "Fasiyoliyaz", "Karaciğer kelebeği"],
    ["Clonorchiasis", "Klonorkiyaz", "Çin karaciğer kelebeği"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Ek bitkiler
const generateMorePlants = () => {
  const plants = [];
  const plantList = [
    ["Aconitum napellus", "Kaplan Otu", "Zehirli bitki, homeopati"],
    ["Aesculus hippocastanum", "At Kestanesi", "Venöz yetmezlik"],
    ["Agrimonia eupatoria", "Koyun Otu", "Astrenjan, sindirim"],
    ["Alchemilla vulgaris", "Aslanpençesi", "Kadın sağlığı"],
    ["Althaea officinalis", "Hatmi", "Mukolitik, yatıştırıcı"],
    ["Anethum graveolens", "Dereotu", "Karminatif, sindirim"],
    ["Apium graveolens", "Kereviz", "Diüretik, antiinflamatuar"],
    ["Arctium lappa", "Dulavratotu", "Detoks, cilt sağlığı"],
    ["Artemisia absinthium", "Pelin Otu", "Sindirim, antiparaziter"],
    ["Artemisia annua", "Tatlı Pelin", "Artemisinin kaynağı, sıtma"],
    ["Avena sativa", "Yulaf", "Sinir sistemi tonik"],
    ["Berberis vulgaris", "Kadın Tuzluğu", "Berberin kaynağı"],
    ["Betula pendula", "Huş Ağacı", "Diüretik, antiinflamatuar"],
    ["Borago officinalis", "Hodan", "GLA kaynağı, cilt sağlığı"],
    ["Brassica oleracea", "Lahana", "Antioksidan, sindirim"],
    ["Bryonia alba", "Ak Asma", "Homeopati, romatizma"],
    ["Calendula officinalis", "Aynısefa", "Yara iyileştirici"],
    ["Capsella bursa-pastoris", "Çoban Çantası", "Hemostatik"],
    ["Chelidonium majus", "Kırlangıç Otu", "Karaciğer, safra"],
    ["Cichorium intybus", "Hindiba", "Karaciğer, sindirim"],
    ["Cnicus benedictus", "Şevketi Bostan", "Sindirim, iştah açıcı"],
    ["Convallaria majalis", "İnci Çiçeği", "Kardiyotonik"],
    ["Crocus sativus", "Safran", "Antidepresan, antioksidan"],
    ["Cynara scolymus", "Enginar", "Karaciğer, kolesterol"],
    ["Digitalis purpurea", "Yüksük Otu", "Kardiyak glikozid kaynağı"],
    ["Equisetum arvense", "At Kuyruğu", "Diüretik, silika kaynağı"],
    ["Eupatorium perfoliatum", "Kemik Otu", "Ateş düşürücü, grip"],
    ["Euphrasia officinalis", "Göz Otu", "Göz sağlığı"],
    ["Filipendula ulmaria", "Çayır Kraliçesi", "Antiinflamatuar"],
    ["Frangula alnus", "Barut Ağacı", "Laksatif"],
    ["Fucus vesiculosus", "Mesane Yosunu", "Tiroid, metabolizma"],
    ["Galium aparine", "Yogurt Otu", "Lenfatik sistem"],
    ["Gentiana lutea", "Sarı Centiyan", "Acı tonik, sindirim"],
    ["Geranium maculatum", "Turna Gagası", "Astrenjan"],
    ["Glechoma hederacea", "Yer Sarmaşığı", "Solunum, sindirim"],
    ["Grindelia robusta", "Grindelia", "Solunum, astım"],
    ["Hedera helix", "Sarmaşık", "Ekspektoran, öksürük"],
    ["Helichrysum italicum", "Ölmez Çiçek", "Antiinflamatuar, cilt"],
    ["Hibiscus sabdariffa", "Hibiskus", "Antihipertansif, antioksidan"],
    ["Hyssopus officinalis", "Çördük Otu", "Solunum, antiseptik"],
    ["Inula helenium", "Andız Otu", "Ekspektoran, sindirim"],
    ["Iris versicolor", "Mavi Süsen", "Karaciğer, safra"],
    ["Juglans regia", "Ceviz", "Antiparaziter, cilt"],
    ["Juniperus communis", "Ardıç", "Diüretik, antiseptik"],
    ["Lamium album", "Ak Ballıbaba", "Kadın sağlığı"],
    ["Leonurus cardiaca", "Aslan Kuyruğu", "Kardiyotonik, anksiyolitik"],
    ["Linum usitatissimum", "Keten", "Omega-3, laksatif"],
    ["Lobelia inflata", "Lobelia", "Solunum, sigara bırakma"],
    ["Lycopus virginicus", "Bugleweed", "Tiroid, palpitasyon"],
    ["Mahonia aquifolium", "Oregon Üzümü", "Cilt, antimikrobiyal"],
  ];

  plantList.forEach(([latin, turkish, def]) => {
    plants.push(createTerm(latin, turkish, TermCategory.PLANT, def));
  });

  return plants;
};

// Ek anatomi - Sindirim sistemi
const generateDigestiveAnatomy = () => {
  const anatomy = [];
  const anatomyList = [
    ["Oral cavity", "Ağız Boşluğu", "Sindirim sisteminin başlangıcı"],
    ["Tongue", "Dil", "Tat alma ve yutma organı"],
    ["Salivary glands", "Tükürük Bezleri", "Tükürük üretimi"],
    ["Parotid gland", "Parotis Bezi", "En büyük tükürük bezi"],
    ["Submandibular gland", "Submandibular Bez", "Tükürük bezi"],
    ["Sublingual gland", "Sublingual Bez", "Tükürük bezi"],
    ["Pharynx", "Farinks", "Yutak"],
    ["Esophagus", "Özofagus", "Yemek borusu"],
    ["Lower esophageal sphincter", "Alt Özofagus Sfinkteri", "LES"],
    ["Stomach", "Mide", "Sindirim organı"],
    ["Gastric fundus", "Mide Fundusu", "Mide üst kısmı"],
    ["Gastric body", "Mide Gövdesi", "Mide orta kısmı"],
    ["Gastric antrum", "Mide Antrumu", "Mide alt kısmı"],
    ["Pylorus", "Pilor", "Mide çıkışı"],
    ["Pyloric sphincter", "Pilorik Sfinkter", "Mide-duodenum kapağı"],
    ["Small intestine", "İnce Bağırsak", "Besin emilimi"],
    ["Duodenum", "Duodenum", "Onikiparmak bağırsağı"],
    ["Jejunum", "Jejunum", "Boş bağırsak"],
    ["Ileum", "İleum", "Kıvrım bağırsak"],
    ["Ileocecal valve", "İleoçekal Kapak", "İnce-kalın bağırsak geçişi"],
    ["Large intestine", "Kalın Bağırsak", "Su emilimi, dışkı oluşumu"],
    ["Cecum", "Çekum", "Kör bağırsak"],
    ["Appendix", "Apendiks", "Kör bağırsak uzantısı"],
    ["Ascending colon", "Çıkan Kolon", "Sağ kolon"],
    ["Transverse colon", "Transvers Kolon", "Yatay kolon"],
    ["Descending colon", "İnen Kolon", "Sol kolon"],
    ["Sigmoid colon", "Sigmoid Kolon", "S şekilli kolon"],
    ["Rectum", "Rektum", "Düz bağırsak"],
    ["Anal canal", "Anal Kanal", "Anüs kanalı"],
    ["Internal anal sphincter", "İç Anal Sfinkter", "İstemsiz kontrol"],
    ["External anal sphincter", "Dış Anal Sfinkter", "İstemli kontrol"],
    ["Liver", "Karaciğer", "Metabolizma merkezi"],
    ["Right lobe of liver", "Karaciğer Sağ Lobu", "Büyük lob"],
    ["Left lobe of liver", "Karaciğer Sol Lobu", "Küçük lob"],
    ["Caudate lobe", "Kaudat Lob", "Karaciğer lobu"],
    ["Quadrate lobe", "Kuadrat Lob", "Karaciğer lobu"],
    ["Hepatic lobule", "Hepatik Lobül", "Karaciğer fonksiyonel birimi"],
    ["Hepatocyte", "Hepatosit", "Karaciğer hücresi"],
    ["Kupffer cell", "Kupffer Hücresi", "Karaciğer makrofajı"],
    ["Gallbladder", "Safra Kesesi", "Safra depolama"],
    ["Common bile duct", "Ortak Safra Kanalı", "Koledok"],
    ["Cystic duct", "Sistik Kanal", "Safra kesesi kanalı"],
    ["Hepatic duct", "Hepatik Kanal", "Karaciğer safra kanalı"],
    ["Ampulla of Vater", "Vater Ampullası", "Safra-pankreas birleşimi"],
    ["Sphincter of Oddi", "Oddi Sfinkteri", "Ampulla kapağı"],
    ["Pancreas", "Pankreas", "Sindirim enzimleri ve hormonlar"],
    ["Pancreatic head", "Pankreas Başı", "Duodenum yanı"],
    ["Pancreatic body", "Pankreas Gövdesi", "Orta kısım"],
    ["Pancreatic tail", "Pankreas Kuyruğu", "Dalak yanı"],
    ["Islets of Langerhans", "Langerhans Adacıkları", "Endokrin pankreas"],
  ];

  anatomyList.forEach(([latin, turkish, def]) => {
    anatomy.push(createTerm(latin, turkish, TermCategory.ANATOMY, def));
  });

  return anatomy;
};

// Ek anatomi - Ürogenital sistem
const generateUrogenitalAnatomy = () => {
  const anatomy = [];
  const anatomyList = [
    ["Kidney", "Böbrek", "İdrar üreten organ"],
    ["Renal cortex", "Böbrek Korteksi", "Böbrek dış tabakası"],
    ["Renal medulla", "Böbrek Medullası", "Böbrek iç tabakası"],
    ["Renal pelvis", "Böbrek Pelvisi", "İdrar toplama havuzu"],
    ["Nephron", "Nefron", "Böbrek fonksiyonel birimi"],
    ["Glomerulus", "Glomerül", "Filtrasyon birimi"],
    ["Bowman capsule", "Bowman Kapsülü", "Glomerül kapsülü"],
    ["Proximal convoluted tubule", "Proksimal Kıvrımlı Tübül", "PCT"],
    ["Loop of Henle", "Henle Kulpu", "İdrar konsantrasyonu"],
    ["Distal convoluted tubule", "Distal Kıvrımlı Tübül", "DCT"],
    ["Collecting duct", "Toplayıcı Kanal", "İdrar toplama"],
    ["Ureter", "Üreter", "İdrar kanalı"],
    ["Urinary bladder", "Mesane", "İdrar torbası"],
    ["Detrusor muscle", "Detrusor Kası", "Mesane kası"],
    ["Trigone", "Trigon", "Mesane üçgeni"],
    ["Urethra", "Üretra", "İdrar yolu"],
    ["Internal urethral sphincter", "İç Üretral Sfinkter", "İstemsiz kontrol"],
    ["External urethral sphincter", "Dış Üretral Sfinkter", "İstemli kontrol"],
    ["Adrenal gland", "Adrenal Bez", "Böbrek üstü bezi"],
    ["Adrenal cortex", "Adrenal Korteks", "Steroid hormon üretimi"],
    ["Adrenal medulla", "Adrenal Medulla", "Katekolamin üretimi"],
    // Erkek üreme sistemi
    ["Testis", "Testis", "Erkek gonadı"],
    ["Seminiferous tubules", "Seminifer Tübüller", "Sperm üretimi"],
    ["Leydig cells", "Leydig Hücreleri", "Testosteron üretimi"],
    ["Sertoli cells", "Sertoli Hücreleri", "Sperm destekleyici"],
    ["Epididymis", "Epididimis", "Sperm olgunlaşması"],
    ["Vas deferens", "Vas Deferens", "Sperm kanalı"],
    ["Seminal vesicle", "Seminal Vezikül", "Semen sıvısı üretimi"],
    ["Prostate gland", "Prostat Bezi", "Semen sıvısı üretimi"],
    ["Bulbourethral gland", "Bulboüretral Bez", "Cowper bezi"],
    ["Penis", "Penis", "Erkek dış genital organı"],
    ["Corpus cavernosum", "Korpus Kavernozum", "Ereksiyon dokusu"],
    ["Corpus spongiosum", "Korpus Spongiozum", "Üretra çevresi doku"],
    ["Glans penis", "Glans Penis", "Penis başı"],
    ["Prepuce", "Prepus", "Sünnet derisi"],
    ["Scrotum", "Skrotum", "Testis torbası"],
    // Kadın üreme sistemi
    ["Ovary", "Over", "Kadın gonadı"],
    ["Ovarian follicle", "Ovarian Folikül", "Yumurta içeren yapı"],
    ["Corpus luteum", "Korpus Luteum", "Sarı cisim"],
    ["Fallopian tube", "Fallop Tüpü", "Tuba uterina"],
    ["Fimbriae", "Fimbriyalar", "Tüp uçları"],
    ["Uterus", "Uterus", "Rahim"],
    ["Endometrium", "Endometriyum", "Rahim iç tabakası"],
    ["Myometrium", "Miyometriyum", "Rahim kas tabakası"],
    ["Perimetrium", "Perimetriyum", "Rahim dış tabakası"],
    ["Cervix", "Serviks", "Rahim ağzı"],
    ["Vagina", "Vajina", "Doğum kanalı"],
    ["Vulva", "Vulva", "Kadın dış genital organları"],
    ["Labia majora", "Labia Majora", "Büyük dudaklar"],
    ["Labia minora", "Labia Minora", "Küçük dudaklar"],
    ["Clitoris", "Klitoris", "Kadın ereksiyon organı"],
  ];

  anatomyList.forEach(([latin, turkish, def]) => {
    anatomy.push(createTerm(latin, turkish, TermCategory.ANATOMY, def));
  });

  return anatomy;
};

// Ek bileşenler - Sitokinler ve büyüme faktörleri
const generateCytokines = () => {
  const components = [];
  const componentList = [
    ["Interleukin-1", "İnterlökin-1", "IL-1, proinflamatuar sitokin"],
    ["Interleukin-2", "İnterlökin-2", "IL-2, T hücre büyüme faktörü"],
    ["Interleukin-4", "İnterlökin-4", "IL-4, Th2 sitokin"],
    ["Interleukin-5", "İnterlökin-5", "IL-5, eozinofil aktivatörü"],
    ["Interleukin-6", "İnterlökin-6", "IL-6, akut faz yanıtı"],
    ["Interleukin-8", "İnterlökin-8", "IL-8, nötrofil kemoatraktanı"],
    ["Interleukin-10", "İnterlökin-10", "IL-10, antiinflamatuar sitokin"],
    ["Interleukin-12", "İnterlökin-12", "IL-12, Th1 indüktörü"],
    ["Interleukin-17", "İnterlökin-17", "IL-17, Th17 sitokin"],
    ["Interleukin-23", "İnterlökin-23", "IL-23, Th17 sürdürücü"],
    [
      "Tumor necrosis factor alpha",
      "Tümör Nekroz Faktörü Alfa",
      "TNF-α, proinflamatuar",
    ],
    ["Interferon alpha", "İnterferon Alfa", "IFN-α, antiviral"],
    ["Interferon beta", "İnterferon Beta", "IFN-β, antiviral"],
    ["Interferon gamma", "İnterferon Gama", "IFN-γ, immün aktivatör"],
    [
      "Transforming growth factor beta",
      "Dönüştürücü Büyüme Faktörü Beta",
      "TGF-β",
    ],
    ["Epidermal growth factor", "Epidermal Büyüme Faktörü", "EGF"],
    [
      "Vascular endothelial growth factor",
      "Vasküler Endotelyal Büyüme Faktörü",
      "VEGF",
    ],
    [
      "Platelet-derived growth factor",
      "Trombosit Kaynaklı Büyüme Faktörü",
      "PDGF",
    ],
    ["Fibroblast growth factor", "Fibroblast Büyüme Faktörü", "FGF"],
    ["Nerve growth factor", "Sinir Büyüme Faktörü", "NGF"],
    [
      "Brain-derived neurotrophic factor",
      "Beyin Kaynaklı Nörotrofik Faktör",
      "BDNF",
    ],
    [
      "Insulin-like growth factor 1",
      "İnsülin Benzeri Büyüme Faktörü 1",
      "IGF-1",
    ],
    [
      "Granulocyte colony-stimulating factor",
      "Granülosit Koloni Stimüle Edici Faktör",
      "G-CSF",
    ],
    ["Granulocyte-macrophage CSF", "Granülosit-Makrofaj CSF", "GM-CSF"],
    ["Erythropoietin", "Eritropoetin", "EPO, eritrosit üretimi"],
    ["Thrombopoietin", "Trombopoetin", "TPO, trombosit üretimi"],
    ["Stem cell factor", "Kök Hücre Faktörü", "SCF, c-kit ligandı"],
    ["Macrophage colony-stimulating factor", "Makrofaj CSF", "M-CSF"],
    ["Hepatocyte growth factor", "Hepatosit Büyüme Faktörü", "HGF"],
    ["Keratinocyte growth factor", "Keratinosit Büyüme Faktörü", "KGF"],
    // Antikorlar
    ["Immunoglobulin G", "İmmünoglobulin G", "IgG, en yaygın antikor"],
    ["Immunoglobulin A", "İmmünoglobulin A", "IgA, mukozal bağışıklık"],
    ["Immunoglobulin M", "İmmünoglobulin M", "IgM, primer yanıt"],
    ["Immunoglobulin E", "İmmünoglobulin E", "IgE, alerji"],
    ["Immunoglobulin D", "İmmünoglobulin D", "IgD, B hücre reseptörü"],
    // Kompleman
    ["Complement C3", "Kompleman C3", "Kompleman sistemi merkezi"],
    ["Complement C4", "Kompleman C4", "Klasik yol bileşeni"],
    ["Complement C5", "Kompleman C5", "MAC öncüsü"],
    ["C-reactive protein", "C-Reaktif Protein", "CRP, akut faz reaktanı"],
    ["Fibrinogen", "Fibrinojen", "Pıhtılaşma faktörü"],
    ["Prothrombin", "Protrombin", "Faktör II"],
    ["Factor V", "Faktör V", "Pıhtılaşma faktörü"],
    ["Factor VII", "Faktör VII", "Pıhtılaşma faktörü"],
    ["Factor VIII", "Faktör VIII", "Hemofili A eksik faktör"],
    ["Factor IX", "Faktör IX", "Hemofili B eksik faktör"],
    ["Factor X", "Faktör X", "Pıhtılaşma faktörü"],
    ["Factor XI", "Faktör XI", "Pıhtılaşma faktörü"],
    ["Factor XII", "Faktör XII", "Hageman faktörü"],
    ["Factor XIII", "Faktör XIII", "Fibrin stabilize edici"],
    [
      "Von Willebrand factor",
      "Von Willebrand Faktörü",
      "vWF, trombosit adezyonu",
    ],
  ];

  componentList.forEach(([latin, turkish, def]) => {
    components.push(createTerm(latin, turkish, TermCategory.COMPONENT, def));
  });

  return components;
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Final Toplu Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(50));

  console.log("📝 Terimler oluşturuluyor...");

  const psychiatricDrugs = generatePsychiatricDrugs();
  const analgesics = generateAnalgesics();
  const diabetesDrugs = generateDiabetesDrugs();
  const lipidDrugs = generateLipidDrugs();
  const anticoagulants = generateAnticoagulants();
  const ophthalmicDrugs = generateOphthalmicDrugs();
  const infectiousDiseases = generateInfectiousDiseases();
  const viralDiseases = generateViralDiseases();
  const parasiticDiseases = generateParasiticDiseases();
  const morePlants = generateMorePlants();
  const digestiveAnatomy = generateDigestiveAnatomy();
  const urogenitalAnatomy = generateUrogenitalAnatomy();
  const cytokines = generateCytokines();

  const allTerms = [
    ...psychiatricDrugs,
    ...analgesics,
    ...diabetesDrugs,
    ...lipidDrugs,
    ...anticoagulants,
    ...ophthalmicDrugs,
    ...infectiousDiseases,
    ...viralDiseases,
    ...parasiticDiseases,
    ...morePlants,
    ...digestiveAnatomy,
    ...urogenitalAnatomy,
    ...cytokines,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Psikiyatri İlaçları: ${psychiatricDrugs.length}`);
  console.log(`   Analjezikler: ${analgesics.length}`);
  console.log(`   Diyabet İlaçları: ${diabetesDrugs.length}`);
  console.log(`   Lipid İlaçları: ${lipidDrugs.length}`);
  console.log(`   Antikoagülanlar: ${anticoagulants.length}`);
  console.log(`   Oftalmik İlaçlar: ${ophthalmicDrugs.length}`);
  console.log(`   Enfeksiyon Hastalıkları: ${infectiousDiseases.length}`);
  console.log(`   Viral Hastalıklar: ${viralDiseases.length}`);
  console.log(`   Paraziter Hastalıklar: ${parasiticDiseases.length}`);
  console.log(`   Ek Bitkiler: ${morePlants.length}`);
  console.log(`   Sindirim Anatomisi: ${digestiveAnatomy.length}`);
  console.log(`   Ürogenital Anatomi: ${urogenitalAnatomy.length}`);
  console.log(`   Sitokinler ve Bileşenler: ${cytokines.length}`);
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
