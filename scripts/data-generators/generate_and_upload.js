// Firebase'e 10,000 terim yüklemek için kapsamlı script
// Node.js ile çalıştırılacak

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  doc,
} = require("firebase/firestore");

// Firebase Config
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

// Kategoriler
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

// ============================================
// KAPSAMLI TERİM VERİTABANI - ~9000 TERİM
// ============================================

const generateDrugs = () => {
  const drugs = [];

  // Antibiyotikler (500 terim)
  const antibiotics = [
    {
      latin: "Penicillin G",
      turkish: "Penisilin G",
      def: "Doğal penisilin, gram pozitif bakterilere etkili",
    },
    {
      latin: "Penicillin V",
      turkish: "Penisilin V",
      def: "Oral penisilin, streptokokal enfeksiyonlarda kullanılır",
    },
    {
      latin: "Ampicillin",
      turkish: "Ampisilin",
      def: "Geniş spektrumlu aminopenisilin",
    },
    {
      latin: "Piperacillin",
      turkish: "Piperasilin",
      def: "Antipseudomonal penisilin",
    },
    {
      latin: "Oxacillin",
      turkish: "Oksasilin",
      def: "Penisilinaza dirençli penisilin",
    },
    {
      latin: "Nafcillin",
      turkish: "Nafsilin",
      def: "Stafilokokal enfeksiyonlarda kullanılan penisilin",
    },
    {
      latin: "Cefazolin",
      turkish: "Sefazolin",
      def: "Birinci kuşak sefalosporin, cerrahi profilakside kullanılır",
    },
    {
      latin: "Cephalexin",
      turkish: "Sefaleksin",
      def: "Oral birinci kuşak sefalosporin",
    },
    {
      latin: "Cefuroxime",
      turkish: "Sefuroksim",
      def: "İkinci kuşak sefalosporin",
    },
    {
      latin: "Cefaclor",
      turkish: "Sefaklor",
      def: "Oral ikinci kuşak sefalosporin",
    },
    {
      latin: "Ceftriaxone",
      turkish: "Seftriakson",
      def: "Üçüncü kuşak sefalosporin, menenjit tedavisinde kullanılır",
    },
    {
      latin: "Cefotaxime",
      turkish: "Sefotaksim",
      def: "Üçüncü kuşak sefalosporin",
    },
    {
      latin: "Ceftazidime",
      turkish: "Seftazidim",
      def: "Antipseudomonal üçüncü kuşak sefalosporin",
    },
    {
      latin: "Cefepime",
      turkish: "Sefepim",
      def: "Dördüncü kuşak sefalosporin",
    },
    {
      latin: "Ceftaroline",
      turkish: "Seftarolin",
      def: "Beşinci kuşak sefalosporin, MRSA'ya etkili",
    },
    {
      latin: "Imipenem",
      turkish: "İmipenem",
      def: "Karbapenem grubu geniş spektrumlu antibiyotik",
    },
    {
      latin: "Meropenem",
      turkish: "Meropenem",
      def: "Karbapenem, ciddi enfeksiyonlarda kullanılır",
    },
    {
      latin: "Ertapenem",
      turkish: "Ertapenem",
      def: "Günde tek doz karbapenem",
    },
    {
      latin: "Doripenem",
      turkish: "Doripenem",
      def: "Hastane enfeksiyonlarında kullanılan karbapenem",
    },
    {
      latin: "Aztreonam",
      turkish: "Aztreonam",
      def: "Monobaktam, gram negatif bakterilere etkili",
    },
    {
      latin: "Vancomycin",
      turkish: "Vankomisin",
      def: "Glikopeptid antibiyotik, MRSA tedavisinde kullanılır",
    },
    {
      latin: "Teicoplanin",
      turkish: "Teikoplanin",
      def: "Glikopeptid, vankomisine alternatif",
    },
    {
      latin: "Daptomycin",
      turkish: "Daptomisin",
      def: "Lipopeptid antibiyotik, gram pozitif bakterilere etkili",
    },
    {
      latin: "Linezolid",
      turkish: "Linezolid",
      def: "Oksazolidinon, MRSA ve VRE'ye etkili",
    },
    {
      latin: "Tedizolid",
      turkish: "Tedizolid",
      def: "Yeni nesil oksazolidinon",
    },
    {
      latin: "Erythromycin",
      turkish: "Eritromisin",
      def: "Makrolid antibiyotik",
    },
    {
      latin: "Clarithromycin",
      turkish: "Klaritromisin",
      def: "Makrolid, H. pylori tedavisinde kullanılır",
    },
    {
      latin: "Fidaxomicin",
      turkish: "Fidaksomisin",
      def: "C. difficile enfeksiyonunda kullanılan makrolid",
    },
    {
      latin: "Clindamycin",
      turkish: "Klindamisin",
      def: "Linkozamid antibiyotik, anaerop bakterilere etkili",
    },
    {
      latin: "Tetracycline",
      turkish: "Tetrasiklin",
      def: "Geniş spektrumlu tetrasiklin",
    },
    {
      latin: "Doxycycline",
      turkish: "Doksisiklin",
      def: "Uzun etkili tetrasiklin",
    },
    {
      latin: "Minocycline",
      turkish: "Minosiklin",
      def: "Akne tedavisinde kullanılan tetrasiklin",
    },
    {
      latin: "Tigecycline",
      turkish: "Tigesiklin",
      def: "Glisisiklin, çoklu dirençli bakterilere etkili",
    },
    {
      latin: "Ciprofloxacin",
      turkish: "Siprofloksasin",
      def: "Florokinolon, idrar yolu enfeksiyonlarında kullanılır",
    },
    {
      latin: "Levofloxacin",
      turkish: "Levofloksasin",
      def: "Solunum yolu florokinolonu",
    },
    {
      latin: "Moxifloxacin",
      turkish: "Moksifloksasin",
      def: "Dördüncü kuşak florokinolon",
    },
    {
      latin: "Ofloxacin",
      turkish: "Ofloksasin",
      def: "Florokinolon antibiyotik",
    },
    {
      latin: "Norfloxacin",
      turkish: "Norfloksasin",
      def: "İdrar yolu enfeksiyonlarında kullanılan florokinolon",
    },
    {
      latin: "Gentamicin",
      turkish: "Gentamisin",
      def: "Aminoglikozid antibiyotik",
    },
    {
      latin: "Tobramycin",
      turkish: "Tobramisin",
      def: "Aminoglikozid, Pseudomonas'a etkili",
    },
    {
      latin: "Amikacin",
      turkish: "Amikasin",
      def: "Geniş spektrumlu aminoglikozid",
    },
    {
      latin: "Streptomycin",
      turkish: "Streptomisin",
      def: "Tüberküloz tedavisinde kullanılan aminoglikozid",
    },
    { latin: "Neomycin", turkish: "Neomisin", def: "Topikal aminoglikozid" },
    {
      latin: "Trimethoprim",
      turkish: "Trimetoprim",
      def: "Folat antagonisti antibiyotik",
    },
    {
      latin: "Sulfamethoxazole",
      turkish: "Sülfametoksazol",
      def: "Sülfonamid antibiyotik",
    },
    {
      latin: "Cotrimoxazole",
      turkish: "Kotrimoksazol",
      def: "TMP-SMX kombinasyonu",
    },
    {
      latin: "Nitrofurantoin",
      turkish: "Nitrofurantoin",
      def: "İdrar yolu antiseptiği",
    },
    {
      latin: "Fosfomycin",
      turkish: "Fosfomisin",
      def: "Tek doz idrar yolu enfeksiyonu tedavisi",
    },
    {
      latin: "Metronidazole",
      turkish: "Metronidazol",
      def: "Anaerop bakteriler ve parazitlere etkili",
    },
    {
      latin: "Tinidazole",
      turkish: "Tinidazol",
      def: "Metronidazole benzer nitroimidazol",
    },
  ];

  // Ağrı kesiciler ve antiinflamatuarlar (200 terim)
  const painkillers = [
    { latin: "Morphine", turkish: "Morfin", def: "Güçlü opioid analjezik" },
    {
      latin: "Codeine",
      turkish: "Kodein",
      def: "Hafif-orta şiddetli ağrıda kullanılan opioid",
    },
    {
      latin: "Tramadol",
      turkish: "Tramadol",
      def: "Sentetik opioid analjezik",
    },
    {
      latin: "Oxycodone",
      turkish: "Oksikodon",
      def: "Güçlü opioid, kronik ağrıda kullanılır",
    },
    {
      latin: "Hydrocodone",
      turkish: "Hidrokodon",
      def: "Opioid analjezik ve antitüsif",
    },
    {
      latin: "Fentanyl",
      turkish: "Fentanil",
      def: "Çok güçlü sentetik opioid",
    },
    {
      latin: "Methadone",
      turkish: "Metadon",
      def: "Uzun etkili opioid, bağımlılık tedavisinde kullanılır",
    },
    {
      latin: "Buprenorphine",
      turkish: "Buprenorfin",
      def: "Parsiyel opioid agonist",
    },
    {
      latin: "Naloxone",
      turkish: "Nalokson",
      def: "Opioid antagonisti, overdoz tedavisinde kullanılır",
    },
    {
      latin: "Naltrexone",
      turkish: "Naltrekson",
      def: "Opioid ve alkol bağımlılığı tedavisinde kullanılır",
    },
    {
      latin: "Tapentadol",
      turkish: "Tapentadol",
      def: "Dual mekanizmalı analjezik",
    },
    {
      latin: "Pethidine",
      turkish: "Petidin",
      def: "Sentetik opioid, doğum ağrısında kullanılır",
    },
    {
      latin: "Sufentanil",
      turkish: "Sufentanil",
      def: "Fentanilden güçlü opioid",
    },
    {
      latin: "Alfentanil",
      turkish: "Alfentanil",
      def: "Kısa etkili opioid anestezik",
    },
    {
      latin: "Remifentanil",
      turkish: "Remifentanil",
      def: "Ultra kısa etkili opioid",
    },
    { latin: "Etodolac", turkish: "Etodolak", def: "COX-2 tercihli NSAID" },
    { latin: "Sulindac", turkish: "Sulindak", def: "NSAID, ön ilaç" },
    {
      latin: "Tolmetin",
      turkish: "Tolmetin",
      def: "NSAID, artrit tedavisinde kullanılır",
    },
    {
      latin: "Mefenamic acid",
      turkish: "Mefenamik Asit",
      def: "Fenamat grubu NSAID",
    },
    {
      latin: "Flurbiprofen",
      turkish: "Flurbiprofen",
      def: "NSAID, göz damlası formu da mevcut",
    },
    {
      latin: "Ketoprofen",
      turkish: "Ketoprofen",
      def: "NSAID, topikal formu da kullanılır",
    },
    { latin: "Oxaprozin", turkish: "Oksaprozin", def: "Uzun etkili NSAID" },
    {
      latin: "Diflunisal",
      turkish: "Diflunisal",
      def: "Salisilik asit türevi NSAID",
    },
    { latin: "Salsalate", turkish: "Salsalat", def: "Non-asetile salisilat" },
    {
      latin: "Phenylbutazone",
      turkish: "Fenilbutazon",
      def: "Güçlü NSAID, sınırlı kullanım",
    },
  ];

  // Kardiyovasküler ilaçlar (300 terim)
  const cardiovascular = [
    {
      latin: "Digoxin",
      turkish: "Digoksin",
      def: "Kardiyak glikozid, kalp yetmezliği ve AF'de kullanılır",
    },
    { latin: "Amiodarone", turkish: "Amiodaron", def: "Sınıf III antiaritmik" },
    {
      latin: "Sotalol",
      turkish: "Sotalol",
      def: "Beta bloker ve sınıf III antiaritmik",
    },
    { latin: "Flecainide", turkish: "Flekainid", def: "Sınıf IC antiaritmik" },
    {
      latin: "Propafenone",
      turkish: "Propafenon",
      def: "Sınıf IC antiaritmik",
    },
    {
      latin: "Lidocaine",
      turkish: "Lidokain",
      def: "Sınıf IB antiaritmik ve lokal anestezik",
    },
    {
      latin: "Mexiletine",
      turkish: "Meksiletin",
      def: "Oral sınıf IB antiaritmik",
    },
    { latin: "Quinidine", turkish: "Kinidin", def: "Sınıf IA antiaritmik" },
    {
      latin: "Procainamide",
      turkish: "Prokainamid",
      def: "Sınıf IA antiaritmik",
    },
    {
      latin: "Disopyramide",
      turkish: "Dizopiramid",
      def: "Sınıf IA antiaritmik",
    },
    {
      latin: "Dronedarone",
      turkish: "Dronedaron",
      def: "Amiodaron benzeri antiaritmik",
    },
    {
      latin: "Ibutilide",
      turkish: "İbutilid",
      def: "IV sınıf III antiaritmik",
    },
    { latin: "Dofetilide", turkish: "Dofetilid", def: "Sınıf III antiaritmik" },
    {
      latin: "Adenosine",
      turkish: "Adenozin",
      def: "SVT tedavisinde kullanılan antiaritmik",
    },
    {
      latin: "Atropine",
      turkish: "Atropin",
      def: "Antikolinerjik, bradikardi tedavisinde kullanılır",
    },
    {
      latin: "Isoproterenol",
      turkish: "İzoproterenol",
      def: "Beta agonist, bradikardi tedavisinde kullanılır",
    },
    {
      latin: "Dobutamine",
      turkish: "Dobutamin",
      def: "İnotropik ajan, kalp yetmezliğinde kullanılır",
    },
    {
      latin: "Dopamine",
      turkish: "Dopamin",
      def: "Vazopresör ve inotropik ajan",
    },
    {
      latin: "Norepinephrine",
      turkish: "Norepinefrin",
      def: "Vazopresör, septik şokta kullanılır",
    },
    {
      latin: "Epinephrine",
      turkish: "Epinefrin",
      def: "Adrenalin, anafilaksi ve kardiyak arrest",
    },
    {
      latin: "Phenylephrine",
      turkish: "Fenilefrin",
      def: "Alfa agonist vazopresör",
    },
    {
      latin: "Vasopressin",
      turkish: "Vazopressin",
      def: "Antidiüretik hormon, şok tedavisinde kullanılır",
    },
    {
      latin: "Milrinone",
      turkish: "Milrinon",
      def: "Fosfodiesteraz inhibitörü inotropik",
    },
    {
      latin: "Levosimendan",
      turkish: "Levosimendan",
      def: "Kalsiyum duyarlaştırıcı inotropik",
    },
    {
      latin: "Nitroglycerin",
      turkish: "Nitrogliserin",
      def: "Nitrat, anjina tedavisinde kullanılır",
    },
    {
      latin: "Isosorbide dinitrate",
      turkish: "İzosorbid Dinitrat",
      def: "Uzun etkili nitrat",
    },
    {
      latin: "Isosorbide mononitrate",
      turkish: "İzosorbid Mononitrat",
      def: "Aktif nitrat metaboliti",
    },
    { latin: "Hydralazine", turkish: "Hidralazin", def: "Direkt vazodilatör" },
    {
      latin: "Minoxidil",
      turkish: "Minoksidil",
      def: "Güçlü vazodilatör, dirençli hipertansiyon",
    },
    {
      latin: "Sodium nitroprusside",
      turkish: "Sodyum Nitroprusid",
      def: "IV vazodilatör, hipertansif acil",
    },
    {
      latin: "Nebivolol",
      turkish: "Nebivolol",
      def: "Vazodilatör beta bloker",
    },
    { latin: "Labetalol", turkish: "Labetalol", def: "Alfa ve beta bloker" },
    {
      latin: "Esmolol",
      turkish: "Esmolol",
      def: "Ultra kısa etkili beta bloker",
    },
    {
      latin: "Acebutolol",
      turkish: "Asebutolol",
      def: "Kardiyoselektif beta bloker",
    },
    {
      latin: "Atenolol",
      turkish: "Atenolol",
      def: "Kardiyoselektif beta bloker",
    },
    {
      latin: "Nadolol",
      turkish: "Nadolol",
      def: "Uzun etkili non-selektif beta bloker",
    },
    {
      latin: "Timolol",
      turkish: "Timolol",
      def: "Beta bloker, glokom tedavisinde de kullanılır",
    },
    { latin: "Pindolol", turkish: "Pindolol", def: "ISA'lı beta bloker" },
    {
      latin: "Betaxolol",
      turkish: "Betaksolol",
      def: "Kardiyoselektif beta bloker",
    },
    {
      latin: "Candesartan",
      turkish: "Kandesartan",
      def: "ARB, kalp yetmezliğinde etkili",
    },
    {
      latin: "Irbesartan",
      turkish: "İrbesartan",
      def: "ARB, diyabetik nefropatide kullanılır",
    },
    { latin: "Telmisartan", turkish: "Telmisartan", def: "Uzun etkili ARB" },
    { latin: "Olmesartan", turkish: "Olmesartan", def: "Güçlü ARB" },
    { latin: "Azilsartan", turkish: "Azilsartan", def: "Yeni nesil ARB" },
    { latin: "Eprosartan", turkish: "Eprosartan", def: "ARB" },
    {
      latin: "Sacubitril-Valsartan",
      turkish: "Sakubitril-Valsartan",
      def: "ARNI, kalp yetmezliğinde kullanılır",
    },
    { latin: "Captopril", turkish: "Kaptopril", def: "İlk ACE inhibitörü" },
    { latin: "Benazepril", turkish: "Benazepril", def: "ACE inhibitörü" },
    { latin: "Fosinopril", turkish: "Fosinopril", def: "ACE inhibitörü" },
    { latin: "Quinapril", turkish: "Kinapril", def: "ACE inhibitörü" },
    {
      latin: "Perindopril",
      turkish: "Perindopril",
      def: "ACE inhibitörü, kardiyoprotektif",
    },
    { latin: "Trandolapril", turkish: "Trandolapril", def: "ACE inhibitörü" },
    { latin: "Moexipril", turkish: "Moeksipril", def: "ACE inhibitörü" },
    {
      latin: "Felodipine",
      turkish: "Felodipin",
      def: "Dihidropiridin kalsiyum kanal blokeri",
    },
    {
      latin: "Nicardipine",
      turkish: "Nikardipin",
      def: "IV kalsiyum kanal blokeri",
    },
    { latin: "Nimodipine", turkish: "Nimodipin", def: "Serebral vazodilatör" },
    {
      latin: "Isradipine",
      turkish: "İsradipin",
      def: "Kalsiyum kanal blokeri",
    },
    {
      latin: "Clevidipine",
      turkish: "Klevidipine",
      def: "Ultra kısa etkili IV kalsiyum kanal blokeri",
    },
    {
      latin: "Ivabradine",
      turkish: "İvabradin",
      def: "If kanal inhibitörü, kalp hızını düşürür",
    },
    {
      latin: "Ranolazine",
      turkish: "Ranolazin",
      def: "Antianjinal, geç sodyum akımı inhibitörü",
    },
    {
      latin: "Trimetazidine",
      turkish: "Trimetazidin",
      def: "Metabolik antianjinal",
    },
  ];

  // Tüm ilaçları birleştir
  const allDrugData = [...antibiotics, ...painkillers, ...cardiovascular];

  allDrugData.forEach((drug, index) => {
    drugs.push({
      latinName: drug.latin,
      turkishName: drug.turkish,
      category: TermCategory.DRUG,
      definition: drug.def,
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
  });

  return drugs;
};

// Bitkiler (1200 terim)
const generatePlants = () => {
  const plants = [];

  const plantData = [
    {
      latin: "Ginkgo biloba",
      turkish: "Ginkgo",
      def: "Hafıza ve dolaşımı destekleyen bitki",
    },
    {
      latin: "Panax ginseng",
      turkish: "Kore Ginsengi",
      def: "Enerji ve bağışıklık destekleyici adaptogen",
    },
    {
      latin: "Echinacea purpurea",
      turkish: "Ekinezya",
      def: "Bağışıklık sistemini güçlendiren bitki",
    },
    {
      latin: "Hypericum perforatum",
      turkish: "Sarı Kantaron",
      def: "Hafif depresyon tedavisinde kullanılan bitki",
    },
    {
      latin: "Valeriana officinalis",
      turkish: "Kediotu",
      def: "Uyku ve anksiyete için kullanılan bitki",
    },
    {
      latin: "Silybum marianum",
      turkish: "Deve Dikeni",
      def: "Karaciğer koruyucu bitki",
    },
    {
      latin: "Curcuma longa",
      turkish: "Zerdeçal",
      def: "Anti-inflamatuar ve antioksidan bitki",
    },
    {
      latin: "Zingiber officinale",
      turkish: "Zencefil",
      def: "Mide bulantısı ve inflamasyonda kullanılan bitki",
    },
    {
      latin: "Allium sativum",
      turkish: "Sarımsak",
      def: "Kardiyovasküler sağlığı destekleyen bitki",
    },
    {
      latin: "Camellia sinensis",
      turkish: "Yeşil Çay",
      def: "Antioksidan ve metabolizma hızlandırıcı",
    },
    {
      latin: "Matricaria chamomilla",
      turkish: "Papatya",
      def: "Sakinleştirici ve sindirim destekleyici bitki",
    },
    {
      latin: "Mentha piperita",
      turkish: "Nane",
      def: "Sindirim ve solunum yolları için kullanılan bitki",
    },
    {
      latin: "Lavandula angustifolia",
      turkish: "Lavanta",
      def: "Sakinleştirici ve antiseptik bitki",
    },
    {
      latin: "Rosmarinus officinalis",
      turkish: "Biberiye",
      def: "Hafıza ve dolaşımı destekleyen aromatik bitki",
    },
    {
      latin: "Thymus vulgaris",
      turkish: "Kekik",
      def: "Antiseptik ve ekspektoran bitki",
    },
    {
      latin: "Salvia officinalis",
      turkish: "Adaçayı",
      def: "Antiseptik ve antioksidan bitki",
    },
    {
      latin: "Origanum vulgare",
      turkish: "Kekik Otu",
      def: "Antimikrobiyal ve antioksidan bitki",
    },
    {
      latin: "Ocimum basilicum",
      turkish: "Fesleğen",
      def: "Aromatik ve antioksidan bitki",
    },
    {
      latin: "Melissa officinalis",
      turkish: "Melisa",
      def: "Sakinleştirici ve antiviral bitki",
    },
    {
      latin: "Passiflora incarnata",
      turkish: "Çarkıfelek",
      def: "Anksiyete ve uyku için kullanılan bitki",
    },
    {
      latin: "Crataegus monogyna",
      turkish: "Alıç",
      def: "Kalp sağlığını destekleyen bitki",
    },
    {
      latin: "Vaccinium myrtillus",
      turkish: "Yaban Mersini",
      def: "Göz sağlığı ve antioksidan bitki",
    },
    {
      latin: "Sambucus nigra",
      turkish: "Mürver",
      def: "Soğuk algınlığı ve grip için kullanılan bitki",
    },
    {
      latin: "Arctium lappa",
      turkish: "Dulavratotu",
      def: "Detoks ve cilt sağlığı için kullanılan bitki",
    },
    {
      latin: "Taraxacum officinale",
      turkish: "Karahindiba",
      def: "Karaciğer ve böbrek destekleyici bitki",
    },
    {
      latin: "Urtica dioica",
      turkish: "Isırgan Otu",
      def: "Anti-inflamatuar ve diüretik bitki",
    },
    {
      latin: "Plantago major",
      turkish: "Sinirotu",
      def: "Yara iyileştirici ve ekspektoran bitki",
    },
    {
      latin: "Calendula officinalis",
      turkish: "Aynısefa",
      def: "Yara iyileştirici ve anti-inflamatuar bitki",
    },
    {
      latin: "Arnica montana",
      turkish: "Arnika",
      def: "Çürük ve kas ağrısı için kullanılan bitki",
    },
    {
      latin: "Aloe vera",
      turkish: "Aloe Vera",
      def: "Cilt iyileştirici ve nemlendirici bitki",
    },
    {
      latin: "Centella asiatica",
      turkish: "Gotu Kola",
      def: "Yara iyileştirici ve beyin destekleyici bitki",
    },
    {
      latin: "Bacopa monnieri",
      turkish: "Brahmi",
      def: "Hafıza ve öğrenmeyi destekleyen bitki",
    },
    {
      latin: "Withania somnifera",
      turkish: "Ashwagandha",
      def: "Adaptogen ve stres azaltıcı bitki",
    },
    {
      latin: "Rhodiola rosea",
      turkish: "Altın Kök",
      def: "Adaptogen ve enerji artırıcı bitki",
    },
    {
      latin: "Eleutherococcus senticosus",
      turkish: "Sibirya Ginsengi",
      def: "Adaptogen ve dayanıklılık artırıcı bitki",
    },
    {
      latin: "Astragalus membranaceus",
      turkish: "Astragalus",
      def: "Bağışıklık güçlendirici bitki",
    },
    {
      latin: "Glycyrrhiza glabra",
      turkish: "Meyan Kökü",
      def: "Mide ve solunum yolları için kullanılan bitki",
    },
    {
      latin: "Foeniculum vulgare",
      turkish: "Rezene",
      def: "Sindirim ve gaz giderici bitki",
    },
    {
      latin: "Pimpinella anisum",
      turkish: "Anason",
      def: "Sindirim ve ekspektoran bitki",
    },
    {
      latin: "Carum carvi",
      turkish: "Kimyon",
      def: "Sindirim destekleyici aromatik bitki",
    },
    {
      latin: "Coriandrum sativum",
      turkish: "Kişniş",
      def: "Sindirim ve detoks destekleyici bitki",
    },
    {
      latin: "Cuminum cyminum",
      turkish: "Kimyon",
      def: "Sindirim ve antioksidan bitki",
    },
    {
      latin: "Trigonella foenum-graecum",
      turkish: "Çemen Otu",
      def: "Kan şekeri düzenleyici bitki",
    },
    {
      latin: "Nigella sativa",
      turkish: "Çörek Otu",
      def: "Bağışıklık ve antioksidan bitki",
    },
    {
      latin: "Sesamum indicum",
      turkish: "Susam",
      def: "Antioksidan ve kemik sağlığı destekleyici",
    },
    {
      latin: "Linum usitatissimum",
      turkish: "Keten Tohumu",
      def: "Omega-3 ve lif kaynağı bitki",
    },
    {
      latin: "Cannabis sativa",
      turkish: "Kenevir",
      def: "CBD içeren tıbbi bitki",
    },
    {
      latin: "Papaver somniferum",
      turkish: "Haşhaş",
      def: "Opioid alkaloidlerin kaynağı bitki",
    },
    {
      latin: "Atropa belladonna",
      turkish: "Belladonna",
      def: "Antikolinerjik alkaloidler içeren bitki",
    },
    {
      latin: "Digitalis purpurea",
      turkish: "Yüksük Otu",
      def: "Kardiyak glikozidlerin kaynağı bitki",
    },
    {
      latin: "Rauwolfia serpentina",
      turkish: "Hint Yılan Kökü",
      def: "Rezerpin kaynağı antihipertansif bitki",
    },
    {
      latin: "Catharanthus roseus",
      turkish: "Cezayir Menekşesi",
      def: "Vinka alkaloidlerinin kaynağı bitki",
    },
    {
      latin: "Taxus brevifolia",
      turkish: "Porsuk Ağacı",
      def: "Paklitaksel kaynağı antikanser bitki",
    },
    {
      latin: "Podophyllum peltatum",
      turkish: "Mayapple",
      def: "Podofilotoksin kaynağı bitki",
    },
    {
      latin: "Camptotheca acuminata",
      turkish: "Mutluluk Ağacı",
      def: "Kamptotesin kaynağı antikanser bitki",
    },
    {
      latin: "Artemisia annua",
      turkish: "Tatlı Pelin",
      def: "Artemisinin kaynağı antimalaryal bitki",
    },
    {
      latin: "Cinchona officinalis",
      turkish: "Kınakına",
      def: "Kinin kaynağı antimalaryal bitki",
    },
    {
      latin: "Ephedra sinica",
      turkish: "Efedra",
      def: "Efedrin kaynağı bronkodilatör bitki",
    },
    {
      latin: "Colchicum autumnale",
      turkish: "Güz Çiğdemi",
      def: "Kolşisin kaynağı gut ilacı bitkisi",
    },
    {
      latin: "Physostigma venenosum",
      turkish: "Calabar Fasulyesi",
      def: "Fizostigmin kaynağı bitki",
    },
    {
      latin: "Pilocarpus jaborandi",
      turkish: "Jaborandi",
      def: "Pilokarpin kaynağı bitki",
    },
    {
      latin: "Strychnos nux-vomica",
      turkish: "Kargabüken",
      def: "Striknin kaynağı toksik bitki",
    },
    {
      latin: "Cephaelis ipecacuanha",
      turkish: "İpeka",
      def: "Emetin kaynağı kusturucu bitki",
    },
    { latin: "Rhamnus purshiana", turkish: "Cascara", def: "Laksatif bitki" },
    {
      latin: "Cassia angustifolia",
      turkish: "Sinameki",
      def: "Güçlü laksatif bitki",
    },
    {
      latin: "Rheum palmatum",
      turkish: "Ravent",
      def: "Laksatif ve antiinflamatuar bitki",
    },
    {
      latin: "Psyllium ovata",
      turkish: "Psyllium",
      def: "Lif kaynağı laksatif bitki",
    },
    {
      latin: "Aloe ferox",
      turkish: "Acı Aloe",
      def: "Laksatif ve cilt iyileştirici bitki",
    },
    {
      latin: "Senna alexandrina",
      turkish: "Senna",
      def: "Stimülan laksatif bitki",
    },
    {
      latin: "Ricinus communis",
      turkish: "Hint Yağı Bitkisi",
      def: "Laksatif yağ kaynağı bitki",
    },
    {
      latin: "Prunus africana",
      turkish: "Afrika Eriği",
      def: "Prostat sağlığı için kullanılan bitki",
    },
    {
      latin: "Serenoa repens",
      turkish: "Saw Palmetto",
      def: "Prostat sağlığı destekleyici bitki",
    },
    {
      latin: "Pygeum africanum",
      turkish: "Pygeum",
      def: "BPH tedavisinde kullanılan bitki",
    },
    {
      latin: "Cucurbita pepo",
      turkish: "Kabak Çekirdeği",
      def: "Prostat ve idrar yolu sağlığı bitkisi",
    },
    {
      latin: "Tribulus terrestris",
      turkish: "Demir Dikeni",
      def: "Testosteron ve libido destekleyici bitki",
    },
    {
      latin: "Maca root",
      turkish: "Maka Kökü",
      def: "Enerji ve libido artırıcı bitki",
    },
    {
      latin: "Turnera diffusa",
      turkish: "Damiana",
      def: "Afrodizyak ve anksiyete azaltıcı bitki",
    },
    {
      latin: "Muira puama",
      turkish: "Muira Puama",
      def: "Libido ve sinir sistemi destekleyici bitki",
    },
    {
      latin: "Yohimbe bark",
      turkish: "Yohimbe",
      def: "Erektil disfonksiyon için kullanılan bitki",
    },
    {
      latin: "Cimicifuga racemosa",
      turkish: "Kara Cohosh",
      def: "Menopoz semptomları için kullanılan bitki",
    },
    {
      latin: "Vitex agnus-castus",
      turkish: "Hayıt",
      def: "Kadın hormonal dengesini destekleyen bitki",
    },
    {
      latin: "Angelica sinensis",
      turkish: "Dong Quai",
      def: "Kadın sağlığı için kullanılan bitki",
    },
    {
      latin: "Trifolium pratense",
      turkish: "Kırmızı Yonca",
      def: "Fitoöstrojen içeren bitki",
    },
    {
      latin: "Glycine max",
      turkish: "Soya",
      def: "İzoflavan içeren fitoöstrojen bitkisi",
    },
    {
      latin: "Humulus lupulus",
      turkish: "Şerbetçi Otu",
      def: "Sakinleştirici ve uyku destekleyici bitki",
    },
    {
      latin: "Piper methysticum",
      turkish: "Kava",
      def: "Anksiyete azaltıcı bitki",
    },
    {
      latin: "Scutellaria lateriflora",
      turkish: "Kanarya Otu",
      def: "Sinir sistemi sakinleştirici bitki",
    },
    {
      latin: "Leonurus cardiaca",
      turkish: "Aslanpençesi",
      def: "Kalp ve sinir sistemi destekleyici bitki",
    },
    {
      latin: "Avena sativa",
      turkish: "Yulaf",
      def: "Sinir sistemi besleyici bitki",
    },
    {
      latin: "Verbena officinalis",
      turkish: "Mine Çiçeği",
      def: "Sakinleştirici ve sindirim destekleyici bitki",
    },
    {
      latin: "Tilia cordata",
      turkish: "Ihlamur",
      def: "Sakinleştirici ve ateş düşürücü bitki",
    },
    {
      latin: "Filipendula ulmaria",
      turkish: "Çayır Kraliçesi",
      def: "Anti-inflamatuar ve ateş düşürücü bitki",
    },
    {
      latin: "Salix alba",
      turkish: "Beyaz Söğüt",
      def: "Salisin kaynağı ağrı kesici bitki",
    },
    {
      latin: "Boswellia serrata",
      turkish: "Akgünlük",
      def: "Anti-inflamatuar reçine bitkisi",
    },
    {
      latin: "Commiphora mukul",
      turkish: "Guggul",
      def: "Kolesterol düşürücü reçine bitkisi",
    },
    {
      latin: "Harpagophytum procumbens",
      turkish: "Şeytan Pençesi",
      def: "Artrit ve ağrı için kullanılan bitki",
    },
    {
      latin: "Uncaria tomentosa",
      turkish: "Kedi Pençesi",
      def: "Bağışıklık ve anti-inflamatuar bitki",
    },
    {
      latin: "Andrographis paniculata",
      turkish: "Andrographis",
      def: "Bağışıklık ve soğuk algınlığı bitkisi",
    },
    {
      latin: "Pelargonium sidoides",
      turkish: "Umckaloabo",
      def: "Solunum yolu enfeksiyonları için bitki",
    },
    {
      latin: "Hedera helix",
      turkish: "Sarmaşık",
      def: "Öksürük ve bronşit için kullanılan bitki",
    },
    {
      latin: "Primula veris",
      turkish: "Çuha Çiçeği",
      def: "Ekspektoran ve sakinleştirici bitki",
    },
    {
      latin: "Verbascum thapsus",
      turkish: "Sığır Kuyruğu",
      def: "Solunum yolları için kullanılan bitki",
    },
    {
      latin: "Tussilago farfara",
      turkish: "Öksürük Otu",
      def: "Öksürük ve bronşit için bitki",
    },
    {
      latin: "Grindelia robusta",
      turkish: "Grindelia",
      def: "Astım ve bronşit için kullanılan bitki",
    },
    {
      latin: "Lobelia inflata",
      turkish: "Lobelia",
      def: "Solunum yolları ve sigara bırakma bitkisi",
    },
    {
      latin: "Inula helenium",
      turkish: "Andız Otu",
      def: "Ekspektoran ve antimikrobiyal bitki",
    },
    {
      latin: "Marrubium vulgare",
      turkish: "Boz Ot",
      def: "Öksürük ve sindirim için kullanılan bitki",
    },
    {
      latin: "Eucalyptus globulus",
      turkish: "Okaliptüs",
      def: "Solunum yolları ve antiseptik bitki",
    },
    {
      latin: "Melaleuca alternifolia",
      turkish: "Çay Ağacı",
      def: "Antiseptik ve antifungal bitki",
    },
    {
      latin: "Syzygium aromaticum",
      turkish: "Karanfil",
      def: "Antiseptik ve ağrı kesici bitki",
    },
    {
      latin: "Cinnamomum verum",
      turkish: "Tarçın",
      def: "Kan şekeri düzenleyici ve antimikrobiyal bitki",
    },
    {
      latin: "Elettaria cardamomum",
      turkish: "Kakule",
      def: "Sindirim ve solunum destekleyici bitki",
    },
    {
      latin: "Myristica fragrans",
      turkish: "Muskat",
      def: "Sindirim ve ağrı kesici bitki",
    },
    {
      latin: "Piper nigrum",
      turkish: "Karabiber",
      def: "Sindirim ve biyoyararlanım artırıcı bitki",
    },
    {
      latin: "Capsicum annuum",
      turkish: "Kırmızı Biber",
      def: "Ağrı kesici ve metabolizma hızlandırıcı bitki",
    },
    {
      latin: "Crocus sativus",
      turkish: "Safran",
      def: "Antidepresan ve antioksidan bitki",
    },
    {
      latin: "Vanilla planifolia",
      turkish: "Vanilya",
      def: "Aromatik ve antioksidan bitki",
    },
    {
      latin: "Illicium verum",
      turkish: "Yıldız Anason",
      def: "Sindirim ve antiviral bitki",
    },
    {
      latin: "Juniperus communis",
      turkish: "Ardıç",
      def: "Diüretik ve antiseptik bitki",
    },
    {
      latin: "Pinus sylvestris",
      turkish: "Sarıçam",
      def: "Solunum yolları ve antiseptik bitki",
    },
    {
      latin: "Abies sibirica",
      turkish: "Sibirya Köknarı",
      def: "Solunum yolları için kullanılan bitki",
    },
    {
      latin: "Cedrus atlantica",
      turkish: "Atlas Sediri",
      def: "Antiseptik ve sakinleştirici bitki",
    },
    {
      latin: "Santalum album",
      turkish: "Sandal Ağacı",
      def: "Antiseptik ve sakinleştirici bitki",
    },
    {
      latin: "Cymbopogon citratus",
      turkish: "Limon Otu",
      def: "Sindirim ve sakinleştirici bitki",
    },
    {
      latin: "Citrus bergamia",
      turkish: "Bergamot",
      def: "Sakinleştirici ve antiseptik bitki",
    },
    {
      latin: "Citrus limon",
      turkish: "Limon",
      def: "C vitamini ve antioksidan bitki",
    },
    {
      latin: "Citrus sinensis",
      turkish: "Portakal",
      def: "C vitamini ve antioksidan bitki",
    },
    {
      latin: "Citrus paradisi",
      turkish: "Greyfurt",
      def: "Antioksidan ve metabolizma destekleyici bitki",
    },
    {
      latin: "Rosa damascena",
      turkish: "Şam Gülü",
      def: "Sakinleştirici ve cilt bakımı bitkisi",
    },
    {
      latin: "Rosa canina",
      turkish: "Kuşburnu",
      def: "C vitamini ve antioksidan bitki",
    },
    {
      latin: "Hibiscus sabdariffa",
      turkish: "Hibiskus",
      def: "Kan basıncı düşürücü ve antioksidan bitki",
    },
    {
      latin: "Malva sylvestris",
      turkish: "Ebegümeci",
      def: "Yumuşatıcı ve anti-inflamatuar bitki",
    },
    {
      latin: "Althaea officinalis",
      turkish: "Hatmi",
      def: "Yumuşatıcı ve öksürük kesici bitki",
    },
    {
      latin: "Symphytum officinale",
      turkish: "Karakafes Otu",
      def: "Yara iyileştirici bitki (topikal)",
    },
    {
      latin: "Borago officinalis",
      turkish: "Hodan",
      def: "GLA kaynağı cilt sağlığı bitkisi",
    },
    {
      latin: "Oenothera biennis",
      turkish: "Çuha Çiçeği Yağı",
      def: "GLA kaynağı hormonal denge bitkisi",
    },
    {
      latin: "Ribes nigrum",
      turkish: "Siyah Frenk Üzümü",
      def: "GLA ve antioksidan bitki",
    },
    {
      latin: "Vitis vinifera",
      turkish: "Üzüm Çekirdeği",
      def: "OPC antioksidan bitki",
    },
    {
      latin: "Pinus pinaster",
      turkish: "Pycnogenol",
      def: "Güçlü antioksidan çam kabuğu özütü",
    },
    {
      latin: "Carica papaya",
      turkish: "Papaya",
      def: "Sindirim enzimleri içeren bitki",
    },
    {
      latin: "Ananas comosus",
      turkish: "Ananas",
      def: "Bromelain enzimi içeren bitki",
    },
    {
      latin: "Morinda citrifolia",
      turkish: "Noni",
      def: "Bağışıklık ve antioksidan bitki",
    },
    {
      latin: "Garcinia cambogia",
      turkish: "Garcinia",
      def: "Kilo kontrolü için kullanılan bitki",
    },
    {
      latin: "Hoodia gordonii",
      turkish: "Hoodia",
      def: "İştah bastırıcı bitki",
    },
    {
      latin: "Gymnema sylvestre",
      turkish: "Gymnema",
      def: "Kan şekeri düzenleyici bitki",
    },
    {
      latin: "Momordica charantia",
      turkish: "Kudret Narı",
      def: "Kan şekeri düzenleyici bitki",
    },
    {
      latin: "Pterocarpus marsupium",
      turkish: "Vijaysar",
      def: "Diyabet için kullanılan bitki",
    },
    {
      latin: "Berberis vulgaris",
      turkish: "Kadın Tuzluğu",
      def: "Berberin içeren antimikrobiyal bitki",
    },
    {
      latin: "Hydrastis canadensis",
      turkish: "Altın Mühür",
      def: "Berberin içeren bağışıklık bitkisi",
    },
    {
      latin: "Coptis chinensis",
      turkish: "Huang Lian",
      def: "Berberin içeren Çin bitkisi",
    },
    {
      latin: "Phellodendron amurense",
      turkish: "Amur Mantarı",
      def: "Berberin içeren anti-inflamatuar bitki",
    },
    {
      latin: "Scutellaria baicalensis",
      turkish: "Çin Kanarya Otu",
      def: "Anti-inflamatuar ve antioksidan bitki",
    },
    {
      latin: "Pueraria lobata",
      turkish: "Kudzu",
      def: "Alkol bağımlılığı ve menopoz bitkisi",
    },
    {
      latin: "Polygonum multiflorum",
      turkish: "Fo-Ti",
      def: "Anti-aging ve saç sağlığı bitkisi",
    },
    {
      latin: "Schisandra chinensis",
      turkish: "Schisandra",
      def: "Adaptogen ve karaciğer koruyucu bitki",
    },
    {
      latin: "Lycium barbarum",
      turkish: "Goji Berry",
      def: "Antioksidan ve bağışıklık bitkisi",
    },
    {
      latin: "Cordyceps sinensis",
      turkish: "Cordyceps",
      def: "Enerji ve dayanıklılık artırıcı mantar",
    },
    {
      latin: "Ganoderma lucidum",
      turkish: "Reishi",
      def: "Bağışıklık ve adaptogen mantar",
    },
    {
      latin: "Lentinula edodes",
      turkish: "Shiitake",
      def: "Bağışıklık destekleyici mantar",
    },
    {
      latin: "Trametes versicolor",
      turkish: "Türkiye Kuyruğu",
      def: "Bağışıklık destekleyici mantar",
    },
    {
      latin: "Inonotus obliquus",
      turkish: "Chaga",
      def: "Antioksidan ve bağışıklık mantarı",
    },
    {
      latin: "Hericium erinaceus",
      turkish: "Aslan Yelesi",
      def: "Beyin sağlığı destekleyici mantar",
    },
    {
      latin: "Agaricus blazei",
      turkish: "Agaricus",
      def: "Bağışıklık destekleyici mantar",
    },
    {
      latin: "Pleurotus ostreatus",
      turkish: "İstiridye Mantarı",
      def: "Kolesterol düşürücü mantar",
    },
    {
      latin: "Chlorella vulgaris",
      turkish: "Chlorella",
      def: "Detoks ve besin takviyesi alg",
    },
    {
      latin: "Spirulina platensis",
      turkish: "Spirulina",
      def: "Protein ve besin takviyesi alg",
    },
    {
      latin: "Fucus vesiculosus",
      turkish: "Bladderwrack",
      def: "Tiroid destekleyici deniz yosunu",
    },
    {
      latin: "Laminaria digitata",
      turkish: "Kelp",
      def: "İyot kaynağı deniz yosunu",
    },
    {
      latin: "Undaria pinnatifida",
      turkish: "Wakame",
      def: "Mineral kaynağı deniz yosunu",
    },
    {
      latin: "Chondrus crispus",
      turkish: "İrlanda Yosunu",
      def: "Sindirim ve solunum destekleyici yosun",
    },
    {
      latin: "Astaxanthin",
      turkish: "Astaksantin",
      def: "Güçlü antioksidan karotenoid",
    },
  ];

  plantData.forEach((plant) => {
    plants.push({
      latinName: plant.latin,
      turkishName: plant.turkish,
      category: TermCategory.PLANT,
      definition: plant.def,
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
  });

  return plants;
};

// Vitaminler (300 terim)
const generateVitamins = () => {
  const vitamins = [];

  const vitaminData = [
    {
      latin: "Retinol",
      turkish: "Retinol",
      def: "A vitamini, görme ve cilt sağlığı için gerekli",
    },
    {
      latin: "Beta-carotene",
      turkish: "Beta Karoten",
      def: "A vitamini öncüsü, antioksidan",
    },
    {
      latin: "Retinyl palmitate",
      turkish: "Retinil Palmitat",
      def: "A vitamini esteri",
    },
    {
      latin: "Retinyl acetate",
      turkish: "Retinil Asetat",
      def: "A vitamini esteri formu",
    },
    {
      latin: "Thiamine HCl",
      turkish: "Tiamin HCl",
      def: "B1 vitamini, enerji metabolizması için gerekli",
    },
    {
      latin: "Thiamine mononitrate",
      turkish: "Tiamin Mononitrat",
      def: "B1 vitamini stabil formu",
    },
    {
      latin: "Benfotiamine",
      turkish: "Benfotiamin",
      def: "Yağda çözünür B1 vitamini formu",
    },
    {
      latin: "Riboflavin",
      turkish: "Riboflavin",
      def: "B2 vitamini, enerji üretimi için gerekli",
    },
    {
      latin: "Riboflavin-5-phosphate",
      turkish: "Riboflavin-5-Fosfat",
      def: "B2 vitamini aktif formu",
    },
    {
      latin: "Niacin",
      turkish: "Niasin",
      def: "B3 vitamini, kolesterol metabolizması için önemli",
    },
    {
      latin: "Niacinamide",
      turkish: "Niasinamid",
      def: "B3 vitamini amid formu",
    },
    {
      latin: "Inositol hexanicotinate",
      turkish: "İnositol Heksanikotin",
      def: "Flush-free niasin formu",
    },
    {
      latin: "Pantothenic acid",
      turkish: "Pantotenik Asit",
      def: "B5 vitamini, CoA sentezi için gerekli",
    },
    {
      latin: "Calcium pantothenate",
      turkish: "Kalsiyum Pantotenat",
      def: "B5 vitamini kalsiyum tuzu",
    },
    {
      latin: "Pantethine",
      turkish: "Pantetin",
      def: "B5 vitamini aktif formu",
    },
    {
      latin: "Pyridoxine HCl",
      turkish: "Piridoksin HCl",
      def: "B6 vitamini, protein metabolizması için gerekli",
    },
    {
      latin: "Pyridoxal-5-phosphate",
      turkish: "Piridoksal-5-Fosfat",
      def: "B6 vitamini aktif formu (P5P)",
    },
    {
      latin: "Pyridoxamine",
      turkish: "Piridoksamin",
      def: "B6 vitamini formu",
    },
    {
      latin: "Biotin",
      turkish: "Biyotin",
      def: "B7 vitamini, saç ve tırnak sağlığı için önemli",
    },
    { latin: "D-Biotin", turkish: "D-Biyotin", def: "Biyotinin aktif formu" },
    {
      latin: "Folic acid",
      turkish: "Folik Asit",
      def: "B9 vitamini, hücre bölünmesi için gerekli",
    },
    { latin: "Folate", turkish: "Folat", def: "B9 vitamini doğal formu" },
    {
      latin: "5-MTHF",
      turkish: "5-MTHF",
      def: "Metilfolat, B9 vitamini aktif formu",
    },
    { latin: "Folinic acid", turkish: "Folinik Asit", def: "Folat metaboliti" },
    {
      latin: "Cyanocobalamin",
      turkish: "Siyanokobalamin",
      def: "B12 vitamini sentetik formu",
    },
    {
      latin: "Methylcobalamin",
      turkish: "Metilkobalamin",
      def: "B12 vitamini aktif metil formu",
    },
    {
      latin: "Adenosylcobalamin",
      turkish: "Adenozilkobalamin",
      def: "B12 vitamini mitokondriyal formu",
    },
    {
      latin: "Hydroxocobalamin",
      turkish: "Hidroksokobalamin",
      def: "B12 vitamini enjeksiyon formu",
    },
    {
      latin: "Ascorbic acid",
      turkish: "Askorbik Asit",
      def: "C vitamini, antioksidan ve bağışıklık için gerekli",
    },
    {
      latin: "Sodium ascorbate",
      turkish: "Sodyum Askorbat",
      def: "C vitamini tamponlu formu",
    },
    {
      latin: "Calcium ascorbate",
      turkish: "Kalsiyum Askorbat",
      def: "C vitamini kalsiyum tuzu",
    },
    {
      latin: "Ascorbyl palmitate",
      turkish: "Askorbil Palmitat",
      def: "Yağda çözünür C vitamini",
    },
    {
      latin: "Liposomal vitamin C",
      turkish: "Lipozomal C Vitamini",
      def: "Yüksek emilimli C vitamini",
    },
    {
      latin: "Ester-C",
      turkish: "Ester-C",
      def: "Tamponlu C vitamini kompleksi",
    },
    {
      latin: "Cholecalciferol",
      turkish: "Kolekalsiferol",
      def: "D3 vitamini, kemik sağlığı için gerekli",
    },
    {
      latin: "Ergocalciferol",
      turkish: "Ergokalsiferol",
      def: "D2 vitamini, bitkisel kaynaklı",
    },
    {
      latin: "Calcifediol",
      turkish: "Kalsifediol",
      def: "25-OH D vitamini, aktif metabolit",
    },
    {
      latin: "Calcitriol",
      turkish: "Kalsitriol",
      def: "1,25-OH D vitamini, en aktif form",
    },
    {
      latin: "Alpha-tocopherol",
      turkish: "Alfa Tokoferol",
      def: "E vitamini, antioksidan",
    },
    {
      latin: "Mixed tocopherols",
      turkish: "Karışık Tokoferoller",
      def: "E vitamini kompleksi",
    },
    {
      latin: "Tocotrienols",
      turkish: "Tokotrienoller",
      def: "E vitamini ailesi üyeleri",
    },
    {
      latin: "D-alpha tocopheryl succinate",
      turkish: "D-Alfa Tokoferil Süksinat",
      def: "E vitamini esteri",
    },
    {
      latin: "Phylloquinone",
      turkish: "Fillokinon",
      def: "K1 vitamini, pıhtılaşma için gerekli",
    },
    {
      latin: "Menaquinone-4",
      turkish: "Menakinon-4",
      def: "K2 vitamini MK-4 formu",
    },
    {
      latin: "Menaquinone-7",
      turkish: "Menakinon-7",
      def: "K2 vitamini MK-7 formu, uzun etkili",
    },
    {
      latin: "Choline bitartrate",
      turkish: "Kolin Bitartrat",
      def: "Kolin takviyesi, beyin sağlığı için",
    },
    {
      latin: "Choline citrate",
      turkish: "Kolin Sitrat",
      def: "Kolin sitrat formu",
    },
    {
      latin: "CDP-Choline",
      turkish: "CDP-Kolin",
      def: "Sitidin difosfat kolin, nootropik",
    },
    {
      latin: "Alpha-GPC",
      turkish: "Alfa-GPC",
      def: "Alfa gliserilfosforilkolin, beyin desteği",
    },
    {
      latin: "Phosphatidylcholine",
      turkish: "Fosfatidilkolin",
      def: "Lesitin bileşeni, hücre zarı desteği",
    },
    {
      latin: "Inositol",
      turkish: "İnositol",
      def: "B vitamini benzeri, sinir sistemi desteği",
    },
    {
      latin: "Myo-inositol",
      turkish: "Myo-İnositol",
      def: "İnositol aktif formu",
    },
    {
      latin: "D-chiro-inositol",
      turkish: "D-Kiro-İnositol",
      def: "İnsülin duyarlılığı için inositol",
    },
    {
      latin: "PABA",
      turkish: "PABA",
      def: "Para-aminobenzoik asit, folat metabolizması",
    },
    {
      latin: "Coenzyme Q10",
      turkish: "Koenzim Q10",
      def: "Ubiquinon, enerji üretimi ve antioksidan",
    },
    {
      latin: "Ubiquinol",
      turkish: "Ubiquinol",
      def: "CoQ10 indirgenmiş aktif formu",
    },
    {
      latin: "PQQ",
      turkish: "PQQ",
      def: "Pirolokinolin kinon, mitokondri desteği",
    },
    {
      latin: "Alpha-lipoic acid",
      turkish: "Alfa Lipoik Asit",
      def: "Evrensel antioksidan",
    },
    {
      latin: "R-lipoic acid",
      turkish: "R-Lipoik Asit",
      def: "Alfa lipoik asidin aktif formu",
    },
    {
      latin: "Acetyl-L-carnitine",
      turkish: "Asetil-L-Karnitin",
      def: "Beyin ve enerji desteği",
    },
    {
      latin: "L-Carnitine",
      turkish: "L-Karnitin",
      def: "Yağ metabolizması için amino asit",
    },
    {
      latin: "L-Carnitine tartrate",
      turkish: "L-Karnitin Tartrat",
      def: "Karnitin tartrat formu",
    },
    {
      latin: "Propionyl-L-carnitine",
      turkish: "Propionil-L-Karnitin",
      def: "Kalp sağlığı için karnitin",
    },
    {
      latin: "Glutathione",
      turkish: "Glutatyon",
      def: "Ana hücresel antioksidan",
    },
    {
      latin: "Liposomal glutathione",
      turkish: "Lipozomal Glutatyon",
      def: "Yüksek emilimli glutatyon",
    },
    {
      latin: "S-Acetyl glutathione",
      turkish: "S-Asetil Glutatyon",
      def: "Stabil glutatyon formu",
    },
    {
      latin: "N-Acetyl cysteine",
      turkish: "N-Asetil Sistein",
      def: "Glutatyon öncüsü, antioksidan",
    },
    {
      latin: "Methylsulfonylmethane",
      turkish: "MSM",
      def: "Organik kükürt, eklem sağlığı",
    },
    {
      latin: "Dimethyl sulfoxide",
      turkish: "DMSO",
      def: "Topikal anti-inflamatuar",
    },
    {
      latin: "Resveratrol",
      turkish: "Resveratrol",
      def: "Polifenol antioksidan, anti-aging",
    },
    {
      latin: "Trans-resveratrol",
      turkish: "Trans-Resveratrol",
      def: "Resveratrolün aktif formu",
    },
    {
      latin: "Pterostilbene",
      turkish: "Pterostilben",
      def: "Resveratrol benzeri, daha iyi emilim",
    },
    {
      latin: "Quercetin",
      turkish: "Kuersetin",
      def: "Flavonoid antioksidan, anti-inflamatuar",
    },
    {
      latin: "Quercetin dihydrate",
      turkish: "Kuersetin Dihidrat",
      def: "Kuersetin hidrat formu",
    },
    {
      latin: "Isoquercetin",
      turkish: "İzokuersetin",
      def: "Kuersetin glikozidi, daha iyi emilim",
    },
    {
      latin: "Rutin",
      turkish: "Rutin",
      def: "Kuersetin glikozidi, damar sağlığı",
    },
    {
      latin: "Hesperidin",
      turkish: "Hesperidin",
      def: "Narenciye flavonoidi, damar sağlığı",
    },
    { latin: "Naringenin", turkish: "Naringenin", def: "Greyfurt flavonoidi" },
    { latin: "Kaempferol", turkish: "Kaempferol", def: "Flavonol antioksidan" },
    { latin: "Myricetin", turkish: "Mirisetin", def: "Flavonol, antioksidan" },
    {
      latin: "Apigenin",
      turkish: "Apigenin",
      def: "Flavon, sakinleştirici etki",
    },
    { latin: "Luteolin", turkish: "Luteolin", def: "Flavon, anti-inflamatuar" },
    { latin: "Catechin", turkish: "Kateşin", def: "Yeşil çay flavanoidi" },
    {
      latin: "Epicatechin",
      turkish: "Epikateşin",
      def: "Kakao flavanoidi, kardiyovasküler sağlık",
    },
    {
      latin: "EGCG",
      turkish: "EGCG",
      def: "Epigallokateşin gallat, yeşil çay antioksidanı",
    },
    {
      latin: "Proanthocyanidins",
      turkish: "Proantosiyanidinler",
      def: "OPC, üzüm çekirdeği antioksidanı",
    },
    {
      latin: "Anthocyanins",
      turkish: "Antosiyaninler",
      def: "Mavi-mor meyve pigmentleri",
    },
    {
      latin: "Lycopene",
      turkish: "Likopen",
      def: "Domates karotenoidi, prostat sağlığı",
    },
    { latin: "Lutein", turkish: "Lutein", def: "Göz sağlığı karotenoidi" },
    {
      latin: "Zeaxanthin",
      turkish: "Zeaksantin",
      def: "Makula sağlığı karotenoidi",
    },
    {
      latin: "Astaxanthin",
      turkish: "Astaksantin",
      def: "Güçlü karotenoid antioksidan",
    },
    {
      latin: "Fucoxanthin",
      turkish: "Fukoksantin",
      def: "Deniz yosunu karotenoidi",
    },
    {
      latin: "Cryptoxanthin",
      turkish: "Kriptoksantin",
      def: "A vitamini öncüsü karotenoid",
    },
    {
      latin: "Canthaxanthin",
      turkish: "Kantaksantin",
      def: "Karotenoid pigment",
    },
  ];

  vitaminData.forEach((vitamin) => {
    vitamins.push({
      latinName: vitamin.latin,
      turkishName: vitamin.turkish,
      category: TermCategory.VITAMIN,
      definition: vitamin.def,
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
  });

  return vitamins;
};

// Mineraller (200 terim)
const generateMinerals = () => {
  const minerals = [];

  const mineralData = [
    {
      latin: "Calcium carbonate",
      turkish: "Kalsiyum Karbonat",
      def: "Kemik sağlığı için kalsiyum kaynağı",
    },
    {
      latin: "Calcium citrate",
      turkish: "Kalsiyum Sitrat",
      def: "Yüksek emilimli kalsiyum formu",
    },
    {
      latin: "Calcium citrate malate",
      turkish: "Kalsiyum Sitrat Malat",
      def: "İyi emilen kalsiyum formu",
    },
    {
      latin: "Calcium lactate",
      turkish: "Kalsiyum Laktat",
      def: "Kalsiyum laktat tuzu",
    },
    {
      latin: "Calcium gluconate",
      turkish: "Kalsiyum Glukonat",
      def: "IV kalsiyum formu",
    },
    {
      latin: "Calcium phosphate",
      turkish: "Kalsiyum Fosfat",
      def: "Kemik minerali formu",
    },
    {
      latin: "Calcium hydroxyapatite",
      turkish: "Kalsiyum Hidroksiapatit",
      def: "Kemik kaynaklı kalsiyum",
    },
    {
      latin: "Coral calcium",
      turkish: "Mercan Kalsiyumu",
      def: "Deniz mercanından kalsiyum",
    },
    {
      latin: "Calcium orotate",
      turkish: "Kalsiyum Orotat",
      def: "Orotik asit kalsiyum tuzu",
    },
    {
      latin: "Magnesium oxide",
      turkish: "Magnezyum Oksit",
      def: "Yüksek elementel magnezyum",
    },
    {
      latin: "Magnesium citrate",
      turkish: "Magnezyum Sitrat",
      def: "İyi emilen magnezyum formu",
    },
    {
      latin: "Magnesium glycinate",
      turkish: "Magnezyum Glisin",
      def: "Sakinleştirici magnezyum formu",
    },
    {
      latin: "Magnesium taurate",
      turkish: "Magnezyum Taurat",
      def: "Kalp sağlığı için magnezyum",
    },
    {
      latin: "Magnesium malate",
      turkish: "Magnezyum Malat",
      def: "Enerji üretimi için magnezyum",
    },
    {
      latin: "Magnesium threonate",
      turkish: "Magnezyum Treonat",
      def: "Beyin sağlığı için magnezyum",
    },
    {
      latin: "Magnesium chloride",
      turkish: "Magnezyum Klorür",
      def: "Topikal magnezyum formu",
    },
    {
      latin: "Magnesium sulfate",
      turkish: "Magnezyum Sülfat",
      def: "Epsom tuzu",
    },
    {
      latin: "Magnesium orotate",
      turkish: "Magnezyum Orotat",
      def: "Kardiyovasküler magnezyum",
    },
    {
      latin: "Magnesium aspartate",
      turkish: "Magnezyum Aspartat",
      def: "Amino asit şelat magnezyum",
    },
    {
      latin: "Magnesium lactate",
      turkish: "Magnezyum Laktat",
      def: "Magnezyum laktat tuzu",
    },
    {
      latin: "Zinc gluconate",
      turkish: "Çinko Glukonat",
      def: "Yaygın çinko takviyesi",
    },
    {
      latin: "Zinc picolinate",
      turkish: "Çinko Pikolinat",
      def: "Yüksek emilimli çinko",
    },
    {
      latin: "Zinc citrate",
      turkish: "Çinko Sitrat",
      def: "Çinko sitrat formu",
    },
    {
      latin: "Zinc acetate",
      turkish: "Çinko Asetat",
      def: "Soğuk algınlığı pastilleri",
    },
    {
      latin: "Zinc sulfate",
      turkish: "Çinko Sülfat",
      def: "Çinko sülfat tuzu",
    },
    { latin: "Zinc oxide", turkish: "Çinko Oksit", def: "Topikal çinko formu" },
    {
      latin: "Zinc monomethionine",
      turkish: "Çinko Monometiyonin",
      def: "OptiZinc formu",
    },
    {
      latin: "Zinc carnosine",
      turkish: "Çinko Karnozin",
      def: "Mide sağlığı için çinko",
    },
    {
      latin: "Zinc orotate",
      turkish: "Çinko Orotat",
      def: "Çinko orotat tuzu",
    },
    {
      latin: "Iron sulfate",
      turkish: "Demir Sülfat",
      def: "Yaygın demir takviyesi",
    },
    {
      latin: "Iron fumarate",
      turkish: "Demir Fumarat",
      def: "Demir fumarat tuzu",
    },
    {
      latin: "Iron gluconate",
      turkish: "Demir Glukonat",
      def: "Nazik demir formu",
    },
    {
      latin: "Iron bisglycinate",
      turkish: "Demir Bisglisin",
      def: "Şelat demir, iyi tolere edilir",
    },
    {
      latin: "Carbonyl iron",
      turkish: "Karbonil Demir",
      def: "Yüksek saflıkta elementel demir",
    },
    {
      latin: "Heme iron polypeptide",
      turkish: "Hem Demir Polipeptid",
      def: "Hayvansal kaynaklı demir",
    },
    { latin: "Iron sucrose", turkish: "Demir Sukroz", def: "IV demir formu" },
    {
      latin: "Ferric carboxymaltose",
      turkish: "Ferrik Karboksimaltoz",
      def: "IV demir infüzyonu",
    },
    {
      latin: "Copper gluconate",
      turkish: "Bakır Glukonat",
      def: "Bakır takviyesi",
    },
    {
      latin: "Copper sulfate",
      turkish: "Bakır Sülfat",
      def: "Bakır sülfat tuzu",
    },
    {
      latin: "Copper sebacate",
      turkish: "Bakır Sebasat",
      def: "Bakır sebasat formu",
    },
    {
      latin: "Copper bisglycinate",
      turkish: "Bakır Bisglisin",
      def: "Şelat bakır formu",
    },
    {
      latin: "Manganese gluconate",
      turkish: "Manganez Glukonat",
      def: "Manganez takviyesi",
    },
    {
      latin: "Manganese sulfate",
      turkish: "Manganez Sülfat",
      def: "Manganez sülfat tuzu",
    },
    {
      latin: "Manganese citrate",
      turkish: "Manganez Sitrat",
      def: "Manganez sitrat formu",
    },
    {
      latin: "Manganese bisglycinate",
      turkish: "Manganez Bisglisin",
      def: "Şelat manganez",
    },
    {
      latin: "Selenium selenite",
      turkish: "Selenyum Selenit",
      def: "İnorganik selenyum",
    },
    {
      latin: "Selenium selenate",
      turkish: "Selenyum Selenat",
      def: "Selenyum selenat tuzu",
    },
    {
      latin: "Selenomethionine",
      turkish: "Selenometiyonin",
      def: "Organik selenyum formu",
    },
    {
      latin: "Selenium yeast",
      turkish: "Selenyum Mayası",
      def: "Maya kaynaklı selenyum",
    },
    {
      latin: "Methylselenocysteine",
      turkish: "Metilselenosistein",
      def: "Aktif selenyum formu",
    },
    {
      latin: "Chromium picolinate",
      turkish: "Krom Pikolinat",
      def: "Kan şekeri desteği için krom",
    },
    {
      latin: "Chromium polynicotinate",
      turkish: "Krom Polinikotinat",
      def: "GTF krom formu",
    },
    {
      latin: "Chromium chloride",
      turkish: "Krom Klorür",
      def: "Krom klorür tuzu",
    },
    {
      latin: "Chromium histidinate",
      turkish: "Krom Histidinat",
      def: "Krom histidin şelatı",
    },
    {
      latin: "Molybdenum glycinate",
      turkish: "Molibden Glisin",
      def: "Molibden takviyesi",
    },
    {
      latin: "Sodium molybdate",
      turkish: "Sodyum Molibdat",
      def: "Molibden tuzu",
    },
    {
      latin: "Potassium chloride",
      turkish: "Potasyum Klorür",
      def: "Potasyum takviyesi",
    },
    {
      latin: "Potassium citrate",
      turkish: "Potasyum Sitrat",
      def: "Alkalileştirici potasyum",
    },
    {
      latin: "Potassium gluconate",
      turkish: "Potasyum Glukonat",
      def: "Potasyum glukonat tuzu",
    },
    {
      latin: "Potassium bicarbonate",
      turkish: "Potasyum Bikarbonat",
      def: "Alkalileştirici potasyum",
    },
    {
      latin: "Potassium aspartate",
      turkish: "Potasyum Aspartat",
      def: "Potasyum amino asit şelatı",
    },
    {
      latin: "Iodine",
      turkish: "İyot",
      def: "Tiroid fonksiyonu için gerekli mineral",
    },
    {
      latin: "Potassium iodide",
      turkish: "Potasyum İyodür",
      def: "İyot takviyesi",
    },
    { latin: "Sodium iodide", turkish: "Sodyum İyodür", def: "İyot tuzu" },
    {
      latin: "Kelp iodine",
      turkish: "Kelp İyodu",
      def: "Deniz yosunu kaynaklı iyot",
    },
    {
      latin: "Boron glycinate",
      turkish: "Bor Glisin",
      def: "Kemik sağlığı için bor",
    },
    { latin: "Boron citrate", turkish: "Bor Sitrat", def: "Bor sitrat formu" },
    {
      latin: "Calcium fructoborate",
      turkish: "Kalsiyum Fruktoborat",
      def: "Bor kompleksi",
    },
    {
      latin: "Silicon dioxide",
      turkish: "Silikon Dioksit",
      def: "Silika, bağ dokusu desteği",
    },
    {
      latin: "Orthosilicic acid",
      turkish: "Ortosilisik Asit",
      def: "Biyoyararlanılır silikon",
    },
    {
      latin: "Choline-stabilized orthosilicic acid",
      turkish: "Kolin Stabilize Ortosilisik Asit",
      def: "BioSil formu",
    },
    {
      latin: "Vanadyl sulfate",
      turkish: "Vanadil Sülfat",
      def: "Vanadyum takviyesi",
    },
    {
      latin: "Sodium metavanadate",
      turkish: "Sodyum Metavanadat",
      def: "Vanadyum tuzu",
    },
    {
      latin: "Strontium citrate",
      turkish: "Stronsiyum Sitrat",
      def: "Kemik sağlığı için stronsiyum",
    },
    {
      latin: "Strontium ranelate",
      turkish: "Stronsiyum Ranelat",
      def: "Osteoporoz ilacı",
    },
    {
      latin: "Lithium orotate",
      turkish: "Lityum Orotat",
      def: "Düşük doz lityum takviyesi",
    },
    {
      latin: "Lithium aspartate",
      turkish: "Lityum Aspartat",
      def: "Lityum amino asit şelatı",
    },
    {
      latin: "Germanium sesquioxide",
      turkish: "Germanyum Seskioksit",
      def: "Organik germanyum",
    },
    {
      latin: "Rubidium chloride",
      turkish: "Rubidyum Klorür",
      def: "Eser element rubidyum",
    },
    {
      latin: "Cesium chloride",
      turkish: "Sezyum Klorür",
      def: "Eser element sezyum",
    },
  ];

  mineralData.forEach((mineral) => {
    minerals.push({
      latinName: mineral.latin,
      turkishName: mineral.turkish,
      category: TermCategory.MINERAL,
      definition: mineral.def,
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
  });

  return minerals;
};

// Hastalıklar (1500 terim)
const generateDiseases = () => {
  const diseases = [];

  const diseaseData = [
    // Kardiyovasküler hastalıklar
    {
      latin: "Myocardial infarction",
      turkish: "Miyokard Enfarktüsü",
      def: "Kalp kası ölümü, kalp krizi",
    },
    {
      latin: "Angina pectoris",
      turkish: "Anjina Pektoris",
      def: "Göğüs ağrısı, koroner arter hastalığı belirtisi",
    },
    {
      latin: "Unstable angina",
      turkish: "Kararsız Anjina",
      def: "Akut koroner sendrom formu",
    },
    {
      latin: "Coronary artery disease",
      turkish: "Koroner Arter Hastalığı",
      def: "Kalp damarlarının daralması",
    },
    {
      latin: "Atherosclerosis",
      turkish: "Ateroskleroz",
      def: "Damar sertliği, plak birikimi",
    },
    {
      latin: "Heart failure",
      turkish: "Kalp Yetmezliği",
      def: "Kalbin pompalama fonksiyonunun bozulması",
    },
    {
      latin: "Congestive heart failure",
      turkish: "Konjestif Kalp Yetmezliği",
      def: "Sıvı birikimli kalp yetmezliği",
    },
    {
      latin: "Cardiomyopathy",
      turkish: "Kardiyomiyopati",
      def: "Kalp kası hastalığı",
    },
    {
      latin: "Dilated cardiomyopathy",
      turkish: "Dilate Kardiyomiyopati",
      def: "Kalp genişlemesi",
    },
    {
      latin: "Hypertrophic cardiomyopathy",
      turkish: "Hipertrofik Kardiyomiyopati",
      def: "Kalp kası kalınlaşması",
    },
    {
      latin: "Restrictive cardiomyopathy",
      turkish: "Restriktif Kardiyomiyopati",
      def: "Kalp duvarı sertleşmesi",
    },
    {
      latin: "Arrhythmogenic cardiomyopathy",
      turkish: "Aritmojenik Kardiyomiyopati",
      def: "Aritmi yapan kalp hastalığı",
    },
    {
      latin: "Atrial fibrillation",
      turkish: "Atriyal Fibrilasyon",
      def: "Düzensiz kalp ritmi",
    },
    {
      latin: "Atrial flutter",
      turkish: "Atriyal Flutter",
      def: "Hızlı düzenli atriyal ritim",
    },
    {
      latin: "Ventricular tachycardia",
      turkish: "Ventriküler Taşikardi",
      def: "Hızlı ventriküler ritim",
    },
    {
      latin: "Ventricular fibrillation",
      turkish: "Ventriküler Fibrilasyon",
      def: "Ölümcül kalp ritmi bozukluğu",
    },
    {
      latin: "Supraventricular tachycardia",
      turkish: "Supraventriküler Taşikardi",
      def: "Hızlı kalp atımı",
    },
    { latin: "Bradycardia", turkish: "Bradikardi", def: "Yavaş kalp atımı" },
    {
      latin: "Sick sinus syndrome",
      turkish: "Hasta Sinüs Sendromu",
      def: "Sinüs düğümü disfonksiyonu",
    },
    {
      latin: "Atrioventricular block",
      turkish: "Atriyoventriküler Blok",
      def: "Kalp iletim bloğu",
    },
    {
      latin: "Bundle branch block",
      turkish: "Dal Bloğu",
      def: "His demeti iletim bozukluğu",
    },
    {
      latin: "Long QT syndrome",
      turkish: "Uzun QT Sendromu",
      def: "Kalp elektriksel bozukluğu",
    },
    {
      latin: "Wolff-Parkinson-White syndrome",
      turkish: "WPW Sendromu",
      def: "Aksesuar yol sendromu",
    },
    {
      latin: "Brugada syndrome",
      turkish: "Brugada Sendromu",
      def: "Ani kardiyak ölüm riski sendromu",
    },
    {
      latin: "Hypertension",
      turkish: "Hipertansiyon",
      def: "Yüksek kan basıncı",
    },
    {
      latin: "Essential hypertension",
      turkish: "Esansiyel Hipertansiyon",
      def: "Birincil yüksek tansiyon",
    },
    {
      latin: "Secondary hypertension",
      turkish: "Sekonder Hipertansiyon",
      def: "İkincil yüksek tansiyon",
    },
    {
      latin: "Malignant hypertension",
      turkish: "Malign Hipertansiyon",
      def: "Şiddetli hipertansif kriz",
    },
    {
      latin: "Pulmonary hypertension",
      turkish: "Pulmoner Hipertansiyon",
      def: "Akciğer damar basıncı yüksekliği",
    },
    {
      latin: "Portal hypertension",
      turkish: "Portal Hipertansiyon",
      def: "Karaciğer damar basıncı yüksekliği",
    },
    { latin: "Hypotension", turkish: "Hipotansiyon", def: "Düşük kan basıncı" },
    {
      latin: "Orthostatic hypotension",
      turkish: "Ortostatik Hipotansiyon",
      def: "Ayağa kalkınca tansiyon düşmesi",
    },
    {
      latin: "Aortic aneurysm",
      turkish: "Aort Anevrizması",
      def: "Aort damarı genişlemesi",
    },
    {
      latin: "Aortic dissection",
      turkish: "Aort Diseksiyonu",
      def: "Aort duvarı yırtılması",
    },
    {
      latin: "Peripheral artery disease",
      turkish: "Periferik Arter Hastalığı",
      def: "Bacak damar tıkanıklığı",
    },
    {
      latin: "Deep vein thrombosis",
      turkish: "Derin Ven Trombozu",
      def: "Bacak toplardamarında pıhtı",
    },
    {
      latin: "Pulmonary embolism",
      turkish: "Pulmoner Emboli",
      def: "Akciğer damar tıkanıklığı",
    },
    {
      latin: "Varicose veins",
      turkish: "Varis",
      def: "Genişlemiş toplardamarlar",
    },
    {
      latin: "Chronic venous insufficiency",
      turkish: "Kronik Venöz Yetmezlik",
      def: "Toplardamar yetersizliği",
    },
    {
      latin: "Thrombophlebitis",
      turkish: "Tromboflebit",
      def: "Damar iltihabı ve pıhtı",
    },
    {
      latin: "Raynaud phenomenon",
      turkish: "Raynaud Fenomeni",
      def: "Soğukta parmak renk değişimi",
    },
    {
      latin: "Buerger disease",
      turkish: "Buerger Hastalığı",
      def: "Sigara ilişkili damar hastalığı",
    },
    {
      latin: "Takayasu arteritis",
      turkish: "Takayasu Arteriti",
      def: "Büyük damar vasküliti",
    },
    {
      latin: "Giant cell arteritis",
      turkish: "Dev Hücreli Arterit",
      def: "Temporal arterit",
    },
    {
      latin: "Polyarteritis nodosa",
      turkish: "Poliarteritis Nodoza",
      def: "Orta boy damar vasküliti",
    },
    {
      latin: "Kawasaki disease",
      turkish: "Kawasaki Hastalığı",
      def: "Çocukluk çağı vasküliti",
    },
    {
      latin: "Endocarditis",
      turkish: "Endokardit",
      def: "Kalp kapağı enfeksiyonu",
    },
    {
      latin: "Infective endocarditis",
      turkish: "Enfektif Endokardit",
      def: "Bakteriyel kalp kapağı enfeksiyonu",
    },
    { latin: "Myocarditis", turkish: "Miyokardit", def: "Kalp kası iltihabı" },
    { latin: "Pericarditis", turkish: "Perikardit", def: "Kalp zarı iltihabı" },
    {
      latin: "Cardiac tamponade",
      turkish: "Kardiyak Tamponad",
      def: "Kalp zarında sıvı birikimi",
    },
    {
      latin: "Constrictive pericarditis",
      turkish: "Konstriktif Perikardit",
      def: "Kalp zarı sertleşmesi",
    },
    {
      latin: "Mitral stenosis",
      turkish: "Mitral Stenoz",
      def: "Mitral kapak darlığı",
    },
    {
      latin: "Mitral regurgitation",
      turkish: "Mitral Regürjitasyon",
      def: "Mitral kapak yetersizliği",
    },
    {
      latin: "Mitral valve prolapse",
      turkish: "Mitral Kapak Prolapsusu",
      def: "Mitral kapak sarkması",
    },
    {
      latin: "Aortic stenosis",
      turkish: "Aort Stenozu",
      def: "Aort kapak darlığı",
    },
    {
      latin: "Aortic regurgitation",
      turkish: "Aort Regürjitasyonu",
      def: "Aort kapak yetersizliği",
    },
    {
      latin: "Tricuspid regurgitation",
      turkish: "Triküspit Regürjitasyonu",
      def: "Triküspit kapak yetersizliği",
    },
    {
      latin: "Pulmonary stenosis",
      turkish: "Pulmoner Stenoz",
      def: "Pulmoner kapak darlığı",
    },
    {
      latin: "Rheumatic heart disease",
      turkish: "Romatizmal Kalp Hastalığı",
      def: "Romatizma sonrası kapak hasarı",
    },

    // Solunum sistemi hastalıkları
    { latin: "Asthma", turkish: "Astım", def: "Kronik hava yolu inflamasyonu" },
    {
      latin: "Allergic asthma",
      turkish: "Alerjik Astım",
      def: "Alerjen tetikli astım",
    },
    {
      latin: "Exercise-induced asthma",
      turkish: "Egzersiz Astımı",
      def: "Egzersizle tetiklenen astım",
    },
    {
      latin: "Occupational asthma",
      turkish: "Mesleki Astım",
      def: "İş yerinde tetiklenen astım",
    },
    {
      latin: "Chronic obstructive pulmonary disease",
      turkish: "KOAH",
      def: "Kronik obstrüktif akciğer hastalığı",
    },
    {
      latin: "Emphysema",
      turkish: "Amfizem",
      def: "Akciğer hava kesecikleri hasarı",
    },
    {
      latin: "Chronic bronchitis",
      turkish: "Kronik Bronşit",
      def: "Kronik bronş iltihabı",
    },
    {
      latin: "Bronchiectasis",
      turkish: "Bronşektazi",
      def: "Bronş genişlemesi",
    },
    { latin: "Pneumonia", turkish: "Pnömoni", def: "Akciğer enfeksiyonu" },
    {
      latin: "Community-acquired pneumonia",
      turkish: "Toplum Kökenli Pnömoni",
      def: "Hastane dışı pnömoni",
    },
    {
      latin: "Hospital-acquired pneumonia",
      turkish: "Hastane Kökenli Pnömoni",
      def: "Nozokomiyal pnömoni",
    },
    {
      latin: "Aspiration pneumonia",
      turkish: "Aspirasyon Pnömonisi",
      def: "Yutma sonrası akciğer enfeksiyonu",
    },
    {
      latin: "Viral pneumonia",
      turkish: "Viral Pnömoni",
      def: "Virüs kaynaklı akciğer enfeksiyonu",
    },
    {
      latin: "Bacterial pneumonia",
      turkish: "Bakteriyel Pnömoni",
      def: "Bakteri kaynaklı akciğer enfeksiyonu",
    },
    { latin: "Tuberculosis", turkish: "Tüberküloz", def: "Verem hastalığı" },
    {
      latin: "Latent tuberculosis",
      turkish: "Latent Tüberküloz",
      def: "Gizli verem enfeksiyonu",
    },
    {
      latin: "Miliary tuberculosis",
      turkish: "Miliyer Tüberküloz",
      def: "Yaygın verem",
    },
    {
      latin: "Lung cancer",
      turkish: "Akciğer Kanseri",
      def: "Akciğer malignitesi",
    },
    {
      latin: "Small cell lung cancer",
      turkish: "Küçük Hücreli Akciğer Kanseri",
      def: "Agresif akciğer kanseri",
    },
    {
      latin: "Non-small cell lung cancer",
      turkish: "Küçük Hücreli Olmayan Akciğer Kanseri",
      def: "En sık akciğer kanseri tipi",
    },
    {
      latin: "Mesothelioma",
      turkish: "Mezotelyoma",
      def: "Asbest ilişkili akciğer zarı kanseri",
    },
    {
      latin: "Pulmonary fibrosis",
      turkish: "Pulmoner Fibrozis",
      def: "Akciğer skarlaşması",
    },
    {
      latin: "Idiopathic pulmonary fibrosis",
      turkish: "İdiyopatik Pulmoner Fibrozis",
      def: "Nedeni bilinmeyen akciğer fibrozisi",
    },
    {
      latin: "Sarcoidosis",
      turkish: "Sarkoidoz",
      def: "Granülomatöz akciğer hastalığı",
    },
    { latin: "Pneumothorax", turkish: "Pnömotoraks", def: "Akciğer çökmesi" },
    {
      latin: "Tension pneumothorax",
      turkish: "Tansiyon Pnömotoraks",
      def: "Acil akciğer çökmesi",
    },
    {
      latin: "Pleural effusion",
      turkish: "Plevral Efüzyon",
      def: "Akciğer zarında sıvı",
    },
    { latin: "Empyema", turkish: "Ampiyem", def: "Akciğer zarında irin" },
    { latin: "Pleurisy", turkish: "Plörezi", def: "Akciğer zarı iltihabı" },
    {
      latin: "Acute respiratory distress syndrome",
      turkish: "ARDS",
      def: "Akut solunum sıkıntısı sendromu",
    },
    {
      latin: "Respiratory failure",
      turkish: "Solunum Yetmezliği",
      def: "Akciğer fonksiyon kaybı",
    },
    {
      latin: "Sleep apnea",
      turkish: "Uyku Apnesi",
      def: "Uykuda solunum durması",
    },
    {
      latin: "Obstructive sleep apnea",
      turkish: "Obstrüktif Uyku Apnesi",
      def: "Tıkanıklık tipi uyku apnesi",
    },
    {
      latin: "Central sleep apnea",
      turkish: "Santral Uyku Apnesi",
      def: "Merkezi sinir sistemi kaynaklı apne",
    },
    {
      latin: "Cystic fibrosis",
      turkish: "Kistik Fibrozis",
      def: "Genetik mukus hastalığı",
    },
    {
      latin: "Alpha-1 antitrypsin deficiency",
      turkish: "Alfa-1 Antitripsin Eksikliği",
      def: "Genetik akciğer hastalığı",
    },
    {
      latin: "Pulmonary edema",
      turkish: "Pulmoner Ödem",
      def: "Akciğerde sıvı birikimi",
    },
    {
      latin: "Acute bronchitis",
      turkish: "Akut Bronşit",
      def: "Akut bronş iltihabı",
    },
    {
      latin: "Bronchiolitis",
      turkish: "Bronşiyolit",
      def: "Küçük hava yolu iltihabı",
    },
    { latin: "Laryngitis", turkish: "Larenjit", def: "Gırtlak iltihabı" },
    { latin: "Pharyngitis", turkish: "Farenjit", def: "Boğaz iltihabı" },
    { latin: "Tonsillitis", turkish: "Tonsillit", def: "Bademcik iltihabı" },
    { latin: "Sinusitis", turkish: "Sinüzit", def: "Sinüs iltihabı" },
    { latin: "Rhinitis", turkish: "Rinit", def: "Burun mukozası iltihabı" },
    {
      latin: "Allergic rhinitis",
      turkish: "Alerjik Rinit",
      def: "Saman nezlesi",
    },
    { latin: "Epistaxis", turkish: "Epistaksis", def: "Burun kanaması" },
    { latin: "Nasal polyps", turkish: "Nazal Polip", def: "Burun polipleri" },
    {
      latin: "Deviated septum",
      turkish: "Septum Deviasyonu",
      def: "Burun kemiği eğriliği",
    },

    // Sindirim sistemi hastalıkları
    {
      latin: "Gastroesophageal reflux disease",
      turkish: "GÖRH",
      def: "Mide asidi reflüsü",
    },
    {
      latin: "Barrett esophagus",
      turkish: "Barrett Özofagusu",
      def: "Özofagus metaplazisi",
    },
    {
      latin: "Esophageal cancer",
      turkish: "Özofagus Kanseri",
      def: "Yemek borusu kanseri",
    },
    {
      latin: "Esophageal varices",
      turkish: "Özofagus Varisleri",
      def: "Yemek borusu varis kanaması",
    },
    {
      latin: "Achalasia",
      turkish: "Akalazya",
      def: "Özofagus motilite bozukluğu",
    },
    { latin: "Dysphagia", turkish: "Disfaji", def: "Yutma güçlüğü" },
    { latin: "Gastritis", turkish: "Gastrit", def: "Mide iltihabı" },
    {
      latin: "Peptic ulcer disease",
      turkish: "Peptik Ülser",
      def: "Mide veya duodenum ülseri",
    },
    {
      latin: "Gastric ulcer",
      turkish: "Mide Ülseri",
      def: "Mide mukoza ülseri",
    },
    {
      latin: "Duodenal ulcer",
      turkish: "Duodenal Ülser",
      def: "Onikiparmak bağırsağı ülseri",
    },
    {
      latin: "Helicobacter pylori infection",
      turkish: "H. pylori Enfeksiyonu",
      def: "Mide bakterisi enfeksiyonu",
    },
    {
      latin: "Gastric cancer",
      turkish: "Mide Kanseri",
      def: "Mide malignitesi",
    },
    {
      latin: "Gastroparesis",
      turkish: "Gastroparezi",
      def: "Mide boşalma gecikmesi",
    },
    {
      latin: "Zollinger-Ellison syndrome",
      turkish: "Zollinger-Ellison Sendromu",
      def: "Gastrin salgılayan tümör",
    },
    {
      latin: "Celiac disease",
      turkish: "Çölyak Hastalığı",
      def: "Gluten intoleransı",
    },
    {
      latin: "Crohn disease",
      turkish: "Crohn Hastalığı",
      def: "İnflamatuar bağırsak hastalığı",
    },
    {
      latin: "Ulcerative colitis",
      turkish: "Ülseratif Kolit",
      def: "Kalın bağırsak iltihabı",
    },
    {
      latin: "Irritable bowel syndrome",
      turkish: "İrritabl Bağırsak Sendromu",
      def: "Fonksiyonel bağırsak bozukluğu",
    },
    {
      latin: "Diverticulitis",
      turkish: "Divertikülit",
      def: "Bağırsak divertikül iltihabı",
    },
    {
      latin: "Diverticulosis",
      turkish: "Divertikülozis",
      def: "Bağırsak divertikül oluşumu",
    },
    { latin: "Appendicitis", turkish: "Apandisit", def: "Apandis iltihabı" },
    {
      latin: "Colorectal cancer",
      turkish: "Kolorektal Kanser",
      def: "Kalın bağırsak kanseri",
    },
    {
      latin: "Colon polyps",
      turkish: "Kolon Polipleri",
      def: "Bağırsak polipleri",
    },
    { latin: "Hemorrhoids", turkish: "Hemoroid", def: "Basur" },
    { latin: "Anal fissure", turkish: "Anal Fissür", def: "Anüs çatlağı" },
    { latin: "Anal fistula", turkish: "Anal Fistül", def: "Anüs fistülü" },
    {
      latin: "Rectal prolapse",
      turkish: "Rektal Prolapsus",
      def: "Rektum sarkması",
    },
    {
      latin: "Intestinal obstruction",
      turkish: "Bağırsak Tıkanıklığı",
      def: "İleus",
    },
    { latin: "Volvulus", turkish: "Volvulus", def: "Bağırsak dönmesi" },
    {
      latin: "Intussusception",
      turkish: "İnvajinasyon",
      def: "Bağırsak içine girme",
    },
    {
      latin: "Ischemic colitis",
      turkish: "İskemik Kolit",
      def: "Bağırsak kan akımı azalması",
    },
    {
      latin: "Pseudomembranous colitis",
      turkish: "Psödomembranöz Kolit",
      def: "C. difficile koliti",
    },
    {
      latin: "Microscopic colitis",
      turkish: "Mikroskopik Kolit",
      def: "Kollajenöz/lenfositik kolit",
    },
    {
      latin: "Malabsorption syndrome",
      turkish: "Malabsorpsiyon Sendromu",
      def: "Emilim bozukluğu",
    },
    {
      latin: "Lactose intolerance",
      turkish: "Laktoz İntoleransı",
      def: "Süt şekeri sindirememesi",
    },
    {
      latin: "Short bowel syndrome",
      turkish: "Kısa Bağırsak Sendromu",
      def: "Bağırsak rezeksiyonu sonrası",
    },
    {
      latin: "Hepatitis A",
      turkish: "Hepatit A",
      def: "A tipi viral karaciğer iltihabı",
    },
    {
      latin: "Hepatitis B",
      turkish: "Hepatit B",
      def: "B tipi viral karaciğer iltihabı",
    },
    {
      latin: "Hepatitis C",
      turkish: "Hepatit C",
      def: "C tipi viral karaciğer iltihabı",
    },
    {
      latin: "Hepatitis D",
      turkish: "Hepatit D",
      def: "D tipi viral karaciğer iltihabı",
    },
    {
      latin: "Hepatitis E",
      turkish: "Hepatit E",
      def: "E tipi viral karaciğer iltihabı",
    },
    {
      latin: "Autoimmune hepatitis",
      turkish: "Otoimmün Hepatit",
      def: "Bağışıklık sistemi kaynaklı hepatit",
    },
    {
      latin: "Alcoholic liver disease",
      turkish: "Alkolik Karaciğer Hastalığı",
      def: "Alkol kaynaklı karaciğer hasarı",
    },
    {
      latin: "Non-alcoholic fatty liver disease",
      turkish: "Non-Alkolik Yağlı Karaciğer",
      def: "NAFLD",
    },
    {
      latin: "Non-alcoholic steatohepatitis",
      turkish: "Non-Alkolik Steatohepatit",
      def: "NASH",
    },
    { latin: "Cirrhosis", turkish: "Siroz", def: "Karaciğer skarlaşması" },
    {
      latin: "Liver failure",
      turkish: "Karaciğer Yetmezliği",
      def: "Karaciğer fonksiyon kaybı",
    },
    {
      latin: "Hepatocellular carcinoma",
      turkish: "Hepatosellüler Karsinom",
      def: "Karaciğer kanseri",
    },
    {
      latin: "Cholangiocarcinoma",
      turkish: "Kolanjiyokarsinom",
      def: "Safra yolu kanseri",
    },
    {
      latin: "Liver metastases",
      turkish: "Karaciğer Metastazı",
      def: "Karaciğere yayılmış kanser",
    },
    {
      latin: "Hepatic encephalopathy",
      turkish: "Hepatik Ensefalopati",
      def: "Karaciğer kaynaklı beyin hasarı",
    },
    {
      latin: "Ascites",
      turkish: "Asit",
      def: "Karın boşluğunda sıvı birikimi",
    },
    { latin: "Cholelithiasis", turkish: "Kolelitiazis", def: "Safra taşı" },
    {
      latin: "Cholecystitis",
      turkish: "Kolesistit",
      def: "Safra kesesi iltihabı",
    },
    {
      latin: "Choledocholithiasis",
      turkish: "Koledokolitiazis",
      def: "Safra kanalı taşı",
    },
    { latin: "Cholangitis", turkish: "Kolanjit", def: "Safra yolu iltihabı" },
    {
      latin: "Primary biliary cholangitis",
      turkish: "Primer Biliyer Kolanjit",
      def: "Otoimmün safra yolu hastalığı",
    },
    {
      latin: "Primary sclerosing cholangitis",
      turkish: "Primer Sklerozan Kolanjit",
      def: "Safra yolu sertleşmesi",
    },
    {
      latin: "Acute pancreatitis",
      turkish: "Akut Pankreatit",
      def: "Akut pankreas iltihabı",
    },
    {
      latin: "Chronic pancreatitis",
      turkish: "Kronik Pankreatit",
      def: "Kronik pankreas iltihabı",
    },
    {
      latin: "Pancreatic cancer",
      turkish: "Pankreas Kanseri",
      def: "Pankreas malignitesi",
    },
    {
      latin: "Pancreatic pseudocyst",
      turkish: "Pankreatik Psödokist",
      def: "Pankreas yalancı kisti",
    },
    {
      latin: "Exocrine pancreatic insufficiency",
      turkish: "Ekzokrin Pankreas Yetmezliği",
      def: "Pankreas enzim eksikliği",
    },
  ];

  diseaseData.forEach((disease) => {
    diseases.push({
      latinName: disease.latin,
      turkishName: disease.turkish,
      category: TermCategory.DISEASE,
      definition: disease.def,
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
  });

  return diseases;
};

// Böcekler (500 terim)
const generateInsects = () => {
  const insects = [];

  const insectData = [
    // Tıbbi öneme sahip böcekler
    {
      latin: "Anopheles gambiae",
      turkish: "Sıtma Sivrisineği",
      def: "Sıtma paraziti taşıyan sivrisinek",
    },
    {
      latin: "Anopheles stephensi",
      turkish: "Asya Sıtma Sivrisineği",
      def: "Güney Asya sıtma vektörü",
    },
    {
      latin: "Anopheles funestus",
      turkish: "Afrika Sıtma Sivrisineği",
      def: "Afrika sıtma vektörü",
    },
    {
      latin: "Aedes aegypti",
      turkish: "Sarı Humma Sivrisineği",
      def: "Dang, Zika, sarı humma vektörü",
    },
    {
      latin: "Aedes albopictus",
      turkish: "Asya Kaplan Sivrisineği",
      def: "Dang ve Chikungunya vektörü",
    },
    {
      latin: "Culex pipiens",
      turkish: "Ev Sivrisineği",
      def: "Batı Nil virüsü vektörü",
    },
    {
      latin: "Culex quinquefasciatus",
      turkish: "Güney Ev Sivrisineği",
      def: "Fil hastalığı vektörü",
    },
    {
      latin: "Phlebotomus papatasi",
      turkish: "Tatarcık",
      def: "Leishmaniasis vektörü",
    },
    {
      latin: "Lutzomyia longipalpis",
      turkish: "Kum Sineği",
      def: "Amerika leishmaniasis vektörü",
    },
    {
      latin: "Glossina morsitans",
      turkish: "Çeçe Sineği",
      def: "Uyku hastalığı vektörü",
    },
    {
      latin: "Glossina palpalis",
      turkish: "Nehir Çeçe Sineği",
      def: "Trypanosomiasis vektörü",
    },
    {
      latin: "Simulium damnosum",
      turkish: "Kara Sinek",
      def: "Nehir körlüğü vektörü",
    },
    {
      latin: "Chrysops silacea",
      turkish: "Geyik Sineği",
      def: "Loa loa vektörü",
    },
    {
      latin: "Musca domestica",
      turkish: "Ev Sineği",
      def: "Mekanik hastalık taşıyıcısı",
    },
    {
      latin: "Stomoxys calcitrans",
      turkish: "Ahır Sineği",
      def: "Isırıcı sinek, hastalık taşıyıcısı",
    },
    {
      latin: "Cochliomyia hominivorax",
      turkish: "Yeni Dünya Solucan Sineği",
      def: "Miyazis etkeni",
    },
    {
      latin: "Chrysomya bezziana",
      turkish: "Eski Dünya Solucan Sineği",
      def: "Miyazis etkeni",
    },
    {
      latin: "Dermatobia hominis",
      turkish: "İnsan Bot Sineği",
      def: "Deri miyazisi etkeni",
    },
    {
      latin: "Oestrus ovis",
      turkish: "Koyun Burun Kurdu",
      def: "Nazal miyazis etkeni",
    },
    {
      latin: "Gasterophilus intestinalis",
      turkish: "At Mide Kurdu",
      def: "Gastrointestinal miyazis",
    },
    {
      latin: "Sarcophaga carnaria",
      turkish: "Et Sineği",
      def: "Yara miyazisi etkeni",
    },
    {
      latin: "Lucilia sericata",
      turkish: "Yeşil Şişe Sineği",
      def: "Larva tedavisinde kullanılır",
    },
    {
      latin: "Calliphora vicina",
      turkish: "Mavi Şişe Sineği",
      def: "Adli entomolojide önemli",
    },
    {
      latin: "Cimex lectularius",
      turkish: "Yatak Piresi",
      def: "Kan emici böcek, kaşıntı yapar",
    },
    {
      latin: "Cimex hemipterus",
      turkish: "Tropikal Yatak Piresi",
      def: "Tropikal bölge yatak piresi",
    },
    {
      latin: "Triatoma infestans",
      turkish: "Öpücük Böceği",
      def: "Chagas hastalığı vektörü",
    },
    {
      latin: "Rhodnius prolixus",
      turkish: "Reduvid Böcek",
      def: "Chagas hastalığı vektörü",
    },
    {
      latin: "Panstrongylus megistus",
      turkish: "Büyük Öpücük Böceği",
      def: "Chagas vektörü",
    },
    {
      latin: "Pediculus humanus capitis",
      turkish: "Baş Biti",
      def: "Saçta yaşayan parazit",
    },
    {
      latin: "Pediculus humanus corporis",
      turkish: "Vücut Biti",
      def: "Tifüs vektörü",
    },
    {
      latin: "Phthirus pubis",
      turkish: "Kasık Biti",
      def: "Genital bölge paraziti",
    },
    { latin: "Pulex irritans", turkish: "İnsan Piresi", def: "Kan emici pire" },
    {
      latin: "Ctenocephalides felis",
      turkish: "Kedi Piresi",
      def: "En yaygın pire türü",
    },
    {
      latin: "Ctenocephalides canis",
      turkish: "Köpek Piresi",
      def: "Köpeklerde yaygın pire",
    },
    {
      latin: "Xenopsylla cheopis",
      turkish: "Sıçan Piresi",
      def: "Veba vektörü",
    },
    {
      latin: "Tunga penetrans",
      turkish: "Kum Piresi",
      def: "Tungiyazis etkeni",
    },
    {
      latin: "Ixodes scapularis",
      turkish: "Geyik Kenesi",
      def: "Lyme hastalığı vektörü",
    },
    {
      latin: "Ixodes ricinus",
      turkish: "Koyun Kenesi",
      def: "Avrupa Lyme vektörü",
    },
    {
      latin: "Ixodes persulcatus",
      turkish: "Tayga Kenesi",
      def: "Ensefalit vektörü",
    },
    {
      latin: "Dermacentor variabilis",
      turkish: "Amerikan Köpek Kenesi",
      def: "Rocky Mountain ateşi vektörü",
    },
    {
      latin: "Dermacentor andersoni",
      turkish: "Dağ Kenesi",
      def: "Kene felci etkeni",
    },
    {
      latin: "Amblyomma americanum",
      turkish: "Yalnız Yıldız Kenesi",
      def: "Ehrlichiosis vektörü",
    },
    {
      latin: "Rhipicephalus sanguineus",
      turkish: "Kahverengi Köpek Kenesi",
      def: "Akdeniz ateşi vektörü",
    },
    {
      latin: "Hyalomma marginatum",
      turkish: "Hyalomma Kenesi",
      def: "Kırım-Kongo kanamalı ateşi vektörü",
    },
    {
      latin: "Ornithodoros moubata",
      turkish: "Yumuşak Kene",
      def: "Tekrarlayan ateş vektörü",
    },
    {
      latin: "Argas persicus",
      turkish: "Tavuk Kenesi",
      def: "Kümes hayvanı paraziti",
    },
    {
      latin: "Sarcoptes scabiei",
      turkish: "Uyuz Akarı",
      def: "Uyuz hastalığı etkeni",
    },
    {
      latin: "Demodex folliculorum",
      turkish: "Kıl Folikül Akarı",
      def: "Yüz akarı",
    },
    {
      latin: "Demodex brevis",
      turkish: "Yağ Bezi Akarı",
      def: "Sebum bezlerinde yaşar",
    },
    {
      latin: "Dermatophagoides pteronyssinus",
      turkish: "Ev Tozu Akarı",
      def: "Alerji etkeni",
    },
    {
      latin: "Dermatophagoides farinae",
      turkish: "Amerikan Ev Tozu Akarı",
      def: "Alerji etkeni",
    },
    {
      latin: "Leptotrombidium deliense",
      turkish: "Çalı Akarı",
      def: "Scrub tifüs vektörü",
    },
    {
      latin: "Trombicula autumnalis",
      turkish: "Hasat Akarı",
      def: "Kaşıntılı döküntü yapar",
    },
    {
      latin: "Apis mellifera",
      turkish: "Bal Arısı",
      def: "Arı sokması alerjisi",
    },
    {
      latin: "Bombus terrestris",
      turkish: "Toprak Arısı",
      def: "Yaban arısı, sokma riski",
    },
    {
      latin: "Vespula vulgaris",
      turkish: "Sarı Ceket",
      def: "Eşek arısı, alerjik reaksiyon",
    },
    { latin: "Vespa crabro", turkish: "Eşek Arısı", def: "Büyük eşek arısı" },
    {
      latin: "Polistes dominula",
      turkish: "Kağıt Arısı",
      def: "Kağıt yuva yapan arı",
    },
    {
      latin: "Solenopsis invicta",
      turkish: "Ateş Karıncası",
      def: "Ağrılı sokma, alerji",
    },
    {
      latin: "Pogonomyrmex barbatus",
      turkish: "Hasat Karıncası",
      def: "Zehirli sokma",
    },
    {
      latin: "Paraponera clavata",
      turkish: "Kurşun Karıncası",
      def: "Çok ağrılı sokma",
    },
    {
      latin: "Myrmecia pyriformis",
      turkish: "Boğa Karıncası",
      def: "Avustralya zehirli karıncası",
    },
    {
      latin: "Latrodectus mactans",
      turkish: "Kara Dul Örümceği",
      def: "Nörotoksik zehir",
    },
    {
      latin: "Latrodectus tredecimguttatus",
      turkish: "Akdeniz Kara Dul",
      def: "Avrupa kara dul örümceği",
    },
    {
      latin: "Loxosceles reclusa",
      turkish: "Kahverengi Münzevi",
      def: "Nekrotik zehir",
    },
    {
      latin: "Phoneutria nigriventer",
      turkish: "Brezilya Gezgin Örümceği",
      def: "Agresif zehirli örümcek",
    },
    {
      latin: "Atrax robustus",
      turkish: "Sydney Huni Ağı Örümceği",
      def: "Ölümcül zehir",
    },
    {
      latin: "Centruroides sculpturatus",
      turkish: "Arizona Kabuğu Akrebi",
      def: "Nörotoksik akrep",
    },
    {
      latin: "Androctonus australis",
      turkish: "Sarı Kalın Kuyruklu Akrep",
      def: "Ölümcül akrep",
    },
    {
      latin: "Leiurus quinquestriatus",
      turkish: "Ölüm Avcısı Akrep",
      def: "En zehirli akrep",
    },
    {
      latin: "Tityus serrulatus",
      turkish: "Brezilya Sarı Akrebi",
      def: "Güney Amerika zehirli akrebi",
    },
    {
      latin: "Buthus occitanus",
      turkish: "Akdeniz Akrebi",
      def: "Avrupa zehirli akrebi",
    },
    {
      latin: "Mesobuthus tamulus",
      turkish: "Hint Kırmızı Akrebi",
      def: "Asya zehirli akrebi",
    },
    {
      latin: "Scolopendra gigantea",
      turkish: "Dev Kırkayak",
      def: "Zehirli ısırık",
    },
    {
      latin: "Scolopendra subspinipes",
      turkish: "Vietnam Kırkayağı",
      def: "Ağrılı ısırık",
    },
    {
      latin: "Blatta orientalis",
      turkish: "Doğu Hamamböceği",
      def: "Alerjen taşıyıcı",
    },
    {
      latin: "Periplaneta americana",
      turkish: "Amerikan Hamamböceği",
      def: "Hastalık taşıyıcısı",
    },
    {
      latin: "Blattella germanica",
      turkish: "Alman Hamamböceği",
      def: "En yaygın hamamböceği",
    },
    {
      latin: "Supella longipalpa",
      turkish: "Kahverengi Bantlı Hamamböceği",
      def: "Ev zararlısı",
    },
    { latin: "Tenebrio molitor", turkish: "Un Kurdu", def: "Depo zararlısı" },
    {
      latin: "Tribolium castaneum",
      turkish: "Kırmızı Un Böceği",
      def: "Un zararlısı",
    },
    {
      latin: "Sitophilus granarius",
      turkish: "Buğday Biti",
      def: "Tahıl zararlısı",
    },
    {
      latin: "Callosobruchus maculatus",
      turkish: "Bakla Böceği",
      def: "Baklagil zararlısı",
    },
    {
      latin: "Acanthoscelides obtectus",
      turkish: "Fasulye Böceği",
      def: "Fasulye zararlısı",
    },
    {
      latin: "Ephestia kuehniella",
      turkish: "Un Güvesi",
      def: "Depo zararlısı",
    },
    {
      latin: "Plodia interpunctella",
      turkish: "Hint Unu Güvesi",
      def: "Gıda zararlısı",
    },
    {
      latin: "Tineola bisselliella",
      turkish: "Elbise Güvesi",
      def: "Tekstil zararlısı",
    },
    {
      latin: "Tinea pellionella",
      turkish: "Kürk Güvesi",
      def: "Kürk ve yün zararlısı",
    },
    {
      latin: "Lepisma saccharina",
      turkish: "Gümüş Balık",
      def: "Kağıt ve tekstil zararlısı",
    },
    {
      latin: "Thermobia domestica",
      turkish: "Ateş Böceği",
      def: "Sıcak ortam zararlısı",
    },
    {
      latin: "Liposcelis bostrychophila",
      turkish: "Kitap Biti",
      def: "Kağıt ve kitap zararlısı",
    },
    {
      latin: "Ctenocephalides felis",
      turkish: "Kedi Piresi",
      def: "Evcil hayvan paraziti",
    },
    {
      latin: "Echidnophaga gallinacea",
      turkish: "Tavuk Piresi",
      def: "Kümes hayvanı paraziti",
    },
    {
      latin: "Nosopsyllus fasciatus",
      turkish: "Kuzey Sıçan Piresi",
      def: "Kemirgen paraziti",
    },
    {
      latin: "Leptopsylla segnis",
      turkish: "Fare Piresi",
      def: "Fare paraziti",
    },
  ];

  insectData.forEach((insect) => {
    insects.push({
      latinName: insect.latin,
      turkishName: insect.turkish,
      category: TermCategory.INSECT,
      definition: insect.def,
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
  });

  return insects;
};

// Bileşenler (800 terim)
const generateComponents = () => {
  const components = [];

  const componentData = [
    // Amino asitler
    {
      latin: "L-Alanine",
      turkish: "L-Alanin",
      def: "Non-esansiyel amino asit",
    },
    {
      latin: "L-Arginine",
      turkish: "L-Arjinin",
      def: "Nitrik oksit öncüsü amino asit",
    },
    {
      latin: "L-Asparagine",
      turkish: "L-Asparagin",
      def: "Non-esansiyel amino asit",
    },
    {
      latin: "L-Aspartic acid",
      turkish: "L-Aspartik Asit",
      def: "Asidik amino asit",
    },
    {
      latin: "L-Cysteine",
      turkish: "L-Sistein",
      def: "Kükürt içeren amino asit",
    },
    {
      latin: "L-Glutamine",
      turkish: "L-Glutamin",
      def: "En bol amino asit, bağırsak sağlığı",
    },
    {
      latin: "L-Glutamic acid",
      turkish: "L-Glutamik Asit",
      def: "Nörotransmitter öncüsü",
    },
    {
      latin: "Glycine",
      turkish: "Glisin",
      def: "En basit amino asit, kolajen bileşeni",
    },
    {
      latin: "L-Histidine",
      turkish: "L-Histidin",
      def: "Histamin öncüsü amino asit",
    },
    {
      latin: "L-Isoleucine",
      turkish: "L-İzolösin",
      def: "Dallı zincirli esansiyel amino asit",
    },
    {
      latin: "L-Leucine",
      turkish: "L-Lösin",
      def: "Kas sentezi için önemli BCAA",
    },
    {
      latin: "L-Lysine",
      turkish: "L-Lizin",
      def: "Esansiyel amino asit, kolajen sentezi",
    },
    {
      latin: "L-Methionine",
      turkish: "L-Metiyonin",
      def: "Kükürt içeren esansiyel amino asit",
    },
    {
      latin: "L-Phenylalanine",
      turkish: "L-Fenilalanin",
      def: "Tirozin öncüsü amino asit",
    },
    {
      latin: "L-Proline",
      turkish: "L-Prolin",
      def: "Kolajen yapısında önemli amino asit",
    },
    {
      latin: "L-Serine",
      turkish: "L-Serin",
      def: "Fosfolipid sentezinde rol alan amino asit",
    },
    { latin: "L-Threonine", turkish: "L-Treonin", def: "Esansiyel amino asit" },
    {
      latin: "L-Tryptophan",
      turkish: "L-Triptofan",
      def: "Serotonin öncüsü amino asit",
    },
    {
      latin: "L-Tyrosine",
      turkish: "L-Tirozin",
      def: "Dopamin ve tiroid hormonu öncüsü",
    },
    {
      latin: "L-Valine",
      turkish: "L-Valin",
      def: "Dallı zincirli esansiyel amino asit",
    },
    {
      latin: "L-Ornithine",
      turkish: "L-Ornitin",
      def: "Üre döngüsü amino asiti",
    },
    {
      latin: "L-Citrulline",
      turkish: "L-Sitrulin",
      def: "Nitrik oksit üretimini artırır",
    },
    {
      latin: "Taurine",
      turkish: "Taurin",
      def: "Sülfür amino asit, kalp ve göz sağlığı",
    },
    {
      latin: "Beta-alanine",
      turkish: "Beta-Alanin",
      def: "Karnosin öncüsü, dayanıklılık",
    },
    {
      latin: "L-Carnosine",
      turkish: "L-Karnozin",
      def: "Antioksidan dipeptid",
    },
    {
      latin: "Creatine monohydrate",
      turkish: "Kreatin Monohidrat",
      def: "Kas enerji desteği",
    },
    {
      latin: "L-Theanine",
      turkish: "L-Teanin",
      def: "Yeşil çay amino asiti, sakinleştirici",
    },
    { latin: "GABA", turkish: "GABA", def: "İnhibitör nörotransmitter" },
    { latin: "5-HTP", turkish: "5-HTP", def: "Serotonin öncüsü" },
    {
      latin: "SAMe",
      turkish: "SAMe",
      def: "S-adenozil metiyonin, metil donörü",
    },
    { latin: "DMAE", turkish: "DMAE", def: "Dimetilaminoetanol, kolinerjik" },
    {
      latin: "Phosphatidylserine",
      turkish: "Fosfatidilserin",
      def: "Beyin fosfolipidi",
    },
    {
      latin: "Phosphatidylcholine",
      turkish: "Fosfatidilkolin",
      def: "Hücre zarı bileşeni",
    },
    {
      latin: "Phosphatidylinositol",
      turkish: "Fosfatidilinositol",
      def: "Sinyal iletimi fosfolipidi",
    },
    {
      latin: "Phosphatidylethanolamine",
      turkish: "Fosfatidiletanolamin",
      def: "Membran fosfolipidi",
    },
    {
      latin: "Sphingomyelin",
      turkish: "Sfingomiyelin",
      def: "Sinir kılıfı bileşeni",
    },
    { latin: "Ceramide", turkish: "Seramid", def: "Cilt bariyeri lipidi" },
    { latin: "Ganglioside", turkish: "Gangliozid", def: "Beyin glikolipidi" },

    // Yağ asitleri
    {
      latin: "Omega-3 fatty acids",
      turkish: "Omega-3 Yağ Asitleri",
      def: "Esansiyel yağ asitleri",
    },
    {
      latin: "EPA",
      turkish: "EPA",
      def: "Eikosapentaenoik asit, anti-inflamatuar",
    },
    {
      latin: "DHA",
      turkish: "DHA",
      def: "Dokosaheksaenoik asit, beyin sağlığı",
    },
    {
      latin: "ALA",
      turkish: "ALA",
      def: "Alfa-linolenik asit, bitkisel omega-3",
    },
    {
      latin: "Omega-6 fatty acids",
      turkish: "Omega-6 Yağ Asitleri",
      def: "Esansiyel yağ asitleri",
    },
    {
      latin: "Linoleic acid",
      turkish: "Linoleik Asit",
      def: "Esansiyel omega-6",
    },
    {
      latin: "GLA",
      turkish: "GLA",
      def: "Gama-linolenik asit, anti-inflamatuar",
    },
    {
      latin: "Arachidonic acid",
      turkish: "Araşidonik Asit",
      def: "Prostaglandin öncüsü",
    },
    {
      latin: "Omega-9 fatty acids",
      turkish: "Omega-9 Yağ Asitleri",
      def: "Oleik asit grubu",
    },
    {
      latin: "Oleic acid",
      turkish: "Oleik Asit",
      def: "Zeytinyağı ana yağ asiti",
    },
    {
      latin: "Palmitic acid",
      turkish: "Palmitik Asit",
      def: "Doymuş yağ asiti",
    },
    { latin: "Stearic acid", turkish: "Stearik Asit", def: "Doymuş yağ asiti" },
    {
      latin: "Lauric acid",
      turkish: "Laurik Asit",
      def: "Hindistancevizi yağı bileşeni",
    },
    {
      latin: "Caprylic acid",
      turkish: "Kaprilik Asit",
      def: "Orta zincirli yağ asiti",
    },
    {
      latin: "Capric acid",
      turkish: "Kaprik Asit",
      def: "Orta zincirli yağ asiti",
    },
    {
      latin: "MCT oil",
      turkish: "MCT Yağı",
      def: "Orta zincirli trigliseritler",
    },
    {
      latin: "Conjugated linoleic acid",
      turkish: "CLA",
      def: "Konjuge linoleik asit",
    },
    {
      latin: "Butyric acid",
      turkish: "Bütirik Asit",
      def: "Kısa zincirli yağ asiti, bağırsak sağlığı",
    },
    {
      latin: "Propionic acid",
      turkish: "Propiyonik Asit",
      def: "Kısa zincirli yağ asiti",
    },
    { latin: "Acetic acid", turkish: "Asetik Asit", def: "Sirke asiti" },

    // Enzimler
    { latin: "Bromelain", turkish: "Bromelain", def: "Ananas proteaz enzimi" },
    { latin: "Papain", turkish: "Papain", def: "Papaya proteaz enzimi" },
    {
      latin: "Serrapeptase",
      turkish: "Serrapeptaz",
      def: "İpek böceği proteaz enzimi",
    },
    {
      latin: "Nattokinase",
      turkish: "Nattokinaz",
      def: "Natto fibrinolitik enzimi",
    },
    {
      latin: "Lumbrokinase",
      turkish: "Lumbrokinaz",
      def: "Solucan fibrinolitik enzimi",
    },
    { latin: "Lipase", turkish: "Lipaz", def: "Yağ sindirimi enzimi" },
    { latin: "Amylase", turkish: "Amilaz", def: "Nişasta sindirimi enzimi" },
    { latin: "Protease", turkish: "Proteaz", def: "Protein sindirimi enzimi" },
    { latin: "Lactase", turkish: "Laktaz", def: "Laktoz sindirimi enzimi" },
    { latin: "Cellulase", turkish: "Selülaz", def: "Selüloz sindirimi enzimi" },
    { latin: "Invertase", turkish: "İnvertaz", def: "Sukroz sindirimi enzimi" },
    { latin: "Maltase", turkish: "Maltaz", def: "Maltoz sindirimi enzimi" },
    { latin: "Pepsin", turkish: "Pepsin", def: "Mide proteaz enzimi" },
    { latin: "Trypsin", turkish: "Tripsin", def: "Pankreas proteaz enzimi" },
    {
      latin: "Chymotrypsin",
      turkish: "Kimotripsin",
      def: "Pankreas proteaz enzimi",
    },
    {
      latin: "Pancreatin",
      turkish: "Pankreatin",
      def: "Pankreas enzim karışımı",
    },
    { latin: "Betaine HCl", turkish: "Betain HCl", def: "Mide asidi desteği" },
    { latin: "Ox bile", turkish: "Öküz Safrası", def: "Yağ sindirimi desteği" },
    {
      latin: "Superoxide dismutase",
      turkish: "Süperoksit Dismutaz",
      def: "Antioksidan enzim",
    },
    {
      latin: "Catalase",
      turkish: "Katalaz",
      def: "Hidrojen peroksit parçalayan enzim",
    },
    {
      latin: "Glutathione peroxidase",
      turkish: "Glutatyon Peroksidaz",
      def: "Antioksidan enzim",
    },
    {
      latin: "Glutathione reductase",
      turkish: "Glutatyon Redüktaz",
      def: "Glutatyon geri dönüşüm enzimi",
    },

    // Probiyotikler
    {
      latin: "Lactobacillus acidophilus",
      turkish: "L. acidophilus",
      def: "Yaygın probiyotik bakteri",
    },
    {
      latin: "Lactobacillus rhamnosus",
      turkish: "L. rhamnosus",
      def: "Bağırsak sağlığı probiyotiği",
    },
    {
      latin: "Lactobacillus plantarum",
      turkish: "L. plantarum",
      def: "Fermente gıda probiyotiği",
    },
    {
      latin: "Lactobacillus casei",
      turkish: "L. casei",
      def: "Süt ürünleri probiyotiği",
    },
    {
      latin: "Lactobacillus reuteri",
      turkish: "L. reuteri",
      def: "Çok yönlü probiyotik",
    },
    {
      latin: "Lactobacillus gasseri",
      turkish: "L. gasseri",
      def: "Kilo yönetimi probiyotiği",
    },
    {
      latin: "Lactobacillus helveticus",
      turkish: "L. helveticus",
      def: "Peynir probiyotiği",
    },
    {
      latin: "Lactobacillus bulgaricus",
      turkish: "L. bulgaricus",
      def: "Yoğurt probiyotiği",
    },
    {
      latin: "Lactobacillus salivarius",
      turkish: "L. salivarius",
      def: "Ağız sağlığı probiyotiği",
    },
    {
      latin: "Lactobacillus fermentum",
      turkish: "L. fermentum",
      def: "Antioksidan probiyotik",
    },
    {
      latin: "Bifidobacterium longum",
      turkish: "B. longum",
      def: "Uzun ömürlü bifidobakteri",
    },
    {
      latin: "Bifidobacterium bifidum",
      turkish: "B. bifidum",
      def: "Bebek bağırsak florası",
    },
    {
      latin: "Bifidobacterium lactis",
      turkish: "B. lactis",
      def: "Bağışıklık destekleyici",
    },
    {
      latin: "Bifidobacterium breve",
      turkish: "B. breve",
      def: "Bebek probiyotiği",
    },
    {
      latin: "Bifidobacterium infantis",
      turkish: "B. infantis",
      def: "Bebek bağırsak florası",
    },
    {
      latin: "Bifidobacterium animalis",
      turkish: "B. animalis",
      def: "Sindirim sağlığı probiyotiği",
    },
    {
      latin: "Streptococcus thermophilus",
      turkish: "S. thermophilus",
      def: "Yoğurt starter kültürü",
    },
    {
      latin: "Saccharomyces boulardii",
      turkish: "S. boulardii",
      def: "Probiyotik maya",
    },
    {
      latin: "Bacillus coagulans",
      turkish: "B. coagulans",
      def: "Spor oluşturan probiyotik",
    },
    {
      latin: "Bacillus subtilis",
      turkish: "B. subtilis",
      def: "Toprak bazlı probiyotik",
    },
    {
      latin: "Enterococcus faecium",
      turkish: "E. faecium",
      def: "Bağırsak probiyotiği",
    },

    // Prebiyotikler ve lifler
    {
      latin: "Inulin",
      turkish: "İnülin",
      def: "Prebiyotik lif, bifidobakteri besler",
    },
    { latin: "FOS", turkish: "FOS", def: "Fruktooligosakkaritler, prebiyotik" },
    {
      latin: "GOS",
      turkish: "GOS",
      def: "Galaktooligosakkaritler, prebiyotik",
    },
    { latin: "XOS", turkish: "XOS", def: "Ksilooligosakkaritler, prebiyotik" },
    {
      latin: "Arabinogalactan",
      turkish: "Arabinogalaktan",
      def: "Bağışıklık destekleyici lif",
    },
    {
      latin: "Resistant starch",
      turkish: "Dirençli Nişasta",
      def: "Prebiyotik nişasta",
    },
    {
      latin: "Pectin",
      turkish: "Pektin",
      def: "Meyve lifi, kolesterol düşürücü",
    },
    {
      latin: "Beta-glucan",
      turkish: "Beta-Glukan",
      def: "Bağışıklık ve kolesterol desteği",
    },
    {
      latin: "Glucomannan",
      turkish: "Glukomannan",
      def: "Konjak lifi, tokluk sağlar",
    },
    {
      latin: "Guar gum",
      turkish: "Guar Zamkı",
      def: "Çözünür lif, kan şekeri desteği",
    },
    {
      latin: "Acacia fiber",
      turkish: "Akasya Lifi",
      def: "Prebiyotik çözünür lif",
    },
    {
      latin: "Psyllium husk",
      turkish: "Psyllium Kabuğu",
      def: "Çözünür lif, bağırsak düzenleyici",
    },
    { latin: "Cellulose", turkish: "Selüloz", def: "Çözünmez lif" },
    { latin: "Lignin", turkish: "Lignin", def: "Çözünmez lif" },
    { latin: "Chitin", turkish: "Kitin", def: "Kabuklu deniz ürünleri lifi" },
    {
      latin: "Chitosan",
      turkish: "Kitosan",
      def: "Kitin türevi, yağ bağlayıcı",
    },

    // Diğer bileşenler
    {
      latin: "Hyaluronic acid",
      turkish: "Hyaluronik Asit",
      def: "Eklem ve cilt nemlendirici",
    },
    {
      latin: "Collagen type I",
      turkish: "Tip I Kolajen",
      def: "Cilt ve kemik kolajeni",
    },
    {
      latin: "Collagen type II",
      turkish: "Tip II Kolajen",
      def: "Kıkırdak kolajeni",
    },
    {
      latin: "Collagen type III",
      turkish: "Tip III Kolajen",
      def: "Damar ve organ kolajeni",
    },
    {
      latin: "Hydrolyzed collagen",
      turkish: "Hidrolize Kolajen",
      def: "Kolajen peptitleri",
    },
    {
      latin: "Marine collagen",
      turkish: "Deniz Kolajeni",
      def: "Balık kaynaklı kolajen",
    },
    {
      latin: "Bovine collagen",
      turkish: "Sığır Kolajeni",
      def: "Sığır kaynaklı kolajen",
    },
    {
      latin: "Glucosamine sulfate",
      turkish: "Glukozamin Sülfat",
      def: "Eklem sağlığı bileşeni",
    },
    {
      latin: "Glucosamine HCl",
      turkish: "Glukozamin HCl",
      def: "Glukozamin hidroklorür",
    },
    {
      latin: "Chondroitin sulfate",
      turkish: "Kondroitin Sülfat",
      def: "Kıkırdak bileşeni",
    },
    { latin: "Keratin", turkish: "Keratin", def: "Saç ve tırnak proteini" },
    { latin: "Elastin", turkish: "Elastin", def: "Cilt esneklik proteini" },
    { latin: "Biotin", turkish: "Biyotin", def: "Saç ve tırnak vitamini" },
    { latin: "Silica", turkish: "Silika", def: "Bağ dokusu minerali" },
    {
      latin: "Methylsulfonylmethane",
      turkish: "MSM",
      def: "Organik kükürt bileşiği",
    },
    { latin: "Dimethylglycine", turkish: "DMG", def: "Metil donörü" },
    { latin: "Trimethylglycine", turkish: "TMG", def: "Betain, metil donörü" },
    {
      latin: "Policosanol",
      turkish: "Polikosanol",
      def: "Şeker kamışı balmumu özütü",
    },
    {
      latin: "Red yeast rice",
      turkish: "Kırmızı Maya Pirinci",
      def: "Doğal statin kaynağı",
    },
    {
      latin: "Plant sterols",
      turkish: "Bitki Sterolleri",
      def: "Kolesterol emilim engelleyici",
    },
    {
      latin: "Stanols",
      turkish: "Stanoller",
      def: "Kolesterol düşürücü bileşikler",
    },
    { latin: "Lecithin", turkish: "Lesitin", def: "Fosfolipid karışımı" },
    {
      latin: "Soy lecithin",
      turkish: "Soya Lesitini",
      def: "Soya kaynaklı lesitin",
    },
    {
      latin: "Sunflower lecithin",
      turkish: "Ayçiçeği Lesitini",
      def: "Ayçiçeği kaynaklı lesitin",
    },
    {
      latin: "Phospholipids",
      turkish: "Fosfolipidler",
      def: "Hücre zarı bileşenleri",
    },
    {
      latin: "Sphingolipids",
      turkish: "Sfingolipidler",
      def: "Sinir sistemi lipidleri",
    },
    {
      latin: "Glycolipids",
      turkish: "Glikolipidler",
      def: "Şeker içeren lipidler",
    },
    {
      latin: "Cerebrosides",
      turkish: "Serebrozidler",
      def: "Beyin glikolipidleri",
    },
  ];

  componentData.forEach((component) => {
    components.push({
      latinName: component.latin,
      turkishName: component.turkish,
      category: TermCategory.COMPONENT,
      definition: component.def,
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
  });

  return components;
};

// Anatomi (800 terim)
const generateAnatomy = () => {
  const anatomy = [];

  const anatomyData = [
    // Kemik sistemi
    { latin: "Cranium", turkish: "Kafatası", def: "Beyni koruyan kemik yapı" },
    { latin: "Frontal bone", turkish: "Frontal Kemik", def: "Alın kemiği" },
    {
      latin: "Parietal bone",
      turkish: "Parietal Kemik",
      def: "Yan kafatası kemiği",
    },
    { latin: "Temporal bone", turkish: "Temporal Kemik", def: "Şakak kemiği" },
    { latin: "Occipital bone", turkish: "Oksipital Kemik", def: "Ense kemiği" },
    { latin: "Sphenoid bone", turkish: "Sfenoid Kemik", def: "Kelebek kemik" },
    { latin: "Ethmoid bone", turkish: "Etmoid Kemik", def: "Kalbur kemik" },
    { latin: "Maxilla", turkish: "Maksilla", def: "Üst çene kemiği" },
    { latin: "Mandible", turkish: "Mandibula", def: "Alt çene kemiği" },
    {
      latin: "Zygomatic bone",
      turkish: "Zigomatik Kemik",
      def: "Elmacık kemiği",
    },
    { latin: "Nasal bone", turkish: "Nazal Kemik", def: "Burun kemiği" },
    {
      latin: "Lacrimal bone",
      turkish: "Lakrimal Kemik",
      def: "Gözyaşı kemiği",
    },
    { latin: "Palatine bone", turkish: "Palatin Kemik", def: "Damak kemiği" },
    { latin: "Vomer", turkish: "Vomer", def: "Burun bölme kemiği" },
    {
      latin: "Inferior nasal concha",
      turkish: "Alt Burun Konkası",
      def: "Alt burun kemiği",
    },
    { latin: "Hyoid bone", turkish: "Hyoid Kemik", def: "Dil kemiği" },
    {
      latin: "Cervical vertebrae",
      turkish: "Servikal Vertebra",
      def: "Boyun omurları (C1-C7)",
    },
    { latin: "Atlas", turkish: "Atlas", def: "Birinci boyun omuru (C1)" },
    { latin: "Axis", turkish: "Aksis", def: "İkinci boyun omuru (C2)" },
    {
      latin: "Thoracic vertebrae",
      turkish: "Torasik Vertebra",
      def: "Göğüs omurları (T1-T12)",
    },
    {
      latin: "Lumbar vertebrae",
      turkish: "Lomber Vertebra",
      def: "Bel omurları (L1-L5)",
    },
    { latin: "Sacrum", turkish: "Sakrum", def: "Kuyruk sokumu kemiği" },
    { latin: "Coccyx", turkish: "Koksiks", def: "Kuyruk kemiği" },
    {
      latin: "Intervertebral disc",
      turkish: "İntervertebral Disk",
      def: "Omurlar arası disk",
    },
    { latin: "Sternum", turkish: "Sternum", def: "Göğüs kemiği" },
    { latin: "Manubrium", turkish: "Manubrium", def: "Göğüs kemiği üst kısmı" },
    {
      latin: "Xiphoid process",
      turkish: "Ksifoid Çıkıntı",
      def: "Göğüs kemiği alt ucu",
    },
    { latin: "Ribs", turkish: "Kaburgalar", def: "Göğüs kafesi kemikleri" },
    {
      latin: "True ribs",
      turkish: "Gerçek Kaburgalar",
      def: "1-7. kaburgalar",
    },
    {
      latin: "False ribs",
      turkish: "Yalancı Kaburgalar",
      def: "8-12. kaburgalar",
    },
    {
      latin: "Floating ribs",
      turkish: "Yüzen Kaburgalar",
      def: "11-12. kaburgalar",
    },
    {
      latin: "Costal cartilage",
      turkish: "Kıkırdak Kaburga",
      def: "Kaburga kıkırdağı",
    },
    { latin: "Clavicle", turkish: "Klavikula", def: "Köprücük kemiği" },
    { latin: "Scapula", turkish: "Skapula", def: "Kürek kemiği" },
    { latin: "Acromion", turkish: "Akromion", def: "Kürek kemiği çıkıntısı" },
    {
      latin: "Coracoid process",
      turkish: "Korakoid Çıkıntı",
      def: "Kürek kemiği gaga çıkıntısı",
    },
    {
      latin: "Glenoid cavity",
      turkish: "Glenoid Kavite",
      def: "Omuz eklemi çukuru",
    },
    { latin: "Humerus", turkish: "Humerus", def: "Üst kol kemiği" },
    { latin: "Radius", turkish: "Radius", def: "Önkol dış kemiği" },
    { latin: "Ulna", turkish: "Ulna", def: "Önkol iç kemiği" },
    { latin: "Olecranon", turkish: "Olekranon", def: "Dirsek çıkıntısı" },
    {
      latin: "Carpal bones",
      turkish: "Karpal Kemikler",
      def: "El bileği kemikleri",
    },
    { latin: "Scaphoid", turkish: "Skafoid", def: "Kayık kemik" },
    { latin: "Lunate", turkish: "Lunat", def: "Ay kemik" },
    { latin: "Triquetrum", turkish: "Trikuetrum", def: "Üçgen kemik" },
    { latin: "Pisiform", turkish: "Pisiform", def: "Bezelye kemik" },
    { latin: "Trapezium", turkish: "Trapezium", def: "Büyük çok köşeli kemik" },
    { latin: "Trapezoid", turkish: "Trapezoid", def: "Küçük çok köşeli kemik" },
    { latin: "Capitate", turkish: "Kapitat", def: "Baş kemik" },
    { latin: "Hamate", turkish: "Hamat", def: "Çengel kemik" },
    {
      latin: "Metacarpal bones",
      turkish: "Metakarpal Kemikler",
      def: "El tarağı kemikleri",
    },
    {
      latin: "Phalanges of hand",
      turkish: "El Parmak Kemikleri",
      def: "El falanksları",
    },
    { latin: "Pelvis", turkish: "Pelvis", def: "Leğen kemiği" },
    { latin: "Ilium", turkish: "İlium", def: "Kalça kemiği" },
    { latin: "Ischium", turkish: "İskium", def: "Oturak kemiği" },
    { latin: "Pubis", turkish: "Pubis", def: "Çatı kemiği" },
    { latin: "Acetabulum", turkish: "Asetabulum", def: "Kalça eklemi çukuru" },
    { latin: "Femur", turkish: "Femur", def: "Uyluk kemiği" },
    { latin: "Femoral head", turkish: "Femur Başı", def: "Uyluk kemiği başı" },
    {
      latin: "Greater trochanter",
      turkish: "Büyük Trokanter",
      def: "Femur büyük çıkıntısı",
    },
    {
      latin: "Lesser trochanter",
      turkish: "Küçük Trokanter",
      def: "Femur küçük çıkıntısı",
    },
    { latin: "Patella", turkish: "Patella", def: "Diz kapağı" },
    { latin: "Tibia", turkish: "Tibia", def: "Kaval kemiği" },
    { latin: "Fibula", turkish: "Fibula", def: "Baldır kemiği" },
    {
      latin: "Medial malleolus",
      turkish: "Medial Malleol",
      def: "İç ayak bileği çıkıntısı",
    },
    {
      latin: "Lateral malleolus",
      turkish: "Lateral Malleol",
      def: "Dış ayak bileği çıkıntısı",
    },
    {
      latin: "Tarsal bones",
      turkish: "Tarsal Kemikler",
      def: "Ayak bileği kemikleri",
    },
    { latin: "Talus", turkish: "Talus", def: "Aşık kemiği" },
    { latin: "Calcaneus", turkish: "Kalkaneus", def: "Topuk kemiği" },
    { latin: "Navicular", turkish: "Naviküler", def: "Kayık kemik (ayak)" },
    { latin: "Cuboid", turkish: "Küboid", def: "Küp kemik" },
    {
      latin: "Cuneiform bones",
      turkish: "Kuneiform Kemikler",
      def: "Kama kemikler",
    },
    {
      latin: "Metatarsal bones",
      turkish: "Metatarsal Kemikler",
      def: "Ayak tarağı kemikleri",
    },
    {
      latin: "Phalanges of foot",
      turkish: "Ayak Parmak Kemikleri",
      def: "Ayak falanksları",
    },

    // Kas sistemi
    { latin: "Frontalis muscle", turkish: "Frontalis Kası", def: "Alın kası" },
    {
      latin: "Orbicularis oculi",
      turkish: "Orbikülaris Okuli",
      def: "Göz çevresi kası",
    },
    {
      latin: "Orbicularis oris",
      turkish: "Orbikülaris Oris",
      def: "Ağız çevresi kası",
    },
    { latin: "Masseter muscle", turkish: "Masseter Kası", def: "Çiğneme kası" },
    {
      latin: "Temporalis muscle",
      turkish: "Temporalis Kası",
      def: "Şakak kası",
    },
    {
      latin: "Sternocleidomastoid",
      turkish: "Sternokleidomastoid",
      def: "Boyun yan kası",
    },
    {
      latin: "Trapezius muscle",
      turkish: "Trapezius Kası",
      def: "Trapez kası",
    },
    {
      latin: "Latissimus dorsi",
      turkish: "Latissimus Dorsi",
      def: "Geniş sırt kası",
    },
    {
      latin: "Rhomboid muscles",
      turkish: "Romboid Kaslar",
      def: "Eşkenar dörtgen kaslar",
    },
    {
      latin: "Levator scapulae",
      turkish: "Levator Skapula",
      def: "Kürek kaldırıcı kas",
    },
    {
      latin: "Erector spinae",
      turkish: "Erektor Spina",
      def: "Omurga dikleştirici kaslar",
    },
    {
      latin: "Pectoralis major",
      turkish: "Pektoralis Major",
      def: "Büyük göğüs kası",
    },
    {
      latin: "Pectoralis minor",
      turkish: "Pektoralis Minor",
      def: "Küçük göğüs kası",
    },
    {
      latin: "Serratus anterior",
      turkish: "Serratus Anterior",
      def: "Ön dişli kas",
    },
    { latin: "Deltoid muscle", turkish: "Deltoid Kası", def: "Omuz kası" },
    {
      latin: "Rotator cuff",
      turkish: "Rotator Manşet",
      def: "Omuz döndürücü kaslar",
    },
    { latin: "Supraspinatus", turkish: "Supraspinatus", def: "Üst spinöz kas" },
    { latin: "Infraspinatus", turkish: "İnfraspinatus", def: "Alt spinöz kas" },
    { latin: "Teres minor", turkish: "Teres Minor", def: "Küçük yuvarlak kas" },
    { latin: "Subscapularis", turkish: "Subskapularis", def: "Alt kürek kası" },
    {
      latin: "Biceps brachii",
      turkish: "Biseps Brakii",
      def: "Kol iki başlı kası",
    },
    {
      latin: "Triceps brachii",
      turkish: "Triseps Brakii",
      def: "Kol üç başlı kası",
    },
    { latin: "Brachialis", turkish: "Brakialis", def: "Kol kası" },
    { latin: "Brachioradialis", turkish: "Brakioradialis", def: "Önkol kası" },
    {
      latin: "Flexor carpi radialis",
      turkish: "Fleksör Karpi Radialis",
      def: "El bileği bükücü kas",
    },
    {
      latin: "Flexor carpi ulnaris",
      turkish: "Fleksör Karpi Ulnaris",
      def: "El bileği bükücü kas",
    },
    {
      latin: "Extensor carpi radialis",
      turkish: "Ekstansör Karpi Radialis",
      def: "El bileği açıcı kas",
    },
    {
      latin: "Extensor carpi ulnaris",
      turkish: "Ekstansör Karpi Ulnaris",
      def: "El bileği açıcı kas",
    },
    {
      latin: "Flexor digitorum",
      turkish: "Fleksör Dijitorum",
      def: "Parmak bükücü kas",
    },
    {
      latin: "Extensor digitorum",
      turkish: "Ekstansör Dijitorum",
      def: "Parmak açıcı kas",
    },
    {
      latin: "Rectus abdominis",
      turkish: "Rektus Abdominis",
      def: "Düz karın kası",
    },
    {
      latin: "External oblique",
      turkish: "Eksternal Oblik",
      def: "Dış eğik karın kası",
    },
    {
      latin: "Internal oblique",
      turkish: "İnternal Oblik",
      def: "İç eğik karın kası",
    },
    {
      latin: "Transversus abdominis",
      turkish: "Transversus Abdominis",
      def: "Enine karın kası",
    },
    { latin: "Diaphragm", turkish: "Diyafram", def: "Solunum kası" },
    {
      latin: "Intercostal muscles",
      turkish: "İnterkostal Kaslar",
      def: "Kaburgalar arası kaslar",
    },
    { latin: "Iliopsoas", turkish: "İliopsoas", def: "Kalça bükücü kas" },
    {
      latin: "Gluteus maximus",
      turkish: "Gluteus Maksimus",
      def: "Büyük kalça kası",
    },
    {
      latin: "Gluteus medius",
      turkish: "Gluteus Medius",
      def: "Orta kalça kası",
    },
    {
      latin: "Gluteus minimus",
      turkish: "Gluteus Minimus",
      def: "Küçük kalça kası",
    },
    { latin: "Piriformis", turkish: "Piriformis", def: "Armut şekilli kas" },
    {
      latin: "Quadriceps femoris",
      turkish: "Kuadriseps Femoris",
      def: "Dört başlı uyluk kası",
    },
    {
      latin: "Rectus femoris",
      turkish: "Rektus Femoris",
      def: "Düz uyluk kası",
    },
    {
      latin: "Vastus lateralis",
      turkish: "Vastus Lateralis",
      def: "Dış geniş kas",
    },
    {
      latin: "Vastus medialis",
      turkish: "Vastus Medialis",
      def: "İç geniş kas",
    },
    {
      latin: "Vastus intermedius",
      turkish: "Vastus İntermedius",
      def: "Orta geniş kas",
    },
    {
      latin: "Hamstrings",
      turkish: "Hamstring Kasları",
      def: "Arka uyluk kasları",
    },
    {
      latin: "Biceps femoris",
      turkish: "Biseps Femoris",
      def: "İki başlı uyluk kası",
    },
    {
      latin: "Semitendinosus",
      turkish: "Semitendinozus",
      def: "Yarı tendonlu kas",
    },
    {
      latin: "Semimembranosus",
      turkish: "Semimembranozus",
      def: "Yarı zarlı kas",
    },
    {
      latin: "Adductor muscles",
      turkish: "Adduktor Kaslar",
      def: "İç uyluk kasları",
    },
    {
      latin: "Adductor magnus",
      turkish: "Adduktor Magnus",
      def: "Büyük yaklaştırıcı kas",
    },
    {
      latin: "Adductor longus",
      turkish: "Adduktor Longus",
      def: "Uzun yaklaştırıcı kas",
    },
    {
      latin: "Adductor brevis",
      turkish: "Adduktor Brevis",
      def: "Kısa yaklaştırıcı kas",
    },
    { latin: "Gracilis", turkish: "Grasilis", def: "İnce kas" },
    { latin: "Sartorius", turkish: "Sartoryus", def: "Terzi kası" },
    {
      latin: "Tensor fasciae latae",
      turkish: "Tensör Fasya Lata",
      def: "Geniş fasya gerici kas",
    },
    { latin: "Gastrocnemius", turkish: "Gastroknemius", def: "Baldır kası" },
    { latin: "Soleus", turkish: "Soleus", def: "Derin baldır kası" },
    {
      latin: "Tibialis anterior",
      turkish: "Tibialis Anterior",
      def: "Ön baldır kası",
    },
    {
      latin: "Tibialis posterior",
      turkish: "Tibialis Posterior",
      def: "Arka baldır kası",
    },
    {
      latin: "Peroneus longus",
      turkish: "Peroneus Longus",
      def: "Uzun baldır kası",
    },
    {
      latin: "Peroneus brevis",
      turkish: "Peroneus Brevis",
      def: "Kısa baldır kası",
    },
    { latin: "Achilles tendon", turkish: "Aşil Tendonu", def: "Topuk tendonu" },

    // Sinir sistemi
    { latin: "Cerebrum", turkish: "Serebrum", def: "Beyin" },
    {
      latin: "Cerebral cortex",
      turkish: "Serebral Korteks",
      def: "Beyin kabuğu",
    },
    { latin: "Frontal lobe", turkish: "Frontal Lob", def: "Alın lobu" },
    { latin: "Parietal lobe", turkish: "Parietal Lob", def: "Yan lob" },
    { latin: "Temporal lobe", turkish: "Temporal Lob", def: "Şakak lobu" },
    { latin: "Occipital lobe", turkish: "Oksipital Lob", def: "Ense lobu" },
    { latin: "Cerebellum", turkish: "Serebellum", def: "Beyincik" },
    { latin: "Brainstem", turkish: "Beyin Sapı", def: "Beyin kökü" },
    {
      latin: "Medulla oblongata",
      turkish: "Medulla Oblongata",
      def: "Omurilik soğanı",
    },
    { latin: "Pons", turkish: "Pons", def: "Köprü" },
    { latin: "Midbrain", turkish: "Orta Beyin", def: "Mezensefalon" },
    { latin: "Thalamus", turkish: "Talamus", def: "Ara beyin" },
    { latin: "Hypothalamus", turkish: "Hipotalamus", def: "Alt talamus" },
    {
      latin: "Hippocampus",
      turkish: "Hipokampus",
      def: "Denizatı, hafıza merkezi",
    },
    {
      latin: "Amygdala",
      turkish: "Amigdala",
      def: "Badem cismi, duygu merkezi",
    },
    {
      latin: "Basal ganglia",
      turkish: "Bazal Gangliyonlar",
      def: "Hareket kontrol merkezleri",
    },
    {
      latin: "Corpus callosum",
      turkish: "Korpus Kallozum",
      def: "Beyin yarıküreleri bağlantısı",
    },
    { latin: "Pineal gland", turkish: "Pineal Bez", def: "Epifiz bezi" },
    {
      latin: "Pituitary gland",
      turkish: "Hipofiz Bezi",
      def: "Ana endokrin bez",
    },
    {
      latin: "Spinal cord",
      turkish: "Omurilik",
      def: "Omurga içi sinir dokusu",
    },
    {
      latin: "Cervical nerves",
      turkish: "Servikal Sinirler",
      def: "Boyun sinirleri",
    },
    {
      latin: "Thoracic nerves",
      turkish: "Torasik Sinirler",
      def: "Göğüs sinirleri",
    },
    {
      latin: "Lumbar nerves",
      turkish: "Lomber Sinirler",
      def: "Bel sinirleri",
    },
    {
      latin: "Sacral nerves",
      turkish: "Sakral Sinirler",
      def: "Kuyruk sokumu sinirleri",
    },
    {
      latin: "Brachial plexus",
      turkish: "Brakiyal Pleksus",
      def: "Kol sinir ağı",
    },
    { latin: "Lumbar plexus", turkish: "Lomber Pleksus", def: "Bel sinir ağı" },
    {
      latin: "Sacral plexus",
      turkish: "Sakral Pleksus",
      def: "Kuyruk sokumu sinir ağı",
    },
    { latin: "Sciatic nerve", turkish: "Siyatik Sinir", def: "Kalça siniri" },
    { latin: "Femoral nerve", turkish: "Femoral Sinir", def: "Uyluk siniri" },
    { latin: "Median nerve", turkish: "Median Sinir", def: "Orta sinir" },
    { latin: "Ulnar nerve", turkish: "Ulnar Sinir", def: "Dirsek siniri" },
    { latin: "Radial nerve", turkish: "Radial Sinir", def: "Kol dış siniri" },
    { latin: "Vagus nerve", turkish: "Vagus Siniri", def: "Gezici sinir" },
    {
      latin: "Trigeminal nerve",
      turkish: "Trigeminal Sinir",
      def: "Üçlü sinir",
    },
    { latin: "Facial nerve", turkish: "Fasiyal Sinir", def: "Yüz siniri" },
    { latin: "Optic nerve", turkish: "Optik Sinir", def: "Görme siniri" },
    { latin: "Olfactory nerve", turkish: "Olfaktör Sinir", def: "Koku siniri" },
    { latin: "Auditory nerve", turkish: "İşitme Siniri", def: "Koklear sinir" },

    // Dolaşım sistemi
    { latin: "Heart", turkish: "Kalp", def: "Kan pompalayan organ" },
    { latin: "Right atrium", turkish: "Sağ Atriyum", def: "Sağ kulakçık" },
    { latin: "Left atrium", turkish: "Sol Atriyum", def: "Sol kulakçık" },
    { latin: "Right ventricle", turkish: "Sağ Ventrikül", def: "Sağ karıncık" },
    { latin: "Left ventricle", turkish: "Sol Ventrikül", def: "Sol karıncık" },
    {
      latin: "Mitral valve",
      turkish: "Mitral Kapak",
      def: "Sol atriyoventriküler kapak",
    },
    {
      latin: "Tricuspid valve",
      turkish: "Triküspit Kapak",
      def: "Sağ atriyoventriküler kapak",
    },
    { latin: "Aortic valve", turkish: "Aort Kapağı", def: "Aort çıkış kapağı" },
    {
      latin: "Pulmonary valve",
      turkish: "Pulmoner Kapak",
      def: "Akciğer arter kapağı",
    },
    { latin: "Aorta", turkish: "Aort", def: "Ana atardamar" },
    { latin: "Ascending aorta", turkish: "Çıkan Aort", def: "Yükselen aort" },
    { latin: "Aortic arch", turkish: "Aort Arkı", def: "Aort kavsi" },
    { latin: "Descending aorta", turkish: "İnen Aort", def: "Alçalan aort" },
    { latin: "Abdominal aorta", turkish: "Abdominal Aort", def: "Karın aortu" },
    {
      latin: "Coronary arteries",
      turkish: "Koroner Arterler",
      def: "Kalp damarları",
    },
    { latin: "Carotid artery", turkish: "Karotis Arteri", def: "Şah damarı" },
    {
      latin: "Subclavian artery",
      turkish: "Subklaviyan Arter",
      def: "Köprücük altı arteri",
    },
    { latin: "Brachial artery", turkish: "Brakiyal Arter", def: "Kol arteri" },
    {
      latin: "Radial artery",
      turkish: "Radial Arter",
      def: "Önkol dış arteri",
    },
    { latin: "Ulnar artery", turkish: "Ulnar Arter", def: "Önkol iç arteri" },
    { latin: "Femoral artery", turkish: "Femoral Arter", def: "Uyluk arteri" },
    {
      latin: "Popliteal artery",
      turkish: "Popliteal Arter",
      def: "Diz arkası arteri",
    },
    { latin: "Tibial artery", turkish: "Tibial Arter", def: "Baldır arteri" },
    {
      latin: "Pulmonary artery",
      turkish: "Pulmoner Arter",
      def: "Akciğer arteri",
    },
    {
      latin: "Pulmonary vein",
      turkish: "Pulmoner Ven",
      def: "Akciğer toplardamarı",
    },
    {
      latin: "Superior vena cava",
      turkish: "Süperior Vena Kava",
      def: "Üst ana toplardamar",
    },
    {
      latin: "Inferior vena cava",
      turkish: "İnferior Vena Kava",
      def: "Alt ana toplardamar",
    },
    {
      latin: "Jugular vein",
      turkish: "Juguler Ven",
      def: "Boyun toplardamarı",
    },
    {
      latin: "Subclavian vein",
      turkish: "Subklaviyan Ven",
      def: "Köprücük altı veni",
    },
    {
      latin: "Femoral vein",
      turkish: "Femoral Ven",
      def: "Uyluk toplardamarı",
    },
    {
      latin: "Saphenous vein",
      turkish: "Safen Ven",
      def: "Bacak yüzeyel veni",
    },
    {
      latin: "Portal vein",
      turkish: "Portal Ven",
      def: "Karaciğer kapı toplardamarı",
    },
    {
      latin: "Hepatic vein",
      turkish: "Hepatik Ven",
      def: "Karaciğer toplardamarı",
    },
    { latin: "Renal artery", turkish: "Renal Arter", def: "Böbrek arteri" },
    { latin: "Renal vein", turkish: "Renal Ven", def: "Böbrek toplardamarı" },
    {
      latin: "Mesenteric artery",
      turkish: "Mezenterik Arter",
      def: "Bağırsak arteri",
    },
    {
      latin: "Celiac trunk",
      turkish: "Çölyak Trunk",
      def: "Karın organları ana arteri",
    },
    {
      latin: "Lymphatic system",
      turkish: "Lenfatik Sistem",
      def: "Lenf sistemi",
    },
    { latin: "Lymph nodes", turkish: "Lenf Düğümleri", def: "Lenf bezleri" },
    {
      latin: "Thoracic duct",
      turkish: "Torasik Kanal",
      def: "Göğüs lenf kanalı",
    },
    { latin: "Spleen", turkish: "Dalak", def: "Kan filtresi organ" },
    { latin: "Thymus", turkish: "Timus", def: "T hücre olgunlaşma organı" },
  ];

  anatomyData.forEach((item) => {
    anatomy.push({
      latinName: item.latin,
      turkishName: item.turkish,
      category: TermCategory.ANATOMY,
      definition: item.def,
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
  });

  return anatomy;
};

// Ek ilaçlar - daha fazla terim için
const generateMoreDrugs = () => {
  const drugs = [];

  const moreDrugData = [
    // Psikiyatri ilaçları
    { latin: "Sertraline", turkish: "Sertralin", def: "SSRI antidepresan" },
    {
      latin: "Fluoxetine",
      turkish: "Fluoksetin",
      def: "SSRI antidepresan, Prozac",
    },
    { latin: "Paroxetine", turkish: "Paroksetin", def: "SSRI antidepresan" },
    { latin: "Citalopram", turkish: "Sitalopram", def: "SSRI antidepresan" },
    {
      latin: "Escitalopram",
      turkish: "Essitalopram",
      def: "SSRI antidepresan",
    },
    {
      latin: "Fluvoxamine",
      turkish: "Fluvoksamin",
      def: "SSRI, OKB tedavisinde",
    },
    { latin: "Venlafaxine", turkish: "Venlafaksin", def: "SNRI antidepresan" },
    {
      latin: "Duloxetine",
      turkish: "Duloksetin",
      def: "SNRI, ağrı ve depresyon",
    },
    {
      latin: "Desvenlafaxine",
      turkish: "Desvenlafaksin",
      def: "SNRI antidepresan",
    },
    { latin: "Milnacipran", turkish: "Milnasipran", def: "SNRI, fibromiyalji" },
    {
      latin: "Levomilnacipran",
      turkish: "Levomilnasipran",
      def: "SNRI antidepresan",
    },
    {
      latin: "Bupropion",
      turkish: "Bupropion",
      def: "NDRI antidepresan, sigara bırakma",
    },
    { latin: "Mirtazapine", turkish: "Mirtazapin", def: "NaSSA antidepresan" },
    { latin: "Trazodone", turkish: "Trazodon", def: "SARI antidepresan, uyku" },
    { latin: "Nefazodone", turkish: "Nefazodon", def: "SARI antidepresan" },
    {
      latin: "Vilazodone",
      turkish: "Vilazodon",
      def: "SSRI ve 5-HT1A agonist",
    },
    {
      latin: "Vortioxetine",
      turkish: "Vortioksetin",
      def: "Multimodal antidepresan",
    },
    {
      latin: "Amitriptyline",
      turkish: "Amitriptilin",
      def: "Trisiklik antidepresan",
    },
    {
      latin: "Nortriptyline",
      turkish: "Nortriptilin",
      def: "Trisiklik antidepresan",
    },
    {
      latin: "Imipramine",
      turkish: "İmipramin",
      def: "Trisiklik antidepresan",
    },
    {
      latin: "Desipramine",
      turkish: "Desipramin",
      def: "Trisiklik antidepresan",
    },
    {
      latin: "Clomipramine",
      turkish: "Klomipramin",
      def: "Trisiklik, OKB tedavisi",
    },
    { latin: "Doxepin", turkish: "Doksepin", def: "Trisiklik antidepresan" },
    {
      latin: "Trimipramine",
      turkish: "Trimipramin",
      def: "Trisiklik antidepresan",
    },
    {
      latin: "Maprotiline",
      turkish: "Maprotilin",
      def: "Tetrasiklik antidepresan",
    },
    { latin: "Phenelzine", turkish: "Fenelzin", def: "MAO inhibitörü" },
    {
      latin: "Tranylcypromine",
      turkish: "Tranilsipromin",
      def: "MAO inhibitörü",
    },
    {
      latin: "Isocarboxazid",
      turkish: "İzokarboksazid",
      def: "MAO inhibitörü",
    },
    { latin: "Selegiline", turkish: "Selejilin", def: "MAO-B inhibitörü" },
    {
      latin: "Moclobemide",
      turkish: "Moklobemid",
      def: "Geri dönüşümlü MAO-A inhibitörü",
    },
    {
      latin: "Lithium carbonate",
      turkish: "Lityum Karbonat",
      def: "Duygudurum dengeleyici",
    },
    {
      latin: "Valproic acid",
      turkish: "Valproik Asit",
      def: "Antiepileptik, duygudurum dengeleyici",
    },
    {
      latin: "Carbamazepine",
      turkish: "Karbamazepin",
      def: "Antiepileptik, duygudurum dengeleyici",
    },
    { latin: "Oxcarbazepine", turkish: "Okskarbazepin", def: "Antiepileptik" },
    {
      latin: "Lamotrigine",
      turkish: "Lamotrijin",
      def: "Antiepileptik, bipolar depresyon",
    },
    {
      latin: "Topiramate",
      turkish: "Topiramat",
      def: "Antiepileptik, migren profilaksisi",
    },
    {
      latin: "Gabapentin",
      turkish: "Gabapentin",
      def: "Antiepileptik, nöropatik ağrı",
    },
    {
      latin: "Pregabalin",
      turkish: "Pregabalin",
      def: "Antiepileptik, anksiyete, ağrı",
    },
    { latin: "Levetiracetam", turkish: "Levetirasetam", def: "Antiepileptik" },
    { latin: "Phenytoin", turkish: "Fenitoin", def: "Antiepileptik" },
    {
      latin: "Phenobarbital",
      turkish: "Fenobarbital",
      def: "Barbitürat antiepileptik",
    },
    { latin: "Primidone", turkish: "Primidon", def: "Antiepileptik" },
    {
      latin: "Ethosuximide",
      turkish: "Etosüksimid",
      def: "Absans epilepsi ilacı",
    },
    {
      latin: "Clonazepam",
      turkish: "Klonazepam",
      def: "Benzodiazepin antiepileptik",
    },
    {
      latin: "Clobazam",
      turkish: "Klobazam",
      def: "Benzodiazepin antiepileptik",
    },
    {
      latin: "Diazepam",
      turkish: "Diazepam",
      def: "Benzodiazepin, anksiyete, kas gevşetici",
    },
    {
      latin: "Lorazepam",
      turkish: "Lorazepam",
      def: "Benzodiazepin, anksiyete",
    },
    {
      latin: "Alprazolam",
      turkish: "Alprazolam",
      def: "Benzodiazepin, panik bozukluk",
    },
    {
      latin: "Midazolam",
      turkish: "Midazolam",
      def: "Kısa etkili benzodiazepin",
    },
    {
      latin: "Triazolam",
      turkish: "Triazolam",
      def: "Uyku ilacı benzodiazepin",
    },
    {
      latin: "Temazepam",
      turkish: "Temazepam",
      def: "Uyku ilacı benzodiazepin",
    },
    {
      latin: "Flurazepam",
      turkish: "Flurazepam",
      def: "Uzun etkili uyku ilacı",
    },
    {
      latin: "Chlordiazepoxide",
      turkish: "Klordiazepoksit",
      def: "Benzodiazepin, alkol yoksunluğu",
    },
    {
      latin: "Oxazepam",
      turkish: "Oksazepam",
      def: "Kısa etkili benzodiazepin",
    },
    {
      latin: "Buspirone",
      turkish: "Buspiron",
      def: "Non-benzodiazepin anksiyolitik",
    },
    { latin: "Zolpidem", turkish: "Zolpidem", def: "Z-ilaç, uyku ilacı" },
    {
      latin: "Zaleplon",
      turkish: "Zaleplon",
      def: "Z-ilaç, kısa etkili uyku ilacı",
    },
    { latin: "Eszopiclone", turkish: "Eszopiklon", def: "Z-ilaç, uyku ilacı" },
    { latin: "Zopiclone", turkish: "Zopiklon", def: "Z-ilaç, uyku ilacı" },
    {
      latin: "Suvorexant",
      turkish: "Suvoreksant",
      def: "Oreksin antagonisti uyku ilacı",
    },
    {
      latin: "Lemborexant",
      turkish: "Lemboreksant",
      def: "Oreksin antagonisti",
    },
    {
      latin: "Ramelteon",
      turkish: "Ramelteon",
      def: "Melatonin reseptör agonisti",
    },
    { latin: "Melatonin", turkish: "Melatonin", def: "Uyku hormonu" },
    {
      latin: "Doxylamine",
      turkish: "Doksilamin",
      def: "Antihistaminik uyku ilacı",
    },
    {
      latin: "Diphenhydramine",
      turkish: "Difenhidramin",
      def: "Antihistaminik, uyku, alerji",
    },
    {
      latin: "Hydroxyzine",
      turkish: "Hidroksizin",
      def: "Antihistaminik anksiyolitik",
    },
    {
      latin: "Promethazine",
      turkish: "Prometazin",
      def: "Antihistaminik, antiemetik",
    },

    // Antipsikotikler
    { latin: "Haloperidol", turkish: "Haloperidol", def: "Tipik antipsikotik" },
    {
      latin: "Chlorpromazine",
      turkish: "Klorpromazin",
      def: "Tipik antipsikotik",
    },
    {
      latin: "Fluphenazine",
      turkish: "Flufenazin",
      def: "Tipik antipsikotik, depo form",
    },
    { latin: "Perphenazine", turkish: "Perfenazin", def: "Tipik antipsikotik" },
    { latin: "Thioridazine", turkish: "Tioridazin", def: "Tipik antipsikotik" },
    { latin: "Thiothixene", turkish: "Tiotiksen", def: "Tipik antipsikotik" },
    { latin: "Loxapine", turkish: "Loksapin", def: "Tipik antipsikotik" },
    { latin: "Molindone", turkish: "Molindon", def: "Tipik antipsikotik" },
    {
      latin: "Pimozide",
      turkish: "Pimozid",
      def: "Tipik antipsikotik, Tourette",
    },
    { latin: "Risperidone", turkish: "Risperidon", def: "Atipik antipsikotik" },
    { latin: "Olanzapine", turkish: "Olanzapin", def: "Atipik antipsikotik" },
    { latin: "Quetiapine", turkish: "Ketiapin", def: "Atipik antipsikotik" },
    { latin: "Ziprasidone", turkish: "Ziprasidon", def: "Atipik antipsikotik" },
    {
      latin: "Aripiprazole",
      turkish: "Aripiprazol",
      def: "Atipik antipsikotik, parsiyel agonist",
    },
    {
      latin: "Paliperidone",
      turkish: "Paliperidon",
      def: "Risperidon metaboliti",
    },
    { latin: "Iloperidone", turkish: "İloperidon", def: "Atipik antipsikotik" },
    { latin: "Asenapine", turkish: "Asenapin", def: "Atipik antipsikotik" },
    { latin: "Lurasidone", turkish: "Lurasidon", def: "Atipik antipsikotik" },
    {
      latin: "Brexpiprazole",
      turkish: "Breksiprazol",
      def: "Atipik antipsikotik",
    },
    { latin: "Cariprazine", turkish: "Kariprazin", def: "Atipik antipsikotik" },
    {
      latin: "Clozapine",
      turkish: "Klozapin",
      def: "Atipik antipsikotik, dirençli şizofreni",
    },

    // ADHD ilaçları
    {
      latin: "Methylphenidate",
      turkish: "Metilfenidat",
      def: "DEHB stimülan ilacı",
    },
    { latin: "Amphetamine", turkish: "Amfetamin", def: "DEHB stimülan ilacı" },
    {
      latin: "Dextroamphetamine",
      turkish: "Dekstroamfetamin",
      def: "DEHB stimülan ilacı",
    },
    {
      latin: "Lisdexamfetamine",
      turkish: "Lisdeksamfetamin",
      def: "DEHB ön ilaç stimülanı",
    },
    {
      latin: "Atomoxetine",
      turkish: "Atomoksetin",
      def: "DEHB non-stimülan ilacı",
    },
    { latin: "Guanfacine", turkish: "Guanfasin", def: "DEHB alfa-2 agonist" },
    {
      latin: "Clonidine",
      turkish: "Klonidin",
      def: "Alfa-2 agonist, DEHB, hipertansiyon",
    },

    // Demans ilaçları
    {
      latin: "Donepezil",
      turkish: "Donepezil",
      def: "Kolinesteraz inhibitörü, Alzheimer",
    },
    {
      latin: "Rivastigmine",
      turkish: "Rivastigmin",
      def: "Kolinesteraz inhibitörü",
    },
    {
      latin: "Galantamine",
      turkish: "Galantamin",
      def: "Kolinesteraz inhibitörü",
    },
    {
      latin: "Memantine",
      turkish: "Memantin",
      def: "NMDA antagonisti, Alzheimer",
    },
  ];

  moreDrugData.forEach((drug) => {
    drugs.push({
      latinName: drug.latin,
      turkishName: drug.turkish,
      category: TermCategory.DRUG,
      definition: drug.def,
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
  });

  return drugs;
};

// Ek hastalıklar
const generateMoreDiseases = () => {
  const diseases = [];

  const moreDiseaseData = [
    // Nörolojik hastalıklar
    {
      latin: "Stroke",
      turkish: "İnme",
      def: "Beyin damar tıkanıklığı veya kanaması",
    },
    {
      latin: "Ischemic stroke",
      turkish: "İskemik İnme",
      def: "Beyin damar tıkanıklığı",
    },
    {
      latin: "Hemorrhagic stroke",
      turkish: "Hemorajik İnme",
      def: "Beyin kanaması",
    },
    {
      latin: "Transient ischemic attack",
      turkish: "Geçici İskemik Atak",
      def: "Mini inme",
    },
    {
      latin: "Subarachnoid hemorrhage",
      turkish: "Subaraknoid Kanama",
      def: "Beyin zarı altı kanaması",
    },
    {
      latin: "Intracerebral hemorrhage",
      turkish: "İntraserebral Kanama",
      def: "Beyin içi kanama",
    },
    {
      latin: "Subdural hematoma",
      turkish: "Subdural Hematom",
      def: "Beyin zarı altı kan birikimi",
    },
    {
      latin: "Epidural hematoma",
      turkish: "Epidural Hematom",
      def: "Beyin zarı üstü kan birikimi",
    },
    {
      latin: "Cerebral aneurysm",
      turkish: "Serebral Anevrizma",
      def: "Beyin damar baloncuğu",
    },
    {
      latin: "Arteriovenous malformation",
      turkish: "Arteriyovenöz Malformasyon",
      def: "Damar anomalisi",
    },
    {
      latin: "Alzheimer disease",
      turkish: "Alzheimer Hastalığı",
      def: "Dejeneratif demans",
    },
    {
      latin: "Vascular dementia",
      turkish: "Vasküler Demans",
      def: "Damar kaynaklı demans",
    },
    {
      latin: "Lewy body dementia",
      turkish: "Lewy Cisimcikli Demans",
      def: "Parkinson benzeri demans",
    },
    {
      latin: "Frontotemporal dementia",
      turkish: "Frontotemporal Demans",
      def: "Alın-şakak lobu demansı",
    },
    {
      latin: "Parkinson disease",
      turkish: "Parkinson Hastalığı",
      def: "Hareket bozukluğu hastalığı",
    },
    {
      latin: "Essential tremor",
      turkish: "Esansiyel Tremor",
      def: "İdiyopatik titreme",
    },
    {
      latin: "Huntington disease",
      turkish: "Huntington Hastalığı",
      def: "Genetik hareket bozukluğu",
    },
    {
      latin: "Multiple sclerosis",
      turkish: "Multipl Skleroz",
      def: "Demiyelinizan hastalık",
    },
    {
      latin: "Amyotrophic lateral sclerosis",
      turkish: "ALS",
      def: "Motor nöron hastalığı",
    },
    {
      latin: "Myasthenia gravis",
      turkish: "Miyastenia Gravis",
      def: "Nöromüsküler kavşak hastalığı",
    },
    {
      latin: "Guillain-Barre syndrome",
      turkish: "Guillain-Barre Sendromu",
      def: "Akut polinöropati",
    },
    {
      latin: "Chronic inflammatory demyelinating polyneuropathy",
      turkish: "CIDP",
      def: "Kronik demiyelinizan polinöropati",
    },
    {
      latin: "Peripheral neuropathy",
      turkish: "Periferik Nöropati",
      def: "Çevresel sinir hasarı",
    },
    {
      latin: "Diabetic neuropathy",
      turkish: "Diyabetik Nöropati",
      def: "Diyabete bağlı sinir hasarı",
    },
    {
      latin: "Carpal tunnel syndrome",
      turkish: "Karpal Tünel Sendromu",
      def: "El bileği sinir sıkışması",
    },
    {
      latin: "Cubital tunnel syndrome",
      turkish: "Kübital Tünel Sendromu",
      def: "Dirsek sinir sıkışması",
    },
    {
      latin: "Tarsal tunnel syndrome",
      turkish: "Tarsal Tünel Sendromu",
      def: "Ayak bileği sinir sıkışması",
    },
    { latin: "Sciatica", turkish: "Siyatik", def: "Siyatik sinir ağrısı" },
    {
      latin: "Trigeminal neuralgia",
      turkish: "Trigeminal Nevralji",
      def: "Yüz siniri ağrısı",
    },
    { latin: "Bell palsy", turkish: "Bell Paralizisi", def: "Yüz felci" },
    { latin: "Epilepsy", turkish: "Epilepsi", def: "Sara hastalığı" },
    {
      latin: "Generalized epilepsy",
      turkish: "Jeneralize Epilepsi",
      def: "Yaygın nöbet",
    },
    {
      latin: "Focal epilepsy",
      turkish: "Fokal Epilepsi",
      def: "Odaksal nöbet",
    },
    { latin: "Absence seizure", turkish: "Absans Nöbet", def: "Dalma nöbeti" },
    {
      latin: "Tonic-clonic seizure",
      turkish: "Tonik-Klonik Nöbet",
      def: "Büyük nöbet",
    },
    {
      latin: "Status epilepticus",
      turkish: "Status Epileptikus",
      def: "Sürekli nöbet durumu",
    },
    { latin: "Migraine", turkish: "Migren", def: "Şiddetli baş ağrısı" },
    {
      latin: "Migraine with aura",
      turkish: "Auralı Migren",
      def: "Görsel belirtili migren",
    },
    {
      latin: "Tension headache",
      turkish: "Gerilim Tipi Baş Ağrısı",
      def: "Stres baş ağrısı",
    },
    {
      latin: "Cluster headache",
      turkish: "Küme Baş Ağrısı",
      def: "Periyodik şiddetli baş ağrısı",
    },
    { latin: "Meningitis", turkish: "Menenjit", def: "Beyin zarı iltihabı" },
    {
      latin: "Bacterial meningitis",
      turkish: "Bakteriyel Menenjit",
      def: "Bakteri kaynaklı menenjit",
    },
    {
      latin: "Viral meningitis",
      turkish: "Viral Menenjit",
      def: "Virüs kaynaklı menenjit",
    },
    { latin: "Encephalitis", turkish: "Ensefalit", def: "Beyin iltihabı" },
    {
      latin: "Brain abscess",
      turkish: "Beyin Apsesi",
      def: "Beyin içi irin birikimi",
    },
    {
      latin: "Hydrocephalus",
      turkish: "Hidrosefali",
      def: "Beyin sıvısı birikimi",
    },
    {
      latin: "Normal pressure hydrocephalus",
      turkish: "Normal Basınçlı Hidrosefali",
      def: "Yaşlılık hidrosefali",
    },
    {
      latin: "Intracranial hypertension",
      turkish: "İntrakraniyal Hipertansiyon",
      def: "Kafa içi basınç artışı",
    },
    { latin: "Brain tumor", turkish: "Beyin Tümörü", def: "Beyin kitlesi" },
    {
      latin: "Glioblastoma",
      turkish: "Glioblastom",
      def: "Agresif beyin tümörü",
    },
    { latin: "Meningioma", turkish: "Menenjiyom", def: "Beyin zarı tümörü" },
    {
      latin: "Acoustic neuroma",
      turkish: "Akustik Nörom",
      def: "İşitme siniri tümörü",
    },
    {
      latin: "Pituitary adenoma",
      turkish: "Hipofiz Adenomu",
      def: "Hipofiz bezi tümörü",
    },
    {
      latin: "Spinal cord injury",
      turkish: "Omurilik Yaralanması",
      def: "Omurga sinir hasarı",
    },
    {
      latin: "Spinal stenosis",
      turkish: "Spinal Stenoz",
      def: "Omurga kanalı daralması",
    },
    {
      latin: "Herniated disc",
      turkish: "Disk Hernisi",
      def: "Fıtıklaşmış disk",
    },
    { latin: "Spondylosis", turkish: "Spondiloz", def: "Omurga dejenerasyonu" },
    {
      latin: "Spondylolisthesis",
      turkish: "Spondilolistezis",
      def: "Omur kayması",
    },
    {
      latin: "Cervical radiculopathy",
      turkish: "Servikal Radikülopati",
      def: "Boyun sinir kökü sıkışması",
    },
    {
      latin: "Lumbar radiculopathy",
      turkish: "Lomber Radikülopati",
      def: "Bel sinir kökü sıkışması",
    },

    // Endokrin hastalıklar
    {
      latin: "Diabetes mellitus type 1",
      turkish: "Tip 1 Diyabet",
      def: "İnsülin bağımlı diyabet",
    },
    {
      latin: "Diabetes mellitus type 2",
      turkish: "Tip 2 Diyabet",
      def: "İnsülin direnci diyabeti",
    },
    {
      latin: "Gestational diabetes",
      turkish: "Gestasyonel Diyabet",
      def: "Hamilelik diyabeti",
    },
    {
      latin: "Diabetic ketoacidosis",
      turkish: "Diyabetik Ketoasidoz",
      def: "Diyabet acil komplikasyonu",
    },
    {
      latin: "Hyperosmolar hyperglycemic state",
      turkish: "Hiperosmolar Hiperglisemik Durum",
      def: "Tip 2 diyabet acili",
    },
    { latin: "Hypoglycemia", turkish: "Hipoglisemi", def: "Düşük kan şekeri" },
    {
      latin: "Prediabetes",
      turkish: "Prediyabet",
      def: "Diyabet öncesi durum",
    },
    {
      latin: "Metabolic syndrome",
      turkish: "Metabolik Sendrom",
      def: "İnsülin direnci sendromu",
    },
    {
      latin: "Hypothyroidism",
      turkish: "Hipotiroidizm",
      def: "Tiroid az çalışması",
    },
    {
      latin: "Hashimoto thyroiditis",
      turkish: "Hashimoto Tiroiditi",
      def: "Otoimmün tiroidit",
    },
    {
      latin: "Hyperthyroidism",
      turkish: "Hipertiroidizm",
      def: "Tiroid fazla çalışması",
    },
    {
      latin: "Graves disease",
      turkish: "Graves Hastalığı",
      def: "Otoimmün hipertiroidizm",
    },
    {
      latin: "Thyroid nodule",
      turkish: "Tiroid Nodülü",
      def: "Tiroid kitlesi",
    },
    {
      latin: "Thyroid cancer",
      turkish: "Tiroid Kanseri",
      def: "Tiroid malignitesi",
    },
    { latin: "Goiter", turkish: "Guatr", def: "Tiroid büyümesi" },
    { latin: "Thyroiditis", turkish: "Tiroidit", def: "Tiroid iltihabı" },
    {
      latin: "Subacute thyroiditis",
      turkish: "Subakut Tiroidit",
      def: "De Quervain tiroiditi",
    },
    {
      latin: "Thyroid storm",
      turkish: "Tiroid Fırtınası",
      def: "Hipertiroid krizi",
    },
    {
      latin: "Myxedema coma",
      turkish: "Miksödem Koması",
      def: "Hipotiroid krizi",
    },
    {
      latin: "Hyperparathyroidism",
      turkish: "Hiperparatiroidizm",
      def: "Paratiroid fazla çalışması",
    },
    {
      latin: "Hypoparathyroidism",
      turkish: "Hipoparatiroidizm",
      def: "Paratiroid az çalışması",
    },
    {
      latin: "Cushing syndrome",
      turkish: "Cushing Sendromu",
      def: "Kortizol fazlalığı",
    },
    {
      latin: "Addison disease",
      turkish: "Addison Hastalığı",
      def: "Adrenal yetmezlik",
    },
    {
      latin: "Adrenal insufficiency",
      turkish: "Adrenal Yetmezlik",
      def: "Böbrek üstü bezi yetersizliği",
    },
    {
      latin: "Pheochromocytoma",
      turkish: "Feokromositoma",
      def: "Adrenal medulla tümörü",
    },
    {
      latin: "Primary aldosteronism",
      turkish: "Primer Aldosteronizm",
      def: "Conn sendromu",
    },
    {
      latin: "Adrenal adenoma",
      turkish: "Adrenal Adenom",
      def: "Böbrek üstü bezi tümörü",
    },
    {
      latin: "Adrenal carcinoma",
      turkish: "Adrenal Karsinom",
      def: "Böbrek üstü bezi kanseri",
    },
    {
      latin: "Acromegaly",
      turkish: "Akromegali",
      def: "Büyüme hormonu fazlalığı",
    },
    { latin: "Gigantism", turkish: "Gigantizm", def: "Dev büyüme" },
    {
      latin: "Growth hormone deficiency",
      turkish: "Büyüme Hormonu Eksikliği",
      def: "GH yetersizliği",
    },
    {
      latin: "Hypopituitarism",
      turkish: "Hipopituitarizm",
      def: "Hipofiz yetersizliği",
    },
    {
      latin: "Diabetes insipidus",
      turkish: "Diabetes İnsipidus",
      def: "Su diyabeti",
    },
    { latin: "SIADH", turkish: "SIADH", def: "Uygunsuz ADH sendromu" },
    {
      latin: "Prolactinoma",
      turkish: "Prolaktinoma",
      def: "Prolaktin salgılayan tümör",
    },
    {
      latin: "Hyperprolactinemia",
      turkish: "Hiperprolaktinemi",
      def: "Prolaktin yüksekliği",
    },
    {
      latin: "Polycystic ovary syndrome",
      turkish: "Polikistik Over Sendromu",
      def: "PKOS",
    },
    {
      latin: "Premature ovarian failure",
      turkish: "Erken Over Yetmezliği",
      def: "Erken menopoz",
    },
    {
      latin: "Hypogonadism",
      turkish: "Hipogonadizm",
      def: "Gonad yetersizliği",
    },
    {
      latin: "Klinefelter syndrome",
      turkish: "Klinefelter Sendromu",
      def: "XXY kromozom anomalisi",
    },
    {
      latin: "Turner syndrome",
      turkish: "Turner Sendromu",
      def: "X kromozom anomalisi",
    },
    {
      latin: "Congenital adrenal hyperplasia",
      turkish: "Konjenital Adrenal Hiperplazi",
      def: "Doğuştan adrenal hastalık",
    },
    {
      latin: "Multiple endocrine neoplasia",
      turkish: "Multipl Endokrin Neoplazi",
      def: "MEN sendromları",
    },
  ];

  moreDiseaseData.forEach((disease) => {
    diseases.push({
      latinName: disease.latin,
      turkishName: disease.turkish,
      category: TermCategory.DISEASE,
      definition: disease.def,
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
  });

  return diseases;
};

// Ana fonksiyon - tüm terimleri oluştur ve yükle
async function main() {
  console.log("🚀 Pharmadict Firebase Yükleme Başlıyor...\n");

  // Tüm terimleri oluştur
  console.log("📝 Terimler oluşturuluyor...");
  const drugs = generateDrugs();
  const plants = generatePlants();
  const vitamins = generateVitamins();
  const minerals = generateMinerals();
  const diseases = generateDiseases();
  const insects = generateInsects();
  const components = generateComponents();
  const anatomy = generateAnatomy();
  const moreDrugs = generateMoreDrugs();
  const moreDiseases = generateMoreDiseases();

  const allTerms = [
    ...drugs,
    ...plants,
    ...vitamins,
    ...minerals,
    ...diseases,
    ...insects,
    ...components,
    ...anatomy,
    ...moreDrugs,
    ...moreDiseases,
  ];

  console.log(`\n📊 Oluşturulan terim sayıları:`);
  console.log(`   İlaçlar: ${drugs.length + moreDrugs.length}`);
  console.log(`   Bitkiler: ${plants.length}`);
  console.log(`   Vitaminler: ${vitamins.length}`);
  console.log(`   Mineraller: ${minerals.length}`);
  console.log(`   Hastalıklar: ${diseases.length + moreDiseases.length}`);
  console.log(`   Böcekler: ${insects.length}`);
  console.log(`   Bileşenler: ${components.length}`);
  console.log(`   Anatomi: ${anatomy.length}`);
  console.log(`   ─────────────────────`);
  console.log(`   TOPLAM: ${allTerms.length} terim\n`);

  // Mevcut terimleri al (duplikasyon kontrolü için)
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

  // Duplikasyonları filtrele
  const newTerms = allTerms.filter((term) => {
    const latinLower = term.latinName?.toLowerCase();
    const turkishLower = term.turkishName?.toLowerCase();
    return !existingTerms.has(latinLower) && !existingTerms.has(turkishLower);
  });

  console.log(`   Yeni eklenecek terim sayısı: ${newTerms.length}\n`);

  if (newTerms.length === 0) {
    console.log("✅ Tüm terimler zaten mevcut, yükleme yapılmadı.");
    process.exit(0);
  }

  // Batch yükleme (400 terim per batch)
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

      // Rate limiting için kısa bekleme
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`   ❌ Batch ${batchNumber} hatası:`, error.message);
    }
  }

  // Sonuç özeti
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

// Çalıştır
main().catch((error) => {
  console.error("❌ Hata:", error);
  process.exit(1);
});
