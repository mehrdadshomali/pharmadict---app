// Final 274 - Son terimler
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

// Programatik üretim - Vücut bölgesi + Ağrı kombinasyonları
const generatePainLocations = () => {
  const locations = [
    ["Cervical", "Servikal", "Boyun"],
    ["Thoracic", "Torasik", "Göğüs"],
    ["Lumbar", "Lomber", "Bel"],
    ["Sacral", "Sakral", "Kuyruk"],
    ["Occipital", "Oksipital", "Ense"],
    ["Temporal", "Temporal", "Şakak"],
    ["Frontal", "Frontal", "Alın"],
    ["Parietal", "Parietal", "Tepe"],
    ["Orbital", "Orbital", "Göz çevresi"],
    ["Maxillary", "Maksiller", "Üst çene"],
    ["Mandibular", "Mandibular", "Alt çene"],
    ["Dental", "Dental", "Diş"],
    ["Auricular", "Auriküler", "Kulak"],
    ["Pharyngeal", "Faringeal", "Boğaz"],
    ["Precordial", "Prekordial", "Kalp önü"],
  ];

  const painTypes = [
    ["pain", "ağrısı", "Ağrı"],
    ["neuralgia", "nevraljisi", "Sinir ağrısı"],
    ["myalgia", "miyaljisi", "Kas ağrısı"],
    ["arthralgia", "artraljisi", "Eklem ağrısı"],
  ];

  const terms = [];
  locations.forEach(([locEn, locTr, locDef]) => {
    painTypes.forEach(([painEn, painTr, painDef]) => {
      terms.push(
        createTerm(
          `${locEn} ${painEn}`,
          `${locTr} ${painTr}`,
          TermCategory.DISEASE,
          `${locDef} ${painDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Tıbbi terimler - Cerrahi komplikasyonlar
const generateSurgicalComplications = () => {
  const complications = [
    ["Wound infection", "Yara Enfeksiyonu", "Cerrahi yara enfeksiyonu"],
    ["Wound dehiscence", "Yara Ayrılması", "Dikiş açılması"],
    ["Seroma formation", "Seroma Oluşumu", "Sıvı birikimi"],
    ["Hematoma formation", "Hematom Oluşumu", "Kan birikimi"],
    [
      "Surgical site infection",
      "Cerrahi Alan Enfeksiyonu",
      "Ameliyat yeri enfeksiyonu",
    ],
    ["Anastomotic leak", "Anastomoz Kaçağı", "Bağlantı kaçağı"],
    ["Bile leak", "Safra Kaçağı", "Safra sızıntısı"],
    ["Pancreatic fistula", "Pankreas Fistülü", "Pankreas sızıntısı"],
    ["Chyle leak", "Şilöz Kaçak", "Lenf sızıntısı"],
    ["Urine leak", "İdrar Kaçağı", "İdrar sızıntısı"],
    ["Bowel obstruction", "Bağırsak Tıkanıklığı", "Ameliyat sonrası ileus"],
    ["Adhesion formation", "Yapışıklık Oluşumu", "Bağırsak yapışıklığı"],
    ["Incisional hernia", "İnsizyonel Herni", "Kesi fıtığı"],
    ["Evisceration", "Eviserasyon", "Organ dışarı çıkması"],
    ["Nerve injury", "Sinir Hasarı", "Cerrahi sinir yaralanması"],
    ["Vascular injury", "Damar Hasarı", "Cerrahi damar yaralanması"],
    ["Organ injury", "Organ Hasarı", "Cerrahi organ yaralanması"],
    [
      "Hemorrhage postoperative",
      "Postoperatif Kanama",
      "Ameliyat sonrası kanama",
    ],
    ["Deep vein thrombosis", "Derin Ven Trombozu", "Bacak pıhtısı"],
    ["Pulmonary embolism", "Pulmoner Emboli", "Akciğer pıhtısı"],
  ];
  return complications.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Anestezi komplikasyonları
const generateAnesthesiaComplications = () => {
  const complications = [
    ["Malignant hyperthermia", "Malign Hipertermi", "Anestezi reaksiyonu"],
    ["Anaphylaxis", "Anafilaksi", "Şiddetli alerji"],
    [
      "Aspiration pneumonia",
      "Aspirasyon Pnömonisi",
      "Mide içeriği aspirasyonu",
    ],
    ["Laryngospasm", "Laringospazm", "Gırtlak spazmı"],
    ["Bronchospasm", "Bronkospazm", "Bronş spazmı"],
    ["Difficult intubation", "Zor Entübasyon", "Entübasyon güçlüğü"],
    ["Failed intubation", "Başarısız Entübasyon", "Entübasyon başarısızlığı"],
    ["Esophageal intubation", "Özofagus Entübasyonu", "Yanlış entübasyon"],
    ["Dental injury", "Diş Hasarı", "Entübasyon diş kırığı"],
    ["Corneal abrasion", "Kornea Abrazyonu", "Göz çizilmesi"],
    [
      "Peripheral nerve injury",
      "Periferik Sinir Hasarı",
      "Pozisyon sinir hasarı",
    ],
    [
      "Awareness under anesthesia",
      "Anestezi Altında Farkındalık",
      "İntraoperatif uyanıklık",
    ],
    [
      "Postoperative nausea",
      "Postoperatif Bulantı",
      "Ameliyat sonrası bulantı",
    ],
    ["Postoperative vomiting", "Postoperatif Kusma", "Ameliyat sonrası kusma"],
    [
      "Postoperative shivering",
      "Postoperatif Titreme",
      "Ameliyat sonrası titreme",
    ],
    [
      "Postoperative delirium",
      "Postoperatif Deliryum",
      "Ameliyat sonrası konfüzyon",
    ],
    [
      "Residual neuromuscular blockade",
      "Rezidüel Nöromüsküler Blokaj",
      "Kas gevşetici etkisi",
    ],
    [
      "Postdural puncture headache",
      "Postdural Ponksiyon Baş Ağrısı",
      "Spinal baş ağrısı",
    ],
    ["Epidural hematoma", "Epidural Hematom", "Epidural kanama"],
    ["Total spinal anesthesia", "Total Spinal Anestezi", "Yaygın spinal blok"],
  ];
  return complications.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Acil durumlar
const generateEmergencyConditions = () => {
  const conditions = [
    ["Cardiac arrest", "Kardiyak Arrest", "Kalp durması"],
    ["Respiratory arrest", "Solunum Arresti", "Solunum durması"],
    [
      "Cardiopulmonary arrest",
      "Kardiyopulmoner Arrest",
      "Kalp-solunum durması",
    ],
    ["Anaphylactic shock", "Anafilaktik Şok", "Alerji şoku"],
    ["Cardiogenic shock", "Kardiyojenik Şok", "Kalp kaynaklı şok"],
    ["Hypovolemic shock", "Hipovolemik Şok", "Kan kaybı şoku"],
    ["Septic shock", "Septik Şok", "Enfeksiyon şoku"],
    ["Neurogenic shock", "Nörojenik Şok", "Sinir kaynaklı şok"],
    ["Obstructive shock", "Obstrüktif Şok", "Tıkanıklık şoku"],
    ["Distributive shock", "Distribütif Şok", "Dağılım şoku"],
    ["Acute myocardial infarction", "Akut Miyokard Enfarktüsü", "Kalp krizi"],
    ["Acute stroke", "Akut İnme", "Beyin damar tıkanması"],
    ["Status epilepticus", "Status Epileptikus", "Sürekli nöbet"],
    [
      "Acute respiratory failure",
      "Akut Solunum Yetmezliği",
      "Ani solunum yetersizliği",
    ],
    [
      "Acute renal failure",
      "Akut Böbrek Yetmezliği",
      "Ani böbrek yetersizliği",
    ],
    [
      "Acute liver failure",
      "Akut Karaciğer Yetmezliği",
      "Ani karaciğer yetersizliği",
    ],
    ["Diabetic ketoacidosis", "Diyabetik Ketoasidoz", "Şeker koması"],
    ["Hypoglycemic coma", "Hipoglisemik Koma", "Şeker düşüklüğü koması"],
    ["Hypertensive emergency", "Hipertansif Acil", "Tansiyon krizi"],
    ["Acute abdomen", "Akut Batın", "Acil karın"],
  ];
  return conditions.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Travma
const generateTraumaConditions = () => {
  const conditions = [
    ["Blunt trauma", "Künt Travma", "Ezici yaralanma"],
    ["Penetrating trauma", "Penetran Travma", "Delici yaralanma"],
    ["Polytrauma", "Politravma", "Çoklu yaralanma"],
    ["Head injury", "Kafa Travması", "Kafa yaralanması"],
    ["Traumatic brain injury", "Travmatik Beyin Hasarı", "Beyin yaralanması"],
    ["Concussion", "Beyin Sarsıntısı", "Hafif beyin travması"],
    ["Contusion cerebral", "Serebral Kontüzyon", "Beyin çürüğü"],
    ["Diffuse axonal injury", "Diffüz Aksonal Hasar", "Yaygın sinir hasarı"],
    ["Skull fracture", "Kafatası Kırığı", "Kafa kemiği kırığı"],
    ["Facial fracture", "Yüz Kırığı", "Yüz kemiği kırığı"],
    [
      "Cervical spine injury",
      "Servikal Omurga Yaralanması",
      "Boyun yaralanması",
    ],
    ["Thoracic spine injury", "Torasik Omurga Yaralanması", "Sırt yaralanması"],
    ["Lumbar spine injury", "Lomber Omurga Yaralanması", "Bel yaralanması"],
    ["Rib fracture", "Kaburga Kırığı", "Kosta kırığı"],
    ["Flail chest", "Yelken Göğüs", "Çoklu kaburga kırığı"],
    [
      "Pneumothorax traumatic",
      "Travmatik Pnömotoraks",
      "Travma akciğer sönmesi",
    ],
    ["Hemothorax traumatic", "Travmatik Hemotoraks", "Travma göğüs kanaması"],
    ["Cardiac tamponade", "Kardiyak Tamponad", "Kalp sıkışması"],
    ["Aortic rupture", "Aort Rüptürü", "Aort yırtılması"],
    ["Splenic rupture", "Dalak Rüptürü", "Dalak yırtılması"],
  ];
  return conditions.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Kırıklar
const generateFractures = () => {
  const fractures = [
    ["Clavicle fracture", "Klavikula Kırığı", "Köprücük kemiği kırığı"],
    ["Scapula fracture", "Skapula Kırığı", "Kürek kemiği kırığı"],
    ["Humerus fracture", "Humerus Kırığı", "Kol kemiği kırığı"],
    ["Radius fracture", "Radius Kırığı", "Döner kemik kırığı"],
    ["Ulna fracture", "Ulna Kırığı", "Dirsek kemiği kırığı"],
    ["Colles fracture", "Colles Kırığı", "El bileği kırığı"],
    ["Smith fracture", "Smith Kırığı", "Ters Colles kırığı"],
    ["Scaphoid fracture", "Skafoid Kırığı", "El bileği kırığı"],
    ["Metacarpal fracture", "Metakarp Kırığı", "El tarak kırığı"],
    ["Phalanx fracture", "Falanks Kırığı", "Parmak kırığı"],
    ["Pelvic fracture", "Pelvis Kırığı", "Kalça kırığı"],
    ["Hip fracture", "Kalça Kırığı", "Femur boyun kırığı"],
    ["Femur fracture", "Femur Kırığı", "Uyluk kemiği kırığı"],
    ["Patella fracture", "Patella Kırığı", "Diz kapağı kırığı"],
    ["Tibia fracture", "Tibia Kırığı", "Kaval kemiği kırığı"],
    ["Fibula fracture", "Fibula Kırığı", "Baldır kemiği kırığı"],
    ["Ankle fracture", "Ayak Bileği Kırığı", "Malleol kırığı"],
    ["Calcaneus fracture", "Kalkaneus Kırığı", "Topuk kemiği kırığı"],
    ["Metatarsal fracture", "Metatars Kırığı", "Ayak tarak kırığı"],
    ["Vertebral fracture", "Vertebra Kırığı", "Omurga kırığı"],
  ];
  return fractures.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Tıbbi terimler - Çıkıklar ve burkulmalar
const generateDislocationsAndSprains = () => {
  const conditions = [
    ["Shoulder dislocation", "Omuz Çıkığı", "Omuz eklemi çıkığı"],
    ["Elbow dislocation", "Dirsek Çıkığı", "Dirsek eklemi çıkığı"],
    ["Wrist dislocation", "El Bileği Çıkığı", "El bileği çıkığı"],
    ["Finger dislocation", "Parmak Çıkığı", "Parmak eklemi çıkığı"],
    ["Hip dislocation", "Kalça Çıkığı", "Kalça eklemi çıkığı"],
    ["Knee dislocation", "Diz Çıkığı", "Diz eklemi çıkığı"],
    ["Patella dislocation", "Patella Çıkığı", "Diz kapağı çıkığı"],
    ["Ankle dislocation", "Ayak Bileği Çıkığı", "Ayak bileği çıkığı"],
    ["Cervical dislocation", "Servikal Çıkık", "Boyun omur çıkığı"],
    ["Temporomandibular dislocation", "Çene Çıkığı", "Çene eklemi çıkığı"],
    ["Ankle sprain", "Ayak Bileği Burkulması", "Ayak bileği incinmesi"],
    ["Knee sprain", "Diz Burkulması", "Diz bağ incinmesi"],
    ["Wrist sprain", "El Bileği Burkulması", "El bileği incinmesi"],
    ["Finger sprain", "Parmak Burkulması", "Parmak incinmesi"],
    ["ACL tear", "ÖÇB Yırtığı", "Ön çapraz bağ yırtığı"],
    ["PCL tear", "AÇB Yırtığı", "Arka çapraz bağ yırtığı"],
    ["MCL tear", "İYB Yırtığı", "İç yan bağ yırtığı"],
    ["LCL tear", "DYB Yırtığı", "Dış yan bağ yırtığı"],
    ["Meniscus tear", "Menisküs Yırtığı", "Diz menisküs yırtığı"],
    ["Rotator cuff tear", "Rotator Manşet Yırtığı", "Omuz kas yırtığı"],
  ];
  return conditions.map(([latin, turkish, def]) =>
    createTerm(latin, turkish, TermCategory.DISEASE, def)
  );
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 FINAL 274 - 10,000 HEDEFİNE ULAŞMA");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const painLocations = generatePainLocations();
  const surgicalComplications = generateSurgicalComplications();
  const anesthesiaComplications = generateAnesthesiaComplications();
  const emergencyConditions = generateEmergencyConditions();
  const traumaConditions = generateTraumaConditions();
  const fractures = generateFractures();
  const dislocationsAndSprains = generateDislocationsAndSprains();

  const allTerms = [
    ...painLocations,
    ...surgicalComplications,
    ...anesthesiaComplications,
    ...emergencyConditions,
    ...traumaConditions,
    ...fractures,
    ...dislocationsAndSprains,
  ];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(`   Ağrı Lokalizasyonları: ${painLocations.length}`);
  console.log(`   Cerrahi Komplikasyonlar: ${surgicalComplications.length}`);
  console.log(
    `   Anestezi Komplikasyonları: ${anesthesiaComplications.length}`
  );
  console.log(`   Acil Durumlar: ${emergencyConditions.length}`);
  console.log(`   Travma: ${traumaConditions.length}`);
  console.log(`   Kırıklar: ${fractures.length}`);
  console.log(`   Çıkık ve Burkulmalar: ${dislocationsAndSprains.length}`);
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
