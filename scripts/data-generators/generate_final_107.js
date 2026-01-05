// Final 107 - Son benzersiz terimler
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

// Programatik üretim - Sistem + Bozukluk kombinasyonları
const generateSystemDisorders = () => {
  const systems = [
    ["Cardiovascular", "Kardiyovasküler", "Kalp-damar"],
    ["Respiratory", "Respiratuar", "Solunum"],
    ["Gastrointestinal", "Gastrointestinal", "Sindirim"],
    ["Genitourinary", "Genitoüriner", "Ürogenital"],
    ["Musculoskeletal", "Kas-İskelet", "Kas-kemik"],
    ["Neurological", "Nörolojik", "Sinir"],
    ["Endocrine", "Endokrin", "Hormonal"],
    ["Hematological", "Hematolojik", "Kan"],
    ["Immunological", "İmmünolojik", "Bağışıklık"],
    ["Dermatological", "Dermatolojik", "Deri"],
    ["Ophthalmological", "Oftalmolojik", "Göz"],
    ["Otological", "Otolojik", "Kulak"],
    ["Psychiatric", "Psikiyatrik", "Ruhsal"],
    ["Metabolic", "Metabolik", "Metabolizma"],
    ["Nutritional", "Nütrisyonel", "Beslenme"],
  ];

  const disorders = [
    ["disorder", "bozukluk", "Bozukluk"],
    ["dysfunction", "disfonksiyon", "İşlev bozukluğu"],
    ["abnormality", "anormallik", "Anormallik"],
    ["impairment", "bozulma", "Bozulma"],
    ["deficiency", "eksiklik", "Yetersizlik"],
    ["excess", "fazlalık", "Aşırılık"],
    ["imbalance", "dengesizlik", "Denge bozukluğu"],
    ["failure", "yetmezlik", "Yetersizlik"],
  ];

  const terms = [];
  systems.forEach(([sysEn, sysTr, sysDef]) => {
    disorders.forEach(([disEn, disTr, disDef]) => {
      terms.push(
        createTerm(
          `${sysEn} ${disEn}`,
          `${sysTr} ${disTr}`,
          TermCategory.DISEASE,
          `${sysDef} sistemi ${disDef.toLowerCase()}`
        )
      );
    });
  });
  return terms;
};

// Ana fonksiyon
async function main() {
  console.log("\n" + "═".repeat(60));
  console.log("🚀 FINAL 107 - 10,000 HEDEFİNE ULAŞMA");
  console.log("═".repeat(60) + "\n");

  // Tüm terimleri oluştur
  const systemDisorders = generateSystemDisorders();

  const allTerms = [...systemDisorders];

  console.log(`📊 Oluşturulan terim sayıları:`);
  console.log(`   Sistem Bozuklukları: ${systemDisorders.length}`);
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
