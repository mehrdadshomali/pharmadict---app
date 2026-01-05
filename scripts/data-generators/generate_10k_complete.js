// 10K Complete - Son terimler
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

// Spesifik ilaçlar
const generateSpecificDrugs = () => {
  const drugs = [
    ["Acetaminophen", "Asetaminofen", "Ağrı kesici ve ateş düşürücü"],
    ["Ibuprofen", "İbuprofen", "NSAİİ ağrı kesici"],
    ["Aspirin", "Aspirin", "Asetilsalisilik asit"],
    ["Naproxen", "Naproksen", "NSAİİ antiinflamatuvar"],
    ["Diclofenac", "Diklofenak", "NSAİİ ağrı kesici"],
    ["Celecoxib", "Selekoksib", "COX-2 inhibitörü"],
    ["Morphine", "Morfin", "Opioid ağrı kesici"],
    ["Codeine", "Kodein", "Hafif opioid"],
    ["Tramadol", "Tramadol", "Sentetik opioid"],
    ["Fentanyl", "Fentanil", "Güçlü opioid"],
    ["Oxycodone", "Oksikodon", "Opioid analjezik"],
    ["Hydrocodone", "Hidrokodon", "Opioid analjezik"],
    ["Methadone", "Metadon", "Opioid bağımlılık tedavisi"],
    ["Buprenorphine", "Buprenorfin", "Parsiyel opioid agonist"],
    ["Naloxone", "Nalokson", "Opioid antagonist"],
    ["Naltrexone", "Naltrekson", "Opioid antagonist"],
    ["Gabapentin", "Gabapentin", "Nöropatik ağrı ilacı"],
    ["Pregabalin", "Pregabalin", "Nöropatik ağrı ilacı"],
    ["Amitriptyline", "Amitriptilin", "Trisiklik antidepresan"],
    ["Duloxetine", "Duloksetin", "SNRI antidepresan"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Daha fazla spesifik ilaçlar
const generateMoreSpecificDrugs = () => {
  const drugs = [
    ["Omeprazole", "Omeprazol", "Proton pompa inhibitörü"],
    ["Esomeprazole", "Esomeprazol", "PPI mide ilacı"],
    ["Pantoprazole", "Pantoprazol", "PPI mide ilacı"],
    ["Lansoprazole", "Lansoprazol", "PPI mide ilacı"],
    ["Ranitidine", "Ranitidin", "H2 bloker"],
    ["Famotidine", "Famotidin", "H2 bloker"],
    ["Metoclopramide", "Metoklopramid", "Antiemetik"],
    ["Ondansetron", "Ondansetron", "5-HT3 antagonist antiemetik"],
    ["Domperidone", "Domperidon", "Prokinetik"],
    ["Loperamide", "Loperamid", "Antidiyareik"],
    ["Bismuth subsalicylate", "Bizmut Subsalisilat", "Mide koruyucu"],
    ["Sucralfate", "Sukralfat", "Mide koruyucu"],
    ["Misoprostol", "Misoprostol", "Prostaglandin analoğu"],
    ["Lactulose", "Laktuloz", "Ozmotik laksatif"],
    ["Polyethylene glycol", "Polietilen Glikol", "Ozmotik laksatif"],
    ["Bisacodyl", "Bisakodil", "Stimülan laksatif"],
    ["Senna", "Sinameki", "Bitkisel laksatif"],
    ["Docusate", "Dokusat", "Yumuşatıcı laksatif"],
    ["Psyllium", "Psyllium", "Lif takviyesi"],
    ["Methylcellulose", "Metilselüloz", "Hacim artırıcı laksatif"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Kardiyovasküler ilaçlar
const generateCardiovascularDrugs = () => {
  const drugs = [
    ["Lisinopril", "Lisinopril", "ACE inhibitörü"],
    ["Enalapril", "Enalapril", "ACE inhibitörü"],
    ["Ramipril", "Ramipril", "ACE inhibitörü"],
    ["Captopril", "Kaptopril", "ACE inhibitörü"],
    ["Losartan", "Losartan", "ARB tansiyon ilacı"],
    ["Valsartan", "Valsartan", "ARB tansiyon ilacı"],
    ["Irbesartan", "İrbesartan", "ARB tansiyon ilacı"],
    ["Candesartan", "Kandesartan", "ARB tansiyon ilacı"],
    ["Metoprolol", "Metoprolol", "Beta bloker"],
    ["Atenolol", "Atenolol", "Beta bloker"],
    ["Propranolol", "Propranolol", "Beta bloker"],
    ["Carvedilol", "Karvedilol", "Alfa-beta bloker"],
    ["Bisoprolol", "Bisoprolol", "Selektif beta bloker"],
    ["Amlodipine", "Amlodipin", "Kalsiyum kanal blokeri"],
    ["Nifedipine", "Nifedipin", "Kalsiyum kanal blokeri"],
    ["Diltiazem", "Diltiazem", "Kalsiyum kanal blokeri"],
    ["Verapamil", "Verapamil", "Kalsiyum kanal blokeri"],
    ["Hydrochlorothiazide", "Hidroklorotiyazid", "Tiazid diüretik"],
    ["Furosemide", "Furosemid", "Loop diüretik"],
    ["Spironolactone", "Spironolakton", "Potasyum tutucu diüretik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Daha fazla kardiyovasküler ilaçlar
const generateMoreCardiovascularDrugs = () => {
  const drugs = [
    ["Atorvastatin", "Atorvastatin", "Statin kolesterol ilacı"],
    ["Simvastatin", "Simvastatin", "Statin kolesterol ilacı"],
    ["Rosuvastatin", "Rosuvastatin", "Statin kolesterol ilacı"],
    ["Pravastatin", "Pravastatin", "Statin kolesterol ilacı"],
    ["Ezetimibe", "Ezetimib", "Kolesterol emilim inhibitörü"],
    ["Fenofibrate", "Fenofibrat", "Fibrat trigliserid ilacı"],
    ["Gemfibrozil", "Gemfibrozil", "Fibrat trigliserid ilacı"],
    ["Niacin", "Niasin", "B3 vitamini kolesterol ilacı"],
    ["Warfarin", "Varfarin", "Oral antikoagülan"],
    ["Heparin", "Heparin", "Parenteral antikoagülan"],
    ["Enoxaparin", "Enoksaparin", "Düşük molekül ağırlıklı heparin"],
    ["Rivaroxaban", "Rivaroksaban", "Direkt Xa inhibitörü"],
    ["Apixaban", "Apiksaban", "Direkt Xa inhibitörü"],
    ["Dabigatran", "Dabigatran", "Direkt trombin inhibitörü"],
    ["Clopidogrel", "Klopidogrel", "Antiplatelet"],
    ["Ticagrelor", "Tikagrelor", "Antiplatelet"],
    ["Prasugrel", "Prasugrel", "Antiplatelet"],
    ["Dipyridamole", "Dipiridamol", "Antiplatelet"],
    ["Nitroglycerin", "Nitrogliserin", "Nitrat vazodilatatör"],
    ["Isosorbide dinitrate", "İzosorbid Dinitrat", "Nitrat vazodilatatör"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Antibiyotikler
const generateAntibiotics = () => {
  const drugs = [
    ["Amoxicillin", "Amoksisilin", "Penisilin antibiyotik"],
    ["Ampicillin", "Ampisilin", "Penisilin antibiyotik"],
    ["Penicillin V", "Penisilin V", "Oral penisilin"],
    ["Penicillin G", "Penisilin G", "Parenteral penisilin"],
    ["Piperacillin", "Piperasilin", "Geniş spektrumlu penisilin"],
    ["Cephalexin", "Sefaleksin", "1. kuşak sefalosporin"],
    ["Cefazolin", "Sefazolin", "1. kuşak sefalosporin"],
    ["Cefuroxime", "Sefuroksim", "2. kuşak sefalosporin"],
    ["Ceftriaxone", "Seftriakson", "3. kuşak sefalosporin"],
    ["Cefotaxime", "Sefotaksim", "3. kuşak sefalosporin"],
    ["Ceftazidime", "Seftazidim", "3. kuşak sefalosporin"],
    ["Cefepime", "Sefepim", "4. kuşak sefalosporin"],
    ["Azithromycin", "Azitromisin", "Makrolid antibiyotik"],
    ["Clarithromycin", "Klaritromisin", "Makrolid antibiyotik"],
    ["Erythromycin", "Eritromisin", "Makrolid antibiyotik"],
    ["Ciprofloxacin", "Siprofloksasin", "Florokinolon antibiyotik"],
    ["Levofloxacin", "Levofloksasin", "Florokinolon antibiyotik"],
    ["Moxifloxacin", "Moksifloksasin", "Florokinolon antibiyotik"],
    ["Doxycycline", "Doksisiklin", "Tetrasiklin antibiyotik"],
    ["Tetracycline", "Tetrasiklin", "Tetrasiklin antibiyotik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Daha fazla antibiyotikler
const generateMoreAntibiotics = () => {
  const drugs = [
    ["Gentamicin", "Gentamisin", "Aminoglikozid antibiyotik"],
    ["Amikacin", "Amikasin", "Aminoglikozid antibiyotik"],
    ["Tobramycin", "Tobramisin", "Aminoglikozid antibiyotik"],
    ["Vancomycin", "Vankomisin", "Glikopeptid antibiyotik"],
    ["Teicoplanin", "Teikoplanin", "Glikopeptid antibiyotik"],
    ["Linezolid", "Linezolid", "Oksazolidinon antibiyotik"],
    ["Daptomycin", "Daptomisin", "Lipopeptid antibiyotik"],
    ["Metronidazole", "Metronidazol", "Nitroimidazol antibiyotik"],
    ["Clindamycin", "Klindamisin", "Linkozamid antibiyotik"],
    ["Trimethoprim", "Trimetoprim", "Folat antagonisti"],
    ["Sulfamethoxazole", "Sülfametoksazol", "Sülfonamid antibiyotik"],
    ["Nitrofurantoin", "Nitrofurantoin", "İdrar yolu antibiyotiği"],
    ["Fosfomycin", "Fosfomisin", "Fosfonik asit antibiyotik"],
    ["Rifampin", "Rifampin", "Rifamisin antibiyotik"],
    ["Isoniazid", "İzoniazid", "Tüberküloz ilacı"],
    ["Pyrazinamide", "Pirazinamid", "Tüberküloz ilacı"],
    ["Ethambutol", "Etambutol", "Tüberküloz ilacı"],
    ["Colistin", "Kolistin", "Polimiksin antibiyotik"],
    ["Tigecycline", "Tigesiklin", "Glisisiklin antibiyotik"],
    ["Meropenem", "Meropenem", "Karbapenem antibiyotik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Psikiyatri ilaçları
const generatePsychiatricDrugs = () => {
  const drugs = [
    ["Sertraline", "Sertralin", "SSRI antidepresan"],
    ["Fluoxetine", "Fluoksetin", "SSRI antidepresan"],
    ["Paroxetine", "Paroksetin", "SSRI antidepresan"],
    ["Citalopram", "Sitalopram", "SSRI antidepresan"],
    ["Escitalopram", "Essitalopram", "SSRI antidepresan"],
    ["Venlafaxine", "Venlafaksin", "SNRI antidepresan"],
    ["Desvenlafaxine", "Desvenlafaksin", "SNRI antidepresan"],
    ["Mirtazapine", "Mirtazapin", "Atipik antidepresan"],
    ["Bupropion", "Bupropion", "NDRI antidepresan"],
    ["Trazodone", "Trazodon", "SARI antidepresan"],
    ["Alprazolam", "Alprazolam", "Benzodiazepin anksiyolitik"],
    ["Lorazepam", "Lorazepam", "Benzodiazepin anksiyolitik"],
    ["Diazepam", "Diazepam", "Benzodiazepin anksiyolitik"],
    ["Clonazepam", "Klonazepam", "Benzodiazepin antikonvülzan"],
    ["Midazolam", "Midazolam", "Benzodiazepin sedatif"],
    ["Zolpidem", "Zolpidem", "Non-benzodiazepin hipnotik"],
    ["Eszopiclone", "Eszopiklon", "Non-benzodiazepin hipnotik"],
    ["Buspirone", "Buspiron", "Non-benzodiazepin anksiyolitik"],
    ["Hydroxyzine", "Hidroksizin", "Antihistaminik anksiyolitik"],
    ["Quetiapine", "Ketiapin", "Atipik antipsikotik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Daha fazla psikiyatri ilaçları
const generateMorePsychiatricDrugs = () => {
  const drugs = [
    ["Risperidone", "Risperidon", "Atipik antipsikotik"],
    ["Olanzapine", "Olanzapin", "Atipik antipsikotik"],
    ["Aripiprazole", "Aripiprazol", "Atipik antipsikotik"],
    ["Ziprasidone", "Ziprasidon", "Atipik antipsikotik"],
    ["Paliperidone", "Paliperidon", "Atipik antipsikotik"],
    ["Clozapine", "Klozapin", "Atipik antipsikotik"],
    ["Haloperidol", "Haloperidol", "Tipik antipsikotik"],
    ["Chlorpromazine", "Klorpromazin", "Tipik antipsikotik"],
    ["Lithium", "Lityum", "Duygudurum dengeleyici"],
    ["Valproic acid", "Valproik Asit", "Antikonvülzan duygudurum"],
    ["Carbamazepine", "Karbamazepin", "Antikonvülzan"],
    ["Lamotrigine", "Lamotrijin", "Antikonvülzan duygudurum"],
    ["Phenytoin", "Fenitoin", "Antikonvülzan"],
    ["Levetiracetam", "Levetirasetam", "Antikonvülzan"],
    ["Topiramate", "Topiramat", "Antikonvülzan"],
    ["Oxcarbazepine", "Okskarbazepin", "Antikonvülzan"],
    ["Phenobarbital", "Fenobarbital", "Barbitürat antikonvülzan"],
    ["Methylphenidate", "Metilfenidat", "DEHB ilacı"],
    ["Amphetamine", "Amfetamin", "DEHB ilacı"],
    ["Atomoxetine", "Atomoksetin", "Non-stimülan DEHB ilacı"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Solunum sistemi ilaçları
const generateRespiratoryDrugs = () => {
  const drugs = [
    ["Salbutamol", "Salbutamol", "Kısa etkili beta agonist"],
    ["Albuterol", "Albuterol", "Kısa etkili beta agonist"],
    ["Terbutaline", "Terbutalin", "Beta agonist bronkodilatör"],
    ["Salmeterol", "Salmeterol", "Uzun etkili beta agonist"],
    ["Formoterol", "Formoterol", "Uzun etkili beta agonist"],
    ["Ipratropium", "İpratropium", "Antikolinerjik bronkodilatör"],
    ["Tiotropium", "Tiotropium", "Uzun etkili antikolinerjik"],
    ["Theophylline", "Teofilin", "Metilksantin bronkodilatör"],
    ["Aminophylline", "Aminofilin", "Metilksantin bronkodilatör"],
    ["Beclomethasone", "Beklometazon", "İnhale kortikosteroid"],
    ["Budesonide", "Budesonid", "İnhale kortikosteroid"],
    ["Fluticasone", "Flutikazon", "İnhale kortikosteroid"],
    ["Mometasone", "Mometazon", "İnhale kortikosteroid"],
    ["Montelukast", "Montelukast", "Lökotrien antagonisti"],
    ["Zafirlukast", "Zafirlukast", "Lökotrien antagonisti"],
    ["Cromolyn", "Kromolin", "Mast hücre stabilizatörü"],
    ["Omalizumab", "Omalizumab", "Anti-IgE monoklonal antikor"],
    ["Dextromethorphan", "Dekstrometorfan", "Öksürük kesici"],
    ["Codeine phosphate", "Kodein Fosfat", "Opioid öksürük kesici"],
    ["Guaifenesin", "Guaifenesin", "Ekspektoran"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Diyabet ilaçları
const generateDiabetesDrugs = () => {
  const drugs = [
    ["Metformin", "Metformin", "Biguanid antidiyabetik"],
    ["Glipizide", "Glipizid", "Sülfonilüre antidiyabetik"],
    ["Glyburide", "Glibürid", "Sülfonilüre antidiyabetik"],
    ["Glimepiride", "Glimepirid", "Sülfonilüre antidiyabetik"],
    ["Pioglitazone", "Pioglitazon", "Tiazolidindion antidiyabetik"],
    ["Rosiglitazone", "Rosiglitazon", "Tiazolidindion antidiyabetik"],
    ["Sitagliptin", "Sitagliptin", "DPP-4 inhibitörü"],
    ["Saxagliptin", "Saksagliptin", "DPP-4 inhibitörü"],
    ["Linagliptin", "Linagliptin", "DPP-4 inhibitörü"],
    ["Empagliflozin", "Empagliflozin", "SGLT2 inhibitörü"],
    ["Dapagliflozin", "Dapagliflozin", "SGLT2 inhibitörü"],
    ["Canagliflozin", "Kanagliflozin", "SGLT2 inhibitörü"],
    ["Liraglutide", "Liraglutid", "GLP-1 agonisti"],
    ["Semaglutide", "Semaglutid", "GLP-1 agonisti"],
    ["Dulaglutide", "Dulaglutid", "GLP-1 agonisti"],
    ["Exenatide", "Eksenatid", "GLP-1 agonisti"],
    ["Acarbose", "Akarboz", "Alfa-glukozidaz inhibitörü"],
    ["Repaglinide", "Repaglinid", "Meglitinid antidiyabetik"],
    ["Nateglinide", "Nateglinid", "Meglitinid antidiyabetik"],
    ["Insulin glargine", "İnsülin Glarjin", "Uzun etkili insülin"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Alerji ve bağışıklık ilaçları
const generateAllergyDrugs = () => {
  const drugs = [
    ["Cetirizine", "Setirizin", "2. kuşak antihistaminik"],
    ["Loratadine", "Loratadin", "2. kuşak antihistaminik"],
    ["Fexofenadine", "Feksofenadin", "2. kuşak antihistaminik"],
    ["Desloratadine", "Desloratadin", "2. kuşak antihistaminik"],
    ["Levocetirizine", "Levosetirizin", "2. kuşak antihistaminik"],
    ["Diphenhydramine", "Difenhidramin", "1. kuşak antihistaminik"],
    ["Chlorpheniramine", "Klorfeniramin", "1. kuşak antihistaminik"],
    ["Promethazine", "Prometazin", "1. kuşak antihistaminik"],
    ["Prednisone", "Prednizon", "Oral kortikosteroid"],
    ["Prednisolone", "Prednizolon", "Oral kortikosteroid"],
    ["Methylprednisolone", "Metilprednizolon", "Kortikosteroid"],
    ["Dexamethasone", "Deksametazon", "Güçlü kortikosteroid"],
    ["Hydrocortisone", "Hidrokortizon", "Kortikosteroid"],
    ["Betamethasone", "Betametazon", "Güçlü kortikosteroid"],
    ["Triamcinolone", "Triamsinolon", "Kortikosteroid"],
    ["Epinephrine", "Epinefrin", "Anafilaksi tedavisi"],
    ["Pseudoephedrine", "Psödoefedrin", "Dekonjestan"],
    ["Phenylephrine", "Fenilefrin", "Dekonjestan"],
    ["Oxymetazoline", "Oksimetazolin", "Topikal dekonjestan"],
    ["Xylometazoline", "Ksilometazolin", "Topikal dekonjestan"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Göz ilaçları
const generateOphthalmicDrugs = () => {
  const drugs = [
    ["Timolol", "Timolol", "Beta bloker göz damlası"],
    ["Latanoprost", "Latanoprost", "Prostaglandin göz damlası"],
    ["Brimonidine", "Brimonidin", "Alfa agonist göz damlası"],
    ["Dorzolamide", "Dorzolamid", "Karbonik anhidraz inhibitörü"],
    ["Pilocarpine", "Pilokarpin", "Kolinerjik göz damlası"],
    ["Tropicamide", "Tropikamid", "Midriyatik göz damlası"],
    ["Cyclopentolate", "Siklopentolat", "Sikloplejik göz damlası"],
    ["Atropine eye drops", "Atropin Göz Damlası", "Midriyatik"],
    ["Artificial tears", "Yapay Gözyaşı", "Göz nemlendirici"],
    ["Sodium hyaluronate", "Sodyum Hiyalüronat", "Göz nemlendirici"],
    ["Ofloxacin eye drops", "Ofloksasin Göz Damlası", "Antibiyotik"],
    ["Ciprofloxacin eye drops", "Siprofloksasin Göz Damlası", "Antibiyotik"],
    ["Tobramycin eye drops", "Tobramisin Göz Damlası", "Antibiyotik"],
    ["Gentamicin eye drops", "Gentamisin Göz Damlası", "Antibiyotik"],
    ["Prednisolone eye drops", "Prednizolon Göz Damlası", "Steroid"],
    ["Dexamethasone eye drops", "Deksametazon Göz Damlası", "Steroid"],
    ["Ketorolac eye drops", "Ketorolak Göz Damlası", "NSAİİ"],
    ["Nepafenac eye drops", "Nepafenac Göz Damlası", "NSAİİ"],
    ["Cyclosporine eye drops", "Siklosporin Göz Damlası", "İmmünomodülatör"],
    ["Lifitegrast", "Lifitegrast", "Kuru göz ilacı"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Deri ilaçları
const generateDermatologicDrugs = () => {
  const drugs = [
    ["Tretinoin", "Tretinoin", "Retinoid akne ilacı"],
    ["Adapalene", "Adapalen", "Retinoid akne ilacı"],
    ["Isotretinoin", "İzotretinoin", "Oral retinoid"],
    ["Benzoyl peroxide", "Benzoil Peroksit", "Akne ilacı"],
    ["Clindamycin topical", "Topikal Klindamisin", "Topikal antibiyotik"],
    ["Erythromycin topical", "Topikal Eritromisin", "Topikal antibiyotik"],
    ["Mupirocin", "Mupirosin", "Topikal antibiyotik"],
    ["Fusidic acid", "Fusidik Asit", "Topikal antibiyotik"],
    ["Ketoconazole topical", "Topikal Ketokonazol", "Topikal antifungal"],
    ["Clotrimazole", "Klotrimazol", "Topikal antifungal"],
    ["Miconazole", "Mikonazol", "Topikal antifungal"],
    ["Terbinafine topical", "Topikal Terbinafin", "Topikal antifungal"],
    ["Nystatin topical", "Topikal Nistatin", "Topikal antifungal"],
    ["Acyclovir topical", "Topikal Asiklovir", "Topikal antiviral"],
    ["Permethrin", "Permetrin", "Antiparaziter"],
    ["Ivermectin topical", "Topikal İvermektin", "Antiparaziter"],
    ["Calamine lotion", "Kalamin Losyon", "Kaşıntı giderici"],
    ["Zinc oxide", "Çinko Oksit", "Koruyucu krem"],
    ["Salicylic acid", "Salisilik Asit", "Keratolitik"],
    ["Urea cream", "Üre Krem", "Nemlendirici keratolitik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Ağrı kesici ve kas gevşeticiler
const generatePainMuscleRelaxants = () => {
  const drugs = [
    ["Cyclobenzaprine", "Siklobenzaprin", "Kas gevşetici"],
    ["Methocarbamol", "Metokarbamol", "Kas gevşetici"],
    ["Baclofen", "Baklofen", "Kas gevşetici"],
    ["Tizanidine", "Tizanidin", "Kas gevşetici"],
    ["Carisoprodol", "Karisoprodol", "Kas gevşetici"],
    ["Orphenadrine", "Orfenadin", "Kas gevşetici"],
    ["Dantrolene", "Dantrolen", "Kas gevşetici"],
    ["Botulinum toxin", "Botulinum Toksin", "Nöromüsküler bloker"],
    ["Lidocaine", "Lidokain", "Lokal anestezik"],
    ["Bupivacaine", "Bupivakain", "Lokal anestezik"],
    ["Ropivacaine", "Ropivakain", "Lokal anestezik"],
    ["Mepivacaine", "Mepivakain", "Lokal anestezik"],
    ["Prilocaine", "Prilokain", "Lokal anestezik"],
    ["Articaine", "Artikain", "Lokal anestezik"],
    ["Benzocaine", "Benzokain", "Topikal anestezik"],
    ["Tetracaine", "Tetrakain", "Topikal anestezik"],
    ["Propofol", "Propofol", "Genel anestezik"],
    ["Ketamine", "Ketamin", "Disosiyatif anestezik"],
    ["Sevoflurane", "Sevofluran", "İnhalasyon anestezik"],
    ["Isoflurane", "İzofluran", "İnhalasyon anestezik"],
  ];
  return drugs.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DRUG, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 10K COMPLETE - 10,000 HEDEFİNİ TAMAMLAMA");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const specificDrugs = generateSpecificDrugs();
  const moreSpecificDrugs = generateMoreSpecificDrugs();
  const cardiovascularDrugs = generateCardiovascularDrugs();
  const moreCardiovascularDrugs = generateMoreCardiovascularDrugs();
  const antibiotics = generateAntibiotics();
  const moreAntibiotics = generateMoreAntibiotics();
  const psychiatricDrugs = generatePsychiatricDrugs();
  const morePsychiatricDrugs = generateMorePsychiatricDrugs();
  const respiratoryDrugs = generateRespiratoryDrugs();
  const diabetesDrugs = generateDiabetesDrugs();
  const allergyDrugs = generateAllergyDrugs();
  const ophthalmicDrugs = generateOphthalmicDrugs();
  const dermatologicDrugs = generateDermatologicDrugs();
  const painMuscleRelaxants = generatePainMuscleRelaxants();

  const allTerms = [
    ...specificDrugs,
    ...moreSpecificDrugs,
    ...cardiovascularDrugs,
    ...moreCardiovascularDrugs,
    ...antibiotics,
    ...moreAntibiotics,
    ...psychiatricDrugs,
    ...morePsychiatricDrugs,
    ...respiratoryDrugs,
    ...diabetesDrugs,
    ...allergyDrugs,
    ...ophthalmicDrugs,
    ...dermatologicDrugs,
    ...painMuscleRelaxants,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(
    `   Spesifik İlaçlar: ${specificDrugs.length + moreSpecificDrugs.length}`
  );
  console.log(
    `   Kardiyovasküler: ${
      cardiovascularDrugs.length + moreCardiovascularDrugs.length
    }`
  );
  console.log(
    `   Antibiyotikler: ${antibiotics.length + moreAntibiotics.length}`
  );
  console.log(
    `   Psikiyatri: ${psychiatricDrugs.length + morePsychiatricDrugs.length}`
  );
  console.log(`   Solunum: ${respiratoryDrugs.length}`);
  console.log(`   Diyabet: ${diabetesDrugs.length}`);
  console.log(`   Alerji: ${allergyDrugs.length}`);
  console.log(`   Göz: ${ophthalmicDrugs.length}`);
  console.log(`   Deri: ${dermatologicDrugs.length}`);
  console.log(`   Ağrı/Kas: ${painMuscleRelaxants.length}`);
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
