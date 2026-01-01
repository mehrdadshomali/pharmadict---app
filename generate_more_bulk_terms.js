// Daha fazla toplu terim üretme scripti - 10,000 terime ulaşmak için
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
// Antibiyotikler
const generateAntibiotics = () => {
  const drugs = [];
  const drugList = [
    // Penisilinler
    ["Penicillin G", "Penisilin G", "Doğal penisilin, IV"],
    ["Penicillin V", "Penisilin V", "Oral penisilin"],
    ["Ampicillin", "Ampisilin", "Aminopenisilin"],
    ["Amoxicillin", "Amoksisilin", "Aminopenisilin, oral"],
    ["Piperacillin", "Piperasilin", "Geniş spektrumlu penisilin"],
    ["Ticarcillin", "Tikarslin", "Antipsödomonal penisilin"],
    ["Oxacillin", "Oksasilin", "Penisilinaz dirençli"],
    ["Nafcillin", "Nafsilin", "Penisilinaz dirençli"],
    ["Dicloxacillin", "Dikloksasilin", "Oral antistaf penisilin"],
    ["Flucloxacillin", "Flukloksasilin", "Antistaf penisilin"],
    // Sefalosporinler
    ["Cefazolin", "Sefazolin", "1. kuşak sefalosporin"],
    ["Cephalexin", "Sefaleksin", "1. kuşak oral sefalosporin"],
    ["Cefadroxil", "Sefadroksil", "1. kuşak oral sefalosporin"],
    ["Cefuroxime", "Sefuroksim", "2. kuşak sefalosporin"],
    ["Cefaclor", "Sefaklor", "2. kuşak oral sefalosporin"],
    ["Cefprozil", "Sefprozil", "2. kuşak oral sefalosporin"],
    ["Cefoxitin", "Sefoksitin", "2. kuşak, anaerop etkinlik"],
    ["Cefotetan", "Sefotetan", "2. kuşak, anaerop etkinlik"],
    ["Ceftriaxone", "Seftriakson", "3. kuşak sefalosporin"],
    ["Cefotaxime", "Sefotaksim", "3. kuşak sefalosporin"],
    ["Ceftazidime", "Seftazidim", "3. kuşak, antipsödomonal"],
    ["Cefixime", "Sefiksim", "3. kuşak oral sefalosporin"],
    ["Cefpodoxime", "Sefpodoksim", "3. kuşak oral sefalosporin"],
    ["Cefdinir", "Sefdinir", "3. kuşak oral sefalosporin"],
    ["Cefditoren", "Sefditoren", "3. kuşak oral sefalosporin"],
    ["Cefepime", "Sefepim", "4. kuşak sefalosporin"],
    ["Ceftaroline", "Seftarolin", "5. kuşak, MRSA etkinliği"],
    ["Ceftobiprole", "Seftobiprol", "5. kuşak sefalosporin"],
    ["Ceftolozane", "Seftolozane", "Antipsödomonal sefalosporin"],
    [
      "Ceftazidime-avibactam",
      "Seftazidim-Avibaktam",
      "Beta-laktamaz inhibitörlü",
    ],
    // Karbapenemler
    ["Imipenem", "İmipenem", "Karbapenem"],
    ["Meropenem", "Meropenem", "Karbapenem"],
    ["Ertapenem", "Ertapenem", "Karbapenem, günde tek doz"],
    ["Doripenem", "Doripenem", "Karbapenem"],
    // Monobaktamlar
    ["Aztreonam", "Aztreonam", "Monobaktam, gram negatif"],
    // Aminoglikozidler
    ["Gentamicin", "Gentamisin", "Aminoglikozid"],
    ["Tobramycin", "Tobramisin", "Aminoglikozid"],
    ["Amikacin", "Amikasin", "Aminoglikozid"],
    ["Streptomycin", "Streptomisin", "Aminoglikozid, TB"],
    ["Neomycin", "Neomisin", "Topikal aminoglikozid"],
    ["Kanamycin", "Kanamisin", "Aminoglikozid"],
    ["Plazomicin", "Plazomisin", "Yeni aminoglikozid"],
    // Makrolidler
    ["Erythromycin", "Eritromisin", "Makrolid"],
    ["Azithromycin", "Azitromisin", "Azalid makrolid"],
    ["Clarithromycin", "Klaritromisin", "Makrolid"],
    ["Fidaxomicin", "Fidaksomisin", "Makrosiklik, C. diff"],
    // Tetrasiklinler
    ["Tetracycline", "Tetrasiklin", "Tetrasiklin"],
    ["Doxycycline", "Doksisiklin", "Tetrasiklin"],
    ["Minocycline", "Minosiklin", "Tetrasiklin"],
    ["Tigecycline", "Tigesiklin", "Glisisiklin"],
    ["Eravacycline", "Eravasiklin", "Florosiklin"],
    ["Omadacycline", "Omadasiklin", "Aminometilsiklin"],
    // Florokinolonlar
    ["Ciprofloxacin", "Siprofloksasin", "Florokinolon"],
    ["Levofloxacin", "Levofloksasin", "Florokinolon"],
    ["Moxifloxacin", "Moksifloksasin", "Florokinolon"],
    ["Ofloxacin", "Ofloksasin", "Florokinolon"],
    ["Norfloxacin", "Norfloksasin", "Florokinolon, üriner"],
    ["Gemifloxacin", "Gemifloksasin", "Florokinolon"],
    ["Delafloxacin", "Delafloksasin", "Yeni florokinolon"],
    // Glikopeptidler
    ["Vancomycin", "Vankomisin", "Glikopeptid, MRSA"],
    ["Teicoplanin", "Teikoplanin", "Glikopeptid"],
    ["Telavancin", "Telavansin", "Lipoglikopeptid"],
    ["Dalbavancin", "Dalbavansin", "Lipoglikopeptid, uzun etkili"],
    ["Oritavancin", "Oritavansin", "Lipoglikopeptid, tek doz"],
    // Oksazolidinonlar
    ["Linezolid", "Linezolid", "Oksazolidinon, MRSA, VRE"],
    ["Tedizolid", "Tedizolid", "Oksazolidinon"],
    // Diğer antibiyotikler
    ["Clindamycin", "Klindamisin", "Linkozamid"],
    ["Metronidazole", "Metronidazol", "Nitroimidazol, anaerop"],
    ["Trimethoprim", "Trimetoprim", "Folat antagonisti"],
    ["Sulfamethoxazole", "Sülfametoksazol", "Sülfonamid"],
    ["Nitrofurantoin", "Nitrofurantoin", "Üriner antiseptik"],
    ["Fosfomycin", "Fosfomisin", "Fosfonik asit türevi"],
    ["Colistin", "Kolistin", "Polimiksin E"],
    ["Polymyxin B", "Polimiksin B", "Polimiksin"],
    ["Daptomycin", "Daptomisin", "Siklik lipopeptid"],
    ["Quinupristin-dalfopristin", "Kinupristin-Dalfopristin", "Streptogramin"],
    ["Rifampin", "Rifampin", "Rifamisin, TB"],
    ["Rifabutin", "Rifabutin", "Rifamisin, MAC"],
    ["Rifaximin", "Rifaksimin", "Bağırsak rifamisin"],
    ["Chloramphenicol", "Kloramfenikol", "Geniş spektrum"],
    ["Mupirocin", "Mupirosin", "Topikal antibiyotik"],
    ["Retapamulin", "Retapamulin", "Topikal pleuromutilin"],
    ["Lefamulin", "Lefamulin", "Sistemik pleuromutilin"],
    ["Fusidic acid", "Fusidik Asit", "Steroid antibiyotik"],
    ["Bacitracin", "Basitrasin", "Topikal polipeptid"],
    ["Gramicidin", "Gramisidin", "Topikal polipeptid"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Antifungaller
const generateAntifungals = () => {
  const drugs = [];
  const drugList = [
    ["Amphotericin B", "Amfoterisin B", "Polien antifungal"],
    [
      "Amphotericin B liposomal",
      "Lipozomal Amfoterisin B",
      "Lipid formülasyon",
    ],
    ["Nystatin", "Nistatin", "Topikal polien"],
    ["Fluconazole", "Flukonazol", "Triazol antifungal"],
    ["Itraconazole", "İtrakonazol", "Triazol antifungal"],
    ["Voriconazole", "Vorikonazol", "Triazol antifungal"],
    ["Posaconazole", "Posakonazol", "Triazol antifungal"],
    ["Isavuconazole", "İsavukonazol", "Triazol antifungal"],
    ["Ketoconazole", "Ketokonazol", "İmidazol antifungal"],
    ["Miconazole", "Mikonazol", "Topikal imidazol"],
    ["Clotrimazole", "Klotrimazol", "Topikal imidazol"],
    ["Econazole", "Ekonazol", "Topikal imidazol"],
    ["Oxiconazole", "Oksikonazol", "Topikal imidazol"],
    ["Sulconazole", "Sülkonazol", "Topikal imidazol"],
    ["Sertaconazole", "Sertakonazol", "Topikal imidazol"],
    ["Luliconazole", "Lulikonazol", "Topikal imidazol"],
    ["Efinaconazole", "Efinakonazol", "Topikal triazol, onikomikoz"],
    ["Caspofungin", "Kaspofungin", "Ekinokandin"],
    ["Micafungin", "Mikafungin", "Ekinokandin"],
    ["Anidulafungin", "Anidulafungin", "Ekinokandin"],
    ["Rezafungin", "Rezafungin", "Uzun etkili ekinokandin"],
    ["Terbinafine", "Terbinafin", "Allilamin antifungal"],
    ["Naftifine", "Naftifin", "Topikal allilamin"],
    ["Butenafine", "Butenafin", "Topikal benzilamin"],
    ["Griseofulvin", "Griseofulvin", "Dermatofit antifungal"],
    ["Flucytosine", "Flusitozin", "Pirimidin analoğu"],
    ["Ciclopirox", "Siklopiroks", "Topikal antifungal"],
    ["Tavaborole", "Tavaborol", "Topikal, onikomikoz"],
    ["Tolnaftate", "Tolnaftat", "Topikal antifungal"],
    ["Undecylenic acid", "Undesilenik Asit", "Topikal antifungal"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Antikanser ilaçları
const generateAntineoplastics = () => {
  const drugs = [];
  const drugList = [
    // Alkilleyici ajanlar
    ["Cyclophosphamide", "Siklofosfamid", "Alkilleyici ajan"],
    ["Ifosfamide", "İfosfamid", "Alkilleyici ajan"],
    ["Melphalan", "Melfalan", "Alkilleyici ajan"],
    ["Chlorambucil", "Klorambusil", "Alkilleyici ajan"],
    ["Busulfan", "Busulfan", "Alkilleyici ajan"],
    ["Bendamustine", "Bendamustin", "Alkilleyici ajan"],
    ["Temozolomide", "Temozolomid", "Alkilleyici ajan, beyin tümörü"],
    ["Dacarbazine", "Dakarbazin", "Alkilleyici ajan"],
    ["Procarbazine", "Prokarbazin", "Alkilleyici ajan"],
    ["Carmustine", "Karmustin", "Nitrozüre"],
    ["Lomustine", "Lomustin", "Nitrozüre"],
    ["Streptozocin", "Streptozocin", "Nitrozüre"],
    ["Thiotepa", "Tiyotepa", "Alkilleyici ajan"],
    ["Mechlorethamine", "Mekloretamin", "Nitrojen mustard"],
    // Antimetabolitler
    ["Methotrexate", "Metotreksat", "Folat antagonisti"],
    ["Pemetrexed", "Pemetrekset", "Antifolat"],
    ["Pralatrexate", "Pralatreksat", "Antifolat"],
    ["Fluorouracil", "Fluorourasil", "5-FU, pirimidin analoğu"],
    ["Capecitabine", "Kapesitabin", "Oral 5-FU ön ilacı"],
    ["Tegafur", "Tegafur", "5-FU ön ilacı"],
    ["Cytarabine", "Sitarabin", "Pirimidin analoğu"],
    ["Gemcitabine", "Gemsitabin", "Pirimidin analoğu"],
    ["Azacitidine", "Azasitidin", "Hipometilleyici ajan"],
    ["Decitabine", "Desitabin", "Hipometilleyici ajan"],
    ["Mercaptopurine", "Merkaptopürin", "Pürin analoğu"],
    ["Thioguanine", "Tiyoguanin", "Pürin analoğu"],
    ["Fludarabine", "Fludarabin", "Pürin analoğu"],
    ["Cladribine", "Kladribin", "Pürin analoğu"],
    ["Clofarabine", "Klofarabin", "Pürin analoğu"],
    ["Nelarabine", "Nelarabin", "Pürin analoğu"],
    ["Pentostatin", "Pentostatin", "Pürin analoğu"],
    ["Hydroxyurea", "Hidroksiüre", "Ribonükleotid redüktaz inhibitörü"],
    // Antitümör antibiyotikler
    ["Doxorubicin", "Doksorubisin", "Antrasiklin"],
    ["Daunorubicin", "Daunorubisin", "Antrasiklin"],
    ["Epirubicin", "Epirubisin", "Antrasiklin"],
    ["Idarubicin", "İdarubisin", "Antrasiklin"],
    ["Mitoxantrone", "Mitoksantron", "Antrasendion"],
    ["Bleomycin", "Bleomisin", "Glikopeptid antibiyotik"],
    ["Mitomycin", "Mitomisin", "Antitümör antibiyotik"],
    ["Dactinomycin", "Daktinomisin", "Aktinomisin D"],
    // Vinka alkaloidleri
    ["Vincristine", "Vinkristin", "Vinka alkaloidi"],
    ["Vinblastine", "Vinblastin", "Vinka alkaloidi"],
    ["Vinorelbine", "Vinorelbin", "Vinka alkaloidi"],
    ["Vindesine", "Vindesin", "Vinka alkaloidi"],
    // Taksanlar
    ["Paclitaxel", "Paklitaksel", "Taksan"],
    ["Docetaxel", "Dosetaksel", "Taksan"],
    ["Cabazitaxel", "Kabazitaksel", "Taksan"],
    ["Nab-paclitaxel", "Nab-Paklitaksel", "Albümin bağlı paklitaksel"],
    // Platin bileşikleri
    ["Cisplatin", "Sisplatin", "Platin bileşiği"],
    ["Carboplatin", "Karboplatin", "Platin bileşiği"],
    ["Oxaliplatin", "Oksaliplatin", "Platin bileşiği"],
    // Topoizomeraz inhibitörleri
    ["Etoposide", "Etoposid", "Topoizomeraz II inhibitörü"],
    ["Teniposide", "Teniposid", "Topoizomeraz II inhibitörü"],
    ["Irinotecan", "İrinotekan", "Topoizomeraz I inhibitörü"],
    ["Topotecan", "Topotekan", "Topoizomeraz I inhibitörü"],
    // Tirozin kinaz inhibitörleri
    ["Imatinib", "İmatinib", "BCR-ABL inhibitörü"],
    ["Dasatinib", "Dasatinib", "BCR-ABL inhibitörü"],
    ["Nilotinib", "Nilotinib", "BCR-ABL inhibitörü"],
    ["Bosutinib", "Bosutinib", "BCR-ABL inhibitörü"],
    ["Ponatinib", "Ponatinib", "BCR-ABL inhibitörü"],
    ["Asciminib", "Asciminib", "STAMP inhibitörü"],
    ["Gefitinib", "Gefitinib", "EGFR inhibitörü"],
    ["Erlotinib", "Erlotinib", "EGFR inhibitörü"],
    ["Afatinib", "Afatinib", "EGFR inhibitörü"],
    ["Osimertinib", "Osimertinib", "3. kuşak EGFR inhibitörü"],
    ["Lapatinib", "Lapatinib", "HER2 inhibitörü"],
    ["Neratinib", "Neratinib", "HER2 inhibitörü"],
    ["Tucatinib", "Tukatinib", "HER2 inhibitörü"],
    ["Sorafenib", "Sorafenib", "Multikinaz inhibitörü"],
    ["Sunitinib", "Sunitinib", "Multikinaz inhibitörü"],
    ["Pazopanib", "Pazopanib", "Multikinaz inhibitörü"],
    ["Axitinib", "Aksitinib", "VEGFR inhibitörü"],
    ["Cabozantinib", "Kabozantinib", "Multikinaz inhibitörü"],
    ["Lenvatinib", "Lenvatinib", "Multikinaz inhibitörü"],
    ["Regorafenib", "Regorafenib", "Multikinaz inhibitörü"],
    ["Vandetanib", "Vandetanib", "Multikinaz inhibitörü"],
    ["Crizotinib", "Krizotinib", "ALK inhibitörü"],
    ["Ceritinib", "Seritinib", "ALK inhibitörü"],
    ["Alectinib", "Alektinib", "ALK inhibitörü"],
    ["Brigatinib", "Brigatinib", "ALK inhibitörü"],
    ["Lorlatinib", "Lorlatinib", "ALK inhibitörü"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// İmmünoterapi ve monoklonal antikorlar
const generateImmunotherapy = () => {
  const drugs = [];
  const drugList = [
    // Checkpoint inhibitörleri
    ["Pembrolizumab", "Pembrolizumab", "Anti-PD-1"],
    ["Nivolumab", "Nivolumab", "Anti-PD-1"],
    ["Cemiplimab", "Semiplimab", "Anti-PD-1"],
    ["Dostarlimab", "Dostarlimab", "Anti-PD-1"],
    ["Atezolizumab", "Atezolizumab", "Anti-PD-L1"],
    ["Durvalumab", "Durvalumab", "Anti-PD-L1"],
    ["Avelumab", "Avelumab", "Anti-PD-L1"],
    ["Ipilimumab", "İpilimumab", "Anti-CTLA-4"],
    ["Tremelimumab", "Tremelimumab", "Anti-CTLA-4"],
    // Anti-HER2
    ["Trastuzumab", "Trastuzumab", "Anti-HER2"],
    ["Pertuzumab", "Pertuzumab", "Anti-HER2"],
    ["Trastuzumab emtansine", "Trastuzumab Emtansin", "ADC, T-DM1"],
    ["Trastuzumab deruxtecan", "Trastuzumab Derukstekan", "ADC"],
    ["Margetuximab", "Margetuksimab", "Anti-HER2"],
    // Anti-CD20
    ["Rituximab", "Rituksimab", "Anti-CD20"],
    ["Obinutuzumab", "Obinutuzumab", "Anti-CD20"],
    ["Ofatumumab", "Ofatumumab", "Anti-CD20"],
    ["Ocrelizumab", "Okrelizumab", "Anti-CD20, MS"],
    // Diğer monoklonal antikorlar
    ["Bevacizumab", "Bevasizumab", "Anti-VEGF"],
    ["Ramucirumab", "Ramusirumab", "Anti-VEGFR2"],
    ["Cetuximab", "Setuksimab", "Anti-EGFR"],
    ["Panitumumab", "Panitumumab", "Anti-EGFR"],
    ["Necitumumab", "Nesitumumab", "Anti-EGFR"],
    ["Daratumumab", "Daratumumab", "Anti-CD38"],
    ["Isatuximab", "İsatuksimab", "Anti-CD38"],
    ["Elotuzumab", "Elotuzumab", "Anti-SLAMF7"],
    ["Brentuximab vedotin", "Brentuksimab Vedotin", "Anti-CD30 ADC"],
    ["Polatuzumab vedotin", "Polatuzumab Vedotin", "Anti-CD79b ADC"],
    ["Enfortumab vedotin", "Enfortumab Vedotin", "Anti-Nectin-4 ADC"],
    ["Sacituzumab govitecan", "Sasituzumab Govitekan", "Anti-Trop-2 ADC"],
    ["Gemtuzumab ozogamicin", "Gemtuzumab Ozogamisin", "Anti-CD33 ADC"],
    ["Inotuzumab ozogamicin", "İnotuzumab Ozogamisin", "Anti-CD22 ADC"],
    ["Blinatumomab", "Blinatumomab", "BiTE, CD19-CD3"],
    ["Alemtuzumab", "Alemtuzumab", "Anti-CD52"],
    ["Mogamulizumab", "Mogamulizumab", "Anti-CCR4"],
    ["Dinutuximab", "Dinutuksimab", "Anti-GD2"],
    // CAR-T hücre tedavileri
    ["Tisagenlecleucel", "Tisagenleklösel", "CAR-T, CD19"],
    ["Axicabtagene ciloleucel", "Aksikabtagene Silolösel", "CAR-T, CD19"],
    ["Brexucabtagene autoleucel", "Breksukabtagene Otolösel", "CAR-T, CD19"],
    ["Lisocabtagene maraleucel", "Lisokabtagene Maralösel", "CAR-T, CD19"],
    ["Idecabtagene vicleucel", "İdekabtagene Viklösel", "CAR-T, BCMA"],
    ["Ciltacabtagene autoleucel", "Siltakabtagene Otolösel", "CAR-T, BCMA"],
    // Bisfosifik antikorlar
    ["Teclistamab", "Teklistamab", "Bispecific, BCMA-CD3"],
    ["Mosunetuzumab", "Mosunetuzumab", "Bispecific, CD20-CD3"],
    ["Glofitamab", "Glofitamab", "Bispecific, CD20-CD3"],
    ["Epcoritamab", "Epkoritamab", "Bispecific, CD20-CD3"],
  ];

  drugList.forEach(([latin, turkish, def]) => {
    drugs.push(createTerm(latin, turkish, TermCategory.DRUG, def));
  });

  return drugs;
};

// Solunum sistemi hastalıkları
const generateRespiratoryDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Asthma", "Astım", "Kronik hava yolu inflamasyonu"],
    ["Allergic asthma", "Alerjik Astım", "Atopik astım"],
    ["Exercise-induced asthma", "Egzersize Bağlı Astım", "EIA"],
    ["Occupational asthma", "Mesleki Astım", "İşe bağlı astım"],
    ["Severe asthma", "Şiddetli Astım", "Dirençli astım"],
    ["Status asthmaticus", "Status Astmatikus", "Şiddetli astım atağı"],
    ["COPD", "KOAH", "Kronik obstrüktif akciğer hastalığı"],
    ["Chronic bronchitis", "Kronik Bronşit", "Kronik öksürük, balgam"],
    ["Emphysema", "Amfizem", "Alveol harabiyeti"],
    [
      "Alpha-1 antitrypsin deficiency",
      "Alfa-1 Antitripsin Eksikliği",
      "Genetik KOAH",
    ],
    ["Bronchiectasis", "Bronşektazi", "Bronş genişlemesi"],
    ["Cystic fibrosis", "Kistik Fibrozis", "CF, genetik hastalık"],
    ["Pneumonia", "Pnömoni", "Akciğer enfeksiyonu"],
    ["Community-acquired pneumonia", "Toplum Kökenli Pnömoni", "CAP"],
    ["Hospital-acquired pneumonia", "Hastane Kökenli Pnömoni", "HAP"],
    ["Ventilator-associated pneumonia", "Ventilatör İlişkili Pnömoni", "VAP"],
    [
      "Aspiration pneumonia",
      "Aspirasyon Pnömonisi",
      "Yutma bozukluğu pnömonisi",
    ],
    ["Pneumocystis pneumonia", "Pnömosistis Pnömonisi", "PCP, AIDS"],
    ["Legionella pneumonia", "Lejyonella Pnömonisi", "Lejyoner hastalığı"],
    ["Mycoplasma pneumonia", "Mikoplazma Pnömonisi", "Atipik pnömoni"],
    ["Viral pneumonia", "Viral Pnömoni", "Virüs kaynaklı pnömoni"],
    ["COVID-19 pneumonia", "COVID-19 Pnömonisi", "SARS-CoV-2 pnömonisi"],
    ["Tuberculosis", "Tüberküloz", "TB, verem"],
    ["Pulmonary tuberculosis", "Pulmoner Tüberküloz", "Akciğer tüberkülozu"],
    ["Miliary tuberculosis", "Miliyer Tüberküloz", "Yaygın TB"],
    ["Latent tuberculosis", "Latent Tüberküloz", "Gizli TB enfeksiyonu"],
    [
      "Nontuberculous mycobacterial infection",
      "Nontüberküloz Mikobakteri Enfeksiyonu",
      "NTM",
    ],
    ["Lung abscess", "Akciğer Apsesi", "Akciğer içi apse"],
    ["Empyema", "Ampiyem", "Plevral boşlukta irin"],
    ["Pleural effusion", "Plevral Efüzyon", "Akciğer zarı sıvısı"],
    ["Pneumothorax", "Pnömotoraks", "Akciğer çökmesi"],
    ["Tension pneumothorax", "Tansiyon Pnömotoraks", "Basınçlı pnömotoraks"],
    ["Hemothorax", "Hemotoraks", "Plevral boşlukta kan"],
    ["Pulmonary embolism", "Pulmoner Emboli", "Akciğer damar tıkanıklığı"],
    ["Deep vein thrombosis", "Derin Ven Trombozu", "DVT"],
    ["Pulmonary hypertension", "Pulmoner Hipertansiyon", "PAH"],
    ["Cor pulmonale", "Kor Pulmonale", "Sağ kalp yetmezliği"],
    [
      "Acute respiratory distress syndrome",
      "Akut Solunum Sıkıntısı Sendromu",
      "ARDS",
    ],
    ["Respiratory failure", "Solunum Yetmezliği", "Akut veya kronik"],
    ["Hypoxemic respiratory failure", "Hipoksemik Solunum Yetmezliği", "Tip 1"],
    [
      "Hypercapnic respiratory failure",
      "Hiperkapnik Solunum Yetmezliği",
      "Tip 2",
    ],
    ["Interstitial lung disease", "İnterstisyel Akciğer Hastalığı", "ILD"],
    ["Idiopathic pulmonary fibrosis", "İdiyopatik Pulmoner Fibrozis", "IPF"],
    ["Sarcoidosis", "Sarkoidoz", "Granülomatöz hastalık"],
    [
      "Hypersensitivity pneumonitis",
      "Hipersensitivite Pnömonisi",
      "Ekstrinsik alerjik alveolit",
    ],
    ["Pneumoconiosis", "Pnömokonyoz", "Toz akciğer hastalığı"],
    ["Asbestosis", "Asbestoz", "Asbest maruziyeti"],
    ["Silicosis", "Silikoz", "Silika maruziyeti"],
    [
      "Coal workers pneumoconiosis",
      "Kömür İşçisi Pnömokonyozu",
      "Siyah akciğer",
    ],
    ["Lung cancer", "Akciğer Kanseri", "Bronkojenik karsinom"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Gastrointestinal hastalıklar
const generateGIDiseases = () => {
  const diseases = [];
  const diseaseList = [
    [
      "Gastroesophageal reflux disease",
      "Gastroözofageal Reflü Hastalığı",
      "GÖRH",
    ],
    ["Barrett esophagus", "Barrett Özofagusu", "Özofagus metaplazisi"],
    ["Esophageal cancer", "Özofagus Kanseri", "Özofagus malignitesi"],
    ["Esophageal varices", "Özofagus Varisleri", "Portal hipertansiyon"],
    ["Achalasia", "Akalazya", "Özofagus motilite bozukluğu"],
    ["Esophageal stricture", "Özofagus Darlığı", "Özofagus stenozu"],
    ["Eosinophilic esophagitis", "Eozinofilik Özofajit", "EoE"],
    ["Peptic ulcer disease", "Peptik Ülser Hastalığı", "Mide/duodenum ülseri"],
    ["Gastric ulcer", "Mide Ülseri", "Gastrik ülser"],
    ["Duodenal ulcer", "Duodenum Ülseri", "Onikiparmak bağırsağı ülseri"],
    [
      "Helicobacter pylori infection",
      "Helicobacter Pylori Enfeksiyonu",
      "H. pylori",
    ],
    ["Gastritis", "Gastrit", "Mide iltihabı"],
    ["Atrophic gastritis", "Atrofik Gastrit", "Kronik gastrit"],
    ["Autoimmune gastritis", "Otoimmün Gastrit", "Pernisiyöz anemi"],
    ["Gastroparesis", "Gastroparezi", "Mide boşalma gecikmesi"],
    ["Gastric cancer", "Mide Kanseri", "Gastrik karsinom"],
    ["GIST", "GIST", "Gastrointestinal stromal tümör"],
    ["Celiac disease", "Çölyak Hastalığı", "Gluten enteropatisi"],
    ["Crohn disease", "Crohn Hastalığı", "İnflamatuar bağırsak hastalığı"],
    ["Ulcerative colitis", "Ülseratif Kolit", "İnflamatuar bağırsak hastalığı"],
    ["Inflammatory bowel disease", "İnflamatuar Bağırsak Hastalığı", "IBD"],
    ["Irritable bowel syndrome", "İrritabl Bağırsak Sendromu", "IBS"],
    [
      "Small intestinal bacterial overgrowth",
      "İnce Bağırsak Bakteri Aşırı Çoğalması",
      "SIBO",
    ],
    ["Lactose intolerance", "Laktoz İntoleransı", "Laktaz eksikliği"],
    ["Malabsorption syndrome", "Malabsorpsiyon Sendromu", "Emilim bozukluğu"],
    ["Short bowel syndrome", "Kısa Bağırsak Sendromu", "SBS"],
    ["Intestinal obstruction", "Bağırsak Tıkanıklığı", "İleus"],
    ["Paralytic ileus", "Paralitik İleus", "Fonksiyonel tıkanıklık"],
    ["Volvulus", "Volvulus", "Bağırsak dönmesi"],
    ["Intussusception", "İntusepsiyon", "Bağırsak içine girme"],
    ["Appendicitis", "Apandisit", "Apendiks iltihabı"],
    ["Diverticulitis", "Divertikülit", "Divertikül iltihabı"],
    ["Diverticulosis", "Divertiküloz", "Divertikül oluşumu"],
    ["Colorectal cancer", "Kolorektal Kanser", "Kolon/rektum kanseri"],
    ["Colon polyps", "Kolon Polipleri", "Adenomatöz polipler"],
    ["Familial adenomatous polyposis", "Ailesel Adenomatöz Polipozis", "FAP"],
    ["Lynch syndrome", "Lynch Sendromu", "HNPCC"],
    ["Hemorrhoids", "Hemoroid", "Basur"],
    ["Anal fissure", "Anal Fissür", "Anüs çatlağı"],
    ["Anal fistula", "Anal Fistül", "Perianal fistül"],
    ["Perianal abscess", "Perianal Apse", "Anüs çevresi apse"],
    ["Rectal prolapse", "Rektal Prolapsus", "Rektum sarkması"],
    ["Fecal incontinence", "Fekal İnkontinans", "Dışkı kaçırma"],
    ["Constipation", "Kabızlık", "Konstipasyon"],
    ["Chronic constipation", "Kronik Kabızlık", "Kronik konstipasyon"],
    ["Diarrhea", "İshal", "Diyare"],
    ["Acute diarrhea", "Akut İshal", "Akut diyare"],
    ["Chronic diarrhea", "Kronik İshal", "Kronik diyare"],
    ["Infectious diarrhea", "Enfeksiyöz İshal", "Gastroenterit"],
    [
      "Clostridium difficile infection",
      "Clostridium Difficile Enfeksiyonu",
      "C. diff",
    ],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Karaciğer ve safra yolu hastalıkları
const generateHepatobiliaryDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Hepatitis A", "Hepatit A", "HAV enfeksiyonu"],
    ["Hepatitis B", "Hepatit B", "HBV enfeksiyonu"],
    ["Chronic hepatitis B", "Kronik Hepatit B", "Kronik HBV"],
    ["Hepatitis C", "Hepatit C", "HCV enfeksiyonu"],
    ["Chronic hepatitis C", "Kronik Hepatit C", "Kronik HCV"],
    ["Hepatitis D", "Hepatit D", "HDV enfeksiyonu"],
    ["Hepatitis E", "Hepatit E", "HEV enfeksiyonu"],
    ["Autoimmune hepatitis", "Otoimmün Hepatit", "AIH"],
    ["Alcoholic liver disease", "Alkolik Karaciğer Hastalığı", "ALD"],
    ["Alcoholic hepatitis", "Alkolik Hepatit", "Akut alkolik karaciğer"],
    [
      "Nonalcoholic fatty liver disease",
      "Nonalkolik Yağlı Karaciğer Hastalığı",
      "NAFLD",
    ],
    ["Nonalcoholic steatohepatitis", "Nonalkolik Steatohepatit", "NASH"],
    ["Cirrhosis", "Siroz", "Karaciğer sirozu"],
    ["Decompensated cirrhosis", "Dekompanse Siroz", "İleri siroz"],
    ["Portal hypertension", "Portal Hipertansiyon", "Portal ven basınç artışı"],
    ["Ascites", "Asit", "Karın içi sıvı birikimi"],
    [
      "Spontaneous bacterial peritonitis",
      "Spontan Bakteriyel Peritonit",
      "SBP",
    ],
    [
      "Hepatic encephalopathy",
      "Hepatik Ensefalopati",
      "Karaciğer ensefalopatisi",
    ],
    ["Hepatorenal syndrome", "Hepatorenal Sendrom", "HRS"],
    ["Hepatopulmonary syndrome", "Hepatopulmoner Sendrom", "HPS"],
    ["Acute liver failure", "Akut Karaciğer Yetmezliği", "Fulminan hepatit"],
    ["Drug-induced liver injury", "İlaca Bağlı Karaciğer Hasarı", "DILI"],
    ["Primary biliary cholangitis", "Primer Biliyer Kolanjit", "PBC"],
    ["Primary sclerosing cholangitis", "Primer Sklerozan Kolanjit", "PSC"],
    ["Cholangiocarcinoma", "Kolanjiyokarsinom", "Safra yolu kanseri"],
    ["Hepatocellular carcinoma", "Hepatosellüler Karsinom", "HCC"],
    ["Liver metastases", "Karaciğer Metastazları", "Sekonder karaciğer tümörü"],
    ["Hemangioma", "Hemanjiom", "Karaciğer hemanjiom"],
    ["Focal nodular hyperplasia", "Fokal Nodüler Hiperplazi", "FNH"],
    ["Hepatic adenoma", "Hepatik Adenom", "Karaciğer adenomu"],
    ["Cholelithiasis", "Kolelitiazis", "Safra taşı"],
    ["Cholecystitis", "Kolesistit", "Safra kesesi iltihabı"],
    ["Acute cholecystitis", "Akut Kolesistit", "Akut safra kesesi iltihabı"],
    [
      "Chronic cholecystitis",
      "Kronik Kolesistit",
      "Kronik safra kesesi iltihabı",
    ],
    ["Choledocholithiasis", "Koledokolitiazis", "Safra kanalı taşı"],
    ["Cholangitis", "Kolanjit", "Safra yolu iltihabı"],
    ["Acute cholangitis", "Akut Kolanjit", "Akut safra yolu enfeksiyonu"],
    ["Biliary stricture", "Biliyer Darlık", "Safra yolu stenozu"],
    ["Gallbladder cancer", "Safra Kesesi Kanseri", "Safra kesesi malignitesi"],
    ["Pancreatitis", "Pankreatit", "Pankreas iltihabı"],
    ["Acute pancreatitis", "Akut Pankreatit", "Akut pankreas iltihabı"],
    ["Chronic pancreatitis", "Kronik Pankreatit", "Kronik pankreas iltihabı"],
    ["Pancreatic pseudocyst", "Pankreatik Psödokist", "Pankreas psödokisti"],
    ["Pancreatic cancer", "Pankreas Kanseri", "Pankreatik adenokarsinom"],
    [
      "Pancreatic neuroendocrine tumor",
      "Pankreatik Nöroendokrin Tümör",
      "PNET",
    ],
    ["Insulinoma", "İnsülinoma", "İnsülin salgılayan tümör"],
    ["Gastrinoma", "Gastrinoma", "Zollinger-Ellison sendromu"],
    ["Glucagonoma", "Glukagonoma", "Glukagon salgılayan tümör"],
    ["VIPoma", "VIPoma", "VIP salgılayan tümör"],
    ["Somatostatinoma", "Somatostatinoma", "Somatostatin salgılayan tümör"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Böbrek ve üriner sistem hastalıkları
const generateRenalDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Acute kidney injury", "Akut Böbrek Hasarı", "AKI"],
    [
      "Prerenal acute kidney injury",
      "Prerenal Akut Böbrek Hasarı",
      "Prerenal AKI",
    ],
    [
      "Intrinsic acute kidney injury",
      "İntrinsik Akut Böbrek Hasarı",
      "Renal AKI",
    ],
    [
      "Postrenal acute kidney injury",
      "Postrenal Akut Böbrek Hasarı",
      "Obstrüktif AKI",
    ],
    ["Chronic kidney disease", "Kronik Böbrek Hastalığı", "KBH"],
    ["End-stage renal disease", "Son Dönem Böbrek Hastalığı", "SDBY"],
    [
      "Diabetic nephropathy",
      "Diyabetik Nefropati",
      "Diyabetik böbrek hastalığı",
    ],
    [
      "Hypertensive nephrosclerosis",
      "Hipertansif Nefroskleroz",
      "Hipertansif böbrek hastalığı",
    ],
    ["Glomerulonephritis", "Glomerülonefrit", "Glomerül iltihabı"],
    ["Acute glomerulonephritis", "Akut Glomerülonefrit", "Akut GN"],
    ["Chronic glomerulonephritis", "Kronik Glomerülonefrit", "Kronik GN"],
    ["IgA nephropathy", "IgA Nefropatisi", "Berger hastalığı"],
    ["Membranous nephropathy", "Membranöz Nefropati", "MN"],
    ["Minimal change disease", "Minimal Değişiklik Hastalığı", "MCD"],
    [
      "Focal segmental glomerulosclerosis",
      "Fokal Segmental Glomerüloskleroz",
      "FSGS",
    ],
    [
      "Membranoproliferative glomerulonephritis",
      "Membranoproliferatif Glomerülonefrit",
      "MPGN",
    ],
    [
      "Rapidly progressive glomerulonephritis",
      "Hızlı İlerleyen Glomerülonefrit",
      "RPGN",
    ],
    ["Anti-GBM disease", "Anti-GBM Hastalığı", "Goodpasture sendromu"],
    ["Lupus nephritis", "Lupus Nefriti", "SLE böbrek tutulumu"],
    [
      "ANCA-associated vasculitis",
      "ANCA İlişkili Vaskülit",
      "AAV böbrek tutulumu",
    ],
    [
      "Nephrotic syndrome",
      "Nefrotik Sendrom",
      "Proteinüri, ödem, hipoalbüminemi",
    ],
    ["Nephritic syndrome", "Nefritik Sendrom", "Hematüri, hipertansiyon, ödem"],
    ["Acute tubular necrosis", "Akut Tübüler Nekroz", "ATN"],
    ["Acute interstitial nephritis", "Akut İnterstisyel Nefrit", "AIN"],
    ["Chronic interstitial nephritis", "Kronik İnterstisyel Nefrit", "CIN"],
    ["Polycystic kidney disease", "Polikistik Böbrek Hastalığı", "PKD"],
    ["Autosomal dominant PKD", "Otozomal Dominant PKD", "ADPKD"],
    ["Autosomal recessive PKD", "Otozomal Resesif PKD", "ARPKD"],
    ["Medullary sponge kidney", "Medüller Sünger Böbrek", "MSK"],
    ["Renal artery stenosis", "Renal Arter Stenozu", "Böbrek damar darlığı"],
    ["Renal vein thrombosis", "Renal Ven Trombozu", "Böbrek ven tıkanıklığı"],
    ["Nephrolithiasis", "Nefrolitiazis", "Böbrek taşı"],
    [
      "Calcium oxalate stones",
      "Kalsiyum Oksalat Taşları",
      "En sık böbrek taşı",
    ],
    ["Uric acid stones", "Ürik Asit Taşları", "Ürat taşları"],
    ["Struvite stones", "Strüvit Taşları", "Enfeksiyon taşları"],
    ["Cystine stones", "Sistin Taşları", "Sistinüri"],
    ["Urinary tract infection", "Üriner Sistem Enfeksiyonu", "ÜSE"],
    ["Cystitis", "Sistit", "Mesane iltihabı"],
    ["Pyelonephritis", "Piyelonefrit", "Böbrek enfeksiyonu"],
    ["Acute pyelonephritis", "Akut Piyelonefrit", "Akut böbrek enfeksiyonu"],
    [
      "Chronic pyelonephritis",
      "Kronik Piyelonefrit",
      "Kronik böbrek enfeksiyonu",
    ],
    ["Urethritis", "Üretrit", "Üretra iltihabı"],
    ["Prostatitis", "Prostatit", "Prostat iltihabı"],
    ["Benign prostatic hyperplasia", "Benign Prostat Hiperplazisi", "BPH"],
    ["Prostate cancer", "Prostat Kanseri", "Prostat adenokarsinomu"],
    ["Bladder cancer", "Mesane Kanseri", "Mesane karsinomu"],
    ["Renal cell carcinoma", "Renal Hücreli Karsinom", "Böbrek kanseri"],
    ["Wilms tumor", "Wilms Tümörü", "Nefroblastom"],
    ["Neurogenic bladder", "Nörojenik Mesane", "Mesane disfonksiyonu"],
    ["Overactive bladder", "Aşırı Aktif Mesane", "OAB"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Hematolojik hastalıklar
const generateHematologicDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Iron deficiency anemia", "Demir Eksikliği Anemisi", "En sık anemi"],
    [
      "Vitamin B12 deficiency anemia",
      "B12 Eksikliği Anemisi",
      "Megaloblastik anemi",
    ],
    [
      "Folate deficiency anemia",
      "Folat Eksikliği Anemisi",
      "Megaloblastik anemi",
    ],
    [
      "Anemia of chronic disease",
      "Kronik Hastalık Anemisi",
      "İnflamasyon anemisi",
    ],
    ["Aplastic anemia", "Aplastik Anemi", "Kemik iliği yetmezliği"],
    ["Hemolytic anemia", "Hemolitik Anemi", "Eritrosit yıkımı"],
    ["Autoimmune hemolytic anemia", "Otoimmün Hemolitik Anemi", "AIHA"],
    [
      "Warm autoimmune hemolytic anemia",
      "Sıcak Otoimmün Hemolitik Anemi",
      "Sıcak AIHA",
    ],
    ["Cold agglutinin disease", "Soğuk Aglütinin Hastalığı", "Soğuk AIHA"],
    [
      "Paroxysmal nocturnal hemoglobinuria",
      "Paroksismal Noktürnal Hemoglobinüri",
      "PNH",
    ],
    ["Hereditary spherocytosis", "Herediter Sferositoz", "HS"],
    ["Hereditary elliptocytosis", "Herediter Eliptositoz", "HE"],
    ["G6PD deficiency", "G6PD Eksikliği", "Favizm"],
    ["Pyruvate kinase deficiency", "Piruvat Kinaz Eksikliği", "PK eksikliği"],
    ["Sickle cell disease", "Orak Hücreli Anemi", "SCD"],
    ["Sickle cell trait", "Orak Hücre Taşıyıcılığı", "HbAS"],
    ["Thalassemia", "Talasemi", "Hemoglobin sentez bozukluğu"],
    ["Alpha thalassemia", "Alfa Talasemi", "Alfa globin eksikliği"],
    ["Beta thalassemia", "Beta Talasemi", "Beta globin eksikliği"],
    ["Thalassemia major", "Talasemi Major", "Cooley anemisi"],
    ["Thalassemia intermedia", "Talasemi İntermedia", "Orta şiddetli talasemi"],
    ["Thalassemia minor", "Talasemi Minor", "Talasemi taşıyıcılığı"],
    ["Polycythemia vera", "Polisitemia Vera", "PV, eritrositoz"],
    ["Secondary polycythemia", "Sekonder Polisitemi", "İkincil eritrositoz"],
    ["Essential thrombocythemia", "Esansiyel Trombositemi", "ET"],
    ["Primary myelofibrosis", "Primer Miyelofibrozis", "PMF"],
    ["Myelodysplastic syndrome", "Miyelodisplastik Sendrom", "MDS"],
    ["Acute myeloid leukemia", "Akut Miyeloid Lösemi", "AML"],
    ["Acute lymphoblastic leukemia", "Akut Lenfoblastik Lösemi", "ALL"],
    ["Chronic myeloid leukemia", "Kronik Miyeloid Lösemi", "KML"],
    ["Chronic lymphocytic leukemia", "Kronik Lenfositik Lösemi", "KLL"],
    ["Hairy cell leukemia", "Tüylü Hücreli Lösemi", "HCL"],
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
    ["T-cell lymphoma", "T Hücreli Lenfoma", "TCL"],
    ["Mycosis fungoides", "Mikozis Fungoides", "Kutanöz T hücreli lenfoma"],
    ["Multiple myeloma", "Multipl Miyelom", "MM, plazma hücre diskrazisi"],
    [
      "Monoclonal gammopathy of undetermined significance",
      "Önemi Belirsiz Monoklonal Gamopati",
      "MGUS",
    ],
    ["Waldenstrom macroglobulinemia", "Waldenström Makroglobulinemisi", "WM"],
    ["Amyloidosis", "Amiloidoz", "Amiloid birikimi"],
    ["AL amyloidosis", "AL Amiloidoz", "Primer amiloidoz"],
    ["Thrombocytopenia", "Trombositopeni", "Düşük trombosit"],
    ["Immune thrombocytopenia", "İmmün Trombositopeni", "ITP"],
    [
      "Thrombotic thrombocytopenic purpura",
      "Trombotik Trombositopenik Purpura",
      "TTP",
    ],
    ["Hemolytic uremic syndrome", "Hemolitik Üremik Sendrom", "HÜS"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Romatolojik hastalıklar
const generateRheumatologicDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Rheumatoid arthritis", "Romatoid Artrit", "RA, otoimmün artrit"],
    ["Osteoarthritis", "Osteoartrit", "Dejeneratif eklem hastalığı"],
    ["Gout", "Gut", "Ürik asit artropatisi"],
    ["Pseudogout", "Psödogut", "CPPD hastalığı"],
    ["Systemic lupus erythematosus", "Sistemik Lupus Eritematozus", "SLE"],
    ["Drug-induced lupus", "İlaca Bağlı Lupus", "DIL"],
    ["Discoid lupus", "Diskoid Lupus", "Kutanöz lupus"],
    ["Antiphospholipid syndrome", "Antifosfolipid Sendromu", "APS"],
    ["Sjogren syndrome", "Sjögren Sendromu", "Sicca sendromu"],
    ["Systemic sclerosis", "Sistemik Skleroz", "Skleroderma"],
    [
      "Limited cutaneous systemic sclerosis",
      "Sınırlı Kutanöz Sistemik Skleroz",
      "CREST sendromu",
    ],
    [
      "Diffuse cutaneous systemic sclerosis",
      "Diffüz Kutanöz Sistemik Skleroz",
      "dcSSc",
    ],
    ["Mixed connective tissue disease", "Mikst Bağ Dokusu Hastalığı", "MCTD"],
    ["Polymyositis", "Polimiyozit", "İnflamatuar miyopati"],
    ["Dermatomyositis", "Dermatomiyozit", "Deri ve kas inflamasyonu"],
    ["Inclusion body myositis", "İnklüzyon Cisimcikli Miyozit", "IBM"],
    ["Vasculitis", "Vaskülit", "Damar iltihabı"],
    ["Giant cell arteritis", "Dev Hücreli Arterit", "Temporal arterit"],
    ["Takayasu arteritis", "Takayasu Arteriti", "Büyük damar vasküliti"],
    ["Polyarteritis nodosa", "Poliarteritis Nodoza", "PAN"],
    [
      "Granulomatosis with polyangiitis",
      "Polianjitli Granülomatoz",
      "GPA, Wegener",
    ],
    ["Microscopic polyangiitis", "Mikroskopik Polianjit", "MPA"],
    [
      "Eosinophilic granulomatosis with polyangiitis",
      "Eozinofilik Polianjitli Granülomatoz",
      "EGPA, Churg-Strauss",
    ],
    ["IgA vasculitis", "IgA Vasküliti", "Henoch-Schönlein purpurası"],
    [
      "Cryoglobulinemic vasculitis",
      "Kriyoglobulinemik Vaskülit",
      "Kriyoglobulinemi",
    ],
    ["Behcet disease", "Behçet Hastalığı", "Sistemik vaskülit"],
    ["Ankylosing spondylitis", "Ankilozan Spondilit", "AS"],
    ["Psoriatic arthritis", "Psoriatik Artrit", "PsA"],
    ["Reactive arthritis", "Reaktif Artrit", "Reiter sendromu"],
    ["Enteropathic arthritis", "Enteropatik Artrit", "IBD ilişkili artrit"],
    ["Juvenile idiopathic arthritis", "Juvenil İdiyopatik Artrit", "JIA"],
    [
      "Adult-onset Still disease",
      "Erişkin Başlangıçlı Still Hastalığı",
      "AOSD",
    ],
    ["Polymyalgia rheumatica", "Polimiyalji Romatika", "PMR"],
    ["Fibromyalgia", "Fibromiyalji", "Yaygın kas ağrısı sendromu"],
    ["Relapsing polychondritis", "Relapsing Polikondrit", "Kıkırdak iltihabı"],
    ["Sarcoidosis", "Sarkoidoz", "Granülomatöz hastalık"],
    ["Familial Mediterranean fever", "Ailesel Akdeniz Ateşi", "FMF"],
    ["Gout tophi", "Gut Tofüsleri", "Ürat kristal birikimi"],
    ["Septic arthritis", "Septik Artrit", "Enfeksiyöz artrit"],
    ["Osteomyelitis", "Osteomiyelit", "Kemik enfeksiyonu"],
    ["Avascular necrosis", "Avasküler Nekroz", "Kemik nekrozu"],
    ["Osteoporosis", "Osteoporoz", "Kemik erimesi"],
    ["Osteopenia", "Osteopeni", "Düşük kemik yoğunluğu"],
    [
      "Paget disease of bone",
      "Kemik Paget Hastalığı",
      "Kemik yeniden yapılanma bozukluğu",
    ],
    [
      "Osteogenesis imperfecta",
      "Osteogenezis İmperfekta",
      "Cam kemik hastalığı",
    ],
    ["Marfan syndrome", "Marfan Sendromu", "Bağ dokusu hastalığı"],
    ["Ehlers-Danlos syndrome", "Ehlers-Danlos Sendromu", "EDS"],
    [
      "Carpal tunnel syndrome",
      "Karpal Tünel Sendromu",
      "Median sinir sıkışması",
    ],
    ["Rotator cuff tear", "Rotator Manşet Yırtığı", "Omuz tendon yırtığı"],
    ["Plantar fasciitis", "Plantar Fasiit", "Topuk ağrısı"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Dermatolojik hastalıklar
const generateDermatologicDiseases = () => {
  const diseases = [];
  const diseaseList = [
    ["Psoriasis", "Psoriazis", "Sedef hastalığı"],
    ["Plaque psoriasis", "Plak Psoriazis", "En sık psoriazis tipi"],
    ["Guttate psoriasis", "Guttat Psoriazis", "Damla psoriazis"],
    ["Inverse psoriasis", "İnvers Psoriazis", "Kıvrım psoriazisi"],
    ["Pustular psoriasis", "Püstüler Psoriazis", "Püstüllü psoriazis"],
    ["Erythrodermic psoriasis", "Eritrodermik Psoriazis", "Yaygın psoriazis"],
    ["Atopic dermatitis", "Atopik Dermatit", "Egzama"],
    ["Contact dermatitis", "Kontakt Dermatit", "Temas dermatiti"],
    [
      "Allergic contact dermatitis",
      "Alerjik Kontakt Dermatit",
      "Tip IV alerji",
    ],
    [
      "Irritant contact dermatitis",
      "İrritan Kontakt Dermatit",
      "Tahriş dermatiti",
    ],
    ["Seborrheic dermatitis", "Seboreik Dermatit", "Yağlı dermatit"],
    ["Nummular dermatitis", "Nümüler Dermatit", "Diskoid egzama"],
    ["Stasis dermatitis", "Staz Dermatiti", "Venöz dermatit"],
    ["Dyshidrotic eczema", "Dishidrotik Egzama", "Pompholyx"],
    ["Acne vulgaris", "Akne Vulgaris", "Sivilce"],
    ["Acne rosacea", "Akne Rozasea", "Rozasea"],
    ["Hidradenitis suppurativa", "Hidradenitis Süpürativa", "HS"],
    ["Folliculitis", "Folikülit", "Kıl folikülü iltihabı"],
    ["Furuncle", "Furunkül", "Çıban"],
    ["Carbuncle", "Karbonkül", "Birleşik çıban"],
    ["Cellulitis", "Selülit", "Deri altı enfeksiyonu"],
    ["Erysipelas", "Erizipel", "Yüzeyel selülit"],
    ["Impetigo", "İmpetigo", "Yüzeyel deri enfeksiyonu"],
    ["Necrotizing fasciitis", "Nekrotizan Fasiit", "Et yiyen bakteri"],
    ["Herpes simplex", "Herpes Simpleks", "Uçuk"],
    ["Herpes zoster", "Herpes Zoster", "Zona"],
    ["Varicella", "Varisella", "Su çiçeği"],
    [
      "Molluscum contagiosum",
      "Molluskum Kontagiyozum",
      "Viral deri enfeksiyonu",
    ],
    ["Verruca vulgaris", "Verruka Vulgaris", "Siğil"],
    ["Condyloma acuminatum", "Kondiloma Aküminatum", "Genital siğil"],
    ["Tinea corporis", "Tinea Korporis", "Vücut mantarı"],
    ["Tinea pedis", "Tinea Pedis", "Ayak mantarı"],
    ["Tinea cruris", "Tinea Kruris", "Kasık mantarı"],
    ["Tinea capitis", "Tinea Kapitis", "Saçlı deri mantarı"],
    ["Tinea unguium", "Tinea Ungium", "Tırnak mantarı"],
    ["Tinea versicolor", "Tinea Versikolor", "Pitiriazis versikolor"],
    ["Candidiasis", "Kandidiyaz", "Maya enfeksiyonu"],
    ["Scabies", "Uyuz", "Sarcoptes scabiei"],
    ["Pediculosis", "Pediküloz", "Bit enfestasyonu"],
    ["Urticaria", "Ürtiker", "Kurdeşen"],
    ["Chronic urticaria", "Kronik Ürtiker", "Kronik kurdeşen"],
    ["Angioedema", "Anjiyoödem", "Derin doku şişmesi"],
    ["Hereditary angioedema", "Herediter Anjiyoödem", "HAE"],
    ["Erythema multiforme", "Eritema Multiforme", "EM"],
    ["Stevens-Johnson syndrome", "Stevens-Johnson Sendromu", "SJS"],
    ["Toxic epidermal necrolysis", "Toksik Epidermal Nekroliz", "TEN"],
    ["Drug eruption", "İlaç Döküntüsü", "İlaç reaksiyonu"],
    ["Vitiligo", "Vitiligo", "Pigment kaybı"],
    ["Melasma", "Melazma", "Hiperpigmentasyon"],
    ["Alopecia areata", "Alopesi Areata", "Saç dökülmesi"],
  ];

  diseaseList.forEach(([latin, turkish, def]) => {
    diseases.push(createTerm(latin, turkish, TermCategory.DISEASE, def));
  });

  return diseases;
};

// Ek anatomi terimleri
const generateMoreAnatomy = () => {
  const anatomy = [];
  const anatomyList = [
    // Kardiyovasküler sistem
    ["Heart", "Kalp", "Kan pompalayan organ"],
    ["Right atrium", "Sağ Atriyum", "Sağ kulakçık"],
    ["Left atrium", "Sol Atriyum", "Sol kulakçık"],
    ["Right ventricle", "Sağ Ventrikül", "Sağ karıncık"],
    ["Left ventricle", "Sol Ventrikül", "Sol karıncık"],
    ["Tricuspid valve", "Triküspit Kapak", "Sağ atriyoventriküler kapak"],
    ["Mitral valve", "Mitral Kapak", "Sol atriyoventriküler kapak"],
    ["Aortic valve", "Aort Kapağı", "Aort çıkış kapağı"],
    ["Pulmonary valve", "Pulmoner Kapak", "Pulmoner arter kapağı"],
    ["Aorta", "Aort", "Ana atardamar"],
    ["Ascending aorta", "Çıkan Aort", "Aortun ilk bölümü"],
    ["Aortic arch", "Aort Arkı", "Aort kavsi"],
    ["Descending aorta", "İnen Aort", "Torasik ve abdominal aort"],
    ["Pulmonary artery", "Pulmoner Arter", "Akciğer atardamarı"],
    ["Pulmonary vein", "Pulmoner Ven", "Akciğer toplardamarı"],
    ["Superior vena cava", "Süperior Vena Kava", "Üst ana toplardamar"],
    ["Inferior vena cava", "İnferior Vena Kava", "Alt ana toplardamar"],
    ["Coronary arteries", "Koroner Arterler", "Kalp damarları"],
    ["Left anterior descending artery", "Sol Ön İnen Arter", "LAD"],
    ["Left circumflex artery", "Sol Sirkumfleks Arter", "LCx"],
    ["Right coronary artery", "Sağ Koroner Arter", "RCA"],
    ["Carotid artery", "Karotis Arteri", "Şah damarı"],
    ["Internal carotid artery", "İnternal Karotis Arteri", "İç şah damarı"],
    ["External carotid artery", "Eksternal Karotis Arteri", "Dış şah damarı"],
    ["Vertebral artery", "Vertebral Arter", "Omurga arteri"],
    ["Subclavian artery", "Subklavyen Arter", "Köprücük altı arteri"],
    ["Brachial artery", "Brakiyal Arter", "Kol arteri"],
    ["Radial artery", "Radyal Arter", "Radius arteri"],
    ["Ulnar artery", "Ulnar Arter", "Ulna arteri"],
    ["Femoral artery", "Femoral Arter", "Uyluk arteri"],
    ["Popliteal artery", "Popliteal Arter", "Diz arkası arteri"],
    ["Tibial artery", "Tibial Arter", "Kaval arteri"],
    ["Jugular vein", "Juguler Ven", "Boyun toplardamarı"],
    ["Subclavian vein", "Subklavyen Ven", "Köprücük altı veni"],
    ["Femoral vein", "Femoral Ven", "Uyluk veni"],
    ["Saphenous vein", "Safen Ven", "Bacak yüzeyel veni"],
    ["Portal vein", "Portal Ven", "Karaciğer portal veni"],
    ["Hepatic vein", "Hepatik Ven", "Karaciğer veni"],
    ["Renal artery", "Renal Arter", "Böbrek arteri"],
    ["Renal vein", "Renal Ven", "Böbrek veni"],
    // Solunum sistemi
    ["Lungs", "Akciğerler", "Solunum organları"],
    ["Right lung", "Sağ Akciğer", "Üç loblu akciğer"],
    ["Left lung", "Sol Akciğer", "İki loblu akciğer"],
    ["Trachea", "Trakea", "Nefes borusu"],
    ["Bronchi", "Bronşlar", "Ana hava yolları"],
    ["Bronchioles", "Bronşiyoller", "Küçük hava yolları"],
    ["Alveoli", "Alveoller", "Hava keseleri"],
    ["Pleura", "Plevra", "Akciğer zarı"],
    ["Diaphragm", "Diyafram", "Solunum kası"],
    ["Larynx", "Larinks", "Gırtlak"],
  ];

  anatomyList.forEach(([latin, turkish, def]) => {
    anatomy.push(createTerm(latin, turkish, TermCategory.ANATOMY, def));
  });

  return anatomy;
};

// Ek bileşenler
const generateMoreComponents = () => {
  const components = [];
  const componentList = [
    // Enzimler
    ["Amylase", "Amilaz", "Nişasta sindirimi enzimi"],
    ["Lipase", "Lipaz", "Yağ sindirimi enzimi"],
    ["Protease", "Proteaz", "Protein sindirimi enzimi"],
    ["Lactase", "Laktaz", "Laktoz sindirimi enzimi"],
    ["Pepsin", "Pepsin", "Mide proteaz enzimi"],
    ["Trypsin", "Tripsin", "Pankreas proteaz enzimi"],
    ["Chymotrypsin", "Kimotripsin", "Pankreas proteaz enzimi"],
    ["Elastase", "Elastaz", "Elastin yıkım enzimi"],
    ["Collagenase", "Kollajenaz", "Kolajen yıkım enzimi"],
    ["Hyaluronidase", "Hiyaluronidaz", "Hyaluronik asit yıkım enzimi"],
    ["Lysozyme", "Lizozim", "Antibakteriyel enzim"],
    ["Catalase", "Katalaz", "Hidrojen peroksit yıkım enzimi"],
    ["Peroxidase", "Peroksidaz", "Oksidatif enzim"],
    ["Cytochrome P450", "Sitokrom P450", "İlaç metabolizma enzimi"],
    ["Aldolase", "Aldolaz", "Glikoliz enzimi"],
    ["Enolase", "Enolaz", "Glikoliz enzimi"],
    ["Hexokinase", "Heksokinaz", "Glikoliz enzimi"],
    ["Phosphofructokinase", "Fosfofruktokinaz", "Glikoliz düzenleyici enzim"],
    ["Pyruvate kinase", "Piruvat Kinaz", "Glikoliz enzimi"],
    [
      "Lactate dehydrogenase",
      "Laktat Dehidrogenaz",
      "LDH, anaerobik metabolizma",
    ],
    ["Creatine kinase", "Kreatin Kinaz", "CK, kas enzimi"],
    ["Alkaline phosphatase", "Alkalen Fosfataz", "ALP, kemik/karaciğer enzimi"],
    ["Acid phosphatase", "Asit Fosfataz", "Prostat enzimi"],
    [
      "Gamma-glutamyl transferase",
      "Gama-Glutamil Transferaz",
      "GGT, karaciğer enzimi",
    ],
    [
      "Alanine aminotransferase",
      "Alanin Aminotransferaz",
      "ALT, karaciğer enzimi",
    ],
    [
      "Aspartate aminotransferase",
      "Aspartat Aminotransferaz",
      "AST, karaciğer enzimi",
    ],
    // Hormonlar
    ["Insulin", "İnsülin", "Kan şekeri düşürücü hormon"],
    ["Glucagon", "Glukagon", "Kan şekeri yükseltici hormon"],
    ["Cortisol", "Kortizol", "Stres hormonu"],
    ["Aldosterone", "Aldosteron", "Mineralokortikoid"],
    ["Epinephrine", "Epinefrin", "Adrenalin"],
    ["Norepinephrine", "Norepinefrin", "Noradrenalin"],
    ["Dopamine", "Dopamin", "Nörotransmitter, hormon"],
    ["Serotonin", "Serotonin", "5-HT, nörotransmitter"],
    ["Melatonin", "Melatonin", "Uyku hormonu"],
    ["Thyroxine", "Tiroksin", "T4, tiroid hormonu"],
    ["Triiodothyronine", "Triiyodotironin", "T3, aktif tiroid hormonu"],
    ["Parathyroid hormone", "Paratiroid Hormonu", "PTH, kalsiyum düzenleyici"],
    ["Calcitonin", "Kalsitonin", "Kalsiyum düşürücü hormon"],
    ["Growth hormone", "Büyüme Hormonu", "GH, somatotropin"],
    ["Prolactin", "Prolaktin", "Süt üretimi hormonu"],
    ["Oxytocin", "Oksitosin", "Doğum ve bağlanma hormonu"],
    ["Vasopressin", "Vazopressin", "ADH, antidiüretik hormon"],
    ["Follicle-stimulating hormone", "Folikül Stimüle Edici Hormon", "FSH"],
    ["Luteinizing hormone", "Lüteinize Edici Hormon", "LH"],
    ["Thyroid-stimulating hormone", "Tiroid Stimüle Edici Hormon", "TSH"],
    ["Adrenocorticotropic hormone", "Adrenokortikotropik Hormon", "ACTH"],
    ["Erythropoietin", "Eritropoetin", "EPO, kırmızı kan hücresi üretimi"],
    ["Thrombopoietin", "Trombopoetin", "TPO, trombosit üretimi"],
    ["Leptin", "Leptin", "Tokluk hormonu"],
    ["Ghrelin", "Grelin", "Açlık hormonu"],
  ];

  componentList.forEach(([latin, turkish, def]) => {
    components.push(createTerm(latin, turkish, TermCategory.COMPONENT, def));
  });

  return components;
};

// Ana fonksiyon
async function main() {
  console.log("🚀 Ek Toplu Terim Yükleme Başlıyor...\n");
  console.log("═".repeat(50));

  console.log("📝 Terimler oluşturuluyor...");

  const antibiotics = generateAntibiotics();
  const antifungals = generateAntifungals();
  const antineoplastics = generateAntineoplastics();
  const immunotherapy = generateImmunotherapy();
  const respiratoryDiseases = generateRespiratoryDiseases();
  const giDiseases = generateGIDiseases();
  const hepatobiliaryDiseases = generateHepatobiliaryDiseases();
  const renalDiseases = generateRenalDiseases();
  const hematologicDiseases = generateHematologicDiseases();
  const rheumatologicDiseases = generateRheumatologicDiseases();
  const dermatologicDiseases = generateDermatologicDiseases();
  const moreAnatomy = generateMoreAnatomy();
  const moreComponents = generateMoreComponents();

  const allTerms = [
    ...antibiotics,
    ...antifungals,
    ...antineoplastics,
    ...immunotherapy,
    ...respiratoryDiseases,
    ...giDiseases,
    ...hepatobiliaryDiseases,
    ...renalDiseases,
    ...hematologicDiseases,
    ...rheumatologicDiseases,
    ...dermatologicDiseases,
    ...moreAnatomy,
    ...moreComponents,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   Antibiyotikler: ${antibiotics.length}`);
  console.log(`   Antifungaller: ${antifungals.length}`);
  console.log(`   Antineoplastikler: ${antineoplastics.length}`);
  console.log(`   İmmünoterapi: ${immunotherapy.length}`);
  console.log(`   Solunum Hastalıkları: ${respiratoryDiseases.length}`);
  console.log(`   GI Hastalıkları: ${giDiseases.length}`);
  console.log(`   Hepatobiliyer Hastalıklar: ${hepatobiliaryDiseases.length}`);
  console.log(`   Böbrek Hastalıkları: ${renalDiseases.length}`);
  console.log(`   Hematolojik Hastalıklar: ${hematologicDiseases.length}`);
  console.log(`   Romatolojik Hastalıklar: ${rheumatologicDiseases.length}`);
  console.log(`   Dermatolojik Hastalıklar: ${dermatologicDiseases.length}`);
  console.log(`   Ek Anatomi: ${moreAnatomy.length}`);
  console.log(`   Ek Bileşenler: ${moreComponents.length}`);
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
